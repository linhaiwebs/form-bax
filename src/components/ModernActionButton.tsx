interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <style>{`
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(34, 197, 94, 0.4), 0 0 40px rgba(34, 197, 94, 0.2), 0 4px 12px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.3), 0 4px 12px rgba(0, 0, 0, 0.3);
          }
        }
        .pulse-glow-animation {
          animation: pulse-glow 2s ease-in-out infinite;
        }
      `}</style>
      <div className="relative animate-fadeIn mt-6" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={onClick}
          disabled={disabled}
          className={`w-full text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 ${!disabled ? 'pulse-glow-animation' : ''}`}
          style={{
            background: disabled
              ? 'linear-gradient(135deg, #4B5563 0%, #374151 100%)'
              : 'linear-gradient(135deg, #22c55e 0%, #16a34a 50%, #15803d 100%)',
            height: '60px',
            border: disabled ? 'none' : '2px solid rgba(34, 197, 94, 0.4)',
            boxShadow: disabled ? 'none' : undefined,
          }}
        >
          <span className="text-xl tracking-wide uppercase">診断を開始する</span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
