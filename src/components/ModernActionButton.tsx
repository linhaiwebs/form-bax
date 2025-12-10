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
          className="relative w-full font-display font-bold py-4 px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden shadow-gradient-glow"
          style={{
            background: disabled
              ? 'linear-gradient(135deg, rgba(156, 163, 175, 0.3) 0%, rgba(107, 114, 128, 0.3) 100%)'
              : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)',
            height: '64px',
            border: disabled ? '2px solid rgba(156, 163, 175, 0.3)' : '2px solid rgba(96, 165, 250, 0.4)',
            boxShadow: disabled
              ? '0 4px 16px rgba(0, 0, 0, 0.04)'
              : isHovered
                ? '0 8px 32px rgba(96, 165, 250, 0.20), 0 12px 64px rgba(110, 231, 183, 0.15)'
                : '0 4px 24px rgba(96, 165, 250, 0.15), 0 8px 48px rgba(110, 231, 183, 0.10)',
            color: disabled ? '#9CA3AF' : 'transparent',
            backgroundClip: disabled ? 'unset' : 'text',
            WebkitBackgroundClip: disabled ? 'unset' : 'text',
            WebkitTextFillColor: disabled ? '#9CA3AF' : 'transparent',
            backgroundImage: disabled ? 'none' : 'linear-gradient(135deg, #60A5FA 0%, #4ADE80 50%, #6EE7B7 100%)',
            transform: isHovered && !disabled ? 'perspective(1000px) rotateX(2deg) rotateY(3deg) translateY(-4px)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
          }}
        >
          {!disabled && (
            <div
              className="absolute inset-0 opacity-20 rounded-xl"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(96, 165, 250, 0.4) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 3s ease-in-out infinite',
              }}
            />
          )}

          <span className="relative text-lg tracking-wide font-display">
            診断を開始する
          </span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs leading-relaxed font-body text-text-muted">
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
