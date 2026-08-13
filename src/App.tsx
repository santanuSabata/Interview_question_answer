import React, { useEffect, useState, useCallback } from 'react';
import { Question, InterviewConfig, ResultSummary, AppView } from './types';
import { getQuestions, getCategories, clearQuestionCache } from './services/questionService';
import { shuffleQuestions } from './utils/shuffleQuestions';
import { calculateResult } from './utils/calculateResult';
import { Header } from './components/Header';
import { Loading } from './components/Loading';
import { ErrorDisplay } from './components/ErrorDisplay';
import { Home } from './pages/Home';
import { Interview } from './pages/Interview';
import { Result } from './pages/Result';

export default function App() {
  const [allQuestions, setAllQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // App View navigation
  const [currentView, setCurrentView] = useState<AppView>('home');

  // Active Session State
  const [sessionConfig, setSessionConfig] = useState<InterviewConfig | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [resultSummary, setResultSummary] = useState<ResultSummary | null>(null);

  // Load questions on initial mount
  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      clearQuestionCache();
      const loadedQuestions = await getQuestions();
      const loadedCategories = await getCategories();
      setAllQuestions(loadedQuestions);
      setCategories(loadedCategories);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch interview questions from questions.json');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Start new interview
  const handleStartInterview = (config: InterviewConfig) => {
    setSessionConfig(config);

    // 1. Filter by category
    let pool = allQuestions;
    if (config.category && config.category.toLowerCase() !== 'all') {
      pool = pool.filter((q) => q.category.toLowerCase() === config.category.toLowerCase());
    }

    // 2. Filter by difficulty
    if (config.difficulty && config.difficulty.toLowerCase() !== 'all') {
      pool = pool.filter((q) => q.difficulty.toLowerCase() === config.difficulty.toLowerCase());
    }

    // 3. Shuffle if random
    if (config.isRandom) {
      pool = shuffleQuestions(pool);
    }

    // 4. Limit count
    if (config.questionCount !== 'all' && typeof config.questionCount === 'number') {
      pool = pool.slice(0, config.questionCount);
    }

    if (pool.length === 0) {
      alert('No questions found matching the selected filters. Please select different options.');
      return;
    }

    setActiveQuestions(pool);
    setResultSummary(null);
    setCurrentView('interview');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Submit interview
  const handleSubmitInterview = (answers: Record<number, string[]>, timeSpentSeconds: number) => {
    const summary = calculateResult(activeQuestions, answers, timeSpentSeconds);
    setResultSummary(summary);
    setCurrentView('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Retry interview with same configuration
  const handleRetryInterview = () => {
    if (!sessionConfig) {
      setCurrentView('home');
      return;
    }
    handleStartInterview(sessionConfig);
  };

  // Return to home dashboard
  const handleNavigateHome = () => {
    if (currentView === 'interview') {
      const confirmExit = window.confirm('Are you sure you want to leave the active interview? Your progress will be lost.');
      if (!confirmExit) return;
    }
    setCurrentView('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dynamic header subtitle based on view
  const getSubTitle = () => {
    if (currentView === 'interview') {
      return sessionConfig?.category !== 'All' ? `${sessionConfig?.category} Session` : 'Interview Mode';
    }
    if (currentView === 'result') {
      return 'Performance Report';
    }
    return 'Preparation Portal';
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Top Application Header */}
      <Header
        currentView={currentView}
        onNavigateHome={handleNavigateHome}
        subTitle={getSubTitle()}
      />

      {/* Main Content Area */}
      <div className="flex-1">
        {loading ? (
          <Loading message="Loading Questions..." />
        ) : error ? (
          <ErrorDisplay errorMessage={error} onRetry={loadData} />
        ) : (
          <>
            {currentView === 'home' && (
              <Home
                questions={allQuestions}
                categories={categories}
                onStartInterview={handleStartInterview}
              />
            )}

            {currentView === 'interview' && (
              <Interview
                questions={activeQuestions}
                timerMinutes={sessionConfig?.timerMinutes ?? 30}
                onSubmitInterview={handleSubmitInterview}
              />
            )}

            {currentView === 'result' && resultSummary && (
              <Result
                result={resultSummary}
                onRetry={handleRetryInterview}
                onGoHome={() => {
                  setCurrentView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">CB Academy</span>
            <span>•</span>
            <span className="font-semibold text-blue-600 tracking-wider">LEARN. ANALYZE. SUCCEED.</span>
          </div>
          <div>
            Client-Side Technical Interview System • {allQuestions.length} Questions in Repository
          </div>
        </div>
      </footer>

    </div>
  );
}
