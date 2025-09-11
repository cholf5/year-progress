// 支持的语言数量常量
// 每次添加新语言时，只需要更新这个常量即可
export const SUPPORTED_LANGUAGES_COUNT = 29;

// 导入类型定义
import type { Translation } from './locales/types';

// 支持的语言类型
export type Language = 
  | 'en' | 'zh-cn' | 'zh-tw' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'ru' 
  | 'ar' | 'hi' | 'it' | 'nl' | 'tr' | 'sv' | 'pl' | 'da' | 'no' | 'fi' 
  | 'vi' | 'th' | 'id' | 'sw' | 'bn' | 'ne' | 'ur' | 'my' | 'fil';

// 重新导出类型
export type { Translation };

// 同步导入所有翻译文件
import { translations as en } from './locales/en';
import { translations as zhCn } from './locales/zh-cn';
import { translations as zhTw } from './locales/zh-tw';
import { translations as es } from './locales/es';
import { translations as fr } from './locales/fr';
import { translations as de } from './locales/de';
import { translations as ja } from './locales/ja';
import { translations as ko } from './locales/ko';
import { translations as pt } from './locales/pt';
import { translations as ru } from './locales/ru';
import { translations as ar } from './locales/ar';
import { translations as hi } from './locales/hi';
import { translations as it } from './locales/it';
import { translations as nl } from './locales/nl';
import { translations as tr } from './locales/tr';
import { translations as sv } from './locales/sv';
import { translations as pl } from './locales/pl';
import { translations as da } from './locales/da';
import { translations as no } from './locales/no';
import { translations as fi } from './locales/fi';
import { translations as vi } from './locales/vi';
import { translations as th } from './locales/th';
import { translations as id } from './locales/id';
import { translations as sw } from './locales/sw';
import { translations as bn } from './locales/bn';
import { translations as ne } from './locales/ne';
import { translations as ur } from './locales/ur';
import { translations as my } from './locales/my';
import { translations as fil } from './locales/fil';

// 所有翻译的集合
const allTranslations: Record<Language, Translation> = {
  'en': en,
  'zh-cn': zhCn,
  'zh-tw': zhTw,
  'es': es,
  'fr': fr,
  'de': de,
  'ja': ja,
  'ko': ko,
  'pt': pt,
  'ru': ru,
  'ar': ar,
  'hi': hi,
  'it': it,
  'nl': nl,
  'tr': tr,
  'sv': sv,
  'pl': pl,
  'da': da,
  'no': no,
  'fi': fi,
  'vi': vi,
  'th': th,
  'id': id,
  'sw': sw,
  'bn': bn,
  'ne': ne,
  'ur': ur,
  'my': my,
  'fil': fil
};

// 获取翻译（同步版本）
export function getTranslation(
  lang: Language, 
  key: keyof Translation
): string | readonly string[] {
  // 处理旧版本的 'zh' 语言代码，自动迁移为 'zh-cn'
  let actualLang = lang;
  if (lang === ('zh' as Language)) {
    actualLang = 'zh-cn';
    // 如果在浏览器环境，更新localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', 'zh-cn');
    }
  }
  
  // 确保语言存在，否则使用英语
  const supportedLanguages: Language[] = [
    'en', 'zh-cn', 'zh-tw', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 
    'ar', 'hi', 'it', 'nl', 'tr', 'sv', 'pl', 'da', 'no', 'fi', 
    'vi', 'th', 'id', 'sw', 'bn', 'ne', 'ur', 'my', 'fil'
  ];
  
  if (!supportedLanguages.includes(actualLang)) {
    actualLang = 'en';
  }
  
  // 获取翻译
  const translation = allTranslations[actualLang];
  const result = translation[key];
  
  // 如果是字符串，进行占位符替换
  if (typeof result === 'string') {
    return result
      .replace('{supportedLanguagesCount}', SUPPORTED_LANGUAGES_COUNT.toString())
      .replace('{year}', new Date().getFullYear().toString());
  }
  
  return result;
}

// 为了向后兼容，保留一个简化的同步翻译对象
// 注意：这只会包含基本的英语翻译，完整翻译需要使用异步函数
const basicTranslations: Record<string, string> = {
  title: 'YearProgress.org',
  siteName: 'YearProgress.org',
  description: 'Real-time yearly progress visualization. See how much of the year has passed and how much time remains.',
  yearProgress: 'Year Progress',
  subtitle: 'Real-time Yearly Progress Visualization',
  complete: 'complete',
  progressTitle: '{year} is {percentage}% complete',
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
  past: 'Past',
  current: 'Current',
  future: 'Future',
  shareToSocialMedia: 'Share to Social Media',
  clickToShare: 'Click below to share on social media and generate beautiful progress cards!',
  orCopyLink: 'Or copy link to share',
  copy: 'Copy',
  copied: 'Copied!',
  settings: 'Settings',
  theme: 'Theme',
  language: 'Language',
  twitterIcon: 'Twitter Icon',
  close: 'Close',
  aboutSite: 'About',
  privacyPolicy: 'Privacy Policy',
  termsOfService: 'Terms of Service',
  aboutSiteTitle: 'About YearProgress.org',
  monthDayFormat: '{month} {day}',
  dayWeekInfoFormat: 'Day {dayNumber} • Week {weekNumber}',
  bottomStatsFormat: '{daysPassed} {daysCompleted} • {daysRemaining} {daysRemainingUnit}',
};

// 预加载语言（用于性能优化）- 简化版本
export function preloadLanguage(lang: Language): void {
  // 由于我们现在使用同步导入，所有语言都已预加载
  // 这个函数保留是为了API兼容性
}

// 预加载多种语言 - 简化版本
export function preloadLanguages(languages: Language[]): void {
  // 由于我们现在使用同步导入，所有语言都已预加载
  // 这个函数保留是为了API兼容性
}

// 清理缓存（用于内存管理）- 简化版本
export function clearTranslationCache(): void {
  // 由于我们现在使用同步导入，不需要缓存清理
  // 这个函数保留是为了API兼容性
}

// 获取已缓存的语言列表 - 简化版本
export function getCachedLanguages(): Language[] {
  // 由于我们现在使用同步导入，所有语言都已"缓存"
  return Object.keys(allTranslations) as Language[];
}

// 检查语言是否已缓存 - 简化版本
export function isLanguageCached(lang: Language): boolean {
  // 由于我们现在使用同步导入，所有语言都已"缓存"
  return lang in allTranslations;
}

export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  // 首先检查本地存储
  const saved = localStorage.getItem('language');
  
  // 处理旧版本的 'zh' 设置，迁移为 'zh-cn'
  if (saved === 'zh') {
    const migratedLang = 'zh-cn';
    localStorage.setItem('language', migratedLang);
    return migratedLang;
  }
  
  const supportedLanguages: Language[] = [
    'en', 'zh-cn', 'zh-tw', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 
    'ar', 'hi', 'it', 'nl', 'tr', 'sv', 'pl', 'da', 'no', 'fi', 
    'vi', 'th', 'id', 'sw', 'bn', 'ne', 'ur', 'my', 'fil'
  ];
  
  if (saved && supportedLanguages.includes(saved as Language)) {
    return saved as Language;
  }
  
  // 如果没有保存的语言，检查浏览器语言
  const browserLang = navigator.language;
  return detectLanguage(browserLang);
}

export function saveLanguage(language: Language) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('language', language);
  }
}

// 浏览器语言检测
export function detectLanguage(browserLang: string): Language {
  const langCode = browserLang.split('-')[0].toLowerCase();
  const fullLangCode = browserLang.toLowerCase();
  
  // 支持的语言映射
  const languageMap: Record<string, Language> = {
    'zh': 'zh-cn',
    'zh-cn': 'zh-cn',
    'zh-tw': 'zh-tw',
    'zh-hk': 'zh-tw',
    'zh-sg': 'zh-cn',
    'es': 'es',
    'fr': 'fr',
    'de': 'de',
    'ja': 'ja',
    'ko': 'ko',
    'pt': 'pt',
    'ru': 'ru',
    'ar': 'ar',
    'hi': 'hi',
    'it': 'it',
    'nl': 'nl',
    'tr': 'tr',
    'sv': 'sv',
    'pl': 'pl',
    'da': 'da',
    'no': 'no',
    'fi': 'fi',
    'vi': 'vi',
    'th': 'th',
    'id': 'id',
    'sw': 'sw',
    'bn': 'bn',
    'ne': 'ne',
    'ur': 'ur',
    'my': 'my',
    'fil': 'fil',
  };

  // 先检查完整的语言代码
  if (languageMap[fullLangCode]) {
    return languageMap[fullLangCode];
  }

  // 再检查基本语言代码
  return languageMap[langCode] || 'en';
}

export function getLanguageDisplayName(lang: Language): string {
  const displayNames: Record<Language, string> = {
    en: 'English',
    'zh-cn': '简体中文',
    'zh-tw': '繁體中文',
    es: 'Español',
    fr: 'Français',
    de: 'Deutsch',
    ja: '日本語',
    ko: '한국어',
    pt: 'Português',
    ru: 'Русский',
    ar: 'العربية',
    hi: 'हिंदी',
    it: 'Italiano',
    nl: 'Nederlands',
    tr: 'Türkçe',
    sv: 'Svenska',
    pl: 'Polski',
    da: 'Dansk',
    no: 'Norsk',
    fi: 'Suomi',
    vi: 'Tiếng Việt',
    th: 'ไทย',
    id: 'Bahasa Indonesia',
    sw: 'Kiswahili',
    bn: 'বাংলা',
    ne: 'नेपाली',
    ur: 'اردو',
    my: 'မြန်မာ',
    fil: 'Filipino',
  };

  return displayNames[lang];
}

// 辅助函数：格式化进度标题
export const formatProgressTitle = (
  language: Language, 
  year: number, 
  percentage: number
): string => {
  const template = getTranslation(language, 'progressTitle') as string;
  return template
    .replace('{year}', year.toString())
    .replace('{percentage}', percentage.toString());
};

// 辅助函数：格式化周日信息
export const formatWeekDayText = (
  language: Language, 
  weekNumber: number, 
  dayNumber: number, 
  year: number
): string => {
  const template = getTranslation(language, 'weekDayStatus') as string;
  return template
    .replace('{weekNumber}', weekNumber.toString())
    .replace('{dayNumber}', dayNumber.toString())
    .replace('{year}', year.toString());
};

// 辅助函数：格式化完整的页面标题
export const formatPageTitle = (language: Language): string => {
  const siteName = getTranslation(language, 'siteName') as string;
  const subtitle = getTranslation(language, 'subtitle') as string;
  return `${siteName} - ${subtitle}`;
};

// 辅助函数：格式化月日信息
export const formatMonthDay = (
  language: Language, 
  date: Date
): string => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  const template = getTranslation(language, 'monthDayFormat') as string;
  return template
    .replace('{month}', month.toString())
    .replace('{day}', day.toString());
};

// 辅助函数：格式化天数和周数信息
export const formatDayWeekInfo = (
  language: Language, 
  dayNumber: number, 
  weekNumber: number
): string => {
  const template = getTranslation(language, 'dayWeekInfoFormat') as string;
  return template
    .replace('{dayNumber}', dayNumber.toString())
    .replace('{weekNumber}', weekNumber.toString());
};

// 辅助函数：格式化底部统计信息
export const formatBottomStats = (
  language: Language, 
  daysPassed: number, 
  totalDays: number
): string => {
  const daysCompleted = getTranslation(language, 'daysCompleted') as string;
  const daysRemaining = getTranslation(language, 'daysRemaining') as string;
  
  const template = getTranslation(language, 'bottomStatsFormat') as string;
  return template
    .replace('{daysPassed}', daysPassed.toString())
    .replace('{daysCompleted}', daysCompleted)
    .replace('{daysRemaining}', (totalDays - daysPassed).toString())
    .replace('{daysRemainingUnit}', daysRemaining);
};

// 辅助函数：获取 OpenGraph locale 映射
export const getOgLocale = (language: Language): string => {
  const localeMap: Record<Language, string> = {
    'en': 'en_US',
    'zh-cn': 'zh_CN',
    'zh-tw': 'zh_TW',
    'es': 'es_ES',
    'fr': 'fr_FR',
    'de': 'de_DE',
    'ja': 'ja_JP',
    'ko': 'ko_KR',
    'pt': 'pt_PT',
    'ru': 'ru_RU',
    'ar': 'ar_SA',
    'hi': 'hi_IN',
    'it': 'it_IT',
    'nl': 'nl_NL',
    'tr': 'tr_TR',
    'sv': 'sv_SE',
    'pl': 'pl_PL',
    'da': 'da_DK',
    'no': 'no_NO',
    'fi': 'fi_FI',
    'vi': 'vi_VN',
    'th': 'th_TH',
    'id': 'id_ID',
    'sw': 'sw_TZ',
    'bn': 'bn_BD',
    'ne': 'ne_NP',
    'ur': 'ur_PK',
    'my': 'my_MM',
    'fil': 'fil_PH'
  };
  
  return localeMap[language] || 'en_US';
};

// 为了向后兼容的翻译对象（仅包含基本内容）
export const translations = {
  en: basicTranslations,
} as const;