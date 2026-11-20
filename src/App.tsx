import { useEffect, useMemo, useState } from 'react';
import FilterBar from './components/FilterBar';
import ExerciseCard from './components/ExerciseCard';
import WorkoutPlayer from './components/WorkoutPlayer';
import HistoryView from './components/HistoryView';
import { BAND_OPTIONS, EXERCISES, TG_FIT_LEVELS } from './data/exercises';
import { BandOption, MuscleGroup, WorkoutLogEntry } from './types/workout';
import { calculateWorkingLoad } from './utils/calculations';
import { loadWorkoutHistory, saveWorkoutHistory } from './utils/storage';

export default function App() {
  const [selectedMuscle, setSelectedMuscle] = useState<MuscleGroup>('ALL');
  const [selectedExerciseId, setSelectedExerciseId] = useState(EXERCISES[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [levelNumber, setLevelNumber] = useState(1);
  const [bandId, setBandId] = useState('none');
  const [bodyWeight, setBodyWeight] = useState(150);
  const [history, setHistory] = useState<WorkoutLogEntry[]>(loadWorkoutHistory);

  const selectedExercise = EXERCISES.find((exercise) => exercise.id === selectedExerciseId) ?? EXERCISES[0];
  const selectedLevel = TG_FIT_LEVELS.find((level) => level.level === levelNumber) ?? TG_FIT_LEVELS[0];
  const selectedBand = BAND_OPTIONS.find((band) => band.id === bandId) ?? BAND_OPTIONS[0];

  const filteredExercises = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return EXERCISES.filter((exercise) => {
      const matchesGroup = selectedMuscle === 'ALL' || exercise.category === selectedMuscle;
      const searchable = [exercise.name, exercise.description, exercise.category, ...exercise.aliases].join(' ').toLowerCase();
      return matchesGroup && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [query, selectedMuscle]);

  useEffect(() => {
    saveWorkoutHistory(history);
  }, [history]);

  function addToHistory(entry: WorkoutLogEntry) {
    setHistory((entries) => [entry, ...entries]);
  }

  function clearHistory() {
    setHistory([]);
  }

  return (
    <main className="mx-auto min-h-screen max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-sm font-bold uppercase tracking-[0.25em] text-brand-cyan">MyoRep Protocol</p>
          <h1 className="mt-2 text-4xl font-black tracking-tight text-white sm:text-5xl">KineticForge</h1>
          <p className="mt-2 max-w-2xl text-slate-300">Choose an exercise, set your equipment, and log each training session.</p>
        </div>
        <div className="rounded-xl bg-brand-surface px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-wider text-slate-400">Estimated working load</p>
          <p className="font-mono text-2xl font-extrabold text-brand-amber">{calculateWorkingLoad(bodyWeight, selectedLevel, selectedBand)} lbs</p>
        </div>
      </header>

      <section className="grid gap-4 rounded-2xl border border-slate-700 bg-brand-surface p-5 sm:grid-cols-3" aria-label="Workout settings">
        <label className="text-sm font-semibold text-slate-200">Body weight (lbs)
          <input type="number" min="1" value={bodyWeight} onChange={(event) => setBodyWeight(Math.max(1, Number(event.target.value)))} className="mt-2 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white" />
        </label>
        <label className="text-sm font-semibold text-slate-200">Total Gym level
          <select value={levelNumber} onChange={(event) => setLevelNumber(Number(event.target.value))} className="mt-2 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white">
            {TG_FIT_LEVELS.map((level) => <option key={level.level} value={level.level}>Level {level.level} · {level.angle}</option>)}
          </select>
        </label>
        <label className="text-sm font-semibold text-slate-200">Resistance band
          <select value={bandId} onChange={(event) => setBandId(event.target.value)} className="mt-2 block w-full rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-white">
            {BAND_OPTIONS.map((band: BandOption) => <option key={band.id} value={band.id}>{band.label}</option>)}
          </select>
        </label>
      </section>

      <FilterBar selected={selectedMuscle} onChange={setSelectedMuscle} query={query} onQueryChange={setQuery} />
      <section aria-label="Exercises" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredExercises.map((exercise) => <ExerciseCard key={exercise.id} exercise={exercise} selected={exercise.id === selectedExercise?.id} onSelect={() => setSelectedExerciseId(exercise.id)} />)}
        {filteredExercises.length === 0 && <p className="col-span-full rounded-xl bg-brand-surface p-6 text-slate-300">No exercises match these filters.</p>}
      </section>
      {selectedExercise && <WorkoutPlayer key={selectedExercise.id} exercise={selectedExercise} level={selectedLevel} band={selectedBand} bodyWeight={bodyWeight} onSave={addToHistory} />}
      <HistoryView entries={history} onClear={clearHistory} />
      <footer className="text-center text-xs text-slate-500">Training information is for general fitness use. Adjust or stop if you experience pain.</footer>
    </main>
  );
}
