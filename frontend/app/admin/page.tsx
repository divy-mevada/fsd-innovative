'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useAuth } from '@/hooks/useAuth';
import { useClubsStore, ClubItem } from '@/lib/clubs-store';
import { AddClubModal } from '@/components/AddClubModal';
import { ManageRosterModal } from '@/components/ManageRosterModal';
import { getStoredUsers, updateUserRole, syncUsersWithAPI, UserAccount } from '@/lib/users-store';
import { userService } from '@/services/userService';
import { UserRole } from '@/types/auth';

export default function AdminDashboardPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { clubs, refreshClubs } = useClubsStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedRosterClub, setSelectedRosterClub] = useState<{ id: string; name: string } | null>(null);

  // User Management State
  const [userAccounts, setUserAccounts] = useState<UserAccount[]>([]);
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | UserRole>('ALL');
  const [feedbackToast, setFeedbackToast] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const loadUsers = useCallback(() => {
    const localUsers = getStoredUsers();
    setUserAccounts(localUsers);
    syncUsersWithAPI().then((latest) => {
      setUserAccounts(latest);
    });
  }, []);

  useEffect(() => {
    loadUsers();
    const handleClubsUpdate = () => {
      refreshClubs();
    };
    const handleUsersUpdate = () => {
      setUserAccounts(getStoredUsers());
    };
    window.addEventListener('campusclub_clubs_updated', handleClubsUpdate);
    window.addEventListener('campusclub_users_updated', handleUsersUpdate);
    return () => {
      window.removeEventListener('campusclub_clubs_updated', handleClubsUpdate);
      window.removeEventListener('campusclub_users_updated', handleUsersUpdate);
    };
  }, [loadUsers, refreshClubs]);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackToast({ text, type });
    setTimeout(() => setFeedbackToast(null), 4000);
  };

  const handleRoleChange = async (targetUser: UserAccount, newRole: UserRole) => {
    updateUserRole(targetUser.id, newRole);

    if (targetUser.id && !targetUser.id.startsWith('u_')) {
      try {
        await userService.updateUserRole(targetUser.id, newRole);
      } catch (err) {
        console.warn('Backend role update sync skipped/offline:', err);
      }
    }

    showToast(`Updated ${targetUser.full_name}'s system role to ${newRole}`);
    loadUsers();
  };

  const filteredUsers = userAccounts.filter((u) => {
    const matchesSearch =
      u.full_name.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      u.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      (u.roll_number && u.roll_number.toLowerCase().includes(userSearchQuery.toLowerCase())) ||
      u.department.toLowerCase().includes(userSearchQuery.toLowerCase());

    const matchesRole = roleFilter === 'ALL' || u.role === roleFilter;

    return matchesSearch && matchesRole;
  });

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
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedRosterClub({ id: club.id, name: club.name })}
                          className="px-3 py-1.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-sm text-xs font-bold inline-flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-sm">manage_accounts</span>
                          <span>Manage Roster</span>
                        </button>
                        <button
                          onClick={() => router.push('/clubs')}
                          className="text-secondary hover:text-primary font-label-sm text-xs font-bold inline-flex items-center gap-0.5 px-2 py-1.5 rounded-lg hover:bg-surface-container"
                        >
                          <span>Listing</span>
                          <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* System User Roster & Role Governance (Filtered by Roll Number) */}
        <section className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm border border-slate-200/60 space-y-space-md mt-space-lg">
          {feedbackToast && (
            <div
              className={`p-3 rounded-lg border text-xs font-bold flex items-center justify-between ${
                feedbackToast.type === 'success'
                  ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
                  : 'bg-rose-50 text-rose-900 border-rose-200'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-base">
                  {feedbackToast.type === 'success' ? 'check_circle' : 'info'}
                </span>
                <span>{feedbackToast.text}</span>
              </div>
              <button onClick={() => setFeedbackToast(null)} className="text-slate-400 hover:text-slate-700">
                &times;
              </button>
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-surface-container-low pb-space-sm gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-headline-md text-headline-md text-primary font-bold">
                  System User Roster & Role Assignment ({userAccounts.length})
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                  Live Database Sync
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Search students by Roll Number, email, or name to assign system positions and administrative authorities.
              </p>
            </div>
            <button
              onClick={loadUsers}
              className="px-3 py-1.5 bg-surface-container text-primary font-label-sm text-xs rounded-lg hover:bg-surface-container-high transition-colors flex items-center gap-1 font-semibold self-start sm:self-auto"
            >
              <span className="material-symbols-outlined text-sm">sync</span>
              <span>Refresh Roster</span>
            </button>
          </div>

          {/* Search & Filter Toolbar */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pt-1">
            <div className="relative flex-1 max-w-md">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
                search
              </span>
              <input
                type="text"
                placeholder="Search by Roll Number, Name, Email, Dept..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-surface-container-low text-on-surface font-body-sm text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              />
            </div>

            <div className="flex items-center gap-1 overflow-x-auto pb-1 md:pb-0">
              {(['ALL', 'STUDENT', 'CLUB_MEMBER', 'EXECUTIVE', 'CLUB_HEAD', 'ADMIN'] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                    roleFilter === r
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container'
                  }`}
                >
                  {r === 'ALL' ? 'All Roles' : r.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left font-body-sm text-body-sm text-on-surface">
              <thead>
                <tr className="bg-surface-container-low text-on-surface-variant font-label-md text-xs uppercase border-b border-surface-container-high">
                  <th className="py-3 px-4">Student / User</th>
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Department & Year</th>
                  <th className="py-3 px-4">Current Role</th>
                  <th className="py-3 px-4 text-right">Assign Position</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-low">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-on-surface-variant text-xs">
                      No users found matching &ldquo;{userSearchQuery}&rdquo;.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => {
                    const roleBadgeColor =
                      u.role === 'ADMIN'
                        ? 'bg-red-100 text-red-900 border-red-200'
                        : u.role === 'CLUB_HEAD'
                        ? 'bg-purple-100 text-purple-900 border-purple-200'
                        : u.role === 'EXECUTIVE'
                        ? 'bg-amber-100 text-amber-900 border-amber-200'
                        : u.role === 'CLUB_MEMBER'
                        ? 'bg-teal-100 text-teal-900 border-teal-200'
                        : 'bg-slate-100 text-slate-800 border-slate-200';

                    return (
                      <tr key={u.id} className="hover:bg-surface-container-low/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs">
                              {u.full_name?.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-bold text-primary text-xs">{u.full_name}</div>
                              <div className="text-[11px] text-on-surface-variant">@{u.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-surface-container text-primary">
                            {u.roll_number || 'N/A'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-xs text-on-surface-variant">{u.email}</td>
                        <td className="py-3 px-4 text-xs text-on-surface-variant">
                          {u.department} {u.year ? `(Yr ${u.year})` : ''}
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold border ${roleBadgeColor}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <select
                            value={u.role}
                            onChange={(e) => handleRoleChange(u, e.target.value as UserRole)}
                            className="text-xs font-bold px-2.5 py-1.5 rounded-lg border border-slate-200 bg-surface-container-lowest text-primary shadow-xs focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                          >
                            <option value="STUDENT">Student</option>
                            <option value="CLUB_MEMBER">Club Member</option>
                            <option value="EXECUTIVE">Executive</option>
                            <option value="CLUB_HEAD">Club Head</option>
                            <option value="ADMIN">Admin</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })
                )}
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

        {/* Individual Club Roster Management Modal */}
        {selectedRosterClub && (
          <ManageRosterModal
            isOpen={!!selectedRosterClub}
            onClose={() => {
              setSelectedRosterClub(null);
              loadUsers();
            }}
            clubId={selectedRosterClub.id}
            clubName={selectedRosterClub.name}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
