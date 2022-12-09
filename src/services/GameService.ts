import { moneyLevels } from "../data/moneyLevels";
import { questions } from "../data/questions";
import { MoneyLevel } from "../interfaces/MoneyLevel";
import { Question } from "../interfaces/Question";

export function getQuestion(
  level: string,
  questionsAnswered: number[]
): Question {
  const questionByLevel = questions
    .map((question) =>
      question.level === level &&
      !questionsAnswered.find((qa) => qa === question.id)
        ? question
        : null
    )
    .filter((question) => question !== null);

  const randomQuestion =
    questionByLevel[Math.floor(Math.random() * questionByLevel.length)];

  if (!randomQuestion) {
    throw new Error(
      `Não foi possível encontrar a pergunta para o nível ${level}`
    );
  }

  return randomQuestion;
}

export function handleNextMoney(actualMoney?: number): MoneyLevel | null {
  const nextMoney =
    moneyLevels.findIndex((money: MoneyLevel) => money.amount === actualMoney) -
    1;

  return moneyLevels[nextMoney];
}
