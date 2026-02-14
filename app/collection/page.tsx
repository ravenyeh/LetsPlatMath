'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loadGameState, resetGameState } from '@/lib/storage';
import { CollectedCard } from '@/lib/types';
import CollectionGrid from '@/components/CollectionGrid';

export default function CollectionPage() {
  const router = useRouter();
  const [cards, setCards] = useState<CollectedCard[]>([]);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const state = loadGameState();
    setCards(state.collection);
  }, []);

  const handleReset = () => {
    resetGameState();
    setCards([]);
    setShowConfirm(false);
  };

  return (
    <main className="min-h-screen p-6">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => router.push('/')}
            className="rounded-full bg-white/80 px-4 py-2 text-gray-600 shadow hover:bg-white"
          >
            ← 返回
          </button>

          <h1 className="text-2xl font-bold text-gray-800">🎴 我的卡冊</h1>

          {cards.length > 0 ? (
            <button
              onClick={() => setShowConfirm(true)}
              className="rounded-full bg-red-100 px-3 py-1 text-sm text-red-500 hover:bg-red-200"
            >
              重置
            </button>
          ) : (
            <div className="w-12" />
          )}
        </div>

        {/* Collection */}
        <CollectionGrid cards={cards} />

        {/* Reset confirmation */}
        {showConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
            <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
              <p className="text-xl font-bold text-gray-800 mb-2">確定要重置嗎？</p>
              <p className="text-gray-500 mb-6">所有收集的卡片都會消失喔！</p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 rounded-xl bg-gray-200 py-2 font-bold text-gray-600"
                >
                  取消
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-xl bg-red-500 py-2 font-bold text-white"
                >
                  確定重置
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/quiz')}
            className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 px-8 py-3 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
          >
            🎮 繼續答題收集卡片
          </button>
        </div>
      </div>
    </main>
  );
}
