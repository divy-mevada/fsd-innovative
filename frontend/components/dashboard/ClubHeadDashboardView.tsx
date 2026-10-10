'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';

interface ClubHeadDashboardViewProps {
  user: User | null;
  clubName?: string;
}

export const ClubHeadDashboardView: React.FC<ClubHeadDashboardViewProps> = ({ user, clubName = 'ACM Student Chapter' }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Leadership Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-900 p-8 text-white mb-6">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-purple-200">
            <span className="material-symbols-outlined text-sm">stars</span>
            <span>Club President Hub • {clubName}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Club Head Governance — {user?.full_name || 'President'}
          </h1>

          <p className="text-xs sm:text-sm text-purple-100/90 max-w-xl leading-relaxed">
            Overseeing charter administration, executive team operations, and flagship event approvals for <strong className="text-white">{clubName}</strong>.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => router.push('/admin/clubs')}
              className="px-4 py-2 bg-white text-purple-950 font-bold text-xs rounded-lg shadow-xs hover:bg-purple-50 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">domain_verification</span>
              <span>Charter Profile</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Members</span>
            <div className="text-2xl font-extrabold text-purple-700 mt-1">250</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <span className="material-symbols-outlined">groups</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Executives</span>
            <div className="text-2xl font-extrabold text-indigo-700 mt-1">6</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <span className="material-symbols-outlined">badge</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Annual Budget</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">₹1,20,000</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined">account_balance</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Rating</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">4.9 / 5.0</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined">star</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <section className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-on-surface">{clubName} Charter</h3>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                ACTIVE CHARTER
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="text-outline block text-[10px]">Category</span>
                <span className="font-bold text-on-surface">Technical</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="text-outline block text-[10px]">Charter Founded</span>
                <span className="font-bold text-on-surface">2021</span>
              </div>
              <div className="p-3 rounded-lg bg-surface-container-low">
                <span className="text-outline block text-[10px]">Department</span>
                <span className="font-bold text-on-surface">Dept. of Computer Science & Eng.</span>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-100 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-on-surface">Executive Officer Roster</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-surface-container-low">
                <span className="font-bold text-on-surface">CSI Student President (You)</span>
                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-bold text-[10px]">Full Admin</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-surface-container-low">
                <span className="font-bold text-on-surface">ACM Student Chair</span>
                <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-bold text-[10px]">Executive</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-slate-100 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-on-surface border-b border-slate-100 pb-2">Quick Actions</h3>
            <button
              onClick={() => router.push('/admin/clubs')}
              className="w-full p-3 rounded-lg border border-slate-200 text-left hover:bg-purple-50 text-xs font-bold transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-purple-700">edit</span>
              <span>Manage Club Roster & Profile</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
