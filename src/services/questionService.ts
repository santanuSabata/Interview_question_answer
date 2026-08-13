import { Question } from '../types';

let cachedQuestions: Question[] | null = null;

/**
 * Fetch all questions from public/questions.json
 */
export async function getQuestions(): Promise<Question[]> {
  if (cachedQuestions && cachedQuestions.length > 0) {
    return cachedQuestions;
  }

  try {
    const response = await fetch('/questions.json', {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: Question[] = await response.json();
    if (!Array.isArray(data) || data.length === 0) {
      throw new Error('Invalid or empty question dataset');
    }

    cachedQuestions = data;
    return data;
  } catch (error) {
    console.error('Failed to load interview questions from /questions.json:', error);
    throw error;
  }
}

/**
 * Get distinct categories from questions list
 */
export async function getCategories(): Promise<string[]> {
  const questions = await getQuestions();
  const categories = Array.from(new Set(questions.map((q) => q.category).filter(Boolean)));
  return categories.sort();
}

/**
 * Get questions filtered by category
 */
export async function getQuestionsByCategory(category: string): Promise<Question[]> {
  const questions = await getQuestions();
  if (!category || category.toLowerCase() === 'all') {
    return questions;
  }
  return questions.filter((q) => q.category.toLowerCase() === category.toLowerCase());
}

/**
 * Get questions filtered by difficulty
 */
export async function getQuestionsByDifficulty(difficulty: string): Promise<Question[]> {
  const questions = await getQuestions();
  if (!difficulty || difficulty.toLowerCase() === 'all') {
    return questions;
  }
  return questions.filter((q) => q.difficulty.toLowerCase() === difficulty.toLowerCase());
}

/**
 * Clear cached questions if reload is needed
 */
export function clearQuestionCache(): void {
  cachedQuestions = null;
}
