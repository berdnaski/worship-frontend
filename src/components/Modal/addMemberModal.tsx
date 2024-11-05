import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { getUsers, type UserResponse } from "@/api/user";
import { toast } from "sonner";
import { addUserToDepartment } from "@/api/department";

interface AddMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  departmentId: string;
  onMemberAdded: () => void; 
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({ isOpen, onClose, departmentId, onMemberAdded }) => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAddMember = async () => {
    if (!selectedUserId) return;
    
    const isUserInDepartment = users.find(user => user.id === selectedUserId && user.departmentId === departmentId);
  
    if (isUserInDepartment) {
      toast.error("Este membro já está no departamento.");
      return;
    }
  
    try {
      await addUserToDepartment(departmentId, selectedUserId);
      toast.success("Membro adicionado com sucesso!");
      onMemberAdded(); 
      onClose(); 
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      toast.error("Erro ao adicionar membro. Tente novamente.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md p-6 bg-zinc-900 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center text-orange-500">Adicionar Membro</DialogTitle>
          <DialogDescription className="text-center text-zinc-400">
            Selecione um membro para adicionar ao departamento.
          </DialogDescription>
        </DialogHeader>
        <select
          className="w-full mt-4 px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          onChange={(e) => setSelectedUserId(e.target.value)}
          value={selectedUserId || ""}
        >
          <option value="">Selecione um usuário</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <div className="mt-6 flex justify-between">
          <Button onClick={handleAddMember} className="w-1/2 mr-2">Adicionar</Button>
          <Button variant="ghost" onClick={onClose} className="w-1/2 ml-2">Cancelar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddMemberModal;
