import React from 'react';
import Link from 'next/link';
import { GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#E3F2FD] bg-white text-slate-600 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-[#0D47A1] text-white">
              <GraduationCap className="h-5 w-5 text-[#90CAF9]" />
            </div>
            <span className="font-bold text-slate-900 text-base">CampusClub</span>
            <span className="text-xs text-slate-400">| College Club Management System</span>
          </div>

          <div className="flex items-center gap-6 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#0D47A1] transition-colors">
              Home
            </Link>
            <Link href="/clubs" className="hover:text-[#0D47A1] transition-colors">
              Clubs
            </Link>
            <Link href="/events" className="hover:text-[#0D47A1] transition-colors">
              Events
            </Link>
            <Link href="/privacy" className="hover:text-[#0D47A1] transition-colors">
              Privacy
            </Link>
          </div>

          <p className="text-xs text-slate-400">
            &copy; {new Date().getFullYear()} CampusClub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
