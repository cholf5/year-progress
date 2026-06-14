// 导入类型定义
import type { Translation } from './locales/types';

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

// 支持的语言类型（手写联合，唯一手写来源；新增语言时改这里 + allTranslations + import）
export type Language =
  | 'en' | 'zh-cn' | 'zh-tw' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'ru'
  | 'ar' | 'hi' | 'it' | 'nl' | 'tr' | 'sv' | 'pl' | 'da' | 'no' | 'fi'
  | 'vi' | 'th' | 'id' | 'sw' | 'bn' | 'ne' | 'ur' | 'my' | 'fil';

// 所有翻译的集合（运行时单一来源）
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

// 派生：支持的语言列表（运行时使用）
const SUPPORTED_LANGUAGES = Object.keys(allTranslations) as Language[];

// 派生：支持的语言数量（用于 i18n 占位符 {supportedLanguagesCount}）
export const SUPPORTED_LANGUAGES_COUNT = SUPPORTED_LANGUAGES.length;

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
  if (!(actualLang in allTranslations)) {
    actualLang = 'en';
  }

  // 获取翻译
  const translation = allTranslations[actualLang];
  const result = translation[key];

  // 如果是字符串，进行占位符替换
  // 注意：{year} 故意不在这里替换，由业务层 helper（formatProgressTitle 等）按调用方传入的年份替换
  if (typeof result === 'string') {
    return result.replace('{supportedLanguagesCount}', SUPPORTED_LANGUAGES_COUNT.toString());
  }

  return result;
}

// 获取已缓存的语言列表（运行时统一来源）
export function getCachedLanguages(): Language[] {
  return SUPPORTED_LANGUAGES;
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

  if (saved && SUPPORTED_LANGUAGES.includes(saved as Language)) {
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

// 浏览器语言代码到内部 Language 的映射（detectLanguage 与服务端解析共用）
const BROWSER_LANG_MAP: Record<string, Language> = {
  'en': 'en',
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

// 浏览器语言检测
export function detectLanguage(browserLang: string): Language {
  const fullLangCode = browserLang.toLowerCase();
  const langCode = fullLangCode.split('-')[0];

  // 先检查完整的语言代码（zh-cn 等带区域的）
  if (BROWSER_LANG_MAP[fullLangCode]) {
    return BROWSER_LANG_MAP[fullLangCode];
  }

  // 再检查基本语言代码
  return BROWSER_LANG_MAP[langCode] || 'en';
}

// 解析 Accept-Language 头，按 q 值排序后取第一个能识别的语言
// 头部格式：'fr-CH, fr;q=0.9, en;q=0.8, *;q=0.5'
export function parseAcceptLanguage(header: string | null | undefined): Language | null {
  if (!header) return null;
  const entries = header
    .split(',')
    .map(part => {
      const [tag, ...params] = part.trim().split(';');
      const qParam = params.find(p => p.trim().startsWith('q='));
      const q = qParam ? parseFloat(qParam.trim().slice(2)) : 1;
      return { tag: tag.trim().toLowerCase(), q: isNaN(q) ? 0 : q };
    })
    .filter(e => e.tag && e.tag !== '*')
    .sort((a, b) => b.q - a.q);

  for (const { tag } of entries) {
    if (BROWSER_LANG_MAP[tag]) return BROWSER_LANG_MAP[tag];
    const base = tag.split('-')[0];
    if (BROWSER_LANG_MAP[base]) return BROWSER_LANG_MAP[base];
  }
  return null;
}

// 从 cookie 字符串中提取 yearProgressSettings.language（容忍 JSON 解析失败）
// cookie 值与 src/lib/settings.ts 写入的格式保持一致
export function readLanguageFromSettingsCookie(cookieValue: string | null | undefined): Language | null {
  if (!cookieValue) return null;
  try {
    const parsed = JSON.parse(cookieValue);
    const candidate = parsed?.language;
    // 处理历史 'zh' → 'zh-cn'
    if (candidate === 'zh') return 'zh-cn';
    if (typeof candidate === 'string' && SUPPORTED_LANGUAGES.includes(candidate as Language)) {
      return candidate as Language;
    }
  } catch {
    // 旧版本可能直接存了语言代码字符串
    const trimmed = cookieValue.trim();
    if (trimmed === 'zh') return 'zh-cn';
    if (SUPPORTED_LANGUAGES.includes(trimmed as Language)) return trimmed as Language;
  }
  return null;
}

// 服务端解析请求的目标语言：URL 参数 > cookie > Accept-Language > 'en'
// 该函数是纯函数，便于单测；调用方负责从 Next 的 headers()/cookies() 取值后传入
export function resolveServerLanguage(input: {
  urlLang?: string | null;
  settingsCookie?: string | null;
  acceptLanguage?: string | null;
}): Language {
  // 1. URL 参数（分享链接、爬虫走 hreflang 时落到这里）
  if (input.urlLang) {
    const normalized = input.urlLang.toLowerCase();
    if (normalized === 'zh') return 'zh-cn';
    if (SUPPORTED_LANGUAGES.includes(normalized as Language)) {
      return normalized as Language;
    }
  }

  // 2. Cookie 偏好（回访用户）
  const fromCookie = readLanguageFromSettingsCookie(input.settingsCookie);
  if (fromCookie) return fromCookie;

  // 3. Accept-Language（首次访问）
  const fromAccept = parseAcceptLanguage(input.acceptLanguage);
  if (fromAccept) return fromAccept;

  // 4. 默认英语
  return 'en';
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

// 辅助函数：格式化当前状态的周/日信息
export const formatCurrentWeekDayText = (
  language: Language, 
  weekNumber: number, 
  dayNumber: number, 
  year: number
): string => {
  const template = getTranslation(language, 'currentWeekDayStatus') as string;
  return template
    .replace('{weekNumber}', weekNumber.toString())
    .replace('{dayNumber}', dayNumber.toString())
    .replace('{year}', year.toString());
};

// 辅助函数：格式化历史状态的周/日信息
export const formatHistoricalWeekDayText = (
  language: Language, 
  weekNumber: number, 
  dayNumber: number, 
  year: number
): string => {
  const template = getTranslation(language, 'historicalWeekDayStatus') as string;
  return template
    .replace('{weekNumber}', weekNumber.toString())
    .replace('{dayNumber}', dayNumber.toString())
    .replace('{year}', year.toString());
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
