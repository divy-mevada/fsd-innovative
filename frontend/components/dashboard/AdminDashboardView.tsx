'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { AddClubModal } from '@/components/AddClubModal';

interface AdminDashboardViewProps {
  user: User | null;
}

export const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ user }) => {
  const router = useRouter();
  const [isAddClubOpen, setIsAddClubOpen] = useState(false);

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* System Admin Banner */}
      <section className="relative w-full rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-red-950 via-slate-900 to-red-900 p-space-xl text-white mb-space-lg">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-red-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col gap-space-sm">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-white/10 backdrop-blur-md w-fit">
            <span className="material-symbols-outlined text-sm text-red-300">admin_panel_settings</span>
            <span className="font-label-sm text-label-sm text-red-300 uppercase tracking-wider">
              System Administration & Governance
            </span>
          </div>

          <h1 className="font-display text-display tracking-tight text-white leading-tight">
            Portal Control — {user?.full_name || 'System Administrator'}
          </h1>

          <p className="font-body-lg text-body-lg text-red-100/90 max-w-2xl leading-relaxed">
            Manage university club charters, register new student organizations, monitor user role allocations, and enforce campus governance.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <button
              onClick={() => setIsAddClubOpen(true)}
              className="px-space-lg py-2.5 bg-red-600 text-white font-label-lg text-label-lg rounded-lg shadow-md hover:bg-red-700 transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>+ Register New Club Charter</span>
            </button>
            <button
              onClick={() => router.push('/admin/clubs')}
              className="px-space-lg py-2.5 bg-white/15 backdrop-blur-md text-white font-label-lg text-label-lg rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">domain_verification</span>
              <span>Manage Club Roster</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Stats Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Registered Clubs</span>
            <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
              <span className="material-symbols-outlined">domain</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-red-700 font-bold">28</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-red-600">verified</span>
              <span className="font-label-sm text-label-sm text-red-600 font-semibold">Approved Charters</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Portal Users</span>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined">person</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-blue-700 font-bold">1,450</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-blue-600">group</span>
              <span className="font-label-sm text-label-sm text-blue-600 font-semibold">Active Student Accounts</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Pending Charters</span>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined">pending</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-amber-700 font-bold">2</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-amber-600">approval</span>
              <span className="font-label-sm text-label-sm text-amber-600 font-semibold">Applications Awaiting Approval</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">System Status</span>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined">dns</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-emerald-700 font-bold">Healthy</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
              <span className="font-label-sm text-label-sm text-emerald-600 font-semibold">API Uptime 99.9%</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Admin Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (Club Roster & Charters) */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">
          <section className="bg-surface-container-lowest p-space-lg rounded-xl border border-slate-100 shadow-sm">
            <div className="flex items-center justify-between pb-space-sm border-b border-slate-100 mb-space-md">
              <div>
                <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface">Campus Club Roster Governance</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Overview of university active charters</p>
              </div>
              <button
                onClick={() => setIsAddClubOpen(true)}
                className="px-space-md py-1.5 bg-red-600 text-white font-label-md text-label-md rounded-lg hover:bg-red-700 transition-colors font-bold flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Register New Club</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-bold text-outline uppercase tracking-wider bg-surface-container-low">
                    <th className="p-3">Club Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  <tr>
                    <td className="p-3 font-bold text-on-surface flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-xs">
                        CG
                      </div>
                      Coding Guild
                    </td>
                    <td className="p-3 text-on-surface-variant">Technology & Coding</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                        APPROVED
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => router.push('/admin/clubs')}
                        className="text-primary font-bold hover:underline text-xs"
                      >
                        Manage &rarr;
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-on-surface flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-purple-600 text-white flex items-center justify-center font-bold text-xs">
                        DC
                      </div>
                      Design Collective
                    </td>
                    <td className="p-3 text-on-surface-variant">Arts & Design</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-emerald-100 text-emerald-800">
                        APPROVED
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => router.push('/admin/clubs')}
                        className="text-primary font-bold hover:underline text-xs"
                      >
                        Manage &rarr;
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold text-on-surface flex items-center gap-2">
                      <div className="w-8 h-8 rounded bg-amber-600 text-white flex items-center justify-center font-bold text-xs">
                        RA
                      </div>
                      Robotics Association
                    </td>
                    <td className="p-3 text-on-surface-variant">Engineering</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-amber-100 text-amber-800">
                        PENDING REVIEW
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => router.push('/admin/clubs')}
                        className="text-amber-700 font-bold hover:underline text-xs"
                      >
                        Review Charter &rarr;
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Right Column (Role Breakdown & Audit Log) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100">
            <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-space-xs">Role Breakdown</h3>
            <div className="space-y-3 mt-space-sm">
              <div>
                <div className="flex justify-between text-xs font-bold text-on-surface mb-1">
                  <span>Students</span>
                  <span>1,200 (82%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full w-[82%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-on-surface mb-1">
                  <span>Club Members</span>
                  <span>180 (12%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-teal-600 h-full w-[12%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-on-surface mb-1">
                  <span>Executives</span>
                  <span>45 (3%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-amber-600 h-full w-[3%]"></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold text-on-surface mb-1">
                  <span>Club Heads & Admins</span>
                  <span>25 (2%)</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full w-[2%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global Add Club Modal triggerable from Admin View */}
      <AddClubModal
        isOpen={isAddClubOpen}
        onClose={() => setIsAddClubOpen(false)}
        onSuccess={() => {
          router.push('/admin/clubs');
        }}
      />
    </div>
  );
};
