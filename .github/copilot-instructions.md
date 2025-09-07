# Year Progress - AI Coding Agent Instructions

## Project Overview

A real-time yearly progress visualization app built with Next.js 15, TypeScript, and Tailwind CSS v4. Features 19-language internationalization, custom theme system, social sharing, and dynamic OG image generation.

## Common Gotchas & Solutions

### Tailwind CSS v4 Dark Mode Issues
- **Problem**: `dark:` prefixes don't work reliably
- **Solution**: Use manual CSS classes in `globals.css` with `.dark` selectors
- **Pattern**: Always add `!important` and test theme switching functionality

### Settings Modal Development Issues
- **Animation timing**: Requires 50ms delay for open animation, not 10ms
- **Overflow conflicts**: Modal needs `overflow-hidden` for rounded corners, but clips dropdowns
- **Solution**: Use React Portal to render dropdowns outside modal container
- **Dropdown positioning**: Calculate `getBoundingClientRect()` before Portal render
- **Z-index management**: Portal dropdowns need `z-[9999]` to appear above modal backdrop

### Custom Dropdown vs HTML Select
- **HTML Select limitations**: No styling control, poor mobile UX, theme conflicts
- **Custom solution**: Button trigger + Portal dropdown + position calculation
- **Scroll handling**: 8-item height limit with custom scrollbar via CSS
- **Click-outside logic**: Must account for Portal-rendered elements in DOM tree

### Footer Design and Information Architecture
- **Low-profile principle**: Footer should be nearly invisible, occupying minimal space without contrasting colors
- **Information hierarchy**: Use "About This Site" link instead of displaying privacy statements directly
- **Legal page strategy**: For simple tool sites, avoid complex privacy policies/ToS that may seem "over-formal"
- **Optimal approach**: Single privacy statement in About page, no separate legal pages to avoid user suspicion
- **Domain credibility**: .org domains benefit from appearing organizational rather than personal

### CSS Color Management and Theme System Issues
- **Global CSS override problems**: `globals.css` rules with `!important` can cascade unexpectedly across themes
- **Button styling conflicts**: Global button styles in dark mode can affect light mode if not properly scoped
- **Text color visibility**: Light mode requires darker gray colors for readability on white backgrounds
- **CSS rule organization**: Group all color rules by theme mode, not by component, for better maintainability
- **Critical debugging pattern**: When theme switching breaks, check for CSS rule conflicts and specificity issues

#### CSS Theme Color Management Pattern
```css
/* ===== Centralized Color Management ===== */
/* Light mode text colors */
:not(.dark) .text-gray-900 { color: #111827 !important; }
:not(.dark) .text-gray-400 { color: #4b5563 !important; }
:not(.dark) .text-gray-500 { color: #374151 !important; }

/* Dark mode text colors */
.dark .text-gray-900 { color: #ffffff !important; }
.dark .text-gray-400 { color: #d1d5db !important; }
.dark .text-gray-500 { color: #d1d5db !important; }
```

### Modal Component Architecture
- **InfoModal pattern**: Generic text-display modal for About/Help content with consistent animation
- **Reusable design**: Single InfoModal component handles title, content, and close button text
- **Animation consistency**: Use same timing as SettingsModal (50ms open delay, 350ms close duration)
- **Content management**: Pass content dynamically rather than hard-coding different modal components

### Social Media Sharing Internationalization
- **Centralized text source**: Always use `progressTitle` from `i18n.ts` instead of hardcoded strings
- **Helper function pattern**: Create `formatProgressTitle(language, year, percentage)` for consistent formatting
- **Template replacement**: Use `getTranslation(language, 'progressTitle')` with `.replace('{year}', year).replace('{percentage}', percentage)`
- **Platform consistency**: Apply same localized text across Twitter, Facebook, Telegram, Reddit, Weibo, Instagram
- **Avoid hardcoded conditionals**: Replace `isChinese(language) ? '中文文本' : 'English text'` patterns with i18n system
- **Social hashtags integration**: Use `getTranslation(language, 'socialHashtags')` for platform-specific hashtags

#### Social Media Multilingual Refactoring Pattern
```typescript
// ❌ WRONG: Hardcoded language-specific text
title={isChinese(language) 
  ? `${progress.year}年已过去了${progress.percentage}%`
  : `${progress.year} is ${progress.percentage}% complete.`
}

// ✅ CORRECT: Use centralized i18n system
const formatProgressTitle = (language: Language, year: number, percentage: number): string => {
  const template = getTranslation(language, 'progressTitle') as string;
  return template.replace('{year}', year.toString()).replace('{percentage}', percentage.toString());
};

title={formatProgressTitle(language, progress.year, progress.percentage)}
```

A real-time yearly progress visualization app built with Next.js 15, TypeScript, and Tailwind CSS v4. Features 19-language internationalization, custom theme system, social sharing, and dynamic OG image generation.

## Architecture & Key Systems

### Theme System (`src/lib/theme.ts`)
- **Custom implementation** bypassing Tailwind's `dark:` prefixes due to v4 compatibility issues
- **Manual CSS overrides** in `globals.css` using `.dark` class selectors with `!important`
- **Three modes**: `light`, `dark`, `system` with localStorage persistence
- **Critical pattern**: Use `applyTheme()` function, not Tailwind classes, for theme switching
- Theme state managed in main page component with system theme detection

### Internationalization (`src/lib/i18n.ts`) 
- **19 languages** with full translation support including RTL (Arabic)
- **Chinese variants**: `zh-cn` (Simplified) and `zh-tw` (Traditional) with proper standards
- **Template strings** with placeholders: `'{year} is {percentage}% complete'`
- **Browser detection** with localStorage fallback and migration logic
- **Language-specific formatting** for dates, numbers, and cultural content
- All UI text must go through `getTranslation(lang, key)` function

#### Language Standards & Migration
- **Standard codes**: Use BCP 47 language tags (`zh-cn`, `zh-tw`, not just `zh`)
- **Migration logic**: Automatically converts legacy language codes in `getInitialLanguage()`
- **Browser detection**: Handles full locale codes (`zh-CN`, `zh-TW`, `zh-HK`, `zh-SG`)
- **Regional mapping**: `zh-hk` → `zh-tw`, `zh-sg` → `zh-cn` for regional preferences

#### Adding New Languages - Complete Checklist
When adding a new language (e.g., `pt-br` for Brazilian Portuguese):

1. **Core Translation (`src/lib/i18n.ts`)**
   - Add new language object to `translations` with all required keys
   - Update `Language` type to include new code
   - Add to `languageMap` in `detectLanguage()` function
   - Add display name in `getLanguageDisplayName()`

2. **Component Files**
   - **SettingsModal.tsx**: Add to `languages` array and `getLanguageDisplayName()` function
   - **YearProgressClient.tsx**: Update language-specific logic (if needed)
   - Consider special formatting needs (RTL, date formats, number formats)

3. **Library Files Updates**
   - **theme.ts**: Add translations for theme names (`light`, `dark`, `system`)
   - **settings.ts**: Add translations for TwitterIcon display names (`x`, `bird`)
   - **structuredData.ts**: Add to `descriptions`, `names`, `homeNames`, and `inLanguage` array

4. **SEO & Metadata**
   - **sitemap.ts**: Language will be auto-included via `Object.keys(translations)`
   - **layout.tsx**: Hreflang tags generated automatically
   - **og/route.tsx**: Consider if OG image needs language-specific formatting
   - **structuredData.ts**: Update structured data language arrays

5. **Cultural Considerations**
   - Date formatting preferences (MM/DD vs DD/MM vs YYYY-MM-DD)
   - Number formatting (comma vs period separators)
   - RTL support (Arabic, Hebrew) requires CSS direction changes
   - Cultural content adaptation (holidays, cultural references)

#### Language-Specific Logic Pattern
```typescript
// Helper function for language groups
const isChinese = (lang: Language): boolean => {
  return lang === 'zh-cn' || lang === 'zh-tw';
};

// Use in components for special formatting
const formatDate = (date: Date, language: Language) => {
  if (isChinese(language)) {
    return `${date.getMonth() + 1}月${date.getDate()}日`;
  }
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
```

### Progress Calculation (`src/lib/yearProgress.ts`)
- **Precise day counting** from Jan 1st, handling leap years correctly  
- **Real-time updates** every hour via `setInterval`
- Returns structured data: `{ year, totalDays, daysPassed, percentage, remainingDays }`
- Progress grid visualization: 53×7 squares representing weeks/days

### Styling Architecture
- **Tailwind CSS v4** with custom CSS overrides for theme compatibility
- **Manual dark mode**: `.dark` class with `!important` declarations in `globals.css`
- **Responsive design**: Mobile-first with `sm:`, `md:`, `lg:` breakpoints
- **Custom color scheme**: Specific hex values (#101828, #374151, #1e2939, etc.)
- **Hover effects**: Dropdowns with 150ms delay for UX smoothness

## Development Workflows

### Running the App
```bash
npm run dev --turbopack  # Development with Turbopack
npm run build --turbopack  # Production build
npm run preview  # Build + start combo
```

### Critical Development Patterns
1. **Theme changes**: Always test both light/dark modes and system preference switching
2. **i18n updates**: Verify all 18 language files when adding new UI strings
3. **CSS conflicts**: Check `globals.css` manual overrides don't break with Tailwind updates
4. **Mobile responsive**: Progress grid auto-scales based on screen width calculations
5. **Modal animations**: Use 50ms delay for open animations, 350ms for close timing
6. **Portal dropdowns**: Calculate position with `getBoundingClientRect()` before rendering
7. **Click-outside handling**: Account for Portal elements in event delegation logic

### Component Architecture
- **Single page app**: Main logic in `src/app/page.tsx` (610 lines)
- **Settings system**: Complete modal in `src/components/SettingsModal.tsx` with Cookie persistence
- **Hover-based UI**: Language/theme selectors appear on hover with timeout cleanup
- **State management**: React hooks for theme, language, progress, UI states
- **Social sharing**: React-share integration with custom styling overrides

### Settings System (`src/components/SettingsModal.tsx`)
- **Cookie-based persistence**: 365-day expiration with `js-cookie` library
- **Animated modal**: iOS-style popup with backdrop blur and scale animation
- **Three setting categories**: Theme switching, language selection, Twitter icon toggle
- **Portal-based dropdowns**: Custom language selector using React Portal to avoid overflow clipping
- **Click-outside handling**: Proper event management for dropdown closing

#### Settings Modal Animation Pattern
```typescript
// Two-stage animation with proper timing
useEffect(() => {
  if (isOpen) {
    setShouldRender(true);
    const timer = setTimeout(() => setIsAnimating(true), 50); // 50ms delay crucial
    return () => clearTimeout(timer);
  } else {
    setIsAnimating(false);
    const timer = setTimeout(() => setShouldRender(false), 350);
    return () => clearTimeout(timer);
  }
}, [isOpen]);
```

#### Portal-based Dropdown Pattern
```typescript
// State management for position calculation
const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

// Position calculation before opening
const updateDropdownPosition = () => {
  if (dropdownRef.current) {
    const rect = dropdownRef.current.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + 4,
      left: rect.left, 
      width: rect.width
    });
  }
};

// Portal rendering outside modal
{isOpen && typeof window !== 'undefined' && createPortal(
  <div style={{ position: 'fixed', top: dropdownPosition.top, left: dropdownPosition.left }}>
    {/* Dropdown content */}
  </div>,
  document.body
)}
```

#### Custom Scrollbar Styling
```css
.scrollbar-thin::-webkit-scrollbar { width: 6px; }
.scrollbar-thin::-webkit-scrollbar-thumb { background-color: #d1d5db; border-radius: 3px; }
.dark .scrollbar-thin::-webkit-scrollbar-thumb { background-color: #4b5563; }
```

### OG Image Generation (`src/app/api/og/route.tsx`)
- **Edge runtime** for performance
- **Dynamic generation** based on current date/progress
- **Pixel-perfect grid** matching main UI visualization
- **Social media optimized** 1200×630 dimensions
- **Parameterized URLs**: Supports `year`, `day`, `lang` parameters for historical accuracy
- **Cache-friendly**: Each parameter combination creates unique URL to prevent social media cache conflicts

### Social Sharing System
- **Parameter-based sharing**: URLs include `?year=2024&day=249&lang=en` to lock progress at sharing time
- **OG image consistency**: Shared links always show progress from the moment they were shared
- **Language separation**: URL `lang` parameter only affects OG image, not page UI language
- **Historical accuracy**: Past shares remain accurate even if accessed later
- **Multi-language share text**: All social media platforms use `progressTitle` from `i18n.ts` for consistent localized sharing content
- **Centralized text formatting**: `formatProgressTitle()` helper function ensures consistent progress text across UI and social sharing
- **Social platform support**: Twitter/X, Facebook, Telegram, Reddit, Weibo, Instagram with localized content

### SEO System (`src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts`)
- **Dynamic domain detection**: Automatically uses correct domain based on environment
- **Multi-environment support**: Localhost for dev, production domain for live/preview environments
- **robots.txt generation**: Next.js 15 MetadataRoute.Robots with crawl rules and sitemap reference
- **sitemap.xml generation**: Automatic sitemap with all 19 languages and yearly variations
- **PWA manifest**: Complete manifest.webmanifest for app installation support
- **Production domain**: `https://www.yearprogress.org` (centralized in `src/lib/utils/baseUrl.ts`)

#### Dynamic Domain Management (`src/lib/utils/baseUrl.ts`)
- **DRY principle**: Single `PRODUCTION_URL` constant to avoid duplication
- **Environment detection**: Automatic localhost detection for development
- **Vercel preview handling**: Preview domains redirect to production domain for SEO consistency
- **Environment variable support**: `NEXT_PUBLIC_SITE_URL` override capability
- **Three functions**: `getBaseUrl()`, `getBaseUrlAsync()`, `getClientBaseUrl()` for different contexts

#### SEO File Structure
```
src/app/
├── robots.ts          # Dynamic robots.txt generation
├── sitemap.ts         # Multi-language sitemap with yearly variations
├── manifest.ts        # PWA manifest for app installation
└── layout.tsx         # Enhanced metadata with hreflang and structured data

src/lib/
├── utils/baseUrl.ts   # Centralized domain management utilities
└── structuredData.ts  # Schema.org JSON-LD structured data generation
```

#### SEO Best Practices Implemented
- **Structured data**: Schema.org WebApplication and BreadcrumbList markup
- **Multi-language hreflang**: All 19 languages properly declared in metadata
- **Crawl optimization**: Different crawl delays for different search engines
- **Cache-friendly URLs**: Parameterized OG images prevent social media cache conflicts
- **Mobile optimization**: PWA manifest with proper icons and display modes
- **Environment consistency**: Preview domains use production URLs to maintain SEO integrity

## Common Gotchas & Solutions

### Tailwind CSS v4 Dark Mode Issues
- **Problem**: `dark:` prefixes don't work reliably
- **Solution**: Use manual CSS classes in `globals.css` with `.dark` selectors
- **Pattern**: Always add `!important` and test theme switching functionality

### Theme State Hydration
- **SSR mismatch**: Theme initialized after hydration to prevent flicker
- **Pattern**: Use `useEffect` with `mounted` state for client-only theme logic
- **System theme**: Listen to `prefers-color-scheme` media query changes

### Internationalization Edge Cases  
- **RTL languages**: Arabic needs special text direction handling
- **Date formatting**: Use browser's `toLocaleDateString` with locale codes
- **Template replacement**: Handle pluralization and cultural number formats
- **Legacy migration**: Always provide migration path for old language codes (e.g., `zh` → `zh-cn`)
- **Regional variations**: Consider country-specific variants (`zh-hk`, `zh-sg`, `pt-br`, `en-gb`)
- **Helper functions**: Use language group helpers like `isChinese()` instead of multiple equality checks
- **OG locale mapping**: Map language codes to proper OpenGraph locales (`zh-cn` → `zh_CN`, `zh-tw` → `zh_TW`)

#### Language Code Migration Pattern
```typescript
// Handle legacy settings during initialization
export function getInitialLanguage(): Language {
  const saved = localStorage.getItem('language');
  
  // Migrate legacy language codes
  if (saved === 'zh') {
    const migratedLang = 'zh-cn';
    localStorage.setItem('language', migratedLang);
    return migratedLang;
  }
  
  return saved as Language || detectBrowserLanguage();
}
```

#### Multi-Language Refactoring Checklist
When restructuring language codes (e.g., splitting `zh` into `zh-cn`/`zh-tw`):

1. **Update core translations object keys**
2. **Add migration logic in `getInitialLanguage()`**
3. **Update `languageMap` in `detectLanguage()`**
4. **Update `getLanguageDisplayName()` function**
5. **Replace direct language comparisons with helper functions**
6. **Update all library files (theme.ts, settings.ts, structuredData.ts)**
7. **Update component language arrays (SettingsModal, etc.)**
8. **Test existing user settings migration**
9. **Verify OG meta tag locale mappings**

### Mobile Responsiveness
- **Progress grid**: Calculate square size based on viewport width
- **Touch targets**: Ensure 44px minimum for mobile accessibility  
- **Copy container**: Fixed width prevents layout shift on different URL lengths

### Social Media Sharing & OG Image Caching
- **Cache problem**: Social platforms cache OG images by URL, fixed URLs cause incorrect shared content
- **Solution**: Parameterized OG URLs with `year`, `day`, `lang` parameters for unique cache keys
- **URL structure**: `/api/og?year=2024&day=249&lang=en` ensures each share has correct timestamp
- **Language handling**: URL `lang` parameter only affects OG image language, not page UI language
- **Historical preservation**: Past shared links remain accurate indefinitely with locked parameters

### SEO Configuration & Domain Management
- **Hardcoded URLs violation**: Never hardcode production URLs multiple times, use centralized constants
- **Dynamic domain detection**: robots.txt and sitemap.xml must adapt to current environment automatically
- **Environment consistency**: Preview domains should redirect to production URLs for SEO integrity
- **DRY principle**: Extract repeated URLs into constants in `src/lib/utils/baseUrl.ts`
- **Next.js 15 SEO**: Use MetadataRoute.Robots and MetadataRoute.Sitemap for type-safe generation
- **Async header handling**: `headers()` returns Promise in Next.js 15, use `await headers()` pattern

## Key Files to Understand
- `src/app/page.tsx` - Main component with all state management
- `src/app/globals.css` - Theme system CSS overrides + centralized color management
- `src/components/SettingsModal.tsx` - Complete settings system with Portal dropdowns
- `src/components/InfoModal.tsx` - Generic text-display modal for About/Help content
- `src/components/YearProgressClient.tsx` - Main UI component with social sharing implementation using `formatProgressTitle()` helper
- `src/lib/theme.ts` - Theme utilities and localStorage integration
- `src/lib/i18n.ts` - 19-language translation system with `progressTitle` template strings
- `src/lib/settings.ts` - Settings persistence with cookies
- `src/app/api/og/route.tsx` - Dynamic social media card generation
- `src/app/robots.ts` - Dynamic robots.txt with environment-specific domains
- `src/app/sitemap.ts` - Multi-language sitemap generation
- `src/app/manifest.ts` - PWA manifest for app installation
- `src/lib/utils/baseUrl.ts` - Centralized domain management utilities
- `src/lib/structuredData.ts` - Schema.org structured data generation

When modifying this codebase, always consider theme compatibility, mobile responsiveness, and internationalization impact across all 18 supported languages.

## Settings System Development Lessons
1. **Modal Overflow**: Always use `overflow-hidden` for proper modal borders, render dropdowns via Portal
2. **Animation Timing**: 50ms delay for open animations prevents visual glitches
3. **Portal Dropdowns**: Essential for complex UI overlays that extend beyond parent containers
4. **Click Detection**: Portal elements require special handling in click-outside logic
5. **Position Calculation**: Use `getBoundingClientRect()` to dynamically position Portal elements
6. **Theme Consistency**: All custom components must respect the global dark/light theme system

### Critical Settings Modal State Management Issues
- **State synchronization**: Settings modal internal state must sync with parent component props
- **Language setting persistence**: Never override saved settings with `getInitialLanguage()` after loading from cookies
- **Portal dropdown clicks**: Use specific IDs for Portal elements to avoid click-outside detection conflicts
- **Click-outside logic**: Portal-rendered dropdowns need dedicated ID-based detection, not generic selectors

#### Fixed Language Setting Bug Pattern
```typescript
// ❌ WRONG: This overwrites saved settings
useEffect(() => {
  const savedSettings = getSettings();
  setLanguage(savedSettings.language);
  setLanguage(getInitialLanguage()); // This overwrites the saved setting!
}, []);

// ✅ CORRECT: Only use saved settings
useEffect(() => {
  const savedSettings = getSettings();
  setLanguage(savedSettings.language);
  // Do not call getInitialLanguage() after loading saved settings
}, []);
```

#### Portal Dropdown Click Detection Pattern
```typescript
// ❌ WRONG: Generic selector can fail
const portalDropdown = document.querySelector('[style*="fixed"][style*="z-index: 9999"]');

// ✅ CORRECT: Use specific ID for reliable detection
const portalDropdown = document.getElementById('language-dropdown-portal');
```

## SEO System Development Lessons
1. **Domain Management**: Always use centralized domain utilities, never hardcode URLs multiple times
2. **Environment Detection**: robots.txt and sitemap.xml must dynamically detect localhost vs production
3. **Vercel Preview Handling**: Preview domains should use production URLs for consistent SEO
4. **Next.js 15 Changes**: `headers()` is async, requires `await` for robots.ts and sitemap.ts
5. **Type Safety**: Use MetadataRoute.Robots and MetadataRoute.Sitemap for compile-time validation
6. **Multi-language SEO**: Include all 19 languages in hreflang and sitemap generation
7. **DRY Violations**: Extract repeated domain strings into constants to prevent inconsistencies

### SEO Configuration Pattern
```typescript
// ✅ CORRECT: Centralized domain management
const PRODUCTION_URL = 'https://www.yearprogress.org' // Single source of truth

export async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await getBaseUrlAsync() // Dynamic detection
  return {
    rules: [...],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
```

### Environment-Specific Domain Logic
- **Development**: Use `localhost:3000` for local testing
- **Production**: Always use `https://www.yearprogress.org`
- **Vercel Preview**: Redirect to production domain for SEO consistency  
- **Custom domains**: Support via `NEXT_PUBLIC_SITE_URL` environment variable
- **Error handling**: Fallback to production domain if headers unavailable during build

## Multi-Language System Management

### Language Refactoring & Migration Best Practices
Based on the `zh` → `zh-cn`/`zh-tw` refactoring experience:

#### Critical Success Patterns
1. **Backward Compatibility First**: Never break existing user settings
2. **Migration Logic**: Auto-migrate old language codes in `getInitialLanguage()`
3. **Helper Functions**: Create language group helpers (`isChinese()`, `isSpanish()`) instead of multiple direct comparisons
4. **Standard Language Codes**: Always use BCP 47 standards (`zh-cn`, `zh-tw`, `pt-br`)
5. **Comprehensive Testing**: Test all language-dependent features after changes

#### Complete Language Addition Workflow
When adding any new language variant (e.g., `pt-br`, `es-mx`, `fr-ca`):

**Phase 1: Core Translation System**
1. Add complete translation object to `src/lib/i18n.ts`
2. Update `Language` type definition
3. Add to `languageMap` in `detectLanguage()` with regional mappings
4. Update `getLanguageDisplayName()` with native language name

**Phase 2: Component Integration**
5. Update `SettingsModal.tsx` languages array and display names
6. Add language-specific logic to `YearProgressClient.tsx` if needed
7. Consider cultural formatting (dates, numbers, text direction)

**Phase 3: Library Files Synchronization**
8. Update `src/lib/theme.ts` theme name translations
9. Update `src/lib/settings.ts` setting option translations
10. Update `src/lib/structuredData.ts` descriptions, names, and language arrays

**Phase 4: SEO & Metadata**
11. Verify `src/app/sitemap.ts` auto-includes new language
12. Check `src/app/layout.tsx` hreflang generation
13. Test OG image generation for new language
14. Update structured data language support

**Phase 5: Cultural Adaptation**
15. Implement region-specific date/number formatting
16. Add RTL support if needed (Arabic, Hebrew, Persian)
17. Consider cultural content adaptation
18. Test browser language detection edge cases

#### Language Group Management Pattern
```typescript
// Create language group helpers for maintainability
const isChinese = (lang: Language): boolean => lang === 'zh-cn' || lang === 'zh-tw';
const isPortuguese = (lang: Language): boolean => lang === 'pt' || lang === 'pt-br';
const isSpanish = (lang: Language): boolean => lang === 'es' || lang === 'es-mx' || lang === 'es-ar';

// Use in components instead of multiple equality checks
const monthDay = isChinese(language) 
  ? `${date.getMonth() + 1}月${date.getDate()}日`
  : date.toLocaleDateString(language === 'pt-br' ? 'pt-BR' : 'en-US');
```

#### Migration Logic Template
```typescript
export function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const saved = localStorage.getItem('language');
  
  // Handle legacy language codes with migration
  const migrations: { [key: string]: Language } = {
    'zh': 'zh-cn',        // Legacy Chinese → Simplified Chinese
    'pt': 'pt-br',        // Generic Portuguese → Brazilian Portuguese  
    'es': 'es-mx',        // Generic Spanish → Mexican Spanish
  };
  
  if (saved && migrations[saved]) {
    const migratedLang = migrations[saved];
    localStorage.setItem('language', migratedLang);
    return migratedLang;
  }
  
  if (saved && (Object.keys(translations) as Language[]).includes(saved as Language)) {
    return saved as Language;
  }
  
  return detectBrowserLanguage();
}
```

#### Regional Language Detection
```typescript
export function detectLanguage(browserLang: string): Language {
  const fullLangCode = browserLang.toLowerCase();
  const baseLangCode = browserLang.split('-')[0].toLowerCase();
  
  // Regional mappings for better UX
  const regionalMappings: { [key: string]: Language } = {
    'zh-cn': 'zh-cn', 'zh-hans': 'zh-cn', 'zh-sg': 'zh-cn',
    'zh-tw': 'zh-tw', 'zh-hant': 'zh-tw', 'zh-hk': 'zh-tw', 'zh-mo': 'zh-tw',
    'pt-br': 'pt-br', 'pt-pt': 'pt',
    'es-mx': 'es-mx', 'es-ar': 'es-ar', 'es-es': 'es',
  };
  
  // Check full locale first, then base language
  return regionalMappings[fullLangCode] || regionalMappings[baseLangCode] || 'en';
}
```

### Critical Files for Multi-Language Changes
When adding/modifying languages, these files MUST be updated:
- `src/lib/i18n.ts` (core translations)
- `src/components/SettingsModal.tsx` (UI language selector)  
- `src/components/YearProgressClient.tsx` (language-specific logic)
- `src/lib/theme.ts` (theme name translations)
- `src/lib/settings.ts` (setting translations)
- `src/lib/structuredData.ts` (SEO metadata)

When modifying this codebase, always consider theme compatibility, mobile responsiveness, and internationalization impact across all supported languages.

## Social Media Sharing Multilingual Refactoring Experience (2025-09-07)

### Problem Identified
Social media sharing buttons were using hardcoded language-specific text instead of the centralized `progressTitle` from `i18n.ts`, creating maintenance issues and inconsistency with UI text.

### Solution Implemented
1. **Created helper function**: `formatProgressTitle(language, year, percentage)` to centralize progress title formatting
2. **Refactored all social platforms**: Twitter, Facebook, Telegram, Reddit, Weibo, Instagram to use `formatProgressTitle()`
3. **Eliminated hardcoded conditionals**: Replaced `isChinese(language) ? '中文文本' : 'English text'` patterns
4. **Unified title generation**: Both UI `<h1>` and social sharing now use the same helper function

### Files Modified
- `src/components/YearProgressClient.tsx`: Added `formatProgressTitle()` helper and updated all social sharing buttons
- `.github/copilot-instructions.md`: Documented patterns and anti-patterns for future reference

### Key Lessons Learned
1. **DRY Principle**: Never duplicate text generation logic between UI and social sharing
2. **Template System**: Leverage existing `progressTitle` templates across all languages instead of recreating text
3. **Helper Functions**: Create reusable formatters for consistent text generation across components
4. **Anti-pattern Recognition**: Hardcoded language conditionals violate i18n architecture principles
5. **Maintenance Benefits**: Centralized text changes now automatically apply to both UI and social sharing

### Critical Success Pattern for Multi-Language Features
```typescript
// ✅ CORRECT: Centralized, reusable, maintainable
const formatProgressTitle = (language: Language, year: number, percentage: number): string => {
  const template = getTranslation(language, 'progressTitle') as string;
  return template.replace('{year}', year.toString()).replace('{percentage}', percentage.toString());
};

// Use everywhere: UI titles, social sharing, OG images, etc.
<h1>{formatProgressTitle(language, progress.year, progress.percentage)}</h1>
<TwitterShareButton title={formatProgressTitle(language, progress.year, progress.percentage)} />
```
