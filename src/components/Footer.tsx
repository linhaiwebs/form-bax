import { Shield } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t-2 border-white/20 mt-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Legal Disclosure Section - Desktop */}
        <div className="hidden md:block backdrop-blur-sm border-2 border-green-500/30 rounded-lg p-4 mb-4 shadow-xl" style={{ background: 'rgba(15, 20, 35, 0.8)' }}>
          <div className="flex items-start gap-2">
            <div className="p-2 rounded-lg flex-shrink-0" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
              <Shield className="w-5 h-5 text-green-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-green-300 mb-3">
                免責事項（重要）
              </h3>
              <div className="space-y-3 text-sm leading-relaxed text-gray-200">
                <p>
                  当サイトの情報は、公開された过去データおよび统计的手法に基づく指標・可視化の例示であり、投資勧誘や投資助言を目的とするものではありません。過去の実績は将来の結果を保証しません。金融商品取引は元本割れ等のリスクを伴います。
                </p>
                <p>
                  バックテスト等の数値は特定の期間・条件・パラメータに依存する理論値であり、取引コスト、スリッページ、税金、流動性などは考慮していない場合があります。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice - Mobile */}
        <div className="md:hidden border-2 border-orange-500/50 rounded-xl p-4 mb-3 shadow-md backdrop-blur-sm" style={{ background: 'rgba(249, 115, 22, 0.1)' }}>
          <p className="text-base text-orange-300 font-bold mb-2">免責事項（重要）</p>
          <div className="text-xs text-orange-200 leading-relaxed space-y-2">
            <p>
              当サイトの情報は、公開された过去データおよび统计的手法に基づく指標・可視化の例示であり、投資勧誘や投資助言を目的とするものではありません。過去の実績は将来の結果を保証しません。金融商品取引は元本割れ等のリスクを伴います。
            </p>
            <p>
              バックテスト等の数値は特定の期間・条件・パラメータに依存する理論値であり、取引コスト、スリッページ、税金、流動性などは考慮していない場合があります。
            </p>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t-2 border-green-400/40 pt-3 text-center">
          <p className="text-xs sm:text-sm text-white font-semibold">
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
