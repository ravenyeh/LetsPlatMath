'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Grade } from '@/lib/types';
import { generateQuiz, generateChoices } from '@/lib/math-generator';
import { updateQuizStats } from '@/lib/storage';
import GradeSelector from '@/components/GradeSelector';
import QuizCard from '@/components/QuizCard';
import ScoreBoard from '@/components/ScoreBoard';
import type { MathQuestion } from '@/lib/types';

type Phase = 'select-grade' | 'playing' | 'result';

export default function QuizPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>('select-grade');
  const [grade, setGrade] = useState<Grade>(2);
  const [questions, setQuestions] = useState<MathQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [choices, setChoices] = useState<number[]>([]);

  const startQuiz = useCallback((selectedGrade: Grade) => {
    setGrade(selectedGrade);
    const quiz = generateQuiz(selectedGrade, 10);
    setQuestions(quiz);
    setCurrentIndex(0);
    setCorrectCount(0);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setChoices(generateChoices(quiz[0].answer));
    setPhase('playing');
  }, []);

  const handleAnswer = useCallback((answer: number) => {
    const question = questions[currentIndex];
    const correct = answer === question.answer;

    setSelectedAnswer(answer);
    setIsCorrect(correct);

    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }

    // Auto advance after delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
        setIsCorrect(null);
        setChoices(generateChoices(questions[nextIndex].answer));
      } else {
        // Quiz finished
        const finalCorrect = correct ? correctCount + 1 : correctCount;
        setCorrectCount(finalCorrect);
        updateQuizStats(finalCorrect);
        setPhase('result');
      }
    }, 1200);
  }, [currentIndex, questions, correctCount]);

  const handleDrawCards = () => {
    router.push(`/draw?correct=${correctCount}&total=${questions.length}`);
  };

  const handleRetry = () => {
    startQuiz(grade);
  };

  const handleHome = () => {
    router.push('/');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      {/* Back button */}
      {phase === 'select-grade' && (
        <button
          onClick={() => router.push('/')}
          className="absolute left-4 top-4 rounded-full bg-white/80 px-4 py-2 text-gray-600 shadow hover:bg-white"
        >
          ← 返回
        </button>
      )}

      {phase === 'select-grade' && <GradeSelector onSelect={startQuiz} />}

      {phase === 'playing' && questions[currentIndex] && (
        <QuizCard
          question={questions[currentIndex]}
          choices={choices}
          onAnswer={handleAnswer}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
          questionNumber={currentIndex + 1}
          totalQuestions={questions.length}
        />
      )}

      {phase === 'result' && (
        <ScoreBoard
          correctCount={correctCount}
          totalQuestions={questions.length}
          onDrawCards={handleDrawCards}
          onRetry={handleRetry}
          onHome={handleHome}
        />
      )}
    </main>
  );
}
