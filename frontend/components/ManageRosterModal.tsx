'use client';

import React, { useState, useEffect } from 'react';
import { getStoredUsers, updateUserRole, removeUserFromClub, addUserToStore, UserAccount } from '@/lib/users-store';
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
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setUsers(getStoredUsers());
      setSuccessMsg(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleRoleChange = async (userId: string, newRole: UserRole, userName: string) => {
    updateUserRole(userId, newRole, clubId, clubName);
    setUsers(getStoredUsers());
    setSuccessMsg(`Updated ${userName}'s role to ${newRole.replace('_', ' ')}`);
    setTimeout(() => setSuccessMsg(null), 3000);

    // Broadcast user update event across client windows
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('campusclub_users_updated'));
    }

    // Attempt API sync if backend is active
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
      const token = sessionStorage.getItem('access_token');
      if (token && clubId.includes('-')) {
        await fetch(`${API_URL}/clubs/${clubId}/join`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ role: newRole })
        });
      }
    } catch (err) {
      console.warn('API role sync skipped/offline:', err);
    }
  };

  const handleRemove = (userId: string, userName: string) => {
    removeUserFromClub(userId);
    setUsers(getStoredUsers());
    setSuccessMsg(`Removed ${userName} from club roster (role reset to STUDENT)`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  const handleAddOnTheFly = (query: string) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;
    const isEmail = cleanQuery.includes('@');
    const email = isEmail ? cleanQuery.toLowerCase() : `${cleanQuery.toLowerCase()}@university.edu`;
    const rawName = isEmail ? cleanQuery.split('@')[0].replace(/[._-]/g, ' ') : cleanQuery;
    const formattedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    const newUser = addUserToStore({
      username: isEmail ? cleanQuery.split('@')[0] : cleanQuery,
      full_name: formattedName,
      email: email,
      department: 'Computer Science & Engineering',
      year: 3,
      role: 'STUDENT'
    });

    setUsers(getStoredUsers());
    setSuccessMsg(`Added student account (${newUser.email}) to roster.`);
    setTimeout(() => setSuccessMsg(null), 3000);
  };

  let filteredUsers = users.filter((u) => {
    if (u.role === 'ADMIN') return false; // Hide system admin from club roster assignments
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.full_name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.username.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q)
    );
  });

  // If search query is entered but no existing user matched, create a candidate user row on the fly
  const qClean = searchQuery.trim();
  if (filteredUsers.length === 0 && qClean.length > 2) {
    const isEmail = qClean.includes('@');
    const autoEmail = isEmail ? qClean.toLowerCase() : `${qClean.toLowerCase()}@university.edu`;
    const autoNameRaw = isEmail ? qClean.split('@')[0].replace(/[._-]/g, ' ') : qClean;
    const formattedName = autoNameRaw.charAt(0).toUpperCase() + autoNameRaw.slice(1);
    
    const candidateUser: UserAccount = {
      id: `candidate_${autoEmail}`,
      username: isEmail ? qClean.split('@')[0] : qClean,
      full_name: formattedName,
      email: autoEmail,
      department: 'Computer Science',
      year: 3,
      role: 'STUDENT',
      is_active: true,
    };
    filteredUsers = [candidateUser];
  }

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
              <h2 className="text-lg font-bold text-on-surface">Manage Roster & Roles</h2>
              <p className="text-xs text-on-surface-variant">
                Organization: <strong className="text-primary">{clubName}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
          >
            <span className="material-symbols-outlined text-xl">close</span>
          </button>
        </div>

        {/* Success Alert */}
        {successMsg && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
            <span>{successMsg}</span>
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
            search
          </span>
          <input
            type="text"
            placeholder="Search student by name, email, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Users Roster List */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {filteredUsers.length === 0 ? (
            <div className="py-10 text-center space-y-3 bg-surface-container-low/50 rounded-xl border border-dashed border-slate-200 p-6">
              <p className="text-on-surface-variant text-xs font-medium">
                No student records found matching &quot;{searchQuery}&quot;.
              </p>
              {searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => handleAddOnTheFly(searchQuery.trim())}
                  className="px-4 py-2.5 rounded-xl bg-primary text-on-primary text-xs font-bold shadow-md hover:bg-primary/90 transition-all inline-flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">person_add</span>
                  <span>Add &quot;{searchQuery.trim()}&quot; to Roster</span>
                </button>
              )}
            </div>
          ) : (
            filteredUsers.map((u) => {
              const currentClubRole = u.club_memberships?.find((m) => m.club_id === clubId)?.role || 'STUDENT';
              const otherMemberships = u.club_memberships?.filter((m) => m.club_id !== clubId) || [];

              return (
                <div
                  key={u.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-surface-container-lowest hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary-container/30 text-primary font-bold flex items-center justify-center text-sm shrink-0">
                      {u.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-xs font-bold text-on-surface">{u.full_name}</h4>
                        <span className="text-[10px] font-mono text-outline">({u.email})</span>
                      </div>
                      <p className="text-[11px] text-on-surface-variant">
                        {u.department} &bull; Year {u.year}
                      </p>

                      {/* Display other active club roles for multi-club visual confirmation */}
                      {otherMemberships.length > 0 && (
                        <div className="flex items-center gap-1 mt-1 flex-wrap">
                          {otherMemberships.map((m) => (
                            <span key={m.club_id} className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 text-[9px] font-bold">
                              {m.club_name.split(' ')[0]}: {m.role.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto w-full sm:w-auto justify-end">
                    {/* Role Dropdown Selector for THIS specific club */}
                    <select
                      value={currentClubRole}
                      onChange={(e) => handleRoleChange(u.id, e.target.value as UserRole, u.full_name)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold border border-slate-200 bg-surface-container-low text-on-surface focus:outline-none focus:ring-2 focus:ring-primary cursor-pointer"
                    >
                      <option value="STUDENT">Not in Club (Student)</option>
                      <option value="CLUB_MEMBER">Club Member</option>
                      <option value="EXECUTIVE">Executive Board</option>
                      <option value="CLUB_HEAD">Club Head / President</option>
                    </select>

                    {/* Remove Member Button */}
                    {currentClubRole !== 'STUDENT' && (
                      <button
                        onClick={() => handleRemove(u.id, u.full_name)}
                        className="px-2.5 py-1.5 rounded-lg bg-error-container/30 hover:bg-error-container text-error text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        title="Remove from this club"
                      >
                        <span className="material-symbols-outlined text-sm">person_remove</span>
                        <span>Remove</span>
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
          <span>Showing {filteredUsers.length} student records</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-primary text-on-primary font-bold rounded-lg shadow-xs hover:bg-primary-container transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
