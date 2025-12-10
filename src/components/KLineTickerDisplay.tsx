import { useEffect, useState } from 'react';

interface KLineTickerDisplayProps {
  label: string;
  value?: string;
  isAnimating?: boolean;
}

export default function KLineTickerDisplay({ label, value, isAnimating = true }: KLineTickerDisplayProps) {
  const [displayValue, setDisplayValue] = useState('0.00');
  const [trend, setTrend] = useState<'up' | 'down'>('up');
  const [digits, setDigits] = useState<string[]>(['0', '0', '0', '0']);

  useEffect(() => {
    if (!isAnimating) {
      const val = value || '0.00';
      setDisplayValue(val);
      setDigits(val.replace('.', '').split(''));
      return;
    }

    const interval = setInterval(() => {
      const randomValue = (Math.random() * 9999).toFixed(0);
      const paddedValue = randomValue.padStart(4, '0');
      setDisplayValue(paddedValue);
      setDigits(paddedValue.split(''));
      setTrend(Math.random() > 0.5 ? 'up' : 'down');
    }, 150);

    return () => clearInterval(interval);
  }, [isAnimating, value]);

  const bgColor = trend === 'up' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)';
  const borderColor = trend === 'up' ? 'rgba(34, 197, 94, 0.6)' : 'rgba(239, 68, 68, 0.6)';
  const textColor = trend === 'up' ? '#22c55e' : '#ef4444';
  const glowColor = trend === 'up' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)';

  return (
    <div
      className="px-6 py-4 rounded-lg border-2 backdrop-blur-sm transition-all duration-200 relative overflow-hidden"
      style={{
        background: bgColor,
        borderColor: borderColor,
        boxShadow: `0 0 25px ${glowColor}, inset 0 1px 1px rgba(255, 255, 255, 0.1)`
      }}
    >
      <div className="absolute inset-0 opacity-20" style={{
        background: `linear-gradient(135deg, ${glowColor} 0%, transparent 100%)`
      }} />

      <div className="relative z-10">
        <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{label}</div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {digits.map((digit, idx) => (
              <div
                key={idx}
                className="relative"
                style={{
                  width: '28px',
                  height: '40px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.3)'
                }}
              >
                <span
                  className="font-mono font-bold transition-all duration-150"
                  style={{
                    fontSize: '24px',
                    color: textColor,
                    textShadow: `0 0 10px ${glowColor}`
                  }}
                >
                  {digit}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center space-x-2 ml-3">
            <div
              className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200"
              style={{
                background: textColor,
                boxShadow: `0 0 15px ${glowColor}`
              }}
            >
              <span className="text-white text-lg font-bold">
                {trend === 'up' ? '▲' : '▼'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
