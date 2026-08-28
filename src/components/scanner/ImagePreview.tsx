import React, { useState } from 'react';
import { UploadedFileItem } from './ImageUploader';
import {
  ArrowLeft,
  RotateCcw,
  Trash2,
  Sparkles,
  ArrowRight,
  HelpCircle,
  Eye,
  Sliders,
  Check
} from 'lucide-react';

interface ImagePreviewProps {
  images: UploadedFileItem[];
  mode: 'single' | 'compare';
  onAnalyze: (userPrompt: string) => void;
  onReplace: () => void;
  onRemove: (id: string) => void;
  onBack: () => void;
}

const PROMPT_SUGGESTIONS = [
  'Look for trends, inflection points & saturation limits',
  'Check for structural symmetry, repetition & cycles',
  'Identify potential throughput bottlenecks & flow constraints',
  'Analyze scale-free clustering & hub formations',
  'Detect speculative boom-bust asymmetries & outliers',
  'Find causal feedback loops & homeostatic balance'
];

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  images,
  mode,
  onAnalyze,
  onReplace,
  onRemove,
  onBack
}) => {
  const [userPrompt, setUserPrompt] = useState('');
  const isMulti = images.length > 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAnalyze(userPrompt.trim());
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-in fade-in">
      {/* Top Breadcrumb & Controls */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-mono text-[#8A8582] hover:text-[#F1EBE6] transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Upload</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onReplace}
            className="px-3.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-[#8A8582] hover:text-[#F1EBE6] flex items-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Replace Visual</span>
          </button>
        </div>
      </div>

      {/* Main Container Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Large Image Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative rounded-3xl bg-[#090909] border border-white/15 p-4 overflow-hidden shadow-2xl">
            {/* Technical Reticle Corners */}
            <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#F26522]" />
            <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#F26522]" />
            <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#F26522]" />
            <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#F26522]" />

            {/* If Single Image */}
            {!isMulti ? (
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-black overflow-hidden flex items-center justify-center p-2">
                <img
                  src={images[0]?.dataUrl}
                  alt={images[0]?.name || 'Target Pattern Visual'}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#F1EBE6] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#F26522]" />
                  <span>{images[0]?.name || 'Visual Target'}</span>
                </div>
              </div>
            ) : (
              /* If Comparing 2 or 3 Images */
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {images.map((img, idx) => (
                    <div
                      key={img.id}
                      className="relative aspect-square rounded-2xl bg-black border border-white/10 overflow-hidden flex items-center justify-center p-2 group"
                    >
                      <img
                        src={img.dataUrl}
                        alt={img.name}
                        className="w-full h-full object-contain"
                      />
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/85 border border-white/10 text-[10px] font-mono text-[#F1EBE6] font-bold">
                        Image {String.fromCharCode(65 + idx)}
                      </div>
                      <button
                        onClick={() => onRemove(img.id)}
                        className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/80 hover:bg-red-950 text-[#8A8582] hover:text-red-400 border border-white/10 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/5 text-center text-[11px] font-mono text-[#8A8582]">
                  Comparing {images.length} images for isomorphic pattern structures
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Analysis Controls & Guidance */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#F26522]">
                <Eye className="w-4 h-4" />
                <h3 className="font-mono text-xs uppercase tracking-wider font-bold">
                  Guided Visual Intelligence
                </h3>
              </div>
              <h2 className="font-display font-black text-2xl text-[#F1EBE6] tracking-tight">
                {isMulti ? 'Compare Image Dynamics' : 'Analyze Visual Pattern'}
              </h2>
              <p className="text-xs font-body text-[#8A8582] leading-relaxed">
                {isMulti
                  ? 'PATTERN AI will identify shared topological structures, diverging mechanisms, and the common underlying systemic law.'
                  : 'PATTERN AI will decompose this visual into observable evidence, recognized system dynamics, and future trajectory possibilities.'}
              </p>
            </div>

            {/* Optional Guidance Prompt */}
            <div className="space-y-2">
              <label
                htmlFor="guidance-input"
                className="block text-xs font-mono text-[#F1EBE6] font-semibold"
              >
                “What should I look for?” <span className="text-[#8A8582] font-normal">(Optional)</span>
              </label>

              <textarea
                id="guidance-input"
                value={userPrompt}
                onChange={e => setUserPrompt(e.target.value)}
                placeholder="Look for trends, repetition, symmetry, relationships, anomalies..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl bg-[#0F0F0F] border border-white/15 text-xs font-mono text-[#F1EBE6] placeholder-[#8A8582]/50 focus:outline-none focus:border-[#F26522] transition-colors resize-none"
              />
            </div>

            {/* Preset Guidance Suggestion Chips */}
            <div className="space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8582] block">
                Suggested Guidance Angles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PROMPT_SUGGESTIONS.map((sug, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setUserPrompt(sug)}
                    className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/15 text-[10px] font-mono text-[#8A8582] hover:text-[#F1EBE6] text-left transition-all"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-[#F26522] to-[#b3400a] text-white font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-[0_0_25px_rgba(242,101,34,0.4)] hover:brightness-110 active:scale-[0.99] transition-all"
              >
                <span>Analyze Pattern</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Safety & Epistemological Disclaimer */}
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-[11px] font-mono text-[#8A8582] space-y-1">
            <span className="text-[#F26522] font-semibold block">EPISTEMIC METHODOLOGY:</span>
            <p className="leading-relaxed">
              PATTERN strictly distinguishes between direct visual evidence, deductive models, and probabilistic future outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
