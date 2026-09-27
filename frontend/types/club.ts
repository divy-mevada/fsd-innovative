export interface Club {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string;
  department?: string | null;
  banner_url?: string | null;
  logo_url?: string | null;
  member_count: number;
  flagship_events_count: number;
  badge_text?: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ClubCreateData {
  name: string;
  slug: string;
  category: string;
  description: string;
  department?: string;
  banner_url?: string;
  logo_url?: string;
  badge_text?: string;
}

export interface ClubMember {
  id: string;
  user_id: string;
  club_id: string;
  role: 'MEMBER' | 'EXECUTIVE' | 'CLUB_HEAD';
  status: 'ACTIVE' | 'PENDING' | 'REJECTED';
  joined_at: string;
}
