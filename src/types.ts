export type QuestionType = 'single_select' | 'multiple_select' | 'text';

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';

export interface Question {
  id: number;
  question: string;
  type: QuestionType;
  options?: string[];
  answer: string[];
  explanation: string;
  category: string;
  difficulty: Difficulty;
  marks: number;
}

export interface InterviewConfig {
  category: string;
  difficulty: string;
  isRandom: boolean;
  questionCount: number | 'all';
  timerMinutes: number; // 0 = disabled
}

export type QuestionStatus = 'correct' | 'wrong' | 'needs_review' | 'unanswered';

export interface QuestionResult {
  question: Question;
  userAnswer: string[];
  isCorrect: boolean;
  status: QuestionStatus;
  marksEarned: number;
}

export interface ResultSummary {
  totalQuestions: number;
  attempted: number;
  unattempted: number;
  correct: number;
  wrong: number;
  needsReview: number;
  marksObtained: number;
  totalMarks: number;
  percentage: number;
  timeSpentSeconds: number;
  questionResults: QuestionResult[];
}

export type AppView = 'home' | 'interview' | 'result';
