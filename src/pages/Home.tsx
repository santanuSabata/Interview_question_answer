import React, { useState, useMemo } from 'react';
import { Question, InterviewConfig } from '../types';
import { 
  Play, 
  Shuffle, 
  Clock, 
  Layers, 
  BarChart2, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  Code2, 
  Database, 
  FileSpreadsheet, 
  Terminal,
  FileCode2,
  Globe
} from 'lucide-react';

interface HomeProps {
  questions: Question[];
  categories: string[];
  onStartInterview: (config: InterviewConfig) => void;
}

export const Home: React.FC<HomeProps> = ({ questions, categories, onStartInterview }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [isRandom, setIsRandom] = useState<boolean>(true);
  const [questionCountChoice, setQuestionCountChoice] = useState<number | 'all'>(20);
  const [timerMinutes, setTimerMinutes] = useState<number>(30);

  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Compute filtered questions count preview
  const matchingQuestions = useMemo(() => {
    return questions.filter((q) => {
      const matchCat = selectedCategory === 'All' || q.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchDiff = selectedDifficulty === 'All' || q.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();
      return matchCat && matchDiff;
    });
  }, [questions, selectedCategory, selectedDifficulty]);

  const effectiveCount = useMemo(() => {
    if (questionCountChoice === 'all') {
      return matchingQuestions.length;
    }
    return Math.min(questionCountChoice, matchingQuestions.length);
  }, [questionCountChoice, matchingQuestions.length]);

  const handleStart = () => {
    onStartInterview({
      category: selectedCategory,
      difficulty: selectedDifficulty,
      isRandom,
      questionCount: questionCountChoice,
      timerMinutes,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'sql':
        return <Database className="w-4 h-4" />;
      case 'javascript':
        return <Code2 className="w-4 h-4" />;
      case 'react':
        return <FileCode2 className="w-4 h-4" />;
      case 'python':
        return <Terminal className="w-4 h-4" />;
      case 'excel':
        return <FileSpreadsheet className="w-4 h-4" />;
      case 'power bi':
        return <BarChart2 className="w-4 h-4" />;
      case 'wordpress':
        return <Globe className="w-4 h-4" />;
      default:
        return <Layers className="w-4 h-4" />;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      
      {/* Hero Section */}
      <div className="text-center mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 mb-4 shadow-2xs uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5 text-blue-700" />
          <span>Technical Assessment Portal</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-sans mb-3">
          CB Academy
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold text-blue-700 mb-4 font-sans">
          Interview Preparation &amp; Assessment
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Master technical interview questions across SQL, JavaScript, React, Python, Excel, Power BI, and WordPress with instant feedback and comprehensive model explanations.
        </p>
      </div>

      {/* Live Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Total Questions</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">{questions.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center flex-shrink-0">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Categories</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">{categories.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center flex-shrink-0">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">Difficulty Levels</span>
            <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">3 Levels</span>
          </div>
        </div>

      </div>

      {/* Configuration Hub Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 md:p-10 mb-8">
        <div className="pb-5 mb-6 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              Customize Your Interview Session
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Configure question category, difficulty, volume, and timer parameters.
            </p>
          </div>
          <div className="hidden sm:block text-right">
            <span className="text-[11px] text-slate-400 block font-bold uppercase tracking-wider">Available in Pool</span>
            <span className="text-sm font-bold text-blue-700 font-mono">
              {matchingQuestions.length} Questions
            </span>
          </div>
        </div>

        <div className="space-y-7">
          
          {/* 1. Category Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
              <span>Select Category</span>
              <span className="text-[11px] font-semibold text-slate-500 lowercase">
                ({selectedCategory === 'All' ? 'All categories' : selectedCategory})
              </span>
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                id="cat-filter-all"
                onClick={() => setSelectedCategory('All')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
                  selectedCategory === 'All'
                    ? 'bg-blue-700 text-white border-blue-700 shadow-md shadow-blue-200'
                    : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                All ({questions.length})
              </button>

              {categories.map((cat) => {
                const count = questions.filter((q) => q.category.toLowerCase() === cat.toLowerCase()).length;
                const isSelected = selectedCategory.toLowerCase() === cat.toLowerCase();

                return (
                  <button
                    key={cat}
                    id={`cat-filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
                      isSelected
                        ? 'bg-blue-700 text-white border-blue-700 shadow-md shadow-blue-200'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {getCategoryIcon(cat)}
                    <span>{cat}</span>
                    <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-600'}`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Difficulty Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
              Difficulty Level
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {difficulties.map((diff) => {
                const isSelected = selectedDifficulty.toLowerCase() === diff.toLowerCase();
                return (
                  <button
                    key={diff}
                    id={`diff-filter-${diff.toLowerCase()}`}
                    type="button"
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold text-center border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {diff}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Question Count & Random Order */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
            
            {/* Number of Questions */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Number of Questions
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[10, 20, 30, 'all'].map((countOption) => {
                  const isSelected = questionCountChoice === countOption;
                  return (
                    <button
                      key={String(countOption)}
                      id={`count-option-${countOption}`}
                      type="button"
                      onClick={() => setQuestionCountChoice(countOption as number | 'all')}
                      className={`py-2 px-2 text-center rounded-xl text-xs sm:text-sm font-semibold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                          : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      {countOption === 'all' ? 'All' : countOption}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Random Shuffle Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
                Question Order
              </label>
              <button
                type="button"
                id="random-questions-toggle-btn"
                onClick={() => setIsRandom(!isRandom)}
                className={`w-full py-2.5 px-4 rounded-xl border flex items-center justify-between text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isRandom
                    ? 'bg-blue-50 border-blue-300 text-blue-900'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Shuffle className={`w-4 h-4 ${isRandom ? 'text-blue-700' : 'text-slate-400'}`} />
                  <span>Random Questions</span>
                </span>
                <span className={`text-[11px] px-2 py-0.5 rounded font-bold uppercase ${
                  isRandom ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {isRandom ? 'Enabled' : 'Sequential'}
                </span>
              </button>
            </div>

          </div>

          {/* 4. Timer Settings */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Interview Timer
              </label>
              <span className="text-xs font-semibold text-slate-500">
                {timerMinutes === 0 ? 'Untimed Assessment' : `${timerMinutes} Minutes`}
              </span>
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[
                { label: '10 Mins', value: 10 },
                { label: '15 Mins', value: 15 },
                { label: '20 Mins', value: 20 },
                { label: '30 Mins (Default)', value: 30 },
                { label: '45 Mins', value: 45 },
                { label: 'Untimed', value: 0 },
              ].map((opt) => {
                const isSelected = timerMinutes === opt.value;
                return (
                  <button
                    key={opt.value}
                    id={`timer-opt-${opt.value}`}
                    type="button"
                    onClick={() => setTimerMinutes(opt.value)}
                    className={`py-2 px-2 text-center rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-700 text-white border-blue-700 shadow-xs'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Start Button & Summary */}
        <div className="mt-9 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <span className="font-semibold text-slate-800">Selected Session: </span>
            <span>{effectiveCount} Questions</span>
            <span className="mx-1.5">•</span>
            <span>{selectedCategory}</span>
            <span className="mx-1.5">•</span>
            <span>{selectedDifficulty}</span>
            <span className="mx-1.5">•</span>
            <span>{timerMinutes > 0 ? `${timerMinutes} min timer` : 'Untimed'}</span>
          </div>

          <button
            type="button"
            id="start-interview-btn"
            disabled={effectiveCount === 0}
            onClick={handleStart}
            className="w-full sm:w-auto px-8 py-3.5 bg-blue-700 hover:bg-blue-800 disabled:bg-slate-300 text-white text-sm sm:text-base font-bold rounded-lg shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Start Interview</span>
          </button>
        </div>

      </div>

    </div>
  );
};
