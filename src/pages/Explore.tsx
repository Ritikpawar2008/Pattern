import React, { useState, useMemo } from 'react';
import { PATTERNS } from '../data/patterns';
import { CATEGORIES } from '../data/categories';
import { PatternVisualizer } from '../components/PatternVisualizer';
import { Pattern, UserProgress } from '../types';
import {
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  ArrowUpRight,
  Layers,
  Sparkles,
  SlidersHorizontal,
  LayoutGrid,
  List
} from 'lucide-react';

interface ExploreProps {
  initialCategory?: string;
  onSelectPattern: (patternId: string) => void;
  userProgress: UserProgress;
  onToggleBookmark: (patternId: string) => void;
}

export const Explore: React.FC<ExploreProps> = ({
  initialCategory = 'all',
  onSelectPattern,
  userProgress,
  onToggleBookmark
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState<boolean>(false);

  const filteredPatterns = useMemo(() => {
    return PATTERNS.filter(p => {
      const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesDiff = difficultyFilter === 'all' || p.difficulty === difficultyFilter;
      const matchesSearch =
        !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.definition.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.keyRule.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBookmark = !showBookmarkedOnly || userProgress.bookmarkedPatternIds.includes(p.id);

      return matchesCat && matchesDiff && matchesSearch && matchesBookmark;
    });
  }, [selectedCategory, difficultyFilter, searchQuery, showBookmarkedOnly, userProgress.bookmarkedPatternIds]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#F26522]" />
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
              The Comprehensive Library
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#F1EBE6] tracking-tight">
            PATTERN UNIVERSE
          </h1>
          <p className="text-sm md:text-base text-[#8A8582] mt-2 max-w-2xl">
            Explore 22 fundamental recurring architectures across human behavior, technology, business,
            nature, history, and markets.
          </p>
        </div>

        {/* View stats badge */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#111] border border-white/10 text-xs font-mono text-[#8A8582] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#F26522]" />
            <span>
              Showing <strong className="text-[#F1EBE6]">{filteredPatterns.length}</strong> of{' '}
              {PATTERNS.length} Patterns
            </span>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search Field */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8A8582] absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, mechanism, keyword, or rule..."
            className="w-full pl-11 pr-4 py-3 bg-[#111] border border-white/10 rounded-xl text-sm text-[#F1EBE6] placeholder-[#8A8582] focus:outline-none focus:border-[#F26522] font-mono transition-colors"
          />
        </div>

        {/* Filter controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Difficulty Dropdown */}
          <select
            value={difficultyFilter}
            onChange={e => setDifficultyFilter(e.target.value)}
            className="px-3.5 py-3 bg-[#111] border border-white/10 rounded-xl text-xs font-mono text-[#F1EBE6] focus:outline-none focus:border-[#F26522]"
          >
            <option value="all">All Complexities</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>

          {/* Bookmarked Filter */}
          <button
            onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
            className={`px-3.5 py-3 rounded-xl text-xs font-mono border transition-all flex items-center gap-1.5 ${
              showBookmarkedOnly
                ? 'bg-[#F26522]/20 border-[#F26522] text-[#F26522]'
                : 'bg-[#111] border-white/10 text-[#8A8582] hover:text-[#F1EBE6]'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Saved ({userProgress.bookmarkedPatternIds.length})</span>
          </button>

          {/* Grid / List view toggle */}
          <div className="hidden sm:flex items-center bg-[#111] border border-white/10 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white/15 text-[#F1EBE6]' : 'text-[#8A8582]'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-white/15 text-[#F1EBE6]' : 'text-[#8A8582]'
              }`}
              title="List View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
            selectedCategory === 'all'
              ? 'bg-[#F26522] text-white font-bold shadow-[0_0_15px_rgba(242,101,34,0.4)]'
              : 'bg-[#111] text-[#8A8582] hover:bg-[#1A1A1A] hover:text-[#F1EBE6] border border-white/5'
          }`}
        >
          All Domains ({PATTERNS.length})
        </button>
        {CATEGORIES.map(cat => {
          const count = PATTERNS.filter(p => p.category === cat.id).length;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-white text-black font-bold shadow-lg'
                  : 'bg-[#111] text-[#8A8582] hover:bg-[#1A1A1A] hover:text-[#F1EBE6] border border-white/5'
              }`}
            >
              <span>{cat.name}</span>
              <span className="opacity-50 text-[10px]">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Patterns Render Grid / List */}
      {filteredPatterns.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-[#0B0B0B] border border-white/5 p-8">
          <p className="text-base text-[#8A8582] font-mono">No patterns found matching your search filters.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
              setDifficultyFilter('all');
              setShowBookmarkedOnly(false);
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-[#F1EBE6]"
          >
            Clear all filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatterns.map(p => {
            const isBookmarked = userProgress.bookmarkedPatternIds.includes(p.id);

            return (
              <div
                key={p.id}
                className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 hover:border-[#F26522]/50 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden"
              >
                <div>
                  {/* Top Bar with Bookmark & Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[11px] font-mono text-[#F26522] uppercase font-semibold">
                      {p.category}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase text-[#8A8582]">
                        {p.difficulty}
                      </span>
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          onToggleBookmark(p.id);
                        }}
                        className="p-1.5 rounded-lg hover:bg-white/10 text-[#8A8582] hover:text-[#F26522] transition-colors"
                        title={isBookmarked ? 'Remove bookmark' : 'Bookmark pattern'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4 text-[#F26522] fill-[#F26522]/20" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <h3
                    onClick={() => onSelectPattern(p.id)}
                    className="font-display font-bold text-xl text-[#F1EBE6] group-hover:text-[#F26522] cursor-pointer transition-colors"
                  >
                    {p.title}
                  </h3>
                  <p className="text-xs font-mono text-[#8A8582] italic mt-1">"{p.tagline}"</p>
                  <p className="text-xs text-[#8A8582] mt-3 line-clamp-3 leading-relaxed">
                    {p.definition}
                  </p>
                </div>

                {/* Compact Interactive Mini Diagram */}
                <div className="mt-5 cursor-pointer" onClick={() => onSelectPattern(p.id)}>
                  <PatternVisualizer type={p.visualType} isCompact />
                </div>

                {/* Action Footer */}
                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#8A8582] truncate max-w-[170px]">
                    {p.realWorldExamples.length} Real-World Case Studies
                  </span>
                  <button
                    onClick={() => onSelectPattern(p.id)}
                    className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-[#F26522] hover:text-white text-[#F1EBE6] text-xs font-mono font-medium transition-all flex items-center gap-1 group-hover:bg-[#F26522] group-hover:text-white"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {filteredPatterns.map(p => {
            const isBookmarked = userProgress.bookmarkedPatternIds.includes(p.id);

            return (
              <div
                key={p.id}
                onClick={() => onSelectPattern(p.id)}
                className="p-4 sm:p-5 rounded-2xl bg-[#0B0B0B] border border-white/10 hover:border-[#F26522]/50 cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-[#F26522] uppercase">
                      {p.category}
                    </span>
                    <span className="text-[10px] font-mono text-[#8A8582]">• {p.difficulty}</span>
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#F1EBE6] group-hover:text-[#F26522] transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-[#8A8582] line-clamp-1 mt-1 font-body">{p.definition}</p>
                </div>

                <div className="flex items-center gap-4 self-end md:self-auto">
                  <div className="text-right hidden sm:block">
                    <span className="text-[10px] font-mono text-[#8A8582] block">Key Rule</span>
                    <span className="text-xs font-mono text-[#F1EBE6] max-w-[200px] truncate block">
                      {p.keyRule}
                    </span>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      onToggleBookmark(p.id);
                    }}
                    className="p-2 rounded-lg hover:bg-white/10 text-[#8A8582] hover:text-[#F26522]"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-[#F26522]" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                  <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#F26522] group-hover:text-white text-[#F1EBE6] transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
