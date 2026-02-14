'use client';

import { CollectedCard, RARITY_CONFIG, Rarity } from '@/lib/types';
import PokemonCard from './PokemonCard';

interface Props {
  cards: CollectedCard[];
}

export default function CollectionGrid({ cards }: Props) {
  // Group by rarity for display
  const rarityOrder: Rarity[] = ['SSR', 'SR', 'R', 'N'];

  // Count unique cards
  const uniqueIds = new Set(cards.map((c) => c.id));

  if (cards.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-6xl mb-4">📭</p>
        <p className="text-xl text-gray-500">還沒有收集到任何卡片</p>
        <p className="text-gray-400 mt-2">答對題目就能抽卡喔！</p>
      </div>
    );
  }

  return (
    <div>
      {/* Stats */}
      <div className="mb-6 flex justify-center gap-6 text-center">
        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-2xl font-bold text-blue-500">{cards.length}</p>
          <p className="text-sm text-gray-500">總卡片數</p>
        </div>
        <div className="rounded-xl bg-white p-4 shadow">
          <p className="text-2xl font-bold text-purple-500">{uniqueIds.size}</p>
          <p className="text-sm text-gray-500">不同種類</p>
        </div>
      </div>

      {/* Cards by rarity */}
      {rarityOrder.map((rarity) => {
        const rarityCards = cards.filter((c) => c.rarity === rarity);
        if (rarityCards.length === 0) return null;

        const config = RARITY_CONFIG[rarity];

        return (
          <div key={rarity} className="mb-8">
            <h3 className="mb-3 text-lg font-bold" style={{ color: config.color }}>
              {config.label} ({rarityCards.length})
            </h3>
            <div className="flex flex-wrap gap-3">
              {rarityCards.map((card, i) => (
                <PokemonCard key={`${card.id}-${i}`} card={card} size="sm" />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
