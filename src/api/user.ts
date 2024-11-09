import { getCookie } from '@/utils/cookie';
import api from '.';

export interface UserApiResponse {
  user: UserResponse; 
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  departmentId?: string;
  role: string;
  avatarUrl?: string;
}

export async function getUsers(): Promise<UserResponse[]> {
  const token = getCookie('token');

  const response = await api.get('/users', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function getUserById(userId: string): Promise<UserApiResponse> {
  const token = getCookie('token');

  const response = await api.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data; 
}
