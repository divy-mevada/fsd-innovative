'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useClubsStore, ClubItem } from '@/lib/clubs-store';
import { AddClubModal } from '@/components/AddClubModal';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { clubs, refreshClubs } = useClubsStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => refreshClubs();
    window.addEventListener('campusclub_clubs_updated', handleUpdate);
    return () => window.removeEventListener('campusclub_clubs_updated', handleUpdate);
  }, [refreshClubs]);

  return (
    <DashboardLayout allowedRoles={['ADMIN', 'CLUB_HEAD', 'EXECUTIVE']}>
      <div className="flex flex-col w-full pb-space-xl">
        {/* Top Banner */}
        <div className="relative w-full rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-primary-container via-primary to-secondary p-space-xl text-on-primary mb-space-lg">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-md relative z-10">
            <div className="space-y-space-xs">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md">
                <span className="material-symbols-outlined text-sm text-secondary-fixed">admin_panel_settings</span>
                <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider font-bold">
                  University Governance & Administration
                </span>
              </div>
              <h1 className="font-display text-display tracking-tight text-on-primary leading-tight font-bold">
                Admin Control Center
              </h1>
              <p className="font-body-md text-body-md text-primary-fixed-dim/90 max-w-2xl">
                Register new student organizations into the campus portal, manage active charters, and review student membership applications.
              </p>
            </div>

            {/* Quick Action: Add Club Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-space-lg py-3 bg-surface-container-lowest text-primary font-label-lg text-label-lg rounded-lg shadow-md hover:bg-surface-container-low transition-all duration-200 flex items-center gap-space-xs font-bold whitespace-nowrap active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-xl">add_circle</span>
              <span>+ Add New Club</span>
            </button>
          </div>
        </div>

        {/* Governance Stat Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">Total Clubs Managed</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">domain_verification</span>
              </div>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">{clubs.length}</div>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Registered in Portal</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">Active Student Roster</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">groups</span>
              </div>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">2,500+</div>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Verified Undergrads</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">Pending Charters</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">pending_actions</span>
              </div>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-lg text-headline-lg text-emerald-600 font-bold">0 Pending</div>
              <span className="font-label-sm text-label-sm text-emerald-600 font-semibold">All Approvals Clear</span>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-200/60 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant font-semibold">SAF Budget Allocation</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">account_balance</span>
              </div>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">$145,000</div>
              <span className="font-label-sm text-label-sm text-secondary font-semibold">Fall 2025 Disbursed</span>
            </div>
          </div>
        </section>

        {/* Manage Organizations Table */}
        <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-slate-200/60 space-y-space-md">
          <div className="flex items-center justify-between border-b border-surface-container-low pb-space-sm">
            <div>
              <h2 className="font-headline-md text-headline-md text-primary font-bold">
                Registered Club Directory ({clubs.length})
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Organizations live in the portal for student discovery & membership
              </p>
            </div>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-space-md py-2 bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm transition-all flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">add_circle</span>
              <span>Add New Club</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm text-on-surface">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-label-md uppercase border-b border-surface-container-high">
                  <th className="py-3 px-4">Club Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Lead Executive</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {clubs.map((club) => (
                  <tr key={club.id} className="hover:bg-surface-container-low/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-primary">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-lg">{club.bgIcon}</span>
                        <span>{club.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                        {club.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-on-surface-variant text-xs">{club.dept}</td>
                    <td className="py-3 px-4 font-medium text-xs">{club.head_name || 'Student Executive'}</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Live on Portal
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => router.push('/clubs')}
                        className="text-secondary hover:text-primary font-label-sm text-label-sm font-bold inline-flex items-center gap-0.5"
                      >
                        View Public Listing
                        <span className="material-symbols-outlined text-xs">open_in_new</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Global Add Club Modal */}
        <AddClubModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            refreshClubs();
            router.push('/clubs');
          }}
        />
      </div>
    </DashboardLayout>
  );
}
