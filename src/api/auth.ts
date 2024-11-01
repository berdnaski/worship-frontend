import api from ".";

interface RegisterResponse {
  token: string;
}

interface RegisterUserData {
  name: string;
  email: string;
  passwordHash: string;
  avatarUrl?: string;
}

export const registerUser = async (userData: RegisterUserData): Promise<RegisterResponse> => {
  const response = await api.post('/register', userData);
  return response.data;
}

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await api.post('/login', data);
  return response.data;
}
