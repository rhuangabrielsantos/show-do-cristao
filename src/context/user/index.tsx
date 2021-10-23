import React, { createContext, useState } from 'react';

type UserType = {
  name: string;
};

type PropsUserContext = {
  state: UserType;
  setState: React.Dispatch<React.SetStateAction<UserType>>;
};

const DEFAULT_USER: PropsUserContext = {
  state: {
    name: '',
  },
  setState: () => {},
};

const UserContext = createContext<PropsUserContext>(DEFAULT_USER);

const UserContextProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<UserType>(DEFAULT_USER.state);

  return (
    <UserContext.Provider value={{ state, setState }}>{children}</UserContext.Provider>
  );
};

export { UserContextProvider };
export default UserContext;
