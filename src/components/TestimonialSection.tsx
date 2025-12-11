import { Star, User } from 'lucide-react';

export default function TestimonialSection() {
  const testimonial = {
    name: '山本 健太',
    date: '投資歴3年・副業の傍ら、初心者で参戦',
    rating: 5,
    text: '「投資を始めたばかりの方でした。このAIシステムが出てくるまでは手探り状態でしたが、このAIシステムならわかりやすい判断で資産運用できるようになりました。わかりやすい判断で資産運用できるようになりました。'
  };

  return (
    <div className="bg-business-gray py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-lg font-bold text-gray-900 mb-4">
          ユーザーの声
        </h2>
        <div className="bg-white rounded-lg shadow-md p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-green-100 rounded-full p-2">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
              <p className="text-xs text-gray-600">{testimonial.date}</p>
            </div>
          </div>
          <div className="flex gap-1 mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {testimonial.text}
          </p>
          <p className="text-xs text-right text-gray-500 mt-3">
            2025年1月投稿
          </p>
        </div>
      </div>
    </div>
  );
}
