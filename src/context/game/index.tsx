import React, { createContext, useState } from 'react';

type GameType = {
  name: string;
  money: number;

  notice: string;
  level: string;
  questionsAnswered: number[];
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
