import React from 'react';
import { Loader2, GraduationCap } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading Questions...' }) => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center animate-pulse">
          <GraduationCap className="w-8 h-8 text-blue-600" />
        </div>
        <div className="absolute -top-1 -right-1">
          <Loader2 className="w-6 h-6 text-blue-600 animate-spin" />
        </div>
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        {message}
      </h3>
      <p className="text-sm text-slate-500 max-w-sm">
        Preparing your technical interview session from CB Academy question repository.
      </p>
    </div>
  );
};
