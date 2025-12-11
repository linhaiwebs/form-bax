export default function FeaturesSection() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div
        className="bg-white rounded-lg shadow-md p-6 md:p-8 border border-gray-200"
        style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          AIによる高精度株式診断
        </h3>

        <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4">
          当システムは最新の人工知能技術を活用し、過去10年間の株価データ、企業財務情報、市場動向を分析。
          <br />
          独自のアルゴリズムにより、銘柄の将来性や投資タイミングを診断します。
          <br />
          精度<span className="font-bold text-blue-700 text-lg">93.7%</span>の分析結果をお届けします。
        </p>

        <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
          <p className="text-sm text-gray-600 mb-2">例: 7203（トヨタ）、9984（ソフトバンク）</p>
        </div>
      </div>
    </div>
  );
}
