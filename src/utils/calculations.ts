import { BandOption, InclineLevel } from '../types/workout';

export function calculateWorkingLoad(bodyWeight: number, level: InclineLevel, band: BandOption): number {
  if (!Number.isFinite(bodyWeight) || bodyWeight <= 0) return band.tension;
  return Math.round(bodyWeight * level.bodyWeightPct + band.tension);
}

export function formatDuration(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}
