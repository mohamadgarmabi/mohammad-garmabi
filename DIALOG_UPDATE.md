# 🎨 تغییر Settings به Dialog

## ✅ تغییرات اعمال شده

### 1. نصب Dialog از Radix UI
```bash
pnpm add @radix-ui/react-dialog
```

### 2. ساخت Dialog Component (Shadcn Style)
فایل: `/app/components/ui/dialog.tsx`

ویژگی‌ها:
- ✅ استایل مدرن shadcn
- ✅ انیمیشن‌های زیبا (fade, zoom, slide)
- ✅ Backdrop با blur effect
- ✅ دکمه بستن با X
- ✅ کلیک بیرون = بسته شدن
- ✅ Escape کلید = بسته شدن

### 3. تنظیمات Overlay

**قبل:**
```typescript
bg-black/80  // تیره و غیرشفاف
```

**بعد:**
```typescript
bg-black/40 backdrop-blur-sm  // شفاف‌تر با blur
```

**نتیجه:**
- ترمینال زیرش دیده میشه ✅
- افکت blur زیبا ✅
- تمرکز روی settings ولی ترمینال قابل مشاهده ✅

### 4. آپدیت Terminal Component

**قبل:**
```jsx
{showSettings && (
  <div className="fixed inset-0 bg-black bg-opacity-50...">
    {/* modal دستی */}
  </div>
)}
```

**بعد:**
```jsx
<Dialog open={showSettings} onOpenChange={setShowSettings}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>⚙️ Terminal Settings</DialogTitle>
      <DialogDescription>
        Customize your terminal appearance
      </DialogDescription>
    </DialogHeader>
    {/* محتوای settings */}
  </DialogContent>
</Dialog>
```

## 🎨 ویژگی‌های Dialog

### انیمیشن‌ها:
- **Fade In/Out**: ظاهر و محو شدن نرم
- **Zoom**: بزرگ‌نمایی از 95% به 100%
- **Slide**: اسلاید از مرکز
- **Duration**: 200ms (سریع و روان)

### Backdrop:
- **Opacity**: 40% (شفاف‌تر از قبل)
- **Blur**: backdrop-blur-sm (تار کردن پس‌زمینه)
- **Click**: کلیک روی backdrop = بسته شدن

### دکمه بستن:
- **Position**: بالا سمت راست
- **Icon**: X از lucide-react
- **Hover**: تغییر رنگ
- **Focus**: ring برای accessibility

## 📱 Responsive

Dialog به صورت کامل responsive است:
- **Mobile**: پر عرض با padding
- **Desktop**: max-width 2xl
- **Height**: max-height 90vh با scroll

## 🎮 نحوه استفاده

### باز کردن Settings:

**روش 1:** کلیک راست → Settings
**روش 2:** کلیک روی ⚙️
**روش 3:** دستور `settings`

### بستن Settings:

**روش 1:** کلیک روی X
**روش 2:** کلیک بیرون از Dialog
**روش 3:** کلید Escape
**روش 4:** دستور `settings` دوباره

## 🔍 قبل و بعد

### قبل:
```
┌─────────────────────────────┐
│   [Modal کامل سیاه]         │
│   ترمینال زیرش دیده نمیشه   │
└─────────────────────────────┘
```

### بعد:
```
┌─────────────────────────────┐
│   [Dialog با backdrop blur]  │
│   ترمینال زیرش دیده میشه ✅  │
│   افکت blur زیبا ✅           │
└─────────────────────────────┘
```

## 🎯 مزایای Dialog نسبت به Modal دستی

1. ✅ **Accessibility بهتر**: 
   - Focus management
   - Keyboard navigation
   - Screen reader support

2. ✅ **انیمیشن‌های حرفه‌ای**:
   - Radix UI animations
   - Smooth transitions

3. ✅ **API بهتر**:
   - open/onOpenChange
   - کنترل ساده‌تر

4. ✅ **استایل shadcn**:
   - مدرن و زیبا
   - سازگار با طراحی

5. ✅ **باگ کمتر**:
   - Portal handling
   - Z-index management
   - Body scroll lock

## 🎨 سفارشی‌سازی بیشتر

### تغییر شفافیت Backdrop:

```typescript
// dialog.tsx - line 20
bg-black/40  // فعلی
bg-black/20  // شفاف‌تر
bg-black/60  // تیره‌تر
```

### تغییر Blur:

```typescript
backdrop-blur-sm   // فعلی (کم)
backdrop-blur-md   // متوسط
backdrop-blur-lg   // زیاد
backdrop-blur-none // بدون blur
```

### تغییر اندازه:

```typescript
// Terminal.tsx
<DialogContent className="max-w-2xl">  // فعلی
<DialogContent className="max-w-4xl">  // بزرگ‌تر
<DialogContent className="max-w-xl">   // کوچک‌تر
```

### حذف انیمیشن:

```typescript
// dialog.tsx
// این کلاس‌ها رو حذف کن:
data-[state=open]:animate-in 
data-[state=closed]:animate-out
// و غیره...
```

## 🚀 تست کردن

1. برو به `http://localhost:5173/`
2. تنظیمات رو باز کن (⚙️ یا کلیک راست)
3. ببین ترمینال زیرش دیده میشه ✅
4. افکت blur رو مشاهده کن ✅
5. کلیک بیرون = بسته میشه ✅
6. Escape = بسته میشه ✅

## 📦 فایل‌های تغییر یافته

1. ✅ `app/components/ui/dialog.tsx` - جدید
2. ✅ `app/components/Terminal.tsx` - آپدیت شده
3. ✅ `package.json` - @radix-ui/react-dialog اضافه شد

## 💡 نکات

- Dialog از Portal استفاده می‌کنه (render خارج از DOM tree)
- Focus trap داره (tab فقط داخل dialog می‌چرخه)
- Escape handler داره
- Body scroll lock داره (وقتی باز باشه scroll نمیشه)
- Accessibility attributes کامل

## 🎉 خلاصه

الان به جای modal ساده، یه Dialog حرفه‌ای داری که:
- ✅ ترمینال زیرش دیده میشه
- ✅ افکت blur زیبا داره
- ✅ انیمیشن‌های روان داره
- ✅ از shadcn استایل داره
- ✅ Accessibility کامل داره

**همه چیز آماده است!** 🚀

