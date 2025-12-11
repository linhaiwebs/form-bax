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
  const arrowIcon = isPositive ? '▲' : '▼';
  const accentColor = isPositive ? '#10B981' : '#DC2626';

  return (
    <div
      className="inline-flex items-center mx-3 px-4 py-3 relative group transition-all duration-300 rounded-xl backdrop-blur-xl shadow-soft animate-gentle-float"
      style={{
        background: 'rgba(4, 47, 82, 0.75)',
        border: '2px solid #00E6C3',
        boxShadow: '0 4px 20px rgba(0, 149, 224, 0.4), 0 0 30px rgba(0, 230, 195, 0.2)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(10deg) translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 0 30px rgba(0, 230, 195, 0.6), 0 0 60px rgba(77, 255, 220, 0.3)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 149, 224, 0.4), 0 0 30px rgba(0, 230, 195, 0.2)';
      }}
    >
      <div className="flex flex-col mr-3">
        <span className="text-xs font-display font-bold" style={{ color: '#4DFFDC' }}>{code}</span>
        <span className="text-xs truncate max-w-[80px] font-body" style={{ color: '#B3FFF0' }}>{name}</span>
      </div>

      <div className="flex items-center space-x-2 border-l pl-3" style={{ borderColor: 'rgba(0, 230, 195, 0.3)' }}>
        <div className="flex flex-col items-end">
          <div className="flex items-baseline space-x-1">
            <span className="font-luxury-number font-bold text-base" style={{ color: '#FFFFFF' }}>¥</span>
            <RollingNumber
              value={price}
              decimals={0}
              className="font-luxury-number font-bold text-base"
              style={{ color: '#FFFFFF' }}
            />
          </div>
          <div className="flex items-center space-x-1 font-body">
            <span className="text-xs" style={{ color: accentColor }}>{arrowIcon}</span>
            <RollingNumber
              value={Math.abs(change)}
              decimals={0}
              className="text-xs font-medium"
              style={{ color: '#FFFFFF' }}
            />
            <span className="text-xs" style={{ color: '#FFFFFF' }}>(</span>
            <RollingNumber
              value={Math.abs(changePercent)}
              decimals={2}
              className="text-xs font-medium"
              style={{ color: '#FFFFFF' }}
            />
            <span className="text-xs" style={{ color: '#FFFFFF' }}>%)</span>
          </div>
        </div>
      </div>

      <div
        className="ml-3 flex items-center justify-center px-3 py-1 relative rounded-lg"
        style={{
          background: 'linear-gradient(135deg, #4DFFDC 0%, #00E6C3 100%)',
          border: '1px solid rgba(179, 255, 240, 0.4)',
        }}
      >
        <span className="text-xs font-display font-bold whitespace-nowrap" style={{ color: '#00101A' }}>
          診断済
        </span>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl animate-wave-crest-move"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(77, 255, 220, 0.3), transparent)',
          backgroundSize: '200% 100%',
        }}
      />
    </div>
  );
}
