'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  Users,
  Calendar,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#2196F3] text-white p-8 md:p-14 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#90CAF9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#90CAF9]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Next-Gen Campus Engagement Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Discover, Join & Manage College Clubs Effortlessly
          </h1>

          <p className="text-lg text-[#E3F2FD]/90 leading-relaxed">
            CampusClub connects students, executives, and club heads in one unified hub. Register for events, participate in private club activities, coordinate tasks, and track attendance.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-[#0D47A1] hover:bg-[#E3F2FD] font-bold gap-2">
                  Go to Dashboard <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="bg-white text-[#0D47A1] hover:bg-[#E3F2FD] font-bold gap-2 shadow-lg">
                    Get Started <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Feature Highlights Grid */}
      <section className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-[#0D47A1]">Engineered for University Excellence</h2>
          <p className="text-slate-600 mt-2">
            Modular role-based architecture built with FastAPI, Next.js, and PostgreSQL.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E3F2FD] shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Secure JWT Authentication</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Short-lived access tokens combined with secure HTTP-only refresh cookies and bcrypt password hashing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E3F2FD] shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#2196F3] flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Role-Based Access Control</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Decoupled global and club-level permissions supporting Students, Members, Executives, and Club Heads.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E3F2FD] shadow-sm hover:shadow-md transition-shadow space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Events & Club Activities</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Seamless event discovery, QR code attendance checks, task boards, announcements, and resource sharing.
            </p>
          </div>
        </div>
      </section>

      {/* Phase 1 Architecture Overview */}
      <section className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="p-2 rounded-lg bg-[#0D47A1] text-white">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#0D47A1]">Phase 1 Foundation Operational</h3>
            <p className="text-xs text-slate-500">Authentication & Core System Schema Initialized</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm font-medium">
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <span>JWT Access & Refresh</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <span>bcrypt Password Hash</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <span>HTTP-only Cookies</span>
          </div>
          <div className="flex items-center gap-2 text-slate-700">
            <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
            <span>Extensible RBAC System</span>
          </div>
        </div>
      </section>
    </div>
  );
}
