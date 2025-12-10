interface KLineProgressBarProps {
  progress: number;
  stage: number;
}

export default function KLineProgressBar({ progress, stage }: KLineProgressBarProps) {
  const stageColors = ['#22c55e', '#3b82f6', '#ef4444'];
  const currentColor = stageColors[stage] || stageColors[0];

  return (
    <div className="w-full space-y-2">
      <div className="relative h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
        <div
          className="absolute inset-y-0 left-0 transition-all duration-300 ease-out"
          style={{
            width: `${Math.min(progress, 100)}%`,
            background: `linear-gradient(90deg, ${currentColor}, ${currentColor}dd)`,
            boxShadow: `0 0 15px ${currentColor}80`
          }}
        >
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              background: `linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)`,
              backgroundSize: '200% 100%'
            }}
          />
        </div>
      </div>

      <div className="flex justify-between items-center text-xs">
        <div className="flex space-x-4">
          <span style={{ color: stage >= 0 ? '#22c55e' : '#6b7280' }} className="font-semibold">
            ■ データ収集
          </span>
          <span style={{ color: stage >= 1 ? '#3b82f6' : '#6b7280' }} className="font-semibold">
            ■ AI分析
          </span>
          <span style={{ color: stage >= 2 ? '#ef4444' : '#6b7280' }} className="font-semibold">
            ■ レポート生成
          </span>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}
