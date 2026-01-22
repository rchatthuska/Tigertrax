// styles/theme.ts
// shared theme constants: colors, shadows, and responsive sizing
// use these across all stylesheets to keep everything consistent. migrated out of styles.ts

import { Dimensions } from "react-native";

// get screen width for responsive design
const { width } = Dimensions.get("window");
export const isLargeScreen = width > 768;

// color constants
export const COLORS = {
  BACKGROUND: "#f3f4f6", // white enough
  PRIMARY: "#ea580c",    // cool orange
  SECONDARY: "#4b5563",  // medium gray
  BORDER: "#e5e7eb",     // light gray
  WHITE: "#ffffff",      // ok actually white this time

  // state colors (FUCK NO! yippee! and... maybe?)
  DANGER: "#ef4444",
  SUCCESS: "#10b981",
  WARNING: "#f59e0b",
} as const;

// reusable shadow styles
export const SHADOWS = {
  STANDARD: {
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  SUBTLE: {
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
} as const;

// responsive button sizing
export const BUTTON_SIZING = {
  WIDTH: isLargeScreen ? "40%" : "85%",
  MAX_WIDTH: 400,
  HEIGHT: 48,
  PADDING_VERTICAL: 14,
} as const;
