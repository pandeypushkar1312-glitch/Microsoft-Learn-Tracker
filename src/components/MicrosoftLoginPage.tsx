import React, { useState, useEffect } from 'react';
import { AppTheme } from '../types';
import { playTactileClick } from '../utils/sound';
import {
  ShieldCheck,
  KeyRound,
  ArrowRight,
  Sparkles,
  Lock,
  Globe,
  HelpCircle,
  Laptop,
  X,
  User,
  UserCheck
} from 'lucide-react';
import { MicrosoftLogoMinion } from './MicrosoftLogoMinion';

export interface MicrosoftUser {
  name: string;
  email: string;
  tenant: string;
  avatarUrl?: string;
  signedInAt: string;
  displayName?: string;
  isGuest?: boolean;
}

interface MicrosoftLoginModalProps {
  isOpen: boolean;
  onLogin: (user: MicrosoftUser) => void;
  onClose?: () => void;
  theme?: AppTheme;
}

export const MicrosoftLoginPage: React.FC<MicrosoftLoginModalProps> = ({
  isOpen,
  onLogin,
  onClose,
  theme = 'light',
}) => {
  const [step, setStep] = useState<'email' | 'password' | 'authenticating'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isEmailFocused, setIsEmailFocused] = useState(true);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  // Reset fields when opened
  useEffect(() => {
    if (isOpen) {
      setStep('email');
      setPassword('');
      setError('');
      setIsEmailFocused(true);
      setIsPasswordFocused(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const isLight = theme === 'light';

  const isEmailActive = step === 'email' || isEmailFocused;
  const isPasswordActive = step === 'password' || isPasswordFocused;
  const isAuthenticating = step === 'authenticating';

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    setError('');

    if (!email.trim()) {
      setError('Please enter a valid Microsoft, live, or organizational email address.');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setStep('password');
    setIsPasswordFocused(true);
    setIsEmailFocused(false);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playTactileClick();
    setError('');

    if (!password.trim()) {
      setError('Please enter your Microsoft account password.');
      return;
    }

    setStep('authenticating');

    // Smooth Microsoft auth handshake animation
    setTimeout(() => {
      // Derive a friendly display name from the email
      const username = email.split('@')[0];
      const formattedName = username
        .replace(/[._-]/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const user: MicrosoftUser = {
        name: formattedName || 'Microsoft Learner',
        displayName: formattedName || 'Microsoft Learner',
        email: email.trim(),
        tenant: email.endsWith('@microsoft.com') ? 'Microsoft Corporate' : 'Microsoft Cloud Services',
        signedInAt: new Date().toISOString(),
        isGuest: false,
      };

      onLogin(user);
    }, 1200);
  };

  const handleGuestLogin = () => {
    playTactileClick();
    setEmail('guest.learner@microsoft.com');
    setStep('authenticating');

    setTimeout(() => {
      const guestUser: MicrosoftUser = {
        name: 'Guest Learner',
        displayName: 'Guest Learner',
        email: 'guest@microsoft-learn.local',
        tenant: 'Guest Sandbox Session',
        signedInAt: new Date().toISOString(),
        isGuest: true,
      };
      onLogin(guestUser);
    }, 800);
  };

  const handleQuickDemoLogin = (emailPreset: string, namePreset: string) => {
    playTactileClick();
    setEmail(emailPreset);
    setPassword('••••••••••••');
    setStep('authenticating');

    setTimeout(() => {
      onLogin({
        name: namePreset,
        displayName: namePreset,
        email: emailPreset,
        tenant: 'Microsoft Learn Student & Pro Tenant',
        signedInAt: new Date().toISOString(),
        isGuest: false,
      });
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md transition-all duration-300 overflow-y-auto">
      {/* Background Decorative Microsoft Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00A4EF]/20 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-[#7FBA00]/20 blur-3xl pointer-events-none" />

      {/* Main Authentication Card */}
      <div
        className={`relative w-full max-w-[480px] rounded-2xl shadow-2xl overflow-hidden border p-7 sm:p-9 transition-all ${
          isLight
            ? 'bg-white/95 text-slate-900 border-slate-200/80 shadow-2xl shadow-slate-900/20'
            : theme === 'matrix'
            ? 'bg-neutral-950/95 text-slate-100 border-emerald-900/50 shadow-2xl shadow-emerald-950/40'
            : 'bg-slate-900/95 text-slate-100 border-slate-700/60 shadow-2xl shadow-black/40'
        }`}
      >
        {/* Optional Close Button */}
        {onClose && (
          <button
            type="button"
            onClick={() => {
              playTactileClick();
              onClose();
            }}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Dismiss / Continue as Guest"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Authentic Microsoft 4-Color Tile Logo Header + 3 Matching Cute Minions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="grid grid-cols-2 gap-1 w-7 h-7 flex-shrink-0">
              <div className="w-3 h-3 rounded-[1px] bg-[#F25022]" />
              <div className="w-3 h-3 rounded-[1px] bg-[#7FBA00]" />
              <div className="w-3 h-3 rounded-[1px] bg-[#00A4EF]" />
              <div className="w-3 h-3 rounded-[1px] bg-[#FFB900]" />
            </div>
            <span className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-800 dark:text-white font-sans">
              Microsoft
            </span>
          </div>

          {/* 3 Cute Minions (Freely standing with no bounding box or border) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Minion 1 (Kevin / Two-Eyes - Red Accent) */}
            <MicrosoftLogoMinion
              id="m1"
              variant="two-eyes"
              colorAccent="#F25022"
              isEmailActive={isEmailActive}
              isPasswordActive={isPasswordActive}
              isAuthenticating={isAuthenticating}
            />
            {/* Minion 2 (Stuart / One-Eye Cyclops - Green Accent) */}
            <MicrosoftLogoMinion
              id="m2"
              variant="one-eye"
              colorAccent="#7FBA00"
              isEmailActive={isEmailActive}
              isPasswordActive={isPasswordActive}
              isAuthenticating={isAuthenticating}
            />
            {/* Minion 3 (Bob / Two-Eyes - Blue Accent) */}
            <MicrosoftLogoMinion
              id="m3"
              variant="two-eyes"
              colorAccent="#00A4EF"
              isEmailActive={isEmailActive}
              isPasswordActive={isPasswordActive}
              isAuthenticating={isAuthenticating}
            />
          </div>
        </div>

        {/* Step 1: Email Form */}
        {step === 'email' && (
          <form onSubmit={handleNextStep} className="space-y-5">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-1 text-slate-900 dark:text-white">
                Sign in
              </h1>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                to continue to Microsoft Learn & Certification Engine
              </p>
            </div>

            {error && (
              <div className="p-3 text-xs rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <input
                type="email"
                required
                autoFocus
                value={email}
                onFocus={() => setIsEmailFocused(true)}
                onBlur={() => setIsEmailFocused(false)}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email, phone, or Skype"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none transition-all duration-200 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#0078D4] focus:ring-2 focus:ring-[#0078D4]/20'
                    : 'bg-slate-800/80 border-slate-700 text-white focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                }`}
              />
            </div>

            <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>No account? <a href="https://signup.live.com" target="_blank" rel="noreferrer" className="text-[#0078D4] dark:text-blue-400 hover:underline">Create one!</a></span>
              <a href="https://support.microsoft.com/account-billing" target="_blank" rel="noreferrer" className="text-[#0078D4] dark:text-blue-400 hover:underline">
                Sign-in help
              </a>
            </div>

            {/* Quick Demo & Guest Instant Logins */}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400 tracking-wider uppercase">
                  Fast Access Options:
                </span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                  No password needed
                </span>
              </div>

              {/* Prominent Guest Login Card */}
              <button
                type="button"
                onClick={handleGuestLogin}
                className="w-full flex items-center justify-between p-2.5 rounded-xl border border-emerald-500/40 bg-emerald-50/70 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 transition-all text-left cursor-pointer group shadow-xs hover:scale-[1.01] active:scale-[0.99]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 dark:bg-emerald-500/30 border border-emerald-500/40 flex items-center justify-center text-emerald-600 dark:text-emerald-300 group-hover:scale-110 transition-transform">
                    <UserCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>Continue as Guest</span>
                      <span className="px-1.5 py-0.2 rounded text-[9.5px] font-mono bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold">
                        Instant
                      </span>
                    </div>
                    <div className="text-[10.5px] text-slate-600 dark:text-slate-400">
                      Explore all certification tracks without an account
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('learner.pro@microsoft.com', 'Azure Architect Pro')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 text-slate-700 dark:text-slate-300 transition-all text-center cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Azure Architect</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDemoLogin('student@azurelearn.edu', 'Student Learner')}
                  className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-slate-200 dark:border-slate-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 text-slate-700 dark:text-slate-300 transition-all text-center cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                  <span>Student Demo</span>
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={handleGuestLogin}
                className="px-3.5 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <User className="w-3.5 h-3.5" />
                <span>Guest Mode</span>
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0078D4] hover:bg-[#106EBE] active:scale-[0.98] rounded-lg shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* Step 2: Password Form */}
        {step === 'password' && (
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-600 dark:text-slate-400 truncate max-w-[260px]">
                  {email}
                </span>
                <button
                  type="button"
                  onClick={() => { setStep('email'); setPassword(''); setIsEmailFocused(true); setIsPasswordFocused(false); }}
                  className="text-xs text-[#0078D4] dark:text-blue-400 hover:underline cursor-pointer"
                >
                  Change
                </button>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Enter password
              </h1>
            </div>

            {error && (
              <div className="p-3 text-xs rounded-lg bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 font-medium">
                {error}
              </div>
            )}

            <div className="space-y-1">
              <input
                type="password"
                required
                autoFocus
                value={password}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`w-full px-3.5 py-2.5 text-sm rounded-lg border outline-none transition-all duration-200 ${
                  isLight
                    ? 'bg-slate-50 border-slate-300 text-slate-900 focus:bg-white focus:border-[#0078D4] focus:ring-2 focus:ring-[#0078D4]/20'
                    : 'bg-slate-800/80 border-slate-700 text-white focus:bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20'
                }`}
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 cursor-pointer select-none text-slate-600 dark:text-slate-400">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-[#0078D4] focus:ring-[#0078D4]"
                />
                <span>Keep me signed in</span>
              </label>
              <a href="#" onClick={(e) => { e.preventDefault(); setPassword('DemoPass123!'); }} className="text-[#0078D4] dark:text-blue-400 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4">
              <button
                type="button"
                onClick={() => { setStep('email'); setIsEmailFocused(true); setIsPasswordFocused(false); }}
                className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-[#0078D4] hover:bg-[#106EBE] active:scale-[0.98] rounded-lg shadow-md shadow-blue-500/20 flex items-center gap-2 transition-all cursor-pointer"
              >
                <Lock className="w-4 h-4" />
                <span>Sign in</span>
              </button>
            </div>
          </form>
        )}

        {/* Step 3: Authenticating State */}
        {step === 'authenticating' && (
          <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <div className="w-14 h-14 border-4 border-[#0078D4]/30 border-t-[#0078D4] rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
                  <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#F25022]" />
                  <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#7FBA00]" />
                  <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#00A4EF]" />
                  <div className="w-1.5 h-1.5 rounded-[0.5px] bg-[#FFB900]" />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Connecting to Microsoft Security...
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                Authenticating session for {email || 'Microsoft Account'}
              </p>
            </div>
          </div>
        )}

        {/* Microsoft Security Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            <span>Microsoft Entra ID Protected</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://privacy.microsoft.com" target="_blank" rel="noreferrer" className="hover:underline">Privacy</a>
            <a href="https://www.microsoft.com/legal" target="_blank" rel="noreferrer" className="hover:underline">Terms</a>
          </div>
        </div>
      </div>
    </div>
  );
};

