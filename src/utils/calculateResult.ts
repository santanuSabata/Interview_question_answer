import { Question, QuestionResult, ResultSummary } from '../types';

/**
 * Validates multiple select answer arrays by comparing sets
 */
function areArraysEqual(arr1: string[], arr2: string[]): boolean {
  if (arr1.length !== arr2.length) return false;
  const sorted1 = [...arr1].map((s) => s.trim().toLowerCase()).sort();
  const sorted2 = [...arr2].map((s) => s.trim().toLowerCase()).sort();
  return sorted1.every((val, idx) => val === sorted2[idx]);
}

/**
 * Calculates interview results across all question types
 */
export function calculateResult(
  questions: Question[],
  userAnswers: Record<number, string[]>,
  timeSpentSeconds: number
): ResultSummary {
  let attempted = 0;
  let correct = 0;
  let wrong = 0;
  let needsReview = 0;
  let marksObtained = 0;
  let totalMarks = 0;

  const questionResults: QuestionResult[] = questions.map((question) => {
    const rawAnswers = userAnswers[question.id] || [];
    const sanitizedAnswers = rawAnswers.filter((a) => a && a.trim().length > 0);
    const hasAnswered = sanitizedAnswers.length > 0;
    const qMarks = question.marks || 1;
    totalMarks += qMarks;

    if (hasAnswered) {
      attempted++;
    }

    if (question.type === 'text') {
      if (hasAnswered) {
        needsReview++;
        return {
          question,
          userAnswer: sanitizedAnswers,
          isCorrect: false,
          status: 'needs_review',
          marksEarned: 0, // Descriptive answers are marked as Needs Review
        };
      } else {
        return {
          question,
          userAnswer: [],
          isCorrect: false,
          status: 'unanswered',
          marksEarned: 0,
        };
      }
    }

    if (!hasAnswered) {
      return {
        question,
        userAnswer: [],
        isCorrect: false,
        status: 'unanswered',
        marksEarned: 0,
      };
    }

    if (question.type === 'single_select') {
      const userChoice = sanitizedAnswers[0]?.trim();
      const expectedChoice = question.answer[0]?.trim();
      const isMatch = userChoice !== undefined && expectedChoice !== undefined &&
        userChoice.toLowerCase() === expectedChoice.toLowerCase();

      if (isMatch) {
        correct++;
        marksObtained += qMarks;
        return {
          question,
          userAnswer: sanitizedAnswers,
          isCorrect: true,
          status: 'correct',
          marksEarned: qMarks,
        };
      } else {
        wrong++;
        return {
          question,
          userAnswer: sanitizedAnswers,
          isCorrect: false,
          status: 'wrong',
          marksEarned: 0,
        };
      }
    }

    if (question.type === 'multiple_select') {
      const isMatch = areArraysEqual(sanitizedAnswers, question.answer);
      if (isMatch) {
        correct++;
        marksObtained += qMarks;
        return {
          question,
          userAnswer: sanitizedAnswers,
          isCorrect: true,
          status: 'correct',
          marksEarned: qMarks,
        };
      } else {
        wrong++;
        return {
          question,
          userAnswer: sanitizedAnswers,
          isCorrect: false,
          status: 'wrong',
          marksEarned: 0,
        };
      }
    }

    return {
      question,
      userAnswer: sanitizedAnswers,
      isCorrect: false,
      status: 'unanswered',
      marksEarned: 0,
    };
  });

  const totalQuestions = questions.length;
  const unattempted = totalQuestions - attempted;
  
  // Calculate percentage based on auto-graded questions or total marks
  const percentage = totalMarks > 0 ? Math.round((marksObtained / totalMarks) * 100) : 0;

  return {
    totalQuestions,
    attempted,
    unattempted,
    correct,
    wrong,
    needsReview,
    marksObtained,
    totalMarks,
    percentage,
    timeSpentSeconds,
    questionResults,
  };
}
