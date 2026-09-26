'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, LogOut, User as UserIcon, LayoutDashboard, Compass, Calendar } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#E3F2FD] bg-white/90 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo & Brand */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-[#0D47A1] hover:opacity-90 transition-opacity">
              <div className="p-2 rounded-lg bg-[#0D47A1] text-white">
                <GraduationCap className="h-6 w-6 text-[#90CAF9]" />
              </div>
              <span className="bg-gradient-to-r from-[#0D47A1] to-[#2196F3] bg-clip-text text-transparent">
                CampusClub
              </span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className={`text-sm font-medium transition-colors hover:text-[#2196F3] ${
                  isActive('/') ? 'text-[#0D47A1] font-semibold border-b-2 border-[#0D47A1] pb-1' : 'text-slate-600'
                }`}
              >
                Home
              </Link>
              <Link
                href="/clubs"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#2196F3] ${
                  isActive('/clubs') ? 'text-[#0D47A1] font-semibold border-b-2 border-[#0D47A1] pb-1' : 'text-slate-600'
                }`}
              >
                <Compass className="h-4 w-4" />
                Explore Clubs
              </Link>
              <Link
                href="/events"
                className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#2196F3] ${
                  isActive('/events') ? 'text-[#0D47A1] font-semibold border-b-2 border-[#0D47A1] pb-1' : 'text-slate-600'
                }`}
              >
                <Calendar className="h-4 w-4" />
                Events
              </Link>
            </nav>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-4">
            {isLoading ? (
              <div className="h-9 w-24 bg-slate-100 animate-pulse rounded-lg" />
            ) : isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link href="/dashboard">
                  <Button
                    variant={isActive('/dashboard') ? 'primary' : 'ghost'}
                    size="sm"
                    className="gap-1.5"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>

                <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
                  <Link href="/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="h-8 w-8 rounded-full bg-[#E3F2FD] border border-[#90CAF9] flex items-center justify-center text-[#0D47A1] font-bold text-sm">
                      {user.full_name.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-semibold text-slate-900 leading-tight">{user.full_name}</span>
                      <Badge role={user.role} className="scale-75 origin-left py-0 -mt-0.5" />
                    </div>
                  </Link>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => logout()}
                  title="Logout"
                  className="gap-1 text-slate-700 hover:text-red-600 hover:border-red-300"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">Logout</span>
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Log in
                  </Button>
                </Link>
                <Link href="/register">
                  <Button variant="primary" size="sm" className="shadow-sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
