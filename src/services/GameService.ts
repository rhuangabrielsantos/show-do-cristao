import { moneyLevels } from "../data/moneyLevels";
import { questions } from "../data/questions";
import { MoneyLevel } from "../interfaces/MoneyLevel";
import { Question, LevelQuestionProp } from "../interfaces/Question";

type CleanPosibilities = {
  [key in LevelQuestionProp]: (value: []) => void;
};

export function getQuestion(
  level: LevelQuestionProp,
  questionsAnswered: number[],
  easy: {
    state: number[];
    function: (value: []) => void;
  },
  medium: {
    state: number[];
    function: (value: []) => void;
  },
  hard: {
    state: number[];
    function: (value: []) => void;
  },
  extreme: {
    state: number[];
    function: (value: []) => void;
  }
): Question {
  const handleQuestionAlreadyAnswered = {
    easy: easy.state,
    medium: medium.state,
    hard: hard.state,
    extreme: extreme.state,
  };

  const filteredQuestions = questions
    .map((question) =>
      question.level === level &&
      !handleQuestionAlreadyAnswered[question.level].find(
        (qa) => qa === question.id
      ) &&
      !questionsAnswered.find((qa) => qa === question.id)
        ? question
        : null
    )
    .filter((question) => question !== null);

  if (filteredQuestions.length === 0) {
    const handleCleanStates: CleanPosibilities = {
      easy: easy.function,
      medium: medium.function,
      hard: hard.function,
      extreme: extreme.function,
    };

    handleCleanStates[level]([]);

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

  const randomQuestion =
    filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];

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
