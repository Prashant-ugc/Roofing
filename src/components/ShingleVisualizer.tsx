import React, { useState } from 'react';
import {
  Wind,
  Shield,
  TrendingUp,
  Sun,
  PackageCheck,
  Check,
} from 'lucide-react';
import { SHINGLE_SWATCHES, ShingleSwatch } from '../utils/roofingCalculations';
import { ArchitecturalRoofIllustration } from './ArchitecturalRoofIllustration';

interface ShingleVisualizerProps {
  onRequestSamples: (selectedSwatch: ShingleSwatch) => void;
}

export const ShingleVisualizer: React.FC<ShingleVisualizerProps> = ({
  onRequestSamples,
}) => {
  const [selectedId, setSelectedId] = useState<ShingleSwatch['id']>('charcoal_black');
  const [lightingMode, setLightingMode] = useState<'golden_hour' | 'daylight'>('golden_hour');

  const activeSwatch =
    SHINGLE_SWATCHES.find((s) => s.id === selectedId) ?? SHINGLE_SWATCHES[0];

  return (
    <section id="shingle-visualizer" className="py-16 sm:py-24 bg-[#F8FAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold text-[#1E3A8A]">
              02. Interactive Architectural Curb Appeal Studio
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#0F172A] mt-1.5 text-balance">
              Visualize Your Home&apos;s Curb Appeal — Click a Shingle Style Below
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Preview our 4 highest-demand North Texas roof systems engineered for 130–165 MPH wind uplift, Class 4 hail resistance, and HOA pre-approval.
            </p>
          </div>

          {/* Lighting Switcher */}
          <div className="flex items-center gap-1 p-1 bg-slate-200/80 rounded-xl self-start md:self-auto">
            <button
              type="button"
              onClick={() => setLightingMode('golden_hour')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                lightingMode === 'golden_hour'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#0F172A]'
              }`}
            >
              Golden Hour Dusk
            </button>
            <button
              type="button"
              onClick={() => setLightingMode('daylight')}
              className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                lightingMode === 'daylight'
                  ? 'bg-[#0F172A] text-white shadow-sm'
                  : 'text-slate-700 hover:text-[#0F172A]'
              }`}
            >
              Texas Midday Sun
            </button>
          </div>
        </div>

        {/* 4 Clickable Swatch Selector Buttons */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {SHINGLE_SWATCHES.map((swatch) => {
            const isSelected = swatch.id === selectedId;
            return (
              <button
                key={swatch.id}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedId(swatch.id)}
                className={`text-left p-4 rounded-xl border flex items-center gap-3.5 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-lg'
                    : 'bg-white text-[#0F172A] border-slate-200 hover:border-[#1E3A8A]'
                }`}
              >
                {/* Physical Texture Swatch Preview Circle */}
                <span
                  className="w-11 h-11 rounded-lg shrink-0 border-2 border-white/40 flex items-center justify-center shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, ${swatch.swatchHexPrimary} 0%, ${swatch.swatchHexSecondary} 55%, ${swatch.swatchHexHighlight} 100%)`,
                  }}
                >
                  {isSelected && <Check className="w-5 h-5 text-amber-400" />}
                </span>
                <div className="min-w-0">
                  <div className="font-bold text-xs sm:text-sm leading-snug">
                    {swatch.name}
                  </div>
                  <div
                    className={`text-xs truncate mt-0.5 ${
                      isSelected ? 'text-amber-400 font-semibold' : 'text-slate-500'
                    }`}
                  >
                    {swatch.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Large Showcase Card */}
        <div
          data-testid="visualizer-showcase-card"
          className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left 7 Cols: Interactive SVG Architectural Render */}
          <div className="lg:col-span-7 flex flex-col justify-between bg-[#0F172A]">
            <ArchitecturalRoofIllustration
              swatch={activeSwatch}
              lightingMode={lightingMode}
            />
          </div>

          {/* Right 5 Cols: Live Material Specifications & Sample CTA */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-semibold text-[#EA580C]">
                GAF Certified Specification Sheet · {activeSwatch.impactClass}
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#0F172A] mt-1">
                {activeSwatch.fullLabel}
              </h3>
              <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                {activeSwatch.description}
              </p>

              {/* Spec Breakdown Grid */}
              <div className="mt-6 space-y-3 border-t border-slate-200 pt-5">
                <div className="flex items-start gap-3">
                  <Wind className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500">Wind Uplift Rating</div>
                    <div className="text-sm font-bold text-[#0F172A]">
                      {activeSwatch.windRating}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500">Algae Protection Warranty</div>
                    <div className="text-sm font-bold text-[#0F172A]">
                      {activeSwatch.algaeWarranty}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#1E3A8A] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500">Curb Appeal & HOA Rating</div>
                    <div className="text-sm font-bold text-[#0F172A] font-mono-tabular">
                      {activeSwatch.curbAppealRating}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Sun className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs text-slate-500">Texas Insurance & Thermal Benefit</div>
                    <div className="text-sm font-bold text-[#0F172A]">
                      {activeSwatch.insuranceDiscount}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 space-y-2.5">
              <button
                type="button"
                onClick={() => onRequestSamples(activeSwatch)}
                className="w-full py-4 px-5 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <PackageCheck className="w-4 h-4 shrink-0" />
                <span>Have Free Physical Shingle Samples Brought to Your Door</span>
              </button>
              <p className="text-[11px] text-slate-500 text-center">
                We drop off full-size 36&quot; sample boards on your front porch so you can compare against your brick in natural daylight.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
