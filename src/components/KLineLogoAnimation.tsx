import { useEffect, useState } from 'react';

export default function KLineLogoAnimation() {
  const [candlesticks, setCandlesticks] = useState<Array<{ height: number; isGreen: boolean; offset: number }>>([]);
  const [clockAngles, setClockAngles] = useState([0, 120, 240]);

  useEffect(() => {
    const updateCandlesticks = () => {
      setCandlesticks([
        { height: 40 + Math.random() * 30, isGreen: Math.random() > 0.5, offset: 0 },
        { height: 40 + Math.random() * 30, isGreen: Math.random() > 0.5, offset: 25 },
        { height: 40 + Math.random() * 30, isGreen: Math.random() > 0.5, offset: 50 },
        { height: 40 + Math.random() * 30, isGreen: Math.random() > 0.5, offset: 75 },
      ]);
    };

    updateCandlesticks();
    const candleInterval = setInterval(updateCandlesticks, 1500);

    const clockInterval = setInterval(() => {
      setClockAngles(prev => prev.map(angle => (angle + 6) % 360));
    }, 100);

    return () => {
      clearInterval(candleInterval);
      clearInterval(clockInterval);
    };
  }, []);

  return (
    <div className="relative w-64 h-64">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
        <defs>
          <filter id="klineGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#16a34a" stopOpacity="0.8"/>
          </linearGradient>
          <linearGradient id="redGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8"/>
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.8"/>
          </linearGradient>
        </defs>

        {candlesticks.map((candle, idx) => {
          const x = 60 + candle.offset;
          const y = 100;
          const wickHeight = candle.height * 1.4;
          const bodyHeight = candle.height * 0.8;

          return (
            <g key={idx} filter="url(#klineGlow)">
              <line
                x1={x}
                y1={y - wickHeight / 2}
                x2={x}
                y2={y + wickHeight / 2}
                stroke={candle.isGreen ? '#22c55e' : '#ef4444'}
                strokeWidth="2"
                opacity="0.6"
              >
                <animate
                  attributeName="opacity"
                  values="0.6;1;0.6"
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </line>
              <rect
                x={x - 5}
                y={y - bodyHeight / 2}
                width="10"
                height={bodyHeight}
                fill={candle.isGreen ? 'url(#greenGrad)' : 'url(#redGrad)'}
                stroke={candle.isGreen ? '#22c55e' : '#ef4444'}
                strokeWidth="1.5"
              >
                <animate
                  attributeName="height"
                  values={`${bodyHeight};${bodyHeight * 1.1};${bodyHeight}`}
                  dur="1.5s"
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          );
        })}

        <text
          x="100"
          y="110"
          textAnchor="middle"
          fill="#ffffff"
          fontSize="48"
          fontWeight="bold"
          filter="url(#klineGlow)"
        >
          AI
        </text>

        {clockAngles.map((angle, idx) => {
          const radius = 70;
          const clockX = 100 + radius * Math.cos((angle - 90) * Math.PI / 180);
          const clockY = 100 + radius * Math.sin((angle - 90) * Math.PI / 180);
          const color = idx === 0 ? '#22c55e' : idx === 1 ? '#3b82f6' : '#ef4444';

          return (
            <g key={idx}>
              <circle
                cx={clockX}
                cy={clockY}
                r="12"
                fill="rgba(10, 14, 20, 0.9)"
                stroke={color}
                strokeWidth="2"
                filter="url(#klineGlow)"
              />
              <line
                x1={clockX}
                y1={clockY}
                x2={clockX + 8 * Math.cos((angle * 2) * Math.PI / 180)}
                y2={clockY + 8 * Math.sin((angle * 2) * Math.PI / 180)}
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </g>
          );
        })}
      </svg>

      <div className="absolute inset-0 rounded-full" style={{
        background: 'radial-gradient(circle, rgba(34, 197, 94, 0.1), transparent 70%)',
        animation: 'pulse-market 2s ease-in-out infinite'
      }} />

      <style>{`
        @keyframes pulse-market {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
