import { WorkoutLogEntry } from '../types/workout';

interface HistoryViewProps {
  entries: WorkoutLogEntry[];
  onClear: () => void;
}

export default function HistoryView({ entries, onClear }: HistoryViewProps) {
  return (
    <section className="rounded-2xl border border-slate-700 bg-brand-surface p-5" aria-label="Workout history">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-white">Workout history</h2>
          <p className="text-sm text-slate-400">{entries.length} logged {entries.length === 1 ? 'session' : 'sessions'}</p>
        </div>
        {entries.length > 0 && <button type="button" onClick={onClear} className="text-sm font-semibold text-brand-cyan underline">Clear history</button>}
      </div>
      {entries.length === 0 ? (
        <p className="mt-4 text-sm text-slate-300">Your completed sessions will appear here.</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-700">
          {entries.map((entry) => (
            <li key={entry.id} className="py-4 first:pt-0 last:pb-0">
              <p className="font-semibold text-white">{entry.exercise}</p>
              <p className="mt-1 text-sm text-slate-300">{new Date(entry.date).toLocaleString()} · {entry.totalReps} reps</p>
              <p className="text-xs text-slate-400">{entry.setting} · {entry.workingLoad}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
