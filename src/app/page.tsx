'use client';

import { useEffect, useState } from 'react';
import { calculateYearProgress } from '@/lib/yearProgress';
import { translations, type Language, getTranslation } from '@/lib/i18n';

// 工具函数：获取日期信息
const getDateInfo = (dayNumber: number, year: number, language: Language) => {
  // 从年初开始计算第 dayNumber 天（dayNumber 从 1 开始）
  const startOfYear = new Date(year, 0, 1);
  const date = new Date(startOfYear);
  date.setDate(date.getDate() + dayNumber - 1); // dayNumber-1 因为第1天是1月1日
  
  const weekNumber = Math.ceil(dayNumber / 7);
  const dayOfWeek = language === 'zh' 
    ? ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][date.getDay()]
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][date.getDay()];
  
  const monthDay = language === 'zh' 
    ? `${date.getMonth() + 1}月${date.getDate()}日`
    : `${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    
  return { weekNumber, dayOfWeek, monthDay, date };
};

export default function Home() {
  const [progress, setProgress] = useState(calculateYearProgress());
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [hoveredDay, setHoveredDay] = useState<{dayNumber: number, x: number, y: number} | null>(null);

  useEffect(() => {
    setMounted(true);
    // 每小时更新一次进度
    const interval = setInterval(() => {
      setProgress(calculateYearProgress());
    }, 60 * 60 * 1000);

    // 检查浏览器语言设置
    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('zh')) {
      setLanguage('zh');
    }

    return () => clearInterval(interval);
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
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 relative">
      {/* 语言切换按钮 */}
      <div className="absolute top-6 right-6 flex gap-2">
        <button
          onClick={() => setLanguage('en')}
          className={`px-3 py-1 rounded text-sm ${language === 'en' ? 'bg-white text-black' : 'bg-gray-700 text-gray-300'}`}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('zh')}
          className={`px-3 py-1 rounded text-sm ${language === 'zh' ? 'bg-white text-black' : 'bg-gray-700 text-gray-300'}`}
        >
          中文
        </button>
      </div>

      <div className="text-center space-y-8 max-w-4xl">
        {/* 标题 */}
        <h1 className="text-6xl md:text-7xl font-bold mb-8">
          {language === 'zh' 
            ? `${progress.year}年已过去了${progress.percentage}%`
            : `${progress.year} is ${progress.percentage}% complete.`
          }
        </h1>
        
        {/* 进度网格 */}
        <div className="flex justify-center mb-8 relative">
          <div className="bg-gray-900 p-6 rounded-xl border-2 border-gray-700">
            <div className="flex flex-col gap-1">
              {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                  {Array.from({ length: squaresPerRow }, (_, colIndex) => {
                    const dayNumber = colIndex * rows + rowIndex + 1;
                    const shouldShow = dayNumber <= totalDays;
                    
                    if (!shouldShow) {
                      return (
                        <div key={colIndex} className="w-3 h-3 md:w-4 md:h-4" />
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
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${bgColor} cursor-pointer transition-all hover:scale-110`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            dayNumber,
                            x: rect.left + rect.width / 2,
                            y: rect.top
                          });
                        }}
                        onMouseLeave={() => setHoveredDay(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* 悬停提示 */}
          {hoveredDay && (
            <div
              className="fixed z-50 bg-gray-800 text-white px-3 py-2 rounded-lg shadow-lg border border-gray-600 text-sm pointer-events-none"
              style={{
                left: hoveredDay.x,
                top: hoveredDay.y - 120,
                transform: 'translateX(-50%)',
              }}
            >
              {(() => {
                const { weekNumber, dayOfWeek, monthDay } = getDateInfo(hoveredDay.dayNumber, progress.year, language);
                const status = hoveredDay.dayNumber < daysPassed ? 'past' : 
                             hoveredDay.dayNumber === daysPassed ? 'current' : 'future';
                
                const statusText = language === 'zh' 
                  ? { past: '已过去', current: '正在过', future: '未过去' }[status]
                  : { past: 'Past', current: 'Current', future: 'Future' }[status];
                
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
        <div className="flex justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
            <span className="text-gray-400">
              {language === 'zh' ? '已过去' : 'Past'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
            <span className="text-gray-400">
              {language === 'zh' ? '正在过' : 'Current'}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-white rounded-sm"></div>
            <span className="text-gray-400">
              {language === 'zh' ? '未过去' : 'Future'}
            </span>
          </div>
        </div>

        {/* 统计信息 */}
        <p className="text-xl md:text-2xl text-gray-400">
          {language === 'zh' 
            ? `今天是${progress.year}年第${Math.ceil(daysPassed / 7)}周，第${daysPassed}天`
            : `It's week ${Math.ceil(daysPassed / 7)}, day ${daysPassed} of ${progress.year}.`
          }
        </p>

        {/* 分享说明 */}
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 max-w-2xl mx-auto">
          <h2 className="text-xl font-semibold mb-4 text-blue-400">
            📱 {t('shareInstructions')}
          </h2>
          <div className="flex items-center gap-3 bg-gray-800 p-3 rounded-lg">
            <span className="text-gray-300 flex-1 text-left font-mono text-sm">
              {typeof window !== 'undefined' ? window.location.href : ''}
            </span>
            <button
              onClick={copyToClipboard}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium transition-colors"
            >
              {copySuccess ? t('linkCopied') : t('copyLink')}
            </button>
          </div>
          <p className="text-gray-400 text-sm mt-3">
            {t('timeWaits')}
          </p>
        </div>

        {/* 底部信息 */}
        <div className="text-center space-y-2 text-gray-500 text-sm">
          <p>{t('currentDate')}: {new Date().toLocaleDateString()}</p>
          <p>
            {language === 'zh' 
              ? `已过去${daysPassed}天 • 剩余${totalDays - daysPassed}天`
              : `${daysPassed} days completed • ${totalDays - daysPassed} days remaining`
            }
          </p>
        </div>
      </div>
    </div>
  );
}
