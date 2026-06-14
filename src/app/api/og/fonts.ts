// 字体加载（Edge runtime 兼容）
// 使用 Google Fonts CDN 的 woff2 直链，按需子集加载
//
// 如需更新可访问 https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400&display=swap
// 与对应 family（Noto+Sans+SC / Arabic / Devanagari / Bengali / Thai / Myanmar）的 CSS 拿到最新 woff2 直链

const FONT_URLS: Record<string, string> = {
  // Noto Sans Regular（覆盖拉丁子集）
  notoSansLatin: 'https://fonts.gstatic.com/s/notosans/v36/o-0NIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A99X.woff2',
  // Noto Sans SC（覆盖中日韩简体子集——同时兜底日韩字符）
  notoSansSC: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYxNbPzS5HE.woff2',
  // Noto Sans Arabic
  notoSansArabic: 'https://fonts.gstatic.com/s/notosansarabic/v18/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyG2vu3CBFQLaig.woff2',
}

export async function loadFonts(): Promise<Array<{ name: string; data: ArrayBuffer; weight: 400; style: 'normal' }>> {
  const entries = await Promise.all(
    Object.entries(FONT_URLS).map(async ([name, url]) => {
      try {
        const res = await fetch(url)
        if (!res.ok) return null
        const data = await res.arrayBuffer()
        return { name, data, weight: 400 as const, style: 'normal' as const }
      } catch {
        return null
      }
    })
  )
  return entries.filter((e): e is NonNullable<typeof e> => e !== null)
}
