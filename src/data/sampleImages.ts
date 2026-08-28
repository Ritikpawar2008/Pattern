export interface SampleImage {
  id: string;
  title: string;
  category: string;
  description: string;
  hint: string;
  dataUrl: string;
  visualType: string;
}

// Generate high-resolution SVG data URLs for sample test cases
function createSvgDataUrl(svgString: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svgString.trim())}`;
}

export const SAMPLE_IMAGES: SampleImage[] = [
  {
    id: 'sample-scurve',
    title: 'Technology S-Curve Adoption',
    category: 'Technology',
    description: 'A classic sigmoidal adoption trajectory displaying slow initial traction, exponential growth, and eventual market saturation.',
    hint: 'Look for the inflection point between compounding acceleration and upper saturation.',
    visualType: 'scurve',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
        <rect width="800" height="500" fill="#0A0A0A" />
        <defs>
          <linearGradient id="curveGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#F26522" stop-opacity="0.2" />
            <stop offset="50%" stop-color="#F26522" stop-opacity="1" />
            <stop offset="100%" stop-color="#FF9D5C" stop-opacity="1" />
          </linearGradient>
          <linearGradient id="areaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#F26522" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#F26522" stop-opacity="0" />
          </linearGradient>
        </defs>
        <!-- Grid lines -->
        <line x1="80" y1="80" x2="740" y2="80" stroke="#222" stroke-dasharray="4,4" />
        <line x1="80" y1="160" x2="740" y2="160" stroke="#222" stroke-dasharray="4,4" />
        <line x1="80" y1="240" x2="740" y2="240" stroke="#222" stroke-dasharray="4,4" />
        <line x1="80" y1="320" x2="740" y2="320" stroke="#222" stroke-dasharray="4,4" />
        <line x1="80" y1="400" x2="740" y2="400" stroke="#444" stroke-width="2" />
        <line x1="80" y1="80" x2="80" y2="400" stroke="#444" stroke-width="2" />
        
        <!-- S-Curve Path -->
        <path d="M 80 390 C 240 385, 300 360, 390 240 C 470 140, 540 100, 740 95 L 740 400 L 80 400 Z" fill="url(#areaGrad)" />
        <path d="M 80 390 C 240 385, 300 360, 390 240 C 470 140, 540 100, 740 95" fill="none" stroke="url(#curveGrad)" stroke-width="5" stroke-linecap="round" />
        
        <!-- Inflection & Key Points -->
        <circle cx="390" cy="240" r="7" fill="#FFF" stroke="#F26522" stroke-width="3" />
        <circle cx="250" cy="370" r="5" fill="#F26522" />
        <circle cx="580" cy="110" r="5" fill="#F26522" />
        
        <!-- Annotations -->
        <text x="90" y="50" fill="#F1EBE6" font-family="monospace" font-size="18" font-weight="bold">GLOBAL ADOPTION INDEX [CUMULATIVE PENETRATION]</text>
        <text x="90" y="375" fill="#8A8582" font-family="monospace" font-size="12">PHASE 1: NASCENT TRACTION</text>
        <text x="410" y="245" fill="#F26522" font-family="monospace" font-size="13" font-weight="bold">INFLECTION POINT [ACCELERATION]</text>
        <text x="560" y="85" fill="#8A8582" font-family="monospace" font-size="12">PHASE 3: SATURATION CEILING</text>
        
        <!-- Axes Labels -->
        <text x="700" y="425" fill="#8A8582" font-family="monospace" font-size="12">TIME ➔</text>
        <text x="35" y="90" fill="#8A8582" font-family="monospace" font-size="12" transform="rotate(-90 35 90)">CAPACITY %</text>
      </svg>
    `)
  },
  {
    id: 'sample-bottleneck',
    title: 'Flow Chokepoint & Bottleneck',
    category: 'Business',
    description: 'High capacity inflow narrowing abruptly into a single constricted pipe, causing queue buildup and throttled output.',
    hint: 'Notice the extreme variance in throughput density before and after the central constraint.',
    visualType: 'bottleneck',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
        <rect width="800" height="500" fill="#0A0A0A" />
        <text x="80" y="60" fill="#F1EBE6" font-family="monospace" font-size="18" font-weight="bold">SYSTEMIC THROUGHPUT FLOW &amp; CHOKEPOINT DYNAMICS</text>
        
        <!-- Funnel Contours -->
        <path d="M 80 140 L 320 140 L 390 220 L 520 220 L 520 280 L 390 280 L 320 360 L 80 360" fill="#141414" stroke="#F26522" stroke-width="3" />
        <path d="M 520 220 L 740 220 L 740 280 L 520 280" fill="#141414" stroke="#444" stroke-width="2" />
        
        <!-- Dense Inflow Particles (Queued Backlog) -->
        <g fill="#F26522" opacity="0.85">
          <circle cx="120" cy="180" r="9" /><circle cx="150" cy="220" r="9" /><circle cx="130" cy="270" r="9" /><circle cx="110" cy="320" r="9" />
          <circle cx="180" cy="170" r="9" /><circle cx="210" cy="230" r="9" /><circle cx="190" cy="290" r="9" />
          <circle cx="240" cy="190" r="9" /><circle cx="260" cy="250" r="9" /><circle cx="250" cy="310" r="9" />
          <circle cx="300" cy="210" r="9" /><circle cx="310" cy="270" r="9" /><circle cx="330" cy="240" r="9" />
          <circle cx="360" cy="245" r="9" /><circle cx="375" cy="255" r="9" />
        </g>
        
        <!-- Throttled Single File Output -->
        <g fill="#4ade80">
          <circle cx="450" cy="250" r="8" />
          <circle cx="580" cy="250" r="8" />
          <circle cx="680" cy="250" r="8" />
        </g>
        
        <!-- Bottleneck bracket -->
        <rect x="385" y="200" width="140" height="100" fill="none" stroke="#EF4444" stroke-width="2" stroke-dasharray="6,4" rx="8" />
        <text x="395" y="190" fill="#EF4444" font-family="monospace" font-size="12" font-weight="bold">CRITICAL BOTTLENECK</text>
        
        <!-- Labels -->
        <text x="120" y="400" fill="#F26522" font-family="monospace" font-size="13">HIGH INFLOW ACCUMULATION (QUEUE)</text>
        <text x="560" y="320" fill="#4ade80" font-family="monospace" font-size="13">CONSTRAINED OUTPUT</text>
      </svg>
    `)
  },
  {
    id: 'sample-bubble',
    title: 'Speculative Euphoria & Collapse (Minsky Cycle)',
    category: 'Markets',
    description: 'A parabolic asset appreciation wave driven by speculative leverage, followed by a sharp liquidation cascade.',
    hint: 'Observe the asymmetry between the gradual exponential ascent and the vertical panic collapse.',
    visualType: 'bubble',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
        <rect width="800" height="500" fill="#0A0A0A" />
        <defs>
          <linearGradient id="bubbleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#3B82F6" />
            <stop offset="60%" stop-color="#F59E0B" />
            <stop offset="75%" stop-color="#EF4444" />
            <stop offset="100%" stop-color="#6B7280" />
          </linearGradient>
        </defs>
        
        <text x="80" y="55" fill="#F1EBE6" font-family="monospace" font-size="18" font-weight="bold">ASSET PRICE / VALUATION EUPHORIA &amp; CASCADE</text>
        
        <!-- Grid -->
        <line x1="80" y1="420" x2="740" y2="420" stroke="#444" stroke-width="2" />
        <line x1="80" y1="80" x2="80" y2="420" stroke="#444" stroke-width="2" />
        
        <!-- Parabolic Curve -->
        <path d="M 80 400 Q 220 395 320 370 T 480 260 T 560 100 L 600 280 L 640 240 L 720 395" fill="none" stroke="url(#bubbleGrad)" stroke-width="5" stroke-linecap="round" />
        
        <!-- Mean baseline -->
        <line x1="80" y1="360" x2="740" y2="330" stroke="#38BDF8" stroke-dasharray="6,6" stroke-width="2" />
        <text x="600" y="325" fill="#38BDF8" font-family="monospace" font-size="11">FUNDAMENTAL MEAN</text>
        
        <!-- Stage Markers -->
        <circle cx="560" cy="100" r="7" fill="#EF4444" stroke="#FFF" stroke-width="2" />
        <text x="470" y="85" fill="#EF4444" font-family="monospace" font-size="13" font-weight="bold">PARABOLIC CLIMAX (EUPHORIA)</text>
        <text x="140" y="375" fill="#8A8582" font-family="monospace" font-size="11">1. DISPLACEMENT</text>
        <text x="360" y="270" fill="#F59E0B" font-family="monospace" font-size="11">2. SPECULATIVE BOOM</text>
        <text x="610" y="230" fill="#EF4444" font-family="monospace" font-size="11">3. BULL TRAP</text>
        <text x="650" y="415" fill="#9CA3AF" font-family="monospace" font-size="11">4. CAPITULATION</text>
      </svg>
    `)
  },
  {
    id: 'sample-network',
    title: 'Hub-and-Spoke Network & Preferential Attachment',
    category: 'Society',
    description: 'A scale-free network topology where a few dominant core nodes attract the vast majority of interconnections.',
    hint: 'Examine the high clustering coefficient around central connector hubs versus peripheral leaf nodes.',
    visualType: 'network',
    dataUrl: createSvgDataUrl(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="800" height="500">
        <rect width="800" height="500" fill="#0A0A0A" />
        <text x="80" y="55" fill="#F1EBE6" font-family="monospace" font-size="18" font-weight="bold">SCALE-FREE NETWORK TOPOLOGY (POWER LAW DEGREE)</text>
        
        <!-- Hub Links -->
        <!-- Center Hub 1: (320, 260) -->
        <g stroke="#F26522" stroke-opacity="0.35" stroke-width="2">
          <line x1="320" y1="260" x2="160" y2="180" /><line x1="320" y1="260" x2="200" y2="340" />
          <line x1="320" y1="260" x2="140" y2="280" /><line x1="320" y1="260" x2="260" y2="150" />
          <line x1="320" y1="260" x2="480" y2="220" /><line x1="320" y1="260" x2="380" y2="380" />
          <line x1="320" y1="260" x2="280" y2="400" /><line x1="320" y1="260" x2="220" y2="120" />
        </g>
        <!-- Center Hub 2: (480, 220) -->
        <g stroke="#38BDF8" stroke-opacity="0.35" stroke-width="2">
          <line x1="480" y1="220" x2="620" y2="140" /><line x1="480" y1="220" x2="660" y2="240" />
          <line x1="480" y1="220" x2="580" y2="340" /><line x1="480" y1="220" x2="520" y2="110" />
          <line x1="480" y1="220" x2="700" y2="180" /><line x1="480" y1="220" x2="420" y2="140" />
          <line x1="480" y1="220" x2="540" y2="390" />
        </g>
        
        <!-- Peripheral Nodes -->
        <g fill="#8A8582">
          <circle cx="160" cy="180" r="6" /><circle cx="200" cy="340" r="6" /><circle cx="140" cy="280" r="5" />
          <circle cx="260" cy="150" r="6" /><circle cx="380" cy="380" r="5" /><circle cx="280" cy="400" r="5" />
          <circle cx="620" cy="140" r="6" /><circle cx="660" cy="240" r="5" /><circle cx="580" cy="340" r="6" />
          <circle cx="520" cy="110" r="5" /><circle cx="700" cy="180" r="5" /><circle cx="540" cy="390" r="5" />
        </g>
        
        <!-- Super Hubs -->
        <circle cx="320" cy="260" r="22" fill="#F26522" stroke="#FFF" stroke-width="3" />
        <circle cx="480" cy="220" r="20" fill="#38BDF8" stroke="#FFF" stroke-width="3" />
        
        <text x="250" y="220" fill="#F26522" font-family="monospace" font-size="13" font-weight="bold">SUPER HUB α</text>
        <text x="510" y="255" fill="#38BDF8" font-family="monospace" font-size="13" font-weight="bold">SUPER HUB β</text>
        <text x="80" y="450" fill="#8A8582" font-family="monospace" font-size="12">80% OF CONNECTIONS FLOW THROUGH 20% OF CORE ROUTER HUBS</text>
      </svg>
    `)
  }
];
