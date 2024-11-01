import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { loginUser, registerUser } from '@/api/auth';
import { setCookie, getCookie, removeCookie } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  register: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  isAuthenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getCookie('token'));

  useEffect(() => {
    const token = getCookie('token');
    setIsAuthenticated(!!token);
  }, []);

  const register = async (name: string, email: string, passwordHash: string) => {
    const response = await registerUser({ name, email, passwordHash });
    setCookie('token', response.token);
    setIsAuthenticated(true);
  };

  const login = async (email: string, password: string) => {
    const response = await loginUser({ email, password });
    if (response.token) {
      setCookie('token', response.token);
      setIsAuthenticated(true);
    } else {
      throw new Error('Falha no login');
    }
  };

  const logout = () => {
    removeCookie('token'); 
    setIsAuthenticated(false); 
  };

  return (
    <AuthContext.Provider value={{ register, login, isAuthenticated, logout }}>
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

export function Dashboard() {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login'); 
  };

  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export { AuthContext };
