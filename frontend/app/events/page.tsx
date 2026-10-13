'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useEventsStore } from '@/lib/events-store';
import { useAuth } from '@/hooks/useAuth';
import { AddEventModal } from '@/components/AddEventModal';
import { CampusEvent } from '@/types/event';

export default function EventsPage() {
  const { user } = useAuth();
  const { events, registeredIds, toggleRegister } = useEventsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const isOfficer =
    user?.role === 'CLUB_HEAD' ||
    user?.role === 'EXECUTIVE' ||
    user?.role === 'ADMIN';

  // Get active club name from user's membership if officer
  const activeClubName =
    user?.club_memberships && user.club_memberships.length > 0
      ? user.club_memberships[0].club_name
      : user?.role === 'CLUB_HEAD'
      ? 'ACM Student Chapter'
      : 'Campus Chapter';

  const activeClubId =
    user?.club_memberships && user.club_memberships.length > 0
      ? user.club_memberships[0].club_id
      : user?.role === 'CLUB_HEAD'
      ? 'acm_chapter'
      : 'csi_chapter';

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleToggle = (eventId: string) => {
    const res = toggleRegister(eventId);
    if (res.isRegistered) {
      showToast('RSVP Confirmed! Your seat has been reserved.');
    } else {
      showToast('RSVP Cancelled. Your seat was freed.');
    }
  };

  const filteredEvents = events.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (evt.club_name && evt.club_name.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === 'All' ||
      evt.category.toLowerCase().includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full pb-space-xl space-y-6">
        {toastMsg && (
          <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xl border border-white/10 flex items-center gap-2 animate-bounce">
            <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Hero Banner Section */}
        <div className="relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-8 shadow-md">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-bold uppercase tracking-wider text-teal-300">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                <span>University Events & Chapter Gatherings • Live Feed</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Campus Events & Workshops
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Discover flagship hackathons, technical workshops, and chapter milestones across all university clubs. Register with live seat tracking and Google RSVP forms.
              </p>
            </div>

            {isOfficer && (
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-5 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer self-start md:self-auto shrink-0"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>+ Add Club Event</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & Tags Filters */}
        <div className="bg-surface-container-lowest p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-base pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search all upcoming events by title, venue, or club name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low focus:bg-surface-container-lowest text-xs text-on-surface rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'Hackathon', 'Technical Workshop', 'Competition', 'Hardware Lab', 'Cultural', 'Seminar'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedTag === tag
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Events Feed */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              Showing {filteredEvents.length} Upcoming Events
            </span>
            <span className="text-xs text-outline">Real-time RSVP synchronization</span>
          </div>

          {filteredEvents.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl border border-slate-200/80 p-12 text-center space-y-3">
              <span className="material-symbols-outlined text-5xl text-slate-300">event_busy</span>
              <h3 className="text-sm font-bold text-on-surface">No Events Found</h3>
              <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
                No events matched your current search filters. Try searching for a different keyword or category.
              </p>
            </div>
          ) : (
            filteredEvents.map((evt) => {
              const isRegistered = registeredIds.includes(evt.id);
              const dateObj = new Date(evt.start_time);
              const monthStr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
              const dayStr = dateObj.toLocaleDateString('en-US', { day: '2-digit' });
              const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
              const percentFilled = Math.min(100, Math.round(((evt.registered_count || 0) / (evt.capacity || 100)) * 100));

              return (
                <div
                  key={evt.id}
                  className="bg-surface-container-lowest rounded-2xl p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 border border-slate-200/80"
                >
                  {/* Left Column: Date Callout & Info */}
                  <div className="flex items-start gap-4 flex-1">
                    {/* Date Callout Box */}
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white shrink-0 shadow-sm border border-white/10">
                      <span className="text-[10px] font-extrabold uppercase text-teal-300 tracking-wider">
                        {monthStr}
                      </span>
                      <span className="text-xl font-extrabold leading-none">{dayStr}</span>
                      <span className="text-[9px] text-slate-300 mt-0.5">{timeStr}</span>
                    </div>

                    {/* Details */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-extrabold">
                          {evt.category}
                        </span>

                        {evt.club_name && (
                          <span className="px-2 py-0.5 rounded-md bg-teal-50 text-teal-900 border border-teal-200/70 text-[10px] font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[11px]">groups</span>
                            <span>{evt.club_name}</span>
                          </span>
                        )}

                        <span className="flex items-center gap-1 text-[11px] text-on-surface-variant font-medium">
                          <span className="material-symbols-outlined text-xs text-rose-500">location_on</span>
                          <span>{evt.venue}</span>
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-extrabold text-on-surface leading-tight">
                        {evt.title}
                      </h3>

                      <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 max-w-2xl">
                        {evt.description}
                      </p>

                      {/* Live Seat Progress Bar */}
                      <div className="flex items-center gap-3 pt-1">
                        <div className="w-32 sm:w-44 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                          <div
                            className={`h-full rounded-full transition-all ${
                              percentFilled > 85 ? 'bg-rose-500' : percentFilled > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${percentFilled}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-bold text-on-surface">
                          {evt.registered_count} / {evt.capacity} Seats Filled ({percentFilled}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions (Google Form Link & RSVP) */}
                  <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 shrink-0 self-start md:self-center pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 w-full sm:w-auto justify-end">
                    {/* Google Form Link Button */}
                    {evt.google_form_url && (
                      <a
                        href={evt.google_form_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2.5 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                        title="Register via official Google Form questionnaire"
                      >
                        <span className="material-symbols-outlined text-sm text-purple-700">dynamic_form</span>
                        <span>Google Form</span>
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </a>
                    )}

                    {/* Quick RSVP Button */}
                    <button
                      onClick={() => handleToggle(evt.id)}
                      className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
                        isRegistered
                          ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          : 'bg-primary hover:bg-primary-container text-on-primary'
                      }`}
                    >
                      <span className="material-symbols-outlined text-sm">
                        {isRegistered ? 'check_circle' : 'confirmation_number'}
                      </span>
                      <span>{isRegistered ? 'RSVP Confirmed' : 'Quick RSVP'}</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Add Event Modal for Officers */}
        {isOfficer && (
          <AddEventModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            clubId={activeClubId}
            clubName={activeClubName}
            userRole={user?.role}
            onEventCreated={() => {
              showToast('Event published successfully to all clubs feed!');
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
