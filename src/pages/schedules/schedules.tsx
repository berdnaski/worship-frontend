import { Link, useParams } from 'react-router-dom';
import { addParticipantToSchedule, deleteScheduleById, getSchedulesByDepartment, postSchedule, updateScheduleById, type AddParticipantData, type ParticipantStatus, type Schedule } from '@/api/schedules';
import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Clock, Users, MoreHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import CreateScheduleModal from '@/components/scheduleModal/create';
import EditScheduleModal from '@/components/scheduleModal/edit';
import { toast } from 'sonner';
import AddParticipantModal from '@/components/scheduleModal/addParticipant';

const Schedule = () => {
  const departmentId = useParams<{ departmentId: string }>().departmentId ?? '';
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [futureSchedules, setFutureSchedules] = useState<Schedule[]>([]);
  const [pastSchedules, setPastSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('');
  const [isAddParticipantModalOpen, setAddParticipantModalOpen] = useState(false);
  const [editSchedule, setEditSchedule] = useState<Schedule | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());

  if (!departmentId) {
    console.error("Department ID is required");
    return;
  }

  useEffect(() => {
    if (!departmentId) return;
  
    const fetchSchedules = async () => {
      try {
        const data = await getSchedulesByDepartment(departmentId);
        setSchedules(data);
  
        const future = data.filter(schedule => new Date(schedule.date) > new Date());
        const past = data.filter(schedule => new Date(schedule.date) <= new Date());
  
        setFutureSchedules(future);
        setPastSchedules(past);
      } catch (error) {
        console.error('Error fetching schedules:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchSchedules();
  }, [departmentId]);
  

  const handleShowFuture = () => {
    setSchedules(futureSchedules);
  };

  const handleShowPast = () => {
    setSchedules(pastSchedules);
  };

  const handleCreateSchedule = async (name: string, date: Date) => {
    try {

      const newSchedule = await postSchedule(departmentId, { name, date, departmentId });
      setSchedules(prevSchedules => [...prevSchedules, newSchedule]);
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

const handleEditSchedule = (schedule: Schedule) => {
  setEditSchedule(schedule); 
  setEditModalOpen(true); 
};

  const handleDeleteSchedule = async (departmentId: string, scheduleId: string) => {
    try {
      await deleteScheduleById(departmentId, scheduleId);
      setSchedules(prevSchedules => prevSchedules.filter(schedule => schedule.id!== scheduleId));
      toast.success('Escala excluída com sucesso!');
    } catch (error) {
      console.error('Error deleting schedule:', error);
      toast.error('Erro ao excluir escala. Tente novamente.');
    }
  }


  const handleSaveEditSchedule = async (id: string, name: string, date: Date) => {
    try {
      const updatedSchedule = await updateScheduleById(departmentId, id, { name, date });
  
      setSchedules((prevSchedules) => {
        return prevSchedules.map((schedule) =>
          schedule.id === id ? updatedSchedule : schedule
        );
      });
  
      
      setEditSchedule(updatedSchedule);
      setEditModalOpen(false); 
    } catch (error) {
      console.error('Error updating schedule:', error);
      toast.error('Erro ao atualizar escala. Tente novamente.');
    }
  };
  
  
  const handleOpenAddParticipantModal = (scheduleId: string) => {
    setSelectedScheduleId(scheduleId);
    setAddParticipantModalOpen(true);
  };

  const handleCloseAddParticipantModal = () => {
    setAddParticipantModalOpen(false);
  };

  const handleAddParticipant = async (userId: string, userName: string, status: ParticipantStatus) => {
    try {
      const addParticipantData: AddParticipantData = {
        userId,
        userName,
        status,
      };
  
      const updatedSchedule = await addParticipantToSchedule(departmentId, selectedScheduleId, addParticipantData);
  
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === selectedScheduleId
            ? { ...schedule, participants: updatedSchedule.participants }
            : schedule
        )
      );
      toast.success('Participante adicionado com sucesso!');
      window.location.reload();
      handleCloseAddParticipantModal();
    } catch (error) {
      console.error('Erro ao adicionar participante:', error);
      toast.error('Erro ao adicionar participante. Tente novamente.');
    }
  };
  
  
  
  
 
  
  
  return (
    <div className="min-h-screen bg-white text-gray-800 flex flex-col items-center">
      <div className='bg-gray-100 w-full flex flex-col justify-center items-center'>
        <div className="w-full max-w-2xl text-center mb-8 mt-8">
          <h1 className="text-4xl font-extrabold text-orange-600 mb-3">Escalas do Departamento</h1>
          <p className="text-gray-600 text-lg">
            Gerencie e veja as escalas do seu departamento, de forma digital.
          </p>
        </div>

        <div className="flex gap-2 mb-4 bg-gray-100 rounded-lg p-1">
          <Button
            onClick={handleShowFuture}
            className={`${schedules === futureSchedules
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-800 '
              } w-40 py-2 rounded-lg transition-all`}
          >
            Próximas
          </Button>
          <Button
            onClick={handleShowPast}
            className={`${schedules === pastSchedules
              ? 'bg-orange-500 text-white'
              : 'bg-white text-gray-800 '
              } w-40 py-2 rounded-lg transition-all`}
          >
            Anteriores
          </Button>
          <Button
            onClick={() => setCreateModalOpen(true)}
            className="bg-orange-500 text-white w-40 py-2 rounded-lg"
          >
            Criar Escala
          </Button>
        </div>

        <AddParticipantModal
          departmentId={departmentId}
          isOpen={isAddParticipantModalOpen}
          onClose={handleCloseAddParticipantModal}
          onAddParticipant={handleAddParticipant}
        />


        <main className="container mx-auto p-4 md:p-6">
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <div>
              {schedules.length === 0 ? (
                <p>Nenhuma escala encontrada.</p>
              ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {schedules.map((schedule) => (
                    <Card
                      key={schedule.id}
                      className="bg-white border-0 shadow-lg backdrop-blur-sm transition-colors"
                    >
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium text-lg text-gray-800">{schedule.name}</h3>
                            <DropdownMenu>
                              <DropdownMenuTrigger>
                                <Button variant={null} className="text-gray-800">
                                  <MoreHorizontal className="h-5 w-5" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => handleEditSchedule(schedule)}>
                                  Editar
                                </DropdownMenuItem>


                                <DropdownMenuItem
                                  onClick={() => handleDeleteSchedule(departmentId, schedule.id)}
                                >Excluir Escala</DropdownMenuItem>
                                <Link to={`/departments/${departmentId}/schedules/${schedule.id}`}>
                                  <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                                </Link>
                                <DropdownMenuItem onClick={() => handleOpenAddParticipantModal(schedule.id)}>
                                  Adicionar Participante
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <div className="flex flex-col gap-2">
                            <div className="flex flex-col justify-center text-center items-start">
                              <div className="text-xl font-semibold text-orange-500">
                                {new Date(schedule.date).toLocaleDateString()}
                              </div>
                              <div className="text-sm text-gray-400">
                                {new Date(schedule.date).toLocaleString('default', { month: 'short' })}
                              </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-4">
                              {schedule.participants?.length || 0 > 0 ? (
                                <div className="flex gap-2">
                                  {schedule.participants?.map((participant) => (
                                    <Avatar
                                      key={participant.user.id}
                                      className={`${!participant.user.avatarUrl ? 'bg-orange-500 border-0' : 'border-2 border-zinc-400'}`}
                                    >
                                      <AvatarImage
                                        src={participant.user.avatarUrl || '/default-avatar.png'}
                                        alt={participant.user.name}
                                      />
                                      <AvatarFallback className={`${!participant.user.avatarUrl ? 'text-white' : ''}`}>
                                        {participant.user.name[0]}
                                      </AvatarFallback>
                                    </Avatar>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-500">Nenhum participante ainda.</p>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <div className="text-sm text-gray-400">
                                  {new Date(schedule.date).toLocaleString('pt-BR', { hour: '2-digit', minute: '2-digit', hour12: false })}
                                </div>
                              </div>

                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-gray-400" />
                                <a href={`/schedule/${schedule.id}/users`} className="text-sm text-blue-500 hover:underline">
                                  {schedule.participants?.length || 0}
                                </a>
                              </div>
                            </div>

                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      <CreateScheduleModal
        open={isCreateModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSave={handleCreateSchedule}
        name={name}
        date={date}
        setName={setName}
        setDate={setDate}
      />

<EditScheduleModal
  open={isEditModalOpen}
  onClose={() => setEditModalOpen(false)}
  onSave={handleSaveEditSchedule}
  schedule={editSchedule}  
/>

    </div>
  );
};

export default Schedule;
