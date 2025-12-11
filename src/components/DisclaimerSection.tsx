export default function DisclaimerSection() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div
        className="bg-yellow-50 rounded-lg shadow-md p-6 md:p-8 border-2 border-yellow-300"
        style={{ fontFamily: 'Noto Sans JP, sans-serif' }}
      >
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
          免責事項（重要）
        </h3>

        <div className="text-sm md:text-base text-gray-800 leading-relaxed space-y-3">
          <p>
            当サイトの情報は、公開された过去データおよび统计的手法に基づく指標・可視化の例示であり、
            <strong className="text-red-600">投資勧誘や投資助言を目的とするものではありません</strong>。
            <strong className="text-red-600">過去の実績は将来の結果を保証しません</strong>。
            金融商品取引は元本割れ等のリスクを伴います。
          </p>

          <p>
            バックテスト等の数値は特定の期間・条件・パラメータに依存する理論値であり、
            取引コスト、スリッページ、税金、流動性などは考慮していない場合があります。
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-yellow-400">
          <h4 className="font-bold text-gray-900 mb-2">手法の概要</h4>
          <p className="text-sm text-gray-700">
            本システムは統計的分析とAI技術を組み合わせた参考情報の提供を目的としています。
          </p>
        </div>
      </div>
    </div>
  );
}
