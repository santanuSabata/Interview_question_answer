/**
 * Shuffles an array using the modern Fisher-Yates algorithm
 * Creates a shallow copy so original array is not mutated
 */
export function shuffleQuestions<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
