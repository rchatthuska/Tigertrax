// utils/icalGenerator.ts
// Generate iCal format from classes and assignments

import { Class, Assignment, ICalEvent } from "../types/types";

/* ==========================================================
iCAL FORMAT GENERATOR
Converts classes and assignments to iCal format
========================================================== */

/* Convert date string to iCal format (YYYYMMDDTHHMMSS) */
function toICalDate(dateStr: string, timeStr: string): string {
  // Parse MM/DD/YYYY and HH:MM AM/PM
  const [month, day, year] = dateStr.split("/");
  const [time, period] = timeStr.split(" ");
  const [hours, minutes] = time.split(":");

  let hour = parseInt(hours);
  if (period === "PM" && hour !== 12) hour += 12;
  if (period === "AM" && hour === 12) hour = 0;

  // Format: YYYYMMDDTHHMMSS
  return `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}T${hour
    .toString()
    .padStart(2, "0")}${minutes}00`;
}

/* Generate RRULE for recurring class events */
function generateRRule(daysOfWeek: string[], endDate: string): string {
  // Map day names to iCal format
  const dayMap: { [key: string]: string } = {
    Mon: "MO",
    Tue: "TU",
    Wed: "WE",
    Thu: "TH",
    Fri: "FR",
    Sat: "SA",
    Sun: "SU",
  };

  const icalDays = daysOfWeek.map((d) => dayMap[d]).join(",");
  const [month, day, year] = endDate.split("/");
  const until = `${year}${month.padStart(2, "0")}${day.padStart(2, "0")}`;

  return `FREQ=WEEKLY;BYDAY=${icalDays};UNTIL=${until}T235959`;
}

/* Convert Class to iCal event */
export function classToICalEvent(classItem: Class): ICalEvent {
  const dtstart = toICalDate(classItem.startDate, classItem.startTime);
  const dtend = toICalDate(classItem.startDate, classItem.endTime);

  return {
    uid: `class-${classItem.id}@tigertrax.app`,
    summary: `${classItem.courseCode}: ${classItem.name}`,
    description: `Instructor: ${classItem.instructor || "N/A"}\nNotes: ${
      classItem.notes || "None"
    }`,
    location: `${classItem.building} ${classItem.room}`.trim(),
    dtstart,
    dtend,
    rrule: generateRRule(classItem.daysOfWeek, classItem.endDate),
    categories: ["CLASS"],
  };
}

/* Convert Assignment to iCal event */
export function assignmentToICalEvent(assignment: Assignment): ICalEvent {
  const dtstart = toICalDate(assignment.dueDate, assignment.dueTime);
  // Assignments are point-in-time, so end = start
  const dtend = dtstart;

  return {
    uid: `assignment-${assignment.id}@tigertrax.app`,
    summary: `📝 ${assignment.title} (${assignment.courseCode})`,
    description: `Priority: ${assignment.priority}\n${
      assignment.description || ""
    }`,
    location: "",
    dtstart,
    dtend,
    categories: ["ASSIGNMENT"],
  };
}

/* Generate full iCal file content */
export function generateICalFile(
  classes: Class[],
  assignments: Assignment[]
): string {
  let ical = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//TigerTraX//Schedule Export//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
X-WR-CALNAME:TigerTraX Schedule
X-WR-TIMEZONE:America/New_York
X-WR-CALDESC:Exported from TigerTraX

`;

  // Add classes
  classes.forEach((classItem) => {
    const event = classToICalEvent(classItem);
    ical += `BEGIN:VEVENT
UID:${event.uid}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${event.dtstart}
DTEND:${event.dtend}
SUMMARY:${event.summary}
DESCRIPTION:${event.description.replace(/\n/g, "\\n")}
LOCATION:${event.location}
CATEGORIES:${event.categories.join(",")}
RRULE:${event.rrule}
END:VEVENT

`;
  });

  // Add assignments
  assignments.forEach((assignment) => {
    const event = assignmentToICalEvent(assignment);
    ical += `BEGIN:VEVENT
UID:${event.uid}
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z
DTSTART:${event.dtstart}
DTEND:${event.dtend}
SUMMARY:${event.summary}
DESCRIPTION:${event.description.replace(/\n/g, "\\n")}
LOCATION:${event.location}
CATEGORIES:${event.categories.join(",")}
STATUS:${assignment.completed ? "COMPLETED" : "NEEDS-ACTION"}
PRIORITY:${
      assignment.priority === "High"
        ? "1"
        : assignment.priority === "Medium"
        ? "5"
        : "9"
    }
END:VEVENT

`;
  });

  ical += `END:VCALENDAR`;
  return ical;
}

/* ==========================================================
VISUAL REPRESENTATION OF iCAL FORMAT:

BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-//TigerTraX//Schedule Export//EN
  
  BEGIN:VEVENT                    ← CLASS EVENT
    UID:class-123@tigertrax.app
    SUMMARY:SWEN-250: Software Engineering
    DTSTART:20250113T090000       ← Start: 9:00 AM
    DTEND:20250113T105000         ← End: 10:50 AM
    RRULE:FREQ=WEEKLY;BYDAY=MO,WE ← Repeats Mon/Wed
    LOCATION:Golisano 1520
    CATEGORIES:CLASS
  END:VEVENT
  
  BEGIN:VEVENT                    ← ASSIGNMENT EVENT
    UID:assignment-456@tigertrax.app
    SUMMARY:📝 Homework 5 (SWEN-250)
    DTSTART:20251215T235900       ← Due: 11:59 PM
    DTEND:20251215T235900
    CATEGORIES:ASSIGNMENT
    PRIORITY:1                    ← High priority
  END:VEVENT
  
END:VCALENDAR
========================================================== */
