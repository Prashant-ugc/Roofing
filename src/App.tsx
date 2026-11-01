/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Phone,
  ShieldCheck,
  Award,
  Star,
  Hammer,
  Magnet,
  Umbrella,
  Clock,
  Plane,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  MapPin,
  ArrowUpRight,
} from 'lucide-react';
import { RoofCalculatorCard } from './components/RoofCalculatorCard';
import { StormClaimChecker } from './components/StormClaimChecker';
import { ShingleVisualizer } from './components/ShingleVisualizer';
import { FinancingCalculator } from './components/FinancingCalculator';
import {
  SampleRequestModal,
  PreQualModal,
  FloatingDispatchWidget,
  MobileStickyBottomBar,
} from './components/ModalsAndDispatch';
import {
  ShingleSwatch,
  FinancingTerm,
  SHINGLE_SWATCHES,
} from './utils/roofingCalculations';

const VERIFIED_REVIEWS = [
  {
    name: 'collin & Amanda R.',
    displayName: 'Collin & Amanda Richardson',
    location: 'Frisco, TX (Starwood Estates)',
    claimOutcome: '$18,450 Full Replacement Paid by State Farm · Only Paid Deductible',
    shingleInstalled: 'GAF Timberline HDZ — Charcoal Black (Class 4 Upgrade)',
    quote:
      'Our insurance adjuster initially said we only had $1,100 in minor wind damage. Summit Shield flew their 4K drone, documented 14 hail strikes per square, and met the second adjuster on our roof. State Farm approved a full $18,450 tear-off within 48 hours. Their crew tarped our pool, finished in 1 day, and their magnet sweep found every single nail.',
    date: 'Installed October 2026',
  },
  {
    name: 'marcus V.',
    displayName: 'Marcus Vance, PE',
    location: 'Southlake, TX (Timarron)',
    claimOutcome: '$24,900 Standing Seam Metal & Ridge Upgrade · Zero Nails Found',
    shingleInstalled: 'Matte Black 24-Gauge Standing Seam + GAF Deck-Armor',
    quote:
      'As a structural engineer, I inspected their flashing work around our three chimneys and skylights closely. Best roof crew in DFW. My kids and two golden retrievers ran across the backyard the next morning—not a single stray nail anywhere in the grass or flower beds.',
    date: 'Installed September 2026',
  },
  {
    name: 'elena & David M.',
    displayName: 'Elena & David Morales',
    location: 'Plano, TX (Willow Bend)',
    claimOutcome: 'Emergency Tarping in 52 Mins + Full USAA Hail Claim Approval',
    shingleInstalled: 'GAF Timberline HDZ — Weathered Wood',
    quote:
      'After the May hailstorm punched through a valley flashing over our kitchen, Summit Shield had an emergency tarping crew on our roof in 52 minutes while it was still drizzling. They handled the entire USAA supplement process and lowered our annual homeowner insurance premium by 23% with Class 4 impact shingles.',
    date: 'Installed August 2026',
  },
];

const COMPARISON_ROWS = [
  {
    criteria: 'Headquarters & Accountability',
    summit: 'Permanent Dallas-Fort Worth Showroom, Warehouse & Local TX License',
    chasers: 'Out-of-state P.O. Box & rented pickup trucks that vanish after hail season',
  },
  {
    criteria: 'Installation Crew & Labor',
    summit: 'W2 Factory-Certified GAF Master Elite® Crew ($2M General Liability)',
    chasers: 'Unvetted day-labor subcontractors with zero workers’ comp insurance',
  },
  {
    criteria: 'Warranty Protection',
    summit: '50-Year Non-Prorated GAF Golden Pledge® (Backed by GAF Corp)',
    chasers: '“Tailgate warranty” that expires the moment they change phone numbers',
  },
  {
    criteria: 'Yard & Tire Protection',
    summit: 'Written $50-Per-Nail Cash Guarantee + Catch-All Landscape Tarping',
    chasers: 'Rusted roofing nails left in driveways, gutters, and AC condenser fins',
  },
  {
    criteria: 'Insurance Claim Advocacy',
    summit: 'HAAG-Certified Inspectors + Xactimate® Software + On-Site Adjuster Meet',
    chasers: 'High-pressure door knockers who ask you to sign vague contingency contracts',
  },
];

export default function App() {
  const [sampleModalSwatch, setSampleModalSwatch] = useState<ShingleSwatch | null>(
    null
  );
  const [preQualState, setPreQualState] = useState<{
    isOpen: boolean;
    cost: number;
    term: FinancingTerm;
    monthly: number;
  }>({
    isOpen: false,
    cost: 10500,
    term: '120_months',
    monthly: 129,
  });

  const [dispatchOpen, setDispatchOpen] = useState(false);
  const [dispatchMode, setDispatchMode] = useState<
    'emergency_leak' | 'drone_inspection'
  >('Emergency' ? 'emergency_leak' : 'drone_inspection');

  const [beforeAfterView, setBeforeAfterView] = useState<'after' | 'before'>('after');

  const openEmergencyTarping = () => {
    setDispatchMode('emergency_leak');
    setDispatchOpen(true);
  };

  const openDroneScheduler = () => {
    setDispatchMode('drone_inspection');
    setDispatchOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] pb-16 md:pb-0">
      {/* 1. TOP LIVE STORM ALERT BAR */}
      <div className="bg-[#0F172A] text-white border-b border-slate-800 px-4 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="font-medium text-slate-100">
            <span className="font-bold text-amber-400">
              STORM ALERT DISPATCH:
            </span>{' '}
            2 Emergency Leak &amp; Tarping Crews Available in Dallas Right Now — Avg. Arrival: Under 90 Mins
          </div>
          <button
            type="button"
            onClick={openEmergencyTarping}
            className="text-amber-400 hover:text-amber-300 font-bold underline cursor-pointer whitespace-nowrap shrink-0"
          >
            Request 90-Min Tarping Crew &rarr;
          </button>
        </div>
      </div>

      {/* STICKY HEADER (Strict 3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-18 flex items-center justify-between gap-2 sm:gap-6 lg:gap-8">
          {/* Zone 1: Brand Title, One Line */}
          <a
            href="#"
            className="text-sm sm:text-xl lg:text-2xl font-extrabold font-display tracking-tight text-[#0F172A] whitespace-nowrap shrink-0"
          >
            SUMMIT SHIELD ROOFING
          </a>

          {/* Zone 2: 5 Concise Single-Line Nav Links */}
          <nav
            aria-label="Primary Navigation"
            className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-700"
          >
            <a
              href="#calculator-card"
              className="hover:text-[#EA580C] transition-colors whitespace-nowrap shrink-0"
            >
              Roof Calculator
            </a>
            <a
              href="#storm-insurance-check"
              className="hover:text-[#EA580C] transition-colors whitespace-nowrap shrink-0"
            >
              Storm Insurance Check
            </a>
            <a
              href="#shingle-visualizer"
              className="hover:text-[#EA580C] transition-colors whitespace-nowrap shrink-0"
            >
              Shingle Visualizer
            </a>
            <a
              href="#zero-nail-guarantee"
              className="hover:text-[#EA580C] transition-colors whitespace-nowrap shrink-0"
            >
              Zero-Nail Guarantee
            </a>
            <a
              href="#financing"
              className="hover:text-[#EA580C] transition-colors whitespace-nowrap shrink-0"
            >
              Financing
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href="tel:2145550188"
              className="px-3 py-2 sm:px-4 sm:py-2.5 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-colors inline-flex items-center gap-1.5 sm:gap-2 whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              <span className="font-mono-tabular">(214) 555-0188</span>
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION + INTERACTIVE 60-SECOND ROOF COST & DRONE REPORT CALCULATOR */}
        <section className="relative bg-[#0F172A] text-white py-12 sm:py-16 lg:py-20 border-b border-slate-800 overflow-hidden">
          {/* Subtle Architectural Grid Backdrop */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage:
                'radial-gradient(#38BDF8 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column (7 Cols): High-Impact Value Proposition */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-8">
                <div className="space-y-5">
                  {/* Unboxed Clean Trust Kicker */}
                  <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-amber-400">
                    <span>GAF Master Elite®</span>
                    <span aria-hidden="true">·</span>
                    <span>BBB A+ Rated</span>
                    <span aria-hidden="true">·</span>
                    <span>Serving Dallas–Fort Worth Since 2011</span>
                  </div>

                  <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-extrabold font-display tracking-tight text-white leading-[1.1] text-balance">
                    Roof Leaking or Hit by Recent Hail? Get a Certified 21-Point Drone Inspection + Upfront Replacement Quote Today
                  </h1>

                  <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                    Don&apos;t gamble your biggest asset on out-of-state storm chasers. We combine 4K thermal drone diagnostics, direct Xactimate® insurance claim advocacy, and 1-day GAF Master Elite® installation backed by our $50-Per-Nail Clean Yard Guarantee.
                  </p>

                  {/* Action Row */}
                  <div className="pt-2 flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={openEmergencyTarping}
                      className="py-3.5 px-6 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>Emergency Tarping (Under 90 Mins)</span>
                    </button>

                    <button
                      type="button"
                      onClick={openDroneScheduler}
                      className="py-3.5 px-5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm sm:text-base rounded-xl border border-slate-700 transition-colors inline-flex items-center gap-2 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <Plane className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Book No-Contact 4K Drone Scan</span>
                    </button>
                  </div>
                </div>

                {/* 4 Authority Pillars inside Hero Left */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm">
                      <Award className="w-4 h-4 shrink-0" />
                      <span>Top 2% USA</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      GAF Master Elite® Contractor
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm font-mono-tabular">
                      <Star className="w-4 h-4 fill-amber-400 shrink-0" />
                      <span>5.0★ Google</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      320+ Verified DFW Reviews
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm font-mono-tabular">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>$2M Insured</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Full General Liability &amp; W2 Crew
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm font-mono-tabular">
                      <Hammer className="w-4 h-4 shrink-0" />
                      <span>50-Year Warranty</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      Non-Prorated Material &amp; Labor
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column (5 Cols): Interactive 4-Step Calculator Card */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <RoofCalculatorCard onOpenEmergencyModal={openDroneScheduler} />
              </div>
            </div>
          </div>
        </section>

        {/* 3. INTERACTIVE STORM & HAIL INSURANCE CLAIM ELIGIBILITY CHECKER */}
        <StormClaimChecker onBookDroneCheck={openDroneScheduler} />

        {/* 4. INTERACTIVE LIVE SHINGLE COLOR & MATERIAL VISUALIZER */}
        <ShingleVisualizer
          onRequestSamples={(swatch) => setSampleModalSwatch(swatch)}
        />

        {/* 5. THE "ZERO-NAIL & PROPERTY PROTECTION" IRONCLAD GUARANTEE */}
        <section
          id="zero-nail-guarantee"
          className="py-16 sm:py-24 bg-[#0F172A] text-white border-y border-slate-800"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="max-w-3xl">
                <div className="text-xs font-semibold text-amber-400">
                  03. Written Ironclad Homeowner Protection Contract
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white mt-1.5 text-balance">
                  The &ldquo;Zero-Nail &amp; Property Protection&rdquo; Ironclad Guarantee
                </h2>
                <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
                  The #1 fear homeowners have during a roof replacement is punctured car tires, barefoot hazards for kids and pets, and crushed landscaping. We back our cleanup in writing with cash on the line.
                </p>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={openDroneScheduler}
                  className="py-3.5 px-6 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-colors cursor-pointer whitespace-nowrap"
                >
                  Schedule Risk-Free Inspection
                </button>
              </div>
            </div>

            {/* 4 Ironclad Pillars Grid */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Pillar 1 */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#EA580C]/15 border border-[#EA580C]/40 flex items-center justify-center text-amber-400">
                    <Magnet className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono-tabular text-amber-400 font-semibold">
                    01 · TRIPLE MAGNETIC SWEEP
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">
                    The $50 Per Nail Guarantee
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    We sweep your yard 3x with industrial rolling magnets. Find a single nail after we leave, and we pay you $50 cash!
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-xs text-emerald-400 font-semibold">
                  Signed in Every Contract
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1E3A8A]/40 border border-blue-500/30 flex items-center justify-center text-amber-400">
                    <Umbrella className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono-tabular text-amber-400 font-semibold">
                    02 · ARMORED PERIMETER SHIELD
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">
                    Catch-All Landscape &amp; Pool Tarping
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    100% protection for your flower beds, AC unit, and driveway using breathable structural netting and plywood A-frames.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                  Zero Crushed Shrubs or Pool Debris
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#1E3A8A]/40 border border-blue-500/30 flex items-center justify-center text-amber-400">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono-tabular text-amber-400 font-semibold">
                    03 · 12-MAN CERTIFIED CREW
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">
                    1-Day Tear-Off &amp; Installation
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Old roof off in the morning, new weatherproof roof finished before dinner. Never endure a multi-day construction zone.
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
                  7:00 AM Arrival · 6:00 PM Final Walkthrough
                </div>
              </div>

              {/* Pillar 4 */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="w-11 h-11 rounded-xl bg-[#EA580C]/15 border border-[#EA580C]/40 flex items-center justify-center text-amber-400">
                    <Plane className="w-6 h-6" />
                  </div>
                  <div className="text-xs font-mono-tabular text-amber-400 font-semibold">
                    04 · ZERO KITCHEN-TABLE SALES PITCH
                  </div>
                  <h3 className="text-lg font-bold font-display text-white">
                    No-Contact 4K Drone Inspection Option
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Hate pushy salesmen? We fly our drone and text you the HD video report and itemized quote without you even needing to be home!
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-800 text-xs text-amber-400 font-semibold">
                  15-Minute Autonomous Roof Scan
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. INTERACTIVE "NEW ROOF TODAY, PAY MONTHLY" FINANCING CALCULATOR */}
        <FinancingCalculator
          onOpenPreQualModal={(cost, term, monthly) =>
            setPreQualState({ isOpen: true, cost, term, monthly })
          }
        />

        {/* 7. SOCIAL PROOF, BEFORE/AFTER & RECENT NEIGHBORHOOD INSTALLS */}
        <section className="py-16 sm:py-24 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
            {/* Part A: 3 Verified Homeowner Review Cards */}
            <div>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold text-[#1E3A8A]">
                    05. Verified DFW Homeowner Case Studies &amp; Claim Wins
                  </div>
                  <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#0F172A] mt-1.5 text-balance">
                    Over 1,850 North Texas Roofs Replaced — See What Your Neighbors Say
                  </h2>
                </div>
                <div className="text-xs sm:text-sm font-semibold text-slate-600 font-mono-tabular">
                  5.0★ Average Rating Across 324 Google &amp; BBB Reviews
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {VERIFIED_REVIEWS.map((rev) => (
                  <article
                    key={rev.displayName}
                    className="bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 flex flex-col justify-between space-y-5"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-[#0F172A] flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-[#EA580C]" />
                          {rev.location}
                        </span>
                        <span>{rev.date}</span>
                      </div>

                      <div className="flex items-center gap-0.5 text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-500" />
                        ))}
                      </div>

                      <div className="text-xs font-bold text-[#1E3A8A]">
                        {rev.claimOutcome}
                      </div>

                      <p className="text-sm text-slate-700 leading-relaxed">
                        &ldquo;{rev.quote}&rdquo;
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-200">
                      <div className="font-bold text-sm text-[#0F172A]">
                        {rev.displayName}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        System: {rev.shingleInstalled}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* Part B: Interactive Before/After Hail Restoration Inspection Spotlight + Why Choose Summit Shield vs. Storm Chasers */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left 5 Cols: Interactive Before/After Hail Case Study */}
              <div className="lg:col-span-5 bg-[#0F172A] text-white rounded-2xl border border-slate-800 p-6 sm:p-7 flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold text-amber-400">
                      Frisco, TX Hail Restoration Spotlight
                    </span>
                    <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-lg">
                      <button
                        type="button"
                        onClick={() => setBeforeAfterView('before')}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                          beforeAfterView === 'before'
                            ? 'bg-[#EA580C] text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        Before (Hail Damage)
                      </button>
                      <button
                        type="button"
                        onClick={() => setBeforeAfterView('after')}
                        className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                          beforeAfterView === 'after'
                            ? 'bg-emerald-600 text-white'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        After (1-Day Install)
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white mt-3">
                    {beforeAfterView === 'before'
                      ? 'Before: 1.75" Hail Mat Fractures & Granule Loss'
                      : 'After: GAF Timberline HDZ Class 4 Charcoal System'}
                  </h3>

                  {/* SVG Forensic Roof Comparison Graphic */}
                  <div className="mt-4 rounded-xl overflow-hidden border border-slate-800 bg-slate-950 aspect-16/10 relative">
                    {beforeAfterView === 'before' ? (
                      <svg
                        viewBox="0 0 500 310"
                        className="w-full h-full object-cover"
                        aria-label="Forensic drone diagram showing hail impact bruises on aged shingle roof"
                      >
                        <rect width="500" height="310" fill="#334155" />
                        {/* Aged Worn Shingle Courses */}
                        {[0, 50, 100, 150, 200, 250].map((y) => (
                          <g key={y}>
                            <line
                              x1="0"
                              y1={y}
                              x2="500"
                              y2={y}
                              stroke="#0F172A"
                              strokeWidth="3"
                            />
                            <line
                              x1={(y * 3) % 120}
                              y1={y}
                              x2={(y * 3) % 120}
                              y2={y + 50}
                              stroke="#0F172A"
                              strokeWidth="2"
                            />
                            <line
                              x1={((y * 3) % 120) + 160}
                              y1={y}
                              x2={((y * 3) % 120) + 160}
                              y2={y + 50}
                              stroke="#0F172A"
                              strokeWidth="2"
                            />
                            <line
                              x1={((y * 3) % 120) + 320}
                              y1={y}
                              x2={((y * 3) % 120) + 320}
                              y2={y + 50}
                              stroke="#0F172A"
                              strokeWidth="2"
                            />
                          </g>
                        ))}
                        {/* Chalk Circle Forensic Hail Markers */}
                        {[
                          { cx: 110, cy: 75, label: 'Hit #1 (1.5")' },
                          { cx: 260, cy: 120, label: 'Hit #2 (1.75")' },
                          { cx: 380, cy: 85, label: 'Hit #3 (Bruise)' },
                          { cx: 155, cy: 185, label: 'Hit #4 (Exposed Mat)' },
                          { cx: 325, cy: 215, label: 'Hit #5 (Creased Tab)' },
                        ].map((hit) => (
                          <g key={hit.label}>
                            <circle
                              cx={hit.cx}
                              cy={hit.cy}
                              r="22"
                              fill="none"
                              stroke="#F59E0B"
                              strokeWidth="3"
                              strokeDasharray="5 3"
                            />
                            <circle cx={hit.cx} cy={hit.cy} r="7" fill="#0F172A" />
                            <text
                              x={hit.cx - 32}
                              y={hit.cy + 36}
                              fill="#FDE68A"
                              fontSize="11"
                              fontWeight="700"
                              fontFamily="JetBrains Mono, monospace"
                            >
                              {hit.label}
                            </text>
                          </g>
                        ))}
                      </svg>
                    ) : (
                      <svg
                        viewBox="0 0 500 310"
                        className="w-full h-full object-cover"
                        aria-label="Completed GAF Timberline HDZ Charcoal Black architectural shingle installation"
                      >
                        <rect width="500" height="310" fill="#1E242B" />
                        {[0, 44, 88, 132, 176, 220, 264].map((y, idx) => (
                          <g key={y}>
                            <rect
                              x="0"
                              y={y}
                              width="500"
                              height="42"
                              fill={idx % 2 === 0 ? '#1E242B' : '#262F38'}
                            />
                            <line
                              x1="0"
                              y1={y + 42}
                              x2="500"
                              y2={y + 42}
                              stroke="#090D16"
                              strokeWidth="3"
                            />
                          </g>
                        ))}
                        {/* High-Profile Cobra Ridge Vent */}
                        <rect
                          x="0"
                          y="0"
                          width="500"
                          height="34"
                          fill="#334155"
                          stroke="#475569"
                          strokeWidth="2"
                        />
                        <rect
                          x="95"
                          y="105"
                          width="310"
                          height="78"
                          rx="10"
                          fill="#0F172A"
                          opacity="0.92"
                          stroke="#10B981"
                          strokeWidth="2"
                        />
                        <text
                          x="120"
                          y="138"
                          fill="#34D399"
                          fontSize="13"
                          fontWeight="700"
                          fontFamily="JetBrains Mono, monospace"
                        >
                          PASSED 21-POINT MASTER ELITE AUDIT
                        </text>
                        <text
                          x="120"
                          y="162"
                          fill="#F8FAFC"
                          fontSize="12"
                          fontFamily="Plus Jakarta Sans, sans-serif"
                        >
                          130 MPH WindProven™ + Ice &amp; Water Valley Shield
                        </text>
                      </svg>
                    )}
                  </div>

                  <p className="text-xs text-slate-300 mt-4 leading-relaxed">
                    {beforeAfterView === 'before'
                      ? 'Drone inspection at 4820 Legacy Dr revealed 11 functional hail bruises per 10x10 test square plus dented box vents—securing a $19,800 carrier replacement payout.'
                      : 'Completed in 9.5 hours: complete tear-off to bare OSB decking, GAF FeltBuster® synthetic underlayment, StormGuard® valley lining, and Class 4 impact shingles.'}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Recent Installs: Frisco · Plano · McKinney · Southlake</span>
                  <button
                    type="button"
                    onClick={() =>
                      setSampleModalSwatch(SHINGLE_SWATCHES[0])
                    }
                    className="text-amber-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Get This Shingle Sample</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right 7 Cols: Why Choose Summit Shield vs. Storm Chasers Comparison Checklist */}
              <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-semibold text-[#EA580C]">
                    Protect Your Home Equity From Fly-By-Night Contractors
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold font-display text-[#0F172A] mt-1">
                    Why Choose Summit Shield vs. &ldquo;Storm Chasers&rdquo;
                  </h3>

                  <div className="mt-6 space-y-4">
                    {COMPARISON_ROWS.map((row) => (
                      <div
                        key={row.criteria}
                        className="p-4 rounded-xl bg-white border border-slate-200 space-y-2"
                      >
                        <div className="text-xs font-bold text-slate-500">
                          {row.criteria}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <div className="flex items-start gap-2 text-xs sm:text-sm font-semibold text-[#0F172A]">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{row.summit}</span>
                          </div>
                          <div className="flex items-start gap-2 text-xs text-slate-500">
                            <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                            <span>{row.chasers}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="text-xs text-slate-600">
                    <strong>Physical DFW Showroom:</strong> 14200 Midway Rd, Suite 210, Dallas, TX 75244
                  </div>
                  <a
                    href="#calculator-card"
                    className="py-2.5 px-4 bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs rounded-lg text-center transition-colors whitespace-nowrap shrink-0"
                  >
                    Get Instant 60-Sec Estimate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* QUIET FOOTER */}
      <footer className="bg-[#0F172A] text-slate-400 border-t border-slate-800 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="text-base font-extrabold font-display text-white">
              SUMMIT SHIELD ROOFING &amp; STORM RESTORATION
            </div>
            <p>
              14200 Midway Rd, Suite 210, Dallas, TX 75244 · (214) 555-0188 · RCAT Licensed &amp; GAF Master Elite® #ME-40921
            </p>
            <p className="text-slate-500">
              Serving Dallas, Fort Worth, Plano, Frisco, McKinney, Southlake, Arlington, Richardson, Keller, and Highland Park.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-300 font-medium">
            <a href="#calculator-card" className="hover:text-white whitespace-nowrap">
              Roof Calculator
            </a>
            <a href="#storm-insurance-check" className="hover:text-white whitespace-nowrap">
              Insurance Claim Check
            </a>
            <a href="#shingle-visualizer" className="hover:text-white whitespace-nowrap">
              Shingle Visualizer
            </a>
            <a href="#zero-nail-guarantee" className="hover:text-white whitespace-nowrap">
              $50/Nail Guarantee
            </a>
            <a href="#financing" className="hover:text-white whitespace-nowrap">
              Monthly Financing
            </a>
          </div>
        </div>
      </footer>

      {/* 8. FLOATING EMERGENCY LEAK / DRONE INSPECTION DISPATCH WIDGET & MODALS */}
      <FloatingDispatchWidget
        isOpen={dispatchOpen}
        setIsOpen={setDispatchOpen}
        initialMode={dispatchMode}
        setInitialMode={setDispatchMode}
      />

      <SampleRequestModal
        isOpen={Boolean(sampleModalSwatch)}
        swatch={sampleModalSwatch}
        onClose={() => setSampleModalSwatch(null)}
      />

      <PreQualModal
        isOpen={preQualState.isOpen}
        roofCost={preQualState.cost}
        term={preQualState.term}
        monthlyPayment={preQualState.monthly}
        onClose={() => setPreQualState((prev) => ({ ...prev, isOpen: false }))}
      />

      <MobileStickyBottomBar onEmergencyClick={openEmergencyTarping} />
    </div>
  );
}
