'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { User, UserRole } from '@/types/auth';
import { ClubChatWidget } from '@/components/ClubChatWidget';
import { ClubEventsSection } from '@/components/ClubEventsSection';
import {
  getClubMembers,
  promoteMemberToExecutive,
  demoteExecutiveToMember,
  removeMemberFromClub,
  searchUsers,
  addMemberToClub,
  UserAccount,
} from '@/lib/users-store';
import {
  getClubApplications,
  acceptApplication,
  rejectApplication,
  ClubApplication,
} from '@/lib/club-applications-store';
import { useClubsStore } from '@/lib/clubs-store';

interface ClubHeadDashboardViewProps {
  user: User | null;
  clubName?: string;
  clubId?: string;
}

export const ClubHeadDashboardView: React.FC<ClubHeadDashboardViewProps> = ({
  user,
  clubName = 'ACM Student Chapter',
  clubId,
}) => {
  const router = useRouter();
  const { clubs } = useClubsStore();

  // Determine active club ID from prop, name or user's club memberships
  const matchedClub = clubs.find(
    (c) => c.name.toLowerCase() === clubName.toLowerCase() || c.id.toLowerCase() === (clubId || '').toLowerCase()
  );
  const activeClubId = clubId || matchedClub?.id || (clubName.toLowerCase().includes('acm') ? 'acm_chapter' : clubName.toLowerCase().includes('csi') ? 'csi_chapter' : clubName.toLowerCase().replace(/[^a-z0-9]+/g, '_'));

  const [clubMembers, setClubMembers] = useState<UserAccount[]>([]);
  const [pendingApplications, setPendingApplications] = useState<ClubApplication[]>([]);
  const [memberSearchQuery, setMemberSearchQuery] = useState('');
  const [memberRoleFilter, setMemberRoleFilter] = useState<'ALL' | 'EXECUTIVE' | 'CLUB_MEMBER'>('ALL');
  const [promoteRollNumber, setPromoteRollNumber] = useState('');
  const [feedbackMsg, setFeedbackMsg] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Helper to reliably check if a user membership matches this club by ID or name
  const isClubMembership = (cm: { club_id?: string; club_name?: string }) => {
    const cleanId = (activeClubId || '').toLowerCase().trim();
    const cleanName = (clubName || '').toLowerCase().trim();
    const mId = (cm.club_id || '').toLowerCase().trim();
    const mName = (cm.club_name || '').toLowerCase().trim();

    return Boolean(
      (cleanId && (mId === cleanId || cleanId.includes(mId) || mId.includes(cleanId))) ||
      (cleanName && (mName === cleanName || cleanName.includes(mName) || mName.includes(cleanName))) ||
      (cleanId && (mName === cleanId || cleanId.includes(mName) || mName.includes(cleanId))) ||
      (cleanName && (mId === cleanName || cleanName.includes(mId) || mId.includes(cleanName)))
    );
  };

  // Reload data
  const loadData = () => {
    // Strictly load ONLY users who are in this club (by activeClubId or clubName)
    const members = getClubMembers(activeClubId, clubName);
    setClubMembers(members);

    // Load pending applications for this club (by activeClubId or clubName)
    const apps = getClubApplications(activeClubId, 'PENDING', clubName);
    setPendingApplications(apps);
  };

  useEffect(() => {
    loadData();

    const handleUsersUpdate = () => loadData();
    const handleAppsUpdate = () => loadData();

    window.addEventListener('campusclub_users_updated', handleUsersUpdate);
    window.addEventListener('campusclub_applications_updated', handleAppsUpdate);
    window.addEventListener('campusclub_clubs_updated', handleUsersUpdate);

    return () => {
      window.removeEventListener('campusclub_users_updated', handleUsersUpdate);
      window.removeEventListener('campusclub_applications_updated', handleAppsUpdate);
      window.removeEventListener('campusclub_clubs_updated', handleUsersUpdate);
    };
  }, [activeClubId, clubName]);

  const showFeedback = (text: string, type: 'success' | 'error' = 'success') => {
    setFeedbackMsg({ text, type });
    setTimeout(() => setFeedbackMsg(null), 4500);
  };

  // 1. Accept Application Flow
  const handleAcceptApp = (app: ClubApplication) => {
    const success = acceptApplication(app.id, user?.full_name || 'Club Head', {
      club_id: activeClubId,
      club_name: clubName
    });
    if (success) {
      showFeedback(`Accepted application from ${app.student_name} (${app.roll_number})! They are now an active club member in ${clubName}.`);
      loadData();
    }
  };

  // 2. Reject Application Flow
  const handleRejectApp = (app: ClubApplication) => {
    if (confirm(`Are you sure you want to decline ${app.student_name}'s application?`)) {
      rejectApplication(app.id, user?.full_name || 'Club Head');
      showFeedback(`Application from ${app.student_name} was declined.`, 'error');
      loadData();
    }
  };

  // 3. Promote Member to Executive
  const handlePromoteToExecutive = (member: UserAccount) => {
    promoteMemberToExecutive(member.id, activeClubId, clubName);
    showFeedback(`Promoted ${member.full_name} (${member.roll_number || 'Member'}) to Executive Board of ${clubName}!`);
    loadData();
  };

  // 4. Demote Executive to Member
  const handleDemoteToMember = (member: UserAccount) => {
    if (confirm(`Are you sure you want to demote ${member.full_name} from Executive to regular Member?`)) {
      demoteExecutiveToMember(member.id, activeClubId, clubName);
      showFeedback(`Demoted ${member.full_name} from Executive Board to regular Club Member.`, 'error');
      loadData();
    }
  };

  // 5. Remove Member from Club
  const handleRemoveFromClub = (member: UserAccount) => {
    if (confirm(`Are you sure you want to remove ${member.full_name} (${member.roll_number || 'Member'}) from ${clubName}?`)) {
      removeMemberFromClub(member.id, activeClubId, clubName);
      showFeedback(`Removed ${member.full_name} from ${clubName}. Their status has been updated to Student.`);
      loadData();
    }
  };

  // 6. Promote/Add by Roll Number tool
  const handlePromoteByRollNumber = () => {
    if (!promoteRollNumber.trim()) return;
    const cleanRoll = promoteRollNumber.trim().toUpperCase();
    const matched = searchUsers(cleanRoll);

    if (matched.length > 0) {
      const student = matched[0];
      const isAlreadyInClub = clubMembers.some((m) => m.id === student.id);

      if (isAlreadyInClub) {
        promoteMemberToExecutive(student.id, activeClubId, clubName);
        showFeedback(`Successfully promoted ${student.full_name} (${cleanRoll}) to Executive Board of ${clubName}!`);
      } else {
        // Automatically onboard & assign as Executive
        addMemberToClub(student.id, activeClubId, clubName, 'EXECUTIVE', {
          full_name: student.full_name,
          roll_number: cleanRoll,
          department: student.department,
          year: student.year,
          email: student.email
        });
        showFeedback(`Added ${student.full_name} (${cleanRoll}) to ${clubName} and promoted to Executive Board!`);
      }
      setPromoteRollNumber('');
      loadData();
    } else {
      alert(`No registered student account found matching Roll Number "${cleanRoll}".`);
    }
  };

  // Filtered members strictly in this club
  const filteredClubMembers = useMemo(() => {
    return clubMembers.filter((m) => {
      const memberMembership = m.club_memberships?.find(isClubMembership);
      const roleInThisClub = memberMembership?.role || (m.role === 'ADMIN' ? 'CLUB_HEAD' : m.role);

      const matchesSearch =
        m.full_name.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
        m.email.toLowerCase().includes(memberSearchQuery.toLowerCase()) ||
        (m.roll_number && m.roll_number.toLowerCase().includes(memberSearchQuery.toLowerCase())) ||
        m.department.toLowerCase().includes(memberSearchQuery.toLowerCase());

      const matchesRole =
        memberRoleFilter === 'ALL' || roleInThisClub === memberRoleFilter;

      return matchesSearch && matchesRole;
    });
  }, [clubMembers, activeClubId, clubName, memberSearchQuery, memberRoleFilter]);

  // Real-time metric counts
  const executiveCount = clubMembers.filter((m) => {
    const mem = m.club_memberships?.find(isClubMembership);
    return mem ? mem.role === 'EXECUTIVE' : m.role === 'EXECUTIVE';
  }).length;

  const regularMemberCount = clubMembers.filter((m) => {
    const mem = m.club_memberships?.find(isClubMembership);
    return mem ? mem.role === 'CLUB_MEMBER' : (m.role === 'CLUB_MEMBER' || m.role === 'STUDENT');
  }).length;

  return (
    <div className="flex flex-col w-full pb-space-xl space-y-6">
      {/* Toast Feedback Alert */}
      {feedbackMsg && (
        <div
          className={`p-4 rounded-xl border flex items-center justify-between text-xs font-bold shadow-md transition-all animate-in fade-in slide-in-from-top-2 ${
            feedbackMsg.type === 'success'
              ? 'bg-emerald-50 text-emerald-900 border-emerald-200'
              : 'bg-rose-50 text-rose-900 border-rose-200'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-base">
              {feedbackMsg.type === 'success' ? 'check_circle' : 'info'}
            </span>
            <span>{feedbackMsg.text}</span>
          </div>
          <button onClick={() => setFeedbackMsg(null)} className="text-slate-400 hover:text-slate-700">
            &times;
          </button>
        </div>
      )}

      {/* Leadership Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-gradient-to-r from-purple-950 via-purple-900 to-indigo-900 p-8 text-white">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-purple-200">
            <span className="material-symbols-outlined text-sm">stars</span>
            <span>Club President Hub • {clubName}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Club Head Governance — {user?.full_name || 'President'}
          </h1>

          <p className="text-xs sm:text-sm text-purple-100/90 max-w-xl leading-relaxed">
            Manage membership applications, promote or demote executive officers, and oversee official activities for{' '}
            <strong className="text-white">{clubName}</strong>.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => router.push('/clubs')}
              className="px-4 py-2 bg-white text-purple-950 font-bold text-xs rounded-lg shadow-xs hover:bg-purple-50 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">explore</span>
              <span>View Public Club Listing</span>
            </button>
          </div>
        </div>
      </section>

      {/* Real-time Dynamic Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Total Members</span>
            <div className="text-2xl font-extrabold text-purple-700 mt-1">{clubMembers.length}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <span className="material-symbols-outlined">groups</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Executive Officers</span>
            <div className="text-2xl font-extrabold text-indigo-700 mt-1">{executiveCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <span className="material-symbols-outlined">badge</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pending Applicants</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">{pendingApplications.length}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined">person_add</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Regular Members</span>
            <div className="text-2xl font-extrabold text-teal-700 mt-1">{regularMemberCount}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
            <span className="material-symbols-outlined">how_to_reg</span>
          </div>
        </div>
      </section>

      {/* 1. PENDING APPLICATIONS REVIEW SECTION */}
      <section className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-on-surface">Pending Membership Applications</h3>
              {pendingApplications.length > 0 && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold animate-pulse">
                  {pendingApplications.length} Awaiting Approval
                </span>
              )}
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Review and approve student applications. Students can only join after you accept their request.
            </p>
          </div>
          <span className="text-xs text-outline font-semibold">Governance Gatekeeper</span>
        </div>

        {pendingApplications.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-low/40 rounded-xl border border-slate-100 space-y-2">
            <span className="material-symbols-outlined text-4xl text-slate-300">verified_user</span>
            <h4 className="text-xs font-bold text-on-surface">No Pending Applications</h4>
            <p className="text-xs text-on-surface-variant max-w-sm mx-auto">
              All student membership applications for {clubName} have been reviewed. When new students apply from the catalogue, they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingApplications.map((app) => (
              <div
                key={app.id}
                className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/20 shadow-xs space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-900 font-bold flex items-center justify-center text-xs">
                        {app.student_name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-on-surface">{app.student_name}</h4>
                        <span className="text-[11px] text-on-surface-variant font-medium block">
                          Roll: {app.roll_number} &bull; {app.department} (Yr {app.year})
                        </span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                      PENDING
                    </span>
                  </div>

                  <p className="text-xs text-slate-700 bg-white/70 p-2.5 rounded-lg border border-slate-100 mt-2.5 italic">
                    &ldquo;{app.statement || 'Eager to contribute and participate in club activities.'}&rdquo;
                  </p>
                  <span className="text-[10px] text-outline block mt-1">
                    Applied: {new Date(app.applied_at).toLocaleDateString()} at{' '}
                    {new Date(app.applied_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-amber-100/60">
                  <button
                    onClick={() => handleRejectApp(app)}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-on-surface-variant hover:bg-slate-100 text-xs font-bold transition-all cursor-pointer"
                  >
                    Decline
                  </button>
                  <button
                    onClick={() => handleAcceptApp(app)}
                    className="px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-sm">check</span>
                    <span>Accept to Join Club</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 2. CLUB MEMBERS DIRECTORY & ROLE MANAGEMENT SECTION */}
      <section className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-700 text-xl">group</span>
              <h3 className="text-base font-bold text-on-surface">Club Members Roster & Role Governance</h3>
            </div>
            <p className="text-xs text-on-surface-variant mt-0.5">
              Showing strictly only registered students enrolled in <strong>{clubName}</strong>. Promote members to Executive, demote executives, or remove them.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-full bg-purple-100 text-purple-900 text-xs font-extrabold">
              {clubMembers.length} Active Roster
            </span>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
          <div className="relative flex-1 max-w-sm">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-base pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder="Filter members by name, roll number, email..."
              value={memberSearchQuery}
              onChange={(e) => setMemberSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-surface-container-low text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-1 focus:ring-purple-600"
            />
          </div>

          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-lg">
            {(['ALL', 'EXECUTIVE', 'CLUB_MEMBER'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setMemberRoleFilter(tab)}
                className={`px-3 py-1 rounded text-[11px] font-bold transition-all cursor-pointer ${
                  memberRoleFilter === tab
                    ? 'bg-purple-900 text-white shadow-xs'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {tab === 'ALL' ? 'All Members' : tab === 'EXECUTIVE' ? 'Executives' : 'Members'}
              </button>
            ))}
          </div>
        </div>

        {/* Members List Table / Cards */}
        {filteredClubMembers.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-low/40 rounded-xl border border-slate-100 text-outline space-y-1">
            <span className="material-symbols-outlined text-3xl text-slate-300 block">search_off</span>
            <p className="text-xs font-medium">No matching members found in {clubName}.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-on-surface-variant uppercase tracking-wider bg-surface-container-low/50">
                  <th className="py-2.5 px-3">Student Name</th>
                  <th className="py-2.5 px-3">Roll & Department</th>
                  <th className="py-2.5 px-3">Email</th>
                  <th className="py-2.5 px-3">Club Role</th>
                  <th className="py-2.5 px-3 text-right">Leadership Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredClubMembers.map((member) => {
                  const memberMembership = member.club_memberships?.find(isClubMembership);
                  const roleInThisClub = memberMembership?.role || (member.role === 'ADMIN' ? 'CLUB_HEAD' : member.role);
                  const isHead = roleInThisClub === 'CLUB_HEAD';
                  const isExecutive = roleInThisClub === 'EXECUTIVE';
                  const isRegularMember = roleInThisClub === 'CLUB_MEMBER' || (!isHead && !isExecutive);

                  return (
                    <tr key={member.id} className="hover:bg-surface-container-low/40 transition-colors">
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-xs shrink-0">
                            {member.full_name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <span className="font-bold text-on-surface block leading-tight">{member.full_name}</span>
                            <span className="text-[10px] text-outline">Yr {member.year}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <span className="font-mono text-[11px] font-bold text-slate-700 block">
                          {member.roll_number || 'STU-ID'}
                        </span>
                        <span className="text-[10px] text-on-surface-variant">{member.department}</span>
                      </td>

                      <td className="py-3 px-3 text-[11px] text-on-surface-variant font-medium">
                        {member.email}
                      </td>

                      <td className="py-3 px-3">
                        {isHead && (
                          <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-900 font-extrabold text-[10px]">
                            Club Head (President)
                          </span>
                        )}
                        {isExecutive && (
                          <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-900 font-extrabold text-[10px]">
                            Executive Board
                          </span>
                        )}
                        {isRegularMember && !isHead && !isExecutive && (
                          <span className="px-2 py-0.5 rounded bg-teal-100 text-teal-900 font-extrabold text-[10px]">
                            Club Member
                          </span>
                        )}
                      </td>

                      <td className="py-3 px-3 text-right">
                        {isHead ? (
                          <span className="text-[10px] text-outline italic">Head Officer (You)</span>
                        ) : (
                          <div className="inline-flex items-center gap-1.5">
                            {isRegularMember && !isExecutive && (
                              <button
                                onClick={() => handlePromoteToExecutive(member)}
                                className="px-2.5 py-1 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-900 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                                title="Promote this member to Executive Board"
                              >
                                <span className="material-symbols-outlined text-xs">arrow_upward</span>
                                <span>Promote to Executive</span>
                              </button>
                            )}

                            {isExecutive && (
                              <button
                                onClick={() => handleDemoteToMember(member)}
                                className="px-2.5 py-1 rounded-md bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                                title="Degrade executive to regular club member"
                              >
                                <span className="material-symbols-outlined text-xs">arrow_downward</span>
                                <span>Degrade to Member</span>
                              </button>
                            )}

                            <button
                              onClick={() => handleRemoveFromClub(member)}
                              className="px-2 py-1 rounded-md bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] transition-colors flex items-center gap-0.5 cursor-pointer"
                              title="Remove member completely from this club"
                            >
                              <span className="material-symbols-outlined text-xs">person_remove</span>
                              <span>Remove</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* 3. QUICK GOVERNANCE TOOL: PROMOTE BY ROLL NUMBER */}
      <section className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-100 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-on-surface">Member Promotion by Roll Number</h3>
            <p className="text-xs text-on-surface-variant">Quickly promote student members to Executive Board using Roll Number</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-xs font-bold">
            Governance Tool
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
              badge
            </span>
            <input
              type="text"
              placeholder="Enter Student Roll Number (e.g. 22BCE104 or 22BIT055)..."
              value={promoteRollNumber}
              onChange={(e) => setPromoteRollNumber(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-surface-container-low text-on-surface text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600 uppercase"
            />
          </div>
          <button
            type="button"
            onClick={handlePromoteByRollNumber}
            className="px-4 py-2 bg-purple-900 hover:bg-purple-950 text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-sm">workspace_premium</span>
            <span>Promote / Onboard to Executive</span>
          </button>
        </div>
      </section>

      {/* 4. CLUB EVENTS & WORKSHOPS GOVERNANCE */}
      <section className="space-y-3 pt-2">
        <ClubEventsSection
          clubId={activeClubId}
          clubName={clubName}
          userRole={user?.role || 'CLUB_HEAD'}
          canAddEvent={true}
        />
      </section>

      {/* 5. CLUB CHAT WIDGET */}
      <section className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-700 text-xl">forum</span>
            <h2 className="text-lg font-bold text-on-surface">Club Leadership & Team Chat Channel</h2>
          </div>
          <span className="text-xs text-on-surface-variant">Real-time governance channel</span>
        </div>
        <ClubChatWidget clubId={activeClubId} clubName={clubName} currentUser={user} />
      </section>
    </div>
  );
};
