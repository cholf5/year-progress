# Year Progress - AI Coding Agent Instructions

## Project Overview

A real-time yearly progress visualization application built with Next.js 15, TypeScript, and Tailwind CSS v4. Features comprehensive internationalization with 29 languages, custom theme system, social media sharing, and dynamic OG image generation.

## Architecture & Key Systems

### Technology Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript for type safety
- **Styling**: Tailwind CSS v4 with manual theme overrides
- **State Management**: React hooks with localStorage persistence
- **Internationalization**: Custom modular i18n system supporting 29 languages
- **Performance**: Turbopack for optimized builds

### Core Systems

#### Theme System (`src/lib/theme.ts`)
- **Custom implementation** bypassing Tailwind's `dark:` prefixes due to v4 compatibility
- **Three modes**: `light`, `dark`, `system` with localStorage persistence
- **Manual CSS overrides** in `globals.css` using `.dark` class selectors
- **Critical pattern**: Always use `applyTheme()` function, not Tailwind classes

#### Internationalization System (`src/lib/i18n/`)
- **29 languages** with full translation support including RTL (Arabic)
- **Modular architecture**: Individual files per language (~4KB each) instead of monolithic file
- **Template strings** with placeholders: `'{year} is {percentage}% complete'`
- **Browser detection** with localStorage fallback and migration logic
- **Centralized helper functions** for consistent text formatting

##### Supported Languages
```typescript
type Language = 
  | 'en' | 'zh-cn' | 'zh-tw' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'ru' 
  | 'ar' | 'hi' | 'it' | 'nl' | 'tr' | 'sv' | 'pl' | 'da' | 'no' | 'fi' 
  | 'vi' | 'th' | 'id' | 'sw' | 'bn' | 'ne' | 'ur' | 'my' | 'fil';
```

##### Key I18n Functions
- `getTranslation(language, key)`: Get localized text
- `getLanguageDisplayName(lang)`: Get native language name
- `getCachedLanguages()`: Get all supported languages
- `formatProgressTitle(lang, year, percentage)`: Format progress titles
- `detectLanguage(browserLang)`: Auto-detect browser language

#### Progress Calculation (`src/lib/yearProgress.ts`)
- **Precise day counting** from January 1st, handling leap years correctly
- **Real-time updates** every hour via `setInterval`
- Returns structured data: `{ year, totalDays, daysPassed, percentage, remainingDays }`
- **Grid visualization**: 53×7 squares representing weeks/days

#### Settings System (`src/components/SettingsModal.tsx`)
- **Cookie-based persistence** with 365-day expiration
- **Animated modal** with iOS-style popup and backdrop blur
- **Portal-based dropdowns** to avoid overflow clipping
- **Three categories**: Theme switching, language selection, Twitter icon toggle

### Styling Architecture
- **Tailwind CSS v4** with custom CSS overrides for theme compatibility
- **Manual dark mode**: `.dark` class with `!important` declarations
- **Responsive design**: Mobile-first with breakpoint prefixes
- **Custom color scheme**: Specific hex values for consistency

## Development Workflows

### Running the Application
```bash
npm run dev --turbopack    # Development with Turbopack
npm run build --turbopack  # Production build
npm run preview           # Build + start combo
```

### Critical Development Patterns

#### Theme Development
1. **Always test both light and dark modes**
2. **Use manual CSS classes** instead of `dark:` prefixes
3. **Test system preference switching** functionality
4. **Check CSS rule conflicts** in `globals.css`

#### Internationalization Development
1. **Use centralized i18n functions** - never hardcode text
2. **Template system**: Use `{placeholder}` instead of string concatenation
3. **Test all 29 languages** when adding new UI strings
4. **Consider RTL support** for Arabic and other RTL languages

#### Modal Development
1. **Animation timing**: 50ms delay for open, 350ms for close
2. **Portal dropdowns**: Use for complex UI overlays
3. **Click-outside handling**: Account for Portal-rendered elements
4. **Position calculation**: Use `getBoundingClientRect()` before rendering

## How to Add a New Language

### Prerequisites
- Understand the project's DRY principle and i18n architecture
- Have translation skills or access to translation resources
- Familiarity with TypeScript and the project structure

### Step-by-Step Guide

#### Step 1: Add Language Translation File
Create a new file in `src/lib/i18n/locales/` with the language code:

```typescript
// src/lib/i18n/locales/[language-code].ts
import { Translation } from './types';

export const translations: Translation = {
  title: 'YearProgress.org',
  siteName: 'YearProgress.org',
  description: 'Translated description...',
  yearProgress: 'Year Progress',
  subtitle: 'Real-time Yearly Progress Visualization',
  complete: 'complete',
  progressTitle: '{year} is {percentage}% complete',
  week: 'week',
  day: 'day',
  of: 'of',
  daysCompleted: 'days completed',
  daysRemaining: 'days remaining',
  // ... all other required translation keys
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  weekDayStatus: "Today is week {weekNumber}, day {dayNumber} of {year}.",
  socialHashtags: ['YearProgress'],
  copyright: '© {year} YearProgress.org',
  aboutSite: 'About',
  privacyPolicy: 'Privacy Policy',
  termsOfService: 'Terms of Service',
  aboutSiteTitle: 'About YearProgress.org',
  aboutSiteContent: `Translated about content...`,
};
```

#### Step 2: Update Core I18n System
In `src/lib/i18n/index.ts`:

1. **Add to Language type**:
```typescript
export type Language = 
  | 'en' | 'zh-cn' | 'zh-tw' | 'es' | 'fr' | 'de' | 'ja' | 'ko' | 'pt' | 'ru' 
  | 'ar' | 'hi' | 'it' | 'nl' | 'tr' | 'sv' | 'pl' | 'da' | 'no' | 'fi' 
  | 'vi' | 'th' | 'id' | 'sw' | 'bn' | 'ne' | 'ur' | 'my' | 'fil' | 'your-lang';
```

2. **Add import**:
```typescript
import { translations as yourLang } from './locales/your-lang';
```

3. **Add to allTranslations**:
```typescript
const allTranslations: Record<Language, Translation> = {
  // ... existing languages
  'your-lang': yourLang,
};
```

4. **Update supported languages array**:
```typescript
const supportedLanguages: Language[] = [
  'en', 'zh-cn', 'zh-tw', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 
  'ar', 'hi', 'it', 'nl', 'tr', 'sv', 'pl', 'da', 'no', 'fi', 
  'vi', 'th', 'id', 'sw', 'bn', 'ne', 'ur', 'my', 'fil', 'your-lang'
];
```

5. **Add to languageMap**:
```typescript
const languageMap: Record<string, Language> = {
  // ... existing mappings
  'your-lang': 'your-lang',
};
```

6. **Add to display names**:
```typescript
export function getLanguageDisplayName(lang: Language): string {
  const displayNames: Record<Language, string> = {
    // ... existing languages
    'your-lang': 'Native Language Name',
  };
  return displayNames[lang];
}
```

7. **Add to OpenGraph locale mapping**:
```typescript
export const getOgLocale = (language: Language): string => {
  const localeMap: Record<Language, string> = {
    // ... existing mappings
    'your-lang': 'your_LOCALE',
  };
  return localeMap[language] || 'en_US';
};
```

8. **Update language count**:
```typescript
export const SUPPORTED_LANGUAGES_COUNT = 30; // Increment by 1
```

#### Step 3: Update Library Files

**Theme names** (`src/lib/theme.ts`):
```typescript
export function getThemeDisplayName(theme: Theme, language: Language): string {
  const translations: Record<Language, Record<Theme, string>> = {
    // ... existing languages
    'your-lang': {
      light: 'Light',
      dark: 'Dark', 
      system: 'System'
    }
  };
  return translations[language]?.[theme] || theme;
}
```

**Settings display names** (`src/lib/settings.ts`):
```typescript
export function getTwitterIconDisplayName(icon: TwitterIcon, language: Language): string {
  const translations: Record<Language, Record<TwitterIcon, string>> = {
    // ... existing languages
    'your-lang': {
      bird: 'Twitter Bird',
      x: 'X Logo'
    }
  };
  return translations[language]?.[icon] || icon;
}
```

**Structured data** (`src/lib/structuredData.ts`):
```typescript
const descriptions: Record<Language, string> = {
  // ... existing languages
  'your-lang': 'Translated description...',
};

const names: Record<Language, string> = {
  // ... existing languages  
  'your-lang': 'YearProgress.org',
};

const homeNames: Record<Language, string> = {
  // ... existing languages
  'your-lang': 'Home',
};

export const inLanguage: Language[] = [
  'en', 'zh-cn', 'zh-tw', 'es', 'fr', 'de', 'ja', 'ko', 'pt', 'ru', 
  'ar', 'hi', 'it', 'nl', 'tr', 'sv', 'pl', 'da', 'no', 'fi', 
  'vi', 'th', 'id', 'sw', 'bn', 'ne', 'ur', 'my', 'fil', 'your-lang'
];
```

#### Step 4: SEO and Metadata Updates

The following files should automatically pick up the new language:

- **`src/app/sitemap.ts`**: Auto-includes via `Object.keys(translations)`
- **`src/app/layout.tsx`**: Auto-generates hreflang tags
- **`src/app/robots.ts`**: Uses centralized domain management

#### Step 5: Cultural Considerations

**Date and Number Formatting**:
- Consider local date format preferences (MM/DD vs DD/MM vs YYYY-MM-DD)
- Number formatting (comma vs period separators)
- Add language-specific formatting to i18n helper functions if needed

**Text Direction**:
- For RTL languages (Arabic, Hebrew, Persian), add CSS direction support
- Test with RTL text direction in browser

**Cultural Adaptation**:
- Adapt cultural references and examples
- Consider local holidays and calendar systems
- Verify color symbolism and imagery appropriateness

#### Step 6: Testing

1. **Build verification**:
```bash
npm run build --turbopack
```

2. **Language dropdown test**:
- Open settings modal
- Verify new language appears in dropdown
- Test language selection and persistence

3. **Text display test**:
- Navigate through all UI elements
- Verify all text is properly translated
- Check for missing translation keys

4. **OG image test**:
- Test social media sharing
- Verify OG image generates correctly
- Check text formatting in social cards

## DRY Principle: The Foundation of This Project

### Why DRY is Critical

This project strictly adheres to the **Don't Repeat Yourself (DRY)** principle. Violating DRY leads to:
- **Maintenance nightmares**: Changes require updates in multiple places
- **Inconsistency bugs**: Duplicated code diverges over time
- **Feature gaps**: New features miss duplicated implementations
- **Technical debt**: Accumulation of workarounds and fixes

### Real-World Example: The SettingsModal Disaster

**Problem**: SettingsModal.tsx had duplicate language definitions:
```typescript
// ❌ VIOLATION: Duplicate code in SettingsModal.tsx
const languages = ['en', 'zh-cn', 'zh-tw', /*...*/];
const getLanguageDisplayName = (lang: string): string => {
  const names: Record<string, string> = { /*...*/ };
  return names[lang] || lang;
};
```

**Consequences**:
- When new languages (ne, ur, my, fil) were added to the i18n system, they didn't appear in the UI
- Users couldn't select the new languages despite them being fully supported
- The bug existed because the duplicated code wasn't updated

**Solution**:
```typescript
// ✅ CORRECT: Use centralized i18n functions
import { getCachedLanguages, getLanguageDisplayName } from '@/lib/i18n';

const languages = getCachedLanguages(); // Always current
// getLanguageDisplayName imported from i18n module
```

### DRY Patterns in This Project

#### 1. Single Source of Truth
**Text Management**: All user-visible text defined in `src/lib/i18n/locales/`
**Domain Management**: Single `PRODUCTION_URL` constant in `src/lib/utils/baseUrl.ts`
**Configuration**: Centralized in respective `lib/` modules

#### 2. Centralized Helper Functions
```typescript
// ✅ CORRECT: Reusable helper functions
export const formatProgressTitle = (language: Language, year: number, percentage: number): string => {
  const template = getTranslation(language, 'progressTitle') as string;
  return template.replace('{year}', year.toString()).replace('{percentage}', percentage.toString());
};

// Used in: UI components, social sharing, OG images, SEO metadata
```

#### 3. Template System
```typescript
// ✅ CORRECT: Template placeholders
const template = getTranslation(language, 'weekDayStatus');
// "Today is week {weekNumber}, day {dayNumber} of {year}"
return template.replace('{year}', year).replace('{weekNumber}', weekNumber).replace('{dayNumber}', dayNumber);
```

#### 4. Import-Based Architecture
```typescript
// ✅ CORRECT: Import and reuse
import { getLanguageDisplayName, getCachedLanguages } from '@/lib/i18n';
// No duplication, always current
```

### DRY Violation Checklist

During development, always check:

**Code Duplication**:
- [ ] Are there duplicate string literals?
- [ ] Are the same URLs/domains used in multiple files?
- [ ] Are there duplicate language check logic?
- [ ] Are there duplicate calculation logic?

**Architecture Violations**:
- [ ] Are UI components defining their own data instead of importing?
- [ ] Are configuration values hardcoded instead of using constants?
- [ ] Are helper functions recreated instead of imported?
- [ ] Are translation keys duplicated instead of using the i18n system?

**Maintenance Issues**:
- [ ] Will future changes require updates in multiple files?
- [ ] Is there a single source of truth for each piece of data?
- [ ] Can new features be added by updating one central location?

### The DRY Manifesto

1. **Every piece of knowledge must have a single, unambiguous, authoritative representation within a system**
2. **If you find yourself copying and pasting code, you're probably doing something wrong**
3. **Centralize, don't duplicate - import, don't redefine**
4. **Template systems beat string concatenation**
5. **Helper functions beat inline logic**

### Consequences of Violating DRY

- **Bugs**: The SettingsModal language dropdown bug is a perfect example
- **Maintenance overhead**: Every change requires finding and updating all duplicates
- **Feature inconsistency**: New features miss duplicated implementations
- **Technical debt**: Accumulation of fixes and workarounds
- **Developer frustration**: Time wasted hunting down and updating duplicates

## Common Issues & Solutions

### Tailwind CSS v4 Dark Mode
- **Problem**: `dark:` prefixes don't work reliably
- **Solution**: Use manual CSS classes in `globals.css` with `.dark` selectors
- **Pattern**: Always add `!important` and test theme switching

### Theme State Hydration
- **Problem**: SSR mismatch causing theme flicker
- **Solution**: Use `useEffect` with `mounted` state for client-only theme logic
- **Pattern**: Initialize theme after hydration, not during SSR

### Modal Overflow Issues
- **Problem**: Modal borders clipped by dropdown content
- **Solution**: Use React Portal to render dropdowns outside modal container
- **Pattern**: Calculate position with `getBoundingClientRect()` before Portal render

### Social Media OG Image Caching
- **Problem**: Fixed URLs cause incorrect cached images
- **Solution**: Parameterized URLs with `year`, `day`, `lang` parameters
- **Pattern**: `/api/og?year=2024&day=249&lang=en` for unique cache keys

### SEO Domain Management
- **Problem**: Hardcoded URLs break in different environments
- **Solution**: Centralized domain management in `src/lib/utils/baseUrl.ts`
- **Pattern**: Single `PRODUCTION_URL` constant referenced by all files

## Key Files Reference

### Core Application
- `src/app/page.tsx` - Main component with state management
- `src/app/globals.css` - Theme system CSS overrides
- `src/lib/yearProgress.ts` - Progress calculation logic

### Internationalization
- `src/lib/i18n/index.ts` - Main i18n system (29 languages)
- `src/lib/i18n/locales/` - Individual language translation files
- `src/hooks/useTranslation.ts` - React translation hook

### Components
- `src/components/SettingsModal.tsx` - Settings modal with Portal dropdowns
- `src/components/YearProgressClient.tsx` - Main UI with social sharing
- `src/components/InfoModal.tsx` - Generic text-display modal

### Utilities & Configuration
- `src/lib/theme.ts` - Theme management
- `src/lib/settings.ts` - Settings persistence
- `src/lib/utils/baseUrl.ts` - Centralized domain management
- `src/lib/structuredData.ts` - SEO structured data

### API & SEO
- `src/app/api/og/route.tsx` - Dynamic OG image generation
- `src/app/sitemap.ts` - Multi-language sitemap
- `src/app/robots.ts` - Dynamic robots.txt
- `src/app/manifest.ts` - PWA manifest

## Performance & Optimization

### Build Optimization
- **Turbopack**: Use for both development and production builds
- **Modular i18n**: Reduced from 114KB monolithic file to ~4KB per language
- **Code splitting**: Automatic through Next.js dynamic imports

### Runtime Optimization
- **Client-side only**: Theme and language detection after hydration
- **Efficient re-renders**: React hooks with proper dependency management
- **Memory management**: Cleanup timers and event listeners

### SEO Optimization
- **Multi-language support**: Complete hreflang and structured data
- **Dynamic domains**: Environment-specific URL generation
- **Cache-friendly**: Parameterized OG images prevent social media conflicts

## Development Best Practices

### Code Quality
- **TypeScript**: Strict type checking for all components
- **ESLint**: Follow configured linting rules
- **Component architecture**: Single responsibility, reusable components
- **Error handling**: Graceful fallbacks for failed operations

### Testing Checklist
- [ ] Build verification: `npm run build --turbopack`
- [ ] Theme switching: Test light/dark/system modes
- [ ] Language switching: Test all 29 languages
- [ ] Mobile responsiveness: Test on various screen sizes
- [ ] Social sharing: Test OG image generation
- [ ] Browser compatibility: Test across modern browsers

### Deployment
- **Environment detection**: Automatic domain and configuration management
- **Static generation**: Optimize build for production deployment
- **Performance monitoring**: Monitor load times and user experience

---

**Remember**: This project's success depends on strict adherence to the DRY principle. Always ask yourself: "Is this code duplicated somewhere else?" before implementing new features.