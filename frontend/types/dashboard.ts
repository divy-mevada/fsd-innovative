import { User } from './auth';
import { Club } from './club';
import { CampusEvent } from './event';

export interface DashboardMetrics {
  total_joined_clubs: number;
  upcoming_events_registered: number;
  pending_applications: number;
  schedule_count: number;
  attendance_rate: number;
}

export interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  location: string;
  category: string;
  status: string;
}

export interface DashboardSummary {
  user: User;
  metrics: DashboardMetrics;
  my_clubs: Club[];
  upcoming_events: CampusEvent[];
  schedule: ScheduleItem[];
}
