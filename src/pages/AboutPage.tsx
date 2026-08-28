import React from 'react';
import { PatternLogo } from '../components/brand/PatternLogo';
import { ArrowRight, Sparkles, BrainCircuit, Eye, Zap, Share2, Target, ShieldCheck } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Top Header with Master Brand Lockup */}
      <div className="text-center flex flex-col items-center space-y-6">
        <div className="p-8 rounded-3xl bg-black border border-white/10 shadow-[0_0_50px_rgba(242,101,34,0.15)] flex flex-col items-center justify-center">
          <PatternLogo
            variant="full"
            size={110}
            glow={true}
            animated={true}
          />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          The Cognitive Meta-Skill
        </div>
      </div>

      {/* Core Essay */}
      <div className="p-8 md:p-12 rounded-3xl bg-[#0B0B0B] border border-white/10 space-y-8 text-sm md:text-base text-[#8A8582] font-body leading-relaxed shadow-2xl">
        <div className="space-y-4">
          <h2 className="font-display font-bold text-2xl text-[#F1EBE6]">
            The Foundation of Human Intelligence
          </h2>
          <p>
            Human beings are, at their evolutionary core, biological pattern recognition engines.
            From our ancestors tracking animal migration routes across ancient savannahs to modern
            engineers diagnosing memory leaks in distributed cloud architectures, our ability to
            survive and thrive depends entirely on extracting structural signal from noisy environments.
          </p>
          <p>
            Yet our modern educational and professional systems compartmentalize knowledge into rigid,
            isolated silos. Economists study market cycles without understanding evolutionary biology.
            Software engineers optimize queue latencies without recognizing the principles of highway
            traffic jams. Marketers launch campaigns without observing the universal mathematics of
            epidemiological viral contagion.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#121212] border-l-2 border-[#F26522] text-[#F1EBE6] italic space-y-2">
          <p>
            "A master does not memorize 10,000 separate facts. A master recognizes the 50 fundamental
            architectural patterns that generate those 10,000 facts."
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="font-display font-bold text-2xl text-[#F1EBE6]">
            The Cross-Domain Isomorphism Principle
          </h2>
          <p>
            When two completely distinct phenomena share the same mathematical or causal engine, they are
            isomorphic. In <strong>PATTERN</strong>, we map these isomorphisms directly:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm font-mono text-[#F1EBE6]">
            <li className="flex items-start gap-2">
              <span className="text-[#F26522]">●</span>
              <span><strong>Feedback Loops:</strong> Cement human dopamine habits & power social creator virality.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#F26522]">●</span>
              <span><strong>Bottlenecks:</strong> Constrain factory assembly lines & stall custom silicon fabrication.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#F26522]">●</span>
              <span><strong>Goodhart’s Law:</strong> Explains British colonial cobra breeding & corporate quota gaming.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#F26522]">●</span>
              <span><strong>S-Curves:</strong> Predict the fall of Kodak film & the global tipping point of electric mobility.</span>
            </li>
          </ul>
        </div>

        <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="text-xs font-mono text-[#8A8582]">
            Ready to calibrate your pattern recognition engine?
          </div>
          <button
            onClick={() => onNavigate('explore')}
            className="px-6 py-3 rounded-xl bg-[#F26522] hover:bg-[#ff7638] text-white font-semibold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(242,101,34,0.4)]"
          >
            <span>Enter The Universe</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
