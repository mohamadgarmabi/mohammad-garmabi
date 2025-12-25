import { useState } from "react";
import type { TerminalSettings } from "~/lib/terminal/types";
import { THEME_PRESETS } from "~/lib/terminal/constants";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "~/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "~/components/ui/drawer";
import { exportAllData, importAllData } from "~/lib/db/indexedDB";
import { useIsMobile } from "~/hooks/useMediaQuery";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  settings: TerminalSettings;
  onSettingsChange: (settings: Partial<TerminalSettings>) => void;
}

// Group themes by category
const themesByCategory = THEME_PRESETS.reduce((acc, theme) => {
  const category = theme.category || "other";
  if (!acc[category]) {
    acc[category] = [];
  }
  acc[category].push(theme);
  return acc;
}, {} as Record<string, typeof THEME_PRESETS[number][]>);

const categoryLabels: Record<string, string> = {
  classic: "🖥️ Classic Terminals",
  modern: "🌙 Modern Dark",
  light: "☀️ Light Themes",
  colorful: "🎨 Colorful",
  special: "✨ Special",
};

// Settings Content Component (shared between Dialog and Drawer)
function SettingsContent({
  settings,
  onSettingsChange,
  isMobile = false,
}: {
  settings: TerminalSettings;
  onSettingsChange: (settings: Partial<TerminalSettings>) => void;
  isMobile?: boolean;
}) {
  const [activeCategory, setActiveCategory] = useState<string>("modern");

  const handleExport = async () => {
    try {
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
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export data");
    }
  };

  const handleImport = async () => {
    try {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = ".json";
      input.onchange = async (e) => {
        const file = (e.target as HTMLInputElement).files?.[0];
        if (!file) return;

        const text = await file.text();
        const data = JSON.parse(text);
        await importAllData(data);
        alert("Data imported successfully! Please refresh the page.");
      };
      input.click();
    } catch (error) {
      console.error("Import failed:", error);
      alert("Failed to import data");
    }
  };

  return (
    <div className={`space-y-${isMobile ? "4" : "6"} ${isMobile ? "p-4" : ""}`}>
      {/* Font Size */}
      <div>
        <label className="text-gray-300 font-mono text-sm block mb-2">
          Font Size: {settings.fontSize}px
        </label>
        <input
          type="range"
          min="10"
          max="24"
          value={settings.fontSize}
          onChange={(e) =>
            onSettingsChange({ fontSize: Number(e.target.value) })
          }
          className="w-full"
        />
      </div>

      {/* Background Color */}
      <div>
        <label className="text-gray-300 font-mono text-sm block mb-2">
          Background Color
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={settings.backgroundColor}
            onChange={(e) =>
              onSettingsChange({ backgroundColor: e.target.value })
            }
            className="w-12 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            value={settings.backgroundColor}
            onChange={(e) =>
              onSettingsChange({ backgroundColor: e.target.value })
            }
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded font-mono text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Font Color */}
      <div>
        <label className="text-gray-300 font-mono text-sm block mb-2">
          Font Color
        </label>
        <div className="flex gap-2 items-center">
          <input
            type="color"
            value={settings.fontColor}
            onChange={(e) =>
              onSettingsChange({ fontColor: e.target.value })
            }
            className="w-12 h-10 rounded cursor-pointer"
          />
          <input
            type="text"
            value={settings.fontColor}
            onChange={(e) =>
              onSettingsChange({ fontColor: e.target.value })
            }
            className="flex-1 bg-gray-700 text-white px-3 py-2 rounded font-mono text-xs sm:text-sm"
          />
        </div>
      </div>

      {/* Preset Themes with Categories */}
      <div>
        <label className="text-gray-300 font-mono text-sm block mb-3">
          🎨 Theme Gallery
        </label>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 border-b border-gray-700 pb-2 overflow-x-auto">
          {Object.keys(themesByCategory).map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-2 sm:px-3 py-1.5 rounded-t text-[10px] sm:text-xs font-mono transition-colors whitespace-nowrap ${
                activeCategory === category
                  ? "bg-gray-700 text-white"
                  : "bg-gray-800 text-gray-400 hover:bg-gray-700"
              }`}
            >
              {categoryLabels[category] || category}
            </button>
          ))}
        </div>

        {/* Theme Grid */}
        <div className={`grid grid-cols-2 ${isMobile ? "gap-2" : "sm:grid-cols-3 gap-3"} max-h-48 sm:max-h-64 overflow-y-auto pr-2`}>
          {themesByCategory[activeCategory]?.map((theme) => {
            const isActive =
              settings.backgroundColor === theme.backgroundColor &&
              settings.fontColor === theme.fontColor;

            return (
              <button
                key={theme.name}
                onClick={() =>
                  onSettingsChange({
                    backgroundColor: theme.backgroundColor,
                    fontColor: theme.fontColor,
                  })
                }
                className={`group relative p-2 sm:p-3 rounded-lg border-2 transition-all active:scale-95 ${
                  isActive
                    ? "border-green-500 ring-2 ring-green-500/50"
                    : "border-gray-700 hover:border-gray-600"
                } ${!isMobile && "hover:scale-105"}`}
                style={{
                  backgroundColor: theme.backgroundColor,
                }}
              >
                <div
                  className="text-[10px] sm:text-xs font-mono mb-1 sm:mb-2 truncate"
                  style={{ color: theme.fontColor }}
                >
                  {theme.name}
                </div>
                <div
                  className="text-[8px] sm:text-[10px] opacity-70 font-mono"
                  style={{ color: theme.fontColor }}
                >
                  $ echo "Hi"
                </div>
                {isActive && (
                  <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 text-green-500 text-sm sm:text-lg">
                    ✓
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Data Management */}
      <div className="border-t border-gray-700 pt-4">
        <label className="text-gray-300 font-mono text-sm block mb-3">
          💾 Data Management
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 text-xs sm:text-sm font-mono transition-colors"
          >
            📤 Export All Data
          </button>
          <button
            onClick={handleImport}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-500 text-xs sm:text-sm font-mono transition-colors"
          >
            📥 Import Data
          </button>
        </div>
        <p className="text-[10px] sm:text-xs text-gray-500 mt-2 font-mono">
          Export: Save all your settings, history, and tabs
          <br />
          Import: Restore from a backup file
        </p>
      </div>
    </div>
  );
}

// Main Settings Dialog Component (responsive)
export function SettingsDialog({
  open,
  onOpenChange,
  settings,
  onSettingsChange,
}: SettingsDialogProps) {
  const isMobile = useIsMobile();
  const [snapPoint, setSnapPoint] = useState<number | string | null>(0.7);

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={onOpenChange}
        snapPoints={[0.3, 0.7, 1]}
        activeSnapPoint={snapPoint}
        setActiveSnapPoint={setSnapPoint}
        modal={true}
      >
        <DrawerContent className="bg-gray-800 border-gray-700">
          <DrawerHeader className="border-b border-gray-700 pb-3">
            <div className="mx-auto w-12 h-1.5 shrink-0 rounded-full bg-gray-600 mb-4" />
            <DrawerTitle className="font-mono text-lg">
              ⚙️ Terminal Settings
            </DrawerTitle>
            <DrawerDescription className="text-xs text-gray-400">
              Swipe up/down to resize • Tap snap points
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto px-1">
            <SettingsContent
              settings={settings}
              onSettingsChange={onSettingsChange}
              isMobile={true}
            />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="font-mono text-xl">
            ⚙️ Terminal Settings
          </DialogTitle>
          <DialogDescription>
            Customize your terminal appearance and behavior
          </DialogDescription>
        </DialogHeader>
        <SettingsContent
          settings={settings}
          onSettingsChange={onSettingsChange}
          isMobile={false}
        />
      </DialogContent>
    </Dialog>
  );
}

