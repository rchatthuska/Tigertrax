// data/AppData.ts
// Centralized data management for classes and assignments
// i added persistence so we can automatically save to and load from local storage
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Class, Assignment } from "../types/types";
import { sortAssignmentsByDueDate } from "../utils/assignments";

const STORAGE_KEYS = {
  CLASSES: "@tigertrax_classes",
  ASSIGNMENTS: "@tigertrax_assignments",
};

/* ==========================================================
DATA STORE WITH AUTOMATIC PERSISTENCE
========================================================== */
class AppDataStore {
  private classes: Class[] = [];
  private assignments: Assignment[] = [];
  private isLoaded = false;

  /* init storage */
  async initialize() {
    if (this.isLoaded) return;

    // the if chain of doom and despair
    try {
      const [classesData, assignmentsData] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.CLASSES),
        AsyncStorage.getItem(STORAGE_KEYS.ASSIGNMENTS),
      ]);

      // if class data not null parse
      if (classesData) {
        this.classes = JSON.parse(classesData);
      }

      // if ASSIGNMENT DATA not null parse
      if (assignmentsData) {
        this.assignments = JSON.parse(assignmentsData);
      }

      // mark loaded
      this.isLoaded = true;
    } 
    
    // any errors we don't care. there shouldn't be any
    catch (error) {
      console.error("Failed to load app data:", error);
      this.isLoaded = true;
    }
  }

  /* helper to save classes to storage */
  private async saveClasses() {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.CLASSES,
        JSON.stringify(this.classes)
      );
    } catch (error) {
      console.error("Failed to save classes:", error);
    }
  }

  /* helper to save ASSIGNMENTS to storage */
  private async saveAssignments() {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.ASSIGNMENTS,
        JSON.stringify(this.assignments)
      );
    } catch (error) {
      console.error("Failed to save assignments:", error);
    }
  }

  /* CLASS METHODS */
  async addClass(classItem: Class) {
    this.classes.push(classItem);
    await this.saveClasses();
  }

  getClasses(): Class[] {
    return [...this.classes];
  }

  async removeClass(id: string) {
    this.classes = this.classes.filter((c) => c.id !== id);
    await this.saveClasses();
  }

  async updateClass(id: string, updates: Partial<Class>) {
    const index = this.classes.findIndex((c) => c.id === id);
    if (index !== -1) {
      this.classes[index] = { ...this.classes[index], ...updates };
      await this.saveClasses();
    }
  }

  /* ASSIGNMENT METHODS */
  async addAssignment(assignment: Assignment) {
    this.assignments.push(assignment);
    await this.saveAssignments();
  }

  getAssignments(): Assignment[] {
    return [...this.assignments];
  }

  async removeAssignment(id: string) {
    this.assignments = this.assignments.filter((a) => a.id !== id);
    await this.saveAssignments();
  }

  async updateAssignment(id: string, updates: Partial<Assignment>) {
    const index = this.assignments.findIndex((a) => a.id === id);
    if (index !== -1) {
      this.assignments[index] = { ...this.assignments[index], ...updates };
      await this.saveAssignments();
    }
  }

  /* UTILITY METHODS */
  getUpcomingAssignments(): Assignment[] {
    return sortAssignmentsByDueDate(
      this.assignments.filter((a) => !a.completed)
    );
  }

  getClassByCourseCode(courseCode: string): Class | undefined {
    return this.classes.find((c) => c.courseCode === courseCode);
  }

  getAllData() {
    return {
      classes: this.getClasses(),
      assignments: this.getAssignments(),
    };
  }

  async clearAll() {
    this.classes = [];
    this.assignments = [];
    await Promise.all([
      AsyncStorage.removeItem(STORAGE_KEYS.CLASSES),
      AsyncStorage.removeItem(STORAGE_KEYS.ASSIGNMENTS),
    ]);
  }
}

// Export singleton instance
export const AppData = new AppDataStore();