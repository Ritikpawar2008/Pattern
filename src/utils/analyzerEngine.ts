import { SituationAnalysisResult } from '../types';

interface SituationRule {
  patternId: string;
  patternName: string;
  category: 'business' | 'human' | 'technology' | 'nature' | 'history' | 'society' | 'markets' | 'everyday';
  keywords: string[];
  phrases: string[];
  weight: number;
  whyTemplate: (matches: string[]) => string;
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

const RULES: SituationRule[] = [
  {
    patternId: 'bottleneck',
    patternName: 'Scaling Bottleneck & Queue Congestion',
    category: 'business',
    keywords: ['customer', 'profit', 'cost', 'revenue', 'hiring', 'slow', 'margin', 'growing', 'waiting', 'backlog', 'delay', 'support', 'capacity'],
    phrases: [
      'customers but profit',
      'growing but profit',
      'more revenue but',
      'hired more people but',
      'wait time',
      'bottleneck',
      'stuck in review',
      'ticket backlog'
    ],
    weight: 1.2,
    whyTemplate: (matches) => `Your situation shows clear signals (${matches.slice(0, 3).join(', ')}) where operational expansion is outpacing internal throughput capacity, shifting friction to a single resource constraint.`,
    keySignals: [
      'Top-line volume (users/orders) rising faster than bottom-line net profit.',
      'Work-in-progress inventory accumulating at a specific handoff point.',
      'Marginal cost per new customer increasing rather than decreasing.'
    ],
    relatedPatternIds: ['pareto-principle', 'feedback-loop', 'growth-peak-decline'],
    diagnosticQuestions: [
      'Which specific step in your delivery chain takes the longest time per unit?',
      'Which 20% of customer accounts or product lines generate 80% of support tickets?',
      'Are non-critical employees doing work that blocks the primary decision-maker?'
    ],
    outcomes: [
      {
        title: 'Throughput Freeze & Margin Compression',
        probability: 'Most Likely',
        description: 'Without unblocking the critical constraint, acquiring more customers will degrade service quality and burn cash reserves.',
        recommendation: 'Halt marketing campaigns temporarily and conduct a Theory of Constraints audit on the narrowest workflow step.'
      },
      {
        title: 'Breakthrough via Constraint Elevation',
        probability: 'Possible',
        description: 'Automating or adding dedicated capacity to the single bottleneck multiplies total output across the entire organization.',
        recommendation: 'Subordinate all other team activities to keep the bottleneck running at 100% uninterrupted capacity.'
      },
      {
        title: 'Employee Burnout & Quality Death Spiral',
        probability: 'Tail Risk / Unintended',
        description: 'Pushing more volume into a clogged system causes key personnel to resign, destroying institutional memory.',
        recommendation: 'Introduce buffer time and strict work-in-progress (WIP) caps.'
      }
    ]
  },
  {
    id: 'habit-breakdown',
    patternId: 'habit-loop',
    patternName: 'Habit Cue Friction & Cognitive Fatigue Loop',
    category: 'human',
    keywords: ['procrastinating', 'habit', 'phone', 'distracted', 'willpower', 'relapse', 'morning', 'exercise', 'diet', 'discipline', 'focus', 'scroll', 'anxious'],
    phrases: [
      'keep checking my phone',
      'try to focus but',
      'start strong then quit',
      'procrastinate on',
      'lose motivation',
      'break my habit'
    ],
    weight: 1.1,
    whyTemplate: (matches) => `Your description highlights unconscious neurological triggers (${matches.slice(0, 3).join(', ')}) where environmental cues override rational intentions under cognitive fatigue.`,
    keySignals: [
      'Relying on exhaustible conscious willpower rather than environment design.',
      'High friction placed between the cue and the desired constructive routine.',
      'Immediate instant gratification competing against delayed long-term rewards.'
    ],
    relatedPatternIds: ['feedback-loop', 'compounding', 'incentive-loop'],
    diagnosticQuestions: [
      'What exact sensory cue (time, physical item, emotion) precedes the unwanted behavior?',
      'How many physical seconds of friction can you add to make the bad habit harder to start?',
      'What immediate microscopic dopamine reward can you attach to the good habit on day one?'
    ],
    outcomes: [
      {
        title: 'Basal Ganglia Relapse Cycle',
        probability: 'Most Likely',
        description: 'Attempting to change behavior without modifying the physical environment will fail within 7–14 days as willpower depletes.',
        recommendation: 'Physically lock phone in another room or hide trigger items.'
      },
      {
        title: 'Frictionless Automated Routine',
        probability: 'Possible',
        description: 'Pairing a microscopic 2-minute routine to an existing daily anchor (e.g. coffee) cements the loop permanently.',
        recommendation: 'Use habit stacking: "After I [Current Habit], I will [New 1-Minute Routine]."'
      },
      {
        title: 'Chronic Guilt Rumination Spiral',
        probability: 'Tail Risk / Unintended',
        description: 'Self-criticism spikes anxiety, which acts as the cue for the comforting bad habit.',
        recommendation: 'Shift mindset from moral failure to mechanical system debugging.'
      }
    ]
  } as any,
  {
    patternId: 'network-effects',
    patternName: 'Two-Sided Network Effect / Liquidity Trap',
    category: 'technology',
    keywords: ['platform', 'marketplace', 'chicken and egg', 'users leaving', 'retention', 'buyers', 'sellers', 'community', 'empty', 'liquidity', 'matchmaking'],
    phrases: [
      'users join but leave',
      'chicken and egg',
      'need more users to get users',
      'two sided market',
      'nobody is active'
    ],
    weight: 1.15,
    whyTemplate: (matches) => `You are navigating network dynamics (${matches.slice(0, 3).join(', ')}) where the platform provides zero standalone utility without dense counterparty liquidity.`,
    keySignals: [
      'High bounce rate from new signups encountering a cold, empty state.',
      'Relying on broad geographic dispersion rather than hyper-dense micro-clusters.',
      'Absence of single-player mode (utility on day one with zero other users).'
    ],
    relatedPatternIds: ['scurve-adoption', 'feedback-loop', 'threshold-effect'],
    diagnosticQuestions: [
      'Can a user derive valuable utility from your product alone before anyone else joins?',
      'Can you constrain your market to a single college campus or single zip code to force density?',
      'Can you manually fake the supply side until organic demand reaches critical mass?'
    ],
    outcomes: [
      {
        title: 'Cold-Start Liquidity Evaporation',
        probability: 'Most Likely',
        description: 'Users bounce upon discovering low counterparty activity, creating negative word-of-mouth that repels future cohorts.',
        recommendation: 'Focus 100% of resources on a tiny hyper-niche geography to manufacture artificial density.'
      },
      {
        title: 'Tipping Point & Quadratic Value Takeoff',
        probability: 'Possible',
        description: 'Once local density crosses the threshold, organic viral referrals accelerate rapidly.',
        recommendation: 'Subsidize supply side aggressively until transaction turnaround time drops below 3 minutes.'
      },
      {
        title: 'Mercenary Subsidy Churn',
        probability: 'Tail Risk / Unintended',
        description: 'Cash rewards attract bots and discount hunters who disappear the moment subsidies end.',
        recommendation: 'Ensure structural utility retention before applying capital subsidies.'
      }
    ]
  },
  {
    patternId: 'second-order-effects',
    patternName: 'Perverse Incentives & Cobra Blowback',
    category: 'society',
    keywords: ['policy', 'rule', 'backfired', 'cheating', 'gaming', 'metric', 'quota', 'bonus', 'complaints', 'unintended', 'worse than before'],
    phrases: [
      'introduced a rule and it made things worse',
      'people are gaming the system',
      'metric improved but quality dropped',
      'bonuses caused bad behavior'
    ],
    weight: 1.25,
    whyTemplate: (matches) => `Your situation exhibits classic Goodhart’s Law dynamics (${matches.slice(0, 3).join(', ')}) where actors optimize for the visible measurement at the expense of the true objective.`,
    keySignals: [
      'Decoupling between official dashboard metrics and qualitative reality.',
      'Employees or participants using clever workarounds to exploit the reward structure.',
      'Short-term gains masking long-term systemic erosion.'
    ],
    relatedPatternIds: ['incentive-loop', 'feedback-loop', 'adaptation'],
    diagnosticQuestions: [
      'If you were an unethical participant, how would you maximize this bonus with the least real effort?',
      'What qualitative metric (CSAT, code health, employee retention) is currently unmeasured?',
      'Can you replace individual numerical targets with paired counter-balancing constraints?'
    ],
    outcomes: [
      {
        title: 'Institutional Cynicism & Metric Degradation',
        probability: 'Most Likely',
        description: 'High-integrity performers become demoralized as gaming participants get promoted for manufactured numbers.',
        recommendation: 'Acknowledge the flaw publicly and sunset the single-dimensional metric.'
      },
      {
        title: 'Holistic Multi-Factor Alignment',
        probability: 'Possible',
        description: 'Pairing output volume with quality, safety, and peer reviews restores systemic balance.',
        recommendation: 'Tie rewards to long-term delayed customer retention rather than instant closing velocity.'
      },
      {
        title: 'Catastrophic Public Scandal',
        probability: 'Tail Risk / Unintended',
        description: 'Systematic corner-cutting leads to major safety, legal, or reputational liability.',
        recommendation: 'Establish an independent whistleblower or audit channel.'
      }
    ]
  },
  {
    patternId: 'boom-bubble-crash',
    patternName: 'Euphoria & Speculative Minsky Instability',
    category: 'markets',
    keywords: ['crypto', 'stock', 'hype', 'fomo', 'price', 'crash', 'bubble', 'easy money', 'quit job', 'guaranteed', 'cant lose', 'leverage'],
    phrases: [
      'everyone is buying',
      'this time is different',
      'cant lose money',
      'quitting job to trade',
      'easy 10x returns'
    ],
    weight: 1.2,
    whyTemplate: (matches) => `You are describing classic late-stage speculative market euphoria (${matches.slice(0, 3).join(', ')}) where price action has fully detached from cash-flow fundamentals.`,
    keySignals: [
      'Non-professional mainstream participants entering with high leverage or life savings.',
      'Dismissal of historical valuation models under claims of a "New Paradigm".',
      'Liquidity dependent on continuous influx of new speculative capital.'
    ],
    relatedPatternIds: ['reflexivity', 'trend-reversal', 'feedback-loop'],
    diagnosticQuestions: [
      'If zero new buyers entered tomorrow, what cash flow yield does the underlying asset generate?',
      'How much debt or margin leverage is embedded across the current buyer cohort?',
      'What happens to your personal solvency if this asset drops 75% overnight?'
    ],
    outcomes: [
      {
        title: 'Minsky Moment & Liquidity Cascade',
        probability: 'Most Likely',
        description: 'A minor rate increase or panic seller triggers margin calls, turning buyers into forced sellers with zero liquidity below.',
        recommendation: 'Take initial capital off the table and maintain a 12-month liquid cash emergency fund.'
      },
      {
        title: 'Prolonged Speculative Mania Extension',
        probability: 'Possible',
        description: 'Euphoria can persist longer than rational participants remain solvent, pushing prices to further extremes.',
        recommendation: 'Never short an irrational bubble with leverage.'
      },
      {
        title: 'Total Capital Evaporation',
        probability: 'Tail Risk / Unintended',
        description: 'Holding 100% allocation through the crash wipes out generational wealth.',
        recommendation: 'Enforce strict stop-losses and asset diversification.'
      }
    ]
  },
  {
    patternId: 'compounding',
    patternName: 'Early Flat Phase of Compounding',
    category: 'everyday',
    keywords: ['working hard', 'no results', 'slow', 'frustrated', 'gym', 'coding', 'writing', 'months', 'studying', 'consistent', 'routine'],
    phrases: [
      'working for months with no results',
      'feel like giving up',
      'not seeing progress',
      'practicing every day but'
    ],
    weight: 1.1,
    whyTemplate: (matches) => `Your situation matches the classic "Plateau of Latent Potential" in compounding (${matches.slice(0, 3).join(', ')}) where early energy is stored before visible breakthrough.`,
    keySignals: [
      'High consistency of daily input with microscopic visible output.',
      'Linear expectations colliding with the non-linear curvature of organic compounding.',
      'The highest risk of premature surrender occurring right before the inflection elbow.'
    ],
    relatedPatternIds: ['habit-loop', 'exponential-growth', 'feedback-loop'],
    diagnosticQuestions: [
      'Are you measuring input consistency (actions taken) or prematurely obsessing over lagging output metrics?',
      'Has the underlying skill or network infrastructure improved by even 1% each week?',
      'What would happen if you maintained this exact pace without stopping for 24 uninterrupted months?'
    ],
    outcomes: [
      {
        title: 'Non-Linear Inflection Breakthrough',
        probability: 'Most Likely',
        description: 'Persisting through the flat zone allows accumulated domain models to unlock sudden exponential leverage.',
        recommendation: 'Focus exclusively on maintaining the streak of daily unforced practice.'
      },
      {
        title: 'Premature Surrender & Reset',
        probability: 'Possible',
        description: 'Quitting after 3 months resets the compounding clock, forcing you to restart the flat phase in a new domain.',
        recommendation: 'Commit to a 100-day unjudged experiment.'
      },
      {
        title: 'Ineffective Practice Fatigue',
        probability: 'Tail Risk / Unintended',
        description: 'Repeating passive low-quality effort without feedback loops wastes energy.',
        recommendation: 'Seek rigorous critique from a master to ensure deliberate practice.'
      }
    ]
  }
];

export const analyzeSituationText = (text: string): SituationAnalysisResult => {
  const lower = text.toLowerCase();
  
  let bestRule = RULES[0];
  let highestScore = 0;
  let matchedTerms: string[] = [];

  for (const rule of RULES) {
    let score = 0;
    const currentMatches: string[] = [];

    for (const phrase of rule.phrases) {
      if (lower.includes(phrase)) {
        score += 8 * rule.weight;
        currentMatches.push(`"${phrase}"`);
      }
    }

    for (const kw of rule.keywords) {
      const regex = new RegExp(`\\b${kw}\\b`, 'i');
      if (regex.test(lower)) {
        score += 2 * rule.weight;
        currentMatches.push(kw);
      }
    }

    if (score > highestScore) {
      highestScore = score;
      bestRule = rule;
      matchedTerms = currentMatches;
    }
  }

  // Determine confidence
  let confidence: 'High' | 'Moderate' | 'Exploratory' = 'Moderate';
  let confidenceScore = 65;

  if (highestScore > 18) {
    confidence = 'High';
    confidenceScore = Math.min(94, 75 + Math.floor(highestScore));
  } else if (highestScore > 6) {
    confidence = 'Moderate';
    confidenceScore = 60 + Math.floor(highestScore * 1.2);
  } else {
    confidence = 'Exploratory';
    confidenceScore = 48;
    matchedTerms = ['general complexity indicators', 'structural tension'];
  }

  return {
    patternId: bestRule.patternId,
    patternName: bestRule.patternName,
    category: bestRule.category,
    confidence,
    confidenceScore,
    why: bestRule.whyTemplate(matchedTerms.length ? matchedTerms : ['subtle workflow imbalance', 'delayed consequences']),
    keySignals: bestRule.keySignals,
    relatedPatternIds: bestRule.relatedPatternIds,
    diagnosticQuestions: bestRule.diagnosticQuestions,
    outcomes: bestRule.outcomes
  };
};
