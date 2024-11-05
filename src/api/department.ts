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

export interface DepartmentUpdate {
  name?: string; 
  description?: string; 
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

export async function updateDepartment(id: string | undefined, data: DepartmentUpdate) {
  const token = getCookie('token');
  
  const response = await api.put(`/departments/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function deleteDepartment(departmentId: string) {
  const token = getCookie('token');
  await api.delete(`/departments/${departmentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

export async function addUserToDepartment(departmentId: string, userId: string): Promise<void> {
  const token = getCookie('token');
  
  await api.post(`/departments/${departmentId}/users/${userId}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
}

