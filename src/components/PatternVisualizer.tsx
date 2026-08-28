import React, { useState, useEffect } from 'react';
import { VisualType } from '../types';
import { Play, Pause, RotateCcw, ArrowRight, Zap, TrendingUp, Users, Activity, Layers } from 'lucide-react';

interface PatternVisualizerProps {
  type: VisualType;
  flowSteps?: string[];
  title?: string;
  isCompact?: boolean;
}

export const PatternVisualizer: React.FC<PatternVisualizerProps> = ({
  type,
  flowSteps = ['ACTION', 'RESULT', 'RESPONSE', 'REINFORCEMENT'],
  title,
  isCompact = false
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [stepIndex, setStepIndex] = useState(0);
  const [sliderValue, setSliderValue] = useState(4); // for compounding / network nodes
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setStepIndex(prev => (prev + 1) % (flowSteps.length || 4));
    }, 1800);
    return () => clearInterval(interval);
  }, [isPlaying, flowSteps.length]);

  if (isCompact) {
    // Compact mini-diagram used on cards
    return (
      <div className="w-full h-24 rounded-lg bg-[#0B0B0B] border border-white/5 p-3 flex flex-col justify-center items-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-radial-subtle opacity-50" />
        
        {type === 'cycle' && (
          <div className="flex items-center gap-1.5 text-[11px] font-mono text-[#8A8582]">
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[#F1EBE6]">ACTION</span>
            <span className="text-[#F26522]">→</span>
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">RESULT</span>
            <span className="text-[#F26522]">→</span>
            <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/10">RESPONSE</span>
            <span className="text-[#F26522]">↺</span>
          </div>
        )}

        {type === 'compounding' && (
          <div className="w-full h-12 flex items-end justify-center gap-1.5 px-4">
            {[4, 6, 9, 14, 24, 42, 75, 100].map((val, idx) => (
              <div
                key={idx}
                style={{ height: `${val}%` }}
                className={`w-2.5 rounded-t transition-all ${
                  idx >= 5 ? 'bg-[#F26522] shadow-[0_0_8px_rgba(242,101,34,0.4)]' : 'bg-white/15'
                }`}
              />
            ))}
          </div>
        )}

        {type === 'network' && (
          <div className="flex items-center justify-center relative w-24 h-12">
            <div className="absolute w-2 h-2 rounded-full bg-[#F26522] top-1 left-2" />
            <div className="absolute w-2 h-2 rounded-full bg-[#F1EBE6] top-2 right-3" />
            <div className="absolute w-2 h-2 rounded-full bg-[#F1EBE6] bottom-1 left-4" />
            <div className="absolute w-2.5 h-2.5 rounded-full bg-[#F26522] bottom-2 right-2" />
            <div className="absolute w-3 h-3 rounded-full bg-white/80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            <svg className="absolute inset-0 w-full h-full stroke-white/20">
              <line x1="16" y1="12" x2="48" y2="24" strokeWidth="1" stroke="#F26522" strokeOpacity="0.6" />
              <line x1="80" y1="16" x2="48" y2="24" strokeWidth="1" />
              <line x1="24" y1="40" x2="48" y2="24" strokeWidth="1" stroke="#F26522" strokeOpacity="0.6" />
              <line x1="84" y1="38" x2="48" y2="24" strokeWidth="1" />
              <line x1="16" y1="12" x2="24" y2="40" strokeWidth="1" strokeDasharray="2 2" />
            </svg>
          </div>
        )}

        {type === 'scurve' && (
          <svg className="w-32 h-10 overflow-visible" viewBox="0 0 100 40">
            <path
              d="M 5,35 Q 35,35 50,20 T 95,5"
              fill="none"
              stroke="#F26522"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <circle cx="50" cy="20" r="3" fill="#F1EBE6" />
          </svg>
        )}

        {type === 'pareto' && (
          <div className="w-full flex items-center justify-center gap-3 px-2 text-[10px] font-mono">
            <div className="text-right">
              <span className="text-[#F26522] font-semibold">20% Effort</span>
              <div className="w-14 h-2 rounded bg-[#F26522] mt-0.5" />
            </div>
            <span className="text-white/30 text-xs">➔</span>
            <div>
              <span className="text-[#F1EBE6] font-semibold">80% Result</span>
              <div className="w-24 h-2 rounded bg-white/70 mt-0.5" />
            </div>
          </div>
        )}

        {type === 'bubble' && (
          <svg className="w-32 h-10 overflow-visible" viewBox="0 0 100 40">
            <path
              d="M 5,35 L 30,30 L 55,20 L 75,5 L 85,38 L 95,34"
              fill="none"
              stroke="#F26522"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="75" cy="5" r="3" fill="#FFF" />
          </svg>
        )}

        {type === 'bottleneck' && (
          <div className="flex items-center gap-1.5 text-[10px] font-mono">
            <span className="px-1.5 py-0.5 rounded bg-white/10">Wide Inflow</span>
            <span className="text-red-400 font-bold">▶ [Choke] ▶</span>
            <span className="px-1.5 py-0.5 rounded bg-white/10">Slow Exit</span>
          </div>
        )}

        {['viral', 'adaptation', 'second_order', 'emergence', 'wave', 'threshold'].includes(type) && (
          <div className="flex items-center gap-2 text-[11px] font-mono text-[#F1EBE6]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
            <span>Interactive Dynamic Model</span>
          </div>
        )}
      </div>
    );
  }

  // Full interactive visualizer
  return (
    <div className="w-full rounded-2xl bg-[#0B0B0B] border border-white/10 p-6 md:p-8 flex flex-col relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#F26522]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top control bar */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-[#8A8582] uppercase">
            Interactive System Simulation
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#F1EBE6] transition-colors flex items-center gap-1.5 text-xs font-mono"
            title={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isPlaying ? 'Pause' : 'Resume'}</span>
          </button>
          <button
            onClick={() => {
              setStepIndex(0);
              setSliderValue(4);
            }}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-[#8A8582] hover:text-[#F1EBE6] transition-colors"
            title="Reset"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Diagram Canvas Area */}
      <div className="min-h-[260px] md:min-h-[300px] flex items-center justify-center relative py-4">
        {/* CYCLE / FEEDBACK LOOP */}
        {type === 'cycle' && (
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* Circular Orbit Ring */}
            <div className="absolute inset-4 rounded-full border border-dashed border-white/15 animate-[spin_30s_linear_infinite]" />
            
            {/* Center Core */}
            <div className="w-20 h-20 rounded-full bg-[#171717] border border-[#F26522]/40 flex flex-col items-center justify-center text-center p-2 shadow-[0_0_25px_rgba(242,101,34,0.15)] z-10">
              <span className="text-[10px] font-mono text-[#F26522] font-semibold">FEEDBACK</span>
              <span className="text-[9px] text-[#8A8582]">Loop Engine</span>
            </div>

            {/* Orbiting 4 Nodes */}
            {flowSteps.map((step, idx) => {
              const angle = (idx / flowSteps.length) * Math.PI * 2 - Math.PI / 2;
              const radius = 105;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isActive = stepIndex === idx;

              return (
                <div
                  key={idx}
                  style={{
                    transform: `translate(${x}px, ${y}px)`
                  }}
                  className={`absolute transition-all duration-500 flex flex-col items-center ${
                    isActive ? 'scale-110 z-20' : 'scale-100 opacity-70'
                  }`}
                >
                  <div
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all shadow-md flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#F26522] text-white shadow-[0_0_15px_rgba(242,101,34,0.5)] border border-[#F26522]'
                        : 'bg-[#171717] text-[#F1EBE6] border border-white/10'
                    }`}
                  >
                    <span className="text-[10px] opacity-60">0{idx + 1}</span>
                    <span>{step}</span>
                  </div>
                  {isActive && (
                    <span className="text-[10px] text-[#F26522] mt-1 font-mono animate-bounce">
                      ● Active State
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* COMPOUNDING */}
        {type === 'compounding' && (
          <div className="w-full max-w-lg flex flex-col items-center">
            <div className="w-full h-48 flex items-end justify-between gap-2 px-6 pt-6 relative border-b border-white/10">
              {/* Exponential Bars */}
              {Array.from({ length: 10 }).map((_, i) => {
                const base = Math.pow(1.5, i);
                const heightPercent = Math.min(100, (base / Math.pow(1.5, 9)) * 100);
                const isHighlighted = i >= 6;

                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <span className="text-[9px] font-mono text-[#8A8582] opacity-0 group-hover:opacity-100 transition-opacity">
                      {Math.round(base)}x
                    </span>
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full max-w-[28px] rounded-t transition-all duration-700 ${
                        isHighlighted
                          ? 'bg-[#F26522] shadow-[0_0_15px_rgba(242,101,34,0.4)]'
                          : 'bg-white/20 group-hover:bg-white/40'
                      }`}
                    />
                    <span className="text-[10px] font-mono text-[#8A8582] mt-1">Y{i + 1}</span>
                  </div>
                );
              })}
            </div>
            <div className="w-full flex items-center justify-between mt-4 text-xs font-mono text-[#8A8582] px-6">
              <span>Flat Latent Phase (Years 1–5)</span>
              <span className="text-[#F26522] font-semibold">Parabolic Inflection (Years 6–10)</span>
            </div>
          </div>
        )}

        {/* NETWORK EFFECTS */}
        {type === 'network' && (
          <div className="w-full max-w-md flex flex-col items-center">
            <div className="relative w-64 h-56 flex items-center justify-center">
              {/* Dynamic SVG lines connecting nodes */}
              <svg className="absolute inset-0 w-full h-full overflow-visible">
                {Array.from({ length: sliderValue }).map((_, i) => {
                  const angle1 = (i / sliderValue) * Math.PI * 2;
                  const x1 = 128 + Math.cos(angle1) * 85;
                  const y1 = 112 + Math.sin(angle1) * 85;

                  return Array.from({ length: sliderValue }).map((_, j) => {
                    if (j <= i) return null;
                    const angle2 = (j / sliderValue) * Math.PI * 2;
                    const x2 = 128 + Math.cos(angle2) * 85;
                    const y2 = 112 + Math.sin(angle2) * 85;

                    return (
                      <line
                        key={`${i}-${j}`}
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#F26522"
                        strokeOpacity={0.4}
                        strokeWidth={1.2}
                      />
                    );
                  });
                })}
              </svg>

              {/* Central Hub */}
              <div className="w-14 h-14 rounded-full bg-[#111] border border-white/20 flex flex-col items-center justify-center z-10 shadow-lg">
                <Users className="w-4 h-4 text-[#F26522]" />
                <span className="text-[9px] font-mono text-[#F1EBE6]">{sliderValue} Users</span>
              </div>

              {/* Perimeter Nodes */}
              {Array.from({ length: sliderValue }).map((_, i) => {
                const angle = (i / sliderValue) * Math.PI * 2;
                const x = Math.cos(angle) * 85;
                const y = Math.sin(angle) * 85;

                return (
                  <div
                    key={i}
                    style={{ transform: `translate(${x}px, ${y}px)` }}
                    className="absolute w-6 h-6 rounded-full bg-[#171717] border border-[#F26522] flex items-center justify-center text-[10px] font-mono text-[#F1EBE6] shadow-[0_0_10px_rgba(242,101,34,0.3)] z-10"
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>

            {/* Live Metcalfe Counter */}
            <div className="w-full bg-[#141414] border border-white/10 rounded-xl p-3 mt-4 flex items-center justify-between text-xs font-mono">
              <div>
                <span className="text-[#8A8582]">Nodes (N): </span>
                <span className="text-[#F1EBE6] font-bold">{sliderValue}</span>
              </div>
              <div>
                <span className="text-[#8A8582]">Connections [N(N-1)/2]: </span>
                <span className="text-[#F26522] font-bold">{(sliderValue * (sliderValue - 1)) / 2} Links</span>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setSliderValue(prev => Math.max(3, prev - 1))}
                  className="px-2 py-1 bg-white/10 rounded hover:bg-white/20 text-[#F1EBE6]"
                >
                  -
                </button>
                <button
                  onClick={() => setSliderValue(prev => Math.min(9, prev + 1))}
                  className="px-2 py-1 bg-white/10 rounded hover:bg-white/20 text-[#F1EBE6]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* S-CURVE ADOPTION */}
        {type === 'scurve' && (
          <div className="w-full max-w-lg flex flex-col items-center">
            <svg className="w-full h-52 overflow-visible px-4" viewBox="0 0 400 160">
              {/* Grid guide lines */}
              <line x1="30" y1="20" x2="370" y2="20" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="30" y1="80" x2="370" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
              <line x1="30" y1="140" x2="370" y2="140" stroke="rgba(255,255,255,0.1)" />

              {/* S-Curve Path */}
              <path
                d="M 30,135 C 130,135 150,130 200,80 C 250,30 270,25 370,25"
                fill="none"
                stroke="#F26522"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Animated progress pulse */}
              <circle cx="200" cy="80" r="5" fill="#FFF" className="animate-ping" />
              <circle cx="200" cy="80" r="5" fill="#F26522" />

              {/* Stage markers */}
              <text x="50" y="155" fill="#8A8582" fontSize="10" fontFamily="monospace">
                01. Genesis (0-5%)
              </text>
              <text x="175" y="65" fill="#F26522" fontSize="10" fontFamily="monospace" fontWeight="bold">
                02. Chasm Crossing
              </text>
              <text x="280" y="15" fill="#8A8582" fontSize="10" fontFamily="monospace">
                03. Saturation (90%+)
              </text>
            </svg>
            <div className="text-xs font-mono text-[#8A8582] text-center mt-2">
              Adoption accelerates parabolically once overcoming initial early chasm friction.
            </div>
          </div>
        )}

        {/* 80/20 PARETO PRINCIPLE */}
        {type === 'pareto' && (
          <div className="w-full max-w-md flex flex-col gap-5 px-4">
            <div className="bg-[#141414] border border-white/10 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8A8582]">Input Distribution (The Vital 20%)</span>
                <span className="text-[#F26522] font-semibold">20% Effort / Drivers</span>
              </div>
              <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden flex">
                <div className="w-[20%] h-full bg-[#F26522] shadow-[0_0_10px_rgba(242,101,34,0.5)]" />
                <div className="w-[80%] h-full bg-white/15" />
              </div>
            </div>

            <div className="flex justify-center text-xs font-mono text-[#8A8582] items-center gap-2">
              <ArrowRight className="w-4 h-4 text-[#F26522]" />
              <span>Creates Asymmetric Impact</span>
              <ArrowRight className="w-4 h-4 text-[#F26522]" />
            </div>

            <div className="bg-[#141414] border border-white/10 rounded-xl p-4 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[#8A8582]">Outcome Distribution (The Massive 80%)</span>
                <span className="text-[#F1EBE6] font-semibold">80% Results / Profits</span>
              </div>
              <div className="w-full h-4 bg-white/5 rounded-full overflow-hidden flex">
                <div className="w-[80%] h-full bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                <div className="w-[20%] h-full bg-white/15" />
              </div>
            </div>
          </div>
        )}

        {/* BUBBLE CYCLE */}
        {type === 'bubble' && (
          <div className="w-full max-w-lg flex flex-col items-center">
            <svg className="w-full h-52 px-4" viewBox="0 0 400 160">
              <path
                d="M 30,130 L 100,120 L 180,95 L 260,20 L 300,145 L 370,125"
                fill="none"
                stroke="#F26522"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="260" cy="20" r="5" fill="#FFF" />
              <text x="210" y="15" fill="#FFF" fontSize="10" fontFamily="monospace" fontWeight="bold">
                Euphoria Top (Minsky Moment)
              </text>
              <text x="40" y="145" fill="#8A8582" fontSize="9" fontFamily="monospace">
                Displacement
              </text>
              <text x="130" y="110" fill="#8A8582" fontSize="9" fontFamily="monospace">
                Credit Boom
              </text>
              <text x="310" y="155" fill="#8A8582" fontSize="9" fontFamily="monospace">
                Liquidation Panic
              </text>
            </svg>
          </div>
        )}

        {/* BOTTLENECK */}
        {type === 'bottleneck' && (
          <div className="w-full max-w-md flex flex-col items-center gap-4">
            <div className="flex items-center w-full justify-between gap-1 text-xs font-mono">
              <div className="flex-1 bg-[#171717] border border-white/10 rounded-xl p-3 text-center">
                <span className="text-[#8A8582] text-[10px] block">Inflow</span>
                <span className="text-[#F1EBE6] font-bold">1,000 / hr</span>
              </div>
              <span className="text-white/40">▶</span>
              <div className="w-28 bg-red-950/40 border border-red-500/50 rounded-xl p-3 text-center shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                <span className="text-red-400 text-[10px] block font-bold">CONSTRAINT</span>
                <span className="text-red-300 font-bold">50 / hr</span>
              </div>
              <span className="text-white/40">▶</span>
              <div className="flex-1 bg-[#171717] border border-white/10 rounded-xl p-3 text-center">
                <span className="text-[#8A8582] text-[10px] block">Actual Output</span>
                <span className="text-[#F26522] font-bold">50 / hr</span>
              </div>
            </div>
            <div className="text-xs font-mono text-[#8A8582] text-center">
              Total system throughput is strictly bounded by the single slowest step.
            </div>
          </div>
        )}

        {/* DEFAULT WAVE / OSCILLATION */}
        {['viral', 'adaptation', 'second_order', 'emergence', 'wave', 'threshold'].includes(type) && (
          <div className="w-full max-w-md flex flex-col items-center">
            <svg className="w-full h-44 px-4" viewBox="0 0 400 140">
              <path
                d="M 20,70 Q 110,10 200,70 T 380,70"
                fill="none"
                stroke="#F26522"
                strokeWidth="2.5"
              />
              <line x1="20" y1="70" x2="380" y2="70" stroke="rgba(255,255,255,0.15)" strokeDasharray="4 4" />
              <circle cx="200" cy="70" r="4" fill="#F1EBE6" />
              <text x="140" y="90" fill="#8A8582" fontSize="10" fontFamily="monospace">
                Mean Baseline Gravitational Pull
              </text>
            </svg>
          </div>
        )}
      </div>

      {/* Step Flow Tracker */}
      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between overflow-x-auto gap-2">
        {flowSteps.map((step, idx) => (
          <div
            key={idx}
            onClick={() => setStepIndex(idx)}
            className={`flex-1 min-w-[100px] p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
              stepIndex === idx
                ? 'bg-white/10 border-[#F26522] text-[#F1EBE6]'
                : 'bg-transparent border-white/5 text-[#8A8582] hover:border-white/15'
            }`}
          >
            <div className="text-[10px] font-mono opacity-60">PHASE 0{idx + 1}</div>
            <div className="text-xs font-semibold truncate">{step}</div>
          </div>
        ))}
      </div>
    </div>
  );
};
