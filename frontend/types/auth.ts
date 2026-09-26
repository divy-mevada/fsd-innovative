export type UserRole = 'STUDENT' | 'CLUB_MEMBER' | 'EXECUTIVE' | 'CLUB_HEAD';

export interface User {
  id: string;
  full_name: string;
  email: string;
  profile_image?: string | null;
  department?: string | null;
  year?: number | null;
  role: UserRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RegisterData {
  full_name: string;
  email: string;
  password: string;
  department?: string;
  year?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface ChangePasswordData {
  current_password: str;
  new_password: str;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ApiErrorResponse {
  detail: string;
  errors?: Array<{ field: string; message: string }>;
}
