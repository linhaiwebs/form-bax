import { ReactNode } from 'react';

interface FormContainerProps {
  children: ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="w-[95%] mx-auto">
      <div
        className="rounded-t-[32px] px-5 py-8 backdrop-blur-xl"
        style={{
          minHeight: '40vh',
          background: 'rgba(15, 20, 35, 0.75)',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(0, 0, 0, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(34, 197, 94, 0.2)',
          borderBottom: 'none',
          borderTop: '1px solid rgba(239, 68, 68, 0.2)',
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-left mb-2" style={{ color: '#f0f4f8', textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
              早速始めましょう
            </h2>
            <p className="text-sm text-left" style={{ color: '#cbd5e1' }}>
              銘柄コードまたは銘柄名を入力してください
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
