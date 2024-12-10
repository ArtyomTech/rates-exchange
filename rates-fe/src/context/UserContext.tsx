import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  username: string | null;
  setUsername: (username: string | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem('username') || null,
  );

  const updateUsername = (name: string | null) => {
    if (name) {
      localStorage.setItem('username', name);
    } else {
      localStorage.removeItem('username');
    }
    setUsername(name);
  };

  return (
    <UserContext.Provider value={{ username, setUsername: updateUsername }}>
      {children}
    </UserContext.Provider>
  );
};
