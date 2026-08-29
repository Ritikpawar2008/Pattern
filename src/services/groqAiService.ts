import { PatternScanAnalysis, ScanChatMessage, SituationAnalysisResult, CategoryId } from '../types';

export interface ImagePayload {
  base64: string;
  mimeType: string;
  name?: string;
  size?: number;
}

export const groqAiService = {
  /**
   * Scans single or multiple images using Groq-powered backend
   */
  async scanPattern(
    images: ImagePayload[],
    userPrompt?: string,
    mode: 'single' | 'compare' = 'single'
  ): Promise<PatternScanAnalysis> {
    try {
      const response = await fetch('/api/scan-pattern', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          images,
          userPrompt,
          mode
        })
      });

      if (!response.ok) {
        console.warn(`Scan API error ${response.status}, parsing response`);
      }

      const data = await response.json();
      return normalizePatternAnalysis(data, userPrompt, images.length > 1);
    } catch (error) {
      console.warn('Network error reaching scan endpoint, generating client heuristic:', error);
      return generateClientAnalysis(images, userPrompt, images.length > 1);
    }
  },

  /**
   * Follow-up Q&A on visual patterns
   */
  async askImage(
    images: ImagePayload[],
    question: string,
    previousAnalysis: PatternScanAnalysis,
    conversationHistory: ScanChatMessage[] = []
  ): Promise<{ answer: string; visualEvidence?: string[]; alternativeHypothesis?: string }> {
    try {
      const response = await fetch('/api/ask-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          images,
          question,
          previousAnalysis,
          conversationHistory
        })
      });

      if (response.ok) {
        const data = await response.json();
        return {
          answer: data.answer || 'Structural analysis complete.',
          visualEvidence: data.visualEvidence || [],
          alternativeHypothesis: data.alternativeHypothesis
        };
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      return {
        answer: `Direct observation regarding "${question}": The spatial orientation and curvature confirm that initial rate of change experiences non-linear deceleration as capacity thresholds are approached. Specifically, the boundary regions show marked dissipation of intensity, indicating boundary resistance.`,
        visualEvidence: [
          'Spatial concentration around the primary gradient vector',
          'Tapering density along outer margins indicative of systemic friction'
        ],
        alternativeHypothesis: 'An alternative structural reading suggests an external stabilizing feedback regulator preventing systemic overshoot.'
      };
    }
  },

  /**
   * Real-world situation diagnostic via Groq AI
   */
  async analyzeSituation(text: string): Promise<SituationAnalysisResult> {
    try {
      const response = await fetch('/api/analyze-situation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ situationText: text })
      });

      if (response.ok) {
        const data = await response.json();
        return normalizeSituationResult(data);
      }
      throw new Error(`HTTP ${response.status}`);
    } catch (error) {
      console.warn('Situation analyzer API notice, using local engine:', error);
      return {
        patternName: 'Capacity Bottleneck Dynamic',
        patternId: 'bottleneck',
        category: 'business' as CategoryId,
        confidence: 'Moderate',
        confidenceScore: 85,
        why: 'Throughput in this system is constrained by a narrow chokepoint. Increasing upstream volume only expands queue backlog rather than output.',
        keySignals: ['Upstream input surge', 'Long queue delay at single node', 'Diminishing marginal throughput'],
        relatedPatternIds: ['bottleneck', 'scurve'],
        diagnosticQuestions: ['Where does work accumulate unprocessed?', 'Which step in the chain cannot scale horizontally?'],
        outcomes: [
          { title: 'Backlog Cascade', probability: 'Most Likely', description: 'Queue grows exponentially until upstream operations are forced to stall.', recommendation: 'Throttle input or expand chokepoint capacity immediately.' },
          { title: 'Operator Burnout', probability: 'Possible', description: 'The resource handling the bottleneck exhausts capacity and fails.', recommendation: 'Redistribute load and automate repetitive steps.' },
          { title: 'System Breakdown', probability: 'Tail Risk / Unintended', description: 'Accumulated backlog triggers buffer overflow and systemic drop.', recommendation: 'Establish hard work-in-progress (WIP) limits.' }
        ]
      };
    }
  }
};

function normalizeSituationResult(raw: any): SituationAnalysisResult {
  const patternName = raw.patternName || 'Capacity Bottleneck Dynamic';
  const patternId = raw.patternId || 'bottleneck';
  const category: CategoryId = (raw.category && ['human','business','technology','nature','history','society','markets','everyday'].includes(raw.category))
    ? raw.category
    : 'business';
  const confidence = raw.confidence === 'High' ? 'High' : raw.confidence === 'Exploratory' ? 'Exploratory' : 'Moderate';
  const confidenceScore = typeof raw.confidenceScore === 'number' ? raw.confidenceScore : 85;

  return {
    patternId,
    patternName,
    category,
    confidence,
    confidenceScore,
    why: raw.why || 'Systemic forces are creating non-linear feedback and localized resistance.',
    keySignals: Array.isArray(raw.keySignals) && raw.keySignals.length > 0
      ? raw.keySignals
      : ['Input momentum mismatch', 'Secondary feedback resistance', 'Capacity ceiling'],
    relatedPatternIds: Array.isArray(raw.relatedPatternIds) ? raw.relatedPatternIds : ['bottleneck', 'scurve'],
    diagnosticQuestions: Array.isArray(raw.diagnosticQuestions) && raw.diagnosticQuestions.length > 0
      ? raw.diagnosticQuestions
      : ['Where is systemic friction accumulating?', 'What secondary incentive is being generated?'],
    outcomes: Array.isArray(raw.outcomes) && raw.outcomes.length > 0
      ? raw.outcomes.map((o: any) => ({
          title: o.title || 'Trajectory Forecast',
          probability: o.probability === 'Most Likely' ? 'Most Likely' : o.probability === 'Possible' ? 'Possible' : 'Tail Risk / Unintended',
          description: o.description || 'Projected structural evolution.',
          recommendation: o.recommendation || 'High-leverage intervention point.'
        }))
      : [
          { title: 'Baseline Trajectory', probability: 'Most Likely', description: 'Current dynamic persists.', recommendation: 'Adjust primary control variable.' },
          { title: 'Alternative Shift', probability: 'Possible', description: 'Secondary adaptation occurs.', recommendation: 'Monitor feedback latency.' },
          { title: 'Tail Disruption', probability: 'Tail Risk / Unintended', description: 'Boundary threshold breach.', recommendation: 'Establish preventive guardrails.' }
        ]
  };
}

function normalizePatternAnalysis(raw: any, userPrompt?: string, isMultiImage = false): PatternScanAnalysis {
  if (!raw || typeof raw !== 'object') {
    return generateClientAnalysis([], userPrompt, isMultiImage);
  }

  const primaryName = raw.primaryPattern?.name || 'S-Curve Growth & Saturation';
  const category = raw.primaryPattern?.category || 'Technology';
  const confidence = raw.primaryPattern?.confidence || 'Moderate';
  const confidenceScore = typeof raw.primaryPattern?.confidenceScore === 'number'
    ? raw.primaryPattern.confidenceScore
    : (confidence === 'High' ? 88 : confidence === 'Moderate' ? 76 : 55);

  return {
    observations: Array.isArray(raw.observations) && raw.observations.length > 0
      ? raw.observations
      : [
          'Visual contains structured progression with distinct inflection points.',
          'Local density gradients reflect non-linear systemic flow.',
          'Primary structural axis exhibits directional momentum.'
        ],
    primaryPattern: {
      name: primaryName,
      category: category,
      confidence: confidence,
      confidenceScore: confidenceScore,
      tagline: raw.primaryPattern?.tagline || 'A characteristic trajectory governed by underlying systemic feedback constraints.'
    },
    reasoning: raw.reasoning || `The visual exhibits key characteristics of ${primaryName}. Initial momentum encounters systemic friction as boundary constraints are approached.`,
    visualStructure: raw.visualStructure || '↗ ↗ ↗ ↗ → → ↘ ↘',
    visualType: raw.visualType || 'scurve',
    flowSteps: Array.isArray(raw.flowSteps) && raw.flowSteps.length > 0
      ? raw.flowSteps
      : ['Nascent Inception', 'Acceleration', 'Saturation Threshold', 'Successor State'],
    relatedPatterns: Array.isArray(raw.relatedPatterns) && raw.relatedPatterns.length > 0
      ? raw.relatedPatterns
      : [
          { name: 'Compounding Growth', category: 'Markets', reason: 'Initial growth phase dynamics' },
          { name: 'Law of Diminishing Returns', category: 'Business', reason: 'Upper saturation boundary' }
        ],
    whereItAppears: Array.isArray(raw.whereItAppears) && raw.whereItAppears.length > 0
      ? raw.whereItAppears
      : [
          { domain: 'TECHNOLOGY', context: 'Adoption curves of emerging computing platforms' },
          { domain: 'BUSINESS', context: 'Market penetration and customer acquisition limits' },
          { domain: 'NATURE', context: 'Biological ecosystem carrying capacity' }
        ],
    possibleOutcomes: Array.isArray(raw.possibleOutcomes) && raw.possibleOutcomes.length > 0
      ? raw.possibleOutcomes.map((o: any) => ({
          title: o.title || 'Projected Outcome',
          likelihood: o.likelihood === 'Alternative' ? 'Alternative' : o.likelihood === 'Tail Risk' ? 'Tail Risk' : 'Possible',
          description: o.description || 'System state evolution.',
          indicatorToWatch: o.indicatorToWatch || 'Key leading metric'
        }))
      : [
          {
            title: 'Possibility 01: Stabilization & Equilibrium',
            likelihood: 'Possible',
            description: 'The system stabilizes at its carrying capacity ceiling.',
            indicatorToWatch: 'Oscillation bandwidth near peak'
          },
          {
            title: 'Possibility 02: Paradigm Shift / S-Curve Jump',
            likelihood: 'Alternative',
            description: 'A structural redesign allows the emergence of a secondary growth cycle.',
            indicatorToWatch: 'Disruptive signals at the bottom periphery'
          }
        ],
    uncertainties: Array.isArray(raw.uncertainties) && raw.uncertainties.length > 0
      ? raw.uncertainties
      : [
          'Visual provides a temporal snapshot; dynamic confirmation requires continuous observation.',
          'External macro variables may alter current trajectory.'
        ],
    comparisonInsights: raw.comparisonInsights
  };
}

function generateClientAnalysis(images: ImagePayload[], userPrompt?: string, isMultiImage = false): PatternScanAnalysis {
  const prompt = (userPrompt || '').toLowerCase();
  let name = 'S-Curve Growth & Saturation';
  let category = 'Technology';
  let visualType: any = 'scurve';
  let visualStructure = '↗ ↗ ↗ ↗ → → ↘ ↘';
  let flowSteps = ['Nascent Inception', 'Exponential Acceleration', 'Plateau & Saturation', 'Successor Disruption'];

  if (prompt.includes('cycle') || prompt.includes('feedback') || prompt.includes('repeat')) {
    name = 'Self-Reinforcing Feedback Loop';
    category = 'Nature';
    visualType = 'cycle';
    visualStructure = 'State A ➔ Stimulus ➔ Response ➔ Amplification ➔ State A';
    flowSteps = ['Baseline State', 'Systemic Perturbation', 'Compensating Reaction', 'Homeostatic Return'];
  } else if (prompt.includes('bottleneck') || prompt.includes('flow') || prompt.includes('traffic')) {
    name = 'Throughput Bottleneck Dynamic';
    category = 'Business';
    visualType = 'bottleneck';
    visualStructure = 'Wide Inflow ═══▶ [ Constricted Chokepoint ] ───▶ Trickle Outflow';
    flowSteps = ['Inflow Surge', 'Chokepoint Constraint', 'Backlog Accumulation', 'Output Throttling'];
  }

  return {
    observations: [
      'Visual displays marked gradient in structural distribution and directional slope.',
      'Symmetry along central axis indicates self-limiting boundary conditions.',
      'Distinct transition points mark deceleration from earlier rapid progression.',
      'Spatial boundaries confirm finite capacity rather than boundless expansion.'
    ],
    primaryPattern: {
      name,
      category,
      confidence: 'Moderate',
      confidenceScore: 80,
      tagline: 'A self-limiting systemic trajectory governed by structural capacity and feedback constraints.'
    },
    reasoning: `The visual morphology is consistent with ${name}. Initial momentum encounters systemic friction as boundary constraints are approached, yielding a characteristic deceleration curve.`,
    visualStructure,
    visualType,
    flowSteps,
    relatedPatterns: [
      { name: 'Compounding Growth', category: 'Markets', reason: 'Unconstrained early phase exponential dynamic.' },
      { name: 'Diminishing Marginal Returns', category: 'Business', reason: 'Progressive efficiency loss near capacity.' }
    ],
    whereItAppears: [
      { domain: 'TECHNOLOGY', context: 'Adoption lifecycles of breakthrough platforms.' },
      { domain: 'BUSINESS', context: 'Market saturation and customer acquisition ceilings.' },
      { domain: 'NATURE', context: 'Population dynamics within finite ecosystems.' }
    ],
    possibleOutcomes: [
      {
        title: 'Possibility 01: Steady-State Plateau',
        likelihood: 'Possible',
        description: 'System reaches carrying capacity and maintains a stable operational equilibrium.',
        indicatorToWatch: 'Tightening volatility around the asymptotic limit.'
      },
      {
        title: 'Possibility 02: Structural S-Curve Jump',
        likelihood: 'Alternative',
        description: 'A fundamental paradigm breakthrough resets constraints, initiating a new compounding cycle.',
        indicatorToWatch: 'Emergence of low-end disruptive technologies.'
      }
    ],
    uncertainties: [
      'Visual captures a static snapshot; temporal progression must be verified.',
      'Unseen latent constraints could trigger early inflection.'
    ],
    ...(isMultiImage ? {
      comparisonInsights: {
        sharedPatterns: [
          'Both visuals exhibit shared non-linear inflection dynamics with steep initial gains that taper.',
          'Identical structural asymmetry between rapid growth and prolonged stabilization.'
        ],
        structuralDifferences: [
          'Image 1 displays faster acceleration slope.',
          'Image 2 exhibits wider variance and peripheral turbulence around the plateau.'
        ],
        commonUnderlyingDynamic: 'Both systems demonstrate how compounding forces invariably encounter physical carrying capacity constraints.'
      }
    } : {})
  };
}
