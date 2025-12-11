import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env.production');
dotenv.config({ path: envPath });

const SITE_URL = process.env.VITE_SITE_URL || 'https://japanaistock.jp';
const currentDate = new Date().toISOString().split('T')[0];

const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  { path: '/specified-commercial-transaction-act', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.6', changefreq: 'monthly' },
];

function generateSitemap() {
  const urls = routes.map(route => `
  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls}
</urlset>`;

  return sitemap;
}

function generateRobotsTxt() {
  return `# AI株式診断サービス

User-agent: *
Allow: /
Disallow: /adsadmin/
Disallow: /api/

# Crawl delay (optional)
Crawl-delay: 1

# Sitemap location
Sitemap: ${SITE_URL}/sitemap.xml

# Google bots
User-agent: Googlebot
Allow: /
Disallow: /adsadmin/
Disallow: /api/

User-agent: Googlebot-Image
Allow: /

# Bing bot
User-agent: Bingbot
Allow: /
Disallow: /adsadmin/
Disallow: /api/
`;
}

function updateIndexHtml() {
  const indexPath = path.resolve(__dirname, '../index.html');
  let indexContent = fs.readFileSync(indexPath, 'utf8');

  indexContent = indexContent.replace(
    /https:\/\/japanaistock\.jp/g,
    SITE_URL
  );

  fs.writeFileSync(indexPath, indexContent, 'utf8');
}

const publicDir = path.resolve(__dirname, '../public');

fs.writeFileSync(
  path.join(publicDir, 'sitemap.xml'),
  generateSitemap(),
  'utf8'
);

fs.writeFileSync(
  path.join(publicDir, 'robots.txt'),
  generateRobotsTxt(),
  'utf8'
);

updateIndexHtml();

console.log(`✅ SEO files generated successfully!`);
console.log(`   Site URL: ${SITE_URL}`);
console.log(`   - sitemap.xml`);
console.log(`   - robots.txt`);
console.log(`   - index.html (updated URLs)`);
