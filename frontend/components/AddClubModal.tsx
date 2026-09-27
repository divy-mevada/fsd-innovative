'use client';

import React, { useState } from 'react';
import { addClubToStore } from '@/lib/clubs-store';

interface AddClubModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const AddClubModal: React.FC<AddClubModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Technical');
  const [department, setDepartment] = useState('');
  const [headName, setHeadName] = useState('');
  const [badgeText, setBadgeText] = useState('Chartered 2025');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Club name is required.');
      return;
    }
    if (!description.trim()) {
      setError('Description is required.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Try API submission if backend is online
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

      try {
        const token = sessionStorage.getItem('access_token');
        await fetch(`${API_URL}/clubs`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {})
          },
          body: JSON.stringify({
            name,
            slug,
            category,
            description,
            department: department || 'General Campus',
            badge_text: badgeText,
          })
        });
      } catch (apiErr) {
        console.warn('Backend API request skipped or offline, storing locally:', apiErr);
      }

      // 2. Always persist into client clubs store so student pages reflect new club immediately
      addClubToStore({
        name,
        category,
        dept: department ? `Dept. of ${department}` : 'General Campus Guild',
        description,
        badge: badgeText || 'Chartered 2025',
        members: 1,
        perYr: '6 / Yr',
        tagline: 'Newly Chartered',
        bgIcon: getCategoryIcon(category),
        head_name: headName || 'Student Executive',
      });

      setIsSubmitting(false);
      onClose();
      if (onSuccess) onSuccess();

      // Trigger window event so all subscribed components refresh state live
      window.dispatchEvent(new Event('campusclub_clubs_updated'));
    } catch (err: any) {
      setError(err?.message || 'Failed to register club. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-md flex items-center justify-center p-space-md animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-xl max-w-xl w-full p-space-lg shadow-2xl space-y-space-md border border-surface-container-high relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-surface-container-low pb-space-sm">
          <div className="flex items-center gap-space-xs">
            <div className="w-8 h-8 rounded-lg bg-primary text-on-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-lg">add_circle</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-primary font-bold">
                Register New Chartered Club
              </h2>
              <p className="font-label-sm text-label-sm text-on-surface-variant">
                Admin Portal • Add Organization to Campus Directory
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Form Body */}
        {error && (
          <div className="p-space-sm rounded-lg bg-error-container text-on-error-container font-label-sm text-label-sm flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-error text-base">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-space-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div className="space-y-space-xs">
              <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="club-name">
                Club Name *
              </label>
              <input
                id="club-name"
                type="text"
                placeholder="e.g. AI & Quantum Computing Club"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm text-body-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="space-y-space-xs">
              <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="club-category">
                Category *
              </label>
              <select
                id="club-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-on-surface font-label-lg text-label-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary"
              >
                <option value="Technical">Technical & Dev</option>
                <option value="Cultural">Cultural & Arts</option>
                <option value="Sports">Sports & Fitness</option>
                <option value="Entrepreneurship">Entrepreneurship & Startups</option>
                <option value="Arts & Media">Arts & Media</option>
                <option value="Academic">Academic & Research</option>
                <option value="Hardware">Hardware & Robotics</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
            <div className="space-y-space-xs">
              <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="club-dept">
                Department
              </label>
              <input
                id="club-dept"
                type="text"
                placeholder="e.g. Computer Science & Engineering"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm text-body-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div className="space-y-space-xs">
              <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="head-name">
                Executive Lead / Head Name
              </label>
              <input
                id="head-name"
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={headName}
                onChange={(e) => setHeadName(e.target.value)}
                className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm text-body-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          <div className="space-y-space-xs">
            <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="badge-text">
              Charter Badge / Rank Tag
            </label>
            <input
              id="badge-text"
              type="text"
              placeholder="e.g. Top 1% Chapter, Accredited, Tier 1 Funded"
              value={badgeText}
              onChange={(e) => setBadgeText(e.target.value)}
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm text-body-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div className="space-y-space-xs">
            <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="club-desc">
              Club Description & Mission *
            </label>
            <textarea
              id="club-desc"
              rows={3}
              placeholder="Describe the club's workshops, competitions, member activities, and objectives..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 bg-surface-container-low rounded-lg text-on-surface font-body-sm text-body-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          </div>

          <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-surface-container-low">
            <button
              type="button"
              onClick={onClose}
              className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface font-label-md text-label-md font-semibold hover:bg-surface-container transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-space-md py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold shadow-md transition-all flex items-center gap-space-xs"
            >
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>{isSubmitting ? 'Registering...' : 'Register & Publish Club'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

function getCategoryIcon(cat: string): string {
  const c = cat.toLowerCase();
  if (c.includes('tech')) return 'terminal';
  if (c.includes('art') || c.includes('media')) return 'draw';
  if (c.includes('robot') || c.includes('hardware')) return 'smart_toy';
  if (c.includes('entrepreneur') || c.includes('startup')) return 'rocket_launch';
  if (c.includes('sport')) return 'sports_volleyball';
  if (c.includes('cultur')) return 'theater_comedy';
  return 'group';
}
