interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <div className="relative animate-fadeIn mt-6" style={{ animationDelay: '0.3s' }}>
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full text-white font-bold py-4 px-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
          style={{
            background: disabled
              ? 'linear-gradient(135deg, #D1D5DB 0%, #9CA3AF 100%)'
              : 'linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #10B981 100%)',
            height: '56px'
          }}
        >
          <span className="text-lg">診断を開始する</span>
        </button>
      </div>
      <div className="mt-4 text-center">
        <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
