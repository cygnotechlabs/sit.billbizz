import React, { createContext, useContext, useState, useEffect } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_EXPIRY_KEY = 'tokenExpiry';
const AUTH_TOKEN_KEY = 'authToken';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
    if (token && expiry) {
      const expiryTime = new Date(expiry).getTime();
      const currentTime = new Date().getTime();
      return currentTime < expiryTime;
    }
    return false;
  });

  useEffect(() => {
    const checkTokenValidity = () => {
      const expiry = localStorage.getItem(TOKEN_EXPIRY_KEY);
      if (expiry) {
        const expiryTime = new Date(expiry).getTime();
        const currentTime = new Date().getTime();
        if (currentTime >= expiryTime) {
          localStorage.removeItem(AUTH_TOKEN_KEY);
          localStorage.removeItem(TOKEN_EXPIRY_KEY);
          setIsAuthenticated(false);
        }
      }
    };

    const interval = setInterval(checkTokenValidity, 1000 * 60); // Check every minute

    // Initial check
    checkTokenValidity();

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Example of setting the token with expiry
export const setAuthToken = (token: string) => {
  const expiryTime = new Date(new Date().getTime() + 12 * 60 * 60 * 1000); // 12 hours from now
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.toISOString());
};