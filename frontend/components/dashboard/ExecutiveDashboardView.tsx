'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/auth';

interface ExecutiveDashboardViewProps {
  user: User | null;
  clubName?: string;
}

interface TaskItem {
  id: string;
  title: string;
  category: string;
  status: 'todo' | 'in_progress' | 'done';
}

const INITIAL_TASKS: TaskItem[] = [
  { id: '1', title: 'Finalize Hackathon Sponsor Pitch Deck', category: 'Sponsorship', status: 'in_progress' },
  { id: '2', title: 'Reserve Auditorium B for Tech Talks', category: 'Logistics', status: 'todo' },
  { id: '3', title: 'Review Pending Member Applications', category: 'Membership', status: 'todo' },
];

export const ExecutiveDashboardView: React.FC<ExecutiveDashboardViewProps> = ({ user, clubName = 'CSI Chapter' }) => {
  const router = useRouter();
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [pendingApplicants, setPendingApplicants] = useState([
    { id: 'app-1', name: 'Rohan Sharma', dept: 'Computer Science', year: 2 },
    { id: 'app-2', name: 'Ananya Patel', dept: 'Information Tech', year: 3 },
  ]);

  const handleApproveApplicant = (id: string) => {
    setPendingApplicants((prev) => prev.filter((app) => app.id !== id));
  };

  return (
    <div className="flex flex-col w-full pb-space-xl">
      {/* Banner */}
      <section className="relative w-full rounded-2xl overflow-hidden shadow-xs bg-gradient-to-r from-amber-900 via-amber-800 to-orange-700 p-8 text-white mb-6">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-amber-200">
            <span className="material-symbols-outlined text-sm">assignment</span>
            <span>Executive Operations • {clubName}</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-white leading-tight">
            Executive Portal — {user?.full_name || 'Executive'}
          </h1>

          <p className="text-xs sm:text-sm text-amber-100/90 max-w-xl leading-relaxed">
            Managing event logistics, tasks, and member workflows for <strong className="text-white">{clubName}</strong>.
          </p>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => {
                const title = prompt('Enter task title:');
                if (title) {
                  setTasks((prev) => [...prev, { id: Date.now().toString(), title, category: 'General', status: 'todo' }]);
                }
              }}
              className="px-4 py-2 bg-white text-amber-900 font-bold text-xs rounded-lg shadow-xs hover:bg-amber-50 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>New Task</span>
            </button>
            <button
              onClick={() => router.push('/admin/clubs')}
              className="px-4 py-2 bg-white/15 backdrop-blur-md text-white font-bold text-xs rounded-lg hover:bg-white/20 transition-all flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-base">domain_verification</span>
              <span>Manage Clubs</span>
            </button>
          </div>
        </div>
      </section>

      {/* Metric Stats */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Pending Tasks</span>
            <div className="text-2xl font-extrabold text-amber-700 mt-1">
              {tasks.filter((t) => t.status !== 'done').length}
            </div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <span className="material-symbols-outlined">checklist</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Applicants</span>
            <div className="text-2xl font-extrabold text-blue-700 mt-1">{pendingApplicants.length}</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined">person_add</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Clearance</span>
            <div className="text-2xl font-extrabold text-emerald-700 mt-1">100%</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined">verified</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl p-4 border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Event Budget</span>
            <div className="text-2xl font-extrabold text-purple-700 mt-1">₹45,000</div>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-purple-600">
            <span className="material-symbols-outlined">payments</span>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Kanban */}
        <div className="lg:col-span-8 space-y-4">
          <h2 className="text-lg font-bold text-on-surface">Task Kanban Board</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* To-Do */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-amber-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500"></span> To-Do
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                  {tasks.filter((t) => t.status === 'todo').length}
                </span>
              </div>
              <div className="space-y-2">
                {tasks
                  .filter((t) => t.status === 'todo')
                  .map((t) => (
                    <div key={t.id} className="p-3 bg-amber-50/50 rounded-lg border border-amber-200/60 text-xs">
                      <span className="text-[10px] font-bold text-amber-700 uppercase">{t.category}</span>
                      <p className="font-bold text-on-surface mt-1">{t.title}</p>
                      <button
                        onClick={() =>
                          setTasks((prev) =>
                            prev.map((item) => (item.id === t.id ? { ...item, status: 'in_progress' } : item))
                          )
                        }
                        className="text-amber-800 font-bold hover:underline mt-2 block text-[11px]"
                      >
                        Start Task &rarr;
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* In Progress & Completed */}
            <div className="bg-surface-container-lowest p-4 rounded-xl border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span> Active & Done
                </span>
              </div>
              <div className="space-y-2">
                {tasks
                  .filter((t) => t.status !== 'todo')
                  .map((t) => (
                    <div key={t.id} className="p-3 bg-blue-50/50 rounded-lg border border-blue-200/60 text-xs">
                      <span className="text-[10px] font-bold text-blue-700 uppercase">{t.category}</span>
                      <p className="font-bold text-on-surface mt-1">{t.title}</p>
                      <span className="text-[10px] font-bold text-emerald-600 mt-2 block uppercase">
                        Status: {t.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Applicants Queue */}
        <div className="lg:col-span-4">
          <div className="bg-surface-container-lowest rounded-xl p-5 border border-slate-100 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-on-surface flex items-center justify-between pb-2 border-b border-slate-100">
              <span>Member Applicants</span>
              <span className="text-xs text-amber-700">{pendingApplicants.length} Pending</span>
            </h3>

            {pendingApplicants.length === 0 ? (
              <p className="text-xs text-on-surface-variant text-center py-4">No pending applications.</p>
            ) : (
              <div className="space-y-2">
                {pendingApplicants.map((app) => (
                  <div key={app.id} className="p-3 rounded-lg border border-slate-200 bg-surface-container-low text-xs space-y-2">
                    <div>
                      <h4 className="font-bold text-on-surface">{app.name}</h4>
                      <p className="text-[11px] text-on-surface-variant">{app.dept} &bull; Yr {app.year}</p>
                    </div>
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleApproveApplicant(app.id)}
                        className="px-2 py-0.5 rounded bg-emerald-600 text-white font-bold text-[11px]"
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
