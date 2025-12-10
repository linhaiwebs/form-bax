interface InlineLoadingSceneProps {
  isVisible: boolean;
}

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full animate-fadeIn relative flex flex-col items-center justify-center py-20">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(to bottom, rgba(0, 17, 34, 0.3), rgba(0, 5, 16, 0.3))',
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8 w-32 h-32">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter id="inlineGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient id="ringGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00D9FF" />
                <stop offset="100%" stopColor="#0066FF" />
              </linearGradient>

              <linearGradient id="ringGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#B583FF" />
                <stop offset="100%" stopColor="#7C3AED" />
              </linearGradient>
            </defs>

            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="url(#ringGradient1)"
              strokeWidth="2"
              filter="url(#inlineGlow)"
              opacity="0.6"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 60 60"
                to="360 60 60"
                dur="2s"
                repeatCount="indefinite"
              />
            </circle>

            <circle
              cx="60"
              cy="60"
              r="35"
              fill="none"
              stroke="url(#ringGradient2)"
              strokeWidth="2"
              filter="url(#inlineGlow)"
              opacity="0.6"
            >
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="360 60 60"
                to="0 60 60"
                dur="1.5s"
                repeatCount="indefinite"
              />
            </circle>

            <path
              d="M 60 30 Q 75 35, 80 50 Q 82 60, 80 70 Q 75 85, 60 90 Q 45 85, 40 70 Q 38 60, 40 50 Q 45 35, 60 30 Z"
              fill="none"
              stroke="rgba(0, 217, 255, 0.8)"
              strokeWidth="1.5"
              filter="url(#inlineGlow)"
            />

            <rect x="50" y="50" width="20" height="20" fill="none" stroke="rgba(181, 131, 255, 0.6)" strokeWidth="1" />
            <line x1="50" y1="55" x2="70" y2="55" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="0.5" />
            <line x1="50" y1="60" x2="70" y2="60" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="0.5" />
            <line x1="50" y1="65" x2="70" y2="65" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="0.5" />
            <line x1="55" y1="50" x2="55" y2="70" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="0.5" />
            <line x1="60" y1="50" x2="60" y2="70" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="0.5" />
            <line x1="65" y1="50" x2="65" y2="70" stroke="rgba(181, 131, 255, 0.4)" strokeWidth="0.5" />

            <circle cx="60" cy="60" r="3" fill="#00D9FF" filter="url(#inlineGlow)">
              <animate attributeName="opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" />
            </circle>
          </svg>

          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 217, 255, 0.1), transparent 70%)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }}
          />
        </div>

        <div className="text-center mb-6">
          <h2
            className="text-2xl md:text-3xl font-bold mb-2"
            style={{
              color: '#00D9FF',
              textShadow: '0 0 10px rgba(0, 217, 255, 0.6)',
            }}
          >
            AI正在分析報告
          </h2>
          <p className="text-sm md:text-base text-cyan-300">
            数秒お待ちください...
          </p>
        </div>

        <div className="mt-4 text-center max-w-md">
          <p className="text-xs leading-relaxed text-gray-400">
            すべてのデータは公開されている市場情報を使用しており、
            <br className="hidden sm:inline" />
            公開市場データに基づいて分析を行っています
          </p>
        </div>
      </div>

      <style>{`
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}
