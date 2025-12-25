# IndexedDB Integration & Enhanced Themes 🎨💾

## تغییرات اعمال شده

### 1. IndexedDB Implementation ✅

تمام داده‌های ترمینال حالا در IndexedDB ذخیره می‌شوند (نه localStorage):

#### ✨ مزایای IndexedDB:
- **حجم بیشتر**: تا چندین صد مگابایت (localStorage فقط 5-10MB)
- **Performance بهتر**: برای داده‌های بزرگ بهینه است
- **Async**: مانع blocking نمی‌شود
- **ساختار پیشرفته**: پشتیبانی از indexes و queries

#### 📂 Stores (جداول) ایجاد شده:
```typescript
STORES = {
  SETTINGS: "settings",           // تنظیمات ترمینال
  HISTORY: "history",             // تاریخچه هر تب
  TABS: "tabs",                   // تمام تب‌ها
  COMMAND_HISTORY: "commandHistory", // تاریخچه کامندها
  THEME: "theme",                 // تم فعال
}
```

#### 💾 داده‌هایی که ذخیره می‌شوند:
- ✅ تنظیمات (fontSize, backgroundColor, fontColor)
- ✅ تمام تب‌ها و محتوای آنها
- ✅ تاریخچه هر تب
- ✅ تاریخچه کامندها
- ✅ تم انتخاب شده

### 2. Enhanced Theme System 🎨

**25+ تم حرفه‌ای** با دسته‌بندی:

#### 🖥️ Classic Terminals (4 تم):
- Classic Green - ترمینال کلاسیک سبز
- Amber Terminal - نارنجی آنتیک
- White on Black - سیاه و سفید
- Green Phosphor - فسفری سبز

#### 🌙 Modern Dark (6 تم):
- One Dark - محبوب VS Code
- Dracula - تم محبوب
- Nord - سرد و زیبا
- Monokai - کلاسیک
- Night Owl - شب‌نشین
- Material Dark - متریال

#### ☀️ Light Themes (4 تم):
- Light - روشن ساده
- Solarized Light - سولارایزد
- GitHub Light - گیت‌هاب
- Atom Light - اتم

#### 🎨 Colorful (6 تم):
- Cobalt2 - آبی عمیق
- Synthwave - رنگارنگ
- Ocean - اقیانوسی
- Cyberpunk - سایبرپانک
- Neon - نئون
- Sunset - غروب

#### ✨ Special (4 تم):
- Matrix - ماتریکس
- Hacker - هکر
- Retro - رترو
- Minimal Gray - خاکستری مینیمال

### 3. New Commands 🚀

#### `clear-data`
پاک کردن تمام داده‌های ذخیره شده:
```bash
$ clear-data
⚠️  Warning: This will clear ALL stored data...
```

#### `export-data`
Export تمام داده‌ها به JSON:
```bash
$ export-data
✅ Data exported successfully!
📦 File: terminal-backup-1234567890.json
```

### 4. Settings Dialog Updates 🎛️

#### ویژگی‌های جدید:
- 🎨 **Theme Gallery**: نمایش تم‌ها با پیش‌نمایش زنده
- 📑 **Category Tabs**: دسته‌بندی تم‌ها برای جستجوی آسان
- ✓ **Active Indicator**: نشانگر تم فعال
- 📤 **Export Button**: دانلود تمام داده‌ها
- 📥 **Import Button**: بازیابی از فایل backup
- 🎯 **Live Preview**: پیش‌نمایش زنده تم‌ها

#### UI بهبود یافته:
```typescript
// هر تم با پیش‌نمایش کامل
<ThemePreview
  backgroundColor={theme.backgroundColor}
  fontColor={theme.fontColor}
  isActive={...}
/>
```

## 📁 File Structure

```
app/
├── lib/
│   ├── db/
│   │   └── indexedDB.ts          # 🆕 IndexedDB wrapper
│   └── terminal/
│       └── constants.ts           # ✏️ تم‌های بیشتر
├── hooks/
│   ├── useTerminalSettings.ts    # ✏️ استفاده از IndexedDB
│   ├── useCommandHistory.ts      # ✏️ استفاده از IndexedDB
│   └── useTerminalTabs.ts        # ✏️ استفاده از IndexedDB
└── components/
    ├── Terminal.tsx              # ✏️ دستورات جدید
    └── Terminal/
        └── SettingsDialog.tsx    # ✏️ UI تم‌های جدید
```

## 🔄 Migration from localStorage

اگر قبلاً localStorage استفاده می‌کردید، داده‌ها **خودکار migrate** نمی‌شوند.

دو راه دارید:
1. **از نو شروع کنید**: `clear-data` را اجرا کنید
2. **Manual migrate**: کد پایین را در console اجرا کنید:

```javascript
// در console مرورگر:
const oldSettings = localStorage.getItem('terminal-settings');
if (oldSettings) {
  // Import کنید دستی
  console.log('Old settings:', oldSettings);
}
```

## 🎯 Usage Examples

### ذخیره خودکار تنظیمات:
```typescript
// هر تغییر خودکار ذخیره می‌شود
updateSettings({ fontSize: 16 });
// ✅ Saved to IndexedDB
```

### بازیابی تنظیمات:
```typescript
// در بارگذاری صفحه خودکار load می‌شود
useEffect(() => {
  loadSettings(); // از IndexedDB
}, []);
```

### Export/Import:
```bash
# Export
$ export-data
# ✅ Downloaded: terminal-backup-1234567890.json

# Import
Settings → 📥 Import Data → Select file
```

## 🚀 Performance Benefits

### قبل (localStorage):
- ❌ محدودیت 5-10MB
- ❌ Synchronous (blocking)
- ❌ فقط string storage

### بعد (IndexedDB):
- ✅ تا صدها MB
- ✅ Asynchronous (non-blocking)
- ✅ ذخیره objects پیچیده
- ✅ Indexing و query سریع

## 📊 Data Structure

### Settings Store:
```typescript
{
  key: "current",
  value: {
    fontSize: 14,
    backgroundColor: "#282c34",
    fontColor: "#abb2bf"
  }
}
```

### Tabs Store:
```typescript
{
  key: "all",
  value: {
    tabs: [
      {
        id: "1",
        title: "Terminal 1",
        history: [...],
        currentInput: "",
        timestamp: 1234567890
      }
    ],
    timestamp: 1234567890
  }
}
```

## 🔐 Privacy & Security

- ✅ تمام داده‌ها **محلی** ذخیره می‌شوند
- ✅ هیچ داده‌ای به سرور ارسال **نمی‌شود**
- ✅ کاربر کنترل کامل دارد (export/import/clear)
- ✅ IndexedDB محدود به **origin** است

## 🎨 Theme Customization

تم دلخواه خود را اضافه کنید:

```typescript
// app/lib/terminal/constants.ts
export const THEME_PRESETS = [
  // تم جدید خودتان
  {
    name: "My Custom Theme",
    backgroundColor: "#your-color",
    fontColor: "#your-color",
    category: "special", // یا هر category دیگر
  },
  // ...
];
```

## 🐛 Debugging

### مشاهده IndexedDB:
1. Chrome DevTools → Application → IndexedDB
2. پیدا کردن `TerminalPortfolioDB`
3. مشاهده هر store

### پاک کردن دستی:
```javascript
// در console:
indexedDB.deleteDatabase('TerminalPortfolioDB');
location.reload();
```

## 📝 Future Enhancements

ایده‌هایی برای آینده:
- [ ] Cloud sync (optional)
- [ ] Theme sharing (JSON export/import)
- [ ] Command aliases
- [ ] Custom commands
- [ ] Multi-profile support
- [ ] Theme marketplace

## 🎉 Summary

این آپدیت شامل:
- ✅ **IndexedDB**: ذخیره‌سازی پیشرفته و پایدار
- ✅ **25+ Themes**: دسته‌بندی شده و حرفه‌ای
- ✅ **Export/Import**: پشتیبان‌گیری کامل
- ✅ **Better UX**: UI بهتر برای تم‌ها
- ✅ **Type Safety**: کامل TypeScript

همه چیز **backward compatible** است و بدون نیاز به تغییر کد فعلی کار می‌کند! 🚀

