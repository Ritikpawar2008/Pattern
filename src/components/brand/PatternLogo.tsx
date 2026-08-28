import React from 'react';

interface PatternLogoProps {
  variant?: 'icon' | 'horizontal' | 'vertical' | 'full' | 'compact';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero' | number;
  className?: string;
  glow?: boolean;
  animated?: boolean;
  onClick?: () => void;
}

export const PatternLogo: React.FC<PatternLogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
  glow = true,
  animated = false,
  onClick
}) => {
  // Dimension calculators
  const getDimensions = () => {
    if (typeof size === 'number') {
      return { width: size, height: size };
    }
    switch (size) {
      case 'sm':
        return { iconSize: 28, textScale: 0.8 };
      case 'md':
        return { iconSize: 38, textScale: 1 };
      case 'lg':
        return { iconSize: 52, textScale: 1.3 };
      case 'xl':
        return { iconSize: 72, textScale: 1.7 };
      case 'hero':
        return { iconSize: 110, textScale: 2.4 };
      default:
        return { iconSize: 38, textScale: 1 };
    }
  };

  const { iconSize } = getDimensions();

  // Pure Vector SVG of the iconic convergence 'P' mark
  const renderIconMark = (s: number = 40) => (
    <svg
      viewBox="0 0 200 200"
      width={s}
      height={s}
      className={`shrink-0 overflow-visible ${animated ? 'group-hover:scale-105 transition-transform duration-500' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Main Golden-Amber Gradient for the 'P' */}
        <linearGradient id="pGoldGradient" x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor="#FFF2D6" />
          <stop offset="25%" stopColor="#FFB347" />
          <stop offset="50%" stopColor="#F26522" />
          <stop offset="85%" stopColor="#D34607" />
          <stop offset="100%" stopColor="#8A2500" />
        </linearGradient>

        {/* Stem Gradient into Clean Crisp White/Cream */}
        <linearGradient id="pStemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F26522" />
          <stop offset="45%" stopColor="#F89225" />
          <stop offset="80%" stopColor="#FFF0DC" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>

        {/* Horizontal Data Line Gradient */}
        <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F26522" stopOpacity="0.1" />
          <stop offset="40%" stopColor="#F89225" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFF2D6" stopOpacity="1" />
        </linearGradient>

        {/* Subtle Ambient Glow */}
        {glow && (
          <filter id="logoGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}
      </defs>

      <g filter={glow ? 'url(#logoGlow)' : undefined}>
        {/* ============================================================ */}
        {/* 1. THE 5-COLUMN x 10-ROW DATA MATRIX & CONVERGENCE FIBERS     */}
        {/* ============================================================ */}
        {/* Row 1 (y=38) */}
        <circle cx="15" cy="38" r="1.5" fill="#F26522" opacity="0.25" />
        <circle cx="28" cy="38" r="1.8" fill="#F26522" opacity="0.4" />
        <circle cx="41" cy="38" r="2.2" fill="#F89225" opacity="0.65" />
        <circle cx="54" cy="38" r="2.8" fill="#FFB347" opacity="0.85" />
        <circle cx="67" cy="38" r="3.4" fill="#FFF2D6" opacity="1" />
        <path d="M 67 38 Q 88 38 108 38" stroke="url(#lineGrad)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* Row 2 (y=49) */}
        <circle cx="15" cy="49" r="1.5" fill="#F26522" opacity="0.25" />
        <circle cx="28" cy="49" r="1.8" fill="#F26522" opacity="0.4" />
        <circle cx="41" cy="49" r="2.2" fill="#F89225" opacity="0.65" />
        <circle cx="54" cy="49" r="2.8" fill="#FFB347" opacity="0.85" />
        <circle cx="67" cy="49" r="3.4" fill="#FFF2D6" opacity="1" />
        <path d="M 67 49 C 85 49, 100 68, 120 74" stroke="url(#lineGrad)" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* Row 3 (y=61) */}
        <circle cx="15" cy="61" r="1.5" fill="#F26522" opacity="0.3" />
        <circle cx="28" cy="61" r="1.8" fill="#F26522" opacity="0.45" />
        <circle cx="41" cy="61" r="2.2" fill="#F89225" opacity="0.7" />
        <circle cx="54" cy="61" r="2.8" fill="#FFB347" opacity="0.9" />
        <circle cx="67" cy="61" r="3.4" fill="#FFF2D6" opacity="1" />
        <path d="M 67 61 C 88 61, 104 72, 122 74.5" stroke="url(#lineGrad)" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* Row 4 (y=73) */}
        <circle cx="15" cy="73" r="1.5" fill="#F26522" opacity="0.3" />
        <circle cx="28" cy="73" r="1.8" fill="#F26522" opacity="0.5" />
        <circle cx="41" cy="73" r="2.2" fill="#F89225" opacity="0.75" />
        <circle cx="54" cy="73" r="2.8" fill="#FFB347" opacity="0.95" />
        <circle cx="67" cy="73" r="3.6" fill="#FFF2D6" opacity="1" />
        <path d="M 67 73 L 138 75" stroke="url(#lineGrad)" strokeWidth="1.6" fill="none" strokeLinecap="round" />

        {/* Row 5 (y=85) */}
        <circle cx="15" cy="85" r="1.5" fill="#F26522" opacity="0.3" />
        <circle cx="28" cy="85" r="1.8" fill="#F26522" opacity="0.5" />
        <circle cx="41" cy="85" r="2.2" fill="#F89225" opacity="0.75" />
        <circle cx="54" cy="85" r="2.8" fill="#FFB347" opacity="0.95" />
        <circle cx="67" cy="85" r="3.4" fill="#FFF2D6" opacity="1" />
        <path d="M 67 85 C 88 85, 104 78, 122 75.5" stroke="url(#lineGrad)" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* Row 6 (y=97) */}
        <circle cx="15" cy="97" r="1.5" fill="#F26522" opacity="0.25" />
        <circle cx="28" cy="97" r="1.8" fill="#F26522" opacity="0.4" />
        <circle cx="41" cy="97" r="2.2" fill="#F89225" opacity="0.65" />
        <circle cx="54" cy="97" r="2.8" fill="#FFB347" opacity="0.85" />
        <circle cx="67" cy="97" r="3.4" fill="#FFF2D6" opacity="1" />
        <path d="M 67 97 C 85 97, 100 82, 120 76" stroke="url(#lineGrad)" strokeWidth="1.4" fill="none" strokeLinecap="round" />

        {/* Row 7 (y=109) - Horizontal Trace */}
        <circle cx="15" cy="109" r="1.5" fill="#F26522" opacity="0.2" />
        <circle cx="28" cy="109" r="1.8" fill="#F26522" opacity="0.35" />
        <circle cx="41" cy="109" r="2.2" fill="#F89225" opacity="0.55" />
        <circle cx="54" cy="109" r="2.6" fill="#FFB347" opacity="0.7" />
        <circle cx="67" cy="109" r="3.0" fill="#FFB347" opacity="0.85" />
        <line x1="67" y1="109" x2="88" y2="109" stroke="url(#lineGrad)" strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />

        {/* Row 8 (y=121) - Horizontal Trace */}
        <circle cx="15" cy="121" r="1.5" fill="#F26522" opacity="0.15" />
        <circle cx="28" cy="121" r="1.8" fill="#F26522" opacity="0.3" />
        <circle cx="41" cy="121" r="2.2" fill="#F89225" opacity="0.45" />
        <circle cx="54" cy="121" r="2.5" fill="#F89225" opacity="0.6" />
        <circle cx="67" cy="121" r="2.8" fill="#FFB347" opacity="0.7" />
        <line x1="67" y1="121" x2="88" y2="121" stroke="url(#lineGrad)" strokeWidth="1.1" strokeLinecap="round" opacity="0.5" />

        {/* Row 9 (y=133) */}
        <circle cx="15" cy="133" r="1.5" fill="#F26522" opacity="0.1" />
        <circle cx="28" cy="133" r="1.8" fill="#F26522" opacity="0.2" />
        <circle cx="41" cy="133" r="2.0" fill="#F89225" opacity="0.35" />
        <circle cx="54" cy="133" r="2.4" fill="#F89225" opacity="0.5" />
        <circle cx="67" cy="133" r="2.6" fill="#FFB347" opacity="0.55" />
        <line x1="67" y1="133" x2="88" y2="133" stroke="url(#lineGrad)" strokeWidth="1.0" strokeLinecap="round" opacity="0.35" />

        {/* Row 10 (y=145) */}
        <circle cx="15" cy="145" r="1.5" fill="#F26522" opacity="0.08" />
        <circle cx="28" cy="145" r="1.8" fill="#F26522" opacity="0.15" />
        <circle cx="41" cy="145" r="2.0" fill="#F89225" opacity="0.25" />
        <circle cx="54" cy="145" r="2.2" fill="#F89225" opacity="0.35" />
        <circle cx="67" cy="145" r="2.4" fill="#FFB347" opacity="0.4" />
        <line x1="67" y1="145" x2="88" y2="145" stroke="url(#lineGrad)" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" />

        {/* ============================================================ */}
        {/* 2. THE GEOMETRIC LETTER 'P' BOWL & STEM                      */}
        {/* ============================================================ */}
        {/* Outer Loop & Inner Loop of the 'P' Head */}
        <path
          d="
            M 85 38
            C 105 38, 120 40, 138 48
            C 160 58, 172 78, 172 98
            C 172 122, 156 142, 130 148
            C 114 152, 102 152, 94 152
            L 94 106
            C 102 106, 114 106, 124 103
            C 136 100, 144 90, 144 78
            C 144 64, 134 54, 118 52
            C 104 50, 94 54, 85 58
            Z
          "
          fill="url(#pGoldGradient)"
        />

        {/* Convergence Focus Spear Point into the P inner crease */}
        <path
          d="M 112 73.5 Q 132 74.5 142 75 Q 132 75.5 112 76.5 Z"
          fill="#FFFDF7"
        />

        {/* The Clean White-Gradient Vertical Stem */}
        <path
          d="
            M 94 106
            L 102 106
            L 102 176
            L 94 176
            Z
          "
          fill="url(#pStemGradient)"
        />
      </g>
    </svg>
  );

  // Full Wordmark with custom stylized PATTERN glyphs & orange bar on 'E'
  const renderWordmark = (scale: number = 1) => (
    <div className="flex flex-col items-start justify-center select-none">
      <div className="flex items-center tracking-[0.28em] font-display font-black text-[#F1EBE6] text-xl leading-none">
        <span>P</span>
        <span className="ml-[0.22em]">A</span>
        <span className="ml-[0.22em]">T</span>
        <span className="ml-[0.22em]">T</span>
        <span className="relative ml-[0.22em] flex flex-col items-center">
          {/* Distinctive Orange Accent Bar over the 'E' */}
          <span className="absolute -top-1.5 left-0 right-0 h-[2px] bg-[#F26522] rounded-full shadow-[0_0_8px_#F26522]" />
          <span>E</span>
        </span>
        <span className="ml-[0.22em]">R</span>
        <span className="ml-[0.22em]">N</span>
      </div>
    </div>
  );

  // Full Tagline: SEE WHAT REPEATS. UNDERSTAND WHY. PREDICT WHAT COMES NEXT.
  const renderTagline = () => (
    <div className="text-[9px] sm:text-[10px] font-mono tracking-[0.18em] text-[#8A8582] uppercase mt-2 select-none flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
      <span>SEE WHAT</span>
      <span className="text-[#F26522] font-bold">REPEATS</span>
      <span>•</span>
      <span>UNDERSTAND</span>
      <span className="text-[#F26522] font-bold">WHY</span>
      <span>•</span>
      <span>PREDICT WHAT COMES</span>
      <span className="text-[#F26522] font-bold">NEXT</span>
    </div>
  );

  // 1. ICON ONLY
  if (variant === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {renderIconMark(iconSize)}
      </div>
    );
  }

  // 2. HORIZONTAL LOCKUP (NAVBAR / COMPACT HEADERS)
  if (variant === 'horizontal' || variant === 'compact') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center gap-3 ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      >
        {renderIconMark(iconSize)}
        <div className="flex flex-col justify-center">
          <div className="flex items-center tracking-[0.26em] font-display font-black text-[#F1EBE6] text-lg sm:text-xl leading-none">
            <span>P</span>
            <span className="ml-[0.2em]">A</span>
            <span className="ml-[0.2em]">T</span>
            <span className="ml-[0.2em]">T</span>
            <span className="relative ml-[0.2em] flex flex-col items-center">
              <span className="absolute -top-1.5 left-0 right-0 h-[2px] bg-[#F26522] rounded-full shadow-[0_0_6px_#F26522]" />
              <span>E</span>
            </span>
            <span className="ml-[0.2em]">R</span>
            <span className="ml-[0.2em]">N</span>
          </div>
          {variant !== 'compact' && (
            <span className="text-[8px] sm:text-[9px] font-mono text-[#8A8582] tracking-[0.2em] uppercase mt-1">
              Cognitive Engine
            </span>
          )}
        </div>
      </div>
    );
  }

  // 3. FULL MASTER LOCKUP (HERO / LANDING / MODAL / SPLASH)
  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center justify-center text-center ${onClick ? 'cursor-pointer group' : ''} ${className}`}
    >
      <div className="mb-4">
        {renderIconMark(typeof size === 'number' ? size : 96)}
      </div>
      {renderWordmark()}
      {renderTagline()}
    </div>
  );
};
