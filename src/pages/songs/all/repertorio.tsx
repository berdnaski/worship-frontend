import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Music, Edit3, Trash2, MoreVertical, BookX } from "lucide-react";
import { deleteSong, getSongs, postSong, type CreateSongData, type Song, type UpdateSongData } from "@/api/songs";
import { toast } from "sonner";
import EditSongModal from "@/components/songModal/editSongModal";
import { useNavigate } from "react-router-dom";

export default function Repertorio() {
  const [songs, setSongs] = useState<Song[]>([]);
  const [newSong, setNewSong] = useState<CreateSongData>({
    title: "",
    artist: "",
    genre: "",
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [selectedSong, setSelectedSong] = useState<Song | null>(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await getSongs();
        setSongs(response);
      } catch (error) {
        console.error("Failed to fetch songs:", error);
      }
    };
    fetchSongs();
  }, []);

  const handleAddSong = async () => {
    if (newSong.title && newSong.artist) {
      try {
        const addedSong = await postSong(newSong);
        setSongs((prevSongs) => [...prevSongs, addedSong]);
        setNewSong({ title: "", artist: "", genre: "" });
        toast.success("Música adicionada com sucesso!");
      } catch (error) {
        toast.error("Erro ao adicionar música.");
      }
    }
  };

  const handleDeleteClick = async (songId: string) => {
    try {
      await deleteSong(songId);
      setSongs((prevSongs) => prevSongs.filter((s) => s.id !== songId));
      toast.success("Música excluída com sucesso!");
    } catch (error) {
      toast.error("Erro ao excluir música.");
    }
  };

  const handleEdit = (song: Song) => {
    setSelectedSong(song); 
    setIsModalOpen(true); 
  }

  const handleSongUpdated = (updatedSong: Song) => {
    setSongs((prevSongs) => prevSongs.map(song => (song.id === updatedSong.id ? updatedSong : song)));
    toast.success("Música atualizada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 flex flex-col items-center py-8">
      <div className="w-full max-w-2xl text-center mb-8">
        <h1 className="text-4xl font-extrabold text-orange-600 mb-3">Repertório de Músicas</h1>
        <p className="text-gray-600 text-lg">
          Gerencie seu repertório de forma prática e organizada.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Adicionar Nova Música</h2>
        <div className="flex flex-col md:flex-row gap-2 items-center">
          <input
            type="text"
            placeholder="Título da música"
            value={newSong.title}
            onChange={(e) => setNewSong({ ...newSong, title: e.target.value })}
            className="border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 transition w-full"
          />
          <input
            type="text"
            placeholder="Artista"
            value={newSong.artist}
            onChange={(e) => setNewSong({ ...newSong, artist: e.target.value })}
            className="border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 transition w-full"
          />
          <select
            value={newSong.genre || ""}
            onChange={(e) => setNewSong({ ...newSong, genre: e.target.value })}
            className="border border-gray-200 p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-orange-500 transition w-full md:w-auto"
          >
            <option value="" disabled>
              Selecione o gênero
            </option>
            <option value="Worship">Worship</option>
            <option value="Animada">Animada</option>
            <option value="Pular">Pular</option>
          </select>
          <Button
            onClick={handleAddSong}
            className="bg-orange-500 text-white px-4 py-2 rounded-md w-full md:w-auto hover:bg-orange-600 transition font-semibold"
          >
            Adicionar
          </Button>
        </div>
      </div>

      <div className="w-full max-w-2xl mt-8">
        {songs.length === 0 ? (
          <p className="text-center text-gray-500">Nenhuma música adicionada ainda.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {songs.map((song) => (
              <Card
                key={song.id}
                className="bg-white shadow-lg rounded-lg transition-transform hover:scale-105 p-4 hover:shadow-xl cursor-pointer" 
              >
                <div className="flex items-center gap-4">
                  <Music className="h-8 w-8 text-orange-500" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{song.title}</h3>
                    <p className="text-sm text-gray-500">{song.artist}</p>
                    {song.genre && <p className="text-xs text-gray-400">Gênero: {song.genre}</p>}
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
                      <DropdownMenuItem 
                        onClick={() => navigate(`/songs/${song.id}/song-versions`)}
                        className="gap-2 hover:bg-gray-100"
                      >
                        <BookX className="h-4 w-4" /> Ver Versões
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleEdit(song)} 
                        className="gap-2 hover:bg-gray-100"
                      >
                        <Edit3 className="h-4 w-4" /> Editar Música
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => handleDeleteClick(song.id)} 
                        className="text-destructive gap-2 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" /> Excluir Música
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu> 
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Renderiza o modal de edição */}
      {selectedSong && (
        <EditSongModal 
          open={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          song={selectedSong} 
          onSongUpdated={handleSongUpdated} 
        />
      )}
    </div>
  );
}
