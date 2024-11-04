import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { completeUserSetup } from '@/api/setup';
import { toast } from 'sonner';

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
      toast.error('Erro interno: ID de usuário não encontrado.');
      return;
    }

    try {
      await completeUserSetup({ userId, role, code });
      setSubmitted(true);
      completeSetup();
      toast.success('Setup concluído com sucesso!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao completar o setup:', error);
      toast.error('Erro ao completar o setup. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#131313] text-white px-4">
      <div className="w-full max-w-md space-y-6 p-6 bg-zinc-900 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-orange-500">Configuração do Perfil</h1>
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-zinc-400">Nome</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="role" className="block text-sm font-medium text-zinc-400">Papel</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value as 'ADMIN' | 'LEADER' | 'MEMBER')}
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="ADMIN">Admin</option>
                <option value="LEADER">Líder</option>
                <option value="MEMBER">Membro</option>
              </select>
            </div>
            <div className="space-y-2">
              <label htmlFor="code" className="block text-sm font-medium text-zinc-400">Código</label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors duration-300"
            >
              Concluir Setup
            </button>
          </form>
        ) : (
          <p className="text-center text-sm text-zinc-400">Redirecionando para o dashboard...</p>
        )}
      </div>
    </div>
  );
}
