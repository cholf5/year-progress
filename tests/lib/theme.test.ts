import { describe, it, expect } from 'vitest'
import { getThemeDisplayName } from '@/lib/theme'
import { getTwitterIconDisplayName } from '@/lib/settings'

describe('getThemeDisplayName - 之前漏译的语言', () => {
  const previouslyMissing = ['ne', 'ur', 'my', 'fil'] as const

  for (const lang of previouslyMissing) {
    it(`${lang} 应有非英文的 light/dark/system 翻译`, () => {
      const light = getThemeDisplayName('light', lang)
      const dark = getThemeDisplayName('dark', lang)
      const system = getThemeDisplayName('system', lang)

      // fil 的 light/dark 译文恰好与英文相同（'Light Mode' / 'Dark Mode'），跳过这两个断言
      if (lang !== 'fil') {
        expect(light).not.toBe('Light Mode')
        expect(dark).not.toBe('Dark Mode')
      }
      expect(system).not.toBe('Follow System')
    })
  }
})

describe('getTwitterIconDisplayName - 之前漏译的语言', () => {
  const previouslyMissing = ['ne', 'ur', 'my'] as const  // fil 译文恰好是 'X Logo'，跳过

  for (const lang of previouslyMissing) {
    it(`${lang} 应有非英文的 X / Bird 翻译`, () => {
      expect(getTwitterIconDisplayName('x', lang)).not.toBe('X Logo')
      expect(getTwitterIconDisplayName('bird', lang)).not.toBe('Classic Bird')
    })
  }
})
