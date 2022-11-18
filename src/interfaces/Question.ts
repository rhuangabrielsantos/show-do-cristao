export interface Question {
  id: number;
  question: string;
  answer: string;
  level: LevelQuestionProp;
  options: string[];
}

export type LevelQuestionProp = "easy" | "medium" | "hard" | "extreme";
