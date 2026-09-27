import { api, setAccessToken } from '@/lib/api';
import {
  RegisterData,
  LoginCredentials,
  TokenResponse,
  User,
  ChangePasswordData
} from '@/types/auth';

export const authService = {
  async register(data: RegisterData): Promise<User> {
    const payload = {
      username: data.username || data.email.split('@')[0],
      full_name: data.full_name,
      email: data.email,
      password: data.password,
      department: data.department,
      year: data.year,
      role: data.role || 'STUDENT',
    };
    const response = await api.post<User>('/auth/register', payload);
    return response.data;
  },

  async login(credentials: LoginCredentials): Promise<TokenResponse> {
    const payload = {
      identifier: credentials.identifier || credentials.email || '',
      password: credentials.password,
    };
    const response = await api.post<TokenResponse>('/auth/login', payload);
    if (response.data.access_token) {
      setAccessToken(response.data.access_token);
    }
    return response.data;
  },

  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } finally {
      setAccessToken(null);
    }
  },

  async getMe(): Promise<User> {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  async refreshToken(): Promise<TokenResponse> {
    const response = await api.post<TokenResponse>('/auth/refresh');
    if (response.data.access_token) {
      setAccessToken(response.data.access_token);
    }
    return response.data;
  },

  async changePassword(data: ChangePasswordData): Promise<{ message: string }> {
    const response = await api.post<{ message: string }>('/auth/change-password', data);
    return response.data;
  }
};
