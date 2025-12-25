import Terminal from "~/components/Terminal";
import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  const title = "Mohammad Garmabi - Software Engineer | Full-Stack Developer | React, TypeScript, Python, Django";
  const description = 
    "Software Engineer with 5+ years experience in scalable web applications. " +
    "Specialized in React, Next.js, TypeScript, Python, Django, NestJS, Monorepo architecture, Design Systems, and Micro-Frontends. " +
    "Expert in performance optimization (100 Lighthouse scores), technical leadership, and building maintainable systems. " +
    "Previously: Khodro45, Keepa. Located in Iran, available for remote opportunities.";
  
  const keywords = [
    "Mohammad Garmabi",
    "Software Engineer",
    "Full-Stack Developer",
    "React Developer",
    "TypeScript Expert",
    "Python Developer",
    "Django Developer",
    "NestJS Developer",
    "Next.js Developer",
    "Monorepo Architecture",
    "Micro-Frontend",
    "Design System",
    "Technical Leadership",
    "Frontend Architecture",
    "Backend Development",
    "Performance Optimization",
    "Web Vitals",
    "Lighthouse 100",
    "React Query",
    "Redux",
    "Zustand",
    "SSR",
    "Nx Monorepo",
    "Code Quality",
    "Khodro45",
    "Keepa",
    "Iran Developer",
    "Remote Software Engineer",
  ].join(", ");

  return [
    // Basic Meta Tags
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "author", content: "Mohammad Garmabi" },
    
    // Language
    { name: "language", content: "English, Persian" },
    { httpEquiv: "content-language", content: "en, fa" },
    
    // Open Graph (Facebook, LinkedIn)
    { property: "og:type", content: "profile" },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: "https://mohammadgarmabi.dev" },
    { property: "og:site_name", content: "Mohammad Garmabi Portfolio" },
    { property: "og:locale", content: "en_US" },
    { property: "og:locale:alternate", content: "fa_IR" },
    
    // Profile Specific
    { property: "profile:first_name", content: "Mohammad" },
    { property: "profile:last_name", content: "Garmabi" },
    { property: "profile:username", content: "mohammad.garmabi" },
    
    // Additional SEO for job roles
    { name: "profession", content: "Software Engineer" },
    { name: "expertise", content: "React, TypeScript, Python, Django, NestJS, Next.js, Monorepo, Micro-Frontend, Design Systems" },
    { name: "experience", content: "5+ years" },
    
    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:creator", content: "@mohammadgarmabi" },
    
    // Additional SEO
    { name: "robots", content: "index, follow" },
    { name: "googlebot", content: "index, follow" },
    { name: "rating", content: "general" },
    { name: "revisit-after", content: "7 days" },
    
    // Verification (add your codes when ready)
    // { name: "google-site-verification", content: "YOUR_CODE" },
  ];
}

export default function Home() {
  return <Terminal />;
}
