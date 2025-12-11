import { MessageCircle, TrendingUp } from 'lucide-react';

interface LINEConversionButtonProps {
  onClick: () => void;
}

export default function LINEConversionButton({ onClick }: LINEConversionButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white py-4 px-4 shadow-lg border-t border-gray-200 z-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onClick}
          style={{
            background: 'linear-gradient(to right, #06C755, #05B04B)',
          }}
          className="w-full text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center gap-2 hover:brightness-110"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-7 h-7" />
            <span className="text-lg">LINE追加</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="w-4 h-4" />
            <span>今すぐ無料で分析レポートを入手</span>
          </div>
        </button>
      </div>
    </div>
  );
}
