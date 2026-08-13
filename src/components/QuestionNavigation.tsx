import React from 'react';
import { Question } from '../types';
import { Check } from 'lucide-react';

interface QuestionNavigationProps {
  questions: Question[];
  currentIndex: number;
  userAnswers: Record<number, string[]>;
  reviewStatus: Record<number, boolean>;
  onSelectQuestion: (index: number) => void;
  onSubmitClick: () => void;
}

export const QuestionNavigation: React.FC<QuestionNavigationProps> = ({
  questions,
  currentIndex,
  userAnswers,
  reviewStatus,
  onSelectQuestion,
  onSubmitClick,
}) => {
  const total = questions.length;
  
  // Calculate counts
  let answeredCount = 0;
  let reviewCount = 0;
  let notAnsweredCount = 0;

  questions.forEach((q) => {
    const isMarked = !!reviewStatus[q.id];
    const answers = userAnswers[q.id] || [];
    const hasAns = answers.length > 0 && answers.some((a) => a.trim().length > 0);

    if (isMarked) {
      reviewCount++;
    } else if (hasAns) {
      answeredCount++;
    } else {
      notAnsweredCount++;
    }
  });

  return (
    <div className="bg-slate-50 p-6 flex flex-col rounded-2xl border border-slate-200 shadow-2xs h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
          Question Navigator
        </h3>
        <span className="text-xs font-bold font-mono text-slate-500 bg-slate-200/80 px-2 py-0.5 rounded-full">
          {answeredCount}/{total}
        </span>
      </div>

      {/* Question Number Matrix */}
      <div className="flex-1 overflow-y-auto max-h-[380px] pr-1 py-1 mb-6 custom-scrollbar">
        <div className="grid grid-cols-5 gap-2.5">
          {questions.map((question, index) => {
            const isCurrent = index === currentIndex;
            const isMarked = !!reviewStatus[question.id];
            const answers = userAnswers[question.id] || [];
            const isAnswered = answers.length > 0 && answers.some((a) => a.trim().length > 0);

            // Styling determination matching Professional Polish theme
            let btnClass = 'bg-slate-200 text-slate-500 hover:bg-slate-300/80'; // Default: Pending (Grey)

            if (isMarked) {
              btnClass = 'bg-amber-400 text-white font-bold hover:bg-amber-500';
            } else if (isAnswered) {
              btnClass = 'bg-emerald-500 text-white font-bold hover:bg-emerald-600';
            }

            let activeClass = '';
            if (isCurrent) {
              if (isAnswered) {
                activeClass = 'ring-2 ring-offset-2 ring-emerald-500 scale-105 z-10 shadow-md';
              } else if (isMarked) {
                activeClass = 'ring-2 ring-offset-2 ring-amber-400 scale-105 z-10 shadow-md';
              } else {
                activeClass = 'border-2 border-blue-600 bg-white text-blue-700 shadow-md ring-2 ring-offset-2 ring-blue-600 scale-105 z-10';
              }
            }

            return (
              <button
                key={question.id}
                id={`palette-btn-q-${index + 1}`}
                onClick={() => onSelectQuestion(index)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xs transition-all active:scale-95 cursor-pointer ${btnClass} ${activeClass}`}
                title={`Question ${index + 1}: ${
                  isMarked ? 'Marked for Review' : isAnswered ? 'Answered' : 'Pending'
                }`}
              >
                {String(index + 1).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend Container */}
      <div className="mt-auto p-4 bg-white rounded-xl border border-slate-200 mb-4">
        <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
          Legend
        </h4>
        <div className="grid grid-cols-2 gap-y-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-500"></div>
            <span className="text-xs text-slate-600 font-medium">Answered ({answeredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-amber-400"></div>
            <span className="text-xs text-slate-600 font-medium">Review ({reviewCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-slate-200"></div>
            <span className="text-xs text-slate-600 font-medium">Pending ({notAnsweredCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded border-2 border-blue-600"></div>
            <span className="text-xs text-slate-600 font-medium">Current</span>
          </div>
        </div>
      </div>

      {/* Sidebar Submit Button */}
      <button
        id="sidebar-submit-interview-btn"
        onClick={onSubmitClick}
        className="w-full py-2.5 px-4 bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold rounded-lg shadow-md shadow-blue-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
      >
        <Check className="w-4 h-4 stroke-[2.5]" />
        Submit Interview
      </button>

    </div>
  );
};
