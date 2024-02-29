// LoginContext.js
import { createContext, useContext, useState } from 'react';

const LoginContext = createContext();

export const useLoginContext = () => {
  const context = useContext(LoginContext);

  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }

  return context;
};

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const login = () => {
    setLoggedIn(true);
  };

  const logout = () => {
    setLoggedIn(false);
  };

  return (
    <LoginContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </LoginContext.Provider>
  );
};
