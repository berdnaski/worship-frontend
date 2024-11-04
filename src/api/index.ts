import { getCookie } from '@/utils/cookie';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3333', 
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const getUser = async (userId: string) => {
  const token = getCookie('token'); 
  console.log('Token', token);

  const response = await api.get(`/users/${userId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.user; 
};

export default api;
