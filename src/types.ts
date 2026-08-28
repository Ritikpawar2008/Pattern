export type CategoryId = 
  | 'human'
  | 'business'
  | 'technology'
  | 'nature'
  | 'history'
  | 'society'
  | 'markets'
  | 'everyday';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type VisualType = 
  | 'cycle' 
  | 'compounding' 
  | 'network' 
  | 'scurve' 
  | 'pareto' 
  | 'bubble' 
  | 'bottleneck' 
  | 'viral' 
  | 'adaptation' 
  | 'second_order'
  | 'emergence'
  | 'wave'
  | 'threshold';

export interface Category {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  accentColor: string;
  patternCount: number;
}

export interface PatternMeter {
  frequency: number;     // 0 - 100
  complexity: number;    // 0 - 100
  predictability: number; // 0 - 100
  impact: number;        // 0 - 100
}

export interface SpotItScenario {
  scenario: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface PredictionScenario {
  currentState: string;
  prompt: string;
  options: {
    label: string;
    description: string;
    isMostLikely: boolean;
  }[];
  explanation: string;
  confidenceNotes: string;
}

export interface Pattern {
  id: string;
  title: string;
  shortTitle?: string;
  category: CategoryId;
  secondaryCategories?: CategoryId[];
  difficulty: Difficulty;
  tagline: string;
  definition: string;
  visualType: VisualType;
  flowSteps: string[]; // e.g. ["Action", "Result", "Response", "Action"]
  howItWorks: {
    step: number;
    title: string;
    description: string;
  }[];
  whereItAppears: {
    domain: string;
    icon: string;
    context: string;
  }[];
  realWorldExamples: {
    title: string;
    domain: string;
    flow: string;
    description: string;
  }[];
  meters: PatternMeter;
  relatedPatternIds: string[];
  spotItScenario: SpotItScenario;
  predictionScenario: PredictionScenario;
  keyRule: string;
  earlyWarningSignal: string;
  counterAction: string;
}

export interface Challenge {
  id: string;
  patternId: string;
  title: string;
  category: CategoryId;
  difficulty: Difficulty;
  scenario: string;
  dataPoints?: { label: string; value: number }[];
  visualHintType?: VisualType;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  points: number;
  timeLimitSeconds?: number;
  categoryWeight: {
    observation: number;
    logic: number;
    prediction: number;
    connection: number;
  };
}

export interface CaseStudyTimelineStage {
  phase: string;
  title: string;
  description: string;
  indicator: string;
}

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: CategoryId;
  patternId: string;
  summary: string;
  observation: string;
  patternDetected: string;
  whyItHappened: string;
  consequences: string;
  whatCouldBeNoticedEarlier: string;
  timeline: CaseStudyTimelineStage[];
  keyTakeaway: string;
  visualType: VisualType;
}

export interface ActivityItem {
  id: string;
  timestamp: number;
  type: 'challenge_completed' | 'pattern_discovered' | 'situation_analyzed' | 'case_read' | 'streak_extended' | 'image_scanned' | 'scan_saved';
  title: string;
  detail: string;
  pointsEarned?: number;
  success?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: number | null;
  progress: number; // 0 - 100
  target: number;
}

export interface PatternScanAnalysis {
  observations: string[];
  primaryPattern: {
    name: string;
    category: string;
    confidence: 'High' | 'Moderate' | 'Low';
    confidenceScore: number;
    tagline?: string;
  };
  reasoning: string;
  visualStructure: string;
  visualType: VisualType;
  flowSteps: string[];
  relatedPatterns: {
    id?: string;
    name: string;
    category: string;
    reason: string;
  }[];
  whereItAppears: {
    domain: string;
    context: string;
  }[];
  possibleOutcomes: {
    title: string;
    likelihood: 'Possible' | 'Tail Risk' | 'Alternative';
    description: string;
    indicatorToWatch: string;
  }[];
  uncertainties: string[];
  comparisonInsights?: {
    sharedPatterns: string[];
    structuralDifferences: string[];
    commonUnderlyingDynamic: string;
  };
}

export interface ScanChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  visualEvidence?: string[];
  alternativeHypothesis?: string;
  timestamp: number;
}

export interface ScanSavedPattern {
  id: string;
  date: string;
  timestamp: number;
  imageDataUrl: string;
  comparisonImages?: string[];
  patternName: string;
  category: string;
  confidence: 'High' | 'Moderate' | 'Low';
  confidenceScore: number;
  shortExplanation: string;
  userPrompt?: string;
  analysis: PatternScanAnalysis;
  chatHistory: ScanChatMessage[];
}

export interface UserProgress {
  score: number;
  streak: number;
  bestStreak: number;
  lastActiveDate: string;
  completedChallengeIds: string[];
  discoveredPatternIds: string[];
  bookmarkedPatternIds: string[];
  completedCaseIds: string[];
  savedScans: ScanSavedPattern[];
  categoryAccuracy: Record<CategoryId, { correct: number; total: number }>;
  radarScores: {
    observation: number;
    logic: number;
    prediction: number;
    connection: number;
  };
  history: ActivityItem[];
  achievements: Achievement[];
  totalTimeSeconds: number;
}

export interface SituationAnalysisResult {
  patternId: string;
  patternName: string;
  category: CategoryId;
  confidence: 'High' | 'Moderate' | 'Exploratory';
  confidenceScore: number; // 0-100
  why: string;
  keySignals: string[];
  relatedPatternIds: string[];
  diagnosticQuestions: string[];
  outcomes: {
    title: string;
    probability: 'Most Likely' | 'Possible' | 'Tail Risk / Unintended';
    description: string;
    recommendation: string;
  }[];
}
