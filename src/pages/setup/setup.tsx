import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext'; 
import { useNavigate } from 'react-router-dom';
import { completeUserSetup } from '@/api/setup'; 

export function Setup() {
  const { completeSetup, hasSetup, userId } = useAuth(); 
  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<'ADMIN' | 'LEADER' | 'MEMBER'>('MEMBER'); 
  const [code, setCode] = useState<string>(''); 
  const [submitted, setSubmitted] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (hasSetup) {
      navigate('/dashboard');
    }
  }, [hasSetup, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userId) {
      console.error('Erro: userId não está disponível.');
      return; 
    }
    try {
      await completeUserSetup({ userId, role, code }); 
      setSubmitted(true);
      completeSetup(); 
    } catch (error) {
      console.error('Erro ao completar o setup:', error);
    }
  };
  
  return (
    <div>
      <h1>Setup</h1>
      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Nome:</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="role">Papel:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value as 'ADMIN' | 'LEADER' | 'MEMBER')}
              required
            >
              <option value="ADMIN">Admin</option>
              <option value="LEADER">Líder</option>
              <option value="MEMBER">Membro</option>
            </select>
          </div>
          <div>
            <label htmlFor="code">Código:</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
          <button type="submit">Completar Setup</button>
        </form>
      ) : (
        <div>
          <h2>Setup completo!</h2>
          <p>Obrigado, {name}!</p>
        </div>
      )}
    </div>
  );
}