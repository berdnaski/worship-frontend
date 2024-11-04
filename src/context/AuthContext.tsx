import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loginUser, registerUser } from '@/api/auth';
import { setCookie, getCookie, removeCookie } from '@/utils/cookie';

interface AuthContextType {
  register: (name: string, email: string, passwordHash: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  hasSetup: boolean; 
  completeSetup: () => void; 
  logout: () => void;
  userId?: string; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getCookie('token'));
  const [hasSetup, setHasSetup] = useState<boolean>(false); 
  const [userId, setUserId] = useState<string | undefined>(undefined); 

  useEffect(() => {
    const token = getCookie('token');
    setIsAuthenticated(!!token);
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1])); 
      setUserId(decodedToken.sub); 

      const userHasSetup = !!getCookie('setupComplete'); 
      setHasSetup(userHasSetup);
    }
  }, []);

  const register = async (name: string, email: string, passwordHash: string) => {
    const response = await registerUser({ name, email, passwordHash });
    setCookie('token', response.token);
    setIsAuthenticated(true);
    setHasSetup(false); 
    removeCookie('setupComplete');
    const decodedToken = JSON.parse(atob(response.token.split('.')[1]));
    setUserId(decodedToken.sub); 
  };

  const login = async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    if (response.token) {
      setCookie('token', response.token);
      setIsAuthenticated(true);
      const decodedToken = JSON.parse(atob(response.token.split('.')[1]));
      setUserId(decodedToken.sub); 
      const userHasSetup = response.user.initialSetupCompleted; 
      setHasSetup(userHasSetup);
    } else {
      throw new Error('Falha no login');
    }
  };
  
  const completeSetup = () => {
    setHasSetup(true);
    setCookie('setupComplete', 'true'); 
  };

  const logout = () => {
    removeCookie('token'); 
    setIsAuthenticated(false);
    setHasSetup(false); 
    removeCookie('setupComplete'); 
    setUserId(undefined); 
  };

  return (
    <AuthContext.Provider value={{ register, login, isAuthenticated, hasSetup, completeSetup, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export { AuthContext, AuthProvider };
