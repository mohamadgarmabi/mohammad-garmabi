import type { TerminalTab } from "~/hooks/useTerminalTabs";

interface TabBarProps {
  tabs: TerminalTab[];
  activeTabId: string;
  onSwitchTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
  onNewTab: () => void;
}

export function TabBar({
  tabs,
  activeTabId,
  onSwitchTab,
  onCloseTab,
  onNewTab,
}: TabBarProps) {
  return (
    <div className="bg-gray-800 border-b border-gray-700 flex items-center px-2 shrink-0">
      <div className="flex items-center gap-1 overflow-x-auto flex-1">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => onSwitchTab(tab.id)}
            className={`
              group flex items-center gap-2 px-3 py-1.5 rounded-t cursor-pointer
              transition-colors text-sm font-mono
              ${
                activeTabId === tab.id
                  ? "bg-gray-900 text-white"
                  : "bg-gray-700 text-gray-400 hover:bg-gray-600 hover:text-gray-200"
              }
            `}
          >
            <span className="whitespace-nowrap">{tab.title}</span>
            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 hover:text-red-400 transition-opacity"
                title="Close tab (Cmd+W)"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      {/* New Tab Button */}
      <button
        onClick={onNewTab}
        className="px-2 py-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors text-sm"
        title="New tab (Cmd+T)"
      >
        +
      </button>
    </div>
  );
}

