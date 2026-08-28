import { Achievement, UserProgress, ActivityItem } from '../types';

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-first-pattern',
    title: 'First Pattern',
    description: 'Discover and inspect your first pattern in the universe.',
    icon: 'Compass',
    unlockedAt: null,
    progress: 0,
    target: 1
  },
  {
    id: 'ach-pattern-hunter',
    title: 'Pattern Hunter',
    description: 'Explore at least 5 different pattern architectures.',
    icon: 'Search',
    unlockedAt: null,
    progress: 0,
    target: 5
  },
  {
    id: 'ach-10-patterns',
    title: '10 Patterns Discovered',
    description: 'Deeply study 10 patterns across multiple domains.',
    icon: 'Layers',
    unlockedAt: null,
    progress: 0,
    target: 10
  },
  {
    id: 'ach-perfect-round',
    title: 'Precision Detective',
    description: 'Solve 3 Spot the Pattern challenges with 100% accuracy.',
    icon: 'Target',
    unlockedAt: null,
    progress: 0,
    target: 3
  },
  {
    id: 'ach-prediction-master',
    title: 'Prediction Master',
    description: 'Successfully predict the outcome of 5 real-world scenarios.',
    icon: 'Zap',
    unlockedAt: null,
    progress: 0,
    target: 5
  },
  {
    id: 'ach-connection-builder',
    title: 'Connection Builder',
    description: 'Explore the Pattern Map and inspect cross-domain links.',
    icon: 'Share2',
    unlockedAt: null,
    progress: 0,
    target: 1
  },
  {
    id: 'ach-situation-analyst',
    title: 'Situation Analyst',
    description: 'Analyze a personal or business dilemma in the Situation Analyzer.',
    icon: 'Cpu',
    unlockedAt: null,
    progress: 0,
    target: 1
  },
  {
    id: 'ach-first-scan',
    title: 'Visual Scanner',
    description: 'Scan your first real-world image or diagram with PATTERN AI.',
    icon: 'Eye',
    unlockedAt: null,
    progress: 0,
    target: 1
  },
  {
    id: 'ach-scan-archivist',
    title: 'Pattern Archivist',
    description: 'Save 3 image pattern analyses to your personal cognitive library.',
    icon: 'Bookmark',
    unlockedAt: null,
    progress: 0,
    target: 3
  },
  {
    id: 'ach-7-streak',
    title: 'Systems Thinker',
    description: 'Achieve a score of 500+ across pattern recognition training.',
    icon: 'Award',
    unlockedAt: null,
    progress: 0,
    target: 500
  }
];

export const INITIAL_USER_PROGRESS: UserProgress = {
  score: 340,
  streak: 3,
  bestStreak: 5,
  lastActiveDate: new Date().toISOString().split('T')[0],
  completedChallengeIds: ['ch-1'],
  discoveredPatternIds: ['feedback-loop', 'compounding', 'network-effects'],
  bookmarkedPatternIds: ['feedback-loop', 'network-effects'],
  completedCaseIds: ['case-kodak-nokia'],
  savedScans: [],
  categoryAccuracy: {
    human: { correct: 2, total: 2 },
    business: { correct: 3, total: 4 },
    technology: { correct: 4, total: 4 },
    nature: { correct: 1, total: 1 },
    history: { correct: 2, total: 2 },
    society: { correct: 1, total: 2 },
    markets: { correct: 2, total: 3 },
    everyday: { correct: 2, total: 2 }
  },
  radarScores: {
    observation: 82,
    logic: 76,
    prediction: 71,
    connection: 88
  },
  history: [
    {
      id: 'act-1',
      timestamp: Date.now() - 3600000 * 2,
      type: 'challenge_completed',
      title: 'Completed Feedback Loop challenge',
      detail: 'Correctly identified creator flywheel dynamics (+100 pts)',
      pointsEarned: 100,
      success: true
    },
    {
      id: 'act-2',
      timestamp: Date.now() - 3600000 * 12,
      type: 'pattern_discovered',
      title: 'Explored Network Effects',
      detail: 'Studied Metcalfe’s Law and 2-sided marketplace moats'
    },
    {
      id: 'act-3',
      timestamp: Date.now() - 3600000 * 24,
      type: 'case_read',
      title: 'Read Case Study: The Rise & Fall of a Giant',
      detail: 'Analyzed Kodak & Nokia digital S-curve transition'
    }
  ],
  achievements: INITIAL_ACHIEVEMENTS.map(a => {
    if (a.id === 'ach-first-pattern') return { ...a, progress: 1, unlockedAt: Date.now() - 86400000 };
    if (a.id === 'ach-pattern-hunter') return { ...a, progress: 3 };
    if (a.id === 'ach-10-patterns') return { ...a, progress: 3 };
    if (a.id === 'ach-perfect-round') return { ...a, progress: 1 };
    if (a.id === 'ach-7-streak') return { ...a, progress: 340 };
    return a;
  }),
  totalTimeSeconds: 420
};
