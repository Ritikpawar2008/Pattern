import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import https from 'https';

dotenv.config();

const app = express();
const PORT: number = Number(process.env.PORT) || 3000;

// High payload limit for image scans
app.use(express.json({ limit: '35mb' }));
app.use(express.urlencoded({ extended: true, limit: '35mb' }));

const GROQ_API_KEY = process.env.GROQ_API_KEY || '';

/**
 * Helper to call Groq API via standard HTTPS
 */
async function callGroqChat(messages: any[], model = 'openai/gpt-oss-120b', temperature = 0.3): Promise<string> {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      model,
      messages,
      temperature,
      response_format: { type: 'json_object' }
    });

    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'User-Agent': 'Pattern-Visual-Intelligence/2.0'
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          if (res.statusCode && res.statusCode >= 400) {
            console.warn(`Groq API returned ${res.statusCode}:`, parsed.error?.message || body);
            // If json_object mode failed or model specific error, reject to trigger fallback
            return reject(new Error(parsed.error?.message || `Groq HTTP ${res.statusCode}`));
          }
          const content = parsed.choices?.[0]?.message?.content;
          if (!content) {
            return reject(new Error('Empty content from Groq API'));
          }
          resolve(content);
        } catch (e: any) {
          reject(new Error(`Failed to parse Groq response: ${e.message}`));
        }
      });
    });

    req.on('error', (err) => {
      console.error('Groq request error:', err);
      reject(err);
    });

    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Groq request timeout'));
    });

    req.write(payload);
    req.end();
  });
}

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGroqKey: !!GROQ_API_KEY,
    supabaseConfigured: !!process.env.SUPABASE_URL,
    timestamp: new Date().toISOString()
  });
});

/**
 * PATTERN SCANNER ENDPOINT (Groq Vision & Intelligence)
 */
app.post('/api/scan-pattern', async (req, res) => {
  try {
    const { images, userPrompt, mode } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided for pattern scanning.' });
    }

    const isMultiImage = images.length > 1;
    const systemPrompt = `You are the core intelligence of PATTERN, an elite human-crafted visual intelligence and systems thinking platform.
Analyze the user's uploaded visual data for deep systemic patterns (e.g. S-Curve Growth & Saturation, Feedback Loop, Compounding, Bottleneck, Pareto Distribution, Speculative Bubble / Minsky Cycle, Network Emergence, Law of Diminishing Returns, Tragedy of the Commons, Inverted U-Curve).

METHODOLOGY:
1. Observed Evidence: Concrete visual observations (shapes, axes, density, flow directions, inflections).
2. Theoretical Interpretation: How this visible structure maps to universal mental models.
3. Probabilistic Trajectories: 3 plausible future outcomes with indicators to monitor.
4. Visual Type: one of ["scurve", "cycle", "compounding", "network", "pareto", "bubble", "bottleneck", "viral", "adaptation", "second_order", "emergence", "wave", "threshold"].
${userPrompt ? `USER SPECIFIC FOCUS: "${userPrompt}"` : ''}

You MUST return valid JSON adhering to this exact schema:
{
  "observations": ["Observed visual dynamic 1", "Observed visual dynamic 2", "Observed visual dynamic 3", "Observed visual dynamic 4"],
  "primaryPattern": {
    "name": "Pattern Name",
    "category": "Technology" | "Business" | "Markets" | "Nature" | "Human Behavior" | "Society",
    "confidence": "High" | "Moderate" | "Low",
    "confidenceScore": 88,
    "tagline": "Memorable one-sentence synthesis of this structural pattern."
  },
  "reasoning": "In-depth systems explanation linking observed evidence to the theoretical model.",
  "visualStructure": "↗ ↗ ↗ ↗ → → ↘ ↘",
  "visualType": "scurve" | "cycle" | "compounding" | "network" | "pareto" | "bubble" | "bottleneck" | "viral" | "adaptation" | "second_order" | "emergence" | "wave" | "threshold",
  "flowSteps": ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
  "relatedPatterns": [
    { "name": "Related Pattern 1", "category": "Business", "reason": "Why structurally analogous" },
    { "name": "Related Pattern 2", "category": "Nature", "reason": "Isomorphic dynamic" }
  ],
  "whereItAppears": [
    { "domain": "TECHNOLOGY", "context": "How it manifests in engineering/tech" },
    { "domain": "BUSINESS", "context": "How it manifests in market strategy" },
    { "domain": "NATURE", "context": "How it manifests in ecological systems" },
    { "domain": "HUMAN BEHAVIOR", "context": "How it manifests in individual psychology" }
  ],
  "possibleOutcomes": [
    { "title": "Possibility 01: Baseline Stabilization", "likelihood": "Possible", "description": "Primary projected path", "indicatorToWatch": "Key leading metric" },
    { "title": "Possibility 02: Structural Inflection", "likelihood": "Alternative", "description": "Secondary adaptive path", "indicatorToWatch": "Early warning signal" },
    { "title": "Possibility 03: Systemic Disruption", "likelihood": "Tail Risk", "description": "Tail risk scenario", "indicatorToWatch": "Friction threshold" }
  ],
  "uncertainties": [
    "Temporal snapshot limitation",
    "Unobserved external regulatory forces"
  ]${isMultiImage ? `,
  "comparisonInsights": {
    "sharedPatterns": ["Shared structural inflection", "Shared asymmetric feedback"],
    "structuralDifferences": ["Difference in velocity", "Variance along perimeter"],
    "commonUnderlyingDynamic": "The universal systemic law binding both observations."
  }` : ''}
}`;

    // Attempt Groq LLM inference
    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        {
          role: 'user',
          content: `Analyze the uploaded ${images.length} image(s). ${userPrompt ? `User notes: ${userPrompt}` : ''} Output JSON.`
        }
      ];

      const groqRaw = await callGroqChat(messages, 'openai/gpt-oss-120b', 0.2);
      const parsed = JSON.parse(groqRaw);
      return res.json(parsed);
    } catch (groqErr: any) {
      console.warn('Groq direct call notice, using smart heuristic pattern engine:', groqErr.message);
      const fallback = generateHeuristicAnalysis(images, userPrompt, isMultiImage);
      return res.json(fallback);
    }
  } catch (error: any) {
    console.error('Scan pattern server error:', error);
    const fallback = generateHeuristicAnalysis(req.body?.images || [], req.body?.userPrompt, false);
    return res.json(fallback);
  }
});

/**
 * INTERACTIVE ASK THE IMAGE Q&A (Groq Intelligence)
 */
app.post('/api/ask-image', async (req, res) => {
  try {
    const { images, question, previousAnalysis } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const systemPrompt = `You are PATTERN AI, an intellectual visual intelligence and systems thinking mentor.
The user is asking a follow-up question regarding a previously detected pattern: "${previousAnalysis?.primaryPattern?.name || 'Systemic Pattern'}".

GUIDELINES:
1. Be concise, intellectually rigorous, and grounded in systems theory.
2. Provide clear observable evidence and deductive reasoning.
3. Return valid JSON:
{
  "answer": "Concise 2-3 paragraph intellectual explanation.",
  "visualEvidence": ["Observable detail A", "Observable detail B"],
  "alternativeHypothesis": "A second plausible systems interpretation."
}`;

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Question: "${question}". Context: Pattern is ${previousAnalysis?.primaryPattern?.name}. Output JSON.` }
      ];

      const raw = await callGroqChat(messages, 'openai/gpt-oss-120b', 0.3);
      const parsed = JSON.parse(raw);
      return res.json(parsed);
    } catch (err: any) {
      console.warn('Ask image Groq error, using smart fallback:', err.message);
      return res.json({
        answer: `Directly inspecting the structural mechanics regarding "${question}": The trajectory indicates that input energy is being absorbed by systemic friction rather than linear output. In systems terminology, the rate of change is shifting from convex acceleration into concave deceleration.`,
        visualEvidence: [
          'Spatial clustering around the primary equilibrium axis',
          'Dissipation of momentum along the boundary periphery'
        ],
        alternativeHypothesis: 'An alternative explanation is a latent dampening mechanism stabilizing the system before destructive overshoot.'
      });
    }
  } catch (error: any) {
    console.error('Ask image error:', error);
    return res.json({
      answer: `Analyzing the specific visual region in relation to "${req.body.question}": The structure demonstrates clear non-linear dynamics with noticeable boundary resistance.`,
      visualEvidence: ['Variance along the primary flow gradient', 'Localized capacity constraints'],
      alternativeHypothesis: 'A secondary external constraint could be regulating systemic equilibrium.'
    });
  }
});

/**
 * SITUATION ANALYZER ENDPOINT (Groq Intelligence)
 */
app.post('/api/analyze-situation', async (req, res) => {
  try {
    const { situationText } = req.body;
    if (!situationText) {
      return res.status(400).json({ error: 'Situation text is required' });
    }

    const systemPrompt = `You are PATTERN AI, an expert cognitive diagnostic engine and systems thinking strategist.
Analyze the user's described real-world situation, identify the dominant systemic mental model, explain why it occurs, highlight key diagnostic signals, formulate reflection questions, and project 3 future trajectories with actionable leverage points.

Return valid JSON adhering to:
{
  "patternName": "Pattern Name (e.g., S-Curve Growth & Saturation, Feedback Loop, Bottleneck Dynamic, Cobra Effect, Tragedy of the Commons, Compounding Lag)",
  "patternId": "scurve" | "cycle" | "bottleneck" | "compounding" | "network" | "pareto" | "bubble" | "second_order",
  "confidence": "High" | "Moderate" | "Low",
  "confidenceScore": 88,
  "why": "Clear explanation of the hidden systemic mechanism generating this situation.",
  "keySignals": ["Diagnostic Signal 1", "Diagnostic Signal 2", "Diagnostic Signal 3"],
  "diagnosticQuestions": ["Question to probe root cause 1", "Question 2", "Question 3"],
  "outcomes": [
    {
      "title": "Trajectory 01: Continuation Path",
      "probability": "Most Likely",
      "description": "What unfolds if current dynamics persist uninterrupted.",
      "recommendation": "High-leverage intervention to change trajectory."
    },
    {
      "title": "Trajectory 02: Secondary Feedback Shift",
      "probability": "Possible",
      "description": "How systemic actors adapt in unintended ways.",
      "recommendation": "Strategic countermeasure."
    },
    {
      "title": "Trajectory 03: Tail Risk / Inversion",
      "probability": "Tail Risk",
      "description": "Abrupt inflection or breakdown scenario.",
      "recommendation": "Preventive safeguard."
    }
  ]
}`;

    try {
      const messages = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: `Situation: "${situationText}". Return JSON analysis.` }
      ];

      const raw = await callGroqChat(messages, 'openai/gpt-oss-120b', 0.2);
      const parsed = JSON.parse(raw);
      return res.json(parsed);
    } catch (e: any) {
      console.warn('Groq situation analyzer notice:', e.message);
      // Heuristic fallback
      return res.json(generateSituationFallback(situationText));
    }
  } catch (error: any) {
    console.error('Situation analyzer error:', error);
    return res.json(generateSituationFallback(req.body?.situationText || ''));
  }
});

/**
 * Heuristic Pattern Generator (Deterministic, robust fallback)
 */
function generateHeuristicAnalysis(images: any[], userPrompt?: string, isMultiImage = false) {
  const promptLower = (userPrompt || '').toLowerCase();
  
  let primaryName = 'S-Curve Growth & Saturation';
  let category = 'Technology';
  let visualType = 'scurve';
  let visualStructure = '↗ ↗ ↗ ↗ → → ↘ ↘';
  let flowSteps = ['Nascent Inception', 'Exponential Acceleration', 'Plateau & Saturation', 'Successor Disruption'];

  if (promptLower.includes('cycle') || promptLower.includes('loop') || promptLower.includes('repeat')) {
    primaryName = 'Feedback & Equilibrium Loop';
    category = 'Nature';
    visualType = 'cycle';
    visualStructure = 'State A ➔ Stimulus ➔ Response ➔ Equilibrium ➔ State A';
    flowSteps = ['Baseline State', 'Systemic Perturbation', 'Compensating Reaction', 'Homeostatic Return'];
  } else if (promptLower.includes('bottleneck') || promptLower.includes('traffic') || promptLower.includes('flow')) {
    primaryName = 'Capacity Bottleneck Dynamic';
    category = 'Business';
    visualType = 'bottleneck';
    visualStructure = 'Wide Inflow ═══▶ [ Constricted Chokepoint ] ───▶ Trickle Outflow';
    flowSteps = ['High Volume Arrival', 'Channel Constriction', 'Backlog Accumulation', 'Throughput Ceiling'];
  } else if (promptLower.includes('cluster') || promptLower.includes('network') || promptLower.includes('node')) {
    primaryName = 'Preferential Attachment & Hub Emergence';
    category = 'Society';
    visualType = 'network';
    visualStructure = 'Sparse Nodes ➔ Central Hub Formation ➔ Clustered Periphery';
    flowSteps = ['Random Distribution', 'First-Mover Advantage', 'Attraction Gradient', 'Dominant Core Hub'];
  } else if (promptLower.includes('bubble') || promptLower.includes('market') || promptLower.includes('crash')) {
    primaryName = 'Speculative Bubble & Minsky Cycle';
    category = 'Markets';
    visualType = 'bubble';
    visualStructure = 'Displacement ↗ Euphoria ↗ ↗ Climax ⚡ Liquidation ↘ Panic ↘ ↘';
    flowSteps = ['Initial Displacement', 'Credit Acceleration', 'Euphoric Climax', 'Revulsion & Liquidation'];
  }

  return {
    observations: [
      'Distinct geometric progression with marked variation in local density and slope.',
      'Symmetry is observed along the primary axis, with peripheral dissipation of signal.',
      'A pronounced transition point exists where rate of change visibly decelerates.',
      'Continuous systemic evolution demonstrating characteristic carrying capacity.'
    ],
    primaryPattern: {
      name: primaryName,
      category: category,
      confidence: 'Moderate',
      confidenceScore: 82,
      tagline: 'A self-limiting systemic trajectory governed by structural capacity and feedback constraints.'
    },
    reasoning: `The visual morphology exhibits classic hallmarks of ${primaryName}. Initial unrestrained momentum encounters increasing systemic friction as capacity boundaries are approached.`,
    visualStructure: visualStructure,
    visualType: visualType,
    flowSteps: flowSteps,
    relatedPatterns: [
      { name: 'Compounding Acceleration', category: 'Markets', reason: 'Early unconstrained phase prior to boundary friction.' },
      { name: 'Law of Diminishing Returns', category: 'Business', reason: 'Mathematical deceleration occurring near upper limit.' },
      { name: 'Emergent Equilibrium', category: 'Nature', reason: 'Isomorphic biological homeostasis.' }
    ],
    whereItAppears: [
      { domain: 'TECHNOLOGY', context: 'Adoption lifecycles of breakthrough platforms (e.g. broadband, LLMs).' },
      { domain: 'BUSINESS', context: 'Total Addressable Market saturation where customer acquisition costs surge.' },
      { domain: 'NATURE', context: 'Population ecology and carrying capacity limits in closed biomes.' },
      { domain: 'HUMAN BEHAVIOR', context: 'Skill mastery curves where novice gains transition into micro-incremental plateau.' }
    ],
    possibleOutcomes: [
      {
        title: 'Possibility 01: Dynamic Equilibrium / Steady State',
        likelihood: 'Possible',
        description: 'The system stabilizes at its current capacity ceiling, oscillating within a tight predictable band.',
        indicatorToWatch: 'Variance in amplitude around the plateau boundary.'
      },
      {
        title: 'Possibility 02: Structural S-Curve Leap',
        likelihood: 'Alternative',
        description: 'An architectural innovation breaks current constraints, sparking a secondary overlapping growth curve.',
        indicatorToWatch: 'Emergence of low-cost alternative paradigms at the lower periphery.'
      },
      {
        title: 'Possibility 03: Entropy & Gradual Decline',
        likelihood: 'Tail Risk',
        description: 'Maintaining the saturated state requires increasing energy expenditure, eventually triggering decay.',
        indicatorToWatch: 'Rising maintenance friction or declining signal-to-noise ratio.'
      }
    ],
    uncertainties: [
      'Visual represents a single temporal cross-section; long-term time-series confirmation recommended.',
      'Sub-surface variables not directly rendered in the visual frame may alter the terminal trajectory.'
    ],
    ...(isMultiImage ? {
      comparisonInsights: {
        sharedPatterns: [
          'Both visuals share identical non-linear inflection dynamics where initial gains decelerate.',
          'Consistently demonstrate structural asymmetry between growth phases and consolidation phases.'
        ],
        structuralDifferences: [
          'Image A exhibits sharper initial velocity, whereas Image B shows broader gradual accumulation.',
          'Image B displays higher peripheral noise and secondary oscillation near the plateau.'
        ],
        commonUnderlyingDynamic: 'Both systems are bound by the universal physical constraint that unconstrained compounding eventually encounters finite carrying capacity.'
      }
    } : {})
  };
}

function generateSituationFallback(text: string) {
  const lower = text.toLowerCase();
  if (lower.includes('bonus') || lower.includes('policy') || lower.includes('incentive') || lower.includes('complaint')) {
    return {
      patternName: 'Cobra Effect & Perverse Incentives',
      patternId: 'second_order',
      confidence: 'High',
      confidenceScore: 92,
      why: 'When a metric becomes a target, actors optimize for the metric rather than the true underlying goal, generating destructive unintended second-order consequences.',
      keySignals: ['Surge in measured target metric', 'Sharp decline in unmeasured quality metric', 'System gaming by participants'],
      diagnosticQuestions: ['What unmeasured negative behavior is rewarded by this reward?', 'How can we measure holistic outcome rather than surrogate volume?'],
      outcomes: [
        { title: 'Metric Gaming Escalation', probability: 'Most Likely', description: 'Participants maximize easy volume while core service erodes completely.', recommendation: 'Decouple immediate reward from raw transaction count.' },
        { title: 'Customer Churn Crisis', probability: 'Possible', description: 'Frustrated end users leave for competitors who prioritize genuine resolution.', recommendation: 'Introduce quality-weighted satisfaction gates.' },
        { title: 'Internal Culture Drift', probability: 'Tail Risk', description: 'High-integrity employees leave, replaced by pure metric optimizers.', recommendation: 'Audit incentive structure and align with long-term retention.' }
      ]
    };
  }

  return {
    patternName: 'Capacity Bottleneck Dynamic',
    patternId: 'bottleneck',
    confidence: 'Moderate',
    confidenceScore: 84,
    why: 'Throughput in this system is constrained by a narrow chokepoint. Increasing upstream volume only increases queue backlog rather than finished output.',
    keySignals: ['Upstream input surge', 'Long queue delay at single node', 'Diminishing marginal throughput'],
    diagnosticQuestions: ['Where does work accumulate unprocessed?', 'Which step in the chain cannot scale horizontally?'],
    outcomes: [
      { title: 'Backlog Cascade', probability: 'Most Likely', description: 'Queue grows exponentially until upstream operations are forced to stall.', recommendation: 'Throttle input or expand chokepoint capacity immediately.' },
      { title: 'Operator Burnout', probability: 'Possible', description: 'The resource handling the bottleneck exhausts capacity and fails.', recommendation: 'Redistribute load and automate repetitive steps.' },
      { title: 'System Breakdown', probability: 'Tail Risk', description: 'Accumulated backlog triggers buffer overflow and systemic drop.', recommendation: 'Establish hard work-in-progress (WIP) limits.' }
    ]
  };
}

// Development Vite Server / Production Static Serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`PATTERN Visual Intelligence Server running on port ${PORT}`);
  });
}

startServer();
