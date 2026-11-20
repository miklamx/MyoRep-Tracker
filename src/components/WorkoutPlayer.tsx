import { useEffect, useState } from 'react';
import { BandOption, Exercise, InclineLevel, WorkoutLogEntry } from '../types/workout';
import { formatDuration } from '../utils/calculations';
import { playTone } from '../utils/audio';
import { getYouTubeEmbedUrl } from '../utils/youtube';
import { useDeadlineTimer } from '../hooks/useDeadlineTimer';

interface WorkoutPlayerProps {
  exercise: Exercise;
  level: InclineLevel;
  band: BandOption;
  bodyWeight: number;
  onSave: (entry: WorkoutLogEntry) => void;
}

export default function WorkoutPlayer({ exercise, level, band, bodyWeight, onSave }: WorkoutPlayerProps) {
  const timer = useDeadlineTimer();
  const [reps, setReps] = useState(12);
  const [saved, setSaved] = useState(false);
  const embedUrl = getYouTubeEmbedUrl(exercise.videoUrl, exercise.verifiedTimestampSec);

  useEffect(() => {
    setSaved(false);
    timer.stop();
    // Timer methods are stable in behavior; exercise change is the reset trigger.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exercise.id]);

  useEffect(() => {
    if (!timer.isRunning && timer.remainingSeconds === 0 && exercise.durationSec) playTone();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer.isRunning, timer.remainingSeconds]);

  function saveWorkout() {
    const entry: WorkoutLogEntry = {
      id: Date.now(),
      exerciseId: exercise.id,
      date: new Date().toISOString(),
      exercise: exercise.name,
      equipment: exercise.equipment,
      setting: `Level ${level.level} · ${band.label}`,
      workingLoad: `${Math.round(bodyWeight * level.bodyWeightPct + band.tension)} lbs`,
      activationReps: reps,
      miniSets: [],
      totalReps: reps,
    };
    onSave(entry);
    setSaved(true);
  }

  return (
    <section className="rounded-2xl border border-slate-700 bg-brand-surface p-5 sm:p-6" aria-label="Workout player">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-brand-cyan">Now selected</p>
          <h2 className="mt-1 text-xl font-black text-white">{exercise.name}</h2>
          <p className="mt-2 text-sm text-slate-300">{exercise.defaultLevel} · {exercise.targetReps} · {exercise.equipment}</p>
        </div>
        <a className="text-sm font-semibold text-brand-cyan underline" href={exercise.videoUrl} target="_blank" rel="noreferrer">
          Watch video ({exercise.timestampLabel})
        </a>
      </div>

      {embedUrl && (
        <div className="mt-5 aspect-video overflow-hidden rounded-xl bg-slate-950">
          <iframe title={`${exercise.name} demonstration`} src={embedUrl} className="h-full w-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
        </div>
      )}

      <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <p className="text-sm text-slate-300">Session timer</p>
          <p className="font-mono text-4xl font-extrabold text-white" aria-live="polite">{timer.isRunning ? formatDuration(timer.remainingSeconds) : formatDuration(exercise.durationSec ?? 0)}</p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={() => timer.start(exercise.durationSec ?? 45)} className="rounded-lg bg-brand-cyan px-4 py-2 font-bold text-slate-950">Start timer</button>
            <button type="button" onClick={timer.stop} className="rounded-lg bg-slate-700 px-4 py-2 font-semibold text-white">Stop</button>
          </div>
        </div>
        <div className="flex items-end gap-3">
          <label className="text-sm text-slate-300">Reps
            <input type="number" min="0" max="999" value={reps} onChange={(event) => setReps(Math.max(0, Number(event.target.value)))} className="mt-1 block w-24 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white" />
          </label>
          <button type="button" onClick={saveWorkout} disabled={saved} className="rounded-lg bg-brand-amber px-4 py-2 font-bold text-slate-950 disabled:cursor-not-allowed disabled:opacity-60">{saved ? 'Saved' : 'Log workout'}</button>
        </div>
      </div>
    </section>
  );
}
