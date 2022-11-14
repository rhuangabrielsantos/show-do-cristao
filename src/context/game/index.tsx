import React, { createContext, useState } from 'react';

type GameType = {
  name: string;
  money: number;
  moneyEarned?: string;

  notice: string;
  level: string;
  questionsAnswered: number[];

  skips: number
};

type PropsGameContext = {
  state: GameType;
  setState: React.Dispatch<React.SetStateAction<GameType>>;
};

const DEFAULT_GAME: PropsGameContext = {
  state: {
    name: '',
    money: 1000,
    notice: '',
    level: '',
    questionsAnswered: [],
    skips: 0
  },
  setState: () => {},
};

const GameContext = createContext<PropsGameContext>(DEFAULT_GAME);

const GameContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<GameType>(DEFAULT_GAME.state);

  return (
    <GameContext.Provider value={{ state, setState }}>{children}</GameContext.Provider>
  );
};

export { GameContextProvider };
export default GameContext;
