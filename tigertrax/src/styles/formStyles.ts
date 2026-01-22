// styles/formStyles.ts
// styles for forms: day/type selectors, modals, action buttons
// migrated out of styles.ts (so we know where everything goes)

import { StyleSheet } from "react-native";
import { COLORS, SHADOWS } from "./theme";

export const formStyles = StyleSheet.create({
  /* =========================================================
    Input Labels
  ======================================================== */
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.SECONDARY,
    marginBottom: 6,
    marginTop: 10,
  },

  /* =========================================================
    Day and Type Selector Buttons
    Used in: AddClass, AddAssignment, etc.
  ======================================================== */
  daysContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 16,
  },

  // base style for day/type selector buttons
  selectorButton: {
    padding: 10,
    borderRadius: 6,
    minWidth: 45,
    alignItems: "center",
    backgroundColor: COLORS.BORDER,
  },

  selectorButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },

  selectorButtonText: {
    color: COLORS.SECONDARY,
    fontWeight: "600",
  },

  selectorButtonTextActive: {
    color: COLORS.WHITE,
  },

  // legacy aliases for existing usage
  dayButton: {
    padding: 10,
    borderRadius: 6,
    minWidth: 45,
    alignItems: "center",
    backgroundColor: COLORS.BORDER,
  },

  dayButtonSelected: {
    backgroundColor: COLORS.PRIMARY,
  },

  dayButtonText: {
    color: COLORS.SECONDARY,
    fontWeight: "600",
  },

  dayButtonTextSelected: {
    color: COLORS.WHITE,
  },

  dayButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },

  typeButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: COLORS.BORDER,
    alignItems: "center",
  },

  typeButtonActive: {
    backgroundColor: COLORS.PRIMARY,
  },

  typeButtonText: {
    fontWeight: "600",
    color: COLORS.SECONDARY,
  },

  typeSelector: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },

  /* =========================================================
    Modal Styles
  ======================================================== */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 20,
    width: "90%",
    maxHeight: "80%",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: COLORS.PRIMARY,
    marginBottom: 20,
  },

  modalContent: {
    padding: 20,
  },

  /* =========================================================
    Action Buttons (export, cancel, etc)
  ======================================================== */
  actionButtons: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
    width: "85%",
    justifyContent: "space-between",
  },

  cancelButton: {
    backgroundColor: COLORS.PRIMARY,
  },

  exportButton: {
    backgroundColor: COLORS.SUCCESS,
    flex: 1,
  },
});
