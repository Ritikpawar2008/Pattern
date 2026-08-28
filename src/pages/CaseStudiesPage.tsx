import React, { useState } from 'react';
import { CASE_STUDIES } from '../data/caseStudies';
import { CaseStudy } from '../types';
import {
  BookOpen,
  Calendar,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  Sparkles,
  ChevronDown,
  Layers
} from 'lucide-react';

interface CaseStudiesPageProps {
  onSelectPattern: (patternId: string) => void;
}

export const CaseStudiesPage: React.FC<CaseStudiesPageProps> = ({ onSelectPattern }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);

  const activeCase: CaseStudy =
    CASE_STUDIES.find(c => c.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#F26522]" />
          <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
            Historical & Technological Post-Mortems
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-[#F1EBE6] tracking-tight">
          DEEP CASE STUDIES
        </h1>
        <p className="text-sm md:text-base text-[#8A8582] mt-2 max-w-2xl">
          Detailed systemic analyses of major business collapses, technological tipping points, viral
          memetics, and perverse policy blowbacks.
        </p>
      </div>

      {/* Case Study Selection Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CASE_STUDIES.map((c, idx) => {
          const isSelected = activeCase.id === c.id;

          return (
            <button
              key={c.id}
              onClick={() => setSelectedCaseId(c.id)}
              className={`px-4 py-3 rounded-2xl text-xs font-mono transition-all text-left flex flex-col min-w-[220px] ${
                isSelected
                  ? 'bg-[#191919] border border-[#F26522] text-[#F1EBE6] shadow-[0_0_15px_rgba(242,101,34,0.3)]'
                  : 'bg-[#0B0B0B] border border-white/5 text-[#8A8582] hover:text-[#F1EBE6] hover:bg-[#121212]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] text-[#F26522] uppercase font-bold">
                  {c.category}
                </span>
                <span className="text-[10px] opacity-60">CASE 0{idx + 1}</span>
              </div>
              <span className="font-semibold text-sm truncate">{c.title}</span>
              <span className="text-[11px] text-[#8A8582] truncate mt-0.5">{c.subtitle}</span>
            </button>
          );
        })}
      </div>

      {/* Main Selected Case Breakdown Container */}
      <div className="p-6 md:p-10 rounded-3xl bg-[#0B0B0B] border border-white/10 space-y-12 shadow-2xl">
        {/* Title & Subtitle */}
        <div className="space-y-3 pb-8 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-[#F26522]/20 border border-[#F26522]/30 text-[#F26522] text-xs font-mono uppercase font-bold">
              {activeCase.category}
            </span>
            <span className="text-xs font-mono text-[#8A8582]">• Post-Mortem Analysis</span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F1EBE6] tracking-tight">
            {activeCase.title}
          </h2>

          <p className="text-base sm:text-lg text-[#F26522] font-mono italic">
            {activeCase.subtitle}
          </p>

          <p className="text-sm md:text-base text-[#8A8582] font-body leading-relaxed pt-2">
            {activeCase.summary}
          </p>
        </div>

        {/* 1. OBSERVATION vs PATTERN DETECTED */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8A8582] uppercase tracking-wider font-bold">
              <span className="text-[#F26522]">01.</span>
              <span>The Visible Observation</span>
            </div>
            <p className="text-sm text-[#F1EBE6] font-body leading-relaxed">
              {activeCase.observation}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#141414] border border-[#F26522]/30 space-y-3 shadow-[0_0_15px_rgba(242,101,34,0.15)]">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F26522] uppercase tracking-wider font-bold">
              <span className="text-[#F26522]">02.</span>
              <span>The Underlying Pattern</span>
            </div>
            <p className="text-sm text-[#F1EBE6] font-body leading-relaxed">
              {activeCase.patternDetected}
            </p>
          </div>
        </div>

        {/* 2. WHY IT HAPPENED (CAUSAL MECHANICS) */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#F26522] font-bold">03.</span>
            <h3 className="font-display font-bold text-2xl text-[#F1EBE6]">Why It Happened</h3>
          </div>
          <p className="text-sm md:text-base text-[#8A8582] font-body leading-relaxed p-6 rounded-2xl bg-white/5 border border-white/5">
            {activeCase.whyItHappened}
          </p>
        </div>

        {/* 3. TIMELINE PHASES */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#F26522] font-bold">04.</span>
            <h3 className="font-display font-bold text-2xl text-[#F1EBE6]">
              Timeline & Phase Transitions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {activeCase.timeline.map((step, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#121212] border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-mono text-[#F26522] font-semibold block mb-1">
                    {step.phase}
                  </span>
                  <h4 className="font-display font-bold text-base text-[#F1EBE6] mb-2">{step.title}</h4>
                  <p className="text-xs text-[#8A8582] font-body leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-amber-300">
                  <span className="opacity-70 block">Metric/Indicator:</span>
                  <span>{step.indicator}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. CONSEQUENCES & WHAT COULD BE NOTICED EARLIER */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-red-400 uppercase tracking-wider font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Consequences of Ignoring The Pattern</span>
            </div>
            <p className="text-xs sm:text-sm text-[#8A8582] font-body leading-relaxed">
              {activeCase.consequences}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider font-bold">
              <Lightbulb className="w-4 h-4" />
              <span>What Could Have Been Noticed Earlier</span>
            </div>
            <p className="text-xs sm:text-sm text-[#8A8582] font-mono whitespace-pre-line leading-relaxed">
              {activeCase.whatCouldBeNoticedEarlier}
            </p>
          </div>
        </div>

        {/* Key Takeaway & Pattern Link */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#191919] to-[#111] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-wider font-bold">
              Master Takeaway:
            </span>
            <p className="text-sm md:text-base font-display font-semibold text-[#F1EBE6]">
              "{activeCase.keyTakeaway}"
            </p>
          </div>

          {activeCase.patternId && (
            <button
              onClick={() => onSelectPattern(activeCase.patternId!)}
              className="px-6 py-3 rounded-xl bg-[#F26522] hover:bg-[#ff7638] text-white font-semibold text-xs font-mono transition-all flex items-center gap-2 whitespace-nowrap shadow-[0_0_15px_rgba(242,101,34,0.4)] shrink-0"
            >
              <span>Explore Master Pattern</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
