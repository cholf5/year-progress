export type Theme = 'light' | 'dark' | 'system';

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

export const getThemeDisplayName = (theme: Theme, language: string): string => {
  const names: { [key in Theme]: { [lang: string]: string } } = {
    light: {
      en: 'Light Mode',
      zh: '日间模式',
      es: 'Modo Claro',
      fr: 'Mode Clair',
      de: 'Heller Modus',
      ja: 'ライトモード',
      ko: '라이트 모드',
      pt: 'Modo Claro',
      ru: 'Светлый режим',
      ar: 'الوضع النهاري',
      hi: 'दिन मोड',
      it: 'Modalità Chiara',
      nl: 'Lichte Modus',
      tr: 'Açık Mod',
      sv: 'Ljust läge',
      pl: 'Tryb jasny',
      da: 'Lys tilstand',
      no: 'Lys modus',
      fi: 'Valoisa tila'
    },
    dark: {
      en: 'Dark Mode',
      zh: '夜间模式',
      es: 'Modo Oscuro',
      fr: 'Mode Sombre',
      de: 'Dunkler Modus',
      ja: 'ダークモード',
      ko: '다크 모드',
      pt: 'Modo Escuro',
      ru: 'Тёмный режим',
      ar: 'الوضع الليلي',
      hi: 'रात मोड',
      it: 'Modalità Scura',
      nl: 'Donkere Modus',
      tr: 'Koyu Mod',
      sv: 'Mörkt läge',
      pl: 'Tryb ciemny',
      da: 'Mørk tilstand',
      no: 'Mørk modus',
      fi: 'Tumma tila'
    },
    system: {
      en: 'Follow System',
      zh: '跟随系统',
      es: 'Seguir Sistema',
      fr: 'Suivre Système',
      de: 'System folgen',
      ja: 'システムに従う',
      ko: '시스템 따라가기',
      pt: 'Seguir Sistema',
      ru: 'Следовать системе',
      ar: 'تتبع النظام',
      hi: 'सिस्टम का पालन करें',
      it: 'Segui Sistema',
      nl: 'Volg Systeem',
      tr: 'Sistemi Takip Et',
      sv: 'Följ systemet',
      pl: 'Podążaj za systemem',
      da: 'Følg systemet',
      no: 'Følg systemet',
      fi: 'Seuraa järjestelmää'
    }
  };
  
  return names[theme][language] || names[theme]['en'];
};
