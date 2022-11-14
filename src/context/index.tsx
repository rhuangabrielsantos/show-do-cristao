import React from "react";

import { GameContextProvider } from "./game";

const GlobalContextProvider: React.FC = ({ children }) => {
  return <GameContextProvider>{children}</GameContextProvider>;
};

export default GlobalContextProvider;
