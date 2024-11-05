import { getCookie } from '@/utils/cookie';
import api from '.';

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  departmentId?: string;
}

export async function getUsers(): Promise<UserResponse[]> {
  const token = getCookie('token');

  const response = await api.get('/users', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}