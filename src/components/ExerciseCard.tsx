import { Exercise } from '../types/workout';

interface ExerciseCardProps {
  exercise: Exercise;
  selected: boolean;
  onSelect: () => void;
}

export default function ExerciseCard({ exercise, selected, onSelect }: ExerciseCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`w-full rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 hover:border-brand-cyan ${selected ? 'border-brand-cyan bg-slate-800' : 'border-slate-700 bg-brand-surface'}`}
    >
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-cyan">{exercise.category}</span>
        <span className="rounded-full bg-slate-700 px-3 py-1 text-xs text-slate-200">{exercise.difficulty}</span>
      </div>
      <h3 className="font-bold leading-snug text-white">{exercise.name}</h3>
      <p className="mt-2 line-clamp-2 text-sm text-slate-300">{exercise.description}</p>
      <p className="mt-4 text-xs text-slate-400">{exercise.equipment} · {exercise.targetReps}</p>
    </button>
  );
}
