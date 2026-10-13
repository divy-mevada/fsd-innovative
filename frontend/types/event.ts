export interface CampusEvent {
  id: string;
  title: string;
  slug: string;
  club_id?: string | null;
  club_name?: string | null;
  category: string;
  description: string;
  venue: string;
  start_time: string;
  end_time?: string | null;
  banner_url?: string | null;
  capacity: number;
  registered_count: number;
  is_free: boolean;
  ticket_price?: string | null;
  google_form_url?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface EventRegistration {
  id: string;
  user_id: string;
  event_id: string;
  ticket_code: string;
  seat_zone: string;
  status: 'CONFIRMED' | 'CANCELLED';
  registered_at: string;
}
