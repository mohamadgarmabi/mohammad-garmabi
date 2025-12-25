import { useState, useRef, useEffect } from "react";
import type { ContextMenuPosition } from "~/lib/terminal/types";
import { useTerminalSettings } from "~/hooks/useTerminalSettings";
import { useCommandHistory } from "~/hooks/useCommandHistory";
import { useCommandSuggestions } from "~/hooks/useCommandSuggestions";
import { useTerminalTabs } from "~/hooks/useTerminalTabs";
import { useTerminalShortcuts } from "~/hooks/useTerminalShortcuts";
import { COMMAND_DATA } from "~/lib/terminal/constants";
import { fetchAllPackagesStats, calculateTotalDownloads, formatNumber, MY_PACKAGES } from "~/lib/npmStats";
import { TerminalHeader } from "./Terminal/TerminalHeader";
import { TabBar } from "./Terminal/TabBar";
import { ContextMenu } from "./Terminal/ContextMenu";
import { SettingsDialog } from "./Terminal/SettingsDialog";

export default function Terminal() {
  // Settings
  const { settings, updateSettings, isLoaded: settingsLoaded } = useTerminalSettings();

  // Tabs
  const {
    tabs,
    activeTab,
    activeTabId,
    addTab,
    closeTab,
    switchTab,
    switchToNextTab,
    switchToPrevTab,
    updateTabHistory,
    updateTabInput,
    isLoaded: tabsLoaded,
  } = useTerminalTabs();

  // Command history
  const { addToHistory, navigateHistory, isLoaded: historyLoaded } = useCommandHistory();

  // Check if everything is loaded
  const isFullyLoaded = settingsLoaded && tabsLoaded && historyLoaded;

  // UI State
  const [showSettings, setShowSettings] = useState(false);
  const [contextMenu, setContextMenu] = useState<ContextMenuPosition | null>(null);

  // Command handling
  const { suggestions, getNextSuggestion } = useCommandSuggestions(
    activeTab.currentInput
  );

  // Refs
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Command execution functions that directly update tab history
  const executeCommandForTab = async (cmd: string) => {
    const command = cmd.toLowerCase().trim();
    if (!command) return;

    let newHistory = [...activeTab.history];

    // Clear command
    if (command === "clear") {
      updateTabHistory(activeTabId, []);
      return;
    }

    // Settings command
    if (command === "settings") {
      setShowSettings(!showSettings);
      newHistory.push({
        input: cmd,
        output: ["Settings dialog opened."],
      });
      updateTabHistory(activeTabId, newHistory);
      return;
    }

    // Clear data command
    if (command === "clear-data") {
      const confirmed = window.confirm(
        "⚠️  Warning: This will clear ALL stored data including:\n\n" +
        "• All settings\n" +
        "• Command history\n" +
        "• All tabs\n" +
        "• Everything in IndexedDB\n\n" +
        "This action cannot be undone. Continue?"
      );
      
      if (confirmed) {
        try {
          // Clear IndexedDB
          const { clearStore, STORES } = await import("~/lib/db/indexedDB");
          await Promise.all([
            clearStore(STORES.SETTINGS),
            clearStore(STORES.HISTORY),
            clearStore(STORES.TABS),
            clearStore(STORES.COMMAND_HISTORY),
            clearStore(STORES.THEME),
          ]);
          
          newHistory.push({
            input: cmd,
            output: [
              "✅ All data cleared successfully!",
              "",
              "The page will reload in 2 seconds...",
            ],
          });
          updateTabHistory(activeTabId, newHistory);
          
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } catch (error) {
          newHistory.push({
            input: cmd,
            output: [
              "❌ Error clearing data:",
              String(error),
            ],
          });
          updateTabHistory(activeTabId, newHistory);
        }
      } else {
        newHistory.push({
          input: cmd,
          output: ["❌ Clear data cancelled."],
        });
        updateTabHistory(activeTabId, newHistory);
      }
      return;
    }

    // Export data command
    if (command === "export-data") {
      try {
        const { exportAllData } = await import("~/lib/db/indexedDB");
        const data = await exportAllData();
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
          type: "application/json",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `terminal-backup-${new Date().getTime()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        newHistory.push({
          input: cmd,
          output: [
            "✅ Data exported successfully!",
            "",
            `📦 File: terminal-backup-${new Date().getTime()}.json`,
            "",
            "Your data has been downloaded to your downloads folder.",
            "You can import it later using the settings dialog.",
          ],
        });
      } catch (error) {
        newHistory.push({
          input: cmd,
          output: [
            "❌ Error exporting data:",
            String(error),
          ],
        });
      }
      updateTabHistory(activeTabId, newHistory);
      return;
    }

    // Packages command
    if (command === "packages" || command === "packages --refresh") {
      newHistory.push({
        input: cmd,
        output: ["📦 Fetching package statistics from npm registry..."],
      });
      updateTabHistory(activeTabId, newHistory);

      try {
        const stats = await fetchAllPackagesStats();

        if (stats.length === 0) {
          newHistory = [...newHistory, {
            input: "",
            output: [
              "No packages configured yet.",
              "",
              "To add your packages:",
              "1. Open: app/lib/npmStats.ts",
              "2. Add your package names to MY_PACKAGES array",
            ],
          }];
        } else {
          const totals = calculateTotalDownloads(stats);
          const output = [
            "📦 NPM Packages Statistics:",
            "═══════════════════════════════════════════════════════",
            "",
            ...stats.map((pkg, idx) => {
              const lines = [
                `  ${idx + 1}. ${pkg.name}`,
                `     📥 Last Year:  ${formatNumber(pkg.downloads)}`,
                `     📅 Last Month: ${formatNumber(pkg.downloadsLastMonth)}`,
                `     📆 Last Week:  ${formatNumber(pkg.downloadsLastWeek)}`,
              ];
              return lines.join("\n");
            }),
            "",
            "═══════════════════════════════════════════════════════",
            `📊 Total Downloads (Last Year):  ${formatNumber(totals.total)}`,
            `📊 Total Downloads (Last Month): ${formatNumber(totals.lastMonth)}`,
            `📊 Total Downloads (Last Week):  ${formatNumber(totals.lastWeek)}`,
          ];

          newHistory = [...newHistory, { input: "", output }];
        }
        updateTabHistory(activeTabId, newHistory);
      } catch (error) {
        newHistory = [...newHistory, {
          input: "",
          output: ["Error fetching package statistics."],
        }];
        updateTabHistory(activeTabId, newHistory);
      }
      return;
    }

    // Recommend command - special handling with LinkedIn link
    if (command === "recommend") {
      newHistory.push({ 
        input: cmd, 
        output: COMMAND_DATA[command],
        hasLink: true,
        linkUrl: "https://www.linkedin.com/in/mohammad-garmabi/",
      });
      updateTabHistory(activeTabId, newHistory);
      return;
    }

    // Regular commands
    const output = COMMAND_DATA[command] || [
      `Command not found: ${cmd}`,
      "Type 'help' for available commands.",
    ];

    newHistory.push({ input: cmd, output });
    updateTabHistory(activeTabId, newHistory);
  };

  const clearTabHistory = () => {
    updateTabHistory(activeTabId, []);
  };

  // Terminal shortcuts
  useTerminalShortcuts({
    onNewTab: addTab,
    onCloseTab: () => closeTab(activeTabId),
    onNextTab: switchToNextTab,
    onPrevTab: switchToPrevTab,
    onClear: clearTabHistory,
    onSettings: () => setShowSettings(!showSettings),
  });

  // Auto scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [activeTab.history]);

  // Close context menu on click
  useEffect(() => {
    const handleClick = () => setContextMenu(null);
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({ x: e.clientX, y: e.clientY });
  };

  // Handle command execution
  const handleCommandExecution = async () => {
    // If input is empty, just add an empty line like real terminal
    if (!activeTab.currentInput.trim()) {
      const newHistory = [...activeTab.history, { input: "", output: [] }];
      updateTabHistory(activeTabId, newHistory);
      updateTabInput(activeTabId, "");
      return;
    }

    addToHistory(activeTab.currentInput);
    await executeCommandForTab(activeTab.currentInput);
    updateTabInput(activeTabId, "");
  };

  // Handle keyboard input
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCommandExecution();
    } else if (e.key === "Tab") {
      e.preventDefault();
      const suggestion = getNextSuggestion();
      if (suggestion) {
        updateTabInput(activeTabId, suggestion);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const command = navigateHistory("up");
      if (command !== null) {
        updateTabInput(activeTabId, command);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const command = navigateHistory("down");
      if (command !== null) {
        updateTabInput(activeTabId, command);
      }
    } else if (e.key === "l" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      clearTabHistory();
    }
  };

  // Show loading screen until everything is loaded from IndexedDB
  if (!isFullyLoaded) {
    return (
      <div
        className="h-screen w-screen flex items-center justify-center"
        style={{
          backgroundColor: settings.backgroundColor,
          color: settings.fontColor,
        }}
      >
        <div className="text-center font-mono">
          <div className="text-4xl mb-4">⚡</div>
          <div className="text-xl mb-2">Loading Terminal...</div>
          <div className="text-sm opacity-60">
            Restoring your settings and history
          </div>
          <div className="mt-4 flex gap-2 justify-center">
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-screen w-screen overflow-hidden bg-gray-900"
      onContextMenu={handleContextMenu}
    >
      <div className="h-full w-full flex flex-col">
        {/* Terminal Window */}
        <div className="h-full flex flex-col overflow-hidden shadow-2xl">
          {/* Terminal Header */}
          <TerminalHeader />

          {/* Tab Bar */}
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            onSwitchTab={switchTab}
            onCloseTab={closeTab}
            onNewTab={addTab}
          />

          {/* Terminal Body */}
          <div
            ref={terminalRef}
            className="p-3 sm:p-4 overflow-y-auto flex-1"
            style={{
              backgroundColor: settings.backgroundColor,
              color: settings.fontColor,
              fontSize: `${settings.fontSize}px`,
              fontFamily:
                "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
            }}
            onClick={() => inputRef.current?.focus()}
          >
            {/* Command History */}
            {activeTab.history.map((cmd, idx) => (
              <div key={idx} className="mb-2">
                {/* Show prompt only if there's input OR if it's an empty command (no output) */}
                {(cmd.input || cmd.output.length === 0) && (
                  <div className="flex gap-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-blue-400">~</span>
                    <span>{cmd.input}</span>
                  </div>
                )}
                {cmd.output.map((line, lineIdx) => (
                  <div key={lineIdx} className="whitespace-pre-wrap">
                    {line}
                  </div>
                ))}
                {cmd.hasLink && cmd.linkUrl && (
                  <div className="mt-4 mb-2">
                    <a
                      href={cmd.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-medium transition-all transform hover:scale-105 hover:shadow-lg"
                      style={{
                        fontFamily: "ui-monospace, monospace",
                      }}
                    >
                      <span>🔗</span>
                      <span>Write Recommendation on LinkedIn</span>
                      <span>→</span>
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Current Input Line */}
            <div className="flex gap-2 items-center">
              <span className="text-green-400">➜</span>
              <span className="text-blue-400">~</span>
              <label htmlFor="terminal-input" className="sr-only">
                Terminal command input
              </label>
              <input
                id="terminal-input"
                ref={inputRef}
                type="text"
                value={activeTab.currentInput}
                onChange={(e) => updateTabInput(activeTabId, e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none border-none"
                style={{ color: settings.fontColor }}
                autoFocus
                aria-label="Terminal command input"
              />
            </div>

            {/* Tab Suggestions */}
            {suggestions.length > 0 && activeTab.currentInput && (
              <div className="mt-2 text-gray-500 text-sm">
                Suggestions: {suggestions.join(", ")} (Press Tab)
              </div>
            )}
          </div>
        </div>

        {/* Context Menu */}
        <ContextMenu
          position={contextMenu}
          onClose={() => setContextMenu(null)}
          onSettings={() => setShowSettings(!showSettings)}
          onClear={clearTabHistory}
          onHelp={() => executeCommandForTab("help")}
        />

        {/* Settings Dialog */}
        <SettingsDialog
          open={showSettings}
          onOpenChange={setShowSettings}
          settings={settings}
          onSettingsChange={updateSettings}
        />
      </div>
    </div>
  );
}
