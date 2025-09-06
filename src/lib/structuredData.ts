// 生成结构化数据的工具函数
export function generateWebApplicationSchema(language: string = 'en') {
  const baseUrl = 'https://yearprogress.org'
  
  const descriptions = {
    en: 'Real-time yearly progress visualization. See how much of the year has passed and share beautiful progress cards.',
    zh: '实时年度进度可视化。查看今年已经过去了多少时间，并分享精美的进度卡片。',
    es: 'Visualización del progreso anual en tiempo real. Ve cuánto del año ha pasado y comparte tarjetas de progreso hermosas.',
    ja: 'リアルタイムの年次進捗可視化。今年がどれだけ過ぎたかを確認し、美しい進捗カードを共有しましょう。',
    de: 'Echtzeit-Jahresfortschritt-Visualisierung. Sehen Sie, wie viel vom Jahr vergangen ist und teilen Sie schöne Fortschrittskarten.',
    fr: 'Visualisation du progrès annuel en temps réel. Voyez combien de l\'année est passée et partagez de belles cartes de progrès.',
  }
  
  const names = {
    en: 'Year Progress',
    zh: '年度进度',
    es: 'Progreso del Año',
    ja: '年次進捗',
    de: 'Jahresfortschritt',
    fr: 'Progrès de l\'Année',
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: names[language as keyof typeof names] || names.en,
    description: descriptions[language as keyof typeof descriptions] || descriptions.en,
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
      name: 'Year Progress',
    },
    inLanguage: [
      'en', 'zh', 'es', 'hi', 'ar', 'pt', 'bn', 'ru', 
      'ja', 'de', 'jv', 'ko', 'fr', 'tr', 'vi', 'it', 'th', 'pl'
    ],
    keywords: 'year progress, time tracking, progress bar, yearly progress, time visualization, social sharing',
    mainEntityOfPage: baseUrl,
    image: `${baseUrl}/og-default.png`,
  }
}

export function generateBreadcrumbSchema(language: string = 'en') {
  const baseUrl = 'https://yearprogress.org'
  
  const homeNames = {
    en: 'Year Progress',
    zh: '年度进度',
    es: 'Progreso del Año',
    ja: '年次進捗',
    de: 'Jahresfortschritt',
    fr: 'Progrès de l\'Année',
  }
  
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: homeNames[language as keyof typeof homeNames] || homeNames.en,
        item: language === 'en' ? baseUrl : `${baseUrl}?lang=${language}`,
      },
    ],
  }
}
