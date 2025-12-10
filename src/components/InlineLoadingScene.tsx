interface InlineLoadingSceneProps {
  isVisible: boolean;
}

export default function InlineLoadingScene({ isVisible }: InlineLoadingSceneProps) {
  if (!isVisible) return null;

  return (
    <div className="w-full animate-fadeIn relative flex flex-col items-center justify-center py-20">
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 rounded-full border-4 border-gray-200 relative">
            <div
              className="absolute inset-0 rounded-full border-4 border-transparent animate-spin"
              style={{
                borderTopColor: '#3B82F6',
                borderRightColor: '#06B6D4',
                borderBottomColor: '#10B981',
                animationDuration: '1.5s'
              }}
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="24" fontWeight="bold" fill="url(#gradient)">
                AI
              </text>
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="50%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: '#2C3E50' }}>
            AI正在分析報告
          </h2>
          <p className="text-sm md:text-base" style={{ color: '#64748B' }}>
            数秒お待ちください...
          </p>
        </div>

        <div className="mt-4 text-center max-w-md">
          <p className="text-xs leading-relaxed" style={{ color: '#64748B' }}>
            すべてのデータは公開されている市場情報を使用しており、
            <br className="hidden sm:inline" />
            公開市場データに基づいて分析を行っています
          </p>
        </div>
      </div>
    </div>
  );
}
