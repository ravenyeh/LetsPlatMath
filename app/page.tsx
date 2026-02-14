'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { loadGameState } from '@/lib/storage';
import { GameState } from '@/lib/types';

export default function Home() {
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    setGameState(loadGameState());
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <div className="w-full max-w-md text-center">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
            LetsPlatMath
          </h1>
          <p className="text-2xl font-bold text-gray-700">數學大冒險</p>
          <p className="mt-2 text-gray-500">答對題目，收集寶可夢卡片！</p>
        </div>

        {/* Pokeball decoration */}
        <div className="relative mx-auto mb-8 h-32 w-32">
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-red-500 to-red-600 shadow-xl">
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-800 -translate-y-1/2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border-4 border-gray-800 z-10" />
            <div className="absolute bottom-0 left-0 right-0 top-1/2 rounded-b-full bg-white" />
          </div>
        </div>

        {/* Stats */}
        {gameState && gameState.collection.length > 0 && (
          <div className="mb-6 flex justify-center gap-4">
            <div className="rounded-xl bg-white/80 px-4 py-2 shadow">
              <p className="text-sm text-gray-500">已收集</p>
              <p className="text-xl font-bold text-purple-500">{gameState.collection.length} 張</p>
            </div>
            <div className="rounded-xl bg-white/80 px-4 py-2 shadow">
              <p className="text-sm text-gray-500">答題次數</p>
              <p className="text-xl font-bold text-blue-500">{gameState.totalQuizzes} 次</p>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            href="/quiz"
            className="block w-full rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-4 text-xl font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
          >
            🎮 開始答題
          </Link>

          <Link
            href="/collection"
            className="block w-full rounded-2xl bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-4 text-xl font-bold text-white shadow-lg transition-all hover:shadow-xl hover:scale-105 active:scale-95"
          >
            🎴 我的卡冊 {gameState && gameState.collection.length > 0 && `(${gameState.collection.length})`}
          </Link>
        </div>
      </div>
    </main>
  );
}
