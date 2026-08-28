import React from 'react';
import { InteractivePatternMap } from '../components/InteractivePatternMap';
import { Share2, Info, ArrowRight, Sparkles } from 'lucide-react';

interface PatternMapPageProps {
  onSelectPattern: (patternId: string) => void;
}

export const PatternMapPage: React.FC<PatternMapPageProps> = ({ onSelectPattern }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#F26522]" />
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
              Spatial Network Visualization
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#F1EBE6] tracking-tight">
            THE PATTERN MAP
          </h1>
          <p className="text-sm md:text-base text-[#8A8582] mt-2 max-w-2xl">
            "Everything is connected." Pan, zoom, and trace the structural isomorphisms linking human
            habits, biological feedback, market panics, and exponential software networks.
          </p>
        </div>

        {/* Map stats */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#111] border border-white/10 text-xs font-mono text-[#8A8582] flex items-center gap-2">
            <Share2 className="w-4 h-4 text-[#F26522]" />
            <span>22 Nodes • 84 Edges</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Map Component */}
      <InteractivePatternMap onSelectPattern={onSelectPattern} />

      {/* Deep Connection Guide Below */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-[#F26522] font-semibold">01. Cross-Domain Loops</div>
          <h4 className="font-display font-bold text-base text-[#F1EBE6]">
            Feedback ↔ Habit ↔ Market Euphoria
          </h4>
          <p className="text-xs text-[#8A8582] leading-relaxed">
            The same reinforcing feedback mechanics that cement a nicotine habit also drive the parabolic
            melt-up of a speculative asset bubble.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-[#F26522] font-semibold">02. Power Law Asymmetry</div>
          <h4 className="font-display font-bold text-base text-[#F1EBE6]">
            Pareto ↔ Network Effects ↔ Bottlenecks
          </h4>
          <p className="text-xs text-[#8A8582] leading-relaxed">
            Quadratic network liquidity naturally creates winner-take-most Pareto distributions, shifting
            immense systemic risk onto the single narrowest bottleneck.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/5 space-y-2">
          <div className="text-xs font-mono text-[#F26522] font-semibold">03. Non-Linear Tipping Points</div>
          <h4 className="font-display font-bold text-base text-[#F1EBE6]">
            S-Curves ↔ Compounding ↔ Phase Changes
          </h4>
          <p className="text-xs text-[#8A8582] leading-relaxed">
            Early compounding feels flat and non-existent until crossing the critical threshold, triggering
            explosive exponential mainstream adoption.
          </p>
        </div>
      </div>
    </div>
  );
};
