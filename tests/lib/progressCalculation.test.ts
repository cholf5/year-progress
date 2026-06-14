import { describe, it, expect } from 'vitest'
import moment from 'moment'
import { getIsoWeekForDayOfYear } from '@/lib/progressCalculation'

describe('getIsoWeekForDayOfYear', () => {
  // ISO 周参考：https://en.wikipedia.org/wiki/ISO_week_date
  it('2024-01-01 (周一) 应为第 1 周', () => {
    // 2024-01-01 是周一，且包含的周肯定含周四（1/4 周四） → 第 1 周
    expect(getIsoWeekForDayOfYear(2024, 1)).toBe(1)
  })

  it('2025-01-01 (周三) 应为第 1 周', () => {
    // 2025-01-01 是周三，所在周含 1/2 周四 → 第 1 周
    expect(getIsoWeekForDayOfYear(2025, 1)).toBe(1)
  })

  it('2023-01-01 (周日) 应为 2022 年的第 52 周（按 ISO 计入上一年）', () => {
    // 2023-01-01 是周日，所在周（2022-12-26~2023-01-01）的周四是 2022-12-29 → ISO 上为 2022 第 52 周
    expect(getIsoWeekForDayOfYear(2023, 1)).toBe(52)
  })

  it('某年第 165 天的 ISO 周应可被 moment 校验', () => {
    // 一致性测试：和 moment 的实现对齐
    for (const year of [2023, 2024, 2025, 2026]) {
      for (const day of [1, 50, 165, 300]) {
        const expected = moment([year]).dayOfYear(day).isoWeek()
        expect(getIsoWeekForDayOfYear(year, day)).toBe(expected)
      }
    }
  })
})
