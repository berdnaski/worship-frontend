import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDepartmentMembers, User } from "@/api/department";

const DepartmentDetails: React.FC = () => {
  const { departmentId } = useParams<{ departmentId: string }>();
  const [members, setMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!departmentId) {
        setError('Department ID is required.');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await getDepartmentMembers(departmentId);
        setMembers(data.users);
      } catch (error) {
        setError('Failed to load department members');
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [departmentId]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase())
      .join('');
  };

  if (loading) return <p className="text-center text-gray-500">Loading members...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto p-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="shadow-lg transition-transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Repertório</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:bg-gradient-to-l transition duration-200" variant="outline">
                Ver repertório
              </Button>
            </CardContent>
          </Card>
          <Card className="shadow-lg transition-transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Escalas</CardTitle>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-gradient-to-r from-orange-400 to-orange-600 text-white hover:bg-gradient-to-l transition duration-200" variant="outline">
                Ver escalas
              </Button>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 lg:col-span-3 shadow-lg transition-transform hover:scale-105">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-800">Integrantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {members.length === 0 ? (
                  <p className="text-center text-gray-500">No members found.</p>
                ) : (
                  members.map((member, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-gray-300 p-4 hover:bg-orange-50 transition duration-150"
                    >
                      <div className="flex items-center gap-4">
                        {member.avatarUrl ? (
                          <img
                            alt={`${member.name}'s avatar`}
                            className="rounded-full"
                            height="40"
                            src={member.avatarUrl}
                            style={{
                              aspectRatio: "40/40",
                              objectFit: "cover",
                            }}
                            width="40"
                          />
                        ) : (
                          <div
                            className="flex items-center justify-center rounded-full bg-orange-400 text-white"
                            style={{
                              height: '40px',
                              width: '40px',
                              fontSize: '16px',
                            }}
                          >
                            {getInitials(member.name)}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-gray-800">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4 text-gray-600" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Ver perfil</DropdownMenuItem>
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Remover</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DepartmentDetails;
