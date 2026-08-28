import React, { useState, useEffect, useRef } from 'react';
import { PATTERNS } from '../data/patterns';
import { CASE_STUDIES } from '../data/caseStudies';
import { CATEGORIES } from '../data/categories';
import { Search, X, ArrowRight, Layers, BookOpen, Compass, Zap } from 'lucide-react';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPattern: (id: string) => void;
  onSelectCase: (id: string) => void;
  onSelectCategory: (catId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectPattern,
  onSelectCase,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via parent
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const matchedPatterns = PATTERNS.filter(
    p =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.definition.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );

  const matchedCases = CASE_STUDIES.filter(
    c =>
      !q ||
      c.title.toLowerCase().includes(q) ||
      c.subtitle.toLowerCase().includes(q) ||
      c.summary.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
  );

  const matchedCategories = CATEGORIES.filter(
    cat =>
      !q ||
      cat.name.toLowerCase().includes(q) ||
      cat.description.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      {/* Click outside to close */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/15 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col max-h-[80vh] z-10 animate-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#141414]">
          <Search className="w-5 h-5 text-[#F26522] mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search mental models, feedback loops, case studies, domains..."
            className="w-full bg-transparent text-[#F1EBE6] text-sm focus:outline-none placeholder-[#8A8582] font-mono"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded hover:bg-white/10 text-[#8A8582] mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="px-2 py-0.5 text-[10px] font-mono bg-white/5 border border-white/10 rounded text-[#8A8582]">
            ESC
          </kbd>
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Domains / Categories */}
          {matchedCategories.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8A8582] mb-2 px-2">
                Domains ({matchedCategories.length})
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {matchedCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      onSelectCategory(cat.id);
                      onClose();
                    }}
                    className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 text-left text-xs font-mono transition-all flex items-center justify-between group"
                  >
                    <span className="text-[#F1EBE6] font-semibold">{cat.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#8A8582] group-hover:text-[#F26522] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Patterns Section */}
          <div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8A8582] mb-2 px-2">
              Patterns ({matchedPatterns.length})
            </div>
            {matchedPatterns.length === 0 ? (
              <div className="p-4 text-center text-xs font-mono text-[#8A8582]">
                No patterns matching "{query}"
              </div>
            ) : (
              <div className="space-y-1.5">
                {matchedPatterns.map(p => (
                  <div
                    key={p.id}
                    onClick={() => {
                      onSelectPattern(p.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#191919] border border-white/10 flex items-center justify-center text-[#F26522] group-hover:border-[#F26522]/50 transition-colors">
                        <Layers className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#F1EBE6] group-hover:text-[#F26522] transition-colors">
                            {p.title}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#8A8582]">
                            {p.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#8A8582] line-clamp-1 mt-0.5">{p.tagline}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A8582] group-hover:text-[#F26522] group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Deep Case Studies */}
          {matchedCases.length > 0 && (
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#8A8582] mb-2 px-2">
                Case Studies ({matchedCases.length})
              </div>
              <div className="space-y-1.5">
                {matchedCases.map(c => (
                  <div
                    key={c.id}
                    onClick={() => {
                      onSelectCase(c.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 cursor-pointer transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#191919] border border-white/10 flex items-center justify-center text-amber-400 group-hover:border-amber-400/50 transition-colors">
                        <BookOpen className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[#F1EBE6] group-hover:text-amber-300 transition-colors">
                            {c.title}
                          </span>
                          <span className="px-1.5 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#8A8582]">
                            {c.category}
                          </span>
                        </div>
                        <p className="text-xs text-[#8A8582] line-clamp-1 mt-0.5">{c.subtitle}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#8A8582] group-hover:text-amber-400 group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Quick Footer hint */}
        <div className="p-3 border-t border-white/10 bg-[#111] flex items-center justify-between text-[11px] font-mono text-[#8A8582]">
          <span>Navigation: Click to jump directly to any pattern or study</span>
          <span className="text-[#F26522]">22 Patterns Active</span>
        </div>
      </div>
    </div>
  );
};
