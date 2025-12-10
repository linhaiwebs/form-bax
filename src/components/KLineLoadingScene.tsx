import KLineBackground from './KLineBackground';
import KLineLogoAnimation from './KLineLogoAnimation';
import KLineTickerDisplay from './KLineTickerDisplay';

interface KLineLoadingSceneProps {
  isVisible: boolean;
}

export default function KLineLoadingScene({ isVisible }: KLineLoadingSceneProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full relative flex flex-col items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <KLineBackground />
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-8">
        <KLineLogoAnimation />

        <div className="text-center space-y-4">
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              color: '#22c55e',
              textShadow: '0 0 20px rgba(34, 197, 94, 0.6), 0 0 40px rgba(34, 197, 94, 0.3)'
            }}
          >
            AI市場分析中
          </h2>
          <p className="text-lg text-gray-300 font-medium">
            リアルタイムデータを処理しています...
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl px-4">
          <KLineTickerDisplay label="市場データ" />
          <KLineTickerDisplay label="AI分析" />
          <KLineTickerDisplay label="予測モデル" />
        </div>

        <div className="mt-8 text-center max-w-2xl px-4">
          <div
            className="p-4 rounded-lg border"
            style={{
              background: 'rgba(10, 14, 20, 0.8)',
              borderColor: 'rgba(59, 130, 246, 0.3)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <p className="text-xs leading-relaxed text-gray-400">
              すべてのデータは公開されている市場情報を使用しており、
              公開市場データに基づいて分析を行っています。
              本分析は最新のAI技術により、財務指標、業界動向、市場トレンドを総合的に評価しています。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
