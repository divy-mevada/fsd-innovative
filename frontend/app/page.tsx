'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  Users,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="space-y-16 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#2196F3] text-white p-8 md:p-14 shadow-xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-[#90CAF9]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-[#90CAF9]">
            <Sparkles className="h-4 w-4" />
            <span>Campus Club & Event Management Portal</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight">
            Discover, Join & Lead University Clubs
          </h1>

          <p className="text-lg text-[#E3F2FD]/90 leading-relaxed max-w-2xl">
            CampusClub connects students, members, executives, and club heads in one unified portal. Explore active organizations, RSVP for campus events, and manage club operations.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="bg-white text-[#0D47A1] hover:bg-[#E3F2FD] font-bold gap-2 shadow-md">
                  Go to Dashboard <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button size="lg" className="bg-white text-[#0D47A1] hover:bg-[#E3F2FD] font-bold gap-2 shadow-md">
                    Get Started <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10 font-semibold">
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
          <h2 className="text-3xl font-bold text-[#0D47A1]">Designed for Modern Campus Life</h2>
          <p className="text-slate-600 mt-2">
            Everything you need to engage, organize, and participate in campus activities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-[#E3F2FD] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center">
              <Users className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Explore & Join Clubs</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Find student organizations aligned with your passions across tech, arts, sports, business, and cultural fields.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E3F2FD] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#2196F3] flex items-center justify-center">
              <Calendar className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Campus Events & Workshops</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              RSVP for hackathons, guest lectures, and social gatherings with instant digital QR passes.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E3F2FD] shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">Role-Based Portals</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Specialized dashboards tailored for Students, Club Members, Executives, Club Presidents, and Administrators.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
