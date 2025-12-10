import { useEffect, useState } from 'react';
import HolographicBackground from './HolographicBackground';
import HolographicLogo from './HolographicLogo';
import HolographicProgressBar from './HolographicProgressBar';
import HolographicLabel from './HolographicLabel';

interface DiagnosisLoadingOverlayProps {
  isVisible: boolean;
  progress: number;
  onComplete?: () => void;
}

export default function DiagnosisLoadingOverlay({
  isVisible,
  progress,
  onComplete
}: DiagnosisLoadingOverlayProps) {
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
      <HolographicBackground />

      <div
        className={`relative z-10 w-full max-w-2xl transition-all duration-500 ${
          isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={{
          animation: isExiting ? 'hologram-dissipate 1s ease-out forwards' : 'none',
        }}
      >
        <div className="relative p-8 md:p-12">
          <div className="flex justify-center mb-8">
            <HolographicLogo />
          </div>

          <HolographicLabel className="mb-8 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-white mb-3 text-center">AI分析を実行中</h3>
            <p className="text-base text-center text-cyan-300">
              市場データを深度分析しています...
            </p>
          </HolographicLabel>

          <div className="mb-6">
            <HolographicProgressBar progress={progress} stage={currentStage} />
          </div>

          <div className="mb-6 text-center">
            <span className="text-2xl font-bold" style={{ color: '#00D9FF', textShadow: '0 0 10px rgba(0, 217, 255, 0.8)' }}>
              {Math.floor(Math.min(progress, 100))}%
            </span>
          </div>

          <HolographicLabel className="rounded-lg p-6">
            <div className="space-y-4 text-sm">
              <p className="text-white font-semibold text-center text-lg">
                {stageLabels[currentStage]}
              </p>
              <p className="text-center text-cyan-200">
                しばらくお待ちください
              </p>
              <div className="pt-4 border-t border-cyan-500/30">
                <p className="text-xs text-gray-300 text-center leading-relaxed">
                  すべてのデータは公開されている市場情報を使用しており、公開市場データに基づいて分析を行っています。本分析は最新のAI技術により、財務指標、業界動向、市場トレンドを総合的に評価しています。
                </p>
              </div>
            </div>
          </HolographicLabel>
        </div>
      </div>

      <style>{`
        @keyframes hologram-dissipate {
          0% {
            transform: scale(1);
            opacity: 1;
            filter: blur(0px);
          }
          50% {
            transform: scale(1.05);
            opacity: 0.5;
            filter: blur(2px);
          }
          100% {
            transform: scale(1.2);
            opacity: 0;
            filter: blur(10px);
          }
        }

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
