'use client';

import { useEffect, useState, useRef } from 'react';
import { calculateYearProgress } from '@/lib/yearProgress';
import { translations, type Language, getTranslation, detectLanguage, getLanguageDisplayName } from '@/lib/i18n';
import {
  TwitterShareButton,
  FacebookShareButton,
  TelegramShareButton,
  RedditShareButton,
  WeiboShareButton,
  TwitterIcon,
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
  
  const monthDay = language === 'zh' 
    ? `${date.getMonth() + 1}月${date.getDate()}日`
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    
  return { weekNumber, dayOfWeek, monthDay, date };
};

export default function Home() {
  const [progress, setProgress] = useState(calculateYearProgress());
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{dayNumber: number, x: number, y: number} | null>(null);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 375);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const hideMenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 显示语言菜单
  const handleShowLanguageMenu = () => {
    if (hideMenuTimeoutRef.current) {
      clearTimeout(hideMenuTimeoutRef.current);
      hideMenuTimeoutRef.current = null;
    }
    setShowLanguageMenu(true);
  };

  // 隐藏语言菜单（带延迟）
  const handleHideLanguageMenu = () => {
    hideMenuTimeoutRef.current = setTimeout(() => {
      setShowLanguageMenu(false);
    }, 150); // 150ms 延迟，允许用户移动到下拉列表
  };

  useEffect(() => {
    setMounted(true);
    
    // 更新窗口宽度
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // 设置初始窗口宽度
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }
    
    // 每小时更新一次进度
    const interval = setInterval(() => {
      setProgress(calculateYearProgress());
    }, 60 * 60 * 1000);

    // 检查浏览器语言设置
    const browserLang = navigator.language;
    setLanguage(detectLanguage(browserLang));

    return () => {
      clearInterval(interval);
      if (hideMenuTimeoutRef.current) {
        clearTimeout(hideMenuTimeoutRef.current);
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="animate-pulse">
          <div className="w-96 h-64 bg-gray-800 rounded-lg"></div>
        </div>
      </div>
    );
  }

  const t = (key: keyof typeof translations.en) => getTranslation(language, key);

  // 创建像素网格数据
  const totalDays = progress.totalDays;
  const squaresPerRow = 53;
  const rows = 7;
  const daysPassed = progress.daysPassed;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-3 sm:p-6 relative">
      {/* 语言切换按钮 */}
      <div 
        className="absolute top-3 right-3 sm:top-6 sm:right-6 language-selector"
        onMouseEnter={handleShowLanguageMenu}
        onMouseLeave={handleHideLanguageMenu}
      >
        <button
          className="px-3 py-2 bg-gray-900 hover:bg-gray-800 border border-gray-700 hover:border-gray-600 rounded-lg text-xs sm:text-sm text-gray-300 hover:text-white transition-all duration-200 flex items-center gap-2 shadow-lg backdrop-blur-sm"
        >
          🌐 {getLanguageDisplayName(language)}
          <svg className={`w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 ${showLanguageMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {showLanguageMenu && (
          <div className="absolute top-full right-0 mt-1 w-40 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 max-h-72 overflow-y-auto backdrop-blur-sm">
            <div className="p-1">
              {(Object.keys(translations) as Language[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setShowLanguageMenu(false);
                  }}
                  className={`w-full px-3 py-2.5 text-center hover:bg-gray-800 transition-all duration-200 text-sm rounded-lg ${
                    language === lang 
                      ? 'bg-gray-800 text-white shadow-inner border border-gray-600' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {getLanguageDisplayName(lang)}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="text-center space-y-4 sm:space-y-8 max-w-7xl w-full">
        {/* 标题 */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-8 px-2 leading-tight">
          {(() => {
            const template = t('progressTitle') as string;
            return template
              .replace('{year}', progress.year.toString())
              .replace('{percentage}', progress.percentage.toString());
          })()}
        </h1>
        
        {/* 进度网格 */}
        <div className="flex justify-center mb-4 sm:mb-8 relative px-1">
          <div className="bg-gray-900 p-2 sm:p-3 md:p-6 rounded-xl border-2 border-gray-700 max-w-full overflow-hidden">
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
                      bgColor = 'bg-green-500'; // 已过去 - 绿色
                    } else if (dayNumber === daysPassed) {
                      bgColor = 'bg-yellow-500'; // 正在过 - 黄色
                    } else {
                      bgColor = 'bg-white'; // 未过去 - 白色
                    }
                    
                    return (
                      <div
                        key={colIndex}
                        className={`rounded-sm ${bgColor} cursor-pointer transition-all hover:scale-110 active:scale-95`}
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
              className="fixed z-50 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-600 text-xs sm:text-sm pointer-events-none"
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
                    <div className="text-xs text-gray-300">
                      {language === 'zh' 
                        ? `全年第${hoveredDay.dayNumber}天 • 第${weekNumber}周`
                        : `Day ${hoveredDay.dayNumber} • Week ${weekNumber}`
                      }
                    </div>
                    <div className="text-xs text-gray-300">{dayOfWeek}</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      status === 'past' ? 'bg-green-600' :
                      status === 'current' ? 'bg-yellow-600' : 'bg-gray-600'
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
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-sm"></div>
            <span className="text-gray-400">
              {getTranslation(language, 'past')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-sm"></div>
            <span className="text-gray-400">
              {getTranslation(language, 'current')}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-sm"></div>
            <span className="text-gray-400">
              {getTranslation(language, 'future')}
            </span>
          </div>
        </div>

        {/* 统计信息 */}
        <p className="text-lg sm:text-xl md:text-2xl text-gray-400 px-2">
          {language === 'zh' 
            ? `今天是${progress.year}年第${Math.ceil(daysPassed / 7)}周，第${daysPassed}天`
            : `It's ${t('week')} ${Math.ceil(daysPassed / 7)}, ${t('day')} ${daysPassed} ${t('of')} ${progress.year}.`
          }
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
          <div className="flex flex-wrap justify-center items-center gap-3">
            <TwitterShareButton
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title={language === 'zh' 
                ? `${progress.year}年已过去了${progress.percentage}%`
                : `${progress.year} is ${progress.percentage}% complete.`
              }
              hashtags={language === 'zh' 
                ? ['年度进度', '时间管理', '进度追踪']
                : ['yearProgress', 'timeTracking', 'progressBar']
              }
              className="hover:scale-110 transition-transform"
            >
              <TwitterIcon size={40} round />
            </TwitterShareButton>

            <FacebookShareButton
              url={typeof window !== 'undefined' ? window.location.href : ''}
              className="hover:scale-110 transition-transform"
            >
              <FacebookIcon size={40} round />
            </FacebookShareButton>

            <TelegramShareButton
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title={language === 'zh' 
                ? `${progress.year}年已过去了${progress.percentage}% - 年度进度追踪`
                : `${progress.year} is ${progress.percentage}% complete - Year Progress Tracker`
              }
              className="hover:scale-110 transition-transform"
            >
              <TelegramIcon size={40} round />
            </TelegramShareButton>

            <RedditShareButton
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title={language === 'zh' 
                ? `${progress.year}年已过去了${progress.percentage}% - 年度进度可视化`
                : `${progress.year} is ${progress.percentage}% complete - Year Progress Visualization`
              }
              className="hover:scale-110 transition-transform"
            >
              <RedditIcon size={40} round />
            </RedditShareButton>

            <WeiboShareButton
              url={typeof window !== 'undefined' ? window.location.href : ''}
              title={language === 'zh' 
                ? `${progress.year}年已过去了${progress.percentage}% - 年度进度追踪 #年度进度 #时间管理`
                : `${progress.year} is ${progress.percentage}% complete - Year Progress Tracker #yearProgress #timeTracking`
              }
              className="hover:scale-110 transition-transform"
            >
              <WeiboIcon size={40} round />
            </WeiboShareButton>

            {/* Instagram 分享（使用自定义按钮，因为 react-share 不直接支持 Instagram） */}
            <button
              onClick={() => {
                const text = language === 'zh' 
                  ? `${progress.year}年已过去了${progress.percentage}%`
                  : `${progress.year} is ${progress.percentage}% complete.`;
                const url = typeof window !== 'undefined' ? window.location.href : '';
                
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
          <div className="mt-6 pt-4 border-t border-gray-700">
            <p className="text-gray-500 text-xs text-center mb-3">
              {t('orCopyLink')}
            </p>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 bg-gray-800 p-3 rounded-lg">
              <span className="text-gray-300 flex-1 text-left font-mono text-xs break-all">
                {typeof window !== 'undefined' ? window.location.href : ''}
              </span>
              <button
                onClick={copyToClipboard}
                className="bg-gray-600 hover:bg-gray-700 px-3 py-2 rounded text-xs font-medium transition-colors shrink-0"
              >
                {copySuccess ? t('copied') : t('copy')}
              </button>
            </div>
          </div>

          <p className="text-gray-400 text-xs sm:text-sm mt-4 text-center">
            {t('timeWaits')}
          </p>
        </div>

        {/* 底部信息 */}
        <div className="text-center space-y-2 text-gray-500 text-xs sm:text-sm px-2">
          <p>{t('currentDate')}: {new Date().toLocaleDateString()}</p>
          <p className="break-words">
            {language === 'zh' 
              ? `已过去${daysPassed}天 • 剩余${totalDays - daysPassed}天`
              : `${daysPassed} ${t('daysCompleted')} • ${totalDays - daysPassed} ${t('daysRemaining')}`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
