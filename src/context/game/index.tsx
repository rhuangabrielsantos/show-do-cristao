import React, { createContext, useState } from "react";
import { AnswerProp } from "../../interfaces/Question";

type GameType = {
  name: string;
  money: number;
  moneyEarned?: string;

  notice: string;
  level: string;
  questionsAnswered: number[];

  skips: number;
  helps: HelpsProps;

  hiddenQuestions: AnswerProp[];
};

type HelpsProps = {
  audience: boolean;
  seminarists: boolean;
  cards: boolean;
};

type PropsGameContext = {
  state: GameType;
  setState: React.Dispatch<React.SetStateAction<GameType>>;
};

const setStateInitial = () => {
  return;
};

const DEFAULT_GAME: PropsGameContext = {
  state: {
    name: "",
    money: 1000,
    notice: "",
    level: "",
    questionsAnswered: [],
    skips: 0,
    helps: {
      audience: true,
      seminarists: true,
      cards: true,
    },
    hiddenQuestions: [],
  },
  setState: () => setStateInitial,
};

const GameContext = createContext<PropsGameContext>(DEFAULT_GAME);

const GameContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<GameType>(DEFAULT_GAME.state);

  return (
    <GameContext.Provider value={{ state, setState }}>
      {children}
    </GameContext.Provider>
  );
};

export { GameContextProvider };
export default GameContext;
