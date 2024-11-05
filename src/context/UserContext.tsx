import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface UserContextType {
  isLoggedIn: boolean;
  userId: string | null;
  login: (id: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }
  }, []);

  const login = (id: string) => {
    setIsLoggedIn(true);
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    localStorage.removeItem('userId');
  };

  return (
    <UserContext.Provider value={{ isLoggedIn, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
