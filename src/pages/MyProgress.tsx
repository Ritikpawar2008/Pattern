import React from 'react';
import { UserProgress } from '../types';
import { CATEGORIES } from '../data/categories';
import { PATTERNS } from '../data/patterns';
import {
  Trophy,
  Flame,
  Zap,
  Target,
  Compass,
  Layers,
  Award,
  CheckCircle2,
  Lock,
  Clock,
  ArrowRight,
  TrendingUp,
  Eye,
  Bookmark
} from 'lucide-react';

interface MyProgressProps {
  userProgress: UserProgress;
  onNavigate: (tab: string, extraId?: string) => void;
  onSelectPattern: (patternId: string) => void;
}

export const MyProgress: React.FC<MyProgressProps> = ({
  userProgress,
  onNavigate,
  onSelectPattern
}) => {
  const radar = userProgress.radarScores;

  // Calculate dynamic radar polygon vertices (center: 150, 150, radius: 100)
  const cx = 150;
  const cy = 150;
  const maxR = 90;

  // 4 axes: Top = Observation, Right = Logic, Bottom = Prediction, Left = Connection
  const pObs = { x: cx, y: cy - (radar.observation / 100) * maxR };
  const pLog = { x: cx + (radar.logic / 100) * maxR, y: cy };
  const pPred = { x: cx, y: cy + (radar.prediction / 100) * maxR };
  const pConn = { x: cx - (radar.connection / 100) * maxR, y: cy };

  const radarPolygonPoints = `${pObs.x},${pObs.y} ${pLog.x},${pLog.y} ${pPred.x},${pPred.y} ${pConn.x},${pConn.y}`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#F26522]" />
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
              Cognitive Profile & Mastery
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#F1EBE6] tracking-tight">
            MY PROGRESS
          </h1>
          <p className="text-sm md:text-base text-[#8A8582] mt-2 max-w-xl">
            Track your pattern recognition score, cognitive strengths radar, daily learning streak,
            and unlocked milestone achievements.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onNavigate('spot')}
          className="px-6 py-3 rounded-xl bg-[#F26522] hover:bg-[#ff7638] text-white font-semibold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(242,101,34,0.4)]"
        >
          <span>Train in Spot The Pattern</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 4 Metric Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Score */}
        <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8A8582] uppercase">Pattern Score</span>
            <Zap className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-4">
            <span className="font-display font-black text-3xl sm:text-4xl text-[#F1EBE6]">
              {userProgress.score}
            </span>
            <span className="text-xs font-mono text-[#8A8582] block mt-1">Total Earned Pts</span>
          </div>
        </div>

        {/* Streak */}
        <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8A8582] uppercase">Daily Streak</span>
            <Flame className="w-4 h-4 text-[#F26522] fill-[#F26522]" />
          </div>
          <div className="mt-4">
            <span className="font-display font-black text-3xl sm:text-4xl text-[#F26522]">
              {userProgress.streak} Days
            </span>
            <span className="text-xs font-mono text-[#8A8582] block mt-1">
              Best: {userProgress.bestStreak} Days
            </span>
          </div>
        </div>

        {/* Discovered Patterns */}
        <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8A8582] uppercase">Explored</span>
            <Layers className="w-4 h-4 text-blue-400" />
          </div>
          <div className="mt-4">
            <span className="font-display font-black text-3xl sm:text-4xl text-[#F1EBE6]">
              {userProgress.discoveredPatternIds.length} / {PATTERNS.length}
            </span>
            <span className="text-xs font-mono text-[#8A8582] block mt-1">Patterns Studied</span>
          </div>
        </div>

        {/* Challenges Completed */}
        <div className="p-6 rounded-2xl bg-[#0B0B0B] border border-white/10 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-[#8A8582] uppercase">Challenges</span>
            <Target className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-4">
            <span className="font-display font-black text-3xl sm:text-4xl text-[#F1EBE6]">
              {userProgress.completedChallengeIds.length}
            </span>
            <span className="text-xs font-mono text-[#8A8582] block mt-1">Scenarios Solved</span>
          </div>
        </div>
      </div>

      {/* Radar Chart & Domain Accuracy Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: 4-Axis Radar Chart */}
        <div className="lg:col-span-6 p-6 md:p-8 rounded-3xl bg-[#0B0B0B] border border-white/10 flex flex-col justify-between">
          <div>
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-wider font-bold">
              Cognitive Profile
            </span>
            <h3 className="font-display font-black text-2xl text-[#F1EBE6] mt-1">
              4-AXIS PATTERN RADAR
            </h3>
            <p className="text-xs text-[#8A8582] mt-1">
              Dynamically derived from your performance in the spot lab and prediction scenarios.
            </p>
          </div>

          <div className="py-6 flex items-center justify-center relative">
            <svg className="w-72 h-72 overflow-visible" viewBox="0 0 300 300">
              {/* Background Guide Webs */}
              <polygon
                points="150,60 240,150 150,240 60,150"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <polygon
                points="150,90 210,150 150,210 90,150"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />
              <polygon
                points="150,120 180,150 150,180 120,150"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />

              {/* Axis Crosshairs */}
              <line x1="150" y1="50" x2="150" y2="250" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />
              <line x1="50" y1="150" x2="250" y2="150" stroke="rgba(255,255,255,0.1)" strokeDasharray="3 3" />

              {/* Dynamic Filled Polygon */}
              <polygon
                points={radarPolygonPoints}
                fill="rgba(242, 101, 34, 0.25)"
                stroke="#F26522"
                strokeWidth="2"
              />

              {/* Points on Vertices */}
              <circle cx={pObs.x} cy={pObs.y} r="4" fill="#F26522" />
              <circle cx={pLog.x} cy={pLog.y} r="4" fill="#F26522" />
              <circle cx={pPred.x} cy={pPred.y} r="4" fill="#F26522" />
              <circle cx={pConn.x} cy={pConn.y} r="4" fill="#F26522" />

              {/* Labels */}
              <text x="150" y="38" fill="#F1EBE6" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                OBSERVATION ({radar.observation}%)
              </text>
              <text x="255" y="154" fill="#F1EBE6" fontSize="11" fontFamily="monospace" textAnchor="start" fontWeight="bold">
                LOGIC ({radar.logic}%)
              </text>
              <text x="150" y="275" fill="#F1EBE6" fontSize="11" fontFamily="monospace" textAnchor="middle" fontWeight="bold">
                PREDICTION ({radar.prediction}%)
              </text>
              <text x="45" y="154" fill="#F1EBE6" fontSize="11" fontFamily="monospace" textAnchor="end" fontWeight="bold">
                CONNECTION ({radar.connection}%)
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#8A8582] pt-4 border-t border-white/5">
            <div>Highest Strength: <strong className="text-[#F26522]">Connection (88%)</strong></div>
            <div>Focus Area: <strong className="text-amber-400">Prediction (71%)</strong></div>
          </div>
        </div>

        {/* Right: 8 Domain Accuracy Breakdown */}
        <div className="lg:col-span-6 p-6 md:p-8 rounded-3xl bg-[#0B0B0B] border border-white/10 flex flex-col justify-between space-y-6">
          <div>
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-wider font-bold">
              Domain Performance
            </span>
            <h3 className="font-display font-black text-2xl text-[#F1EBE6] mt-1">
              ACCURACY BY CATEGORY
            </h3>
            <p className="text-xs text-[#8A8582] mt-1">
              Accuracy across the 8 primary operational realms.
            </p>
          </div>

          <div className="space-y-3.5">
            {CATEGORIES.map(cat => {
              const acc = userProgress.categoryAccuracy[cat.id] || { correct: 1, total: 1 };
              const percent = acc.total > 0 ? Math.round((acc.correct / acc.total) * 100) : 100;

              return (
                <div key={cat.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[#F1EBE6]">{cat.name}</span>
                    <span className="text-[#8A8582]">
                      {acc.correct}/{acc.total} ({percent}%)
                    </span>
                  </div>
                  <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className="h-full bg-gradient-to-r from-[#F26522] to-[#ff854d] rounded-full"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-xs font-mono text-[#8A8582] pt-2 border-t border-white/5">
            Tip: Solve intermediate & advanced challenges to balance your accuracy index.
          </div>
        </div>
      </div>

      {/* Unlockable Achievements Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-wider font-bold">
              Milestones
            </span>
            <h3 className="font-display font-black text-2xl text-[#F1EBE6] mt-1">
              RECOGNITION ACHIEVEMENTS
            </h3>
          </div>
          <span className="text-xs font-mono text-[#8A8582]">
            {userProgress.achievements.filter(a => a.unlockedAt).length} /{' '}
            {userProgress.achievements.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {userProgress.achievements.map(ach => {
            const isUnlocked = !!ach.unlockedAt;
            const percent = Math.min(100, Math.round((ach.progress / ach.target) * 100));

            return (
              <div
                key={ach.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                  isUnlocked
                    ? 'bg-[#121212] border-[#F26522]/40 shadow-[0_0_15px_rgba(242,101,34,0.15)]'
                    : 'bg-[#090909] border-white/5 opacity-70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isUnlocked
                          ? 'bg-[#F26522]/20 text-[#F26522] border border-[#F26522]/30'
                          : 'bg-white/5 text-[#8A8582]'
                      }`}
                    >
                      {isUnlocked ? <Award className="w-5 h-5" /> : <Lock className="w-4 h-4" />}
                    </div>
                    {isUnlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <span className="text-[10px] font-mono text-[#8A8582]">{percent}%</span>
                    )}
                  </div>

                  <h4 className="font-display font-bold text-base text-[#F1EBE6]">{ach.title}</h4>
                  <p className="text-xs text-[#8A8582] mt-1 font-body leading-relaxed">
                    {ach.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5">
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${percent}%` }}
                      className={`h-full ${isUnlocked ? 'bg-[#F26522]' : 'bg-white/30'}`}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Saved Visual Pattern Scans Gallery */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0B0B0B] border border-white/10 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Bookmark className="w-5 h-5 text-[#F26522]" />
            <div>
              <h3 className="font-display font-bold text-xl text-[#F1EBE6]">
                Saved Visual Pattern Scans
              </h3>
              <p className="text-xs font-mono text-[#8A8582]">
                {userProgress.savedScans?.length || 0} patterns saved from visual intelligence scanning
              </p>
            </div>
          </div>

          <button
            onClick={() => onNavigate('scan')}
            className="px-4 py-2 rounded-xl bg-[#F26522]/15 hover:bg-[#F26522]/25 border border-[#F26522]/30 text-[#F26522] font-mono text-xs font-bold flex items-center gap-2 transition-all self-start sm:self-auto"
          >
            <Eye className="w-4 h-4" />
            <span>Open Scanner</span>
          </button>
        </div>

        {(!userProgress.savedScans || userProgress.savedScans.length === 0) ? (
          <div className="py-8 text-center border border-dashed border-white/10 rounded-2xl space-y-2">
            <Eye className="w-6 h-6 text-[#8A8582] mx-auto opacity-50" />
            <p className="text-xs font-mono text-[#8A8582]">
              No scans archived yet. Use the Image Pattern Scanner to inspect charts and photos.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {userProgress.savedScans.map(scan => (
              <div
                key={scan.id}
                onClick={() => onNavigate('scan')}
                className="p-4 rounded-2xl bg-[#121212] border border-white/5 hover:border-[#F26522]/40 cursor-pointer transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between text-[10px] font-mono text-[#8A8582]">
                  <span className="text-[#F26522] uppercase font-bold">{scan.category}</span>
                  <span>{scan.date}</span>
                </div>

                <div className="flex gap-3 items-center">
                  <div className="w-16 h-16 rounded-xl bg-black border border-white/10 overflow-hidden shrink-0 flex items-center justify-center p-1">
                    <img src={scan.imageDataUrl} alt={scan.patternName} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-[#F1EBE6] group-hover:text-[#F26522] transition-colors leading-tight">
                      {scan.patternName}
                    </h4>
                    <span className="text-[11px] font-mono text-[#8A8582] block mt-0.5">
                      {scan.confidence} Confidence ({scan.confidenceScore}%)
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity History Log */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0B0B0B] border border-white/10 space-y-6">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#F26522]" />
          <h3 className="font-display font-bold text-xl text-[#F1EBE6]">Recent Activity Log</h3>
        </div>

        <div className="space-y-3">
          {userProgress.history.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-xl bg-[#121212] border border-white/5 flex items-center justify-between gap-4 text-xs font-mono"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[#F1EBE6] font-semibold">{item.title}</span>
                  {item.pointsEarned && (
                    <span className="px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 font-bold">
                      +{item.pointsEarned} pts
                    </span>
                  )}
                </div>
                <span className="text-[#8A8582] block mt-0.5">{item.detail}</span>
              </div>
              <span className="text-[#8A8582] shrink-0">
                {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
