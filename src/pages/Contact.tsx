import { ArrowLeft, Mail, Clock, MessageCircle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDomainEmail } from '../lib/getDomainEmail';
import SEO from '../components/SEO';

export default function Contact() {
  const contactEmail = getDomainEmail();

  const faqs = [
    { q: '診断結果が表示されない', a: 'ブラウザをリロードするか、別の銘柄コードでお試しください。' },
    { q: '銘柄コードの入力方法は？', a: '日本株は4桁の数字、米国株はティッカーシンボルを入力してください。' },
    { q: '料金はかかりますか？', a: '完全無料でご利用いただけます。登録も不要です。' },
  ];

  return (
    <>
      <SEO
        title="お問い合わせ | AI株式診断"
        description="AI株式診断サービスへのお問い合わせ。ご質問、ご要望、不具合のご報告など、お気軽にお問い合わせください。メールでのお問い合わせは24時間受け付けております。"
        keywords="お問い合わせ,サポート,質問,AI株式診断,問い合わせフォーム"
        path="/contact"
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-blue-50">
      <div className="max-w-3xl mx-auto px-5 py-10">
        <main role="main" className="bg-white rounded-2xl shadow-xl p-10">
          <header className="text-center mb-10">
            <div className="inline-flex items-center justify-center bg-gradient-to-br from-orange-400 to-amber-500 p-5 rounded-xl shadow-lg mb-5">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl font-extrabold text-gray-900 mb-3">お問い合わせ</h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              AI株式診断サービスをご利用いただき、誠にありがとうございます。
              ご質問、ご要望、不具合のご報告など、お気軽にお問い合わせください。
            </p>

          </header>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-orange-600" />
              <h2 className="text-2xl font-bold text-gray-900">メールでのお問い合わせ</h2>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200 shadow-inner">
              <div className="text-center mb-6">
                <p className="font-bold text-gray-900 text-xl mb-3">メールアドレス</p>
                <a
                  href={`mailto:${contactEmail}`}
                  className="inline-block text-orange-600 hover:text-orange-800 text-2xl font-extrabold hover:underline"
                >
                  {contactEmail}
                </a>
              </div>
              <div className="flex items-start gap-4 mt-6 pt-6 border-t-2 border-orange-200/50">
                <Clock className="w-7 h-7 text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-bold text-gray-900 mb-3 text-lg">受付時間</p>
                  <ul className="space-y-2 text-base text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>メールでのお問い合わせは24時間受け付けております</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>ご返信は営業日（平日 9:00-18:00）内に順次対応いたします</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-orange-500">•</span>
                      <span>土日祝日、年末年始の返信は翌営業日となります</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <HelpCircle className="w-6 h-6 text-amber-600" />
              <h2 className="text-2xl font-bold text-gray-900">よくある質問</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-amber-50 rounded-xl p-6 border border-amber-200 hover:border-amber-400 transition-colors">
                  <summary className="font-bold text-gray-900 cursor-pointer text-lg hover:text-orange-600 transition-colors">
                    Q: {faq.q}
                  </summary>
                  <p className="mt-4 text-gray-700 pl-4 border-l-4 border-orange-400 text-base">
                    A: {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </section>

          <aside className="bg-red-50 border-2 border-red-300 rounded-xl p-6">
            <p className="text-red-900 font-bold mb-3 text-lg">⚠️ 投資に関するご相談について</p>
            <p className="text-red-800 leading-relaxed text-base">
              当サービスは金融商品取引業者ではないため、個別の投資助言を行うことはできません。
              投資に関する具体的なご相談は、証券会社等の金融商品取引業者にお問い合わせください。
            </p>
          </aside>

          <div className="mt-10 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white rounded-full hover:from-orange-600 hover:to-amber-600 transition-all shadow-lg hover:shadow-xl font-bold text-lg"
            >
              <ArrowLeft className="w-5 h-5" />
              トップページに戻る
            </Link>
          </div>
        </main>
      </div>
      </div>
    </>
  );
}
