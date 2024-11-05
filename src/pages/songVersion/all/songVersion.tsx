import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getSongVersionById, getSongVersions, postSongVersions, type CreateSongVersionData, type SongVersion } from '@/api/songVersions';
import { Music, MoreVertical, Edit3, Trash2, ReceiptText } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import SongVersionModal from '@/components/songVersionModal/modal';

const SongVersions = () => {
  const { songId, songVersionId } = useParams<{ songId: string, songVersionId: string }>();
  const [versions, setVersions] = useState<SongVersion[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailModalOpen, setDetailModalOpen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState<SongVersion | null>(null);

  useEffect(() => {
    console.log('songVersionId:', songVersionId); 
  
    const fetchVersions = async () => {
      try {
        const fetchedVersions = await getSongVersions(songId!);
        setVersions(fetchedVersions);
  
        
        if (songVersionId) {
          const versionDetails = await getSongVersionById(songId!, songVersionId);
          setSelectedVersion(versionDetails);
          setDetailModalOpen(true); 
        } else {
          console.warn('songVersionId está undefined');
        }
      } catch (error) {
        toast.error("Erro ao carregar as versões da música.");
      }
    };
  
    fetchVersions();
  }, [songId, songVersionId]);
  

  const handleCreateVersion = async (data: CreateSongVersionData) => {
    try {
      const newVersion = await postSongVersions(songId!, data);
      setVersions((prev) => [...prev, newVersion]);
      toast.success("Versão criada com sucesso!");
    } catch (error) {
      toast.error("Erro ao criar a versão da música.");
    }
  };

  const handleDetails = async (songVersionId: string) => {
    try {
      const versionDetails = await getSongVersionById(songId!, songVersionId);
      setSelectedVersion(versionDetails);
      setDetailModalOpen(true);
    } catch (error) {
      toast.error("Erro ao carregar os detalhes da versão.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center py-8">
      <header className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-3">Versões da Música</h1>
        <p className="text-gray-600 text-lg">Gerencie as versões da música de forma prática e organizada.</p>
      </header>

      <Button onClick={() => setModalOpen(true)} className="mb-4 bg-orange-600 text-white hover:bg-orange-700 transition duration-200">
        Adicionar Nova Versão
      </Button>

      <SongVersionModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateVersion}
        songId={songId!}
      />

      {/* Modal para Detalhes da Versão */}
      <Dialog open={detailModalOpen} onOpenChange={() => setDetailModalOpen(false)}>
        <DialogContent className="bg-zinc-900 text-white">
          <DialogHeader>
            <DialogTitle>Detalhes da Versão</DialogTitle>
            <DialogDescription>Informações detalhadas da versão selecionada.</DialogDescription>
          </DialogHeader>
          {selectedVersion && (
            <div className="space-y-2">
              <p><strong>Nome da Versão:</strong> {selectedVersion.versionName}</p>
              <p><strong>Classificação:</strong> {selectedVersion.classification}</p>
              <p><strong>Tom:</strong> {selectedVersion.key}</p>
              <p><strong>Link do Acorde:</strong> {selectedVersion.linkChord || 'N/A'}</p>
              <p><strong>Link do Vídeo:</strong> {selectedVersion.linkVideo || 'N/A'}</p>
              <p><strong>Criado em:</strong> {new Date(selectedVersion.createdAt).toLocaleString()}</p>
              <p><strong>Atualizado em:</strong> {new Date(selectedVersion.updatedAt).toLocaleString()}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Lista de Versões */}
      <div className="md:w-full w-[95%] max-w-2xl mt-8">
        {versions.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma versão adicionada ainda.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {versions.map((version) => (
              <Card
                key={version.id}
                className="bg-white shadow-lg rounded-lg transition-transform hover:scale-105 p-4 hover:shadow-xl cursor-pointer"
                onClick={() => handleDetails(version.id)}
              >
                <div className="flex items-center gap-4">
                  <Music className="h-8 w-8 text-orange-500" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{version.versionName}</h3>
                    <p className="text-sm text-gray-500">Classificação: {version.classification}</p>
                    <p className="text-sm text-gray-500">Tom: {version.key}</p>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="text-gray-400 hover:text-orange-500">
                        <MoreVertical className="h-5 w-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuLabel>Ações</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="gap-2 hover:bg-gray-100" onClick={() => handleDetails(version.id)}>
                        <ReceiptText className="h-4 w-4" /> Detalhes
                      </DropdownMenuItem>
                      <DropdownMenuItem className="gap-2 hover:bg-gray-100">
                        <Edit3 className="h-4 w-4" /> Editar Versão
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive gap-2 hover:bg-red-50">
                        <Trash2 className="h-4 w-4" /> Excluir Versão
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
