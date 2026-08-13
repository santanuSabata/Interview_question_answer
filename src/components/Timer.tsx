import React, { useEffect, useState, useRef } from 'react';
import { Clock, AlertCircle, PlayCircle, PauseCircle } from 'lucide-react';

interface TimerProps {
  initialMinutes: number; // 0 = disabled / untimed
  onTimeUp: () => void;
  onTimeSpentUpdate?: (seconds: number) => void;
  isPaused?: boolean;
}

export const Timer: React.FC<TimerProps> = ({
  initialMinutes,
  onTimeUp,
  onTimeSpentUpdate,
  isPaused = false,
}) => {
  const isUntimed = initialMinutes <= 0;
  const initialSeconds = isUntimed ? 0 : initialMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(initialSeconds);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);
  const timeUpTriggered = useRef(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setSecondsElapsed((prev) => {
        const next = prev + 1;
        if (onTimeSpentUpdate) onTimeSpentUpdate(next);
        return next;
      });

      if (!isUntimed) {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            if (!timeUpTriggered.current) {
              timeUpTriggered.current = true;
              onTimeUp();
            }
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isPaused, isUntimed, onTimeUp, onTimeSpentUpdate]);

  const formatTime = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    const hours = Math.floor(mins / 60);
    const displayMins = mins % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${displayMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${displayMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isUntimed) {
    return (
      <div className="flex flex-col items-end">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Time Elapsed</span>
        <span className="text-xl font-mono font-bold text-slate-700">{formatTime(secondsElapsed)}</span>
      </div>
    );
  }

  const isWarning = secondsRemaining <= 300 && secondsRemaining > 0; // <= 5 minutes
  const isCritical = secondsRemaining <= 60 && secondsRemaining > 0; // <= 1 minute

  return (
    <div className="flex flex-col items-end">
      <div className="flex items-center gap-1.5 leading-tight">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Time Remaining
        </span>
        {isWarning && (
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-amber-100 text-amber-800 rounded">
            &lt; 5m
          </span>
        )}
      </div>
      <span
        id="timer-display"
        className={`text-xl font-mono font-bold ${
          isCritical 
            ? 'text-red-600 animate-pulse' 
            : isWarning 
            ? 'text-amber-600' 
            : 'text-blue-700'
        }`}
      >
        {formatTime(secondsRemaining)}
      </span>
    </div>
  );
};
