'use client';

import React, { useState } from 'react';
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
      <section className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-gradient-to-r from-red-950 via-slate-900 to-red-900 p-8 text-white mb-6">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-red-300">
            <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
            <span>System Administration</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Portal Governance — {user?.full_name || 'Administrator'}
          </h1>

          <p className="text-xs sm:text-sm text-red-100/90 max-w-xl leading-relaxed">
            Manage university club charters, register new student organizations, and oversee official external portals.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setIsAddClubOpen(true)}
              className="px-4 py-2 bg-red-600 text-white font-bold text-xs rounded-lg shadow-xs hover:bg-red-700 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>+ Register New Club</span>
            </button>
            <button
              onClick={() => router.push('/admin/clubs')}
              className="px-4 py-2 bg-white/15 backdrop-blur-md text-white font-bold text-xs rounded-lg hover:bg-white/20 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">domain_verification</span>
              <span>Manage Clubs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metrics Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Active Charters</span>
            <div className="text-2xl font-extrabold text-red-700 mt-1">2</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
            <span className="material-symbols-outlined">domain</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Users</span>
            <div className="text-2xl font-extrabold text-blue-700 mt-1">430</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined">person</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pending Charters</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">0</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined">pending</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">System Health</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">99.9%</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined">dns</span>
          </div>
        </div>
      </section>

      {/* Main Table */}
      <div className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-on-surface">Campus Club Roster</h3>
            <p className="text-xs text-on-surface-variant">Active university recognized organizations & website portals</p>
          </div>
          <button
            onClick={() => setIsAddClubOpen(true)}
            className="px-3 py-1.5 bg-red-600 text-white font-bold text-xs rounded-lg hover:bg-red-700 transition-colors flex items-center gap-1 shadow-xs"
          >
            <span className="material-symbols-outlined text-sm">add</span>
            <span>Add Club</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-bold text-outline uppercase tracking-wider bg-surface-container-low">
                <th className="p-3">Club Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Official Website</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              <tr>
                <td className="p-3 font-bold text-on-surface flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-primary text-on-primary flex items-center justify-center font-bold text-[10px]">
                    CSI
                  </div>
                  Computer Society of India (CSI)
                </td>
                <td className="p-3 text-on-surface-variant">Technical</td>
                <td className="p-3">
                  <a
                    href="https://www.csi-nirma.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary font-bold hover:underline"
                  >
                    <span>csi-nirma.in</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    APPROVED
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => router.push('/admin/clubs')}
                    className="text-primary font-bold hover:underline"
                  >
                    Manage &rarr;
                  </button>
                </td>
              </tr>
              <tr>
                <td className="p-3 font-bold text-on-surface flex items-center gap-2">
                  <div className="w-7 h-7 rounded bg-blue-600 text-white flex items-center justify-center font-bold text-[10px]">
                    ACM
                  </div>
                  ACM Student Chapter
                </td>
                <td className="p-3 text-on-surface-variant">Technical</td>
                <td className="p-3">
                  <a
                    href="https://nu.acm.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-blue-600 font-bold hover:underline"
                  >
                    <span>nu.acm.org</span>
                    <span className="material-symbols-outlined text-xs">open_in_new</span>
                  </a>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    APPROVED
                  </span>
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => router.push('/admin/clubs')}
                    className="text-primary font-bold hover:underline"
                  >
                    Manage &rarr;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

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
