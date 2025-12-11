export default function MediaSection() {
  const features = [
    { icon: '🎯', title: 'AI銘柄分析', description: '高精度な分析' },
    { icon: '📈', title: '市場予測', description: '将来性の予測' },
    { icon: '⚡', title: '即時診断', description: '迅速な結果' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div
        className="text-center mb-6"
        style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
          🏆 メディア掲載・認証実績
        </h3>
        <p className="text-base text-gray-700 font-semibold">
          最新の成功事例
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 text-center hover:shadow-lg transition-shadow"
            style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h4 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h4>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
