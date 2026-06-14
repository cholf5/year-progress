// 社交分享相关常量与 helper
// 共用 hashtag 与各语言 hashtag 的合并逻辑统一在此，避免散落在 UI 组件文件里
import { type Language, getTranslation } from '@/lib/i18n';

// 全语言共用的 hashtag（与具体语言无关的品牌词）
export const COMMON_HASHTAGS = ['YearProgress', 'YearProgressBar', 'YearProgressOrg'];

// 拼接 "#tag #tag ..." 字符串：共用 hashtag + 当前语言 socialHashtags
export function formatSharedHashtags(language: Language): string {
  const localized = getTranslation(language, 'socialHashtags') as readonly string[];
  return [...COMMON_HASHTAGS, ...localized].map(tag => `#${tag}`).join(' ');
}

// 仅拼接当前语言的 socialHashtags（Weibo 标题使用，避免 hashtag 过多）
export function formatLocaleHashtags(language: Language): string {
  const localized = getTranslation(language, 'socialHashtags') as readonly string[];
  if (localized.length === 0) return '';
  return localized.map(tag => `#${tag}`).join(' ');
}
