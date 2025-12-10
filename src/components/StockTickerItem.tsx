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
  const neonColor = isPositive ? '#00F0FF' : '#FF006E';
  const neonShadow = isPositive ? 'shadow-neon-cyan' : 'shadow-neon-pink';

  return (
    <div
      className={`inline-flex items-center mx-3 px-4 py-3 relative group transition-all duration-300 hover:scale-105 ${neonShadow}`}
      style={{
        background: 'linear-gradient(135deg, rgba(10, 0, 21, 0.9) 0%, rgba(26, 0, 51, 0.9) 100%)',
        clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
        border: `2px solid ${neonColor}`,
        boxShadow: `0 0 10px ${neonColor}60, inset 0 0 10px ${neonColor}20`,
      }}
    >
      <div
        className="absolute top-0 left-2 w-1 h-1 rounded-full animate-neon-pulse"
        style={{ background: neonColor, boxShadow: `0 0 5px ${neonColor}` }}
      />
      <div
        className="absolute top-0 right-2 w-1 h-1 rounded-full animate-neon-pulse"
        style={{ background: neonColor, boxShadow: `0 0 5px ${neonColor}`, animationDelay: '0.5s' }}
      />

      <div className="flex flex-col mr-3">
        <span className="text-xs font-cyber-mono font-bold text-cyber-cyan">{code}</span>
        <span className="text-xs text-gray-300 truncate max-w-[80px] font-cyber-sans">{name}</span>
      </div>

      <div className="flex items-center space-x-2 border-l pl-3" style={{ borderColor: `${neonColor}40` }}>
        <div className="flex flex-col items-end">
          <div className="flex items-baseline space-x-1">
            <span className="text-white font-cyber font-bold text-base">¥</span>
            <RollingNumber
              value={price}
              decimals={0}
              className="text-white font-cyber font-bold text-base"
            />
          </div>
          <div
            className={`flex items-center space-x-1 font-cyber-sans`}
            style={{
              color: neonColor,
              textShadow: `0 0 5px ${neonColor}80`,
            }}
          >
            <span className="text-xs animate-neon-pulse">{arrowIcon}</span>
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
        className="ml-3 flex items-center justify-center px-2 py-1 relative"
        style={{
          background: `linear-gradient(135deg, ${neonColor}30, ${neonColor}10)`,
          border: `1px solid ${neonColor}`,
          clipPath: 'polygon(4px 0, 100% 0, 100% calc(100% - 4px), calc(100% - 4px) 100%, 0 100%, 0 4px)',
        }}
      >
        <span
          className="text-xs font-cyber font-bold whitespace-nowrap"
          style={{
            color: neonColor,
            textShadow: `0 0 5px ${neonColor}`,
          }}
        >
          診断済
        </span>
      </div>

      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${neonColor}20, transparent)`,
          animation: 'data-flow 2s infinite',
        }}
      />
    </div>
  );
}
