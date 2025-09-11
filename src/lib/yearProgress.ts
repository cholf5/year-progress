import { YearProgressCalculation, calculateYearProgressForDate, calculateDisplayPercentage, calculateYearProgressForParams } from './progressCalculation';

// 保持向后兼容的接口
export type YearProgress = YearProgressCalculation;

// 导出公共函数以保持向后兼容
export { calculateDisplayPercentage, calculateYearProgressForParams };

// 计算当前年度进度（使用公共逻辑）
export function calculateYearProgress(): YearProgress {
  return calculateYearProgressForDate(new Date());
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
