// 生成结构化数据的工具函数
import { getSeoBaseUrl } from './utils/baseUrl'
import { getCachedLanguages, getTranslation, type Language } from './i18n'

export function generateWebApplicationSchema(language: Language = 'en') {
  const baseUrl = getSeoBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'YearProgress.org',
    description: getTranslation(language, 'description') as string,
    url: baseUrl,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript. Modern browsers supported.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'YearProgress.org',
    },
    inLanguage: getCachedLanguages(),
    keywords: 'year progress, time tracking, progress bar, yearly progress, time visualization, social sharing',
    mainEntityOfPage: baseUrl,
    image: `${baseUrl}/og-default.png`,
  }
}

export function generateBreadcrumbSchema(language: Language = 'en') {
  const baseUrl = getSeoBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'YearProgress.org',
        item: language === 'en' ? baseUrl : `${baseUrl}?lang=${language}`,
      },
    ],
  }
}
