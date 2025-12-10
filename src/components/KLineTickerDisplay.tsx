import { useEffect, useState } from 'react';

interface KLineTickerDisplayProps {
  label: string;
  value?: string;
  isAnimating?: boolean;
}

export default function KLineTickerDisplay({ label, value, isAnimating = true }: KLineTickerDisplayProps) {
  const [displayValue, setDisplayValue] = useState('0.00');
  const [trend, setTrend] = useState<'up' | 'down'>('up');

  useEffect(() => {
    if (!isAnimating) {
      setDisplayValue(value || '0.00');
      return;
    }

    const interval = setInterval(() => {
      const randomValue = (Math.random() * 10000).toFixed(2);
      setDisplayValue(randomValue);
      setTrend(Math.random() > 0.5 ? 'up' : 'down');
    }, 200);

    return () => clearInterval(interval);
  }, [isAnimating, value]);

  const bgColor = trend === 'up' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)';
  const borderColor = trend === 'up' ? 'rgba(34, 197, 94, 0.4)' : 'rgba(239, 68, 68, 0.4)';
  const textColor = trend === 'up' ? '#22c55e' : '#ef4444';

  return (
    <div
      className="px-6 py-3 rounded-lg border-2 backdrop-blur-sm transition-all duration-300"
      style={{
        background: bgColor,
        borderColor: borderColor,
        boxShadow: `0 0 20px ${trend === 'up' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'}`
      }}
    >
      <div className="flex items-center justify-between space-x-4">
        <span className="text-sm font-bold text-gray-300 uppercase tracking-wider">{label}</span>
        <div className="flex items-center space-x-2">
          <span
            className="text-2xl font-bold font-mono tabular-nums"
            style={{ color: textColor }}
          >
            {displayValue}
          </span>
          <span className="text-lg" style={{ color: textColor }}>
            {trend === 'up' ? '▲' : '▼'}
          </span>
        </div>
      </div>
    </div>
  );
}
