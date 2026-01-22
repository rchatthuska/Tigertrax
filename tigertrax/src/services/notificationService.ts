// services/notificationService.ts
// push notification scheduling and management
// created by Noah Mingolelli, slightly reused from Hertzonic

import * as Notifications from "expo-notifications";
import { Assignment, Class } from "../types/types";

// configure notification behavior
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

/**
 * Parse time string like "2:30 PM" to { hours, minutes }
 */
function parseTime(timeString: string): {
  hours: number;
  minutes: number;
  ampm: string;
} {
  const [time, ampm] = timeString.split(" ");
  const [hours, minutes] = time.split(":").map(Number);
  return { hours, minutes, ampm };
}

/**
 * convert to 24-hour format
 */
function convertTo24Hour(hours: number, ampm: string): number {
  let hour24 = hours;
  if (ampm === "PM" && hours !== 12) hour24 += 12;
  if (ampm === "AM" && hours === 12) hour24 = 0;

  return hour24;
}

/**
 * calculate seconds until a given date
 */
function getSecondsUntil(targetDate: Date): number {
  return Math.max(
    1,
    Math.floor((targetDate.getTime() - new Date().getTime()) / 1000)
  );
}

/**
 * schedule a notification with given content and time
 */
async function scheduleNotification(
  content: Notifications.NotificationContentInput,
  notificationTime: Date
): Promise<string | null> {
  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content,
      trigger: {
        type: "timeInterval" as any,
        seconds: getSecondsUntil(notificationTime),
      },
    });
    return notificationId;
  } catch (error) {
    console.error("Failed to schedule notification:", error);
    return null;
  }
}

/**
 * request notif permissions from user
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    return status === "granted";
  } catch (error) {
    console.error("Failed to request notification permissions:", error);
    return false;
  }
}

// schedule repeated reminders (hours before due)
const REMINDER_SCHEDULES = {
  Low: [168, 24, 12, 6, 3, 1, 0.5], // + 3d, 24h, 12h, 6h, 3h, 1h, 30m
  Medium: [168, 72, 48, 24, 12, 6, 4, 3, 2, 1, 0.5, 0.25], // + 2d, 4h, 2h, 15m
  High: [5, 4, 3, 2, 1, 0.5, 0.25], // + same as medium, daily handled separately
} as const;

/**
 * convert time remaining to something human readable
 */
function getTimeRemainingText(hoursLeft: number): string {
  if (hoursLeft >= 24) return `${Math.round(hoursLeft / 24)} day(s)`;
  if (hoursLeft >= 1) return `${Math.round(hoursLeft)} hour(s)`;
  return `${Math.round(hoursLeft * 60)} minutes`;
}

/**
 * schedule all notifications for an assignment based on priority
 * returns array of notification IDs for later cancellation
 */
export async function scheduleAssignmentReminders(
  assignment: Assignment
): Promise<string[]> {
  const [month, day, year] = assignment.dueDate.split("/").map(Number);
  const { hours, minutes, ampm } = parseTime(assignment.dueTime);
  const hour24 = convertTo24Hour(hours, ampm);
  const dueDate = new Date(year, month - 1, day, hour24, minutes);

  const priority = assignment.priority || "Medium";
  const schedule = REMINDER_SCHEDULES[priority];
  const notificationIds: string[] = [];
  const now = new Date();

  for (const hoursBefore of schedule) {
    const notificationTime = new Date(
      dueDate.getTime() - hoursBefore * 60 * 60 * 1000
    );
    if (notificationTime <= now) continue;

    const id = await scheduleNotification(
      {
        title: `📝 ${assignment.title} due in ${getTimeRemainingText(
          hoursBefore
        )}`,
        body: `${assignment.courseCode} - Due ${assignment.dueDate} at ${assignment.dueTime}`,
        data: { assignmentId: assignment.id, type: "assignment" },
        sound: "default",
      },
      notificationTime
    );
    if (id) notificationIds.push(id);
  }

  console.log(
    `Scheduled ${notificationIds.length} reminders for: ${assignment.title}`
  );
  return notificationIds;
}

/**
 * cancel all notifications for an assignment
 */
export async function cancelAssignmentReminders(
  notificationIds: string[]
): Promise<void> {
  for (const id of notificationIds) {
    await Notifications.cancelScheduledNotificationAsync(id);
  }
}

/**
 * schedule a notification for a class meeting
 * notifies 15 minutes before class start time
 */
export async function scheduleClassReminder(
  classItem: Class
): Promise<string | null> {
  try {
    const { hours, minutes, ampm } = parseTime(classItem.startTime);
    const hour24 = convertTo24Hour(hours, ampm);

    // next occurance of class
    const today = new Date();
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let nextClassDate = new Date(today);
    let found = false;
    for (let i = 0; i < 7; i++) {
      const dayName = dayNames[nextClassDate.getDay()];
      if (classItem.daysOfWeek.includes(dayName)) {
        found = true;
        break;
      }

      nextClassDate.setDate(nextClassDate.getDate() + 1);
    }

    // if no more upcoming classes return null
    if (!found) {
      console.log(`Class "${classItem.name}" has no upcoming meetings`);
      return null;
    }

    // if trying to schedule a notif for the past, error out
    nextClassDate.setHours(hour24, minutes, 0, 0);
    const notificationTime = new Date(nextClassDate.getTime() - 15 * 60 * 1000);
    if (notificationTime < new Date()) {
      console.log(`Class "${classItem.name}" starts too soon`);
      return null;
    }

    // schedule a notif that your class is starting soon
    const notificationId = await scheduleNotification(
      {
        title: `🎓 ${classItem.courseCode} starting soon`,
        body: `${classItem.name} in ${classItem.building} ${classItem.room}`,
        data: { classId: classItem.id, type: "class" },
        sound: "default",
      },
      notificationTime
    );

    // log and return
    if (notificationId)
      console.log(`Scheduled reminder for class: ${classItem.courseCode}`);
    return notificationId;
  } catch (error) {
    // just null out as per usual
    console.error("Failed to schedule class reminder:", error);
    return null;
  }
}
