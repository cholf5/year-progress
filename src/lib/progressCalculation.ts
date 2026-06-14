import moment from 'moment';

// 公共的年度进度计算逻辑
export interface YearProgressCalculation {
  year: number;
  totalDays: number;
  daysPassed: number;
  percentage: number;
  remainingDays: number;
  displayPercentage: number;
  isMilestone: boolean;
}

// 计算显示百分比和里程碑状态（无状态纯函数）
export function calculateDisplayPercentage(daysPassed: number, totalDays: number): { displayPercentage: number, isMilestone: boolean } {
  if (daysPassed <= 0) return { displayPercentage: 0, isMilestone: false };
  
  const currentPercentage = (daysPassed * 100) / totalDays;
  const prevPercentage = ((daysPassed - 1) * 100) / totalDays;
  
  const currentInteger = Math.floor(currentPercentage);
  const prevInteger = Math.floor(prevPercentage);
  
  const isMilestone = currentInteger > prevInteger;
  const displayPercentage = isMilestone ? currentInteger : currentPercentage;
  
  return { 
    displayPercentage: Math.round(displayPercentage * 100) / 100, // 保留两位小数
    isMilestone 
  };
}

// 计算指定日期的年度进度
export function calculateYearProgressForDate(date: Date, year?: number): YearProgressCalculation {
  const targetYear = year || date.getFullYear();

  // 使用 moment.js 计算总天数（考虑闰年）
  const totalDays = moment([targetYear]).isLeapYear() ? 366 : 365;

  // 使用 moment.js 计算已过去的天数（当前日期是第几天，从1开始计数）
  const daysPassed = moment(date).dayOfYear();
  
  // 计算进度百分比
  const percentage = Math.round((daysPassed / totalDays) * 100 * 100) / 100; // 保留两位小数
  
  // 计算剩余天数
  const remainingDays = totalDays - daysPassed;
  
  // 计算显示百分比和里程碑状态
  const { displayPercentage, isMilestone } = calculateDisplayPercentage(daysPassed, totalDays);
  
  return {
    year: targetYear,
    totalDays,
    daysPassed,
    percentage,
    remainingDays,
    displayPercentage,
    isMilestone,
  };
}

// 计算指定年月日的年度进度（用于参数化调用）
export function calculateYearProgressForParams(year: number, daysPassed: number): YearProgressCalculation {
  // 基本验证
  if (isNaN(year) || isNaN(daysPassed) ||
      year < 0 || year > 30000 ||
      daysPassed < 1 || daysPassed > 366) {
    throw new Error('Invalid parameters');
  }

  // 使用 moment.js 计算是否为闰年
  const totalDays = moment([year]).isLeapYear() ? 366 : 365;
  
  // 计算进度百分比
  const percentage = Math.round((daysPassed / totalDays) * 100 * 100) / 100; // 保留两位小数
  
  // 计算剩余天数
  const remainingDays = totalDays - daysPassed;
  
  // 计算显示百分比和里程碑状态
  const { displayPercentage, isMilestone } = calculateDisplayPercentage(daysPassed, totalDays);
  
  return {
    year,
    totalDays,
    daysPassed,
    percentage,
    remainingDays,
    displayPercentage,
    isMilestone,
  };
}

// 计算指定年份某一天所属的 ISO-8601 周编号（与 moment.isoWeek 一致）
export function getIsoWeekForDayOfYear(year: number, dayOfYear: number): number {
  return moment([year]).dayOfYear(dayOfYear).isoWeek();
}