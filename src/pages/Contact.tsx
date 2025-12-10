import { ArrowLeft, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getDomainEmail } from '../lib/getDomainEmail';

export default function Contact() {
  const contactEmail = getDomainEmail();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          トップページに戻る
        </Link>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-lg">
              <Mail className="w-6 h-6 text-blue-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">お問い合わせ</h1>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed mb-8">
              AI株式診断サービスをご利用いただき、誠にありがとうございます。
              ご質問、ご要望、不具合のご報告など、お気軽にお問い合わせください。
            </p>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">お問い合わせ方法</h2>
              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">メールアドレス</p>
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-blue-600 hover:underline text-xl font-bold"
                    >
                      {contactEmail}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3 mt-4 pt-4 border-t border-blue-200">
                  <Clock className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">受付時間</p>
                    <p className="text-sm text-gray-600">
                      ※メールでのお問い合わせは24時間受け付けております<br />
                      ※ご返信は営業日（平日 9:00-18:00）内に順次対応いたします<br />
                      ※土日祝日、年末年始の返信は翌営業日となります
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">投資に関するご相談について</h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <p className="text-red-900 font-semibold mb-2">重要なお知らせ</p>
                <p className="text-red-800 leading-relaxed">
                  当サービスは金融商品取引業者ではないため、個別の投資助言を行うことはできません。
                  投資に関する具体的なご相談は、証券会社等の金融商品取引業者にお問い合わせください。
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
