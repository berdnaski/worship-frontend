import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { type CreateSongVersionData } from '@/api/songVersions';

interface SongVersionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateSongVersionData) => Promise<void>;
  songId: string;
}

const SongVersionModal: React.FC<SongVersionModalProps> = ({ open, onClose, onSubmit, songId }) => {
  const [formData, setFormData] = useState<CreateSongVersionData>({
    versionName: '',
    songId,
    classification: '',
    key: '',
    linkChord: null,
    linkVideo: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast.success("Versão da música criada com sucesso!");
      setFormData({
        versionName: '',
        songId,
        classification: '',
        key: '',
        linkChord: null,
        linkVideo: null,
      });
      onClose();
    } catch {
      toast.error("Erro ao criar a versão da música.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>Adicionar Nova Versão</DialogTitle>
          <DialogDescription>Preencha os detalhes da nova versão da música.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {['versionName', 'classification', 'key'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-zinc-400">
                {field === 'versionName' ? 'Nome da Versão' : field === 'classification' ? 'Classificação' : 'Tom'}
              </label>
              <input
                id={field}
                type="text"
                name={field}
                value={(formData as any)[field]}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          ))}
          {['linkChord', 'linkVideo'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-sm font-medium text-zinc-400">
                {field === 'linkChord' ? 'Link do Acorde (opcional)' : 'Link do Vídeo (opcional)'}
              </label>
              <input
                id={field}
                type="url"
                name={field}
                value={(formData as any)[field] || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          ))}
          <Button type="submit" className="w-full py-2 bg-orange-600 text-white hover:bg-orange-700 transition duration-200">
            Criar Versão
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SongVersionModal;
