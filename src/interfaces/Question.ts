export interface Question {
  id: number;
  question: string;
  answer: AnswerProp;
  level: LevelQuestionProp;
  options: string[];
}

export type LevelQuestionProp = "easy" | "medium" | "hard" | "extreme";

export type AnswerProp = "A" | "B" | "C" | "D";
