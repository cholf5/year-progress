import { MetadataRoute } from 'next'
import { getSeoBaseUrl } from '../lib/utils/baseUrl'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSeoBaseUrl()
  
  // 支持的18种语言
  const languages = [
    'en', 'zh', 'es', 'hi', 'ar', 'pt', 'bn', 'ru', 
    'ja', 'de', 'jv', 'ko', 'fr', 'tr', 'vi', 'it', 'th', 'pl'
  ]
  
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
      sitemap.push({
        url: `${baseUrl}?lang=${lang}`,
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
  const mainLanguages = ['en', 'zh', 'es', 'ja', 'de', 'fr'] // 主要语言
  years.forEach(year => {
    if (year !== currentYear) {
      mainLanguages.forEach(lang => {
        sitemap.push({
          url: `${baseUrl}?year=${year}&lang=${lang}`,
          lastModified: new Date(),
          changeFrequency: 'monthly',
          priority: 0.6,
        })
      })
    }
  })
  
  return sitemap
}
