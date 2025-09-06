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
- **Click-outside logic**: Must account for Portal-rendered elements in DOM tree visualization app built with Next.js 15, TypeScript, and Tailwind CSS v4. Features 18-language internationalization, custom theme system, social sharing, and dynamic OG image generation.

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

## Key Files to Understand
- `src/app/page.tsx` - Main component with all state management
- `src/app/globals.css` - Theme system CSS overrides + dropdown animations
- `src/components/SettingsModal.tsx` - Complete settings system with Portal dropdowns
- `src/lib/theme.ts` - Theme utilities and localStorage integration
- `src/lib/i18n.ts` - 18-language translation system
- `src/lib/settings.ts` - Settings persistence with cookies
- `src/app/api/og/route.tsx` - Dynamic social media card generation

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
