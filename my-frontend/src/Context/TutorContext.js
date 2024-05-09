// LoginContext.js
import { createContext, useContext, useState } from 'react';
import Cookies from 'js-cookie';

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
    Cookies.remove('tutoraccesstoken')
    setTutorLoggedIn(false);
  };

  return (
    <TutorLoginContext.Provider value={{ isTutorLoggedIn, tutorlogin, tutorlogout }}>
      {children}
    </TutorLoginContext.Provider>
  );
};
