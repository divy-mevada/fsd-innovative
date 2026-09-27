'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { useClubsStore, ClubItem } from '@/lib/clubs-store';
import { AddClubModal } from '@/components/AddClubModal';

export default function ClubsPage() {
  const { clubs, refreshClubs } = useClubsStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [joinedClubIds, setJoinedClubIds] = useState<string[]>(['c1']);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => refreshClubs();
    window.addEventListener('campusclub_clubs_updated', handleUpdate);
    return () => window.removeEventListener('campusclub_clubs_updated', handleUpdate);
  }, [refreshClubs]);

  const filteredClubs = useMemo(() => {
    return clubs.filter((club) => {
      const matchesSearch =
        club.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        club.dept.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'all' ||
        club.category.toLowerCase().includes(selectedCategory.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [clubs, searchQuery, selectedCategory]);

  const toggleJoin = (id: string) => {
    setJoinedClubIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full pb-space-xl">
        {/* Header & Filter Controls Strip */}
        <div className="relative w-full overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm mb-space-lg">
          <div className="relative z-10 px-space-xl pt-space-lg pb-space-lg flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-space-xs px-space-sm py-1 bg-surface-container rounded-full">
                <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
                <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
                  Chartered Directory • Fall 2025
                </span>
              </div>
              <div className="flex items-center gap-space-sm text-on-surface-variant font-label-md text-label-md font-semibold">
                <span className="material-symbols-outlined text-secondary text-base">verified_user</span>
                <span>{clubs.length} Active Student Charters</span>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-md">
              <div className="max-w-2xl">
                <h1 className="font-display text-headline-lg text-primary tracking-tight font-bold">
                  Collegiate Organizations Directory
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Explore {clubs.length} chartered student clubs, societies, and tech chapters across campus. Connect with executive leads and join student communities.
                </p>
              </div>

              {/* Add New Club Action Button */}
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="px-space-md py-2.5 bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg shadow-md transition-all duration-200 flex items-center gap-space-xs font-bold active:scale-[0.98] whitespace-nowrap self-start lg:self-end"
              >
                <span className="material-symbols-outlined text-base">add_circle</span>
                <span>+ Register New Club</span>
              </button>
            </div>

            {/* Search Bar & Controls */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-space-sm mt-space-xs">
              <div className="md:col-span-12 relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-lg">search</span>
                </div>
                <input
                  className="w-full pl-10 pr-20 py-2.5 bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-sm text-body-sm rounded-lg focus:outline-none transition-all shadow-inner border border-slate-200"
                  placeholder="Search by club name, stack, mission, or executive officer..."
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mb-1 scrollbar-none pt-space-xs">
              {[
                { label: `All (${clubs.length})`, value: 'all' },
                { label: 'Technical', value: 'technical' },
                { label: 'Arts & Media', value: 'arts' },
                { label: 'Entrepreneurship', value: 'entrepreneurship' },
                { label: 'Sports', value: 'sports' },
                { label: 'Cultural', value: 'cultural' },
                { label: 'Hardware', value: 'hardware' },
              ].map((pill) => (
                <button
                  key={pill.value}
                  onClick={() => setSelectedCategory(pill.value)}
                  className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-bold whitespace-nowrap transition-all ${
                    selectedCategory === pill.value
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                  }`}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
          {filteredClubs.map((club) => {
            const isJoined = joinedClubIds.includes(club.id);

            return (
              <div
                key={club.id}
                className="group flex flex-col justify-between bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200/60"
              >
                <div>
                  <div className="relative h-44 w-full overflow-hidden bg-primary-container flex items-center justify-center text-white">
                    <span className="material-symbols-outlined text-6xl opacity-90">{club.bgIcon}</span>
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-primary text-on-primary shadow-sm flex items-center gap-1 font-bold">
                        {club.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-full font-label-sm text-label-sm bg-surface-container-lowest text-primary font-bold shadow-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-secondary text-xs">workspace_premium</span>
                        {club.badge}
                      </span>
                    </div>
                  </div>

                  <div className="p-space-md flex flex-col gap-space-sm">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
                        {club.name}
                      </h3>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">{club.dept}</span>
                    </div>

                    <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                      {club.description}
                    </p>

                    <div className="grid grid-cols-2 gap-space-sm py-2 px-3 bg-surface-container-low rounded-lg">
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-outline font-semibold">Active Members</span>
                        <span className="font-headline-sm text-headline-sm text-primary font-bold">{club.members}+</span>
                      </div>
                      <div className="flex flex-col border-l border-surface-container-high pl-3">
                        <span className="font-label-sm text-label-sm text-outline font-semibold">Flagship Events</span>
                        <span className="font-headline-sm text-headline-sm text-secondary font-bold">{club.perYr}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-space-md pb-space-md pt-space-xs flex items-center gap-space-sm">
                  <button
                    onClick={() => toggleJoin(club.id)}
                    className={`w-full py-2 px-4 font-label-md text-label-md rounded-lg transition-colors shadow-sm font-bold flex items-center justify-center gap-1 ${
                      isJoined
                        ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                        : 'bg-primary hover:bg-primary-container text-on-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">
                      {isJoined ? 'check_circle' : 'person_add'}
                    </span>
                    <span>{isJoined ? 'Member Active' : '+ Join Club'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal for Adding New Club */}
        <AddClubModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSuccess={() => {
            refreshClubs();
          }}
        />
      </div>
    </DashboardLayout>
  );
}
