import { Challenge } from '../types';

export const CHALLENGES: Challenge[] = [
  {
    id: 'ch-1',
    patternId: 'feedback-loop',
    title: 'The Viral Creator Flywheel',
    category: 'technology',
    difficulty: 'beginner',
    scenario: 'A short-form video creator posts daily. High viewer watch-time triggers the recommendation engine to distribute the video to 500,000 new feeds. The creator gains 20,000 followers, which raises baseline views for the next video, prompting sponsors to offer higher ad payouts, which allows the creator to hire an editor and produce even higher retention videos.',
    question: 'Which fundamental pattern architecture is primarily fueling this rapid escalation in reach?',
    options: [
      'Negative Balancing Equilibrium',
      'Positive Reinforcing Feedback Loop',
      'Statistical Mean Reversion',
      'Bottleneck Constraint'
    ],
    correctIndex: 1,
    explanation: 'Each cycle’s output (watch-time & revenue) reinvests directly into improving input quality (editing & reach), creating a self-amplifying compounding loop.',
    points: 100,
    timeLimitSeconds: 45,
    categoryWeight: { observation: 30, logic: 35, prediction: 20, connection: 15 }
  },
  {
    id: 'ch-2',
    patternId: 'network-effects',
    title: 'The Marketplace Cold Start',
    category: 'business',
    difficulty: 'intermediate',
    scenario: 'A startup launches an on-demand lawnmowing app in Denver. With only 10 homeowners and 2 mowers registered, homeowners wait 5 days for service and mowers drive 25 miles per job. Once 1,000 homeowners sign up, average wait time drops to 30 minutes, mowers earn 4x per hour with 5-minute drives, and zero competitors can steal users despite offering 50% discount coupons.',
    question: 'What dynamic turned this struggling service into an unassailable regional monopoly?',
    options: [
      'Two-Sided Network Effects & Local Density Liquidity',
      'The Cobra Incentive Dilemma',
      'Hedonic Adaptation Cycle',
      'Survivorship Selection Bias'
    ],
    correctIndex: 0,
    explanation: 'Dense two-sided network liquidity increases value for both sides simultaneously (lower wait times for buyers, higher hourly yield for providers), creating an insurmountable defensive moat.',
    points: 150,
    timeLimitSeconds: 60,
    categoryWeight: { observation: 25, logic: 30, prediction: 30, connection: 15 }
  },
  {
    id: 'ch-3',
    patternId: 'second-order-effects',
    title: 'The Fire Extinguisher Incentive',
    category: 'society',
    difficulty: 'advanced',
    scenario: 'A municipal government notices apartment fire deaths and passes a law mandating high-tech automatic sprinklers and fire alarms in every rental unit. To offset the $40,000 retrofitting costs, landlords hike rent by 35%. Lower-income tenants are evicted and move into uninspected wooden shacks in informal encampments with open-flame kerosene stoves, where total citywide fire casualties rise 60% over 2 years.',
    question: 'What systemic failure explains why a well-intentioned safety policy directly multiplied total fatalities?',
    options: [
      'Ignored Second-Order Displacement Effects',
      'Metcalfe’s Quadratic Expansion',
      'Sigmoid S-Curve Saturation',
      'Pure Random Noise'
    ],
    correctIndex: 0,
    explanation: 'First-order thinking saw only sprinkler mechanics in formal housing; second-order analysis reveals economic displacement into far more hazardous informal housing.',
    points: 200,
    timeLimitSeconds: 75,
    categoryWeight: { observation: 20, logic: 25, prediction: 40, connection: 15 }
  },
  {
    id: 'ch-4',
    patternId: 'scurve-adoption',
    title: 'The Slow Electric Shift',
    category: 'technology',
    difficulty: 'intermediate',
    scenario: 'A clean energy analyst observes global solar panel installations: Year 1–10 adoption hovers below 2% and legacy energy CEOs mock it as a subsidy toy. Between Year 11 and 16, installations surge from 4% to 32% globally, battery costs drop 85%, and coal power plant construction halts worldwide.',
    question: 'Which adoption trajectory explains why solar seemed dead for a decade before suddenly conquering global new electricity generation?',
    options: [
      'Linear Constant Incrementalism',
      'S-Curve Technology Adoption & Learning Curves (Swanson’s Law)',
      'The Minsky Bubble Euphoria',
      'Goodhart’s Target Gaming'
    ],
    correctIndex: 1,
    explanation: 'Exponential scaling curves appear flat and insignificant during the 0–3% incubation phase, but hit an explosive mainstream inflection point once unit economics cross parity with legacy alternatives.',
    points: 150,
    timeLimitSeconds: 60,
    categoryWeight: { observation: 20, logic: 35, prediction: 30, connection: 15 }
  },
  {
    id: 'ch-5',
    patternId: 'pareto-principle',
    title: 'The Customer Support Nightmare',
    category: 'business',
    difficulty: 'beginner',
    scenario: 'A software company hosts 5,000 business accounts. The CEO looks at support metrics and finds that 120 specific enterprise clients submit 82% of all custom bug requests and consume 79% of senior engineering time, while paying only 4% of total subscription revenue.',
    question: 'Which power-law phenomenon is creating this massive resource drain?',
    options: [
      'Pareto 80/20 Distribution Imbalance',
      'The Pygmalion Expectation Loop',
      'Predator-Prey Oscillation',
      'QWERTY Path Dependence'
    ],
    correctIndex: 0,
    explanation: 'A tiny minority (~2.4%) of clients is generating ~80% of operational drag. Firing or repricing those specific accounts instantly liberates engineering capacity.',
    points: 100,
    timeLimitSeconds: 40,
    categoryWeight: { observation: 35, logic: 35, prediction: 15, connection: 15 }
  },
  {
    id: 'ch-6',
    patternId: 'bottleneck',
    title: 'The Microchip Foundry Stall',
    category: 'technology',
    difficulty: 'intermediate',
    scenario: 'A custom silicon design company hires 50 world-class chip architects, doubles its cloud compute cluster, and generates 10 new breakthrough processor designs per month. However, the external fabrication foundry has a 9-month backlog for prototype wafer etching, meaning only 1 chip can be physically validated every quarter.',
    question: 'Where should leadership concentrate capital to actually increase the pace of shipping final silicon to customers?',
    options: [
      'Hire 50 more chip designers',
      'Subordinate and Elevate the Fabrication Foundry Chokepoint',
      'Double the marketing budget',
      'Buy faster employee keyboards'
    ],
    correctIndex: 1,
    explanation: 'According to the Theory of Constraints (Bottleneck), any optimization done upstream of the constraint merely piles up unused inventory without increasing systemic throughput.',
    points: 150,
    timeLimitSeconds: 50,
    categoryWeight: { observation: 25, logic: 35, prediction: 25, connection: 15 }
  },
  {
    id: 'ch-7',
    patternId: 'selection-effect',
    title: 'The Armor of the Fallen',
    category: 'history',
    difficulty: 'beginner',
    scenario: 'During a conflict, naval engineers inspect returning combat ships and notice heavy shell damage concentrated on the outer hull and deck railings. The admirals order heavy steel armor added to the railings and outer hull.',
    question: 'What fundamental analytical flaw did the admirals commit?',
    options: [
      'Survivorship Bias (Ignoring ships that took hits to the engine and sank)',
      'Linear Extrapolation Error',
      'Network Saturation',
      'Hedonic Escalation'
    ],
    correctIndex: 0,
    explanation: 'The surviving ships returned precisely because hits to the railings were non-fatal. Armor should be placed where the returning ships had NO holes (engines and rudder), because hits there caused immediate sinking.',
    points: 100,
    timeLimitSeconds: 45,
    categoryWeight: { observation: 30, logic: 40, prediction: 15, connection: 15 }
  },
  {
    id: 'ch-8',
    patternId: 'boom-bubble-crash',
    title: 'The Canal Mania of 1790',
    category: 'markets',
    difficulty: 'advanced',
    scenario: 'In 1790s Britain, the Duke of Bridgewater’s coal canal delivers massive 40% profits. Within 3 years, 80 new canal proposals raise capital from aristocrats and shopkeepers with zero engineering experience. Land prices along proposed routes quadruple. In 1793, the Bank of England tightens credit; 60 canal companies go bankrupt overnight with unfinished dry ditches across the countryside.',
    question: 'Which sequence of systemic forces accurately maps this historical event?',
    options: [
      'Displacement → Credit Expansion → Euphoria → Liquidity Shock → Panic Liquidation',
      'Stable Equilibrium → Linear Growth → Permanent Plateau',
      'Habit Cue → Routine → Variable Reward',
      'Darwinian Antibiotic Selection'
    ],
    correctIndex: 0,
    explanation: 'The classic 5-stage Minsky bubble cycle: genuine technological displacement attracts speculative debt and irrational euphoria until a credit tightening triggers vertical liquidation.',
    points: 200,
    timeLimitSeconds: 70,
    categoryWeight: { observation: 20, logic: 30, prediction: 30, connection: 20 }
  },
  {
    id: 'ch-9',
    patternId: 'incentive-loop',
    title: 'The Bountiful Cobras',
    category: 'human',
    difficulty: 'beginner',
    scenario: 'To reduce venomous snakes, a colonial governor offers 5 silver coins for every dead cobra skin brought to city hall. Citizens begin breeding cobras in backyards to collect coins daily. When the governor realizes this and cancels the bounty, breeders release thousands of now-worthless cobras into the streets, increasing the wild cobra population threefold.',
    question: 'Which behavioral law describes how rewarding a proxy metric created the exact opposite outcome?',
    options: [
      'Goodhart’s Law & Perverse Incentive Loops',
      'Metcalfe’s Quadratic Multiplier',
      'The Pareto 80/20 Ratio',
      'Circadian Sleep Oscillations'
    ],
    correctIndex: 0,
    explanation: 'When people are paid for snake skins rather than snake eradication, they optimize for the easiest path to produce skins (breeding them).',
    points: 100,
    timeLimitSeconds: 45,
    categoryWeight: { observation: 25, logic: 35, prediction: 25, connection: 15 }
  },
  {
    id: 'ch-10',
    patternId: 'emergence',
    title: 'The Phantom Highway Wave',
    category: 'nature',
    difficulty: 'advanced',
    scenario: 'On a 4-lane highway with heavy traffic moving at 65 mph, car #1 taps its brakes for 1.2 seconds to dodge a paper cup. Car #2 behind reacts with 1.8 seconds of braking. By car #20, the braking is a full 5-second halt. For the next 3 hours, a 2-mile standstill traffic jam slowly creeps backward down the highway with no stalled car or accident anywhere.',
    question: 'What type of complex system behavior generated this phantom traffic jam?',
    options: [
      'Emergent Self-Organizing Shockwave through Local Interaction Feedback',
      'Direct Centralized Command Failure',
      'Linear Mechanical Friction',
      'Survivorship Bias'
    ],
    correctIndex: 0,
    explanation: 'Decentralized agents following local following-distance rules amplify slight reaction-time delays into a macroscopic backward-traveling wave.',
    points: 200,
    timeLimitSeconds: 65,
    categoryWeight: { observation: 25, logic: 25, prediction: 30, connection: 20 }
  }
];

export const getChallengesByDifficulty = (diff?: string): Challenge[] => {
  if (!diff || diff === 'all') return CHALLENGES;
  return CHALLENGES.filter(c => c.difficulty === diff);
};
