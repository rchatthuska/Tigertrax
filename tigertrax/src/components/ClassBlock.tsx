// components/ClassBlock.tsx
// reusable class block component for calendar
import React from "react";
import { View, Text } from "react-native";
import { Class } from "../types/types";
import { calendarStyles, CALENDAR_CONSTANTS } from "../styles/calendarStyles";
import { getColorByHash, addOpacity } from "../utils/colors";

// properly sizes the class blocks
interface ClassBlockProps {
  classItem: Class;
  top: number;
  height: number;
}

/**
 * builds a class block
 * @param \{classItem, top, height\}
 * @returns View block containing class info and a proper sizing
 */
export default function ClassBlock({ classItem, top, height }: ClassBlockProps) {
  const color = getColorByHash(classItem.courseCode);
  const backgroundColor = addOpacity(color, CALENDAR_CONSTANTS.CLASS_BG_OPACITY);

  return (
    <View
      style={[
        calendarStyles.classBlock,
        {
          top,
          height: Math.max(height, CALENDAR_CONSTANTS.CLASS_BLOCK_MIN_HEIGHT),
          backgroundColor,
          borderLeftColor: color,
        },
      ]}
    >
      <Text style={calendarStyles.classCode} numberOfLines={1}>
        {classItem.courseCode}
      </Text>
      <Text style={calendarStyles.className} numberOfLines={2}>
        {classItem.name}
      </Text>
      <Text style={calendarStyles.classLocation} numberOfLines={1}>
        {classItem.building} {classItem.room}
      </Text>
      <Text style={calendarStyles.classTime} numberOfLines={1}>
        {classItem.startTime}
      </Text>
    </View>
  );
}
