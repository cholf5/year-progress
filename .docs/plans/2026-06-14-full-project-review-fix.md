# 全项目 Review 修复实施计划

> **给 Claude：** 必需的子技能：使用 com-executing-plans 逐任务实施此计划。

**目标：** 修复 2026-06-14 全项目 review 报告中发现的 14 项高风险 / DRY 违例问题，并引入 vitest 单测基础设施保障关键纯函数。

**架构：** 按 Task 0（基础设施）→ P0（线上 bug）→ P1（DRY/一致性）→ P2（独立改进）→ 收尾验证 的顺序推进。每个 Task 独立可提交、独立可回滚。涉及核心纯函数（i18n 占位符、进度计算、ISO 周）的任务先写测试（TDD），UI 交互或 SEO meta 类任务用手动验证。

**技术栈：** Next.js 15 (App Router) / TypeScript / Tailwind CSS v4 / vitest / moment.js / `@vercel/og` / `react-share`

**关联文档：** `.docs/plans/2026-06-14-full-project-review.md`

---

## 全局约定

- **本项目规范要求**：本计划中**不**包含 `git add` / `git commit` 步骤——执行者按自己的提交节奏来。
- 所有命令在仓库根 `E:\dev\cholf5\year-progress` 运行。
- 每个 Task 末尾都列了**验证命令**和**预期输出**，必须复核通过再进入下一个 Task。
- 任何改动后跑 `npm run lint && npx tsc --noEmit` 是廉价且必须的最低验证；后文 Task 不再重复。
- 涉及 i18n、SEO、OG 的任务，验证时必须**真的访问 dev server**（`npm run dev` 后浏览器打开 URL 看响应）——不要只看代码改对没。
- 不熟悉的术语：
  - **占位符**：翻译模板里的 `{year}`、`{percentage}` 这类字符串，运行时替换为真实值。
  - **hreflang**：`<link rel="alternate" hreflang="zh-cn" href="...">`，告诉搜索引擎"这个页面有中文版本在某 URL"。
  - **OG image / OG locale**：Open Graph 协议元数据，社交平台抓取后渲染分享卡片。
  - **ISO 周**：ISO-8601 标准周编号——周一为周首日，含本年首个周四的周为第 1 周。

---

## Task 0：引入 vitest 测试基础设施

**目标**：让后续 Task 可以写"红→绿"循环。仅做最小可用配置。

**文件：**
- 修改：`package.json`（添加 devDeps + scripts）
- 创建：`vitest.config.ts`
- 创建：`tests/.gitkeep`（占位）
- 修改：`.gitignore`（追加 `coverage/`）

**步骤 1：安装 vitest**

运行：
```powershell
npm install -D vitest @vitest/ui
```

预期：`package.json` devDeps 出现 `vitest` 与 `@vitest/ui`，无报错。

**步骤 2：创建 `vitest.config.ts`**

文件：`vitest.config.ts`

```ts
import { defineConfig } from 'vitest/config'
import path from 'node:path'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['tests/**/*.test.ts', 'tests/**/*.test.tsx'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

**步骤 3：在 `package.json` scripts 中添加测试命令**

修改 `package.json` 的 `scripts`，追加：

```json
"test": "vitest run",
"test:watch": "vitest",
"test:ui": "vitest --ui"
```

**步骤 4：创建占位测试目录与 `.gitkeep`**

```powershell
New-Item -ItemType Directory -Force -Path tests | Out-Null
New-Item -ItemType File -Force -Path tests\.gitkeep | Out-Null
```

**步骤 5：在 `.gitignore` 末尾追加**

```
# vitest
coverage/
```

**步骤 6：写一条 sanity test 确认 vitest 能跑**

文件：`tests/sanity.test.ts`

```ts
import { describe, it, expect } from 'vitest'

describe('vitest setup', () => {
  it('runs', () => {
    expect(1 + 1).toBe(2)
  })
})
```

**步骤 7：运行测试**

```powershell
npm run test
```

预期：1 个测试通过，输出含 `1 passed`。

---

## P0-1：修复 `getTranslation` 提前替换 `{year}` 的 bug

**问题回顾**：`src/lib/i18n/index.ts` 的 `getTranslation` 在返回字符串前强制替换 `{year}` 为当前年份，导致业务层 helper 传入的历史/未来年份失效。

**文件：**
- 修改：`src/lib/i18n/index.ts:108-118`
- 创建：`tests/lib/i18n/getTranslation.test.ts`

**步骤 1：写一条会失败的测试**

文件：`tests/lib/i18n/getTranslation.test.ts`

```ts
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
```

**步骤 2：运行测试，确认失败**

```powershell
npm run test -- tests/lib/i18n/getTranslation.test.ts
```

预期：前 3 个测试 FAIL（因为模板里的 `{year}` 被提前替换成了 `2026`）；第 4 个 PASS。

**步骤 3：修复 `getTranslation`**

修改 `src/lib/i18n/index.ts:108-118`，删除 `{year}` 替换：

```ts
  // 获取翻译
  const translation = allTranslations[actualLang];
  const result = translation[key];

  // 如果是字符串，进行占位符替换
  // 注意：{year} 故意不在这里替换，由业务层 helper（formatProgressTitle 等）按调用方传入的年份替换
  if (typeof result === 'string') {
    return result.replace('{supportedLanguagesCount}', SUPPORTED_LANGUAGES_COUNT.toString());
  }

  return result;
}
```

**步骤 4：处理 `copyright` 模板对当前年份的依赖**

`copyright` 模板原先依赖 `{year}` 自动替换为当前年份。检查它是否仍被引用：

```powershell
Select-String -Path "src\**\*.ts","src\**\*.tsx" -Pattern "copyright" -SimpleMatch
```

若仅作为字符串备用未实际使用——保留模板原状，调用方按需手动 replace。
若有实际使用——在 `src/lib/i18n/index.ts` 末尾添加 helper：

```ts
// 辅助函数：格式化版权信息（自动用当前年份）
export const formatCopyright = (language: Language): string => {
  const template = getTranslation(language, 'copyright') as string;
  return template.replace('{year}', new Date().getFullYear().toString());
};
```

并在调用处改用此 helper。

**步骤 5：运行所有测试，确认全部通过**

```powershell
npm run test
```

预期：4 个测试 PASS（含 sanity）。

**步骤 6：手动验证**

```powershell
npm run dev
```

浏览器打开：
- `http://localhost:3000/?year=2024&day=100&lang=en` → 标题应为 "2024 is X% complete"
- `http://localhost:3000/?year=2030&day=50&lang=zh-cn` → 标题应为 "2030年已过去了X%"
- `http://localhost:3000/` → 标题应为 "2026 is X% complete"（当前年份）

---

## P0-2：修复 `sitemap.ts` 只输出 1 种语言的 bug

**问题回顾**：`sitemap.ts` 引用了 i18n 中"向后兼容"的 stub `translations`，导致 Object.keys 只返回 `en`。

**文件：**
- 修改：`src/app/sitemap.ts`
- 修改：`src/lib/i18n/index.ts`（删除或重命名误导性 stub）
- 创建：`tests/app/sitemap.test.ts`

**步骤 1：写测试**

文件：`tests/app/sitemap.test.ts`

```ts
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
```

**步骤 2：运行测试，确认失败**

```powershell
npm run test -- tests/app/sitemap.test.ts
```

预期：FAIL，提示缺少 `zh-cn`、`zh-tw` 等语言。

**步骤 3：修复 sitemap.ts**

修改 `src/app/sitemap.ts:1-9`：

```ts
import { MetadataRoute } from 'next'
import { getSeoBaseUrl } from '../lib/utils/baseUrl'
import { getCachedLanguages } from '../lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSeoBaseUrl()

  // 获取所有支持的语言（基于实际的 allTranslations，与 i18n 系统单一来源）
  const languages = getCachedLanguages()
```

**步骤 4：删除 i18n 中误导性的 stub `translations`**

修改 `src/lib/i18n/index.ts`：
- 删除 `basicTranslations` 常量（约 line 123-167）
- 删除 `export const translations` stub（约 line 460-462）
- 修改 `src/lib/i18n.ts` 兼容文件，从导出列表里去掉 `translations`

```powershell
Select-String -Path "src\**\*.ts","src\**\*.tsx" -Pattern "from '@/lib/i18n'" -SimpleMatch
Select-String -Path "src\**\*.ts","src\**\*.tsx" -Pattern "from '../lib/i18n'" -SimpleMatch
```

确保没有任何文件 import 这个 `translations`；若有（非 sitemap.ts 之外的）需一并清理。

**步骤 5：运行测试**

```powershell
npm run test
```

预期：全部 PASS。

**步骤 6：手动验证 sitemap.xml**

```powershell
npm run dev
```

浏览器访问：`http://localhost:3000/sitemap.xml` → 应包含 29 条 `?lang=` 条目（含 `zh-cn`、`zh-tw`、`ne`、`ur`、`my`、`fil` 等）。

---

## P0-3：修复首页 resize 监听不会注册的 bug

**问题回顾**：`YearProgressClient.tsx` 的 useEffect 在 else 分支提前 return，导致 resize 监听只在带 URL 参数时生效。

**文件：**
- 修改：`src/components/YearProgressClient.tsx:157-240`

**步骤 1：把单一 useEffect 拆成 3 个独立 useEffect**

修改 `src/components/YearProgressClient.tsx:157-240`，整段替换为：

```tsx
  // useEffect 1: 初始化设置 + 加载初始进度（含 URL 参数解析）
  useEffect(() => {
    setMounted(true);

    // 从Cookie/localStorage加载设置
    const savedSettings = getSettings();
    setSettings(savedSettings);
    setLanguage(savedSettings.language);
    setTheme(savedSettings.theme);
    applyTheme(savedSettings.theme);

    // 检查URL参数，如果有时间参数则使用，否则使用当前时间
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const yearParam = urlParams.get('year');
      const dayParam = urlParams.get('day');

      if (yearParam && dayParam) {
        const nYearParam = parseInt(yearParam);
        const nDayOfYearParam = parseInt(dayParam);

        if (!isNaN(nYearParam) && !isNaN(nDayOfYearParam) &&
            nYearParam > 0 && nYearParam < 30000 &&
            nDayOfYearParam >= 1 && nDayOfYearParam <= 366) {
          const totalDays = moment([nYearParam]).isLeapYear() ? 366 : 365;
          const percentage = Math.round((nDayOfYearParam / totalDays) * 100 * 100) / 100;
          const remainingDays = totalDays - nDayOfYearParam;
          const { displayPercentage, isMilestone } = calculateDisplayPercentage(nDayOfYearParam, totalDays);

          setProgress({
            year: nYearParam,
            totalDays,
            daysPassed: nDayOfYearParam,
            percentage,
            remainingDays,
            displayPercentage,
            isMilestone
          });

          setIsHistoricalData(!checkIfCurrentDate(nYearParam, nDayOfYearParam));
        }
      } else {
        setProgress(calculateYearProgress());
        setIsHistoricalData(false);
      }
    }
  }, []);

  // useEffect 2: 仅当无 URL 参数（实时模式）时，每小时自动刷新进度
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const urlParams = new URLSearchParams(window.location.search);
    const hasTimeParam = urlParams.get('year') && urlParams.get('day');
    if (hasTimeParam) return;

    const interval = setInterval(() => {
      setProgress(calculateYearProgress());
      setIsHistoricalData(false);
    }, 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect 3: 监听窗口尺寸变化，重排方块尺寸
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
```

**步骤 2：删除冗余的"主题再初始化" useEffect**

`YearProgressClient.tsx:321-326` 这个二次 `applyTheme` 重复且容易引发时序问题，删除：

```tsx
// 删除整段：
useEffect(() => {
  if (typeof window !== 'undefined') {
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
  }
}, []);
```

（首个 useEffect 里已经做过 `applyTheme(savedSettings.theme)`。）

**步骤 3：手动验证**

```powershell
npm run dev
```

浏览器：
- 访问 `http://localhost:3000/`（无参数），打开 DevTools，缓慢拖动窗口宽度从 1200px → 400px，方块大小应平滑调整。
- 访问 `http://localhost:3000/?year=2024&day=100`，缩放窗口同样应该响应。
- 控制台不应有警告。

**步骤 4：运行 lint + tsc**

```powershell
npm run lint
npx tsc --noEmit
```

预期：无报错。

---

## P0-4：修复 `<link rel="alternate" hreflang>` 列表

**问题回顾**：`layout.tsx` 硬编码 18 种语言，缺 11、错 2，且与 sitemap / structuredData 三处不一致。

**文件：**
- 修改：`src/app/layout.tsx:29-51`

**步骤 1：从 i18n 动态生成 hreflang 表**

修改 `src/app/layout.tsx:1-7`，添加 import：

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { generateWebApplicationSchema } from "../lib/structuredData";
import { getSeoBaseUrl } from "../lib/utils/baseUrl";
import { getCachedLanguages } from "../lib/i18n";
```

修改 `src/app/layout.tsx:29-51`：

```tsx
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(
      getCachedLanguages().map(lang => [
        lang,
        lang === 'en' ? '/' : `/?lang=${encodeURIComponent(lang)}`,
      ])
    ),
  },
```

**步骤 2：手动验证生成的 HTML**

```powershell
npm run build
npm run start
```

浏览器访问 `http://localhost:3000/`，View Source 搜 `hreflang`，应有 29 条 `<link rel="alternate" hreflang="...">`，含 `zh-cn`、`zh-tw`、`ne`、`ur`、`my`、`fil`，不含 `zh`、`jv`。

---

## P0-5：修复 SSR `generateMetadata` 锁死 `locale: 'en_US'` 的 bug

**问题回顾**：`page.tsx` 已拿到 `language` 但 OG locale 写死英文。

**文件：**
- 修改：`src/app/page.tsx:1-6, 32-48`

**步骤 1：导入并使用 `getOgLocale`**

修改 `src/app/page.tsx:5`：

```ts
import { formatPageTitle, getTranslation, Language, getOgLocale } from '../lib/i18n'
```

修改 `src/app/page.tsx:46`，将 `locale: 'en_US'` 改为：

```ts
locale: getOgLocale(language),
```

**步骤 2：手动验证**

```powershell
npm run build
npm run start
```

浏览器：
- 访问 `http://localhost:3000/?lang=zh-cn`，View Source 搜 `og:locale`，应为 `<meta property="og:locale" content="zh_CN">`。
- 访问 `http://localhost:3000/?lang=ar`，应为 `ar_SA`。
- 访问 `http://localhost:3000/`（默认），应为 `en_US`。

**步骤 3：附带验证：`og:image` URL 中的 lang 与页面 lang 一致**

同样的页面 source 里 `og:image` 的 URL `?lang=` 应与请求的 lang 匹配。如不一致，检查 `page.tsx:18` 处 `lang` 默认值是否正确（`(params.lang as string) || 'en'`）。

---

## P1-6：把主题名 / Twitter 图标名收回 i18n 系统

**问题回顾**：`getThemeDisplayName` / `getTwitterIconDisplayName` 在 lib 层维护对照表，4 种语言（ne/ur/my/fil）漏译。

**文件：**
- 修改：`src/lib/i18n/locales/types.ts`（扩展 Translation 接口）
- 修改：所有 `src/lib/i18n/locales/*.ts`（29 个文件，每个加 5 个 key）
- 修改：`src/lib/theme.ts`（getThemeDisplayName 改为查 i18n）
- 修改：`src/lib/settings.ts`（getTwitterIconDisplayName 改为查 i18n）
- 创建：`tests/lib/theme.test.ts`

**步骤 1：扩展 Translation 接口**

修改 `src/lib/i18n/locales/types.ts`，末尾添加：

```ts
  // 主题名（从 lib/theme.ts 收编）
  themeLight: string;
  themeDark: string;
  themeSystem: string;
  // Twitter 图标名（从 lib/settings.ts 收编）
  twitterIconX: string;
  twitterIconBird: string;
}
```

**步骤 2：批量给 29 个 locale 文件加 5 个 key**

参考映射表（从 `src/lib/theme.ts` 与 `src/lib/settings.ts` 现有数据迁移；缺失语言需补）：

```
en:    themeLight='Light Mode'  themeDark='Dark Mode'  themeSystem='Follow System'  twitterIconX='X Logo'  twitterIconBird='Classic Bird'
zh-cn: '日间模式' '夜间模式' '跟随系统' 'X 标志' '经典蓝鸟'
zh-tw: '日間模式' '夜間模式' '跟隨系統' 'X 標誌' '經典藍鳥'
es:    'Modo Claro' 'Modo Oscuro' 'Seguir Sistema' 'Logo X' 'Pájaro Clásico'
fr:    'Mode Clair' 'Mode Sombre' 'Suivre Système' 'Logo X' 'Oiseau Classique'
de:    'Heller Modus' 'Dunkler Modus' 'System folgen' 'X Logo' 'Klassischer Vogel'
ja:    'ライトモード' 'ダークモード' 'システムに従う' 'X ロゴ' 'クラシックバード'
ko:    '라이트 모드' '다크 모드' '시스템 따라가기' 'X 로고' '클래식 새'
pt:    'Modo Claro' 'Modo Escuro' 'Seguir Sistema' 'Logo X' 'Pássaro Clássico'
ru:    'Светлый режим' 'Тёмный режим' 'Следовать системе' 'Логотип X' 'Классическая птичка'
ar:    'الوضع النهاري' 'الوضع الليلي' 'تتبع النظام' 'شعار X' 'الطائر الكلاسيكي'
hi:    'दिन मोड' 'रात मोड' 'सिस्टम का पालन करें' 'X लोगो' 'क्लासिक पक्षी'
it:    'Modalità Chiara' 'Modalità Scura' 'Segui Sistema' 'Logo X' 'Uccello Classico'
nl:    'Lichte Modus' 'Donkere Modus' 'Volg Systeem' 'X Logo' 'Klassieke Vogel'
tr:    'Açık Mod' 'Koyu Mod' 'Sistemi Takip Et' 'X Logosu' 'Klasik Kuş'
sv:    'Ljust läge' 'Mörkt läge' 'Följ systemet' 'X-logotyp' 'Klassisk fågel'
pl:    'Tryb jasny' 'Tryb ciemny' 'Podążaj za systemem' 'Logo X' 'Klasyczny ptak'
da:    'Lys tilstand' 'Mørk tilstand' 'Følg systemet' 'X-logo' 'Klassisk fugl'
no:    'Lys modus' 'Mørk modus' 'Følg systemet' 'X-logo' 'Klassisk fugl'
fi:    'Valoisa tila' 'Tumma tila' 'Seuraa järjestelmää' 'X-logo' 'Klassinen lintu'
vi:    'Chế độ Sáng' 'Chế độ Tối' 'Theo Hệ thống' 'Logo X' 'Chim Biểu tượng'
th:    'โหมดสว่าง' 'โหมดมืด' 'ตามระบบ' 'โลโก้ X' 'นกคลาสสิก'
id:    'Mode Terang' 'Mode Gelap' 'Ikuti Sistem' 'Logo X' 'Burung Klasik'
sw:    'Hali ya Nuru' 'Hali ya Giza' 'Fuata Mfumo' 'Alama ya X' 'Ndege ya Klasiki'
bn:    'লাইট মোড' 'ডার্ক মোড' 'সিস্টেম অনুসরণ করুন' 'X লোগো' 'ক্লাসিক পাখি'
ne:    'उज्यालो मोड' 'अँध्यारो मोड' 'प्रणाली अनुसरण' 'X लोगो' 'क्लासिक चरा'
ur:    'لائٹ موڈ' 'ڈارک موڈ' 'سسٹم کی پیروی' 'X لوگو' 'کلاسک پرندہ'
my:    'အလင်းမုဒ်' 'အမှောင်မုဒ်' 'စနစ်ကိုလိုက်မည်' 'X လိုဂို' 'ဂန္ထဝင်ငှက်'
fil:    'Light Mode' 'Dark Mode' 'Sundin ang System' 'X Logo' 'Klasikong Ibon'
```

逐个文件按上述映射追加 5 个字段。例：`src/lib/i18n/locales/en.ts` 末尾在 `futureProgressTooltip` 之后加：

```ts
  themeLight: 'Light Mode',
  themeDark: 'Dark Mode',
  themeSystem: 'Follow System',
  twitterIconX: 'X Logo',
  twitterIconBird: 'Classic Bird',
};
```

**步骤 3：改造 `getThemeDisplayName`**

修改 `src/lib/theme.ts`，整段替换 `getThemeDisplayName`：

```ts
import type { Language } from './i18n';
import { getTranslation } from './i18n';

export const getThemeDisplayName = (theme: Theme, language: Language): string => {
  const keyMap: Record<Theme, 'themeLight' | 'themeDark' | 'themeSystem'> = {
    light: 'themeLight',
    dark: 'themeDark',
    system: 'themeSystem',
  };
  return getTranslation(language, keyMap[theme]) as string;
};
```

注意：`Language` 类型是 i18n.ts 导出的，theme.ts 现有签名用了 `language: string`，改为 `language: Language` 时编译器会要求所有调用方更新——`SettingsModal.tsx:214` 已传入 `currentLanguage`（是 Language 类型），ok。

**步骤 4：改造 `getTwitterIconDisplayName`**

修改 `src/lib/settings.ts`，整段替换 `getTwitterIconDisplayName`：

```ts
import { getTranslation } from './i18n';

export const getTwitterIconDisplayName = (icon: TwitterIcon, language: Language): string => {
  const keyMap: Record<TwitterIcon, 'twitterIconX' | 'twitterIconBird'> = {
    x: 'twitterIconX',
    bird: 'twitterIconBird',
  };
  return getTranslation(language, keyMap[icon]) as string;
};
```

**步骤 5：写测试覆盖 4 种之前漏译的语言**

文件：`tests/lib/theme.test.ts`

```ts
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

      expect(light).not.toBe('Light Mode')
      expect(dark).not.toBe('Dark Mode')
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
```

**步骤 6：运行测试**

```powershell
npm run test
```

预期：所有测试 PASS。

**步骤 7：手动验证**

```powershell
npm run dev
```

浏览器分别切换到 ne、ur、my、fil 语言，打开设置面板，主题卡片下方文字应是各自语言（不是英文 "Light Mode"）。

---

## P1-7：修复 `structuredData.ts` 的多重 DRY 违例

**问题回顾**：硬编码 baseUrl、descriptions/names 各 12 种、inLanguage 含错值缺真值。

**文件：**
- 修改：`src/lib/structuredData.ts`（整体重写）

**步骤 1：整体重写 structuredData.ts**

将 `src/lib/structuredData.ts` 整个文件替换为：

```ts
// 生成结构化数据的工具函数
import { getSeoBaseUrl } from './utils/baseUrl'
import { getCachedLanguages, getTranslation, type Language } from './i18n'

export function generateWebApplicationSchema(language: Language = 'en') {
  const baseUrl = getSeoBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'YearProgress.org',
    description: getTranslation(language, 'description') as string,
    url: baseUrl,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Web Browser',
    browserRequirements: 'Requires JavaScript. Modern browsers supported.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    creator: {
      '@type': 'Organization',
      name: 'YearProgress.org',
    },
    inLanguage: getCachedLanguages(),
    keywords: 'year progress, time tracking, progress bar, yearly progress, time visualization, social sharing',
    mainEntityOfPage: baseUrl,
    image: `${baseUrl}/og-default.png`,
  }
}

export function generateBreadcrumbSchema(language: Language = 'en') {
  const baseUrl = getSeoBaseUrl()

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'YearProgress.org',
        item: language === 'en' ? baseUrl : `${baseUrl}?lang=${language}`,
      },
    ],
  }
}
```

**步骤 2：检查调用方签名兼容**

```powershell
Select-String -Path "src\**\*.ts","src\**\*.tsx" -Pattern "generateWebApplicationSchema|generateBreadcrumbSchema" -SimpleMatch
```

`layout.tsx:77` 调用 `generateWebApplicationSchema('en')` —— ok（'en' 是 Language 字面量）。其他调用同理修正。

**步骤 3：手动验证**

```powershell
npm run dev
```

浏览器访问 `http://localhost:3000/?lang=zh-cn`，View Source 找 `<script type="application/ld+json">`，JSON 中：
- `description` 应是中文
- `inLanguage` 应是 29 元素数组，含 zh-cn / zh-tw / ne / ur / my / fil，不含 jv

**步骤 4：跑 Google 结构化数据测试（可选）**

构建后部署 preview 或用 https://search.google.com/test/rich-results 校验。本地最低验证：JSON.parse 不抛错。

---

## P1-8：消除 5 处手写语言列表

**问题回顾**：`SUPPORTED_LANGUAGES_COUNT`、`Language` type、`allTranslations` keys、两处 inline `supportedLanguages` 数组——需统一到单一来源。

**文件：**
- 修改：`src/lib/i18n/index.ts`

**步骤 1：写测试确保 LANGUAGES_COUNT 与 keys 长度一致**

文件：`tests/lib/i18n/languages.test.ts`

```ts
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
```

**步骤 2：运行测试，预期 PASS**

```powershell
npm run test -- tests/lib/i18n/languages.test.ts
```

预期：PASS（手写值恰好对得上）。这一步是为了**修改后仍然 PASS**——重构不能引入回归。

**步骤 3：重构 `src/lib/i18n/index.ts`**

第一步：把 `allTranslations` 提到 `SUPPORTED_LANGUAGES_COUNT` 之前（结构上让常量从 `allTranslations` derive）。

把 `src/lib/i18n/index.ts` 的开头三段（行 1-79）调整顺序：

```ts
// 导入类型定义
import type { Translation } from './locales/types';

// 重新导出类型
export type { Translation };

// 同步导入所有翻译文件
import { translations as en } from './locales/en';
import { translations as zhCn } from './locales/zh-cn';
import { translations as zhTw } from './locales/zh-tw';
import { translations as es } from './locales/es';
import { translations as fr } from './locales/fr';
import { translations as de } from './locales/de';
import { translations as ja } from './locales/ja';
import { translations as ko } from './locales/ko';
import { translations as pt } from './locales/pt';
import { translations as ru } from './locales/ru';
import { translations as ar } from './locales/ar';
import { translations as hi } from './locales/hi';
import { translations as it } from './locales/it';
import { translations as nl } from './locales/nl';
import { translations as tr } from './locales/tr';
import { translations as sv } from './locales/sv';
import { translations as pl } from './locales/pl';
import { translations as da } from './locales/da';
import { translations as no } from './locales/no';
import { translations as fi } from './locales/fi';
import { translations as vi } from './locales/vi';
import { translations as th } from './locales/th';
import { translations as id } from './locales/id';
import { translations as sw } from './locales/sw';
import { translations as bn } from './locales/bn';
import { translations as ne } from './locales/ne';
import { translations as ur } from './locales/ur';
import { translations as my } from './locales/my';
import { translations as fil } from './locales/fil';

// 支持的语言类型（手写联合，唯一手写来源；新增语言时改这里 + allTranslations + import）
export type Language =
  | 'en' | 'zh-cn' | 'zh-tw' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'ru'
  | 'ar' | 'hi' | 'it' | 'nl' | 'tr' | 'sv' | 'pl' | 'da' | 'no' | 'fi'
  | 'vi' | 'th' | 'id' | 'sw' | 'bn' | 'ne' | 'ur' | 'my' | 'fil';

// 所有翻译的集合（运行时单一来源）
const allTranslations: Record<Language, Translation> = {
  'en': en,
  'zh-cn': zhCn,
  'zh-tw': zhTw,
  'es': es,
  'fr': fr,
  'de': de,
  'ja': ja,
  'ko': ko,
  'pt': pt,
  'ru': ru,
  'ar': ar,
  'hi': hi,
  'it': it,
  'nl': nl,
  'tr': tr,
  'sv': sv,
  'pl': pl,
  'da': da,
  'no': no,
  'fi': fi,
  'vi': vi,
  'th': th,
  'id': id,
  'sw': sw,
  'bn': bn,
  'ne': ne,
  'ur': ur,
  'my': my,
  'fil': fil
};

// 派生：支持的语言列表（运行时使用）
const SUPPORTED_LANGUAGES = Object.keys(allTranslations) as Language[];

// 派生：支持的语言数量（用于 i18n 占位符 {supportedLanguagesCount}）
export const SUPPORTED_LANGUAGES_COUNT = SUPPORTED_LANGUAGES.length;
```

第二步：修改 `getTranslation` 使用 `SUPPORTED_LANGUAGES`（删除内联数组）：

```ts
export function getTranslation(
  lang: Language,
  key: keyof Translation
): string | readonly string[] {
  // 处理旧版本的 'zh' 语言代码，自动迁移为 'zh-cn'
  let actualLang = lang;
  if (lang === ('zh' as Language)) {
    actualLang = 'zh-cn';
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', 'zh-cn');
    }
  }

  // 确保语言存在，否则使用英语
  if (!(actualLang in allTranslations)) {
    actualLang = 'en';
  }

  const translation = allTranslations[actualLang];
  const result = translation[key];

  if (typeof result === 'string') {
    return result.replace('{supportedLanguagesCount}', SUPPORTED_LANGUAGES_COUNT.toString());
  }

  return result;
}
```

第三步：修改 `getInitialLanguage` 使用 `SUPPORTED_LANGUAGES`（删除内联数组）：

```ts
export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';

  const saved = localStorage.getItem('language');

  if (saved === 'zh') {
    const migratedLang = 'zh-cn';
    localStorage.setItem('language', migratedLang);
    return migratedLang;
  }

  if (saved && SUPPORTED_LANGUAGES.includes(saved as Language)) {
    return saved as Language;
  }

  const browserLang = navigator.language;
  return detectLanguage(browserLang);
}
```

第四步：`getCachedLanguages` 内部直接 `return SUPPORTED_LANGUAGES`：

```ts
export function getCachedLanguages(): Language[] {
  return SUPPORTED_LANGUAGES;
}
```

**步骤 4：运行测试**

```powershell
npm run test
```

预期：全部 PASS（特别是步骤 1 的语言数测试）。

**步骤 5：lint + tsc**

```powershell
npm run lint
npx tsc --noEmit
```

预期：无错误。

---

## P1-9：清理死代码与无效依赖

**问题回顾**：11 个文件 / 1 个 npm 包没有任何引用，留着诱导未来错改。

**文件：**
- 删除：`src/components/ProgressCard.tsx`
- 删除：`src/components/TranslationProvider.tsx`
- 删除：`src/hooks/useFormattedText.ts`
- 删除：`src/hooks/useTranslation.ts`
- 删除：`src/app/metadata.ts`
- 删除：`update-translations.js`
- 删除：`tailwind.config.js`
- 删除：`public/site.webmanifest`
- 删除：`tsconfig.build.json`
- 修改：`src/lib/yearProgress.ts`（删除 `formatDate` / `getProgressMessage`）
- 修改：`package.json`（移除 xmldom）

**步骤 1：双重确认每个文件无引用**

```powershell
$files = @(
  "ProgressCard",
  "TranslationProvider",
  "useFormattedText",
  "useTranslation",
  "src/app/metadata",
  "site.webmanifest",
  "formatDate",
  "getProgressMessage",
  "xmldom"
)
foreach ($f in $files) {
  Write-Host "=== $f ==="
  Select-String -Path "src\**\*.ts","src\**\*.tsx","src\**\*.css","next.config.ts","package.json" -Pattern $f -SimpleMatch -ErrorAction SilentlyContinue
}
```

预期：除 `useTranslation` 在 `TranslationProvider.tsx` 内自引用、`formatDate`/`getProgressMessage` 在 `ProgressCard.tsx` 内自引用、`xmldom` 仅在 `package.json`/`package-lock.json`，其它命中均应为空。如有意外引用——必须先解决。

**步骤 2：删除 React 相关死文件**

```powershell
Remove-Item src\components\ProgressCard.tsx
Remove-Item src\components\TranslationProvider.tsx
Remove-Item src\hooks\useFormattedText.ts
Remove-Item src\hooks\useTranslation.ts
Remove-Item src\app\metadata.ts
```

**步骤 3：删除根目录死文件**

```powershell
Remove-Item update-translations.js
Remove-Item tailwind.config.js
Remove-Item public\site.webmanifest
Remove-Item tsconfig.build.json
```

**步骤 4：修改 `src/lib/yearProgress.ts`，删除 `formatDate` 与 `getProgressMessage`**

将 `src/lib/yearProgress.ts` 替换为：

```ts
import { YearProgressCalculation, calculateYearProgressForDate, calculateDisplayPercentage, calculateYearProgressForParams } from './progressCalculation';

// 保持向后兼容的接口
export type YearProgress = YearProgressCalculation;

export { calculateDisplayPercentage, calculateYearProgressForParams };

// 计算当前年度进度
export function calculateYearProgress(): YearProgress {
  return calculateYearProgressForDate(new Date());
}
```

**步骤 5：从 `package.json` 中移除 xmldom**

修改 `package.json`，从 `devDependencies` 删除：

```json
"xmldom": "^0.6.0"
```

随后：

```powershell
npm install
```

预期：`package-lock.json` 自动更新，xmldom 被移除。

**步骤 6：完整跑通构建**

```powershell
npm run lint
npx tsc --noEmit
npm run build
npm run test
```

预期：全部成功。如果有 import 错误（说明步骤 1 漏检），按报错回去 grep 修补。

**步骤 7：检查 `src/hooks` 目录**

```powershell
Get-ChildItem src\hooks
```

如果空了，删除目录：

```powershell
Remove-Item src\hooks -Recurse
```

---

## P1-10：用环境变量替代 Google 验证码占位符

**问题回顾**：`'your-google-verification-code'` 直接进生产 HTML，永远验证不通过。

**文件：**
- 修改：`src/app/layout.tsx:66-68`
- 修改：`.env.example`（新建或追加）

**步骤 1：改为环境变量**

修改 `src/app/layout.tsx:66-68`：

```ts
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    },
  }),
```

（即：未设环境变量时整段省略，不输出占位 meta）

**步骤 2：新增 `.env.example`**

文件：`.env.example`

```
# Google Search Console site verification code
# 在 GSC 验证站点所有权时获得，留空则不输出 verification meta
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=
```

**步骤 3：手动验证**

```powershell
npm run build
npm run start
```

浏览器 View Source，搜 `google-site-verification`：未设环境变量时应**没有**该 meta 标签。

设置环境变量后再验证：

```powershell
$env:NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION="test123"
npm run build
npm run start
```

应有 `<meta name="google-site-verification" content="test123">`。

清理环境变量：`Remove-Item env:NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`

---

## P2-11：为 OG 图配置非拉丁字体

**问题回顾**：Edge runtime 默认无 CJK / 阿拉伯 / 印地 / 孟加拉 / 泰 / 缅甸字体；阿拉伯硬 fallback 英文损害体验。

**文件：**
- 修改：`src/app/api/og/route.tsx`

**说明**：本任务"成本/收益"取决于字体策略选择。最简方案是从 Google Fonts CDN fetch 4 个 Noto Sans 子集（Latin / SC / JP / Arabic + Devanagari + Bengali + Thai + Myanmar）。每个子集 100~300KB，Edge runtime 首次冷启会增 1~2s 延迟，后续走缓存。

**步骤 1：抽出字体加载工具**

文件：`src/app/api/og/fonts.ts`

```ts
// 字体加载（Edge runtime 兼容）
// 使用 Google Fonts CDN 的 woff2，按需子集

const FONT_URLS: Record<string, string> = {
  // Noto Sans Regular（拉丁、CJK、阿拉伯、天城文、孟加拉、泰、缅甸子集）
  // 实际 URL 在 Google Fonts CSS API 返回，这里硬编码 woff2 直链以避免运行时再请求 CSS
  // 如需更新可访问 https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400&display=swap 拿到
  notoSansLatin: 'https://fonts.gstatic.com/s/notosans/v36/o-0NIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjcz6L1SoM-jCpoiyD9A99X.woff2',
  notoSansSC: 'https://fonts.gstatic.com/s/notosanssc/v37/k3kCo84MPvpLmixcA63oeAL7Iqp5IZJF9bmaG9_FnYxNbPzS5HE.woff2',
  notoSansArabic: 'https://fonts.gstatic.com/s/notosansarabic/v18/nwpCtLGrOAZMl5nJ_wfgRg3DrWFZWsnVBJ_sS6tlqHHFlhQ5l3sQWIHPqzCfyG2vu3CBFQLaig.woff2',
}

export async function loadFonts(): Promise<Array<{ name: string; data: ArrayBuffer; weight: 400; style: 'normal' }>> {
  const entries = await Promise.all(
    Object.entries(FONT_URLS).map(async ([name, url]) => {
      const res = await fetch(url)
      if (!res.ok) return null
      const data = await res.arrayBuffer()
      return { name, data, weight: 400 as const, style: 'normal' as const }
    })
  )
  return entries.filter((e): e is NonNullable<typeof e> => e !== null)
}
```

注意：这里只加了 3 个子集示例。要覆盖印地、孟加拉、泰、缅甸需扩充 `FONT_URLS`，URL 从 https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari、Noto+Sans+Bengali、Noto+Sans+Thai、Noto+Sans+Myanmar 各自抓取最新 woff2 直链。

**步骤 2：修改 `route.tsx` 用上字体**

修改 `src/app/api/og/route.tsx`：

第 1 行后追加：
```ts
import { loadFonts } from './fonts'
```

`fontFamily` 改为按字体子集名填，去掉 `system-ui`：
```ts
fontFamily: 'notoSansLatin, notoSansSC, notoSansArabic',
```

`new ImageResponse(...)` 调用末尾选项中加上 `fonts: await loadFonts()`：
```ts
return new ImageResponse(
  /* JSX 不变 */,
  {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  }
);
```

去掉阿拉伯硬 fallback：删除 `route.tsx:36-40` 的 `problematicLanguages` 与 `shouldFallbackToEn` 逻辑：

```ts
const lang = langParam as Language;
const supportedLanguages = getCachedLanguages();
const isValidLang = supportedLanguages.includes(lang);
const currentLang: Language = isValidLang ? lang : 'en';
```

**步骤 3：手动验证 4 种语言的 OG 图**

```powershell
npm run dev
```

逐个浏览器访问，应能看到正确文字（不是豆腐块）：
- `http://localhost:3000/api/og?lang=zh-cn&year=2026&day=165`
- `http://localhost:3000/api/og?lang=ja&year=2026&day=165`
- `http://localhost:3000/api/og?lang=ar&year=2026&day=165` ← **应该是阿拉伯文**，不是英文
- `http://localhost:3000/api/og?lang=hi&year=2026&day=165`（如果配了 Devanagari）
- `http://localhost:3000/api/og?lang=th&year=2026&day=165`（如果配了 Thai）
- `http://localhost:3000/api/og?lang=my&year=2026&day=165`（如果配了 Myanmar）

如发现某语言仍为豆腐块——补对应 Noto Sans 子集 URL 即可。

**步骤 4：兜底—如果某子集 fetch 失败**

`loadFonts()` 已有 `null` filter，单字体 fetch 失败不影响整体；最坏情况退化为 fallback 字体。可选优化：把 woff2 文件下载到 `public/fonts/` 走 `fs.readFile`（Edge runtime 不可用）或 `import asset` 静态打包，避免依赖 Google CDN 可达性。但若收益不显著，可暂保持 CDN fetch。

---

## P2-12：删除客户端 OG meta 重复维护逻辑

**问题回顾**：`YearProgressClient.tsx:243-298` 维护一份与 SSR 平行的 OG meta，对社交爬虫无效，且与 SSR 必然漂移。

**文件：**
- 修改：`src/components/YearProgressClient.tsx:243-298`

**步骤 1：保留 `document.title` 与 `apple-mobile-web-app-title` 更新，删除 OG/Twitter meta 操作**

修改 `src/components/YearProgressClient.tsx:243-298`，整段替换为：

```tsx
  // 用户切换语言时更新浏览器标题（仅影响当前 Tab，社交爬虫看的是 SSR）
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;

    document.title = formatPageTitle(language);

    const appleTitleMeta = document.querySelector('meta[name="apple-mobile-web-app-title"]') as HTMLMetaElement | null;
    if (appleTitleMeta) {
      appleTitleMeta.setAttribute('content', getTranslation(language, 'siteName') as string);
    }
  }, [mounted, language]);
```

注意：原依赖数组里的 `getOgImageUrl` 是个组件作用域的函数，每次渲染都是新引用，会让 effect 不必要地重跑——一并去掉。

**步骤 2：删除 `getOgImageUrl` 函数**

如果 `getOgImageUrl` 不再有其他调用方，删除其定义（`YearProgressClient.tsx:115-126`）。

```powershell
Select-String -Path "src\**\*.tsx" -Pattern "getOgImageUrl" -SimpleMatch
```

确认无其他引用后删除。

**步骤 3：手动验证**

```powershell
npm run dev
```

- 切换语言下拉，浏览器 Tab 标题应跟随变化。
- View Source 中 `og:locale` 应保持 SSR 渲染的值（不受客户端切换影响——爬虫只看 SSR）。
- 控制台无报错。

---

## P2-13：让 `<html lang>` 跟随实际语言

**问题回顾**：永远 `<html lang="en">` 影响无障碍 + SEO。

**文件：**
- 修改：`src/app/layout.tsx`
- 修改：`src/components/YearProgressClient.tsx`

**步骤 1：让 layout.tsx 接 searchParams 并用真实 lang**

Next.js 15 的 RootLayout 不直接接 searchParams（layout 不会随 query 重渲染）。可行做法：在 `<html>` 标签上先用默认 `'en'`，由客户端首次 mount 时在 `YearProgressClient` 里同步真实 lang。

修改 `src/components/YearProgressClient.tsx` 的 useEffect 1（设置加载完成后）：

```tsx
useEffect(() => {
  setMounted(true);

  const savedSettings = getSettings();
  setSettings(savedSettings);
  setLanguage(savedSettings.language);
  setTheme(savedSettings.theme);
  applyTheme(savedSettings.theme);

  // 同步 <html lang> 以满足无障碍和 SEO
  if (typeof document !== 'undefined') {
    document.documentElement.lang = savedSettings.language;
  }

  // ... 其余 URL 参数解析逻辑保持不变
}, []);
```

**步骤 2：language state 变化时也要同步**

新增一个独立 effect：

```tsx
// 当用户切换语言时，同步 <html lang>
useEffect(() => {
  if (!mounted || typeof document === 'undefined') return;
  document.documentElement.lang = language;
}, [mounted, language]);
```

**步骤 3：手动验证**

```powershell
npm run dev
```

- 浏览器访问 `http://localhost:3000/?lang=zh-cn`，DevTools Console: `document.documentElement.lang` 应为 `zh-cn`
- 切换到 ar，应变 `ar`
- 访问 `http://localhost:3000/`（无参数，假设浏览器默认 zh-cn），应为 `zh-cn`

注意：SSR 渲染的初始 HTML 仍是 `lang="en"`（因为 layout 是 server component 不接 searchParams），客户端 mount 后才修正——这对爬虫是个折中（爬虫优先看 hreflang）。如需 SSR 完全准确，需把 layout 改为 dynamic 并接 searchParams（成本较高，本计划暂不做）。

---

## P2-14：周数算法对齐 ISO-8601

**问题回顾**：`Math.ceil(daysPassed / 7)` 让 1月1日永远=第1周第1天，与主流日历的 ISO 周不符。

**文件：**
- 修改：`src/lib/progressCalculation.ts`（新增 isoWeek 计算函数）
- 修改：`src/components/YearProgressClient.tsx`
- 修改：`src/app/api/og/route.tsx`
- 创建：`tests/lib/progressCalculation.test.ts`

**步骤 1：写测试（含已知 ISO 周锚点）**

文件：`tests/lib/progressCalculation.test.ts`

```ts
import { describe, it, expect } from 'vitest'
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
    // 业务上若仍想显示在"今年第 N 周"，可按 moment(date).isoWeek() 返回 52
    expect(getIsoWeekForDayOfYear(2023, 1)).toBe(52)
  })

  it('某年第 165 天的 ISO 周应可被 moment 校验', () => {
    // 一致性测试：和 moment 的实现对齐
    const moment = require('moment')
    for (const year of [2023, 2024, 2025, 2026]) {
      for (const day of [1, 50, 165, 300]) {
        const expected = moment([year]).dayOfYear(day).isoWeek()
        expect(getIsoWeekForDayOfYear(year, day)).toBe(expected)
      }
    }
  })
})
```

**步骤 2：运行测试，确认失败**

```powershell
npm run test -- tests/lib/progressCalculation.test.ts
```

预期：FAIL — `getIsoWeekForDayOfYear` 不存在。

**步骤 3：实现 `getIsoWeekForDayOfYear`**

修改 `src/lib/progressCalculation.ts`，在文件末尾追加：

```ts
// 计算指定年份某一天所属的 ISO-8601 周编号（与 moment.isoWeek 一致）
export function getIsoWeekForDayOfYear(year: number, dayOfYear: number): number {
  return moment([year]).dayOfYear(dayOfYear).isoWeek();
}
```

（已 import moment，无需额外 import）

**步骤 4：运行测试，确认 PASS**

```powershell
npm run test -- tests/lib/progressCalculation.test.ts
```

预期：4 个 PASS。

**步骤 5：替换业务调用**

修改 `src/components/YearProgressClient.tsx`：

- import 处加：
  ```tsx
  import { getIsoWeekForDayOfYear } from '@/lib/progressCalculation';
  ```
- `YearProgressClient.tsx:39`（`getDateInfo` 函数内）：
  ```ts
  const weekNumber = getIsoWeekForDayOfYear(year, dayNumber);
  ```
- `YearProgressClient.tsx:567`：
  ```tsx
  formatHistoricalWeekDayText(language, getIsoWeekForDayOfYear(progress.year, daysPassed), daysPassed, progress.year)
  ```
- `YearProgressClient.tsx:591`：
  ```tsx
  formatCurrentWeekDayText(language, getIsoWeekForDayOfYear(progress.year, daysPassed), daysPassed, progress.year)
  ```

修改 `src/app/api/og/route.tsx:150`：

```tsx
{formatWeekDayText(currentLang, getIsoWeekForDayOfYear(year, daysPassed), daysPassed, year)}
```

并在 import 处加：
```tsx
import { calculateYearProgressForParams, calculateYearProgressForDate, getIsoWeekForDayOfYear } from '@/lib/progressCalculation';
```

**步骤 6：手动验证**

```powershell
npm run dev
```

浏览器访问 `http://localhost:3000/?year=2024&day=1`，应显示 "Today is week 1, day 1 of 2024"。
访问 `http://localhost:3000/?year=2023&day=1`，按 ISO 实际是 2022 年第 52 周——代码现在会显示 "week 52, day 1 of 2023"，**这可能让用户困惑**。

**业务决策点**：ISO 周对边界日期（年初/年末）会产生"周数大于 53 或落在上一年"的现象。如果要回避，可在 helper 内对 `weekNumber > 50 && dayOfYear < 7` 时强制返回 1。本计划保持纯 ISO 行为（与 moment 一致），由产品决定是否要这个修补。

---

## 收尾验证

**目标**：确保整套修复连起来工作。

**步骤 1：完整 lint + tsc + test + build**

```powershell
npm run lint && npx tsc --noEmit && npm run test && npm run build
```

预期：全部成功，无 warning。

**步骤 2：dev server 完整人工流**

```powershell
npm run dev
```

逐项过：
- 首页加载，缩放窗口，方块响应（P0-3）
- 切到 zh-cn，主题面板显示中文，浏览器 Tab 标题中文（P0-1, P1-6, P2-12）
- 切到 ne / ur / my / fil，设置面板"主题"区域文字非英文（P1-6）
- 访问 `?year=2024&day=100&lang=ja`，主标题日文且年份是 2024（P0-1, P0-3）
- 访问 `?lang=ar`，OG image URL 内 lang=ar，View Source 看 og:locale=ar_SA（P0-5, P2-11）
- View Source 看 hreflang 行，应有 29 条，含 zh-cn / fil / my，无 jv / zh（P0-4）
- View Source 看 ld+json，inLanguage 数组 29 元素（P1-7）
- View Source 无 google-site-verification meta（除非设了环境变量）（P1-10）
- DevTools Console 无报错

**步骤 3：sitemap + robots**

浏览器访问：
- `http://localhost:3000/sitemap.xml` → 含 29 种语言入口
- `http://localhost:3000/robots.txt` → 含 sitemap 引用

**步骤 4：分享链接**

- 复制首页"复制链接"按钮，确认 URL 含 `?year=`/`?day=`/`?lang=`
- 用 Twitter 卡片验证器（https://cards-dev.twitter.com/validator）输入预览 URL（生产环境）— 看 OG 图、locale、image alt 全部正确（部署后再做）

---

## 任务依赖与建议顺序

| 顺序 | Task | 依赖 |
|---|---|---|
| 1 | Task 0（vitest）| — |
| 2 | P0-1（{year}）| Task 0 |
| 3 | P0-2（sitemap）| Task 0 |
| 4 | P0-3（resize）| 无 |
| 5 | P1-9（清理死代码）| 无；早做能减少后续 grep 误命中 |
| 6 | P1-8（语言列表 5→1）| P0-2（避免与 stub `translations` 冲突）|
| 7 | P0-4（hreflang）| P1-8（用 getCachedLanguages）|
| 8 | P1-7（structuredData）| P1-8 |
| 9 | P0-5（OG locale）| 无 |
| 10 | P1-6（主题/图标 i18n 化）| Task 0、P0-1 |
| 11 | P1-10（GSC env）| 无 |
| 12 | P2-12（删客户端 OG meta）| P0-5 |
| 13 | P2-13（html lang）| P2-12（同一 effect 区域）|
| 14 | P2-11（OG 字体）| P0-5 |
| 15 | P2-14（ISO 周）| Task 0 |
| 16 | 收尾验证 | 全部 |

---

## 审查范围

详见：`.docs/plans/2026-06-14-full-project-review-fix-review-scope.md`
