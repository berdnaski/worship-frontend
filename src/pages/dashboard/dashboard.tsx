import React, { useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from 'react-router-dom';

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
