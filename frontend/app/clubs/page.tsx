'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useClubsStore, ClubItem } from '@/lib/clubs-store';
import { AddClubModal } from '@/components/AddClubModal';
import { useAuth } from '@/hooks/useAuth';
import {
  applyToClub,
  getApplicationStatusForUser,
  getUserApplications,
  ClubApplication,
} from '@/lib/club-applications-store';

export default function ClubsPage() {
  const router = useRouter();
  const { user } = useAuth();
  const { clubs, refreshClubs } = useClubsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [applyingClub, setApplyingClub] = useState<ClubItem | null>(null);
  const [statement, setStatement] = useState('');
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const [applications, setApplications] = useState<ClubApplication[]>([]);

  const isAdmin = user?.role === 'ADMIN';

  const loadUserApps = () => {
    if (user?.id || user?.email) {
      setApplications(getUserApplications(user.id || user.email));
    }
  };

  useEffect(() => {
    loadUserApps();
    const handleUpdate = () => {
      refreshClubs();
      loadUserApps();
    };
    window.addEventListener('campusclub_clubs_updated', handleUpdate);
    window.addEventListener('campusclub_applications_updated', handleUpdate);
    window.addEventListener('campusclub_users_updated', handleUpdate);

    return () => {
      window.removeEventListener('campusclub_clubs_updated', handleUpdate);
      window.removeEventListener('campusclub_applications_updated', handleUpdate);
      window.removeEventListener('campusclub_users_updated', handleUpdate);
    };
  }, [user, refreshClubs]);

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.dept.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        club.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [clubs, searchQuery, selectedCategory]);

  const isMemberOfClub = (club: ClubItem) => {
    if (!user || !user.club_memberships) return false;
    return user.club_memberships.some(
      (m) => m.club_id.toLowerCase() === club.id.toLowerCase() || m.club_name.toLowerCase() === club.name.toLowerCase()
    );
  };

  const getApplicationStatus = (club: ClubItem) => {
    if (!user) return null;
    return getApplicationStatusForUser(user.id || user.email, club.id);
  };

  const handleStartApply = (club: ClubItem) => {
    if (!user) {
      router.push('/login');
      return;
    }
    setApplyingClub(club);
    setStatement(`I am interested in joining ${club.name} to collaborate on activities and grow my technical and leadership skills.`);
  };

  const handleConfirmApply = () => {
    if (!applyingClub || !user) return;

    applyToClub({
      club_id: applyingClub.id,
      club_name: applyingClub.name,
      student_id: user.id,
      student_name: user.full_name,
      student_email: user.email,
      roll_number: user.roll_number || '23BCE001',
      department: user.department || 'Computer Science',
      year: user.year || 2,
      statement: statement.trim(),
    });

    setFeedbackToast(`Application sent to ${applyingClub.name}! Notification sent to the Club Head. You will join once accepted.`);
    setApplyingClub(null);
    setStatement('');
    loadUserApps();
    setTimeout(() => setFeedbackToast(null), 5000);
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full pb-space-xl">
        {/* Toast Feedback */}
        {feedbackToast && (
          <div className="mb-4 p-4 rounded-xl bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold flex items-center justify-between shadow-md animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-700 text-base">outgoing_mail</span>
              <span>{feedbackToast}</span>
            </div>
            <button onClick={() => setFeedbackToast(null)} className="text-slate-400 hover:text-slate-700">
              &times;
            </button>
          </div>
        )}

        {/* Header & Filter Controls Strip */}
        <div className="relative w-full overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm mb-space-lg">
          <div className="relative z-10 px-space-xl pt-space-lg pb-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded-full">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                  Chartered Directory • Fall 2025
                </span>
              </div>
              <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md font-semibold">
                <span className="material-symbols-outlined text-secondary text-base">verified_user</span>
                <span>{clubs.length} Active Student Charters</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div className="max-w-2xl">
                <h1 className="font-display text-headline-lg text-primary tracking-tight font-bold">
                  Collegiate Organizations Directory
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Explore {clubs.length} chartered student clubs, societies, and tech chapters across campus. Apply for membership to join chapters after approval by the Club Head.
                </p>
              </div>

              {/* Add New Club Action Button (STRICTLY ADMIN ONLY) */}
              {isAdmin && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="px-space-md py-2.5 bg-red-600 hover:bg-red-700 text-white font-label-lg text-label-lg rounded-lg shadow-md transition-all duration-200 flex items-center gap-space-xs font-bold active:scale-[0.98] whitespace-nowrap self-start lg:self-end"
                >
                  <span className="material-symbols-outlined text-base">add_circle</span>
                  <span>+ Register New Club</span>
                </button>
              )}
            </div>

            {/* Search Bar & Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm mt-space-xs">
              <div className="md:col-span-12 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-lg">search</span>
                </div>
                <input
                  className="w-full pl-10 pr-20 py-2.5 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none transition-all shadow-inner border border-slate-200"
                  placeholder="Search by club name, stack, mission, or executive officer..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mb-1 scrollbar-none pt-space-xs">
              {[
                { label: `All (${clubs.length})`, value: 'all' },
                { label: 'Technical', value: 'technical' },
                { label: 'Arts & Media', value: 'arts' },
                { label: 'Entrepreneurship', value: 'entrepreneurship' },
                { label: 'Sports', value: 'sports' },
                { label: 'Cultural', value: 'cultural' },
                { label: 'Hardware', value: 'hardware' },
              ].map((pill) => (
                <button
                  key={pill.value}
                  onClick={() => setSelectedCategory(pill.value)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold whitespace-nowrap transition-all ${
                    selectedCategory === pill.value
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredClubs.map((club) => {
            const isMember = isMemberOfClub(club);
            const appStatus = getApplicationStatus(club);

            return (
              <div
                key={club.id}
                className="group flex flex-col justify-between bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/60"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-primary-container flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-6xl opacity-90">{club.bgIcon}</span>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-primary text-on-primary shadow-sm flex items-center gap-1 font-bold">
                        {club.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-lowest text-primary font-bold shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-secondary text-xs">workspace_premium</span>
                        {club.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-space-md flex flex-col gap-space-sm">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                        {club.name}
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{club.dept}</span>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {club.description}
                    </p>

                    <div className="grid grid-cols-2 gap-space-sm py-2 px-3 bg-surface-container-low rounded-lg">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-outline font-semibold">Active Members</span>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">{club.members}+</span>
                      </div>
                      <div className="flex flex-col border-l border-surface-container-high pl-3">
                        <span className="font-label-sm text-label-sm text-outline font-semibold">Flagship Events</span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold">{club.perYr}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-space-md pb-space-md pt-space-xs flex items-center gap-2">
                  {/* Official Website Launch Button */}
                  {club.website_url && (
                    <a
                      href={club.website_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2 px-3 bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-label-md rounded-lg transition-colors font-bold flex items-center justify-center gap-1 text-center"
                      title={`Visit ${club.name} Official Website`}
                    >
                      <span className="material-symbols-outlined text-sm">open_in_new</span>
                      <span>Visit Site</span>
                    </a>
                  )}

                  {/* Apply / Member Status Button */}
                  {isMember ? (
                    <button
                      onClick={() => router.push('/dashboard')}
                      className="flex-1 py-2 px-3 rounded-lg bg-emerald-600 text-white font-label-md text-label-md font-bold flex items-center justify-center gap-1 shadow-xs cursor-pointer hover:bg-emerald-700 transition-colors"
                    >
                      <span className="material-symbols-outlined text-sm">check_circle</span>
                      <span>Active Member</span>
                    </button>
                  ) : appStatus === 'PENDING' ? (
                    <button
                      disabled
                      className="flex-1 py-2 px-3 rounded-lg bg-amber-100 text-amber-900 border border-amber-300 font-label-md text-label-md font-bold flex items-center justify-center gap-1 cursor-not-allowed opacity-90"
                    >
                      <span className="material-symbols-outlined text-sm animate-spin">schedule</span>
                      <span>Review Pending</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStartApply(club)}
                      className="flex-1 py-2 px-3 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center justify-center gap-1 transition-colors shadow-xs cursor-pointer active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-sm">send</span>
                      <span>Apply to Join</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Applying to a Club */}
        {applyingClub && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-surface-container-lowest rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined text-lg">school</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-on-surface">Apply to Join {applyingClub.name}</h3>
                    <span className="text-[11px] text-on-surface-variant">Membership Request & Notification</span>
                  </div>
                </div>
                <button
                  onClick={() => setApplyingClub(null)}
                  className="w-7 h-7 rounded-lg hover:bg-surface-container flex items-center justify-center text-slate-400 hover:text-slate-600"
                >
                  &times;
                </button>
              </div>

              <div className="p-3 bg-surface-container-low rounded-xl text-xs space-y-1.5 border border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-outline">Applicant:</span>
                  <span className="font-bold text-on-surface">{user?.full_name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-outline">Roll Number:</span>
                  <span className="font-mono font-bold text-on-surface">{user?.roll_number || '23BCE001'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-outline">Department:</span>
                  <span className="font-medium text-on-surface">{user?.department || 'Computer Science'}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-outline">Reviewer:</span>
                  <span className="font-bold text-purple-900">{applyingClub.name} President / Head</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-on-surface">
                  Statement of Interest / Message to Club Head
                </label>
                <textarea
                  rows={3}
                  value={statement}
                  onChange={(e) => setStatement(e.target.value)}
                  placeholder="Share why you'd like to join and what skills or interests you bring..."
                  className="w-full p-3 bg-surface-container-lowest text-xs text-on-surface rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="p-2.5 rounded-lg bg-amber-50 text-amber-900 text-[11px] flex items-center gap-2 border border-amber-200/60">
                <span className="material-symbols-outlined text-sm text-amber-700">info</span>
                <span>
                  A join request notification will be sent immediately to the Club Head. You will become a member once they accept your application.
                </span>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setApplyingClub(null)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-xs font-bold text-on-surface-variant hover:bg-slate-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmApply}
                  className="px-4 py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">outgoing_mail</span>
                  <span>Submit Application</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for Adding New Club (STRICTLY ADMIN ONLY) */}
        {isAdmin && (
          <AddClubModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSuccess={() => {
              refreshClubs();
            }}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
