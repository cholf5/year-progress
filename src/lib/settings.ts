import { Theme } from './theme';
import { Language } from './i18n';

export type TwitterIcon = 'x' | 'bird';

export interface Settings {
  theme: Theme;
  language: Language;
  twitterIcon: TwitterIcon;
}

// Cookie操作辅助函数
const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() ?? null;
  return null;
};

const setCookie = (name: string, value: string, days: number = 365) => {
  if (typeof window === 'undefined') return;
  
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

// 默认设置
const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  language: 'en',
  twitterIcon: 'x'
};

// 获取设置（优先从Cookie，然后localStorage，最后默认值）
export const getSettings = (): Settings => {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  
  // 尝试从Cookie获取
  const cookieSettings = getCookie('yearProgressSettings');
  if (cookieSettings) {
    try {
      const parsed = JSON.parse(cookieSettings);
      return {
        theme: parsed.theme || DEFAULT_SETTINGS.theme,
        language: parsed.language || DEFAULT_SETTINGS.language,
        twitterIcon: parsed.twitterIcon || DEFAULT_SETTINGS.twitterIcon
      };
    } catch (error) {
      console.warn('Failed to parse settings cookie:', error);
    }
  }
  
  // 从localStorage迁移旧设置
  const theme = localStorage.getItem('theme') as Theme || DEFAULT_SETTINGS.theme;
  const language = localStorage.getItem('language') as Language || DEFAULT_SETTINGS.language;
  
  return {
    theme,
    language,
    twitterIcon: DEFAULT_SETTINGS.twitterIcon
  };
};

// 保存设置到Cookie和localStorage
export const saveSettings = (settings: Settings) => {
  if (typeof window === 'undefined') return;
  
  // 保存到Cookie
  setCookie('yearProgressSettings', JSON.stringify(settings));
  
  // 为了兼容性，也保存到localStorage
  localStorage.setItem('theme', settings.theme);
  localStorage.setItem('language', settings.language);
};

// 获取单个设置项
export const getThemeSetting = (): Theme => getSettings().theme;
export const getLanguageSetting = (): Language => getSettings().language;
export const getTwitterIconSetting = (): TwitterIcon => getSettings().twitterIcon;

// 保存单个设置项
export const saveThemeSetting = (theme: Theme) => {
  const settings = getSettings();
  saveSettings({ ...settings, theme });
};

export const saveLanguageSetting = (language: Language) => {
  const settings = getSettings();
  saveSettings({ ...settings, language });
};

export const saveTwitterIconSetting = (twitterIcon: TwitterIcon) => {
  const settings = getSettings();
  saveSettings({ ...settings, twitterIcon });
};

// Twitter图标显示名称
export const getTwitterIconDisplayName = (icon: TwitterIcon, language: string): string => {
  const names: { [key in TwitterIcon]: { [lang: string]: string } } = {
    x: {
      en: 'X Logo',
      'zh-cn': 'X 标志',
      'zh-tw': 'X 標誌',
      es: 'Logo X',
      fr: 'Logo X',
      de: 'X Logo',
      ja: 'X ロゴ',
      ko: 'X 로고',
      pt: 'Logo X',
      ru: 'Логотип X',
      ar: 'شعار X',
      hi: 'X लोगो',
      it: 'Logo X',
      nl: 'X Logo',
      tr: 'X Logosu',
      sv: 'X-logotyp',
      pl: 'Logo X',
      da: 'X-logo',
      no: 'X-logo',
      fi: 'X-logo'
    },
    bird: {
      en: 'Classic Bird',
      'zh-cn': '经典蓝鸟',
      'zh-tw': '經典藍鳥',
      es: 'Pájaro Clásico',
      fr: 'Oiseau Classique',
      de: 'Klassischer Vogel',
      ja: 'クラシックバード',
      ko: '클래식 새',
      pt: 'Pássaro Clássico',
      ru: 'Классическая птичка',
      ar: 'الطائر الكلاسيكي',
      hi: 'क्लासिक पक्षी',
      it: 'Uccello Classico',
      nl: 'Klassieke Vogel',
      tr: 'Klasik Kuş',
      sv: 'Klassisk fågel',
      pl: 'Klasyczny ptak',
      da: 'Klassisk fugl',
      no: 'Klassisk fugl',
      fi: 'Klassinen lintu'
    }
  };
  
  return names[icon][language] || names[icon]['en'];
};
