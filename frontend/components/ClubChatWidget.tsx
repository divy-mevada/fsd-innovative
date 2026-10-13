'use client';

import React, { useState, useEffect, useRef } from 'react';
import { chatService, ChatMessage } from '@/services/chatService';
import { User } from '@/types/auth';

interface ClubChatWidgetProps {
  clubId: string;
  clubName: string;
  currentUser: User | null;
}

export const ClubChatWidget: React.FC<ClubChatWidgetProps> = ({
  clubId,
  clubName,
  currentUser
}) => {
  const canonicalClubId = chatService.getCanonicalClubId(clubId, clubName);
  const [activeChannel, setActiveChannel] = useState<'general' | 'announcements' | 'events-team'>('general');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputContent, setInputContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const channels = [
    { id: 'general', name: 'general', icon: 'chat', label: 'General Lounge' },
    { id: 'announcements', name: 'announcements', icon: 'campaign', label: 'Announcements' },
    { id: 'events-team', name: 'events-team', icon: 'event', label: 'Events & Logistics' },
  ];

  const fetchMessages = async () => {
    if (!canonicalClubId) return;
    setIsLoading(true);
    const msgs = await chatService.getClubMessages(canonicalClubId, activeChannel);
    setMessages(msgs);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Polling for live chat updates

    const handleChatUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.clubId === canonicalClubId) {
        fetchMessages();
      }
    };

    window.addEventListener('campusclub_chat_updated', handleChatUpdate);
    window.addEventListener('storage', handleChatUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener('campusclub_chat_updated', handleChatUpdate);
      window.removeEventListener('storage', handleChatUpdate);
    };
  }, [canonicalClubId, activeChannel]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputContent.trim()) return;

    const content = inputContent.trim();
    setInputContent('');

    const newMsg = await chatService.sendMessage(
      canonicalClubId,
      content,
      activeChannel,
      currentUser?.full_name || 'You',
      currentUser?.role || 'MEMBER'
    );

    setMessages((prev) => {
      if (prev.some((m) => m.id === newMsg.id)) return prev;
      return [...prev, newMsg];
    });
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'ADMIN':
        return <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-900 text-[10px] font-bold">Admin</span>;
      case 'CLUB_HEAD':
        return <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-900 text-[10px] font-bold">President</span>;
      case 'EXECUTIVE':
        return <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-bold">Executive</span>;
      default:
        return <span className="px-1.5 py-0.5 rounded bg-teal-100 text-teal-900 text-[10px] font-bold">Member</span>;
    }
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-slate-200/80 shadow-md flex flex-col h-[520px] overflow-hidden">
      {/* Header */}
      <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-teal-300 font-bold">
            <span className="material-symbols-outlined text-lg">forum</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-extrabold tracking-tight text-white">{clubName} Live Chat</h3>
              <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live
              </span>
            </div>
            <p className="text-[11px] text-slate-300">Channel: #{activeChannel}</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-white/10 px-2.5 py-1 rounded-lg text-xs text-slate-200">
          <span className="material-symbols-outlined text-sm text-teal-300">group</span>
          <span className="font-bold">{messages.length} Messages</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Channel Selector Sidebar */}
        <div className="w-48 bg-surface-container-low border-r border-slate-200/60 p-3 space-y-1.5 shrink-0 hidden sm:block">
          <span className="text-[10px] font-bold text-outline uppercase tracking-wider block px-2 mb-2">
            Text Channels
          </span>
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id as any)}
              className={`w-full px-2.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                activeChannel === ch.id
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm">{ch.icon}</span>
              <span>#{ch.name}</span>
            </button>
          ))}
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 flex flex-col justify-between bg-surface-container-lowest">
          {/* Mobile Channel Bar */}
          <div className="sm:hidden flex items-center gap-1 p-2 bg-surface-container-low border-b border-slate-100 overflow-x-auto">
            {channels.map((ch) => (
              <button
                key={ch.id}
                onClick={() => setActiveChannel(ch.id as any)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-bold whitespace-nowrap cursor-pointer ${
                  activeChannel === ch.id ? 'bg-primary text-on-primary' : 'bg-surface-container text-on-surface-variant'
                }`}
              >
                #{ch.name}
              </button>
            ))}
          </div>

          {/* Messages Scroll View */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-2 text-outline">
                <span className="material-symbols-outlined text-4xl text-slate-300">chat_bubble_outline</span>
                <p className="text-xs font-medium">No messages in #{activeChannel} yet. Be the first to start the conversation!</p>
              </div>
            ) : (
              messages.map((m) => {
                const isSelf = m.sender_name === currentUser?.full_name || m.sender_id === currentUser?.id;
                const timeStr = new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                return (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${isSelf ? 'flex-row-reverse' : ''}`}
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0 border border-primary/20">
                      {m.sender_name.charAt(0).toUpperCase()}
                    </div>

                    <div className={`max-w-[78%] flex flex-col ${isSelf ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[11px] font-bold text-on-surface">{m.sender_name}</span>
                        {getRoleBadge(m.sender_role)}
                        <span className="text-[10px] text-outline ml-1">{timeStr}</span>
                      </div>

                      <div
                        className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                          isSelf
                            ? 'bg-primary text-on-primary rounded-tr-none'
                            : 'bg-surface-container-low text-on-surface border border-slate-200/60 rounded-tl-none'
                        }`}
                      >
                        {m.content}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Input Action Bar */}
          <form onSubmit={handleSend} className="p-3 bg-surface-container-low border-t border-slate-200/80 flex items-center gap-2">
            <input
              type="text"
              placeholder={`Message #${activeChannel}...`}
              value={inputContent}
              onChange={(e) => setInputContent(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-surface-container-lowest rounded-xl text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputContent.trim()}
              className="px-4 py-2.5 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1 cursor-pointer disabled:opacity-40"
            >
              <span>Send</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
