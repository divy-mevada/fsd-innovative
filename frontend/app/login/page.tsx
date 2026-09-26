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
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validate = () => {
    const errors: { email?: string; password?: string } = {};
    if (!email) errors.email = 'Institutional email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Enter a valid campus email address.';

    if (!password) errors.password = 'Campus password is required.';
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
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
            <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container text-on-secondary-container font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              <span>Fall 2025 Portal Live</span>
            </div>
          </div>
          <nav className="flex items-center gap-space-md">
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
      </header>

      {/* Main Glassmorphism Form Container */}
      <main className="w-full pt-16 flex-1 flex flex-col justify-center items-center px-margin-mobile sm:px-margin">
        <div className="flex flex-col w-full relative min-h-[calc(100vh-4rem)] items-center justify-center p-space-md sm:p-space-xl overflow-hidden">
          {/* Background Ambient Glows */}
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-[28rem] h-[28rem] rounded-full bg-surface-tint/15 blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-24 left-1/3 w-80 h-80 rounded-full bg-secondary-fixed-dim/30 blur-[90px] pointer-events-none" />

          <div className="w-full max-w-5xl my-auto rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-surface-container-lowest/80 backdrop-blur-2xl relative z-10 transition-all duration-300">
            {/* Left Column: Platform Branding & Highlights */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary to-primary-container p-space-lg lg:p-space-xl flex flex-col justify-between relative overflow-hidden text-on-primary">
              <div className="absolute -right-16 -top-16 w-56 h-56 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-surface-tint/30 rounded-full blur-xl pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-space-lg">
                <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded-full bg-on-primary/10 backdrop-blur-md text-on-primary font-label-sm text-label-sm tracking-wider uppercase">
                  <span className="material-symbols-outlined text-secondary-container text-sm">verified</span>
                  <span>Official Campus Portal • Shibboleth SSO</span>
                </div>

                <div className="space-y-space-sm">
                  <h2 className="font-headline-lg text-headline-lg tracking-tight font-bold text-on-primary">
                    One Campus ID.<br />Endless Opportunities.
                  </h2>
                  <p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed">
                    Access 84+ chartered student organizations, executive workspaces, verified campus event passes, and annual budget governance.
                  </p>
                </div>

                {/* Testimonial Quote */}
                <div className="p-space-md rounded-xl bg-on-primary/10 backdrop-blur-xl shadow-sm text-on-primary relative">
                  <div className="flex items-center gap-space-sm mb-space-xs">
                    <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center font-bold text-base shadow-sm">
                      AC
                    </div>
                    <div>
                      <div className="font-label-lg text-label-lg font-bold leading-tight">Alex Chen</div>
                      <div className="font-label-sm text-label-sm text-primary-fixed-dim">ACM Chapter Vice President</div>
                    </div>
                  </div>
                  <p className="font-body-sm text-body-sm text-primary-fixed italic">
                    “CampusClub cut our annual hackathon roster verification and SAF funding allocations from 3 weeks down to 10 minutes.”
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-space-sm">
                  <div className="p-space-sm rounded-lg bg-on-primary/5 backdrop-blur-md">
                    <div className="font-headline-sm text-headline-sm font-bold text-on-primary">2,500+</div>
                    <div className="font-label-sm text-label-sm text-primary-fixed-dim">Active Undergrads</div>
                  </div>
                  <div className="p-space-sm rounded-lg bg-on-primary/5 backdrop-blur-md">
                    <div className="font-headline-sm text-headline-sm font-bold text-on-primary">120+</div>
                    <div className="font-label-sm text-label-sm text-primary-fixed-dim">Annual Events</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-space-lg flex items-center justify-between font-label-sm text-label-sm text-primary-fixed-dim border-t border-on-primary/10 mt-6">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary-container text-base">lock</span>
                  <span>FERPA 256-Bit SSL</span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary-container text-base">domain_verification</span>
                  <span>InCommon Federate</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentication Form */}
            <div className="lg:col-span-7 p-space-lg sm:p-space-xl flex flex-col justify-between bg-surface-container-lowest/60 backdrop-blur-xl relative">
              <div>
                {/* Sign In / Register Tab Toggle */}
                <div className="flex items-center justify-between gap-space-sm mb-space-lg">
                  <div className="inline-flex p-1 bg-surface-container rounded-lg">
                    <button
                      type="button"
                      className="px-space-md py-1.5 rounded bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm font-bold transition-all"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      onClick={() => router.push('/register')}
                      className="px-space-md py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-all"
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span>Auth v3.4 Active</span>
                  </div>
                </div>

                {/* SSO Button */}
                <button
                  type="button"
                  onClick={() => {
                    setEmail('student@university.edu');
                    setPassword('SecurePassword123');
                  }}
                  className="w-full flex items-center justify-center gap-space-sm py-space-sm px-space-md rounded-lg bg-surface-container-high hover:bg-surface-container text-on-surface font-label-lg text-label-lg font-bold shadow-sm transition-all duration-150 active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-primary text-xl">shield_lock</span>
                  <span>Quick Demo Sign-In (Auto-Fill Credentials)</span>
                </button>

                <div className="relative my-space-md flex items-center justify-center">
                  <div className="w-full h-px bg-surface-container-high"></div>
                  <span className="absolute bg-surface-container-lowest px-space-sm text-on-surface-variant font-label-sm text-label-sm">
                    or continue with credentials
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
                      Institutional Email
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                        alternate_email
                      </span>
                      <input
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-slate-200 placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                        id="campus-email"
                        placeholder="student@university.edu"
                        type="email"
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
                        Campus Password
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

                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center gap-space-sm cursor-pointer select-none">
                      <input defaultChecked className="w-4 h-4 rounded text-primary focus:ring-secondary accent-primary" type="checkbox" />
                      <span className="font-label-sm text-label-sm text-on-surface-variant">Trust this terminal for 30 days</span>
                    </label>
                    <span className="font-label-sm text-label-sm px-2 py-0.5 rounded bg-surface-container-high text-on-secondary-container">
                      2FA Required
                    </span>
                  </div>

                  <button
                    className="w-full py-3 px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md transition-all duration-150 flex items-center justify-center gap-space-sm group active:scale-[0.99] disabled:opacity-50"
                    type="submit"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? 'Authenticating...' : 'Authenticate to Dashboard'}</span>
                    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </div>

              <div className="mt-space-lg pt-space-md border-t-0 space-y-space-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-xs text-center sm:text-left">
                  <div className="font-label-sm text-label-sm text-on-surface-variant">
                    Don't have an account yet?
                  </div>
                  <Link href="/register" className="font-label-sm text-label-sm text-secondary hover:text-primary font-bold flex items-center gap-0.5">
                    <span>Create Account Now</span>
                    <span className="material-symbols-outlined text-xs">north_east</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
