'use client';

import { useEffect, useState, useRef } from 'react';
import { calculateYearProgress, calculateDisplayPercentage } from '@/lib/yearProgress';
import { type Language, getTranslation, getInitialLanguage, saveLanguage, getLanguageDisplayName, formatProgressTitle, formatWeekDayText, formatPageTitle, formatMonthDay, formatDayWeekInfo, formatBottomStats, getOgLocale, translations } from '@/lib/i18n';
import { type Theme, getInitialTheme, saveTheme, applyTheme, getThemeDisplayName, getSystemTheme, getEffectiveTheme } from '@/lib/theme';
import { type Settings, type TwitterIcon as TwitterIconType, getSettings, saveSettings } from '@/lib/settings';
import SettingsModal from '@/components/SettingsModal';
import SettingsButton from '@/components/SettingsButton';
import InfoModal from '@/components/InfoModal';

// 三个共用的 hashtag 常量
const COMMON_HASHTAGS = ['YearProgress', 'YearProgressOrg', 'YearProgressBar'];

import {
  TwitterShareButton,
  FacebookShareButton,
  TelegramShareButton,
  RedditShareButton,
  WeiboShareButton,
  TwitterIcon,
  XIcon,
  FacebookIcon,
  TelegramIcon,
  RedditIcon,
  WeiboIcon,
} from 'react-share';


// 工具函数：获取日期信息
const getDateInfo = (dayNumber: number, year: number, language: Language) => {
  // 从年初开始计算第 dayNumber 天（dayNumber 从 1 开始）
  const startOfYear = new Date(year, 0, 1);
  const date = new Date(startOfYear);
  date.setDate(date.getDate() + dayNumber - 1); // dayNumber-1 因为第1天是1月1日
  
  const weekNumber = Math.ceil(dayNumber / 7);
  const weekDays = getTranslation(language, 'weekDays') as string[];
  const dayOfWeek = weekDays[date.getDay()];
  
  const monthDay = formatMonthDay(language, date);
    
  return { weekNumber, dayOfWeek, monthDay, date };
};

interface YearProgressClientProps {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function YearProgressClient({ searchParams }: YearProgressClientProps) {
  const [progress, setProgress] = useState(calculateYearProgress());
  const [settings, setSettings] = useState<Settings>(getSettings());
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('system');
  const [mounted, setMounted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{dayNumber: number, x: number, y: number} | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 375);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoModalTitle, setInfoModalTitle] = useState('');
  const [infoModalContent, setInfoModalContent] = useState('');

  // 从设置中获取当前值（用于新功能）
  const twitterIcon = settings.twitterIcon;

  // 生成带进度参数的分享URL
  const getShareUrl = () => {
    if (typeof window === 'undefined') return '';
    const baseUrl = window.location.origin + window.location.pathname;
    // 添加时间进度参数，确保分享时的OG图片显示正确的进度
    return `${baseUrl}?year=${progress.year}&day=${progress.daysPassed}&lang=${language}`;
  };

  // 生成OG图片URL（带当前进度参数）
  const getOgImageUrl = () => {
    if (typeof window === 'undefined') return '/api/og';
    const baseUrl = window.location.origin;
    
    // 如果URL中有lang参数（分享链接访问），优先使用它来保持OG图片的语言一致性
    // 否则使用当前页面的语言设置
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    const ogLang = urlLang || language;
    
    return `${baseUrl}/api/og?year=${progress.year}&day=${progress.daysPassed}&lang=${ogLang}`;
  };

  // 处理设置变更
  const handleSettingsChange = (newSettings: Settings) => {
    setSettings(newSettings);
    // 同时更新旧的状态变量以保持兼容性
    setLanguage(newSettings.language);
    setTheme(newSettings.theme);
    // 应用主题变更
    if (newSettings.theme !== theme) {
      applyTheme(newSettings.theme);
    }
  };

  // 处理信息模态窗显示
  const showInfoModalHandler = (type: 'about') => {
    let title = '';
    let content = '';
    
    switch (type) {
      case 'about':
        title = getTranslation(language, 'aboutSiteTitle') as string;
        content = getTranslation(language, 'aboutSiteContent') as string;
        break;
    }
    
    setInfoModalTitle(title);
    setInfoModalContent(content);
    setShowInfoModal(true);
  };

  useEffect(() => {
    setMounted(true);
    
    // 从Cookie/localStorage加载设置
    const savedSettings = getSettings();
    setSettings(savedSettings);
    setLanguage(savedSettings.language);
    setTheme(savedSettings.theme);
    applyTheme(savedSettings.theme);
    
    // 检查URL参数，如果有时间参数则使用，否则使用当前时间
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const yearParam = urlParams.get('year');
      const dayParam = urlParams.get('day');
      
      if (yearParam && dayParam) {
        // 使用URL中的参数计算进度（这是分享时的固定时间）
        const year = parseInt(yearParam);
        const daysPassed = parseInt(dayParam);
        
        // 基本验证
        if (!isNaN(year) && !isNaN(daysPassed) && 
            year > 0 && year < 30000 && 
            daysPassed >= 1 && daysPassed <= 366) {
          
          const isLeapYear = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
          const totalDays = isLeapYear ? 366 : 365;
          const percentage = Math.round((daysPassed / totalDays) * 100 * 100) / 100;
          const remainingDays = totalDays - daysPassed;
          
          // 使用纯函数计算显示百分比
          const { displayPercentage, isMilestone } = calculateDisplayPercentage(daysPassed, totalDays);
          
          setProgress({
            year,
            totalDays,
            daysPassed,
            percentage,
            remainingDays,
            displayPercentage,
            isMilestone
          });
        }
      } else {
        // 没有URL参数，使用当前时间并设置定时更新
        setProgress(calculateYearProgress());
        
        // 每小时更新一次进度（仅在没有URL参数时）
        const interval = setInterval(() => {
          setProgress(calculateYearProgress());
        }, 60 * 60 * 1000);
        
        // 清理定时器
        return () => {
          clearInterval(interval);
        };
      }
    }
    
    // 更新窗口宽度
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // 设置初始窗口宽度
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  // 动态更新OG meta标签和浏览器标题
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    // 更新或创建OG meta标签
    const updateOrCreateMeta = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // 更新Twitter meta标签
    const updateOrCreateTwitterMeta = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement;
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('name', name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    const ogImageUrl = getOgImageUrl();
    
    // 更新浏览器标题
    document.title = formatPageTitle(language);
    
    // 更新Apple Web App标题
    const appleTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]') as HTMLMetaElement;
    if (appleTitleMeta) {
      appleTitleMeta.setAttribute('content', getTranslation(language, 'siteName') as string);
    }
    
    // 更新OG标签
    updateOrCreateMeta('og:type', 'website');
    updateOrCreateMeta('og:locale', getOgLocale(language));
    updateOrCreateMeta('og:url', window.location.href);
    updateOrCreateMeta('og:title', formatPageTitle(language));
    updateOrCreateMeta('og:description', getTranslation(language, 'description') as string);
    updateOrCreateMeta('og:site_name', getTranslation(language, 'siteName') as string);
    updateOrCreateMeta('og:image', ogImageUrl);
    updateOrCreateMeta('og:image:width', '1200');
    updateOrCreateMeta('og:image:height', '630');
    updateOrCreateMeta('og:image:alt', formatPageTitle(language));

    // 更新Twitter标签
    updateOrCreateTwitterMeta('twitter:card', 'summary_large_image');
    updateOrCreateTwitterMeta('twitter:title', formatPageTitle(language));
    updateOrCreateTwitterMeta('twitter:description', getTranslation(language, 'description') as string);
    updateOrCreateTwitterMeta('twitter:image', ogImageUrl);
    updateOrCreateTwitterMeta('twitter:creator', '@yearofprogress');

  }, [mounted, language, progress.year, progress.daysPassed, getOgImageUrl]);

  // 单独的useEffect用于系统主题监听
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleSystemThemeChange = () => {
      // 只有当用户选择"跟随系统"时才响应系统主题变化
      const savedTheme = localStorage.getItem('theme') as Theme;
      if (savedTheme === 'system' || !savedTheme) {
        applyTheme('system');
      }
    };

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, []);

  // 主题初始化 - 只在组件挂载时执行一次
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const initialTheme = getInitialTheme();
      setTheme(initialTheme);
      applyTheme(initialTheme);
    }
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
        <div className="animate-pulse">
          <div className="w-96 h-64 bg-gray-100 dark:bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const t = (key: keyof import('@/lib/i18n').Translation) => getTranslation(language, key);

  // 创建像素网格数据
  const totalDays = progress.totalDays;
  const squaresPerRow = 53;
  const rows = 7;
  const daysPassed = progress.daysPassed;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col transition-colors duration-300">
      
      {/* 主要内容区域 */}
      <div className="flex-1 flex flex-col items-center justify-center p-3 sm:p-6 relative">
        {/* 设置按钮 */}
        <div className="absolute top-3 right-3 sm:top-6 sm:right-6">
          <SettingsButton onClick={() => setShowSettingsModal(true)} />
        </div>

      {/* 设置模态框 */}
      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        currentLanguage={language}
        currentTheme={theme}
        onSettingsChange={handleSettingsChange}
      />

      <div className="text-center space-y-4 sm:space-y-8 max-w-7xl w-full">
        {/* 标题 */}
        <h1 className={`text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-8 px-2 leading-tight ${
          progress.isMilestone ? 'animate-pulse text-blue-600 dark:text-blue-400' : ''
        }`}>
          {formatProgressTitle(language, progress.year, progress.displayPercentage)}
        </h1>
        
        {/* 进度网格 */}
        <div className="flex justify-center mb-4 sm:mb-8 relative px-1">
          <div className="bg-gray-100 p-2 sm:p-3 md:p-6 rounded-xl border-2 border-gray-300 max-w-full overflow-hidden transition-colors duration-300">
            <div 
              className="flex flex-col"
              style={{
                gap: windowWidth < 640 ? '2px' : '4px'
              }}
            >
              {Array.from({ length: rows }, (_, rowIndex) => (
                <div 
                  key={rowIndex} 
                  className="flex"
                  style={{
                    gap: windowWidth < 640 ? '2px' : '4px'
                  }}
                >
                  {Array.from({ length: squaresPerRow }, (_, colIndex) => {
                    const dayNumber = colIndex * rows + rowIndex + 1;
                    const shouldShow = dayNumber <= totalDays;
                    
                    // 更精确的方块大小计算
                    let squareSize: number;
                    const gapSize = windowWidth < 640 ? 2 : 4;
                    
                    if (windowWidth < 400) {
                      // 超小屏幕
                      const availableWidth = windowWidth - 24 - 16; // 外padding + 内padding
                      const gapTotal = gapSize * (squaresPerRow - 1);
                      squareSize = Math.max(2, Math.floor((availableWidth - gapTotal) / squaresPerRow));
                    } else if (windowWidth < 640) {
                      // 小屏幕
                      const availableWidth = windowWidth - 24 - 16; // 外padding + 内padding
                      const gapTotal = gapSize * (squaresPerRow - 1);
                      squareSize = Math.max(3, Math.floor((availableWidth - gapTotal) / squaresPerRow));
                    } else if (windowWidth < 768) {
                      // 中等屏幕
                      squareSize = 8;
                    } else if (windowWidth < 1024) {
                      // 大屏幕
                      squareSize = 12;
                    } else {
                      // 超大屏幕
                      squareSize = 16;
                    }
                    
                    // 确保总宽度不会超出，做最终调整
                    const totalWidth = squaresPerRow * squareSize + gapSize * (squaresPerRow - 1);
                    const containerPadding = windowWidth < 640 ? 16 : windowWidth < 768 ? 24 : 48;
                    const maxAllowedWidth = windowWidth - 24 - containerPadding - 8; // 留一些安全边距
                    
                    if (totalWidth > maxAllowedWidth && maxAllowedWidth > 0) {
                      const gapTotal = gapSize * (squaresPerRow - 1);
                      squareSize = Math.max(2, Math.floor((maxAllowedWidth - gapTotal) / squaresPerRow));
                    }
                    
                    if (!shouldShow) {
                      return (
                        <div 
                          key={colIndex} 
                          style={{
                            width: `${squareSize}px`,
                            height: `${squareSize}px`,
                            flexShrink: 0
                          }}
                        />
                      );
                    }

                    // 判断方块状态并设置颜色
                    let bgColor: string;
                    
                    if (dayNumber < daysPassed) {
                      bgColor = 'bg-emerald-500 dark:bg-emerald-400'; // 已过去 - 绿色
                    } else if (dayNumber === daysPassed) {
                      bgColor = 'bg-yellow-500 dark:bg-yellow-400'; // 正在过 - 黄色
                    } else {
                      bgColor = 'bg-gray-300 dark:bg-gray-600'; // 未过去 - 灰色
                    }
                    
                    return (
                      <div
                        key={colIndex}
                        className={`rounded-sm ${bgColor} cursor-pointer transition-all duration-300 hover:scale-110 active:scale-95 ${
                          dayNumber < daysPassed ? 'shadow-lg shadow-emerald-500/30' : ''
                        }`}
                        style={{
                          width: `${squareSize}px`,
                          height: `${squareSize}px`,
                          flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            dayNumber,
                            x: rect.left + rect.width / 2,
                            y: rect.top
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                        onClick={(e) => {
                          // 移动端点击显示提示
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            dayNumber,
                            x: rect.left + rect.width / 2,
                            y: rect.top
                          });
                          // 3秒后自动隐藏
                          setTimeout(() => setHoveredDay(null), 3000);
                        }}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* 悬停提示 - 针对移动端优化 */}
          {hoveredDay && (
            <div
              className="fixed z-50 bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-3 py-2 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 text-xs sm:text-sm pointer-events-none transition-colors duration-300"
              style={{
                left: Math.min(Math.max(hoveredDay.x, 100), windowWidth - 100),
                top: hoveredDay.y - 140,
                transform: 'translateX(-50%)',
              }}
            >
              {(() => {
                const { weekNumber, dayOfWeek, monthDay } = getDateInfo(hoveredDay.dayNumber, progress.year, language);
                const status = hoveredDay.dayNumber < daysPassed ? 'past' : 
                             hoveredDay.dayNumber === daysPassed ? 'current' : 'future';
                
                const statusText = getTranslation(language, status) as string;
                
                return (
                  <div className="text-center space-y-1">
                    <div className="font-semibold">{monthDay}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">
                      {formatDayWeekInfo(language, hoveredDay.dayNumber, weekNumber)}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-300">{dayOfWeek}</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      status === 'past' ? 'bg-emerald-500 dark:bg-emerald-400 text-white shadow-md border border-emerald-500 dark:border-emerald-400' :
                      status === 'current' ? 'bg-yellow-500 dark:bg-yellow-400 text-black shadow-md border border-yellow-500 dark:border-yellow-400' : 
                      'bg-gray-300 dark:bg-gray-600 text-gray-800 shadow-md border border-gray-400 dark:border-gray-500'
                    }`}>
                      {statusText}
                    </div>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* 颜色图例 */}
        <div className="flex justify-center gap-3 sm:gap-6 text-xs sm:text-sm px-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-emerald-500 dark:bg-emerald-400 rounded-sm"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {getTranslation(language, 'past')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 dark:bg-yellow-400 rounded-sm"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {getTranslation(language, 'current')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 dark:bg-gray-600 rounded-sm"></div>
            <span className="text-gray-600 dark:text-gray-400">
              {getTranslation(language, 'future')}
            </span>
          </div>
        </div>

        {/* 统计信息 */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-400 px-2 transition-colors duration-300">
          {formatWeekDayText(language, Math.ceil(daysPassed / 7), daysPassed, progress.year)}
        </p>

        {/* 分享说明 */}
        <div className="bg-gray-900 p-4 sm:p-6 rounded-xl border border-gray-700 max-w-2xl mx-auto">
          <h2 className="text-lg sm:text-xl font-semibold mb-4 text-blue-400 text-center">
            📱 {t('shareToSocialMedia')}
          </h2>
          <p className="text-gray-400 text-xs sm:text-sm mb-6 text-center">
            {t('clickToShare')}
          </p>
          
          {/* 社交媒体分享按钮 */}
          <div id="social-share-buttons" className="flex flex-wrap justify-center items-center gap-3">
            <TwitterShareButton
              url={getShareUrl()}
              title={formatProgressTitle(language, progress.year, progress.displayPercentage)}
              hashtags={[...COMMON_HASHTAGS, ...getTranslation(language, 'socialHashtags') as string[]]}
              className="hover:scale-110 transition-transform social-share-button"
            >
              {twitterIcon === 'x' ? <XIcon size={40} round /> : <TwitterIcon size={40} round />}
            </TwitterShareButton>

            <FacebookShareButton
              url={getShareUrl()}
              className="hover:scale-110 transition-transform social-share-button"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TelegramShareButton
              url={getShareUrl()}
              title={formatProgressTitle(language, progress.year, progress.displayPercentage)}
              className="hover:scale-110 transition-transform social-share-button"
            >
              <TelegramIcon size={40} round />
            </TelegramShareButton>

            <RedditShareButton
              url={getShareUrl()}
              title={formatProgressTitle(language, progress.year, progress.displayPercentage)}
              className="hover:scale-110 transition-transform social-share-button"
            >
              <RedditIcon size={40} round />
            </RedditShareButton>

            <WeiboShareButton
              url={getShareUrl()}
              title={`${formatProgressTitle(language, progress.year, progress.displayPercentage)} ${getTranslation(language, 'socialHashtags') ? '#' + (getTranslation(language, 'socialHashtags') as string[]).join(' #') : ''}`}
              className="hover:scale-110 transition-transform social-share-button"
            >
              <WeiboIcon size={40} round />
            </WeiboShareButton>

            {/* Instagram 分享（使用自定义按钮，因为 react-share 不直接支持 Instagram） */}
            <button
              onClick={() => {
                const text = formatProgressTitle(language, progress.year, progress.displayPercentage);
                const url = getShareUrl();
                
                // 检测是否为移动设备
                const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
                
                if (isMobile) {
                  // 尝试打开 Instagram App
                  window.open(`instagram://camera`, '_blank');
                  // 备用：复制内容到剪贴板
                  navigator.clipboard.writeText(`${text}\n${url}`);
                } else {
                  // 桌面端打开 Instagram 网页版
                  window.open('https://www.instagram.com/', '_blank');
                  navigator.clipboard.writeText(`${text}\n${url}`);
                }
              }}
              className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 flex items-center justify-center hover:scale-110 transition-transform"
              title="Share to Instagram"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </button>
          </div>

          {/* 备用复制链接 */}
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <p className="text-gray-500 dark:text-gray-400 text-xs text-center mb-3 transition-colors duration-300">
              {t('orCopyLink')}
            </p>
            <div className="flex justify-center">
              <div className="flex items-center gap-3 bg-gray-100 px-4 py-3 rounded-lg transition-colors duration-300 copy-container w-96">
                <span className="text-gray-700 dark:text-gray-300 font-mono text-xs transition-colors duration-300 flex-1 text-center min-w-0">
                  {getShareUrl()}
                </span>
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors shrink-0"
                >
                  {copySuccess ? t('copied') : t('copy')}
                </button>
              </div>
            </div>
          </div>

          <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm mt-4 text-center transition-colors duration-300">
            {t('timeWaits')}
          </p>
        </div>

        {/* 底部信息 */}
        <div className="text-center space-y-2 text-gray-500 dark:text-gray-400 text-xs sm:text-sm px-2 transition-colors duration-300">
          <p>{t('currentDate')}: {new Date().toLocaleDateString()}</p>
          <p className="break-words">
            {formatBottomStats(language, daysPassed, totalDays)}
          </p>
        </div>
      </div>
      {/* 关闭主要内容区域 */}
      </div>

      {/* 低调页脚 */}
      <footer className="py-4 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 版权信息和关于链接 */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 text-xs">
            <span className="text-gray-500 dark:text-gray-600">© {new Date().getFullYear()} YearProgress.org</span>
            <span className="hidden sm:inline text-gray-500 dark:text-gray-600">•</span>
            <button
              onClick={() => showInfoModalHandler('about')}
              className="footer-link text-gray-500 dark:text-gray-600 hover:text-gray-400 dark:hover:text-gray-500 underline transition-colors duration-200"
            >
              {getTranslation(language, 'aboutSite') as string}
            </button>
          </div>
        </div>
      </footer>

      {/* 信息模态窗 */}
      <InfoModal
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
        title={infoModalTitle}
        content={infoModalContent}
      />
    </div>
  );
}
