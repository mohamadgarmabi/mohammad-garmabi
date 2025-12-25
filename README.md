# Terminal Portfolio

A modern, interactive portfolio website with a Mac terminal-style interface built with React Router v7 and Tailwind CSS.

## 🎨 Features

### 🖥️ Mac Terminal UI
- Authentic Mac terminal appearance with header controls (red, yellow, green buttons)
- Monospace font (Fira Code) for authentic terminal feel
- Real-time command input and output display
- Auto-scrolling terminal output

### ⚙️ Settings Panel
Fully customizable terminal appearance:
- **Font Size Control**: Adjust from 10px to 24px with a slider
- **Background Color**: Choose any color with color picker or hex input
- **Font Color**: Customize text color with color picker or hex input
- **Quick Theme Presets**:
  - Classic Green (traditional terminal look)
  - Black & White (minimal and clean)
  - Ocean Blue (modern blue theme)
  - Monokai (popular code editor theme)

### 👋 Welcome Message
Beautiful ASCII art welcome banner displayed on load

### 🔍 Search with Tab Completion
- Type command names and get real-time suggestions
- Press **Tab** to cycle through matching commands
- Suggestions shown at the bottom of the terminal

### 📜 Command History
- Use **↑** (Up Arrow) to navigate through previous commands
- Use **↓** (Down Arrow) to navigate forward in history
- Automatically saves command history during session

### 💾 Persistent Settings
- All theme settings are automatically saved to localStorage
- Your preferences persist across browser sessions
- No login or account required

### 💻 Available Commands

```bash
help       - Show this help message
about      - About me
skills     - My technical skills
projects   - View my projects
experience - My work experience
education  - My education background
contact    - Get in touch with me
settings   - Open/close settings panel
clear      - Clear terminal
```

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🛠️ Customization

### Editing Portfolio Content

All portfolio content is stored in the `Terminal.tsx` component. To customize:

1. Open `/app/components/Terminal.tsx`
2. Find the `commandData` object (around line 27)
3. Edit the content for each command:

```typescript
const commandData: Record<string, string[]> = {
  about: [
    "👨‍💻 Your Title Here",
    "Your description...",
  ],
  skills: [
    "💻 Technical Skills:",
    "  • Your skills here",
  ],
  // ... more commands
};
```

### Adding New Commands

1. Add command name to `availableCommands` array:
```typescript
const availableCommands = [
  "help",
  "about",
  "your-new-command", // Add here
];
```

2. Add command output to `commandData`:
```typescript
const commandData: Record<string, string[]> = {
  "your-new-command": [
    "Your command output here",
    "Can be multiple lines",
  ],
};
```

3. Update the help command to include your new command

### Changing Default Theme

Edit the initial state in `Terminal.tsx`:

```typescript
const [settings, setSettings] = useState<TerminalSettings>({
  fontSize: 14,              // Default font size
  backgroundColor: "#1e1e1e", // Default background
  fontColor: "#00ff00",      // Default text color
});
```

## 🎯 Usage Tips

- Click anywhere in the terminal to focus the input
- Use `clear` command or **Cmd/Ctrl + L** to clear the terminal
- Press **Tab** to autocomplete commands
- Use **↑↓** arrows to navigate command history
- Type `settings` or click the ⚙️ icon to open settings
- All settings are automatically saved to localStorage

## 📦 Tech Stack

- **React Router v7** - Modern React framework with file-based routing
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **Fira Code** - Beautiful monospace font

## 🎨 Theme Presets

The portfolio includes 4 built-in themes:
1. **Classic Green** - `#1e1e1e` bg, `#00ff00` text
2. **Black & White** - `#000000` bg, `#ffffff` text
3. **Ocean Blue** - `#282c34` bg, `#61dafb` text
4. **Monokai** - `#2d2a2e` bg, `#ff6188` text

## 📝 License

This is a personal portfolio project. Feel free to use it as inspiration for your own portfolio!

## 🤝 Contributing

This is a personal portfolio, but if you have suggestions or find bugs, feel free to open an issue!

---

Built with ❤️ using React Router v7
