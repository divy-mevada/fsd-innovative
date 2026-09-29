'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AddClubModal } from '@/components/AddClubModal';
import { UserRole } from '@/types/auth';

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, allowedRoles }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddClubOpen, setIsAddClubOpen] = useState(false);

  const isActive = (path: string) => pathname === path;
  
  // Strictly isolate Admin role permissions
  const isAdmin = user?.role === 'ADMIN';
  const isMemberOrLeader = user?.role === 'CLUB_MEMBER' || user?.role === 'EXECUTIVE' || user?.role === 'CLUB_HEAD';

  // Demo joined clubs for members/leaders
  const joinedClubs = [
    { id: 'csi', name: 'Computer Society of India', icon: 'devices', url: 'https://www.csi-nirma.in/' },
    { id: 'acm', name: 'ACM Student Chapter', icon: 'terminal', url: 'https://nu.acm.org/' }
  ];

  return (
    <ProtectedRoute allowedRoles={allowedRoles}>
      <div className="bg-surface text-on-surface antialiased min-h-screen">
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between py-space-lg shadow-xs border-r border-slate-100 overflow-y-auto">
          <div className="flex flex-col gap-space-md">
            {/* Logo */}
            <div className="flex items-center gap-space-sm px-space-lg cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-xs">
                <span className="material-symbols-outlined text-xl">school</span>
              </div>
              <span className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
                CampusClub
              </span>
            </div>

            {/* Quick Action: Register New Club (ADMIN ONLY) */}
            {isAdmin && (
              <div className="px-space-md">
                <button
                  onClick={() => setIsAddClubOpen(true)}
                  className="w-full py-2.5 px-space-md rounded-lg bg-red-600 hover:bg-red-700 text-white font-label-lg text-label-lg font-bold shadow-xs transition-all flex items-center justify-center gap-space-xs active:scale-[0.98]"
                >
                  <span className="material-symbols-outlined text-lg">add_circle</span>
                  <span>+ Register New Club</span>
                </button>
              </div>
            )}

            {/* Navigation Links */}
            <nav className="flex flex-col gap-space-xs px-space-md">
              <Link
                href="/dashboard"
                className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-all ${
                  isActive('/dashboard')
                    ? 'bg-surface-container text-primary font-bold shadow-xs'
                    : 'font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-secondary">dashboard</span>
                <span>Dashboard</span>
              </Link>

              <Link
                href="/clubs"
                className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-all ${
                  isActive('/clubs')
                    ? 'bg-surface-container text-primary font-bold shadow-xs'
                    : 'font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-secondary">explore</span>
                <span>Explore Clubs</span>
              </Link>

              <Link
                href="/events"
                className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-all ${
                  isActive('/events')
                    ? 'bg-surface-container text-primary font-bold shadow-xs'
                    : 'font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-secondary">calendar_month</span>
                <span>Events</span>
              </Link>

              {/* Dynamic MY CLUBS Sidebar Section (For Members / Executives / Club Heads) */}
              {isMemberOrLeader && (
                <div className="pt-space-xs my-space-xs border-t border-slate-200/80">
                  <span className="px-space-md text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">
                    My Clubs
                  </span>
                  <div className="flex flex-col gap-1">
                    {joinedClubs.map((club) => (
                      <a
                        key={club.id}
                        href={club.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-space-md py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all group"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="material-symbols-outlined text-sm text-teal-600">{club.icon}</span>
                          <span className="truncate">{club.name}</span>
                        </div>
                        <span className="material-symbols-outlined text-xs text-outline group-hover:text-primary">
                          open_in_new
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Admin Panel Link (STRICTLY ADMIN ONLY) */}
              {isAdmin && (
                <div className="pt-space-xs my-space-xs border-t border-slate-200/80">
                  <span className="px-space-md text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">
                    Administration
                  </span>
                  <Link
                    href="/admin"
                    className={`flex items-center justify-between px-space-md py-space-sm rounded-lg transition-all ${
                      isActive('/admin')
                        ? 'bg-surface-container text-rose-700 font-bold shadow-xs'
                        : 'font-label-lg text-label-lg text-rose-700 hover:bg-rose-50'
                    }`}
                  >
                    <div className="flex items-center gap-space-md">
                      <span className="material-symbols-outlined text-rose-700">admin_panel_settings</span>
                      <span>Admin Panel</span>
                    </div>
                  </Link>
                </div>
              )}

              <Link
                href="/profile"
                className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-all ${
                  isActive('/profile')
                    ? 'bg-surface-container text-primary font-bold shadow-xs'
                    : 'font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-secondary">person</span>
                <span>Profile Settings</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Sidebar User Status & Logout */}
          <div className="flex flex-col gap-space-xs px-space-md pt-4">
            <button
              onClick={() => logout()}
              className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-error hover:bg-error-container/20 transition-all text-left font-bold"
            >
              <span className="material-symbols-outlined text-error">logout</span>
              <span>Sign Out</span>
            </button>

            <div className="mt-space-xs p-space-sm bg-surface-container-high rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                  {user?.role || 'STUDENT'}
                </span>
              </div>
              <span className="material-symbols-outlined text-primary text-base">verified</span>
            </div>
          </div>
        </aside>

        {/* Main Section */}
        <div className="pl-64">
          {/* Top Header */}
          <header className="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl border-b border-slate-100 z-40 flex items-center justify-between px-space-xl">
            <div className="flex items-center gap-space-md w-80">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-space-md py-1.5 bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline border border-slate-200 focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Search clubs, events..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-space-md">
              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-xs">
                  {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
                    {user?.full_name || 'User'}
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    {user?.role || 'STUDENT'}
                  </span>
                </div>
              </div>
            </div>
          </header>

          {/* Page Body */}
          <main className="w-full pt-16 px-space-xl bg-surface min-h-screen">
            {children}
          </main>
        </div>

        {/* Global Add Club Modal (ADMIN ONLY) */}
        {isAdmin && (
          <AddClubModal
            isOpen={isAddClubOpen}
            onClose={() => setIsAddClubOpen(false)}
            onSuccess={() => {
              router.push('/clubs');
            }}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};
