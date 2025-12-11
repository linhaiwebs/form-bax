import { MessageCircle, TrendingUp } from 'lucide-react';

interface WhatsAppConversionButtonProps {
  onClick: () => void;
}

export default function WhatsAppConversionButton({ onClick }: WhatsAppConversionButtonProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 py-4 px-4 z-50 mb-5">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onClick}
          style={{
            background: 'linear-gradient(to right, #25D366, #128C7E)',
          }}
          className="w-full text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex flex-col items-center justify-center gap-2 hover:brightness-110"
        >
          <div className="flex items-center gap-3">
            <MessageCircle className="w-7 h-7" />
            <span className="text-lg">Connect on WhatsApp</span>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <TrendingUp className="w-4 h-4" />
            <span>Get Free Analysis Report Now</span>
          </div>
        </button>
      </div>
    </div>
  );
}
