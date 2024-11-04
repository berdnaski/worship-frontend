import React from "react";
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
import type { DepartmentResponse } from "@/api/department";

interface DepartmentListProps {
  departments: DepartmentResponse[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments }) => {
  return (
    <div className="grid gap-4">
      {departments.map((department) => (
        <Card key={department.id} className="border rounded-lg shadow-lg transition-transform transform hover:scale-105">
          <CardContent className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-semibold text-gray-800">{department.name}</h2>
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                  {department.users.length} membros
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {department.description}
              </p>
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
                <DropdownMenuItem className="gap-2 hover:bg-gray-100">
                  <UserPlus className="h-4 w-4" />
                  Adicionar Membro
                </DropdownMenuItem>
                <DropdownMenuItem className="gap-2 hover:bg-gray-100">
                  <Edit3 className="h-4 w-4" />
                  Editar Departamento
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive gap-2 hover:bg-red-50">
                  <Trash2 className="h-4 w-4" />
                  Excluir Departamento
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DepartmentList;
