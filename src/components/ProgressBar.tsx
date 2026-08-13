import React from 'react';
import { CheckCircle2, Bookmark } from 'lucide-react';

interface ProgressBarProps {
  currentIndex: number;
  totalQuestions: number;
  answeredCount: number;
  reviewedCount: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentIndex,
  totalQuestions,
  answeredCount,
  reviewedCount,
}) => {
  const currentStep = currentIndex + 1;
  const progressPercentage = totalQuestions > 0 
    ? Math.round((currentStep / totalQuestions) * 100) 
    : 0;

  return (
    <div className="mb-4">
      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-600 transition-all duration-300 ease-out"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      <div className="flex justify-between items-center mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
        <div className="flex items-center gap-3">
          <span>Progress</span>
          <span className="text-slate-500 font-semibold lowercase">
            ({answeredCount} answered{reviewedCount > 0 ? `, ${reviewedCount} review` : ''})
          </span>
        </div>
        <span>{progressPercentage}% Completed</span>
      </div>
    </div>
  );
};
