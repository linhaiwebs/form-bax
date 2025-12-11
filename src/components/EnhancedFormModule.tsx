import { useState, useEffect, useRef } from 'react';
import { Lightbulb, Gift, FileText, Zap } from 'lucide-react';
import ModernStockInput from './ModernStockInput';
import { SearchResult } from '../hooks/useStockSearch';

interface EnhancedFormModuleProps {
  value: string;
  onChange: (value: string) => void;
  onStockSelect?: (code: string, name: string) => void;
  onSubmit: () => void;
  disabled?: boolean;
  search: (query: string) => SearchResult[];
  isLoading?: boolean;
  autoFillMessage?: string;
}

export default function EnhancedFormModule({
  value,
  onChange,
  onStockSelect,
  onSubmit,
  disabled = false,
  search,
  isLoading = false,
  autoFillMessage = ''
}: EnhancedFormModuleProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 34, seconds: 5 });
  const [realtimeCount, setRealtimeCount] = useState(1261);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const countInterval = setInterval(() => {
      setRealtimeCount(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        const newCount = prev + change;
        return Math.max(1200, Math.min(1300, newCount));
      });
    }, 3000);

    return () => clearInterval(countInterval);
  }, []);

  const formatTime = (num: number) => String(num).padStart(2, '0');

  return (
    <div className="w-full bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-pink-400 via-pink-500 to-red-400 px-4 py-3 relative">
        <div className="flex items-center justify-between mb-1">
          <Lightbulb className="w-5 h-5 text-yellow-200 animate-pulse" />
          <span className="text-xs font-bold text-white bg-white/20 px-3 py-1 rounded-full">
            期間限定
          </span>
          <Lightbulb className="w-5 h-5 text-yellow-200 animate-pulse" />
        </div>
        <h2 className="text-center text-white font-bold text-sm mb-2">
          今だけ完全無料でプロ級分析レポート提供中！
        </h2>
        <div className="text-center text-white text-xs">
          残り時間: {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3">
          <span className="inline-block bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded">
            人気急上昇中
          </span>
        </div>

        <div className="mb-3">
          <ModernStockInput
            value={value}
            onChange={onChange}
            onStockSelect={onStockSelect}
            search={search}
            isLoading={isLoading}
          />
        </div>

        {autoFillMessage && (
          <div className="text-center py-2 text-sm text-green-600 font-medium">
            {autoFillMessage}
          </div>
        )}

        <div className="bg-blue-50 rounded-lg px-4 py-3 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-sm text-blue-900 font-medium">
            リアルタイム: <span className="font-bold">{realtimeCount.toLocaleString()}</span> 人が同時に分析中
          </span>
        </div>

        <button
          onClick={onSubmit}
          disabled={disabled}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" fill="currentColor" />
          <span className="text-base">30秒で無料AI分析開始</span>
        </button>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
            <span>約30秒で完了</span>
          </div>
          <div className="flex items-center gap-1">
            <Gift className="w-3.5 h-3.5 text-pink-500" />
            <span>完全無料</span>
          </div>
          <div className="flex items-center gap-1">
            <FileText className="w-3.5 h-3.5 text-blue-500" />
            <span>登録不要</span>
          </div>
        </div>
      </div>
    </div>
  );
}
