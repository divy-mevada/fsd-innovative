export type UserRole = 'STUDENT' | 'CLUB_MEMBER' | 'EXECUTIVE' | 'CLUB_HEAD' | 'ADMIN';

export interface UserClubMembership {
  club_id: string;
  club_name: string;
  role: UserRole;
  joined_at?: string;
}

export interface User {
  id: string;
  username: string;
  full_name: string;
  email: string;
  roll_number?: string | null;
  profile_image?: string | null;
  department?: string | null;
  year?: number | null;
  role: UserRole;
  club_memberships?: UserClubMembership[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RegisterData {
  username?: string;
  full_name: string;
  email: string;
  roll_number?: string;
  password: string;
  department?: string;
  year?: number;
  role?: UserRole;
}

export interface LoginCredentials {
  identifier?: string;
  email?: string;
  password: string;
}

export interface ChangePasswordData {
  current_password: string;
  new_password: string;
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
