import { ReactNode } from 'react';

interface FormContainerProps {
  children: ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="w-[95%] mx-auto">
      <div
        className="bg-white rounded-t-[32px] px-5 py-8"
        style={{
          minHeight: '40vh',
          boxShadow: '0 -4px 20px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)',
          border: '1px solid rgba(59, 130, 246, 0.1)',
          borderBottom: 'none'
        }}
      >
        <div className="max-w-md mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-left mb-2" style={{ color: '#2C3E50' }}>
              早速始めましょう
            </h2>
            <p className="text-sm text-left" style={{ color: '#64748B' }}>
              銘柄コードまたは銘柄名を入力してください
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
