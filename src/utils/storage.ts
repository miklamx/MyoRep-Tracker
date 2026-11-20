import { WorkoutLogEntry } from '../types/workout';

const HISTORY_KEY = 'kineticforge-workout-history';

export function loadWorkoutHistory(): WorkoutLogEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    const stored: unknown = JSON.parse(window.localStorage.getItem(HISTORY_KEY) ?? '[]');
    return Array.isArray(stored) ? (stored as WorkoutLogEntry[]) : [];
  } catch {
    return [];
  }
}

export function saveWorkoutHistory(entries: WorkoutLogEntry[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
  } catch {
    // Storage can be unavailable in private browsing or when quota is exhausted.
  }
}
