# ⌨️ Terminal Shortcuts Guide

## 🎉 همه Shortcut های ترمینال فعال شدن!

پورتفولیو شما حالا تمام کلیدهای میانبر ترمینال واقعی رو داره.

## 📑 Tab Management

### ✨ New Tab
**Mac:** `Cmd + T`  
**Windows/Linux:** `Ctrl + T`

یه tab جدید با welcome message باز می‌کنه.

### ❌ Close Tab
**Mac:** `Cmd + W`  
**Windows/Linux:** `Ctrl + W`

Tab فعلی رو می‌بنده (آخرین tab بسته نمیشه).

### ➡️ Next Tab
**Mac:** `Cmd + Shift + ]`  
**Windows/Linux:** `Ctrl + Shift + ]`

به tab بعدی میره.

### ⬅️ Previous Tab
**Mac:** `Cmd + Shift + [`  
**Windows/Linux:** `Ctrl + Shift + [`

به tab قبلی میره.

### 🔢 Switch to Specific Tab
**Mac:** `Cmd + 1-9`  
**Windows/Linux:** `Ctrl + 1-9`

مستقیم به tab شماره 1 تا 9 میره.

## 🎮 Terminal Controls

### 🧹 Clear Terminal
**Mac:** `Cmd + K`  
**Windows/Linux:** `Ctrl + K`

تمام محتوای ترمینال رو پاک می‌کنه (مثل ترمینال Mac).

**Alternative:** `Cmd/Ctrl + L` یا دستور `clear`

### ⚙️ Settings
**Mac:** `Cmd + ,`  
**Windows/Linux:** `Ctrl + ,`

دیالوگ تنظیمات رو باز می‌کنه.

### 🔍 Find (Coming Soon)
**Mac:** `Cmd + F`  
**Windows/Linux:** `Ctrl + F`

قابلیت جستجو در محتوای ترمینال (فعلاً غیرفعال).

## 📜 Command Navigation

### ⬆️ Previous Command
`Arrow Up` یا `↑`

دستور قبلی از تاریخچه رو نشون میده.

### ⬇️ Next Command
`Arrow Down` یا `↓`

دستور بعدی از تاریخچه رو نشون میده.

### 🔄 Auto-Complete
`Tab`

بین پیشنهادهای دستورات جابجا میشه.

## 🖱️ Mouse Actions

### Right-Click Menu
`Right Click` anywhere in terminal

منوی زمینه با گزینه‌های:
- ⚙️ Settings
- 🗑️ Clear Terminal
- ❓ Help

### Click Tab
`Left Click` on tab

به tab مورد نظر سوئیچ می‌کنه.

### Close Tab Button
`Left Click` on × in tab

tab رو می‌بنده.

### New Tab Button
`Left Click` on + button

tab جدید باز می‌کنه.

## 📋 Complete Shortcuts List

| Action | Mac | Windows/Linux | Alternative |
|--------|-----|---------------|-------------|
| New Tab | `Cmd + T` | `Ctrl + T` | Click + button |
| Close Tab | `Cmd + W` | `Ctrl + W` | Click × |
| Next Tab | `Cmd + Shift + ]` | `Ctrl + Shift + ]` | - |
| Previous Tab | `Cmd + Shift + [` | `Ctrl + Shift + [` | - |
| Switch Tab 1-9 | `Cmd + 1-9` | `Ctrl + 1-9` | Click tab |
| Clear | `Cmd + K` | `Ctrl + K` | `clear` command |
| Settings | `Cmd + ,` | `Ctrl + ,` | Right-click → Settings |
| Previous Command | `↑` | `↑` | - |
| Next Command | `↓` | `↓` | - |
| Auto-Complete | `Tab` | `Tab` | - |
| Execute Command | `Enter` | `Enter` | - |

## 🎯 Usage Examples

### مثال 1: کار با چند Tab
```bash
1. Press Cmd+T → New tab opens
2. Type "about" → Enter
3. Press Cmd+T → Another new tab
4. Type "skills" → Enter
5. Press Cmd+Shift+[ → Back to previous tab
6. Press Cmd+W → Close current tab
```

### مثال 2: Navigate Commands
```bash
1. Type "help" → Enter
2. Type "about" → Enter
3. Press ↑ → Shows "about"
4. Press ↑ → Shows "help"
5. Press ↓ → Shows "about"
6. Press Enter → Executes "about"
```

### مثال 3: Auto-Complete
```bash
1. Type "hel"
2. Press Tab → Completes to "help"
3. Type "ab"
4. Press Tab → Completes to "about"
```

## 🚀 Pro Tips

### 💡 Tip 1: Multiple Tabs
هر tab مستقل عمل می‌کنه:
- History خودش رو داره
- Input خودش رو داره
- Commands مجزا هستن

### 💡 Tip 2: Last Tab Protection
آخرین tab بسته نمیشه. همیشه حداقل یک tab باز میمونه.

### 💡 Tip 3: Tab Switching
سریع‌ترین راه:
- `Cmd+1` برای اولین tab
- `Cmd+2` برای دومین tab
- و الی آخر...

### 💡 Tip 4: Clear Shortcuts
دو تا راه برای پاک کردن:
- `Cmd+K` (Mac terminal style)
- `Cmd+L` (Linux terminal style)
- دستور `clear`

## 🎨 Visual Indicators

### Tab States
- **Active Tab**: پس‌زمینه تیره‌تر، متن سفید
- **Inactive Tab**: پس‌زمینه روشن‌تر، متن خاکستری
- **Hover**: رنگ تغییر می‌کنه
- **Close Button**: فقط روی hover نمایش داده میشه

### Tab Bar Features
- 📑 Scrollable: اگه tab های زیاد باشن
- ➕ New Tab Button: سمت راست
- ✕ Close Buttons: روی هر tab (hover)
- 🎯 Click to Switch: کلیک روی tab

## 🔧 Customization

### Change Shortcuts
فایل: `app/hooks/useTerminalShortcuts.ts`

```typescript
// Add custom shortcut
if (modifier && e.key === "n") {
  e.preventDefault();
  handlers.onNewTab?.();
}
```

### Disable Shortcuts
```typescript
// Comment out unwanted shortcuts
// if (modifier && e.key === "w") {
//   e.preventDefault();
//   handlers.onCloseTab?.();
// }
```

## ⚠️ Important Notes

### Browser Conflicts
بعضی shortcut ها ممکنه با browser conflict داشته باشن:
- `Cmd+T` معمولاً new tab browser باز می‌کنه
- `Cmd+W` معمولاً tab browser رو می‌بنده
- ما اینا رو با `preventDefault()` override می‌کنیم

### Cross-Platform
- Automatically detects Mac vs Windows/Linux
- Uses `Cmd` on Mac, `Ctrl` elsewhere
- Same functionality on all platforms

## 📊 Keyboard Shortcuts Stats

| Category | Count | Shortcuts |
|----------|-------|-----------|
| Tab Management | 6 | New, Close, Next, Prev, Switch 1-9 |
| Terminal Control | 3 | Clear, Settings, Find |
| Command Navigation | 3 | Up, Down, Tab |
| **Total** | **12+** | All terminal shortcuts |

## 🎉 Summary

پورتفولیوی شما حالا:
- ✅ Multiple tabs support
- ✅ 12+ keyboard shortcuts
- ✅ Mac terminal style shortcuts
- ✅ Cross-platform compatible
- ✅ Independent tab histories
- ✅ Visual tab indicators
- ✅ Context menu integration

**احساس ترمینال واقعی!** 🚀

---

## 📝 Quick Reference Card

```
╔══════════════════════════════════════════════╗
║         Terminal Shortcuts                   ║
╠══════════════════════════════════════════════╣
║ Cmd+T          New Tab                       ║
║ Cmd+W          Close Tab                     ║
║ Cmd+Shift+]    Next Tab                      ║
║ Cmd+Shift+[    Previous Tab                  ║
║ Cmd+1-9        Switch to Tab                 ║
║ Cmd+K          Clear Terminal                ║
║ Cmd+,          Settings                      ║
║ ↑/↓            Command History               ║
║ Tab            Auto-Complete                 ║
║ Right Click    Context Menu                  ║
╚══════════════════════════════════════════════╝
```

**نکته:** روی Mac از `Cmd`، روی Windows/Linux از `Ctrl` استفاده کن.

