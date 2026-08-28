import React, { useState } from 'react';
import { ScanSavedPattern } from '../../types';
import {
  X,
  Bookmark,
  Calendar,
  Layers,
  ArrowRight,
  Trash2,
  ExternalLink,
  Search,
  Sparkles
} from 'lucide-react';

interface ScanHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedScans: ScanSavedPattern[];
  onSelectScan: (scan: ScanSavedPattern) => void;
  onDeleteScan: (id: string) => void;
}

export const ScanHistoryModal: React.FC<ScanHistoryModalProps> = ({
  isOpen,
  onClose,
  savedScans,
  onSelectScan,
  onDeleteScan
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredScans = savedScans.filter(scan => {
    const q = searchQuery.toLowerCase();
    return (
      scan.patternName.toLowerCase().includes(q) ||
      scan.category.toLowerCase().includes(q) ||
      scan.shortExplanation.toLowerCase().includes(q) ||
      (scan.userPrompt && scan.userPrompt.toLowerCase().includes(q))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-4xl max-h-[85vh] bg-[#0A0A0A] border border-white/15 rounded-3xl overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#0E0E0E]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#F26522]/20 border border-[#F26522]/40 flex items-center justify-center text-[#F26522]">
              <Bookmark className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#F1EBE6]">
                Saved Pattern Scans Library
              </h3>
              <p className="text-xs font-mono text-[#8A8582]">
                {savedScans.length} archived visual analyses
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#8A8582] hover:text-[#F1EBE6] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search filter */}
        <div className="p-4 border-b border-white/5 bg-[#0D0D0D]">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8A8582] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by pattern name, category, or notes..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-black border border-white/10 text-xs font-mono text-[#F1EBE6] placeholder-[#8A8582]/50 focus:outline-none focus:border-[#F26522]"
            />
          </div>
        </div>

        {/* List of Scans */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {savedScans.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <Sparkles className="w-8 h-8 text-[#8A8582] mx-auto opacity-50" />
              <h4 className="font-display font-bold text-base text-[#F1EBE6]">
                No Saved Scans Yet
              </h4>
              <p className="text-xs font-mono text-[#8A8582] max-w-sm mx-auto">
                Scan an image or diagram and click “Save Pattern” to store structured insights in your personal cognitive archive.
              </p>
            </div>
          ) : filteredScans.length === 0 ? (
            <div className="py-12 text-center text-xs font-mono text-[#8A8582]">
              No scans match "{searchQuery}"
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredScans.map(scan => (
                <div
                  key={scan.id}
                  className="p-4 rounded-2xl bg-[#111] border border-white/10 hover:border-[#F26522]/50 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono uppercase px-2 py-0.5 rounded bg-[#F26522]/15 text-[#F26522] border border-[#F26522]/30 font-bold">
                        {scan.category}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] font-mono text-[#8A8582]">
                        <Calendar className="w-3 h-3" />
                        <span>{scan.date}</span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-20 h-20 rounded-xl bg-black border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                        <img
                          src={scan.imageDataUrl}
                          alt={scan.patternName}
                          className="w-full h-full object-contain"
                        />
                      </div>

                      <div className="space-y-1">
                        <h4 className="font-display font-bold text-sm text-[#F1EBE6] group-hover:text-[#F26522] transition-colors leading-snug">
                          {scan.patternName}
                        </h4>
                        <p className="text-xs font-body text-[#8A8582] line-clamp-2">
                          {scan.shortExplanation}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <button
                      onClick={() => onDeleteScan(scan.id)}
                      className="p-1.5 rounded-lg bg-white/5 hover:bg-red-950 text-[#8A8582] hover:text-red-400 border border-white/5 transition-colors"
                      title="Delete scan"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        onSelectScan(scan);
                        onClose();
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-[#F26522] text-[#F1EBE6] hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all"
                    >
                      <span>Open Full Analysis</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
