# 审查范围

**关联计划**: .docs/plans/2026-06-14-full-project-review-fix.md
**关联 Review**: .docs/plans/2026-06-14-full-project-review.md
**开始时间**: 1781827200

## 预期修改文件

### 新增（测试与配置）
- vitest.config.ts
- tests/.gitkeep
- tests/sanity.test.ts
- tests/lib/i18n/getTranslation.test.ts
- tests/lib/i18n/languages.test.ts
- tests/lib/theme.test.ts
- tests/lib/progressCalculation.test.ts
- tests/app/sitemap.test.ts
- .env.example
- src/app/api/og/fonts.ts

### 修改
- package.json
- .gitignore
- src/lib/i18n/index.ts
- src/lib/i18n/locales/types.ts
- src/lib/i18n/locales/en.ts
- src/lib/i18n/locales/zh-cn.ts
- src/lib/i18n/locales/zh-tw.ts
- src/lib/i18n/locales/es.ts
- src/lib/i18n/locales/fr.ts
- src/lib/i18n/locales/de.ts
- src/lib/i18n/locales/ja.ts
- src/lib/i18n/locales/ko.ts
- src/lib/i18n/locales/pt.ts
- src/lib/i18n/locales/ru.ts
- src/lib/i18n/locales/ar.ts
- src/lib/i18n/locales/hi.ts
- src/lib/i18n/locales/it.ts
- src/lib/i18n/locales/nl.ts
- src/lib/i18n/locales/tr.ts
- src/lib/i18n/locales/sv.ts
- src/lib/i18n/locales/pl.ts
- src/lib/i18n/locales/da.ts
- src/lib/i18n/locales/no.ts
- src/lib/i18n/locales/fi.ts
- src/lib/i18n/locales/vi.ts
- src/lib/i18n/locales/th.ts
- src/lib/i18n/locales/id.ts
- src/lib/i18n/locales/sw.ts
- src/lib/i18n/locales/bn.ts
- src/lib/i18n/locales/ne.ts
- src/lib/i18n/locales/ur.ts
- src/lib/i18n/locales/my.ts
- src/lib/i18n/locales/fil.ts
- src/lib/theme.ts
- src/lib/settings.ts
- src/lib/structuredData.ts
- src/lib/progressCalculation.ts
- src/lib/yearProgress.ts
- src/app/layout.tsx
- src/app/page.tsx
- src/app/sitemap.ts
- src/app/api/og/route.tsx
- src/components/YearProgressClient.tsx

### 删除
- src/components/ProgressCard.tsx
- src/components/TranslationProvider.tsx
- src/hooks/useFormattedText.ts
- src/hooks/useTranslation.ts
- src/hooks（如最终空目录）
- src/app/metadata.ts
- update-translations.js
- tailwind.config.js
- public/site.webmanifest
- tsconfig.build.json

## 设计文档

无独立设计文档；设计要点已写在计划开头的"全局约定"与"任务依赖与建议顺序"中。
