import { useEffect, useState } from 'react';

export function useDeadlineTimer() {
  const [deadline, setDeadline] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (deadline === null) return;
    const timerId = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(timerId);
  }, [deadline]);

  const remainingSeconds = deadline === null ? 0 : Math.max(0, Math.ceil((deadline - now) / 1000));

  useEffect(() => {
    if (deadline !== null && remainingSeconds === 0) setDeadline(null);
  }, [deadline, remainingSeconds]);

  function start(seconds: number) {
    const duration = Math.max(0, Math.floor(seconds));
    setNow(Date.now());
    setDeadline(duration > 0 ? Date.now() + duration * 1000 : null);
  }

  function stop() {
    setDeadline(null);
  }

  return { remainingSeconds, isRunning: deadline !== null, start, stop };
}
