// IndexedDB Wrapper for Terminal Portfolio
import type { TerminalSettings } from "~/lib/terminal/types";
import type { Command } from "~/lib/terminal/types";

const DB_NAME = "TerminalPortfolioDB";
const DB_VERSION = 1;

// Store names
export const STORES = {
  SETTINGS: "settings",
  HISTORY: "history",
  TABS: "tabs",
  COMMAND_HISTORY: "commandHistory",
  THEME: "theme",
} as const;

// Initialize IndexedDB
export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("IndexedDB not available in SSR"));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Settings store
      if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
        db.createObjectStore(STORES.SETTINGS);
      }

      // History store (per tab)
      if (!db.objectStoreNames.contains(STORES.HISTORY)) {
        const historyStore = db.createObjectStore(STORES.HISTORY, {
          keyPath: "tabId",
        });
        historyStore.createIndex("timestamp", "timestamp", { unique: false });
      }

      // Tabs store
      if (!db.objectStoreNames.contains(STORES.TABS)) {
        db.createObjectStore(STORES.TABS);
      }

      // Command history store
      if (!db.objectStoreNames.contains(STORES.COMMAND_HISTORY)) {
        const cmdStore = db.createObjectStore(STORES.COMMAND_HISTORY, {
          autoIncrement: true,
        });
        cmdStore.createIndex("timestamp", "timestamp", { unique: false });
      }

      // Theme store
      if (!db.objectStoreNames.contains(STORES.THEME)) {
        db.createObjectStore(STORES.THEME);
      }
    };
  });
}

// Generic get function
export async function getFromDB<T>(
  storeName: string,
  key: string
): Promise<T | null> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.get(key);

      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error getting from DB:", error);
    return null;
  }
}

// Generic set function
export async function setToDB<T>(
  storeName: string,
  key: string,
  value: T
): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.put(value, key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error setting to DB:", error);
  }
}

// Get all function
export async function getAllFromDB<T>(storeName: string): Promise<T[]> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result || []);
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error getting all from DB:", error);
    return [];
  }
}

// Delete function
export async function deleteFromDB(
  storeName: string,
  key: string
): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.delete(key);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error deleting from DB:", error);
  }
}

// Clear store
export async function clearStore(storeName: string): Promise<void> {
  try {
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.error("Error clearing store:", error);
  }
}

// Specific helper functions

export interface StoredTab {
  id: string;
  title: string;
  history: Command[];
  currentInput: string;
  timestamp: number;
}

export async function saveSettings(settings: TerminalSettings): Promise<void> {
  await setToDB(STORES.SETTINGS, "current", settings);
}

export async function loadSettings(): Promise<TerminalSettings | null> {
  return await getFromDB<TerminalSettings>(STORES.SETTINGS, "current");
}

export async function saveTabHistory(
  tabId: string,
  history: Command[]
): Promise<void> {
  await setToDB(STORES.HISTORY, tabId, {
    tabId,
    history,
    timestamp: Date.now(),
  });
}

export async function loadTabHistory(tabId: string): Promise<Command[] | null> {
  const data = await getFromDB<{ history: Command[] }>(STORES.HISTORY, tabId);
  return data?.history || null;
}

export async function saveTabs(tabs: StoredTab[]): Promise<void> {
  await setToDB(STORES.TABS, "all", { tabs, timestamp: Date.now() });
}

export async function loadTabs(): Promise<StoredTab[] | null> {
  const data = await getFromDB<{ tabs: StoredTab[] }>(STORES.TABS, "all");
  return data?.tabs || null;
}

export async function saveCommandHistory(commands: string[]): Promise<void> {
  await setToDB(STORES.COMMAND_HISTORY, "all", {
    commands,
    timestamp: Date.now(),
  });
}

export async function loadCommandHistory(): Promise<string[] | null> {
  const data = await getFromDB<{ commands: string[] }>(
    STORES.COMMAND_HISTORY,
    "all"
  );
  return data?.commands || null;
}

export async function saveActiveTheme(themeName: string): Promise<void> {
  await setToDB(STORES.THEME, "active", { name: themeName, timestamp: Date.now() });
}

export async function loadActiveTheme(): Promise<string | null> {
  const data = await getFromDB<{ name: string }>(STORES.THEME, "active");
  return data?.name || null;
}

// Export all data (for backup)
export async function exportAllData() {
  const [settings, tabs, commandHistory, theme] = await Promise.all([
    loadSettings(),
    loadTabs(),
    loadCommandHistory(),
    loadActiveTheme(),
  ]);

  return {
    settings,
    tabs,
    commandHistory,
    theme,
    exportDate: new Date().toISOString(),
  };
}

// Import all data (for restore)
export async function importAllData(data: any): Promise<void> {
  if (data.settings) await saveSettings(data.settings);
  if (data.tabs) await saveTabs(data.tabs);
  if (data.commandHistory) await saveCommandHistory(data.commandHistory);
  if (data.theme) await saveActiveTheme(data.theme);
}

