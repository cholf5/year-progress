# Year Progress - AI Coding Agent Instructions

## Project Overview
A real-time yearly progress visualization app built with Next.js 15, TypeScript, and Tailwind CSS v4. Features 18-language internationalization, custom theme system, social sharing, and dynamic OG image generation.

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

### Component Architecture
- **Single page app**: Main logic in `src/app/page.tsx` (610 lines)
- **Hover-based UI**: Language/theme selectors appear on hover with timeout cleanup
- **State management**: React hooks for theme, language, progress, UI states
- **Social sharing**: React-share integration with custom styling overrides

### OG Image Generation (`src/app/api/og/route.tsx`)
- **Edge runtime** for performance
- **Dynamic generation** based on current date/progress
- **Pixel-perfect grid** matching main UI visualization
- **Social media optimized** 1200×630 dimensions

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

## Key Files to Understand
- `src/app/page.tsx` - Main component with all state management
- `src/app/globals.css` - Theme system CSS overrides  
- `src/lib/theme.ts` - Theme utilities and localStorage integration
- `src/lib/i18n.ts` - 18-language translation system
- `src/app/api/og/route.tsx` - Dynamic social media card generation

When modifying this codebase, always consider theme compatibility, mobile responsiveness, and internationalization impact across all 18 supported languages.
