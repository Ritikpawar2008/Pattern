import React, { useState } from 'react';
import { HeroCanvas } from '../components/HeroCanvas';
import { DailyPatternWidget } from '../components/DailyPatternWidget';
import { PatternVisualizer } from '../components/PatternVisualizer';
import { PatternLogo } from '../components/brand/PatternLogo';
import { CATEGORIES } from '../data/categories';
import { PATTERNS } from '../data/patterns';
import { Pattern, Category } from '../types';
import {
  ArrowRight,
  Sparkles,
  Zap,
  Target,
  Compass,
  Share2,
  Cpu,
  BookOpen,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  BrainCircuit,
  Eye,
  Workflow
} from 'lucide-react';

interface HomeProps {
  onNavigate: (tab: string, extraId?: string) => void;
  onSelectPattern: (patternId: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate, onSelectPattern }) => {
  const [activeHeroTab, setActiveHeroTab] = useState<'cycle' | 'compounding' | 'network'>('cycle');

  // Featured 6 patterns for the landing showcase
  const featuredPatterns = PATTERNS.slice(0, 6);

  return (
    <div className="w-full flex flex-col space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-12 pb-16 overflow-hidden">
        {/* Background interactive canvas */}
        <HeroCanvas />

        {/* Ambient Radial Gradients */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#F26522]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Brand Mark Anchor */}
          <div className="mb-6 group">
            <PatternLogo
              variant="icon"
              size={64}
              glow={true}
              animated={true}
            />
          </div>

          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
            <span className="text-xs font-mono tracking-widest text-[#F1EBE6] uppercase font-semibold">
              The Universal Human Skill
            </span>
          </div>

          {/* Master Headline */}
          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F1EBE6] leading-[1.05] uppercase">
            See what repeats.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F1EBE6] via-[#F26522] to-[#ff854d]">
              Understand why.
            </span>
            <br />
            Predict what comes next.
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-base sm:text-lg md:text-xl text-[#8A8582] max-w-2xl font-body leading-relaxed">
            An interactive digital research laboratory and knowledge graph exploring the recurring
            structures governing human behavior, technology, business, nature, history, and markets.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('scan')}
              className="px-8 py-4 rounded-xl bg-[#F26522] hover:bg-[#ff7638] text-white font-semibold text-sm transition-all shadow-[0_0_30px_rgba(242,101,34,0.4)] flex items-center gap-2.5 group"
            >
              <Eye className="w-4 h-4" />
              <span>Scan A Pattern (AI Vision)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className="px-7 py-4 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-white/10 text-[#F1EBE6] font-medium text-sm transition-all flex items-center gap-2.5 group"
            >
              <Compass className="w-4 h-4 text-[#F26522]" />
              <span>Explore Pattern Universe</span>
            </button>

            <button
              onClick={() => onNavigate('spot')}
              className="px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#8A8582] hover:text-[#F1EBE6] font-medium text-sm transition-all flex items-center gap-2.5 group"
            >
              <Target className="w-4 h-4 text-amber-400" />
              <span>Train in Spot The Pattern</span>
            </button>
          </div>

          {/* Live Mini Hero Visualizer */}
          <div className="w-full max-w-3xl mt-16 rounded-2xl bg-[#0B0B0B]/90 border border-white/10 p-4 sm:p-6 backdrop-blur-md shadow-2xl">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#8A8582]">
                <Workflow className="w-4 h-4 text-[#F26522]" />
                <span className="text-[#F1EBE6] font-semibold">LIVE RECOGNITION SIMULATION:</span>
              </div>
              <div className="flex items-center gap-1">
                {(['cycle', 'compounding', 'network'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveHeroTab(tab)}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono capitalize transition-all ${
                      activeHeroTab === tab
                        ? 'bg-[#F26522] text-white font-bold'
                        : 'bg-white/5 text-[#8A8582] hover:text-[#F1EBE6]'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <PatternVisualizer type={activeHeroTab} />
          </div>
        </div>
      </section>

      {/* 2. THE 5-STEP COGNITIVE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
              The Cognitive Method
            </span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F1EBE6] tracking-tight">
            HOW MASTERS READ REALITY
          </h2>
          <p className="text-sm text-[#8A8582] mt-3">
            Pattern recognition is not intuition or guesswork. It is a systematic 5-stage
            perceptual architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              name: 'OBSERVE',
              icon: Eye,
              title: 'Isolate The Signal',
              desc: 'Filter noise to spot recurring behaviors, anomalies, and structural invariants.'
            },
            {
              step: '02',
              name: 'DETECT',
              icon: BrainCircuit,
              title: 'Identify Architecture',
              desc: 'Match observed dynamics against fundamental systems archetypes (loops, power laws).'
            },
            {
              step: '03',
              name: 'UNDERSTAND',
              icon: Zap,
              title: 'Deconstruct Drivers',
              desc: 'Examine incentives, delays, bottlenecks, and feedback mechanisms driving the system.'
            },
            {
              step: '04',
              name: 'CONNECT',
              icon: Share2,
              title: 'Cross-Domain Isomorphism',
              desc: 'Translate insights across biology, finance, software, and everyday human psychology.'
            },
            {
              step: '05',
              name: 'PREDICT',
              icon: Target,
              title: 'Forecast Inflexions',
              desc: 'Anticipate tipping points, second-order consequences, and optimal intervention levers.'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/5 hover:border-[#F26522]/40 transition-all group flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#F26522] font-bold">{item.step}</span>
                    <Icon className="w-4 h-4 text-[#8A8582] group-hover:text-[#F26522] transition-colors" />
                  </div>
                  <h3 className="font-display font-bold text-base text-[#F1EBE6] tracking-tight">
                    {item.name}
                  </h3>
                  <div className="text-xs font-mono text-[#F26522] mb-2">{item.title}</div>
                  <p className="text-xs text-[#8A8582] leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                  <div className="w-0 group-hover:w-full h-full bg-[#F26522] transition-all duration-500" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. PATTERN OF THE DAY WIDGET */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <DailyPatternWidget onSelectPattern={onSelectPattern} />
      </section>

      {/* 3.5 DEDICATED FEATURE BANNER: SCAN A PATTERN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#0C0C0C] via-[#0E0E0E] to-[#140E0A] border border-[#F26522]/30 shadow-2xl overflow-hidden">
          {/* Subtle glowing reticles */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-[#F26522]" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-[#F26522]" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-[#F26522]" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-[#F26522]" />
          <div className="absolute right-0 top-0 w-96 h-96 bg-[#F26522]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F26522]/20 border border-[#F26522]/40 text-[#F26522] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Multimodal Vision Intelligence</span>
              </div>

              <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F1EBE6] tracking-tight leading-tight">
                WHAT DO YOU SEE? <br />
                <span className="text-[#F26522]">UPLOAD AN IMAGE. LET PATTERN LOOK DEEPER.</span>
              </h2>

              <p className="text-sm font-body text-[#8A8582] max-w-xl leading-relaxed">
                Feed real-world charts, physical architectures, network diagrams, or organic photographs into the PATTERN vision engine. Deconstruct visual topologies into direct observations, underlying systemic mechanisms, and probabilistic forward trajectories.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('scan')}
                  className="px-7 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#ff7638] text-white font-mono font-bold text-xs uppercase tracking-wider transition-all shadow-[0_0_25px_rgba(242,101,34,0.4)] flex items-center gap-2 group"
                >
                  <Eye className="w-4 h-4" />
                  <span>Launch Pattern Scanner</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-xs font-mono text-[#8A8582] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Supports Camera, Files &amp; Clipboard (⌘V)</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                onClick={() => onNavigate('scan')}
                className="cursor-pointer group p-5 rounded-2xl bg-black/70 border border-white/10 hover:border-[#F26522]/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8A8582]">
                  <span>Visual Pipeline:</span>
                  <span className="text-[#F26522] font-semibold">OBSERVE ➔ DETECT ➔ PREDICT</span>
                </div>
                <div className="aspect-video rounded-xl bg-[#090909] border border-white/5 flex flex-col items-center justify-center p-4 text-center space-y-2 group-hover:border-[#F26522]/30 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-[#141414] border border-white/10 flex items-center justify-center text-[#F26522] group-hover:scale-110 transition-transform">
                    <Eye className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-display font-bold text-[#F1EBE6]">
                    Drop chart, diagram, or photo
                  </span>
                  <span className="text-[10px] font-mono text-[#8A8582]">
                    Click to try with instant 1-click test samples
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 8 DOMAIN UNIVERSES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
              <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
                Universal Cross-Domain Matrix
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F1EBE6] tracking-tight">
              THE PATTERN UNIVERSE
            </h2>
            <p className="text-sm text-[#8A8582] mt-2 max-w-xl">
              Patterns are not confined to academic silos. Explore how systemic forces repeat across
              8 primary operational realms.
            </p>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-mono text-[#F26522] hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <span>View All 22 Patterns</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map(cat => {
            const count = PATTERNS.filter(p => p.category === cat.id).length;

            return (
              <div
                key={cat.id}
                onClick={() => onNavigate('explore', cat.id)}
                className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 hover:border-white/25 cursor-pointer transition-all flex flex-col justify-between group min-h-[220px] relative overflow-hidden"
              >
                {/* Subtle corner accent */}
                <div
                  className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-10 group-hover:opacity-30 transition-opacity"
                  style={{ backgroundColor: cat.accentColor }}
                />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#8A8582]">{count} Patterns</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8A8582] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-[#F1EBE6] group-hover:text-[#F26522] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#8A8582] mt-2 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#8A8582]">
                  <span>Explore domain</span>
                  <span className="text-[#F26522]">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. FEATURED RECOGNITION ARCHETYPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F26522]" />
              <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
                Fundamental Archetypes
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F1EBE6] tracking-tight">
              MASTER ARCHITECTURES
            </h2>
            <p className="text-sm text-[#8A8582] mt-2 max-w-xl">
              Study the exact causal mechanics behind viral scale, market panics, habits, and
              network moats.
            </p>
          </div>

          <button
            onClick={() => onNavigate('map')}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#F1EBE6] flex items-center gap-2 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-[#F26522]" />
            <span>Open Connected Graph Map</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPatterns.map(p => (
            <div
              key={p.id}
              onClick={() => onSelectPattern(p.id)}
              className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 hover:border-[#F26522]/50 cursor-pointer transition-all flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-[#F26522] uppercase font-semibold">
                    {p.category}
                  </span>
                  <span className="text-xs font-mono text-[#8A8582] group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>Inspect</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                <h3 className="font-display font-bold text-xl text-[#F1EBE6] group-hover:text-[#F26522] transition-colors mt-2">
                  {p.title}
                </h3>
                <p className="text-xs font-mono text-[#8A8582] italic mt-1">"{p.tagline}"</p>
                <p className="text-xs text-[#8A8582] mt-3 line-clamp-3 leading-relaxed">
                  {p.definition}
                </p>
              </div>

              {/* Compact Visualizer */}
              <div className="mt-6">
                <PatternVisualizer type={p.visualType} isCompact />
              </div>

              {/* Rule Footer */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                <span className="text-[#8A8582]">Key Rule:</span>
                <span className="text-[#F1EBE6] truncate max-w-[200px] text-right font-medium">
                  {p.keyRule}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE TOOLS TEASER BANNER (ANALYZER & TRAINING) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Situation Analyzer Teaser */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#121212] to-[#0A0A0A] border border-white/10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F26522]/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-[#F26522]/20 border border-[#F26522]/30 flex items-center justify-center text-[#F26522] mb-6">
                <Cpu className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-[#F26522] uppercase tracking-wider font-semibold">
                Diagnosis Engine
              </span>
              <h3 className="font-display font-black text-2xl md:text-3xl text-[#F1EBE6] mt-2 tracking-tight">
                SITUATION ANALYZER
              </h3>
              <p className="text-sm text-[#8A8582] mt-3 leading-relaxed">
                Describe a confusing situation in your business, startup, habits, or team. Our
                heuristic engine detects hidden bottlenecks, feedback loops, and unintended
                consequences.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#8A8582]">Rule-based heuristic model</span>
              <button
                onClick={() => onNavigate('analyze')}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F1EBE6] text-xs font-mono font-semibold transition-colors flex items-center gap-2"
              >
                <span>Launch Analyzer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Spot the Pattern Training Teaser */}
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#121212] to-[#0A0A0A] border border-white/10 flex flex-col justify-between relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6">
                <Target className="w-5 h-5" />
              </div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-wider font-semibold">
                Brain Training Lab
              </span>
              <h3 className="font-display font-black text-2xl md:text-3xl text-[#F1EBE6] mt-2 tracking-tight">
                SPOT THE PATTERN
              </h3>
              <p className="text-sm text-[#8A8582] mt-3 leading-relaxed">
                Test your pattern recognition intuition with real-world scenarios. Solve timed
                challenges, diagnose hidden systemic traps, and build your cognitive radar profile.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-mono text-[#8A8582]">10 Timed Challenges</span>
              <button
                onClick={() => onNavigate('spot')}
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-mono font-bold transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
              >
                <span>Start Training</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. EDITORIAL ESSAY SECTION: WHY PATTERN RECOGNITION MATTERS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 rounded-3xl bg-[#090909] border border-white/10 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#F26522]" />
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
              The Cognitive Thesis
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl text-[#F1EBE6] tracking-tight">
            WHY PATTERN RECOGNITION IS THE ULTIMATE SKILL
          </h2>

          <div className="mt-6 space-y-4 text-sm md:text-base text-[#8A8582] leading-relaxed font-body">
            <p>
              In a world flooded with infinite noisy data, raw memorization is worthless. The most
              effective thinkers—from Warren Buffett and Charlie Munger to biological researchers and
              breakthrough engineers—do not possess superior memory; they possess superior mental
              indexing.
            </p>
            <p>
              They recognize that an viral social audio trend operates on the exact same mathematical
              epidemiological curve ($R_0$) as a seasonal flu virus. They know that an unmonitored
              software microservice queue experiences the exact same bottleneck congestion as a
              traffic jam on the Golden Gate bridge.
            </p>
            <p className="text-[#F1EBE6] font-semibold border-l-2 border-[#F26522] pl-4 italic">
              "When you understand the pattern, the world ceases to be a chaotic sequence of
              unpredictable shocks. It becomes an orchestrated dance of recurring systemic forces."
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#8A8582]">
              Start training your cognitive pattern recognition today.
            </div>
            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-3 rounded-xl bg-[#F26522] hover:bg-[#ff7638] text-white font-semibold text-xs font-mono transition-all flex items-center gap-2"
            >
              <span>Explore All Models</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
