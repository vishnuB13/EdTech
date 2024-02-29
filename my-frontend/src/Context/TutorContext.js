// LoginContext.js
import { createContext, useContext, useState } from 'react';

const TutorLoginContext = createContext();

export const useTutorLoginContext = () => {
  const context = useContext(TutorLoginContext);

  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }

  return context;
};

export const TutorLoginProvider = ({ children }) => {
  const [isTutorLoggedIn, setTutorLoggedIn] = useState(false);

  const tutorlogin = () => {
    setTutorLoggedIn(true);
  };

  const tutorlogout = () => {
    setTutorLoggedIn(false);
  };

  return (
    <TutorLoginContext.Provider value={{ isTutorLoggedIn, tutorlogin, tutorlogout }}>
      {children}
    </TutorLoginContext.Provider>
  );
};
