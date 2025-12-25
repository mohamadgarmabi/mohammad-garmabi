export function TerminalHeader() {
  return (
    <div className="bg-gray-800 px-3 sm:px-4 py-2 flex items-center gap-2 border-b border-gray-700 shrink-0">
      <div className="flex gap-1.5 sm:gap-2">
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500"></div>
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500"></div>
        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="flex-1 text-center text-gray-400 text-xs sm:text-sm font-mono">
        mohammad.garmabi@portfolio ~ zsh
      </div>
    </div>
  );
}

