import React from 'react';
import { Question } from '../types';
import { Check, CheckSquare, FileText, RotateCcw, Award } from 'lucide-react';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions?: number;
  selectedAnswers: string[];
  onAnswerChange: (answers: string[]) => void;
  onClearAnswer: () => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswers,
  onAnswerChange,
  onClearAnswer,
}) => {
  const options = question.options || [];

  const handleSingleSelect = (option: string) => {
    onAnswerChange([option]);
  };

  const handleMultipleSelect = (option: string) => {
    if (selectedAnswers.includes(option)) {
      onAnswerChange(selectedAnswers.filter((item) => item !== option));
    } else {
      onAnswerChange([...selectedAnswers, option]);
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerChange([e.target.value]);
  };

  const hasAnswer = selectedAnswers.length > 0 && selectedAnswers.some((a) => a.trim().length > 0);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-emerald-100 text-emerald-700';
      case 'intermediate':
        return 'bg-orange-100 text-orange-700';
      case 'advanced':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
      
      {/* Top Meta Badges & Question Counter */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category */}
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold">
            {question.category}
          </span>

          {/* Difficulty */}
          <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(question.difficulty)}`}>
            Difficulty: {question.difficulty}
          </span>

          {/* Question Type */}
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
            {question.type === 'single_select' && 'Single Choice'}
            {question.type === 'multiple_select' && 'Multiple Choice'}
            {question.type === 'text' && 'Descriptive'}
          </span>
        </div>

        {/* Counter & Marks */}
        <div className="flex items-center gap-3">
          {totalQuestions && (
            <div className="text-sm font-semibold text-slate-500">
              Question <span className="text-slate-900 font-bold">{String(questionNumber).padStart(2, '0')}</span> of {totalQuestions}
            </div>
          )}
          <span className="flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
            <Award className="w-3.5 h-3.5" />
            {question.marks} {question.marks === 1 ? 'Mark' : 'Marks'}
          </span>
        </div>
      </div>

      {/* Question Statement */}
      <div className="py-2 mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-slate-900 mb-3 leading-tight">
          {question.question}
        </h2>
        {question.type === 'multiple_select' && (
          <p className="text-xs font-bold text-blue-700 flex items-center gap-1.5 uppercase tracking-wide">
            <CheckSquare className="w-4 h-4" />
            Select all options that apply
          </p>
        )}
        {question.type === 'text' && (
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-slate-400" />
            Write your detailed response below.
          </p>
        )}
      </div>

      {/* Options Rendering */}
      <div className="space-y-3 mb-6">
        {/* Single Select */}
        {question.type === 'single_select' &&
          options.map((option, idx) => {
            const isSelected = selectedAnswers.includes(option);
            const optionLetter = String.fromCharCode(65 + idx);

            return (
              <label
                key={idx}
                onClick={() => handleSingleSelect(option)}
                className={`flex items-center p-4 rounded-xl cursor-pointer group transition-all ${
                  isSelected
                    ? 'border-2 border-blue-600 bg-blue-50'
                    : 'border border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'border-2 border-blue-600 bg-blue-600 text-white'
                      : 'border-2 border-slate-300 group-hover:border-slate-400'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="flex items-center gap-3 flex-1 select-none">
                  <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {optionLetter}
                  </span>
                  <span className={`text-sm sm:text-base font-medium ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </div>
              </label>
            );
          })}

        {/* Multiple Select */}
        {question.type === 'multiple_select' &&
          options.map((option, idx) => {
            const isSelected = selectedAnswers.includes(option);
            const optionLetter = String.fromCharCode(65 + idx);

            return (
              <label
                key={idx}
                onClick={() => handleMultipleSelect(option)}
                className={`flex items-center p-4 rounded-xl cursor-pointer group transition-all ${
                  isSelected
                    ? 'border-2 border-blue-600 bg-blue-50'
                    : 'border border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded flex items-center justify-center mr-4 flex-shrink-0 transition-colors ${
                    isSelected
                      ? 'border-2 border-blue-600 bg-blue-600 text-white'
                      : 'border-2 border-slate-300 group-hover:border-slate-400'
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                </div>

                <div className="flex items-center gap-3 flex-1 select-none">
                  <span className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {optionLetter}
                  </span>
                  <span className={`text-sm sm:text-base font-medium ${isSelected ? 'text-slate-900' : 'text-slate-700'}`}>
                    {option}
                  </span>
                </div>
              </label>
            );
          })}

        {/* Text / Descriptive */}
        {question.type === 'text' && (
          <div>
            <textarea
              id={`text-answer-input-${question.id}`}
              value={selectedAnswers[0] || ''}
              onChange={handleTextChange}
              placeholder="Write your technical explanation here..."
              rows={6}
              className="w-full p-4 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none text-slate-800 text-sm sm:text-base transition-all bg-white resize-y font-sans"
            />
            <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
              <span>Descriptive technical question</span>
              <span>{(selectedAnswers[0] || '').length} characters</span>
            </div>
          </div>
        )}
      </div>

      {/* Auxiliary Clear Button */}
      {hasAnswer && (
        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClearAnswer}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Selection
          </button>
        </div>
      )}

    </div>
  );
};
