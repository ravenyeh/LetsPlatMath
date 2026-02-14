import { Grade, MathQuestion, Operation } from './types';

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateQuestion(grade: Grade, id: number): MathQuestion {
  const operations = getOperationsForGrade(grade);
  const operation = operations[randomInt(0, operations.length - 1)];

  let num1: number, num2: number, answer: number;

  switch (operation) {
    case '+':
      if (grade === 2) {
        num1 = randomInt(1, 50);
        num2 = randomInt(1, 50);
      } else {
        num1 = randomInt(10, 200);
        num2 = randomInt(10, 200);
      }
      answer = num1 + num2;
      break;

    case '-':
      if (grade === 2) {
        num1 = randomInt(10, 99);
        num2 = randomInt(1, num1);
      } else {
        num1 = randomInt(50, 400);
        num2 = randomInt(1, num1);
      }
      answer = num1 - num2;
      break;

    case '×':
      num1 = randomInt(2, 9);
      num2 = randomInt(2, 9);
      answer = num1 * num2;
      break;

    case '÷':
      num2 = randomInt(2, 9);
      answer = randomInt(1, 9);
      num1 = num2 * answer;
      break;

    default:
      num1 = 1;
      num2 = 1;
      answer = 2;
  }

  return {
    id,
    num1,
    num2,
    operation,
    answer,
    displayText: `${num1} ${operation} ${num2} = ?`,
  };
}

function getOperationsForGrade(grade: Grade): Operation[] {
  if (grade === 2) return ['+', '-'];
  return ['+', '-', '×', '÷'];
}

export function generateQuiz(grade: Grade, count: number = 10): MathQuestion[] {
  return Array.from({ length: count }, (_, i) => generateQuestion(grade, i + 1));
}

export function generateChoices(answer: number): number[] {
  const choices = new Set<number>([answer]);

  while (choices.size < 4) {
    const offset = randomInt(1, Math.max(5, Math.floor(answer * 0.3)));
    const wrong = Math.random() > 0.5 ? answer + offset : Math.max(0, answer - offset);
    if (wrong !== answer) {
      choices.add(wrong);
    }
  }

  return Array.from(choices).sort(() => Math.random() - 0.5);
}
