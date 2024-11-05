import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getSongVersions, postSongVersions, type CreateSongVersionData, type SongVersion } from '@/api/songVersions';
import { Music, MoreVertical } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const SongVersions = () => {
  const { songId } = useParams<{ songId: string }>();
  const [versions, setVersions] = useState<SongVersion[]>([]);
  const [formData, setFormData] = useState<CreateSongVersionData>({
    versionName: '',
    songId: songId || '',
    classification: '',
    key: '',
    linkChord: null,
    linkVideo: null,
  });
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongVersions = async () => {
      if (!songId) {
        toast.error("ID da música não encontrado.");
        return;
      }

      try {
        const response = await getSongVersions(songId);
        setVersions(response);
      } catch (error) {
        console.error("Failed to fetch song versions:", error);
        toast.error("Erro ao carregar as versões da música.");
      }
    };

    fetchSongVersions();
  }, [songId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: CreateSongVersionData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!songId) {
      toast.error("ID da música não encontrado.");
      return;
    }

    try {
      const newVersion = await postSongVersions(songId, formData);
      setVersions((prev: SongVersion[]) => [...prev, newVersion]);
      toast.success("Versão da música criada com sucesso!");
      setFormData({
        versionName: '',
        songId: songId,
        classification: '',
        key: '',
        linkChord: null,
        linkVideo: null,
      });
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to create song version:", error);
      toast.error("Erro ao criar a versão da música.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center py-8">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-3">Versões da Música</h1>
        <p className="text-gray-600 text-lg">
          Gerencie as versões da música de forma prática e organizada.
        </p>
      </div>

      <Button onClick={() => setModalOpen(true)} className="mb-4 bg-orange-600 text-white hover:bg-orange-700 transition duration-200">
        Adicionar Nova Versão
      </Button>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogTrigger asChild>
          <Button className="hidden">Adicionar Nova Versão</Button>
        </DialogTrigger>
        <DialogContent className="bg-zinc-900 text-white"> {/* Estilo do fundo do modal */}
          <DialogHeader>
            <DialogTitle>Adicionar Nova Versão</DialogTitle>
            <DialogDescription>
              Preencha os detalhes da nova versão da música.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="versionName" className="block text-sm font-medium text-zinc-400">Nome da Versão</label>
              <input
                id="versionName"
                type="text"
                name="versionName"
                value={formData.versionName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="classification" className="block text-sm font-medium text-zinc-400">Classificação</label>
              <input
                id="classification"
                type="text"
                name="classification"
                value={formData.classification}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="key" className="block text-sm font-medium text-zinc-400">Tom</label>
              <input
                id="key"
                type="text"
                name="key"
                value={formData.key}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="linkChord" className="block text-sm font-medium text-zinc-400">Link do Acorde (opcional)</label>
              <input
                id="linkChord"
                type="url"
                name="linkChord"
                value={formData.linkChord || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div>
              <label htmlFor="linkVideo" className="block text-sm font-medium text-zinc-400">Link do Vídeo (opcional)</label>
              <input
                id="linkVideo"
                type="url"
                name="linkVideo"
                value={formData.linkVideo || ''}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <Button type="submit" className="w-full py-2 bg-orange-600 text-white hover:bg-orange-700 transition duration-200">
              Criar Versão
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="md:w-full w-[95%] max-w-2xl mt-8">
        {versions.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma versão adicionada ainda.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {versions.map((version) => (
              <Card
                key={version.id}
                className="bg-white shadow-lg rounded-lg transition-transform hover:scale-105 p-4 hover:shadow-xl cursor-pointer"
                onClick={() => navigate(`/versions/${version.id}`)}
              >
                <div className="flex items-center gap-4">
                  <Music className="h-8 w-8 text-orange-500" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{version.versionName}</h3>
                    <p className="text-sm text-gray-500">Classificação: {version.classification}</p>
                    <p className="text-sm text-gray-500">Tom: {version.key}</p>
                  </div>
                  <MoreVertical className="h-5 w-5 text-gray-400 cursor-pointer" />
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SongVersions;
