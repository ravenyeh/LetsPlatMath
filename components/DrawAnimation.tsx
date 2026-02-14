'use client';

import { useState, useEffect } from 'react';
import { PokemonCard as PokemonCardType, RARITY_CONFIG } from '@/lib/types';
import PokemonCard from './PokemonCard';

interface Props {
  cards: PokemonCardType[];
  onComplete: () => void;
}

export default function DrawAnimation({ cards, onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [phase, setPhase] = useState<'waiting' | 'revealing' | 'done'>('waiting');

  useEffect(() => {
    if (phase === 'waiting') {
      const timer = setTimeout(() => {
        setCurrentIndex(0);
        setPhase('revealing');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleRevealNext = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setPhase('done');
    }
  };

  if (phase === 'waiting') {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-red-600 animate-bounce shadow-xl">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-800" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white border-4 border-gray-800" />
          </div>
        </div>
        <p className="mt-6 text-xl font-bold text-gray-600 animate-pulse">準備抽卡中...</p>
      </div>
    );
  }

  if (phase === 'revealing' && currentIndex >= 0 && currentIndex < cards.length) {
    const card = cards[currentIndex];
    const config = RARITY_CONFIG[card.rarity];

    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] animate-in fade-in zoom-in duration-500">
        <div className="mb-4">
          <span
            className="rounded-full px-4 py-1 text-lg font-bold text-white"
            style={{ backgroundColor: config.color }}
          >
            {config.label}
          </span>
        </div>

        <div className="transform transition-all duration-700 animate-bounce-once">
          <PokemonCard card={card} isNew size="lg" />
        </div>

        <p className="mt-4 text-gray-500">
          {currentIndex + 1} / {cards.length}
        </p>

        <button
          onClick={handleRevealNext}
          className="mt-6 rounded-full bg-blue-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-blue-600 active:scale-95"
        >
          {currentIndex < cards.length - 1 ? '下一張 →' : '查看全部 ✨'}
        </button>
      </div>
    );
  }

  // Done - show all cards
  return (
    <div className="flex flex-col items-center justify-center">
      <h2 className="mb-6 text-2xl font-bold text-gray-800">🎊 恭喜獲得！</h2>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {cards.map((card, i) => (
          <PokemonCard key={`${card.id}-${i}`} card={card} isNew size="md" />
        ))}
      </div>

      <button
        onClick={onComplete}
        className="rounded-full bg-green-500 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-green-600 active:scale-95"
      >
        太棒了！
      </button>
    </div>
  );
}
