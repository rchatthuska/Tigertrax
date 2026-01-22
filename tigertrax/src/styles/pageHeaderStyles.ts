// styles/pageHeaderStyles.ts
// styles for page headers with back button and title
// migrated out of styles.ts (so we know where everything goes)

import { StyleSheet } from "react-native";
import { COLORS } from "./theme";

export const pageHeaderStyles = StyleSheet.create({
  /* =========================================================
    Page Header (used on any page with back button and title)
  ======================================================== */
  pageHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.BACKGROUND,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.BORDER,
    marginBottom: 20,
  },

  headerBackButton: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 60,
  },

  headerBackButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },

  pageTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.PRIMARY,
    flex: 1,
    textAlign: "center",
  },

  /* =========================================================
    Alternative Header Bar Layout
  ======================================================== */
  headerBar: {
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    height: 50,
    marginBottom: 10,
  },

  headerBack: {
    position: "absolute",
    left: 0,
    paddingHorizontal: 20,
  },

  /* =========================================================
    Schedule Header (used in schedule views)
  ======================================================== */
  scheduleHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },

  backButton: {
    marginRight: 10,
  },

  backButtonText: {
    color: COLORS.PRIMARY,
    fontSize: 16,
    fontWeight: "600",
  },
});
