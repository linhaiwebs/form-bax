import { TrendingUp, FileText, Shield } from 'lucide-react';

export default function BottomNavigation() {
  const navItems = [
    { icon: TrendingUp, label: '市場分析', color: 'bg-blue-50 text-blue-600' },
    { icon: FileText, label: 'レポート', color: 'bg-green-50 text-green-600' },
    { icon: Shield, label: 'セキュリティ', color: 'bg-purple-50 text-purple-600' }
  ];

  return (
    <div className="bg-white border-t border-gray-200 py-5 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-around gap-6">
          {navItems.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-2">
              <div className={`p-4 rounded-full shadow-sm ${item.color}`}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
