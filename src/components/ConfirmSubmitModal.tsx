import React from 'react';
import { AlertCircle, CheckCircle2, Bookmark, HelpCircle, X, Check } from 'lucide-react';
import { Question } from '../types';

interface ConfirmSubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  questions: Question[];
  userAnswers: Record<number, string[]>;
  reviewStatus: Record<number, boolean>;
}

export const ConfirmSubmitModal: React.FC<ConfirmSubmitModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  questions,
  userAnswers,
  reviewStatus,
}) => {
  if (!isOpen) return null;

  const total = questions.length;
  let answered = 0;
  let markedForReview = 0;
  let unanswered = 0;

  questions.forEach((q) => {
    const isMarked = !!reviewStatus[q.id];
    if (isMarked) markedForReview++;

    const answers = userAnswers[q.id] || [];
    const hasAns = answers.length > 0 && answers.some((a) => a.trim().length > 0);

    if (hasAns) {
      answered++;
    } else {
      unanswered++;
    }
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xl max-w-md w-full p-6 sm:p-7 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-3 text-blue-700">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            Submit Assessment?
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Please review your question completion summary before submitting.
          </p>
        </div>

        {/* Summary Stats Matrix */}
        <div className="grid grid-cols-3 gap-2.5 mb-6 text-center">
          <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl">
            <span className="block text-2xl font-bold text-slate-900 font-mono">{total}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Total</span>
          </div>

          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl">
            <span className="block text-2xl font-bold text-emerald-700 font-mono">{answered}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Answered</span>
          </div>

          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl">
            <span className="block text-2xl font-bold text-amber-700 font-mono">{markedForReview}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Review</span>
          </div>
        </div>

        {unanswered > 0 && (
          <div className="flex items-start gap-2.5 p-3.5 mb-6 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-xs">
            <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              You still have <strong className="font-bold">{unanswered} unattempted question{unanswered > 1 ? 's' : ''}</strong>. Are you sure you want to end and submit the interview now?
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors cursor-pointer"
          >
            Continue Assessment
          </button>

          <button
            type="button"
            id="modal-confirm-submit-btn"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition shadow-md shadow-blue-200 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4 stroke-[2.5]" />
            Confirm Submit
          </button>
        </div>

      </div>
    </div>
  );
};
