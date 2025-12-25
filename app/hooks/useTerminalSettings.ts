import { useState, useEffect, useLayoutEffect } from "react";
import type { TerminalSettings } from "~/lib/terminal/types";
import { DEFAULT_SETTINGS } from "~/lib/terminal/constants";
import { saveSettings, loadSettings } from "~/lib/db/indexedDB";

export function useTerminalSettings() {
  const [settings, setSettings] = useState<TerminalSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from IndexedDB on mount (before paint)
  useLayoutEffect(() => {
    const loadStoredSettings = async () => {
      try {
        const stored = await loadSettings();
        if (stored) {
          setSettings({ ...DEFAULT_SETTINGS, ...stored });
        }
      } catch (error) {
        console.error("Failed to load settings from IndexedDB:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadStoredSettings();
  }, []);

  // Save settings to IndexedDB whenever they change
  useEffect(() => {
    if (isLoaded) {
      const saveToDB = async () => {
        try {
          await saveSettings(settings);
        } catch (error) {
          console.error("Failed to save settings to IndexedDB:", error);
        }
      };

      saveToDB();
    }
  }, [settings, isLoaded]);

  const updateSettings = (newSettings: Partial<TerminalSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return {
    settings,
    setSettings,
    updateSettings,
    resetSettings,
    isLoaded,
  };
}

