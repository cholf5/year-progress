import { describe, it, expect } from 'vitest'
import sitemap from '@/app/sitemap'
import { getCachedLanguages } from '@/lib/i18n'

describe('sitemap', () => {
  it('应包含所有支持的语言', () => {
    const result = sitemap()
    const urls = result.map(entry => entry.url)
    const languages = getCachedLanguages()

    // 每种非英文语言都应该有至少一条 ?lang=xxx 的 URL
    for (const lang of languages) {
      if (lang === 'en') continue
      const hasEntry = urls.some(url => url.includes(`lang=${encodeURIComponent(lang)}`))
      expect(hasEntry, `sitemap 缺少语言 ${lang}`).toBe(true)
    }
  })

  it('总条目数应远超 1 种语言', () => {
    const result = sitemap()
    expect(result.length).toBeGreaterThan(20)
  })
})
