import React, { useState } from 'react';
import { UserProgress } from '../../types';
import { PatternLogo } from '../brand/PatternLogo';
import { AuthUser } from '../../services/supabaseClient';
import {
  Compass,
  Share2,
  Target,
  Cpu,
  BookOpen,
  Award,
  Search,
  Menu,
  X,
  Flame,
  Zap,
  ArrowRight,
  Eye,
  User as UserIcon,
  LogOut,
  Sparkles,
  LogIn
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, extraId?: string) => void;
  userProgress: UserProgress;
  onOpenSearch: () => void;
  currentUser: AuthUser | null;
  onOpenAuth: () => void;
  onSignOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  userProgress,
  onOpenSearch,
  currentUser,
  onOpenAuth,
  onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navLinks = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'scan', label: 'Vision AI', icon: Eye },
    { id: 'map', label: 'Pattern Map', icon: Share2 },
    { id: 'spot', label: 'Spot Pattern', icon: Target },
    { id: 'analyze', label: 'Analyzer', icon: Cpu },
    { id: 'cases', label: 'Case Studies', icon: BookOpen },
    { id: 'progress', label: 'My Progress', icon: Award }
  ];

  const handleNav = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090908]/90 backdrop-blur-xl border-b border-[#F7F4EE]/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <PatternLogo
            variant="horizontal"
            size="md"
            animated={true}
            onClick={() => handleNav('home')}
          />

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#1C1C18] text-[#F7F4EE] shadow-inner border border-white/10'
                      : 'text-[#A39D93] hover:text-[#F7F4EE] hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#E4572E]' : ''}`} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Tools & Auth */}
        <div className="flex items-center gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#121210] hover:bg-[#1C1C18] border border-white/10 text-[#A39D93] hover:text-[#F7F4EE] text-xs font-sans transition-all group"
            title="Search patterns & cases (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 group-hover:text-[#E4572E] transition-colors" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded text-white/50">
              ⌘K
            </kbd>
          </button>

          {/* User Score & Streak Stats Pill */}
          <button
            onClick={() => handleNav('progress')}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#121210] border border-white/10 hover:border-[#E4572E]/50 text-xs font-sans transition-all group"
          >
            <div className="flex items-center gap-1 text-[#E4572E]" title="Active Streak">
              <Flame className="w-3.5 h-3.5 fill-[#E4572E]" />
              <span className="font-bold">{userProgress.streak}d</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1 text-[#F7F4EE]" title="Mastery Score">
              <Zap className="w-3.5 h-3.5 text-[#D4A373]" />
              <span className="font-semibold">{userProgress.score}</span>
            </div>
          </button>

          {/* Auth Button or User Profile Dropdown */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-[#181815] border border-[#E4572E]/30 hover:border-[#E4572E] text-xs font-sans transition-all"
              >
                <div className="w-6 h-6 rounded-full bg-[#E4572E]/20 text-[#E4572E] flex items-center justify-center font-bold text-xs">
                  {currentUser.fullName ? currentUser.fullName[0].toUpperCase() : currentUser.email[0].toUpperCase()}
                </div>
                <span className="hidden md:inline max-w-[100px] truncate text-[#F7F4EE] font-medium">
                  {currentUser.fullName || currentUser.email.split('@')[0]}
                </span>
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#121210] border border-white/15 rounded-2xl p-2 shadow-2xl z-50 text-xs font-sans animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-3 border-b border-white/5 mb-1">
                    <p className="font-semibold text-[#F7F4EE] truncate">{currentUser.fullName || 'Researcher'}</p>
                    <p className="text-[11px] font-mono text-[#A39D93] truncate">{currentUser.email}</p>
                    {currentUser.isDemo && (
                      <span className="inline-block mt-1 px-2 py-0.5 rounded bg-[#D4A373]/20 text-[#D4A373] text-[10px] font-mono">
                        Guest Mode
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleNav('auth')}
                    className="w-full text-left px-3 py-2 rounded-xl text-[#F7F4EE] hover:bg-white/5 flex items-center gap-2 transition-colors"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#A39D93]" />
                    <span>Account & Sync</span>
                  </button>

                  <button
                    onClick={() => handleNav('progress')}
                    className="w-full text-left px-3 py-2 rounded-xl text-[#F7F4EE] hover:bg-white/5 flex items-center gap-2 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-[#D4A373]" />
                    <span>My Progress ({userProgress.score} pts)</span>
                  </button>

                  <div className="my-1 border-t border-white/5" />

                  <button
                    onClick={() => {
                      onSignOut();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-red-400 hover:bg-red-950/30 flex items-center gap-2 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl bg-[#E4572E] hover:bg-[#F26522] text-white font-sans font-bold text-xs transition-all flex items-center gap-1.5 shadow-md shadow-orange-950/40"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In</span>
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#F7F4EE]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0F0F0D] border-b border-white/10 px-4 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full px-4 py-3 rounded-xl text-left text-sm font-sans flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#1C1C18] text-[#E4572E] border border-[#E4572E]/30 font-bold'
                      : 'text-[#A39D93] hover:text-[#F7F4EE] hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </button>
              );
            })}

            {!currentUser && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAuth();
                }}
                className="w-full mt-2 px-4 py-3 rounded-xl bg-[#E4572E] text-white font-sans font-bold text-sm flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In / Create Account</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
