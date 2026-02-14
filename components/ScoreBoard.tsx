'use client';

import { getCardsEarnedCount } from '@/lib/pokemon';

interface Props {
  correctCount: number;
  totalQuestions: number;
  onDrawCards: () => void;
  onRetry: () => void;
  onHome: () => void;
}

export default function ScoreBoard({ correctCount, totalQuestions, onDrawCards, onRetry, onHome }: Props) {
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const cardsEarned = getCardsEarnedCount(correctCount, totalQuestions);
  const passed = cardsEarned > 0;

  const getMessage = () => {
    if (correctCount === totalQuestions) return '🏆 滿分！太厲害了！';
    if (correctCount >= 9) return '🌟 非常棒！';
    if (correctCount >= 7) return '👍 做得好！';
    if (correctCount >= 5) return '💪 加油，再努力一下！';
    return '📚 多多練習，你可以的！';
  };

  return (
    <div className="w-full max-w-md mx-auto text-center">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold mb-2">{getMessage()}</h2>

        {/* Score circle */}
        <div className="relative mx-auto my-6 h-36 w-36">
          <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" strokeWidth="8" />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={passed ? '#22C55E' : '#EF4444'}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.83} 283`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{correctCount}/{totalQuestions}</span>
            <span className="text-sm text-gray-500">{percentage}%</span>
          </div>
        </div>

        {/* Cards earned */}
        {passed ? (
          <div className="mb-6">
            <p className="text-lg text-gray-600">
              你獲得了 <span className="text-2xl font-bold text-yellow-500">{cardsEarned}</span> 次抽卡機會！
            </p>
          </div>
        ) : (
          <div className="mb-6">
            <p className="text-gray-500">答對 7 題以上才能抽卡喔！</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          {passed && (
            <button
              onClick={onDrawCards}
              className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all hover:shadow-xl active:scale-95 animate-pulse"
            >
              🎴 開始抽卡！
            </button>
          )}
          <button
            onClick={onRetry}
            className="w-full rounded-full bg-blue-500 px-6 py-3 text-lg font-bold text-white shadow-lg transition-all hover:bg-blue-600 active:scale-95"
          >
            🔄 再玩一次
          </button>
          <button
            onClick={onHome}
            className="w-full rounded-full bg-gray-200 px-6 py-3 text-lg font-bold text-gray-600 transition-all hover:bg-gray-300 active:scale-95"
          >
            🏠 回首頁
          </button>
        </div>
      </div>
    </div>
  );
}
