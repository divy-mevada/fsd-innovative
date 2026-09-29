'use client';

import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { DashboardLayout } from '@/components/DashboardLayout';
import { StudentDashboardView } from '@/components/dashboard/StudentDashboardView';
import { MemberDashboardView } from '@/components/dashboard/MemberDashboardView';
import { ExecutiveDashboardView } from '@/components/dashboard/ExecutiveDashboardView';
import { ClubHeadDashboardView } from '@/components/dashboard/ClubHeadDashboardView';
import { AdminDashboardView } from '@/components/dashboard/AdminDashboardView';

export default function DashboardPage() {
  const { user } = useAuth();
  const userRole = user?.role || 'STUDENT';

  const renderDashboardView = () => {
    switch (userRole) {
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
        {renderDashboardView()}
      </div>
    </DashboardLayout>
  );
}
