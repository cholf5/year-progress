'use client';

import { useState, useEffect, useCallback } from 'react';
import { Language, formatProgressTitle as formatProgressTitleAsync, formatWeekDayText as formatWeekDayTextAsync, formatPageTitle as formatPageTitleAsync, formatMonthDay as formatMonthDayAsync, formatDayWeekInfo as formatDayWeekInfoAsync, formatBottomStats as formatBottomStatsAsync } from '@/lib/i18n';

// 格式化函数的缓存
const formatCache = new Map<string, string>();

export function useFormattedText(language: Language) {
  const [formattedTexts, setFormattedTexts] = useState<Map<string, string>>(new Map());
  const [loading, setLoading] = useState(true);

  // 格式化进度标题
  const formatProgressTitle = useCallback(async (year: number, percentage: number): Promise<string> => {
    const cacheKey = `progressTitle-${language}-${year}-${percentage}`;
    
    if (formatCache.has(cacheKey)) {
      return formatCache.get(cacheKey)!;
    }

    try {
      const result = await formatProgressTitleAsync(language, year, percentage);
      formatCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Failed to format progress title:', error);
      return `${year} is ${percentage}% complete`;
    }
  }, [language]);

  // 格式化周日信息
  const formatWeekDayText = useCallback(async (weekNumber: number, dayNumber: number, year: number): Promise<string> => {
    const cacheKey = `weekDay-${language}-${weekNumber}-${dayNumber}-${year}`;
    
    if (formatCache.has(cacheKey)) {
      return formatCache.get(cacheKey)!;
    }

    try {
      const result = await formatWeekDayTextAsync(language, weekNumber, dayNumber, year);
      formatCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Failed to format week day text:', error);
      return `Today is week ${weekNumber}, day ${dayNumber} of ${year}.`;
    }
  }, [language]);

  // 格式化页面标题
  const formatPageTitle = useCallback(async (): Promise<string> => {
    const cacheKey = `pageTitle-${language}`;
    
    if (formatCache.has(cacheKey)) {
      return formatCache.get(cacheKey)!;
    }

    try {
      const result = await formatPageTitleAsync(language);
      formatCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Failed to format page title:', error);
      return 'YearProgress.org - Real-time Yearly Progress Visualization';
    }
  }, [language]);

  // 格式化月日信息
  const formatMonthDay = useCallback(async (date: Date): Promise<string> => {
    const key = `${date.getMonth()}-${date.getDate()}`;
    const cacheKey = `monthDay-${language}-${key}`;
    
    if (formatCache.has(cacheKey)) {
      return formatCache.get(cacheKey)!;
    }

    try {
      const result = await formatMonthDayAsync(language, date);
      formatCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Failed to format month day:', error);
      return `${date.getMonth() + 1}/${date.getDate()}`;
    }
  }, [language]);

  // 格式化天数周数信息
  const formatDayWeekInfo = useCallback(async (dayNumber: number, weekNumber: number): Promise<string> => {
    const cacheKey = `dayWeek-${language}-${dayNumber}-${weekNumber}`;
    
    if (formatCache.has(cacheKey)) {
      return formatCache.get(cacheKey)!;
    }

    try {
      const result = await formatDayWeekInfoAsync(language, dayNumber, weekNumber);
      formatCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Failed to format day week info:', error);
      return `Day ${dayNumber} • Week ${weekNumber}`;
    }
  }, [language]);

  // 格式化底部统计信息
  const formatBottomStats = useCallback(async (daysPassed: number, totalDays: number): Promise<string> => {
    const cacheKey = `bottomStats-${language}-${daysPassed}-${totalDays}`;
    
    if (formatCache.has(cacheKey)) {
      return formatCache.get(cacheKey)!;
    }

    try {
      const result = await formatBottomStatsAsync(language, daysPassed, totalDays);
      formatCache.set(cacheKey, result);
      return result;
    } catch (error) {
      console.error('Failed to format bottom stats:', error);
      return `${daysPassed} days completed • ${totalDays - daysPassed} days remaining`;
    }
  }, [language]);

  // 预加载常用格式化文本
  useEffect(() => {
    const preloadCommonFormats = async () => {
      setLoading(true);
      try {
        const currentDate = new Date();
        await Promise.all([
          formatPageTitle(),
          formatMonthDay(currentDate),
          formatDayWeekInfo(currentDate.getDate(), Math.ceil(currentDate.getDate() / 7)),
          formatProgressTitle(currentDate.getFullYear(), Math.floor((currentDate.getTime() - new Date(currentDate.getFullYear(), 0, 1).getTime()) / (365 * 24 * 60 * 60 * 1000) * 100))
        ]);
      } catch (error) {
        console.error('Failed to preload formats:', error);
      } finally {
        setLoading(false);
      }
    };

    preloadCommonFormats();
  }, [language, formatPageTitle, formatMonthDay, formatDayWeekInfo, formatProgressTitle]);

  return {
    formatProgressTitle,
    formatWeekDayText,
    formatPageTitle,
    formatMonthDay,
    formatDayWeekInfo,
    formatBottomStats,
    loading
  };
}