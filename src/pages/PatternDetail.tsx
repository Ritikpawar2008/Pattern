import React, { useState } from 'react';
import { PATTERNS } from '../data/patterns';
import { PatternVisualizer } from '../components/PatternVisualizer';
import { Pattern, UserProgress } from '../types';
import {
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  XCircle,
  Share2,
  AlertTriangle,
  Zap,
  TrendingUp,
  BrainCircuit,
  Eye,
  ShieldCheck,
  Lightbulb,
  ArrowRight,
  Sparkles,
  Layers,
  HelpCircle,
  Sliders
} from 'lucide-react';

interface PatternDetailProps {
  patternId: string;
  onBack: () => void;
  onSelectPattern: (id: string) => void;
  userProgress: UserProgress;
  onToggleBookmark: (id: string) => void;
  onCompletePrediction: (patternId: string, isCorrect: boolean) => void;
}

export const PatternDetail: React.FC<PatternDetailProps> = ({
  patternId,
  onBack,
  onSelectPattern,
  userProgress,
  onToggleBookmark,
  onCompletePrediction
}) => {
  const pattern = PATTERNS.find(p => p.id === patternId) || PATTERNS[0];
  const isBookmarked = userProgress.bookmarkedPatternIds.includes(pattern.id);

  // Prediction Interactive Simulation State
  const [selectedPrediction, setSelectedPrediction] = useState<number | null>(null);
  const [hasPredicted, setHasPredicted] = useState<boolean>(false);

  // Spot It Mini Scenario State
  const [selectedSpot, setSelectedSpot] = useState<number | null>(null);
  const [hasSpotted, setHasSpotted] = useState<boolean>(false);

  const relatedPatterns = PATTERNS.filter(p => pattern.relatedPatternIds.includes(p.id));

  const handlePredictionSubmit = (index: number) => {
    if (hasPredicted) return;
    setSelectedPrediction(index);
    setHasPredicted(true);

    const isCorrect = pattern.predictionScenario.options[index]?.isMostLikely;
    onCompletePrediction(pattern.id, isCorrect);
  };

  const handleSpotSubmit = (index: number) => {
    if (hasSpotted) return;
    setSelectedSpot(index);
    setHasSpotted(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Top Breadcrumb & Actions */}
      <div className="flex items-center justify-between pb-6 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-[#8A8582] hover:text-[#F1EBE6] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Patterns</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleBookmark(pattern.id)}
            className={`px-4 py-2 rounded-xl text-xs font-mono border transition-all flex items-center gap-2 ${
              isBookmarked
                ? 'bg-[#F26522]/20 border-[#F26522] text-[#F26522]'
                : 'bg-white/5 border-white/10 text-[#8A8582] hover:text-[#F1EBE6]'
            }`}
          >
            {isBookmarked ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-[#F26522]" />
                <span>Saved to Progress</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4" />
                <span>Bookmark</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. HERO HEADER */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#F26522]/20 border border-[#F26522]/30 text-[#F26522] text-xs font-mono uppercase font-semibold">
            {pattern.category}
          </span>
          <span className="text-xs font-mono text-[#8A8582] uppercase">• {pattern.difficulty} Level</span>
        </div>

        <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl text-[#F1EBE6] tracking-tight">
          {pattern.title}
        </h1>

        <p className="font-mono text-base sm:text-lg text-[#F26522] italic">
          "{pattern.tagline}"
        </p>

        <p className="text-base sm:text-lg text-[#8A8582] leading-relaxed max-w-3xl font-body pt-2">
          {pattern.definition}
        </p>

        {/* Meters Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-[#8A8582] uppercase block">Frequency</span>
            <span className="text-base font-display font-bold text-[#F1EBE6]">{pattern.meters.frequency}%</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-[#8A8582] uppercase block">Complexity</span>
            <span className="text-base font-display font-bold text-[#F1EBE6]">{pattern.meters.complexity}%</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-[#8A8582] uppercase block">Predictability</span>
            <span className="text-base font-display font-bold text-[#F1EBE6]">{pattern.meters.predictability}%</span>
          </div>
          <div className="p-3 rounded-xl bg-white/5 border border-white/5">
            <span className="text-[10px] font-mono text-[#8A8582] uppercase block">Systemic Impact</span>
            <span className="text-base font-display font-bold text-[#F1EBE6]">{pattern.meters.impact}%</span>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE PATTERN VISUALIZER */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2 h-2 rounded-full bg-[#F26522]" />
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#F1EBE6] font-semibold">
            Interactive Structural Simulation
          </h3>
        </div>
        <PatternVisualizer type={pattern.visualType} flowSteps={pattern.flowSteps} title={pattern.title} />
      </div>

      {/* 3. HOW IT WORKS (STEP-BY-STEP MECHANISM) */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#F26522]" />
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F1EBE6] tracking-tight">
            HOW IT WORKS: SYSTEMIC MECHANISM
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pattern.howItWorks.map(step => (
            <div
              key={step.step}
              className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs font-bold text-[#F26522]">
                    STAGE 0{step.step}
                  </span>
                  <Zap className="w-3.5 h-3.5 text-[#8A8582]" />
                </div>
                <h4 className="font-display font-bold text-lg text-[#F1EBE6]">{step.title}</h4>
                <p className="text-xs text-[#8A8582] mt-2 leading-relaxed font-body">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. REAL WORLD MANIFESTATIONS (CROSS-DOMAIN EXAMPLES) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F26522]" />
            <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F1EBE6] tracking-tight">
              WHERE IT REPEATS IN REALITY
            </h2>
          </div>
          <span className="text-xs font-mono text-[#8A8582]">
            {pattern.realWorldExamples.length} Cross-Domain Cases
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {pattern.realWorldExamples.map((ex, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#F26522] uppercase font-bold">
                    {ex.domain}
                  </span>
                  <span className="text-[10px] font-mono text-[#8A8582]">Case #{idx + 1}</span>
                </div>
                <h4 className="font-display font-bold text-lg text-[#F1EBE6]">{ex.title}</h4>
                <p className="text-xs text-[#8A8582] mt-3 leading-relaxed font-body">
                  {ex.description}
                </p>
              </div>

              <div className="mt-5 p-3 rounded-xl bg-[#141414] border border-white/5 text-xs font-mono text-[#F1EBE6]">
                <span className="text-[#F26522] block font-semibold mb-0.5">Flow:</span>
                <span>{ex.flow}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. THE INVARIANT KEY RULE */}
      <div className="p-8 rounded-3xl bg-[#0B0B0B] border border-white/10 space-y-6">
        <div className="flex items-center gap-2">
          <BrainCircuit className="w-5 h-5 text-[#F26522]" />
          <h3 className="font-display font-bold text-xl text-[#F1EBE6]">
            The Invariant Systemic Rule
          </h3>
        </div>
        <p className="text-base text-[#F1EBE6] font-mono p-4 rounded-xl bg-white/5 border border-white/5">
          "{pattern.keyRule}"
        </p>

        {/* Where it appears cross domain */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t border-white/5">
          {pattern.whereItAppears.map((w, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#141414] border border-white/5">
              <span className="text-xs font-mono text-[#F26522] font-semibold block mb-1">
                {w.domain}
              </span>
              <p className="text-[11px] text-[#8A8582] font-body">{w.context}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 6. EARLY WARNING SIGNALS & COUNTER-ACTIONS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Warning Signals */}
        <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-amber-500/20 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-400 mb-3">
              <AlertTriangle className="w-4 h-4" />
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold">
                Early Warning Signal
              </h4>
            </div>
            <p className="text-sm text-[#F1EBE6] font-body leading-relaxed">
              {pattern.earlyWarningSignal}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#8A8582]">
            Monitor this leading metric before structural shift occurs.
          </div>
        </div>

        {/* Strategic Counter-Action */}
        <div className="p-6 rounded-2xl bg-[#0E0E0E] border border-[#F26522]/30 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-[#F26522] mb-3">
              <ShieldCheck className="w-4 h-4" />
              <h4 className="font-mono text-xs uppercase tracking-wider font-bold">
                Strategic Counter-Action / Leverage
              </h4>
            </div>
            <p className="text-sm text-[#F1EBE6] font-body leading-relaxed">
              {pattern.counterAction}
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#8A8582]">
            High-leverage intervention point for strategic decision-making.
          </div>
        </div>
      </div>

      {/* 7. SPOT IT MINI SCENARIO */}
      <div className="p-8 rounded-3xl bg-[#0F0F0F] border border-white/10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-[#F26522]" />
            <h3 className="font-display font-black text-2xl text-[#F1EBE6] tracking-tight">
              SPOT IT SCENARIO
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-400 font-semibold">+50 Pattern Pts</span>
        </div>

        <p className="text-sm text-[#F1EBE6] font-body leading-relaxed">
          {pattern.spotItScenario.scenario}
        </p>

        <div className="text-xs font-mono text-[#F26522] font-semibold">
          {pattern.spotItScenario.question}
        </div>

        <div className="space-y-2.5">
          {pattern.spotItScenario.options.map((opt, idx) => {
            let style = 'bg-[#0B0B0B] hover:bg-[#1A1A1A] border-white/5 text-[#8A8582]';
            if (hasSpotted) {
              if (idx === pattern.spotItScenario.correctIndex) {
                style = 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 font-bold';
              } else if (selectedSpot === idx) {
                style = 'bg-red-950/80 border-red-500/80 text-red-300';
              } else {
                style = 'opacity-40 bg-white/5 border-white/5 text-[#8A8582]';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSpotSubmit(idx)}
                disabled={hasSpotted}
                className={`w-full p-4 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${style}`}
              >
                <span>{opt}</span>
                {hasSpotted && idx === pattern.spotItScenario.correctIndex && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
                {hasSpotted && selectedSpot === idx && idx !== pattern.spotItScenario.correctIndex && (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {hasSpotted && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-[#F1EBE6] animate-in fade-in space-y-1">
            <span className="text-[#F26522] font-semibold uppercase block">Explanation:</span>
            <p className="text-[#8A8582] leading-relaxed">{pattern.spotItScenario.explanation}</p>
          </div>
        )}
      </div>

      {/* 8. INTERACTIVE LAB: PREDICT THE OUTCOME */}
      <div className="p-8 rounded-3xl bg-gradient-to-br from-[#141414] to-[#0A0A0A] border border-white/10 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F26522] animate-pulse" />
            <h3 className="font-display font-black text-2xl text-[#F1EBE6] tracking-tight">
              PREDICT WHAT HAPPENS NEXT
            </h3>
          </div>
          <span className="text-xs font-mono text-amber-400 font-semibold">+100 Pattern Pts</span>
        </div>

        <div className="p-4 rounded-xl bg-white/5 text-xs font-mono text-[#8A8582]">
          <span className="text-[#F1EBE6] font-semibold block mb-1">Current State:</span>
          {pattern.predictionScenario.currentState}
        </div>

        <p className="text-sm text-[#F1EBE6] font-body font-semibold">
          {pattern.predictionScenario.prompt}
        </p>

        <div className="space-y-2.5 pt-2">
          {pattern.predictionScenario.options.map((opt, idx) => {
            let style = 'bg-[#0B0B0B] hover:bg-[#1A1A1A] border-white/5 text-[#8A8582]';
            if (hasPredicted) {
              if (opt.isMostLikely) {
                style = 'bg-emerald-950/80 border-emerald-500/80 text-emerald-300 font-bold';
              } else if (selectedPrediction === idx) {
                style = 'bg-red-950/80 border-red-500/80 text-red-300';
              } else {
                style = 'opacity-40 bg-white/5 border-white/5 text-[#8A8582]';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handlePredictionSubmit(idx)}
                disabled={hasPredicted}
                className={`w-full p-4 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${style}`}
              >
                <div>
                  <span className="font-bold block text-[#F1EBE6]">{opt.label}</span>
                  <span className="text-[11px] opacity-80 mt-0.5 block">{opt.description}</span>
                </div>
                {hasPredicted && opt.isMostLikely && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 ml-2" />
                )}
                {hasPredicted && selectedPrediction === idx && !opt.isMostLikely && (
                  <XCircle className="w-4 h-4 text-red-400 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {hasPredicted && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono text-[#F1EBE6] animate-in fade-in space-y-2">
            <span className="text-[#F26522] font-semibold uppercase block">Systemic Explanation:</span>
            <p className="text-[#8A8582] leading-relaxed">{pattern.predictionScenario.explanation}</p>
            {pattern.predictionScenario.confidenceNotes && (
              <p className="text-[11px] text-amber-300 pt-1 border-t border-white/5">
                Note: {pattern.predictionScenario.confidenceNotes}
              </p>
            )}
          </div>
        )}
      </div>

      {/* 9. CONNECTED KNOWLEDGE GRAPH PATTERNS */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-[#F26522]" />
          <h3 className="font-display font-bold text-xl text-[#F1EBE6]">
            Isomorphic & Connected Patterns
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {relatedPatterns.map(rp => (
            <div
              key={rp.id}
              onClick={() => onSelectPattern(rp.id)}
              className="p-5 rounded-2xl bg-[#0B0B0B] border border-white/10 hover:border-[#F26522]/50 cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[10px] font-mono text-[#F26522] uppercase font-bold">
                  {rp.category}
                </span>
                <h4 className="font-display font-bold text-base text-[#F1EBE6] group-hover:text-[#F26522] transition-colors mt-1">
                  {rp.title}
                </h4>
                <p className="text-xs text-[#8A8582] line-clamp-2 mt-2 font-body">{rp.tagline}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#8A8582] group-hover:text-white">
                <span>Inspect Link</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
