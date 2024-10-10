import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Make sure to install react-router-dom

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  setAuthToken: (token: string, expiresIn: number) => void;
  clearAuthToken: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expiry = localStorage.getItem('authTokenExpiry');

    if (token && expiry) {
      const currentTime = new Date().getTime();
      // Check if token is expired
      if (currentTime < Number(expiry)) {
        setIsAuthenticated(true);
      } else {
        clearAuthToken(); // Token expired, clear it and navigate to login
      }
    }
  }, []);

  const setAuthToken = (token: string, expiresIn: number) => {
    const expiryTime = new Date().getTime() + expiresIn * 1000; // Convert seconds to milliseconds
    localStorage.setItem('authToken', token);
    localStorage.setItem('authTokenExpiry', expiryTime.toString());
    setIsAuthenticated(true); // Set authenticated state to true
  };

  const clearAuthToken = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('authTokenExpiry');
    setIsAuthenticated(false); // Update authentication state
    navigate('/login'); // Redirect to login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthToken, clearAuthToken,setIsAuthenticated }}>
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
