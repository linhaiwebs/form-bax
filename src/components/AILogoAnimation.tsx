export default function AILogoAnimation() {
  const stockTerms = [
    'PER',
    'PBR',
    '配当利回り',
    '時価総額',
    'ROE',
    'EPS',
    '自己資本比率',
    '売上高',
  ];

  return (
    <div className="relative w-full max-w-[400px] h-[400px] mx-auto flex items-center justify-center">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute w-[320px] h-[320px] rounded-full border-2 border-white/30 animate-spin-slow-reverse"
          style={{
            animationDuration: '20s',
          }}
        />

        <div
          className="absolute w-[240px] h-[240px] rounded-full border-4 border-white/50 animate-spin-medium"
          style={{
            animationDuration: '12s',
          }}
        >
          {stockTerms.map((term, index) => {
            const angle = (index / stockTerms.length) * 360;
            const radius = 120;
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            return (
              <div
                key={index}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  transform: `translate(${x}px, ${y}px) translate(-50%, -50%) rotate(-${angle}deg)`,
                }}
              >
                <div className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/80 whitespace-nowrap">
                  <span className="text-xs font-semibold text-white">{term}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="absolute w-[160px] h-[160px] rounded-full border-[6px] border-white/70 animate-spin-fast-pulse"
          style={{
            animationDuration: '6s',
          }}
        />

        <div className="relative z-20 w-32 h-32 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500 flex items-center justify-center shadow-2xl">
          <div
            className="text-6xl font-black select-none"
            style={{
              fontFamily: 'Arial Black, sans-serif',
              fontWeight: 900,
              fontStyle: 'italic',
              transform: 'skewX(-10deg)',
              background: 'linear-gradient(135deg, #1a1a1a 0%, #4a4a4a 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
            }}
          >
            AI
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin-slow-reverse {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }

        @keyframes spin-medium {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes spin-fast-pulse {
          0% {
            transform: rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) scale(1.05);
          }
          50% {
            transform: rotate(180deg) scale(1);
          }
          75% {
            transform: rotate(270deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        .animate-spin-slow-reverse {
          animation: spin-slow-reverse linear infinite;
        }

        .animate-spin-medium {
          animation: spin-medium ease-in-out infinite;
        }

        .animate-spin-fast-pulse {
          animation: spin-fast-pulse linear infinite;
        }
      `}</style>
    </div>
  );
}
