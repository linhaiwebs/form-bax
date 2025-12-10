interface HolographicProgressBarProps {
  progress: number;
  stage: number;
}

export default function HolographicProgressBar({ progress, stage }: HolographicProgressBarProps) {
  const stageColors = [
    { main: '#00D9FF', glow: 'rgba(0, 217, 255, 0.6)', shadow: '0 0 20px rgba(0, 217, 255, 0.8), 0 0 40px rgba(0, 217, 255, 0.4), 0 0 60px rgba(0, 217, 255, 0.2)' },
    { main: '#B583FF', glow: 'rgba(181, 131, 255, 0.6)', shadow: '0 0 20px rgba(181, 131, 255, 0.8), 0 0 40px rgba(181, 131, 255, 0.4), 0 0 60px rgba(181, 131, 255, 0.2)' },
    { main: '#FF9500', glow: 'rgba(255, 149, 0, 0.6)', shadow: '0 0 20px rgba(255, 149, 0, 0.8), 0 0 40px rgba(255, 149, 0, 0.4), 0 0 60px rgba(255, 149, 0, 0.2)' },
  ];

  const currentColor = stageColors[stage % 3];

  return (
    <div className="w-full relative">
      <div
        className="relative h-8 overflow-hidden rounded-lg"
        style={{
          background: 'rgba(0, 20, 40, 0.6)',
          border: `2px solid ${currentColor.glow}`,
          transform: 'perspective(500px) rotateX(2deg)',
          boxShadow: `inset 0 0 20px rgba(0, 0, 0, 0.5)`,
        }}
      >
        <div
          className="absolute inset-0 transition-all duration-300 ease-out"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: `linear-gradient(90deg, ${currentColor.main}, ${currentColor.glow})`,
            boxShadow: currentColor.shadow,
          }}
        >
          <div
            className="absolute inset-0 opacity-50"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255, 255, 255, 0.1) 2px, rgba(255, 255, 255, 0.1) 4px)',
              animation: 'scanline-move 1s linear infinite',
            }}
          />

          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(90deg, transparent, ${currentColor.glow}, transparent)`,
              animation: 'shimmer 2s linear infinite',
            }}
          />

          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                left: `${(i / 8) * 100}%`,
                top: '50%',
                transform: 'translateY(-50%)',
                background: currentColor.main,
                boxShadow: `0 0 10px ${currentColor.main}`,
                animation: `particle-flow 1.5s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0, 217, 255, 0.05) 1px, rgba(0, 217, 255, 0.05) 2px)',
            animation: 'vertical-scan 3s linear infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes scanline-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes particle-flow {
          0% { transform: translateY(-50%) translateX(-20px); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-50%) translateX(20px); opacity: 0; }
        }

        @keyframes vertical-scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(2px); }
        }
      `}</style>
    </div>
  );
}
