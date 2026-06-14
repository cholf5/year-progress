export type Theme = 'light' | 'dark' | 'system';

import type { Language } from './i18n';
import { getTranslation } from './i18n';

export const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  const saved = localStorage.getItem('theme') as Theme;
  if (saved && ['light', 'dark', 'system'].includes(saved)) {
    return saved;
  }
  return 'system';
};

export const saveTheme = (theme: Theme) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('theme', theme);
  }
};

export const getSystemTheme = (): 'light' | 'dark' => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

export const getEffectiveTheme = (theme: Theme): 'light' | 'dark' => {
  return theme === 'system' ? getSystemTheme() : theme;
};

export const applyTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;
  
  const effectiveTheme = getEffectiveTheme(theme);
  const root = document.documentElement;
  
  // 强制清除所有可能的类
  root.classList.remove('dark', 'light');
  
  // 明确设置类
  if (effectiveTheme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.add('light');
  }
  
  // 额外确保body的样式也正确
  document.body.className = document.body.className.replace(/\b(dark|light)\b/g, '');
  document.body.classList.add(effectiveTheme);
};

export const getThemeDisplayName = (theme: Theme, language: Language): string => {
  const keyMap: Record<Theme, 'themeLight' | 'themeDark' | 'themeSystem'> = {
    light: 'themeLight',
    dark: 'themeDark',
    system: 'themeSystem',
  };
  return getTranslation(language, keyMap[theme]) as string;
};
