export type MuscleGroup =
  | 'ALL'
  | 'TOTAL BODY RELEASE'
  | 'HIP MOBILITY'
  | 'BACK MOBILITY'
  | 'CHEST'
  | 'BACK'
  | 'LEGS'
  | 'SHOULDERS'
  | 'ARMS';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Exercise {
  id: string;
  name: string;
  category: Exclude<MuscleGroup, 'ALL'>;
  equipment: string;
  description: string;
  defaultLevel: string;
  difficulty: DifficultyLevel;
  targetReps: string;
  durationSec?: number;
  aliases: string[];
  videoUrl: string;
  verifiedTimestampSec: number;
  timestampLabel: string;
}

export interface InclineLevel {
  level: number;
  angle: string;
  bodyWeightPct: number;
}

export interface BandOption {
  id: string;
  label: string;
  tension: number;
}

export interface WorkoutLogEntry {
  id: number;
  exerciseId: string;
  date: string;
  exercise: string;
  equipment: string;
  setting: string;
  workingLoad: string;
  activationReps: number;
  miniSets: number[];
  totalReps: number;
}

export interface ActiveSessionState {
  selectedMuscle: MuscleGroup;
  selectedExerciseId: string;
  tgLevel: number;
  selectedBand: string;
  userBodyWeightStr: string;
  activationReps: number;
  activationDone: boolean;
  miniSets: number[];
  selectedReps: number | null;
  isCompleted: boolean;
  restEndTimeMs: number | null;
}
