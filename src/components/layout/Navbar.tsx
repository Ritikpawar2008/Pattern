import React, { useState } from 'react';
import { UserProgress } from '../../types';
import { PatternLogo } from '../brand/PatternLogo';
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
  Eye
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onNavigate: (tab: string, extraId?: string) => void;
  userProgress: UserProgress;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  userProgress,
  onOpenSearch
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'explore', label: 'Explore', icon: Compass },
    { id: 'scan', label: 'Scan', icon: Eye },
    { id: 'map', label: 'Pattern Map', icon: Share2 },
    { id: 'spot', label: 'Spot the Pattern', icon: Target },
    { id: 'analyze', label: 'Situation Analyzer', icon: Cpu },
    { id: 'cases', label: 'Case Studies', icon: BookOpen },
    { id: 'progress', label: 'My Progress', icon: Award }
  ];

  const handleNav = (tabId: string) => {
    onNavigate(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#050505]/85 backdrop-blur-xl border-b border-white/[0.07] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
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
                className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-white/10 text-[#F1EBE6] shadow-inner border border-white/10'
                    : 'text-[#8A8582] hover:text-[#F1EBE6] hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#F26522]' : ''}`} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Tools & Progress Pill */}
        <div className="flex items-center gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111] hover:bg-[#1A1A1A] border border-white/10 text-[#8A8582] hover:text-[#F1EBE6] text-xs font-mono transition-all group"
            title="Search patterns & cases (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 group-hover:text-[#F26522] transition-colors" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] bg-white/5 border border-white/10 rounded text-white/50">
              ⌘K
            </kbd>
          </button>

          {/* User Score & Streak Stats Pill */}
          <button
            onClick={() => handleNav('progress')}
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-[#111] border border-white/10 hover:border-[#F26522]/50 text-xs font-mono transition-all group"
          >
            <div className="flex items-center gap-1 text-[#F26522]" title="Current Streak">
              <Flame className="w-3.5 h-3.5 fill-[#F26522]" />
              <span className="font-bold">{userProgress.streak}d</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <div className="flex items-center gap-1 text-[#F1EBE6]" title="Pattern Score">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">{userProgress.score}</span>
            </div>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#F1EBE6]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B0B0B] border-b border-white/10 px-4 py-6 animate-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = currentTab === link.id;

              return (
                <button
                  key={link.id}
                  onClick={() => handleNav(link.id)}
                  className={`w-full px-4 py-3 rounded-xl text-left text-sm font-mono flex items-center justify-between transition-all ${
                    isActive
                      ? 'bg-[#F26522]/15 text-[#F26522] border border-[#F26522]/30 font-semibold'
                      : 'text-[#8A8582] hover:text-[#F1EBE6] hover:bg-white/5'
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
          </div>
        </div>
      )}
    </header>
  );
};
