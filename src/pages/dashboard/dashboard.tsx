import { useEffect } from 'react';
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { Calendar, Music, Plus, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Eu from "@/assets/eu.jpg";
import LouvorImage from "@/assets/louvor.png";

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
    <div className="max-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <main className="container mx-auto p-4 flex-grow">
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Ministérios</h2>
            <Button variant="ghost" className="text-sm flex items-center">
              <Plus className="mr-2" /> Adicionar
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="overflow-hidden shadow-lg rounded-lg transition-transform transform hover:scale-105">
              <div className="relative aspect-video">
                <img
                  src="/placeholder.svg"
                  alt="Louvor"
                  className="absolute inset-0 h-full w-full object-cover brightness-50"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <img
                    src={LouvorImage}
                    alt="Fundo Louvor"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-black font-semibold text-lg">Detalhes do Louvor</h3>
                </div>
                <div className="flex justify-around items-center text-sm">
                  <div className="flex items-center">
                    <Calendar className="mr-1" size={16} />
                    <span>1/1</span> 
                  </div>
                  <div className="flex items-center">
                    <Music className="mr-1" size={16} />
                    <span>5 músicas</span> 
                  </div>
                  <div className="flex items-center">
                    <Users className="mr-1" size={16} />
                    <span>10 confirmados</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
        <section className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Minhas escalas</h2>
            <Button variant="ghost" className="text-sm">
              Ver todas
            </Button>
          </div>
          <Card className="shadow-md rounded-lg transition-shadow hover:shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">18</div>
                  <div className="text-sm text-muted-foreground">JUN</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">Culto Noite</h3>
                  <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Domingo</span>
                    <span>•</span>
                    <span>daqui a 5 dias</span>
                  </div>
                  <div className="mt-2 flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Avatar key={i} className="border-2 border-background">
                        <AvatarImage src={Eu} alt={`Member ${i}`} loading="lazy" />
                        <AvatarFallback></AvatarFallback>
                      </Avatar>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Aniversariantes</h2>
            <Button variant="ghost" className="text-sm">
              Ver todos
            </Button>
          </div>
          <Card className="shadow-md rounded-lg transition-shadow hover:shadow-xl">
            <CardContent className="flex items-center justify-center p-8 text-muted-foreground">
              Não há aniversariantes hoje.
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
