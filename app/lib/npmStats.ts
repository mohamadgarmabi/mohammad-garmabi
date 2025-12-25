// NPM Package Statistics Utility

export interface PackageStats {
  name: string;
  downloads: number;
  downloadsLastMonth: number;
  downloadsLastWeek: number;
}

export interface PackageInfo {
  name: string;
  version: string;
  description: string;
}

// Mohammad Garmabi's npm packages
export const MY_PACKAGES = [
  "image-auth",
  "url-validation-query",
  "react-video-capture",
  "frontend-stack-cli",
  "react-providers-tree",
  "react-performanalyzer",
  "sse-shared-worker-react-hook",
  "vite-plugin-react-splash",
];

/**
 * Fetch download stats for a package from npm registry
 */
export async function fetchPackageDownloads(
  packageName: string,
  period: "last-day" | "last-week" | "last-month" | "last-year" = "last-year"
): Promise<number> {
  try {
    const response = await fetch(
      `https://api.npmjs.org/downloads/point/${period}/${packageName}`
    );
    
    if (!response.ok) {
      console.warn(`Failed to fetch stats for ${packageName}`);
      return 0;
    }
    
    const data = await response.json();
    return data.downloads || 0;
  } catch (error) {
    console.error(`Error fetching stats for ${packageName}:`, error);
    return 0;
  }
}

/**
 * Fetch package info from npm registry
 */
export async function fetchPackageInfo(packageName: string): Promise<PackageInfo | null> {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return {
      name: data.name,
      version: data["dist-tags"]?.latest || "unknown",
      description: data.description || "No description",
    };
  } catch (error) {
    console.error(`Error fetching info for ${packageName}:`, error);
    return null;
  }
}

/**
 * Fetch comprehensive stats for a package
 */
export async function fetchPackageStats(packageName: string): Promise<PackageStats> {
  const [year, month, week] = await Promise.all([
    fetchPackageDownloads(packageName, "last-year"),
    fetchPackageDownloads(packageName, "last-month"),
    fetchPackageDownloads(packageName, "last-week"),
  ]);

  return {
    name: packageName,
    downloads: year,
    downloadsLastMonth: month,
    downloadsLastWeek: week,
  };
}

/**
 * Fetch stats for all packages
 */
export async function fetchAllPackagesStats(): Promise<PackageStats[]> {
  if (MY_PACKAGES.length === 0) {
    return [];
  }

  const stats = await Promise.all(
    MY_PACKAGES.map((pkg) => fetchPackageStats(pkg))
  );

  return stats;
}

/**
 * Calculate total downloads across all packages
 */
export function calculateTotalDownloads(stats: PackageStats[]): {
  total: number;
  lastMonth: number;
  lastWeek: number;
} {
  return stats.reduce(
    (acc, pkg) => ({
      total: acc.total + pkg.downloads,
      lastMonth: acc.lastMonth + pkg.downloadsLastMonth,
      lastWeek: acc.lastWeek + pkg.downloadsLastWeek,
    }),
    { total: 0, lastMonth: 0, lastWeek: 0 }
  );
}

/**
 * Format number with commas
 */
export function formatNumber(num: number): string {
  return num.toLocaleString("en-US");
}

/**
 * Get download stats for the last 5 years (approximate)
 * Note: npm API only provides data for the last 18 months
 * For older data, we would need to use historical data services
 */
export async function fetchHistoricalStats(packageName: string): Promise<{
  available: boolean;
  message: string;
  lastYearDownloads: number;
}> {
  const lastYear = await fetchPackageDownloads(packageName, "last-year");
  
  return {
    available: false,
    message: "NPM API only provides download stats for the last 18 months. For historical data beyond that, consider using services like npm-stat.com",
    lastYearDownloads: lastYear,
  };
}

