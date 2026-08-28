import React, { useState, useEffect, useRef } from 'react';
import { PATTERNS } from '../data/patterns';
import { CATEGORIES } from '../data/categories';
import { Pattern } from '../types';
import { ZoomIn, ZoomOut, Maximize2, Filter, ArrowUpRight, X, Sparkles, Layers } from 'lucide-react';

interface MapNode {
  id: string;
  label: string;
  type: 'hub' | 'category' | 'pattern';
  categoryId?: string;
  patternId?: string;
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  connections: string[];
}

interface InteractivePatternMapProps {
  onSelectPattern: (patternId: string) => void;
}

export const InteractivePatternMap: React.FC<InteractivePatternMapProps> = ({ onSelectPattern }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const nodesRef = useRef<MapNode[]>([]);

  // Initialize graph nodes and connections
  useEffect(() => {
    const width = 1000;
    const height = 700;
    const centerX = width / 2;
    const centerY = height / 2;

    const initialNodes: MapNode[] = [];

    // Central HUB
    initialNodes.push({
      id: 'center-hub',
      label: 'PATTERN',
      type: 'hub',
      x: centerX,
      y: centerY,
      baseX: centerX,
      baseY: centerY,
      vx: 0,
      vy: 0,
      radius: 28,
      color: '#F26522',
      connections: CATEGORIES.map(c => `cat-${c.id}`)
    });

    // 8 Category Nodes
    CATEGORIES.forEach((cat, idx) => {
      const angle = (idx / CATEGORIES.length) * Math.PI * 2;
      const dist = 160;
      const cx = centerX + Math.cos(angle) * dist;
      const cy = centerY + Math.sin(angle) * dist;

      // Find patterns in this category
      const catPatterns = PATTERNS.filter(p => p.category === cat.id);

      initialNodes.push({
        id: `cat-${cat.id}`,
        label: cat.name,
        type: 'category',
        categoryId: cat.id,
        x: cx,
        y: cy,
        baseX: cx,
        baseY: cy,
        vx: 0,
        vy: 0,
        radius: 18,
        color: cat.accentColor || '#F26522',
        connections: ['center-hub', ...catPatterns.map(p => `pat-${p.id}`)]
      });
    });

    // Pattern Nodes
    PATTERNS.forEach((p, idx) => {
      const catNode = initialNodes.find(n => n.id === `cat-${p.category}`);
      const catAngle = CATEGORIES.findIndex(c => c.id === p.category);
      const subIdx = idx % 4;
      const subAngle = (catAngle / CATEGORIES.length) * Math.PI * 2 + (subIdx - 1.5) * 0.45;
      const dist = 280 + (idx % 3) * 35;

      const px = centerX + Math.cos(subAngle) * dist;
      const py = centerY + Math.sin(subAngle) * dist;

      // Connect to related patterns
      const relatedIds = p.relatedPatternIds.map(rid => `pat-${rid}`);

      initialNodes.push({
        id: `pat-${p.id}`,
        label: p.title,
        type: 'pattern',
        categoryId: p.category,
        patternId: p.id,
        x: px,
        y: py,
        baseX: px,
        baseY: py,
        vx: 0,
        vy: 0,
        radius: 12,
        color: '#F1EBE6',
        connections: [`cat-${p.category}`, ...relatedIds]
      });
    });

    nodesRef.current = initialNodes;
  }, []);

  // Animation and canvas rendering loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = (canvas.width = canvas.parentElement?.clientWidth || 900);
      const height = (canvas.height = canvas.parentElement?.clientHeight || 600);

      ctx.clearRect(0, 0, width, height);

      ctx.save();
      // Apply Pan & Zoom
      ctx.translate(width / 2 + pan.x, height / 2 + pan.y);
      ctx.scale(zoom, zoom);
      ctx.translate(-500, -350); // relative to virtual 1000x700 center

      const nodes = nodesRef.current;
      const hoveredNode = nodes.find(n => n.id === hoveredNodeId);

      // Draw Connections (lines)
      for (const node of nodes) {
        for (const connId of node.connections) {
          const target = nodes.find(n => n.id === connId);
          if (!target) continue;

          const isConnectedToHovered =
            hoveredNode &&
            (node.id === hoveredNode.id ||
              target.id === hoveredNode.id ||
              hoveredNode.connections.includes(node.id) ||
              hoveredNode.connections.includes(target.id));

          const matchesCategory =
            selectedCategory === 'all' ||
            node.categoryId === selectedCategory ||
            target.categoryId === selectedCategory;

          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(target.x, target.y);

          if (isConnectedToHovered) {
            ctx.strokeStyle = '#F26522';
            ctx.lineWidth = 2.2;
            ctx.shadowColor = '#F26522';
            ctx.shadowBlur = 10;
          } else if (matchesCategory) {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
            ctx.lineWidth = 1;
            ctx.shadowBlur = 0;
          } else {
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
            ctx.lineWidth = 0.5;
            ctx.shadowBlur = 0;
          }
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // Draw Nodes
      for (const node of nodes) {
        const isHovered = hoveredNodeId === node.id;
        const isConnected = hoveredNode?.connections.includes(node.id);
        const matchesCategory = selectedCategory === 'all' || node.categoryId === selectedCategory;

        const isDimmed =
          (selectedCategory !== 'all' && node.categoryId && node.categoryId !== selectedCategory) ||
          (hoveredNode && !isHovered && !isConnected && node.id !== 'center-hub');

        ctx.beginPath();
        ctx.arc(node.x, node.y, isHovered ? node.radius * 1.3 : node.radius, 0, Math.PI * 2);

        if (node.type === 'hub') {
          ctx.fillStyle = '#F26522';
          ctx.shadowColor = '#F26522';
          ctx.shadowBlur = 20;
        } else if (node.type === 'category') {
          ctx.fillStyle = isDimmed ? 'rgba(255, 255, 255, 0.1)' : node.color;
          ctx.shadowColor = isHovered ? node.color : 'transparent';
          ctx.shadowBlur = isHovered ? 15 : 0;
        } else {
          ctx.fillStyle = isHovered ? '#F26522' : isDimmed ? 'rgba(255, 255, 255, 0.15)' : '#1E1E1E';
          ctx.strokeStyle = isHovered ? '#FFF' : isDimmed ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.4)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        ctx.fill();
        ctx.shadowBlur = 0;

        // Label typography
        if (node.type === 'hub' || node.type === 'category' || isHovered || !isDimmed) {
          ctx.font = node.type === 'hub' ? 'bold 12px "Space Grotesk"' : node.type === 'category' ? '600 11px "Plus Jakarta Sans"' : '10px "Plus Jakarta Sans"';
          ctx.fillStyle = isDimmed ? 'rgba(255, 255, 255, 0.25)' : '#F1EBE6';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y + node.radius + (node.type === 'hub' ? 14 : 12));
        }
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [pan, zoom, hoveredNodeId, selectedCategory]);

  // Handle Canvas Mouse Events (Hover, Click, Pan)
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Invert translation and scale
    const worldX = (mouseX - (canvas.width / 2 + pan.x)) / zoom + 500;
    const worldY = (mouseY - (canvas.height / 2 + pan.y)) / zoom + 350;
    return { x: worldX, y: worldY };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      setPan({
        x: pan.x + (e.clientX - dragStartRef.current.x),
        y: pan.y + (e.clientY - dragStartRef.current.y)
      });
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      return;
    }

    const { x, y } = getCanvasCoords(e);
    const nodes = nodesRef.current;
    const found = nodes.find(n => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 6;
    });

    setHoveredNodeId(found ? found.id : null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);
    const nodes = nodesRef.current;
    const clickedNode = nodes.find(n => {
      const dx = n.x - x;
      const dy = n.y - y;
      return Math.sqrt(dx * dx + dy * dy) <= n.radius + 6;
    });

    if (clickedNode) {
      if (clickedNode.patternId) {
        const pat = PATTERNS.find(p => p.id === clickedNode.patternId);
        if (pat) setSelectedPattern(pat);
      } else if (clickedNode.categoryId) {
        setSelectedCategory(clickedNode.categoryId);
      }
    } else {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="w-full relative rounded-2xl bg-[#080808] border border-white/10 overflow-hidden flex flex-col min-h-[600px] shadow-2xl">
      {/* Top Map Header & Filters */}
      <div className="p-4 md:p-6 border-b border-white/5 flex flex-wrap items-center justify-between gap-4 z-10 bg-[#0B0B0B]/80 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
            <h3 className="font-display font-bold text-lg text-[#F1EBE6]">The Connected Knowledge Graph</h3>
          </div>
          <p className="text-xs text-[#8A8582] mt-0.5">
            Click any pattern to inspect root mechanisms or filter by category.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-xs font-mono transition-all ${
              selectedCategory === 'all'
                ? 'bg-[#F26522] text-white shadow-[0_0_10px_rgba(242,101,34,0.4)]'
                : 'bg-white/5 text-[#8A8582] hover:bg-white/10'
            }`}
          >
            All Domains (22)
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-mono transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-[#8A8582] hover:bg-white/10'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Canvas Knowledge Graph Viewport */}
      <div className="relative flex-1 w-full min-h-[480px] bg-grid-pattern cursor-grab active:cursor-grabbing">
        <canvas
          ref={canvasRef}
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          className="w-full h-full block"
        />

        {/* Zoom & Reset Floating Controls */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-xl p-1.5 shadow-xl z-10">
          <button
            onClick={() => setZoom(prev => Math.min(2.0, prev + 0.2))}
            className="p-2 rounded-lg hover:bg-white/10 text-[#F1EBE6] transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(prev => Math.max(0.6, prev - 0.2))}
            className="p-2 rounded-lg hover:bg-white/10 text-[#F1EBE6] transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => {
              setZoom(1);
              setPan({ x: 0, y: 0 });
            }}
            className="p-2 rounded-lg hover:bg-white/10 text-[#8A8582] hover:text-[#F1EBE6] transition-colors"
            title="Reset View"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Legend Overlay */}
        <div className="absolute bottom-6 left-6 hidden md:flex items-center gap-4 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-[11px] font-mono text-[#8A8582] z-10">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F26522]" />
            <span>Root Hub</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D97706]" />
            <span>Domain Cluster</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full border border-white/60 bg-[#1E1E1E]" />
            <span>Pattern Node</span>
          </div>
        </div>
      </div>

      {/* Selected Pattern Sheet / Modal Drawer */}
      {selectedPattern && (
        <div className="absolute inset-y-0 right-0 w-full max-w-md bg-[#111] border-l border-white/10 p-6 shadow-2xl flex flex-col z-20 overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <span className="px-2.5 py-1 rounded bg-[#F26522]/15 text-[#F26522] text-xs font-mono uppercase tracking-wider font-semibold">
              {selectedPattern.category}
            </span>
            <button
              onClick={() => setSelectedPattern(null)}
              className="p-2 rounded-lg hover:bg-white/10 text-[#8A8582] hover:text-[#F1EBE6]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-4">
            <h3 className="font-display font-bold text-2xl text-[#F1EBE6]">{selectedPattern.title}</h3>
            <p className="text-sm text-[#F26522] mt-1 font-mono italic">"{selectedPattern.tagline}"</p>
            <p className="text-sm text-[#8A8582] mt-3 leading-relaxed">{selectedPattern.definition}</p>
          </div>

          {/* Quick Flow */}
          <div className="my-6 p-4 rounded-xl bg-[#171717] border border-white/5">
            <span className="text-[10px] font-mono text-[#8A8582] uppercase tracking-widest block mb-2">
              Systemic Flow
            </span>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#F1EBE6]">
              {selectedPattern.flowSteps.map((step, idx) => (
                <React.Fragment key={idx}>
                  <span className="px-2 py-1 bg-white/5 rounded border border-white/10">{step}</span>
                  {idx < selectedPattern.flowSteps.length - 1 && <span className="text-[#F26522]">→</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Key Rule & Signal */}
          <div className="space-y-3 mb-6 text-xs font-mono">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-[#F26522] block font-semibold mb-1">KEY RULE:</span>
              <span className="text-[#F1EBE6]">{selectedPattern.keyRule}</span>
            </div>
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <span className="text-amber-400 block font-semibold mb-1">EARLY WARNING SIGNAL:</span>
              <span className="text-[#8A8582]">{selectedPattern.earlyWarningSignal}</span>
            </div>
          </div>

          <div className="mt-auto pt-4 border-t border-white/10 flex gap-3">
            <button
              onClick={() => {
                onSelectPattern(selectedPattern.id);
                setSelectedPattern(null);
              }}
              className="flex-1 py-3 rounded-xl bg-[#F26522] hover:bg-[#ff7638] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(242,101,34,0.4)]"
            >
              <span>Explore Full Pattern</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
