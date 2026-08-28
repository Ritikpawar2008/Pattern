import React, { useState } from 'react';
import { analyzeSituationText } from '../utils/analyzerEngine';
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
  Zap
} from 'lucide-react';

interface SituationAnalyzerProps {
  onSelectPattern: (patternId: string) => void;
  userProgress: UserProgress;
  onRecordAnalysis: (patternName: string) => void;
}

const PRESET_SITUATIONS = [
  {
    label: 'Startup Scaling Choke',
    text: 'Our startup gained 10x users this quarter, but our engineering team is completely overwhelmed, ticket backlogs are 3 weeks long, and our net profit is actually dropping.'
  },
  {
    label: 'Habit Relapse Cycle',
    text: 'I start working out enthusiastically for 2 weeks every morning, then miss one single day due to work, feel guilty, and quit the habit entirely for 3 months.'
  },
  {
    label: 'Perverse Bonus Policy',
    text: 'We introduced a financial bonus for customer support agents based on number of closed tickets. Ticket numbers surged 300%, but customer complaints doubled and clients are furious.'
  },
  {
    label: 'Speculative Asset FOMO',
    text: 'Everyone in my group chat is buying this new crypto coin that doubled in 3 days. People are quitting jobs and borrowing on leverage saying it cannot lose.'
  },
  {
    label: 'Compounding Frustration',
    text: 'I have been coding every single day for 4 months with consistent discipline, but I still feel like I am making zero visible progress and have no clients.'
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

  const handleAnalyze = () => {
    if (!inputText.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const res = analyzeSituationText(inputText);
      setResult(res);
      setIsAnalyzing(false);
      onRecordAnalysis(res.patternName);
    }, 400);
  };

  const handleApplyPreset = (text: string) => {
    setInputText(text);
    const res = analyzeSituationText(text);
    setResult(res);
    onRecordAnalysis(res.patternName);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="pb-6 border-b border-white/10">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
          <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
            Heuristic Diagnostic System
          </span>
        </div>
        <h1 className="font-display font-black text-4xl sm:text-5xl text-[#F1EBE6] tracking-tight">
          SITUATION ANALYZER
        </h1>
        <p className="text-sm md:text-base text-[#8A8582] mt-2 max-w-2xl">
          Describe any confusing, recurring, or escalating situation. Our cognitive engine parses
          structural cues to diagnose the underlying mental model and predict second-order trajectories.
        </p>
      </div>

      {/* Input Box & Preset Chips */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0B0B0B] border border-white/10 shadow-2xl space-y-6">
        <div className="space-y-2">
          <label className="text-xs font-mono text-[#8A8582] uppercase tracking-wider flex items-center justify-between">
            <span>Describe your situation:</span>
            <span>{inputText.length} chars</span>
          </label>
          <textarea
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            placeholder="E.g., We launched a new referral discount, but users are making dummy accounts to get free credits and our server costs are exploding..."
            rows={5}
            className="w-full p-4 rounded-2xl bg-[#121212] border border-white/10 text-sm text-[#F1EBE6] placeholder-[#8A8582] focus:outline-none focus:border-[#F26522] font-body leading-relaxed transition-colors"
          />
        </div>

        {/* Preset Chips */}
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-[#8A8582]">Quick-test real-world scenarios:</span>
          <div className="flex flex-wrap gap-2">
            {PRESET_SITUATIONS.map((preset, idx) => (
              <button
                key={idx}
                onClick={() => handleApplyPreset(preset.text)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-xs font-mono text-[#F1EBE6] transition-all"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <button
            onClick={() => {
              setInputText('');
              setResult(null);
            }}
            className="text-xs font-mono text-[#8A8582] hover:text-[#F1EBE6] flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>

          <button
            onClick={handleAnalyze}
            disabled={!inputText.trim() || isAnalyzing}
            className="px-8 py-3.5 rounded-xl bg-[#F26522] hover:bg-[#ff7638] disabled:opacity-40 text-white font-semibold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(242,101,34,0.4)]"
          >
            <Cpu className="w-4 h-4" />
            <span>{isAnalyzing ? 'Analyzing System Dynamics...' : 'Analyze Pattern'}</span>
          </button>
        </div>
      </div>

      {/* Analysis Results View */}
      {result && (
        <div className="p-6 md:p-8 rounded-3xl bg-[#0E0E0E] border border-white/15 space-y-8 animate-in fade-in slide-in-from-bottom-3 duration-300 shadow-2xl">
          {/* Result Header & Confidence */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono text-[#F26522] uppercase tracking-widest font-bold">
                Detected Pattern Architecture
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F1EBE6] mt-1">
                {result.patternName}
              </h2>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-auto">
              <div
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-1.5 ${
                  result.confidence === 'High'
                    ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/50'
                    : result.confidence === 'Moderate'
                    ? 'bg-amber-950/80 text-amber-300 border border-amber-500/50'
                    : 'bg-white/10 text-[#F1EBE6] border border-white/10'
                }`}
              >
                <span>Confidence:</span>
                <span>{result.confidence} ({result.confidenceScore}%)</span>
              </div>
            </div>
          </div>

          {/* Why Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F26522] font-semibold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Why This Pattern Was Detected:</span>
            </div>
            <p className="text-sm md:text-base text-[#F1EBE6] font-body leading-relaxed p-4 rounded-2xl bg-white/5 border border-white/5">
              {result.why}
            </p>
          </div>

          {/* Key Signals Detected */}
          <div className="space-y-3">
            <div className="text-xs font-mono text-[#8A8582] uppercase tracking-wider">
              Diagnostic Signals Identified:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {result.keySignals.map((sig, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#141414] border border-white/5 text-xs font-mono text-[#8A8582]"
                >
                  <span className="text-[#F26522] block mb-1">Signal 0{idx + 1}</span>
                  <span className="text-[#F1EBE6]">{sig}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Questions to Consider */}
          <div className="p-6 rounded-2xl bg-[#121212] border border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-[#F26522] font-semibold uppercase">
              <HelpCircle className="w-4 h-4" />
              <span>Diagnostic Questions to Consider:</span>
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm font-mono text-[#8A8582]">
              {result.diagnosticQuestions.map((q, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#F26522] mt-0.5">●</span>
                  <span className="text-[#F1EBE6]">{q}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 3 Possible Future Outcomes */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-[#F1EBE6] font-semibold uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-[#F26522]" />
                <span>Possible Trajectories & Second-Order Consequences:</span>
              </div>
              <span className="text-[10px] font-mono text-[#8A8582] italic">
                *Predictions are probabilistic, not guaranteed.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.outcomes.map((out, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#141414] border border-white/5 flex flex-col justify-between"
                >
                  <div>
                    <span
                      className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded font-bold inline-block mb-2 ${
                        out.probability === 'Most Likely'
                          ? 'bg-amber-500/20 text-amber-300'
                          : out.probability === 'Possible'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {out.probability}
                    </span>
                    <h4 className="font-display font-bold text-base text-[#F1EBE6]">{out.title}</h4>
                    <p className="text-xs text-[#8A8582] mt-2 font-body leading-relaxed">
                      {out.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/5 text-[11px] font-mono text-[#F26522]">
                    <span className="font-semibold block mb-0.5">Action Lever:</span>
                    <span className="text-[#F1EBE6]">{out.recommendation}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Deep Pattern Drilldown */}
          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-[#8A8582]">
              Explore the master model: <strong>{result.patternName}</strong>
            </div>
            <button
              onClick={() => onSelectPattern(result.patternId)}
              className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-[#F26522] hover:text-white text-[#F1EBE6] text-xs font-mono font-semibold transition-all flex items-center gap-2"
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
