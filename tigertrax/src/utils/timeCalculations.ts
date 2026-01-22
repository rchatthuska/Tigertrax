// utils/timeCalculations.ts
// time-related utility stuff (for calendar)

// used locally no need to export
const CALENDAR_CONFIG = {
  PIXELS_PER_HOUR: 80,
  GRID_MIN_HEIGHT: 1200, // 15hrs * 80px
  DAY_COLUMN_WIDTH: 120,
  TIME_COLUMN_WIDTH: 80,
  BASE_HOUR: 8,
} as const;

/**
 * parse time string to minutes since midnight
 * @param timeStr Format: "HH:MM AM/PM"
 * @returns minutes since midnight
 */
function timeToMinutes(timeStr: string): number {
  const match = timeStr.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!match) return 0;

  let hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  const ampm = match[3].toUpperCase();

  if (ampm === "PM" && hours !== 12) hours += 12;
  if (ampm === "AM" && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/**
 * Calculate position and height for a class block in the calendar
 * @param startTime Format: "HH:MM AM/PM"
 * @param endTime Format: "HH:MM AM/PM"
 * @returns object with top position and height in pixels
 */
export function calculateClassPosition(
  startTime: string,
  endTime: string
): { top: number; height: number } {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  const duration = endMinutes - startMinutes;

  const baseMinutes = CALENDAR_CONFIG.BASE_HOUR * 60;
  const top = ((startMinutes - baseMinutes) / 60) * CALENDAR_CONFIG.PIXELS_PER_HOUR;
  const height = (duration / 60) * CALENDAR_CONFIG.PIXELS_PER_HOUR;

  return { top, height };
}

/**
 * Generate array of time slots for calendar display
 * @param startHour hour to start (24-hour format)
 * @param endHour hour to end (24-hour format)
 * @returns array of formatted time strings (e.g., "8:00 AM")
 */
export function generateTimeSlots(startHour: number, endHour: number): string[] {
  const timeSlots: string[] = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    const displayHour = hour > 12 ? hour - 12 : hour;
    const ampm = hour >= 12 ? "PM" : "AM";
    timeSlots.push(`${displayHour}:00 ${ampm}`);
  }
  return timeSlots;
}
