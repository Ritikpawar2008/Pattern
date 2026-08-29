import React, { useState } from 'react';
import { HeroCanvas } from '../components/HeroCanvas';
import { DailyPatternWidget } from '../components/DailyPatternWidget';
import { PatternVisualizer } from '../components/PatternVisualizer';
import { PatternLogo } from '../components/brand/PatternLogo';
import { CATEGORIES } from '../data/categories';
import { PATTERNS } from '../data/patterns';
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
  Workflow,
  BookMarked,
  CheckCircle2
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
    <div className="w-full flex flex-col space-y-24 pb-20">
      {/* 1. HERO EDITORIAL SECTION */}
      <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-16 pb-20 overflow-hidden bg-editorial-grid">
        {/* Background interactive canvas */}
        <HeroCanvas />

        {/* Ambient Warm Paper & Ochre Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#E4572E]/10 rounded-full blur-[160px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
          {/* Brand Mark Anchor */}
          <div className="mb-6 group">
            <PatternLogo
              variant="icon"
              size={68}
              glow={true}
              animated={true}
            />
          </div>

          {/* Top Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#181815] border border-white/10 mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#E4572E] animate-pulse" />
            <span className="text-xs font-sans tracking-widest text-[#D4A373] uppercase font-bold">
              Cognitive Systems Journal &amp; Visual Intelligence
            </span>
          </div>

          {/* Master Manifesto Headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight text-[#F7F4EE] leading-[1.08] font-bold">
            See what repeats.<br />
            <span className="italic text-[#E4572E] font-normal">
              Understand why.
            </span><br />
            Predict what comes next.
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-base sm:text-lg md:text-xl text-[#A39D93] max-w-2xl font-sans leading-relaxed">
            A human-crafted digital laboratory exploring the recurring mental models and structural laws
            governing technology, markets, nature, organizations, and human behavior.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('scan')}
              className="px-8 py-4 rounded-xl bg-[#E4572E] hover:bg-[#F26522] text-white font-sans font-bold text-sm transition-all shadow-lg hover:shadow-orange-950/60 flex items-center gap-2.5 group"
            >
              <Eye className="w-4 h-4" />
              <span>Scan Visuals (Groq Vision AI)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate('explore')}
              className="px-7 py-4 rounded-xl bg-[#181815] hover:bg-[#242420] border border-white/10 text-[#F7F4EE] font-sans font-semibold text-sm transition-all flex items-center gap-2.5 group"
            >
              <Compass className="w-4 h-4 text-[#D4A373]" />
              <span>Explore 18 Universal Models</span>
            </button>

            <button
              onClick={() => onNavigate('spot')}
              className="px-7 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[#A39D93] hover:text-[#F7F4EE] font-sans font-semibold text-sm transition-all flex items-center gap-2.5 group"
            >
              <Target className="w-4 h-4 text-[#D4A373]" />
              <span>Test Pattern Intuition</span>
            </button>
          </div>

          {/* Live Simulation Card */}
          <div className="w-full max-w-3xl mt-16 rounded-3xl bg-[#121210] border border-[#F7F4EE]/15 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <div className="flex items-center gap-2 text-xs font-mono text-[#A39D93]">
                <Workflow className="w-4 h-4 text-[#E4572E]" />
                <span className="text-[#F7F4EE] font-bold">SYSTEMIC SIMULATION:</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#181815] p-1 rounded-xl border border-white/5">
                {(['cycle', 'compounding', 'network'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveHeroTab(tab)}
                    className={`px-3 py-1 rounded-lg text-xs font-sans capitalize transition-all ${
                      activeHeroTab === tab
                        ? 'bg-[#E4572E] text-white font-bold'
                        : 'text-[#A39D93] hover:text-[#F7F4EE]'
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

      {/* 2. THE 5-STAGE PERCEPTUAL METHOD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E4572E]" />
            <span className="text-xs font-mono text-[#D4A373] uppercase tracking-widest font-semibold">
              The Cognitive Architecture
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EE] font-bold tracking-tight">
            How Masters Deconstruct Reality
          </h2>
          <p className="text-sm font-sans text-[#A39D93] leading-relaxed">
            Pattern recognition is not intuition or guesswork. It is a systematic 5-stage
            perceptual practice practiced across science, engineering, and philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              step: '01',
              name: 'OBSERVE',
              icon: Eye,
              title: 'Isolate The Signal',
              desc: 'Filter environmental noise to identify structural invariants and directional momentum.'
            },
            {
              step: '02',
              name: 'DETECT',
              icon: BrainCircuit,
              title: 'Match Architecture',
              desc: 'Classify observed forces against fundamental systemic archetypes (S-curves, power laws, loops).'
            },
            {
              step: '03',
              name: 'UNDERSTAND',
              icon: Zap,
              title: 'Map Drivers & Delay',
              desc: 'Examine feedback delays, incentive alignments, capacity limits, and friction points.'
            },
            {
              step: '04',
              name: 'CONNECT',
              icon: Share2,
              title: 'Cross-Domain Insight',
              desc: 'Translate dynamics across biology, markets, engineering networks, and everyday human psychology.'
            },
            {
              step: '05',
              name: 'PREDICT',
              icon: Target,
              title: 'Project Trajectories',
              desc: 'Anticipate tipping points, second-order consequences, and optimal leverage intervention points.'
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="editorial-card p-6 rounded-2xl flex flex-col justify-between min-h-[230px] group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs text-[#E4572E] font-bold">{item.step}</span>
                    <Icon className="w-4 h-4 text-[#A39D93] group-hover:text-[#E4572E] transition-colors" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#F7F4EE] tracking-tight">
                    {item.name}
                  </h3>
                  <div className="text-xs font-sans text-[#D4A373] mb-2 font-semibold">{item.title}</div>
                  <p className="text-xs font-sans text-[#A39D93] leading-relaxed">{item.desc}</p>
                </div>
                <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mt-4">
                  <div className="w-0 group-hover:w-full h-full bg-[#E4572E] transition-all duration-500" />
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

      {/* 4. VISION SCANNER HERO BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="editorial-card rounded-3xl p-8 sm:p-12 border border-[#E4572E]/30 bg-[#121210] relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E4572E]/15 border border-[#E4572E]/30 text-[#E4572E] text-xs font-mono font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by Groq Vision &amp; Reasoning</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EE] tracking-tight leading-tight">
                Upload Any Image.<br />
                <span className="italic text-[#E4572E]">Let PATTERN Deconstruct the Hidden System.</span>
              </h2>

              <p className="text-sm font-sans text-[#A39D93] max-w-xl leading-relaxed">
                Feed real-world charts, physical architectures, network diagrams, or organizational scenarios into our Groq Vision intelligence engine. Extract observable evidence, theoretical models, and second-order trajectory forecasts in seconds.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => onNavigate('scan')}
                  className="px-7 py-3.5 rounded-xl bg-[#E4572E] hover:bg-[#F26522] text-white font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 group"
                >
                  <Eye className="w-4 h-4" />
                  <span>Launch Vision AI Scanner</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <div className="text-xs font-sans text-[#A39D93] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Multi-image comparison &amp; follow-up questions supported</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                onClick={() => onNavigate('scan')}
                className="cursor-pointer group p-6 rounded-2xl bg-[#181815] border border-white/10 hover:border-[#E4572E]/50 transition-all space-y-3"
              >
                <div className="flex items-center justify-between text-[11px] font-mono text-[#A39D93]">
                  <span>Vision Analysis Chain:</span>
                  <span className="text-[#D4A373] font-semibold">OBSERVE ➔ DECONSTRUCT ➔ FORECAST</span>
                </div>
                <div className="aspect-video rounded-xl bg-[#0F0F0D] border border-white/5 flex flex-col items-center justify-center p-4 text-center space-y-2 group-hover:border-[#E4572E]/30 transition-colors">
                  <div className="w-12 h-12 rounded-2xl bg-[#1C1C18] border border-white/10 flex items-center justify-center text-[#E4572E] group-hover:scale-110 transition-transform">
                    <Eye className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-serif font-bold text-[#F7F4EE]">
                    Drop chart, diagram, or photo
                  </span>
                  <span className="text-[11px] font-sans text-[#A39D93]">
                    Click to try with instant 1-click test samples
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. THE OPERATIONAL DOMAINS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4572E]" />
              <span className="text-xs font-mono text-[#D4A373] uppercase tracking-widest font-semibold">
                Universal Cross-Domain Matrix
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EE] font-bold tracking-tight">
              The Pattern Library
            </h2>
            <p className="text-sm font-sans text-[#A39D93] mt-2 max-w-xl">
              Patterns are not confined to academic silos. Explore how systemic forces repeat across
              8 fundamental operational realms.
            </p>
          </div>

          <button
            onClick={() => onNavigate('explore')}
            className="text-xs font-sans font-semibold text-[#E4572E] hover:text-white flex items-center gap-1.5 transition-colors group"
          >
            <span>View All Patterns</span>
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
                className="editorial-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between group min-h-[220px] relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#A39D93]">{count} Patterns</span>
                    <ArrowUpRight className="w-4 h-4 text-[#A39D93] group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </div>
                  <h3 className="font-serif font-bold text-xl text-[#F7F4EE] group-hover:text-[#E4572E] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs font-sans text-[#A39D93] mt-2 leading-relaxed line-clamp-2">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-sans text-[#A39D93]">
                  <span>Explore domain</span>
                  <span className="text-[#E4572E]">→</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 6. FEATURED ARCHETYPES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E4572E]" />
              <span className="text-xs font-mono text-[#D4A373] uppercase tracking-widest font-semibold">
                Core Mental Models
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F7F4EE] font-bold tracking-tight">
              Featured Architectures
            </h2>
            <p className="text-sm font-sans text-[#A39D93] mt-2 max-w-xl">
              Study the exact causal mechanics behind viral adoption, market panics, habits, and
              network moats.
            </p>
          </div>

          <button
            onClick={() => onNavigate('map')}
            className="px-4 py-2 rounded-xl bg-[#181815] hover:bg-[#242420] border border-white/10 text-xs font-sans font-semibold text-[#F7F4EE] flex items-center gap-2 transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-[#E4572E]" />
            <span>Open Connected Graph Map</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredPatterns.map(p => (
            <div
              key={p.id}
              onClick={() => onSelectPattern(p.id)}
              className="editorial-card p-6 rounded-2xl cursor-pointer flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-[#E4572E] uppercase font-semibold">
                    {p.category}
                  </span>
                  <span className="text-xs font-sans text-[#A39D93] group-hover:text-white flex items-center gap-1 transition-colors">
                    <span>Inspect Model</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>

                <h3 className="font-serif font-bold text-2xl text-[#F7F4EE] group-hover:text-[#E4572E] transition-colors mt-2">
                  {p.title}
                </h3>
                <p className="text-xs font-serif italic text-[#D4A373] mt-1">"{p.tagline}"</p>
                <p className="text-xs font-sans text-[#A39D93] mt-3 line-clamp-3 leading-relaxed">
                  {p.definition}
                </p>
              </div>

              {/* Compact Visualizer */}
              <div className="mt-6">
                <PatternVisualizer type={p.visualType} isCompact />
              </div>

              {/* Rule Footer */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-sans">
                <span className="text-[#A39D93]">Core Axiom:</span>
                <span className="text-[#F7F4EE] truncate max-w-[200px] text-right font-medium">
                  {p.keyRule}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. SITUATION & TRAINING LAB TEASERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Situation Analyzer Teaser */}
          <div className="editorial-card p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#E4572E]/15 border border-[#E4572E]/30 flex items-center justify-center text-[#E4572E] mb-6">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#E4572E] uppercase tracking-wider font-semibold">
                Heuristic &amp; Groq Intelligence
              </span>
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#F7F4EE] mt-2 tracking-tight">
                Situation Analyzer
              </h3>
              <p className="text-sm font-sans text-[#A39D93] mt-3 leading-relaxed">
                Describe a confusing or escalating situation in your startup, personal habits, or team.
                Our cognitive diagnostic engine detects hidden bottlenecks, feedback loops, and unintended consequences.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-sans text-[#A39D93]">AI-driven cognitive diagnosis</span>
              <button
                onClick={() => onNavigate('analyze')}
                className="px-5 py-2.5 rounded-xl bg-[#181815] hover:bg-[#242420] text-[#F7F4EE] text-xs font-sans font-semibold transition-colors flex items-center gap-2 border border-white/10"
              >
                <span>Launch Analyzer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Spot the Pattern Training Teaser */}
          <div className="editorial-card p-8 rounded-3xl flex flex-col justify-between relative overflow-hidden group">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-[#D4A373]/15 border border-[#D4A373]/30 flex items-center justify-center text-[#D4A373] mb-6">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-mono text-[#D4A373] uppercase tracking-wider font-semibold">
                Perceptual Calibration
              </span>
              <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#F7F4EE] mt-2 tracking-tight">
                Spot the Pattern
              </h3>
              <p className="text-sm font-sans text-[#A39D93] mt-3 leading-relaxed">
                Test your pattern recognition radar against authentic real-world cases. Solve timed
                challenges, diagnose hidden systemic traps, and build your mastery radar profile.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs font-sans text-[#A39D93]">10 Curated Challenges</span>
              <button
                onClick={() => onNavigate('spot')}
                className="px-5 py-2.5 rounded-xl bg-[#D4A373] hover:bg-[#e2b588] text-black text-xs font-sans font-bold transition-colors flex items-center gap-2"
              >
                <span>Start Training</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 8. EDITORIAL MANIFESTO ESSAY */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="editorial-card p-8 md:p-12 rounded-3xl border border-[#F7F4EE]/10 bg-[#121210] relative overflow-hidden space-y-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#E4572E]" />
            <span className="text-xs font-mono text-[#D4A373] uppercase tracking-widest font-semibold">
              The Editorial Manifesto
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EE] tracking-tight leading-tight">
            Why Pattern Recognition is the Ultimate Human Advantage
          </h2>

          <div className="space-y-4 text-sm md:text-base text-[#A39D93] leading-relaxed font-sans">
            <p>
              In a world flooded with infinite noisy data, raw memorization is worthless. The most
              profound thinkers—from polymaths and Nobel laureates to legendary engineers and investors—do
              not possess superior memory; they possess superior structural indexing.
            </p>
            <p>
              They understand that a viral social adoption wave adheres to the exact same mathematical
              epidemiological curve as a biological pathogen. They recognize that an unmonitored
              distributed software pipeline experiences the identical bottleneck dynamics as vehicular
              traffic on a suspension bridge.
            </p>
            <blockquote className="p-6 rounded-2xl bg-[#181815] border-l-4 border-[#E4572E] text-[#F7F4EE] font-serif text-lg italic my-6">
              "When you understand the pattern, the world ceases to be a chaotic sequence of
              unpredictable shocks. It reveals itself as an interconnected dance of universal systemic laws."
            </blockquote>
            <p>
              By training your perceptual radar with PATTERN, you develop the instinctive ability to isolate
              signals, identify architectural constraints, and anticipate second-order trajectories with clarity.
            </p>
          </div>

          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-sans text-[#A39D93]">
              Begin your study of systemic patterns today.
            </div>
            <button
              onClick={() => onNavigate('explore')}
              className="px-6 py-3 rounded-xl bg-[#E4572E] hover:bg-[#F26522] text-white font-sans font-bold text-xs transition-all flex items-center gap-2"
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
