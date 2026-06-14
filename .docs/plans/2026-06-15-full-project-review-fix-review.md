# 全项目 Review 修复 - 代码审查报告

**审查范围**：`.docs/plans/2026-06-14-full-project-review-fix-review-scope.md`
**审查时间**：2026-06-15
**审查方式**：交互式代码审查（com-requesting-code-review）
**关注点**：高风险问题与 DRY 违例

## 统计

- **审查文件数**：约 50 个（修改 / 新增 / 删除）
- **发现真实问题**：5 个（已确认）
- **已修问题**：5 个
- **测试**：从 9 个增加到 38 个，全部 PASS
- **构建**：成功，Middleware 39.1 kB

## 问题列表

### P0（高风险）

#### 问题 1：P2-13 仅修了客户端 lang，SSR 仍输出 `<html lang="en">`
- **位置**：`src/app/layout.tsx`
- **风险**：屏幕阅读器读到错误初始 lang；爬虫拿到 `lang="en"`，与 hreflang 表声明冲突
- **决策**：方案 A（推荐）— 把 lang 提升为 SSR 行为
- **修复**：
  - 新增 `src/middleware.ts`：把 URL `?lang=` 注入 `x-url-lang` 请求头
  - i18n/index.ts 新增 3 个纯函数：
    - `parseAcceptLanguage` — 解析 q 值排序的 Accept-Language
    - `readLanguageFromSettingsCookie` — 容错读取 settings cookie
    - `resolveServerLanguage` — 优先级 URL > cookie > Accept-Language > 'en'
  - 把 `BROWSER_LANG_MAP` 抽到模块顶层共享（detectLanguage 与新代码共用，DRY 修复）
  - `layout.tsx` 改为 async server component，从 `headers()` / `cookies()` 解析后渲染 `<html lang={...}>`
  - 客户端覆写改为"仅当与 SSR 不一致时才写"，避免 hydration 噪音
  - 新增 18 个测试覆盖 URL/cookie/Accept-Language 三层优先级 + 各回退路径
- **代价**：layout 不再静态化（`/_not-found` 从 ○ Static 变 ƒ Dynamic）

### P1（DRY 违例）

#### 问题 2：`COMMON_HASHTAGS` 混在 client component 文件顶层
- **位置**：`src/components/YearProgressClient.tsx:16`
- **风险**：长期会与 i18n `socialHashtags` 漂移；其他想消费的模块（`generateMetadata` 想注 keywords 等）无法 import client component
- **决策**：抽到共享工具
- **修复**：新建 `src/lib/utils/socialShare.ts`，导出 `COMMON_HASHTAGS`、`formatSharedHashtags(language)`、`formatLocaleHashtags(language)`；YearProgressClient 改 import 复用

#### 问题 3：`sitemap.ts` 的 `mainLanguages` 仍是硬编码语言列表
- **位置**：`src/app/sitemap.ts:48`
- **风险**：P1-8 声称"消除 5 处手写语言列表"未真正完成；新加语言时 sitemap 会漏 21 条派生 URL
- **决策**：方案 A — 删掉派生 URL（与 hreflang 表语义重复，SEO 收益低）
- **修复**：删除 `years × mainLanguages` 双层循环，sitemap 只保留主入口 + 各语言版本入口 + OG API 路由

#### 问题 4：`page.tsx` generateMetadata 与 `layout.tsx` 解析语言来源不一致
- **位置**：`src/app/page.tsx`
- **风险**：我修 P2-13 引入的——cookie/Accept-Language 兜底场景下，`<html lang>` 是 ja，但 `og:locale` / `og:image?lang=` 仍是英文
- **决策**：generateMetadata 复用 `resolveServerLanguage`
- **修复**：page.tsx 接 `headers()` / `cookies()`，与 layout.tsx 用同一套优先级解析；ogImageUrl 用解析后的实际语言

#### 问题 5：4 个空 i18n "API 兼容函数" 无任何调用方
- **位置**：`src/lib/i18n/index.ts` + `src/lib/i18n.ts`
- **风险**：与 P1-9 清理的死代码同质；新人看到 `preloadLanguage` 会浪费时间
- **删除**：`preloadLanguage`、`preloadLanguages`、`clearTranslationCache`、`isLanguageCached`

### 顺手清理（YearProgressClient.tsx）
P0-3 / P2-12 / P2-13 修改后留下的 unused imports：`useRef`、`getInitialLanguage`、`saveLanguage`、`getLanguageDisplayName`、`formatWeekDayText`、`getOgLocale`、`TwitterIconType`、`saveSettings`、`TwitterShareButton`、`isButtonPressed`、`setIsButtonPressed`，以及 `searchParams` prop 接进来从未使用——全部清理。

## 已确认的非问题

- **theme.ts ↔ settings.ts ↔ i18n/index.ts**：曾担心循环依赖，但 i18n/index.ts 不反向 import，无环。
- **sitemap.test.ts encodeURIComponent 断言**：当前所有语言代码都是 ASCII，断言能保护"语言出现"的关键事实。
- **OG 字体只覆盖 3 个子集**：印地/孟加拉/泰/缅甸/尼泊尔/乌尔都仍可能显示豆腐块——但计划已声明且 fonts.ts 的 try/catch 兜底，单字体失败不影响整体 OG 图渲染。降级影响有限。
- **系统主题监听 effect 直接读 localStorage**：审查范围外的既存代码，与 settings cookie/localStorage 双轨制有关，超出本次审查目标。
- **scripts/validate-seo.js 的 3 个 require errors**：该文件不在审查范围。
- **SettingsModal.tsx 的 `getTwitterIconDisplayName` unused 警告**：P1-6 之前就存在的历史 warning，非本次修改引入。

## 最终验证

- `npx tsc --noEmit` 无错误
- `npm run test`：7 文件 / 38 测试全 PASS
- `npm run build` 成功，Middleware 39.1 kB

---

如需查看具体改动，可对照计划目录：`.docs/plans/2026-06-14-full-project-review-fix.md`
