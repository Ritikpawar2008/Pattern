import React, { useState } from 'react';
import { PatternScanAnalysis, ScanChatMessage, ScanSavedPattern } from '../../types';
import { PatternVisualizer } from '../PatternVisualizer';
import { geminiVisionService, ImagePayload } from '../../services/geminiVisionService';
import {
  Bookmark,
  BookmarkCheck,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldAlert,
  Send,
  Loader2,
  Copy,
  Check,
  MessageSquare,
  AlertTriangle,
  Compass,
  ExternalLink,
  ChevronRight,
  Info,
  TrendingUp,
  BrainCircuit,
  Eye
} from 'lucide-react';

interface PatternAnalysisViewProps {
  analysis: PatternScanAnalysis;
  images: ImagePayload[];
  userPrompt?: string;
  isSaved?: boolean;
  onSave: (chatHistory: ScanChatMessage[]) => void;
  onNewScan: () => void;
  onRescanWithPrompt: (newPrompt: string) => void;
  onSelectPatternByName?: (patternName: string) => void;
}

const ASK_IMAGE_PRESETS = [
  'What is the primary inflection point in this visual?',
  'Why does this dynamic differ from pure exponential growth?',
  'What leading indicator would signal the pattern is failing?',
  'How would an external shock destabilize this system?'
];

export const PatternAnalysisView: React.FC<PatternAnalysisViewProps> = ({
  analysis,
  images,
  userPrompt,
  isSaved = false,
  onSave,
  onNewScan,
  onRescanWithPrompt,
  onSelectPatternByName
}) => {
  const [chatMessages, setChatMessages] = useState<ScanChatMessage[]>([]);
  const [questionInput, setQuestionInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedLocal, setSavedLocal] = useState(isSaved);

  const confidenceColor =
    analysis.primaryPattern.confidence === 'High'
      ? 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40'
      : analysis.primaryPattern.confidence === 'Moderate'
      ? 'text-amber-400 bg-amber-950/60 border-amber-500/40'
      : 'text-orange-400 bg-orange-950/60 border-orange-500/40';

  const handleAskQuestion = async (qText?: string) => {
    const query = qText || questionInput.trim();
    if (!query || isAsking) return;

    const userMsg: ScanChatMessage = {
      id: 'msg-' + Math.random().toString(36).substring(2, 9),
      role: 'user',
      text: query,
      timestamp: Date.now()
    };

    setChatMessages(prev => [...prev, userMsg]);
    setQuestionInput('');
    setIsAsking(true);

    try {
      const response = await geminiVisionService.askImage(
        images,
        query,
        analysis,
        chatMessages
      );

      const aiMsg: ScanChatMessage = {
        id: 'msg-' + Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        text: response.answer,
        visualEvidence: response.visualEvidence,
        alternativeHypothesis: response.alternativeHypothesis,
        timestamp: Date.now()
      };

      setChatMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('Failed to ask image', err);
    } finally {
      setIsAsking(false);
    }
  };

  const handleCopySummary = () => {
    const summaryText = `[PATTERN SCAN REPORT]
Target Pattern: ${analysis.primaryPattern.name} (${analysis.primaryPattern.category})
Confidence: ${analysis.primaryPattern.confidence} (${analysis.primaryPattern.confidenceScore}%)
Visual Structure: ${analysis.visualStructure}

OBSERVATIONS:
${analysis.observations.map(o => `• ${o}`).join('\n')}

EXPLANATION:
${analysis.reasoning}

FORWARD SCENARIOS:
${analysis.possibleOutcomes.map(p => `• [${p.likelihood}] ${p.title}: ${p.description} (Watch: ${p.indicatorToWatch})`).join('\n')}

Analyzed via PATTERN Vision Intelligence
https://pattern.app`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSaveClick = () => {
    if (!savedLocal) {
      setSavedLocal(true);
      onSave(chatMessages);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10 animate-in fade-in">
      {/* Top Action & Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0E0E0E] border border-white/10 sticky top-20 z-30 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            onClick={onNewScan}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#8A8582] hover:text-[#F1EBE6] flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>New Scan</span>
          </button>

          {userPrompt && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-xl bg-[#141414] border border-white/5 text-[11px] font-mono text-[#8A8582]">
              <span className="text-[#F26522]">Focus:</span>
              <span className="text-[#F1EBE6] truncate max-w-xs">"{userPrompt}"</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopySummary}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#8A8582] hover:text-[#F1EBE6] flex items-center gap-2 transition-all"
            title="Copy Report"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Export Report</span>
              </>
            )}
          </button>

          <button
            onClick={handleSaveClick}
            disabled={savedLocal}
            className={`px-4 py-1.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-all ${
              savedLocal
                ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40'
                : 'bg-[#F26522] hover:bg-[#b3400a] text-white shadow-[0_0_15px_rgba(242,101,34,0.3)]'
            }`}
          >
            {savedLocal ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5" />
                <span>Saved To Library</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5" />
                <span>Save Pattern</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* 1. STRONGEST PATTERN IDENTIFIED HERO */}
      <div className="relative p-8 sm:p-10 rounded-3xl bg-[#090909] border border-white/15 overflow-hidden space-y-6 shadow-2xl">
        {/* Subtle background glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F26522]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-lg bg-[#F26522]/20 border border-[#F26522]/40 text-[#F26522] text-xs font-mono font-bold uppercase tracking-wider">
              {analysis.primaryPattern.category}
            </span>
            <span className="text-xs font-mono text-[#8A8582]">
              Primary Topological Pattern
            </span>
          </div>

          {/* Confidence Indicator with Tooltip note */}
          <div className={`px-3.5 py-1.5 rounded-xl border text-xs font-mono font-semibold flex items-center gap-2 ${confidenceColor}`}>
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>
              {analysis.primaryPattern.confidence} Confidence ({analysis.primaryPattern.confidenceScore}%)
            </span>
          </div>
        </div>

        <div className="space-y-3 relative z-10">
          <h1 className="font-display font-black text-3xl sm:text-4xl md:text-5xl text-[#F1EBE6] tracking-tight leading-tight">
            {analysis.primaryPattern.name}
          </h1>
          {analysis.primaryPattern.tagline && (
            <p className="font-mono text-sm sm:text-base text-[#F26522] font-semibold">
              {analysis.primaryPattern.tagline}
            </p>
          )}
        </div>

        {/* Visual Structure Banner String */}
        <div className="p-4 rounded-2xl bg-black border border-white/10 font-mono text-xs text-[#F1EBE6] flex items-center justify-between overflow-x-auto relative z-10">
          <span className="text-[#8A8582] text-[10px] uppercase font-bold shrink-0 mr-4">
            Structural Code:
          </span>
          <span className="text-[#F26522] font-bold tracking-wider whitespace-nowrap">
            {analysis.visualStructure}
          </span>
        </div>
      </div>

      {/* MULTI-IMAGE COMPARISON INSIGHTS (If multi-image mode) */}
      {analysis.comparisonInsights && (
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E0E0E] border border-[#F26522]/30 space-y-6">
          <div className="flex items-center gap-2 text-[#F26522]">
            <Layers className="w-5 h-5" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold">
              Comparative Topological Synthesis
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3 p-5 rounded-2xl bg-black/60 border border-white/10">
              <h4 className="font-display font-bold text-sm text-[#F1EBE6] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                Shared Isomorphic Structures
              </h4>
              <ul className="space-y-2 text-xs font-body text-[#8A8582]">
                {analysis.comparisonInsights.sharedPatterns.map((shared, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#F26522] mt-0.5">•</span>
                    <span>{shared}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 p-5 rounded-2xl bg-black/60 border border-white/10">
              <h4 className="font-display font-bold text-sm text-[#F1EBE6] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Structural Divergences
              </h4>
              <ul className="space-y-2 text-xs font-body text-[#8A8582]">
                {analysis.comparisonInsights.structuralDifferences.map((diff, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-400 mt-0.5">•</span>
                    <span>{diff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#141414] border border-white/5 text-xs font-mono text-[#F1EBE6] leading-relaxed">
            <span className="text-[#F26522] font-semibold block mb-1">COMMON UNDERLYING DYNAMIC:</span>
            {analysis.comparisonInsights.commonUnderlyingDynamic}
          </div>
        </div>
      )}

      {/* 2 & 3. WHAT I SEE (OBSERVATION) & WHY THIS LOOKS LIKE A PATTERN */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Empirical Observations */}
        <div className="md:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-4 h-full flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[#8A8582]">
                <Eye className="w-4 h-4 text-[#F26522]" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F1EBE6]">
                  What I See (Observed Evidence)
                </h3>
              </div>

              <p className="text-[11px] font-mono text-[#8A8582]">
                Raw visual elements directly present in the image(s):
              </p>

              <ul className="space-y-3">
                {analysis.observations.map((obs, idx) => (
                  <li
                    key={idx}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs font-body text-[#F1EBE6] flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-md bg-[#161616] border border-white/10 flex items-center justify-center text-[10px] font-mono text-[#F26522] shrink-0">
                      0{idx + 1}
                    </span>
                    <span className="leading-relaxed">{obs}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Input Snapshot Thumbnail */}
            {images.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono text-[#8A8582] uppercase block mb-2">
                  Source Scan Target:
                </span>
                <div className="h-28 rounded-xl bg-black border border-white/10 overflow-hidden flex items-center justify-center p-1">
                  <img
                    src={images[0].dataUrl}
                    alt="Scan thumbnail"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Structural Mechanism & Reasoning */}
        <div className="md:col-span-7 space-y-4">
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-5 h-full">
            <div className="flex items-center gap-2 text-[#8A8582]">
              <BrainCircuit className="w-4 h-4 text-[#F26522]" />
              <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F1EBE6]">
                Why This Looks Like A Pattern (Logic)
              </h3>
            </div>

            <p className="text-sm font-body text-[#F1EBE6] leading-relaxed">
              {analysis.reasoning}
            </p>

            {/* Invariant Phases */}
            <div className="pt-4 space-y-2.5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8582] block">
                Sequential State Transitions:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {analysis.flowSteps.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl bg-white/[0.02] border border-white/5 text-center space-y-1"
                  >
                    <span className="text-[9px] font-mono text-[#F26522] block font-bold">
                      STAGE 0{idx + 1}
                    </span>
                    <span className="text-[11px] font-mono text-[#F1EBE6] block font-medium">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. PATTERN VISUALIZATION SANDBOX */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0A0A0A] border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#F26522]" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F1EBE6]">
              Interactive Pattern Dynamics Visualizer
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#8A8582]">
            Model Archetype: {analysis.visualType}
          </span>
        </div>

        <div className="rounded-2xl bg-black border border-white/10 p-4">
          <PatternVisualizer
            type={analysis.visualType}
            flowSteps={analysis.flowSteps}
            title={analysis.primaryPattern.name}
          />
        </div>
      </div>

      {/* 5 & 6. WHERE THIS PATTERN APPEARS & RELATED PATTERNS */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Compass className="w-4 h-4 text-[#F26522]" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F1EBE6]">
              Where This Pattern Manifests In Reality
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#8A8582]">
            Universal cross-domain isomorphisms
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {analysis.whereItAppears.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#0D0D0D] border border-white/10 space-y-2 hover:border-[#F26522]/50 transition-colors flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-[#F26522] tracking-wider block">
                  {item.domain}
                </span>
                <p className="text-xs font-body text-[#8A8582] leading-relaxed">
                  {item.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* RELATED PATTERNS */}
      {analysis.relatedPatterns.length > 0 && (
        <div className="p-6 rounded-3xl bg-[#0B0B0B] border border-white/10 space-y-4">
          <div className="flex items-center gap-2 text-[#8A8582]">
            <Layers className="w-4 h-4 text-[#F26522]" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F1EBE6]">
              Related Structural Patterns &amp; Alternative Readings
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {analysis.relatedPatterns.map((rel, idx) => (
              <div
                key={idx}
                onClick={() => onSelectPatternByName && onSelectPatternByName(rel.name)}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-[#F26522]/50 hover:bg-white/[0.04] cursor-pointer transition-all space-y-1.5 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase text-[#F26522] font-semibold">
                    {rel.category}
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#8A8582] group-hover:translate-x-1 group-hover:text-white transition-all" />
                </div>
                <h4 className="font-display font-bold text-xs text-[#F1EBE6] group-hover:text-[#F26522] transition-colors">
                  {rel.name}
                </h4>
                <p className="text-[11px] font-body text-[#8A8582] line-clamp-2">
                  {rel.reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. WHAT COULD COME NEXT? (POSSIBILITIES & INDICATORS) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#090909] border border-white/10 space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#F26522]">
            <Sparkles className="w-4 h-4" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold">
              What Could Come Next? (If This Pattern Continues...)
            </h3>
          </div>
          <p className="text-xs font-mono text-[#8A8582]">
            Probabilistic forward branches based on systemic mechanics — not certainties.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {analysis.possibleOutcomes.map((outcome, idx) => {
            const badgeColor =
              outcome.likelihood === 'Possible'
                ? 'bg-blue-950/60 text-blue-400 border-blue-500/40'
                : outcome.likelihood === 'Tail Risk'
                ? 'bg-red-950/60 text-red-400 border-red-500/40'
                : 'bg-purple-950/60 text-purple-400 border-purple-500/40';

            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-[#111] border border-white/10 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <span className={`inline-block px-2.5 py-0.5 rounded-md border text-[9px] font-mono uppercase font-bold tracking-wider ${badgeColor}`}>
                    {outcome.likelihood}
                  </span>
                  <h4 className="font-display font-bold text-sm text-[#F1EBE6] leading-snug">
                    {outcome.title}
                  </h4>
                  <p className="text-xs font-body text-[#8A8582] leading-relaxed">
                    {outcome.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 space-y-1">
                  <span className="text-[9px] font-mono text-[#F26522] uppercase font-bold block">
                    Leading Indicator to Watch:
                  </span>
                  <p className="text-[11px] font-mono text-[#F1EBE6]">
                    {outcome.indicatorToWatch}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 8. UNCERTAINTIES & LIMITATIONS CALLOUT */}
      <div className="p-5 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs font-mono text-amber-200/90 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-400">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>UNCERTAINTIES &amp; EPISTEMIC LIMITATIONS</span>
        </div>
        <ul className="space-y-1 text-[11px] text-amber-300/80 list-disc list-inside">
          {analysis.uncertainties.map((unc, idx) => (
            <li key={idx}>{unc}</li>
          ))}
        </ul>
      </div>

      {/* 9. ASK THE IMAGE (INTERACTIVE Q&A) */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#090909] border border-white/10 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#F26522]">
            <MessageSquare className="w-4 h-4" />
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-[#F1EBE6]">
              Ask The Image (Interactive Deep Dive)
            </h3>
          </div>
          <span className="text-[11px] font-mono text-[#8A8582]">
            Ground follow-up queries in visual evidence
          </span>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex flex-wrap gap-2">
          {ASK_IMAGE_PRESETS.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => handleAskQuestion(preset)}
              disabled={isAsking}
              className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#8A8582] hover:text-[#F1EBE6] text-left transition-all disabled:opacity-50"
            >
              {preset}
            </button>
          ))}
        </div>

        {/* Chat History List */}
        {chatMessages.length > 0 && (
          <div className="space-y-4 pt-2">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`p-4 rounded-2xl space-y-2 ${
                  msg.role === 'user'
                    ? 'bg-[#181818] border border-white/10 ml-8 text-right'
                    : 'bg-[#111] border border-[#F26522]/30 mr-8 text-left'
                }`}
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#8A8582]">
                  {msg.role === 'user' ? (
                    <span className="font-bold text-[#F1EBE6]">You</span>
                  ) : (
                    <div className="flex items-center gap-1 text-[#F26522] font-bold">
                      <Sparkles className="w-3 h-3" />
                      <span>PATTERN AI (Grounded in Visual)</span>
                    </div>
                  )}
                </div>

                <p className="text-xs font-body text-[#F1EBE6] leading-relaxed text-left">
                  {msg.text}
                </p>

                {/* Evidence citations if present */}
                {msg.visualEvidence && msg.visualEvidence.length > 0 && (
                  <div className="pt-2 border-t border-white/5 text-left space-y-1">
                    <span className="text-[9px] font-mono uppercase text-[#F26522] font-bold block">
                      Observable Visual Evidence:
                    </span>
                    <ul className="text-[11px] font-mono text-[#8A8582] list-disc list-inside">
                      {msg.visualEvidence.map((ev, i) => (
                        <li key={i}>{ev}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="flex gap-2">
          <input
            type="text"
            value={questionInput}
            onChange={e => setQuestionInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAskQuestion();
              }
            }}
            placeholder="Ask anything about the geometry, trends, or systemic implications..."
            disabled={isAsking}
            className="flex-1 px-4 py-3 rounded-2xl bg-black border border-white/15 text-xs font-mono text-[#F1EBE6] placeholder-[#8A8582]/50 focus:outline-none focus:border-[#F26522] transition-colors"
          />

          <button
            onClick={() => handleAskQuestion()}
            disabled={!questionInput.trim() || isAsking}
            className="px-5 py-3 rounded-2xl bg-[#F26522] hover:bg-[#b3400a] text-white font-mono font-bold text-xs uppercase flex items-center gap-2 shadow-[0_0_15px_rgba(242,101,34,0.3)] disabled:opacity-40 transition-all"
          >
            {isAsking ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
