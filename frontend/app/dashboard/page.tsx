'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';
import { UserRole } from '@/types/auth';
import { RolePreviewBar } from '@/components/dashboard/RolePreviewBar';
import { StudentDashboardView } from '@/components/dashboard/StudentDashboardView';
import { MemberDashboardView } from '@/components/dashboard/MemberDashboardView';
import { ExecutiveDashboardView } from '@/components/dashboard/ExecutiveDashboardView';
import { ClubHeadDashboardView } from '@/components/dashboard/ClubHeadDashboardView';
import { AdminDashboardView } from '@/components/dashboard/AdminDashboardView';

export default function DashboardPage() {
  const { user } = useAuth();
  const userRole: UserRole = user?.role || 'STUDENT';

  // Active role view being displayed (defaults to user's actual role)
  const [activeRole, setActiveRole] = useState<UserRole>(userRole);

  useEffect(() => {
    if (user?.role) {
      setActiveRole(user.role);
    }
  }, [user?.role]);

  const renderDashboardView = () => {
    switch (activeRole) {
      case 'ADMIN':
        return <AdminDashboardView user={user} />;
      case 'CLUB_HEAD':
        return <ClubHeadDashboardView user={user} />;
      case 'EXECUTIVE':
        return <ExecutiveDashboardView user={user} />;
      case 'CLUB_MEMBER':
        return <MemberDashboardView user={user} />;
      case 'STUDENT':
      default:
        return <StudentDashboardView user={user} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col w-full py-space-md">
        {/* Role Demo Preview Bar */}
        <RolePreviewBar
          activeRole={activeRole}
          userRole={userRole}
          onRoleChange={(role) => setActiveRole(role)}
        />

        {/* Dynamic Role Specific Dashboard View */}
        {renderDashboardView()}
      </div>
    </DashboardLayout>
  );
}
