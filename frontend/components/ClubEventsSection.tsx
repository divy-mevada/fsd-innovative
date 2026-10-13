'use client';

import React, { useState } from 'react';
import { useEventsStore } from '@/lib/events-store';
import { AddEventModal } from './AddEventModal';
import { CampusEvent } from '@/types/event';

interface ClubEventsSectionProps {
  clubId: string;
  clubName: string;
  userRole?: string;
  canAddEvent?: boolean;
}

export const ClubEventsSection: React.FC<ClubEventsSectionProps> = ({
  clubId,
  clubName,
  userRole = 'CLUB_MEMBER',
  canAddEvent = false,
}) => {
  const { events, registeredIds, toggleRegister } = useEventsStore(clubId, clubName);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

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

  // Compute club metrics
  const totalRegistrations = events.reduce((acc, ev) => acc + (ev.registered_count || 0), 0);
  const totalCapacity = events.reduce((acc, ev) => acc + (ev.capacity || 0), 0);

  return (
    <div className="space-y-4">
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold shadow-xl border border-white/10 flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-emerald-400 text-sm">check_circle</span>
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header with Title and Add Event Button for Executive & Head */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface-container-lowest p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-xl">event_upcoming</span>
            <h3 className="text-base font-extrabold text-on-surface">
              {clubName} — Events & Workshops
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold">
              {events.length} Active
            </span>
          </div>
          <p className="text-xs text-on-surface-variant mt-0.5">
            Event timelines, registration statistics, seat capacities, and RSVP forms
          </p>
        </div>

        {canAddEvent && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-container text-on-primary font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
          >
            <span className="material-symbols-outlined text-base">add_circle</span>
            <span>+ Add Club Event</span>
          </button>
        )}
      </div>

      {/* Mini Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="bg-surface-container-lowest p-3 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline">Published Events</span>
            <div className="text-xl font-extrabold text-primary">{events.length}</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-base">calendar_month</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest p-3 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline">Total RSVPs</span>
            <div className="text-xl font-extrabold text-emerald-600">{totalRegistrations}</div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-base">group</span>
          </div>
        </div>

        <div className="col-span-2 sm:col-span-1 bg-surface-container-lowest p-3 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-outline">Avg Seat Fill</span>
            <div className="text-xl font-extrabold text-amber-600">
              {totalCapacity > 0 ? Math.round((totalRegistrations / totalCapacity) * 100) : 0}%
            </div>
          </div>
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-base">trending_up</span>
          </div>
        </div>
      </div>

      {/* Events Listing */}
      {events.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-2xl border border-slate-200/80 p-8 text-center space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-2xl">event_busy</span>
          </div>
          <h4 className="text-sm font-bold text-on-surface">No Events Scheduled Yet</h4>
          <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
            {canAddEvent
              ? 'As a club officer, you can schedule workshops, hackathons, and seminars by clicking "+ Add Club Event".'
              : 'The club officers have not posted any upcoming events yet. Check back soon!'}
          </p>
          {canAddEvent && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-primary text-on-primary text-xs font-bold rounded-xl shadow-xs"
            >
              Publish First Event
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {events.map((ev) => {
            const dateObj = new Date(ev.start_time);
            const monthStr = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
            const dayStr = dateObj.toLocaleDateString('en-US', { day: '2-digit' });
            const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const isRegistered = registeredIds.includes(ev.id);
            const percentFilled = Math.min(100, Math.round(((ev.registered_count || 0) / (ev.capacity || 100)) * 100));

            return (
              <div
                key={ev.id}
                className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                {/* Left: Date callout & Main info */}
                <div className="flex items-start gap-4">
                  {/* Timeline Date Badge */}
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-b from-slate-900 to-indigo-950 text-white shrink-0 shadow-sm border border-white/10">
                    <span className="text-[10px] font-extrabold uppercase text-teal-300 tracking-wider">
                      {monthStr}
                    </span>
                    <span className="text-xl font-extrabold leading-none">{dayStr}</span>
                    <span className="text-[9px] text-slate-300 mt-0.5">{timeStr}</span>
                  </div>

                  {/* Event Details */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-extrabold">
                        {ev.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-on-surface-variant font-medium">
                        <span className="material-symbols-outlined text-xs text-rose-500">location_on</span>
                        {ev.venue}
                      </span>
                    </div>

                    <h4 className="text-sm font-extrabold text-on-surface leading-tight">
                      {ev.title}
                    </h4>

                    <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2 max-w-xl">
                      {ev.description}
                    </p>

                    {/* Timeline & Statistics Bar */}
                    <div className="flex flex-wrap items-center gap-4 pt-1">
                      {/* Capacity progress */}
                      <div className="flex items-center gap-2">
                        <div className="w-28 sm:w-36 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60">
                          <div
                            className={`h-full rounded-full transition-all ${
                              percentFilled > 85 ? 'bg-rose-500' : percentFilled > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${percentFilled}%` }}
                          ></div>
                        </div>
                        <span className="text-[11px] font-bold text-on-surface">
                          {ev.registered_count} / {ev.capacity} Seats ({percentFilled}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons (Google Form Link & RSVP) */}
                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 self-start md:self-center shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                  {/* Google Form Link Button */}
                  {ev.google_form_url && (
                    <a
                      href={ev.google_form_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
                      title="Open external Google Form registration link"
                    >
                      <span className="material-symbols-outlined text-sm text-purple-700">dynamic_form</span>
                      <span>Google Form</span>
                      <span className="material-symbols-outlined text-xs">open_in_new</span>
                    </a>
                  )}

                  {/* Internal RSVP Toggle */}
                  <button
                    onClick={() => handleToggle(ev.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer ${
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
          })}
        </div>
      )}

      {/* Add Event Modal */}
      {canAddEvent && (
        <AddEventModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          clubId={clubId}
          clubName={clubName}
          userRole={userRole}
          onEventCreated={() => {
            showToast('Event published successfully to club & campus feeds!');
          }}
        />
      )}
    </div>
  );
};
