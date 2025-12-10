import { ReactNode } from 'react';

interface CyberpunkDataLabelProps {
  label: string;
  value: ReactNode;
  color?: 'cyan' | 'pink' | 'yellow' | 'purple';
  glitch?: boolean;
}

export default function CyberpunkDataLabel({
  label,
  value,
  color = 'cyan',
  glitch = false,
}: CyberpunkDataLabelProps) {
  const colorClasses = {
    cyan: 'text-cyber-cyan border-cyber-cyan shadow-neon-cyan',
    pink: 'text-neon-pink border-neon-pink shadow-neon-pink',
    yellow: 'text-electric-yellow border-electric-yellow shadow-neon-yellow',
    purple: 'text-neon-purple border-neon-purple shadow-neon-purple',
  };

  const shadowColors = {
    cyan: '#00F0FF',
    pink: '#FF006E',
    yellow: '#FFE700',
    purple: '#B026FF',
  };

  return (
    <div className="relative group">
      <div
        className={`
          relative px-4 py-3
          border-2 rounded-md
          bg-void-black/60 backdrop-blur-sm
          ${colorClasses[color]}
          ${glitch ? 'animate-glitch-loop' : 'animate-neon-pulse'}
          transition-all duration-300
          hover:scale-105
        `}
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l" style={{ borderColor: shadowColors[color] }} />
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r" style={{ borderColor: shadowColors[color] }} />
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l" style={{ borderColor: shadowColors[color] }} />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r" style={{ borderColor: shadowColors[color] }} />

        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${shadowColors[color]}20 50%, transparent 100%)`,
              animation: 'data-flow 3s linear infinite',
            }}
          />

          <div className="relative z-10">
            <div className="text-xs font-cyber-mono uppercase tracking-wider opacity-70 mb-1">
              {label}
            </div>
            <div
              className="text-lg font-cyber font-bold"
              style={{
                textShadow: `
                  0 0 10px ${shadowColors[color]}80,
                  2px 0 0 ${shadowColors[color]}40,
                  -2px 0 0 ${shadowColors[color]}40
                `,
              }}
            >
              {value}
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{
            background: `radial-gradient(circle at center, ${shadowColors[color]}10, transparent 70%)`,
          }}
        />
      </div>

      <div
        className="absolute -inset-1 blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 -z-10"
        style={{
          background: `linear-gradient(135deg, ${shadowColors[color]}, transparent)`,
        }}
      />
    </div>
  );
}
