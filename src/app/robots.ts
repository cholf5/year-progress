import { MetadataRoute } from 'next'
import { getSeoBaseUrl } from '../lib/utils/baseUrl'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSeoBaseUrl()
  
  return {
    rules: [
      // 通用规则：先允许OG图片，再禁止其他API（确保最佳兼容性）
      {
        userAgent: '*',
        allow: '/api/og',     // 明确允许OG图片生成
        disallow: [
          '/api/',            // 然后禁止其他所有API访问
          '/private/',  
          '/_next/',
          '/admin/',
        ],
      },
      // 社交媒体爬虫：确保能访问OG图片（虽然上面已经允许了，但明确声明更保险）
      {
        userAgent: 'Twitterbot',
        allow: '/api/og',
      },
      {
        userAgent: 'facebookexternalhit', 
        allow: '/api/og',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    // 移除 host 字段 - 不是标准 robots.txt 指令，大多数搜索引擎不支持
  }
}
