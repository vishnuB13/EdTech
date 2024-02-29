// LoginContext.js
import { createContext, useContext, useState } from 'react';

const AdminLoginContext = createContext();

export const useAdminLoginContext = () => {
  const context = useContext(AdminLoginContext);

  if (!context) {
    throw new Error('useLoginContext must be used within a LoginProvider');
  }

  return context;
};

export const AdminLoginProvider = ({ children }) => {
  const [isAdminLoggedIn, setAdminLoggedIn] = useState(false);

  const adminlogin = () => {
    setAdminLoggedIn(true);
  };

  const adminlogout = () => {
    setAdminLoggedIn(false);
  };

  return (
    <AdminLoginContext.Provider value={{ isAdminLoggedIn, adminlogin, adminlogout }}>
      {children}
    </AdminLoginContext.Provider>
  );
};
