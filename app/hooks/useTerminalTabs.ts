import { useState, useCallback, useEffect, useLayoutEffect } from "react";
import type { Command } from "~/lib/terminal/types";
import { WELCOME_MESSAGE } from "~/lib/terminal/constants";
import { saveTabs, loadTabs, type StoredTab } from "~/lib/db/indexedDB";

export interface TerminalTab {
  id: string;
  title: string;
  history: Command[];
  currentInput: string;
}

export function useTerminalTabs() {
  const [tabs, setTabs] = useState<TerminalTab[]>([
    {
      id: "1",
      title: "Terminal 1",
      history: [{ input: "", output: WELCOME_MESSAGE }],
      currentInput: "",
    },
  ]);
  const [activeTabId, setActiveTabId] = useState("1");
  const [isLoaded, setIsLoaded] = useState(false);

  // Load tabs from IndexedDB (before paint)
  useLayoutEffect(() => {
    const loadStoredTabs = async () => {
      try {
        const stored = await loadTabs();
        if (stored && stored.length > 0) {
          setTabs(stored);
          // Set last active tab or first tab
          const lastActiveTab = stored[stored.length - 1];
          setActiveTabId(lastActiveTab.id);
        }
      } catch (error) {
        console.error("Failed to load tabs:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadStoredTabs();
  }, []);

  // Save tabs to IndexedDB
  useEffect(() => {
    if (isLoaded) {
      const saveToDB = async () => {
        try {
          const storedTabs: StoredTab[] = tabs.map((tab) => ({
            ...tab,
            timestamp: Date.now(),
          }));
          await saveTabs(storedTabs);
        } catch (error) {
          console.error("Failed to save tabs:", error);
        }
      };

      saveToDB();
    }
  }, [tabs, isLoaded]);

  const activeTab = tabs.find((tab) => tab.id === activeTabId) || tabs[0];

  const addTab = useCallback(() => {
    const newId = String(Date.now());
    const newTab: TerminalTab = {
      id: newId,
      title: `Terminal ${tabs.length + 1}`,
      history: [{ input: "", output: WELCOME_MESSAGE }],
      currentInput: "",
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
  }, [tabs.length]);

  const closeTab = useCallback(
    (tabId: string) => {
      if (tabs.length === 1) return; // Don't close last tab

      const tabIndex = tabs.findIndex((t) => t.id === tabId);
      const newTabs = tabs.filter((t) => t.id !== tabId);
      setTabs(newTabs);

      // Switch to adjacent tab
      if (activeTabId === tabId) {
        const newActiveTab = newTabs[tabIndex] || newTabs[tabIndex - 1];
        setActiveTabId(newActiveTab.id);
      }
    },
    [tabs, activeTabId]
  );

  const switchTab = useCallback((tabId: string) => {
    setActiveTabId(tabId);
  }, []);

  const switchToNextTab = useCallback(() => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTabId);
    const nextIndex = (currentIndex + 1) % tabs.length;
    setActiveTabId(tabs[nextIndex].id);
  }, [tabs, activeTabId]);

  const switchToPrevTab = useCallback(() => {
    const currentIndex = tabs.findIndex((t) => t.id === activeTabId);
    const prevIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
    setActiveTabId(tabs[prevIndex].id);
  }, [tabs, activeTabId]);

  const updateTabHistory = useCallback(
    (tabId: string, history: Command[]) => {
      setTabs((prev) =>
        prev.map((tab) => (tab.id === tabId ? { ...tab, history } : tab))
      );
    },
    []
  );

  const updateTabInput = useCallback((tabId: string, input: string) => {
    setTabs((prev) =>
      prev.map((tab) =>
        tab.id === tabId ? { ...tab, currentInput: input } : tab
      )
    );
  }, []);

  const renameTab = useCallback((tabId: string, title: string) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === tabId ? { ...tab, title } : tab))
    );
  }, []);

  return {
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
    renameTab,
    isLoaded,
  };
}

