import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-gray-200 bg-white mt-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Legal Disclosure Section */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <div className="p-2 rounded-lg flex-shrink-0 bg-yellow-100">
              <Shield className="w-5 h-5 text-yellow-700" />
            </div>
            <div className="flex-1">
              <h3 className="text-base font-bold text-yellow-900 mb-2">
                免責事項（重要）
              </h3>
              <div className="space-y-2 text-sm leading-relaxed text-gray-700">
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

        {/* Copyright Section */}
        <div className="border-t border-gray-200 pt-4 text-center">
          <p className="text-xs sm:text-sm text-gray-600 font-medium mb-3">
            &copy; {currentYear} All rights reserved.
          </p>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            <Link
              to="/privacy"
              className="text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 hover:underline"
            >
              プライバシーポリシー
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/terms"
              className="text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 hover:underline"
            >
              利用規約
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/specified-commercial-transaction-act"
              className="text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 hover:underline"
            >
              特定商取引法に基づく表記
            </Link>
            <span className="text-gray-400">|</span>
            <Link
              to="/contact"
              className="text-brand-blue hover:text-brand-blue-dark transition-colors duration-200 hover:underline"
            >
              お問い合わせ
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
