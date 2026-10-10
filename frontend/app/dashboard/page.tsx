'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StudentDashboardView } from '@/components/dashboard/StudentDashboardView';
import { MemberDashboardView } from '@/components/dashboard/MemberDashboardView';
import { ExecutiveDashboardView } from '@/components/dashboard/ExecutiveDashboardView';
import { ClubHeadDashboardView } from '@/components/dashboard/ClubHeadDashboardView';
import { AdminDashboardView } from '@/components/dashboard/AdminDashboardView';
import { UserClubMembership } from '@/types/auth';

export default function DashboardPage() {
  const { user } = useAuth();
  const userRole = user?.role || 'STUDENT';
  const memberships: UserClubMembership[] = user?.club_memberships || [];

  const [selectedClubId, setSelectedClubId] = useState<string | null>(null);

  // Set initial selected club to highest role club or first membership
  useEffect(() => {
    if (memberships.length > 0 && !selectedClubId) {
      setSelectedClubId(memberships[0].club_id);
    }
  }, [memberships, selectedClubId]);

  const activeMembership = memberships.find((m) => m.club_id === selectedClubId);

  const renderDashboardView = () => {
    if (userRole === 'ADMIN') {
      return <AdminDashboardView user={user} />;
    }

    if (!activeMembership || !selectedClubId) {
      return <StudentDashboardView user={user} />;
    }

    switch (activeMembership.role) {
      case 'CLUB_HEAD':
        return <ClubHeadDashboardView user={user} clubName={activeMembership.club_name} />;
      case 'EXECUTIVE':
        return <ExecutiveDashboardView user={user} clubName={activeMembership.club_name} />;
      case 'CLUB_MEMBER':
        return <MemberDashboardView user={user} clubName={activeMembership.club_name} />;
      case 'STUDENT':
      default:
        return <StudentDashboardView user={user} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full py-space-md space-y-4">
        {/* Multi-Club Workspace Selector Strip (Non-Admin users with club memberships) */}
        {userRole !== 'ADMIN' && memberships.length > 0 && (
          <div className="bg-surface-container-lowest p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-lg">domain</span>
              <div>
                <h4 className="text-xs font-bold text-on-surface">Active Club Workspace</h4>
                <p className="text-[11px] text-on-surface-variant">Switch active context to view role-specific dashboard</p>
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
              {memberships.map((m) => {
                const isSelected = selectedClubId === m.club_id;
                const roleBadge = m.role === 'CLUB_HEAD' ? 'President' : m.role === 'EXECUTIVE' ? 'Executive' : 'Member';
                const badgeColor = m.role === 'CLUB_HEAD' ? 'bg-purple-100 text-purple-900' : m.role === 'EXECUTIVE' ? 'bg-amber-100 text-amber-900' : 'bg-teal-100 text-teal-900';

                return (
                  <button
                    key={m.club_id}
                    onClick={() => setSelectedClubId(m.club_id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border whitespace-nowrap cursor-pointer ${
                      isSelected
                        ? 'bg-primary text-on-primary border-primary shadow-xs'
                        : 'bg-surface-container-low text-on-surface border-slate-200 hover:bg-surface-container'
                    }`}
                  >
                    <span>{m.club_name}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-extrabold ${badgeColor}`}>
                      {roleBadge}
                    </span>
                  </button>
                );
              })}

              <button
                onClick={() => setSelectedClubId('general_student')}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all border whitespace-nowrap cursor-pointer ${
                  selectedClubId === 'general_student'
                    ? 'bg-primary text-on-primary border-primary shadow-xs'
                    : 'bg-surface-container-low text-on-surface-variant border-slate-200 hover:bg-surface-container'
                }`}
              >
                Student Overview
              </button>
            </div>
          </div>
        )}

        {renderDashboardView()}
      </div>
    </DashboardLayout>
  );
}
