import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        
        {/* Structured Data - JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Mohammad Garmabi",
              alternateName: "محمد گرمابی",
              jobTitle: "Software Engineer",
              description: "Software Engineer specializing in Full-Stack Development with React, TypeScript, Python, and Django",
              url: "https://mohammadgarmabi.dev",
              sameAs: [
                "https://linkedin.com/in/mohammad-garmabi",
                "https://github.com/mohammad-garmabi",
                "https://npmjs.com/~mohammad.garmabi",
              ],
              knowsAbout: [
                "React.js",
                "Next.js",
                "Remix",
                "Solid.js",
                "Vite",
                "Nx",
                "Nuxt.js",
                "Tailwind CSS",
                "CSS-in-JS",
                "CSS Modules",
                "SSR",
                "SSG",
                "ISR",
                "Web Vitals",
                "Lighthouse",
                "Performance Optimization",
                "Testing",
                "Playwright",
                "Jest",
                "React Testing Library",
                "Performance Profiling",
                "TypeScript",
                "JavaScript",
                "Python",
                "Django",
                "NestJS",
                "Frontend Development",
                "Backend Development",
                "Full-Stack Development",
                "Open Source",
                "NPM Packages",
                "Web Development",
              ],
              alumniOf: {
                "@type": "EducationalOrganization",
                name: "Computer Science",
              },
            }),
          }}
        />
      </head>
      <body>
        <main id="main-content">
          {children}
        </main>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
