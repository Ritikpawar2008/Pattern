import React, { useState, useEffect } from 'react';
import { CHALLENGES, getChallengesByDifficulty } from '../data/challenges';
import { Challenge, UserProgress } from '../types';
import confetti from 'canvas-confetti';
import {
  Target,
  Clock,
  Zap,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ArrowRight,
  Sparkles,
  Trophy,
  Flame,
  ShieldAlert,
  BrainCircuit
} from 'lucide-react';

interface SpotThePatternProps {
  userProgress: UserProgress;
  onUpdateScore: (points: number, challengeId: string, isCorrect: boolean, category: string) => void;
  onSelectPattern: (patternId: string) => void;
}

export const SpotThePattern: React.FC<SpotThePatternProps> = ({
  userProgress,
  onUpdateScore,
  onSelectPattern
}) => {
  const [difficulty, setDifficulty] = useState<string>('all');
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [correctCount, setCorrectCount] = useState<number>(0);

  const challenges = getChallengesByDifficulty(difficulty);
  const challenge: Challenge = challenges[currentIdx] || challenges[0];

  // Timer effect
  useEffect(() => {
    setTimeLeft(challenge.timeLimitSeconds || 45);
    setIsTimerRunning(true);
    setSelectedOption(null);
    setHasAnswered(false);
  }, [currentIdx, difficulty, challenge]);

  useEffect(() => {
    if (!isTimerRunning || hasAnswered) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, hasAnswered]);

  const handleTimeOut = () => {
    if (hasAnswered) return;
    setHasAnswered(true);
    setIsTimerRunning(false);
    onUpdateScore(0, challenge.id, false, challenge.category);
  };

  const handleSelectOption = (idx: number) => {
    if (hasAnswered) return;

    setSelectedOption(idx);
    setHasAnswered(true);
    setIsTimerRunning(false);

    const isCorrect = idx === challenge.correctIndex;
    if (isCorrect) {
      // Speed multiplier
      const speedBonus = Math.floor((timeLeft / (challenge.timeLimitSeconds || 45)) * 50);
      const earned = challenge.points + speedBonus;
      setSessionScore(prev => prev + earned);
      setCorrectCount(prev => prev + 1);

      // Trigger confetti
      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#F26522', '#FFFFFF', '#D97706']
        });
      } catch (e) {
        // Safe fallback
      }

      onUpdateScore(earned, challenge.id, true, challenge.category);
    } else {
      onUpdateScore(0, challenge.id, false, challenge.category);
    }
  };

  const handleNextChallenge = () => {
    if (currentIdx < challenges.length - 1) {
      setCurrentIdx(prev => prev + 1);
    } else {
      // Completed all in this tab
      setCurrentIdx(0);
    }
  };

  const timePercent = Math.max(0, (timeLeft / (challenge.timeLimitSeconds || 45)) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#F26522] animate-pulse" />
            <span className="text-xs font-mono text-[#F26522] uppercase tracking-widest font-semibold">
              Cognitive Training Simulator
            </span>
          </div>
          <h1 className="font-display font-black text-4xl sm:text-5xl text-[#F1EBE6] tracking-tight">
            SPOT THE PATTERN
          </h1>
          <p className="text-sm md:text-base text-[#8A8582] mt-2 max-w-xl">
            Train your intuition on real-world scenarios. Identify hidden feedback loops, bottlenecks,
            and systemic traps under time pressure.
          </p>
        </div>

        {/* Live session score pill */}
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-[#111] border border-white/10 text-xs font-mono flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-400">
              <Trophy className="w-4 h-4" />
              <span>+{sessionScore} Session Pts</span>
            </div>
            <div className="w-px h-3 bg-white/10" />
            <span className="text-[#8A8582]">
              {correctCount} / {challenges.length} Solved
            </span>
          </div>
        </div>
      </div>

      {/* Difficulty Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        <div className="flex items-center gap-2">
          {(['all', 'beginner', 'intermediate', 'advanced'] as const).map(diff => (
            <button
              key={diff}
              onClick={() => {
                setDifficulty(diff);
                setCurrentIdx(0);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono capitalize transition-all ${
                difficulty === diff
                  ? 'bg-[#F26522] text-white font-bold shadow-[0_0_15px_rgba(242,101,34,0.3)]'
                  : 'bg-[#111] text-[#8A8582] hover:text-[#F1EBE6] border border-white/5'
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-[#8A8582]">
          Challenge {currentIdx + 1} of {challenges.length}
        </span>
      </div>

      {/* Active Challenge Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-[#0B0B0B] border border-white/10 relative overflow-hidden shadow-2xl space-y-6">
        {/* Timer Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <div className="flex items-center gap-2 text-[#8A8582]">
              <Clock className="w-3.5 h-3.5 text-[#F26522]" />
              <span>
                Time Remaining: <strong className="text-[#F1EBE6]">{timeLeft}s</strong>
              </span>
            </div>
            <span className="text-[#F26522] font-semibold">+{challenge.points} Max Pts</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
            <div
              style={{ width: `${timePercent}%` }}
              className={`h-full transition-all duration-1000 ${
                timePercent < 25 ? 'bg-red-500' : timePercent < 50 ? 'bg-amber-400' : 'bg-[#F26522]'
              }`}
            />
          </div>
        </div>

        {/* Challenge Header & Category */}
        <div className="pt-2">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#F26522] uppercase font-bold">
              {challenge.category}
            </span>
            <span className="text-[10px] font-mono uppercase text-[#8A8582]">
              • {challenge.difficulty}
            </span>
          </div>
          <h2 className="font-display font-black text-2xl sm:text-3xl text-[#F1EBE6] tracking-tight">
            {challenge.title}
          </h2>
        </div>

        {/* Scenario Description */}
        <div className="p-5 rounded-2xl bg-[#121212] border border-white/5 text-sm md:text-base text-[#F1EBE6] font-body leading-relaxed">
          {challenge.scenario}
        </div>

        {/* Question Prompt */}
        <div className="flex items-center gap-2 text-xs font-mono text-[#F26522] font-semibold uppercase tracking-wider">
          <BrainCircuit className="w-4 h-4" />
          <span>{challenge.question}</span>
        </div>

        {/* Multiple Choice Options */}
        <div className="space-y-3">
          {challenge.options.map((option, idx) => {
            let btnStyle = 'bg-[#141414] hover:bg-[#1C1C1C] border-white/10 text-[#8A8582] hover:text-[#F1EBE6]';

            if (hasAnswered) {
              if (idx === challenge.correctIndex) {
                btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]';
              } else if (selectedOption === idx) {
                btnStyle = 'bg-red-950/80 border-red-500 text-red-200';
              } else {
                btnStyle = 'opacity-30 bg-white/5 border-white/5 text-[#8A8582]';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                disabled={hasAnswered}
                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-mono transition-all flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-lg bg-white/5 flex items-center justify-center text-[10px] text-[#8A8582]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
                {hasAnswered && idx === challenge.correctIndex && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {hasAnswered && selectedOption === idx && idx !== challenge.correctIndex && (
                  <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Post-Answer Explanation Box */}
        {hasAnswered && (
          <div className="p-6 rounded-2xl bg-[#141414] border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold text-[#F26522] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                COGNITIVE DIAGNOSIS
              </span>
              <button
                onClick={() => onSelectPattern(challenge.patternId)}
                className="text-xs font-mono text-[#F1EBE6] hover:text-[#F26522] transition-colors"
              >
                Inspect Pattern Model →
              </button>
            </div>

            <p className="text-xs sm:text-sm text-[#8A8582] font-body leading-relaxed">
              {challenge.explanation}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNextChallenge}
                className="px-6 py-3 rounded-xl bg-[#F26522] hover:bg-[#ff7638] text-white font-semibold text-xs font-mono transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(242,101,34,0.4)]"
              >
                <span>{currentIdx < challenges.length - 1 ? 'Next Challenge' : 'Complete Set'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
