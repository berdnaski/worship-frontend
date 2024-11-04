import { getCookie } from '@/utils/cookie';
import api from '.';

export interface DepartmentFormData {
  name: string;
  description?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'USER' | 'LEADER';
  avatarUrl?: string;
}

export interface DepartmentResponse {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  users: User[];
}

export async function createDepartment(data: DepartmentFormData) {
  const token = getCookie('token');
  console.log('Token:', token);

  const response = await api.post('/departments', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getDepartments() {
  const token = getCookie('token');

  const response = await api.get('/departments', {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}

export async function getDepartmentMembers(departmentId: string) {
  const token = getCookie('token');

  const response = await api.get(`/departments/${departmentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
}
