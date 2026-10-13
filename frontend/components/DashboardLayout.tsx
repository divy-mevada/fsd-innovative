'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { AddClubModal } from '@/components/AddClubModal';
import { UserRole } from '@/types/auth';
import { useClubsStore } from '@/lib/clubs-store';
import {
  getNotificationsForUser,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  NotificationItem,
} from '@/lib/notifications-store';

interface DashboardLayoutProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, allowedRoles }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const { clubs } = useClubsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddClubOpen, setIsAddClubOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const notifRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => pathname === path;
  
  // Strictly isolate Admin role permissions
  const isAdmin = user?.role === 'ADMIN';

  // Dynamic user club memberships
  const userMemberships = user?.club_memberships || [];
  const userClubIds = userMemberships.map((m) => m.club_id);

  // Map user's actual memberships to club details (website URL, icon, etc.)
  const dynamicJoinedClubs = userMemberships.map((m) => {
    const clubInfo = clubs.find(
      (c) => c.id.toLowerCase() === m.club_id.toLowerCase() || c.name.toLowerCase() === m.club_name.toLowerCase()
    );
    return {
      id: m.club_id,
      name: m.club_name,
      role: m.role,
      icon: clubInfo?.bgIcon || 'terminal',
      url: clubInfo?.website_url || `/clubs`,
    };
  });

  // Sync notifications
  const reloadNotifications = () => {
    if (!user) {
      setNotifications([]);
      return;
    }
    const notifs = getNotificationsForUser(
      user.id,
      user.role,
      user.email,
      userClubIds
    );
    setNotifications(notifs);
  };

  useEffect(() => {
    reloadNotifications();
    const handleNotifUpdate = () => reloadNotifications();
    window.addEventListener('campusclub_notifications_updated', handleNotifUpdate);
    window.addEventListener('campusclub_applications_updated', handleNotifUpdate);
    return () => {
      window.removeEventListener('campusclub_notifications_updated', handleNotifUpdate);
      window.removeEventListener('campusclub_applications_updated', handleNotifUpdate);
    };
  }, [user, userClubIds.join(',')]);

  // Click outside to close notifications dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

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

              {/* Dynamic MY CLUBS Sidebar Section (Variables based strictly on actual memberships) */}
              <div className="pt-space-xs my-space-xs border-t border-slate-200/80">
                <div className="flex items-center justify-between px-space-md mb-1.5">
                  <span className="text-[10px] font-bold text-outline uppercase tracking-wider block">
                    My Clubs
                  </span>
                  {dynamicJoinedClubs.length > 0 && (
                    <span className="px-1.5 py-0.5 bg-teal-100 text-teal-800 text-[10px] font-extrabold rounded-full">
                      {dynamicJoinedClubs.length}
                    </span>
                  )}
                </div>

                {dynamicJoinedClubs.length > 0 ? (
                  <div className="flex flex-col gap-1">
                    {dynamicJoinedClubs.map((club) => (
                      <a
                        key={club.id}
                        href={club.url}
                        target={club.url.startsWith('http') ? '_blank' : '_self'}
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-space-md py-1.5 rounded-lg text-xs font-semibold text-on-surface-variant hover:bg-surface-container hover:text-primary transition-all group"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className="material-symbols-outlined text-sm text-teal-600">{club.icon}</span>
                          <span className="truncate">{club.name}</span>
                        </div>
                        <span className="material-symbols-outlined text-xs text-outline group-hover:text-primary">
                          {club.url.startsWith('http') ? 'open_in_new' : 'arrow_forward'}
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="p-2.5 mx-1 rounded-lg bg-surface-container-high/40 text-center border border-slate-200/60">
                    <span className="text-[11px] text-on-surface-variant block font-medium">No clubs joined yet</span>
                    <Link
                      href="/clubs"
                      className="text-[11px] font-bold text-primary hover:underline mt-1 inline-flex items-center gap-1"
                    >
                      <span>Explore & Apply</span>
                      <span className="material-symbols-outlined text-xs">arrow_forward</span>
                    </Link>
                  </div>
                )}
              </div>

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
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                await logout();
              }}
              className="flex items-center gap-space-md px-space-md py-space-sm rounded-lg font-label-lg text-label-lg text-error hover:bg-error-container/20 transition-all text-left font-bold cursor-pointer w-full"
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
          <header className="fixed top-0 left-64 right-0 h-16 bg-surface/90 backdrop-blur-xl border-b border-slate-100 z-40 flex items-center justify-between px-space-xl">
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

            <div className="flex items-center gap-4">
              {/* Notifications Center */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={() => setIsNotifOpen((prev) => !prev)}
                  className="relative w-9 h-9 rounded-xl bg-surface-container-lowest hover:bg-surface-container border border-slate-200/80 flex items-center justify-center text-on-surface-variant transition-colors cursor-pointer"
                  title="Notifications"
                >
                  <span className="material-symbols-outlined text-xl">notifications</span>
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white font-extrabold text-[10px] flex items-center justify-center ring-2 ring-white animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Dropdown Panel */}
                {isNotifOpen && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-surface-container-lowest rounded-2xl shadow-xl border border-slate-200/80 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                    <div className="px-4 py-3 bg-surface-container-low border-b border-slate-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-on-surface">Notifications</span>
                        {unreadCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-bold">
                            {unreadCount} new
                          </span>
                        )}
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={() => {
                            markAllNotificationsAsRead(user?.id, user?.role, user?.email, userClubIds);
                            reloadNotifications();
                          }}
                          className="text-[11px] font-bold text-primary hover:underline cursor-pointer"
                        >
                          Mark all as read
                        </button>
                      )}
                    </div>

                    <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                      {notifications.length === 0 ? (
                        <div className="p-6 text-center text-outline text-xs">
                          <span className="material-symbols-outlined text-3xl mb-1 text-slate-300 block">
                            notifications_paused
                          </span>
                          <span>No notifications at this time</span>
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotificationAsRead(n.id);
                              reloadNotifications();
                              if (n.action_url) {
                                setIsNotifOpen(false);
                                router.push(n.action_url);
                              }
                            }}
                            className={`p-3.5 hover:bg-surface-container-low/70 transition-colors cursor-pointer flex items-start gap-3 ${
                              !n.read ? 'bg-primary/5' : ''
                            }`}
                          >
                            <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 text-base">
                              <span className="material-symbols-outlined text-lg">
                                {n.type === 'application'
                                  ? 'person_add'
                                  : n.type === 'success'
                                  ? 'check_circle'
                                  : n.type === 'promotion'
                                  ? 'workspace_premium'
                                  : 'notifications'}
                              </span>
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-1">
                                <h5 className="text-xs font-bold text-on-surface truncate">{n.title}</h5>
                                <span className="text-[10px] text-outline shrink-0">
                                  {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-[11px] text-on-surface-variant mt-0.5 leading-relaxed line-clamp-2">
                                {n.message}
                              </p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="p-2 bg-surface-container-low border-t border-slate-100 text-center">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsNotifOpen(false)}
                        className="text-[11px] font-bold text-primary hover:underline block"
                      >
                        Open Dashboard Overview &rarr;
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* User Avatar & Info */}
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
