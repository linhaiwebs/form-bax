import { ArrowLeft, FileText, Home, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function Terms() {
  const sections = [
    { id: 'section1', title: '第1条（適用）' },
    { id: 'section2', title: '第2条（サービスの内容）' },
    { id: 'section3', title: '第3条（利用上の注意事項）' },
    { id: 'section4', title: '第4条（禁止事項）' },
    { id: 'section5', title: '第5条（知的財産権）' },
    { id: 'section6', title: '第6条（免責事項）' },
    { id: 'section7', title: '第7条（サービスの変更・停止）' },
    { id: 'section8', title: '第8条（個人情報の取扱い）' },
    { id: 'section9', title: '第9条（規約の変更）' },
    { id: 'section10', title: '第10条（準拠法および管轄裁判所）' },
  ];

  return (
    <>
      <SEO
        title="利用規約 | AI株式診断"
        description="AI株式診断サービスの利用規約。サービスの利用条件、禁止事項、免責事項、知的財産権などについて記載しています。ご利用前に必ずお読みください。"
        keywords="利用規約,規約,使用条件,禁止事項,免責事項,AI株式診断"
        path="/terms"
      />
      <div className="min-h-screen bg-gradient-to-br from-slate-200 via-blue-50 to-slate-100">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <nav className="flex items-center gap-2 text-sm text-gray-600 mb-8" aria-label="パンくずリスト">
          <Link to="/" className="hover:text-blue-700 flex items-center gap-1">
            <Home className="w-4 h-4" />
            ホーム
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium">利用規約</span>
        </nav>

        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            トップページに戻る
          </Link>
        </div>

        <article className="bg-white rounded-lg shadow-xl border-2 border-blue-300 p-10">
          <header className="flex items-center gap-4 mb-8 border-b-2 border-blue-200 pb-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 rounded-md shadow-md">
              <FileText className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-1">利用規約</h1>
              <p className="text-sm text-gray-500">最終更新日: 2025年10月21日</p>
            </div>
          </header>

          <nav className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-200 rounded-lg p-6 mb-10" aria-label="目次">
            <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              目次
            </h2>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-blue-700 hover:text-blue-900 hover:underline block py-1"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="prose max-w-none">
            <section id="section1" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第1条（適用）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                本規約は、AI株式診断サービス（以下「当サービス」といいます）の利用に関する条件を、当サービスを利用する全ての方（以下「利用者」といいます）とサービス運営者（以下「当社」といいます）との間で定めるものです。
              </p>
              <p className="text-gray-700 leading-relaxed">
                利用者は、当サービスを利用することにより、本規約の全ての内容に同意したものとみなされます。
              </p>
            </section>

            <section id="section2" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第2条（サービスの内容）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスは、AI技術を活用して株式市場の情報を分析し、利用者に提供する情報提供サービスです。
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスは以下の機能を提供します：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>株式銘柄の基本情報の表示</li>
                <li>株価推移のグラフ表示</li>
                <li>AIによる株式分析レポートの生成</li>
                <li>市場データの集計および統計情報の提供</li>
              </ul>
            </section>

            <section id="section3" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第3条（利用上の注意事項）</h2>
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-4">
                <p className="text-gray-800 font-semibold mb-2">重要な注意事項</p>
                <p className="text-gray-700 leading-relaxed">
                  当サービスは情報提供のみを目的としており、投資助言や投資勧誘を行うものではありません。
                  当サービスが提供する情報は、投資判断の参考情報として提供されるものであり、投資成果を保証するものではありません。
                </p>
              </div>
              <p className="text-gray-700 leading-relaxed">
                利用者は、自己の責任において投資判断を行うものとし、当サービスの利用により生じた損害について、当社は一切の責任を負いません。
              </p>
            </section>

            <section id="section4" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第4条（禁止事項）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                利用者は、当サービスの利用にあたり、以下の行為を行ってはなりません：
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
                <li>法令または公序良俗に違反する行為</li>
                <li>犯罪行為に関連する行為</li>
                <li>当サービスの運営を妨害する行為</li>
                <li>他の利用者または第三者の権利を侵害する行為</li>
                <li>虚偽の情報を登録する行為</li>
                <li>当サービスの情報を商業目的で利用する行為</li>
                <li>不正アクセスまたはこれを試みる行為</li>
                <li>当サービスのシステムに過度な負荷をかける行為</li>
              </ul>
            </section>

            <section id="section5" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第5条（知的財産権）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスに含まれるコンテンツ、テキスト、画像、プログラム等の著作権その他の知的財産権は、当社または当社にライセンスを許諾している者に帰属します。
              </p>
              <p className="text-gray-700 leading-relaxed">
                利用者は、当社の事前の書面による承諾なく、これらを複製、転載、配布、改変等することはできません。
              </p>
            </section>

            <section id="section6" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第6条（免責事項）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                当社は、当サービスの内容、品質、正確性、完全性、有用性について、いかなる保証も行いません。
              </p>
              <p className="text-gray-700 leading-relaxed mb-3">
                当サービスの利用により利用者に生じた損害について、当社は一切の責任を負いません。ただし、当社の故意または重過失による場合はこの限りではありません。
              </p>
              <p className="text-gray-700 leading-relaxed">
                当サービスの提供の遅延、中断、停止、データの消失等について、当社は一切の責任を負いません。
              </p>
            </section>

            <section id="section7" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第7条（サービスの変更・停止）</h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、利用者への事前の通知なく、当サービスの内容を変更し、または当サービスの提供を停止することができるものとします。
                これにより利用者に生じた損害について、当社は一切の責任を負いません。
              </p>
            </section>

            <section id="section8" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第8条（個人情報の取扱い）</h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、利用者の個人情報を、当社が別途定めるプライバシーポリシーに従って適切に取り扱います。
              </p>
            </section>

            <section id="section9" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第9条（規約の変更）</h2>
              <p className="text-gray-700 leading-relaxed">
                当社は、必要に応じて本規約を変更することができます。変更後の規約は、当サービス上に掲載された時点から効力を生じるものとします。
              </p>
            </section>

            <section id="section10" className="mb-10 scroll-mt-20">
              <h2 className="text-xl font-bold text-gray-900 mb-4">第10条（準拠法および管轄裁判所）</h2>
              <p className="text-gray-700 leading-relaxed mb-3">
                本規約の解釈にあたっては、日本法を準拠法とします。
              </p>
              <p className="text-gray-700 leading-relaxed">
                当サービスに関して紛争が生じた場合には、東京地方裁判所を専属的合意管轄裁判所とします。
              </p>
            </section>

            <div className="bg-gradient-to-r from-blue-50 to-slate-100 border-l-4 border-blue-600 rounded-md p-6 mt-12">
              <h3 className="font-bold text-gray-900 mb-3 text-lg">お問い合わせ</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                本規約に関するご質問やご不明な点がございましたら、
                <Link to="/contact" className="text-blue-600 hover:underline font-medium mx-1">
                  お問い合わせフォーム
                </Link>
                よりご連絡ください。
              </p>
            </div>
          </div>
        </article>
      </div>
      </div>
    </>
  );
}
