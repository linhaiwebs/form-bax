import { MapPin, Clock, CheckCircle } from 'lucide-react';

export default function FeatureBadges() {
  const badges = [
    { icon: MapPin, text: 'Nationwide', color: 'text-blue-600' },
    { icon: Clock, text: '24/7 Analysis', color: 'text-green-600' },
    { icon: CheckCircle, text: 'Instant Results', color: 'text-purple-600' }
  ];

  return (
    <div className="py-2 px-2">
      <div className="max-w-4xl mx-auto flex items-center justify-center gap-2 flex-wrap">
        {badges.map((badge, index) => (
          <div key={index} className="flex items-center gap-1 bg-white px-2.5 py-1 rounded-full shadow-sm border border-gray-100">
            <badge.icon className={`w-3 h-3 ${badge.color} flex-shrink-0`} />
            <span className="text-[10px] font-semibold text-gray-700 whitespace-nowrap">{badge.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
