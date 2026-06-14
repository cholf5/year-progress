import { describe, it, expect } from 'vitest'
import { getTranslation, formatProgressTitle } from '@/lib/i18n'

describe('getTranslation - {year} 占位符', () => {
  it('不应在 getTranslation 内部替换 {year}，应保留给业务层 helper', () => {
    const template = getTranslation('en', 'progressTitle') as string
    expect(template).toContain('{year}')
    expect(template).toContain('{percentage}')
  })

  it('formatProgressTitle 应正确替换调用方传入的年份', () => {
    const result = formatProgressTitle('en', 2024, 27)
    expect(result).toBe('2024 is 27% complete')
  })

  it('formatProgressTitle 对未来年份也应正确显示', () => {
    const result = formatProgressTitle('en', 2030, 5)
    expect(result).toBe('2030 is 5% complete')
  })

  it('{supportedLanguagesCount} 应被正确替换', () => {
    const aboutContent = getTranslation('en', 'aboutSiteContent') as string
    expect(aboutContent).not.toContain('{supportedLanguagesCount}')
    expect(aboutContent).toMatch(/\d+/)
  })
})
