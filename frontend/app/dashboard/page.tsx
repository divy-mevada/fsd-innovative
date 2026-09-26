'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full pb-space-xl">
        {/* Top Welcome Banner */}
        <section className="relative w-full rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-primary-container via-primary to-secondary p-space-xl text-on-primary mb-space-lg">
          <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
          <div className="absolute right-1/3 -bottom-20 w-64 h-64 rounded-full bg-tertiary-fixed/10 blur-2xl pointer-events-none" />
          
          <div className="relative z-10 max-w-3xl flex flex-col gap-space-sm">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md w-fit">
              <span className="material-symbols-outlined text-sm text-secondary-fixed">stars</span>
              <span className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider">
                Fall 2025 Semester Live • Welcome {user?.full_name || 'Student'}
              </span>
            </div>

            <h1 className="font-display text-display tracking-tight text-on-primary leading-tight">
              Discover. Participate. Lead.
            </h1>

            <p className="font-body-lg text-body-lg text-primary-fixed-dim/90 max-w-2xl leading-relaxed">
              Connect with 84+ student clubs, register for campus hackathons and workshops, and build your university legacy today.
            </p>

            <div className="flex items-center gap-space-md pt-space-sm">
              <button
                onClick={() => router.push('/clubs')}
                className="px-space-lg py-2.5 bg-surface-container-lowest text-primary font-label-lg text-label-lg rounded-lg shadow-md hover:bg-surface-container-low transition-all duration-200 flex items-center gap-space-xs font-bold"
              >
                <span>Explore Clubs</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
              <button
                onClick={() => router.push('/events')}
                className="px-space-lg py-2.5 bg-surface-container-lowest/10 backdrop-blur-md text-on-primary font-label-lg text-label-lg rounded-lg hover:bg-surface-container-lowest/20 transition-all duration-200 flex items-center gap-space-xs font-bold"
              >
                <span className="material-symbols-outlined text-base">event</span>
                <span>View Events</span>
              </button>
            </div>
          </div>
        </section>

        {/* Metric Stats Bar */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
          {/* Stat 1 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">Active Guilds</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">shield</span>
              </div>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">84+</div>
              <div className="flex items-center gap-space-xs mt-1">
                <span className="material-symbols-outlined text-sm text-secondary">trending_up</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Campus Clubs</span>
              </div>
            </div>
          </div>

          {/* Stat 2 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">Student Community</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">groups</span>
              </div>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">2,500+</div>
              <div className="flex items-center gap-space-xs mt-1">
                <span className="material-symbols-outlined text-sm text-secondary">person_check</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Active Students</span>
              </div>
            </div>
          </div>

          {/* Stat 3 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">Scheduled Sessions</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">calendar_month</span>
              </div>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">120+</div>
              <div className="flex items-center gap-space-xs mt-1">
                <span className="material-symbols-outlined text-sm text-secondary">event_available</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Annual Events</span>
              </div>
            </div>
          </div>

          {/* Stat 4 */}
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="font-label-md text-label-md text-on-surface-variant">Total Engagement</span>
              <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary">
                <span className="material-symbols-outlined">confirmation_number</span>
              </div>
            </div>
            <div className="mt-space-sm">
              <div className="font-headline-lg text-headline-lg text-primary font-bold">10K+</div>
              <div className="flex items-center gap-space-xs mt-1">
                <span className="material-symbols-outlined text-sm text-secondary">verified</span>
                <span className="font-label-sm text-label-sm text-secondary font-semibold">Event Registrations</span>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
          {/* Left Column (8 of 12 columns) */}
          <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">
            {/* Explore by Field Categories */}
            <section className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Explore by Category</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Find the community tailored to your personal passions and career path
                  </p>
                </div>
                <Link href="/clubs" className="font-label-sm text-label-sm text-secondary cursor-pointer hover:underline font-bold">
                  View All Fields
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-sm">
                {/* Category Cards */}
                <div onClick={() => router.push('/clubs')} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center cursor-pointer group hover:bg-surface-container-low">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-space-xs group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">terminal</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Technical</span>
                  <span className="font-label-sm text-label-sm text-outline mt-0.5">24 Clubs</span>
                </div>

                <div onClick={() => router.push('/clubs')} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center cursor-pointer group hover:bg-surface-container-low">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-space-xs group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">theater_comedy</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Cultural</span>
                  <span className="font-label-sm text-label-sm text-outline mt-0.5">18 Clubs</span>
                </div>

                <div onClick={() => router.push('/clubs')} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center cursor-pointer group hover:bg-surface-container-low">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-space-xs group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">sports_volleyball</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Sports</span>
                  <span className="font-label-sm text-label-sm text-outline mt-0.5">15 Clubs</span>
                </div>

                <div onClick={() => router.push('/clubs')} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center cursor-pointer group hover:bg-surface-container-low">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-space-xs group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Startups</span>
                  <span className="font-label-sm text-label-sm text-outline mt-0.5">11 Clubs</span>
                </div>

                <div onClick={() => router.push('/clubs')} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center cursor-pointer group hover:bg-surface-container-low">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-space-xs group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">diversity_1</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Social</span>
                  <span className="font-label-sm text-label-sm text-outline mt-0.5">9 Clubs</span>
                </div>

                <div onClick={() => router.push('/clubs')} className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center cursor-pointer group hover:bg-surface-container-low">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary mb-space-xs group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">palette</span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Arts</span>
                  <span className="font-label-sm text-label-sm text-outline mt-0.5">7 Clubs</span>
                </div>
              </div>
            </section>

            {/* Featured Clubs Section */}
            <section className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Featured Student Organizations</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Top ranked clubs with open recruitments and upcoming showcases</p>
                </div>
                <button onClick={() => router.push('/clubs')} className="px-space-md py-1.5 bg-surface-container-low text-primary font-label-md text-label-md rounded-lg hover:bg-surface-container transition-colors font-semibold">
                  Filter Roster
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
                {/* Club Card 1 */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="h-32 w-full relative bg-primary-container flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-5xl">terminal</span>
                      <div className="absolute top-2 right-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm flex items-center gap-1 font-bold">
                        <span className="material-symbols-outlined text-xs">verified</span>
                        <span>Accredited</span>
                      </div>
                    </div>
                    <div className="p-space-md">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                        Tech & Dev
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">ACM Student Chapter</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                        Advancing computing through algorithmic bootcamps, collegiate hackathons, and guest tech talks.
                      </p>
                      <div className="flex items-center gap-space-sm mt-space-md text-on-surface-variant font-label-sm text-label-sm">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">group</span> 420 Members</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">forum</span> Active Daily</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-md pt-0">
                    <button onClick={() => router.push('/clubs')} className="w-full py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-colors font-bold">
                      Explore Club
                    </button>
                  </div>
                </div>

                {/* Club Card 2 */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="h-32 w-full relative bg-secondary-container flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-5xl">smart_toy</span>
                      <div className="absolute top-2 right-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm flex items-center gap-1 font-bold">
                        <span className="material-symbols-outlined text-xs">stars</span>
                        <span>Top Org</span>
                      </div>
                    </div>
                    <div className="p-space-md">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                        Engineering
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">Robotics & Automation</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                        Building combat robots, micro-drones, and IoT prototypes for national collegiate engineering cups.
                      </p>
                      <div className="flex items-center gap-space-sm mt-space-md text-on-surface-variant font-label-sm text-label-sm">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">group</span> 285 Members</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">precision_manufacturing</span> Lab Access</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-md pt-0">
                    <button onClick={() => router.push('/clubs')} className="w-full py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-colors font-bold">
                      Explore Club
                    </button>
                  </div>
                </div>

                {/* Club Card 3 */}
                <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between">
                  <div>
                    <div className="h-32 w-full relative bg-tertiary-container flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-5xl">palette</span>
                      <div className="absolute top-2 right-2 px-space-xs py-0.5 rounded-full bg-surface-container-lowest/90 text-primary font-label-sm text-label-sm flex items-center gap-1 font-bold">
                        <span className="material-symbols-outlined text-xs">brush</span>
                        <span>Recruiting</span>
                      </div>
                    </div>
                    <div className="p-space-md">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                        Arts & UX
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold mt-1">Hyperion Design</h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 line-clamp-2">
                        Interdisciplinary design collective elevating brand systems, interaction prototypes, and 3D renders.
                      </p>
                      <div className="flex items-center gap-space-sm mt-space-md text-on-surface-variant font-label-sm text-label-sm">
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">group</span> 190 Members</span>
                        <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm text-secondary">auto_awesome</span> Weekly Crit</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-space-md pt-0">
                    <button onClick={() => router.push('/clubs')} className="w-full py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-colors font-bold">
                      Explore Club
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Upcoming Campus Events Feed */}
            <section className="flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Upcoming Campus Events</h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Live seat counts and instant registration for campus gatherings</p>
                </div>
                <Link href="/events" className="font-label-sm text-label-sm text-primary font-bold hover:underline">
                  View All Events
                </Link>
              </div>

              <div className="flex flex-col gap-space-md">
                {/* Event 1 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-surface-container text-primary font-bold flex-shrink-0">
                      <span className="font-label-sm text-label-sm uppercase tracking-wide">OCT</span>
                      <span className="font-headline-md text-headline-md leading-none">18</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold">
                          Hackathon
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">location_on</span> Grand Auditorium
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">HackCampus 2025: AI Solutions</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">36-hour sprint creating enterprise generative models.</p>
                    </div>
                  </div>
                  <button onClick={() => router.push('/events')} className="px-space-md py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-colors shadow-sm font-bold flex-shrink-0">
                    Register CTA
                  </button>
                </div>

                {/* Event 2 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-surface-container text-primary font-bold flex-shrink-0">
                      <span className="font-label-sm text-label-sm uppercase tracking-wide">OCT</span>
                      <span className="font-headline-md text-headline-md leading-none">22</span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold">
                          Workshop
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">location_on</span> Innovation Lab 3
                        </span>
                      </div>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">Full-Stack Cloud Architecture</h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Microservices deployment using Kubernetes & AWS.</p>
                    </div>
                  </div>
                  <button onClick={() => router.push('/events')} className="px-space-md py-2 bg-primary text-on-primary font-label-md text-label-md rounded-lg hover:bg-primary-container transition-colors shadow-sm font-bold flex-shrink-0">
                    Register CTA
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column (4 of 12 columns) */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            {/* Quick Schedule Widget */}
            <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm">
              <div className="flex items-center justify-between pb-space-xs mb-space-sm border-b border-slate-100">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary">event_upcoming</span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">My Schedule</h3>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold">
                  2 Enrolled
                </span>
              </div>

              <div className="flex flex-col gap-space-xs">
                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center text-primary font-bold">
                      <span className="text-[10px] uppercase font-semibold">OCT</span>
                      <span className="text-sm font-bold">14</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface font-semibold block">Intro to Design Systems</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">05:00 PM • Room 204</span>
                    </div>
                  </div>
                </div>

                <div className="p-space-sm rounded-lg bg-surface-container-low flex items-center justify-between">
                  <div className="flex items-center gap-space-sm">
                    <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex flex-col items-center justify-center text-primary font-bold">
                      <span className="text-[10px] uppercase font-semibold">OCT</span>
                      <span className="text-sm font-bold">19</span>
                    </div>
                    <div>
                      <span className="font-label-md text-label-md text-on-surface font-semibold block">Robotics Pitch Review</span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">03:30 PM • Lab 1</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
