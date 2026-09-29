'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';

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

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Hero Welcome Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-sm bg-gradient-to-r from-primary-container via-primary to-secondary p-8 text-on-primary mb-6">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-secondary-fixed">
            <span className="material-symbols-outlined text-sm">school</span>
            <span>Student Hub</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}!
          </h1>

          <p className="text-sm sm:text-base text-primary-fixed-dim/90 max-w-xl leading-relaxed">
            Discover campus clubs, register for hackathons and workshops, and build your student portfolio.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => router.push('/clubs')}
              className="px-5 py-2.5 bg-white text-primary font-bold text-sm rounded-lg shadow-sm hover:bg-slate-50 transition-all flex items-center gap-1.5"
            >
              <span>Explore Clubs</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
            <button
              onClick={() => router.push('/events')}
              className="px-5 py-2.5 bg-white/10 backdrop-blur-md text-white font-bold text-sm rounded-lg hover:bg-white/20 transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-base">calendar_month</span>
              <span>Events Calendar</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Stats Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
            <div className="text-2xl font-extrabold text-teal-700 mt-1">0</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
            <span className="material-symbols-outlined">group_add</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Event RSVPs</span>
            <div className="text-2xl font-extrabold text-purple-700 mt-1">0</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <span className="material-symbols-outlined">event_available</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Badges</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">0</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined">workspace_premium</span>
          </div>
        </div>
      </section>

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
              <h3 className="text-base font-bold text-on-surface">Explore University Clubs</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Browse student tech guilds, design groups, and sports organizations.
              </p>
            </div>
            <button
              onClick={() => router.push('/clubs')}
              className="px-5 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold hover:bg-primary-container shadow-xs transition-all"
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
              className="w-full py-2 bg-surface-container-low text-primary text-xs font-bold rounded-lg hover:bg-surface-container transition-colors"
            >
              Browse Events
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
