'use client';

import { useEffect, useState } from 'react';
import { calculateYearProgress } from '@/lib/yearProgress';
import { translations, type Language, getTranslation } from '@/lib/i18n';

export default function Home() {
  const [progress, setProgress] = useState(calculateYearProgress());
  const [language, setLanguage] = useState<Language>('en');
  const [mounted, setMounted] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

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
        <div className="flex justify-center mb-8">
          <div className="bg-gray-900 p-6 rounded-xl border-2 border-gray-700">
            <div className="flex flex-col gap-1">
              {Array.from({ length: rows }, (_, rowIndex) => (
                <div key={rowIndex} className="flex gap-1">
                  {Array.from({ length: squaresPerRow }, (_, colIndex) => {
                    const dayNumber = colIndex * rows + rowIndex + 1;
                    const isFilled = dayNumber <= daysPassed && dayNumber <= totalDays;
                    const shouldShow = dayNumber <= totalDays;
                    
                    if (!shouldShow) {
                      return (
                        <div key={colIndex} className="w-3 h-3 md:w-4 md:h-4" />
                      );
                    }
                    
                    return (
                      <div
                        key={colIndex}
                        className={`w-3 h-3 md:w-4 md:h-4 rounded-sm ${
                          isFilled ? 'bg-green-500' : 'bg-white'
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
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
