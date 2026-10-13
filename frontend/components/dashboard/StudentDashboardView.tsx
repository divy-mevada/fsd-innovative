'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { getUserApplications, ClubApplication } from '@/lib/club-applications-store';

interface StudentDashboardViewProps {
  user: User | null;
}

const CATEGORIES = [
  { id: 'tech', name: 'Technology & Coding', icon: 'code', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'arts', name: 'Arts & Design', icon: 'palette', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'sports', name: 'Sports & Wellness', icon: 'fitness_center', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'culture', name: 'Cultural & Music', icon: 'music_note', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'business', name: 'Business & Startups', icon: 'trending_up', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'social', name: 'Social Impact', icon: 'volunteer_activism', color: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ user }) => {
  const router = useRouter();
  const [applications, setApplications] = useState<ClubApplication[]>([]);

  const userMemberships = user?.club_memberships || [];

  const loadApps = () => {
    if (user?.id || user?.email) {
      const apps = getUserApplications(user.id || user.email);
      setApplications(apps);
    }
  };

  useEffect(() => {
    loadApps();
    const handleUpdate = () => loadApps();
    window.addEventListener('campusclub_applications_updated', handleUpdate);
    return () => window.removeEventListener('campusclub_applications_updated', handleUpdate);
  }, [user]);

  const pendingApps = applications.filter((a) => a.status === 'PENDING');

  return (
    <div className="flex flex-col w-full pb-space-xl space-y-6">
      {/* Hero Welcome Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-gradient-to-r from-primary-container via-primary to-secondary p-8 text-on-primary">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-secondary-fixed">
            <span className="material-symbols-outlined text-sm">school</span>
            <span>Student Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}!
          </h1>

          <p className="text-sm sm:text-base text-primary-fixed-dim/90 max-w-xl leading-relaxed">
            Discover campus clubs, submit applications to join chapters, and build your collegiate leadership profile.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => router.push('/clubs')}
              className="px-5 py-2.5 bg-white text-primary font-bold text-sm rounded-lg shadow-sm hover:bg-slate-50 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore Clubs</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
            <button
              onClick={() => router.push('/events')}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-md text-white font-bold text-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>Events Calendar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Stats Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Campus Guilds</span>
            <div className="text-2xl font-extrabold text-primary mt-1">24</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">shield</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Joined Clubs</span>
            <div className="text-2xl font-extrabold text-teal-700 mt-1">{userMemberships.length}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
            <span className="material-symbols-outlined">group_add</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pending Applications</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">{pendingApps.length}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined">pending_actions</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Badges</span>
            <div className="text-2xl font-extrabold text-purple-700 mt-1">{userMemberships.length > 0 ? '1' : '0'}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <span className="material-symbols-outlined">workspace_premium</span>
          </div>
        </div>
      </section>

      {/* Applications & Joined Clubs Tracker Section */}
      {(applications.length > 0 || userMemberships.length > 0) && (
        <section className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">fact_check</span>
              <h3 className="text-base font-bold text-on-surface">My Club Application Status</h3>
            </div>
            <span className="text-xs text-on-surface-variant font-medium">Club Head Decision Tracker</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {applications.map((app) => (
              <div
                key={app.id}
                className={`p-4 rounded-xl border flex items-start justify-between gap-3 ${
                  app.status === 'ACCEPTED'
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : app.status === 'REJECTED'
                    ? 'border-slate-200 bg-slate-50/50'
                    : 'border-amber-200 bg-amber-50/20'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-on-surface">{app.club_name}</h4>
                  </div>
                  <p className="text-[11px] text-on-surface-variant">
                    {app.status === 'PENDING'
                      ? 'Waiting for Club Head approval. Notification sent to chapter leadership.'
                      : app.status === 'ACCEPTED'
                      ? 'Approved by Club Head! You are an active chapter member.'
                      : 'Application was declined.'}
                  </p>
                  <span className="text-[10px] text-outline block">
                    Applied: {new Date(app.applied_at).toLocaleDateString()}
                  </span>
                </div>

                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-extrabold shrink-0 ${
                    app.status === 'ACCEPTED'
                      ? 'bg-emerald-100 text-emerald-800'
                      : app.status === 'REJECTED'
                      ? 'bg-slate-200 text-slate-700'
                      : 'bg-amber-100 text-amber-800 flex items-center gap-1'
                  }`}
                >
                  {app.status === 'PENDING' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
                  )}
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Explore Categories */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-on-surface">Explore Categories</h2>
              <Link href="/clubs" className="text-xs text-secondary hover:underline font-bold">
                View All &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => router.push(`/clubs?category=${cat.id}`)}
                  className={`p-3.5 rounded-xl border ${cat.color} cursor-pointer hover:shadow-sm transition-all flex items-center gap-3 group`}
                >
                  <span className="material-symbols-outlined text-xl transition-transform group-hover:scale-110">
                    {cat.icon}
                  </span>
                  <span className="text-xs font-bold leading-tight">{cat.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Clubs Action */}
          <section className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-100 shadow-xs flex flex-col items-center text-center space-y-3">
            <div className="w-12 h-12 rounded-xl bg-primary-container/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-2xl">groups</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-on-surface">Explore University Clubs & Apply</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Browse student tech guilds, design groups, and sports organizations. Apply to join and the club head will review your request.
              </p>
            </div>
            <button
              onClick={() => router.push('/clubs')}
              className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs transition-all cursor-pointer"
            >
              Browse Clubs Catalogue
            </button>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-slate-100 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-sm font-bold text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-base">event_upcoming</span>
                My Schedule
              </span>
              <span className="text-xs font-bold text-outline">0 Enrolled</span>
            </div>
            <p className="text-xs text-on-surface-variant text-center py-4">No registered events yet.</p>
            <button
              onClick={() => router.push('/events')}
              className="w-full py-2 bg-surface-container-low text-primary text-xs font-bold rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
            >
              Browse Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
