'use client';

import React, { useState } from 'react';
import { addClubEvent } from '@/lib/events-store';
import { CampusEvent } from '@/types/event';

interface AddEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubId: string;
  clubName: string;
  userRole?: string;
  onEventCreated?: (event: CampusEvent) => void;
}

const CATEGORIES = [
  'Technical Workshop',
  'Hackathon',
  'Competition',
  'Seminar & Tech Talk',
  'Hardware Lab',
  'Cultural & Creative',
  'Orientation & Meetup',
  'Webinar / Virtual',
];

export const AddEventModal: React.FC<AddEventModalProps> = ({
  isOpen,
  onClose,
  clubId,
  clubName,
  userRole,
  onEventCreated,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Technical Workshop');
  const [venue, setVenue] = useState('Grand Auditorium');
  const [startDate, setStartDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endDate, setEndDate] = useState('');
  const [endTime, setEndTime] = useState('13:00');
  const [capacity, setCapacity] = useState('100');
  const [googleFormUrl, setGoogleFormUrl] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const isPermitted = userRole === 'CLUB_HEAD' || userRole === 'EXECUTIVE' || userRole === 'ADMIN';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!title.trim()) {
      setErrorMsg('Event title is required.');
      return;
    }

    if (!venue.trim()) {
      setErrorMsg('Event venue or location is required.');
      return;
    }

    // Default to tomorrow if not set
    const sDate = startDate || new Date(Date.now() + 86400000).toISOString().split('T')[0];
    const eDate = endDate || sDate;
    const startIso = new Date(`${sDate}T${startTime}:00`).toISOString();
    const endIso = new Date(`${eDate}T${endTime}:00`).toISOString();

    setIsSubmitting(true);
    try {
      const created = await addClubEvent({
        title,
        club_id: clubId,
        club_name: clubName,
        category,
        venue,
        start_time: startIso,
        end_time: endIso,
        capacity: parseInt(capacity, 10) || 100,
        google_form_url: googleFormUrl.trim() || undefined,
        description: description.trim() || `${title} organized by ${clubName}. Join us for hands-on sessions and community networking.`,
      });

      if (onEventCreated) {
        onEventCreated(created);
      }

      // Reset form
      setTitle('');
      setDescription('');
      setGoogleFormUrl('');
      setIsSubmitting(false);
      onClose();
    } catch (err: any) {
      setIsSubmitting(false);
      setErrorMsg(err?.message || 'Failed to create club event.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-2xl bg-surface-container-lowest rounded-2xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-teal-300">
              <span className="material-symbols-outlined text-2xl">event_available</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-extrabold text-white">Publish New Club Event</h3>
                <span className="px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-[10px] font-bold">
                  {clubName}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Authorized for Executive Board & Club Head leadership
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Content */}
        {!isPermitted ? (
          <div className="p-8 text-center space-y-3">
            <span className="material-symbols-outlined text-5xl text-rose-500">lock</span>
            <h4 className="text-base font-bold text-on-surface">Restricted Permission</h4>
            <p className="text-xs text-on-surface-variant max-w-md mx-auto">
              Only elected Club Heads and Executive Board officers are authorized to publish official club events and workshops.
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-primary text-on-primary rounded-xl font-bold text-xs"
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Title */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Event Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. HackCampus 2025: AI Solutions Sprint"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              />
            </div>

            {/* Category & Capacity Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Event Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-on-surface mb-1">Capacity / Total Seats</label>
                <input
                  type="number"
                  min="1"
                  max="2000"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                />
              </div>
            </div>

            {/* Venue */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Venue / Room / Virtual Link <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
                  location_on
                </span>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grand Auditorium, Innovation Lab 3, or Google Meet"
                  value={venue}
                  onChange={(e) => setVenue(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
                />
              </div>
            </div>

            {/* Date & Time Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50/70 rounded-xl border border-slate-200/60">
              <div>
                <label className="block text-[11px] font-bold text-on-surface mb-1">Event Date & Start Time</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="flex-1 px-2.5 py-2 bg-white rounded-lg text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-24 px-2 py-2 bg-white rounded-lg text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-on-surface mb-1">End Time</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={endDate || startDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="flex-1 px-2.5 py-2 bg-white rounded-lg text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-24 px-2 py-2 bg-white rounded-lg text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            {/* GOOGLE FORM LINK OPTION (KEY REQUIREMENT) */}
            <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/80 space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-purple-950 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-purple-700 text-base">dynamic_form</span>
                  <span>Google Form Registration Link (Optional)</span>
                </label>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-purple-200/70 text-purple-900 uppercase">
                  External RSVP Form
                </span>
              </div>
              <p className="text-[11px] text-purple-900/80 leading-relaxed">
                Provide a Google Form link for participant questions, team formations, or custom registration questionnaires. Students will see a direct button to fill out this form!
              </p>
              <div className="relative mt-1">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-purple-500 text-sm pointer-events-none">
                  link
                </span>
                <input
                  type="url"
                  placeholder="https://forms.gle/your-event-form-id or https://docs.google.com/forms/..."
                  value={googleFormUrl}
                  onChange={(e) => setGoogleFormUrl(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 bg-white rounded-xl text-xs text-on-surface border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-inner"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Description & Agenda
              </label>
              <textarea
                rows={3}
                placeholder="Outline what participants will learn, guest speakers, eligibility, and what to bring..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-surface-container-low rounded-xl text-xs text-on-surface border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary shadow-inner"
              ></textarea>
            </div>

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <span className="material-symbols-outlined text-sm">rocket_launch</span>
                <span>{isSubmitting ? 'Publishing Event...' : 'Publish Club Event'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
