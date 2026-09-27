import * as React from 'react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/auth';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  role?: UserRole;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  role,
  variant = 'default',
  children,
  ...props
}) => {
  let roleStyles = 'bg-slate-100 text-slate-800';
  let roleText = children;

  if (role) {
    switch (role) {
      case 'ADMIN':
        roleStyles = 'bg-rose-100 text-rose-800 border-rose-300 font-extrabold';
        roleText = roleText || 'System Admin';
        break;
      case 'CLUB_HEAD':
        roleStyles = 'bg-purple-100 text-purple-800 border-purple-300 font-bold';
        roleText = roleText || 'Club Head';
        break;
      case 'EXECUTIVE':
        roleStyles = 'bg-blue-100 text-blue-800 border-blue-300 font-semibold';
        roleText = roleText || 'Executive';
        break;
      case 'CLUB_MEMBER':
        roleStyles = 'bg-emerald-100 text-emerald-800 border-emerald-300';
        roleText = roleText || 'Club Member';
        break;
      case 'STUDENT':
      default:
        roleStyles = 'bg-[#E3F2FD] text-[#0D47A1] border-[#90CAF9]';
        roleText = roleText || 'Student';
        break;
    }
  }

  const variants = {
    default: roleStyles,
    primary: 'bg-[#0D47A1] text-white',
    secondary: 'bg-[#2196F3] text-white',
    success: 'bg-emerald-500 text-white',
    warning: 'bg-amber-500 text-white',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
        role ? roleStyles : variants[variant],
        className
      )}
      {...props}
    >
      {roleText}
    </div>
  );
};
