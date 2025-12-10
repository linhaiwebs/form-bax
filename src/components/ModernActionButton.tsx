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
      <div className="relative animate-fadeIn mt-6" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={handleClick}
          disabled={disabled}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full font-display font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden"
          style={{
            background: disabled
              ? 'linear-gradient(135deg, rgba(139, 115, 85, 0.5) 0%, rgba(139, 115, 85, 0.3) 100%)'
              : 'linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)',
            height: '64px',
            border: 'none',
            boxShadow: disabled
              ? '0 4px 16px rgba(0, 0, 0, 0.3)'
              : isHovered
                ? '0 0 40px rgba(212, 175, 55, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                : '0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
            color: disabled ? '#8B7355' : '#1A1A1A',
            transform: isHovered && !disabled ? 'perspective(1000px) rotateX(2deg) rotateY(3deg) translateY(-4px)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
          }}
        >
          {!disabled && (
            <div
              className="absolute inset-0 opacity-30 rounded-xl"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.6) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'metallic-shine 3s ease-in-out infinite',
              }}
            />
          )}

          <span className="relative text-lg tracking-wide font-display">
            診断を開始する
          </span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs leading-relaxed font-body" style={{ color: '#8B7355' }}>
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
