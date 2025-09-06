'use client';

import { useState, useEffect } from 'react';
import { type Theme, applyTheme, getThemeDisplayName } from '@/lib/theme';
import { type Language, getTranslation, getLanguageDisplayName } from '@/lib/i18n';
import { type Settings, type TwitterIcon, getSettings, saveSettings, getTwitterIconDisplayName } from '@/lib/settings';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLanguage: Language;
  currentTheme: Theme;
  onSettingsChange: (settings: Settings) => void;
}

export default function SettingsModal({ isOpen, onClose, currentLanguage, currentTheme, onSettingsChange }: SettingsModalProps) {
  const [settings, setSettings] = useState<Settings>(getSettings());
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSettings(getSettings());
      setShouldRender(true);
      // 延迟启动打开动画，确保DOM已渲染
      const timer = setTimeout(() => {
        setIsAnimating(true);
      }, 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // 等待关闭动画完成后再隐藏组件
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleThemeChange = (theme: Theme) => {
    const newSettings = { ...settings, theme };
    setSettings(newSettings);
    saveSettings(newSettings);
    applyTheme(theme);
    onSettingsChange(newSettings);
  };

  const handleLanguageChange = (language: Language) => {
    const newSettings = { ...settings, language };
    setSettings(newSettings);
    saveSettings(newSettings);
    onSettingsChange(newSettings);
  };

  const handleTwitterIconChange = (twitterIcon: TwitterIcon) => {
    const newSettings = { ...settings, twitterIcon };
    setSettings(newSettings);
    saveSettings(newSettings);
    onSettingsChange(newSettings);
  };

  if (!shouldRender) return null;

  const t = (key: keyof typeof import('@/lib/i18n').translations.en) => getTranslation(currentLanguage, key);
  
  // 根据当前主题计算背景色
  const isDark = currentTheme === 'dark' || (currentTheme === 'system' && typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const modalBgColor = isDark ? '#101828' : '#f8fafc';
  const borderColor = isDark ? '#374151' : '#e5e7eb';

  return (
    <>
      {/* 背景遮罩 - 使用模糊效果和渐入动画 */}
      <div 
        className={`
          fixed inset-0 z-50 flex items-center justify-center p-4
          bg-white/20 dark:bg-gray-900/30
          transition-all duration-350 ease-out
          ${isAnimating ? 'opacity-100 backdrop-blur-md' : 'opacity-0 backdrop-blur-none'}
        `}
        onClick={onClose}
      >
        {/* 模态框内容 - iOS风格弹出动画 */}
        <div 
          className={`
            relative rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden
            text-gray-900 dark:text-white transform-gpu
            transition-all duration-350 cubic-bezier(0.25, 0.46, 0.45, 0.94)
            ${isAnimating 
              ? 'scale-100 opacity-100 translate-y-0' 
              : 'scale-90 opacity-0 translate-y-4'
            }
          `}
          style={{
            backgroundColor: modalBgColor,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* 内容滚动容器 */}
          <div className="max-h-[80vh] overflow-y-auto">
          {/* 头部 */}
          <div className="flex items-center justify-between p-6 border-b" 
               style={{borderColor: borderColor}}>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('settings')}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-all duration-200 hover:scale-110 hover:rotate-90 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 设置内容 */}
          <div className="p-6 space-y-6">
            {/* 主题设置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('theme')}
              </label>
              <div className="space-y-2">
                {(['light', 'dark', 'system'] as Theme[]).map((theme) => (
                  <label key={theme} className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150">
                    <input
                      type="radio"
                      name="theme"
                      value={theme}
                      checked={settings.theme === theme}
                      onChange={() => handleThemeChange(theme)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      {getThemeDisplayName(theme, currentLanguage)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 语言设置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('language')}
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleLanguageChange(e.target.value as Language)}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-200 hover:border-gray-400 dark:hover:border-gray-500"
              >
                {['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 'ar', 'hi', 'it', 'nl', 'tr', 'sv', 'pl', 'da', 'no', 'fi'].map((lang) => (
                  <option key={lang} value={lang}>
                    {getLanguageDisplayName(lang as Language)}
                  </option>
                ))}
              </select>
            </div>

            {/* Twitter图标设置 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                {t('twitterIcon')}
              </label>
              <div className="space-y-2">
                {(['x', 'bird'] as TwitterIcon[]).map((icon) => (
                  <label key={icon} className="flex items-center cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-150">
                    <input
                      type="radio"
                      name="twitterIcon"
                      value={icon}
                      checked={settings.twitterIcon === icon}
                      onChange={() => handleTwitterIconChange(icon)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                    />
                    <span className="ml-3 text-sm text-gray-700 dark:text-gray-300">
                      {getTwitterIconDisplayName(icon, currentLanguage)}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* 底部 */}
          <div className="flex justify-end p-6 border-t" 
               style={{borderColor: borderColor}}>
            <button
              onClick={onClose}
              className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              {t('close')}
            </button>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
