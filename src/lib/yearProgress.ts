interface YearProgress {
  year: number;
  totalDays: number;
  daysPassed: number;
  percentage: number;
  remainingDays: number;
}

export function calculateYearProgress(): YearProgress {
  const now = new Date();
  const year = now.getFullYear();
  
  // 获取当前年份的第一天和最后一天
  const startOfYear = new Date(year, 0, 1);
  const endOfYear = new Date(year, 11, 31);
  
  // 计算总天数（考虑闰年）
  const totalDays = Math.floor((endOfYear.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // 计算已过去的天数（当前日期是第几天，从1开始计数）
  const daysPassed = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  
  // 计算进度百分比
  const percentage = Math.round((daysPassed / totalDays) * 100 * 100) / 100; // 保留两位小数
  
  // 计算剩余天数
  const remainingDays = totalDays - daysPassed;
  
  return {
    year,
    totalDays,
    daysPassed,
    percentage,
    remainingDays,
  };
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getProgressMessage(percentage: number): string {
  if (percentage < 25) {
    return '新年伊始，未来可期！';
  } else if (percentage < 50) {
    return '春光正好，继续前行！';
  } else if (percentage < 75) {
    return '夏日炎炎，斗志昂扬！';
  } else if (percentage < 90) {
    return '秋收在望，硕果累累！';
  } else {
    return '年终将至，回望来路！';
  }
}
