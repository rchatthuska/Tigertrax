/* 
===========================================================
Global stylesheet for the app
-----------------------------------------------------------
ONLY SHARED/GLOBAL STYLES GO HERE.
Page-specific styles are in their own files:
- cardStyles.ts - Cards and dashboard components
- formStyles.ts - Form elements, selectors, modals
- pageHeaderStyles.ts - Page headers with back buttons
- calendarStyles.ts - Calendar view components
- theme.ts - Shared colors, shadows, and constants
========================================================== 
*/

import { StyleSheet, Platform, StatusBar } from "react-native";
import { COLORS, SHADOWS, BUTTON_SIZING } from "./theme";

export const styles = StyleSheet.create({
  /* =========================================================
    Global Container Styles
  ======================================================== */
  container: {
    backgroundColor: COLORS.BACKGROUND,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  pageContainer: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: "flex-start",
    alignItems: "stretch",
    padding: 20,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },

  /* =========================================================
    Global Typography
  ======================================================== */
  title: {
    color: COLORS.PRIMARY,
    fontSize: 36,
    fontWeight: "700",
    marginBottom: 12,
    letterSpacing: 1,
  },

  subtitle: {
    color: COLORS.SECONDARY,
    fontSize: 20,
    marginBottom: 30,
  },

  /* =========================================================
    Global Input Styles
  ======================================================== */
  input: {
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.BORDER,
    borderWidth: 1,
    borderRadius: 8,
    width: BUTTON_SIZING.WIDTH,
    maxWidth: BUTTON_SIZING.MAX_WIDTH,
    height: BUTTON_SIZING.HEIGHT,
    paddingHorizontal: 12,
    marginBottom: 16,
    ...SHADOWS.SUBTLE,
  },

  /* =========================================================
    Global Button Styles
  ======================================================== */
  button: {
    width: BUTTON_SIZING.WIDTH,
    maxWidth: BUTTON_SIZING.MAX_WIDTH,
    backgroundColor: COLORS.PRIMARY,
    alignItems: "center",
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: BUTTON_SIZING.PADDING_VERTICAL,
    ...SHADOWS.STANDARD,
  },

  buttonText: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: "600",
  },

  buttonSecondary: {
    width: BUTTON_SIZING.WIDTH,
    maxWidth: BUTTON_SIZING.MAX_WIDTH,
    backgroundColor: "transparent",
    borderColor: COLORS.SECONDARY,
    borderWidth: 1.5,
    alignItems: "center",
    marginTop: 12,
    borderRadius: 8,
    paddingVertical: BUTTON_SIZING.PADDING_VERTICAL,
    ...SHADOWS.SUBTLE,
  },

  buttonSecondaryText: {
    color: COLORS.SECONDARY,
    fontSize: 16,
    fontWeight: "600",
  },
});