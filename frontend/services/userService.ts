import { api } from '@/lib/api';
import { User, UserRole } from '@/types/auth';

export const userService = {
  /**
   * Fetch all registered users with optional search by roll number, name, email, department
   */
  async getUsers(search?: string): Promise<User[]> {
    const params = new URLSearchParams();
    if (search) params.append('search', search);

    const url = `/users/${params.toString() ? `?${params.toString()}` : ''}`;
    const response = await api.get<User[]>(url);
    return response.data;
  },

  /**
   * Update a user's global system role (Admin only)
   */
  async updateUserRole(userId: string, role: UserRole): Promise<User> {
    const response = await api.patch<User>(`/users/${userId}/role?role=${role}`, { role });
    return response.data;
  }
};
