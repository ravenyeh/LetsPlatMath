import { CollectedCard, GameState, PokemonCard } from './types';

const STORAGE_KEY = 'letsplatmath_game';

function getDefaultState(): GameState {
  return {
    collection: [],
    totalQuizzes: 0,
    totalCorrect: 0,
  };
}

export function loadGameState(): GameState {
  if (typeof window === 'undefined') return getDefaultState();

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return getDefaultState();
    return JSON.parse(data) as GameState;
  } catch {
    return getDefaultState();
  }
}

export function saveGameState(state: GameState): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function addCardsToCollection(cards: PokemonCard[]): GameState {
  const state = loadGameState();

  const newCards: CollectedCard[] = cards.map((card) => ({
    ...card,
    collectedAt: new Date().toISOString(),
  }));

  state.collection = [...state.collection, ...newCards];
  saveGameState(state);
  return state;
}

export function updateQuizStats(correctCount: number): GameState {
  const state = loadGameState();
  state.totalQuizzes += 1;
  state.totalCorrect += correctCount;
  saveGameState(state);
  return state;
}

export function resetGameState(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}
