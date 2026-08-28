import React from 'react';
import { CATEGORIES } from '../../data/categories';
import { PatternLogo } from '../brand/PatternLogo';
import { Sparkles, ArrowUpRight, Shield, Terminal } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, extraId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#050505] border-t border-white/[0.08] pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#F26522]/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Large Editorial Statement */}
        <div className="pb-12 border-b border-white/[0.08] flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#F26522]" />
              <span className="text-xs font-mono text-[#F26522] tracking-widest uppercase font-semibold">
                Universal Human Skill
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F1EBE6] tracking-tight">
              START SEEING DIFFERENTLY.
            </h2>
            <p className="text-sm md:text-base text-[#8A8582] mt-3 max-w-xl font-body">
              Pattern recognition is the foundation of judgment, strategy, and invention.
              See what repeats. Understand why. Predict what comes next.
            </p>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="self-start md:self-auto px-6 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#ff7638] text-white font-semibold text-sm transition-all shadow-[0_0_20px_rgba(242,101,34,0.3)] flex items-center gap-2 group whitespace-nowrap"
          >
            <span>Explore All 22 Patterns</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* 4 Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/[0.08] text-xs font-mono">
          {/* Col 1: Platform */}
          <div>
            <h4 className="text-[#F1EBE6] font-bold uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-[#8A8582]">
              <li>
                <button onClick={() => onNavigate('explore')} className="hover:text-[#F26522] transition-colors">
                  Pattern Universe
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('map')} className="hover:text-[#F26522] transition-colors">
                  Knowledge Graph Map
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('spot')} className="hover:text-[#F26522] transition-colors">
                  Spot the Pattern
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('analyze')} className="hover:text-[#F26522] transition-colors">
                  Situation Analyzer
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('cases')} className="hover:text-[#F26522] transition-colors">
                  Deep Case Studies
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Domains */}
          <div>
            <h4 className="text-[#F1EBE6] font-bold uppercase tracking-wider mb-4">Domains</h4>
            <ul className="space-y-2.5 text-[#8A8582]">
              {CATEGORIES.slice(0, 5).map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => onNavigate('explore', c.id)}
                    className="hover:text-[#F26522] transition-colors"
                  >
                    {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Principles */}
          <div>
            <h4 className="text-[#F1EBE6] font-bold uppercase tracking-wider mb-4">Framework</h4>
            <ul className="space-y-2.5 text-[#8A8582]">
              <li className="flex items-center gap-1.5 text-[#F1EBE6]">
                <span className="text-[#F26522]">01.</span> Observe Signals
              </li>
              <li className="flex items-center gap-1.5 text-[#F1EBE6]">
                <span className="text-[#F26522]">02.</span> Detect Architecture
              </li>
              <li className="flex items-center gap-1.5 text-[#F1EBE6]">
                <span className="text-[#F26522]">03.</span> Understand Mechanisms
              </li>
              <li className="flex items-center gap-1.5 text-[#F1EBE6]">
                <span className="text-[#F26522]">04.</span> Connect Cross-Domain
              </li>
              <li className="flex items-center gap-1.5 text-[#F1EBE6]">
                <span className="text-[#F26522]">05.</span> Predict & Act
              </li>
            </ul>
          </div>

          {/* Col 4: Engine Info */}
          <div>
            <h4 className="text-[#F1EBE6] font-bold uppercase tracking-wider mb-4">Engine</h4>
            <div className="p-3 rounded-xl bg-[#111] border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[#8A8582]">Active Patterns:</span>
                <span className="text-[#F26522] font-bold">22 Core</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A8582]">Graph Links:</span>
                <span className="text-[#F1EBE6] font-bold">84 Edges</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#8A8582]">Heuristics:</span>
                <span className="text-emerald-400 font-bold">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-[#8A8582]">
          <PatternLogo
            variant="compact"
            size="sm"
            onClick={() => onNavigate('home')}
          />
          <div className="text-center sm:text-left">
            <span>© {new Date().getFullYear()} PATTERN — Dedicated to Mental Models & Systems Thinking</span>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('about')} className="hover:text-[#F1EBE6] transition-colors">
              About Platform
            </button>
            <span>•</span>
            <span className="text-[#F26522]">Designed for Human Intuition</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
