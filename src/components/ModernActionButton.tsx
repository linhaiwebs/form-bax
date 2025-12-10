import { useState } from 'react';
import { soundEffects } from '../lib/soundEffects';

interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    soundEffects.click();
    soundEffects.dataLoad();
    onClick();
  };

  const handleMouseEnter = () => {
    if (!disabled) {
      soundEffects.hover();
      setIsHovered(true);
    }
  };

  return (
    <>
      <div className="relative animate-fadeIn mt-6 group" style={{ animationDelay: '0.3s' }}>
        <div className="absolute -inset-1 bg-gradient-to-r from-cyber-cyan via-neon-pink to-electric-yellow rounded-lg blur-lg opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200 animate-neon-pulse" />

        <button
          onClick={handleClick}
          disabled={disabled}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}
          className={`relative w-full font-cyber font-bold py-4 px-6 transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden`}
          style={{
            background: disabled
              ? 'linear-gradient(135deg, rgba(75, 85, 99, 0.8) 0%, rgba(55, 65, 81, 0.8) 100%)'
              : 'linear-gradient(135deg, rgba(10, 0, 21, 0.9) 0%, rgba(26, 0, 51, 0.9) 100%)',
            height: '60px',
            border: disabled ? 'none' : '3px solid #00F0FF',
            boxShadow: disabled
              ? 'none'
              : '0 0 20px rgba(0, 240, 255, 0.5), inset 0 0 20px rgba(0, 240, 255, 0.1)',
            clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)',
            color: disabled ? '#94a3b8' : '#00F0FF',
            textShadow: disabled ? 'none' : '0 0 10px rgba(0, 240, 255, 0.8), 2px 0 0 rgba(255, 0, 110, 0.5), -2px 0 0 rgba(176, 38, 255, 0.5)',
            transform: isHovered && !disabled ? 'scale(1.02)' : 'scale(1)',
          }}
        >
          <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-cyber-cyan animate-neon-pulse" />
          <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-neon-pink animate-neon-pulse" style={{ animationDelay: '0.3s' }} />
          <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-electric-yellow animate-neon-pulse" style={{ animationDelay: '0.6s' }} />
          <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-neon-purple animate-neon-pulse" style={{ animationDelay: '0.9s' }} />

          {!disabled && (
            <>
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent)',
                  animation: 'data-flow 3s linear infinite',
                }}
              />

              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="absolute h-px bg-cyber-cyan"
                  style={{
                    top: `${30 + i * 20}%`,
                    left: '-100%',
                    width: '30%',
                    boxShadow: '0 0 5px #00F0FF',
                    animation: `data-flow ${2 + i * 0.5}s linear infinite`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </>
          )}

          <span className="relative text-xl tracking-widest uppercase font-cyber">
            診断を開始する
          </span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs leading-relaxed font-cyber-sans" style={{ color: '#94a3b8' }}>
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
