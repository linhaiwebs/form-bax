import { Users, TrendingUp } from 'lucide-react';

export default function UserStatsDisplay() {
  return (
    <div className="py-2 px-2">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-6 flex-wrap">
        <div className="flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-brand-red flex-shrink-0" />
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] text-gray-600 font-medium">Active Users:</span>
            <span className="text-sm font-bold text-gray-900">127,000+</span>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-trust-yellow flex-shrink-0" />
          <div className="flex items-baseline gap-1">
            <span className="text-[10px] text-gray-600 font-medium">Success Rate:</span>
            <span className="text-sm font-bold text-gray-900">99.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
