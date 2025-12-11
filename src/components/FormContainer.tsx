import { ReactNode } from 'react';

interface FormContainerProps {
  children: ReactNode;
}

export default function FormContainer({ children }: FormContainerProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-8">
      <div
        className="rounded-lg px-6 py-8 relative overflow-hidden bg-white shadow-lg border border-gray-200"
        style={{
          fontFamily: 'Noto Sans JP, sans-serif',
        }}
      >
        <div className="max-w-md mx-auto relative z-10">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 text-center mb-2">
              3秒で診断完了
            </h2>
            <p className="text-sm text-gray-600 text-center">
              銘柄コードまたは銘柄名を入力するだけ
            </p>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}
