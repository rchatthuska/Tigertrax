// utils/colors.ts
// centralized color management. any color logic belongs in here

export const COLORS = {
  RED: "#ef4444",
  ORANGE: "#f59e0b",
  GREEN: "#10b981",
  BLUE: "#3b82f6",
  PURPLE: "#8b5cf6",
  PINK: "#ec4899",
  WHITE: "#ffffff",
  BLACK: "#000000",
} as const;

// helper map (used privately)
const COLOR_ARRAY = [
  COLORS.RED,
  COLORS.ORANGE,
  COLORS.GREEN,
  COLORS.BLUE,
  COLORS.PURPLE,
  COLORS.PINK,
];

// theme colors
export const THEME_COLORS = {
  PRIMARY: "#ea580c", // cool orange
  SECONDARY: "#4b5563", // medium gray
  BACKGROUND: "#f3f4f6", // not quite white
  BORDER: "#e5e7eb", // light gray (borders)
  TEXT_LIGHT: "#6b7280", // lighter gray text
  TEXT_DARK: "#1f2937", // dark text
  LIGHT_BG: "#f9fafb", // very light background
  DARK_SECONDARY: "#4b5563",
  WHITE: "#ffffff",
} as const;

/**
 * get a consistent color from a string hash (for course codes and other bullshit)
 */
export function getColorByHash(identifier: string): string {
  const hash = identifier
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return COLOR_ARRAY[hash % COLOR_ARRAY.length];
}

/**
 * get color based on priority level
 */
export function getPriorityColor(priority: "High" | "Medium" | "Low"): string {
  const priorityMap = {
    High: COLORS.RED,
    Medium: COLORS.ORANGE,
    Low: COLORS.GREEN,
  };
  return priorityMap[priority];
}

/**
 * add opacity to a color (hex format)
 * @param color hex color string
 * @param opacity value 0-1 (e.g., 0.25 for 25%)
 * @returns hex color with opacity appended
 */
export function addOpacity(color: string, opacity: number): string {
  const opacityHex = Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0");
  return color + opacityHex;
}