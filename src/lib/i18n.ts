// 向后兼容的 i18n 文件
// 这个文件提供了与原始 i18n.ts 文件相同的 API
// 但在内部使用新的模块化系统

export {
  SUPPORTED_LANGUAGES_COUNT,
  type Language,
  type Translation,
  getTranslation,
  getInitialLanguage,
  saveLanguage,
  detectLanguage,
  getLanguageDisplayName,
  formatProgressTitle,
  formatWeekDayText,
  formatPageTitle,
  formatMonthDay,
  formatDayWeekInfo,
  formatBottomStats,
  getOgLocale,
  preloadLanguage,
  preloadLanguages,
  clearTranslationCache,
  getCachedLanguages,
  isLanguageCached,
  translations
} from './i18n/index';

// 重新导出所有类型和函数以保持兼容性