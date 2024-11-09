import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { getUserById, UserResponse, UserApiResponse } from "@/api/user";
import { getDepartmentById, DepartmentResponse } from "@/api/department";

export function Perfil() {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<UserResponse | null>(null);
  const [department, setDepartment] = useState<DepartmentResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndDepartment = async () => {
      if (userId) {
        try {
          const response: UserApiResponse = await getUserById(userId);
          setUser(response.user);
  
          if (response.user.departmentId) {
            const departmentData = await getDepartmentById(response.user.departmentId);
            setDepartment(departmentData);
          } else {
            setDepartment(null); 
          }
        } catch (error) {
          console.error("Erro ao buscar os dados do usuário ou do departamento:", error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchUserAndDepartment();
  }, [userId]);

  const getInitials = (name: string | undefined) =>
    name ? name.split(" ").map((n) => n.charAt(0).toUpperCase()).join("") : "?";

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <div>Usuário não encontrado</div>;
  }

  return (
    <div className="max-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-lg">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-6 md:gap-8">
              {/* Avatar Section */}
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="w-32 h-32 md:w-48 md:h-48 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-3xl font-bold flex items-center justify-center rounded-full shadow-xl border-4 border-zinc-800 transition-transform transform hover:scale-105">
                  {user.avatarUrl ? (
                    <AvatarImage src={user.avatarUrl} alt="Profile picture" />
                  ) : (
                    <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                  )}
                </Avatar>
              </div>

              {/* User Info Section */}
              <div className="flex-1 space-y-6">
                <div className="space-y-1 text-center md:text-left">
                  <Label className="text-sm text-zinc-500">Nome</Label>
                  <h1 className="text-2xl font-semibold text-black transition-all duration-300 hover:text-orange-500">
                    {user.name}
                  </h1>
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <Label className="text-sm text-zinc-500">Email</Label>
                  <p className="text-xl text-black">{user.email}</p>
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <Label className="text-sm text-zinc-500">Cargo</Label>
                  <div className="flex items-center justify-center md:justify-start gap-2">
                    <Badge variant="secondary" className="transition-all duration-300 transform hover:scale-105">
                      {user.role}
                    </Badge>
                  </div>
                </div>

                <div className="space-y-1 text-center md:text-left">
                  <Label className="text-sm text-zinc-500">Departamento</Label>
                  <p className="text-xl text-black">
                    {department?.name || "Não atribuído"}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}