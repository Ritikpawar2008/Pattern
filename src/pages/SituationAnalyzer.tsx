import React, { useState } from 'react';
import { groqAiService } from '../services/groqAiService';
import { SituationAnalysisResult, UserProgress } from '../types';
import {
  Cpu,
  Sparkles,
  ArrowRight,
  HelpCircle,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  Share2,
  ShieldCheck,
  Zap,
  Flame,
  Layers
} from 'lucide-react';

interface SituationAnalyzerProps {
  onSelectPattern: (patternId: string) => void;
  userProgress: UserProgress;
  onRecordAnalysis: (patternName: string) => void;
}

const PRESET_SITUATIONS = [
  {
    label: 'Startup Scaling Chokepoint',
    text: 'Our startup acquired 10x new users this quarter, but engineering is completely overwhelmed, ticket backlog is 3 weeks long, and customer satisfaction is cratering.'
  },
  {
    label: 'Perverse Incentive Drift',
    text: 'We introduced a quarterly cash bonus for customer service reps based on total closed support tickets. Ticket numbers surged 300%, but unresolved complaint escalations doubled.'
  },
  {
    label: 'Habit Relapse Cycle',
    text: 'I maintain intense gym discipline for 3 weeks, miss a single day due to work travel, feel guilty, and abandon the entire routine for 2 months.'
  },
  {
    label: 'Speculative Asset Frenzy',
    text: 'Everyone in my network is buying a newly launched token that surged 500% in a week. People are borrowing on leverage, claiming the market cannot go down.'
  },
  {
    label: 'Compounding Plateau Lag',
    text: 'I have been practicing coding deliberately every single morning for 5 months, but I feel like my tangible progress is flat and invisible.'
  }
];

export const SituationAnalyzer: React.FC<SituationAnalyzerProps> = ({
  onSelectPattern,
  userProgress,
  onRecordAnalysis
}) => {
  const [inputText, setInputText] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [result, setResult] = useState<SituationAnalysisResult | null>(null);

  const handleAnalyze = async () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    try {
      const res = await groqAiService.analyzeSituation(inputText);
      setResult(res);
      onRecordAnalysis(res.patternName);
    } catch (e) {
      console.warn('Situation analysis notice:', e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyPreset = async (text: string) => {
    setInputText(text);
    setIsAnalyzing(true);
    try {
      const res = await groqAiService.analyzeSituation(text);
      setResult(res);
      onRecordAnalysis(res.patternName);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 pb-20 font-sans">
      {/* Top Header */}
      <div className="pb-6 border-b border-[#F7F4EE]/10 space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#E4572E] animate-pulse" />
          <span className="text-xs font-mono text-[#D4A373] uppercase tracking-widest font-semibold">
            Groq AI Cognitive Diagnostic Engine
          </span>
        </div>
        <h1 className="font-serif font-bold text-4xl sm:text-5xl text-[#F7F4EE] tracking-tight">
          Situation Analyzer
        </h1>
        <p className="text-sm md:text-base text-[#A39D93] leading-relaxed max-w-2xl">
          Describe any confusing, recurring, or escalating scenario in your work, habits, or organization.
          Our systems engine parses structural dynamics to diagnose the hidden mental model and forecast second-order trajectories.
        </p>
      </div>

      {/* Input Box & Preset Chips */}
      <div className="editorial-card rounded-3xl p-6 md:p-8 bg-[#121210] border border-[#F7F4EE]/10 shadow-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-sans text-[#A39D93] uppercase tracking-wider font-semibold flex items-center justify-between">
            <span>Describe your situation:</span>
            <span className="font-mono text-[11px]">{inputText.length} characters</span>
          </label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="E.g., We introduced a new feature to speed up customer onboarding, but support volume doubled because users are skipping crucial verification steps..."
            rows={5}
            className="w-full p-4 rounded-2xl bg-[#181815] border border-white/10 text-sm text-[#F7F4EE] placeholder-[#6E685F] focus:outline-none focus:border-[#E4572E] font-sans leading-relaxed transition-colors"
          />
        </div>

        {/* Preset Chips */}
        <div className="space-y-2.5">
          <span className="text-xs font-mono text-[#D4A373] font-semibold">Test real-world scenarios:</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_SITUATIONS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.text)}
                className="px-3.5 py-1.5 rounded-xl bg-[#181815] hover:bg-[#242420] border border-white/5 hover:border-white/20 text-xs font-sans text-[#F7F4EE] transition-all"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <button
            onClick={() => {
              setInputText('');
              setResult(null);
            }}
            className="text-xs font-sans text-[#A39D93] hover:text-[#F7F4EE] flex items-center gap-1.5 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
            className="px-8 py-3.5 rounded-xl bg-[#E4572E] hover:bg-[#F26522] disabled:opacity-40 text-white font-bold text-xs font-sans uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg hover:shadow-orange-950/50"
          >
            <Cpu className="w-4 h-4" />
            <span>{isAnalyzing ? 'Diagnosing System Dynamics...' : 'Analyze Pattern with Groq AI'}</span>
          </button>
        </div>
      </div>

      {/* Analysis Results View */}
      {result && (
        <div className="editorial-card rounded-3xl p-6 md:p-8 bg-[#121210] border border-[#F7F4EE]/15 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300 shadow-2xl">
          {/* Result Header & Confidence */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[11px] font-mono text-[#E4572E] uppercase tracking-widest font-bold">
                Detected Systemic Architecture
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-[#F7F4EE] mt-1">
                {result.patternName}
              </h2>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div
                className={`px-3.5 py-1.5 rounded-xl text-xs font-sans font-bold flex items-center gap-1.5 ${
                  result.confidence === 'High'
                    ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40'
                    : result.confidence === 'Moderate'
                    ? 'bg-amber-950/70 text-amber-300 border border-amber-500/40'
                    : 'bg-white/10 text-[#F7F4EE] border border-white/10'
                }`}
              >
                <span>Confidence:</span>
                <span>{result.confidence} ({result.confidenceScore}%)</span>
              </div>
            </div>
          </div>

          {/* Why Section */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-mono text-[#E4572E] font-semibold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Root Cause Diagnosis:</span>
            </div>
            <p className="text-sm md:text-base text-[#F7F4EE] font-sans leading-relaxed p-5 rounded-2xl bg-[#181815] border border-white/5">
              {result.why}
            </p>
          </div>

          {/* Key Signals Detected */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#A39D93] uppercase tracking-wider font-semibold">
              Diagnostic Signals Identified:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.keySignals.map((sig, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-[#181815] border border-white/5 text-xs font-sans text-[#A39D93]"
                >
                  <span className="text-[#E4572E] font-mono text-[11px] block mb-1">Signal 0{idx + 1}</span>
                  <span className="text-[#F7F4EE] font-medium">{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Questions to Consider */}
          <div className="p-6 rounded-2xl bg-[#181815] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#D4A373] font-semibold uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Diagnostic Reflection Questions:</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-sans text-[#A39D93]">
              {result.diagnosticQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-[#E4572E] mt-0.5 font-bold">●</span>
                  <span className="text-[#F7F4EE]">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3 Possible Future Trajectories */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F7F4EE] font-semibold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-[#E4572E]" />
                <span>Second-Order Trajectories &amp; Consequence Forecasts:</span>
              </div>
              <span className="text-[10px] font-mono text-[#6E685F] italic">
                *Probabilistic projections based on systemic feedback
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.outcomes.map((out, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#181815] border border-white/5 flex flex-col justify-between"
                >
                  <div>
                    <span
                      className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-bold inline-block mb-3 ${
                        out.probability === 'Most Likely'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : out.probability === 'Possible'
                          ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          : 'bg-red-500/20 text-red-300 border border-red-500/30'
                      }`}
                    >
                      {out.probability}
                    </span>
                    <h4 className="font-serif font-bold text-lg text-[#F7F4EE]">{out.title}</h4>
                    <p className="text-xs text-[#A39D93] mt-2 font-sans leading-relaxed">
                      {out.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-sans">
                    <span className="font-semibold text-[#D4A373] block mb-0.5">High-Leverage Intervention:</span>
                    <span className="text-[#F7F4EE]">{out.recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Pattern Drilldown */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-sans text-[#A39D93]">
              Study the theoretical framework: <strong className="text-[#F7F4EE] font-serif">{result.patternName}</strong>
            </div>
            <button
              onClick={() => onSelectPattern(result.patternId)}
              className="px-6 py-2.5 rounded-xl bg-[#1C1C18] hover:bg-[#E4572E] hover:text-white text-[#F7F4EE] text-xs font-sans font-bold transition-all flex items-center gap-2 border border-white/10"
            >
              <span>Inspect Full Model</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
