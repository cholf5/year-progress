import { YearProgressCalculation, calculateYearProgressForDate, calculateDisplayPercentage, calculateYearProgressForParams } from './progressCalculation';

// 保持向后兼容的接口
export type YearProgress = YearProgressCalculation;

export { calculateDisplayPercentage, calculateYearProgressForParams };

// 计算当前年度进度
export function calculateYearProgress(): YearProgress {
  return calculateYearProgressForDate(new Date());
}
