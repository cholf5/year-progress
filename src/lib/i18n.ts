export const translations = {
  en: {
    title: 'Year Progress',
    description: 'Real-time yearly progress visualization. See how much of the year has passed and how much time remains.',
    yearProgress: 'Year Progress',
    complete: 'complete',
    week: 'week',
    day: 'day',
    of: 'of',
    daysCompleted: 'days completed',
    daysRemaining: 'days remaining',
    shareInstructions: 'Share this link on X (Twitter) to generate a beautiful progress card!',
    currentDate: 'Current Date',
    timeWaits: 'Time waits for no one, cherish every day!',
    shareUrl: 'Share URL',
    copyLink: 'Copy Link',
    linkCopied: 'Link copied to clipboard!',
  },
  zh: {
    title: '年度进度',
    description: '实时展示年度进度，看看今年过去了多少，还剩多少时间。',
    yearProgress: '年度进度',
    complete: '已完成',
    week: '第',
    day: '第',
    of: '',
    daysCompleted: '天已过去',
    daysRemaining: '天剩余',
    shareInstructions: '在 X (Twitter) 上分享此链接，即可生成漂亮的进度卡片！',
    currentDate: '当前日期',
    timeWaits: '时间不等人，珍惜每一天！',
    shareUrl: '分享链接',
    copyLink: '复制链接',
    linkCopied: '链接已复制到剪贴板！',
  },
};

export type Language = keyof typeof translations;

export function getTranslation(lang: Language, key: keyof typeof translations.en): string {
  return translations[lang][key] || translations.en[key];
}
