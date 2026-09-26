'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');

  const isActive = (path: string) => pathname === path;

  return (
    <ProtectedRoute>
      <div className="bg-surface text-on-surface antialiased min-h-screen">
        {/* Left Sidebar */}
        <aside className="fixed left-0 top-0 h-full w-64 bg-surface-container-low z-50 flex flex-col justify-between py-space-lg shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
          <div className="flex flex-col gap-space-lg">
            {/* Logo */}
            <div className="flex items-center gap-space-sm px-space-lg cursor-pointer" onClick={() => router.push('/')}>
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
                <span className="material-symbols-outlined text-xl">school</span>
              </div>
              <span className="font-headline-md text-headline-md text-primary tracking-tight font-bold">
                CampusClub
              </span>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-space-xs px-space-md">
              <Link
                href="/dashboard"
                className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-all ${
                  isActive('/dashboard')
                    ? 'bg-surface-container text-primary font-bold shadow-sm'
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
                    ? 'bg-surface-container text-primary font-bold shadow-sm'
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
                    ? 'bg-surface-container text-primary font-bold shadow-sm'
                    : 'font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-secondary">calendar_month</span>
                <span>Events</span>
              </Link>

              <Link
                href="/profile"
                className={`flex items-center gap-space-md px-space-md py-space-sm rounded-lg transition-all ${
                  isActive('/profile')
                    ? 'bg-surface-container text-primary font-bold shadow-sm'
                    : 'font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-secondary">person</span>
                <span>Profile</span>
              </Link>
            </nav>
          </div>

          {/* Bottom Sidebar User Status & Logout */}
          <div className="flex flex-col gap-space-xs px-space-md">
            <button
              onClick={() => logout()}
              className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-error hover:bg-error-container/20 transition-all text-left"
            >
              <span className="material-symbols-outlined text-error">logout</span>
              <span>Sign Out</span>
            </button>

            <div className="mt-space-sm p-space-sm bg-surface-container-high rounded-xl flex items-center justify-between">
              <div className="flex items-center gap-space-sm">
                <div className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></div>
                <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider font-bold">
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
          <header className="fixed top-0 left-64 right-0 h-16 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] z-40 flex items-center justify-between px-space-xl">
            <div className="flex items-center gap-space-md w-96">
              <div className="relative w-full">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-lg pointer-events-none">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-space-md py-1.5 bg-surface-container-lowest rounded-lg font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:bg-surface-container-low transition-colors"
                  placeholder="Search clubs, events, rosters..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-space-lg">
              <div className="inline-flex items-center gap-space-xs px-space-md py-1 bg-surface-container rounded-full">
                <span className="material-symbols-outlined text-primary text-base">school</span>
                <span className="font-label-sm text-label-sm text-primary font-bold">Fall 2025 Semester</span>
              </div>

              <button
                className="relative p-space-xs text-on-surface-variant hover:text-on-surface transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full"></span>
              </button>

              <div className="flex items-center gap-space-sm">
                <div className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-sm shadow-sm">
                  {user?.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-label-md text-label-md text-on-surface font-bold leading-tight">
                    {user?.full_name || 'Student User'}
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
      </div>
    </ProtectedRoute>
  );
};
