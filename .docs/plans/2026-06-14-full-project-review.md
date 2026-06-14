# 全项目 Code Review 报告

**审查日期**：2026-06-14
**审查范围**：`--full`（全代码库）
**审查者**：Claude（com-requesting-code-review）
**过滤策略**：仅记录"高风险"与"低复用性 / DRY 违例"问题；样式偏好、可有可无的优化、测试基建等已剔除。

---

## 统计

- **审查文件**：`src/app/**`、`src/components/**`、`src/lib/**`、`src/hooks/**`、`scripts/**`、根目录配置文件
- **发现问题**：14
- **优先级分布**：P0 × 5、P1 × 5、P2 × 4
- **已确认非问题**：0
- **待复查项**：0

---

## P0 — 影响线上功能 / SEO / 分享（必须修复）

### P0-1：`getTranslation` 提前替换 `{year}`，导致历史/未来年份页面标题错乱

**位置**：`src/lib/i18n/index.ts:108-118`

```ts
if (typeof result === 'string') {
  return result
    .replace('{supportedLanguagesCount}', SUPPORTED_LANGUAGES_COUNT.toString())
    .replace('{year}', new Date().getFullYear().toString());  // ← 问题
}
```

**问题**：`progressTitle` / `currentWeekDayStatus` / `historicalWeekDayStatus` / `copyright` 的 `{year}` 占位符在 `getTranslation` 里被强制替换为"当前年份"，业务层 helper 之后再调 `template.replace('{year}', year.toString())` 完全是 no-op。

**实际后果**：访问 `?year=2024&day=100` 时，2026 年看到的标题是 "2026 is X% complete"（年份错误）。所有历史/未来年份分享链接的标题、周日信息全错；搜索引擎抓到的也是错的。

**修复方向**：删除 `.replace('{year}', ...)` 那行；保留 `{supportedLanguagesCount}` 替换；让 `{year}` 完全交给业务层 helper 处理。`copyright` 若需要"当前年份"，单独写一个 helper。

---

### P0-2：`sitemap.ts` 实际只输出 1 种语言

**位置**：`src/app/sitemap.ts:9` + `src/lib/i18n/index.ts:460-462`

```ts
// sitemap.ts
const languages = Object.keys(translations) as Array<keyof typeof translations>

// i18n/index.ts:460-462
export const translations = {
  en: basicTranslations,
} as const;
```

**问题**：`sitemap` 想用 `Object.keys(translations)` 自动展开语言，但引用的是"向后兼容"留下的 stub（只有 `en`），导致 forEach 永远不进 push 分支。**29 种语言中 28 种没进 sitemap**。

**实际后果**：Google/Bing 抓不到非英文页面，多语言 SEO 完全失效。

**修复方向**：改用 `getCachedLanguages()`（基于 `allTranslations`，返回真实 29 种）；删除或重命名 stub `translations` 防止再被误用。

---

### P0-3：首页 resize 监听不会注册

**位置**：`src/components/YearProgressClient.tsx:206-239`

**问题**：`useEffect` 内 else 分支（"无 URL 参数"路径）写了 `return () => clearInterval(interval)`，effect 直接结束。后面注册 resize 监听的代码只在 if 分支（带 `year/day` 参数）才会执行。

**实际后果**：直接打开首页（最常见入口）时，桌面用户拖动窗口或移动端横竖屏切换，方块尺寸不会重排，可能溢出或留白。

**修复方向**：把 useEffect 拆成 3 个独立 effect：①设置 + 进度初始化、②每小时 setInterval、③resize 监听。

---

### P0-4：hreflang 列表错误且过时

**位置**：`src/app/layout.tsx:29-51`

**问题**：硬编码 18 种语言；缺 11 种（zh-tw/nl/sv/da/no/fi/id/sw/ne/ur/my/fil）；含 `'zh'`（项目用 `zh-cn`）和 `'jv'`（项目根本不支持，会 fallback 到英文）。

**实际后果**：Google 对 11 种语言找不到对应版本；`jv` 被识别为"声明 jv 实际是 en"，影响整站权重；与 `sitemap.ts`、`structuredData.ts` 三处语言列表互相不一致。

**修复方向**：从 `getCachedLanguages()` 动态生成 hreflang 表。

---

### P0-5：SSR `generateMetadata` 锁死 `locale: 'en_US'`

**位置**：`src/app/page.tsx:46`

**问题**：已经导入 `Language`、有 `lang` 参数、i18n 也导出了 `getOgLocale(language)`，但 SSR 写死了 `'en_US'`。客户端 useEffect 改回正确值无意义——社交爬虫只看 SSR HTML。

**实际后果**：所有非英文用户分享出去的链接，OG 卡片告诉 Twitter/Facebook/Telegram/Reddit/微博"内容是 en_US"，影响 locale 推送、卡片语言显示、多语言 SEO 信号。

**修复方向**：`locale: getOgLocale(language)`，并 `import { getOgLocale } from '../lib/i18n'`。

---

## P1 — 一致性 / DRY 违例（强烈建议修复）

### P1-6：主题名 / Twitter 图标名脱离 i18n 系统，4 种语言英文残留

**位置**：`src/lib/theme.ts:49-135`、`src/lib/settings.ts:122-181`

**问题**：`getThemeDisplayName` / `getTwitterIconDisplayName` 在 lib 层维护对照表，与 `src/lib/i18n/locales/*.ts` 完全脱钩。新增语言要改 3 个地方，已经漏了 4 种（ne / ur / my / fil）。

**实际后果**：尼泊尔语 / 乌尔都语 / 缅甸语 / 菲律宾语用户进入设置面板，主题卡片下方的 "Light Mode / Dark Mode / Follow System" 全是英文，X / Bird 图标名也是英文。这是 `CLAUDE.md` "SettingsModal Disaster" 同类违例。

**修复方向**：把 `themeLight` / `themeDark` / `themeSystem` / `twitterIconX` / `twitterIconBird` 加入 `Translation` 接口，每个 locale 文件维护；函数改为 `getTranslation(lang, 'themeLight')`。

---

### P1-7：`structuredData.ts` 多重 DRY 违例

**位置**：`src/lib/structuredData.ts` 整个文件

**问题**：
- (a) `baseUrl` 硬编码 `'https://www.yearprogress.org'`，未用 `getSeoBaseUrl()`
- (b) `descriptions` / `homeNames` 只覆盖 12/29 种语言
- (c) `names` 12 个值全是 `'YearProgress.org'`，无意义重复
- (d) `inLanguage` 数组含不存在的 `'jv'`、缺 ne/ur/my/fil；与 sitemap/layout 三处不一致
- (e) `CLAUDE.md` 提到的 `export const inLanguage` 在文件里根本不存在（文档漂移）

**实际后果**：Google 结构化数据测试工具读到错乱元数据；17 种语言用户看到的 schema description 是英文（与页面语言不符，可能被识别为低质量）；改域名要同步 4 处。

**修复方向**：
- `baseUrl` 用 `getSeoBaseUrl()`
- `descriptions` 直接 `getTranslation(lang, 'description')`
- `names` 删表，直接字面量 `'YearProgress.org'`
- `inLanguage` 用 `getCachedLanguages()`
- 删除冗余的 `homeNames` 表

---

### P1-8：`SUPPORTED_LANGUAGES_COUNT` 与语言列表 5 处手写

**位置**：`src/lib/i18n/index.ts:3, 9-12, 49-79, 97-101, 212-216`

**问题**：同一份语言列表写了 5 次：常量、type、Record key、`getTranslation` 内联数组、`getInitialLanguage` 内联数组。`SUPPORTED_LANGUAGES_COUNT = 29` 完全靠人工同步，CLAUDE.md 还专门写了"提醒"。

**实际后果**：新增语言要改 5 处，漏 `SUPPORTED_LANGUAGES_COUNT` 时 "About" 页面文案显示错误的语言数；漏 inline 数组时 `getTranslation` fallback 到英文；这种漂移已经在 #6/#7 多次发生。

**修复方向**：
```ts
const SUPPORTED_LANGUAGES = Object.keys(allTranslations) as Language[];
export const SUPPORTED_LANGUAGES_COUNT = SUPPORTED_LANGUAGES.length;
```
两处 inline 数组用此常量；fallback 检查改为 `lang in allTranslations`。`Language` 联合类型保持手写（runtime 反推 type 不可行），但作为唯一手写来源。

---

### P1-9：死代码与无效依赖污染仓库

**位置**：多处

| 文件 / 依赖 | 状态 |
|---|---|
| `src/components/ProgressCard.tsx` | 无引用，硬编码中文文案，违反 i18n 体系 |
| `src/components/TranslationProvider.tsx` | 旧异步 i18n 时代产物，无引用 |
| `src/hooks/useFormattedText.ts` | 同上，async API 已不存在 |
| `src/hooks/useTranslation.ts` | 仅被 TranslationProvider 用 |
| `src/app/metadata.ts` | 与 `page.tsx` 重复，且用 Next 14 同步 `searchParams`（Next 15 已是 Promise）|
| `src/lib/yearProgress.ts` 的 `formatDate` / `getProgressMessage` | 仅 ProgressCard 引用 |
| `update-translations.js` | 引用已不存在的 `src/lib/i18n.ts`，模板字符串未闭合，跑不起来 |
| `tailwind.config.js` | Tailwind v4 已不读取该文件 |
| `public/site.webmanifest` | 与 `app/manifest.ts` 动态生成的 `/manifest.webmanifest` 重复且 name 为空 |
| `tsconfig.build.json` | 与 `tsconfig.json` 几乎相同，无 npm script 引用 |
| `package.json` 的 `xmldom` | 全代码无引用 |

**实际后果**：
- 死代码诱导未来误改（如有人参考 `metadata.ts` 写新 metadata，会用错 Next 15 API）
- `update-translations.js` 像"看似可用的工具"，新人尝试用会浪费时间
- `xmldom` 是已知漏洞包（GHSA-crh6-fp67-6883），留着零收益

**修复方向**：删除上述全部文件 + `package.json` 移除 `xmldom`；删除前跑 `npm run build && npm run lint && npm run type-check` 验证。

---

### P1-10：Google 验证码占位符发到生产 HTML

**位置**：`src/app/layout.tsx:66-68`

```ts
verification: {
  google: 'your-google-verification-code',
},
```

**问题**：生产页面会输出 `<meta name="google-site-verification" content="your-google-verification-code">`，永远验证不通过。

**实际后果**：如果团队以为已经接入 Google Search Console，其实拿不到任何索引/搜索数据。

**修复方向**：
```ts
verification: {
  google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
},
```
未设环境变量时 Next 会省略此 meta。

---

## P2 — 已知影响但相对独立（建议修复）

### P2-11：OG 图字体未配置，非拉丁语言分享卡片显示豆腐块

**位置**：`src/app/api/og/route.tsx:51`（`fontFamily: 'system-ui'`，无 `fonts` option）

**问题**：Edge runtime 默认无 CJK / 阿拉伯 / 印地 / 孟加拉 / 泰 / 缅甸字体。代码里把阿拉伯硬 fallback 到英文（line 37-40）解决了崩溃但等于阿拉伯用户分享出去都是英文卡片。

**实际后果**：约 2/3 语言（按用户数远超 1/2）的分享卡片视觉损坏。

**修复方向**：用 `new ImageResponse(node, { fonts: [{ name, data, weight, style }] })`，从 CDN/本地 fetch Noto Sans 子集；至少覆盖 ar / zh / ja / ko / hi / bn / th / my / ne / ur。

---

### P2-12：客户端 useEffect 重复维护 OG meta（与 SSR 重复）

**位置**：`src/components/YearProgressClient.tsx:243-298`

**问题**：同一份元数据事实在 SSR (`page.tsx` `generateMetadata`) 和 CSR (`YearProgressClient.tsx`) 两处实现，必然漂移——P0-5 就是表现之一（SSR 锁死 en_US，CSR 用 `getOgLocale`）。客户端这段对社交爬虫无意义（爬虫不执行 JS）。

**修复方向**：修复 P0-5 后，此处保留 `document.title = formatPageTitle(language)` 一行即可，其余 OG / Twitter meta 操作全部删除。

---

### P2-13：`<html lang="en">` 永远写死

**位置**：`src/app/layout.tsx:80`

**问题**：不随 `?lang=` 变化，屏幕阅读器朗读语言错误，无障碍合规失败；Google 把所有页面识别为英文，加重 P0-2 / P0-4 的 SEO 损失。

**修复方向**：
- `layout.tsx` 改为 `async function`，从 props 接 `searchParams`，`<html lang={resolvedLang}>`
- `YearProgressClient` 切语言时同步 `document.documentElement.lang = newLang`

---

### P2-14：周数计算与 ISO-8601 不一致

**位置**：`src/components/YearProgressClient.tsx:39, 567, 591`、`src/app/api/og/route.tsx:150`

**问题**：`Math.ceil(daysPassed / 7)` 让 1月1日永远=第1周第1天。不同年份"第1周"实际起始日漂移；与翻译模板"第N周"的常识理解（多数语言用户习惯 ISO 周）不符。

**实际后果**：用户在年初对照系统日历或第三方日历会觉得"周数不对"，质疑工具准确性。

**修复方向**：决定一种语义并贯彻——
- 选项 A：保持现状但翻译模板措辞改为"第 X 个 7 天周期"
- 选项 B：用 `moment(date).isoWeek()` 与主流日历对齐
建议选 B，并对历史链接做兼容（`?day=` 不变，仅周数显示变）。

---

## 已确认的非问题

无（用户全程"继续"，未触发"不是问题"反馈）。

---

## 修复优先级建议

| 阶段 | 包含项 | 工作量预估 | 验证方式 |
|---|---|---|---|
| **第 1 批（P0）** | P0-1 ~ P0-5 | 0.5 day | 启动 dev，访问 `?year=2024&day=100&lang=zh-cn` 看标题；构建后看 sitemap.xml 行数；缩放窗口看方块；查 HTML 头部 hreflang / og:locale |
| **第 2 批（P1 一致性）** | P1-6 ~ P1-8 | 1 day | 切到 ne/ur/my/fil 看设置面板无英文残留；Google 结构化数据测试工具跑 schema；新增一种假语言验证 5 处都能自动同步 |
| **第 3 批（P1 清理）** | P1-9 ~ P1-10 | 0.5 day | `npm run build && npm run lint && npm run type-check` 通过；GSC 验证位用环境变量 |
| **第 4 批（P2）** | P2-11 ~ P2-14 | 1 ~ 2 day（P2-11 取决于字体策略）| OG 图肉眼检查 10 种非拉丁语言；屏幕阅读器测 `<html lang>`；ISO 周对比标准日历 |

---

## 后续流程

请选择：
1. **仅记录**：本文档已落盘，后续自行处理
2. **制定修复计划**：调用 com-writing-plans，按上述优先级生成可逐任务执行的计划文档
3. **立即修复**：选择 com-inline-execution（当前会话直接改）或 com-subagent-driven-development（每任务一子代理）
4. **讨论某个问题**：指明编号，深入分析或调整修复方案
