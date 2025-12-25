import { useState } from "react";
import type { Command } from "~/lib/terminal/types";
import { COMMAND_DATA } from "~/lib/terminal/constants";
import { fetchAllPackagesStats, calculateTotalDownloads, formatNumber, MY_PACKAGES } from "~/lib/npmStats";

export function useCommandHandler() {
  const [history, setHistory] = useState<Command[]>([]);

  const executeCommand = async (
    cmd: string,
    onSettingsToggle?: () => void
  ): Promise<void> => {
    const command = cmd.toLowerCase().trim();

    if (!command) return;

    // Clear command
    if (command === "clear") {
      setHistory([]);
      return;
    }

    // Settings command
    if (command === "settings") {
      onSettingsToggle?.();
      setHistory((prev) => [
        ...prev,
        {
          input: cmd,
          output: ["Settings dialog opened."],
        },
      ]);
      return;
    }

    // Packages command
    if (command === "packages" || command === "packages --refresh") {
      setHistory((prev) => [
        ...prev,
        {
          input: cmd,
          output: ["📦 Fetching package statistics from npm registry..."],
        },
      ]);

      const stats = await fetchPackageStatsData();

      if (stats.length === 0) {
        setHistory((prev) => [
          ...prev,
          {
            input: "",
            output: [
              "No packages configured yet.",
              "",
              "To add your packages:",
              "1. Open: app/lib/npmStats.ts",
              "2. Add your package names to MY_PACKAGES array",
              "3. Example: '@yourusername/package-name'",
              "",
              "Find your packages at:",
              "https://www.npmjs.com/settings/mohammad.garmabi/packages",
            ],
          },
        ]);
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
          "",
          "💡 Note: NPM API provides stats for the last 18 months",
          "   For 5-year historical data, consider npm-stat.com",
        ];

        setHistory((prev) => [
          ...prev,
          {
            input: "",
            output,
          },
        ]);
      }
      return;
    }

    // Regular commands
    const output =
      COMMAND_DATA[command] || [
        `Command not found: ${cmd}`,
        "Type 'help' for available commands.",
      ];

    setHistory((prev) => [...prev, { input: cmd, output }]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return {
    history,
    setHistory,
    executeCommand,
    clearHistory,
  };
}

async function fetchPackageStatsData() {
  try {
    if (MY_PACKAGES.length === 0) {
      return [];
    }

    const stats = await fetchAllPackagesStats();
    return stats;
  } catch (error) {
    console.error("Error fetching package stats:", error);
    return [];
  }
}

