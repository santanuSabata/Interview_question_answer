import React from 'react';
import { ResultSummary } from '../types';
import { Award, CheckCircle2, XCircle, HelpCircle, FileText, Clock, Percent, Target } from 'lucide-react';

interface ResultCardProps {
  result: ResultSummary;
  onRetry: () => void;
  onGoHome: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onRetry, onGoHome }) => {
  const {
    totalQuestions,
    attempted,
    unattempted,
    correct,
    wrong,
    needsReview,
    marksObtained,
    totalMarks,
    percentage,
    timeSpentSeconds,
  } = result;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    if (mins === 0) return `${remainingSecs}s`;
    return `${mins}m ${remainingSecs}s`;
  };

  const getGradeInfo = (pct: number) => {
    if (pct >= 85) {
      return {
        label: 'Outstanding Performance',
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        description: 'You demonstrated comprehensive mastery of the interview concepts.',
      };
    } else if (pct >= 70) {
      return {
        label: 'Great Job!',
        badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
        description: 'Solid understanding with minor room for improvement.',
      };
    } else if (pct >= 50) {
      return {
        label: 'Satisfactory Attempt',
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        description: 'Good effort. Review explanations below to strengthen weak areas.',
      };
    } else {
      return {
        label: 'Needs More Practice',
        badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
        description: 'Keep studying the fundamentals and try again!',
      };
    }
  };

  const grade = getGradeInfo(percentage);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
      
      {/* Top Banner */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-100 text-blue-700 mb-3 shadow-2xs">
          <Award className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight font-sans">
          Interview Assessment Completed
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Review your performance summary and key metrics below.
        </p>

        <div className="mt-4">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs sm:text-sm font-bold border ${grade.badgeColor}`}>
            {grade.label}
          </span>
          <p className="text-xs text-slate-500 mt-1.5">{grade.description}</p>
        </div>
      </div>

      {/* Main Score Hero Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-md">
        
        {/* Score Marks */}
        <div className="flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-slate-800 pb-5 md:pb-0 md:pr-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Target className="w-4 h-4 text-blue-400" />
            Marks Obtained
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl sm:text-5xl font-extrabold text-white font-mono">{marksObtained}</span>
            <span className="text-xl text-slate-400 font-mono">/ {totalMarks}</span>
          </div>
          <span className="text-xs text-slate-400 mt-1">Score: {marksObtained} of {totalMarks} Marks</span>
        </div>

        {/* Percentage */}
        <div className="flex flex-col justify-center items-center border-b md:border-b-0 md:border-r border-slate-800 py-5 md:py-0 md:px-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Percent className="w-4 h-4 text-emerald-400" />
            Accuracy Score
          </span>
          <div className="text-4xl sm:text-5xl font-extrabold text-emerald-400 font-mono">
            {percentage}%
          </div>
          <span className="text-xs text-slate-400 mt-1">Overall Accuracy</span>
        </div>

        {/* Time Spent */}
        <div className="flex flex-col justify-center items-center md:items-end pt-5 md:pt-0 md:pl-6">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-400" />
            Time Taken
          </span>
          <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono">
            {formatTime(timeSpentSeconds)}
          </div>
          <span className="text-xs text-slate-400 mt-1">Total Duration</span>
        </div>

      </div>

      {/* Detailed Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        
        {/* Total Questions */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-1">Total</span>
          <span className="text-2xl font-bold text-slate-900 font-mono">{totalQuestions}</span>
        </div>

        {/* Attempted */}
        <div className="bg-blue-50/60 border border-blue-200 rounded-xl p-4 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">Attempted</span>
          <span className="text-2xl font-bold text-blue-900 font-mono">{attempted}</span>
          <span className="text-[11px] text-blue-600 block">({unattempted} skipped)</span>
        </div>

        {/* Correct */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Correct</span>
          </div>
          <span className="text-2xl font-bold text-emerald-800 font-mono">{correct}</span>
        </div>

        {/* Wrong */}
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-center">
          <div className="flex items-center justify-center gap-1 text-rose-700 text-xs font-bold uppercase tracking-wider mb-1">
            <XCircle className="w-3.5 h-3.5" />
            <span>Wrong</span>
          </div>
          <span className="text-2xl font-bold text-rose-800 font-mono">{wrong}</span>
        </div>

        {/* Needs Review */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-center col-span-2 sm:col-span-1">
          <div className="flex items-center justify-center gap-1 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
            <FileText className="w-3.5 h-3.5" />
            <span>Descriptive</span>
          </div>
          <span className="text-2xl font-bold text-amber-800 font-mono">{needsReview}</span>
          <span className="text-[10px] text-amber-600 block">(Subjective)</span>
        </div>

      </div>

    </div>
  );
};
