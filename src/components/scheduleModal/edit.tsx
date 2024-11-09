import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState, useEffect } from 'react';
import { Schedule } from '@/api/schedules';

interface EditScheduleModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (id: string, name: string, date: Date) => void;
  schedule: Schedule | null;
}

const EditScheduleModal = ({ open, onClose, onSave, schedule }: EditScheduleModalProps) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (schedule) {
      const parsedDate = new Date(schedule.date);
      if (!isNaN(parsedDate.getTime())) {  
        setName(schedule.name);
        setDate(parsedDate);
      } else {
        console.error("Invalid date:", schedule.date);
      }
    }
  }, [schedule]);

  const handleSave = () => {
    if (!name.trim()) {
      setError('O nome da escala não pode estar vazio.');
      return;
    }

    if (schedule && date) {
      setError(null); 
      onSave(schedule.id, name, date);
    }
    onClose();
  };
  
  const formattedDate = date ? date.toLocaleString('sv-SE').slice(0, 16) : ''; 

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogTrigger asChild />
      <DialogContent className="w-full max-w-md p-6 bg-zinc-900 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center text-orange-500">Editar Escala</DialogTitle>
          <DialogDescription className="text-center text-sm text-zinc-400">Atualize as informações da escala.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-400">Nome da Escala</label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da Escala"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {error && <p className="text-sm text-red-500">{error}</p>} {/* Exibe a mensagem de erro */}
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-zinc-400">Data e Hora</label>
            <Input
              id="date"
              type="datetime-local"
              value={formattedDate}
              onChange={(e) => setDate(new Date(e.target.value))}
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={onClose} variant="outline" className="w-full py-2 bg-zinc-700 hover:bg-zinc-600 text-white">
            Cancelar
          </Button>
          <Button onClick={handleSave} className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors duration-300">
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditScheduleModal;
