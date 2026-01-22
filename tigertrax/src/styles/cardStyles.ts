// styles/cardStyles.ts
// styles for cards used in home/dashboard and ViewClasses
// migrated out of styles.ts (so we know where everything goes)

import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, isLargeScreen } from "./theme";

export const cardStyles = StyleSheet.create({
  /* =========================================================
    Dashboard Container
  ======================================================== */
  dashboardContainer: {
    // dynamic sizing
    width: isLargeScreen ? "60%" : "100%",
    maxWidth: 600,

    // spacing
    marginBottom: 30,
    alignItems: "center",
  },

  /* =========================================================
    Card Styles
  ======================================================== */
  card: {
    // basic styles
    width: "80%",
    backgroundColor: COLORS.WHITE,

    // spacing
    padding: 20,
    marginBottom: 16,

    // shadow for cool effect
    ...SHADOWS.STANDARD,

    // border styling
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.PRIMARY,
    marginBottom: 8,
  },

  cardContent: {
    fontSize: 16,
    color: COLORS.SECONDARY,
    lineHeight: 22,
  },

  cardDetail: {
    fontSize: 14,
    color: COLORS.SECONDARY,
    marginTop: 4,
  },

  /* =========================================================
    Class Card Specific Styles
  ======================================================== */
  classCard: {
    backgroundColor: COLORS.WHITE,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.PRIMARY,
  },

  classCardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  courseCode: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.PRIMARY,
  },

  className: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
  },

  classDetails: {
    marginTop: 8,
  },

  detailText: {
    fontSize: 14,
    color: COLORS.SECONDARY,
    marginBottom: 4,
  },

  deleteButton: {
    fontSize: 20,
    color: COLORS.DANGER,
  },

  itemTypeLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.PRIMARY,
  },

  /* =========================================================
    Empty State Styles
  ======================================================== */
  emptyState: {
    padding: 40,
    alignItems: "center",
  },

  emptyStateText: {
    color: COLORS.SECONDARY,
    fontSize: 16,
    textAlign: "center",
  },

  emptyText: {
    color: COLORS.SECONDARY,
    fontSize: 16,
    textAlign: "center",
  },
});
