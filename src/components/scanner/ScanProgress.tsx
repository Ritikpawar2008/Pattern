import React, { useState, useEffect } from 'react';
import { Eye, Search, Layers, Share2, Sparkles, CheckCircle2, Loader2 } from 'lucide-react';

interface ScanProgressProps {
  imageThumbnailUrl?: string;
  isMultiImage?: boolean;
}

const STAGES = [
  {
    id: 'observe',
    label: 'OBSERVING IMAGE',
    subtext: 'Scanning density gradients, axes, boundaries, and geometric units',
    icon: Eye
  },
  {
    id: 'identify',
    label: 'IDENTIFYING STRUCTURES',
    subtext: 'Detecting non-linear curves, symmetry, clusters, and inflection points',
    icon: Search
  },
  {
    id: 'compare',
    label: 'COMPARING PATTERNS',
    subtext: 'Matching against systems dynamics archetypes (S-Curves, Loops, Bottlenecks)',
    icon: Layers
  },
  {
    id: 'connect',
    label: 'CONNECTING CONTEXT',
    subtext: 'Evaluating cross-domain isomorphisms (Business, Nature, Technology, Markets)',
    icon: Share2
  },
  {
    id: 'generate',
    label: 'GENERATING INSIGHT',
    subtext: 'Synthesizing evidence, invariant mechanics, and forward trajectory scenarios',
    icon: Sparkles
  }
];

export const ScanProgress: React.FC<ScanProgressProps> = ({
  imageThumbnailUrl,
  isMultiImage = false
}) => {
  const [activeStageIndex, setActiveStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStageIndex(prev => {
        if (prev < STAGES.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-8 rounded-3xl bg-[#0B0B0B] border border-white/10 shadow-2xl space-y-8 animate-in fade-in">
      {/* Top Scanning Visual Banner */}
      <div className="relative w-full h-44 rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center">
        {imageThumbnailUrl ? (
          <div className="relative w-full h-full">
            <img
              src={imageThumbnailUrl}
              alt="Scan Target"
              className="w-full h-full object-contain opacity-40 blur-[0.5px]"
            />
            {/* Scanning Laser Sweep */}
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#F26522] to-transparent shadow-[0_0_15px_#F26522] animate-bounce" />
            <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]/80" />
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#F26522] animate-spin" />
            <span className="text-xs font-mono text-[#8A8582]">Visual Ingestion Active</span>
          </div>
        )}

        {/* Technical Corner Reticles */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#F26522]" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#F26522]" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#F26522]" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#F26522]" />

        {/* Status Badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#111]/90 border border-white/10 text-[10px] font-mono text-[#F26522] flex items-center gap-1.5 backdrop-blur-sm">
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>ANALYZING MULTIMODAL TOPOLOGY...</span>
        </div>
      </div>

      {/* Progressive Stage Stepper */}
      <div className="space-y-3">
        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < activeStageIndex;
          const isCurrent = idx === activeStageIndex;
          const isPending = idx > activeStageIndex;

          return (
            <div
              key={stage.id}
              className={`p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between ${
                isCurrent
                  ? 'bg-[#141414] border-[#F26522]/60 shadow-[0_0_20px_rgba(242,101,34,0.15)] scale-[1.01]'
                  : isDone
                  ? 'bg-[#0E0E0E] border-white/10 opacity-90'
                  : 'bg-white/[0.02] border-white/5 opacity-40'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center border text-xs font-mono transition-colors ${
                    isDone
                      ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-400'
                      : isCurrent
                      ? 'bg-[#F26522]/20 border-[#F26522] text-[#F26522]'
                      : 'bg-white/5 border-white/5 text-[#8A8582]'
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : isCurrent ? (
                    <Icon className="w-4 h-4 animate-pulse" />
                  ) : (
                    <span>0{idx + 1}</span>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4
                      className={`text-xs font-mono font-bold tracking-wider ${
                        isCurrent
                          ? 'text-[#F1EBE6]'
                          : isDone
                          ? 'text-[#F1EBE6]'
                          : 'text-[#8A8582]'
                      }`}
                    >
                      {stage.label}
                    </h4>
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F26522] animate-ping" />
                    )}
                  </div>
                  <p className="text-[11px] font-body text-[#8A8582] mt-0.5">
                    {stage.subtext}
                  </p>
                </div>
              </div>

              <div className="text-[10px] font-mono shrink-0 pl-3">
                {isDone && <span className="text-emerald-400 font-semibold">VERIFIED</span>}
                {isCurrent && <span className="text-[#F26522] animate-pulse">PROCESSING...</span>}
                {isPending && <span className="text-[#8A8582]/50">QUEUED</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5 pt-2">
        <div className="flex justify-between text-[11px] font-mono text-[#8A8582]">
          <span>Multimodal Inference Engine</span>
          <span>{Math.round(((activeStageIndex + 1) / STAGES.length) * 100)}%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#F26522] to-amber-400 transition-all duration-500 ease-out"
            style={{ width: `${((activeStageIndex + 1) / STAGES.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};
