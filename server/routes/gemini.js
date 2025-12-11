import express from 'express';
import dotenv from 'dotenv';
import { getCachedDiagnosis, saveDiagnosisToCache } from '../utils/sqliteCache.js';
import { getRateLimitStatus } from '../utils/rateLimiter.js';
import { recordUsageStats } from '../utils/sqliteStats.js';
import { getGoogleTrackingConfig, recordFallbackModeUsage, createEvent } from '../database/sqliteHelpers.js';

dotenv.config();

const router = express.Router();

router.post('/diagnosis', async (req, res) => {
  const startTime = Date.now();

  try {
    const { code, stockData, sessionId } = req.body;
    const displayCode = code || 'your input';

    console.log('Diagnosis request received for stock:', displayCode);

    if (code) {
      const cachedResult = await getCachedDiagnosis(code);
      if (cachedResult) {
        console.log(`Returning cached result for ${code}`);
        const responseTime = Date.now() - startTime;
        await recordUsageStats({ cacheHit: true, apiCall: false, error: false, responseTime });
        return res.json({
          analysis: cachedResult.diagnosis_result,
          cached: true,
          cachedAt: cachedResult.created_at,
          expiresAt: cachedResult.expires_at
        });
      }
    }

    const apiKeysString = process.env.SILICONFLOW_API_KEY || process.env.SILICONFLOW_API_KEYS;
    const siliconflowApiUrl = process.env.SILICONFLOW_API_URL || 'https://api.siliconflow.cn/v1/chat/completions';
    const siliconflowModel = process.env.SILICONFLOW_MODEL || 'Qwen/Qwen2.5-7B-Instruct';

    if (!apiKeysString) {
      console.warn('SILICONFLOW_API_KEY not configured, using mock response');

      const mockAnalysis = `We have confirmed your input "${displayCode}".

Please add our staff's WhatsApp account "AI Stock Assistant".

Once you've added the account, send the stock code "${displayCode}" to receive a detailed diagnostic report.

The AI diagnosis will begin the moment you send your message, and you will receive the latest report instantly.`;

      if (code) {
        await saveDiagnosisToCache(code, stockData, mockAnalysis, 'mock');
      }
      const responseTime = Date.now() - startTime;
      await recordUsageStats({ cacheHit: false, apiCall: false, error: false, responseTime });
      return res.json({ analysis: mockAnalysis, cached: false, mock: true });
    }

    const apiKeys = apiKeysString.split(',').map(k => k.trim()).filter(k => k);
    const selectedApiKey = apiKeys[0];

    console.log('SiliconFlow API Key selected, making streaming API request...');
    console.log('Using model:', siliconflowModel);

    const prompt = `You are a stock market analyst. Please respond to the user's input "${displayCode}" with the following format:

You must output in the following format:

We have confirmed your input "${displayCode}".

Please add our staff's WhatsApp account "AI Stock Assistant".

Once you've added the account, send the stock code "${displayCode}" to receive a detailed diagnostic report.

The AI diagnosis will begin the moment you send your message, and you will receive the latest report instantly.

Important: Strictly follow this format and do not include any other analysis content.`;

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000);

    let siliconflowResponse;
    try {
      siliconflowResponse = await fetch(
        siliconflowApiUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${selectedApiKey}`,
          },
          body: JSON.stringify({
            model: siliconflowModel,
            messages: [
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 1500,
            top_p: 0.7,
            top_k: 50,
            frequency_penalty: 0.5,
            stream: true,
          }),
          signal: controller.signal,
        }
      );
      clearTimeout(timeoutId);
    } catch (fetchError) {
      clearTimeout(timeoutId);
      if (fetchError.name === 'AbortError') {
        console.error('Request timeout after 45 seconds');
        const responseTime = Date.now() - startTime;
        await recordUsageStats({ cacheHit: false, apiCall: true, error: true, responseTime });
        res.write(`data: ${JSON.stringify({ error: 'Request timed out. Please try again.' })}\n\n`);
        res.end();
        return;
      }
      throw fetchError;
    }

    console.log('SiliconFlow API response status:', siliconflowResponse.status);

    if (!siliconflowResponse.ok) {
      const errorBody = await siliconflowResponse.text();
      console.error('SiliconFlow API error response:', errorBody);
      const responseTime = Date.now() - startTime;
      await recordUsageStats({ cacheHit: false, apiCall: true, error: true, responseTime });
      res.write(`data: ${JSON.stringify({ error: `SiliconFlow API error: ${siliconflowResponse.status}` })}\n\n`);
      res.end();
      return;
    }

    let fullAnalysis = '';
    const reader = siliconflowResponse.body;
    const decoder = new TextDecoder();
    let buffer = '';

    for await (const chunk of reader) {
      buffer += decoder.decode(chunk, { stream: true });
      const lines = buffer.split('\n');

      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmedLine = line.trim();
        if (!trimmedLine) continue;

        if (trimmedLine.startsWith('data: ')) {
          const data = trimmedLine.slice(6).trim();

          if (data === '[DONE]') {
            continue;
          }

          try {
            const parsed = JSON.parse(data);
            const content = parsed.choices?.[0]?.delta?.content;

            if (content) {
              fullAnalysis += content;
              res.write(`data: ${JSON.stringify({ content })}\n\n`);
            }
          } catch (e) {
            if (data.length > 0) {
              console.error('Error parsing streaming chunk. Data length:', data.length, 'First 200 chars:', data.substring(0, 200));
            }
          }
        }
      }
    }

    decoder.decode();

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();

    console.log('Successfully generated streaming analysis, length:', fullAnalysis.length);

    if (code && fullAnalysis.trim().length > 0) {
      await saveDiagnosisToCache(code, stockData, fullAnalysis, 'qwen2.5-7b-instruct');
    } else if (!code) {
      console.log('No code provided, skipping cache');
    } else {
      console.warn('Empty analysis result, not caching');
    }

    const responseTime = Date.now() - startTime;
    await recordUsageStats({ cacheHit: false, apiCall: true, error: false, responseTime });

  } catch (error) {
    console.error('Error in diagnosis function:', error);
    console.error('Error stack:', error.stack);

    const responseTime = Date.now() - startTime;
    await recordUsageStats({ cacheHit: false, apiCall: false, error: true, responseTime });

    if (!res.headersSent) {
      res.status(500).json({
        error: 'An error occurred during diagnosis',
        details: error.message,
        type: error.name,
      });
    } else {
      res.write(`data: ${JSON.stringify({ error: 'An error occurred during diagnosis', details: error.message })}\n\n`);
      res.end();
    }
  }
});

router.get('/stats', async (req, res) => {
  try {
    const rateLimitStatus = getRateLimitStatus();
    const { getTodayStats } = await import('../utils/sqliteStats.js');
    const todayStats = await getTodayStats();

    res.json({
      rateLimit: rateLimitStatus,
      today: todayStats,
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({ error: 'Failed to get statistics' });
  }
});

export default router;
