'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function RegisterPage() {
  const { register, isLoading, error: authError, clearError } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [year, setYear] = useState<number | ''>(1);
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{
    full_name?: string;
    email?: string;
    roll_number?: string;
    password?: string;
  }>({});

  const validate = () => {
    const errors: typeof fieldErrors = {};

    if (!fullName.trim()) errors.full_name = 'Full name is required.';

    if (!email.trim()) errors.email = 'Institutional email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = 'Enter a valid campus email address.';

    if (!rollNumber.trim()) errors.roll_number = 'Campus Roll Number / Student ID is required.';

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters.';
    } else if (!/[A-Za-z]/.test(password) || !/\d/.test(password)) {
      errors.password = 'Password must contain at least one letter and one number.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (!validate()) return;

    try {
      await register({
        full_name: fullName,
        email: email,
        roll_number: rollNumber,
        password: password,
        department: department || undefined,
        year: year ? Number(year) : undefined,
      });
    } catch {
      // Error caught & handled by auth context
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
              <span>Student Registration Live</span>
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
          <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 -right-24 w-[28rem] h-[28rem] rounded-full bg-surface-tint/15 blur-[100px] pointer-events-none" />

          <div className="w-full max-w-5xl my-auto rounded-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-surface-container-lowest/80 backdrop-blur-2xl relative z-10 transition-all duration-300">
            {/* Left Column: Platform Branding & Highlights */}
            <div className="lg:col-span-5 bg-gradient-to-br from-primary via-primary to-primary-container p-space-lg lg:p-space-xl flex flex-col justify-between relative overflow-hidden text-on-primary">
              <div className="relative z-10 flex flex-col gap-space-lg">
                <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded-full bg-on-primary/10 backdrop-blur-md text-on-primary font-label-sm text-label-sm tracking-wider uppercase">
                  <span className="material-symbols-outlined text-secondary-container text-sm">verified</span>
                  <span>Official Student Registration</span>
                </div>

                <div className="space-y-space-sm">
                  <h2 className="font-headline-lg text-headline-lg tracking-tight font-bold text-on-primary">
                    Join CampusClub.<br />Build Your Legacy.
                  </h2>
                  <p className="font-body-md text-body-md text-primary-fixed-dim leading-relaxed">
                    Create your account to join 84+ chartered student organizations, RSVP to campus events, and collaborate on club tasks.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-space-sm mt-4">
                  <div className="p-space-sm rounded-lg bg-on-primary/5 backdrop-blur-md">
                    <div className="font-headline-sm text-headline-sm font-bold text-on-primary">84+</div>
                    <div className="font-label-sm text-label-sm text-primary-fixed-dim">Student Organizations</div>
                  </div>
                  <div className="p-space-sm rounded-lg bg-on-primary/5 backdrop-blur-md">
                    <div className="font-headline-sm text-headline-sm font-bold text-on-primary">100%</div>
                    <div className="font-label-sm text-label-sm text-primary-fixed-dim">Encrypted & Verified</div>
                  </div>
                </div>
              </div>

              <div className="relative z-10 pt-space-lg flex items-center justify-between font-label-sm text-label-sm text-primary-fixed-dim border-t border-on-primary/10 mt-6">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-secondary-container text-base">shield</span>
                  <span>Institutional FERPA Protection</span>
                </div>
              </div>
            </div>

            {/* Right Column: Registration Form */}
            <div className="lg:col-span-7 p-space-lg sm:p-space-xl flex flex-col justify-between bg-surface-container-lowest/60 backdrop-blur-xl relative">
              <div>
                <div className="flex items-center justify-between gap-space-sm mb-space-lg">
                  <div className="inline-flex p-1 bg-surface-container rounded-lg">
                    <button
                      type="button"
                      onClick={() => router.push('/login')}
                      className="px-space-md py-1.5 rounded text-on-surface-variant hover:text-on-surface font-label-lg text-label-lg transition-all"
                    >
                      Sign In
                    </button>
                    <button
                      type="button"
                      className="px-space-md py-1.5 rounded bg-surface-container-lowest text-primary font-label-lg text-label-lg shadow-sm font-bold transition-all"
                    >
                      Create Account
                    </button>
                  </div>
                  <div className="flex items-center gap-space-xs text-secondary font-label-sm text-label-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                    <span>Student Onboarding</span>
                  </div>
                </div>

                {authError && (
                  <div className="mb-4 p-3 rounded-lg bg-error-container text-on-error-container text-xs flex items-center gap-2">
                    <span className="material-symbols-outlined text-base text-error">error</span>
                    <span>{authError}</span>
                  </div>
                )}

                <form className="space-y-space-md" onSubmit={handleSubmit}>
                  <div className="space-y-space-xs">
                    <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="full-name">
                      Full Student Name *
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                        person
                      </span>
                      <input
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-slate-200 placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                        id="full-name"
                        placeholder="Alex Rivera"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    {fieldErrors.full_name && (
                      <span className="block font-label-sm text-label-sm text-error">{fieldErrors.full_name}</span>
                    )}
                  </div>

                  <div className="space-y-space-xs">
                    <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="campus-email">
                      Institutional Email *
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
                    <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="roll-number">
                      Roll Number / Student ID *
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                        badge
                      </span>
                      <input
                        className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-slate-200 placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors uppercase"
                        id="roll-number"
                        placeholder="22BCE104"
                        type="text"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>
                    {fieldErrors.roll_number && (
                      <span className="block font-label-sm text-label-sm text-error">{fieldErrors.roll_number}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div className="space-y-space-xs">
                      <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="dept">
                        Department
                      </label>
                      <input
                        className="w-full px-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-slate-200 placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                        id="dept"
                        placeholder="Computer Science"
                        type="text"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-space-xs">
                      <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="academic-year">
                        Academic Year
                      </label>
                      <select
                        className="w-full px-3 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-slate-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                        id="academic-year"
                        value={year}
                        onChange={(e) => setYear(Number(e.target.value))}
                        disabled={isLoading}
                      >
                        <option value={1}>1st Year (Freshman)</option>
                        <option value={2}>2nd Year (Sophomore)</option>
                        <option value={3}>3rd Year (Junior)</option>
                        <option value={4}>4th Year (Senior)</option>
                        <option value={5}>5th Year / Masters</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-space-xs">
                    <label className="block font-label-md text-label-md font-semibold text-on-surface" htmlFor="campus-password">
                      Campus Password *
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-outline text-lg pointer-events-none">
                        key
                      </span>
                      <input
                        className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-sm text-body-sm shadow-sm border border-slate-200 placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-colors"
                        id="campus-password"
                        placeholder="Min 8 chars (letters & numbers)"
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
                    className="w-full py-3 px-space-md rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg font-bold shadow-md transition-all duration-150 flex items-center justify-center gap-space-sm group active:scale-[0.99] disabled:opacity-50"
                    type="submit"
                    disabled={isLoading}
                  >
                    <span>{isLoading ? 'Creating Account...' : 'Complete Registration'}</span>
                    <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </button>
                </form>
              </div>

              <div className="mt-space-lg pt-space-md border-t-0 space-y-space-sm">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-space-xs text-center sm:text-left">
                  <div className="font-label-sm text-label-sm text-on-surface-variant">
                    Already registered?
                  </div>
                  <Link href="/login" className="font-label-sm text-label-sm text-secondary hover:text-primary font-bold flex items-center gap-0.5">
                    <span>Sign In Instead</span>
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
