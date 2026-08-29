import React, { useState } from 'react';
import { authService, AuthUser } from '../services/supabaseClient';
import { PatternLogo } from '../components/brand/PatternLogo';
import {
  Lock,
  Mail,
  User,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Shield,
  BookOpen,
  Brain,
  Layers,
  LogOut,
  Flame,
  Award
} from 'lucide-react';
import { UserProgress } from '../types';

interface AuthPageProps {
  currentUser: AuthUser | null;
  onAuthSuccess: (user: AuthUser) => void;
  onSignOut: () => void;
  userProgress: UserProgress;
  onNavigate: (tab: string) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({
  currentUser,
  onAuthSuccess,
  onSignOut,
  userProgress,
  onNavigate
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!email || !password) {
      setErrorMsg('Please enter both email and password.');
      return;
    }

    setIsLoading(true);

    try {
      if (mode === 'signin') {
        const { user, error } = await authService.signIn(email, password);
        if (error) {
          setErrorMsg(error);
        } else if (user) {
          setSuccessMsg('Welcome back to PATTERN.');
          onAuthSuccess(user);
        }
      } else {
        const { user, error } = await authService.signUp(email, password, fullName);
        if (error) {
          setErrorMsg(error);
        } else if (user) {
          setSuccessMsg('Account created successfully.');
          onAuthSuccess(user);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected authentication error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    const demoUser = authService.signInDemo('Research Scholar');
    onAuthSuccess(demoUser);
  };

  // If user is already authenticated, show account & progress summary
  if (currentUser) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        {/* Header banner */}
        <div className="editorial-card rounded-3xl p-8 sm:p-10 border border-[#F7F4EE]/10 bg-[#121210] relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none">
            <PatternLogo variant="icon" size="xl" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-[#F7F4EE]/10">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#1C1C18] border border-[#E4572E]/30 flex items-center justify-center text-[#E4572E] font-serif text-2xl font-bold shadow-lg">
                {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F4EE]">
                    {currentUser.fullName || 'Pattern Scholar'}
                  </h1>
                  {currentUser.isDemo && (
                    <span className="px-2.5 py-0.5 rounded-full bg-[#D4A373]/20 border border-[#D4A373]/40 text-[#D4A373] text-[10px] font-mono uppercase font-bold">
                      Guest Scholar
                    </span>
                  )}
                </div>
                <p className="text-xs font-mono text-[#A39D93] mt-1">{currentUser.email}</p>
              </div>
            </div>

            <button
              onClick={onSignOut}
              className="px-4 py-2 rounded-xl bg-[#1C1C18] hover:bg-red-950/40 text-[#A39D93] hover:text-red-300 border border-white/10 hover:border-red-500/30 text-xs font-sans font-semibold transition-all flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>

          {/* Sync Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <div className="p-4 rounded-2xl bg-[#181815] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#A39D93]">Mastery Score</span>
              <div className="font-serif text-2xl font-bold text-[#F7F4EE] flex items-center gap-1.5">
                <span>{userProgress.score}</span>
                <Sparkles className="w-4 h-4 text-[#D4A373]" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#181815] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#A39D93]">Active Streak</span>
              <div className="font-serif text-2xl font-bold text-[#F7F4EE] flex items-center gap-1.5">
                <span>{userProgress.streak} Days</span>
                <Flame className="w-4 h-4 text-[#E4572E]" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#181815] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#A39D93]">Discovered</span>
              <div className="font-serif text-2xl font-bold text-[#F7F4EE]">
                {userProgress.discoveredPatternIds.length} / 18
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#181815] border border-white/5 space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#A39D93]">Bookmarked</span>
              <div className="font-serif text-2xl font-bold text-[#F7F4EE]">
                {userProgress.bookmarkedPatternIds.length} Models
              </div>
            </div>
          </div>
        </div>

        {/* Quick Launchpad */}
        <div className="space-y-4">
          <h2 className="font-serif text-2xl font-bold text-[#F7F4EE]">Continue Your Systems Study</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <button
              onClick={() => onNavigate('scan')}
              className="editorial-card p-6 rounded-2xl text-left hover:border-[#E4572E]/40 group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1C1C18] border border-white/10 flex items-center justify-center text-[#E4572E] group-hover:bg-[#E4572E] group-hover:text-white transition-all">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#F7F4EE]">Groq Vision Scanner</h3>
                <p className="text-xs font-sans text-[#A39D93] mt-1">Upload charts, diagrams, or situations to extract hidden dynamics.</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className="editorial-card p-6 rounded-2xl text-left hover:border-[#E4572E]/40 group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1C1C18] border border-white/10 flex items-center justify-center text-[#D4A373] group-hover:bg-[#D4A373] group-hover:text-black transition-all">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#F7F4EE]">Pattern Library</h3>
                <p className="text-xs font-sans text-[#A39D93] mt-1">Review 18 foundational systemic models with cross-domain examples.</p>
              </div>
            </button>

            <button
              onClick={() => onNavigate('spot')}
              className="editorial-card p-6 rounded-2xl text-left hover:border-[#E4572E]/40 group space-y-3"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1C1C18] border border-white/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#F7F4EE]">Spot the Pattern</h3>
                <p className="text-xs font-sans text-[#A39D93] mt-1">Interactive diagnostics to test and level up your diagnostic intuition.</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If logged out, render the Login / Sign Up Page
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Philosophy column */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1C1C18] border border-white/10 text-xs font-mono text-[#D4A373]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Systems Thinking & Visual Intelligence</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#F7F4EE] leading-tight">
            See what repeats.<br />
            <span className="italic text-[#E4572E]">Understand why.</span><br />
            Predict what comes next.
          </h1>

          <p className="font-sans text-sm md:text-base text-[#A39D93] leading-relaxed max-w-lg">
            PATTERN is an intellectual journal and cognitive diagnostic suite. By creating an account,
            your discovered models, diagnosis history, and Groq-powered vision scans are securely preserved.
          </p>

          <div className="space-y-3.5 pt-2 border-t border-white/10">
            <div className="flex items-center gap-3 text-xs font-sans text-[#F7F4EE]">
              <CheckCircle2 className="w-4 h-4 text-[#E4572E]" />
              <span>Multi-image Groq Vision scanning & interactive systems reasoning</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-sans text-[#F7F4EE]">
              <CheckCircle2 className="w-4 h-4 text-[#E4572E]" />
              <span>Curated library of universal mental models across 7 systemic domains</span>
            </div>
            <div className="flex items-center gap-3 text-xs font-sans text-[#F7F4EE]">
              <CheckCircle2 className="w-4 h-4 text-[#E4572E]" />
              <span>Cloud session sync powered by Supabase</span>
            </div>
          </div>
        </div>

        {/* Right Auth Form column */}
        <div className="lg:col-span-6">
          <div className="editorial-card rounded-3xl p-8 sm:p-10 border border-[#F7F4EE]/15 shadow-2xl bg-[#121210] space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl font-bold text-[#F7F4EE]">
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </h2>
              <p className="text-xs font-sans text-[#A39D93]">
                {mode === 'signin'
                  ? 'Enter your credentials to access your researcher workspace.'
                  : 'Start your study of systemic patterns.'}
              </p>
            </div>

            {/* Mode Switcher */}
            <div className="flex rounded-xl bg-[#1C1C18] p-1 border border-white/5 text-xs font-sans font-medium">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2.5 rounded-lg transition-all ${
                  mode === 'signin'
                    ? 'bg-[#242420] text-[#F7F4EE] shadow-sm font-bold'
                    : 'text-[#A39D93] hover:text-[#F7F4EE]'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('signup');
                  setErrorMsg(null);
                }}
                className={`flex-1 py-2.5 rounded-lg transition-all ${
                  mode === 'signup'
                    ? 'bg-[#242420] text-[#F7F4EE] shadow-sm font-bold'
                    : 'text-[#A39D93] hover:text-[#F7F4EE]'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Feedback Alerts */}
            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-sans flex items-start gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-sans flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[#A39D93] uppercase tracking-wider text-[11px] font-semibold">Your Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6E685F]" />
                    <input
                      type="text"
                      value={fullName}
                      onChange={e => setFullName(e.target.value)}
                      placeholder="E.g. Carl Sagan"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#181815] border border-white/10 text-sm text-[#F7F4EE] placeholder-[#6E685F] focus:outline-none focus:border-[#E4572E] transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[#A39D93] uppercase tracking-wider text-[11px] font-semibold">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6E685F]" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="scholar@pattern.org"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#181815] border border-white/10 text-sm text-[#F7F4EE] placeholder-[#6E685F] focus:outline-none focus:border-[#E4572E] transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[#A39D93] uppercase tracking-wider text-[11px] font-semibold">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6E685F]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-xl bg-[#181815] border border-white/10 text-sm text-[#F7F4EE] placeholder-[#6E685F] focus:outline-none focus:border-[#E4572E] transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-[#6E685F] hover:text-[#A39D93] p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-[#E4572E] hover:bg-[#F26522] text-white font-sans font-bold text-sm transition-all shadow-lg hover:shadow-orange-950/50 flex items-center justify-center gap-2 mt-2"
              >
                <span>{isLoading ? 'Verifying...' : (mode === 'signin' ? 'Sign In to Workspace' : 'Create Researcher Account')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink mx-4 text-[11px] font-mono text-[#6E685F] uppercase">Instant exploration</span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <button
              type="button"
              onClick={handleDemoSignIn}
              className="w-full py-3 rounded-xl bg-[#1C1C18] hover:bg-[#242420] border border-white/10 text-[#F7F4EE] text-xs font-sans font-semibold transition-all flex items-center justify-center gap-2 text-center"
            >
              <Sparkles className="w-4 h-4 text-[#D4A373]" />
              <span>Explore as Guest Researcher (One-Click)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
