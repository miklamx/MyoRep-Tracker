export function playTone(frequency = 660, durationMs = 180): void {
  if (typeof window === 'undefined' || !('AudioContext' in window)) return;

  try {
    const context = new window.AudioContext();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.08, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + durationMs / 1000);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start();
    oscillator.stop(context.currentTime + durationMs / 1000);
    oscillator.onended = () => void context.close();
  } catch {
    // Audio is an enhancement; unsupported or blocked audio should not stop a workout.
  }
}
