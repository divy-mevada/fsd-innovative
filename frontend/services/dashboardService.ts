import { api } from '../lib/api';
import { DashboardSummary } from '../types/dashboard';

export const dashboardService = {
  async getSummary(): Promise<DashboardSummary> {
    const response = await api.get<DashboardSummary>('/dashboard/summary');
    return response.data;
  },
};
