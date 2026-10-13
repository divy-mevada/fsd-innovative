import { api } from '@/lib/api';

export interface ChatMessage {
  id: string;
  club_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: string;
  content: string;
  channel: string;
  created_at: string;
}

/**
 * Normalizes club IDs, club names, and role slug aliases into a single canonical club ID.
 * This guarantees that Club Head, Executive, and Club Member always join and sync the exact same room.
 */
export function getCanonicalClubId(clubId?: string, clubName?: string): string {
  const combined = `${clubId || ''} ${clubName || ''}`.toLowerCase().trim();

  if (combined.includes('acm')) {
    return 'acm_chapter';
  }
  if (combined.includes('csi') || combined.includes('computer society')) {
    return 'csi_chapter';
  }

  const rawId = (clubId || clubName || 'general_club').toLowerCase().trim();
  return rawId.replace(/[^a-z0-9_-]+/g, '_').replace(/^_+|_+$/g, '');
}

/**
 * Helper to retrieve stored messages from localStorage, also checking previous
 * sessionStorage and alias keys for backward compatibility and migration.
 */
function getLocalFallbackMessages(canonicalClubId: string, channel: string): ChatMessage[] {
  if (typeof window === 'undefined') return [];

  const canonicalKey = `campusclub_chat_${canonicalClubId}_${channel}`;
  const aliasKeys = [
    canonicalKey,
    canonicalClubId === 'acm_chapter' ? `campusclub_chat_acm_student_chapter_${channel}` : null,
    canonicalClubId === 'csi_chapter' ? `campusclub_chat_computer_society_of_india__csi_${channel}` : null,
  ].filter(Boolean) as string[];

  const messageMap = new Map<string, ChatMessage>();

  // Check localStorage and sessionStorage across all aliases
  aliasKeys.forEach((key) => {
    try {
      const localStr = localStorage.getItem(key);
      if (localStr) {
        const parsed: ChatMessage[] = JSON.parse(localStr);
        if (Array.isArray(parsed)) {
          parsed.forEach((m) => messageMap.set(m.id || `${m.sender_name}_${m.created_at}`, m));
        }
      }
    } catch {
      // ignore parse error
    }

    try {
      const sessionStr = sessionStorage.getItem(key);
      if (sessionStr) {
        const parsed: ChatMessage[] = JSON.parse(sessionStr);
        if (Array.isArray(parsed)) {
          parsed.forEach((m) => messageMap.set(m.id || `${m.sender_name}_${m.created_at}`, m));
        }
      }
    } catch {
      // ignore parse error
    }
  });

  if (messageMap.size === 0) {
    const defaultWelcome: ChatMessage = {
      id: 'm1',
      club_id: canonicalClubId,
      sender_id: 'u_president',
      sender_name: 'Club President',
      sender_role: 'CLUB_HEAD',
      content: `Welcome to the #${channel} channel! Official discussions, event planning, and club announcements happen here.`,
      channel: channel,
      created_at: new Date(Date.now() - 3600000).toISOString(),
    };
    return [defaultWelcome];
  }

  // Sort chronologically
  const sorted = Array.from(messageMap.values()).sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );

  // Migrate/save cleanly to canonical localStorage key
  try {
    localStorage.setItem(canonicalKey, JSON.stringify(sorted));
  } catch {
    // storage full or quota exceeded
  }

  return sorted;
}

export const chatService = {
  getCanonicalClubId,

  async getClubMessages(clubId: string, channel: string = 'general'): Promise<ChatMessage[]> {
    const canonicalId = getCanonicalClubId(clubId);

    try {
      const response = await api.get<ChatMessage[]>(
        `/clubs/${encodeURIComponent(canonicalId)}/messages?channel=${encodeURIComponent(channel)}`
      );
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        // Also sync backend messages into localStorage for offline availability
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(`campusclub_chat_${canonicalId}_${channel}`, JSON.stringify(response.data));
          } catch {
            // ignore
          }
        }
        return response.data;
      }
      // If API returned empty array, check if client fallback has messages
      const fallbackMsgs = getLocalFallbackMessages(canonicalId, channel);
      return fallbackMsgs.length > 0 ? fallbackMsgs : response.data;
    } catch (err) {
      console.warn('API chat history request skipped or offline, using client fallback store:', err);
      return getLocalFallbackMessages(canonicalId, channel);
    }
  },

  async sendMessage(
    clubId: string,
    content: string,
    channel: string = 'general',
    senderName: string = 'You',
    senderRole: string = 'MEMBER'
  ): Promise<ChatMessage> {
    const canonicalId = getCanonicalClubId(clubId);

    const fallbackMsg: ChatMessage = {
      id: `msg_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      club_id: canonicalId,
      sender_id: 'current_user',
      sender_name: senderName,
      sender_role: senderRole,
      content: content.trim(),
      channel: channel,
      created_at: new Date().toISOString(),
    };

    // Always persist to localStorage first so other tabs receive it immediately
    if (typeof window !== 'undefined') {
      try {
        const existing = getLocalFallbackMessages(canonicalId, channel);
        const updated = [...existing, fallbackMsg];
        localStorage.setItem(`campusclub_chat_${canonicalId}_${channel}`, JSON.stringify(updated));
        window.dispatchEvent(
          new CustomEvent('campusclub_chat_updated', {
            detail: { clubId: canonicalId, channel, message: fallbackMsg },
          })
        );
      } catch {
        // ignore
      }
    }

    try {
      const response = await api.post<ChatMessage>(`/clubs/${encodeURIComponent(canonicalId)}/messages`, {
        content: content.trim(),
        channel: channel,
      });
      return response.data;
    } catch (err) {
      console.warn('API message send failed, using client storage fallback:', err);
      return fallbackMsg;
    }
  },
};
