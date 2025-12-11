import { MapPin, Clock, CheckCircle } from 'lucide-react';

export default function FeatureBadges() {
  const badges = [
    { icon: MapPin, text: '全国対応等', color: 'text-blue-600' },
    { icon: Clock, text: '24時間分析可', color: 'text-green-600' },
    { icon: CheckCircle, text: '即時対応', color: 'text-purple-600' }
  ];

  return (
    <div className="bg-business-gray py-3 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-3 flex-wrap">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-1.5 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <badge.icon className={`w-4 h-4 ${badge.color} flex-shrink-0`} />
            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
