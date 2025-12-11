import { TrendingUp, Users, Target } from 'lucide-react';

export default function LargeStatsSection() {
  const stats = [
    {
      icon: Users,
      value: '3,847,000+',
      label: '累計利用者数',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      value: '+127.3%',
      label: '前年比成長率',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Target,
      value: '98.4%',
      label: '満足度',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-white to-indigo-50 py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-xl font-bold text-gray-900 mb-5">
          社生証券グループ提携
        </h2>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className={`${stat.bgColor} rounded-xl p-4 text-center shadow-sm`}>
              <stat.icon className={`w-7 h-7 ${stat.color} mx-auto mb-2`} />
              <div className={`text-xl font-bold ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
