import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  setAuthToken: (token: string, expiresIn: number) => void;
  clearAuthToken: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authTokenExpiry');
    if (token && expiry) {
      const currentTime = new Date().getTime();
      return currentTime < Number(expiry);
    }
    return false;
  });
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authTokenExpiry');

    if (token && expiry) {
      const currentTime = new Date().getTime();
      if (currentTime < Number(expiry)) {
        setIsAuthenticated(true);
      } else {
        clearAuthToken();
      }
    }
    setLoading(false);
  }, []);

  const setAuthToken = (token: string, expiresIn: number) => {
    const expiryTime = new Date().getTime() + expiresIn * 1000;
    localStorage.setItem('authToken', token);
    localStorage.setItem('authTokenExpiry', expiryTime.toString());
    setIsAuthenticated(true);
  };

  const clearAuthToken = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiry');
    setIsAuthenticated(false);
    navigate('/login');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthToken, clearAuthToken, setIsAuthenticated }}>
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
