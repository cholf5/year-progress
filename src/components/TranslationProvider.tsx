'use client';

import { useState, useEffect } from 'react';
import { Language } from '@/lib/i18n';
import { useTranslation } from '@/hooks/useTranslation';

interface TranslationProviderProps {
  language: Language;
  children: React.ReactNode;
}

export function TranslationProvider({ language, children }: TranslationProviderProps) {
  const { loading, reload } = useTranslation(language);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsReady(true);
    }
  }, [loading]);

  useEffect(() => {
    reload();
  }, [language, reload]);

  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading translations...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

// 用于快速获取翻译的Hook
export function useQuickTranslation(language: Language) {
  const { t, tArray, loading } = useTranslation(language);
  
  return {
    t,
    tArray,
    loading,
    // 常用翻译的快捷方式
    title: t('title'),
    siteName: t('siteName'),
    description: t('description'),
    yearProgress: t('yearProgress'),
    subtitle: t('subtitle'),
    complete: t('complete'),
    settings: t('settings'),
    theme: t('theme'),
    language: t('language'),
    aboutSite: t('aboutSite'),
    privacyPolicy: t('privacyPolicy'),
    termsOfService: t('termsOfService'),
    aboutSiteTitle: t('aboutSiteTitle'),
    aboutSiteContent: t('aboutSiteContent'),
    weekDays: tArray('weekDays'),
    socialHashtags: tArray('socialHashtags'),
    copy: t('copy'),
    copied: t('copied'),
    close: t('close'),
  };
}