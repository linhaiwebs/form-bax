import { useState, useEffect } from 'react';
import RollingNumber from './RollingNumber';

interface StockTickerItemProps {
  code: string;
  name: string;
  basePrice: number;
}

export default function StockTickerItem({ code, name, basePrice }: StockTickerItemProps) {
  const [price, setPrice] = useState(basePrice);
  const [change, setChange] = useState(0);
  const [changePercent, setChangePercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomChange = (Math.random() - 0.5) * 100;
      const newPrice = Math.max(100, basePrice + randomChange);
      const priceChange = newPrice - basePrice;
      const percentChange = (priceChange / basePrice) * 100;

      setPrice(newPrice);
      setChange(priceChange);
      setChangePercent(percentChange);
    }, 2000 + Math.random() * 3000);

    return () => clearInterval(interval);
  }, [basePrice]);

  const isPositive = change >= 0;
  const glowColor = isPositive ? 'cyan' : 'pink';
  const arrowIcon = isPositive ? '▲' : '▼';
  const accentColor = isPositive ? '#10B981' : '#DC2626';

  return (
    <div
      className="inline-flex items-center mx-3 px-4 py-3 relative group transition-all duration-300 rounded-xl backdrop-blur-xl shadow-soft animate-gentle-float"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        border: '2px solid rgba(96, 165, 250, 0.2)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(3deg) translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(96, 165, 250, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
      }}
    >
      <div className="flex flex-col mr-3">
        <span className="text-xs font-display font-bold text-sky-600">{code}</span>
        <span className="text-xs text-text-muted truncate max-w-[80px] font-body">{name}</span>
      </div>

      <div className="flex items-center space-x-2 border-l pl-3 border-border-subtle">
        <div className="flex flex-col items-end">
          <div className="flex items-baseline space-x-1">
            <span className="text-text-dark font-display font-bold text-base">¥</span>
            <RollingNumber
              value={price}
              decimals={0}
              className="text-text-dark font-display font-bold text-base"
            />
          </div>
          <div className="flex items-center space-x-1 font-body" style={{ color: accentColor }}>
            <span className="text-xs">{arrowIcon}</span>
            <RollingNumber
              value={Math.abs(change)}
              decimals={0}
              className="text-xs font-medium"
              glowColor={glowColor}
            />
            <span className="text-xs">(</span>
            <RollingNumber
              value={Math.abs(changePercent)}
              decimals={2}
              className="text-xs font-medium"
              glowColor={glowColor}
            />
            <span className="text-xs">%)</span>
          </div>
        </div>
      </div>

      <div
        className="ml-3 flex items-center justify-center px-3 py-1 relative rounded-lg"
        style={{
          background: 'rgba(96, 165, 250, 0.1)',
          border: '1px solid rgba(96, 165, 250, 0.3)',
        }}
      >
        <span className="text-xs font-display font-bold whitespace-nowrap text-sky-600">
          診断済
        </span>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.1), transparent)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s infinite',
        }}
      />
    </div>
  );
}
