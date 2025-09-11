'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language, getTranslation, type Translation } from '@/lib/i18n';

export function useTranslation(language: Language) {
  const [loading, setLoading] = useState(true);

  // 初始化加载
  useEffect(() => {
    // 由于我们现在使用同步导入，翻译立即可用
    setLoading(false);
  }, [language]);

  // 获取翻译的便捷函数
  const t = useCallback((key: keyof Translation): string => {
    try {
      return getTranslation(language, key) as string;
    } catch (error) {
      console.error('Failed to get translation:', error);
      return `Missing translation: ${String(key)}`;
    }
  }, [language]);

  // 获取数组翻译
  const tArray = useCallback((key: keyof Translation): readonly string[] => {
    try {
      return getTranslation(language, key) as readonly string[];
    } catch (error) {
      console.error('Failed to get translation array:', error);
      return [];
    }
  }, [language]);

  // 重新加载函数（为了API兼容性）
  const reload = useCallback(() => {
    // 由于我们现在使用同步导入，不需要重新加载
    setLoading(false);
  }, [language]);

  return {
    t,
    tArray,
    loading,
    translations: null, // 我们不再缓存翻译，因为它们是同步的
    reload
  };
}

// 用于服务器端组件的翻译Hook（简化版本）
export function useServerTranslation(language: Language) {
  // 对于服务器端，我们使用同步版本并提供基本的翻译
  const t = useCallback((key: keyof Translation): string => {
    // 这里可以提供一个基本的英语翻译回退
    const fallbacks: Partial<Translation> = {
      title: 'YearProgress.org',
      siteName: 'YearProgress.org',
      description: 'Real-time yearly progress visualization',
      yearProgress: 'Year Progress',
      subtitle: 'Real-time Yearly Progress Visualization',
      complete: 'complete',
      settings: 'Settings',
      theme: 'Theme',
      language: 'Language',
      aboutSite: 'About',
      privacyPolicy: 'Privacy Policy',
      termsOfService: 'Terms of Service'
    };
    
    return (fallbacks as Record<string, string>)[String(key)] || `Translation for ${String(key)}`;
  }, []);

  return { t, loading: false };
}