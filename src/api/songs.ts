import { getCookie } from '@/utils/cookie';
import api from '.'

export interface Song {
  id: string; 
  title: string;
  artist: string;
  genre?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SongResponse {
  title: string;
  artist: string;
  genre?: string;
}

export type UpdateSongData = {
  title?: string;
  artist?: string;
  genre?: string;
};


export interface CreateSongData {
  title: string;
  artist: string;
  genre?: string;
}

export const postSong = async (data: CreateSongData): Promise<Song> => {
  const token = getCookie('token');

  const response = await api.post('/songs', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export const getSongs = async (): Promise<Song[]> => {
  const token = getCookie('token');

  const response = await api.get('/songs', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function deleteSong(id: string) {
  const token = getCookie('token');

  await api.delete(`/songs/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function updateSong(id: string | undefined, data: UpdateSongData) {
  const token = getCookie('token');

  const response = await api.put(`/songs/${id}`, data, { 
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data; 
}