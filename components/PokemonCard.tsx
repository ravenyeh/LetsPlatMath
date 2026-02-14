'use client';

import { PokemonCard as PokemonCardType, RARITY_CONFIG } from '@/lib/types';
import Image from 'next/image';

interface Props {
  card: PokemonCardType;
  isNew?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function PokemonCard({ card, isNew = false, size = 'md' }: Props) {
  const config = RARITY_CONFIG[card.rarity];

  const sizeClasses = {
    sm: 'w-32 h-44',
    md: 'w-44 h-60',
    lg: 'w-56 h-76',
  };

  const imgSizes = {
    sm: 80,
    md: 120,
    lg: 160,
  };

  return (
    <div
      className={`${sizeClasses[size]} relative rounded-xl p-[3px] transition-transform hover:scale-105 ${
        card.rarity === 'SSR'
          ? 'animate-pulse bg-gradient-to-br from-purple-400 via-pink-400 to-yellow-400'
          : card.rarity === 'SR'
          ? 'bg-gradient-to-br from-yellow-300 to-amber-500'
          : card.rarity === 'R'
          ? 'bg-gradient-to-br from-blue-300 to-blue-500'
          : 'bg-gradient-to-br from-gray-300 to-gray-400'
      }`}
    >
      <div
        className={`h-full w-full rounded-lg bg-gradient-to-b ${config.bgClass} flex flex-col items-center justify-between p-3`}
      >
        {isNew && (
          <span className="absolute -right-2 -top-2 rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white shadow-lg">
            NEW!
          </span>
        )}

        <div className="text-center">
          <span
            className="rounded-full px-2 py-0.5 text-xs font-bold text-white"
            style={{ backgroundColor: config.color }}
          >
            {config.label}
          </span>
        </div>

        <div className="relative flex-1 flex items-center justify-center">
          <Image
            src={card.image}
            alt={card.nameZh}
            width={imgSizes[size]}
            height={imgSizes[size]}
            className="drop-shadow-lg"
            unoptimized
          />
        </div>

        <div className="text-center">
          <p className="font-bold text-gray-800 text-sm">{card.nameZh}</p>
          <p className="text-xs text-gray-600">{card.type}系</p>
        </div>
      </div>
    </div>
  );
}
