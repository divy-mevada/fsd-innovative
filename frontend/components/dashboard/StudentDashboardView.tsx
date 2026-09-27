'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';

interface StudentDashboardViewProps {
  user: User | null;
}

const CATEGORIES = [
  { id: 'tech', name: 'Technology & Coding', icon: 'code', count: '12 Clubs', color: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'arts', name: 'Arts & Design', icon: 'palette', count: '8 Clubs', color: 'bg-purple-50 text-purple-700 border-purple-200' },
  { id: 'sports', name: 'Sports & Wellness', icon: 'fitness_center', count: '10 Clubs', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'culture', name: 'Cultural & Music', icon: 'music_note', count: '15 Clubs', color: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'business', name: 'Business & Startups', icon: 'trending_up', count: '6 Clubs', color: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'social', name: 'Social Impact', icon: 'volunteer_activism', count: '9 Clubs', color: 'bg-rose-50 text-rose-700 border-rose-200' },
];

export const StudentDashboardView: React.FC<StudentDashboardViewProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Welcome Banner */}
      <section className="relative w-full rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-primary-container via-primary to-secondary p-space-xl text-on-primary mb-space-lg">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
        <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-tertiary-fixed/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col gap-space-sm">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md w-fit">
            <span className="material-symbols-outlined text-sm text-secondary-fixed">stars</span>
            <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">
              Student Explorer Dashboard
            </span>
          </div>

          <h1 className="font-display text-display tracking-tight text-on-primary leading-tight">
            Welcome back, {user?.full_name?.split(' ')[0] || 'Student'}!
          </h1>

          <p className="font-body-lg text-body-lg text-primary-fixed-dim/90 max-w-2xl leading-relaxed">
            Discover active campus guilds, RSVP for upcoming hackathons & workshops, and build your student portfolio today.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <button
              onClick={() => router.push('/clubs')}
              className="px-space-lg py-2.5 bg-surface-container-lowest text-primary font-label-lg text-label-lg rounded-lg shadow-md hover:bg-surface-container-low transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span>Explore All Clubs</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
            <button
              onClick={() => router.push('/events')}
              className="px-space-lg py-2.5 bg-surface-container-lowest/10 backdrop-blur-md text-on-primary font-label-lg text-label-lg rounded-lg hover:bg-surface-container-lowest/20 transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">event</span>
              <span>Browse Events</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Stats Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Active Clubs</span>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined">shield</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-primary font-bold">24</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-secondary">trending_up</span>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Campus Organizations</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Joined Clubs</span>
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <span className="material-symbols-outlined">group_add</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-teal-700 font-bold">0</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-teal-600">person_add</span>
              <span className="font-label-sm text-label-sm text-teal-600 font-semibold">My Memberships</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Registered Events</span>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <span className="material-symbols-outlined">calendar_month</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-purple-700 font-bold">0</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-purple-600">event_available</span>
              <span className="font-label-sm text-label-sm text-purple-600 font-semibold">Upcoming Sessions</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Certificates Earned</span>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined">workspace_premium</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-amber-700 font-bold">0</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-amber-600">verified</span>
              <span className="font-label-sm text-label-sm text-amber-600 font-semibold">Skill Badges</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">
          {/* Explore by Category */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Explore Categories</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Find student communities matching your field and interests
                </p>
              </div>
              <Link href="/clubs" className="font-label-sm text-label-sm text-secondary cursor-pointer hover:underline font-bold">
                View All Categories
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-md">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  onClick={() => router.push(`/clubs?category=${cat.id}`)}
                  className={`p-space-md rounded-xl border ${cat.color} cursor-pointer hover:shadow-md transition-all flex flex-col justify-between group`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="material-symbols-outlined text-2xl transition-transform group-hover:scale-110">
                      {cat.icon}
                    </span>
                    <span className="font-label-sm text-label-sm opacity-80">{cat.count}</span>
                  </div>
                  <span className="font-label-md text-label-md font-bold leading-tight">{cat.name}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Featured Clubs Section */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Featured Student Guilds</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Top active clubs with open membership & upcoming events</p>
              </div>
              <button
                onClick={() => router.push('/clubs')}
                className="px-space-md py-1.5 bg-surface-container-low text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors font-semibold"
              >
                View Roster
              </button>
            </div>

            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center py-10">
              <div className="w-14 h-14 rounded-full bg-primary-container/20 flex items-center justify-center text-primary mb-3">
                <span className="material-symbols-outlined text-3xl">groups</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1">
                Explore & Join Campus Clubs
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mb-space-md">
                You haven&apos;t joined any clubs yet. Discover developer guilds, design collectives, and sports clubs!
              </p>
              <button
                onClick={() => router.push('/clubs')}
                className="px-space-lg py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md font-bold hover:bg-primary-container shadow-sm transition-all"
              >
                Browse Clubs Catalogue
              </button>
            </div>
          </section>

          {/* Open Campus Events */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Upcoming Campus Events</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Workshops, hackathons, and social gatherings</p>
              </div>
              <Link href="/events" className="font-label-sm text-label-sm text-primary font-bold hover:underline">
                View All Events
              </Link>
            </div>

            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm border border-slate-100 flex flex-col items-center text-center py-10">
              <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-3">
                <span className="material-symbols-outlined text-3xl">event_available</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mb-1">
                No Registered Events
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant max-w-md mb-space-md">
                Register for upcoming workshops, guest lectures, and tech competitions to earn event badges.
              </p>
              <button
                onClick={() => router.push('/events')}
                className="px-space-lg py-2 rounded-lg bg-surface-container-high text-primary font-label-md text-label-md font-bold hover:bg-surface-container transition-all"
              >
                Explore Events Calendar
              </button>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Quick Schedule Widget */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100">
            <div className="flex items-center justify-between pb-space-xs mb-space-sm border-b border-slate-100">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary">event_upcoming</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">My Event Passes</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                0 Passes
              </span>
            </div>

            <div className="py-8 text-center">
              <span className="material-symbols-outlined text-3xl text-outline mb-1">confirmation_number</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">No event tickets reserved.</p>
              <button
                onClick={() => router.push('/events')}
                className="mt-3 font-label-sm text-label-sm text-primary font-bold hover:underline"
              >
                + RSVP for an Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
