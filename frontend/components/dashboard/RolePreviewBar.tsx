'use client';

import React from 'react';
import { UserRole } from '@/types/auth';

interface RolePreviewBarProps {
  activeRole: UserRole;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const ROLES_CONFIG: { role: UserRole; label: string; icon: string; colorClass: string }[] = [
  { role: 'STUDENT', label: 'Student', icon: 'school', colorClass: 'hover:text-blue-600' },
  { role: 'CLUB_MEMBER', label: 'Club Member', icon: 'card_membership', colorClass: 'hover:text-teal-600' },
  { role: 'EXECUTIVE', label: 'Executive', icon: 'assignment', colorClass: 'hover:text-amber-600' },
  { role: 'CLUB_HEAD', label: 'Club Head', icon: 'stars', colorClass: 'hover:text-purple-600' },
  { role: 'ADMIN', label: 'System Admin', icon: 'admin_panel_settings', colorClass: 'hover:text-red-600' },
];

export const RolePreviewBar: React.FC<RolePreviewBarProps> = ({
  activeRole,
  userRole,
  onRoleChange,
}) => {
  const isPreview = activeRole !== userRole;

  return (
    <div className="w-full bg-surface-container-lowest border border-slate-200/80 rounded-xl p-space-sm mb-space-lg shadow-sm">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-space-md">
        {/* Left Indicator */}
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-lg">alt_route</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-on-surface font-bold">
                Dashboard Mode:
              </span>
              <span className="font-label-md text-label-md text-primary font-bold px-2 py-0.5 rounded bg-primary-container/20">
                {activeRole.replace('_', ' ')}
              </span>
              {isPreview && (
                <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 animate-pulse">
                  Demo Preview Mode
                </span>
              )}
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Logged in as: <strong className="text-on-surface">{userRole}</strong>
            </p>
          </div>
        </div>

        {/* Role Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 bg-surface-container-low p-1 rounded-lg">
          {ROLES_CONFIG.map(({ role, label, icon }) => {
            const isSelected = activeRole === role;
            return (
              <button
                key={role}
                onClick={() => onRoleChange(role)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-label-sm text-label-sm font-bold transition-all ${
                  isSelected
                    ? 'bg-primary text-on-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
                }`}
                title={`Switch to ${label} Dashboard View`}
              >
                <span className="material-symbols-outlined text-base">{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}

          {isPreview && (
            <button
              onClick={() => onRoleChange(userRole)}
              className="ml-1 px-2.5 py-1.5 rounded-md font-label-sm text-label-sm text-error bg-error-container/30 hover:bg-error-container/50 font-bold transition-all flex items-center gap-1"
              title="Reset to your actual logged-in role"
            >
              <span className="material-symbols-outlined text-sm">restart_alt</span>
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
