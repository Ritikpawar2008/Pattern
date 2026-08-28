import { Pattern } from '../types';

export const PATTERNS: Pattern[] = [
  {
    id: 'feedback-loop',
    title: 'Feedback Loop',
    shortTitle: 'Feedback Loops',
    category: 'business',
    secondaryCategories: ['human', 'technology', 'nature'],
    difficulty: 'beginner',
    tagline: 'Outputs circle back to become future inputs.',
    definition: 'A feedback loop occurs when the output of a system directly influences the system’s future state—either amplifying change (positive feedback) or stabilizing balance (negative feedback).',
    visualType: 'cycle',
    flowSteps: ['ACTION', 'RESULT', 'RESPONSE', 'REINFORCEMENT'],
    howItWorks: [
      { step: 1, title: 'Initiating Action', description: 'A variable changes or an actor takes an action within the system.' },
      { step: 2, title: 'System Output', description: 'The action creates a measurable outcome or signal in the surrounding environment.' },
      { step: 3, title: 'Observation / Reaction', description: 'Agents or physical mechanisms detect the output and adjust behavior accordingly.' },
      { step: 4, title: 'Circular Reinforcement', description: 'The adjusted behavior feeds directly into the next cycle, compounding or damping the original action.' }
    ],
    whereItAppears: [
      { domain: 'Human Behavior', icon: 'UserCheck', context: 'Confidence builds success, which produces more confidence and higher risk tolerance.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Customer delight generates referrals, lowering customer acquisition cost and funding higher quality.' },
      { domain: 'Technology', icon: 'Cpu', context: 'More search queries yield better indexing data, improving search accuracy and attracting more queries.' },
      { domain: 'Nature', icon: 'Leaf', context: 'Thermoregulation: Sweating cools the skin, lowering body temperature and turning off sweat glands.' }
    ],
    realWorldExamples: [
      {
        title: 'Social Media Engagement Engine',
        domain: 'Technology',
        flow: 'Engaging Content → High Watch Time → Algorithm Boost → Wider Audience → More Creation',
        description: 'Platforms amplify content that captures watch time, creating positive feedback where creators optimize purely for the retention signal.'
      },
      {
        title: 'Amazon Flywheel',
        domain: 'Business',
        flow: 'Lower Prices → More Customer Visits → More Third-Party Sellers → Economies of Scale → Lower Prices',
        description: 'Jeff Bezos sketched this virtuous loop on a napkin: fixed costs are spread over larger transaction volume, allowing structural price cuts.'
      },
      {
        title: 'Depression / Rumination Spiral',
        domain: 'Human Behavior',
        flow: 'Low Energy → Social Withdrawal → Isolation → Lack of Novel Stimuli → Deeper Low Energy',
        description: 'Negative cognitive loops perpetuate psychological stagnation unless interrupted by a deliberate behavioral shift (e.g., physical movement).'
      }
    ],
    meters: {
      frequency: 95,
      complexity: 35,
      predictability: 82,
      impact: 94
    },
    relatedPatternIds: ['compounding', 'network-effects', 'habit-loop', 'exponential-growth', 'reflexivity'],
    spotItScenario: {
      scenario: 'A direct-to-consumer shoe brand cuts marketing spend because every buyer brings an average of 1.4 friends through word-of-mouth within 30 days.',
      question: 'Which core pattern explains why revenue continues accelerating despite zero ad spend?',
      options: [
        'Linear Market Saturation',
        'Self-Reinforcing Positive Feedback Loop',
        'Supply Bottleneck Dynamics',
        'Selection Bias'
      ],
      correctIndex: 1,
      explanation: 'Because each customer recruits >1 new customer, the output (satisfied customers) feeds back into the input (new customer acquisition), creating an amplifying loop.'
    },
    predictionScenario: {
      currentState: 'A fintech startup offers a $50 reward for both referrer and referee. Customer acquisition triples, but unit profitability turns -20%.',
      prompt: 'If the referral incentive continues unchanged, what is the most probable next structural state of the system?',
      options: [
        { label: 'Sustainable viral growth', description: 'The network will quickly reach infinite scale and self-monetize automatically.', isMostLikely: false },
        { label: 'Incentive Exploitation & Cash Burn Crunch', description: 'Fraud rings and mercenary signups will overwhelm margins before organic retention stabilizes.', isMostLikely: true },
        { label: 'Instant Organic Word-of-mouth', description: 'Incentives will seamlessly transition into product love without intervention.', isMostLikely: false }
      ],
      explanation: 'When feedback loops are driven by artificial cash subsidies rather than genuine product utility, the loop accelerates capital depletion until the subsidy ceases.',
      confidenceNotes: 'High probability unless unit economics are corrected with retention lock-ins.'
    },
    keyRule: 'Always identify whether a loop is amplifying (runaway growth/collapse) or balancing (self-correcting equilibrium).',
    earlyWarningSignal: 'Exponential acceleration in metrics without a matching increase in fundamental inputs.',
    counterAction: 'Inject circuit breakers or friction into amplifying loops to prevent explosive systemic crashes.'
  },
  {
    id: 'compounding',
    title: 'Compounding',
    shortTitle: 'Compounding',
    category: 'business',
    secondaryCategories: ['human', 'everyday', 'markets'],
    difficulty: 'beginner',
    tagline: 'Incremental gains accrue returns on previous gains.',
    definition: 'Compounding is the exponential process where returns generate their own returns over time. In the early stages, progress is nearly invisible; over long horizons, it becomes unstoppable.',
    visualType: 'compounding',
    flowSteps: ['BASE', 'INCREMENTAL GAIN', 'EXPANDED BASE', 'EXPONENTIAL SURGE'],
    howItWorks: [
      { step: 1, title: 'Consistent Addition', description: 'A tiny, recurring surplus is generated and continuously reinvested.' },
      { step: 2, title: 'The Flat Horizon', description: 'In the early cycles, growth appears purely linear and deceptively negligible.' },
      { step: 3, title: 'Inflection Point', description: 'The returns generated by accumulated gains surpass the original baseline contribution.' },
      { step: 4, title: 'Asymptotic Explosion', description: 'The curvature steepens drastically, producing massive non-linear results.' }
    ],
    whereItAppears: [
      { domain: 'Markets & Finance', icon: 'Activity', context: 'Compound interest turns modest index fund contributions into vast wealth over 30+ years.' },
      { domain: 'Human Behavior', icon: 'UserCheck', context: '1% daily learning or writing habit accumulates into domain mastery and recognized authority.' },
      { domain: 'Technology', icon: 'Cpu', context: 'Moore’s Law: Transistor density doubling every 18 months fueled the entire digital software era.' },
      { domain: 'Everyday Life', icon: 'Clock', context: 'Sleep debt or poor posture compounds silently for years until sudden physical breakdown occurs.' }
    ],
    realWorldExamples: [
      {
        title: 'Warren Buffett’s Net Worth Curve',
        domain: 'Markets',
        flow: '99% of wealth created after age 50 → Reinvesting dividends over 7 decades',
        description: 'Buffett’s edge was not just stock selection, but continuous uninterrupted holding over 70+ years.'
      },
      {
        title: 'Open Source Software Libraries',
        domain: 'Technology',
        flow: 'Reusable Code → New Frameworks Built on Top → Next Layer of Abstraction → Rapid AI Deployment',
        description: 'Modern AI runs on decades of compounding layers: Linux, C++, Python, PyTorch, and CUDA.'
      }
    ],
    meters: {
      frequency: 90,
      complexity: 25,
      predictability: 95,
      impact: 98
    },
    relatedPatternIds: ['feedback-loop', 'exponential-growth', 'habit-loop', 'network-effects'],
    spotItScenario: {
      scenario: 'A developer reads 1 research paper per week for 5 years. In year 1, colleagues see no difference. In year 5, the developer architects an entire breakthrough AI product effortlessly.',
      question: 'What dynamic explains this delayed yet overwhelming disparity in skill?',
      options: [
        'Sudden Genetic Epiphany',
        'Knowledge Compounding & Cross-Domain Lattice',
        'Mean Reversion',
        'Parkinson’s Law'
      ],
      correctIndex: 1,
      explanation: 'Knowledge compounds non-linearly: every new insight links combinatorially to previous mental models, creating an exponential lattice of understanding.'
    },
    predictionScenario: {
      currentState: 'An engineer commits to saving 15% of income with a 7% real return starting at age 22 vs starting at age 35.',
      prompt: 'At age 65, what will be the structural difference between the two outcomes?',
      options: [
        { label: 'Minor difference (~10%)', description: 'The 13-year head start will be eclipsed by higher mid-career salaries.', isMostLikely: false },
        { label: 'Over 2.5x total difference', description: 'The early capital spent over 40 years compounding, doubling multiple times.', isMostLikely: true },
        { label: 'Exact identical savings', description: 'Market cycles normalize all multi-decade participants to the exact same average.', isMostLikely: false }
      ],
      explanation: 'Compounding rewards time in the system far more than raw capital volume. The earliest dollars carry the most doubling cycles.',
      confidenceNotes: 'Mathematical certainty provided capital remains invested without catastrophic drawdown.'
    },
    keyRule: 'The greatest enemy of compounding is interruption. Avoid major unforced errors that reset the counter to zero.',
    earlyWarningSignal: 'Frustration with "lack of progress" during the early flat phase of the compounding curve.',
    counterAction: 'Measure consistency of input rather than immediate output during the first 20% of a time horizon.'
  },
  {
    id: 'network-effects',
    title: 'Network Effect',
    shortTitle: 'Network Effects',
    category: 'technology',
    secondaryCategories: ['business', 'society'],
    difficulty: 'intermediate',
    tagline: 'Every new user increases value for all existing users.',
    definition: 'A network effect occurs when a product, platform, or service becomes inherently more valuable to each participant as the total number of participants increases (Metcalfe’s Law: Value ~ N²).',
    visualType: 'network',
    flowSteps: ['USER ADOPTION', 'INCREASED LIQUIDITY/VALUE', 'ATTRACTION OF NEW USERS', 'DEFENSIVE MOAT'],
    howItWorks: [
      { step: 1, title: 'Initial Utility Barrier', description: 'The network is cold and difficult to bootstrap because standalone value is low.' },
      { step: 2, title: 'Critical Mass (Tipping Point)', description: 'Sufficient density of users produces genuine transactional liquidity or social connection.' },
      { step: 3, title: 'Gravity Well', description: 'The platform becomes the default standard; switching costs for any individual user become prohibitive.' },
      { step: 4, title: 'Monopoly / Winner-Take-Most', description: 'Competitors cannot replicate the value because value is stored in the user graph, not the codebase.' }
    ],
    whereItAppears: [
      { domain: 'Technology', icon: 'Cpu', context: 'Messaging protocols (WhatsApp, iMessage), marketplaces (Uber, Airbnb), social graphs (Instagram, X).' },
      { domain: 'Society', icon: 'Users', context: 'Language adoption: English became the global lingua franca because everyone learns what others speak.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Operating systems (Windows, Android, iOS) attracting third-party app developers.' },
      { domain: 'Markets', icon: 'Activity', context: 'Stock exchanges: Liquidity attracts liquidity; tight bid-ask spreads discourage moving elsewhere.' }
    ],
    realWorldExamples: [
      {
        title: 'Telephone & Messaging Networks',
        domain: 'Technology',
        flow: '1 phone = 0 value → 2 phones = 1 connection → 1000 phones = 499,500 connections',
        description: 'Direct 2-sided and 1-sided communication channels scale in value quadratically with nodes.'
      },
      {
        title: 'Two-Sided Marketplaces (Airbnb)',
        domain: 'Business',
        flow: 'More Hosts → More Destination Choices → More Travelers → More Booking Revenue → More Hosts',
        description: 'Cross-side network effects create high barriers to entry against copycat software.'
      }
    ],
    meters: {
      frequency: 85,
      complexity: 60,
      predictability: 88,
      impact: 96
    },
    relatedPatternIds: ['feedback-loop', 'scurve-adoption', 'threshold-effect', 'path-dependence'],
    spotItScenario: {
      scenario: 'A developer builds a messaging app with better encryption and zero ads, but 99% of friends refuse to install it because none of their family members are on it.',
      question: 'Which economic pattern is preventing the technically superior app from gaining market share?',
      options: [
        'Network Effect & High Switching Cost',
        'Predatory Pricing',
        'Second-Order Reversal',
        'Pareto Imbalance'
      ],
      correctIndex: 0,
      explanation: 'The value of a messaging tool is 90% in the network graph of contacts already present, not the isolated feature set.'
    },
    predictionScenario: {
      currentState: 'A ride-sharing platform achieves 75% local market share in Chicago, dropping driver wait times to 2 minutes while competitors average 8 minutes.',
      prompt: 'What will happen to competitor driver and rider churn over the next 12 months?',
      options: [
        { label: 'Competitors will gain share by lowering commission 2%', description: 'Price alone will overcome the liquidity gap.', isMostLikely: false },
        { label: 'Liquidity drain toward the market leader', description: 'Riders switch for speed; drivers switch for back-to-back fares, collapsing competitor liquidity.', isMostLikely: true },
        { label: 'Total market fragmentation into 10 regional apps', description: 'Local apps will evenly split the city.', isMostLikely: false }
      ],
      explanation: 'In high-velocity two-sided networks, reduced dispatch latency creates insurmountable structural efficiency.',
      confidenceNotes: 'Very high confidence in dense urban logistics networks.'
    },
    keyRule: 'To beat an incumbent with network effects, you must offer single-player utility (value on day one with zero other users).',
    earlyWarningSignal: 'User acquisition cost drops to near zero as organic peer invites surpass paid marketing.',
    counterAction: 'Bootstrap using targeted high-density sub-communities (like Facebook launching only at Harvard first).'
  },
  {
    id: 'habit-loop',
    title: 'Habit Loop',
    shortTitle: 'Habit Loop',
    category: 'human',
    secondaryCategories: ['everyday', 'society'],
    difficulty: 'beginner',
    tagline: 'Cue triggers Routine to deliver Reward, locking automatic behavior.',
    definition: 'The neurological loop at the core of all human behavior: a contextual Cue triggers an automatic Routine, which yields a Dopaminergic Reward, cementing an unconscious craving.',
    visualType: 'cycle',
    flowSteps: ['CUE / TRIGGER', 'CRAVING', 'ROUTINE / ACTION', 'VARIABLE REWARD'],
    howItWorks: [
      { step: 1, title: 'Contextual Cue', description: 'A time of day, emotional state, location, or visual notification prompts the brain to enter autopilot.' },
      { step: 2, title: 'Anticipatory Craving', description: 'Dopamine spikes in anticipation of the upcoming relief or pleasure, not during the reward itself.' },
      { step: 3, title: 'Frictionless Routine', description: 'The physical, mental, or emotional behavior is executed with minimal cognitive friction.' },
      { step: 4, title: 'Neurochemical Reward', description: 'The reward satisfies the craving and signals the basal ganglia to etch this pathway deeper.' }
    ],
    whereItAppears: [
      { domain: 'Human Behavior', icon: 'UserCheck', context: 'Checking your phone automatically whenever feeling 5 seconds of boredom in an elevator.' },
      { domain: 'Everyday Life', icon: 'Clock', context: 'Morning coffee ritual: Smell of roasted beans (cue) → Brewing cup (routine) → Alertness & warmth (reward).' },
      { domain: 'Technology', icon: 'Cpu', context: 'App push notifications designed as variable reward slot-machines (likes, comments, red badges).' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Subscription retention: Products that become daily rituals experience near-zero user churn.' }
    ],
    realWorldExamples: [
      {
        title: 'Smartphone Notification Check',
        domain: 'Human Behavior',
        flow: 'Boredom / Buzz → Dopamine surge → Unlock & Scroll feed → Intermittent novel post',
        description: 'B.F. Skinner’s variable ratio schedule ensures maximal resistance to extinction.'
      },
      {
        title: 'Teeth Brushing (Pepsodent)',
        domain: 'Everyday Life',
        flow: 'Tooth film feeling → Brushing with mint paste → Tingling clean sensation',
        description: 'Claude Hopkins introduced the tingling citric acid sensation to create an unmistakable physical reward.'
      }
    ],
    meters: {
      frequency: 98,
      complexity: 30,
      predictability: 85,
      impact: 90
    },
    relatedPatternIds: ['feedback-loop', 'compounding', 'incentive-loop', 'second-order-effects'],
    spotItScenario: {
      scenario: 'Every time an executive feels anxious about an upcoming presentation, they instinctively open an email inbox to organize folders instead of rehearsing.',
      question: 'What is the role of email organization in this psychological habit loop?',
      options: [
        'The Cue',
        'The Avoidance Routine providing temporary relief from anxiety',
        'The Long-term Reward',
        'A Random Glitch'
      ],
      correctIndex: 1,
      explanation: 'The routine serves as a cognitive escape valve that provides the reward of temporary pseudo-control over anxiety.'
    },
    predictionScenario: {
      currentState: 'A person attempts to break a 10-year evening junk food habit solely through sheer willpower while keeping potato chips on the kitchen counter.',
      prompt: 'What will happen within 14 days under standard cognitive fatigue?',
      options: [
        { label: 'Complete permanent behavioral transformation', description: 'Willpower will strengthen linearly each day.', isMostLikely: false },
        { label: 'Relapse triggered by friction depletion', description: 'The persistent visual cue combined with evening ego-depletion will trigger the automatic routine.', isMostLikely: true },
        { label: 'Immediate loss of hunger instinct', description: 'The brain will erase all previous dopamine pathways.', isMostLikely: false }
      ],
      explanation: 'Willpower is an exhaustible resource; habits reside in the basal ganglia and activate automatically when cues remain present.',
      confidenceNotes: 'High certainty in behavioral neuroscience.'
    },
    keyRule: 'You cannot eliminate a habit; you can only swap the routine while keeping the cue and reward intact.',
    earlyWarningSignal: 'Finding yourself performing an action without conscious decision or recollection of starting it.',
    counterAction: 'Design the environment to remove cues for bad habits and drastically lower friction for good routines.'
  },
  {
    id: 'pareto-principle',
    title: '80/20 (Pareto Principle)',
    shortTitle: '80/20 Rule',
    category: 'business',
    secondaryCategories: ['everyday', 'society', 'markets'],
    difficulty: 'beginner',
    tagline: '80% of consequences come from 20% of the causes.',
    definition: 'The Pareto Principle describes power-law distributions in natural and human systems: a minority of inputs (roughly 20%) generates the vast majority of outcomes (roughly 80%).',
    visualType: 'pareto',
    flowSteps: ['ASYMMETRIC INPUTS', 'POWER LAW CONCENTRATION', 'OUTSIZED IMPACT', 'TAIL DRIVER'],
    howItWorks: [
      { step: 1, title: 'Non-Linear Effort Distribution', description: 'Not all actions, customers, bugs, or assets contribute equally to systemic output.' },
      { step: 2, title: 'Preferential Attachment', description: 'Small initial advantages compound until a tiny subset commands overwhelming dominance.' },
      { step: 3, title: 'Heavy Tail Emergence', description: 'A fat-tailed distribution forms where the average metric is completely unrepresentative.' },
      { step: 4, title: 'Optimization Focus', description: 'Pruning or doubling down on the vital few produces massive disproportionate leverage.' }
    ],
    whereItAppears: [
      { domain: 'Business', icon: 'TrendingUp', context: '80% of company revenue often stems from 20% of enterprise clients or top products.' },
      { domain: 'Technology', icon: 'Cpu', context: 'Microsoft noted that fixing the top 20% of reported bugs eliminated 80% of Windows crashes.' },
      { domain: 'Everyday Life', icon: 'Clock', context: 'You wear 20% of your wardrobe 80% of the time, and spend 80% of time with 20% of your friends.' },
      { domain: 'Society', icon: 'Users', context: 'Language: The 1,000 most common English words account for ~85% of all daily written text.' }
    ],
    realWorldExamples: [
      {
        title: 'Venture Capital Returns (Power Law)',
        domain: 'Markets',
        flow: '1-2 breakout investments in a fund of 30 return more capital than all other 28 combined.',
        description: 'Venture funds thrive not on hit-rates (getting 70% right), but on the magnitude of the right tail.'
      },
      {
        title: 'Software Codebase Performance Bottlenecks',
        domain: 'Technology',
        flow: '80% of CPU cycles spent executing 20% of inner loops',
        description: 'Optimizing non-critical routines yields zero noticeable speedup; profiling the critical loop transforms latency.'
      }
    ],
    meters: {
      frequency: 94,
      complexity: 20,
      predictability: 89,
      impact: 92
    },
    relatedPatternIds: ['compounding', 'bottleneck', 'selection-effect', 'second-order-effects'],
    spotItScenario: {
      scenario: 'A SaaS support team of 10 people spends 75% of their weekly time fielding tickets caused by a single ambiguous checkout button error.',
      question: 'Which pattern explains why redesigning that one button will drastically liberate support capacity?',
      options: [
        'The 80/20 Principle (Asymmetric Leverage)',
        'S-Curve Saturation',
        'Minsky Instability',
        'Reflexivity'
      ],
      correctIndex: 0,
      explanation: 'A single concentrated root cause is generating the lion’s share of operational friction.'
    },
    predictionScenario: {
      currentState: 'An e-commerce store with 500 SKUs notices that 12 products generate 78% of profits, while 200 products have negative margins after storage costs.',
      prompt: 'If management liquidates the bottom 200 products and reallocates inventory capital to the top 12, what is the expected outcome?',
      options: [
        { label: 'Immediate company bankruptcy', description: 'Customers will flee because store variety dropped.', isMostLikely: false },
        { label: 'Surge in operating margin and working capital speed', description: 'Warehousing overhead drops while stock-out rates on top sellers decrease.', isMostLikely: true },
        { label: 'Zero measurable change', description: 'All products contribute equally to overhead.', isMostLikely: false }
      ],
      explanation: 'Eliminating the long unprofitable tail frees working capital and management bandwidth for the high-yield core.',
      confidenceNotes: 'High probability across retail and logistics.'
    },
    keyRule: 'Always ask: "Which 20% of activities are responsible for 80% of the value?" ruthlessly eliminate the rest.',
    earlyWarningSignal: 'Treating all tasks, clients, or inputs with equal priority, leading to diffuse exhaustion.',
    counterAction: 'Conduct periodic Pareto Audits on time, revenue, bugs, and customer support tickets.'
  },
  {
    id: 'growth-peak-decline',
    title: 'Growth → Peak → Decline',
    shortTitle: 'Lifecycle Arc',
    category: 'business',
    secondaryCategories: ['history', 'nature', 'technology'],
    difficulty: 'intermediate',
    tagline: 'Systems rise, exhaust their drivers, plateau, and contract.',
    definition: 'Every finite system undergoes an organic lifecycle arc: an accelerating emergence phase, a resource-constrained saturation peak, and an inevitable stagnation or decline unless renewed by systemic mutation.',
    visualType: 'scurve',
    flowSteps: ['EMERGENCE', 'RAPID EXPANSION', 'SATURATION PEAK', 'EXHAUSTION & DECLINE'],
    howItWorks: [
      { step: 1, title: 'Exploitation of New Frontier', description: 'Abundant untapped resources, new tech, or market vacancies enable frictionless growth.' },
      { step: 2, title: 'Diminishing Returns', description: 'As the frontier saturates, customer acquisition cost climbs and complexity overhead mounts.' },
      { step: 3, title: 'The Rigid Peak', description: 'Incumbents optimize for historical cash flows rather than disruptive shifts; bureaucracy ossifies.' },
      { step: 4, title: 'Disruption or Decay', description: 'A more agile paradigm emerges, draining the legacy system into obsolescence.' }
    ],
    whereItAppears: [
      { domain: 'Business', icon: 'TrendingUp', context: 'Product lifecycles: From CD players to MP3s to streaming music subscriptions.' },
      { domain: 'History', icon: 'Hourglass', context: 'Empires expanding, facing imperial overstretch, bureaucratic sclerosis, and structural collapse.' },
      { domain: 'Nature', icon: 'Leaf', context: 'Hubbert’s Peak Oil or forestry extraction: Initial high yields taper as easy reserves diminish.' },
      { domain: 'Technology', icon: 'Cpu', context: 'Legacy social networks losing youth demographic as feeds become overrun with ads and parents.' }
    ],
    realWorldExamples: [
      {
        title: 'Blockbuster vs Netflix',
        domain: 'Business',
        flow: '9,000 retail stores (Peak) → Late-fee dependency → Digital streaming emergence → Liquidation (2010)',
        description: 'Blockbuster maximized the peak of physical video rental while ignoring the nascent digital S-curve.'
      },
      {
        title: 'The Roman Empire Expansion Arc',
        domain: 'History',
        flow: 'Conquest wealth → Military overstretch → Debased currency → Barbarian division',
        description: 'The mechanism that fueled expansion (conquest loot) became too expensive to defend across thousands of miles.'
      }
    ],
    meters: {
      frequency: 91,
      complexity: 65,
      predictability: 78,
      impact: 95
    },
    relatedPatternIds: ['scurve-adoption', 'boom-bubble-crash', 'cycles', 'adaptation'],
    spotItScenario: {
      scenario: 'A consumer tech company increases marketing budgets by 40% year-over-year but unit sales only rise 2%, while customer support complaints increase tenfold.',
      question: 'Which phase of the systemic lifecycle does this company currently occupy?',
      options: [
        'Early Genesis Stage',
        'Late Saturation / Plateau Phase',
        'Exponential Takeoff Stage',
        'Pre-market Validation'
      ],
      correctIndex: 1,
      explanation: 'Escalating inputs yielding microscopic outputs is the classic diagnostic signature of a late saturation plateau.'
    },
    predictionScenario: {
      currentState: 'A legacy smartphone OEM captures 60% gross profit on hardware but invests 0% in AI operating systems while competitors launch generative voice interfaces.',
      prompt: 'What will happen to the OEM’s flagship market share over a 4-year horizon?',
      options: [
        { label: 'Unchallenged dominance due to legacy brand recognition', description: 'Consumers will never value AI software over metal casings.', isMostLikely: false },
        { label: 'Rapid decline via platform paradigm shift', description: 'Like Nokia facing the capacitive touchscreen in 2007, hardware margins evaporate when platform utility shifts.', isMostLikely: true },
        { label: 'Immediate 500% sales expansion', description: 'Stagnant products always attract premium luxury buyers.', isMostLikely: false }
      ],
      explanation: 'When a platform shift occurs, optimization of the prior paradigm cannot prevent systemic obsolescence.',
      confidenceNotes: 'High probability verified across historical industrial transitions.'
    },
    keyRule: 'To escape decline, an organization must cannibalize its own cash cow before a competitor does.',
    earlyWarningSignal: 'Customer acquisition cost begins rising faster than customer lifetime value.',
    counterAction: 'Build an internal "Skunkworks" division tasked with disrupting your own core product.'
  },
  {
    id: 'boom-bubble-crash',
    title: 'Boom → Bubble → Crash',
    shortTitle: 'Bubble Dynamics',
    category: 'markets',
    secondaryCategories: ['human', 'society', 'history'],
    difficulty: 'intermediate',
    tagline: 'Displacement breeds euphoria, leverage inflates, panic deflates.',
    definition: 'Hyman Minsky’s Financial Instability Hypothesis: Stability breeds instability. A genuine technological or economic displacement attracts speculative leverage; price detaches from reality until a liquidity shock triggers a cascade of forced selling.',
    visualType: 'bubble',
    flowSteps: ['DISPLACEMENT', 'BOOM & CREDIT EXPANSION', 'EUPHORIA', 'PROFIT-TAKING', 'PANIC & LIQUIDATION'],
    howItWorks: [
      { step: 1, title: 'Displacement', description: 'A new technology, policy change, or cheap credit creates genuine new economic potential.' },
      { step: 2, title: 'Credit Expansion & FOMO', description: 'Early investors make outsized gains; mainstream media enters; leverage multiplies.' },
      { step: 3, title: 'Euphoria ("New Paradigm")', description: 'Valuation metrics are discarded; participants claim "this time is different" and fundamentals no longer matter.' },
      { step: 4, title: 'The Minsky Moment', description: 'A minor rate hike or fraud unmasks overleveraged debt; sellers find zero bids, creating vertical liquidation.' }
    ],
    whereItAppears: [
      { domain: 'Markets & Finance', icon: 'Activity', context: '1637 Tulip Mania, 1720 South Sea Bubble, 2000 Dot-com crash, 2008 Subprime housing collapse.' },
      { domain: 'Society', icon: 'Users', context: 'Social hype cycles around celebrity tokens, meme stocks, or speculative real estate developments.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Venture funding super-cycles: over-hiring at high valuations followed by mass layoffs.' },
      { domain: 'Human Behavior', icon: 'UserCheck', context: 'Fear of Missing Out (FOMO) turning conservative savers into reckless gamblers.' }
    ],
    realWorldExamples: [
      {
        title: 'The Dot-Com Crash (1999–2002)',
        domain: 'Markets',
        flow: 'Internet promise → Eyeball valuations → Pets.com Superbowl ads → NASDAQ falls 78%',
        description: 'The Internet did revolutionize society, but 90% of overvalued equity was wiped out before true utility matured.'
      },
      {
        title: 'The 2008 Global Financial Crisis',
        domain: 'Markets',
        flow: 'Subprime mortgage packaging → AAA credit ratings → Housing price stalls → Lehman Brothers collapses',
        description: 'Leverage magnified an 8% mortgage default rate into a multi-trillion-dollar global banking freeze.'
      }
    ],
    meters: {
      frequency: 72,
      complexity: 75,
      predictability: 68,
      impact: 99
    },
    relatedPatternIds: ['feedback-loop', 'reflexivity', 'trend-reversal', 'second-order-effects'],
    spotItScenario: {
      scenario: 'Taxi drivers and dental hygienists are quitting their jobs to day-trade digital assets using borrowed margin, while financial magazines declare traditional valuation formulas obsolete.',
      question: 'Which phase of the Minsky bubble cycle does this behavior characterize?',
      options: [
        'Early Quiet Accumulation',
        'Euphoria / Climax Top',
        'Distress Liquidation Phase',
        'Depression Bottom'
      ],
      correctIndex: 1,
      explanation: 'Mainstream non-professional participation driven by leverage and rejection of fundamental math marks peak euphoria.'
    },
    predictionScenario: {
      currentState: 'Real estate prices in a coastal city rise 35% annually for 4 straight years. Buyers take interest-only adjustable rate loans expecting infinite appreciation.',
      prompt: 'If the central bank raises base interest rates by 250 basis points to fight inflation, what will occur?',
      options: [
        { label: 'Prices will accelerate to 50% gains', description: 'Higher rates always stimulate borrowing.', isMostLikely: false },
        { label: 'Mortgage affordability freezes, causing inventory surge and price correction', description: 'Adjustable payments reset higher while buyer purchasing power collapses, causing forced sales.', isMostLikely: true },
        { label: 'Zero correlation with real estate', description: 'Housing exists in a vacuum separate from monetary policy.', isMostLikely: false }
      ],
      explanation: 'Asset valuations are the capitalized value of future cash flows discounted by interest rates; debt-dependent assets repriced downward instantly.',
      confidenceNotes: 'High macroeconomic certainty.'
    },
    keyRule: 'What the wise man does in the beginning, the fool does in the end.',
    earlyWarningSignal: 'Universal consensus that prices can only go up, accompanied by contempt for skeptics.',
    counterAction: 'De-leverage, raise cash buffers, and resist emotional FOMO when public euphoria peaks.'
  },
  {
    id: 'viral-spread',
    title: 'Viral Spread',
    shortTitle: 'Viral Transmission',
    category: 'technology',
    secondaryCategories: ['nature', 'society', 'business'],
    difficulty: 'intermediate',
    tagline: 'Transmission coefficient R > 1 produces explosive propagation.',
    definition: 'Viral spread describes cascade dynamics where an infected node transmits a virus, meme, or product to more than one subsequent node (R > 1.0), sparking exponential geometric transmission until susceptibility is exhausted.',
    visualType: 'viral',
    flowSteps: ['SEED VECTOR', 'TRANSMISSION (R > 1)', 'EPIDEMIC CASCADE', 'HERD SATURATION'],
    howItWorks: [
      { step: 1, title: 'Infection Vector & Low Friction', description: 'A message or pathogen requires high transmissibility and minimal host friction.' },
      { step: 2, title: 'The Reproduction Rate (R₀)', description: 'If each host infects on average R > 1.0 hosts, the curve bends vertically.' },
      { step: 3, title: 'Super-Spreader Nodes', description: 'Highly connected hubs in the graph amplify the cascade by orders of magnitude.' },
      { step: 4, title: 'Burnout / Immunity Wall', description: 'As susceptible targets dwindle, R drops below 1.0, and the cascade collapses as fast as it grew.' }
    ],
    whereItAppears: [
      { domain: 'Nature & Biology', icon: 'Leaf', context: 'Pathogens spreading through dense urban populations (Influenza, COVID-19).' },
      { domain: 'Society', icon: 'Users', context: 'Internet memes, social challenges, and rumor cascades across TikTok and WhatsApp.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Hotmail adding "Get your free email at Hotmail" footer to every outbound email.' },
      { domain: 'Technology', icon: 'Cpu', context: 'P2P file sharing, viral waitlists (Robinhood, Clubhouse), and viral invite loops.' }
    ],
    realWorldExamples: [
      {
        title: 'Dropbox Referral Engine',
        domain: 'Technology',
        flow: 'User invites friend → Both get 500MB free cloud storage → 3900% growth in 15 months',
        description: 'Direct bilateral incentives reduced friction and turned every active user into a viral distributor.'
      },
      {
        title: 'Memetic Cultural Transmission (Gangnam Style)',
        domain: 'Society',
        flow: 'Visual absurdity + catchy rhythm → Peer-to-peer sharing → 1 Billion YouTube views in 150 days',
        description: 'High emotional valence and zero language barrier enabled borderless memetic contagion.'
      }
    ],
    meters: {
      frequency: 78,
      complexity: 45,
      predictability: 70,
      impact: 93
    },
    relatedPatternIds: ['exponential-growth', 'network-effects', 'feedback-loop', 'threshold-effect'],
    spotItScenario: {
      scenario: 'A mobile game generates 10,000 downloads in week 1. Every user sends an average of 4 gameplay clips to friends, converting 1.3 new players per user.',
      question: 'Why will this game see explosive parabolic growth next month?',
      options: [
        'Its Reproduction Number R is 1.3 (> 1.0)',
        'It has a high barrier to entry',
        'It relies on print advertising',
        'It follows a linear trajectory'
      ],
      correctIndex: 0,
      explanation: 'When the viral coefficient K (or R₀) exceeds 1.0, each cohort creates a larger subsequent cohort.'
    },
    predictionScenario: {
      currentState: 'A video meme achieves R=3.5 on Monday. By Friday, 80% of active internet users have viewed it multiple times.',
      prompt: 'What will happen to the daily new view count over the weekend?',
      options: [
        { label: 'It will continue doubling every 12 hours forever', description: 'Memes have infinite addressable audience.', isMostLikely: false },
        { label: 'Sharp steep dropoff due to audience saturation', description: 'With few unexposed susceptible hosts left, R collapses below 0.2.', isMostLikely: true },
        { label: 'Steady linear increase for 10 years', description: 'Viral content never dies.', isMostLikely: false }
      ],
      explanation: 'Viral peaks are steep on both sides: once the susceptible population is saturated, velocity drops precipitously.',
      confidenceNotes: 'Standard SIR epidemiological dynamic.'
    },
    keyRule: 'To maximize virality, increase the payload value, reduce sharing friction, and target hyper-connected graph hubs.',
    earlyWarningSignal: 'Organic inbound traffic doubling with zero proportional marketing spend.',
    counterAction: 'In biological or rumor contexts, isolate hubs and cut transmission vectors early.'
  },
  {
    id: 'adaptation',
    title: 'Adaptation & Co-Evolution',
    shortTitle: 'Adaptation',
    category: 'nature',
    secondaryCategories: ['business', 'technology', 'human'],
    difficulty: 'advanced',
    tagline: 'Entities mutate in response to competitor pressure (Red Queen Effect).',
    definition: 'In dynamic competitive ecosystems, an entity must constantly adapt, mutate, and evolve simply to maintain its relative standing against co-evolving rivals ("Now, here, you see, it takes all the running you can do, to keep in the same place").',
    visualType: 'adaptation',
    flowSteps: ['ENVIRONMENTAL SHIFT', 'SELECTIVE PRESSURE', 'MUTATION / INNOVATION', 'NEW EQUILIBRIUM'],
    howItWorks: [
      { step: 1, title: 'Selective Pressure', description: 'Scarcity, predators, algorithmic changes, or rivals threaten the organism or business.' },
      { step: 2, title: 'Variation & Experimentation', description: 'Multiple variants, strategies, or phenotypes are tested against the environment.' },
      { step: 3, title: 'Survival of the Fittest Fit', description: 'The variant best matching current environmental constraints thrives and replicates.' },
      { step: 4, title: 'Reciprocal Adaptation', description: 'The rival or environment mutates in response, restarting the perpetual arms race.' }
    ],
    whereItAppears: [
      { domain: 'Nature & Biology', icon: 'Leaf', context: 'Antibiotic resistance: Overprescribing penicillin selects for mutant superbugs.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'E-commerce SEO: Google changes search algorithms; marketers adapt techniques; Google refines AI filters.' },
      { domain: 'Technology', icon: 'Cpu', context: 'Cybersecurity: Hackers invent ransomware variants; security teams deploy heuristic EDR models.' },
      { domain: 'Human Behavior', icon: 'UserCheck', context: 'Hedonic Adaptation: Winning the lottery boosts happiness for 6 months before baseline returns.' }
    ],
    realWorldExamples: [
      {
        title: 'Bacteria vs Antibiotics Arms Race',
        domain: 'Nature',
        flow: 'Broad Antibiotic use → 99.9% killed → 0.1% resistant survive → Resistant strain dominates',
        description: 'Darwinian natural selection operating in real time under heavy chemical pressure.'
      },
      {
        title: 'Ad-Blockers vs Media Publishers',
        domain: 'Technology',
        flow: 'Popups → Adblock extension created → Anti-adblock scripts deployed → Server-side ad injection',
        description: 'Neither side wins permanently; the system enters an ongoing dynamic evolutionary loop.'
      }
    ],
    meters: {
      frequency: 92,
      complexity: 80,
      predictability: 60,
      impact: 89
    },
    relatedPatternIds: ['feedback-loop', 'emergence', 'second-order-effects', 'cycles'],
    spotItScenario: {
      scenario: 'A video game developer nerfs a powerful sniper rifle. Within 48 hours, players discover an overlooked shotgun combination that dominates matches even harder.',
      question: 'What dynamic explains this endless shifting of gameplay strategies?',
      options: [
        'The Red Queen Adaptation / Meta-game Shift',
        'Parkinson’s Law',
        'Compounding Interest',
        'Network Liquidity Trap'
      ],
      correctIndex: 0,
      explanation: 'Participants optimize around new system constraints, generating a new adaptive equilibrium.'
    },
    predictionScenario: {
      currentState: 'A central bank introduces a harsh cash transaction limit to stop money laundering.',
      prompt: 'How will sophisticated illicit networks adapt over the next 18 months?',
      options: [
        { label: 'They will completely dissolve and commit zero crimes', description: 'Regulation always eliminates all illicit incentives.', isMostLikely: false },
        { label: 'They will migrate to privacy crypto protocols, barter, and shell trade invoices', description: 'Adaptive agents route around regulatory choke points into harder-to-monitor vectors.', isMostLikely: true },
        { label: 'They will ask the government for legal permission', description: 'Illicit groups always surrender to paperwork.', isMostLikely: false }
      ],
      explanation: 'Regulation applies selective pressure, forcing illicit systems to evolve into more sophisticated, decentralized forms.',
      confidenceNotes: 'High certainty across historical regulatory clampdowns.'
    },
    keyRule: 'In competitive domains, standing still is equivalent to moving backward at high speed.',
    earlyWarningSignal: 'A previously dominant strategy slowly yielding smaller and smaller marginal advantages.',
    counterAction: 'Cultivate decentralized rapid experimentation to adapt faster than external market shocks.'
  },
  {
    id: 'second-order-effects',
    title: 'Second-Order Effects',
    shortTitle: 'Second-Order Effects',
    category: 'society',
    secondaryCategories: ['business', 'human', 'history'],
    difficulty: 'advanced',
    tagline: 'First-order intention produces unintended second- and third-order consequences.',
    definition: 'Every action creates immediate, obvious results (first-order) and delayed, complex systemic reactions (second- and third-order). Good first-order decisions often produce catastrophic second-order disasters (and vice versa).',
    visualType: 'second_order',
    flowSteps: ['PRIMARY ACTION', 'FIRST-ORDER INTENDED RESULT', 'FEEDBACK REACTION', 'SECOND-ORDER UNINTENDED CRISIS'],
    howItWorks: [
      { step: 1, title: 'Surface Problem & Quick Fix', description: 'A decision-maker targets an immediate symptom with a direct linear intervention.' },
      { step: 2, title: 'Immediate First-Order Success', description: 'The symptom temporarily subsides, creating the illusion of competence.' },
      { step: 3, title: 'Behavioral Counter-Adjustment', description: 'Humans or natural agents modify incentives in response to the new rule.' },
      { step: 4, title: 'Secondary Blowback', description: 'The delayed consequence emerges, frequently worsening the original problem.' }
    ],
    whereItAppears: [
      { domain: 'History', icon: 'Hourglass', context: 'The British Raj Delhi Cobra bounty: paying citizens for dead cobras led people to breed cobras for income.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Rewarding software engineers by lines of code written leads to bloated, buggy, unmaintainable code.' },
      { domain: 'Society', icon: 'Users', context: 'Rent control policies intended to make housing affordable causing builders to halt construction, spiking shortages.' },
      { domain: 'Everyday Life', icon: 'Clock', context: 'Drinking 5 energy drinks to meet a deadline leads to sleep disruption, cognitive crash, and lost week.' }
    ],
    realWorldExamples: [
      {
        title: 'The Cobra Effect (British Delhi)',
        domain: 'History',
        flow: 'Bounty on snakes → Entrepreneurs breed snakes → Bounty canceled → Breeders release snakes → More snakes',
        description: 'The archetype of perverse incentives where the cure multiplies the disease.'
      },
      {
        title: 'Antibiotic Overuse in Livestock',
        domain: 'Nature',
        flow: 'Cheap meat growth → Mass feed antibiotics → Drug-resistant superbugs → Threat to human medicine',
        description: 'Optimizing for short-term farm efficiency undermined global health infrastructure.'
      }
    ],
    meters: {
      frequency: 96,
      complexity: 85,
      predictability: 65,
      impact: 95
    },
    relatedPatternIds: ['incentive-loop', 'feedback-loop', 'adaptation', 'reflexivity'],
    spotItScenario: {
      scenario: 'A city bans plastic grocery bags. Consumers switch to heavy cotton tote bags, but need to reuse each cotton bag 7,100 times to equal the carbon footprint of one plastic bag.',
      question: 'Which thinking fallacy caused this counter-productive environmental outcome?',
      options: [
        'Ignoring Second-Order Life Cycle Effects',
        'The S-Curve Dynamic',
        'Metcalfe’s Network Law',
        'Mean Reversion'
      ],
      correctIndex: 0,
      explanation: 'First-order thinking focused on visible street litter; second-order analysis reveals massive water/energy inputs for cotton production.'
    },
    predictionScenario: {
      currentState: 'A manager mandates that customer support reps must resolve every phone call in under 3 minutes or face pay penalties.',
      prompt: 'What will happen to customer satisfaction ratings within 60 days?',
      options: [
        { label: 'Customer satisfaction will hit 100% all-time highs', description: 'Speed is the only metric customers care about.', isMostLikely: false },
        { label: 'Reps will hang up on difficult customers, driving churn and rage', description: 'When measured on speed, reps optimize for call termination rather than real problem resolution.', isMostLikely: true },
        { label: 'Product quality will automatically improve', description: 'Phone calls directly fix software bugs.', isMostLikely: false }
      ],
      explanation: 'Goodhart’s Law and Second-Order effects: When a measure becomes a target, people game the measure at the expense of the real objective.',
      confidenceNotes: 'High certainty in organizational psychology.'
    },
    keyRule: 'Always ask the critical question: "And then what?" before approving any major policy.',
    earlyWarningSignal: 'A proposed policy that claims to solve a complex issue with zero tradeoffs.',
    counterAction: 'Run pre-mortems to brainstorm how clever participants will game the new incentives.'
  },
  {
    id: 'scurve-adoption',
    title: 'S-Curve Adoption',
    shortTitle: 'S-Curve Adoption',
    category: 'technology',
    secondaryCategories: ['business', 'society'],
    difficulty: 'intermediate',
    tagline: 'Slow infancy, explosive inflection, asymptotic saturation.',
    definition: 'Everett Rogers’ Diffusion of Innovations: New technologies, ideas, and organisms spread along a sigmoid (S-shaped) curve—struggling through slow early experimentation, hitting an exponential takeoff tipping point, and flattening as saturation approaches.',
    visualType: 'scurve',
    flowSteps: ['INNOVATORS & EARLY ADOPTERS', 'CHASM CROSSING', 'EXPONENTIAL MAINSTREAM INVASION', 'MATURE MARKET SATURATION'],
    howItWorks: [
      { step: 1, title: 'The Slow Gestation (0–15%)', description: 'Tech is expensive, unreliable, and limited to hardcore enthusiasts.' },
      { step: 2, title: 'Crossing the Chasm', description: 'Price drops, usability simplifies, and early majority adoption begins.' },
      { step: 3, title: 'Parabolic Expansion (15–80%)', description: 'Mainstream adoption accelerates; infrastructure expands to support universal usage.' },
      { step: 4, title: 'Asymptotic Ceiling (80–100%)', description: 'Growth slows to baseline population replacement; market shifts to replacement cycles.' }
    ],
    whereItAppears: [
      { domain: 'Technology', icon: 'Cpu', context: 'Electrification, color TV, smartphones, broadband internet, electric vehicles, AI adoption.' },
      { domain: 'Society', icon: 'Users', context: 'Social movements, language slang adoption, fashion trends propagating from subcultures.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'SaaS product market penetration: from tech nerds to enterprise IT departments.' },
      { domain: 'Nature', icon: 'Leaf', context: 'Yeast fermentation in a closed wine barrel: rapid bacterial replication until sugar is consumed.' }
    ],
    realWorldExamples: [
      {
        title: 'Smartphone Global Penetration (2007–2020)',
        domain: 'Technology',
        flow: 'iPhone launch (2007) → $200 Androids → 4 Billion users → Market saturation',
        description: 'From 5% niche toy to 85% universal human utility within 13 years.'
      },
      {
        title: 'Solar Photovoltaic Cost & Deployment',
        domain: 'Business',
        flow: 'Swanson’s Law: Every doubling of cumulative solar shipments lowers solar module cost by 20%.',
        description: 'Decades of slow adoption led to the dramatic inflection where solar became cheaper than coal.'
      }
    ],
    meters: {
      frequency: 93,
      complexity: 50,
      predictability: 88,
      impact: 97
    },
    relatedPatternIds: ['growth-peak-decline', 'network-effects', 'threshold-effect', 'compounding'],
    spotItScenario: {
      scenario: 'Electric cars took 12 years to reach 3% market share in a country. Over the next 3 years, share surges from 3% to 22%.',
      question: 'What mathematical trajectory is the automotive sector undergoing?',
      options: [
        'Linear Incrementalism',
        'Sigmoid S-Curve Mainstream Inflection',
        'Random Brownian Motion',
        'Negative Feedback Damping'
      ],
      correctIndex: 1,
      explanation: 'Crossing the 5% threshold typically triggers charging infrastructure network effects and manufacturing economies of scale, entering the steep S-curve slope.'
    },
    predictionScenario: {
      currentState: 'A smartphone maker’s market reaches 92% adult smartphone ownership in Western Europe.',
      prompt: 'Can the company sustain 25% annual unit shipment growth in that region?',
      options: [
        { label: 'Yes, by advertising more on social media', description: 'Demand is infinite if marketing is good.', isMostLikely: false },
        { label: 'No, growth will match replacement cycles (~1-3%)', description: 'At the top of the S-curve, new user acquisition hits the ceiling of the total addressable population.', isMostLikely: true },
        { label: 'Sales will immediately drop to zero forever', description: 'All electronics self-destruct at 90% saturation.', isMostLikely: false }
      ],
      explanation: 'S-curve tops require pivoting from customer acquisition to monetization of existing installed base (services/subscriptions).',
      confidenceNotes: 'Mathematically bounded by demographic ceiling.'
    },
    keyRule: 'Never evaluate an early-stage exponential technology using current linear snapshots.',
    earlyWarningSignal: 'A technology surpassing 5-10% market share while unit costs drop below legacy alternatives.',
    counterAction: 'Jump to the next emerging S-curve before your current one enters the saturation plateau.'
  },
  {
    id: 'exponential-growth',
    title: 'Exponential Growth',
    shortTitle: 'Exponential Growth',
    category: 'technology',
    secondaryCategories: ['nature', 'markets', 'business'],
    difficulty: 'beginner',
    tagline: 'Quantity increases at a rate proportional to its current value.',
    definition: 'Unlike linear growth (1, 2, 3, 4) which adds a constant amount, exponential growth (1, 2, 4, 8, 16, 32) multiplies by a constant factor per time period, consistently fooling human linear intuition.',
    visualType: 'compounding',
    flowSteps: ['CONSTANT MULTIPLIER', 'DECEPTIVE LINEAR APPEARANCE', 'THE ELBOW BEND', 'VERTICAL ASYMPTOTE'],
    howItWorks: [
      { step: 1, title: 'Fixed Doubling Time', description: 'The metric doubles every fixed interval of time (e.g., every 18 months, or every 3 days).' },
      { step: 2, title: 'Deceptive Flatness', description: 'At 0.1%, doubling to 0.2% and 0.4% appears utterly negligible.' },
      { step: 3, title: 'The Sudden Explosion', description: 'When reaching 50%, a single doubling consumes the entire remaining 50% capacity.' },
      { step: 4, title: 'Physical Limit Crash', description: 'Unconstrained exponential growth inevitably collides with external environmental ceilings.' }
    ],
    whereItAppears: [
      { domain: 'Technology', icon: 'Cpu', context: 'Compute capacity used in training frontier AI models doubling every 3-4 months.' },
      { domain: 'Nature & Biology', icon: 'Leaf', context: 'Lily pad on a pond doubling every day: on day 29 the pond is half full; on day 30 it is completely covered.' },
      { domain: 'Markets', icon: 'Activity', context: 'Weimar Germany / Zimbabwe hyperinflation: prices doubling every few hours.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'SaaS recurring revenue scaling under negative churn.' }
    ],
    realWorldExamples: [
      {
        title: 'Lily Pad Riddle',
        domain: 'Nature',
        flow: 'Day 1: 1 pad → Day 28: 25% pond → Day 29: 50% pond → Day 30: 100% full',
        description: 'Illustrates how exponential systems appear empty and unthreatening right until the moment of total overflow.'
      },
      {
        title: 'Moore’s Law in Microprocessors',
        domain: 'Technology',
        flow: '1971: 2,300 transistors (Intel 4004) → 2024: 200,000,000,000 transistors (NVIDIA Blackwell)',
        description: 'Continuous geometric scaling transformed supercomputers into pocket-sized devices.'
      }
    ],
    meters: {
      frequency: 88,
      complexity: 35,
      predictability: 90,
      impact: 98
    },
    relatedPatternIds: ['compounding', 'viral-spread', 'scurve-adoption', 'threshold-effect'],
    spotItScenario: {
      scenario: 'A server farm’s power consumption grows at 40% every quarter. In Q1 it uses 1% of the local city grid. In Q5 it uses 5.3% of the grid.',
      question: 'In which quarter will the server farm exceed 100% of the city’s power grid capacity if unconstrained?',
      options: [
        'Around Q12-Q13',
        'In year 2095',
        'Never, power cannot scale',
        'In Q50'
      ],
      correctIndex: 0,
      explanation: 'At a 40% quarterly growth rate (1.4x), 5.3% multiplied by 1.4^9 ≈ 110% by Q14.'
    },
    predictionScenario: {
      currentState: 'A bank’s customer deposits double every year while credit risk reserves only grow 5% linearly.',
      prompt: 'If a 10% liquidity withdrawal shock hits in year 4, what is the solvency risk?',
      options: [
        { label: 'Zero risk, deposits are free money', description: 'Banks never face liquidity issues during growth.', isMostLikely: false },
        { label: 'Severe insolvency and bank run vulnerability', description: 'Exponential liabilities backed by linear reserves create an expanding fragile gap.', isMostLikely: true },
        { label: 'Automatic sovereign buyout with zero loss', description: 'All losses are magically wiped away.', isMostLikely: false }
      ],
      explanation: 'When liabilities grow exponentially while safety buffers scale linearly, the system becomes hyper-fragile to shocks.',
      confidenceNotes: 'Mathematical accounting certainty.'
    },
    keyRule: 'The greatest shortcoming of the human race is our inability to understand the exponential function (Al Bartlett).',
    earlyWarningSignal: 'People dismissing a trend because its absolute number looks tiny today.',
    counterAction: 'Plot your data on logarithmic axes to reveal whether the true underlying trend is linear or exponential.'
  },
  {
    id: 'bottleneck',
    title: 'Bottleneck (Theory of Constraints)',
    shortTitle: 'Bottlenecks',
    category: 'business',
    secondaryCategories: ['technology', 'everyday', 'nature'],
    difficulty: 'intermediate',
    tagline: 'System throughput is determined exclusively by the narrowest constraint.',
    definition: 'Eliyahu Goldratt’s Theory of Constraints: Any manageable system is limited in achieving more of its goals by at least one constraint. Optimizing anything other than the bottleneck is an illusion of productivity.',
    visualType: 'bottleneck',
    flowSteps: ['WIDE INTAKE', 'FLOW PRESSURE', 'NARROW CONSTRAINT CHOKEPOINT', 'LIMITED FINAL THROUGHPUT'],
    howItWorks: [
      { step: 1, title: 'Identify the Constraint', description: 'Locate the single stage where work-in-progress inventory piles up and idle downstream stations wait.' },
      { step: 2, title: 'Exploit the Bottleneck', description: 'Ensure the bottleneck never wastes time on defective inputs or non-essential downtime.' },
      { step: 3, title: 'Subordinate Everything Else', description: 'Slow down upstream production to match the pace of the bottleneck, eliminating clutter.' },
      { step: 4, title: 'Elevate the Bottleneck', description: 'Invest capital to expand capacity at the constraint until it moves to a new location.' }
    ],
    whereItAppears: [
      { domain: 'Business', icon: 'TrendingUp', context: 'Factory assembly lines, sales funnel qualification stages, engineering QA testing pipelines.' },
      { domain: 'Technology', icon: 'Cpu', context: 'Von Neumann memory bottleneck: CPU compute speeds outrunning RAM data bus bandwidth.' },
      { domain: 'Everyday Life', icon: 'Clock', context: 'Personal productivity: Writing an article is blocked not by typing speed, but by research clarity.' },
      { domain: 'Nature', icon: 'Leaf', context: 'Liebig’s Law of the Minimum: Plant growth is dictated by the scarcest nutrient (e.g. Phosphorus), not total fertilizer.' }
    ],
    realWorldExamples: [
      {
        title: 'Semiconductor Fabrication (ASML Lithography)',
        domain: 'Technology',
        flow: 'Entire global AI / chip industry reliant on a single Dutch supplier for EUV lithography machines.',
        description: 'TSMC, Intel, and Samsung cannot ship 3nm chips without ASML machines, making ASML the planetary compute choke point.'
      },
      {
        title: 'Hospital Emergency Room Triage',
        domain: 'Business',
        flow: '10 Surgeons ready + 50 Beds open → But only 1 CT Scanner → Patients wait 8 hours in hallway',
        description: 'Adding 10 more surgeons yields zero additional discharged patients until CT capacity expands.'
      }
    ],
    meters: {
      frequency: 93,
      complexity: 40,
      predictability: 92,
      impact: 91
    },
    relatedPatternIds: ['pareto-principle', 'feedback-loop', 'second-order-effects'],
    spotItScenario: {
      scenario: 'A software company hires 20 new junior developers. Code commits double, but customer feature releases drop by 30% because there is only 1 senior architect reviewing code.',
      question: 'Where is the systemic bottleneck located?',
      options: [
        'Junior Developer Typing Speed',
        'Senior Architect Code Review Capacity',
        'Customer Internet Bandwidth',
        'Company HR Department'
      ],
      correctIndex: 1,
      explanation: 'Piling work onto a single review bottleneck creates queue congestion and communication overhead.'
    },
    predictionScenario: {
      currentState: 'An airport expands from 2 runways to 6 runways, but retains only 4 security screening lanes for passengers.',
      prompt: 'What will happen to flight departure on-time performance during holiday peak season?',
      options: [
        { label: 'Passenger throughput will triple immediately', description: 'Runway count dictates passenger walking speed.', isMostLikely: false },
        { label: 'Massive passenger terminal gridlock and missed flights', description: 'The constraint shifted entirely to security checkpoints; planes sit empty waiting for stranded passengers.', isMostLikely: true },
        { label: 'Zero effect, airports have no capacity limits', description: 'Airports always operate at infinite speed.', isMostLikely: false }
      ],
      explanation: 'Expanding non-bottleneck capacity merely shifts pileups to the unaddressed constraint.',
      confidenceNotes: 'Theory of Constraints holds with mathematical certainty in physical queue networks.'
    },
    keyRule: 'An hour saved at the bottleneck is an hour saved for the entire system. An hour saved anywhere else is an illusion.',
    earlyWarningSignal: 'Work-in-progress accumulating immediately in front of one specific desk, machine, or person.',
    counterAction: 'Never let the bottleneck do work that could be handled by a non-bottleneck.'
  },
  {
    id: 'incentive-loop',
    title: 'Incentive Loop (Goodhart’s Law)',
    shortTitle: 'Incentive Loops',
    category: 'human',
    secondaryCategories: ['business', 'society'],
    difficulty: 'intermediate',
    tagline: 'When a measure becomes a target, it ceases to be a good measure.',
    definition: 'Humans are hyper-rational optimizers of the explicit metrics they are rewarded on. When institutions set narrow numerical targets, agents find the path of least resistance to maximize the score while subverting the original spirit.',
    visualType: 'cycle',
    flowSteps: ['METRIC ESTABLISHED', 'AGENT DISCOVERS SHORTCUT', 'GAMING OF THE METRIC', 'COLLAPSE OF TRUE QUALITY'],
    howItWorks: [
      { step: 1, title: 'Desired Goal vs Proxy Metric', description: 'A leadership team wishes to increase "Software Quality" and chooses "Bugs Closed" as the proxy.' },
      { step: 2, title: 'Incentive Alignment', description: 'Bonuses and promotions are tied directly to the proxy metric.' },
      { step: 3, title: 'Optimization & Gaming', description: 'Engineers open trivial fake bugs and close them in 10 seconds to hit the target quota.' },
      { step: 4, title: 'Divergence from Reality', description: 'Metrics look spectacular on executive dashboards while actual product quality degrades.' }
    ],
    whereItAppears: [
      { domain: 'Business', icon: 'TrendingUp', context: 'Sales quotas: Reps pushing heavy discounts on December 31st to hit quarterly bonuses, cannibalizing next year’s revenue.' },
      { domain: 'Society', icon: 'Users', context: 'Standardized testing: Schools "teaching to the test" while abandoning critical thinking and arts.' },
      { domain: 'Technology', icon: 'Cpu', context: 'AI RLHF reward hacking: AI models producing lengthy polite flattery because annotators reward verbose text.' },
      { domain: 'History', icon: 'Hourglass', context: 'Soviet nail factories measured by total weight producing 500-pound unusable iron nails.' }
    ],
    realWorldExamples: [
      {
        title: 'Wells Fargo Account Creation Scandal',
        domain: 'Business',
        flow: 'Strict daily quota (8 accounts per customer) → Employees open 3.5M fake accounts → $3 Billion fine',
        description: 'Extreme incentive pressure caused employees to game the proxy at the cost of catastrophic brand destruction.'
      },
      {
        title: 'Academic "Publish or Perish" Citations',
        domain: 'Society',
        flow: 'University tenure tied to citation counts → Citation cartels & salami-sliced papers → Lower scientific reproducibility',
        description: 'Researchers optimize for bibliometric scores rather than groundbreaking truth discoveries.'
      }
    ],
    meters: {
      frequency: 95,
      complexity: 60,
      predictability: 86,
      impact: 92
    },
    relatedPatternIds: ['second-order-effects', 'feedback-loop', 'habit-loop'],
    spotItScenario: {
      scenario: 'A police department rewards officers based on the reduction of reported major felonies. Officers begin classifying burglaries as minor property loss.',
      question: 'Which systemic law is actively operating here?',
      options: [
        'Goodhart’s Law (Incentive Gaming)',
        'S-Curve Inflection',
        'Pareto Law',
        'Metcalfe’s Network Rule'
      ],
      correctIndex: 0,
      explanation: 'The metric (reported felonies) was gamed by altering categorization rather than eliminating crime.'
    },
    predictionScenario: {
      currentState: 'A healthcare clinic pays doctors bonuses based on the total number of prescription drugs written per patient visit.',
      prompt: 'What will happen to patient health outcomes and antibiotic resistance over time?',
      options: [
        { label: 'Patients will achieve total immunity to all diseases', description: 'More pills always cure all ailments.', isMostLikely: false },
        { label: 'Overprescription of unnecessary medications and drug interactions', description: 'Financial incentives reward pill volume over lifestyle or preventative counseling.', isMostLikely: true },
        { label: 'Doctors will stop prescribing any medication at all', description: 'Incentives always produce the exact opposite.', isMostLikely: false }
      ],
      explanation: 'Financial compensation directly dictating clinical volume leads to over-treatment.',
      confidenceNotes: 'High certainty in health economics.'
    },
    keyRule: 'Show me the incentive and I will show you the outcome (Charlie Munger).',
    earlyWarningSignal: 'Metrics hitting 100% compliance while customer complaints or qualitative morale drops.',
    counterAction: 'Use counter-balancing metric pairs (e.g. measure Speed alongside Error Rate and Customer CSAT).'
  },
  {
    id: 'selection-effect',
    title: 'Selection Effect (Survivorship Bias)',
    shortTitle: 'Selection Bias',
    category: 'human',
    secondaryCategories: ['business', 'history', 'markets'],
    difficulty: 'intermediate',
    tagline: 'Analyzing only survivors obscures the fatal flaws of the unseen failures.',
    definition: 'Survivorship bias occurs when conclusions are drawn exclusively from individuals or entities that passed a harsh selective filter, while completely ignoring the invisible graveyard of failures that used the exact same strategies.',
    visualType: 'adaptation',
    flowSteps: ['TOTAL POPULATION', 'LETHAL FILTER APPLIED', 'INVISIBLE CASUALTY GRAVEYARD', 'DISTORTED CONCLUSION FROM SURVIVORS'],
    howItWorks: [
      { step: 1, title: 'Severe Filtering Event', description: 'A competitive arena (startups, war, music careers) eliminates 98% of entrants.' },
      { step: 2, title: 'Visibility Disparity', description: 'Winners write memoirs, give TED talks, and appear on magazine covers; losers vanish quietly.' },
      { step: 3, title: 'False Pattern Imputation', description: 'Observers copy traits of the winners (e.g., "Steve Jobs dropped out of college, so dropping out makes you rich!").' },
      { step: 4, title: 'Systemic Blindness', description: 'Failing to realize that the thousands of bankrupt dropouts followed the exact same path.' }
    ],
    whereItAppears: [
      { domain: 'History', icon: 'Hourglass', context: 'Abraham Wald & WWII Bomber armor: Adding armor to where planes came back with bullet holes was wrong; armor belonged where missing planes were shot.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Studying successful unicorns while ignoring the 95% of venture-backed startups that died.' },
      { domain: 'Markets', icon: 'Activity', context: 'Mutual fund brochures advertising 15-year track records after quietly closing down the 40 underperforming funds.' },
      { domain: 'Human Behavior', icon: 'UserCheck', context: 'Looking at ancient architecture and claiming "they built things better in the old days" (only the highest quality stone buildings survived).' }
    ],
    realWorldExamples: [
      {
        title: 'Abraham Wald’s Armor Insight (1943)',
        domain: 'History',
        flow: 'Planes return with wing bullet holes → Military wants armor on wings → Wald: "Put armor on the engines because planes shot in engines never returned."',
        description: 'The definitive historical demonstration of looking for the missing data.'
      },
      {
        title: 'College Dropout Tech Billionaires',
        domain: 'Business',
        flow: 'Gates, Zuckerberg, Jobs dropped out → Media glamorizes dropouts → Thousands drop out into low-wage jobs',
        description: 'Fails to account for their extraordinary baseline privilege, intelligence, and the vast graveyard of unseen dropouts.'
      }
    ],
    meters: {
      frequency: 91,
      complexity: 55,
      predictability: 79,
      impact: 88
    },
    relatedPatternIds: ['second-order-effects', 'pareto-principle', 'adaptation'],
    spotItScenario: {
      scenario: 'A finance blog interviews 5 crypto traders who made $10M from meme coins. All 5 say they held 100% of their net worth in dog tokens with no diversification.',
      question: 'What statistical trap will a reader fall into if they follow this exact trading strategy?',
      options: [
        'Survivorship Bias (Ignoring thousands wiped out to zero)',
        'S-Curve Adoption',
        'Metcalfe’s Quadratic Law',
        'Feedback Stabilization'
      ],
      correctIndex: 0,
      explanation: 'The interview sample is filtered exclusively on jackpot lottery winners; the thousands with identical strategies who lost their life savings are invisible.'
    },
    predictionScenario: {
      currentState: 'A company surveys only its 5-star loyal power users to decide the future product roadmap and ignores churned users who deleted the app.',
      prompt: 'What will happen to new user onboarding conversion over the next 6 months?',
      options: [
        { label: 'New user conversion will surge 400%', description: 'Power users understand the app best.', isMostLikely: false },
        { label: 'Product will become hyper-complex, alienating new signups', description: 'Designing only for survivors builds esoteric features that increase churn for beginners.', isMostLikely: true },
        { label: 'App store will ban the company automatically', description: 'Surveys violate app store guidelines.', isMostLikely: false }
      ],
      explanation: 'Listening only to retained users blinds product teams to the friction that caused other users to leave.',
      confidenceNotes: 'High certainty in product management analytics.'
    },
    keyRule: 'Always search for the silent graveyard: What happened to the people who did this and failed?',
    earlyWarningSignal: 'Advice based on retrospective case studies of extreme outliers.',
    counterAction: 'Actively interview lost customers, churned employees, and failed initiatives.'
  },
  {
    id: 'threshold-effect',
    title: 'Threshold Effect (Tipping Point)',
    shortTitle: 'Threshold Effect',
    category: 'nature',
    secondaryCategories: ['society', 'technology', 'markets'],
    difficulty: 'advanced',
    tagline: 'Linear incremental change produces sudden non-linear phase transitions.',
    definition: 'Complex systems often absorb gradual pressure without visible change until a critical threshold (tipping point) is breached, triggering a sudden, irreversible phase transition (like water heating from 99°C to 100°C steam).',
    visualType: 'threshold',
    flowSteps: ['QUIET PRESSURE ACCUMULATION', 'SYSTEM ABSORBS STRESS', 'CRITICAL THRESHOLD BREACHED', 'SUDDEN PHASE TRANSITION'],
    howItWorks: [
      { step: 1, title: 'Latent Stress Loading', description: 'Variables shift slowly; negative feedback mechanisms mask the accumulating systemic strain.' },
      { step: 2, title: 'Critical Slowing Down', description: 'The system loses resilience; recovery from minor perturbations takes longer.' },
      { step: 3, title: 'The Spark & Threshold Crossing', description: 'A minor catalyst pushes the system past its tipping parameter.' },
      { step: 4, title: 'Bifurcation / New State', description: 'The system snaps into a completely new operational regime that is often impossible to reverse.' }
    ],
    whereItAppears: [
      { domain: 'Nature & Biology', icon: 'Leaf', context: 'Phase changes: Water turning to ice at 0°C; ecological forest dieback turning into savannah.' },
      { domain: 'Society', icon: 'Users', context: 'Revolutions (Arab Spring): Decades of silent resentment exploding overnight after a single event.' },
      { domain: 'Markets', icon: 'Activity', context: 'Bank runs: A bank is solvent with 9% withdrawals, but at 12% a catastrophic insolvency cascade hits.' },
      { domain: 'Everyday Life', icon: 'Clock', context: 'Burnout: Absorbing 60-hour workweeks for months until one tiny email causes total cognitive collapse.' }
    ],
    realWorldExamples: [
      {
        title: 'Thermal Phase Change (Ice to Water to Steam)',
        domain: 'Nature',
        flow: 'Heating ice from -10°C to -1°C = Solid Ice → Heat to 0°C = Liquid water appears',
        description: 'Linear temperature inputs generate abrupt qualitative state changes at precise mathematical thresholds.'
      },
      {
        title: 'The Tipping Point of Social Norms (Centola 25% Rule)',
        domain: 'Society',
        flow: 'Niche minority reaches 25% committed threshold → Rapid flip of the entire population’s consensus',
        description: 'Sociological research shows a committed minority of ~25% can overturn established majority social conventions.'
      }
    ],
    meters: {
      frequency: 84,
      complexity: 78,
      predictability: 58,
      impact: 97
    },
    relatedPatternIds: ['viral-spread', 'boom-bubble-crash', 'emergence', 'scurve-adoption'],
    spotItScenario: {
      scenario: 'A bridge bears 10,000 cars daily for 30 years with zero cracks. One snowplow weighing 15 tons drives over it on a sub-zero morning and the suspension cable snaps instantly.',
      question: 'Which pattern describes the sudden structural collapse after decades of apparent stability?',
      options: [
        'Material Threshold & Fatigue Tipping Point',
        'Network Effect',
        'Incentive Reversal',
        '80/20 Dispersion'
      ],
      correctIndex: 0,
      explanation: 'Micro-fractures accumulated invisibly until the critical mechanical load threshold was breached.'
    },
    predictionScenario: {
      currentState: 'An online community tolerates a slow rise in toxic spam from 1% to 14% of forum comments. Moderation remains inactive.',
      prompt: 'If spam reaches 20% of all public posts, what will high-reputation contributors do?',
      options: [
        { label: 'High-reputation contributors will stay forever', description: 'Users never leave platforms once registered.', isMostLikely: false },
        { label: 'Abrupt mass exodus of quality contributors (Community Collapse)', description: 'Once the noise-to-signal ratio passes the threshold, high-value users leave, accelerating the decay.', isMostLikely: true },
        { label: 'Spam will automatically transform into poetry', description: 'Internet algorithms self-heal all text.', isMostLikely: false }
      ],
      explanation: 'Social platforms exhibit harsh threshold dynamics: once trusted contributors leave, the network collapses rapidly.',
      confidenceNotes: 'High certainty in social platform dynamics.'
    },
    keyRule: 'Do not confuse stability with resilience. A system can look peaceful right up to the second it collapses.',
    earlyWarningSignal: 'Increasing recovery time required after small stress shocks.',
    counterAction: 'Build wide safety margins (redundancy) well below known operational tipping thresholds.'
  },
  {
    id: 'scarcity-pattern',
    title: 'Scarcity Pattern (Loss Aversion & Panic)',
    shortTitle: 'Scarcity Dynamics',
    category: 'human',
    secondaryCategories: ['markets', 'society', 'business'],
    difficulty: 'beginner',
    tagline: 'Perceived scarcity spikes urgency, emotional value, and hoarding.',
    definition: 'When availability of an item or resource is restricted (or perceived to be restricted), humans irrationally elevate its perceived value, triggering loss aversion and preemptive hoarding behaviors that amplify the actual shortage.',
    visualType: 'cycle',
    flowSteps: ['SUPPLY CONSTRAINT SIGNAL', 'LOSS AVERSION PANIC', 'HOARDING & DEMAND SPIKE', 'ARTIFICIAL EXTREME SHORTAGE'],
    howItWorks: [
      { step: 1, title: 'Scarcity Trigger', description: 'A real or artificial signal indicates that supply is dwindling or time is expiring.' },
      { step: 2, title: 'Psychological Reactance', description: 'Freedom of choice feels threatened; loss aversion (losses hurt 2x more than gains feel good) activates.' },
      { step: 3, title: 'Hoarding Frenzy', description: 'Consumers purchase 5x their normal consumption to hedge against future deprivation.' },
      { step: 4, title: 'Self-Fulfilling Depletion', description: 'The collective panic buying empties inventory, validating the original fear.' }
    ],
    whereItAppears: [
      { domain: 'Everyday Life', icon: 'Clock', context: '2020 Toilet Paper Panic: A rumor of paper mill shortages caused global supermarket shelves to empty in 48 hours.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Hermès Birkin Bags / Supreme drops: Artificial scarcity creating secondary resale markets at 300% markup.' },
      { domain: 'Markets', icon: 'Activity', context: 'Short Squeezes (GameStop 2021): Limited float of shares forced short sellers to panic-buy at any price.' },
      { domain: 'Technology', icon: 'Cpu', context: 'Clubhouse / Gmail beta invite-only access driving explosive social prestige and viral demand.' }
    ],
    realWorldExamples: [
      {
        title: 'The Great Toilet Paper Run of 2020',
        domain: 'Everyday Life',
        flow: 'Rumor of supply shock → Media reports panic → Normal people hoard 60 rolls → Supply chains break',
        description: 'There was zero reduction in manufacturing capacity; consumer panic alone emptied every grocery store.'
      },
      {
        title: 'Diamonds & The De Beers Monopoly',
        domain: 'Business',
        flow: 'Diamonds are abundant → De Beers vaults 90% of supply → "A Diamond is Forever" marketing → High luxury pricing',
        description: 'Single-custody inventory throttling manufactured century-long artificial scarcity.'
      }
    ],
    meters: {
      frequency: 89,
      complexity: 30,
      predictability: 84,
      impact: 87
    },
    relatedPatternIds: ['feedback-loop', 'boom-bubble-crash', 'reflexivity'],
    spotItScenario: {
      scenario: 'An airline website flashes a red banner: "Only 1 seat left at this price! 14 other people are looking at this flight right now."',
      question: 'Which cognitive manipulation pattern is being weaponized?',
      options: [
        'Manufactured Scarcity & Social Proof Urgency',
        'Pareto Imbalance',
        'Moore’s Law',
        'Liebig’s Law of the Minimum'
      ],
      correctIndex: 0,
      explanation: 'Scarcity triggers immediate loss aversion, bypassing rational price comparison.'
    },
    predictionScenario: {
      currentState: 'A gas station announces a potential fuel delivery delay due to a truck driver strike on Friday.',
      prompt: 'What will line lengths at the gas station look like on Thursday afternoon?',
      options: [
        { label: 'Completely empty with zero customers', description: 'Drivers prefer running out of gas.', isMostLikely: false },
        { label: 'Massive multi-hour lines as every driver in town tops off their tanks early', description: 'Fear of scarcity creates a localized demand surge that drains current inventory immediately.', isMostLikely: true },
        { label: 'Normal random traffic', description: 'People ignore fuel levels completely.', isMostLikely: false }
      ],
      explanation: 'Preemptive hedging turns minor logistical delays into acute retail shortages.',
      confidenceNotes: 'High certainty in behavioral game theory.'
    },
    keyRule: 'Distinguish between structural physical scarcity (e.g. Land, Bitcoin, Gold) and manufactured psychological scarcity.',
    earlyWarningSignal: 'Spike in purchase frequency driven by fear of unavailability rather than current utility need.',
    counterAction: 'Enforce per-customer purchase quotas during sudden supply disruptions to prevent artificial hoarding cascades.'
  },
  {
    id: 'trend-reversal',
    title: 'Trend Reversal (Mean Reversion)',
    shortTitle: 'Mean Reversion',
    category: 'markets',
    secondaryCategories: ['nature', 'history', 'business'],
    difficulty: 'intermediate',
    tagline: 'Extreme deviations from historical baselines inevitably snap back toward the average.',
    definition: 'In statistical and physical systems, extreme outlier events or unsustainable trends are naturally followed by outcomes closer to the historical mean, as the unique temporary forces driving the anomaly exhaust themselves.',
    visualType: 'wave',
    flowSteps: ['NORMAL BASELINE', 'EXTREME ANOMALOUS SPIKE', 'MOMENTUM EXHAUSTION', 'MEAN REVERSION PULL'],
    howItWorks: [
      { step: 1, title: 'Historical Anchor', description: 'A system possesses a long-term gravitational average based on structural fundamentals.' },
      { step: 2, title: 'Outlier Momentum', description: 'Sentiment, weather anomalies, or speculative hype pushes the metric 3 standard deviations away.' },
      { step: 3, title: 'Exhaustion of Marginal Buyers/Energy', description: 'The energy required to keep the system at the extreme edge becomes unsustainable.' },
      { step: 4, title: 'Snapping Gravitational Return', description: 'The variable corrects back toward the long-term trendline, often overshooting to the other side.' }
    ],
    whereItAppears: [
      { domain: 'Markets & Finance', icon: 'Activity', context: 'Stock valuation multiples (P/E ratios): Extreme market euphoria inevitably mean-reverts during recessions.' },
      { domain: 'Nature & Biology', icon: 'Leaf', context: 'Weather cycles: Unusually hot summers followed by seasonal normalization.' },
      { domain: 'Human Behavior', icon: 'UserCheck', context: 'Sports performance: The "Sports Illustrated Cover Jinx" is simply athletes returning to average after career-best games.' },
      { domain: 'History', icon: 'Hourglass', context: 'Political pendulum: Decades of intense centralization followed by decentralized populist revolt.' }
    ],
    realWorldExamples: [
      {
        title: 'Sports "Sophomore Slump"',
        domain: 'Human Behavior',
        flow: 'Rookie has once-in-a-decade hot streak → Named Rookie of the Year → Year 2 performance looks mediocre by comparison',
        description: 'The rookie simply regressed to their true statistical baseline capability.'
      },
      {
        title: 'Corporate Profit Margins (Macroeconomics)',
        domain: 'Business',
        flow: 'Tech margins hit 40% → High profits attract aggressive copycats → Price wars erode margins back to 15%',
        description: 'Capitalism acts as a giant mean-reversion machine against excessive economic rents.'
      }
    ],
    meters: {
      frequency: 90,
      complexity: 45,
      predictability: 76,
      impact: 86
    },
    relatedPatternIds: ['cycles', 'boom-bubble-crash', 'feedback-loop'],
    spotItScenario: {
      scenario: 'A mutual fund manager beats the S&P 500 by 18% for 3 straight years by holding 100% concentrated tech stocks. In year 4 and 5, the fund underperforms the market by 12%.',
      question: 'Which statistical reality explains this performance trajectory?',
      options: [
        'Mean Reversion (Regression to the Mean)',
        'Exponential Network Multiplication',
        'Permanent Alpha Extraction',
        'The Cobra Effect'
      ],
      correctIndex: 0,
      explanation: 'Unusual luck and market factor tailwinds temporarily inflate performance before returning to the statistical baseline.'
    },
    predictionScenario: {
      currentState: 'A retail company experiences an 800% revenue spike in April 2020 due to pandemic home-gym lockdowns.',
      prompt: 'When planning 2023 factory capacity, what should leadership assume about that demand level?',
      options: [
        { label: 'Demand will continue compounding at 800% year-over-year indefinitely', description: 'Lockdown habits are permanent forever.', isMostLikely: false },
        { label: 'Demand was an anomalous temporary spike that will mean-revert to pre-crisis trends', description: 'Once gym closures end, consumer exercise habits normalize, leaving excess factory capacity.', isMostLikely: true },
        { label: 'Revenue will become completely negative numbers', description: 'Math does not allow negative sales.', isMostLikely: false }
      ],
      explanation: 'Treating a once-in-a-century outlier event as the permanent new baseline leads to devastating inventory overhang.',
      confidenceNotes: 'High certainty across post-pandemic supply chain data.'
    },
    keyRule: 'Trees do not grow to the sky. Extremes are inherently unstable.',
    earlyWarningSignal: 'Extrapolating a 3-standard-deviation event into a permanent linear forecast.',
    counterAction: 'Base capital allocation on multi-year median baselines rather than peak cycle records.'
  },
  {
    id: 'emergence',
    title: 'Emergence (Complex Systems)',
    shortTitle: 'Emergence',
    category: 'nature',
    secondaryCategories: ['society', 'technology', 'human'],
    difficulty: 'advanced',
    tagline: 'Simple local rules generate complex macroscopic intelligence.',
    definition: 'Emergence occurs when an entity has properties that its parts do not have on their own. Simple agents following minimal local rules interact to produce sophisticated, self-organizing collective intelligence with no central leader.',
    visualType: 'emergence',
    flowSteps: ['INDIVIDUAL AGENTS', 'LOCAL INTERACTION RULES', 'COLLECTIVE SYNCHRONIZATION', 'MACRO EMERGENCE'],
    howItWorks: [
      { step: 1, title: 'Autonomous Simple Units', description: 'Individual ants, neurons, birds, or market traders follow basic binary instincts.' },
      { step: 2, title: 'Local Neighbor Feedback', description: 'No agent sees the global picture; each reacts solely to adjacent neighbors.' },
      { step: 3, title: 'Self-Organization', description: 'Feedback loops propagate through the mesh, locking into coherent macro structures.' },
      { step: 4, title: 'Higher-Order Intelligence', description: 'The hive mind, consciousness, bird murmuration, or market price discovery emerges.' }
    ],
    whereItAppears: [
      { domain: 'Nature & Biology', icon: 'Leaf', context: 'Ant colonies: No single ant designs the colony architecture or food logistics; it emerges via pheromone trails.' },
      { domain: 'Human Behavior', icon: 'UserCheck', context: 'Human consciousness: 86 billion biological neurons firing electrical pulses create subjective experience.' },
      { domain: 'Society', icon: 'Users', context: 'Traffic jams: Ghost traffic waves appearing on highways with zero accidents, caused by minor tap brakes.' },
      { domain: 'Markets', icon: 'Activity', context: 'The price of oil: Millions of independent buyers and sellers produce an equilibrium price clearing global energy.' }
    ],
    realWorldExamples: [
      {
        title: 'Starling Murmuration (Bird Flocks)',
        domain: 'Nature',
        flow: 'Every bird matches speed with 7 nearest neighbors + avoids collision → Fluid 50,000-bird aerial defense dance',
        description: 'Zero central choreography; three basic mathematical vector rules generate fluid visual art.'
      },
      {
        title: 'Wikipedia Knowledge Repository',
        domain: 'Technology',
        flow: 'Volunteers follow simple edit / citation rules → World’s largest, most up-to-date multilingual encyclopedia',
        description: 'Decentralized emergence outperforming multi-million-dollar top-down corporate encyclopedias (Encarta).'
      }
    ],
    meters: {
      frequency: 86,
      complexity: 92,
      predictability: 52,
      impact: 99
    },
    relatedPatternIds: ['feedback-loop', 'adaptation', 'network-effects', 'threshold-effect'],
    spotItScenario: {
      scenario: 'A highway is backed up for 4 miles. When you reach the front of the slowdown, there is no accident, no construction, and no stalled vehicle.',
      question: 'Which emergent phenomenon produced this phantom traffic jam?',
      options: [
        'Backward Travelling Shockwave (Phantom Traffic Wave)',
        'Deliberate Government Conspiracy',
        'Linear S-Curve Deficit',
        'The Cobra Reversal'
      ],
      correctIndex: 0,
      explanation: 'A single driver tapped their brakes; the driver behind over-braked slightly; the delay amplified backward through the emergent vehicle chain.'
    },
    predictionScenario: {
      currentState: 'A city government attempts to eliminate all sidewalk congestion by assigning every citizen an official walking timetable and route map.',
      prompt: 'Will this top-down command system outperform organic pedestrian emergence?',
      options: [
        { label: 'Yes, central planning always beats self-organization in real-time movement', description: 'Computers know every step.', isMostLikely: false },
        { label: 'No, it will cause catastrophic gridlock and pedestrian chaos', description: 'Top-down systems lack the dynamic local responsiveness of decentralized emergent agents.', isMostLikely: true },
        { label: 'Citizens will stop walking and fly', description: 'Humans adapt instantly to fly.', isMostLikely: false }
      ],
      explanation: 'Complex adaptive systems cannot be micro-managed centrally without destroying systemic flexibility.',
      confidenceNotes: 'High certainty in complexity science.'
    },
    keyRule: 'To fix an emergent problem, do not try to control the macroscopic outcome; modify the underlying local interaction rules.',
    earlyWarningSignal: 'A small localized change producing unpredictable, system-wide synchronized ripples.',
    counterAction: 'Design resilient local incentive rules rather than bloated top-down bureaucratic control.'
  },
  {
    id: 'cycles',
    title: 'Cycles (Oscillations & Seasonality)',
    shortTitle: 'Cycles & Waves',
    category: 'history',
    secondaryCategories: ['markets', 'nature', 'everyday'],
    difficulty: 'beginner',
    tagline: 'Systems alternate between expansion and contraction over predictable periods.',
    definition: 'Natural, economic, and civilizational systems do not move in straight lines. They oscillate continuously between opposing states—peace and conflict, risk appetite and risk aversion, boom and recession, day and night.',
    visualType: 'wave',
    flowSteps: ['PEACE / ABUNDANCE', 'ACCUMULATION OF DEBT/VULNERABILITY', 'CRISIS / HARD TIMES', 'RESILIENCE & RENEWAL'],
    howItWorks: [
      { step: 1, title: 'The Generational Reset', description: 'Hard times force discipline, frugal living, and institutional strengthening.' },
      { step: 2, title: 'Prosperity & Complacency', description: 'Discipline creates peace and wealth; new generations take stability for granted.' },
      { step: 3, title: 'Fragility & Crisis', description: 'Complacency leads to excessive debt, institutional decay, and acute systemic crisis.' },
      { step: 4, title: 'Renewal', description: 'The crisis purges malinvestment, setting the stage for the next upward swing.' }
    ],
    whereItAppears: [
      { domain: 'History', icon: 'Hourglass', context: 'The Fourth Turning (Strauss-Howe): 80-year civilizational generational archetypes (High, Awakening, Unraveling, Crisis).' },
      { domain: 'Markets & Finance', icon: 'Activity', context: 'The Credit Cycle (Ray Dalio): Short-term debt cycles (5-8 years) stacked inside long-term debt super-cycles (50-75 years).' },
      { domain: 'Nature & Biology', icon: 'Leaf', context: 'Circadian rhythm (24-hour sleep/wake cycle) and Predator-Prey (Lynx vs Hare) population oscillations.' },
      { domain: 'Everyday Life', icon: 'Clock', context: 'Ultradian rhythms: Human energy peaking and dipping every 90–120 minutes throughout the workday.' }
    ],
    realWorldExamples: [
      {
        title: 'Predator-Prey Population Waves (Lotka-Volterra)',
        domain: 'Nature',
        flow: 'High Hare count → Lynx population surges → Hares get eaten → Lynx starve → Hares recover',
        description: 'Classic ecological oscillation where predator and prey populations lag each other perpetually.'
      },
      {
        title: 'The Semiconductor Chip Cycle',
        domain: 'Business',
        flow: 'Chip shortage → Foundries build $20B fabs (3 years) → All fabs open at once → Chip glut → Production halts',
        description: 'Long capital lead times ensure persistent boom-bust inventory cycles in manufacturing.'
      }
    ],
    meters: {
      frequency: 97,
      complexity: 50,
      predictability: 81,
      impact: 94
    },
    relatedPatternIds: ['boom-bubble-crash', 'trend-reversal', 'growth-peak-decline'],
    spotItScenario: {
      scenario: 'A memory chip manufacturer posts record earnings in year 1. In year 3, memory chip prices collapse 65% as 4 new mega-factories open simultaneously across Asia.',
      question: 'Which macroeconomic dynamic drove this sudden supply shock?',
      options: [
        'The Capital Expenditure Bullwhip Cycle',
        'S-Curve Extinction',
        'Metcalfe’s Lock-In',
        'Pareto Imbalance'
      ],
      correctIndex: 0,
      explanation: 'The multi-year delay between ordering factory capacity and delivering supply guarantees cyclic overshooting.'
    },
    predictionScenario: {
      currentState: 'A real estate investor assumes that low interest rates and 10% annual rent growth will continue uninterrupted for the next 30 straight years with zero recessions.',
      prompt: 'What will happen during the next cyclical downturn if the investor is 90% debt-leveraged?',
      options: [
        { label: 'Instant multi-generational billionaire status', description: 'Leverage never carries risk.', isMostLikely: false },
        { label: 'Severe liquidity crunch or foreclosure during the down-cycle', description: 'When cyclic occupancy drops, fixed debt payments trigger default on overleveraged balance sheets.', isMostLikely: true },
        { label: 'The government will grant the investor free houses', description: 'Real estate is guaranteed by nature.', isMostLikely: false }
      ],
      explanation: 'Those who plan for straight lines get wiped out by the inevitable turn of the cycle.',
      confidenceNotes: 'High macroeconomic certainty.'
    },
    keyRule: 'Remember the ancient wisdom: "This too shall pass." Prepare for the winter while enjoying the summer.',
    earlyWarningSignal: 'Belief that a cycle has been "permanently eliminated" by modern technology or government policy.',
    counterAction: 'Stress-test all business models and personal budgets against the inevitable down-leg of the cycle.'
  },
  {
    id: 'path-dependence',
    title: 'Path Dependence (Lock-in)',
    shortTitle: 'Path Dependence',
    category: 'technology',
    secondaryCategories: ['history', 'business', 'society'],
    difficulty: 'advanced',
    tagline: 'Historical accidents dictate modern standards despite superior alternatives.',
    definition: 'Path dependence occurs when early, often arbitrary decisions or historical accidents become locked in due to high switching costs and network standards, preventing the adoption of technically superior alternatives.',
    visualType: 'network',
    flowSteps: ['ARBITRARY EARLY CHOICE', 'INFRASTRUCTURE STANDARDIZATION', 'EXPENSIVE SWITCHING BARRIER', 'PERMANENT LOCK-IN'],
    howItWorks: [
      { step: 1, title: 'Historical Contingency', description: 'An initial decision is made to solve a temporary, localized constraint.' },
      { step: 2, title: 'Ecosystem Co-Adaptation', description: 'Tooling, training, factories, and complementary software standardize around that initial choice.' },
      { step: 3, title: 'The Switching Chasm', description: 'A 10x better alternative is invented, but switching requires retraining the entire planetary workforce.' },
      { step: 4, title: 'Permanent Inertia', description: 'Society stays with the sub-optimal standard because coordination costs exceed the incremental benefit.' }
    ],
    whereItAppears: [
      { domain: 'Technology', icon: 'Cpu', context: 'The QWERTY keyboard layout: Designed in 1873 to prevent mechanical typewriter jams, still used on touchscreens.' },
      { domain: 'History', icon: 'Hourglass', context: 'Railway track gauges: Modern train widths track back to the width of Roman chariot ruts 2,000 years ago.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Enterprise software: Legacy COBOL banking codebases running 70% of global daily financial transactions.' },
      { domain: 'Society', icon: 'Users', context: 'Calendar and time measurement: 60 seconds, 60 minutes, 360 degrees inherited from ancient Babylonian base-60 math.' }
    ],
    realWorldExamples: [
      {
        title: 'The QWERTY Keyboard vs Dvorak',
        domain: 'Technology',
        flow: 'QWERTY invented to slow mechanical typing → Typists trained globally → Dvorak 30% faster invented (1936) → World stays on QWERTY',
        description: 'The archetype of historical path dependence outliving its original mechanical reason.'
      },
      {
        title: 'US Rail Gauge & Space Shuttle Rockets',
        domain: 'History',
        flow: 'Roman ruts (4 ft 8.5 in) → English wagons → Railroad gauge → Space Shuttle solid rocket booster width (tunnel constraint)',
        description: 'Ancient road dimensions constrained the maximum diameter of 20th-century orbital space rockets.'
      }
    ],
    meters: {
      frequency: 82,
      complexity: 70,
      predictability: 85,
      impact: 90
    },
    relatedPatternIds: ['network-effects', 'habit-loop', 'scurve-adoption'],
    spotItScenario: {
      scenario: 'A major bank spends $500M annually maintaining 50-year-old COBOL mainframe code rather than migrating to modern cloud databases.',
      question: 'Why does the bank refuse to switch to modern programming languages?',
      options: [
        'Path Dependence & Catastrophic Migration Risk',
        'COBOL is technically the fastest language for mobile apps',
        'The bank wants to hire only 75-year-old engineers',
        'Linear S-Curve saturation'
      ],
      correctIndex: 0,
      explanation: 'Decades of interlocking institutional logic make the cost and operational risk of rewriting legacy core banking too high.'
    },
    predictionScenario: {
      currentState: 'A startup invents a new plug shape that charges phones 3% faster than standard USB-C.',
      prompt: 'Will this new plug replace USB-C globally in the next 3 years?',
      options: [
        { label: 'Yes, every consumer will buy 10 new cables tomorrow', description: 'Consumers love buying new proprietary cables.', isMostLikely: false },
        { label: 'No, USB-C ecosystem lock-in and global regulatory standards will reject it', description: 'A marginal 3% speed gain cannot overcome the trillions invested in global USB-C infrastructure.', isMostLikely: true },
        { label: 'All smartphones will be outlawed', description: 'Governments ban batteries.', isMostLikely: false }
      ],
      explanation: 'To overturn an entrenched standard with deep path dependence, a replacement must be 10x better, not 3% better.',
      confidenceNotes: 'High certainty in technology standards economics.'
    },
    keyRule: 'Early choices in a system’s design have disproportionate, irreversible leverage over its entire future history.',
    earlyWarningSignal: 'Justifying a process or design with the phrase: "Because that’s the way we’ve always done it."',
    counterAction: 'When building new platforms, design modular abstraction layers to preserve future flexibility.'
  },
  {
    id: 'reflexivity',
    title: 'Reflexivity (Self-Fulfilling Dynamics)',
    shortTitle: 'Reflexivity',
    category: 'markets',
    secondaryCategories: ['human', 'society', 'history'],
    difficulty: 'advanced',
    tagline: 'Beliefs alter fundamentals, which in turn validate and magnify beliefs.',
    definition: 'George Soros’ Theory of Reflexivity: In human systems, participants’ biased perceptions alter the underlying objective reality, and this altered reality loops back to reinforce the original biased perceptions, creating runaway self-fulfilling or self-defeating loops.',
    visualType: 'cycle',
    flowSteps: ['SUBJECTIVE BIAS / BELIEF', 'ACTION BASED ON BIAS', 'OBJECTIVE REALITY ALTERS', 'VALIDATION OF BIAS'],
    howItWorks: [
      { step: 1, title: 'Biased Narrative Takes Hold', description: 'Investors or citizens adopt a narrative (e.g. "Company X is the future of computing").' },
      { step: 2, title: 'Capital / Behavioral Flow', description: 'Stock price surges; the company uses its inflated stock as cheap currency to acquire top talent and rivals.' },
      { step: 3, title: 'Fundamentals Improve to Match Narrative', description: 'Because of the cheap capital and top talent, Company X actually builds a superior product.' },
      { step: 4, title: 'The Fallacy of Pure Objectivity', description: 'The original narrative was not true when spoken, but became true because of the belief.' }
    ],
    whereItAppears: [
      { domain: 'Markets & Finance', icon: 'Activity', context: 'Sovereign credit ratings: Downgrading a country’s debt raises borrowing costs, forcing default.' },
      { domain: 'Human Behavior', icon: 'UserCheck', context: 'The Placebo Effect: Believing a sugar pill is medicine triggers physiological healing chemistry.' },
      { domain: 'Society', icon: 'Users', context: 'Bank Runs: Believing a healthy bank is failing causes everyone to withdraw cash, making it fail.' },
      { domain: 'Business', icon: 'TrendingUp', context: 'Elon Musk using Tesla’s high stock valuation to raise billions in cash, solving manufacturing bottlenecks.' }
    ],
    realWorldExamples: [
      {
        title: 'Classic Fractional Reserve Bank Run',
        domain: 'Markets',
        flow: 'Rumor of bank weakness → Depositors rush to pull cash → Bank runs out of physical reserves → Bank collapses',
        description: 'The bank was 100% solvent before the belief; the belief itself caused the physical insolvency.'
      },
      {
        title: 'The Pygmalion Effect (Education)',
        domain: 'Human Behavior',
        flow: 'Teachers told random students are "geniuses" → Teachers give extra subconscious encouragement → Students score higher',
        description: 'Subjective expectations directly altered objective academic test outcomes.'
      }
    ],
    meters: {
      frequency: 80,
      complexity: 88,
      predictability: 62,
      impact: 96
    },
    relatedPatternIds: ['feedback-loop', 'boom-bubble-crash', 'incentive-loop'],
    spotItScenario: {
      scenario: 'A charismatic founder announces a futuristic electric truck. Pre-orders spike, enabling the company to raise $2B on public markets to hire the best engineers to actually build the truck.',
      question: 'Which dynamic allowed the founder to transform a speculative promise into physical reality?',
      options: [
        'Reflexivity (Belief engineering the underlying fundamentals)',
        'Mean Reversion',
        'Selection Bias',
        'The Cobra Fallacy'
      ],
      correctIndex: 0,
      explanation: 'The belief attracted capital and talent, which physically manifested the claimed capability.'
    },
    predictionScenario: {
      currentState: 'A major news network incorrectly broadcasts that a regional supermarket chain has completely run out of milk and bread.',
      prompt: 'What will happen to the supermarket’s milk and bread inventory within 4 hours?',
      options: [
        { label: 'Inventory will remain 100% full and undisturbed', description: 'Consumers never react to news broadcasts.', isMostLikely: false },
        { label: 'Shelves will be completely emptied by panic buyers, making the fake news real', description: 'Reflexive panic: the false broadcast induces the exact behavior that makes the claim true.', isMostLikely: true },
        { label: 'Cows will fly to the store', description: 'Unrelated agricultural impossibility.', isMostLikely: false }
      ],
      explanation: 'In reflexive systems, public perception directly manufactures physical reality.',
      confidenceNotes: 'High certainty in behavioral panic dynamics.'
    },
    keyRule: 'Recognize when market prices are reflecting reality vs when market prices are actively creating reality.',
    earlyWarningSignal: 'A company whose sole underlying asset is the credibility and hype of its leadership.',
    counterAction: 'Separate reflexive market sentiment from hard cash-flow unit economics.'
  }
];

export const getPatternById = (id: string): Pattern | undefined => {
  return PATTERNS.find(p => p.id === id);
};

export const getFeaturedPatterns = (): Pattern[] => {
  return PATTERNS.slice(0, 10);
};

export const getPatternsByCategory = (categoryId: string): Pattern[] => {
  if (categoryId === 'all') return PATTERNS;
  return PATTERNS.filter(p => p.category === categoryId || p.secondaryCategories?.includes(categoryId as any));
};

export const searchPatterns = (query: string): Pattern[] => {
  const q = query.toLowerCase().trim();
  if (!q) return PATTERNS;
  return PATTERNS.filter(p => 
    p.title.toLowerCase().includes(q) ||
    p.tagline.toLowerCase().includes(q) ||
    p.definition.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.realWorldExamples.some(e => e.title.toLowerCase().includes(q) || e.description.toLowerCase().includes(q))
  );
};
