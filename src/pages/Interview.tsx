import React, { useState, useCallback } from 'react';
import { Question } from '../types';
import { QuestionCard } from '../components/QuestionCard';
import { QuestionNavigation } from '../components/QuestionNavigation';
import { ProgressBar } from '../components/ProgressBar';
import { Timer } from '../components/Timer';
import { ConfirmSubmitModal } from '../components/ConfirmSubmitModal';
import { 
  ChevronLeft, 
  ChevronRight, 
  Bookmark, 
  BookmarkCheck, 
  Check, 
  Menu, 
  X, 
  AlertCircle,
  HelpCircle,
  RotateCcw
} from 'lucide-react';

interface InterviewProps {
  questions: Question[];
  timerMinutes: number;
  onSubmitInterview: (answers: Record<number, string[]>, timeSpentSeconds: number) => void;
}

export const Interview: React.FC<InterviewProps> = ({
  questions,
  timerMinutes,
  onSubmitInterview,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string[]>>({});
  const [reviewStatus, setReviewStatus] = useState<Record<number, boolean>>({});
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState<boolean>(false);
  const [isMobilePaletteOpen, setIsMobilePaletteOpen] = useState<boolean>(false);
  const [timeSpent, setTimeSpent] = useState<number>(0);

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];

  // Answer handler for current question
  const handleAnswerChange = (answers: string[]) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: answers,
    }));
  };

  // Clear current question answer
  const handleClearAnswer = () => {
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  // Toggle review status
  const handleToggleReview = () => {
    setReviewStatus((prev) => {
      const next = { ...prev };
      if (next[currentQuestion.id]) {
        delete next[currentQuestion.id];
      } else {
        next[currentQuestion.id] = true;
      }
      return next;
    });
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSelectQuestion = (index: number) => {
    setCurrentIndex(index);
    setIsMobilePaletteOpen(false);
  };

  // Handle final submission
  const handleConfirmSubmit = () => {
    setIsSubmitModalOpen(false);
    onSubmitInterview(userAnswers, timeSpent);
  };

  // Handle time up (auto submit)
  const handleTimeUp = useCallback(() => {
    onSubmitInterview(userAnswers, timeSpent);
  }, [onSubmitInterview, userAnswers, timeSpent]);

  // Compute live answered & review counts
  let answeredCount = 0;
  let reviewedCount = 0;
  questions.forEach((q) => {
    const answers = userAnswers[q.id] || [];
    if (answers.length > 0 && answers.some((a) => a.trim().length > 0)) {
      answeredCount++;
    }
    if (reviewStatus[q.id]) {
      reviewedCount++;
    }
  });

  const isCurrentMarked = !!reviewStatus[currentQuestion?.id];
  const currentSelectedAnswers = userAnswers[currentQuestion?.id] || [];

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans text-slate-800">
      
      {/* Sticky Session Bar */}
      <div className="sticky top-16 z-20 bg-white border-b border-slate-200 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <h2 className="font-bold text-slate-900 text-sm sm:text-base hidden sm:inline-block">
              Interview Assessment
            </h2>
            <div className="text-sm font-semibold text-slate-500">
              Question <span className="text-slate-900 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span> of {totalQuestions}
            </div>
          </div>

          <div className="flex items-center gap-4 sm:gap-6">
            <Timer
              initialMinutes={timerMinutes}
              onTimeUp={handleTimeUp}
              onTimeSpentUpdate={(sec) => setTimeSpent(sec)}
            />

            <button
              type="button"
              id="finish-interview-top-btn"
              onClick={() => setIsSubmitModalOpen(true)}
              className="bg-red-50 text-red-600 border border-red-200 px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold hover:bg-red-100 transition-colors cursor-pointer"
            >
              Finish Interview
            </button>

            {/* Mobile Toggle Palette Button */}
            <button
              id="mobile-toggle-palette-btn"
              onClick={() => setIsMobilePaletteOpen(!isMobilePaletteOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300 text-xs font-semibold flex items-center gap-1.5"
            >
              {isMobilePaletteOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              <span className="hidden sm:inline">Palette</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Top Progress bar */}
        <ProgressBar
          currentIndex={currentIndex}
          totalQuestions={totalQuestions}
          answeredCount={answeredCount}
          reviewedCount={reviewedCount}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-4">
          
          {/* Main Question Area (8 cols on lg) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Question Card */}
            {currentQuestion && (
              <QuestionCard
                question={currentQuestion}
                questionNumber={currentIndex + 1}
                totalQuestions={totalQuestions}
                selectedAnswers={currentSelectedAnswers}
                onAnswerChange={handleAnswerChange}
                onClearAnswer={handleClearAnswer}
              />
            )}

            {/* Bottom Navigation & Action Bar */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-200">
              
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Previous Button */}
                <button
                  type="button"
                  id="prev-question-btn"
                  disabled={currentIndex === 0}
                  onClick={handlePrevious}
                  className="px-5 sm:px-6 py-2.5 rounded-lg border border-slate-200 text-slate-600 font-semibold hover:bg-white hover:border-slate-300 disabled:opacity-40 disabled:cursor-not-allowed text-xs sm:text-sm transition-colors cursor-pointer"
                >
                  <span className="inline-flex items-center gap-1">
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </span>
                </button>

                {/* Mark for Review Button */}
                <button
                  type="button"
                  id="mark-for-review-btn"
                  onClick={handleToggleReview}
                  className={`px-4 sm:px-6 py-2.5 rounded-lg border font-semibold text-xs sm:text-sm flex items-center gap-2 transition-colors cursor-pointer ${
                    isCurrentMarked
                      ? 'border-amber-400 bg-amber-100 text-amber-900 ring-1 ring-amber-400'
                      : 'border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100'
                  }`}
                >
                  {isCurrentMarked ? (
                    <>
                      <BookmarkCheck className="w-4 h-4 text-amber-700 fill-amber-500" />
                      <span>Marked for Review</span>
                    </>
                  ) : (
                    <>
                      <Bookmark className="w-4 h-4 text-amber-600" />
                      <span>Mark for Review</span>
                    </>
                  )}
                </button>
              </div>

              {/* Next / Save & Next / Submit Action */}
              <div>
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    type="button"
                    id="next-question-btn"
                    onClick={handleNext}
                    className="px-6 sm:px-8 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-blue-200 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <span>Save &amp; Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    id="finish-submit-btn"
                    onClick={() => setIsSubmitModalOpen(true)}
                    className="px-6 sm:px-8 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-emerald-200 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <Check className="w-4 h-4 stroke-[2.5]" />
                    <span>Finish Interview</span>
                  </button>
                )}
              </div>

            </div>

          </div>

          {/* Question Navigator Sidebar (4 cols on desktop) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-36">
            <QuestionNavigation
              questions={questions}
              currentIndex={currentIndex}
              userAnswers={userAnswers}
              reviewStatus={reviewStatus}
              onSelectQuestion={handleSelectQuestion}
              onSubmitClick={() => setIsSubmitModalOpen(true)}
            />
          </aside>

        </div>

      </main>

      {/* Mobile Drawer Question Palette */}
      {isMobilePaletteOpen && (
        <div className="fixed inset-0 z-40 lg:hidden bg-slate-900/50 backdrop-blur-xs flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-4 flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <h3 className="font-bold text-slate-800 text-sm">Question Navigation</h3>
              <button
                onClick={() => setIsMobilePaletteOpen(false)}
                className="p-1 text-slate-500 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <QuestionNavigation
                questions={questions}
                currentIndex={currentIndex}
                userAnswers={userAnswers}
                reviewStatus={reviewStatus}
                onSelectQuestion={handleSelectQuestion}
                onSubmitClick={() => {
                  setIsMobilePaletteOpen(false);
                  setIsSubmitModalOpen(true);
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmSubmitModal
        isOpen={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        onConfirm={handleConfirmSubmit}
        questions={questions}
        userAnswers={userAnswers}
        reviewStatus={reviewStatus}
      />

    </div>
  );
};
