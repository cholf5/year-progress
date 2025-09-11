import { MetadataRoute } from 'next'
import { getSeoBaseUrl } from '../lib/utils/baseUrl'
import { translations } from '../lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSeoBaseUrl()
  
  // 获取所有支持的语言（从 i18n.ts 动态获取，确保同步）
  const languages = Object.keys(translations) as Array<keyof typeof translations>
  
  // 获取当前年份和一些历史年份
  const currentYear = new Date().getFullYear()
  const years = [currentYear - 1, currentYear, currentYear + 1]
  
  const sitemap: MetadataRoute.Sitemap = [
    // 主页面 - 默认英文版
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly', // 因为进度每小时都在变化
      priority: 1,
    },
  ]
  
  // 为每种语言添加页面
  languages.forEach(lang => {
    if (lang !== 'en') { // 英文版已经在上面添加了
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
  
  // 为主要年份和语言组合添加一些示例页面（避免生成过多URL）
  const mainLanguages = ['en', 'zh-cn', 'zh-tw', 'es', 'ja', 'de', 'fr'] // 主要语言
  years.forEach(year => {
    if (year !== currentYear) {
      mainLanguages.forEach(lang => {
        // 使用URLSearchParams确保URL参数正确编码，避免XML中的&符号问题
        const params = new URLSearchParams({
          year: year.toString(),
          lang: lang
        })
        // 获取参数字符串并替换 & 为 &amp;
        const queryString = params.toString().replace(/&/g, '&amp;');
        sitemap.push({
          url: `${baseUrl}?${queryString}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      })
    }
  })
  
  return sitemap
}
