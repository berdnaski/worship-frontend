import { getCookie } from '@/utils/cookie';
import api from '.';

export interface SetupData {
  userId: string;
  role: 'ADMIN' | 'LEADER' | 'MEMBER';
  code?: string;
}

export async function completeUserSetup(data: SetupData) {
  const token = getCookie('token');
  const response = await api.post('/setup', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}
