import { ReactNode } from 'react';

interface BusinessDataCardProps {
  label: string;
  value: ReactNode;
  color?: 'blue' | 'mint' | 'green' | 'red';
}

export default function BusinessDataCard({
  label,
  value,
  color = 'blue',
}: BusinessDataCardProps) {
  const colorStyles = {
    blue: {
      bg: 'rgba(96, 165, 250, 0.1)',
      border: 'rgba(96, 165, 250, 0.3)',
      text: '#60A5FA',
    },
    mint: {
      bg: 'rgba(110, 231, 183, 0.1)',
      border: 'rgba(110, 231, 183, 0.3)',
      text: '#6EE7B7',
    },
    green: {
      bg: 'rgba(16, 185, 129, 0.1)',
      border: 'rgba(16, 185, 129, 0.3)',
      text: '#10B981',
    },
    red: {
      bg: 'rgba(220, 38, 38, 0.1)',
      border: 'rgba(220, 38, 38, 0.3)',
      text: '#DC2626',
    },
  };

  const style = colorStyles[color];

  return (
    <div className="relative group">
      <div
        className="relative px-5 py-4 border-2 rounded-xl backdrop-blur-xl transition-all duration-300 shadow-soft animate-soft-pulse"
        style={{
          background: 'rgba(255, 255, 255, 0.75)',
          borderColor: style.border,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg) rotateY(3deg) translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.06)';
        }}
      >
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10 rounded-xl"
            style={{
              background: `linear-gradient(90deg, transparent 0%, ${style.bg} 50%, transparent 100%)`,
              backgroundSize: '200% 100%',
              animation: 'shimmer 3s linear infinite',
            }}
          />

          <div className="relative z-10">
            <div className="text-xs font-body uppercase tracking-wider text-text-muted mb-1">
              {label}
            </div>
            <div className="text-lg font-display font-bold" style={{ color: style.text }}>
              {value}
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl"
          style={{
            background: `radial-gradient(circle at center, ${style.bg}, transparent 70%)`,
          }}
        />
      </div>
    </div>
  );
}
