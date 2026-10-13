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
    const rawUsername = data.username || data.email.split('@')[0];
    const payload = {
      username: rawUsername.toLowerCase().trim(),
      full_name: data.full_name,
      email: data.email.toLowerCase().trim(),
      roll_number: data.roll_number?.trim().toUpperCase() || undefined,
      password: data.password,
      department: data.department || 'Computer Science',
      year: data.year || 1,
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
    } catch (e) {
      console.warn('Backend logout call completed/fallback:', e);
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
