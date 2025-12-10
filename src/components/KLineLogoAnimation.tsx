import { useEffect, useState } from 'react';

export default function KLineLogoAnimation() {
  const [candlesticks, setCandlesticks] = useState<Array<{ height: number; isGreen: boolean; offset: number }>>([]);
  const [clockAngles, setClockAngles] = useState([0, 120, 240]);
  const [marketNumbers, setMarketNumbers] = useState(['1234', '5678', '9012']);

  useEffect(() => {
    const updateCandlesticks = () => {
      setCandlesticks([
        { height: 35 + Math.random() * 35, isGreen: Math.random() > 0.5, offset: 0 },
        { height: 35 + Math.random() * 35, isGreen: Math.random() > 0.5, offset: 22 },
        { height: 35 + Math.random() * 35, isGreen: Math.random() > 0.5, offset: 44 },
        { height: 35 + Math.random() * 35, isGreen: Math.random() > 0.5, offset: 66 },
        { height: 35 + Math.random() * 35, isGreen: Math.random() > 0.5, offset: 88 },
      ]);
    };

    updateCandlesticks();
    const candleInterval = setInterval(updateCandlesticks, 1200);

    const clockInterval = setInterval(() => {
      setClockAngles(prev => prev.map(angle => (angle + 6) % 360));
    }, 100);

    const numberInterval = setInterval(() => {
      setMarketNumbers([
        Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
        Math.floor(Math.random() * 10000).toString().padStart(4, '0'),
      ]);
    }, 300);

    return () => {
      clearInterval(candleInterval);
      clearInterval(clockInterval);
      clearInterval(numberInterval);
    };
  }, []);

  return (
    <div className="relative w-72 h-72">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        <defs>
          <filter id="klineGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.9"/>
          </linearGradient>
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.9"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.9"/>
          </linearGradient>
          <radialGradient id="centerGlow">
            <stop offset="0%" stopColor="rgba(34, 197, 94, 0.3)"/>
            <stop offset="100%" stopColor="rgba(34, 197, 94, 0)"/>
          </radialGradient>
        </defs>

        <circle cx="100" cy="100" r="60" fill="url(#centerGlow)" opacity="0.6">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite"/>
        </circle>

        {candlesticks.map((candle, idx) => {
          const x = 55 + candle.offset;
          const y = 100;
          const wickHeight = candle.height * 1.5;
          const bodyHeight = candle.height * 0.85;

          return (
            <g key={idx} filter="url(#klineGlow)">
              <line
                x1={x}
                y1={y - wickHeight / 2}
                x2={x}
                y2={y + wickHeight / 2}
                stroke={candle.isGreen ? '#22c55e' : '#ef4444'}
                strokeWidth="2.5"
                opacity="0.7"
              >
                <animate
                  attributeName="opacity"
                  values="0.5;1;0.5"
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </line>
              <rect
                x={x - 6}
                y={y - bodyHeight / 2}
                width="12"
                height={bodyHeight}
                fill={candle.isGreen ? 'url(#greenGrad)' : 'url(#redGrad)'}
                stroke={candle.isGreen ? '#22c55e' : '#ef4444'}
                strokeWidth="2"
                rx="2"
              >
                <animate
                  attributeName="height"
                  values={`${bodyHeight};${bodyHeight * 1.15};${bodyHeight}`}
                  dur="1.2s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          );
        })}

        <text
          x="100"
          y="115"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="52"
          fontWeight="bold"
          filter="url(#klineGlow)"
        >
          AI
        </text>

        {clockAngles.map((angle, idx) => {
          const radius = 75;
          const clockX = 100 + radius * Math.cos((angle - 90) * Math.PI / 180);
          const clockY = 100 + radius * Math.sin((angle - 90) * Math.PI / 180);
          const color = idx === 0 ? '#22c55e' : idx === 1 ? '#3b82f6' : '#ef4444';

          return (
            <g key={idx} filter="url(#klineGlow)">
              <circle
                cx={clockX}
                cy={clockY}
                r="16"
                fill="rgba(10, 14, 20, 0.95)"
                stroke={color}
                strokeWidth="2.5"
              />
              <line
                x1={clockX}
                y1={clockY}
                x2={clockX + 10 * Math.cos((angle * 2) * Math.PI / 180)}
                y2={clockY + 10 * Math.sin((angle * 2) * Math.PI / 180)}
                stroke={color}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <text
                x={clockX}
                y={clockY + 3}
                textAnchor="middle"
                fill={color}
                fontSize="8"
                fontWeight="bold"
                fontFamily="monospace"
              >
                {marketNumbers[idx].substring(0, 2)}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.15), rgba(59, 130, 246, 0.1) 50%, transparent 70%)',
        animation: 'pulse-market 2.5s ease-in-out infinite'
      }} />

      <style>{`
        @keyframes pulse-market {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.08); }
        }
      `}</style>
    </div>
  );
}
