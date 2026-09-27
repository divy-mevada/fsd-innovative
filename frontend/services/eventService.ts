import { api } from '../lib/api';
import { CampusEvent, EventRegistration } from '../types/event';

export const eventService = {
  async getEvents(category?: string, search?: string): Promise<CampusEvent[]> {
    const params = new URLSearchParams();
    if (category && category.toLowerCase() !== 'all') params.append('category', category);
    if (search) params.append('search', search);

    const response = await api.get<CampusEvent[]>(`/events${params.toString() ? `?${params.toString()}` : ''}`);
    return response.data;
  },

  async getEvent(eventIdentifier: string): Promise<CampusEvent> {
    const response = await api.get<CampusEvent>(`/events/${eventIdentifier}`);
    return response.data;
  },

  async registerForEvent(eventId: string): Promise<EventRegistration> {
    const response = await api.post<EventRegistration>(`/events/${eventId}/register`);
    return response.data;
  },
};
