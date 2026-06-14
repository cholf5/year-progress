import { describe, it, expect } from 'vitest'
import { SUPPORTED_LANGUAGES_COUNT, getCachedLanguages } from '@/lib/i18n'

describe('SUPPORTED_LANGUAGES_COUNT', () => {
  it('应等于 allTranslations 的真实键数量', () => {
    expect(SUPPORTED_LANGUAGES_COUNT).toBe(getCachedLanguages().length)
  })

  it('当前应为 29', () => {
    expect(SUPPORTED_LANGUAGES_COUNT).toBe(29)
  })
})
