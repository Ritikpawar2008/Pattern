import React, { useState } from 'react';
import { authService, AuthUser } from '../../services/supabaseClient';
import { PatternLogo } from '../brand/PatternLogo';
import { X, Lock, Mail, User, ArrowRight, Sparkles, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: AuthUser) => void;
  initialMode?: 'signin' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onAuthSuccess,
  initialMode = 'signin'
}) => {
  const [mode, setMode] = useState<'signin' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

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
          setTimeout(() => {
            onAuthSuccess(user);
            onClose();
          }, 600);
        }
      } else {
        const { user, error } = await authService.signUp(email, password, fullName);
        if (error) {
          setErrorMsg(error);
        } else if (user) {
          setSuccessMsg('Account created successfully.');
          setTimeout(() => {
            onAuthSuccess(user);
            onClose();
          }, 600);
        }
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    const demoUser = authService.signInDemo('Research Scholar');
    setSuccessMsg('Signed in as Guest Researcher.');
    setTimeout(() => {
      onAuthSuccess(demoUser);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-[#121210] border border-[#F7F4EE]/15 rounded-3xl p-8 shadow-2xl space-y-6 text-[#F7F4EE]"
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/10 text-[#A39D93] hover:text-[#F7F4EE] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center space-y-3 pt-2">
          <div className="flex justify-center">
            <PatternLogo variant="icon" size="lg" />
          </div>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#F7F4EE]">
            {mode === 'signin' ? 'Welcome to PATTERN' : 'Begin Your Study'}
          </h2>
          <p className="text-xs font-sans text-[#A39D93] max-w-xs mx-auto leading-relaxed">
            {mode === 'signin'
              ? 'Access your saved mental models, analysis journals, and diagnostic insights.'
              : 'Create an account to track your systems thinking mastery and cloud sync.'}
          </p>
        </div>

        {/* Mode Toggle Tabs */}
        <div className="flex rounded-xl bg-[#1C1C18] p-1 border border-white/5 text-xs font-sans font-medium">
          <button
            type="button"
            onClick={() => {
              setMode('signin');
              setErrorMsg(null);
            }}
            className={`flex-1 py-2 rounded-lg transition-all ${
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
            className={`flex-1 py-2 rounded-lg transition-all ${
              mode === 'signup'
                ? 'bg-[#242420] text-[#F7F4EE] shadow-sm font-bold'
                : 'text-[#A39D93] hover:text-[#F7F4EE]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Feedback Alerts */}
        {errorMsg && (
          <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-sans flex items-start gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs font-sans flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-4 font-sans text-xs">
          {mode === 'signup' && (
            <div className="space-y-1.5">
              <label className="text-[#A39D93] uppercase tracking-wider text-[11px] font-semibold">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-3.5 text-[#6E685F]" />
                <input
                  type="text"
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="E.g. Leonardo da Vinci"
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
            <span>{isLoading ? 'Processing...' : (mode === 'signin' ? 'Sign In to Workspace' : 'Create Account')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative flex py-1 items-center">
          <div className="flex-grow border-t border-white/10"></div>
          <span className="flex-shrink mx-4 text-[11px] font-mono text-[#6E685F] uppercase">or explore instantly</span>
          <div className="flex-grow border-t border-white/10"></div>
        </div>

        {/* One Click Demo Guest Access */}
        <button
          type="button"
          onClick={handleDemoSignIn}
          className="w-full py-3 rounded-xl bg-[#1C1C18] hover:bg-[#242420] border border-white/10 text-[#F7F4EE] text-xs font-sans font-semibold transition-all flex items-center justify-center gap-2 text-center"
        >
          <Sparkles className="w-4 h-4 text-[#D4A373]" />
          <span>Continue as Guest Researcher (Instant Access)</span>
        </button>

        {/* Footer Note */}
        <p className="text-[11px] font-sans text-center text-[#6E685F]">
          Protected by Supabase Authentication. Your data is encrypted and private.
        </p>
      </div>
    </div>
  );
};
