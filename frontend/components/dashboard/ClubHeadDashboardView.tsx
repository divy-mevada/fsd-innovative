'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';

interface ClubHeadDashboardViewProps {
  user: User | null;
}

export const ClubHeadDashboardView: React.FC<ClubHeadDashboardViewProps> = ({ user }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Leadership Banner */}
      <section className="relative w-full rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-900 p-space-xl text-white mb-space-lg">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-purple-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col gap-space-sm">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-white/10 backdrop-blur-md w-fit">
            <span className="material-symbols-outlined text-sm text-purple-200">stars</span>
            <span className="font-label-sm text-label-sm text-purple-200 uppercase tracking-wider">
              Club President & Leadership Portal
            </span>
          </div>

          <h1 className="font-display text-display tracking-tight text-white leading-tight">
            Club Leadership — {user?.full_name || 'Club President'}
          </h1>

          <p className="font-body-lg text-body-lg text-purple-100/90 max-w-2xl leading-relaxed">
            Oversee your organization charter, assign executive roles, manage budget requests, and expand your club footprint across campus.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <button
              onClick={() => router.push('/admin/clubs')}
              className="px-space-lg py-2.5 bg-white text-purple-950 font-label-lg text-label-lg rounded-lg shadow-md hover:bg-purple-50 transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">domain_verification</span>
              <span>Manage Club Charter</span>
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="px-space-lg py-2.5 bg-white/15 backdrop-blur-md text-white font-label-lg text-label-lg rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">campaign</span>
              <span>Broadcast Announcement</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Stats Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Total Guild Roster</span>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <span className="material-symbols-outlined">groups</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-purple-700 font-bold">142</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-purple-600">trending_up</span>
              <span className="font-label-sm text-label-sm text-purple-600 font-semibold">+18% Growth this Term</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Executive Team</span>
            <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
              <span className="material-symbols-outlined">badge</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-indigo-700 font-bold">6</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-indigo-600">manage_accounts</span>
              <span className="font-label-sm text-label-sm text-indigo-600 font-semibold">Active Officers</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Annual Budget</span>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined">account_balance</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-emerald-700 font-bold">₹1,20,000</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-emerald-600">verified</span>
              <span className="font-label-sm text-label-sm text-emerald-600 font-semibold">Approved by University</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Member Satisfaction</span>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined">star</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-amber-700 font-bold">4.9 / 5.0</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-amber-600">reviews</span>
              <span className="font-label-sm text-label-sm text-amber-600 font-semibold">Based on 84 Surveys</span>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Hub Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">
          <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between pb-space-sm border-b border-slate-100 mb-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-900 flex items-center justify-center font-bold">
                  <span className="material-symbols-outlined text-2xl">shield</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Coding Guild Charter Overview</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Official University Recognized Club Charter</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span> ACTIVE CHARTER
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-md">
              <div className="p-space-sm rounded-lg bg-surface-container-low border border-slate-100">
                <span className="font-label-sm text-label-sm text-outline block mb-1">Club Category</span>
                <span className="font-label-md text-label-md font-bold text-on-surface">Technology & Coding</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low border border-slate-100">
                <span className="font-label-sm text-label-sm text-outline block mb-1">Charter Founded</span>
                <span className="font-label-md text-label-md font-bold text-on-surface">Fall 2022</span>
              </div>
              <div className="p-space-sm rounded-lg bg-surface-container-low border border-slate-100">
                <span className="font-label-sm text-label-sm text-outline block mb-1">Faculty Advisor</span>
                <span className="font-label-md text-label-md font-bold text-on-surface">Dr. Rajesh Kumar</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-space-sm">
              <button
                onClick={() => router.push('/admin/clubs')}
                className="px-space-md py-2 bg-purple-600 text-white font-label-md text-label-md rounded-lg font-bold hover:bg-purple-700 transition-all flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">edit</span>
                <span>Edit Club Profile & Charter</span>
              </button>
            </div>
          </section>

          {/* Executive Officer Team */}
          <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-slate-100 shadow-sm">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-xs">Executive Officer Roster</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">Assign leadership duties and maintain operational access</p>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-900 text-white font-bold flex items-center justify-center">
                    CH
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">You (Club Head / President)</h4>
                    <span className="text-xs text-purple-700 font-bold">Primary President</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-purple-100 text-purple-900">Full Control</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center">
                    AR
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">Alex Rivera</h4>
                    <span className="text-xs text-indigo-700 font-bold">Vice President</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-indigo-100 text-indigo-900">Executive</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-surface-container-low">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center">
                    SM
                  </div>
                  <div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface">Sarah Miller</h4>
                    <span className="text-xs text-amber-700 font-bold">Treasurer / Finance Officer</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded text-xs font-bold bg-amber-100 text-amber-900">Finance Manager</span>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-xs">Quick Leadership Actions</h3>
            <div className="space-y-2 mt-space-sm">
              <button
                onClick={() => router.push('/admin/clubs')}
                className="w-full p-3 rounded-lg border border-slate-200 text-left hover:bg-purple-50 hover:border-purple-200 transition-all flex items-center gap-3 group"
              >
                <span className="material-symbols-outlined text-purple-700 text-2xl group-hover:scale-110 transition-transform">
                  campaign
                </span>
                <div>
                  <span className="font-label-md text-label-md font-bold text-on-surface block">Broadcast Message</span>
                  <span className="text-xs text-outline">Notify all 142 guild members instantly</span>
                </div>
              </button>

              <button
                onClick={() => router.push('/admin/clubs')}
                className="w-full p-3 rounded-lg border border-slate-200 text-left hover:bg-emerald-50 hover:border-emerald-200 transition-all flex items-center gap-3 group"
              >
                <span className="material-symbols-outlined text-emerald-700 text-2xl group-hover:scale-110 transition-transform">
                  request_quote
                </span>
                <div>
                  <span className="font-label-md text-label-md font-bold text-on-surface block">Submit Budget Request</span>
                  <span className="text-xs text-outline">Request additional funding for upcoming events</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
