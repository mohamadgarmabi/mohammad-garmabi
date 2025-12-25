# 🚀 SEO Complete Guide - Mohammad Garmabi Portfolio

## ✅ تغییرات اعمال شده برای SEO

پورتفولیوی شما حالا برای موتورهای جستجو کاملاً بهینه شده!

## 📋 Meta Tags کامل

### 1. Basic Meta Tags
```html
✅ Title: "Mohammad Garmabi | محمد گرمابی - Senior Frontend Developer"
✅ Description: دوزبانه (فارسی + انگلیسی)
✅ Keywords: شامل نام فارسی و انگلیسی + تخصص‌ها
✅ Author: Mohammad Garmabi
✅ Language: English, Persian
```

### 2. Open Graph (LinkedIn, Facebook)
```html
✅ og:type = "profile"
✅ og:title = نام شما
✅ og:description = توضیحات کامل
✅ og:locale = "en_US" + "fa_IR"
✅ profile:first_name / last_name
```

### 3. Twitter Card
```html
✅ twitter:card = "summary_large_image"
✅ twitter:title
✅ twitter:description
✅ twitter:creator
```

### 4. Structured Data (JSON-LD)
```json
{
  "@type": "Person",
  "name": "Mohammad Garmabi",
  "alternateName": "محمد گرمابی",
  "jobTitle": "Senior Frontend Developer",
  "sameAs": [LinkedIn, GitHub, NPM],
  "knowsAbout": ["React", "TypeScript", ...]
}
```

## 🗂️ فایل‌های SEO

### 1. robots.txt
**مسیر:** `/public/robots.txt`

```
✅ Allow همه صفحات
✅ Sitemap reference
✅ Crawl-delay مناسب
✅ Support for all major bots
```

### 2. sitemap.xml
**مسیر:** `/public/sitemap.xml` + `/app/routes/sitemap[.]xml.ts`

```xml
✅ URL اصلی
✅ lastmod (تاریخ آخرین تغییر)
✅ changefreq = "weekly"
✅ priority = 1.0
✅ Alternate languages (en + fa)
```

### 3. humans.txt
**مسیر:** `/public/humans.txt`

```
✅ اطلاعات توسعه‌دهنده
✅ لینک‌های اجتماعی
✅ تکنولوژی‌های استفاده شده
```

## 🎯 کلمات کلیدی

### فارسی:
- محمد گرمابی
- توسعه دهنده فرانت اند
- برنامه نویس ری‌اکت
- توسعه دهنده ارشد

### انگلیسی:
- Mohammad Garmabi
- Senior Frontend Developer
- React Developer
- TypeScript Developer
- Open Source Contributor
- NPM Package Developer

## 📊 Google Search Console Setup

### مراحل بعدی:

#### 1. Google Search Console
```bash
1. برو به: https://search.google.com/search-console
2. Add Property → URL prefix
3. Verification methods:
   - HTML file
   - HTML tag (در meta tags اضافه کن)
   - Google Analytics
   - Domain
```

**اضافه کردن Verification Tag:**
```typescript
// در app/routes/home.tsx - meta function
{ name: "google-site-verification", content: "YOUR_CODE_HERE" }
```

#### 2. Bing Webmaster Tools
```bash
1. برو به: https://www.bing.com/webmasters
2. Add Site
3. Verify (similar to Google)
```

#### 3. Submit Sitemap
```bash
# در Google Search Console:
Sitemaps → Add new sitemap
URL: https://mohammadgarmabi.dev/sitemap.xml

# در Bing Webmaster:
Sitemaps → Submit Sitemap
```

## 🔍 بهینه‌سازی برای سرچ ایرانی

### جستجوهای هدف:
```
✅ "محمد گرمابی"
✅ "Mohammad Garmabi"
✅ "محمد گرمابی برنامه نویس"
✅ "Mohammad Garmabi developer"
✅ "محمد گرمابی react"
✅ "برنامه نویس فرانت اند محمد گرمابی"
```

### محتوای دوزبانه:
```typescript
// در description:
"Mohammad Garmabi (محمد گرمابی) - ..."
// این باعث میشه هم فارسی هم انگلیسی index بشه
```

## 🌐 Domain و Hosting

### توصیه‌ها:

#### 1. Domain Name
```
✅ mohammadgarmabi.com
✅ mohammadgarmabi.dev
✅ mgarmabi.com
```

#### 2. Hosting
```
توصیه می‌شه:
- Vercel (سریع و رایگان)
- Netlify
- Cloudflare Pages
- GitHub Pages

همه اینا SSL رایگان دارن (HTTPS)
```

#### 3. SSL Certificate
```
✅ HTTPS ضروریه برای SEO
✅ Google ترجیح میده سایت‌های HTTPS رو
```

## 📱 Social Media Integration

### LinkedIn
```
وقتی لینک رو share می‌کنی:
✅ عکس preview
✅ عنوان (با نام فارسی و انگلیسی)
✅ توضیحات کامل
✅ Profile Type
```

### Twitter/X
```
✅ Twitter Card
✅ Large Image preview
✅ Creator tag
```

### WhatsApp/Telegram
```
✅ Open Graph preview
✅ Title + Description
```

## 🎨 بهینه‌سازی محتوا

### در Terminal Commands:

#### about
```typescript
"👨‍💻 Mohammad Garmabi"
"Senior Frontend Developer & Open Source Contributor"
// اسم انگلیسی + فارسی در محتوا
```

#### contact
```typescript
"LinkedIn: mohammad-garmabi"
"GitHub: mohammad-garmabi"
"NPM: mohammad.garmabi"
// لینک‌های معتبر برای backlink
```

## 🔗 Backlinks Strategy

### 1. Social Profiles
```
✅ LinkedIn → لینک به سایت
✅ GitHub Profile → لینک به سایت
✅ NPM Profile → لینک به سایت
✅ Twitter Bio → لینک به سایت
```

### 2. GitHub README
```markdown
# در GitHub profile README:
🌐 [My Portfolio](https://mohammadgarmabi.dev)
📦 Check out my [NPM Packages](...)
```

### 3. Package.json Files
```json
{
  "author": {
    "name": "Mohammad Garmabi",
    "url": "https://mohammadgarmabi.dev"
  },
  "homepage": "https://mohammadgarmabi.dev"
}
```

## 📈 Performance SEO

### Core Web Vitals
```
✅ Fast loading (Vite)
✅ Mobile responsive
✅ No layout shift
✅ Fast interaction
```

### Lighthouse Score هدف:
```
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 100
```

## 🎯 Local SEO (Iran)

### اضافه کردن Location:
```typescript
// در JSON-LD:
"address": {
  "@type": "PostalAddress",
  "addressCountry": "IR",
  "addressLocality": "Tehran" // or your city
}
```

## 📝 Content Strategy

### Blog Posts (آینده)
```
اگه بخوای SEO بهتر بشه:
1. بلاگ با محتوای فارسی/انگلیسی
2. پست‌های technical
3. Tutorial ها
4. Case studies
```

## 🔍 Monitoring Tools

### 1. Google Search Console
```
- Search Performance
- Coverage Issues
- Mobile Usability
- Core Web Vitals
```

### 2. Google Analytics 4
```typescript
// اضافه کردن GA4:
// در root.tsx - head section
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ID"></script>
```

### 3. Bing Webmaster
```
- Similar to Google Search Console
- مخصوصاً برای بازار خاورمیانه مفیده
```

## ✅ Checklist برای Launch

### قبل از Deploy:
- [ ] Domain خریداری شده
- [ ] SSL فعال (HTTPS)
- [ ] robots.txt در public/
- [ ] sitemap.xml در public/
- [ ] Meta tags کامل
- [ ] JSON-LD structured data
- [ ] Open Graph tags
- [ ] Twitter Cards

### بعد از Deploy:
- [ ] Submit به Google Search Console
- [ ] Submit به Bing Webmaster
- [ ] Submit sitemap
- [ ] Share در LinkedIn (با نام فارسی)
- [ ] Share در social media
- [ ] Update همه profile links
- [ ] Test با "محمد گرمابی" در Google
- [ ] Test با "Mohammad Garmabi" در Google

## 🚀 انتظارات واقع‌بینانه

### زمان Index شدن:
```
Google: 1-4 هفته
Bing: 2-6 هفته
```

### رتبه در نتایج:
```
هفته 1-2: ممکنه نبینی
هفته 3-4: شروع index شدن
ماه 2-3: رتبه بهتر برای نام خودت
ماه 6+: رتبه عالی برای نام + تخصص
```

### تقویت SEO:
```
1. محتوای منظم (blog)
2. Backlinks از منابع معتبر
3. Social shares
4. GitHub activity
5. NPM package updates
```

## 💡 Pro Tips

### 1. نام در محتوا
```
هرجا که می‌نویسی:
"Mohammad Garmabi (محمد گرمابی)"
// هم فارسی هم انگلیسی index میشه
```

### 2. Alt Text برای تصاویر
```typescript
<img 
  src="profile.jpg" 
  alt="Mohammad Garmabi - محمد گرمابی - Senior Frontend Developer"
/>
```

### 3. URL Structure
```
✅ mohammadgarmabi.dev/
❌ mohammadgarmabi.dev/portfolio
// ساده‌تر بهتره
```

## 🎉 خلاصه

پورتفولیوی شما حالا:
- ✅ Meta tags کامل (15+ tags)
- ✅ Structured data (JSON-LD)
- ✅ robots.txt
- ✅ sitemap.xml (static + dynamic)
- ✅ humans.txt
- ✅ Open Graph (LinkedIn, Facebook)
- ✅ Twitter Cards
- ✅ دوزبانه (فارسی + انگلیسی)
- ✅ Mobile-friendly
- ✅ Fast loading

**آماده برای رتبه 1 در گوگل برای نام شما!** 🚀

---

## 📞 مراحل بعدی:

1. Deploy سایت
2. Submit به Search Console
3. Share در LinkedIn با متن فارسی
4. منتظر 2-4 هفته برای index شدن
5. Monitor در Search Console

**موفق باشی!** 🎊

