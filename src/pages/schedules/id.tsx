import { useParams, useNavigate } from "react-router-dom"; 
import { useEffect, useState } from "react";
import { getSchedulesByDepartmentById, type Schedule } from "@/api/schedules";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Clock, Hourglass, MoonIcon } from "lucide-react";

export default function ScheduleDetails() {
  const { departmentId, scheduleId } = useParams<{ departmentId?: string; scheduleId?: string }>();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!departmentId || !scheduleId) {
      console.error("Missing departmentId or scheduleId in URL parameters.");
      return;
    }
  
    async function fetchSchedule() {
      try {
        const data = await getSchedulesByDepartmentById(departmentId!, scheduleId!);
        data.date = new Date(data.date); 
        setSchedule(data);
      } catch (error) {
        console.error("Erro ao buscar o agendamento:", error);
      }
    }
    
  
    fetchSchedule();
  }, [departmentId, scheduleId]);

  if (!schedule) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="max-h-screen bg-white mb-8">
      <div className="max-w-2xl mx-auto">
        <main className="p-6">
          <Card className="rounded-lg overflow-hidden border border-gray-200 shadow-md">
            <CardHeader className="bg-[#17181A] rounded-t-lg p-4">
              <h2 className="text-2xl font-semibold text-white">{schedule.name}</h2>
              <div className="grid gap-1 mt-2 text-sm text-gray-100">
                <div className="flex items-center gap-2 justify-between">
                  <div className="flex gap-2 items-center">
                    <MoonIcon size={16} />
                    <span>{schedule.date.toLocaleDateString()}</span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <CalendarIcon size={16} />
                    <span>{schedule.date ? new Date(schedule.date).toLocaleDateString() : 'Data não disponível'}</span>

                  </div>
                </div>
                <div className="flex items-center gap-2 justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{schedule.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Hourglass size={16} />
                    <span>daqui a X dias</span>
                  </div>
                </div>
                <div className="mt-1 text-xs text-orange-100">0/{schedule.participants?.length} Confirmados</div>
              </div>
            </CardHeader>

            <Button className="w-full bg-red-100 hover:bg-red-200 text-red-600 mb-4 rounded-none">
              Confirmação pendente
            </Button>

            <CardContent className="rounded-b-lg p-4">
              <Tabs defaultValue="musicas">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="musicas" className="w-full py-2 font-semibold rounded-lg transition-all text-gray-600 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    Músicas
                  </TabsTrigger>
                  <TabsTrigger value="participantes" className="w-full py-2 font-semibold rounded-lg transition-all text-gray-600 data-[state=active]:bg-orange-500 data-[state=active]:text-white">
                    Participantes
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="musicas">
                  <div className="space-y-6">
                    {schedule.songs?.map((song, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="text-xl font-light text-gray-500">{index + 1}º</div>
                        <div>
                          <h3 className="font-semibold text-gray-800">{song.title}</h3>
                          <p className="text-sm text-gray-500">{song.artist}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="participantes">
  {schedule.participants?.length ? (
    <div className="space-y-4">
      {schedule.participants.map((participant, index) => (
        <div key={index} className="flex items-center gap-4">
          {participant.user.avatarUrl ? (
            <img
              src={participant.user.avatarUrl}
              alt={participant.user.name}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-orange-400 text-white font-semibold">
              {participant.user.name.charAt(0)}
            </div>
          )}
          <span className="text-gray-700">{participant.user.name}</span>
        </div>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 text-gray-400">Nenhum participante confirmado</div>
  )}
</TabsContent>

              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
