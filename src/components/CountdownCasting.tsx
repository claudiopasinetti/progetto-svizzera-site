import { useEffect, useState } from 'react';

interface CountdownCastingProps {
  targetIso: string;
  expiredLabel?: string;
  hideAfterMs?: number;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
}

function calc(target: number): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    expired: false,
  };
}

const pad = (n: number) => n.toString().padStart(2, '0');

export default function CountdownCasting({
  targetIso,
  expiredLabel = 'Iscrizioni chiuse',
  hideAfterMs = 0,
  className = '',
}: CountdownCastingProps) {
  const target = new Date(targetIso).getTime();
  const [time, setTime] = useState<TimeLeft>(() => calc(target));

  useEffect(() => {
    if (time.expired) return;
    const id = setInterval(() => setTime(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target, time.expired]);

  if (time.expired && hideAfterMs === -1) return null;

  if (time.expired) {
    return <span className={className}>{expiredLabel}</span>;
  }

  return (
    <span
      className={className}
      role="timer"
      aria-live="polite"
      aria-label={`Mancano ${time.days} giorni e ${time.hours} ore alla deadline`}
    >
      <span className="font-bold">{time.days}g</span> · {pad(time.hours)}:{pad(time.minutes)}:{pad(time.seconds)}
    </span>
  );
}
