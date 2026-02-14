'use client';

import { MathQuestion } from '@/lib/types';

interface Props {
  question: MathQuestion;
  choices: number[];
  onAnswer: (answer: number) => void;
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  questionNumber: number;
  totalQuestions: number;
}

export default function QuizCard({
  question,
  choices,
  onAnswer,
  selectedAnswer,
  isCorrect,
  questionNumber,
  totalQuestions,
}: Props) {
  return (
    <div className="w-full max-w-md mx-auto">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>第 {questionNumber} 題</span>
          <span>共 {totalQuestions} 題</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
        <p className="text-4xl font-bold text-center text-gray-800">
          {question.displayText}
        </p>
      </div>

      {/* Choices */}
      <div className="grid grid-cols-2 gap-3">
        {choices.map((choice) => {
          let btnClass = 'bg-white hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-400 text-gray-800';

          if (selectedAnswer !== null) {
            if (choice === question.answer) {
              btnClass = 'bg-green-500 border-2 border-green-600 text-white';
            } else if (choice === selectedAnswer && !isCorrect) {
              btnClass = 'bg-red-500 border-2 border-red-600 text-white';
            } else {
              btnClass = 'bg-gray-100 border-2 border-gray-200 text-gray-400';
            }
          }

          return (
            <button
              key={choice}
              onClick={() => selectedAnswer === null && onAnswer(choice)}
              disabled={selectedAnswer !== null}
              className={`${btnClass} rounded-xl p-4 text-2xl font-bold transition-transform duration-200 active:scale-95`}
            >
              {choice}
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {selectedAnswer !== null && (
        <div className={`mt-4 text-center text-xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
          {isCorrect ? '🎉 答對了！' : `❌ 正確答案是 ${question.answer}`}
        </div>
      )}
    </div>
  );
}
