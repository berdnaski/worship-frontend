import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { updateSongVersionById } from '@/api/songVersions';
import { type UpdateSongVersionData, type SongVersion } from '@/api/songVersions';

interface EditSongVersionModalProps {
  open: boolean;
  onClose: () => void;
  songId: string;
  songVersion: SongVersion;
  onUpdate: (updatedVersion: SongVersion) => void;
}

const EditSongVersionModal: React.FC<EditSongVersionModalProps> = ({ open, onClose, songId, songVersion, onUpdate }) => {
  if (!songVersion) {
    return null; // Early return if songVersion is null
  }

  const [formData, setFormData] = useState<UpdateSongVersionData>({
    versionName: songVersion.versionName,
    classification: songVersion.classification,
    key: songVersion.key,
    linkChord: songVersion.linkChord,
    linkVideo: songVersion.linkVideo,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      const updatedVersion = await updateSongVersionById(songId, songVersion.id, formData);
      onUpdate(updatedVersion);
      toast.success("Versão atualizada com sucesso!");
      onClose();
    } catch (error) {
      toast.error("Erro ao atualizar a versão.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-md p-6 bg-zinc-900 rounded-lg shadow-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-center text-orange-500">Editar Versão da Música</DialogTitle>
          <DialogDescription className="text-center text-sm text-zinc-400">Atualize as informações da versão selecionada.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="versionName" className="block text-sm font-medium text-zinc-400">Nome da Versão</label>
            <input
              id="versionName"
              name="versionName"
              type="text"
              value={formData.versionName}
              onChange={handleInputChange}
              placeholder="Nome da versão"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="classification" className="block text-sm font-medium text-zinc-400">Classificação</label>
            <input
              id="classification"
              name="classification"
              type="text"
              value={formData.classification}
              onChange={handleInputChange}
              placeholder="Classificação"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="key" className="block text-sm font-medium text-zinc-400">Tom</label>
            <input
              id="key"
              name="key"
              type="text"
              value={formData.key}
              onChange={handleInputChange}
              placeholder="Tom"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="linkChord" className="block text-sm font-medium text-zinc-400">Link da Cifra</label>
            <input
              id="linkChord"
              name="linkChord"
              type="text"
              value={formData.linkChord || ''}
              onChange={handleInputChange}
              placeholder="Link da Cifra"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="linkVideo" className="block text-sm font-medium text-zinc-400">Link do Vídeo</label>
            <input
              id="linkVideo"
              name="linkVideo"
              type="text"
              value={formData.linkVideo || ''}
              onChange={handleInputChange}
              placeholder="Link do Vídeo"
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-full py-2 mt-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors duration-300">
          Salvar Alterações
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditSongVersionModal;
