interface ModernPromptBoxProps {
  stockName?: string;
  stockCode?: string;
}

export default function ModernPromptBox({ stockName, stockCode }: ModernPromptBoxProps) {
  return (
    <div className="animate-fadeIn" style={{ animationDelay: '0.2s' }}>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4 border border-white/20">
        {stockName && stockCode ? (
          <p className="text-sm md:text-base text-gray-200 text-center leading-relaxed">
            <span className="text-modern-purple-300 font-semibold text-base md:text-lg block mb-1">
              {stockName} ({stockCode})
            </span>
            Analysis ready
            <br />
            Click the button below to receive your AI report
          </p>
        ) : (
          <p className="text-sm md:text-base text-gray-200 text-center leading-relaxed">
            Enter a stock ticker and AI will analyze
            <span className="text-white font-semibold"> metrics</span>,
            <span className="text-white font-semibold"> data</span>, and
            <span className="text-white font-semibold"> trends</span>,
            delivering complete results in seconds
          </p>
        )}
      </div>
    </div>
  );
}
