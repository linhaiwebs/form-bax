import { Star, User } from 'lucide-react';

export default function TestimonialSection() {
  const testimonial = {
    name: 'Michael Johnson',
    date: '3 years investing experience, started as a beginner',
    rating: 5,
    text: "As someone new to investing, I was struggling until I found this AI system. It's made asset management so much clearer and easier to understand. The insights are actionable and have really helped me make confident investment decisions."
  };

  return (
    <div className="bg-business-gray py-6 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-xl font-bold text-gray-900 mb-5">
          User Testimonials
        </h2>
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-start gap-3 mb-3">
            <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-base">{testimonial.name}</h3>
              <p className="text-xs text-gray-600 mt-0.5">{testimonial.date}</p>
            </div>
          </div>
          <div className="flex gap-1 mb-3">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            {testimonial.text}
          </p>
          <p className="text-xs text-right text-gray-500 mt-4">
            Posted January 2025
          </p>
        </div>
      </div>
    </div>
  );
}
