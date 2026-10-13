'use client';

import React, { useState, useEffect } from 'react';
import {
  getStoredUsers,
  updateUserRole,
  removeUserFromClub,
  syncUsersWithAPI,
  UserAccount
} from '@/lib/users-store';
import { UserRole } from '@/types/auth';

interface ManageRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
  clubId: string;
  clubName: string;
}

export const ManageRosterModal: React.FC<ManageRosterModalProps> = ({
  isOpen,
  onClose,
  clubId,
  clubName,
}) => {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'ENROLLED' | 'ALL_STUDENTS'>('ENROLLED');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const cleanClubId = clubId.toLowerCase();
  const cleanClubName = clubName.toLowerCase();

  const loadData = () => {
    setUsers(getStoredUsers());
    syncUsersWithAPI().then((latest) => {
      setUsers(latest);
    });
  };

  useEffect(() => {
    if (isOpen) {
      loadData();
      setSuccessMsg(null);
      setSearchQuery('');
    }
  }, [isOpen, clubId]);

  if (!isOpen) return null;

  const getUserClubRole = (u: UserAccount): UserRole | 'NOT_ENROLLED' => {
    const membership = u.club_memberships?.find((m) => {
      const mId = (m.club_id || '').toLowerCase();
      const mName = (m.club_name || '').toLowerCase();
      return (
        mId === cleanClubId ||
        mName === cleanClubName ||
        (cleanClubId && (cleanClubId.includes(mId) || mId.includes(cleanClubId))) ||
        (cleanClubName && (cleanClubName.includes(mName) || mName.includes(cleanClubName))) ||
        (cleanClubId && (mName === cleanClubId || cleanClubId.includes(mName) || mName.includes(cleanClubId))) ||
        (cleanClubName && (mId === cleanClubName || cleanClubName.includes(mId) || mId.includes(cleanClubName)))
      );
    });
    return membership ? membership.role : 'NOT_ENROLLED';
  };

  const handleRoleChange = async (userId: string, newRole: UserRole, userName: string) => {
    updateUserRole(userId, newRole, clubId, clubName);
    loadData();
    setSuccessMsg(`Updated ${userName}'s role in ${clubName} to ${newRole.replace('_', ' ')}!`);
    setTimeout(() => setSuccessMsg(null), 3500);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('campusclub_users_updated'));
    }
  };

  const handleRemoveFromClub = (userId: string, userName: string) => {
    updateUserRole(userId, 'STUDENT', clubId, clubName);
    loadData();
    setSuccessMsg(`Removed ${userName} from ${clubName} roster.`);
    setTimeout(() => setSuccessMsg(null), 3500);

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('campusclub_users_updated'));
    }
  };

  // Filter users based on activeTab and searchQuery
  const filteredUsers = users.filter((u) => {
    if (u.role === 'ADMIN') return false; // Don't assign system admin to student club seats

    const clubRole = getUserClubRole(u);

    if (activeTab === 'ENROLLED' && clubRole === 'NOT_ENROLLED') {
      return false;
    }

    if (!searchQuery.trim()) return true;

    const q = searchQuery.toLowerCase().trim();
    return (
      u.full_name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q) ||
      (u.roll_number && u.roll_number.toLowerCase().includes(q))
    );
  });

  const enrolledCount = users.filter((u) => getUserClubRole(u) !== 'NOT_ENROLLED').length;

  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-surface-container-lowest rounded-2xl max-w-3xl w-full p-6 shadow-2xl space-y-4 border border-slate-200 relative max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-xl">manage_accounts</span>
            </div>
            <div>
              <h2 className="text-lg font-bold text-on-surface">Manage Organization Roster & Roles</h2>
              <p className="text-xs text-on-surface-variant">
                Target Club: <strong className="text-primary font-bold">{clubName}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
              <span>{successMsg}</span>
            </div>
            <button onClick={() => setSuccessMsg(null)} className="text-slate-400 hover:text-slate-600">
              &times;
            </button>
          </div>
        )}

        {/* View Tabs & Search Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="inline-flex p-1 bg-surface-container-low rounded-xl border border-slate-200/60">
              <button
                onClick={() => setActiveTab('ENROLLED')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'ENROLLED'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Current Club Roster ({enrolledCount})
              </button>
              <button
                onClick={() => setActiveTab('ALL_STUDENTS')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeTab === 'ALL_STUDENTS'
                    ? 'bg-primary text-on-primary shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                Search Database by Roll No ({users.length})
              </button>
            </div>

            <span className="text-[11px] text-outline">
              {activeTab === 'ENROLLED' ? 'Managing existing members' : 'Search any student to assign to club'}
            </span>
          </div>

          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Search by Roll Number (e.g. 23BCE001), Name, Email, Dept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Users Roster List */}
        <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
          {filteredUsers.length === 0 ? (
            <div className="py-12 text-center space-y-2 bg-surface-container-low/40 rounded-xl border border-dashed border-slate-200 p-6">
              <span className="material-symbols-outlined text-3xl text-outline block">search_off</span>
              <p className="text-on-surface-variant text-xs font-bold">
                No students found matching &ldquo;{searchQuery}&rdquo;.
              </p>
              <p className="text-[11px] text-outline max-w-sm mx-auto">
                {activeTab === 'ENROLLED'
                  ? `No members enrolled in ${clubName} matched your search. Switch to 'Search Database by Roll No' tab to add a student.`
                  : 'Try typing a university Roll Number (e.g. 22BCE104) or student name.'}
              </p>
            </div>
          ) : (
            filteredUsers.map((u) => {
              const currentRole = getUserClubRole(u);
              const isEnrolled = currentRole !== 'NOT_ENROLLED';

              const roleBadgeColor =
                currentRole === 'CLUB_HEAD'
                  ? 'bg-purple-100 text-purple-900 border-purple-200'
                  : currentRole === 'EXECUTIVE'
                  ? 'bg-amber-100 text-amber-900 border-amber-200'
                  : currentRole === 'CLUB_MEMBER'
                  ? 'bg-teal-100 text-teal-900 border-teal-200'
                  : 'bg-slate-100 text-slate-600 border-slate-200';

              return (
                <div
                  key={u.id}
                  className="p-3.5 rounded-xl border border-slate-200/80 bg-surface-container-lowest hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                      {u.full_name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-bold text-on-surface">{u.full_name}</h4>
                        <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">
                          {u.roll_number || 'No Roll No'}
                        </span>
                        <span className="text-[10px] text-outline">@{u.username}</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant mt-0.5">
                        {u.department} &bull; Year {u.year} &bull; <span className="text-outline">{u.email}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
                    <span className={`px-2 py-1 rounded-md text-[10px] font-extrabold border uppercase ${roleBadgeColor}`}>
                      {currentRole === 'NOT_ENROLLED' ? 'Not Enrolled' : currentRole.replace('_', ' ')}
                    </span>

                    {/* Role selector dropdown */}
                    <select
                      value={currentRole}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === 'REMOVE') {
                          handleRemoveFromClub(u.id, u.full_name);
                        } else {
                          handleRoleChange(u.id, val as UserRole, u.full_name);
                        }
                      }}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      {isEnrolled ? (
                        <>
                          <option value="CLUB_MEMBER">Club Member</option>
                          <option value="EXECUTIVE">Executive Board</option>
                          <option value="CLUB_HEAD">Club Head / President</option>
                          <option value="REMOVE">Remove from Club</option>
                        </>
                      ) : (
                        <>
                          <option value="NOT_ENROLLED" disabled>Select Role to Add...</option>
                          <option value="CLUB_MEMBER">+ Add as Club Member</option>
                          <option value="EXECUTIVE">+ Add as Executive Board</option>
                          <option value="CLUB_HEAD">+ Add as Club Head</option>
                        </>
                      )}
                    </select>

                    {isEnrolled && (
                      <button
                        onClick={() => handleRemoveFromClub(u.id, u.full_name)}
                        className="p-1.5 rounded-lg text-error hover:bg-error-container/20 transition-all cursor-pointer"
                        title="Remove member from this club"
                      >
                        <span className="material-symbols-outlined text-base">person_remove</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
          <span>
            Showing {filteredUsers.length} students &bull; Club: <strong className="text-primary">{clubName}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-on-primary font-bold text-xs rounded-xl shadow-xs hover:bg-primary-container transition-all cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
