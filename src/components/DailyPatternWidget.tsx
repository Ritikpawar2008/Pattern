import React, { useState } from 'react';
import { PATTERNS } from '../data/patterns';
import { Pattern } from '../types';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, Lightbulb, Compass } from 'lucide-react';

interface DailyPatternWidgetProps {
  onSelectPattern: (id: string) => void;
}

export const DailyPatternWidget: React.FC<DailyPatternWidgetProps> = ({ onSelectPattern }) => {
  // Deterministic daily pattern
  const now = new Date();
  const dayOfYear = Math.floor(
    (now.getTime() - new Date(now.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24)
  );
  const patternIndex = dayOfYear % PATTERNS.length;
  const pattern: Pattern = PATTERNS[patternIndex] || PATTERNS[0];

  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const scenario = pattern.spotItScenario;

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;
    setSelectedAnswer(idx);
    setHasAnswered(true);
  };

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-[#121212] to-[#0A0A0A] border border-white/10 p-6 md:p-8 relative overflow-hidden shadow-2xl">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#F26522]/20 border border-[#F26522]/30 text-[#F26522] text-xs font-mono font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            PATTERN OF THE DAY
          </span>
          <span className="text-xs font-mono text-[#8A8582]">
            {now.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
        </div>

        <button
          onClick={() => onSelectPattern(pattern.id)}
          className="text-xs font-mono text-[#F1EBE6] hover:text-[#F26522] flex items-center gap-1.5 transition-colors group"
        >
          <span>Full Breakdown</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
        {/* Left Side: Summary & Architecture */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#F26522] uppercase tracking-wider mb-2">
              <span>{pattern.category}</span>
              <span>•</span>
              <span>Architecture</span>
            </div>
            <h3 className="font-display font-black text-2xl md:text-3xl text-[#F1EBE6] tracking-tight">
              {pattern.title}
            </h3>
            <p className="text-sm font-mono text-[#F26522] italic mt-1">"{pattern.tagline}"</p>
            <p className="text-sm text-[#8A8582] mt-4 leading-relaxed line-clamp-3">
              {pattern.definition}
            </p>
          </div>

          {/* Real World Micro Hook */}
          <div className="mt-6 p-4 rounded-xl bg-white/5 border border-white/5 flex items-start gap-3">
            <Lightbulb className="w-5 h-5 text-[#F26522] shrink-0 mt-0.5" />
            <div className="text-xs font-mono">
              <span className="text-[#F1EBE6] font-semibold block mb-0.5">Where it repeats:</span>
              <span className="text-[#8A8582]">
                {pattern.realWorldExamples[0]?.title}: {pattern.realWorldExamples[0]?.description}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Micro-Challenge */}
        <div className="lg:col-span-5 bg-[#050505] border border-white/10 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono text-[#8A8582] uppercase tracking-wider">
                Quick Daily Test
              </span>
              <span className="text-[10px] font-mono text-[#F26522]">+50 pts</span>
            </div>
            <p className="text-xs text-[#F1EBE6] font-body leading-relaxed mb-4">
              {scenario.scenario}
            </p>

            <div className="space-y-2">
              {scenario.options.map((opt, idx) => {
                let btnStyle = 'bg-white/5 hover:bg-white/10 text-[#8A8582] border-white/5';
                if (hasAnswered) {
                  if (idx === scenario.correctIndex) {
                    btnStyle = 'bg-emerald-950/60 border-emerald-500/60 text-emerald-300 font-semibold';
                  } else if (selectedAnswer === idx) {
                    btnStyle = 'bg-red-950/60 border-red-500/60 text-red-300';
                  } else {
                    btnStyle = 'opacity-40 bg-white/5 border-white/5 text-[#8A8582]';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={hasAnswered}
                    className={`w-full p-2.5 rounded-lg border text-left text-xs font-mono transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {hasAnswered && idx === scenario.correctIndex && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {hasAnswered && selectedAnswer === idx && idx !== scenario.correctIndex && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {hasAnswered && (
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-[#F1EBE6] animate-in fade-in">
              <p className="text-[#8A8582] leading-snug">{scenario.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
