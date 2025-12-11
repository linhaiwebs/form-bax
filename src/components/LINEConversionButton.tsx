import { MessageCircle, TrendingUp } from 'lucide-react';

interface LINEConversionButtonProps {
  onClick: () => void;
}

export default function LINEConversionButton({ onClick }: LINEConversionButtonProps) {
  return (
    <div className="bg-white py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onClick}
          className="w-full bg-gradient-to-r from-line-green to-line-green-dark hover:from-line-green-dark hover:to-line-green text-white font-bold py-5 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl flex flex-col items-center justify-center gap-3"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-8 h-8" />
            <span className="text-xl">LINE追加</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>今すぐ無料で分析レポートを入手</span>
          </div>
        </button>
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-500">
            ※LINEアプリまたはLINE公式サイトへ移動します
          </p>
        </div>
      </div>
    </div>
  );
}
