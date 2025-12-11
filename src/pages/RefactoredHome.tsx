import { useState, useEffect, useRef } from 'react';
import UkiyoeDeepSeaBackground from '../components/UkiyoeDeepSeaBackground';
import WaterDropletRippleLogo from '../components/WaterDropletRippleLogo';
import FormContainer from '../components/FormContainer';
import ModernStockInput from '../components/ModernStockInput';
import ModernActionButton from '../components/ModernActionButton';
import BusinessLoadingScene from '../components/BusinessLoadingScene';
import DiagnosisModal from '../components/DiagnosisModal';
import ApiStatsDisplay from '../components/ApiStatsDisplay';
import StockTickerItem from '../components/StockTickerItem';
import DiagnosisTicker from '../components/DiagnosisTicker';
import { StockData } from '../types/stock';
import { DiagnosisState } from '../types/diagnosis';
import { useUrlParams } from '../hooks/useUrlParams';
import { useStockSearch } from '../hooks/useStockSearch';
import { apiClient } from '../lib/apiClient';
import { userTracking } from '../lib/userTracking';
import { trackConversion, trackDiagnosisButtonClick, trackConversionButtonClick } from '../lib/googleTracking';

const stockTickerData = [
  { code: '6758', name: 'ソニーグループ', basePrice: 13500 },
  { code: '6861', name: 'キーエンス', basePrice: 62000 },
  { code: '8035', name: '東京エレクトロン', basePrice: 25500 },
  { code: '6098', name: 'リクルート', basePrice: 6200 },
  { code: '4755', name: '楽天グループ', basePrice: 850 },
  { code: '4689', name: 'Ｚホールディングス', basePrice: 420 },
  { code: '3382', name: '７＆ｉＨＤ', basePrice: 1650 },
  { code: '4063', name: '信越化学', basePrice: 7500 },
  { code: '6954', name: 'ファナック', basePrice: 3800 },
  { code: '9984', name: 'ソフトバンクG', basePrice: 6800 },
];

export default function RefactoredHome() {
  const urlParams = useUrlParams();
  const { search, isLoading: isSearchLoading } = useStockSearch();
  const [stockCode, setStockCode] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fallbackModeEnabled, setFallbackModeEnabled] = useState(false);

  const [diagnosisState, setDiagnosisState] = useState<DiagnosisState>('initial');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [diagnosisStartTime, setDiagnosisStartTime] = useState<number>(0);
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [showLoadingScene, setShowLoadingScene] = useState<boolean>(false);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAutoSelectingRef = useRef<boolean>(false);
  const [autoFillMessage, setAutoFillMessage] = useState<string>('');

  useEffect(() => {
    if (urlParams.code && !isSearchLoading) {
      isAutoSelectingRef.current = true;

      const searchResults = search(urlParams.code);

      if (searchResults.length > 0) {
        const firstResult = searchResults[0];
        const displayValue = `${firstResult.code} ${firstResult.name}`;

        setStockCode(firstResult.code);
        setInputValue(displayValue);
        fetchStockData(firstResult.code);

        setAutoFillMessage('株式情報を自動入力しました');
        setTimeout(() => setAutoFillMessage(''), 2000);
      } else {
        setStockCode(urlParams.code);
        setInputValue(urlParams.code);
        fetchStockData(urlParams.code);
      }
    } else if (!urlParams.code) {
      setStockCode('');
      setInputValue('');
    }
  }, [urlParams.code, search, isSearchLoading]);

  useEffect(() => {
    const loadFallbackConfig = async () => {
      try {
        const response = await apiClient.get('/api/google-tracking');
        const data = await response.json();
        if (data.success && data.config) {
          setFallbackModeEnabled(data.config.fallback_mode_enabled || false);
        }
      } catch (error) {
        console.error('Failed to load fallback config:', error);
      }
    };
    loadFallbackConfig();
  }, []);

  useEffect(() => {
    const trackPageVisit = async () => {
      if (stockData) {
        await userTracking.trackPageLoad({
          stockCode: stockCode,
          stockName: stockData.info.name,
          urlParams: {
            src: urlParams.src || '',
            gclid: urlParams.gclid || '',
            racText: urlParams.racText || '',
            code: urlParams.code || ''
          }
        });
      }
    };

    trackPageVisit();
  }, [stockData, stockCode, urlParams]);

  const fetchStockData = async (code: string) => {
    const cleanCode = code.replace(/[^\d]/g, '');

    if (!cleanCode || !/^\d{4}$/.test(cleanCode)) {
      setStockData(null);
      setStockCode(cleanCode);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await apiClient.get(`/api/stock/data?code=${cleanCode}`);

      if (!response.ok) {
        setStockData(null);
        setStockCode(cleanCode);
        setError(null);
        return;
      }

      const data = await response.json();
      setStockData(data);
      setStockCode(cleanCode);
      setError(null);
    } catch (err) {
      setStockData(null);
      setStockCode(cleanCode);
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  const handleStockSelect = (code: string, name: string) => {
    isAutoSelectingRef.current = true;
    setStockCode(code);
    fetchStockData(code);
  };

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const runDiagnosis = async () => {
    if (diagnosisState !== 'initial') return;
    if (!inputValue) return;
    if (!fallbackModeEnabled && (!stockCode || !stockData)) return;

    trackDiagnosisButtonClick();

    setDiagnosisState('connecting');
    setDiagnosisStartTime(Date.now());
    setAnalysisResult('');
    setLoadingProgress(0);
    setShowLoadingScene(true);

    const minimumLoadingTime = 2000;
    const startTime = Date.now();

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    progressIntervalRef.current = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < 85) {
          return prev + Math.random() * 15;
        } else if (prev < 95) {
          return prev + Math.random() * 2;
        }
        return prev;
      });
    }, 100);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL || ''}/api/gemini/diagnosis`;

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 50000);

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: stockCode || inputValue,
          stockData: stockData ? {
            name: stockData.info.name,
            price: stockData.info.price,
            change: stockData.info.change,
            changePercent: stockData.info.changePercent,
            per: stockData.info.per,
            pbr: stockData.info.pbr,
            dividend: stockData.info.dividend,
            industry: stockData.info.industry,
            marketCap: stockData.info.marketCap,
          } : null,
          sessionId: userTracking.getSessionId(),
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      if (!response.ok) {
        throw new Error('AI診断に失敗しました');
      }

      setDiagnosisState('processing');

      const contentType = response.headers.get('content-type');

      if (contentType?.includes('text/event-stream')) {
        const reader = response.body?.getReader();
        const decoder = new TextDecoder();
        let fullAnalysis = '';
        let firstChunk = true;

        if (!reader) {
          throw new Error('ストリーム読み取りに失敗しました');
        }

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            break;
          }

          const text = decoder.decode(value, { stream: true });
          const lines = text.split('\n').filter(line => line.trim() !== '');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);

              try {
                const parsed = JSON.parse(data);

                if (parsed.error) {
                  throw new Error(parsed.error);
                }

                if (parsed.content) {
                  fullAnalysis += parsed.content;

                  if (firstChunk && fullAnalysis.trim().length > 0) {
                    setLoadingProgress(100);
                    const elapsedTime = Date.now() - startTime;
                    const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

                    setTimeout(() => {
                      setShowLoadingScene(false);
                      setDiagnosisState('streaming');
                    }, remainingTime + 300);
                    firstChunk = false;
                  }

                  setAnalysisResult(fullAnalysis);
                }

                if (parsed.done) {
                  setDiagnosisState('results');

                  const durationMs = Date.now() - diagnosisStartTime;
                  await userTracking.trackDiagnosisClick({
                    stockCode: inputValue,
                    stockName: stockData?.info.name || inputValue,
                    durationMs: durationMs
                  });
                }
              } catch (parseError) {
                console.error('Error parsing SSE data:', parseError);
              }
            }
          }
        }
      } else {
        const result = await response.json();

        if (!result.analysis || result.analysis.trim() === '') {
          throw new Error('診断結果が生成されませんでした');
        }

        setAnalysisResult(result.analysis);

        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime);

        setTimeout(() => {
          setShowLoadingScene(false);
          setDiagnosisState('results');
        }, remainingTime + 300);

        const durationMs = Date.now() - diagnosisStartTime;
        await userTracking.trackDiagnosisClick({
          stockCode: inputValue,
          stockName: stockData?.info.name || inputValue,
          durationMs: durationMs
        });
      }
    } catch (err) {
      console.error('Diagnosis error:', err);
      let errorMessage = '診断中にエラーが発生しました';
      let errorDetails = '';

      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          errorMessage = 'リクエストがタイムアウトしました';
          errorDetails = '接続に時間がかかりすぎています。もう一度お試しください。';
        } else {
          errorMessage = err.message;

          try {
            const errorResponse = JSON.parse(err.message);
            if (errorResponse.details) {
              errorDetails = errorResponse.details;
            }
          } catch {
            errorDetails = err.message;
          }
        }
      }

      setError(`${errorMessage}${errorDetails ? `\n詳細: ${errorDetails}` : ''}`);

      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, 2000 - elapsedTime);

      setTimeout(() => {
        setDiagnosisState('error');
        setShowLoadingScene(false);
        setLoadingProgress(0);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }, remainingTime);
    }
  };

  const handleLineConversion = async () => {
    try {
      trackConversionButtonClick();

      const response = await apiClient.get('/api/line-redirects/select');

      if (!response.ok) {
        console.error('Failed to get LINE redirect link');
        alert('LINEリンクの取得に失敗しました。しばらくしてからもう一度お試しください。');
        return;
      }

      const data = await response.json();

      if (!data.success || !data.link) {
        console.error('No active LINE redirect links available');
        alert('現在利用可能なLINEリンクがありません。');
        return;
      }

      const lineUrl = data.link.redirect_url;

      // Track conversion using sendBeacon for reliable tracking
      trackConversion();

      // Use sendBeacon for non-blocking tracking
      if (navigator.sendBeacon) {
        const sessionId = userTracking.getSessionId();
        const trackingData = JSON.stringify({
          sessionId: sessionId,
          eventType: 'conversion',
          gclid: urlParams.gclid,
          eventData: {
            conversion_time: new Date().toISOString()
          }
        });
        const blob = new Blob([trackingData], { type: 'application/json' });
        navigator.sendBeacon('/api/tracking/event', blob);
      } else {
        // Fallback for browsers that don't support sendBeacon
        await userTracking.trackConversion({
          gclid: urlParams.gclid
        });
      }

      console.log('LINE conversion tracked successfully');

      // Immediate redirect without delay - Google Ads compliant
      window.location.href = lineUrl;
    } catch (error) {
      console.error('LINE conversion error:', error);
      alert('操作に失敗しました。しばらくしてからもう一度お試しください。');
    }
  };

  const handleReportDownload = async () => {
    try {
      const response = await apiClient.get('/api/line-redirects/select');
      let lineRedirectUrl = '';

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.link) {
          lineRedirectUrl = data.link.redirect_url;
        }
      }

      const { generateDiagnosisReport } = await import('../lib/reportGenerator');
      await generateDiagnosisReport({
        stockCode: stockCode,
        stockName: stockData?.info.name || '',
        analysis: analysisResult,
        lineRedirectUrl: lineRedirectUrl
      });

      await userTracking.trackEvent({
        sessionId: userTracking.getSessionId(),
        eventType: 'report_download',
        stockCode: stockCode,
        stockName: stockData?.info.name || '',
        eventData: {
          reportFormat: 'docx',
          timestamp: new Date().toISOString()
        }
      });

      console.log('Report download tracked successfully');
    } catch (error) {
      console.error('Report download error:', error);
      alert('レポートのダウンロードに失敗しました。もう一度お試しください。');
    }
  };

  const closeModal = () => {
    setDiagnosisState('initial');
    setAnalysisResult('');
    setLoadingProgress(0);
    setShowLoadingScene(false);
    setDiagnosisStartTime(0);
    setError(null);
    setStockCode('');
    setInputValue('');
    setStockData(null);

    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  return (
    <div className="relative flex flex-col">
      <DiagnosisTicker />
      <UkiyoeDeepSeaBackground />

      <div className="relative z-10 flex flex-col pt-12">
        <ApiStatsDisplay />

        {!showLoadingScene ? (
          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center px-2 py-8">
              <WaterDropletRippleLogo />
            </div>

            <div className="w-full mx-auto mb-4">
              <div className="overflow-hidden py-3 relative rounded-xl backdrop-blur-md"
                style={{
                  background: 'rgba(4, 47, 82, 0.75)',
                  border: '2px solid rgba(0, 230, 195, 0.4)',
                }}
              >
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, rgba(4, 47, 82, 1) 0%, transparent 5%, transparent 95%, rgba(4, 47, 82, 1) 100%)',
                    zIndex: 1
                  }}
                />
                <div className="animate-scroll-left whitespace-nowrap inline-block">
                  {[...stockTickerData, ...stockTickerData, ...stockTickerData].map((stock, index) => (
                    <StockTickerItem
                      key={index}
                      code={stock.code}
                      name={stock.name}
                      basePrice={stock.basePrice}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <FormContainer>
                <ModernStockInput
                  value={inputValue}
                  onChange={setInputValue}
                  onStockSelect={handleStockSelect}
                  search={search}
                  isLoading={isSearchLoading}
                />

                {autoFillMessage && (
                  <div className="text-center py-2 text-sm text-green-600 font-medium animate-fadeIn">
                    {autoFillMessage}
                  </div>
                )}

                {loading && (
                  <div className="text-center py-4 animate-fadeIn">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-gray-900"></div>
                    <p className="mt-2 text-gray-600 text-sm">Loading...</p>
                  </div>
                )}

                {error && diagnosisState !== 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center animate-fadeIn mt-4">
                    <p className="text-red-600 text-sm font-semibold">{error}</p>
                  </div>
                )}

                {!loading && diagnosisState === 'initial' && (
                  <ModernActionButton
                    onClick={runDiagnosis}
                    disabled={!inputValue || (!fallbackModeEnabled && !stockCode)}
                  />
                )}

                {diagnosisState === 'error' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center animate-fadeIn mt-4">
                    <h3 className="text-lg font-bold text-red-600 mb-2">診断エラー</h3>
                    <p className="text-red-600 text-sm mb-4 whitespace-pre-line">{error}</p>
                    <button
                      onClick={() => {
                        setDiagnosisState('initial');
                        setError(null);
                      }}
                      className="px-6 py-3 bg-gray-900 text-white font-bold rounded-xl transition-all shadow-lg hover:opacity-90"
                    >
                      もう一度試す
                    </button>
                  </div>
                )}
              </FormContainer>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <BusinessLoadingScene isVisible={showLoadingScene} />
          </div>
        )}
      </div>

      <DiagnosisModal
        isOpen={diagnosisState === 'streaming' || diagnosisState === 'results'}
        onClose={closeModal}
        analysis={analysisResult}
        stockCode={inputValue}
        stockName={stockData?.info.name || inputValue}
        onLineConversion={handleLineConversion}
        onReportDownload={handleReportDownload}
        isStreaming={diagnosisState === 'streaming'}
        isConnecting={diagnosisState === 'connecting'}
      />
    </div>
  );
}
