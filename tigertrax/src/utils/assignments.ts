// utils/assignments.ts
// assignment filtering and utility functions

import { Assignment } from "../types/types";

/**
 * get upcoming assignments, limited to a count
 */
export function getUpcomingAssignments(
  assignments: Assignment[],
  limit: number = 5
): Assignment[] {
  return assignments
    .filter((a) => !a.completed)
    .slice(0, limit);
}

/**
 * sort assignments by due date
 */
export function sortAssignmentsByDueDate(assignments: Assignment[]): Assignment[] {
  return [...assignments].sort((a, b) => {
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
}