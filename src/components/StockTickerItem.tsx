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
  const glowColor = isPositive ? 'green' : 'red';
  const arrowIcon = isPositive ? '▲' : '▼';

  return (
    <div className="inline-flex items-center mx-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(20, 25, 40, 0.95) 100%)',
        border: `1px solid ${isPositive ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
      }}
    >
      <div className="flex flex-col mr-3">
        <span className="text-xs font-bold text-gray-400">{code}</span>
        <span className="text-xs text-gray-300 truncate max-w-[80px]">{name}</span>
      </div>

      <div className="flex items-center space-x-2 border-l border-gray-700 pl-3">
        <div className="flex flex-col items-end">
          <div className="flex items-baseline space-x-1">
            <span className="text-white font-bold text-base">¥</span>
            <RollingNumber
              value={price}
              decimals={0}
              className="text-white font-bold text-base"
            />
          </div>
          <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
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

      <div className="ml-3 flex items-center justify-center px-2 py-1 rounded"
        style={{
          background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
          border: '1px solid rgba(34, 197, 94, 0.3)',
        }}
      >
        <span className="text-xs font-bold text-green-400 whitespace-nowrap">診断済</span>
      </div>
    </div>
  );
}
