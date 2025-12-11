interface Testimonial {
  name: string;
  role: string;
  location: string;
  duration: string;
  content: string;
}

const testimonials: Testimonial[] = [
  {
    name: '田中 誠一',
    role: '個人投資家',
    location: '東京',
    duration: '利用歴2年',
    content: 'AIの分析精度に驚きました。見逃していた銘柄の特徴を的確に指摘してくれて、投資判断の参考になっています。最初は半信半疑でしたが、3ヶ月で元本を倍にできました。'
  },
  {
    name: '佐藤 美咲',
    role: '証券アナリスト',
    location: '大阪',
    duration: 'プロ利用',
    content: 'プロの視点から見ても、このAI分析は非常に価値があります。特に日本市場特有の季節性や企業文化を考慮した分析が素晴らしい。クライアントにも推奨しています。'
  },
  {
    name: '山本 健太',
    role: '投資初心者',
    location: '福岡',
    duration: '利用歴6ヶ月',
    content: '投資を始めたばかりでしたが、このAIシステムのおかげで自信を持って取引できるようになりました。わかりやすい解説も助かります。初心者でも安心して使えます。'
  }
];

export default function TestimonialsSection() {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <h3
        className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center"
        style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
      >
        ユーザーの声
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
            style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg mr-3">
                {testimonial.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                <p className="text-xs text-gray-600">
                  {testimonial.role} / {testimonial.location} • {testimonial.duration}
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-700 leading-relaxed">
              「{testimonial.content}」
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
