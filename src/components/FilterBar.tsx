import { MuscleGroup } from '../types/workout';
import { MUSCLE_GROUPS } from '../data/exercises';

interface FilterBarProps {
  selected: MuscleGroup;
  onChange: (group: MuscleGroup) => void;
  query: string;
  onQueryChange: (query: string) => void;
}

export default function FilterBar({ selected, onChange, query, onQueryChange }: FilterBarProps) {
  return (
    <section className="space-y-4" aria-label="Exercise filters">
      <label className="block">
        <span className="sr-only">Search exercises</span>
        <input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search exercises or muscle groups..."
          className="w-full rounded-xl border border-slate-700 bg-brand-surface px-4 py-3 text-white placeholder:text-slate-400 focus:border-brand-cyan focus:outline-none focus:ring-2 focus:ring-brand-cyan/30"
        />
      </label>
      <div className="flex gap-2 overflow-x-auto pb-2" role="group" aria-label="Filter by muscle group">
        {MUSCLE_GROUPS.map((group) => (
          <button
            key={group}
            type="button"
            onClick={() => onChange(group)}
            aria-pressed={selected === group}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition ${selected === group ? 'bg-brand-cyan text-slate-950' : 'bg-brand-surface text-slate-300 hover:bg-slate-700'}`}
          >
            {group}
          </button>
        ))}
      </div>
    </section>
  );
}
