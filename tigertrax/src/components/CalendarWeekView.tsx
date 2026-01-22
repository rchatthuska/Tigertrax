// components/CalendarWeekView.tsx
// Weekly calendar view for classes and assignments

import React from "react";
import { View, Text, ScrollView } from "react-native";
import { Class, Assignment } from "../types/types";
import { calendarStyles } from "../styles/calendarStyles";
import {
  generateTimeSlots,
  calculateClassPosition,
} from "../utils/timeCalculations";
import { getColorByHash, getPriorityColor } from "../utils/colors";
import { getUpcomingAssignments } from "../utils/assignments";
import ClassBlock from "./ClassBlock";

interface CalendarWeekViewProps {
  classes: Class[];
  assignments: Assignment[];
}

export default function CalendarWeekView({
  classes,
  assignments,
}: CalendarWeekViewProps) {
  const daysOfWeek = [
    { short: "Mon", full: "Monday" },
    { short: "Tue", full: "Tuesday" },
    { short: "Wed", full: "Wednesday" },
    { short: "Thu", full: "Thursday" },
    { short: "Fri", full: "Friday" },
    { short: "Sat", full: "Saturday" },
    { short: "Sun", full: "Sunday" },
  ];

  // Generate time slots from 8 AM to 10 PM (14 hours)
  const timeSlots = generateTimeSlots(8, 22);

  /* Get classes for a specific day */
  function getClassesForDay(dayShort: string): Class[] {
    return classes.filter((c) => c.daysOfWeek.includes(dayShort));
  }

  return (
    <View style={calendarStyles.container}>
      {/* Scrollable calendar grid with header */}
      <ScrollView style={calendarStyles.scrollView}>
        <ScrollView horizontal showsHorizontalScrollIndicator={true}>
          <View>
            {/* Header with days - SCROLLS WITH CONTENT */}
            <View style={calendarStyles.header}>
              <View style={calendarStyles.timeColumn}>
                <Text style={calendarStyles.headerText}>Time</Text>
              </View>
              {daysOfWeek.map((day) => (
                <View key={day.short} style={calendarStyles.dayColumn}>
                  <Text style={calendarStyles.headerText}>{day.short}</Text>
                </View>
              ))}
            </View>

            {/* Calendar Grid */}
            <View style={calendarStyles.grid}>
              {/* Time slots on the left */}
              <View style={calendarStyles.timeColumn}>
                {timeSlots.map((time, index) => (
                  <View key={index} style={calendarStyles.timeSlot}>
                    <Text style={calendarStyles.timeText}>{time}</Text>
                  </View>
                ))}
              </View>

              {/* Day columns with classes */}
              {daysOfWeek.map((day) => {
                const dayClasses = getClassesForDay(day.short);

                return (
                  <View key={day.short} style={calendarStyles.dayColumnContent}>
                    {/* Background time slots */}
                    {timeSlots.map((_, index) => (
                      <View
                        key={index}
                        style={calendarStyles.timeSlotBackground}
                      />
                    ))}

                    {/* Classes positioned absolutely */}
                    {dayClasses.map((classItem) => {
                      const { top, height } = calculateClassPosition(
                        classItem.startTime,
                        classItem.endTime
                      );

                      return (
                        <ClassBlock
                          key={classItem.id}
                          classItem={classItem}
                          top={top}
                          height={height}
                        />
                      );
                    })}
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Assignments section at bottom */}
        {assignments.length > 0 && (
          <View style={calendarStyles.assignmentsSection}>
            <Text style={calendarStyles.assignmentsTitle}>
              📝 Upcoming Assignments
            </Text>
            {getUpcomingAssignments(assignments, 5).map((assignment) => (
              <View key={assignment.id} style={calendarStyles.assignmentItem}>
                <View style={{ flex: 1 }}>
                  <Text style={calendarStyles.assignmentTitle}>
                    {assignment.title}
                  </Text>
                  <Text style={calendarStyles.assignmentCourse}>
                    {assignment.courseCode} • Due: {assignment.dueDate}{" "}
                    {assignment.dueTime}
                  </Text>
                </View>
                <View
                  style={[
                    calendarStyles.priorityBadge,
                    {
                      backgroundColor: getPriorityColor(
                        assignment.priority || "Low"
                      ),
                    },
                  ]}
                >
                  <Text style={calendarStyles.priorityText}>
                    {assignment.priority}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
