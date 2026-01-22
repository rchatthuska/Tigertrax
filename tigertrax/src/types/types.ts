// types/types.ts
// Shared type definitions for TigerTraX

/* ==========================================================
CLASS TYPE - For course/class information
========================================================== */
export interface Class {
  id: string;
  name: string;
  courseCode: string;
  building: string;
  room: string;
  startTime: string; // Format: "HH:MM AM/PM"
  endTime: string;
  daysOfWeek: string[]; // ["Mon", "Tue", etc.]
  startDate: string; // Format: "MM/DD/YYYY"
  endDate: string;
  instructor?: string;
  notes?: string;
}

/* ==========================================================
ASSIGNMENT TYPE - For homework/projects
========================================================== */
export interface Assignment {
  id: string;
  title: string;
  courseCode: string; // Links to a class
  dueDate: string;    // Format: "MM/DD/YYYY"
  dueTime: string;    // Format: "HH:MM AM/PM"
  description?: string;
  completed: boolean;
  priority?: "Low" | "Medium" | "High";
  notificationIds?: string[]; // scheduled notif ids (so we can cancel if needed)
}

/* ==========================================================
ICAL EVENT TYPE - For calendar export
========================================================== */
export interface ICalEvent {
  uid: string;
  summary: string;
  description: string;
  location: string;
  dtstart: string; // ISO format
  dtend: string;
  rrule?: string; // For recurring events
  categories: string[]; // ["CLASS"] or ["ASSIGNMENT"]
}