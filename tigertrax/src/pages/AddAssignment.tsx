// pages/AddAssignment.tsx
// Add new assignment/homework - WITH DATE/TIME PICKERS

import React, { useState, useEffect } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { styles } from "../styles/styles";
import { formStyles } from "../styles/formStyles";
import { cardStyles } from "../styles/cardStyles";
import { Assignment } from "../types/types";
import { AppData } from "../data/AppData";
import PageHeader from "../components/PageHeader";
import { scheduleAssignmentReminders } from "../services/notificationService";

type Priority = "Low" | "Medium" | "High";

export default function AddAssignmentScreen({
  onBack,
}: {
  onBack: () => void;
}) {
  const [availableCourses, setAvailableCourses] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    courseCode: "",
    description: "",
  });
  const [priority, setPriority] = useState<Priority>("Medium");

  // Date/Time states
  const [dueDateTime, setDueDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Load available courses on mount
  useEffect(() => {
    const classes = AppData.getClasses();
    const courseCodes = classes.map((c) => c.courseCode);
    setAvailableCourses(courseCodes);
  }, []);

  /* Format time to 12-hour format */
  function formatTime(date: Date): string {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? "0" + minutes : minutes;
    return `${hours}:${minutesStr} ${ampm}`;
  }

  /* Format date to MM/DD/YYYY */
  function formatDate(date: Date): string {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month.toString().padStart(2, "0")}/${day
      .toString()
      .padStart(2, "0")}/${year}`;
  }

  /* Handle date picker change */
  function onDateChange(event: any, selectedDate?: Date) {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setDueDateTime(selectedDate);
    }
  }

  /* Handle time picker change */
  function onTimeChange(event: any, selectedTime?: Date) {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      // Combine the date from dueDateTime with the new time
      const newDateTime = new Date(dueDateTime);
      newDateTime.setHours(selectedTime.getHours());
      newDateTime.setMinutes(selectedTime.getMinutes());
      setDueDateTime(newDateTime);
    }
  }

  /* Update form field */
  function updateField(field: string, value: string) {
    setFormData({ ...formData, [field]: value });
  }

  /* Validate and add assignment */
  function handleAddAssignment() {
    // Validation
    if (!formData.title) {
      Alert.alert("Error", "Please enter assignment title");
      return;
    }

    if (!formData.courseCode) {
      Alert.alert("Error", "Please select a course");
      return;
    }

    // Create assignment object
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      title: formData.title,
      courseCode: formData.courseCode,
      dueDate: formatDate(dueDateTime),
      dueTime: formatTime(dueDateTime),
      description: formData.description,
      completed: false,
      priority: priority,
    };

    // Schedule notification reminders and store IDs
    scheduleAssignmentReminders(newAssignment).then((ids) => {
      newAssignment.notificationIds = ids;
      AppData.addAssignment(newAssignment);
    });

    Alert.alert("Success", "Assignment added successfully!");
    onBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Add Assignment" onBack={onBack} />
      <ScrollView
        style={formStyles.modalContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }}
      >
        {/* Assignment Title (Required) */}
        <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>
          Assignment Title *
        </Text>
        <TextInput
          placeholder="e.g., Homework 5"
          value={formData.title}
          onChangeText={(text) => updateField("title", text)}
          style={[styles.input, { marginBottom: 8, width: "100%" }]}
        />

        {/* Course Selection (Required) */}
        <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>Course *</Text>
        {availableCourses.length === 0 ? (
          // no courses, put a placeholder
          <View style={[cardStyles.emptyState, { marginBottom: 8 }]}>
            <Text style={cardStyles.emptyText}>
              No classes added yet.{"\n"}Add a class first!
            </Text>
          </View>
        ) : 
        
        (
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              marginBottom: 8,
            }}
          >
            {availableCourses.map((course) => (
              <TouchableOpacity
                key={course}
                style={[
                  formStyles.dayButton,
                  formData.courseCode === course && formStyles.dayButtonActive,
                  {
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginRight: 8,
                    marginBottom: 8,
                  },
                ]}
                onPress={() => updateField("courseCode", course)}
              >
                <Text
                  style={[
                    formStyles.dayButtonText,
                    formData.courseCode === course && { color: "#fff" },
                    { fontSize: 13 },
                  ]}
                >
                  {course}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Due Date & Time - Side by Side */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>
              Due Date *
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                { justifyContent: "center", marginBottom: 0 },
              ]}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={{ fontSize: 14 }}>📅 {formatDate(dueDateTime)}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dueDateTime}
                mode="date"
                display="default"
                onChange={onDateChange}
              />
            )}
          </View>

          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>
              Due Time *
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                { justifyContent: "center", marginBottom: 0 },
              ]}
              onPress={() => setShowTimePicker(true)}
            >
              <Text style={{ fontSize: 14 }}>🕐 {formatTime(dueDateTime)}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={dueDateTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onTimeChange}
              />
            )}
          </View>
        </View>

        {/* Priority Selection */}
        <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>Priority</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
            width: "100%",
          }}
        >
          {(["Low", "Medium", "High"] as Priority[]).map((p) => (
            <TouchableOpacity
              key={p}
              style={[
                formStyles.typeButton,
                priority === p && formStyles.typeButtonActive,
                { paddingVertical: 8 }, // Smaller buttons
              ]}
              onPress={() => setPriority(p)}
            >
              <Text
                style={[
                  formStyles.typeButtonText,
                  priority === p && { color: "#fff" },
                  { fontSize: 13 }, // Smaller text
                ]}
              >
                {p}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Description */}
        <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>Description</Text>
        <TextInput
          placeholder="Assignment details"
          value={formData.description}
          onChangeText={(text) => updateField("description", text)}
          style={[
            styles.input,
            {
              height: 80,
              textAlignVertical: "top",
              paddingTop: 10,
              marginBottom: 12,
              width: "100%",
            },
          ]}
          multiline
          numberOfLines={4}
          blurOnSubmit={true}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        {/* Action Buttons */}
        <TouchableOpacity
          style={[styles.button, { marginTop: 5, width: "100%" }]}
          onPress={handleAddAssignment}
        >
          <Text style={styles.buttonText}>Add Assignment</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonSecondary,
            { marginTop: 10, marginBottom: 20, width: "100%" },
          ]}
          onPress={onBack}
        >
          <Text style={styles.buttonSecondaryText}>Cancel</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
