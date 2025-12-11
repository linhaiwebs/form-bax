import { useState } from 'react';

interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onClick();
  };

  const handleMouseEnter = () => {
    if (!disabled) {
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
          className="relative w-full font-sans font-semibold py-4 px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 overflow-hidden animate-wave-flow"
          style={{
            background: disabled
              ? 'linear-gradient(135deg, rgba(4, 47, 82, 0.5) 0%, rgba(6, 62, 110, 0.3) 100%)'
              : 'linear-gradient(135deg, #4DFFDC 0%, #00E6C3 50%, #008071 100%)',
            height: '64px',
            border: 'none',
            boxShadow: disabled
              ? '0 4px 16px rgba(0, 0, 0, 0.3)'
              : isHovered
                ? '0 0 50px rgba(0, 230, 195, 0.8), 0 0 100px rgba(77, 255, 220, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)'
                : '0 8px 32px rgba(0, 16, 26, 0.6), 0 0 30px rgba(0, 230, 195, 0.4), inset 0 1px 0 rgba(179, 255, 240, 0.3)',
            color: disabled ? '#063E6E' : '#00101A',
            transform: isHovered && !disabled ? 'perspective(1000px) rotateX(2deg) rotateY(3deg) translateY(-4px)' : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
          }}
        >
          {!disabled && (
            <div
              className="absolute inset-0 opacity-40 rounded-xl animate-wave-crest-move"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(179, 255, 240, 0.8) 50%, transparent 100%)',
                backgroundSize: '200% 100%',
              }}
            />
          )}

          <span className="relative text-base tracking-wide font-sans">
            今すぐ診断
          </span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs leading-relaxed font-sans" style={{ color: '#80D4FF' }}>
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
