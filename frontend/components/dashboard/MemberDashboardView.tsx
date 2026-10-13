'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';
import { ClubChatWidget } from '@/components/ClubChatWidget';
import { ClubEventsSection } from '@/components/ClubEventsSection';
import { useClubsStore } from '@/lib/clubs-store';

interface MemberDashboardViewProps {
  user: User | null;
  clubName?: string;
  clubId?: string;
}

export const MemberDashboardView: React.FC<MemberDashboardViewProps> = ({ user, clubName = 'Club Member', clubId }) => {
  const router = useRouter();
  const { clubs } = useClubsStore();
  const userMemberships = user?.club_memberships || [];
  const matchedClub = clubs.find(
    (c) => c.name.toLowerCase() === clubName.toLowerCase() || c.id.toLowerCase() === (clubId || '').toLowerCase()
  );
  const effectiveClubId = clubId || matchedClub?.id || clubName.toLowerCase().replace(/[^a-z0-9]+/g, '_');

  // Match enrolled clubs dynamically
  const enrolledClubs = userMemberships.map((m) => {
    const clubInfo = clubs.find(
      (c) => c.id.toLowerCase() === m.club_id.toLowerCase() || c.name.toLowerCase() === m.club_name.toLowerCase()
    );
    return {
      id: m.club_id,
      name: m.club_name,
      role: m.role,
      category: clubInfo?.category || 'Technical Guild',
      bgIcon: clubInfo?.bgIcon || 'terminal',
      website_url: clubInfo?.website_url,
    };
  });

  return (
    <div className="flex flex-col w-full pb-space-xl space-y-6">
      {/* Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-gradient-to-r from-teal-900 via-teal-800 to-emerald-700 p-8 text-white mb-6">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-teal-200">
            <span className="material-symbols-outlined text-sm">card_membership</span>
            <span>Member Portal • {clubName}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Club Member Portal — {user?.full_name || 'Member'}
          </h1>

          <p className="text-xs sm:text-sm text-teal-100/90 max-w-xl leading-relaxed">
            Access exclusive member discussions, RSVP for workshops, and visit official club portals for <strong className="text-white">{clubName}</strong>.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => router.push('/clubs')}
              className="px-4 py-2 bg-white text-teal-900 font-bold text-xs rounded-lg shadow-xs hover:bg-teal-50 transition-all flex items-center gap-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-base">groups</span>
              <span>Explore All Clubs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Club Chat Widget Section */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-teal-600 text-xl">forum</span>
            <h2 className="text-lg font-bold text-on-surface">Club Member Chat & Discussion Vault</h2>
          </div>
          <span className="text-xs text-on-surface-variant">Real-time team channel</span>
        </div>
        <ClubChatWidget clubId={effectiveClubId} clubName={clubName} currentUser={user} />
      </section>

      {/* Official Club Events & RSVP Section */}
      <section className="space-y-3">
        <ClubEventsSection
          clubId={effectiveClubId}
          clubName={clubName}
          userRole={user?.role || 'CLUB_MEMBER'}
          canAddEvent={false}
        />
      </section>

      {/* Stats Bar */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">My Memberships</span>
            <div className="text-2xl font-extrabold text-teal-700 mt-1">{enrolledClubs.length}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
            <span className="material-symbols-outlined">badge</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Announcements</span>
            <div className="text-2xl font-extrabold text-blue-700 mt-1">4</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined">campaign</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Workshops</span>
            <div className="text-2xl font-extrabold text-purple-700 mt-1">2</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <span className="material-symbols-outlined">event_seat</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Status</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">Active</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined">verified</span>
          </div>
        </div>
      </section>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-on-surface">My Enrolled Clubs & Portals</h2>
              <Link href="/clubs" className="text-xs text-teal-700 font-bold hover:underline">
                Explore More Clubs &rarr;
              </Link>
            </div>

            {enrolledClubs.length === 0 ? (
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-slate-100 shadow-xs text-center space-y-2">
                <span className="material-symbols-outlined text-4xl text-slate-300">group_off</span>
                <h4 className="text-xs font-bold text-on-surface">No Enrolled Clubs Yet</h4>
                <p className="text-xs text-on-surface-variant">
                  You are not currently an active member of any clubs. Explore the catalogue and submit an application to join.
                </p>
                <button
                  onClick={() => router.push('/clubs')}
                  className="px-4 py-2 rounded-lg bg-primary text-on-primary text-xs font-bold shadow-xs hover:bg-primary-container"
                >
                  Explore Clubs Catalogue
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {enrolledClubs.map((club) => {
                  const roleBadge = club.role === 'CLUB_HEAD' ? 'President' : club.role === 'EXECUTIVE' ? 'Executive Board' : 'Active Chapter Member';

                  return (
                    <div key={club.id} className="bg-surface-container-lowest p-4 rounded-xl border border-slate-100 shadow-xs space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-teal-800 text-white font-bold flex items-center justify-center text-xs">
                            <span className="material-symbols-outlined text-lg">{club.bgIcon}</span>
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-on-surface leading-tight">{club.name}</h3>
                            <span className="text-xs text-teal-600 font-bold">{roleBadge}</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-outline block">{club.category}</span>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        {club.website_url ? (
                          <a
                            href={club.website_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 py-1.5 bg-primary text-on-primary text-xs rounded-lg font-bold transition-all text-center flex items-center justify-center gap-1"
                          >
                            <span>Visit Site</span>
                            <span className="material-symbols-outlined text-xs">open_in_new</span>
                          </a>
                        ) : (
                          <button
                            onClick={() => router.push('/clubs')}
                            className="flex-1 py-1.5 bg-primary text-on-primary text-xs rounded-lg font-bold transition-all"
                          >
                            View Directory
                          </button>
                        )}
                        <button
                          onClick={() => router.push('/dashboard')}
                          className="flex-1 py-1.5 bg-surface-container-low text-primary text-xs rounded-lg font-bold transition-all hover:bg-surface-container"
                        >
                          Open Workspace
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right Column: Digital Pass */}
        <div className="lg:col-span-4">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-teal-950 rounded-xl p-5 text-white shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold text-teal-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-base">qr_code_2</span>
                Digital Member Pass
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                ACTIVE
              </span>
            </div>

            <div className="bg-white p-3 rounded-xl flex flex-col items-center justify-center text-slate-900">
              <span className="material-symbols-outlined text-5xl">qr_code_scanner</span>
              <span className="font-mono text-[10px] font-bold text-slate-500 mt-1">
                ID: {user?.roll_number || '23-CAMPUS-PASS'}
              </span>
            </div>

            <div className="text-center space-y-0.5">
              <span className="text-xs font-bold text-white block">{user?.full_name || 'Member'}</span>
              <span className="text-[10px] text-teal-200/80 block">
                {enrolledClubs.length > 0
                  ? `Verified Member: ${enrolledClubs.map((c) => c.name).join(' & ')}`
                  : 'University Student Member'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
