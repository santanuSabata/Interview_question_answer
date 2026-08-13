import React from 'react';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { AppView } from '../types';

interface HeaderProps {
  currentView: AppView;
  onNavigateHome: () => void;
  subTitle?: string;
  headerRightContent?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  onNavigateHome, 
  subTitle,
  headerRightContent 
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Brand Logo & Tagline */}
          <div 
            id="brand-logo-btn"
            onClick={currentView !== 'home' ? onNavigateHome : undefined}
            className={`flex items-center gap-3 ${currentView !== 'home' ? 'cursor-pointer group' : ''}`}
          >
            <div className="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:bg-blue-800 transition-colors">
              CB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold leading-none text-slate-900 tracking-tight">
                  CB Academy
                </h1>
                <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wide">
                  Interview Portal
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-slate-500 font-semibold uppercase mt-0.5">
                Learn. Analyze. Succeed.
              </p>
            </div>
          </div>

          {/* Right Area: Status / Actions / Navigation */}
          <div className="flex items-center gap-4 sm:gap-6">
            {headerRightContent}

            {subTitle && !headerRightContent && (
              <span className="hidden md:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 mr-1.5" />
                {subTitle}
              </span>
            )}

            {currentView !== 'home' && (
              <button
                id="header-home-btn"
                onClick={onNavigateHome}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors shadow-2xs"
                title="Return to Home Dashboard"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Exit to</span> Home
              </button>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};

