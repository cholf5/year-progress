'use client';

import { useEffect, useState } from 'react';
import { calculateYearProgress, formatDate, getProgressMessage } from '@/lib/yearProgress';

export default function ProgressCard() {
  const [progress, setProgress] = useState(calculateYearProgress());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 每小时更新一次进度
    const interval = setInterval(() => {
      setProgress(calculateYearProgress());
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="animate-pulse">
          <div className="w-96 h-64 bg-white rounded-3xl shadow-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 p-4">
      <div className="w-full max-w-lg">
        {/* 主卡片 */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
          {/* 头部信息 */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {progress.year} 年度进度
            </h1>
            <p className="text-gray-600">
              {formatDate(new Date())}
            </p>
          </div>

          {/* 进度环 */}
          <div className="relative mb-8">
            <div className="flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* 背景圆环 */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="transparent"
                    className="opacity-20"
                  />
                  {/* 进度圆环 */}
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#progressGradient)"
                    strokeWidth="8"
                    fill="transparent"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 45}`}
                    strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress.percentage / 100)}`}
                    className="transition-all duration-1000 ease-out"
                  />
                  {/* 渐变定义 */}
                  <defs>
                    <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                  </defs>
                </svg>
                
                {/* 中心百分比 */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className={`text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
                    progress.isMilestone ? 'animate-pulse' : ''
                  }`}>
                    {progress.displayPercentage}%
                  </span>
                  <span className="text-sm text-gray-500 mt-1">已完成</span>
                </div>
              </div>
            </div>
          </div>

          {/* 详细信息 */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl">
              <span className="text-gray-600">已过去天数</span>
              <span className="font-semibold text-blue-600">{progress.daysPassed} 天</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl">
              <span className="text-gray-600">剩余天数</span>
              <span className="font-semibold text-purple-600">{progress.remainingDays} 天</span>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-gradient-to-r from-pink-50 to-indigo-50 rounded-2xl">
              <span className="text-gray-600">全年总计</span>
              <span className="font-semibold text-pink-600">{progress.totalDays} 天</span>
            </div>
          </div>

          {/* 励志文案 */}
          <div className="text-center p-4 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl">
            <p className="text-gray-700 font-medium">
              {getProgressMessage(progress.percentage)}
            </p>
          </div>

          {/* 分享按钮 */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `我的 ${progress.year} 年度进度`,
                    text: `今年已经过去了 ${progress.displayPercentage}%，还有 ${progress.remainingDays} 天！`,
                    url: window.location.href,
                  });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('链接已复制到剪贴板！');
                }
              }}
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-xl font-medium hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              分享进度
            </button>
            
            <button
              onClick={() => window.location.reload()}
              className="bg-white text-gray-600 py-3 px-6 rounded-xl font-medium border border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              刷新
            </button>
          </div>
        </div>

        {/* 底部说明 */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <p>时间不等人，珍惜每一天 ✨</p>
        </div>
      </div>
    </div>
  );
}
