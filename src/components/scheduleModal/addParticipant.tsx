import React, { useState, useEffect } from 'react';
import { getDepartmentById } from '@/api/department';
import { User } from '@/api/department'; 
import { getSchedulesByDepartment, ParticipantStatus, type Schedule } from '@/api/schedules';

interface AddParticipantModalProps {
  departmentId: string;
  isOpen: boolean;
  onClose: () => void;
  onAddParticipant: (userId: string, userName: string, status: ParticipantStatus) => void;  
}

const AddParticipantModal: React.FC<AddParticipantModalProps> = ({
  departmentId,
  isOpen,
  onClose,
  onAddParticipant,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [schedules, setSchedules] = useState<Schedule[]>([]); 

  useEffect(() => {
    if (isOpen) {
      const fetchSchedules = async () => {
        setLoading(true);
        try {
          const scheduleData = await getSchedulesByDepartment(departmentId);
          setSchedules(scheduleData);
        } catch (error) {
          console.error('Erro ao obter escalas:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSchedules();
    }
  }, [isOpen, departmentId]);

  useEffect(() => {
    let isMounted = true;
  
    const fetchUsers = async () => {
      if (!isMounted) return;
      setLoading(true);
      try {
        const data = await getDepartmentById(departmentId);
        const availableUsers = data.users.filter((user: User) =>
          !schedules.some((schedule) =>
            schedule.participants?.some((participant) => participant.user.id === user.id)
          )
        );
        setUsers(availableUsers);
      } catch (error) {
        console.error('Erro ao obter usuários:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchUsers();
  
    return () => {
      isMounted = false;
    };
  }, [isOpen, departmentId, schedules]);

  const handleAddParticipant = (userId: string, userName: string) => {
    const status: ParticipantStatus = ParticipantStatus.PENDING; 
    onAddParticipant(userId, userName, status); 
    onClose(); 
  };

  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Adicionar Participante</h2>

        {loading ? (
          <p>Carregando usuários...</p>
        ) : (
          <ul>
            {users.length === 0 ? (
              <p>Nenhum usuário encontrado no departamento.</p>
            ) : (
              users.map((user: User) => ( 
                <li key={user.id} className="flex justify-between items-center py-2">
                  <span>{user.name} ({user.role})</span>
                  <button
                    onClick={() => handleAddParticipant(user.id, user.name)}
                    className="bg-blue-500 text-white py-1 px-4 rounded"
                  >
                    Adicionar
                  </button>
                </li>
              ))
            )}
          </ul>
        )}

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white py-2 px-4 rounded">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddParticipantModal;
