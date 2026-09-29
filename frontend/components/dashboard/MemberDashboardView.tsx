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
      {/* Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-700 p-8 text-white mb-6">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-teal-200">
            <span className="material-symbols-outlined text-sm">card_membership</span>
            <span>Member Portal</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Club Member Portal — {user?.full_name || 'Member'}
          </h1>

          <p className="text-xs sm:text-sm text-teal-100/90 max-w-xl leading-relaxed">
            Access exclusive member discussions, RSVP for workshops, and visit official club websites.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => router.push('/clubs')}
              className="px-4 py-2 bg-white text-teal-900 font-bold text-xs rounded-lg shadow-xs hover:bg-teal-50 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">groups</span>
              <span>My Clubs</span>
            </button>
            <a
              href="https://www.csi-nirma.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/15 backdrop-blur-md text-white font-bold text-xs rounded-lg hover:bg-white/20 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              <span>CSI Portal ↗</span>
            </a>
            <a
              href="https://nu.acm.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/15 backdrop-blur-md text-white font-bold text-xs rounded-lg hover:bg-white/20 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">open_in_new</span>
              <span>ACM Portal ↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Memberships</span>
            <div className="text-2xl font-extrabold text-teal-700 mt-1">2</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
            <span className="material-symbols-outlined">badge</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Announcements</span>
            <div className="text-2xl font-extrabold text-blue-700 mt-1">4</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined">campaign</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Sessions</span>
            <div className="text-2xl font-extrabold text-purple-700 mt-1">2</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <span className="material-symbols-outlined">event_seat</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Attendance Rate</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">90%</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined">local_fire_department</span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-on-surface">Member Priority Updates</h2>
            <div className="space-y-3">
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-teal-100 shadow-xs flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-lg">campaign</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-700">Computer Society of India (CSI)</span>
                    <span className="text-xs text-outline">Today</span>
                  </div>
                  <h3 className="text-xs font-bold text-on-surface mt-1">
                    CSI Annual CodeSprint & Technical Seminar Registration
                  </h3>
                  <p className="text-xs text-on-surface-variant mt-0.5">
                    Registration is now open for all CSI members on the official CSI site.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-on-surface">My Enrolled Clubs & Portals</h2>
              <Link href="/clubs" className="text-xs text-teal-700 font-bold hover:underline">
                Explore Clubs &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest p-4 rounded-xl border border-slate-100 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary text-on-primary font-bold flex items-center justify-center text-xs">
                    CSI
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">Computer Society of India</h3>
                    <span className="text-xs text-teal-600 font-bold">Active Chapter Member</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.csi-nirma.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 bg-primary text-on-primary text-xs rounded-lg font-bold transition-all text-center flex items-center justify-center gap-1"
                  >
                    <span>Visit Site</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                  <button
                    onClick={() => router.push('/clubs')}
                    className="flex-1 py-1.5 bg-surface-container-low text-primary text-xs rounded-lg font-bold transition-all"
                  >
                    Open Hub
                  </button>
                </div>
              </div>

              <div className="bg-surface-container-lowest p-4 rounded-xl border border-slate-100 shadow-xs space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    ACM
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-on-surface">ACM Student Chapter</h3>
                    <span className="text-xs text-teal-600 font-bold">Active Chapter Member</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href="https://nu.acm.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-1.5 bg-blue-600 text-white text-xs rounded-lg font-bold transition-all text-center flex items-center justify-center gap-1"
                  >
                    <span>Visit Site</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                  <button
                    onClick={() => router.push('/clubs')}
                    className="flex-1 py-1.5 bg-surface-container-low text-primary text-xs rounded-lg font-bold transition-all"
                  >
                    Open Hub
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Digital Pass */}
        <div className="lg:col-span-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-xl p-5 text-white shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">qr_code_2</span>
                Digital Member Pass
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                ACTIVE
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center text-slate-900">
              <span className="material-symbols-outlined text-5xl">qr_code_scanner</span>
              <span className="font-mono text-[10px] font-bold text-slate-500 mt-1">ID: 2025-CSI-1021</span>
            </div>

            <div className="text-center">
              <span className="text-xs font-bold text-white block">{user?.full_name || 'Member'}</span>
              <span className="text-[10px] text-teal-200/80">Verified CSI / ACM Pass</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
