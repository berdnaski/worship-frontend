import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createDepartment, type DepartmentFormData, type DepartmentResponse, getDepartments } from "@/api/department"; 
import { Textarea } from "@/components/ui/textarea";
import DepartmentList from "./departmentList";

export default function CreateDepartment() {
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: "",
    description: "",
  });
  const [isModalOpen, setModalOpen] = useState(false);
  const [departments, setDepartments] = useState<DepartmentResponse[]>([]); 
  const navigate = useNavigate();

  useEffect(() => {
    fetchDepartments(); // Busca departamentos ao carregar o componente
  }, []);
  
  const fetchDepartments = async () => {
    try {
      const data = await getDepartments(); 
      console.log("Departamentos carregados:", data); // Adicione esta linha
      setDepartments(data); 
    } catch (error) {
      console.error("Erro ao carregar departamentos:", error);
      toast.error("Erro ao carregar departamentos. Tente novamente.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSubmit: DepartmentFormData = {
      name: formData.name,
      ...(formData.description && { description: formData.description }),
    };

    try {
      const newDepartment = await createDepartment(dataToSubmit);
      toast.success("Departamento criado com sucesso!");
      setDepartments((prev) => [...prev, newDepartment]); // Atualiza a lista localmente
      setModalOpen(false);
      navigate("/departments"); 
    } catch (error) {
      console.error("Erro ao criar departamento:", error);
      toast.error("Erro ao criar departamento. Tente novamente.");
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: "", description: "" });
  };

  return (
    <div className="max-h-screen bg-white p-4 relative">
      <div className="flex flex-col mx-auto max-w-4xl space-y-8">
        <div className="flex md:flex-row flex-col items-center justify-between md:gap-0 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-center text-orange-500">DEPARTAMENTOS</h1>
            <p className="text-zinc-400">
              Gerencie os departamentos e suas equipes
            </p>
          </div>
          <Button className="gap-2 bg-zinc-900 hover:bg-zinc-800 h-8 rounded-md px-2" onClick={() => setModalOpen(true)}>
            <Plus className="h-4 w-4 text-xs md:text-md" />
            Criar Departamento
          </Button>
        </div>

        <DepartmentList departments={departments} />
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-zinc-900 rounded-lg shadow-lg p-8 w-full max-w-lg transition-transform transform scale-95 animate-fade-in">
            <h2 className="text-2xl font-semibold text-center text-orange-500 mb-4">Criar Departamento</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <Label htmlFor="name" className="block text-sm font-medium text-zinc-400">Nome do Departamento</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full bg-zinc-800 text-white border border-zinc-700 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="mb-4">
                <Label htmlFor="description" className="block text-sm font-medium text-zinc-400">Descrição</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full bg-zinc-800 text-white border border-zinc-700 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500"
                  placeholder="Insira uma descrição detalhada do departamento..."
                  rows={4}
                />
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={closeModal} className="border-zinc-700 text-zinc-400 hover:bg-zinc-700">
                  Cancelar
                </Button>
                <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                  Criar
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
