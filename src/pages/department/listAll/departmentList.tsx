import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit3, MoreVertical, Trash2, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteDepartment, type DepartmentResponse } from "@/api/department";
import { Link } from "react-router-dom";
import { EditDepartmentDialog } from "../update/editModal";
import { toast } from "sonner";
import AddMemberModal from "@/components/Modal/addMemberModal";

interface DepartmentListProps {
  departments: DepartmentResponse[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentResponse | null>(null);
  const [departmentList, setDepartmentList] = useState<DepartmentResponse[]>(departments);

  useEffect(() => {
    setDepartmentList(departments);
  }, [departments]);

  const handleDeleteClick = async (departmentId: string) => {
    const confirmDelete = window.confirm("Você tem certeza que deseja excluir este departamento?");
    if (!confirmDelete) return;

    try {
      await deleteDepartment(departmentId);
      setDepartmentList((prev) => prev.filter((dep) => dep.id !== departmentId)); // Atualiza o estado
      toast.success("Departamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir departamento:", error);
      toast.error("Erro ao excluir departamento. Tente novamente.");
    }
  };
  const handleEditClick = (department: DepartmentResponse) => {
    setSelectedDepartment(department);
    setIsModalOpen(true);
  };

  const handleDepartmentUpdated = (updatedDepartment: DepartmentResponse) => {
    setDepartmentList((prev) =>
      prev.map((dep) => 
        dep.id === updatedDepartment.id 
          ? { ...dep, name: updatedDepartment.name, description: updatedDepartment.description }
          : dep
      )
    );
  };

  const handleAddMemberClick = (department: DepartmentResponse) => {
    setSelectedDepartment(department);
    setIsAddMemberModalOpen(true);
  };

  const handleMemberAdded = () => {
    toast.success("Membro adicionado com sucesso!");
  };

  return (
    <div className="grid gap-4">
      {departmentList.map((department) => (
        <Card key={department.id} className="border rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <CardContent className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-gray-800">
                  <Link to={`/departments/${department.id}`}>{department.name}</Link>
                </h2>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {department.users ? department.users.length : 0} membros
                </span>
              </div>
              <p className="text-sm text-gray-600">{department.description}</p>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100">
                  <MoreVertical className="h-4 w-4 text-gray-600" />
                  <span className="sr-only">Abrir menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 hover:bg-gray-100" onClick={() => handleAddMemberClick(department)}>
                  <UserPlus className="h-4 w-4" /> Adicionar Membro
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 hover:bg-gray-100" onClick={() => handleEditClick(department)}>
                  <Edit3 className="h-4 w-4" /> Editar Departamento
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive gap-2 hover:bg-red-50" onClick={() => handleDeleteClick(department.id)}>
                  <Trash2 className="h-4 w-4" /> Excluir Departamento
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      ))}
      {selectedDepartment && (
        <>
          <EditDepartmentDialog  
              open={isModalOpen} 
              onClose={() => {
                setIsModalOpen(false);
                setSelectedDepartment(null); 
              }} 
              department={selectedDepartment} 
              onDepartmentUpdated={handleDepartmentUpdated} // Passa a função aqui
            />
          <AddMemberModal 
            isOpen={isAddMemberModalOpen} 
            onClose={() => {
              setIsAddMemberModalOpen(false);
              setSelectedDepartment(null); 
            }} 
            departmentId={selectedDepartment.id} 
            onMemberAdded={handleMemberAdded} 
          />
        </>
      )}
    </div>
  );
};

export default DepartmentList;