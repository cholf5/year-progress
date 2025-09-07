# Year Progress - AI Coding Agent Instructions

## Project Overview
A real-time yearly pr### Common Gotchas & Solutions

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
- **Content management**: Pass content dynamically rather than hard-coding different modal components visualization app built with Next.js 15, TypeScript, and Tailwind CSS v4. Features 18-language internationalization, custom theme system, social sharing, and dynamic OG image generation.

## Architecture & Key Systems

### Theme System (`src/lib/theme.ts`)
- **Custom implementation** bypassing Tailwind's `dark:` prefixes due to v4 compatibility issues
- **Manual CSS overrides** in `globals.css` using `.dark` class selectors with `!important`
- **Three modes**: `light`, `dark`, `system` with localStorage persistence
- **Critical pattern**: Use `applyTheme()` function, not Tailwind classes, for theme switching
- Theme state managed in main page component with system theme detection

### Internationalization (`src/lib/i18n.ts`) 
- **18 languages** with full translation support including RTL (Arabic)
- **Template strings** with placeholders: `'{year} is {percentage}% complete'`
- **Browser detection** with localStorage fallback
- **Language-specific formatting** for dates, numbers, and cultural content
- All UI text must go through `getTranslation(lang, key)` function

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

### SEO System (`src/app/robots.ts`, `src/app/sitemap.ts`, `src/app/manifest.ts`)
- **Dynamic domain detection**: Automatically uses correct domain based on environment
- **Multi-environment support**: Localhost for dev, production domain for live/preview environments
- **robots.txt generation**: Next.js 15 MetadataRoute.Robots with crawl rules and sitemap reference
- **sitemap.xml generation**: Automatic sitemap with all 18 languages and yearly variations
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
- **Multi-language hreflang**: All 18 languages properly declared in metadata
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
- `src/lib/theme.ts` - Theme utilities and localStorage integration
- `src/lib/i18n.ts` - 18-language translation system
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
6. **Multi-language SEO**: Include all 18 languages in hreflang and sitemap generation
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
