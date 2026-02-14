export type Grade = 2 | 3;

export type Operation = '+' | '-' | '×' | '÷';

export interface MathQuestion {
  id: number;
  num1: number;
  num2: number;
  operation: Operation;
  answer: number;
  displayText: string;
}

export type Rarity = 'N' | 'R' | 'SR' | 'SSR';

export interface PokemonCard {
  id: number;
  name: string;
  nameZh: string;
  image: string;
  rarity: Rarity;
  type: string;
}

export interface CollectedCard extends PokemonCard {
  collectedAt: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctCount: number;
  cardsEarned: number;
}

export interface GameState {
  collection: CollectedCard[];
  totalQuizzes: number;
  totalCorrect: number;
}

export const RARITY_CONFIG: Record<Rarity, { label: string; color: string; chance: number; bgClass: string }> = {
  N: { label: '⭐ 普通', color: '#9CA3AF', chance: 0.60, bgClass: 'from-gray-200 to-gray-300' },
  R: { label: '⭐⭐ 稀有', color: '#3B82F6', chance: 0.25, bgClass: 'from-blue-200 to-blue-400' },
  SR: { label: '⭐⭐⭐ 超稀有', color: '#F59E0B', chance: 0.12, bgClass: 'from-yellow-200 to-yellow-500' },
  SSR: { label: '⭐⭐⭐⭐ 傳說', color: '#8B5CF6', chance: 0.03, bgClass: 'from-purple-300 to-pink-400' },
};
