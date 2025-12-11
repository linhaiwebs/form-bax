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
      <div className="relative mt-6">
        <button
          onClick={handleClick}
          disabled={disabled}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={() => setIsHovered(false)}
          className="relative w-full font-bold py-4 px-8 rounded-lg transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: disabled
              ? '#9ca3af'
              : '#1a56db',
            height: '56px',
            border: 'none',
            boxShadow: disabled
              ? '0 2px 8px rgba(0, 0, 0, 0.1)'
              : isHovered
                ? '0 8px 24px rgba(26, 86, 219, 0.4)'
                : '0 4px 12px rgba(26, 86, 219, 0.3)',
            color: '#ffffff',
            transform: isHovered && !disabled ? 'translateY(-2px)' : 'translateY(0)',
            fontFamily: 'Noto Sans JP, sans-serif',
          }}
        >
          <span className="relative text-lg tracking-wide">
            今すぐ診断
          </span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs leading-relaxed text-gray-600" style={{ fontFamily: 'Noto Sans JP, sans-serif' }}>
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
