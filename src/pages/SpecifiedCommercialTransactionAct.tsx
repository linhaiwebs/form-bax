import { ArrowLeft, FileText, Mail, Phone, Building2, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDomainEmail } from '../lib/getDomainEmail';
import SEO from '../components/SEO';

export default function SpecifiedCommercialTransactionAct() {
  const contactEmail = getDomainEmail();

  return (
    <>
      <SEO
        title="特定商取引法に基づく表記 | AI株式診断"
        description="AI株式診断サービスの特定商取引法に基づく表記。事業者情報、サービス内容、利用料金、お支払い方法、返金ポリシーなどを記載しています。"
        keywords="特定商取引法,特商法,事業者情報,返金ポリシー,AI株式診断"
        path="/specified-commercial-transaction-act"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-300 via-gray-200 to-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <nav className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-600" aria-label="パンくずリスト">
            <Link to="/" className="hover:text-gray-900 flex items-center gap-1">
              <Home className="w-4 h-4" />
              ホーム
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">特定商取引法表記</span>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2 text-sm border border-gray-600 text-gray-700 rounded-md hover:bg-gray-700 hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            戻る
          </Link>
        </nav>

        <article className="bg-gradient-to-br from-white via-gray-50 to-white rounded-lg shadow-2xl border border-gray-300 p-12">
          <header className="mb-10 pb-8 border-b-4 border-gray-300">
            <div className="flex items-start gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600 to-slate-700 rounded-md rotate-6"></div>
                <div className="relative bg-gradient-to-br from-gray-700 to-slate-800 p-5 rounded-md shadow-xl">
                  <FileText className="w-9 h-9 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-3">特定商取引法に基づく表記</h1>
                <p className="text-base text-gray-600 leading-relaxed">
                  特定商取引法（特定商取引に関する法律）に基づき、以下の通り表記いたします。
                </p>
              </div>
            </div>
          </header>

          <div className="space-y-6">
            <section className="mb-8">
              <div className="bg-gradient-to-r from-gray-100 to-slate-100 p-6 rounded-lg border-2 border-gray-300">
                <div className="flex items-center gap-3 mb-6">
                  <Building2 className="w-6 h-6 text-gray-700" />
                  <h2 className="text-2xl font-bold text-gray-900">事業者情報・連絡先</h2>
                </div>
                <table className="w-full border-collapse">
                  <tbody>
                    <tr className="border-b border-gray-300">
                      <td className="py-4 px-4 bg-gray-200 font-bold text-gray-900 w-1/3">メールアドレス</td>
                      <td className="py-4 px-4 bg-white text-gray-700">{contactEmail}</td>
                    </tr>
                    <tr className="border-b border-gray-300">
                      <td className="py-4 px-4 bg-gray-200 font-bold text-gray-900">受付時間</td>
                      <td className="py-4 px-4 bg-white text-gray-700">24時間受付（返信は営業日内）</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">サービス内容</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-3">提供サービス</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>AI技術を活用した株式情報の提供および分析サービス</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>株価データ、チャート、テクニカル指標の表示</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>AI分析レポートの生成と提供</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>投資情報の提供（情報提供のみ、投資助言には該当しません）</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">サービス料金</h2>
              <div className="bg-blue-50 rounded-lg p-5 border-2 border-blue-200">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-gray-900 mb-1">基本サービス</h3>
                      <p className="text-sm text-gray-700">
                        株価情報の閲覧、AI診断機能、レポートダウンロード
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-2xl font-bold text-green-600">無料</p>
                    </div>
                  </div>
                  <div className="bg-white rounded p-3">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      現在、当サービスは基本機能を無料で提供しております。
                      今後、プレミアム機能を追加する場合は、事前にお知らせいたします。
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">お支払い方法</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <p className="text-gray-700 leading-relaxed">
                  現在、有料サービスは提供しておりません。
                  今後、有料プランを導入する際は、以下の決済方法を予定しております。
                </p>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>クレジットカード決済（Visa、Mastercard、JCB、American Express等）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>銀行振込</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>コンビニ決済</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">サービス提供時期</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <p className="text-gray-700 leading-relaxed">
                  サービスはお申し込み後、即時ご利用いただけます。
                  AI診断結果の生成には、通常数秒から数十秒程度のお時間をいただきます。
                </p>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">返品・キャンセルについて</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <h3 className="font-bold text-gray-900 mb-3">無料サービスについて</h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  現在提供している無料サービスについては、
                  いつでもご利用を停止いただけます。
                </p>
                <h3 className="font-bold text-gray-900 mb-3">今後提供予定の有料サービスについて</h3>
                <p className="text-gray-700 leading-relaxed">
                  デジタルコンテンツの性質上、原則として返品・返金はお受けできません。
                  ただし、以下の場合は返金対応を検討いたします。
                </p>
                <ul className="mt-3 space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>システムの不具合により、サービスが正常に提供されなかった場合</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-1">•</span>
                    <span>当社の責に帰すべき事由により、サービス提供が不可能となった場合</span>
                  </li>
                </ul>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">個人情報の取り扱い</h2>
              <div className="bg-slate-50 rounded-lg p-5">
                <p className="text-gray-700 leading-relaxed mb-3">
                  お客様の個人情報は、個人情報保護法に基づき適切に管理いたします。
                  詳細は
                  <Link to="/privacy" className="text-blue-600 hover:underline font-semibold mx-1">
                    プライバシーポリシー
                  </Link>
                  をご確認ください。
                </p>
              </div>
            </section>

            <section className="border-b border-gray-200 pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">免責事項</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
                <p className="text-amber-900 font-semibold mb-3">重要なお知らせ</p>
                <div className="space-y-2 text-gray-700 text-sm leading-relaxed">
                  <p>
                    当サービスは、AI技術を活用した株式情報の提供および分析ツールであり、
                    投資助言業務、投資一任業務、金融商品仲介業務には該当しません。
                  </p>
                  <p>
                    提供される情報は参考情報としてご活用ください。
                    株式投資には価格変動リスク、信用リスク、流動性リスク等が伴い、
                    投資元本を割り込む可能性があります。
                  </p>
                  <p>
                    最終的な投資判断は、必ずご自身の責任において行ってください。
                    当サービスの利用により生じたいかなる損害についても、
                    当社は一切の責任を負いません。
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Mail className="w-6 h-6 text-gray-700" />
                お問い合わせ
              </h2>
              <div className="bg-gradient-to-br from-slate-100 to-gray-100 rounded-lg p-8 border-2 border-gray-400 shadow-inner">
                <p className="text-gray-800 leading-relaxed mb-6 text-base">
                  特定商取引法に関するご質問、その他お問い合わせは、以下の方法でご連絡ください。
                </p>
                <dl className="bg-white rounded-lg p-6 mb-6 border border-gray-300">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-gray-600 mt-1 flex-shrink-0" />
                    <div className="flex-1">
                      <dt className="font-bold text-gray-900 mb-2 text-lg">メールアドレス</dt>
                      <dd className="text-gray-700 text-base mb-2">{contactEmail}</dd>
                      <dd className="text-sm text-gray-500">受付時間: 24時間受付（返信は営業日内）</dd>
                    </div>
                  </div>
                </dl>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-md hover:bg-gray-800 transition-all font-bold shadow-md hover:shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  お問い合わせフォームへ
                </Link>
              </div>
            </section>
          </div>

          <footer className="mt-10 pt-8 border-t-2 border-gray-300 text-center">
            <p className="text-sm text-gray-600 bg-gray-100 inline-block px-6 py-2 rounded-full">
              最終更新日: 2025年1月15日
            </p>
          </footer>
        </article>
      </div>
      </div>
    </>
  );
}
