import React from 'react';

import { UserContextProvider } from './user';

const GlobalContextProvider: React.FC = ({ children }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export default GlobalContextProvider;
