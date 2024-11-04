import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface SetupRouteProps {
  children: React.ReactNode;
}

const SetupRoute: React.FC<SetupRouteProps> = ({ children }) => {
  const { hasSetup } = useAuth();

  if (hasSetup) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>; 
};

export default SetupRoute;
