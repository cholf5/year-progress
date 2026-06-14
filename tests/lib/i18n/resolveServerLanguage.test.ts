import { describe, it, expect } from 'vitest'
import {
  resolveServerLanguage,
  parseAcceptLanguage,
  readLanguageFromSettingsCookie,
} from '@/lib/i18n'

describe('parseAcceptLanguage', () => {
  it('null/空字符串返回 null', () => {
    expect(parseAcceptLanguage(null)).toBeNull()
    expect(parseAcceptLanguage('')).toBeNull()
  })

  it('单一支持语言', () => {
    expect(parseAcceptLanguage('ja')).toBe('ja')
    expect(parseAcceptLanguage('zh-CN')).toBe('zh-cn')
  })

  it('按 q 值排序后选第一个能识别的', () => {
    // jv 不支持 → 跳过；fr 支持
    expect(parseAcceptLanguage('jv;q=1.0, fr;q=0.9, en;q=0.8')).toBe('fr')
  })

  it('完整 tag 不识别时退回基础 tag', () => {
    expect(parseAcceptLanguage('en-AU')).toBe('en')
    expect(parseAcceptLanguage('zh-Hant')).toBe('zh-cn') // zh 兜底
  })

  it('全部不支持返回 null（让上层走默认）', () => {
    expect(parseAcceptLanguage('jv, xx')).toBeNull()
  })

  it('忽略通配符 *', () => {
    expect(parseAcceptLanguage('*;q=1.0')).toBeNull()
  })
})

describe('readLanguageFromSettingsCookie', () => {
  it('null/空返回 null', () => {
    expect(readLanguageFromSettingsCookie(null)).toBeNull()
    expect(readLanguageFromSettingsCookie('')).toBeNull()
  })

  it('JSON 格式的 settings cookie 提取 language', () => {
    const cookie = JSON.stringify({ theme: 'dark', language: 'ja', twitterIcon: 'x' })
    expect(readLanguageFromSettingsCookie(cookie)).toBe('ja')
  })

  it("旧版本 'zh' 迁移为 'zh-cn'", () => {
    expect(readLanguageFromSettingsCookie(JSON.stringify({ language: 'zh' }))).toBe('zh-cn')
  })

  it('不识别的语言返回 null', () => {
    expect(readLanguageFromSettingsCookie(JSON.stringify({ language: 'jv' }))).toBeNull()
  })

  it('坏 JSON 不抛错，回落到字符串解析', () => {
    expect(readLanguageFromSettingsCookie('not json')).toBeNull()
    expect(readLanguageFromSettingsCookie('ja')).toBe('ja') // 早期可能直接存语言代码
  })
})

describe('resolveServerLanguage 优先级', () => {
  it('URL 优先于 cookie 与 Accept-Language', () => {
    expect(
      resolveServerLanguage({
        urlLang: 'ar',
        settingsCookie: JSON.stringify({ language: 'ja' }),
        acceptLanguage: 'fr',
      })
    ).toBe('ar')
  })

  it('无 URL 时取 cookie', () => {
    expect(
      resolveServerLanguage({
        urlLang: null,
        settingsCookie: JSON.stringify({ language: 'ja' }),
        acceptLanguage: 'fr',
      })
    ).toBe('ja')
  })

  it('无 URL 与 cookie 时取 Accept-Language', () => {
    expect(
      resolveServerLanguage({
        urlLang: null,
        settingsCookie: null,
        acceptLanguage: 'de;q=0.9, en;q=0.5',
      })
    ).toBe('de')
  })

  it('全无时回落到 en', () => {
    expect(resolveServerLanguage({})).toBe('en')
  })

  it("URL 中的 'zh' 迁移为 'zh-cn'", () => {
    expect(resolveServerLanguage({ urlLang: 'zh' })).toBe('zh-cn')
  })

  it('URL 中不识别的 lang 不直接落 en，继续走 cookie/Accept-Language', () => {
    // 关键场景：用户带了 ?lang=jv（不支持）但 cookie 里有偏好——应该尊重 cookie
    expect(
      resolveServerLanguage({
        urlLang: 'jv',
        settingsCookie: JSON.stringify({ language: 'ja' }),
      })
    ).toBe('ja')
  })

  it('URL 大小写不敏感', () => {
    expect(resolveServerLanguage({ urlLang: 'ZH-CN' })).toBe('zh-cn')
  })
})
