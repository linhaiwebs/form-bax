# SEO 动态配置说明

本项目已配置动态SEO管理系统，可通过环境变量统一控制所有SEO相关文件中的域名。

## 快速开始

### 1. 配置域名

在对应的环境配置文件中设置 `VITE_SITE_URL`：

**开发环境** (`.env`)：
```bash
VITE_SITE_URL=http://localhost:5173
```

**生产环境** (`.env.production`)：
```bash
VITE_SITE_URL=https://japanaistock.jp
```

### 2. 自动生成SEO文件

构建时会自动生成所有SEO文件：

```bash
npm run build
```

这会自动执行 `prebuild` 钩子，生成以下文件：
- `public/sitemap.xml` - 网站地图
- `public/robots.txt` - 搜索引擎爬虫规则
- `index.html` - 更新所有硬编码的域名

### 3. 手动生成SEO文件

如果需要单独生成SEO文件，可以运行：

```bash
npm run generate-seo
```

## 配置文件说明

### 环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `VITE_SITE_URL` | 网站完整URL | `https://japanaistock.jp` |

### 路由配置

在 `scripts/generateSEOFiles.js` 中配置所有需要加入sitemap的路由：

```javascript
const routes = [
  { path: '/', priority: '1.0', changefreq: 'daily' },
  { path: '/privacy', priority: '0.5', changefreq: 'monthly' },
  { path: '/terms', priority: '0.5', changefreq: 'monthly' },
  // ... 添加更多路由
];
```

## 页面SEO配置

每个页面使用 `SEO` 组件配置元标签：

```tsx
import SEO from '../components/SEO';

export default function MyPage() {
  return (
    <>
      <SEO
        title="页面标题 | AI株式診断"
        description="页面描述"
        keywords="关键词1,关键词2,关键词3"
        path="/my-page"  // 会自动与 VITE_SITE_URL 组合
      />
      {/* 页面内容 */}
    </>
  );
}
```

## 部署到新域名

1. 修改 `.env.production` 中的 `VITE_SITE_URL`
2. 运行 `npm run build`
3. 所有SEO文件和meta标签都会自动更新为新域名

## 生成的文件

### sitemap.xml
包含所有页面的URL、优先级、更新频率等信息，帮助搜索引擎更好地爬取网站。

### robots.txt
定义搜索引擎爬虫的访问规则：
- 允许访问公开页面
- 禁止访问 `/adsadmin/` 和 `/api/`
- 指向 sitemap.xml

### index.html
主页HTML文件中的所有URL引用（Open Graph、Twitter卡片、Canonical URL等）都会自动更新。

## Google Ads 优化

本配置已针对Google Ads搜索广告优化：

1. **结构化数据**：包含 Schema.org WebApplication 和 Organization 标记
2. **完整的Meta标签**：标题、描述、关键词、OG标签、Twitter卡片
3. **Sitemap**：便于Google快速索引所有页面
4. **Robots.txt**：明确指引爬虫规则

## 故障排查

### SEO文件没有更新

运行以下命令手动生成：
```bash
npm run generate-seo
```

### 构建时域名没有变化

检查 `.env.production` 文件中的 `VITE_SITE_URL` 是否正确设置。

### 页面meta标签显示错误

确保页面组件中使用了 `SEO` 组件，并正确传入 `path` 参数。

## 进阶配置

### 添加新路由到Sitemap

编辑 `scripts/generateSEOFiles.js`：

```javascript
const routes = [
  // ... 现有路由
  {
    path: '/new-page',
    priority: '0.7',  // 0.0-1.0
    changefreq: 'weekly'  // always, hourly, daily, weekly, monthly, yearly, never
  },
];
```

### 自定义Robots.txt规则

编辑 `scripts/generateSEOFiles.js` 中的 `generateRobotsTxt()` 函数。

## 相关文件

- `scripts/generateSEOFiles.js` - SEO文件生成脚本
- `src/components/SEO.tsx` - SEO组件
- `src/lib/getSiteUrl.ts` - 获取站点URL的工具函数
- `.env.production` - 生产环境配置
- `package.json` - 包含 `prebuild` 和 `generate-seo` 脚本

## 注意事项

1. 修改域名后必须重新构建项目
2. 确保 `.env.production` 不包含在版本控制中（已在 `.gitignore`）
3. 部署到新环境时，优先检查环境变量配置
4. `ads.txt` 文件需要手动配置Google AdSense发布商ID
