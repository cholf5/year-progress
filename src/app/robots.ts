import { MetadataRoute } from 'next'
import { getSeoBaseUrl } from '../lib/utils/baseUrl'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSeoBaseUrl()
  
  // DRY原则：集中定义路径配置
  const ALLOWED_PATHS = [
    '/',
    '/api/og', // Allow OG image generation for social media
  ]
  
  const COMMON_DISALLOWED = [
    '/api/',
    '/private/',
    '/_next/',
    '/admin/',
  ]
  
  const SEARCH_ENGINE_DISALLOWED = [
    '/api/',
    '/private/',
  ]
  
  return {
    rules: [
      // 默认规则：允许OG图片但保护其他API
      {
        userAgent: '*',
        allow: ALLOWED_PATHS,
        disallow: COMMON_DISALLOWED,
      },
      // 搜索引擎爬虫：更宽松的规则
      {
        userAgent: 'Googlebot',
        allow: ALLOWED_PATHS,
        disallow: SEARCH_ENGINE_DISALLOWED,
        crawlDelay: 1,
      },
      {
        userAgent: 'Bingbot',
        allow: ALLOWED_PATHS,
        disallow: SEARCH_ENGINE_DISALLOWED,
        crawlDelay: 1,
      },
      // 社交媒体爬虫：无限制访问OG图片
      {
        userAgent: 'Twitterbot',
        allow: ALLOWED_PATHS,
        disallow: [],
        crawlDelay: 0,
      },
      {
        userAgent: 'facebookexternalhit',
        allow: ALLOWED_PATHS,
        disallow: [],
        crawlDelay: 0,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
