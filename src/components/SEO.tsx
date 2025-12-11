import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  canonical?: string;
}

export default function SEO({
  title = 'AI株式診断 - わずか3秒で銘柄分析 | 無料・登録不要',
  description = '最新AI技術でわずか3秒の高速株式診断。リアルタイムデータ分析で投資判断をサポート。完全無料・登録不要で今すぐ利用可能。日本株・米国株対応。',
  keywords = 'AI株式診断,株式分析,銘柄診断,投資判断,株価分析,リアルタイム株価,無料株式診断,AI投資,機械学習,投資支援ツール,日本株,米国株',
  ogTitle,
  ogDescription,
  canonical = 'https://japanaistock.jp/',
}: SEOProps) {
  useEffect(() => {
    document.title = title;

    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }

      element.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    updateMetaTag('og:title', ogTitle || title, true);
    updateMetaTag('og:description', ogDescription || description, true);
    updateMetaTag('og:url', canonical, true);
    updateMetaTag('twitter:title', ogTitle || title);
    updateMetaTag('twitter:description', ogDescription || description);

    let linkElement = document.querySelector('link[rel="canonical"]');
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.setAttribute('rel', 'canonical');
      document.head.appendChild(linkElement);
    }
    linkElement.setAttribute('href', canonical);
  }, [title, description, keywords, ogTitle, ogDescription, canonical]);

  return null;
}
