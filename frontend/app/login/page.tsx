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
    if (!email) errors.email = 'Institutional email or username is required.';
    if (!password) errors.password = 'Campus password is required.';
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
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen flex flex-col justify-between">
      {/* Fixed Top Header */}
      <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 w-full px-margin flex items-center justify-between">
          <div className="flex items-center gap-space-md cursor-pointer" onClick={() => router.push('/')}>
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary">
              <span className="material-symbols-outlined text-xl">school</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-primary tracking-tight font-bold">
              CampusClub
            </span>
          </div>

          <div className="flex items-center gap-space-md">
            {/* Direct Admin Login Button in Header */}
            <button
              type="button"
              onClick={fillAdminCredentials}
              className="px-space-md py-1.5 rounded-lg bg-rose-100 text-rose-800 border border-rose-300 hover:bg-rose-200 font-label-md text-label-md font-extrabold transition-all flex items-center gap-1 shadow-xs"
            >
              <span className="material-symbols-outlined text-base">admin_panel_settings</span>
              <span>Admin Portal Login</span>
            </button>

            <nav className="hidden sm:flex items-center gap-space-md">
              <Link href="/" className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors">
                Home
              </Link>
              <Link href="/clubs" className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors">
                Explore Clubs
              </Link>
              <Link href="/events" className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors">
                Events
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Glassmorphism Form Container */}
      <main className="w-full pt-16 flex-1 flex flex-col justify-center items-center px-margin-mobile sm:px-margin">
        <div className="flex flex-col w-full relative min-h-[calc(100vh-4rem)] items-center justify-center p-space-md sm:p-space-xl overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-[28rem] h-[28rem] rounded-full bg-surface-tint/15 blur-[100px] pointer-events-none" />

          <div className="w-full max-w-5xl my-auto rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-surface-container-lowest/80 backdrop-blur-2xl relative z-10 transition-all duration-300">
            {/* Left Column: Platform Branding & Highlights */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary to-primary-container p-space-lg lg:p-space-xl flex flex-col justify-between relative overflow-hidden text-on-primary">
              <div className="relative z-10 flex flex-col gap-space-lg">
                <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded-full bg-on-primary/10 backdrop-blur-md text-on-primary font-label-sm text-label-sm tracking-wider uppercase">
                  <span className="material-symbols-outlined text-secondary-container text-sm">
                    {isAdminMode ? 'admin_panel_settings' : 'verified'}
                  </span>
                  <span>{isAdminMode ? 'Administrator Governance Mode' : 'Official Campus Portal • Shibboleth SSO'}</span>
                </div>

                <div className="space-y-space-sm">
                  <h2 className="font-headline-lg text-headline-lg tracking-tight font-bold text-on-primary">
                    {isAdminMode ? 'Admin & Executive Governance' : 'One Campus ID.\nEndless Opportunities.'}
                  </h2>
                  <p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed">
                    {isAdminMode
                      ? 'Access the university administration panel to charter new clubs, approve budgets, and oversee campus event rosters.'
                      : 'Access 84+ chartered student organizations, executive workspaces, verified campus event passes, and annual budget governance.'}
                  </p>
                </div>

                {/* Test Credentials Box */}
                <div className="p-space-md rounded-xl bg-on-primary/10 backdrop-blur-xl shadow-sm text-on-primary relative border border-on-primary/15 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-secondary-container flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">key</span>
                      <span>{isAdminMode ? 'Test Admin Credentials' : 'Test Student Credentials'}</span>
                    </span>
                    <button
                      type="button"
                      onClick={isAdminMode ? fillStudentCredentials : fillAdminCredentials}
                      className="text-[11px] font-bold text-primary-fixed hover:underline"
                    >
                      {isAdminMode ? 'Switch to Student Credentials' : 'Switch to Admin Credentials'}
                    </button>
                  </div>
                  <div className="font-mono text-xs text-primary-fixed space-y-0.5 bg-black/20 p-2 rounded">
                    <div>Email: <strong className="text-white">{isAdminMode ? 'admin@university.edu' : 'student@university.edu'}</strong></div>
                    <div>Password: <strong className="text-white">{isAdminMode ? 'AdminSecret123' : 'SecurePassword123'}</strong></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="p-space-sm rounded-lg bg-on-primary/5 backdrop-blur-md">
                    <div className="font-headline-sm text-headline-sm font-bold text-on-primary">84+</div>
                    <div className="font-label-sm text-label-sm text-primary-fixed-dim">Chartered Clubs</div>
                  </div>
                  <div className="p-space-sm rounded-lg bg-on-primary/5 backdrop-blur-md">
                    <div className="font-headline-sm text-headline-sm font-bold text-on-primary">2,500+</div>
                    <div className="font-label-sm text-label-sm text-primary-fixed-dim">Active Undergrads</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-space-lg flex items-center justify-between font-label-sm text-label-sm text-primary-fixed-dim border-t border-on-primary/10 mt-6">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary-container text-base">lock</span>
                  <span>FERPA 256-Bit SSL Encrypted</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentication Form */}
            <div className="lg:col-span-7 p-space-lg sm:p-space-xl flex flex-col justify-between bg-surface-container-lowest/60 backdrop-blur-xl relative">
              <div>
                {/* Mode Selector Tabs */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-sm mb-space-lg">
                  <div className="inline-flex p-1 bg-surface-container rounded-lg">
                    <button
                      type="button"
                      onClick={() => setIsAdminMode(false)}
                      className={`px-space-md py-1.5 rounded font-label-lg text-label-lg transition-all ${
                        !isAdminMode
                          ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                          : 'text-on-surface-variant hover:text-on-surface'
                      }`}
                    >
                      Student Login
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsAdminMode(true)}
                      className={`px-space-md py-1.5 rounded font-label-lg text-label-lg transition-all flex items-center gap-1 ${
                        isAdminMode
                          ? 'bg-rose-600 text-white font-bold shadow-sm'
                          : 'text-rose-700 hover:text-rose-900 font-semibold'
                      }`}
                    >
                      <span className="material-symbols-outlined text-base">admin_panel_settings</span>
                      <span>Admin Sign In</span>
                    </button>
                  </div>

                  <Link href="/register" className="font-label-sm text-label-sm text-secondary hover:text-primary font-bold">
                    Create Account
                  </Link>
                </div>

                {/* Admin Quick Sign-In Button */}
                <button
                  type="button"
                  onClick={fillAdminCredentials}
                  className={`w-full flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded-lg font-label-lg text-label-lg font-bold shadow-sm transition-all duration-150 active:scale-[0.99] ${
                    isAdminMode
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-surface-container-high hover:bg-surface-container text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-rose-700 text-xl">admin_panel_settings</span>
                  <span>{isAdminMode ? 'Auto-Fill Test Admin Credentials' : 'Login as Administrator (Auto-Fill Admin Creds)'}</span>
                </button>

                <div className="relative my-space-md flex items-center justify-center">
                  <div className="w-full h-px bg-surface-container-high"></div>
                  <span className="absolute bg-surface-container-lowest px-space-sm text-on-surface-variant font-label-sm text-label-sm">
                    {isAdminMode ? 'or enter admin credentials manually' : 'or enter student credentials'}
                  </span>
                </div>

                {/* Auth Error Banner */}
                {authError && (
                  <div className="mb-4 p-3 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-error">error</span>
                    <span>{authError}</span>
                  </div>
                )}

                <form className="space-y-space-md" onSubmit={handleSubmit}>
                  <div className="space-y-space-xs">
                    <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="campus-email">
                      {isAdminMode ? 'Admin Email / Username' : 'Institutional Email'}
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                        {isAdminMode ? 'admin_panel_settings' : 'alternate_email'}
                      </span>
                      <input
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-slate-200 placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                        id="campus-email"
                        placeholder={isAdminMode ? 'admin@university.edu or admin' : 'student@university.edu'}
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    {fieldErrors.email && (
                      <span className="block font-label-sm text-label-sm text-error">{fieldErrors.email}</span>
                    )}
                  </div>

                  <div className="space-y-space-xs">
                    <div className="flex items-center justify-between">
                      <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="campus-password">
                        Password
                      </label>
                      <a className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors font-semibold" href="#">
                        Forgot password?
                      </a>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                        key
                      </span>
                      <input
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-slate-200 placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                        id="campus-password"
                        placeholder="••••••••••••"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 text-outline hover:text-on-surface transition-colors p-1"
                      >
                        <span className="material-symbols-outlined text-lg">
                          {showPassword ? 'visibility_off' : 'visibility'}
                        </span>
                      </button>
                    </div>
                    {fieldErrors.password && (
                      <span className="block font-label-sm text-label-sm text-error">{fieldErrors.password}</span>
                    )}
                  </div>

                  <button
                    className={`w-full py-3 px-space-md rounded-lg font-label-lg text-label-lg font-bold shadow-md transition-all duration-150 flex items-center justify-center gap-space-sm group active:scale-[0.99] disabled:opacity-50 ${
                      isAdminMode
                        ? 'bg-rose-700 hover:bg-rose-800 text-white'
                        : 'bg-primary hover:bg-primary-container text-on-primary'
                    }`}
                    type="submit"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? 'Authenticating...' : isAdminMode ? 'Authenticate to Admin Control Center' : 'Authenticate to Dashboard'}</span>
                    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </div>

              <div className="mt-space-lg pt-space-md border-t-0 space-y-space-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-xs text-center sm:text-left">
                  <div className="font-label-sm text-label-sm text-on-surface-variant">
                    {isAdminMode ? 'Need student access?' : "Don't have an account yet?"}
                  </div>
                  {isAdminMode ? (
                    <button
                      type="button"
                      onClick={fillStudentCredentials}
                      className="font-label-sm text-label-sm text-secondary hover:text-primary font-bold"
                    >
                      Switch to Student Login
                    </button>
                  ) : (
                    <Link href="/register" className="font-label-sm text-label-sm text-secondary hover:text-primary font-bold flex items-center gap-0.5">
                      <span>Create Account Now</span>
                      <span className="material-symbols-outlined text-xs">north_east</span>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
