export function getSiteUrl(): string {
  return import.meta.env.VITE_SITE_URL || 'https://japanaistock.jp';
}

export function getSiteUrlWithPath(path: string): string {
  const baseUrl = getSiteUrl();
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
}
