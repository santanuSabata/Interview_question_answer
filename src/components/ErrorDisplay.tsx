import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  onRetry: () => void;
  errorMessage?: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ onRetry, errorMessage }) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl border border-red-200 shadow-xl p-8 text-center">
        <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5 text-red-600">
          <AlertTriangle className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">
          Unable to load interview questions.
        </h2>
        <p className="text-sm text-slate-600 mb-6">
          Please check the <code className="bg-slate-100 px-1.5 py-0.5 rounded text-red-700 font-mono text-xs">public/questions.json</code> file.
        </p>
        {errorMessage && (
          <div className="text-xs text-left font-mono bg-slate-50 border border-slate-200 text-slate-600 p-3 rounded-lg mb-6 overflow-x-auto">
            {errorMessage}
          </div>
        )}
        <button
          id="retry-load-questions-btn"
          onClick={onRetry}
          className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition shadow-md shadow-blue-500/20 active:scale-[0.99]"
        >
          <RefreshCw className="w-4 h-4" />
          Retry
        </button>
      </div>
    </div>
  );
};
