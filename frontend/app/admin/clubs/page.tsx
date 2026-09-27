'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useClubsStore } from '@/lib/clubs-store';
import { AddClubModal } from '@/components/AddClubModal';

export default function AdminManageClubsPage() {
  const router = useRouter();
  const { clubs, refreshClubs } = useClubsStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterQuery, setFilterQuery] = useState('');

  useEffect(() => {
    const handleUpdate = () => refreshClubs();
    window.addEventListener('campusclub_clubs_updated', handleUpdate);
    return () => window.removeEventListener('campusclub_clubs_updated', handleUpdate);
  }, [refreshClubs]);

  const filtered = clubs.filter((c) =>
    c.name.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(filterQuery.toLowerCase()) ||
    c.dept.toLowerCase().includes(filterQuery.toLowerCase())
  );

  return (
    <DashboardLayout allowedRoles={['ADMIN', 'CLUB_HEAD', 'EXECUTIVE']}>
      <div className="flex flex-col w-full pb-space-xl space-y-space-lg">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md border-b border-surface-container-high pb-space-md">
          <div>
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded-full mb-1">
              <span className="material-symbols-outlined text-primary text-xs">domain_verification</span>
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">
                Admin Management • Clubs Roster
              </span>
            </div>
            <h1 className="font-display text-headline-lg text-primary font-bold">Manage Campus Clubs</h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Register new clubs, inspect executive leads, and monitor portal activation status.
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-space-lg py-2.5 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-md transition-all duration-200 flex items-center gap-space-xs font-bold active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-lg">add_circle</span>
            <span>+ Register New Club</span>
          </button>
        </div>

        {/* Filter Input */}
        <div className="relative max-w-md">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search roster by name, category, or department..."
            value={filterQuery}
            onChange={(e) => setFilterQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none transition-all shadow-inner border border-slate-200"
          />
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
          {filtered.map((club) => (
            <div
              key={club.id}
              className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-200/60 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div className="space-y-space-xs">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                    {club.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                  </span>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <span className="material-symbols-outlined text-secondary text-2xl">{club.bgIcon}</span>
                  <div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                      {club.name}
                    </h3>
                    <span className="font-label-sm text-label-sm text-on-surface-variant block">{club.dept}</span>
                  </div>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 pt-1">
                  {club.description}
                </p>

                <div className="p-2 bg-surface-container-low rounded-lg text-xs space-y-1">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Executive Lead:</span>
                    <span className="font-bold text-on-surface">{club.head_name || 'Alex Chen'}</span>
                  </div>
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Active Members:</span>
                    <span className="font-bold text-primary">{club.members} Members</span>
                  </div>
                </div>
              </div>

              <div className="pt-space-md flex items-center justify-between border-t border-surface-container-low mt-space-sm">
                <span className="font-label-sm text-label-sm text-outline font-mono">ID: {club.id}</span>
                <button
                  onClick={() => router.push('/clubs')}
                  className="px-3 py-1.5 bg-surface-container text-primary font-label-sm text-label-sm rounded-lg hover:bg-surface-container-high transition-colors font-bold flex items-center gap-1"
                >
                  <span>Student View</span>
                  <span className="material-symbols-outlined text-xs">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>

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
