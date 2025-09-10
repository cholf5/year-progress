// 生成结构化数据的工具函数
export function generateWebApplicationSchema(language: string = 'en') {
  const baseUrl = 'https://www.yearprogress.org'
  
  const descriptions = {
    en: 'Real-time yearly progress visualization. See how much of the year has passed and share beautiful progress cards.',
    'zh-cn': '实时年度进度可视化。查看今年已经过去了多少时间，并分享精美的进度卡片。',
    'zh-tw': '即時年度進度視覺化。查看今年已經過去了多少時間，並分享精美的進度卡片。',
    es: 'Visualización del progreso anual en tiempo real. Ve cuánto del año ha pasado y comparte tarjetas de progreso hermosas.',
    ja: 'リアルタイムの年次進捗可視化。今年がどれだけ過ぎたかを確認し、美しい進捗カードを共有しましょう。',
    de: 'Echtzeit-Jahresfortschritt-Visualisierung. Sehen Sie, wie viel vom Jahr vergangen ist und teilen Sie schöne Fortschrittskarten.',
    fr: 'Visualisation du progrès annuel en temps réel. Voyez combien de l\'année est passée et partagez de belles cartes de progrès.',
    vi: 'Trực quan hóa tiến độ năm theo thời gian thực. Xem bao nhiêu phần trăm của năm đã trôi qua và chia sẻ thẻ tiến độ đẹp.',
    th: 'การแสดงผลความคืบหน้าปีแบบเรียลไทม์ ดูว่าปีนี้ผ่านไปแล้วเท่าไรและแชร์การ์ดความคืบหน้าที่สวยงาม',
    id: 'Visualisasi kemajuan tahun secara real-time. Lihat berapa banyak tahun yang telah berlalu dan bagikan kartu kemajuan yang indah.',
    sw: 'Uwakilishaji wa maendeleo ya mwaka wakati halisi. Angalia kiasi gani cha mwaka umepita na shiriki kadi nzuri za maendeleo.',
    bn: 'বাস্তব সময়ের বার্ষিক অগ্রগতি ভিজ্যুয়ালাইজেশন। দেখুন বছরের কতটুকু সময় অতিবাহিত হয়েছে এবং সুন্দর অগ্রগতি কার্ড শেয়ার করুন।',
  }
  
  const names = {
    en: 'YearProgress.org',
    'zh-cn': 'YearProgress.org',
    'zh-tw': 'YearProgress.org',
    es: 'YearProgress.org',
    ja: 'YearProgress.org',
    de: 'YearProgress.org',
    fr: 'YearProgress.org',
    vi: 'YearProgress.org',
    th: 'YearProgress.org',
    id: 'YearProgress.org',
    sw: 'YearProgress.org',
    bn: 'YearProgress.org',
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
      name: 'YearProgress.org',
    },
    inLanguage: [
      'en', 'zh-cn', 'zh-tw', 'es', 'hi', 'ar', 'pt', 'bn', 'ru', 
      'ja', 'de', 'jv', 'ko', 'fr', 'tr', 'vi', 'it', 'th', 'pl',
      'da', 'no', 'fi', 'nl', 'sv', 'id', 'sw'
    ],
    keywords: 'year progress, time tracking, progress bar, yearly progress, time visualization, social sharing',
    mainEntityOfPage: baseUrl,
    image: `${baseUrl}/og-default.png`,
  }
}

export function generateBreadcrumbSchema(language: string = 'en') {
  const baseUrl = 'https://www.yearprogress.org'
  
  const homeNames = {
    en: 'YearProgress.org',
    'zh-cn': 'YearProgress.org',
    'zh-tw': 'YearProgress.org',
    es: 'YearProgress.org',
    ja: 'YearProgress.org',
    de: 'YearProgress.org',
    fr: 'YearProgress.org',
    vi: 'YearProgress.org',
    th: 'YearProgress.org',
    id: 'YearProgress.org',
    sw: 'YearProgress.org',
    bn: 'YearProgress.org',
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
