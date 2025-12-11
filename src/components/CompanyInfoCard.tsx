import { Building2, TrendingUp, Globe2 } from 'lucide-react';

export default function CompanyInfoCard() {
  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center gap-1">
          <Building2 className="w-4 h-4 text-blue-700" />
          <h3 className="text-sm font-bold text-blue-900">
            圖三証券グループ推荐
          </h3>
        </div>
        <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
          創業100年
        </span>
      </div>

      <p className="text-xs leading-relaxed text-gray-700 mb-3">
        1923年創業の老舗証券会社・圖三証券グループとの提携により、<span className="font-semibold text-gray-900">100年の金融ノウハウと最新AI技術を融合</span>。<span className="font-semibold text-gray-900">全国67拠点、従業員2,788名</span>の信頼と実績でお客様の投資をサポート
      </p>

      <div className="flex flex-wrap gap-2">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-100 rounded-md">
          <TrendingUp className="w-3 h-3 text-blue-700" />
          <span className="text-xs font-semibold text-blue-700">資本金50億円</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-100 rounded-md">
          <span className="text-xs font-bold text-green-700">JCR格付BBB+</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-100 rounded-md">
          <Globe2 className="w-3 h-3 text-purple-700" />
          <span className="text-xs font-semibold text-purple-700">海外拠点</span>
        </div>
      </div>
    </div>
  );
}
