export default function JapaneseLogo() {
  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="mb-6">
        <img
          src="/assets/logo-placeholder.svg"
          alt="日本株式分析"
          className="h-20 w-auto"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'block';
          }}
        />
        <div
          className="hidden text-4xl font-bold text-blue-900 text-center"
          style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
        >
          日本株式AI分析
        </div>
      </div>

      <h1
        className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-4"
        style={{ fontFamily: 'Noto Sans JP, sans-serif', lineHeight: '1.4' }}
      >
        AI株式診断 システム
      </h1>

      <p
        className="text-base md:text-lg text-gray-700 text-center max-w-3xl"
        style={{ fontFamily: 'Noto Sans JP, sans-serif', lineHeight: '1.8' }}
      >
        最先端AIが日本株式市場を分析し、最適な投資判断をサポート
      </p>
    </div>
  );
}
