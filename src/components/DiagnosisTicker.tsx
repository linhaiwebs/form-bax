const userReviews = [
  { icon: '👨', review: 'AIの分析精度が高く、投資判断の参考になりました' },
  { icon: '👩', review: '無料でここまで詳しいレポートが見られるなんて驚きです' },
  { icon: '👨', review: 'わずか3秒で専門的な分析結果が得られて便利' },
  { icon: '👩', review: '初心者でも理解しやすい分析内容でした' },
  { icon: '👨', review: '登録不要で使えるのが嬉しい、手軽に利用できます' },
  { icon: '👩', review: 'リアルタイムデータに基づく分析で信頼できる' },
  { icon: '👨', review: '複数銘柄を比較検討する際に重宝しています' },
  { icon: '👩', review: 'スマホからでも使いやすいインターフェース' },
  { icon: '👨', review: 'AIの視点から新しい気づきが得られました' },
  { icon: '👩', review: '投資の勉強にもなる詳細なレポート内容' },
];

export default function DiagnosisTicker() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 py-2 shadow-lg">
      <div className="animate-scroll-left whitespace-nowrap inline-block">
        {[...userReviews, ...userReviews, ...userReviews].map((record, index) => (
          <span key={index} className="inline-flex items-center mx-6 text-white">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-white/20 mr-2 text-sm">
              {record.icon}
            </span>
            <span className="text-sm font-medium">{record.review}</span>
            <span className="ml-3 text-xs bg-yellow-400/30 px-2 py-0.5 rounded-full text-yellow-100">★★★★★</span>
          </span>
        ))}
      </div>
    </div>
  );
}
