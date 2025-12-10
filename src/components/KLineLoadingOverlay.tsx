import { useEffect, useState } from 'react';
import KLineBackground from './KLineBackground';
import KLineLogoAnimation from './KLineLogoAnimation';
import KLineProgressBar from './KLineProgressBar';
import KLineTickerDisplay from './KLineTickerDisplay';

interface KLineLoadingOverlayProps {
  isVisible: boolean;
  progress: number;
  onComplete?: () => void;
}

export default function KLineLoadingOverlay({
  isVisible,
  progress,
  onComplete
}: KLineLoadingOverlayProps) {
  const [isExiting, setIsExiting] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (progress < 33) {
      setCurrentStage(0);
    } else if (progress < 66) {
      setCurrentStage(1);
    } else {
      setCurrentStage(2);
    }
  }, [progress]);

  useEffect(() => {
    if (progress >= 100 && isVisible) {
      setIsExiting(true);
      const timer = setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 1000);
      return () => clearTimeout(timer);
    } else if (!isVisible) {
      setIsExiting(false);
    }
  }, [progress, isVisible, onComplete]);

  useEffect(() => {
    if (isVisible) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      document.body.setAttribute('data-modal-open', 'true');

      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        document.body.removeAttribute('data-modal-open');
        window.scrollTo(0, scrollY);
      };
    }
  }, [isVisible]);

  if (!isVisible && !isExiting) return null;

  const stageLabels = [
    'データ収集中',
    'AI分析中',
    'レポート生成中'
  ];

  return (
    <div
      className={`fixed inset-0 z-[9997] flex items-center justify-center p-4 transition-opacity duration-500 ${
        isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ touchAction: 'none' }}
    >
      <KLineBackground />

      <div
        className={`relative z-10 w-full max-w-3xl transition-all duration-500 ${
          isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="relative p-8 md:p-12 space-y-8">
          <div className="flex justify-center">
            <KLineLogoAnimation />
          </div>

          <div
            className="rounded-xl p-6 border-2"
            style={{
              background: 'rgba(10, 14, 20, 0.9)',
              borderColor: 'rgba(34, 197, 94, 0.4)',
              boxShadow: '0 0 30px rgba(34, 197, 94, 0.2)'
            }}
          >
            <h3 className="text-3xl font-bold text-white mb-3 text-center">
              AI分析を実行中
            </h3>
            <p className="text-lg text-center text-green-400 font-medium">
              市場データを深度分析しています...
            </p>
          </div>

          <div className="space-y-6">
            <KLineProgressBar progress={progress} stage={currentStage} />

            <div className="text-center">
              <span
                className="text-5xl font-bold font-mono tabular-nums"
                style={{
                  color: currentStage === 0 ? '#22c55e' : currentStage === 1 ? '#3b82f6' : '#ef4444',
                  textShadow: '0 0 20px rgba(34, 197, 94, 0.8)'
                }}
              >
                {Math.floor(Math.min(progress, 100))}%
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <KLineTickerDisplay label="処理速度" isAnimating={progress < 100} />
              <KLineTickerDisplay label="分析精度" isAnimating={progress < 100} />
              <KLineTickerDisplay label="データ量" isAnimating={progress < 100} />
            </div>
          </div>

          <div
            className="rounded-lg p-6 border"
            style={{
              background: 'rgba(10, 14, 20, 0.9)',
              borderColor: 'rgba(59, 130, 246, 0.3)'
            }}
          >
            <p className="text-white font-semibold text-center text-xl mb-4">
              {stageLabels[currentStage]}
            </p>
            <p className="text-center text-gray-300 mb-4">
              しばらくお待ちください
            </p>
            <div className="pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 text-center leading-relaxed">
                すべてのデータは公開されている市場情報を使用しており、公開市場データに基づいて分析を行っています。
                本分析は最新のAI技術により、財務指標、業界動向、市場トレンドを総合的に評価しています。
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
}
