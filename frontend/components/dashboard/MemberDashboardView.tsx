'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';

interface MemberDashboardViewProps {
  user: User | null;
}

export const MemberDashboardView: React.FC<MemberDashboardViewProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Welcome Banner */}
      <section className="relative w-full rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-700 p-space-xl text-white mb-space-lg">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-teal-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col gap-space-sm">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-white/10 backdrop-blur-md w-fit">
            <span className="material-symbols-outlined text-sm text-teal-200">card_membership</span>
            <span className="font-label-sm text-label-sm text-teal-200 uppercase tracking-wider">
              Club Member Hub
            </span>
          </div>

          <h1 className="font-display text-display tracking-tight text-white leading-tight">
            Member Portal — {user?.full_name || 'Active Member'}
          </h1>

          <p className="font-body-lg text-body-lg text-teal-100/90 max-w-2xl leading-relaxed">
            Access exclusive member discussions, RSVP for private workshops, track your attendance credentials, and stay connected with your club peers.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <button
              onClick={() => router.push('/clubs')}
              className="px-space-lg py-2.5 bg-white text-teal-900 font-label-lg text-label-lg rounded-lg shadow-md hover:bg-teal-50 transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">groups</span>
              <span>My Enrolled Clubs</span>
            </button>
            <button
              onClick={() => router.push('/events')}
              className="px-space-lg py-2.5 bg-white/15 backdrop-blur-md text-white font-label-lg text-label-lg rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">confirmation_number</span>
              <span>Member Pass & QR</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Stats Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Active Memberships</span>
            <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600">
              <span className="material-symbols-outlined">badge</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-teal-700 font-bold">2</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-teal-600">verified</span>
              <span className="font-label-sm text-label-sm text-teal-600 font-semibold">Verified Member</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Club Announcements</span>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined">campaign</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-blue-700 font-bold">5</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-blue-600">mark_email_unread</span>
              <span className="font-label-sm text-label-sm text-blue-600 font-semibold">3 Unread Updates</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Member Sessions</span>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <span className="material-symbols-outlined">event_seat</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-purple-700 font-bold">3</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-purple-600">schedule</span>
              <span className="font-label-sm text-label-sm text-purple-600 font-semibold">Next Session Tomorrow</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Attendance Streak</span>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined">local_fire_department</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-amber-700 font-bold">85%</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-amber-600">stars</span>
              <span className="font-label-sm text-label-sm text-amber-600 font-semibold">Active Contributor</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">
          {/* Member Announcements Feed */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Member Priority Feed</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Important updates broadcasted by your club leaders</p>
              </div>
              <span className="font-label-sm text-label-sm text-teal-700 font-bold">Live Updates</span>
            </div>

            <div className="space-y-3">
              {/* Announcement Card 1 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-teal-100 shadow-sm flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">campaign</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-teal-50 text-teal-700">Coding Guild</span>
                    <span className="font-label-sm text-label-sm text-outline">Today at 10:30 AM</span>
                  </div>
                  <h3 className="font-label-lg text-label-lg font-bold text-on-surface mt-1">
                    Weekly Hackathon Preparation Session & Team Formation
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Please join us in Lab 402 this Thursday for team matching and mentor assignment. Bring your laptops!
                  </p>
                </div>
              </div>

              {/* Announcement Card 2 */}
              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-slate-100 shadow-sm flex items-start gap-space-md">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-xl">event_upcoming</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-xs font-bold bg-blue-50 text-blue-700">Design Collective</span>
                    <span className="font-label-sm text-label-sm text-outline">Yesterday</span>
                  </div>
                  <h3 className="font-label-lg text-label-lg font-bold text-on-surface mt-1">
                    Figma UI/UX Workshop Attendance Pass Generated
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Your QR attendance badge is now active in your member portal. Scan at entry to claim your workshop certificate.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Joined Clubs Roster */}
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">My Enrolled Guilds</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Clubs where you hold active membership</p>
              </div>
              <Link href="/clubs" className="font-label-sm text-label-sm text-teal-700 font-bold hover:underline">
                Explore More Clubs
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-space-sm mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold text-lg">
                    CG
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Coding Guild</h3>
                    <span className="font-label-sm text-label-sm text-teal-600 font-bold">Active Member</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  Premier software engineering club focusing on competitive programming and full-stack development.
                </p>
                <button
                  onClick={() => router.push('/clubs')}
                  className="w-full py-2 bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md rounded-lg font-bold transition-all flex items-center justify-center gap-1"
                >
                  <span>Open Club Hub</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>

              <div className="bg-surface-container-lowest p-space-md rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-space-sm mb-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold text-lg">
                    DC
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Design Collective</h3>
                    <span className="font-label-sm text-label-sm text-teal-600 font-bold">Active Member</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mb-4">
                  Creative hub for graphic design, UI/UX prototyping, and digital brand development.
                </p>
                <button
                  onClick={() => router.push('/clubs')}
                  className="w-full py-2 bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md rounded-lg font-bold transition-all flex items-center justify-center gap-1"
                >
                  <span>Open Club Hub</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          {/* Digital QR Ticket Badge */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-xl p-space-md text-white shadow-md">
            <div className="flex items-center justify-between pb-space-xs mb-space-sm border-b border-white/10">
              <span className="font-label-md text-label-md text-teal-300 font-bold flex items-center gap-1">
                <span className="material-symbols-outlined text-base">qr_code_2</span>
                Digital Member Pass
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-label-sm text-label-sm font-bold">
                ACTIVE
              </span>
            </div>

            <div className="bg-white p-4 rounded-xl flex flex-col items-center justify-center my-3 text-slate-900 shadow-inner">
              <div className="w-32 h-32 bg-slate-900 rounded-lg flex items-center justify-center text-white relative">
                <span className="material-symbols-outlined text-6xl">qr_code_scanner</span>
              </div>
              <span className="font-mono text-xs font-bold text-slate-500 mt-2">MEMBER-ID: 2025-CG-8821</span>
            </div>

            <div className="text-center">
              <span className="font-label-md text-label-md font-bold text-white block">
                {user?.full_name || 'Club Member'}
              </span>
              <span className="font-label-sm text-label-sm text-teal-200/80">
                Verified Student Membership Pass
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
