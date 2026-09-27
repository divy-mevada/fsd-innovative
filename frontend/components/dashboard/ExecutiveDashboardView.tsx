'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';

interface ExecutiveDashboardViewProps {
  user: User | null;
}

interface TaskItem {
  id: string;
  title: string;
  category: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  assignee: string;
}

const INITIAL_TASKS: TaskItem[] = [
  { id: '1', title: 'Finalize Hackathon Sponsor Pitch Deck', category: 'Sponsorship', status: 'in_progress', assignee: 'Alex R.' },
  { id: '2', title: 'Reserve Auditorium B for Tech Talks', category: 'Logistics', status: 'todo', assignee: 'You' },
  { id: '3', title: 'Review 5 Pending Member Applications', category: 'Membership', status: 'todo', assignee: 'You' },
  { id: '4', title: 'Publish Workshop Banner on Campus Portal', category: 'Marketing', status: 'review', assignee: 'Sarah M.' },
  { id: '5', title: 'Submit Q3 Equipment Budget Request', category: 'Finance', status: 'done', assignee: 'You' },
];

export const ExecutiveDashboardView: React.FC<ExecutiveDashboardViewProps> = ({ user }) => {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [pendingApplicants, setPendingApplicants] = useState([
    { id: 'app-1', name: 'Rohan Sharma', dept: 'Computer Science', year: 2, club: 'Coding Guild' },
    { id: 'app-2', name: 'Ananya Patel', dept: 'Information Tech', year: 3, club: 'Coding Guild' },
    { id: 'app-3', name: 'Vikram Singh', dept: 'Electrical Eng', year: 1, club: 'Coding Guild' },
  ]);

  const handleApproveApplicant = (id: string) => {
    setPendingApplicants((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Executive Banner */}
      <section className="relative w-full rounded-xl overflow-hidden shadow-sm bg-gradient-to-r from-amber-900 via-amber-800 to-orange-700 p-space-xl text-white mb-space-lg">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl flex flex-col gap-space-sm">
          <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-white/10 backdrop-blur-md w-fit">
            <span className="material-symbols-outlined text-sm text-amber-200">assignment</span>
            <span className="font-label-sm text-label-sm text-amber-200 uppercase tracking-wider">
              Executive Operations Portal
            </span>
          </div>

          <h1 className="font-display text-display tracking-tight text-white leading-tight">
            Executive Control — {user?.full_name || 'Club Executive'}
          </h1>

          <p className="font-body-lg text-body-lg text-amber-100/90 max-w-2xl leading-relaxed">
            Manage club event logistics, review pending member join applications, track operational tasks, and coordinate with club heads.
          </p>

          <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
            <button
              onClick={() => router.push('/admin/clubs')}
              className="px-space-lg py-2.5 bg-white text-amber-900 font-label-lg text-label-lg rounded-lg shadow-md hover:bg-amber-50 transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">add_box</span>
              <span>Create Event Proposal</span>
            </button>
            <button
              onClick={() => router.push('/admin')}
              className="px-space-lg py-2.5 bg-white/15 backdrop-blur-md text-white font-label-lg text-label-lg rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-space-xs font-bold"
            >
              <span className="material-symbols-outlined text-base">campaign</span>
              <span>Post Announcement</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Stats Bar */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md mb-space-xl">
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">My Pending Tasks</span>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined">checklist</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-amber-700 font-bold">
              {tasks.filter((t) => t.status !== 'done').length}
            </div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-amber-600">pending_actions</span>
              <span className="font-label-sm text-label-sm text-amber-600 font-semibold">Active Operational Tasks</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Applicant Queue</span>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <span className="material-symbols-outlined">person_add</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-blue-700 font-bold">
              {pendingApplicants.length}
            </div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-blue-600">how_to_reg</span>
              <span className="font-label-sm text-label-sm text-blue-600 font-semibold">Applications Pending Review</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Logistics Clearance</span>
            <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined">verified</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-emerald-700 font-bold">100%</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
              <span className="font-label-sm text-label-sm text-emerald-600 font-semibold">Venues & Permits Ready</span>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">Allocated Budget</span>
            <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600">
              <span className="material-symbols-outlined">payments</span>
            </div>
          </div>
          <div className="mt-space-sm">
            <div className="font-headline-lg text-headline-lg text-purple-700 font-bold">₹45,000</div>
            <div className="flex items-center gap-space-xs mt-1">
              <span className="material-symbols-outlined text-sm text-purple-600">account_balance_wallet</span>
              <span className="font-label-sm text-label-sm text-purple-600 font-semibold">Q3 Event Funding</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left Column (Kanban Task Board) */}
        <div className="lg:col-span-8 flex flex-col gap-space-xl min-w-0">
          <section className="flex flex-col gap-space-md">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Executive Kanban Task Board</h2>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Track event planning deliverables and responsibilities</p>
              </div>
              <button
                onClick={() => {
                  const title = prompt('Enter new executive task title:');
                  if (title) {
                    setTasks((prev) => [
                      ...prev,
                      { id: Date.now().toString(), title, category: 'General', status: 'todo', assignee: 'You' },
                    ]);
                  }
                }}
                className="px-space-md py-1.5 bg-amber-600 text-white font-label-md text-label-md rounded-lg hover:bg-amber-700 transition-colors font-bold flex items-center gap-1 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Add Task</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
              {/* To-Do Column */}
              <div className="bg-surface-container-lowest p-space-sm rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="font-label-md text-label-md font-bold text-slate-700 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> To-Do
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                    {tasks.filter((t) => t.status === 'todo').length}
                  </span>
                </div>
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.status === 'todo')
                    .map((t) => (
                      <div key={t.id} className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 px-1.5 py-0.5 rounded bg-amber-100">
                          {t.category}
                        </span>
                        <p className="font-label-md text-label-md font-bold text-on-surface mt-1.5">{t.title}</p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-amber-100 text-xs text-outline">
                          <span>Assignee: {t.assignee}</span>
                          <button
                            onClick={() =>
                              setTasks((prev) =>
                                prev.map((item) => (item.id === t.id ? { ...item, status: 'in_progress' } : item))
                              )
                            }
                            className="text-amber-800 font-bold hover:underline"
                          >
                            Start &rarr;
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* In Progress Column */}
              <div className="bg-surface-container-lowest p-space-sm rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="font-label-md text-label-md font-bold text-blue-700 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> In Progress
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    {tasks.filter((t) => t.status === 'in_progress').length}
                  </span>
                </div>
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.status === 'in_progress')
                    .map((t) => (
                      <div key={t.id} className="p-3 bg-blue-50/50 rounded-lg border border-blue-200/60 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 px-1.5 py-0.5 rounded bg-blue-100">
                          {t.category}
                        </span>
                        <p className="font-label-md text-label-md font-bold text-on-surface mt-1.5">{t.title}</p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-blue-100 text-xs text-outline">
                          <span>Assignee: {t.assignee}</span>
                          <button
                            onClick={() =>
                              setTasks((prev) =>
                                prev.map((item) => (item.id === t.id ? { ...item, status: 'done' } : item))
                              )
                            }
                            className="text-blue-800 font-bold hover:underline"
                          >
                            Complete &check;
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Completed Column */}
              <div className="bg-surface-container-lowest p-space-sm rounded-xl border border-slate-200/80">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="font-label-md text-label-md font-bold text-emerald-700 flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Done
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
                    {tasks.filter((t) => t.status === 'done').length}
                  </span>
                </div>
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.status === 'done')
                    .map((t) => (
                      <div key={t.id} className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-200/60 shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 px-1.5 py-0.5 rounded bg-emerald-100">
                          {t.category}
                        </span>
                        <p className="font-label-md text-label-md font-bold text-on-surface line-through mt-1.5 opacity-70">
                          {t.title}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-100 text-xs text-emerald-700 font-bold">
                          <span>Completed</span>
                          <span className="material-symbols-outlined text-base">check_circle</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column (Applications Queue) */}
        <div className="lg:col-span-4 flex flex-col gap-space-lg">
          <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm border border-slate-100">
            <div className="flex items-center justify-between pb-space-xs mb-space-sm border-b border-slate-100">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-amber-600">how_to_reg</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Member Applications</h3>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-label-sm text-label-sm font-bold">
                {pendingApplicants.length} Pending
              </span>
            </div>

            {pendingApplicants.length === 0 ? (
              <div className="py-8 text-center">
                <span className="material-symbols-outlined text-3xl text-emerald-500 mb-1">done_all</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant font-medium">All member applications reviewed!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {pendingApplicants.map((app) => (
                  <div key={app.id} className="p-3 rounded-lg border border-slate-200 bg-surface-container-low flex flex-col gap-2">
                    <div>
                      <h4 className="font-label-md text-label-md font-bold text-on-surface">{app.name}</h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {app.dept} &bull; Year {app.year}
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2 pt-1 border-t border-slate-200">
                      <button
                        onClick={() => handleApproveApplicant(app.id)}
                        className="px-2.5 py-1 rounded bg-error-container/30 text-error hover:bg-error-container font-label-sm text-label-sm font-bold transition-all"
                      >
                        Reject
                      </button>
                      <button
                        onClick={() => handleApproveApplicant(app.id)}
                        className="px-2.5 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700 font-label-sm text-label-sm font-bold shadow-xs transition-all"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
