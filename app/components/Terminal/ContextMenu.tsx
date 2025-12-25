import type { ContextMenuPosition } from "~/lib/terminal/types";

interface ContextMenuProps {
  position: ContextMenuPosition | null;
  onClose: () => void;
  onSettings: () => void;
  onClear: () => void;
  onHelp: () => void;
}

export function ContextMenu({
  position,
  onClose,
  onSettings,
  onClear,
  onHelp,
}: ContextMenuProps) {
  if (!position) return null;

  return (
    <div
      className="fixed bg-gray-800 border border-gray-600 rounded-lg shadow-2xl z-50 py-1 min-w-[200px]"
      style={{ top: position.y, left: position.x }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          onSettings();
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 font-mono text-sm flex items-center gap-2"
      >
        ⚙️ Settings
      </button>
      <button
        onClick={() => {
          onClear();
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 font-mono text-sm flex items-center gap-2"
      >
        🗑️ Clear Terminal
      </button>
      <button
        onClick={() => {
          onHelp();
          onClose();
        }}
        className="w-full text-left px-4 py-2 text-white hover:bg-gray-700 font-mono text-sm flex items-center gap-2"
      >
        ❓ Help
      </button>
    </div>
  );
}

