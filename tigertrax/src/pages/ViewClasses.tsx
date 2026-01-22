// pages/ViewClasses.tsx
// View all classes and assignments in one place

import React, { useState, useEffect } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "../styles/styles";
import { cardStyles } from "../styles/cardStyles";
import { Class, Assignment } from "../types/types";
import { AppData } from "../data/AppData";
import CalendarWeekView from "../components/CalendarWeekView";
import PageHeader from "../components/PageHeader";
import { cancelAssignmentReminders } from "../services/notificationService";

/* ==========================================================
VISUAL STRUCTURE:
┌────────────────────────────────────┐
│ ← Back    View All    [📥 Export]  │
├────────────────────────────────────┤
│ Filter: [All] [Classes] [Assign]   │
├────────────────────────────────────┤
│                                    │
│ 📅 CLASSES (3)                     │
│ ┌──────────────────────────────┐   │
│ │ SWEN-250: Software Eng       │   │
│ │ 🕐 Mon/Wed 9:00-10:50 AM     │   │
│ │ 📍 Golisano 1520             │   │
│ │ 👤 Prof. Smith               │   │
│ └──────────────────────────────┘   │
│                                    │
│ 📝 ASSIGNMENTS (2)                 │
│ ┌──────────────────────────────┐   │
│ │ Homework 5 [High Priority]   │   │
│ │ 📚 SWEN-250                  │   │
│ │ ⏰ Due: 12/15/2025 11:59 PM  │   │
│ │ [Mark Complete]              │   │
│ └──────────────────────────────┘   │
└────────────────────────────────────┘
========================================================== */

type FilterType = "All" | "Classes" | "Assignments";
type ViewMode = "list" | "calendar";

export default function ViewClassesScreen({ onBack }: { onBack: () => void }) {
  const [classes, setClasses] = useState<Class[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [filter, setFilter] = useState<FilterType>("All");
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  // Load data on mount and refresh
  useEffect(() => {
    loadData();
  }, []);

  function loadData() {
    setClasses(AppData.getClasses());
    setAssignments(AppData.getAssignments());
  }

  /* Delete class */
  function handleDeleteClass(id: string) {
    Alert.alert("Delete Class", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          AppData.removeClass(id);
          loadData();
        },
      },
    ]);
  }

  /* Delete assignment */
  function handleDeleteAssignment(id: string) {
    Alert.alert("Delete Assignment", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          AppData.removeAssignment(id);
          loadData();
        },
      },
    ]);
  }

  /* Toggle assignment completion */
  function handleToggleComplete(id: string) {
    const assignment = assignments.find((a) => a.id === id);
    if (assignment) {
      // Cancel notifications when marking complete
      if (!assignment.completed && assignment.notificationIds?.length) {
        cancelAssignmentReminders(assignment.notificationIds);
      }
      AppData.updateAssignment(id, { completed: !assignment.completed });
      loadData();
    }
  }

  /* Get priority color */
  function getPriorityColor(priority?: "Low" | "Medium" | "High"): string {
    switch (priority) {
      case "High":
        return "#ef4444";
      case "Medium":
        return "#f59e0b";
      case "Low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  }

  /* Filter display logic */
  const showClasses = filter === "All" || filter === "Classes";
  const showAssignments = filter === "All" || filter === "Assignments";

  return (
    <SafeAreaView style={styles.container}>
      <PageHeader title="View All" onBack={onBack} />

      {/* View Mode Toggle - List or Calendar */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          gap: 10,
          paddingHorizontal: 20,
          marginTop: 15,
          marginBottom: 10,
        }}
      >
        <TouchableOpacity
          style={[
            {
              flex: 1,
              paddingVertical: 12,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: viewMode === "list" ? "#ea580c" : "#e5e7eb",
              backgroundColor: viewMode === "list" ? "#ea580c" : "#ffffff",
              alignItems: "center",
            },
          ]}
          onPress={() => setViewMode("list")}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: viewMode === "list" ? "#ffffff" : "#4b5563",
            }}
          >
            📋 List View
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            {
              flex: 1,
              paddingVertical: 12,
              borderRadius: 8,
              borderWidth: 2,
              borderColor: viewMode === "calendar" ? "#ea580c" : "#e5e7eb",
              backgroundColor: viewMode === "calendar" ? "#ea580c" : "#ffffff",
              alignItems: "center",
            },
          ]}
          onPress={() => setViewMode("calendar")}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              color: viewMode === "calendar" ? "#ffffff" : "#4b5563",
            }}
          >
            📅 Calendar View
          </Text>
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering: Calendar View or List View */}
      {viewMode === "calendar" ? (
        // CALENDAR VIEW
        <CalendarWeekView classes={classes} assignments={assignments} />
      ) : (
        // LIST VIEW
        <>
          {/* Filter Buttons */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 15,
              paddingHorizontal: 20,
              gap: 10,
            }}
          >
            {(["All", "Classes", "Assignments"] as FilterType[]).map((f) => (
              <TouchableOpacity
                key={f}
                style={[
                  {
                    flex: 1,
                    paddingVertical: 12,
                    paddingHorizontal: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: filter === f ? "#ea580c" : "#e5e7eb",
                    backgroundColor: filter === f ? "#ea580c" : "#ffffff",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                ]}
                onPress={() => setFilter(f)}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: filter === f ? "#ffffff" : "#4b5563",
                  }}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <ScrollView>
            {/* Classes Section */}
            {showClasses && (
              <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <Text style={cardStyles.cardTitle}>
                  📅 CLASSES ({classes.length})
                </Text>

                {classes.length === 0 ? (
                  <View style={cardStyles.emptyState}>
                    <Text style={cardStyles.emptyText}>No classes added yet</Text>
                  </View>
                ) : (
                  classes.map((classItem) => (
                    <View key={classItem.id} style={cardStyles.card}>
                      {/* Header */}
                      <View style={cardStyles.cardHeader}>
                        <Text style={cardStyles.courseCode}>
                          {classItem.courseCode}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleDeleteClass(classItem.id)}
                        >
                          <Text style={cardStyles.deleteButton}>✕</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Content */}
                      <Text style={cardStyles.className}>{classItem.name}</Text>

                      <Text style={cardStyles.cardDetail}>
                        🕐 {classItem.daysOfWeek.join(", ")}{" "}
                        {classItem.startTime} - {classItem.endTime}
                      </Text>

                      <Text style={cardStyles.cardDetail}>
                        📍 {classItem.building} {classItem.room}
                      </Text>

                      {classItem.instructor && (
                        <Text style={cardStyles.cardDetail}>
                          👤 {classItem.instructor}
                        </Text>
                      )}

                      <Text style={cardStyles.cardDetail}>
                        📆 {classItem.startDate} - {classItem.endDate}
                      </Text>

                      {classItem.notes && (
                        <Text style={cardStyles.cardDetail}>
                          📝 {classItem.notes}
                        </Text>
                      )}
                    </View>
                  ))
                )}
              </View>
            )}

            {/* Assignments Section */}
            {showAssignments && (
              <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
                <Text style={cardStyles.cardTitle}>
                  📝 ASSIGNMENTS ({assignments.length})
                </Text>

                {assignments.length === 0 ? (
                  <View style={cardStyles.emptyState}>
                    <Text style={cardStyles.emptyText}>
                      No assignments added yet
                    </Text>
                  </View>
                ) : (
                  assignments.map((assignment) => (
                    <View
                      key={assignment.id}
                      style={[
                        cardStyles.card,
                        assignment.completed && { opacity: 0.6 },
                      ]}
                    >
                      {/* Header */}
                      <View style={cardStyles.cardHeader}>
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={[
                              cardStyles.className,
                              assignment.completed && {
                                textDecorationLine: "line-through",
                              },
                            ]}
                          >
                            {assignment.title}
                          </Text>
                          <View
                            style={{
                              marginLeft: 8,
                              paddingHorizontal: 8,
                              paddingVertical: 2,
                              backgroundColor: getPriorityColor(
                                assignment.priority
                              ),
                              borderRadius: 4,
                            }}
                          >
                            <Text style={{ color: "#fff", fontSize: 10 }}>
                              {assignment.priority}
                            </Text>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleDeleteAssignment(assignment.id)}
                        >
                          <Text style={cardStyles.deleteButton}>✕</Text>
                        </TouchableOpacity>
                      </View>

                      {/* Content */}
                      <Text style={cardStyles.cardDetail}>
                        📚 {assignment.courseCode}
                      </Text>

                      <Text style={cardStyles.cardDetail}>
                        ⏰ Due: {assignment.dueDate} {assignment.dueTime}
                      </Text>

                      {assignment.description && (
                        <Text style={cardStyles.cardDetail}>
                          {assignment.description}
                        </Text>
                      )}

                      {/* Complete Button */}
                      <TouchableOpacity
                        style={[
                          styles.button,
                          {
                            marginTop: 10,
                            width: "auto",
                            backgroundColor: assignment.completed
                              ? "#10b981"
                              : "#ea580c",
                          },
                        ]}
                        onPress={() => handleToggleComplete(assignment.id)}
                      >
                        <Text style={styles.buttonText}>
                          {assignment.completed
                            ? "✓ Completed"
                            : "Mark Complete"}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))
                )}
              </View>
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}
