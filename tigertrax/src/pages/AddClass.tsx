// pages/AddClass.tsx
// Add new class/course to schedule - WITH DATE/TIME PICKERS

import React, { useState } from "react";
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
import { Class } from "../types/types";
import { AppData } from "../data/AppData";
import PageHeader from "../components/PageHeader";
import { scheduleClassReminder } from "../services/notificationService";

export default function AddClassScreen({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    courseCode: "",
    building: "",
    room: "",
    instructor: "",
    notes: "",
  });

  // Time states
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  // Date states
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  /* Toggle day selection */
  function toggleDay(day: string) {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  }

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

  /* Handle time picker change */
  function onStartTimeChange(event: any, selectedTime?: Date) {
    setShowStartTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  }

  function onEndTimeChange(event: any, selectedTime?: Date) {
    setShowEndTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  }

  /* Handle date picker change */
  function onStartDateChange(event: any, selectedDate?: Date) {
    setShowStartDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  }

  function onEndDateChange(event: any, selectedDate?: Date) {
    setShowEndDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  }

  /* Validate and add class */
  function handleAddClass() {
    // Validation
    if (!formData.courseCode || !formData.name) {
      Alert.alert("Error", "Please enter course code and name");
      return;
    }

    if (selectedDays.length === 0) {
      Alert.alert("Error", "Please select at least one day");
      return;
    }

    // Create class object
    const newClass: Class = {
      id: Date.now().toString(),
      name: formData.name,
      courseCode: formData.courseCode,
      building: formData.building,
      room: formData.room,
      startTime: formatTime(startTime),
      endTime: formatTime(endTime),
      daysOfWeek: selectedDays,
      startDate: formatDate(startDate),
      endDate: formatDate(endDate),
      instructor: formData.instructor,
      notes: formData.notes,
    };

    // Add to data store (and send reminder)
    AppData.addClass(newClass);
    scheduleClassReminder(newClass);

    Alert.alert("Success", "Class added successfully!");
    onBack();
  }

  /* Update form field */
  function updateField(field: string, value: string) {
    setFormData({ ...formData, [field]: value });
  }

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="Add Class" onBack={onBack} />
      <ScrollView
        style={formStyles.modalContent}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 20 }} // Proper padding
      >

        {/* Course Code (Required) */}
        <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>Course Code *</Text>
        <TextInput
          placeholder="e.g., SWEN-250"
          value={formData.courseCode}
          onChangeText={(text) => updateField("courseCode", text)}
          style={[styles.input, { marginBottom: 8, width: "100%" }]}
        />

        {/* Class Name (Required) */}
        <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>Class Name *</Text>
        <TextInput
          placeholder="e.g., Software Engineering"
          value={formData.name}
          onChangeText={(text) => updateField("name", text)}
          style={[styles.input, { marginBottom: 8, width: "100%" }]}
        />

        {/* Building & Room - Side by Side */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>Building</Text>
            <TextInput
              placeholder="e.g., Golisano"
              value={formData.building}
              onChangeText={(text) => updateField("building", text)}
              style={[styles.input, { marginBottom: 0 }]}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>Room</Text>
            <TextInput
              placeholder="e.g., 1520"
              value={formData.room}
              onChangeText={(text) => updateField("room", text)}
              style={[styles.input, { marginBottom: 0 }]}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* Times - Side by Side */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>
              Start Time *
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                { justifyContent: "center", marginBottom: 0 },
              ]}
              onPress={() => setShowStartTimePicker(true)}
            >
              <Text style={{ fontSize: 14 }}>🕐 {formatTime(startTime)}</Text>
            </TouchableOpacity>
            {showStartTimePicker && (
              <DateTimePicker
                value={startTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onStartTimeChange}
              />
            )}
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>
              End Time *
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                { justifyContent: "center", marginBottom: 0 },
              ]}
              onPress={() => setShowEndTimePicker(true)}
            >
              <Text style={{ fontSize: 14 }}>🕐 {formatTime(endTime)}</Text>
            </TouchableOpacity>
            {showEndTimePicker && (
              <DateTimePicker
                value={endTime}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onEndTimeChange}
              />
            )}
          </View>
        </View>

        {/* Days Selection (Required) */}
        <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>
          Days of Week *
        </Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          {daysOfWeek.map((day) => (
            <TouchableOpacity
              key={day}
              style={[
                formStyles.dayButton,
                selectedDays.includes(day) && formStyles.dayButtonActive,
                {
                  paddingVertical: 8,
                  paddingHorizontal: 10,
                  marginBottom: 8,
                  minWidth: 45, // Minimum width for each button
                },
              ]}
              onPress={() => toggleDay(day)}
            >
              <Text
                style={[
                  formStyles.dayButtonText,
                  selectedDays.includes(day) && { color: "#fff" },
                  { fontSize: 13 },
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Dates - Side by Side */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <View style={{ flex: 1, marginRight: 5 }}>
            <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>
              Start Date *
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                { justifyContent: "center", marginBottom: 0 },
              ]}
              onPress={() => setShowStartDatePicker(true)}
            >
              <Text style={{ fontSize: 14 }}>📅 {formatDate(startDate)}</Text>
            </TouchableOpacity>
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={onStartDateChange}
              />
            )}
          </View>
          <View style={{ flex: 1, marginLeft: 5 }}>
            <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>
              End Date *
            </Text>
            <TouchableOpacity
              style={[
                styles.input,
                { justifyContent: "center", marginBottom: 0 },
              ]}
              onPress={() => setShowEndDatePicker(true)}
            >
              <Text style={{ fontSize: 14 }}>📅 {formatDate(endDate)}</Text>
            </TouchableOpacity>
            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={onEndDateChange}
              />
            )}
          </View>
        </View>

        {/* Instructor */}
        <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>Instructor</Text>
        <TextInput
          placeholder="e.g., Prof. Smith"
          value={formData.instructor}
          onChangeText={(text) => updateField("instructor", text)}
          style={[styles.input, { marginBottom: 8, width: "100%" }]}
        />

        {/* Notes */}
        <Text style={[formStyles.inputLabel, { marginTop: 5 }]}>Notes</Text>
        <TextInput
          placeholder="Any additional notes"
          value={formData.notes}
          onChangeText={(text) => updateField("notes", text)}
          style={[
            styles.input,
            {
              height: 70,
              textAlignVertical: "top",
              paddingTop: 10,
              marginBottom: 12,
              width: "100%",
            },
          ]}
          multiline
          numberOfLines={3}
          blurOnSubmit={true}
          returnKeyType="done"
          onSubmitEditing={() => Keyboard.dismiss()}
        />

        {/* Action Buttons */}
        <TouchableOpacity
          style={[styles.button, { marginTop: 5, width: "100%" }]}
          onPress={handleAddClass}
        >
          <Text style={styles.buttonText}>Add Class</Text>
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
