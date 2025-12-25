# Responsive Settings - Drawer for Mobile 📱

## تغییرات اعمال شده

### Overview
Settings حالا **responsive** است:
- 📱 **Mobile**: Drawer از پایین صفحه می‌آید
- 💻 **Desktop**: Dialog در وسط صفحه (مثل قبل)

## Implementation Details

### 1. Media Query Hook 🎯

یک custom hook برای تشخیص سایز صفحه:

```typescript
// app/hooks/useMediaQuery.ts

export function useMediaQuery(query: string): boolean {
  // Handles window.matchMedia
}

export function useIsMobile() {
  return useMediaQuery("(max-width: 768px)");
}

export function useIsTablet() {
  return useMediaQuery("(min-width: 769px) and (max-width: 1024px)");
}

export function useIsDesktop() {
  return useMediaQuery("(min-width: 1025px)");
}
```

### 2. Shadcn Drawer Component ✨

از `vaul` استفاده کردیم (library drawer برای React):

```bash
npx shadcn@latest add drawer
```

Components:
- `Drawer` - Container اصلی
- `DrawerContent` - محتوای drawer
- `DrawerHeader` - Header با title و description
- `DrawerTitle` - عنوان
- `DrawerDescription` - توضیحات

### 3. Shared Settings Content 🔄

محتوای settings رو extract کردیم به یک component جداگانه:

```typescript
function SettingsContent({
  settings,
  onSettingsChange,
  isMobile = false,
}) {
  // همان محتوای قبلی
  // با optimizations برای موبایل
}
```

### 4. Responsive Wrapper 📱💻

Main component تشخیص می‌ده که کدوم رو render کنه:

```typescript
export function SettingsDialog({ ... }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <Drawer>...</Drawer>;
  }

  return <Dialog>...</Dialog>;
}
```

## Mobile Optimizations 📱

### 1. Drawer Behavior:
- ✅ از **پایین** صفحه می‌آید
- ✅ حداکثر ارتفاع: **85vh**
- ✅ Swipe to close
- ✅ Overlay با blur

### 2. Responsive Spacing:
```typescript
// Mobile
<div className="space-y-4 p-4">

// Desktop
<div className="space-y-6">
```

### 3. Font Sizes:
```typescript
// Category tabs
className="text-[10px] sm:text-xs"

// Theme names
className="text-[10px] sm:text-xs"

// Buttons
className="text-xs sm:text-sm"

// Description
className="text-[10px] sm:text-xs"
```

### 4. Grid Optimization:
```typescript
// Mobile: 2 columns, smaller gap
grid-cols-2 gap-2

// Desktop: 3 columns, larger gap
sm:grid-cols-3 gap-3
```

### 5. Color Picker Size:
```typescript
// Smaller on mobile
className="w-12 h-10"  // was w-16
```

### 6. Touch Optimization:
```typescript
// Active state for mobile taps
className="active:scale-95"

// Hover only on desktop
${!isMobile && "hover:scale-105"}
```

### 7. Button Layout:
```typescript
// Mobile: Stack vertically
<div className="flex flex-col sm:flex-row gap-2">

// Desktop: Horizontal
```

## UI Differences

### Mobile (Drawer):
```
┌─────────────────────────┐
│   ▒▒▒▒▒▒▒ Overlay ▒▒▒▒▒▒│
│                         │
│  [Swipe to close]       │
├─────────────────────────┤
│ ⚙️ Terminal Settings    │
│ Customize your terminal │
├─────────────────────────┤
│                         │
│ [Settings Content]      │
│  - Smaller font sizes   │
│  - 2-column grid        │
│  - Vertical buttons     │
│  - Touch optimized      │
│                         │
└─────────────────────────┘
```

### Desktop (Dialog):
```
     ┌─────────────────────────────┐
     │ ⚙️ Terminal Settings         │
     │ Customize appearance...     │
     ├─────────────────────────────┤
     │                             │
     │ [Settings Content]          │
     │  - Larger font sizes        │
     │  - 3-column grid            │
     │  - Horizontal buttons       │
     │  - Hover effects            │
     │                             │
     └─────────────────────────────┘
```

## Breakpoints 📐

```css
/* Mobile */
max-width: 768px
- Drawer UI
- 2 column themes
- Smaller text
- Vertical layout

/* Tablet */
769px - 1024px
- Dialog UI
- 2-3 column themes
- Medium text
- Mixed layout

/* Desktop */
min-width: 1025px
- Dialog UI
- 3 column themes
- Full text
- Horizontal layout
```

## Features

### Mobile Specific:
- ✅ **Swipe to Close**: کشیدن drawer به پایین برای بستن
- ✅ **Pull Handle**: indicator بالای drawer
- ✅ **Bottom Sheet**: از پایین می‌آید
- ✅ **Touch Optimized**: larger tap targets
- ✅ **Compact Layout**: فضای کمتر اشغال می‌کنه

### Desktop Specific:
- ✅ **Centered Dialog**: در وسط صفحه
- ✅ **More Space**: layout بزرگ‌تر
- ✅ **Hover Effects**: تعاملات موس
- ✅ **Escape to Close**: کلید ESC برای بستن

### Shared Features:
- ✅ All settings work identically
- ✅ Theme gallery
- ✅ Export/Import
- ✅ Color pickers
- ✅ Font size slider

## Code Structure

```
app/
├── hooks/
│   └── useMediaQuery.ts         # 🆕 Media query hook
├── components/
│   ├── ui/
│   │   ├── dialog.tsx           # Existing
│   │   └── drawer.tsx           # 🆕 Drawer component
│   └── Terminal/
│       └── SettingsDialog.tsx   # ✏️ Now responsive
```

## Technical Implementation

### Detection:
```typescript
const isMobile = useIsMobile(); // true if width <= 768px
```

### Rendering:
```typescript
if (isMobile) {
  return <Drawer>...</Drawer>;
}
return <Dialog>...</Dialog>;
```

### Content Reuse:
```typescript
<SettingsContent
  settings={settings}
  onSettingsChange={onSettingsChange}
  isMobile={isMobile}
/>
```

## Performance

### Media Query Hook:
- ✅ Listens to `matchMedia` changes
- ✅ Cleans up listeners
- ✅ SSR safe (checks window)
- ✅ Minimal re-renders

### Component:
- ✅ Single shared content component
- ✅ No duplicate code
- ✅ Efficient rendering

## Browser Compatibility

✅ **Drawer (vaul)**:
- Chrome/Edge: Full support
- Safari: Full support
- Firefox: Full support
- Mobile browsers: Full support

✅ **Media Queries**:
- All modern browsers
- IE 11+ (if needed)

## User Experience

### Mobile UX:
1. User taps settings or right-clicks
2. Drawer slides up from bottom
3. User can scroll content
4. Swipe down or tap outside to close
5. Smooth animation

### Desktop UX:
1. User clicks settings or right-clicks
2. Dialog appears in center
3. User can scroll if needed
4. Click outside or ESC to close
5. Fade animation

## Testing

### Test Mobile:
```bash
# 1. Open DevTools
# 2. Toggle device toolbar (Cmd+Shift+M)
# 3. Select mobile device (iPhone, Android)
# 4. Open settings
# 5. Should see drawer from bottom
```

### Test Desktop:
```bash
# 1. Open in normal browser window
# 2. Open settings
# 3. Should see centered dialog
```

### Test Responsive:
```bash
# 1. Open settings
# 2. Resize browser window
# 3. Cross 768px breakpoint
# 4. Settings should adapt (may need reopen)
```

## Future Enhancements 💡

- [ ] Persist drawer position
- [ ] Custom breakpoints
- [ ] Tablet-specific optimizations
- [ ] Landscape mode handling
- [ ] Split screen support
- [ ] Accessibility improvements
- [ ] RTL support

## Accessibility ♿

### Drawer:
- ✅ Keyboard navigable
- ✅ Focus trap when open
- ✅ ARIA labels
- ✅ Screen reader friendly

### Dialog:
- ✅ Keyboard navigable
- ✅ Focus trap when open
- ✅ ARIA labels
- ✅ Screen reader friendly

## 🎉 Summary

این update شامل:
- ✅ **Responsive Settings**: Drawer تو موبایل، Dialog تو دسکتاپ
- ✅ **useMediaQuery Hook**: تشخیص سایز صفحه
- ✅ **Mobile Optimizations**: فونت‌های کوچک‌تر، layout بهینه
- ✅ **Touch Optimized**: برای تعاملات لمسی
- ✅ **Shared Content**: بدون تکرار کد
- ✅ **Better UX**: تجربه بهتر روی موبایل

حالا settings روی موبایل خیلی بهتر کار می‌کنه! 📱✨

