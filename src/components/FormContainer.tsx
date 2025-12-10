import { ReactNode } from 'react';

interface FormContainerProps {
  children: ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="w-[95%] mx-auto">
      <div
        className="rounded-t-[32px] px-5 py-8 backdrop-blur-xl relative overflow-hidden"
        style={{
          minHeight: '40vh',
          background: 'rgba(26, 26, 26, 0.9)',
          boxShadow: '0 -10px 50px rgba(212, 175, 55, 0.2), 0 2px 8px rgba(0, 0, 0, 0.5)',
          border: '2px solid #D4AF37',
          borderBottom: 'none',
        }}
      >
        <svg className="absolute top-0 left-0 w-16 h-16 opacity-20" viewBox="0 0 100 100">
          <path
            d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
          />
        </svg>
        <svg className="absolute top-0 right-0 w-16 h-16 opacity-20" viewBox="0 0 100 100">
          <path
            d="M50,10 L60,30 L80,30 L65,45 L70,65 L50,50 L30,65 L35,45 L20,30 L40,30 Z"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            transform="rotate(90 50 50)"
          />
        </svg>
        <div className="max-w-md mx-auto relative z-10">
          <div className="mb-6">
            <h2 className="text-2xl font-luxury font-bold text-left mb-2" style={{ color: '#D4AF37', textShadow: '0 2px 8px rgba(0, 0, 0, 0.5)' }}>
              早速始めましょう
            </h2>
            <p className="text-sm text-left font-body" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
              銘柄コードまたは銘柄名を入力してください
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
