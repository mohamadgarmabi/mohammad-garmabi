import { useState, useEffect, useLayoutEffect } from "react";
import { saveCommandHistory, loadCommandHistory } from "~/lib/db/indexedDB";

export function useCommandHistory() {
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load command history from IndexedDB (before paint)
  useLayoutEffect(() => {
    const loadHistory = async () => {
      try {
        const stored = await loadCommandHistory();
        if (stored && stored.length > 0) {
          setCommandHistory(stored);
        }
      } catch (error) {
        console.error("Failed to load command history:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadHistory();
  }, []);

  // Save command history to IndexedDB
  useEffect(() => {
    if (isLoaded && commandHistory.length > 0) {
      const saveHistory = async () => {
        try {
          await saveCommandHistory(commandHistory);
        } catch (error) {
          console.error("Failed to save command history:", error);
        }
      };

      saveHistory();
    }
  }, [commandHistory, isLoaded]);

  const addToHistory = (command: string) => {
    setCommandHistory((prev) => [...prev, command]);
    setHistoryIndex(-1);
  };

  const navigateHistory = (direction: "up" | "down"): string | null => {
    if (commandHistory.length === 0) return null;

    if (direction === "up") {
      const newIndex =
        historyIndex === -1
          ? commandHistory.length - 1
          : Math.max(0, historyIndex - 1);
      setHistoryIndex(newIndex);
      return commandHistory[newIndex];
    } else {
      if (historyIndex === -1) return null;
      
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        return "";
      }
      setHistoryIndex(newIndex);
      return commandHistory[newIndex];
    }
  };

  return {
    addToHistory,
    navigateHistory,
    commandHistory,
    isLoaded,
  };
}

