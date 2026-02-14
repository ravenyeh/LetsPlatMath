'use client';

import { Grade } from '@/lib/types';

interface Props {
  onSelect: (grade: Grade) => void;
}

export default function GradeSelector({ onSelect }: Props) {
  return (
    <div className="w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        選擇年級
      </h2>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => onSelect(2)}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-400 to-emerald-500 p-6 text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
        >
          <div className="relative z-10">
            <p className="text-3xl font-bold">二年級</p>
            <p className="mt-1 text-green-100">加法、減法</p>
          </div>
          <div className="absolute -right-4 -top-4 text-8xl opacity-20 transition-transform group-hover:scale-110">
            ➕
          </div>
        </button>

        <button
          onClick={() => onSelect(3)}
          className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-400 to-indigo-500 p-6 text-white shadow-lg transition-all hover:shadow-xl active:scale-95"
        >
          <div className="relative z-10">
            <p className="text-3xl font-bold">三年級</p>
            <p className="mt-1 text-blue-100">加法、減法、乘法、除法</p>
          </div>
          <div className="absolute -right-4 -top-4 text-8xl opacity-20 transition-transform group-hover:scale-110">
            ✖️
          </div>
        </button>
      </div>
    </div>
  );
}
