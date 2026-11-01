import React from 'react';
import { ShingleSwatch } from '../utils/roofingCalculations';

interface ArchitecturalRoofIllustrationProps {
  swatch: ShingleSwatch;
  lightingMode?: 'daylight' | 'golden_hour';
}

export const ArchitecturalRoofIllustration: React.FC<ArchitecturalRoofIllustrationProps> = ({
  swatch,
  lightingMode = 'golden_hour',
}) => {
  const isGolden = lightingMode === 'golden_hour';

  return (
    <div className="relative w-full aspect-16/10 bg-[#0F172A] overflow-hidden select-none">
      <svg
        viewBox="0 0 960 600"
        className="w-full h-full object-cover"
        role="img"
        aria-label={`Architectural visualization of a Dallas-Fort Worth home with ${swatch.fullLabel} roof`}
      >
        <defs>
          {/* Sky Gradient */}
          <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
            {isGolden ? (
              <>
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="42%" stopColor="#1E3A8A" />
                <stop offset="78%" stopColor="#475569" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.45" />
              </>
            ) : (
              <>
                <stop offset="0%" stopColor="#0284C7" />
                <stop offset="55%" stopColor="#38BDF8" />
                <stop offset="100%" stopColor="#E0F2FE" />
              </>
            )}
          </linearGradient>

          {/* Main Roof Slope Gradient */}
          <linearGradient id="roofSlopeMain" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={swatch.swatchHexPrimary} />
            <stop offset="55%" stopColor={swatch.swatchHexSecondary} />
            <stop offset="100%" stopColor={swatch.swatchHexPrimary} />
          </linearGradient>

          {/* Secondary Hip Roof Slope Gradient (Sunlit) */}
          <linearGradient id="roofSlopeLit" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={swatch.swatchHexHighlight} />
            <stop offset="50%" stopColor={swatch.swatchHexSecondary} />
            <stop offset="100%" stopColor={swatch.swatchHexPrimary} />
          </linearGradient>

          {/* Dimensional Shingle Pattern */}
          <pattern
            id="dimensionalShinglePattern"
            width="36"
            height="16"
            patternUnits="userSpaceOnUse"
          >
            <rect width="36" height="16" fill={swatch.swatchHexSecondary} />
            <rect x="0" y="0" width="17" height="7.5" fill={swatch.swatchHexPrimary} opacity="0.65" />
            <rect x="18" y="0" width="18" height="7.5" fill={swatch.swatchHexHighlight} opacity="0.35" />
            <rect x="9" y="8" width="17" height="7.5" fill={swatch.swatchHexPrimary} opacity="0.5" />
            <rect x="27" y="8" width="9" height="7.5" fill={swatch.swatchHexHighlight} opacity="0.3" />
            <rect x="0" y="8" width="8" height="7.5" fill={swatch.swatchHexHighlight} opacity="0.25" />
            <line
              x1="0"
              y1="7.8"
              x2="36"
              y2="7.8"
              stroke="#090D16"
              strokeWidth="1.2"
              opacity="0.55"
            />
            <line
              x1="0"
              y1="15.8"
              x2="36"
              y2="15.8"
              stroke="#090D16"
              strokeWidth="1.4"
              opacity="0.65"
            />
          </pattern>

          {/* Standing Seam Metal Pattern */}
          <pattern
            id="standingSeamPattern"
            width="22"
            height="40"
            patternUnits="userSpaceOnUse"
          >
            <rect width="22" height="40" fill={swatch.swatchHexPrimary} />
            <rect x="2" y="0" width="16" height="40" fill={swatch.swatchHexSecondary} opacity="0.55" />
            <line
              x1="20"
              y1="0"
              x2="20"
              y2="40"
              stroke={swatch.swatchHexHighlight}
              strokeWidth="2"
            />
            <line x1="21.5" y1="0" x2="21.5" y2="40" stroke="#05080F" strokeWidth="1.5" />
          </pattern>

          {/* Austin Stone / Brick Facade Pattern */}
          <pattern id="stoneFacade" width="44" height="22" patternUnits="userSpaceOnUse">
            <rect width="44" height="22" fill="#E2DCD3" />
            <rect x="1" y="1" width="20" height="9" fill="#D5CEC2" />
            <rect x="22" y="1" width="21" height="9" fill="#EAE4DC" />
            <rect x="1" y="11" width="12" height="10" fill="#DDD6CA" />
            <rect x="14" y="11" width="18" height="10" fill="#CFC7B9" />
            <rect x="33" y="11" width="10" height="10" fill="#E5DFD6" />
          </pattern>

          {/* Window Warm Glow */}
          <linearGradient id="windowGlow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="55%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
        </defs>

        {/* Background Sky */}
        <rect width="960" height="600" fill="url(#skyGrad)" />

        {/* Subtle Sun / Horizon Glow */}
        {isGolden && (
          <circle cx="760" cy="190" r="140" fill="#F59E0B" opacity="0.18" />
        )}

        {/* Distant DFW Tree Line */}
        <path
          d="M0 430 Q90 365 180 415 T350 400 T550 410 T760 390 T960 415 L960 520 L0 520 Z"
          fill="#0F172A"
          opacity="0.55"
        />

        {/* Chimney Stack */}
        <rect x="665" y="118" width="46" height="120" fill="url(#stoneFacade)" stroke="#94A3B8" strokeWidth="1" />
        <rect x="660" y="110" width="56" height="10" fill="#1E293B" />

        {/* MAIN ROOF DECK - WIDE SUBURBAN HIP ROOF */}
        <polygon
          points="105,310 275,148 695,148 855,310"
          fill={swatch.isMetal ? 'url(#standingSeamPattern)' : 'url(#dimensionalShinglePattern)'}
        />
        <polygon
          points="105,310 275,148 695,148 855,310"
          fill="url(#roofSlopeMain)"
          opacity="0.38"
        />

        {/* LEFT FORWARD GABLE WING ROOF */}
        <polygon
          points="135,322 285,172 435,322"
          fill={swatch.isMetal ? 'url(#standingSeamPattern)' : 'url(#dimensionalShinglePattern)'}
        />
        <polygon
          points="135,322 285,172 435,322"
          fill="url(#roofSlopeLit)"
          opacity="0.28"
        />

        {/* CENTER ARCHITECTURAL ACCENT GABLE / ENTRY PEAK */}
        <polygon
          points="420,322 535,198 650,322"
          fill={swatch.isMetal ? 'url(#standingSeamPattern)' : 'url(#dimensionalShinglePattern)'}
        />

        {/* RIGHT GARAGE HIP EXTENSION ROOF */}
        <polygon
          points="615,322 720,210 875,322"
          fill={swatch.isMetal ? 'url(#standingSeamPattern)' : 'url(#dimensionalShinglePattern)'}
        />

        {/* High-Profile Ridge Caps & Hip Flashing Lines */}
        <line
          x1="275"
          y1="148"
          x2="695"
          y2="148"
          stroke={swatch.swatchHexHighlight}
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1="105"
          y1="310"
          x2="275"
          y2="148"
          stroke={swatch.swatchHexHighlight}
          strokeWidth="4.5"
        />
        <line
          x1="695"
          y1="148"
          x2="855"
          y2="310"
          stroke={swatch.swatchHexHighlight}
          strokeWidth="4.5"
        />
        {/* Valley Flashing Lines */}
        <line
          x1="340"
          y1="227"
          x2="435"
          y2="322"
          stroke="#0F172A"
          strokeWidth="3"
          opacity="0.7"
        />
        <line
          x1="535"
          y1="198"
          x2="650"
          y2="322"
          stroke={swatch.swatchHexHighlight}
          strokeWidth="4"
        />

        {/* Fascia & Soffit Trim Eaves */}
        <rect x="98" y="310" width="778" height="12" fill="#F8FAFC" />
        <rect x="98" y="320" width="778" height="4" fill="#CBD5E1" />

        {/* HOUSE EXTERIOR WALLS (Austin Limestone & Painted Brick) */}
        <rect x="135" y="322" width="720" height="168" fill="url(#stoneFacade)" />

        {/* Left Gable Wall Triangle */}
        <polygon
          points="145,322 285,182 425,322"
          fill="url(#stoneFacade)"
          stroke="#F8FAFC"
          strokeWidth="8"
        />

        {/* Center Entry Gable Triangle */}
        <polygon
          points="430,322 535,208 640,322"
          fill="#F1ECE4"
          stroke="#F8FAFC"
          strokeWidth="7"
        />

        {/* Upper Gable Arch Louver Vent */}
        <rect x="268" y="232" width="34" height="46" rx="17" fill="#1E293B" stroke="#F8FAFC" strokeWidth="3" />

        {/* Left Bay Windows with Warm Interior Lighting */}
        <g transform="translate(185, 345)">
          <rect x="0" y="0" width="52" height="96" rx="3" fill="#0F172A" stroke="#F8FAFC" strokeWidth="4" />
          <rect x="4" y="4" width="44" height="88" fill="url(#windowGlow)" opacity="0.88" />
          <line x1="26" y1="4" x2="26" y2="92" stroke="#0F172A" strokeWidth="2.5" />
          <line x1="4" y1="48" x2="48" y2="48" stroke="#0F172A" strokeWidth="2.5" />

          <rect x="68" y="0" width="64" height="96" rx="3" fill="#0F172A" stroke="#F8FAFC" strokeWidth="4" />
          <rect x="72" y="4" width="56" height="88" fill="url(#windowGlow)" opacity="0.92" />
          <line x1="100" y1="4" x2="100" y2="92" stroke="#0F172A" strokeWidth="2.5" />
          <line x1="72" y1="48" x2="128" y2="48" stroke="#0F172A" strokeWidth="2.5" />

          <rect x="148" y="0" width="52" height="96" rx="3" fill="#0F172A" stroke="#F8FAFC" strokeWidth="4" />
          <rect x="152" y="4" width="44" height="88" fill="url(#windowGlow)" opacity="0.88" />
          <line x1="174" y1="4" x2="174" y2="92" stroke="#0F172A" strokeWidth="2.5" />
          <line x1="152" y1="48" x2="196" y2="48" stroke="#0F172A" strokeWidth="2.5" />
        </g>

        {/* Center Custom Mahogany & Iron Entryway */}
        <g transform="translate(485, 345)">
          <path d="M0,145 L0,26 Q50,-10 100,26 L100,145 Z" fill="#1E293B" />
          <rect x="26" y="34" width="48" height="111" rx="2" fill="#451A03" stroke="#D97706" strokeWidth="2" />
          <rect x="34" y="44" width="32" height="58" fill="url(#windowGlow)" opacity="0.8" />
          {/* Coach Sconces */}
          <circle cx="-12" cy="58" r="6" fill="#F59E0B" />
          <circle cx="112" cy="58" r="6" fill="#F59E0B" />
        </g>

        {/* Double Carriage Garage Doors (Right Wing) */}
        <g transform="translate(640, 362)">
          <rect x="0" y="0" width="92" height="128" fill="#334155" stroke="#F8FAFC" strokeWidth="4" />
          <rect x="8" y="10" width="34" height="22" fill="url(#windowGlow)" opacity="0.7" />
          <rect x="50" y="10" width="34" height="22" fill="url(#windowGlow)" opacity="0.7" />
          <line x1="0" y1="42" x2="92" y2="42" stroke="#1E293B" strokeWidth="2" />
          <line x1="0" y1="84" x2="92" y2="84" stroke="#1E293B" strokeWidth="2" />

          <rect x="106" y="0" width="92" height="128" fill="#334155" stroke="#F8FAFC" strokeWidth="4" />
          <rect x="114" y="10" width="34" height="22" fill="url(#windowGlow)" opacity="0.7" />
          <rect x="156" y="10" width="34" height="22" fill="url(#windowGlow)" opacity="0.7" />
          <line x1="106" y1="42" x2="198" y2="42" stroke="#1E293B" strokeWidth="2" />
          <line x1="106" y1="84" x2="198" y2="84" stroke="#1E293B" strokeWidth="2" />
        </g>

        {/* Manicured Lawn, Hedges & Concrete Driveway */}
        <rect x="0" y="490" width="960" height="110" fill="#14532D" />
        <polygon points="0,490 960,490 960,600 0,600" fill="#166534" opacity="0.65" />
        {/* Driveway & Walkway */}
        <polygon points="480,490 585,490 635,600 435,600" fill="#CBD5E1" />
        <polygon points="640,490 845,490 930,600 620,600" fill="#94A3B8" />

        {/* Boxwood Foundation Hedges */}
        <ellipse cx="185" cy="488" rx="38" ry="16" fill="#064E3B" />
        <ellipse cx="255" cy="488" rx="44" ry="18" fill="#065F46" />
        <ellipse cx="335" cy="488" rx="38" ry="16" fill="#064E3B" />
        <ellipse cx="425" cy="488" rx="34" ry="15" fill="#065F46" />

        {/* Engineering Callout Pin on Roof Deck */}
        <g transform="translate(455, 165)">
          <line x1="0" y1="0" x2="28" y2="-38" stroke="#F59E0B" strokeWidth="2" />
          <circle cx="0" cy="0" r="6" fill="#EA580C" stroke="#FFFFFF" strokeWidth="2" />
          <rect x="28" y="-60" width="248" height="32" rx="6" fill="#0F172A" opacity="0.92" stroke="#F59E0B" strokeWidth="1.5" />
          <text x="40" y="-40" fill="#F8FAFC" fontSize="11.5" fontWeight="700" fontFamily="Plus Jakarta Sans, sans-serif">
            {swatch.isMetal ? '24-Ga Kynar 500® Snap-Lock Seam' : 'GAF LayerLock™ + Dura Grip™ Seal'}
          </text>
        </g>
      </svg>

      {/* Bottom Gradient Scrim for Spec Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/75 to-transparent p-5 sm:p-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <div className="text-xs font-medium text-amber-400 tracking-wide">
            Live DFW Architectural Exterior Render · {swatch.subtitle}
          </div>
          <h4 className="text-xl sm:text-2xl font-bold text-white font-display mt-0.5">
            {swatch.fullLabel}
          </h4>
        </div>
        <div className="text-xs text-slate-200 font-mono-tabular">
          Best Match: {swatch.bestForStyles}
        </div>
      </div>
    </div>
  );
};
