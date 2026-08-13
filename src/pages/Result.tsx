import React, { useState, useMemo } from 'react';
import { ResultSummary, QuestionResult, QuestionStatus } from '../types';
import { ResultCard } from '../components/ResultCard';
import { 
  RotateCcw, 
  Home, 
  CheckCircle2, 
  XCircle, 
  FileText, 
  HelpCircle, 
  Filter, 
  Layers, 
  Printer, 
  ChevronDown, 
  ChevronUp,
  Lightbulb,
  Award,
  Sparkles
} from 'lucide-react';

interface ResultProps {
  result: ResultSummary;
  onRetry: () => void;
  onGoHome: () => void;
}

export const Result: React.FC<ResultProps> = ({ result, onRetry, onGoHome }) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [expandedExplanations, setExpandedExplanations] = useState<Record<number, boolean>>({});

  const { questionResults } = result;

  // Extract unique categories in this result
  const categories = useMemo(() => {
    const set = new Set(questionResults.map((r) => r.question.category));
    return ['all', ...Array.from(set)];
  }, [questionResults]);

  // Filter questions for review
  const filteredResults = useMemo(() => {
    return questionResults.filter((qr) => {
      const matchStatus = 
        statusFilter === 'all' || 
        qr.status === statusFilter;

      const matchCategory = 
        categoryFilter === 'all' || 
        qr.question.category.toLowerCase() === categoryFilter.toLowerCase();

      return matchStatus && matchCategory;
    });
  }, [questionResults, statusFilter, categoryFilter]);

  const toggleExplanation = (id: number) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const expandAll = () => {
    const all: Record<number, boolean> = {};
    questionResults.forEach((q) => {
      all[q.question.id] = true;
    });
    setExpandedExplanations(all);
  };

  const collapseAll = () => {
    setExpandedExplanations({});
  };

  const handlePrint = () => {
    window.print();
  };

  const renderStatusBadge = (status: QuestionStatus) => {
    switch (status) {
      case 'correct':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Correct
          </span>
        );
      case 'wrong':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 text-rose-800 border border-rose-300">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Wrong
          </span>
        );
      case 'needs_review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-300">
            <FileText className="w-3.5 h-3.5 text-amber-600" />
            Needs Review
          </span>
        );
      case 'unanswered':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
            Not Answered
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      {/* 1. Score Summary Overview Card */}
      <ResultCard result={result} onRetry={onRetry} onGoHome={onGoHome} />

      {/* Floating Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <button
            id="retry-interview-btn"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm rounded-lg transition shadow-md shadow-blue-200 active:scale-95 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Interview
          </button>

          <button
            id="back-home-btn"
            onClick={onGoHome}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm rounded-lg border border-slate-200 transition cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </button>
        </div>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Print Summary
        </button>
      </div>

      {/* 2. Detailed Answer Review Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-sans flex items-center gap-2">
              <span>Detailed Answer Review</span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {filteredResults.length} of {questionResults.length}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Review correct answers, technical concepts, and your responses.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 px-2 py-1 rounded hover:bg-blue-50 cursor-pointer"
            >
              Expand All
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={collapseAll}
              className="text-xs font-bold text-slate-600 hover:text-slate-800 px-2 py-1 rounded hover:bg-slate-100 cursor-pointer"
            >
              Collapse All
            </button>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
          
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {[
              { label: 'All', value: 'all' },
              { label: `Correct (${result.correct})`, value: 'correct' },
              { label: `Wrong (${result.wrong})`, value: 'wrong' },
              { label: `Needs Review (${result.needsReview})`, value: 'needs_review' },
              { label: `Skipped (${result.unattempted})`, value: 'unanswered' },
            ].map((tab) => {
              const isSelected = statusFilter === tab.value;
              return (
                <button
                  key={tab.value}
                  id={`review-filter-${tab.value}`}
                  onClick={() => setStatusFilter(tab.value)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 hover:bg-slate-200/70 border border-slate-200'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider hidden sm:inline">Category:</span>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-700 outline-none focus:ring-2 focus:ring-blue-200"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === 'all' ? 'All Categories' : c}
                </option>
              ))}
            </select>
          </div>

        </div>

        {/* Question Review List */}
        <div className="space-y-6">
          {filteredResults.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500 text-sm">
              No questions found matching the selected filter criteria.
            </div>
          ) : (
            filteredResults.map((item, index) => {
              const { question, userAnswer, status, marksEarned } = item;
              const isExpanded = !!expandedExplanations[question.id];
              const isText = question.type === 'text';

              // Style border based on status
              const borderHighlight =
                status === 'correct'
                  ? 'border-emerald-200 bg-white'
                  : status === 'wrong'
                  ? 'border-rose-200 bg-white'
                  : status === 'needs_review'
                  ? 'border-amber-200 bg-white'
                  : 'border-slate-200 bg-white';

              return (
                <div
                  key={question.id}
                  id={`review-question-card-${question.id}`}
                  className={`rounded-xl border ${borderHighlight} p-5 sm:p-6 transition-all shadow-2xs`}
                >
                  {/* Question Header */}
                  <div className="flex flex-wrap items-start justify-between gap-3 pb-3 mb-4 border-b border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-sm font-bold text-slate-900">
                        Question {index + 1}
                      </span>
                      <span className="bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full text-xs font-bold">
                        {question.category}
                      </span>
                      <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-xs font-semibold">
                        {question.difficulty}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {renderStatusBadge(status)}
                      <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        {marksEarned} / {question.marks} Marks
                      </span>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 leading-relaxed">
                    {question.question}
                  </h3>

                  {/* Answers Comparison Container */}
                  <div className="space-y-3 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm">
                    
                    {/* User's Answer */}
                    <div className="space-y-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        Your Answer:
                      </span>
                      {userAnswer.length > 0 ? (
                        <div
                          className={`p-3 rounded-lg font-medium text-sm border ${
                            status === 'correct'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                              : status === 'wrong'
                              ? 'bg-rose-50 border-rose-200 text-rose-950'
                              : 'bg-amber-50 border-amber-200 text-amber-950'
                          }`}
                        >
                          {userAnswer.map((ans, aIdx) => (
                            <div key={aIdx} className="leading-relaxed">
                              {question.type === 'multiple_select' && (
                                <span className="inline-block w-2 h-2 rounded-full bg-slate-500 mr-2" />
                              )}
                              {ans}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-3 rounded-lg bg-white border border-slate-200 text-slate-500 italic text-xs">
                          (No answer submitted for this question)
                        </div>
                      )}
                    </div>

                    {/* Correct / Expected Answer */}
                    <div className="space-y-1 pt-1">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                        {isText ? 'Expected Model Answer:' : 'Correct Answer:'}
                      </span>
                      <div className="p-3 rounded-lg font-medium text-sm bg-emerald-50 border border-emerald-200 text-emerald-950">
                        {question.answer.map((ans, aIdx) => (
                          <div key={aIdx} className="leading-relaxed">
                            {question.type === 'multiple_select' && (
                              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600 mr-2" />
                            )}
                            {ans}
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>

                  {/* Explanation Toggle & Accordion */}
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={() => toggleExplanation(question.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 hover:text-blue-900 transition-colors cursor-pointer"
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                      <span>{isExpanded ? 'Hide Explanation' : 'View Explanation'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>

                    {isExpanded && (
                      <div className="mt-2.5 p-4 rounded-xl bg-blue-50 border border-blue-100 text-slate-800 text-xs sm:text-sm leading-relaxed animate-in fade-in-50">
                        <strong className="font-bold text-blue-900 block mb-1">
                          Explanation:
                        </strong>
                        {question.explanation}
                      </div>
                    )}
                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Bottom Actions */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onRetry}
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm rounded-lg shadow-md shadow-blue-200 transition active:scale-95 flex items-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Retry Interview
          </button>

          <button
            onClick={onGoHome}
            className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm rounded-lg border border-slate-200 transition flex items-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            Return to Dashboard
          </button>
        </div>

      </div>

    </div>
  );
};
