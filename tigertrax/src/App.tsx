// App.tsx
// Updated TigerTraX - Main navigation hub

import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";

import { styles } from "./styles/styles";
import { cardStyles } from "./styles/cardStyles";
import AuthPage from "./pages/Auth";

// NEW imports for updated functionality
import AddClassScreen from "./pages/AddClass";
import AddAssignmentScreen from "./pages/AddAssignment";
import ViewClassesScreen from "./pages/ViewClasses";
import { AppData } from "./data/AppData";
import { requestNotificationPermissions } from "./services/notificationService";

/*
==========================================================
TigerTraX - RIT Schedule Management App
----------------------------------------------------------
Updated Architecture:
  Login/Signup → Home → {
    - Add Class (course schedule)
    - Add Assignment (homework/projects)  
    - View All (combined view + iCal export)
  }
==========================================================
*/

// Screen types for navigation
type Screen =
  | "login"
  | "signup"
  | "home"
  | "addClass"
  | "addAssignment"
  | "viewAll";

export default function App() {
  // Screen state management
  const [screen, setScreen] = useState<Screen>("login");

  // User state (holds logged-in user's email)
  const [user, setUser] = useState<string | null>(null);

  // load user and data on mount (thanks useEffect)
  useEffect(() => {
    async function loadAppState() {
      try {
        // Request notification permissions
        await requestNotificationPermissions();

        // Set up notification response listener
        const subscription = Notifications.addNotificationResponseReceivedListener(
          (response: Notifications.NotificationResponse) => {
            const data = response.notification.request.content.data;
            console.log("Notification tapped:", data);
            // Could navigate to specific assignment/class here if needed
          }
        );

        const savedUser = await AsyncStorage.getItem("@tigertrax_user");
        if (savedUser) {
          setUser(savedUser);
          setScreen("home");
        }

        await AppData.initialize();

        return () => {
          subscription.remove();
        };
      } 
      
      // just log errors i gotta get ts done
      catch (error) {
        console.error("Failed to load app state:", error);
      }
    }

    loadAppState();
  }, []);

  /* ==========================================================
    AUTHENTICATION HANDLERS
  ========================================================== */

  // Handle successful login/signup
  async function handleLoginSuccess(email: string) {
    try {
      await AsyncStorage.setItem("@tigertrax_user", email);
    } 
    
    catch (error) {
      console.error("Failed to save user:", error);
    }
    setUser(email);
    setScreen("home");
  }

  // Handle logout
  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("@tigertrax_user");
    } 
    
    catch (error) {
      console.error("Failed to clear user:", error);
    }
    // Optional: Clear data on logout
    // AppData.clearAll();
    setUser(null);
    setScreen("login");
  }

  /* ==========================================================
    NAVIGATION HANDLERS
  ========================================================== */

  // Navigate back to home from any screen
  function goToHome() {
    setScreen("home");
  }

  /* ==========================================================
    UTILITY FUNCTIONS
  ========================================================== */

  // Get summary statistics for home screen
  function getStats() {
    const classes = AppData.getClasses();
    const assignments = AppData.getAssignments();
    const pendingAssignments = assignments.filter((a) => !a.completed);

    return {
      classCount: classes.length,
      assignmentCount: pendingAssignments.length,
      totalItems: classes.length + assignments.length,
    };
  }

  /* ==========================================================
    SCREEN ROUTING
  ========================================================== */

  // Auth screens (login/signup)
  if (screen === "login" || screen === "signup") {
    return (
      <AuthPage
        mode={screen}
        onAuthSuccess={handleLoginSuccess}
        onSwitchMode={(m) => setScreen(m)}
      />
    );
  }

  // Add Class screen
  if (screen === "addClass") {
    return <AddClassScreen onBack={goToHome} />;
  }

  // Add Assignment screen
  if (screen === "addAssignment") {
    return <AddAssignmentScreen onBack={goToHome} />;
  }

  // View All screen (combined classes + assignments)
  if (screen === "viewAll") {
    return <ViewClassesScreen onBack={goToHome} />;
  }

  /* ==========================================================
    HOME SCREEN
  ========================================================== */

  const stats = getStats();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.title}>TigerTraX</Text>
      <Text style={styles.subtitle}>Welcome{user ? `, ${user}` : ""}!</Text>

      {/* Quick Stats Bar (only show if user has added items) */}
      {stats.totalItems > 0 && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 20,
            marginBottom: 20,
          }}
        >
          <Text style={cardStyles.cardContent}>
            📚 {stats.classCount} {stats.classCount === 1 ? "Class" : "Classes"}
          </Text>
          <Text style={cardStyles.cardContent}>
            📝 {stats.assignmentCount} Pending
          </Text>
        </View>
      )}

      {/* Main Action Cards */}
      <View style={cardStyles.dashboardContainer}>
        {/* Add Class Card */}
        <TouchableOpacity
          style={cardStyles.card}
          onPress={() => setScreen("addClass")}
        >
          <Text style={cardStyles.cardTitle}>📚 Add Class</Text>
          <Text style={cardStyles.cardContent}>Create your course schedule</Text>
        </TouchableOpacity>

        {/* Add Assignment Card */}
        <TouchableOpacity
          style={cardStyles.card}
          onPress={() => setScreen("addAssignment")}
        >
          <Text style={cardStyles.cardTitle}>📝 Add Assignment</Text>
          <Text style={cardStyles.cardContent}>Track homework and projects</Text>
        </TouchableOpacity>

        {/* View All Card */}
        <TouchableOpacity
          style={cardStyles.card}
          onPress={() => setScreen("viewAll")}
        >
          <Text style={cardStyles.cardTitle}>👁 View All</Text>
          <Text style={cardStyles.cardContent}>
            {stats.totalItems > 0
              ? `See all ${stats.totalItems} ${
                  stats.totalItems === 1 ? "item" : "items"
                }`
              : "View classes & assignments"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Sign Out Button */}
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
