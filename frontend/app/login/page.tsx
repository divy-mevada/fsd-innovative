'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function LoginPage() {
  const { login, isLoading, error: authError, clearError } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = 'Email or username is required.';
    if (!password) errors.password = 'Password is required.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const fillAdminCredentials = () => {
    setIsAdminMode(true);
    setEmail('admin@university.edu');
    setPassword('AdminSecret123');
    clearError();
  };

  const fillStudentCredentials = () => {
    setIsAdminMode(false);
    setEmail('student@university.edu');
    setPassword('SecurePassword123');
    clearError();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    try {
      await login({ email, password });
    } catch {
      // Error handled in auth context
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-xs border-b border-slate-100">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-space-sm cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary shadow-xs">
              <span className="material-symbols-outlined text-xl">school</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
              CampusClub
            </span>
          </div>

          <nav className="flex items-center gap-space-md text-sm font-semibold">
            <Link href="/" className="text-on-surface-variant hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/register" className="text-primary hover:underline font-bold">
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-20 pb-12 flex-1 flex flex-col justify-center items-center px-4">
        <div className="w-full max-w-4xl rounded-2xl shadow-xl border border-slate-100 overflow-hidden grid grid-cols-1 md:grid-cols-12 bg-surface-container-lowest">
          
          {/* Left Column: Branding */}
          <div className="md:col-span-5 bg-gradient-to-br from-primary via-primary to-primary-container p-8 flex flex-col justify-between text-on-primary relative overflow-hidden">
            <div className="space-y-6 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-secondary-container">
                <span className="material-symbols-outlined text-sm">
                  {isAdminMode ? 'admin_panel_settings' : 'lock'}
                </span>
                <span>{isAdminMode ? 'Admin Portal' : 'Student Portal'}</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white">
                  {isAdminMode ? 'System Governance' : 'Welcome Back'}
                </h2>
                <p className="text-sm text-primary-fixed-dim leading-relaxed">
                  {isAdminMode
                    ? 'Log in as an Administrator to charter new clubs, oversee rosters, and manage portal permissions.'
                    : 'Log in to access your joined clubs, event RSVPs, member passes, and club announcements.'}
                </p>
              </div>

              {/* Quick Demo Credential Bar */}
              <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 space-y-2 text-xs">
                <div className="flex items-center justify-between text-secondary-container font-bold">
                  <span>Demo Login Quick-Fill:</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={fillStudentCredentials}
                    className={`flex-1 py-1.5 px-2 rounded font-bold transition-all ${
                      !isAdminMode ? 'bg-white text-primary shadow-xs' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Student Demo
                  </button>
                  <button
                    type="button"
                    onClick={fillAdminCredentials}
                    className={`flex-1 py-1.5 px-2 rounded font-bold transition-all ${
                      isAdminMode ? 'bg-rose-600 text-white shadow-xs' : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Admin Demo
                  </button>
                </div>
              </div>
            </div>

            <div className="relative z-10 pt-6 text-xs text-primary-fixed-dim/80 border-t border-white/10">
              CampusClub &copy; {new Date().getFullYear()} University Network
            </div>
          </div>

          {/* Right Column: Auth Form */}
          <div className="md:col-span-7 p-8 flex flex-col justify-between">
            <div>
              {/* Login Mode Selector Tabs */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
                <div className="inline-flex p-1 bg-surface-container rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(false);
                      clearError();
                    }}
                    className={`px-4 py-1.5 rounded text-xs font-bold transition-all ${
                      !isAdminMode
                        ? 'bg-surface-container-lowest text-primary shadow-xs'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    Student Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAdminMode(true);
                      clearError();
                    }}
                    className={`px-4 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-1 ${
                      isAdminMode
                        ? 'bg-rose-600 text-white shadow-xs'
                        : 'text-rose-700 hover:text-rose-900'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                    <span>Admin Sign In</span>
                  </button>
                </div>
              </div>

              {/* Error Alert */}
              {authError && (
                <div className="mb-4 p-3 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-error">error</span>
                  <span>{authError}</span>
                </div>
              )}

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-on-surface" htmlFor="email">
                    {isAdminMode ? 'Admin Email / Username' : 'Institutional Email'}
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                      {isAdminMode ? 'admin_panel_settings' : 'alternate_email'}
                    </span>
                    <input
                      className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-slate-200 placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary"
                      id="email"
                      placeholder={isAdminMode ? 'admin@university.edu or admin' : 'student@university.edu'}
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                  </div>
                  {fieldErrors.email && (
                    <span className="block text-xs text-error">{fieldErrors.email}</span>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="password">
                      Password
                    </label>
                  </div>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                      key
                    </span>
                    <input
                      className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface text-sm border border-slate-200 placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary"
                      id="password"
                      placeholder="••••••••••••"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 text-outline hover:text-on-surface p-1"
                    >
                      <span className="material-symbols-outlined text-lg">
                        {showPassword ? 'visibility_off' : 'visibility'}
                      </span>
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <span className="block text-xs text-error">{fieldErrors.password}</span>
                  )}
                </div>

                <button
                  className={`w-full py-2.5 px-4 rounded-lg text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 ${
                    isAdminMode
                      ? 'bg-rose-600 hover:bg-rose-700 text-white'
                      : 'bg-primary hover:bg-primary-container text-on-primary'
                  }`}
                  type="submit"
                  disabled={isLoading}
                >
                  <span>{isLoading ? 'Authenticating...' : isAdminMode ? 'Sign In as Administrator' : 'Sign In'}</span>
                  <span className="material-symbols-outlined text-base">arrow_forward</span>
                </button>
              </form>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-on-surface-variant">
              <span>Don&apos;t have an account yet?</span>
              <Link href="/register" className="text-primary font-bold hover:underline">
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
