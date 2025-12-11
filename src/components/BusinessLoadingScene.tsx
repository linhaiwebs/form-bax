import BusinessCircularLogoAnimation from './BusinessCircularLogoAnimation';
import BusinessDataCard from './BusinessDataCard';

interface BusinessLoadingSceneProps {
  isVisible: boolean;
}

export default function BusinessLoadingScene({ isVisible }: BusinessLoadingSceneProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full relative flex flex-col items-center justify-center py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/50 z-0" />

      <div className="relative z-10 flex flex-col items-center space-y-8">
        <div className="relative">
          <BusinessCircularLogoAnimation />
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-sans font-semibold tracking-tight text-sky-600 animate-soft-pulse">
            Running Fast Analysis
          </h2>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-2 h-2 bg-sky-500 rounded-full animate-soft-pulse" />
            <p className="text-xl text-mint-600 font-sans font-normal tracking-wide">
              Completing in seconds
            </p>
            <div className="w-2 h-2 bg-mint-500 rounded-full animate-soft-pulse" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl px-4">
          <BusinessDataCard label="Market Data" value="Analyzing..." color="blue" />
          <BusinessDataCard label="AI Analysis" value="Processing..." color="mint" />
          <BusinessDataCard label="Forecast Model" value="Calculating..." color="green" />
        </div>

        <div className="mt-8 text-center max-w-2xl px-4">
          <div className="relative p-4 rounded-xl border-2 backdrop-blur-xl shadow-soft" style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderColor: 'rgba(96, 165, 250, 0.2)',
          }}>
            <p className="text-xs leading-relaxed text-text-muted font-sans">
              All data uses publicly available market information and analysis is based on public market data.
              This analysis uses the latest AI technology to comprehensively evaluate financial metrics, industry trends, and market trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
