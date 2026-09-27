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
};
