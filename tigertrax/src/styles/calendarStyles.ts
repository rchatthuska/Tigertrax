// styles/calendarStyles.ts
// calendar component styling
import { StyleSheet } from "react-native";
import { THEME_COLORS, COLORS } from "../utils/colors";

// calendar-specific constants (prevents hanging magic numbers)
const CALENDAR_CONSTANTS = {
  PIXELS_PER_HOUR: 80,
  GRID_MIN_HEIGHT: 1200,
  DAY_COLUMN_WIDTH: 120,
  TIME_COLUMN_WIDTH: 80,
  TIME_SLOT_HEIGHT: 80,
  CLASS_BLOCK_PADDING: 8,
  CLASS_BLOCK_BORDER_WIDTH: 4,
  CLASS_BLOCK_MIN_HEIGHT: 80,
  CLASS_BLOCK_RADIUS: 6,
  CLASS_BG_OPACITY: 0.25,
  CLASS_SHADOW_OPACITY: 0.1,
  CLASS_SHADOW_RADIUS: 3,
  ASSIGNMENT_PADDING: 12,
  ASSIGNMENT_ITEM_BORDER_LEFT: 4,
  ASSIGNMENT_SECTION_PADDING: 15,
  ASSIGNMENT_SECTION_MARGIN_TOP: 20,
  ASSIGNMENT_ITEM_MARGIN_BOTTOM: 8,
} as const;

export const calendarStyles = StyleSheet.create({
  // main container
  container: {
    flex: 1,
    backgroundColor: THEME_COLORS.WHITE,
  },

  // header styles
  header: {
    flexDirection: "row",
    backgroundColor: THEME_COLORS.PRIMARY,
    borderBottomWidth: 2,
    borderBottomColor: "#c2410c",
  },
  headerText: {
    color: THEME_COLORS.WHITE,
    fontWeight: "600",
    fontSize: 14,
    textAlign: "center",
    paddingVertical: 12,
  },

  // column styles
  timeColumn: {
    width: CALENDAR_CONSTANTS.TIME_COLUMN_WIDTH,
    borderRightWidth: 1,
    borderRightColor: THEME_COLORS.BORDER,
    backgroundColor: THEME_COLORS.LIGHT_BG,
  },
  dayColumn: {
    flex: 1,
    minWidth: CALENDAR_CONSTANTS.DAY_COLUMN_WIDTH,
    borderRightWidth: 1,
    borderRightColor: THEME_COLORS.BORDER,
  },
  dayColumnContent: {
    flex: 1,
    minWidth: CALENDAR_CONSTANTS.DAY_COLUMN_WIDTH,
    position: "relative",
    borderRightWidth: 1,
    borderRightColor: THEME_COLORS.BORDER,
  },

  // scroll and grid
  scrollView: {
    flex: 1,
  },
  grid: {
    flexDirection: "row",
    minHeight: CALENDAR_CONSTANTS.GRID_MIN_HEIGHT,
  },

  // time slot styles
  timeSlot: {
    height: CALENDAR_CONSTANTS.TIME_SLOT_HEIGHT,
    justifyContent: "flex-start",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.BORDER,
    paddingTop: 5,
  },
  timeSlotBackground: {
    height: CALENDAR_CONSTANTS.TIME_SLOT_HEIGHT,
    borderBottomWidth: 1,
    borderBottomColor: THEME_COLORS.BORDER,
  },
  timeText: {
    fontSize: 12,
    color: THEME_COLORS.TEXT_LIGHT,
    fontWeight: "600",
  },

  // class block styles
  classBlock: {
    position: "absolute",
    left: 4,
    right: 4,
    borderRadius: CALENDAR_CONSTANTS.CLASS_BLOCK_RADIUS,
    padding: CALENDAR_CONSTANTS.CLASS_BLOCK_PADDING,
    borderLeftWidth: CALENDAR_CONSTANTS.CLASS_BLOCK_BORDER_WIDTH,
    overflow: "hidden",
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: CALENDAR_CONSTANTS.CLASS_SHADOW_OPACITY,
    shadowRadius: CALENDAR_CONSTANTS.CLASS_SHADOW_RADIUS,
    elevation: 3,
  },
  classCode: {
    fontSize: 14,
    fontWeight: "700",
    color: THEME_COLORS.TEXT_DARK,
    marginBottom: 3,
  },
  className: {
    fontSize: 12,
    color: THEME_COLORS.DARK_SECONDARY,
    marginBottom: 3,
    fontWeight: "500",
  },
  classLocation: {
    fontSize: 11,
    color: THEME_COLORS.TEXT_LIGHT,
    marginBottom: 3,
  },
  classTime: {
    fontSize: 11,
    color: THEME_COLORS.TEXT_LIGHT,
    fontWeight: "600",
  },

  // assignments section
  assignmentsSection: {
    backgroundColor: THEME_COLORS.LIGHT_BG,
    padding: CALENDAR_CONSTANTS.ASSIGNMENT_SECTION_PADDING,
    marginTop: CALENDAR_CONSTANTS.ASSIGNMENT_SECTION_MARGIN_TOP,
    borderTopWidth: 2,
    borderTopColor: THEME_COLORS.BORDER,
  },
  assignmentsTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: THEME_COLORS.TEXT_DARK,
    marginBottom: 10,
  },
  assignmentItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: THEME_COLORS.WHITE,
    padding: CALENDAR_CONSTANTS.ASSIGNMENT_PADDING,
    borderRadius: 8,
    marginBottom: CALENDAR_CONSTANTS.ASSIGNMENT_ITEM_MARGIN_BOTTOM,
    borderLeftWidth: CALENDAR_CONSTANTS.ASSIGNMENT_ITEM_BORDER_LEFT,
    borderLeftColor: THEME_COLORS.PRIMARY,
  },
  assignmentTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: THEME_COLORS.TEXT_DARK,
    marginBottom: 4,
  },
  assignmentCourse: {
    fontSize: 12,
    color: THEME_COLORS.TEXT_LIGHT,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 8,
  },
  priorityText: {
    color: THEME_COLORS.WHITE,
    fontSize: 10,
    fontWeight: "600",
  },
});

export { CALENDAR_CONSTANTS };
