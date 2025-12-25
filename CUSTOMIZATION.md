# 🎨 Customization Guide

This guide will help you customize your terminal portfolio to match your personal information and style.

## 📝 Editing Portfolio Content

### Location
All content is in: `/app/components/Terminal.tsx`

### Step-by-Step Instructions

#### 1. Update About Section
Find the `about` section in `commandData` (around line 35):

```typescript
about: [
  "👨‍💻 Your Title/Role",
  "Your description line 1",
  "Your description line 2",
],
```

**Example:**
```typescript
about: [
  "👨‍💻 Senior Full Stack Developer",
  "5+ years of experience building scalable web applications.",
  "Specialized in React, Node.js, and cloud architecture.",
  "Based in Tehran, Iran 🇮🇷",
],
```

#### 2. Update Skills
Edit the `skills` section:

```typescript
skills: [
  "💻 Technical Skills:",
  "  • Frontend: React, Next.js, TypeScript, Vue.js",
  "  • Backend: Node.js, Python, Django, FastAPI",
  "  • Database: PostgreSQL, MongoDB, Redis, MySQL",
  "  • DevOps: Docker, Kubernetes, AWS, CI/CD",
  "  • Tools: Git, VSCode, Figma, Postman",
],
```

#### 3. Update Projects
Edit the `projects` section:

```typescript
projects: [
  "🚀 Featured Projects:",
  "",
  "  1. Project Name - Description",
  "     Tech: React, Node.js, PostgreSQL",
  "     Link: github.com/username/project",
  "",
  "  2. Another Project - Description",
  "     Tech: Next.js, TypeScript, Tailwind",
  "     Link: yourproject.com",
  "",
  "  3. Third Project - Description",
  "     Tech: Python, Django, Redis",
  "     Link: github.com/username/project",
],
```

#### 4. Update Experience
Edit the `experience` section:

```typescript
experience: [
  "💼 Work Experience:",
  "",
  "  📍 Senior Developer @ Company Name (2022-Present)",
  "     • Achievement or responsibility 1",
  "     • Achievement or responsibility 2",
  "",
  "  📍 Full Stack Developer @ Startup Inc (2020-2022)",
  "     • Key accomplishment",
  "     • Tech stack used",
  "",
],
```

#### 5. Update Education
Edit the `education` section:

```typescript
education: [
  "🎓 Education:",
  "",
  "  • Bachelor's in Computer Science",
  "    University Name, 2016-2020",
  "",
  "  • Certifications:",
  "    - AWS Certified Solutions Architect",
  "    - Google Cloud Professional",
  "",
],
```

#### 6. Update Contact Information
Edit the `contact` section:

```typescript
contact: [
  "📧 Get in Touch:",
  "",
  "  • Email: your.email@example.com",
  "  • GitHub: github.com/yourusername",
  "  • LinkedIn: linkedin.com/in/yourprofile",
  "  • Twitter: @yourhandle",
  "  • Website: yourwebsite.com",
  "",
  "Feel free to reach out for collaborations or opportunities!",
],
```

## 🎨 Adding Custom Commands

### Example: Add a "blog" command

1. **Add to available commands** (line ~25):
```typescript
const availableCommands = [
  "help",
  "about",
  "skills",
  "projects",
  "contact",
  "experience",
  "education",
  "blog",      // ← Add here
  "clear",
  "settings",
];
```

2. **Add command data** (line ~35):
```typescript
const commandData: Record<string, string[]> = {
  // ... existing commands ...
  
  blog: [
    "📝 Latest Blog Posts:",
    "",
    "  • Understanding React Server Components",
    "    Date: Jan 2024",
    "    Link: yourblog.com/post-1",
    "",
    "  • Building Scalable APIs with Node.js",
    "    Date: Dec 2023",
    "    Link: yourblog.com/post-2",
  ],
  
  // ... rest of commands ...
};
```

3. **Update help command** to include your new command:
```typescript
help: [
  "Available commands:",
  "  help       - Show this help message",
  "  about      - About me",
  "  skills     - My technical skills",
  "  projects   - View my projects",
  "  experience - My work experience",
  "  education  - My education background",
  "  contact    - Get in touch with me",
  "  blog       - Read my blog posts",  // ← Add here
  "  settings   - Open settings panel",
  "  clear      - Clear terminal",
],
```

## 🎨 Customizing the Welcome Message

Find the `useEffect` hook that sets the initial welcome message (around line 65):

```typescript
useEffect(() => {
  setHistory([
    {
      input: "",
      output: [
        "╔═══════════════════════════════════════════════════════════════════╗",
        "║                    Welcome to My Portfolio                        ║",
        "║                   Terminal Interface v1.0                         ║",
        "╚═══════════════════════════════════════════════════════════════════╝",
        "",
        "Type 'help' to see available commands.",
        "Use Tab for command suggestions.",
        "Use ↑↓ arrows to navigate command history.",
        "",
      ],
    },
  ]);
}, []);
```

**Custom Example:**
```typescript
output: [
  "═══════════════════════════════════════════════════════",
  "   ╭─╮╭─╮╭─╮╭─╮  Welcome to",
  "   │ ││ ││ ││ │  MOHAMMAD GARMABI's Portfolio",
  "   ╰─╯╰─╯╰─╯╰─╯  Full Stack Developer",
  "═══════════════════════════════════════════════════════",
  "",
  "🚀 Type 'help' to explore my work",
  "📧 Type 'contact' to get in touch",
  "",
],
```

## 🎨 Changing Default Theme

Find the settings initialization (around line 50):

```typescript
const [settings, setSettings] = useState<TerminalSettings>(() => {
  // Load settings from localStorage
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("terminal-settings");
    if (saved) {
      return JSON.parse(saved);
    }
  }
  return {
    fontSize: 14,                    // Change default size
    backgroundColor: "#1e1e1e",      // Change default background
    fontColor: "#00ff00",            // Change default text color
  };
});
```

**Popular Themes:**

```typescript
// Dark Modern
{
  fontSize: 14,
  backgroundColor: "#0d1117",
  fontColor: "#c9d1d9",
}

// Dracula
{
  fontSize: 14,
  backgroundColor: "#282a36",
  fontColor: "#f8f8f2",
}

// Nord
{
  fontSize: 14,
  backgroundColor: "#2e3440",
  fontColor: "#d8dee9",
}

// Solarized Dark
{
  fontSize: 14,
  backgroundColor: "#002b36",
  fontColor: "#839496",
}
```

## 🎨 Adding More Theme Presets

Find the "Quick Themes" section in the settings panel (around line 300):

```typescript
<button
  onClick={() =>
    setSettings({
      ...settings,
      backgroundColor: "#your-bg-color",
      fontColor: "#your-text-color",
    })
  }
  className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600 text-sm font-mono"
>
  Your Theme Name
</button>
```

## 🚀 Tips for Great Content

### Writing Style
- Keep it concise and scannable
- Use emojis for visual appeal (but don't overdo it)
- Break long text into shorter lines
- Use indentation for hierarchy

### Formatting
- Empty strings (`""`) create blank lines
- Spaces at the start create indentation
- Use bullet points (•, -, >) for lists
- Use ASCII art sparingly for impact

### Personal Touch
- Add personality to your descriptions
- Include specific achievements with numbers
- Link to your actual projects
- Keep information up to date

## 📝 Example: Complete Personal Portfolio

Here's a full example of how your `commandData` might look:

```typescript
const commandData: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  help       - Show this help message",
    "  about      - About me",
    "  skills     - My technical skills",
    "  projects   - View my projects",
    "  experience - My work experience",
    "  education  - My education background",
    "  contact    - Get in touch with me",
    "  settings   - Open settings panel",
    "  clear      - Clear terminal",
  ],
  
  about: [
    "👨‍💻 Mohammad Garmabi",
    "Full Stack Developer | React Enthusiast | Open Source Contributor",
    "",
    "I'm passionate about building modern web applications that solve",
    "real problems. With 5+ years of experience, I specialize in creating",
    "scalable, performant, and user-friendly solutions.",
    "",
    "Currently working remotely and open to exciting opportunities!",
  ],
  
  skills: [
    "💻 Technical Arsenal:",
    "",
    "  Frontend:",
    "    • React, Next.js, TypeScript, Vue.js",
    "    • Tailwind CSS, styled-components",
    "    • Redux, Zustand, React Query",
    "",
    "  Backend:",
    "    • Node.js, Express, NestJS",
    "    • Python, Django, FastAPI",
    "    • RESTful APIs, GraphQL",
    "",
    "  Database & Tools:",
    "    • PostgreSQL, MongoDB, Redis",
    "    • Docker, Git, AWS, Vercel",
  ],
  
  projects: [
    "🚀 Featured Projects:",
    "",
    "  1. E-Commerce Platform",
    "     Full-stack online store with real-time inventory",
    "     Tech: Next.js, Node.js, PostgreSQL, Stripe",
    "     🔗 demo.yoursite.com",
    "",
    "  2. Task Management SaaS",
    "     Collaborative project management tool",
    "     Tech: React, Firebase, Tailwind CSS",
    "     🔗 github.com/yourusername/task-app",
    "",
    "  3. AI Chat Assistant",
    "     Smart chatbot with natural language processing",
    "     Tech: Python, OpenAI API, FastAPI",
    "     🔗 github.com/yourusername/ai-chat",
  ],
  
  experience: [
    "💼 Professional Journey:",
    "",
    "  📍 Senior Full Stack Developer @ TechCorp",
    "     2022 - Present | Remote",
    "     • Led team of 5 developers on enterprise projects",
    "     • Reduced load time by 60% through optimization",
    "     • Implemented CI/CD pipeline reducing deployment time by 80%",
    "",
    "  📍 Full Stack Developer @ StartupXYZ",
    "     2020 - 2022 | Tehran, Iran",
    "     • Built customer-facing React applications from scratch",
    "     • Developed RESTful APIs serving 10K+ daily requests",
    "     • Mentored junior developers",
  ],
  
  education: [
    "🎓 Education & Learning:",
    "",
    "  • Bachelor of Computer Science",
    "    University of Tehran, 2016-2020",
    "    Focus: Software Engineering & Web Technologies",
    "",
    "  • Certifications:",
    "    ✓ AWS Certified Solutions Architect",
    "    ✓ Meta React Professional Certificate",
    "    ✓ MongoDB Certified Developer",
    "",
    "  • Continuous learner through books, courses, and building!",
  ],
  
  contact: [
    "📧 Let's Connect!",
    "",
    "  📨 Email: mohammad.garmabi@example.com",
    "  💼 LinkedIn: linkedin.com/in/mohammadgarmabi",
    "  🐙 GitHub: github.com/mohammadgarmabi",
    "  🐦 Twitter: @mgarmabi",
    "  🌐 Website: mohammadgarmabi.dev",
    "",
    "Available for:",
    "  • Freelance projects",
    "  • Full-time opportunities",
    "  • Technical consulting",
    "  • Open source collaboration",
    "",
    "Response time: Usually within 24 hours ⚡",
  ],
};
```

## 🎯 Final Checklist

Before deploying your portfolio, make sure to:

- [ ] Update all personal information
- [ ] Replace placeholder text with real content
- [ ] Verify all links are correct
- [ ] Test all commands
- [ ] Check spelling and grammar
- [ ] Set your preferred default theme
- [ ] Add your actual projects
- [ ] Update contact information
- [ ] Test on mobile devices
- [ ] Share with friends for feedback!

---

Happy customizing! 🎉 If you need help, the terminal is yours to command!

