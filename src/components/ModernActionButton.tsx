interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <div className="mt-6">
        <button
          onClick={onClick}
          disabled={disabled}
          className="w-full font-bold py-5 px-8 rounded-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 text-white text-lg shadow-lg hover:shadow-xl bg-gradient-to-r from-brand-blue to-brand-blue-dark hover:from-brand-blue-dark hover:to-brand-blue"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>30秒で無料AI分析開始</span>
          </div>
        </button>
      </div>
      <div className="mt-3 text-center">
        <p className="text-xs leading-relaxed text-gray-500">
          ※本診断は投資助言ではありません。投資判断は自己責任でお願いいたします。
        </p>
      </div>
    </>
  );
}
