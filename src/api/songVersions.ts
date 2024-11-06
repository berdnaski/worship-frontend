import { getCookie } from '@/utils/cookie';
import api from '.'

export interface SongVersion {
  id: string;
  versionName: string;
  classification: string;
  key: string;
  linkChord: string; // Nova propriedade
  linkVideo: string; // Nova propriedade
  createdAt: Date;
  updatedAt: Date;
  songId: string;
}



export interface UpdateSongVersionData {
  versionName?: string;
  classification?: string;
  key?: string;
  linkChord?: string | null;
  linkVideo?: string | null;
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

export const deleteSongVersionById = async (songId: string, songVersionId: string) => {
  const token = getCookie('token');
  
  await api.delete(`/songs/${songId}/song-versions/${songVersionId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export const updateSongVersionById = async (songId: string, songVersionId: string, data: UpdateSongVersionData) => {
  const token = getCookie('token');

  const response = await api.put(`/songs/${songId}/song-versions/${songVersionId}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return response.data;
}