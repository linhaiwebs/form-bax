import { Users, TrendingUp } from 'lucide-react';

export default function UserStatsDisplay() {
  return (
    <div className="bg-white py-4 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-8 flex-wrap">
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-red flex-shrink-0" />
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-600 font-medium">利用者数:</span>
            <span className="text-xl font-bold text-gray-900">127,000+</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-trust-yellow flex-shrink-0" />
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-gray-600 font-medium">選択率:</span>
            <span className="text-xl font-bold text-gray-900">99.2%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
