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
      {timeUnits.map((unit, index) => (
        <Card
          key={unit.label}
          className="relative overflow-hidden armor-plate border-2 border-primary/50 p-6 text-center backdrop-blur-sm bg-black/40"
        >
          {/* Angular corner accent */}
          <div className="absolute top-0 right-0 w-10 h-10 bg-accent/30 angular-border" />
          <div className="absolute bottom-0 left-0 w-10 h-10 bg-primary/20 angular-border rotate-180" />
          
          <div className="relative z-10">
            <div className="text-4xl xl:text-5xl font-bold text-primary mb-2 font-mono drop-shadow-lg">
              {String(unit.value).padStart(2, '0')}
            </div>
            <div className="text-xs xl:text-sm font-semibold text-foreground/70 tracking-widest">
              {unit.label}
            </div>
          </div>

          {/* Tactical grid background */}
          <div className="absolute inset-0 tactical-grid opacity-30" />
          
          {/* Metallic shine effect */}
          <div className="absolute inset-0 metallic-armor opacity-20" />
        </Card>
      ))}
    </div>
  );
}
