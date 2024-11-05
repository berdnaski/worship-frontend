import type { Song } from '@/api/songs';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { updateSong } from '@/api/songs';

interface EditSongModalProps {
  open: boolean; 
  onClose: () => void; 
  song: Song; 
  onSongUpdated: (updatedSong: Song) => void; 
}

const EditSongModal: React.FC<EditSongModalProps> = ({ open, onClose, song, onSongUpdated }) => {
  const [title, setTitle] = useState<string>(song.title || ''); 
  const [artist, setArtist] = useState<string>(song.artist || ''); 
  const [genre, setGenre] = useState<string>(song.genre || ''); 

  useEffect(() => {
    setTitle(song.title || '');
    setArtist(song.artist || '');
    setGenre(song.genre || '');
  }, [song]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const updatedSong = await updateSong(song.id, { title, artist, genre }); 
      toast.success('Música atualizada com sucesso!');
      onSongUpdated(updatedSong); 
      onClose(); 
    } catch (error) {
      console.error('Erro ao atualizar a música:', error);
      toast.error('Erro ao atualizar a música. Verifique os dados e tente novamente.');
    }
  };

  if (!open) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-zinc-900 rounded-lg shadow-md p-6 relative w-full max-w-md">
        <button onClick={onClose} className="absolute top-2 right-2 text-white">
          Fechar
        </button>
        <h1 className="text-2xl font-semibold text-center text-orange-500 mb-4">Editar Música</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-zinc-400">Título</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="artist" className="block text-sm font-medium text-zinc-400">Artista</label>
            <input
              id="artist"
              type="text"
              value={artist}
              onChange={(e) => setArtist(e.target.value)}
              required
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="genre" className="block text-sm font-medium text-zinc-400">Gênero</label>
            <select
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              className="w-full px-4 py-2 bg-zinc-800 text-white border border-zinc-700 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="" disabled>Selecione o gênero</option>
              <option value="Worship">Worship</option>
              <option value="Animada">Animada</option>
              <option value="Pular">Pular</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded transition-colors duration-300"
          >
            Atualizar Música
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditSongModal;
