interface ModernActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export default function ModernActionButton({ onClick, disabled = false }: ModernActionButtonProps) {
  return (
    <>
      <div className="mt-6 relative">
        <button
          onClick={onClick}
          disabled={disabled}
          className="relative w-full font-bold py-5 px-8 rounded-xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 text-white text-lg shadow-lg hover:shadow-xl bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Start Free AI Analysis</span>
          </div>
        </button>
        <div className="absolute -top-2 -right-2 bg-white text-blue-600 text-sm font-bold px-4 py-1.5 rounded-full shadow-lg transform rotate-12 border-2 border-blue-600">
          FREE
        </div>
      </div>
      <div className="mt-3 text-center">
        <p className="text-xs leading-relaxed text-gray-500">
          * This analysis is not investment advice. All investment decisions are your responsibility.
        </p>
      </div>
    </>
  );
}
