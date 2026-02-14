'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { drawCards } from '@/lib/pokemon';
import { addCardsToCollection } from '@/lib/storage';
import { PokemonCard as PokemonCardType } from '@/lib/types';
import DrawAnimation from '@/components/DrawAnimation';

function DrawContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cards, setCards] = useState<PokemonCardType[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const correct = parseInt(searchParams.get('correct') || '0', 10);
    const total = parseInt(searchParams.get('total') || '10', 10);

    if (correct < 7) {
      router.push('/quiz');
      return;
    }

    const drawnCards = drawCards(correct, total);
    setCards(drawnCards);
    addCardsToCollection(drawnCards);
    setIsLoaded(true);
  }, [searchParams, router]);

  const handleComplete = () => {
    router.push('/collection');
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-xl text-gray-500 animate-pulse">載入中...</p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <DrawAnimation cards={cards} onComplete={handleComplete} />
    </main>
  );
}

export default function DrawPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xl text-gray-500 animate-pulse">載入中...</p>
        </div>
      }
    >
      <DrawContent />
    </Suspense>
  );
}
