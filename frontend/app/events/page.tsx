'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';

interface EventItem {
  id: string;
  month: string;
  day: string;
  tag: string;
  location: string;
  title: string;
  description: string;
  filledSeats: number;
  totalSeats: number;
}

const mockEvents: EventItem[] = [
  {
    id: 'e1',
    month: 'OCT',
    day: '18',
    tag: 'Hackathon',
    location: 'Grand Auditorium',
    title: 'HackCampus 2025: AI Solutions Sprint',
    description: '36-hour sprint creating enterprise generative models with faculty mentorship and industry sponsors.',
    filledSeats: 85,
    totalSeats: 100,
  },
  {
    id: 'e2',
    month: 'OCT',
    day: '22',
    tag: 'Technical Workshop',
    location: 'Innovation Lab 3',
    title: 'Full-Stack Cloud Architecture & Kubernetes',
    description: 'Hands-on microservices infrastructure deployment using Kubernetes & AWS for campus devs.',
    filledSeats: 32,
    totalSeats: 40,
  },
  {
    id: 'e3',
    month: 'NOV',
    day: '02',
    tag: 'Cultural',
    location: 'Open Air Amphitheatre',
    title: 'Annual Cultural Fest Live Audition Night',
    description: 'Music, drama, and dance auditions for the central campus annual cultural festival production.',
    filledSeats: 150,
    totalSeats: 200,
  },
  {
    id: 'e4',
    month: 'NOV',
    day: '10',
    tag: 'Hardware Lab',
    location: 'Makerspace Bay 2',
    title: 'Autonomous Line-Follower Rover Derby',
    description: 'Robotics Guild hardware competition testing sensor accuracy and PID control motor speed.',
    filledSeats: 25,
    totalSeats: 30,
  }
];

export default function EventsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [registeredIds, setRegisteredIds] = useState<string[]>(['e1']);

  const filteredEvents = mockEvents.filter((evt) => {
    const matchesSearch =
      evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      evt.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTag = selectedTag === 'All' || evt.tag.toLowerCase().includes(selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  const toggleRegister = (id: string) => {
    setRegisteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full pb-space-xl">
        {/* Header Section */}
        <div className="relative w-full overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm mb-space-lg">
          <div className="relative z-10 px-space-xl pt-space-lg pb-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded-full">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                  University Events Calendar • Fall 2025
                </span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div className="max-w-2xl">
                <h1 className="font-display text-headline-lg text-primary tracking-tight font-bold">
                  Campus Events & Workshops
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Live seat counts, instant registration, and verified event passes for flagship campus gatherings.
                </p>
              </div>
            </div>

            {/* Search & Tags */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm mt-space-xs">
              <div className="md:col-span-12 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-lg">search</span>
                </div>
                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none transition-all shadow-inner border border-slate-200"
                  placeholder="Search events by title, venue, or topic..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mb-1 scrollbar-none pt-space-xs">
              {['All', 'Hackathon', 'Technical', 'Cultural', 'Hardware'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold whitespace-nowrap transition-all ${
                    selectedTag === tag
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Events Feed */}
        <div className="flex flex-col gap-space-md">
          {filteredEvents.map((evt) => {
            const isRegistered = registeredIds.includes(evt.id);
            const percentFilled = Math.round((evt.filledSeats / evt.totalSeats) * 100);

            return (
              <div
                key={evt.id}
                className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md border border-slate-200/60"
              >
                <div className="flex items-center gap-space-md">
                  {/* Date Callout */}
                  <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-surface-container text-primary font-bold flex-shrink-0">
                    <span className="font-label-sm text-label-sm uppercase tracking-wide">{evt.month}</span>
                    <span className="font-headline-md text-headline-md leading-none">{evt.day}</span>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs mb-1">
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm font-semibold">
                        {evt.tag}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-xs">location_on</span> {evt.location}
                      </span>
                    </div>

                    <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">{evt.title}</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">{evt.description}</p>

                    {/* Seat Progress Bar */}
                    <div className="flex items-center gap-space-sm mt-2">
                      <div className="w-36 h-2 rounded-full bg-surface-container overflow-hidden">
                        <div className="h-full bg-secondary rounded-full" style={{ width: `${percentFilled}%` }}></div>
                      </div>
                      <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                        {evt.filledSeats}/{evt.totalSeats} Seats Filled
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action */}
                <div className="flex items-center gap-space-sm flex-shrink-0 self-end sm:self-center">
                  <button
                    onClick={() => toggleRegister(evt.id)}
                    className={`px-space-md py-2 font-label-md text-label-md rounded-lg transition-colors shadow-sm font-bold flex items-center gap-1 ${
                      isRegistered
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-primary hover:bg-primary-container text-on-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isRegistered ? 'check_circle' : 'confirmation_number'}
                    </span>
                    <span>{isRegistered ? 'RSVP Confirmed' : 'Register CTA'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}
