'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 'ar', 'hi', 'it', 'nl', 'tr', 'sv', 'pl', 'da', 'no', 'fi'];

  // 获取语言显示名称
  const getLanguageDisplayName = (lang: string): string => {
    const names: Record<string, string> = {
      'en': 'English',
      'zh': '中文',
      'es': 'Español', 
      'fr': 'Français',
      'de': 'Deutsch',
      'ja': '日本語',
      'ko': '한국어',
      'pt': 'Português',
      'ru': 'Русский',
      'ar': 'العربية',
      'hi': 'हिन्दी',
      'it': 'Italiano',
      'nl': 'Nederlands',
      'tr': 'Türkçe',
      'sv': 'Svenska',
      'pl': 'Polski',
      'da': 'Dansk',
      'no': 'Norsk',
      'fi': 'Suomi'
    };
    return names[lang] || lang;
  };

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

  // 处理点击外部关闭下拉框
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLanguageDropdownOpen(false);
      }
    }

    if (isLanguageDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isLanguageDropdownOpen]);

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
            relative rounded-2xl shadow-2xl max-w-md w-full
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
          {/* 内容容器 - 移除滚动以防止与下拉框冲突 */}
          <div>
          {/* 头部 */}
          <div className="flex items-center justify-between p-6 border-b" 
               style={{borderColor: borderColor}}>
            <h2 className="text-xl font-semibold" style={{color: isDark ? '#ffffff' : '#111827'}}>
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
          <div className="p-6 space-y-8">
            {/* 主题设置 - 卡片式选择 */}
            <div>
              <label className="block text-sm font-medium mb-4" style={{color: isDark ? '#e5e7eb' : '#111827'}}>
                {t('theme')}
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['light', 'dark', 'system'] as Theme[]).map((theme) => (
                  <button
                    key={theme}
                    onClick={() => handleThemeChange(theme)}
                    className={`
                      p-3 rounded-xl border-2 transition-all duration-200 hover:scale-105
                    `}
                    style={{
                      backgroundColor: settings.theme === theme 
                        ? (isDark ? '#2563eb' : '#eff6ff')  // 深色模式：非常明显的蓝色，浅色模式：浅蓝
                        : (isDark ? '#1f2937' : '#ffffff'),  // 深色模式：深灰色，浅色模式：白色
                      borderColor: settings.theme === theme
                        ? (isDark ? '#60a5fa' : '#3b82f6')   // 选中：深色模式亮蓝边框，浅色模式蓝色边框
                        : (isDark ? '#374151' : '#e5e7eb'),  // 未选中：深色模式中灰边框，浅色模式浅灰边框
                      boxShadow: settings.theme === theme && isDark 
                        ? '0 0 0 1px #3b82f6, 0 4px 6px -1px rgba(59, 130, 246, 0.3)' 
                        : !isDark 
                        ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'  // 浅色模式：立体阴影
                        : undefined
                    }}
                  >
                    {/* 主题图标 */}
                    <div className="flex justify-center mb-2">
                      {theme === 'light' && (
                        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      )}
                      {theme === 'dark' && (
                        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                      )}
                      {theme === 'system' && (
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      )}
                    </div>
                    <div className="text-xs font-medium" style={{color: isDark ? '#e5e7eb' : '#111827'}}>
                      {getThemeDisplayName(theme, currentLanguage)}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 语言设置 - 美化下拉框 */}
            <div>
              <label className="block text-sm font-medium mb-4" style={{color: isDark ? '#e5e7eb' : '#111827'}}>
                {t('language')}
              </label>
              <div className="relative max-w-48" ref={dropdownRef}>
                <button
                  onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 cursor-pointer text-left flex items-center justify-between"
                  style={{
                    backgroundColor: isDark ? '#1f2937' : '#ffffff',
                    borderColor: isDark ? '#374151' : '#e5e7eb',
                    color: isDark ? '#ffffff' : '#111827',
                    boxShadow: !isDark 
                      ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                      : undefined
                  }}
                >
                  <span>{getLanguageDisplayName(settings.language)}</span>
                  <svg 
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isLanguageDropdownOpen ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {/* 下拉选项 */}
                {isLanguageDropdownOpen && (
                  <div 
                    className="absolute z-50 w-full mt-1 rounded-xl border overflow-hidden transition-all duration-200 ease-out transform origin-top"
                    style={{
                      backgroundColor: isDark ? '#1f2937' : '#ffffff',
                      borderColor: isDark ? '#374151' : '#e5e7eb',
                      boxShadow: !isDark 
                        ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                        : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
                      animation: 'dropdownSlideIn 0.2s ease-out forwards',
                      maxHeight: '352px' // 8个选项 × 44px = 352px
                    }}
                  >
                    <div className="overflow-y-auto scrollbar-thin" style={{ maxHeight: '352px' }}>
                      {languages.map((lang) => (
                        <button
                          key={lang}
                          onClick={() => {
                            handleLanguageChange(lang as Language);
                            setIsLanguageDropdownOpen(false);
                          }}
                          className={`w-full px-4 py-2.5 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                            settings.language === lang ? 'bg-blue-50 dark:bg-blue-900/30' : ''
                          }`}
                          style={{
                            color: isDark ? '#ffffff' : '#111827',
                            minHeight: '44px'  // 确保每个选项有足够高度
                          }}
                        >
                          {getLanguageDisplayName(lang)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Twitter图标设置 - Switch开关 + 预览 */}
            <div>
              <label className="block text-sm font-medium mb-4" style={{color: isDark ? '#e5e7eb' : '#111827'}}>
                {t('twitterIcon')}
              </label>
              <div 
                className="flex items-center justify-center p-5 rounded-xl border"
                style={{
                  backgroundColor: isDark ? '#1f2937' : '#ffffff',  // 深色模式：深灰蓝背景，浅色模式：纯白
                  borderColor: isDark ? '#374151' : '#e5e7eb',      // 深色模式：中灰边框，浅色模式：浅灰
                  boxShadow: !isDark 
                    ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'  // 浅色模式：立体阴影
                    : undefined
                }}
              >
                <div className="flex items-center space-x-6">
                  {/* 左侧 - Twitter Bird 图标 */}
                  <div 
                    className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                      settings.twitterIcon === 'bird' ? 'scale-110' : 'opacity-50 hover:opacity-75'
                    }`}
                    onClick={() => handleTwitterIconChange('bird')}
                    style={{
                      backgroundColor: settings.twitterIcon === 'bird' 
                        ? (isDark ? '#1e40af' : '#dbeafe')  // 深色模式：更鲜艳的蓝色
                        : 'transparent'
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" className="text-blue-500">
                      <path fill="currentColor" d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </div>

                  {/* 中间 - Switch开关 */}
                  <div className="flex items-center justify-center">
                    <button
                      onClick={() => handleTwitterIconChange(settings.twitterIcon === 'x' ? 'bird' : 'x')}
                      className="relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                      style={{
                        backgroundColor: settings.twitterIcon === 'x' 
                          ? (isDark ? '#6b7280' : '#374151')  // 深色模式：更亮的灰色，浅色模式：深灰
                          : '#3b82f6'  // Twitter选中时：蓝色
                      }}
                    >
                      <span
                        className="inline-block h-4 w-4 transform rounded-full shadow-md transition-all duration-300 ease-in-out"
                        style={{
                          backgroundColor: isDark ? '#f9fafb' : '#ffffff',  // 深色模式：浅灰白色滑块，浅色模式：纯白
                          transform: settings.twitterIcon === 'x' ? 'translateX(22px)' : 'translateX(2px)'
                        }}
                      />
                    </button>
                  </div>

                  {/* 右侧 - X 图标 */}
                  <div 
                    className={`p-3 rounded-xl transition-all duration-300 cursor-pointer ${
                      settings.twitterIcon === 'x' ? 'scale-110' : 'opacity-50 hover:opacity-75'
                    }`}
                    onClick={() => handleTwitterIconChange('x')}
                    style={{
                      backgroundColor: settings.twitterIcon === 'x' 
                        ? '#000000'  // 选中时：纯黑色背景（官方风格）
                        : (isDark ? 'transparent' : '#e5e7eb')  // 未选中时：深色模式透明，浅色模式浅灰
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" style={{
                      color: settings.twitterIcon === 'x' 
                        ? '#ffffff'  // 选中时：白色图标
                        : (isDark ? '#9ca3af' : '#374151')  // 未选中时：深色模式浅灰，浅色模式深灰
                    }}>
                      <path fill="currentColor" d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </>
  );
}
