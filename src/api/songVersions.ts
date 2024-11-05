import { getCookie } from '@/utils/cookie';
import api from '.'

export interface SongVersion {
  id: string;
  versionName: string;
  songId: string; 
  classification: string;
  key: string;
  linkChord: string | null; 
  linkVideo: string | null;  
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateSongVersionData {
  versionName: string;
  songId: string;
  classification: string;
  key: string;
  linkChord: string | null;
  linkVideo: string | null;
}


export const postSongVersions = async (songId: string, data: CreateSongVersionData): Promise<SongVersion> => {
  const token = getCookie('token');

  const response = await api.post(`/songs/${songId}/song-versions`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export const getSongVersions = async (songId: string): Promise<SongVersion[]> => {
  const token = getCookie('token');

  const response = await api.get(`/songs/${songId}/song-versions`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export const getSongVersionById = async (songId: string, songVersionId: string): Promise<SongVersion> => {
  const token = getCookie('token');

  try {
    const response = await api.get(`/songs/${songId}/song-versions/${songVersionId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error("Não foi possível buscar a versão da música.");
  }
};