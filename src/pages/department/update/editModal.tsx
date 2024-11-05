import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { updateDepartment } from '@/api/department'; 
import { DepartmentResponse } from '@/api/department';

interface EditDepartmentDialogProps {
  open: boolean; 
  onClose: () => void; 
  department: DepartmentResponse; 
  onDepartmentUpdated: (updatedDepartment: DepartmentResponse) => void; 
}

export function EditDepartmentDialog({ open, onClose, department, onDepartmentUpdated }: EditDepartmentDialogProps) {
  const [name, setName] = useState<string>(department.name);
  const [description, setDescription] = useState<string>(department.description);

  useEffect(() => {
    setName(department.name);
    setDescription(department.description);
  }, [department]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const updatedDepartment = await updateDepartment(department.id, { name, description });
      toast.success('Departamento atualizado com sucesso!');
      onDepartmentUpdated(updatedDepartment); 
      onClose(); 
    } catch (error) {
      console.error('Erro ao atualizar o departamento:', error);
      toast.error('Erro ao atualizar o departamento. Verifique os dados e tente novamente.');
    }
  };

  if (!open) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-zinc-900 rounded-lg shadow-md p-6 relative w-full max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          Fechar
        </button>
        <h1 className="text-2xl font-semibold text-center text-orange-500 mb-4">Editar Departamento</h1>
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
            <label htmlFor="description" className="block text-sm font-medium text-zinc-400">Descrição</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              rows={3}
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors duration-300"
          >
            Atualizar Departamento
          </button>
        </form>
      </div>
    </div>
  );
}
