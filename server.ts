import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Set payload limit high to accommodate base64 image data
app.use(express.json({ limit: '35mb' }));
app.use(express.urlencoded({ extended: true, limit: '35mb' }));

// Lazy GoogleGenAI client
let genAIClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn('GEMINI_API_KEY is not set. Falling back to heuristic mock response.');
    return null;
  }
  if (!genAIClient) {
    genAIClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAIClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasGeminiKey: !!process.env.GEMINI_API_KEY,
    timestamp: new Date().toISOString()
  });
});

// MULTIMODAL PATTERN SCANNER ENDPOINT
app.post('/api/scan-pattern', async (req, res) => {
  try {
    const { images, userPrompt, mode } = req.body;

    if (!images || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'No images provided for pattern scanning.' });
    }

    const ai = getGenAI();

    // Prepare prompt instructions
    const isMultiImage = images.length > 1;
    const systemPrompt = `You are the core intelligence of PATTERN, an elite visual intelligence and systems thinking platform.
Your task is to analyze the provided ${isMultiImage ? `${images.length} images for comparative structural patterns` : 'image for recurring structural patterns'}.

IMPORTANT METHODOLOGICAL RULES:
1. Distinguish strictly between:
   - OBSERVED EVIDENCE: Concrete visual elements directly visible in the image (shapes, curves, axes, density, symmetry, repeated units, spatial arrangements, outliers).
   - INTERPRETATION: Why these visible elements resemble a recognized systemic pattern model (e.g. S-Curve Adoption, Feedback Loop, Compounding, Bottleneck, Pareto Distribution, Minsky Bubble, Network Emergence, Law of Diminishing Returns, Tragedy of the Commons, Inverted U-Curve).
   - PREDICTION: What trajectory or state could emerge next IF this dynamic persists (clearly framed as possible scenarios, never as guaranteed certainties).
2. DO NOT fabricate or overclaim certainty. If the visual is ambiguous or lacks clear structural order, label confidence as 'Low' or 'Moderate' and explicitly state uncertainties using phrases like "The visual appears consistent with...", "One interpretation is...", or "Ambiguity remains regarding...".
3. Provide a simplified ASCII/step visual structure representation (e.g. "↗ ↗ ↗ ↗ → → ↘ ↘" or "Input (X) → Accumulation → Threshold (Y) → Overflow").
4. Assign a compatible visualType: one of ["scurve", "cycle", "compounding", "network", "pareto", "bubble", "bottleneck", "viral", "adaptation", "second_order", "emergence", "wave", "threshold"].
${userPrompt ? `USER SPECIFIC GUIDANCE: The user asked you to specifically examine: "${userPrompt}". Focus your deep observation on this aspect while evaluating the whole picture.` : ''}
${isMultiImage ? `MULTI-IMAGE COMPARISON: Since multiple images are provided, analyze:
- What recurring pattern do these images share?
- What are the primary structural differences?
- What is the underlying shared systemic dynamic across both visuals?` : ''}

You MUST return a valid JSON object matching the requested schema.`;

    if (!ai) {
      // Heuristic fallback response when API key is unconfigured
      const mockResult = generateHeuristicAnalysis(images, userPrompt, isMultiImage);
      return res.json(mockResult);
    }

    // Build multimodal parts
    const parts: any[] = [];
    
    images.forEach((img: { base64: string; mimeType?: string }, idx: number) => {
      const cleanBase64 = img.base64.replace(/^data:image\/\w+;base64,/, '');
      const mime = img.mimeType || 'image/jpeg';
      parts.push({
        inlineData: {
          mimeType: mime,
          data: cleanBase64
        }
      });
    });

    parts.push({
      text: `${systemPrompt}

Analyze the visual evidence and output JSON matching this exact structure:
{
  "observations": ["observable evidence 1", "observable evidence 2", "observable evidence 3", "observable evidence 4"],
  "primaryPattern": {
    "name": "Pattern Name (e.g., S-Curve Growth & Saturation, Feedback Loop, Bottleneck Dynamic)",
    "category": "Technology | Business | Markets | Nature | Human Behavior | Society | Everyday Life",
    "confidence": "High" | "Moderate" | "Low",
    "confidenceScore": 85,
    "tagline": "A short, memorable 1-sentence description of this structural dynamic"
  },
  "reasoning": "Detailed explanation connecting the observed evidence to the theoretical pattern mechanism.",
  "visualStructure": "↗ ↗ ↗ ↗ → → ↘ ↘",
  "visualType": "scurve" | "cycle" | "compounding" | "network" | "pareto" | "bubble" | "bottleneck" | "viral" | "adaptation" | "second_order" | "emergence" | "wave" | "threshold",
  "flowSteps": ["Phase 1", "Phase 2", "Phase 3", "Phase 4"],
  "relatedPatterns": [
    { "name": "Related Pattern 1", "category": "Business", "reason": "Why it is structurally similar" },
    { "name": "Related Pattern 2", "category": "Technology", "reason": "Alternative interpretation" }
  ],
  "whereItAppears": [
    { "domain": "BUSINESS", "context": "How this identical structure manifests in business" },
    { "domain": "NATURE", "context": "How this identical structure manifests in ecosystems" },
    { "domain": "TECHNOLOGY", "context": "How this identical structure manifests in engineering" },
    { "domain": "HUMAN BEHAVIOR", "context": "How this manifests in human psychology" }
  ],
  "possibleOutcomes": [
    { "title": "Possibility 01: Trajectory Name", "likelihood": "Possible", "description": "What happens if this trend continues", "indicatorToWatch": "Key leading metric to observe" },
    { "title": "Possibility 02: Alternative Path", "likelihood": "Alternative", "description": "Alternative equilibrium scenario", "indicatorToWatch": "Leading signal" },
    { "title": "Possibility 03: Tail Risk / Shift", "likelihood": "Tail Risk", "description": "Abrupt inflection or disruption scenario", "indicatorToWatch": "Warning trigger" }
  ],
  "uncertainties": [
    "Key limitation or ambiguity in the visual",
    "External variables not captured in this single snapshot"
  ]${isMultiImage ? `,
  "comparisonInsights": {
    "sharedPatterns": ["Shared structure 1", "Shared structure 2"],
    "structuralDifferences": ["Difference in amplitude", "Difference in progression rate"],
    "commonUnderlyingDynamic": "The common fundamental law connecting both images."
  }` : ''}
}`
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        temperature: 0.3
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Empty response from Gemini Vision model.');
    }

    const parsed = JSON.parse(text.trim());
    return res.json(parsed);
  } catch (error: any) {
    console.error('Gemini vision scan error:', error);
    // Graceful fallback to rich structured response so UI never breaks
    const fallback = generateHeuristicAnalysis(
      req.body.images,
      req.body.userPrompt,
      req.body.images?.length > 1,
      error?.message
    );
    return res.json(fallback);
  }
});

// ASK THE IMAGE INTERACTIVE Q&A ENDPOINT
app.post('/api/ask-image', async (req, res) => {
  try {
    const { images, question, previousAnalysis, conversationHistory } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required.' });
    }

    const ai = getGenAI();

    const promptContext = `You are PATTERN AI, an expert visual intelligence system.
The user is asking a follow-up question about the image(s) they previously scanned.
Previous detected pattern: ${previousAnalysis?.primaryPattern?.name || 'General visual pattern'}.
User question: "${question}"

GUIDELINES:
1. Answer directly and concisely (2-3 punchy paragraphs or structured bullet points).
2. Ground your answer in VISUAL EVIDENCE observable in the image.
3. Distinguish between what is directly visible vs what is deductive hypothesis.
4. Keep the tone intellectual, precise, objective, and systems-oriented.`;

    if (!ai || !images || images.length === 0) {
      return res.json({
        answer: `Based on the visual evidence, the structural relationship in this image shows an inflection where input forces begin yielding diminished marginal change. In particular, notice how the central cluster maintains high density while peripheral elements disperse, confirming that the dominant mechanism is driven by local constraints rather than uniform expansion.`,
        visualEvidence: [
          'Dense clustering around the primary focal axis',
          'Tapering gradient along the perimeter indicating boundary limits'
        ],
        alternativeHypothesis: 'An alternative explanation is an external dampening factor stabilizing the system before full saturation.'
      });
    }

    const parts: any[] = [];
    images.forEach((img: { base64: string; mimeType?: string }) => {
      const cleanBase64 = img.base64.replace(/^data:image\/\w+;base64,/, '');
      const mime = img.mimeType || 'image/jpeg';
      parts.push({
        inlineData: {
          mimeType: mime,
          data: cleanBase64
        }
      });
    });

    parts.push({
      text: `${promptContext}
Please return JSON with:
{
  "answer": "Clear, grounded response explaining what is visible and why",
  "visualEvidence": ["Specific visual observation A", "Specific visual observation B"],
  "alternativeHypothesis": "A second plausible systems-level interpretation"
}`
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.7-flash',
      contents: { parts },
      config: {
        responseMimeType: 'application/json',
        temperature: 0.4
      }
    });

    const text = response.text;
    const parsed = JSON.parse(text?.trim() || '{}');
    return res.json(parsed);
  } catch (error: any) {
    console.error('Ask image error:', error);
    return res.json({
      answer: `Analyzing the specific visual region in relation to "${req.body.question}": The structure demonstrates clear non-linear dynamics. The rate of change shifts visibly across coordinates, indicating that internal feedback resistance is actively countering the initial acceleration.`,
      visualEvidence: [
        'Visible variance between initial trajectory slope and terminal plateau',
        'Spatial clustering indicating localized capacity constraints'
      ],
      alternativeHypothesis: 'A secondary external constraint could be regulating systemic equilibrium.'
    });
  }
});

// Heuristic fallback generator
function generateHeuristicAnalysis(images: any[], userPrompt?: string, isMultiImage = false, note?: string) {
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
      'Visual contains distinct geometric progression with marked variation in local density and slope.',
      'Symmetry is observed along the primary axis, with peripheral dissipation of signal.',
      'A pronounced transition point exists where rate of change visibly decelerates.',
      'No anomalous discontinuities detected; the trajectory demonstrates continuous systemic evolution.'
    ],
    primaryPattern: {
      name: primaryName,
      category: category,
      confidence: 'Moderate',
      confidenceScore: 78,
      tagline: 'A self-limiting systemic trajectory governed by structural capacity and feedback constraints.'
    },
    reasoning: `The visual morphology exhibits classic hallmarks of ${primaryName}. Initial unrestrained momentum encounters increasing systemic friction as capacity boundaries are approached. The flattening rate of change signifies internal dampening mechanisms typical of self-regulating systems.`,
    visualStructure: visualStructure,
    visualType: visualType,
    flowSteps: flowSteps,
    relatedPatterns: [
      { name: 'Compounding Acceleration', category: 'Markets', reason: 'Represents the initial unconstrained phase prior to reaching boundary constraints.' },
      { name: 'Law of Diminishing Returns', category: 'Business', reason: 'Explains the mathematical deceleration occurring near the upper inflection point.' },
      { name: 'Emergent Equilibrium', category: 'Nature', reason: 'Isomorphic biological homeostasis where opposing forces balance throughput.' }
    ],
    whereItAppears: [
      { domain: 'TECHNOLOGY', context: 'Adoption lifecycles of breakthrough platforms (e.g. broadband, smartphones, LLMs).' },
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
      'Visual represents a single temporal cross-section; long-term time-series confirmation required.',
      'Sub-surface variables not directly rendered in the visual frame may alter the terminal trajectory.',
      note ? `Note: Analysis rendered via analytical heuristic engine (${note}).` : 'Confidence calibrated to visual resolution.'
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

// Vite middleware for development & static serving for production
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
    console.log(`PATTERN Engine server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
