import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  targetDate: Date;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const difference = +targetDate - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const timeUnits = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 max-w-4xl mx-auto">
      {timeUnits.map((unit) => (
        <Card
          key={unit.label}
          className="relative overflow-hidden damaged-armor border-2 border-accent/70 p-6 text-center backdrop-blur-sm bg-black/70 bullet-holes cracked-armor shell-casings blood-splatter"
        >
          {/* Heavy blood splatter corners */}
          <div className="absolute top-0 right-0 w-16 h-16 blood-splatter opacity-80" />
          <div className="absolute bottom-0 left-0 w-16 h-16 blood-splatter opacity-70 rotate-180" />
          
          {/* Burn marks */}
          <div className="absolute inset-0 burn-marks opacity-30" />
          
          <div className="relative z-10">
            <div className="text-4xl xl:text-5xl font-bold text-accent mb-2 font-mono drop-shadow-2xl distressed-text">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs xl:text-sm font-semibold text-foreground/70 tracking-widest">
              {unit.label}
            </div>
          </div>

          {/* Combat grid background */}
          <div className="absolute inset-0 combat-grid opacity-35" />
          
          {/* War texture */}
          <div className="absolute inset-0 war-texture opacity-50" />
          
          {/* Heavy shrapnel debris */}
          <div className="absolute inset-0 shrapnel-debris opacity-60" />
          
          {/* Dust particles */}
          <div className="absolute inset-0 dust-particles opacity-40" />
        </Card>
      ))}
    </div>
  );
}
