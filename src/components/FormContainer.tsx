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
          background: 'rgba(4, 47, 82, 0.85)',
          boxShadow: '0 -10px 50px rgba(0, 230, 195, 0.3), 0 0 40px rgba(77, 255, 220, 0.2)',
          border: '2px solid #00E6C3',
          borderBottom: 'none',
        }}
      >
        <svg className="absolute top-0 left-0 w-16 h-16 opacity-30 animate-wave-flow" viewBox="0 0 100 100">
          <path
            d="M10,50 Q30,30 50,45 Q70,60 90,40"
            fill="none"
            stroke="#4DFFDC"
            strokeWidth="2"
          />
          <circle cx="50" cy="45" r="3" fill="#B3FFF0" opacity="0.6" />
        </svg>
        <svg className="absolute top-0 right-0 w-16 h-16 opacity-30 animate-wave-flow" viewBox="0 0 100 100" style={{ animationDelay: '0.5s' }}>
          <path
            d="M10,40 Q30,60 50,45 Q70,30 90,50"
            fill="none"
            stroke="#4DFFDC"
            strokeWidth="2"
          />
          <circle cx="50" cy="45" r="3" fill="#B3FFF0" opacity="0.6" />
        </svg>
        <div className="max-w-md mx-auto relative z-10">
          <div className="mb-6">
            <h2 className="text-2xl font-sans font-semibold text-left mb-2" style={{ color: '#4DFFDC', textShadow: '0 0 20px rgba(0, 230, 195, 0.6)' }}>
              Analysis Complete in 3 Seconds
            </h2>
            <p className="text-xs font-sans font-normal text-left" style={{ color: 'rgba(179, 255, 240, 0.8)' }}>
              Simply enter a stock ticker or company name
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
