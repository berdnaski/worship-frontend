import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

type CreateScheduleModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, date: Date) => Promise<void>; 
  name: string;
  date: Date;
  setName: (name: string) => void;
  setDate: (date: Date) => void;
};

const CreateScheduleModal = ({
  open,
  onClose,
  onSave,
  name,
  date,
  setName,
  setDate,
}: CreateScheduleModalProps) => {

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(date);
    newDate.setFullYear(Number(e.target.value.split('-')[0]));
    newDate.setMonth(Number(e.target.value.split('-')[1]) - 1);
    newDate.setDate(Number(e.target.value.split('-')[2]));
    setDate(newDate);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(date);
    const [hours, minutes] = e.target.value.split(':').map(Number);
    newDate.setHours(hours);
    newDate.setMinutes(minutes);
    setDate(newDate);
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md p-6 bg-zinc-900 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center text-orange-500">Criar Escala</DialogTitle>
          <DialogDescription className="text-center text-sm text-zinc-400">Crie uma nova escala.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-zinc-400">Nome da Escala</label>
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nome da escala"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="block text-sm font-medium text-zinc-400">Data</label>
            <input
              id="date"
              name="date"
              type="date"
              value={date.toLocaleDateString('pt-BR').split('/').reverse().join('-')}
              onChange={handleDateChange}
              min={currentDate} 
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="time" className="block text-sm font-medium text-zinc-400">Hora</label>
            <input
              id="time"
              name="time"
              type="time"
              value={`${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`}
              onChange={handleTimeChange}
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-4">
          <Button variant="outline" onClick={onClose} className="w-full py-2 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 focus:ring-orange-500">
            Cancelar
          </Button>
          <Button onClick={() => onSave(name, date)} className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors duration-300">
            Criar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateScheduleModal;
