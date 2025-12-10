import { ReactNode, useEffect, useState } from 'react';

interface HolographicLabelProps {
  children: ReactNode;
  className?: string;
}

export default function HolographicLabel({ children, className = '' }: HolographicLabelProps) {
  const [hexCode, setHexCode] = useState('');

  useEffect(() => {
    const generateHexCode = () => {
      const chars = '0123456789ABCDEF';
      let code = '';
      for (let i = 0; i < 40; i++) {
        code += chars[Math.floor(Math.random() * chars.length)];
      }
      return code;
    };

    setHexCode(generateHexCode());

    const interval = setInterval(() => {
      setHexCode(generateHexCode());
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: 'rgba(0, 20, 40, 0.4)',
        border: '2px solid rgba(0, 217, 255, 0.5)',
        boxShadow: '0 0 20px rgba(0, 217, 255, 0.3), inset 0 0 20px rgba(0, 217, 255, 0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div
        className="absolute inset-0 opacity-10 text-xs font-mono overflow-hidden whitespace-nowrap"
        style={{
          color: '#00D9FF',
          lineHeight: '1.5',
          animation: 'scroll-code 5s linear infinite',
        }}
      >
        {hexCode}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(0, 217, 255, 0.2) 50%, transparent 100%)',
          animation: 'scan-overlay 3s ease-in-out infinite',
        }}
      />

      <div className="relative z-10" style={{ animation: 'flicker 7s ease-in-out infinite' }}>
        {children}
      </div>

      <style>{`
        @keyframes scroll-code {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes scan-overlay {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }

        @keyframes flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.95; }
          85% { opacity: 1; }
          87% { opacity: 0.9; }
          89% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
