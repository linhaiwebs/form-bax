import AIRobotLogo from './AIRobotLogo';

export default function ModernHeader() {
  return (
    <div className="text-center animate-fadeIn relative -mt-12 md:-mt-16">
      <div className="relative z-20">
        <AIRobotLogo />
      </div>

      <div className="relative -mt-24 z-30">
        <div className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-sm font-bold px-4 py-2 rounded-full mb-3 shadow-lg animate-pulse">
          100% Free • No Account Required • Start Instantly
        </div>
        <p className="text-base md:text-lg text-white leading-relaxed px-4 drop-shadow-lg font-medium">
          Simply enter a <span className="font-semibold text-cyan-300">stock ticker</span>
          <br />
          and <span className="font-semibold text-blue-300">AI analyzes instantly</span>
          <br />
          Get detailed report
        </p>
        <p className="text-xs md:text-sm text-cyan-200/90 mt-2 drop-shadow-lg">
          Fast Processing • Unlimited Use • Data Protected
        </p>
      </div>
    </div>
  );
}
