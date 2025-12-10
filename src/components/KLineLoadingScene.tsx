import DigitalRain from './DigitalRain';
import CyberpunkLogoAnimation from './CyberpunkLogoAnimation';
import KLineTickerDisplay from './KLineTickerDisplay';

interface KLineLoadingSceneProps {
  isVisible: boolean;
}

export default function KLineLoadingScene({ isVisible }: KLineLoadingSceneProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full relative flex flex-col items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <DigitalRain />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-void-black/50 via-transparent to-void-black/50 z-0" />

      <div className="relative z-10 flex flex-col items-center space-y-8">
        <div className="relative">
          <CyberpunkLogoAnimation />
          <div className="absolute inset-0 bg-cyber-cyan/20 blur-3xl animate-pulse-glow" />
        </div>

        <div className="text-center space-y-4">
          <h2
            className="text-4xl md:text-5xl font-cyber font-bold tracking-tight animate-glitch-loop"
            style={{
              color: '#00F0FF',
              textShadow: '0 0 10px rgba(0, 240, 255, 0.8), 0 0 20px rgba(0, 240, 255, 0.6), 2px 0 0 rgba(255, 0, 110, 0.4), -2px 0 0 rgba(176, 38, 255, 0.4)',
            }}
          >
            AI市場分析中
          </h2>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-2 h-2 bg-cyber-cyan shadow-neon-cyan animate-neon-pulse" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            <p className="text-xl text-cyber-cyan font-cyber-sans font-semibold tracking-wider">
              リアルタイムデータ処理中
            </p>
            <div className="w-2 h-2 bg-neon-pink shadow-neon-pink animate-neon-pulse" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', animationDelay: '0.5s' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl px-4">
          <KLineTickerDisplay label="市場データ" />
          <KLineTickerDisplay label="AI分析" />
          <KLineTickerDisplay label="予測モデル" />
        </div>

        <div className="mt-8 text-center max-w-2xl px-4">
          <div className="relative p-4 rounded-lg border border-cyber-cyan/30 bg-void-black/80 backdrop-blur-xl shadow-neon-cyan">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan" />
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-neon-pink" />
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-electric-yellow" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-neon-purple" />

            <p className="text-xs leading-relaxed text-gray-300 font-cyber-sans">
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
