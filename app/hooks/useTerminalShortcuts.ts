import { useEffect } from "react";

export interface ShortcutHandlers {
  onNewTab?: () => void;
  onCloseTab?: () => void;
  onNextTab?: () => void;
  onPrevTab?: () => void;
  onClear?: () => void;
  onFind?: () => void;
  onSettings?: () => void;
}

export function useTerminalShortcuts(handlers: ShortcutHandlers) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const modifier = isMac ? e.metaKey : e.ctrlKey;

      // Cmd/Ctrl + T - New Tab
      if (modifier && e.key === "t") {
        e.preventDefault();
        handlers.onNewTab?.();
      }

      // Cmd/Ctrl + W - Close Tab
      else if (modifier && e.key === "w") {
        e.preventDefault();
        handlers.onCloseTab?.();
      }

      // Cmd/Ctrl + Shift + ] - Next Tab
      else if (modifier && e.shiftKey && e.key === "]") {
        e.preventDefault();
        handlers.onNextTab?.();
      }

      // Cmd/Ctrl + Shift + [ - Previous Tab
      else if (modifier && e.shiftKey && e.key === "[") {
        e.preventDefault();
        handlers.onPrevTab?.();
      }

      // Cmd/Ctrl + K - Clear (Mac terminal style)
      else if (modifier && e.key === "k") {
        e.preventDefault();
        handlers.onClear?.();
      }

      // Cmd/Ctrl + F - Find
      else if (modifier && e.key === "f") {
        e.preventDefault();
        handlers.onFind?.();
      }

      // Cmd/Ctrl + , - Settings
      else if (modifier && e.key === ",") {
        e.preventDefault();
        handlers.onSettings?.();
      }

      // Cmd/Ctrl + 1-9 - Switch to tab number
      else if (modifier && e.key >= "1" && e.key <= "9") {
        e.preventDefault();
        const tabNumber = parseInt(e.key, 10);
        // This would need to be handled by passing current tabs
        // For now, we'll emit a custom event
        window.dispatchEvent(
          new CustomEvent("terminal:switch-tab", { detail: { index: tabNumber - 1 } })
        );
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
}

