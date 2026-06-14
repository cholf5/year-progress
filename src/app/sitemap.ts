import { MetadataRoute } from 'next'
import { getSeoBaseUrl } from '../lib/utils/baseUrl'
import { getCachedLanguages } from '../lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSeoBaseUrl()

  // 获取所有支持的语言（基于实际的 allTranslations，与 i18n 系统单一来源）
  const languages = getCachedLanguages()

  const sitemap: MetadataRoute.Sitemap = [
    // 主页面 - 默认英文版
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly', // 因为进度每小时都在变化
      priority: 1,
    },
  ]

  // 为每种非英文语言添加版本入口
  languages.forEach(lang => {
    if (lang !== 'en') {
      // 使用encodeURIComponent确保URL参数正确编码
      const encodedLang = encodeURIComponent(String(lang))
      sitemap.push({
        url: `${baseUrl}?lang=${encodedLang}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 0.9,
      })
    }
  })

  // API 路由 - OG 图片生成
  sitemap.push({
    url: `${baseUrl}/api/og`,
    lastModified: new Date(),
    changeFrequency: 'daily',
    priority: 0.5,
  })

  return sitemap
}
