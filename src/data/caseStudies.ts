import { CaseStudy } from '../types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-kodak-nokia',
    number: '01',
    title: 'The Rise & Fall of a Giant',
    subtitle: 'How Kodak & Nokia Ignored the Digital S-Curve',
    category: 'business',
    patternId: 'growth-peak-decline',
    summary: 'The failure of global incumbents is rarely caused by technological ignorance; it is driven by rational optimization of a saturated legacy S-curve while mocking the early, noisy inception of the next.',
    observation: 'In 1996, Kodak commanded a $31 Billion market cap, 90% of US film market share, and world-class chemical patents. In 2007, Nokia held 49% of global mobile handset profits. Within 6 years, Kodak filed for Chapter 11 bankruptcy and Nokia’s mobile division was sold for salvage value.',
    patternDetected: 'The S-Curve Paradigm Cannibalization Dilemma + Peak Optimization Trap',
    whyItHappened: 'Kodak actually invented the first handheld digital camera in 1975 (Steve Sasson), but executives suppressed it because high-margin film was a lucrative cash cow. Nokia had early touchscreen prototypes, but its Symbian OS was optimized for physical keypad phones with long battery life. When the digital camera and smartphone S-curves crossed the quality/cost threshold, the transition occurred exponentially, rendering decades of chemical and keypad manufacturing moats obsolete in under 36 months.',
    consequences: 'Kodak laid off over 50,000 workers and lost all brand relevance to smartphone camera sensors. Nokia lost 90% of its equity value as Apple iOS and Google Android captured 99% of global mobile operating system profits.',
    whatCouldBeNoticedEarlier: '1. Tracking the exponential cost-per-megabyte drop in digital flash memory (Moore’s Law).\n2. Observing that early consumer dissatisfaction with digital pixelation was temporary, while convenience (instant sharing with zero film development cost) was structural.\n3. Recognizing that gross margin percentages on a dying curve provide zero defense against volume collapse.',
    timeline: [
      { phase: 'Phase 1 (1975–1995)', title: 'Inception of Digital Threat', description: 'Kodak engineers build first digital prototype; management buries it to protect film cash flows.', indicator: 'R&D patents filed but withheld from consumer market.' },
      { phase: 'Phase 2 (1996–2003)', title: 'The False Peak of Film', description: 'Kodak achieves record film sales in 1999; leadership misinterprets peak revenue as permanent security.', indicator: 'Margin optimization at the top of the sigmoid curve.' },
      { phase: 'Phase 3 (2004–2007)', title: 'The S-Curve Crossover', description: 'Digital cameras and smartphones cross the 3-megapixel clarity threshold; film demand falls off a cliff.', indicator: 'Rapid shift in consumer habit from physical printing to screen viewing.' },
      { phase: 'Phase 4 (2012)', title: 'Insolvency & Liquidation', description: 'Kodak enters Chapter 11 bankruptcy; Instagram acquired for $1B with only 13 employees.', indicator: 'Total capitalization migration to pure digital network platforms.' }
    ],
    keyTakeaway: 'When an exponential technology reaches 5-10% quality parity with an incumbent, linear historical advantages vanish almost overnight.',
    visualType: 'scurve'
  },
  {
    id: 'case-viral-memetics',
    number: '02',
    title: 'How Ideas Go Viral',
    subtitle: 'The Cascade Threshold of Algorithmic Memetics',
    category: 'technology',
    patternId: 'viral-spread',
    summary: 'Ideas do not spread because they are objectively the most profound; they spread when their transmission coefficient R₀ exceeds 1.0 through high emotional arousal and friction-free social sharing.',
    observation: 'A 15-second visual audio clip uploaded by an unknown student in Lithuania reached 240 million views across 80 countries in 6 days, spawning 1.2 million user-generated remixes and transforming global music streaming charts.',
    patternDetected: 'Super-Spreader Network Cascades + Zero-Friction Memetic Replication',
    whyItHappened: 'Modern recommendation engines decoupled distribution from static social graphs (following friends) and shifted to algorithmic content graphs (optimizing for raw retention and remix velocity). By providing native visual templates where viewers could re-enact the dance or joke in 2 taps, the barrier to user replication dropped to zero. Each viewer had a 0.08 probability of producing a derivative video that reached 1,000 other people, pushing the effective R₀ to 4.2.',
    consequences: 'Traditional multi-million-dollar music label radio promotion was bypassed by organic decentralized viral contagion, compressing multi-month promotional campaigns into 48-hour global phenomena.',
    whatCouldBeNoticedEarlier: '1. The audio snippet possessed an unmistakable 3-second hook with universal physical body movement.\n2. The visual format was easily replicable without expensive equipment or special lighting.\n3. The algorithm exhibited a steep compounding curve in initial test cohorts (100 -> 1,000 -> 10,000).',
    timeline: [
      { phase: 'T + 0 hrs', title: 'Seed Injection', description: 'Original clip posted; tested on 300 users in algorithm exploration bucket.', indicator: 'Watch completion rate > 92%.' },
      { phase: 'T + 12 hrs', title: 'Hub Discovery', description: 'Three mid-tier creators with 50k followers remix the sound.', indicator: 'Derivative video creation rate spikes 400%.' },
      { phase: 'T + 48 hrs', title: 'Global Algorithmic Breakout', description: 'Recommendation model elevates the audio track to trending status globally.', indicator: 'R₀ sustains > 3.0 across international borders.' },
      { phase: 'T + 120 hrs', title: 'Saturation & Burnout', description: 'Mainstream celebrities copy the trend; organic novelty decays as the audience saturates.', indicator: 'Share velocity drops below R < 0.8.' }
    ],
    keyTakeaway: 'Virality is engineered by minimizing the friction of copying and maximizing the emotional incentive for the viewer to pass the signal onward.',
    visualType: 'viral'
  },
  {
    id: 'case-minsky-bubbles',
    number: '03',
    title: 'Why Markets Form Bubbles',
    subtitle: 'From 1637 Tulips to 2008 Subprime: The Anatomy of Euphoria',
    category: 'markets',
    patternId: 'boom-bubble-crash',
    summary: 'Speculative bubbles are not irrational random anomalies; they are the structural outcome of prolonged stability generating excessive credit leverage until fragile debt structures snap.',
    observation: 'Between 2002 and 2006, US residential housing prices rose over 80%. Wall Street packaged subprime mortgages into complex CDOs stamped AAA by credit rating agencies. In 2008, an 8% increase in mortgage delinquencies froze the entire global commercial paper market, bankrupting Lehman Brothers and Bear Stearns.',
    patternDetected: 'The Minsky Financial Instability Super-Cycle (Hedge → Speculative → Ponzi Finance)',
    whyItHappened: 'Years of low interest rates and rising home prices created the widespread belief that real estate values could never drop on a nationwide basis. Lenders stopped verifying borrower income because they believed the appreciating house could always be refinanced. This created George Soros’ Reflexivity: lax lending pushed prices higher, which appeared to justify the lax lending. When the Federal Reserve raised rates from 1.0% to 5.25%, adjustable-rate mortgage payments jumped, triggering foreclosures, destroying CDO liquidity, and halting interbank lending.',
    consequences: 'Over $10 Trillion in global household wealth evaporated; sovereign central banks injected trillions in emergency liquidity (Quantitative Easing), permanently altering global monetary policy.',
    whatCouldBeNoticedEarlier: '1. Non-traditional loan products (No-Doc "Ninja" loans, negative amortization) comprising over 30% of new originations.\n2. Mortgage debt to household disposable income reaching historic extremes (> 130%).\n3. Financial institutions relying on overnight repo wholesale borrowing rather than stable retail deposits to fund 30-year illiquid assets.',
    timeline: [
      { phase: '2001–2003', title: 'Displacement & Cheap Credit', description: 'Fed cuts interest rates to 1%; capital rushes into real estate yields.', indicator: 'Mortgage origination volumes double.' },
      { phase: '2004–2005', title: 'Speculative Leverage Expansion', description: 'Subprime securitization flourishes; Wall Street leverage ratios exceed 30:1.', indicator: 'House flipping becomes a mainstream cable television genre.' },
      { phase: '2006', title: 'Ponzi Stage / Climax Top', description: 'Borrowers can only service interest by relying on ever-higher asset refinancing.', indicator: 'Home price appreciation stalls; housing inventory begins ticking upward.' },
      { phase: '2007–2008', title: 'The Minsky Moment & Liquidation', description: 'BNP Paribas freezes subprime funds; Lehman Brothers collapses; credit markets seize.', indicator: 'Bid-ask spreads on structured bonds widen to infinity.' }
    ],
    keyTakeaway: 'Stability is destabilizing. When an economic system feels safe for too long, participants borrow more until the smallest shock causes systemic collapse.',
    visualType: 'bubble'
  },
  {
    id: 'case-ev-inflection',
    number: '04',
    title: 'The EV Tipping Point',
    subtitle: 'How S-Curves and Infrastructure Networks Combine',
    category: 'technology',
    patternId: 'network-effects',
    summary: 'When a capital-intensive product overcomes the chicken-and-egg infrastructure deficit, network effects and Wright’s Law manufacturing cost curves reinforce each other into rapid market takeover.',
    observation: 'In Norway, electric vehicles represented 3% of new car sales in 2012. By 2023, electric vehicles surpassed 85% of all new car sales, rendering traditional internal combustion gas stations commercially unviable in major cities.',
    patternDetected: 'Cross-Sided Infrastructure Network Effects + Wright’s Law Battery Deflation',
    whyItHappened: 'Early EV adoption was paralyzed by the "Range Anxiety" barrier: drivers wouldn’t buy EVs without chargers, and private companies wouldn’t build chargers without drivers. Government tax incentives kick-started the initial 5% cohort. Once charger density reached critical mass, fast charging stations became profitable private businesses. Concurrently, battery cell costs fell from $1,100/kWh in 2010 to under $130/kWh in 2023, making total cost of ownership superior to gasoline.',
    consequences: 'Legacy automotive supply chains centered around pistons, gearboxes, and catalytic converters faced mass restructuring, while battery gigafactories and charging software platforms became the new geopolitical energy choke points.',
    whatCouldBeNoticedEarlier: '1. Tracking the 5% inflection point: across 20+ countries, once EV sales cross 5%, they consistently reach 25% within 4 years.\n2. The exponential decline in battery cost per kilowatt-hour plotted on logarithmic scales.\n3. The positive feedback loop where higher EV volume increases charging station utilization, which lowers charge pricing for drivers.',
    timeline: [
      { phase: '2010–2014', title: 'The Cold Start Problem', description: 'High vehicle purchase price; scarce roadside chargers; niche early tech adopters.', indicator: 'EV share < 2%.' },
      { phase: '2015–2018', title: 'Crossing the 5% Chasm', description: 'Public fast-charging networks expand; battery pack range exceeds 200 miles.', indicator: 'Charging station network density crosses urban threshold.' },
      { phase: '2019–2023', title: 'Mainstream S-Curve Acceleration', description: 'Mass-market models launch; total cost of ownership becomes cheaper than gas.', indicator: 'EV share surges from 15% to 85% in leading regions.' },
      { phase: '2024+', title: 'Legacy Infrastructure Stranding', description: 'Gas stations convert pumps to high-speed DC chargers to maintain convenience store footfall.', indicator: 'Internal combustion resale values depreciate faster than historical averages.' }
    ],
    keyTakeaway: 'Infrastructure-dependent products cannot be evaluated by vehicle unit costs alone; their adoption velocity is governed by the geographic density of the supporting network.',
    visualType: 'network'
  },
  {
    id: 'case-delhi-cobra',
    number: '05',
    title: 'The Cobra Effect: Perverse Incentives',
    subtitle: 'How Well-Intentioned Proxies Destroy Strategic Goals',
    category: 'society',
    patternId: 'incentive-loop',
    summary: 'When a management team or government measures success using a crude proxy metric, intelligent actors optimize for the proxy rather than the underlying purpose, often exacerbating the original crisis.',
    observation: 'In British colonial Delhi, the government sought to eliminate venomous cobras. They instituted a cash bounty for every dead cobra turned into local administrative offices. The policy was initially celebrated as a triumph as thousands of dead snakes were collected daily. Yet after 12 months, the city was overrun with more wild cobras than had ever existed in historical records.',
    patternDetected: 'Goodhart’s Law + Perverse Second-Order Incentive Loops',
    whyItHappened: 'Entrepreneurs realized it was far cheaper, safer, and more lucrative to breed hundreds of cobras in indoor wooden boxes and slaughter them for bounties than to hunt wild snakes in the jungle. When British officials discovered that people were running commercial cobra farms, they abruptly shut down the bounty program. The breeders immediately released thousands of newborn, venomous cobras into city parks because they had zero market value, flooding the streets with apex predators.',
    consequences: 'The policy cost the colonial treasury enormous sums of silver, eroded public trust, and resulted in a permanent increase in civilian snakebites.',
    whatCouldBeNoticedEarlier: '1. The volume of dead cobras submitted each month continued to rise exponentially rather than decreasing as wild populations shrank.\n2. The physical condition of submitted snakes showed zero wounds from wild capture (they were cleanly farmed).\n3. Recognizing that rewarding an output artifact (dead body) incentivizes the production of the artifact, not the reduction of the living population.',
    timeline: [
      { phase: 'Month 1', title: 'Policy Enacted', description: 'Bounty announced; initial hunters collect easy wild cobras in gardens.', indicator: 'First 500 bounties paid; praise in colonial newspapers.' },
      { phase: 'Month 3–6', title: 'Industrial Farming Optimization', description: 'Cobra breeding farms emerge; daily snake submissions multiply tenfold.', indicator: 'Bounty payouts exceed annual budget by 300%.' },
      { phase: 'Month 9', title: 'Discovery of Fraud', description: 'Inspectors discover backyard breeding compounds; authorities cancel the bounty.', indicator: 'Government realizes the metric was uncoupled from wild eradication.' },
      { phase: 'Month 10', title: 'The Toxic Release', description: 'Breeders dump worthless snakes into residential neighborhoods; wild bite rates surge.', indicator: 'Citywide cobra population reaches all-time historical high.' }
    ],
    keyTakeaway: 'Never reward the visible evidence of a solved problem if human agents have the ability to manufacture the evidence directly.',
    visualType: 'second_order'
  }
];

export const getCaseStudyById = (id: string): CaseStudy | undefined => {
  return CASE_STUDIES.find(c => c.id === id);
};
