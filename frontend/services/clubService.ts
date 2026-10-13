import { api } from '../lib/api';
import { Club, ClubCreateData, ClubMember } from '../types/club';

export const clubService = {
  async getClubs(category?: string, search?: string): Promise<Club[]> {
    const params = new URLSearchParams();
    if (category && category.toLowerCase() !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const response = await api.get<Club[]>(`/clubs${params.toString() ? `?${params.toString()}` : ''}`);
    return response.data;
  },

  async getClub(clubIdentifier: string): Promise<Club> {
    const response = await api.get<Club>(`/clubs/${clubIdentifier}`);
    return response.data;
  },

  async createClub(clubData: ClubCreateData): Promise<Club> {
    const response = await api.post<Club>('/clubs', clubData);
    return response.data;
  },

  async joinClub(clubId: string): Promise<ClubMember> {
    const response = await api.post<ClubMember>(`/clubs/${clubId}/join`);
    return response.data;
  },

  async applyToClub(clubId: string, statement?: string): Promise<any> {
    const response = await api.post(`/clubs/${clubId}/apply`, { statement });
    return response.data;
  },

  async getClubMembers(clubId: string): Promise<any[]> {
    const response = await api.get(`/clubs/${clubId}/members`);
    return response.data;
  },

  async getPendingApplications(clubId: string): Promise<any[]> {
    const response = await api.get(`/clubs/${clubId}/applications`);
    return response.data;
  },

  async acceptApplication(clubId: string, memberId: string): Promise<any> {
    const response = await api.post(`/clubs/${clubId}/applications/${memberId}/accept`);
    return response.data;
  },

  async rejectApplication(clubId: string, memberId: string): Promise<any> {
    const response = await api.post(`/clubs/${clubId}/applications/${memberId}/reject`);
    return response.data;
  },

  async updateMemberRole(clubId: string, userId: string, role: string): Promise<any> {
    const response = await api.put(`/clubs/${clubId}/members/${userId}/role`, { role });
    return response.data;
  },

  async removeMember(clubId: string, userId: string): Promise<any> {
    const response = await api.delete(`/clubs/${clubId}/members/${userId}`);
    return response.data;
  },
};
