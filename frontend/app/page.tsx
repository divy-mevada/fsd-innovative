'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  GraduationCap,
  Users,
  Calendar,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  Code,
  Palette,
  Briefcase,
  Trophy,
  HeartHandshake,
  BookOpen,
  CheckCircle2,
  QrCode,
  MessageSquare,
  Clock,
  MapPin,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Lock,
  Compass,
  LayoutDashboard,
  LogOut,
  ArrowUp,
  HelpCircle,
  Activity,
  Award,
  Terminal,
  Flame,
  Check,
  Building,
  Mail,
  Phone,
  Layers,
  Search,
} from 'lucide-react';

export default function HomePage() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const categories = [
    {
      index: '01',
      title: 'Technical & Engineering',
      desc: 'Coding sprints, hackathons, robotics labs, and developer workshops.',
      clubs: 'CSI, ACM, IEEE & Web3 Club',
      eventsCount: '60+ Events / Yr',
      members: '450+ Members',
      icon: Code,
      badgeColor: 'bg-blue-50 text-blue-700 border-blue-200',
      iconBg: 'bg-blue-600 text-white',
    },
    {
      index: '02',
      title: 'Arts & Cultural',
      desc: 'Theatre productions, live musical ensembles, photography guilds, and cultural fests.',
      clubs: 'Dramatics, Music Society, Shutterbugs',
      eventsCount: 'Bi-Weekly Jams',
      members: '320+ Members',
      icon: Palette,
      badgeColor: 'bg-purple-50 text-purple-700 border-purple-200',
      iconBg: 'bg-purple-600 text-white',
    },
    {
      index: '03',
      title: 'Business & Entrepreneurship',
      desc: 'Startup incubators, venture pitch competitions, case analysis, and founder talks.',
      clubs: 'E-Cell, Finance Club, Consulting Group',
      eventsCount: 'Weekly Pitch Nights',
      members: '210+ Members',
      icon: Briefcase,
      badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconBg: 'bg-emerald-600 text-white',
    },
    {
      index: '04',
      title: 'Sports & Athletics',
      desc: 'Inter-college leagues, athletic training, basketball, badminton, and competitive esports.',
      clubs: 'Athletics Union, Basketball, Esports League',
      eventsCount: 'Daily Training & Matches',
      members: '500+ Athletes',
      icon: Trophy,
      badgeColor: 'bg-amber-50 text-amber-700 border-amber-200',
      iconBg: 'bg-amber-600 text-white',
    },
    {
      index: '05',
      title: 'Social Impact & Sustainability',
      desc: 'Green campus initiatives, blood donation drives, NGO outreach, and literacy camps.',
      clubs: 'Rotaract, NSS, EcoWarriors Guild',
      eventsCount: 'Monthly Drives',
      members: '290+ Volunteers',
      icon: HeartHandshake,
      badgeColor: 'bg-rose-50 text-rose-700 border-rose-200',
      iconBg: 'bg-rose-600 text-white',
    },
    {
      index: '06',
      title: 'Literary & Debating',
      desc: 'Parliamentary debate, Model United Nations (MUN), college journals, and book circles.',
      clubs: 'Debating Society, MUN Guild, Editorial Board',
      eventsCount: 'Weekly Open Floor',
      members: '160+ Speakers',
      icon: BookOpen,
      badgeColor: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      iconBg: 'bg-cyan-600 text-white',
    },
  ];

  const leaders = [
    {
      name: 'Arjun Patel',
      role: 'President · ACM Student Chapter',
      dept: 'Senior, Computer Science',
      badge: 'CS & AI · 3 Hackathon Podiums',
      initials: 'AP',
      accent: 'from-blue-600 to-indigo-600',
      quote: 'Building developer culture through open source sprints & weekly algorithm labs.',
    },
    {
      name: 'Riya Sharma',
      role: 'General Secretary · Cultural Council',
      dept: 'Junior, Visual Communications',
      badge: 'Directing Annual Fest 2025',
      initials: 'RS',
      accent: 'from-purple-600 to-pink-600',
      quote: 'Bringing 1,200+ students together across dance, music, and dramatic productions.',
    },
    {
      name: 'Kabir Mehta',
      role: 'Technical Head · CSI Chapter',
      dept: 'Senior, Information Technology',
      badge: 'CodeStorm Lead · Cloud DevOps',
      initials: 'KM',
      accent: 'from-cyan-600 to-blue-600',
      quote: 'Ensuring every student has hands-on server access and real deployment experience.',
    },
    {
      name: 'Ananya Sen',
      role: 'Lead Coordinator · Social Action Guild',
      dept: 'Junior, Biotechnology',
      badge: '12 Campus Drives · Green Award',
      initials: 'AS',
      accent: 'from-emerald-600 to-teal-600',
      quote: 'Mobilizing hundreds of student volunteers for civic responsibility and ecological action.',
    },
  ];

  const stories = [
    {
      quote:
        'I joined the ACM chapter as a timid freshman knowing zero web dev. By junior year, our team won the national smart campus hackathon. CampusClub made discovering workshops and team formation effortless.',
      author: 'Dev V.',
      role: 'B.Tech CSE (ACM Member)',
      result: '3 Hackathon Podiums',
      highlight: 'From novice to team lead in 18 months',
    },
    {
      quote:
        'Managing club registrations used to be a nightmare of broken spreadsheets and duplicate forms. With CampusClub, our attendance tracking is automatic with QR codes, and our event capacity filled up in 45 minutes.',
      author: 'Sneha M.',
      role: 'Cultural Secretary',
      result: '450+ Attendees Checked-in',
      highlight: 'Zero paper rosters · 100% digital check-in',
    },
    {
      quote:
        'Being able to access our club’s private chat, shared past materials, and task board without 5 different WhatsApp groups has transformed how our executive committee operates each semester.',
      author: 'Aditya K.',
      role: 'Vice President, CSI Chapter',
      result: '40% Higher Member Retention',
      highlight: 'Unified tasks, archives & announcements',
    },
  ];

  const events = [
    {
      id: 'e1',
      title: 'HackCampus 2025: AI Solutions Sprint',
      club: 'ACM Student Chapter',
      category: 'Hackathon',
      date: 'This Friday · 09:00 AM',
      venue: 'Grand Auditorium & Lab 4',
      registered: 85,
      capacity: 120,
      badge: 'Flagship Event',
    },
    {
      id: 'e2',
      title: 'CodeStorm 2025: Algorithmic Challenge',
      club: 'Computer Society of India (CSI)',
      category: 'Competition',
      date: 'Next Tuesday · 02:00 PM',
      venue: 'Computing Complex Hall B',
      registered: 95,
      capacity: 100,
      badge: 'Almost Full',
    },
    {
      id: 'e3',
      title: 'Cloud Architecture & Kubernetes Workshop',
      club: 'ACM Student Chapter',
      category: 'Workshop',
      date: 'In 8 Days · 10:30 AM',
      venue: 'Innovation Lab 3',
      registered: 38,
      capacity: 50,
      badge: 'Hands-on Lab',
    },
  ];

  const faqs = [
    {
      q: 'How do I join or apply for an official campus club?',
      a: 'Browse through the Clubs directory, select any club of your choice, and click "Apply to Join". You can submit a brief statement of interest. Club executives and heads review incoming applications and approve memberships directly through the portal.',
    },
    {
      q: 'Are all campus events and workshops free for enrolled students?',
      a: 'Yes, the vast majority of university club events, guest seminars, and workshops are free for enrolled students. When you RSVP, the system instantly generates an entry pass with a personal QR code verified at the venue.',
    },
    {
      q: 'How does the digital QR check-in work at venues?',
      a: 'Once you register for an event, your digital ticket displays a secure dynamic QR code. At the door, event coordinators scan your code using their CampusClub organizer scanner, verifying attendance in real-time with zero paper rosters.',
    },
    {
      q: 'How can a student team charter a new club or society?',
      a: 'Student groups can submit a new club charter proposal directly through the "Charter a Club" modal. Once reviewed and endorsed by the faculty mentor and the Office of Student Affairs, your club is provisioned with a private portal, member roster, and publishing rights.',
    },
    {
      q: 'What specialized tools do Club Heads and Executives get?',
      a: 'Club executives get access to a private workspace featuring role-specific discussion channels, Kanban task management, shared document vaults, event scheduling workflows, and live attendance metrics for all chapter activities.',
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 relative selection:bg-[#2196F3] selection:text-white">
      {/* ═══════════════ [Sticky Glass Nav] ═══════════════ */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'glass-nav shadow-sm py-3'
            : 'bg-white/80 backdrop-blur-md border-b border-[#E3F2FD] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 font-extrabold text-xl tracking-tight text-[#0D47A1] group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#0D47A1] to-[#2196F3] flex items-center justify-center text-white shadow-md shadow-[#2196F3]/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-5 w-5 text-[#E3F2FD]" />
              </div>
              <span className="flex items-center">
                <span className="text-slate-900">Campus</span>
                <span className="text-[#0D47A1]">Club</span>
                <span className="text-[#2196F3] font-black text-2xl leading-none">.</span>
              </span>
            </Link>

            {/* Nav Desktop Links */}
            <nav className="hidden lg:flex items-center gap-1 bg-[#F1F5F9]/80 p-1 rounded-full border border-slate-200/60 text-xs font-semibold text-slate-600">
              <a
                href="#about"
                className="px-3.5 py-1.5 rounded-full hover:text-[#0D47A1] hover:bg-white transition-all"
              >
                About
              </a>
              <a
                href="#categories"
                className="px-3.5 py-1.5 rounded-full hover:text-[#0D47A1] hover:bg-white transition-all"
              >
                Domains
              </a>
              <a
                href="#events"
                className="px-3.5 py-1.5 rounded-full hover:text-[#0D47A1] hover:bg-white transition-all"
              >
                Live Radar
              </a>
              <a
                href="#leaders"
                className="px-3.5 py-1.5 rounded-full hover:text-[#0D47A1] hover:bg-white transition-all"
              >
                Leadership
              </a>
              <a
                href="#impact"
                className="px-3.5 py-1.5 rounded-full hover:text-[#0D47A1] hover:bg-white transition-all"
              >
                Impact
              </a>
              <a
                href="#portals"
                className="px-3.5 py-1.5 rounded-full hover:text-[#0D47A1] hover:bg-white transition-all"
              >
                Portals
              </a>
              <a
                href="#faq"
                className="px-3.5 py-1.5 rounded-full hover:text-[#0D47A1] hover:bg-white transition-all"
              >
                FAQ
              </a>
            </nav>

            {/* Nav Actions */}
            <div className="hidden sm:flex items-center gap-3">
              <Link
                href="/clubs"
                className="text-xs font-semibold text-slate-700 hover:text-[#0D47A1] px-3 py-2 transition-colors"
              >
                Directory
              </Link>

              {isAuthenticated ? (
                <div className="flex items-center gap-2.5">
                  <Link href="/dashboard">
                    <Button
                      size="sm"
                      className="bg-[#0D47A1] hover:bg-[#1565C0] text-white font-semibold gap-1.5 shadow-sm rounded-full px-4"
                    >
                      <LayoutDashboard className="h-3.5 w-3.5" />
                      Dashboard
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      await logout();
                    }}
                    className="text-slate-600 hover:text-red-600 text-xs px-2.5 rounded-full"
                    title="Sign Out"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-slate-700 hover:text-[#0D47A1] hover:bg-slate-100 font-semibold rounded-full px-3.5 text-xs"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-[#0D47A1] to-[#2196F3] hover:opacity-95 text-white font-semibold rounded-full px-4 text-xs shadow-sm"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Hamburger */}
            <div className="flex sm:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                aria-label="Toggle Navigation"
              >
                {mobileMenuOpen ? (
                  <ChevronUp className="h-6 w-6" />
                ) : (
                  <ChevronDown className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Drawer */}
          {mobileMenuOpen && (
            <div className="sm:hidden mt-3 pt-3 pb-4 border-t border-slate-200/80 flex flex-col gap-2">
              <a
                href="#about"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                About
              </a>
              <a
                href="#categories"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Club Domains
              </a>
              <a
                href="#events"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Live Radar Events
              </a>
              <a
                href="#leaders"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Student Leaders
              </a>
              <a
                href="#impact"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Impact & Stats
              </a>
              <a
                href="#portals"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Role Portals
              </a>
              <a
                href="#faq"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                FAQ
              </a>
              <div className="pt-2 flex flex-col gap-2 border-t border-slate-100">
                <Link href="/clubs" className="w-full">
                  <Button variant="outline" size="sm" className="w-full justify-center">
                    Browse All Clubs
                  </Button>
                </Link>
                {isAuthenticated ? (
                  <Link href="/dashboard" className="w-full">
                    <Button size="sm" className="w-full justify-center bg-[#0D47A1] text-white">
                      Go to Dashboard
                    </Button>
                  </Link>
                ) : (
                  <div className="flex gap-2">
                    <Link href="/login" className="flex-1">
                      <Button variant="outline" size="sm" className="w-full justify-center">
                        Sign In
                      </Button>
                    </Link>
                    <Link href="/register" className="flex-1">
                      <Button
                        size="sm"
                        className="w-full justify-center bg-[#0D47A1] text-white"
                      >
                        Join Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ═══════════════ [Hero Section] ═══════════════ */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-[#F3FAFF] via-white to-[#F8FAFC]">
        {/* Ambient Blobs (Himawari organic gradients) */}
        <div className="atmo" aria-hidden="true">
          <div
            className="blob blob--blue animate-pulse-glow"
            style={{
              top: '-10%',
              right: '-10%',
              width: '50vw',
              height: '50vw',
              maxWidth: '650px',
              maxHeight: '650px',
            }}
          />
          <div
            className="blob blob--navy animate-float-slow"
            style={{
              bottom: '-15%',
              left: '-10%',
              width: '45vw',
              height: '45vw',
              maxWidth: '550px',
              maxHeight: '550px',
            }}
          />
          <div
            className="blob blob--sky"
            style={{
              top: '30%',
              left: '25%',
              width: '35vw',
              height: '35vw',
              maxWidth: '400px',
              maxHeight: '400px',
              opacity: 0.5,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              {/* Tag with dot */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#E3F2FD] border border-[#90CAF9]/60 text-xs font-mono font-semibold tracking-wider text-[#0D47A1] uppercase shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#2196F3] animate-ping" />
                <span>00 / CAMPUS HUB · UNIVERSITY STUDENT ORGANIZATIONS</span>
              </div>

              {/* Big Headline with accent dot */}
              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-950 leading-[1.08]">
                Discover, lead &amp; <br />
                connect on campus
                <span className="text-[#2196F3]">.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed font-normal">
                The central operating system for university clubs, campus events, and student
                communities. Join chartered organizations, RSVP for hackathons and symposiums,
                and run club operations with ease.
              </p>

              {/* Actions */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {isAuthenticated ? (
                  <>
                    <Link href="/dashboard">
                      <Button
                        size="lg"
                        className="bg-[#0D47A1] hover:bg-[#1565C0] text-white font-bold gap-2 rounded-full px-7 shadow-lg shadow-[#0D47A1]/20 hover:scale-[1.02] transition-transform"
                      >
                        Go to Dashboard <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/clubs">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-slate-300 text-slate-800 hover:bg-slate-100 font-semibold rounded-full px-6"
                      >
                        Explore Clubs
                      </Button>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link href="/register">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-[#0D47A1] to-[#2196F3] hover:opacity-95 text-white font-bold gap-2 rounded-full px-7 shadow-lg shadow-[#0D47A1]/20 hover:scale-[1.02] transition-transform"
                      >
                        Join CampusClub <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                    <Link href="/clubs">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-slate-300 text-slate-800 hover:bg-slate-100 font-semibold rounded-full px-6"
                      >
                        Browse Directory
                      </Button>
                    </Link>
                  </>
                )}
                <a
                  href="#events"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0D47A1] px-3 py-2 transition-colors ml-1"
                >
                  <Calendar className="h-4 w-4 text-[#2196F3]" />
                  Check upcoming events ↓
                </a>
              </div>

              {/* Meta pills */}
              <div className="pt-4 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-mono text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> 100% Chartered Clubs
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <QrCode className="h-3.5 w-3.5 text-[#2196F3]" /> Instant QR Passes
                </span>
                <span className="text-slate-300">·</span>
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5 text-[#0D47A1]" /> Role-Based Operations
                </span>
              </div>
            </div>

            {/* Right Hero Interactive Visual Card */}
            <div className="lg:col-span-5 relative">
              {/* Glow backdrop behind card */}
              <div className="absolute -inset-2 bg-gradient-to-r from-[#2196F3]/20 to-[#90CAF9]/30 rounded-3xl blur-2xl -z-10" />

              <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/80 space-y-6 relative overflow-hidden">
                {/* Header of Preview Card */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-xs font-bold text-slate-700 uppercase tracking-wider">
                      Live Campus Radar
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#E3F2FD] text-[#0D47A1] font-semibold">
                    Fall &amp; Spring 2025
                  </span>
                </div>

                {/* Featured Event Card in Hero */}
                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#0D47A1] to-[#1565C0] text-white shadow-lg space-y-3 relative overflow-hidden">
                  <div className="absolute top-0 right-0 -mt-6 -mr-6 w-32 h-32 bg-[#90CAF9]/20 rounded-full blur-xl pointer-events-none" />

                  <div className="flex items-center justify-between text-xs font-mono text-[#90CAF9]">
                    <span className="px-2 py-0.5 rounded bg-white/10 backdrop-blur-sm border border-white/10 font-bold">
                      Flagship Hackathon
                    </span>
                    <span className="flex items-center gap-1">
                      <Flame className="h-3.5 w-3.5 text-amber-300" /> Registration Open
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white leading-snug">
                      HackCampus 2025: AI Solutions Sprint
                    </h3>
                    <p className="text-xs text-[#E3F2FD]/80 mt-1">
                      Hosted by ACM Student Chapter · Grand Auditorium
                    </p>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex justify-between text-[11px] font-mono text-[#E3F2FD]/90">
                      <span>Seats reserved</span>
                      <span className="font-bold text-white">85 / 120 (71%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/20 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-[#90CAF9] to-white rounded-full w-[71%]" />
                    </div>
                  </div>
                </div>

                {/* Sub Features Grid inside Hero */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#E3F2FD] text-[#0D47A1] flex items-center justify-center shrink-0">
                      <Users className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">48+ Clubs</div>
                      <div className="text-[11px] text-slate-500 font-mono">6 Categories</div>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-100 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <QrCode className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">1-Tap Pass</div>
                      <div className="text-[11px] text-slate-500 font-mono">Instant Entry</div>
                    </div>
                  </div>
                </div>

                {/* Bottom link inside Hero */}
                <div className="pt-1 text-center">
                  <Link
                    href="/events"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0D47A1] hover:text-[#2196F3] transition-colors"
                  >
                    <span>View all live university events and activities</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>

              {/* Floating Stat Chip (Himawari style hero__chip) */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 items-center gap-3.5 px-4 py-3 rounded-2xl glass-card shadow-xl border border-white/90">
                <div className="w-10 h-10 rounded-xl bg-[#0D47A1] text-white flex items-center justify-center font-black text-sm shadow-md">
                  98%
                </div>
                <div className="text-xs">
                  <div className="font-bold text-slate-900">QR Check-in Rate</div>
                  <div className="text-slate-500 text-[11px]">Across all campus events</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 01: About / Philosophy] ═══════════════ */}
      <section id="about" className="py-24 bg-white border-t border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl space-y-3 mb-14">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
              <span className="text-[#2196F3] font-bold">01</span> / <span>About CampusClub</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              A university built like a living community.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left Lead Paragraph */}
            <div className="lg:col-span-6 space-y-6">
              <p className="text-lg sm:text-xl text-slate-700 leading-relaxed font-normal">
                CampusClub was founded on a simple truth: the most transformative experiences of
                college happen outside the lecture hall. In labs, auditoriums, debate chambers, and
                late-night hackathons where students build things together.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Yet, for years student organizations have been held back by fragmented WhatsApp
                broadcasts, broken spreadsheet signups, and manual paper rosters that get lost at
                the end of every semester.
              </p>
              <div className="pt-2">
                <Link href="/register">
                  <Button className="bg-[#0D47A1] hover:bg-[#1565C0] text-white rounded-full px-6 font-semibold gap-2 shadow-sm">
                    Join the Student Network <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right Numbered Pillars (Himawari style) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 space-y-6">
                <div className="flex gap-4 items-start">
                  <span className="font-mono text-xl font-bold text-[#2196F3] shrink-0 mt-0.5">
                    01
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Single Source of Truth
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Every chartered club, official notice, event schedule, and active member roster
                      is verified and backed by the university.
                    </p>
                  </div>
                </div>

                <hr className="border-slate-200/60" />

                <div className="flex gap-4 items-start">
                  <span className="font-mono text-xl font-bold text-[#2196F3] shrink-0 mt-0.5">
                    02
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Frictionless Discovery &amp; RSVPs
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      No Google Forms or lost links. Register in one click and receive a personal QR
                      admission pass directly in your wallet.
                    </p>
                  </div>
                </div>

                <hr className="border-slate-200/60" />

                <div className="flex gap-4 items-start">
                  <span className="font-mono text-xl font-bold text-[#2196F3] shrink-0 mt-0.5">
                    03
                  </span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-base">
                      Leadership That Scales
                    </h3>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      Private discussion channels, Kanban task boards, document vaults, and seamless
                      executive handovers when senior leaders graduate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 02: Explore 6 Club Categories] ═══════════════ */}
      <section id="categories" className="py-24 bg-[#F8FAFC] border-t border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Split Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
                <span className="text-[#2196F3] font-bold">02</span> / <span>Organizations</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Six pillars of campus life.<br />
                One unified network.
              </h2>
            </div>
            <p className="text-slate-600 max-w-md text-sm leading-relaxed">
              Every club operates on institutional infrastructure — discover, apply, attend, and
              lead. Choose your passion; find your community.
            </p>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={cat.index}
                  className="group p-7 rounded-3xl bg-white border border-slate-200/80 card-hover flex flex-col justify-between space-y-6 relative overflow-hidden"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div
                        className={`w-12 h-12 rounded-2xl ${cat.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}
                      >
                        <IconComp className="h-6 w-6" />
                      </div>
                      <span className="font-mono text-xs font-bold text-slate-400">
                        {cat.index}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#0D47A1] transition-colors">
                      {cat.title}
                    </h3>

                    <p className="text-sm text-slate-600 leading-relaxed font-normal">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-mono text-slate-500">
                      <span>{cat.eventsCount}</span>
                      <span className="font-semibold text-slate-700">{cat.members}</span>
                    </div>
                    <div className="text-xs text-slate-500 truncate">
                      <span className="font-medium text-slate-700">Clubs:</span> {cat.clubs}
                    </div>

                    <div className="pt-1">
                      <Link
                        href={`/clubs?category=${encodeURIComponent(cat.title)}`}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0D47A1] group-hover:text-[#2196F3] transition-colors"
                      >
                        Explore category <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <Link href="/clubs">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 border-slate-300 font-semibold hover:border-[#0D47A1] hover:text-[#0D47A1]"
              >
                View All Chartered Clubs Directory <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 03: Live Events Radar] ═══════════════ */}
      <section id="events" className="py-24 bg-white border-t border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
                <span className="text-[#2196F3] font-bold">03</span> / <span>Campus Radar</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Happening this week on campus.
              </h2>
            </div>
            <p className="text-slate-600 max-w-md text-sm leading-relaxed">
              Reserve your spot before capacity is reached. Instant digital entry pass issued
              straight to your account.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {events.map((ev) => {
              const pct = Math.round((ev.registered / ev.capacity) * 100);
              return (
                <div
                  key={ev.id}
                  className="p-6 rounded-3xl bg-white border border-slate-200/80 card-hover flex flex-col justify-between space-y-6 shadow-sm"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-full bg-[#E3F2FD] text-[#0D47A1] text-xs font-mono font-semibold">
                        {ev.category}
                      </span>
                      <span className="text-xs font-mono font-medium text-slate-400">
                        {ev.badge}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-900 hover:text-[#0D47A1] transition-colors leading-snug">
                      {ev.title}
                    </h3>

                    <div className="text-xs text-slate-500 space-y-1.5 font-medium">
                      <div className="flex items-center gap-2">
                        <Building className="h-3.5 w-3.5 text-[#0D47A1]" />
                        <span>{ev.club}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-slate-400" />
                        <span>{ev.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-slate-400" />
                        <span>{ev.venue}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-slate-100">
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono text-slate-600">
                        <span>RSVP Progress</span>
                        <span className="font-bold text-slate-900">
                          {ev.registered} / {ev.capacity}
                        </span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#0D47A1] to-[#2196F3] rounded-full"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>

                    <Link href="/events" className="block w-full">
                      <Button
                        size="sm"
                        className="w-full bg-[#0D47A1] hover:bg-[#1565C0] text-white rounded-xl font-semibold gap-1.5 shadow-sm"
                      >
                        Reserve Pass <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#0D47A1] hover:text-[#2196F3] transition-colors"
            >
              <span>Explore all upcoming events, hackathons &amp; cultural nights</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 04: Leadership Spotlight] ═══════════════ */}
      <section id="leaders" className="py-24 bg-[#F8FAFC] border-t border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
                <span className="text-[#2196F3] font-bold">04</span> / <span>Leadership</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Led by students who build.<br />
                Backed by faculty.
              </h2>
            </div>
            <p className="text-slate-600 max-w-md text-sm leading-relaxed">
              Student leaders shape our campus culture. Meet the chapter presidents and directors
              driving this academic year&apos;s flagship initiatives.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leaders.map((ldr, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200/80 card-hover flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${ldr.accent} flex items-center justify-center text-white font-mono font-bold text-lg shadow-md`}
                  >
                    {ldr.initials}
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-slate-900 leading-snug">{ldr.name}</h3>
                    <p className="text-xs font-semibold text-[#0D47A1] mt-0.5">{ldr.role}</p>
                    <p className="text-xs text-slate-500">{ldr.dept}</p>
                  </div>

                  <p className="text-xs text-slate-600 italic bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    &ldquo;{ldr.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <span className="inline-flex items-center gap-1 font-mono text-[11px] text-slate-500 font-medium">
                    <Award className="h-3.5 w-3.5 text-[#2196F3]" /> {ldr.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 05: Dark Impact & Numbers] ═══════════════ */}
      <section
        id="impact"
        className="py-24 bg-[#06152B] text-white border-y border-[#122B52] relative overflow-hidden"
      >
        {/* Ambient Dark Blobs */}
        <div className="atmo" aria-hidden="true">
          <div
            className="blob blob--blue"
            style={{
              top: '-15%',
              left: '30%',
              width: '45vw',
              height: '45vw',
              opacity: 0.25,
            }}
          />
          <div
            className="blob blob--navy"
            style={{
              bottom: '-20%',
              right: '10%',
              width: '50vw',
              height: '50vw',
              opacity: 0.35,
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#90CAF9]">
              <span className="text-[#2196F3] font-bold">05</span> / <span>Platform Impact</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
              Campus life by the numbers.
            </h2>
            <p className="text-slate-400 text-base max-w-xl mx-auto">
              Real institutional engagement. Monitored continuously in partnership with the Office
              of Student Affairs.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y lg:divide-y-0 lg:divide-x divide-slate-800">
            <div className="pt-6 lg:pt-0 lg:px-6 space-y-2">
              <div className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
                2,500<span className="text-[#2196F3]">+</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Active Enrolled Students
              </div>
              <p className="text-xs text-slate-500 pt-1">Engaging in clubs each week</p>
            </div>

            <div className="pt-6 lg:pt-0 lg:px-6 space-y-2">
              <div className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
                48<span className="text-[#2196F3]">+</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Chartered Societies
              </div>
              <p className="text-xs text-slate-500 pt-1">Across 6 academic domains</p>
            </div>

            <div className="pt-6 lg:pt-0 lg:px-6 space-y-2">
              <div className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
                140<span className="text-[#2196F3]">+</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Annual Campus Events
              </div>
              <p className="text-xs text-slate-500 pt-1">Workshops, fests &amp; sprints</p>
            </div>

            <div className="pt-6 lg:pt-0 lg:px-6 space-y-2">
              <div className="text-4xl sm:text-6xl font-black font-mono text-white tracking-tight">
                98.4<span className="text-[#2196F3]">%</span>
              </div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                QR Verification Rate
              </div>
              <p className="text-xs text-slate-500 pt-1">Instant mobile pass scan</p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <span className="inline-flex items-center gap-2 font-mono text-xs text-slate-400 bg-slate-900/60 px-4 py-2 rounded-full border border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live system sync across all university departments &amp; councils
            </span>
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 06: Student Voices & Stories] ═══════════════ */}
      <section id="stories" className="py-24 bg-white border-t border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
              <span className="text-[#2196F3] font-bold">06</span> / <span>Stories</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Students and leaders, on the record.
            </h2>
            <p className="text-slate-600 text-sm">
              Authentic experiences from members and executive coordinators across campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stories.map((st, idx) => (
              <blockquote
                key={idx}
                className="p-7 rounded-3xl bg-[#F8FAFC] border border-slate-200/80 card-hover flex flex-col justify-between space-y-6 relative"
              >
                <div className="space-y-4">
                  <span className="text-4xl font-serif text-[#90CAF9] font-black leading-none block">
                    &ldquo;
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {st.quote}
                  </p>
                </div>

                <footer className="pt-4 border-t border-slate-200/60 space-y-2">
                  <div>
                    <cite className="font-bold text-slate-900 not-italic text-sm block">
                      {st.author}
                    </cite>
                    <span className="text-xs text-slate-500">{st.role}</span>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#E3F2FD] text-[#0D47A1] font-mono text-xs font-semibold">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#2196F3]" />
                    <span>{st.result}</span>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 07: Portals & Access Tiers] ═══════════════ */}
      <section id="portals" className="py-24 bg-[#F8FAFC] border-t border-slate-200/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
                <span className="text-[#2196F3] font-bold">07</span> / <span>Role Portals</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Tailored portals for every stakeholder.
              </h2>
            </div>
            <p className="text-slate-600 max-w-md text-sm leading-relaxed">
              From freshmen discovering their first workshop to student presidents managing
              hundreds of active members, CampusClub adapts to your role.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1: General Student */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 card-hover flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Tier 01
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">Student Explorer</h3>
                  <p className="text-xs text-slate-500 mt-1">For all enrolled university students</p>
                </div>

                <div className="text-3xl font-black font-mono text-slate-900">
                  Included <span className="text-xs font-normal text-slate-500">/ Student ID</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>Explore 48+ chartered clubs &amp; societies</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>1-Click RSVP for hackathons &amp; workshops</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>Personal mobile QR event entry pass</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>Submit applications for club recruitment</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>Official campus announcement alerts</span>
                  </li>
                </ul>
              </div>

              <Link href="/register" className="w-full">
                <Button variant="outline" className="w-full rounded-full font-semibold border-slate-300">
                  Get Started Free
                </Button>
              </Link>
            </div>

            {/* Tier 2: Member & Executive (Featured) */}
            <div className="p-8 rounded-3xl bg-gradient-to-b from-white via-white to-[#F3FAFF] border-2 border-[#2196F3] card-hover flex flex-col justify-between space-y-8 relative shadow-xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#2196F3] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
                Most Active
              </div>

              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-[#0D47A1] font-semibold">
                    Tier 02
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">Club Member &amp; Executive</h3>
                  <p className="text-xs text-slate-500 mt-1">For inducted members &amp; committee leads</p>
                </div>

                <div className="text-3xl font-black font-mono text-[#0D47A1]">
                  Full Workspace <span className="text-xs font-normal text-slate-500">/ Club</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-700 font-medium">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>All Student Explorer capabilities</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Private club discussion channels &amp; chat</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Kanban task board &amp; duty assignments</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Shared resource &amp; document archives</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>Event volunteering and duty rosters</span>
                  </li>
                </ul>
              </div>

              <Link href="/login" className="w-full">
                <Button className="w-full rounded-full font-bold bg-[#0D47A1] hover:bg-[#1565C0] text-white shadow-md">
                  Access Member Workspace
                </Button>
              </Link>
            </div>

            {/* Tier 3: President & Faculty Admin */}
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 card-hover flex flex-col justify-between space-y-8">
              <div className="space-y-6">
                <div>
                  <span className="font-mono text-xs uppercase tracking-wider text-slate-400 font-semibold">
                    Tier 03
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-1">President &amp; Faculty Admin</h3>
                  <p className="text-xs text-slate-500 mt-1">For chapter heads and university mentors</p>
                </div>

                <div className="text-3xl font-black font-mono text-slate-900">
                  Institutional <span className="text-xs font-normal text-slate-500">/ Council</span>
                </div>

                <ul className="space-y-3 text-xs text-slate-600">
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>Full club roster management &amp; induction</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>Event publishing &amp; venue approvals</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>Live QR ticket scanner for entry verification</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>Exportable attendance analytics &amp; audit reports</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Check className="h-4 w-4 text-[#2196F3] shrink-0" />
                    <span>Official club charter and budget workflows</span>
                  </li>
                </ul>
              </div>

              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full rounded-full font-semibold border-slate-300">
                  Enter Admin Console
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 08: Interactive FAQ] ═══════════════ */}
      <section id="faq" className="py-24 bg-white border-t border-slate-200/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500">
              <span className="text-[#2196F3] font-bold">08</span> / <span>Frequently Asked</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Got questions? We have answers.
            </h2>
            <p className="text-slate-600 text-sm">
              Everything you need to know about navigating student organizations on CampusClub.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/50 overflow-hidden transition-all"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-base hover:text-[#0D47A1] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-white text-slate-500 shrink-0 border border-slate-200">
                      {isOpen ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-sm text-slate-600 leading-relaxed border-t border-slate-200/40 bg-white">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 09: Final Call to Action] ═══════════════ */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#0D47A1] via-[#1565C0] to-[#2196F3] text-white">
        <div className="atmo" aria-hidden="true">
          <div
            className="blob blob--sky animate-pulse-glow"
            style={{
              top: '-20%',
              right: '-10%',
              width: '50vw',
              height: '50vw',
              opacity: 0.35,
            }}
          />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-mono font-semibold text-[#90CAF9]">
            <Sparkles className="h-4 w-4" />
            <span>09 / GET STARTED · UNIVERSITY COMMUNITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            Your campus story begins today.
          </h2>

          <p className="text-base sm:text-lg text-[#E3F2FD]/90 max-w-2xl mx-auto leading-relaxed">
            Join over 2,500 students building the future of campus leadership, technical
            innovation, and arts culture. One account unlocks every club and event.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-[#0D47A1] hover:bg-[#E3F2FD] font-bold rounded-full px-8 shadow-xl hover:scale-105 transition-transform"
                >
                  Enter Your Dashboard <ArrowRight className="h-4 w-4 ml-1.5" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-white text-[#0D47A1] hover:bg-[#E3F2FD] font-bold rounded-full px-8 shadow-xl hover:scale-105 transition-transform"
                  >
                    Join CampusClub Free <ArrowRight className="h-4 w-4 ml-1.5" />
                  </Button>
                </Link>
                <Link href="/clubs">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 rounded-full px-7 font-semibold"
                  >
                    Explore Directory
                  </Button>
                </Link>
              </>
            )}
          </div>

          <div className="pt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs font-mono text-[#E3F2FD]/80">
            <span>Student Activity Center, Room 204</span>
            <span>·</span>
            <span>Office of Student Affairs Endorsed</span>
            <span>·</span>
            <span>support@campusclub.edu</span>
          </div>
        </div>
      </section>

      {/* ═══════════════ [Section 10: Modern CampusClub Footer] ═══════════════ */}
      <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
            {/* Col 1: Brand & Mission */}
            <div className="md:col-span-2 space-y-4">
              <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-white">
                <div className="w-8 h-8 rounded-lg bg-[#0D47A1] flex items-center justify-center text-white">
                  <GraduationCap className="h-4 w-4 text-[#90CAF9]" />
                </div>
                <span>CampusClub<span className="text-[#2196F3]">.</span></span>
              </Link>
              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                The unified university club management and student activity portal. Built to empower
                student leadership, discover organizations, and automate event check-ins.
              </p>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 pt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All Campus Systems Operational</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Directory
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/clubs" className="hover:text-white transition-colors">
                    All Clubs &amp; Societies
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:text-white transition-colors">
                    Upcoming Events
                  </Link>
                </li>
                <li>
                  <a href="#categories" className="hover:text-white transition-colors">
                    Club Categories
                  </a>
                </li>
                <li>
                  <a href="#leaders" className="hover:text-white transition-colors">
                    Leadership Roster
                  </a>
                </li>
              </ul>
            </div>

            {/* Col 3: Portal Access */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                Portals
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Student Login
                  </Link>
                </li>
                <li>
                  <Link href="/register" className="hover:text-white transition-colors">
                    New Student Registration
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-white transition-colors">
                    Executive Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white transition-colors">
                    Faculty Admin Console
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Campus Contact */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                University Hub
              </h4>
              <div className="text-xs space-y-1.5 text-slate-400">
                <p>Student Activity Center (SAC)</p>
                <p>Campus Main Gate, North Wing</p>
                <p className="pt-1 text-[#90CAF9]">desk@campusclub.edu</p>
                <p>+91 (079) 7166-4000</p>
              </div>
            </div>
          </div>

          {/* Bottom Bar with Back to Top button */}
          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
            <p>&copy; {new Date().getFullYear()} CampusClub System · University Student Affairs</p>

            <div className="flex items-center gap-4">
              <span>Made with care for student leaders</span>
              <button
                type="button"
                onClick={scrollToTop}
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-slate-800 text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Back to top"
                title="Back to top"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
