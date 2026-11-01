import React, { useState } from 'react';
import {
  CloudLightning,
  CheckCircle2,
  Camera,
  UserCheck,
  Hammer,
  RotateCcw,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';
import {
  ClaimAnswers,
  evaluateClaimEligibility,
} from '../utils/roofingCalculations';

interface StormClaimCheckerProps {
  onBookDroneCheck: () => void;
}

const QUESTIONS = [
  {
    key: 'recentStorm' as const,
    number: 'Question 1 of 3',
    question: 'Did your area experience hail or 50+ mph winds in the last 12 months?',
    helper:
      'Dallas, Plano, Frisco, Arlington, Fort Worth, McKinney & Southlake have recorded 14 NOAA-verified hail events in the past 12 months.',
  },
  {
    key: 'roofOver7Years' as const,
    number: 'Question 2 of 3',
    question: 'Is your roof over 7 years old?',
    helper:
      'Asphalt shingles over 7 years old lose granulate elasticity, making hail mat fractures far more likely to qualify for full replacement.',
  },
  {
    key: 'visibleGranulesOrDents' as const,
    number: 'Question 3 of 3',
    question: 'Do you see granules in your gutters or dents on vents?',
    helper:
      'Even if you are unsure from the ground, soft-metal box vents, gutter downspouts, and AC fins act as primary collateral proof for adjusters.',
  },
];

export const StormClaimChecker: React.FC<StormClaimCheckerProps> = ({
  onBookDroneCheck,
}) => {
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<ClaimAnswers>({
    recentStorm: null,
    roofOver7Years: null,
    visibleGranulesOrDents: null,
  });
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleAnswer = (val: boolean) => {
    const activeQuestion = QUESTIONS[currentQIndex];
    const updated: ClaimAnswers = {
      ...answers,
      [activeQuestion.key]: val,
    };
    setAnswers(updated);

    if (currentQIndex < QUESTIONS.length - 1) {
      setCurrentQIndex(currentQIndex + 1);
    } else {
      setIsComplete(true);
    }
  };

  const handleReset = () => {
    setAnswers({
      recentStorm: null,
      roofOver7Years: null,
      visibleGranulesOrDents: null,
    });
    setCurrentQIndex(0);
    setIsComplete(false);
  };

  const result = evaluateClaimEligibility(answers);

  return (
    <section
      id="storm-insurance-check"
      className="py-16 sm:py-24 bg-[#0F172A] text-white border-y border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-amber-400 tracking-wide">
            01. Texas Storm Restoration & Xactimate® Claim Advocacy
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-white mt-2 text-balance">
            Did Recent Hail or High Winds Hit Your Neighborhood? Find Out in 30 Seconds if Insurance Will Pay for 100% of Your New Roof
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-3 leading-relaxed">
            Texas homeowners already pay some of the highest wind and hail premiums in America. Use our 3-question diagnostic tool below to check your address eligibility before filing a claim.
          </p>
        </div>

        {/* Main Interactive Grid: Left 3-Question Checker, Right 3-Step Timeline */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Interactive Checker Card (7 Cols) */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            {!isComplete ? (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="flex items-center gap-2.5">
                    <CloudLightning className="w-5 h-5 text-amber-400 shrink-0" />
                    <span className="text-xs font-bold text-amber-400 font-mono-tabular">
                      {QUESTIONS[currentQIndex].number}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    {QUESTIONS.map((q, idx) => (
                      <span
                        key={q.key}
                        className={`h-2 w-8 rounded-full transition-colors ${
                          idx <= currentQIndex ? 'bg-[#EA580C]' : 'bg-slate-800'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="py-2">
                  <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
                    {QUESTIONS[currentQIndex].question}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-2 leading-relaxed">
                    {QUESTIONS[currentQIndex].helper}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => handleAnswer(true)}
                    className="py-4 px-5 rounded-xl bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-sm sm:text-base transition-colors flex items-center justify-between cursor-pointer whitespace-nowrap"
                  >
                    <span>Yes, Definitely / Likely</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAnswer(false)}
                    className="py-4 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-100 font-semibold text-sm sm:text-base border border-slate-700 transition-colors flex items-center justify-between cursor-pointer whitespace-nowrap"
                  >
                    <span>No / Not Sure From Ground</span>
                    <ArrowRight className="w-4 h-4 shrink-0" />
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Calibrated for State Farm, Allstate, USAA, Liberty Mutual, Farmers & Travelers</span>
                  <span className="font-mono-tabular">Step {currentQIndex + 1}/3</span>
                </div>
              </div>
            ) : (
              <div className="space-y-5" data-testid="claim-eligibility-result">
                <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
                  <div>
                    <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 shrink-0" />
                      <span>{result.probabilityBadge}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-extrabold font-display text-white mt-1">
                      {result.statusTitle}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-3xl font-extrabold font-mono-tabular text-amber-400">
                      {result.scorePercent}%
                    </div>
                    <span className="text-[11px] text-slate-400">Eligibility Index</span>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {result.summaryReason}
                </p>

                <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-400 block">Estimated Homeowner Cost:</span>
                    <strong className="text-amber-400 text-sm block mt-0.5">
                      {result.estimatedOutOfPocket}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Recommended Next Step:</span>
                    <strong className="text-white text-sm block mt-0.5">
                      Free 21-Point 4K Drone Evidence Packet
                    </strong>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={onBookDroneCheck}
                    className="w-full sm:flex-1 py-3.5 px-5 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                  >
                    Book Free 21-Point Drone Claim Check
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto py-3.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Retake Check
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Visual 3-Step Insurance Timeline (5 Cols) */}
          <div className="lg:col-span-5 bg-slate-900/70 rounded-2xl border border-slate-800 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="text-xs font-semibold text-amber-400">
                Turnkey Insurance Restoration Protocol
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-display text-white mt-1">
                Our 3-Step Zero-Hassle Claim Timeline
              </h3>

              <div className="mt-6 space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#1E3A8A] text-amber-400 font-mono-tabular font-bold text-sm flex items-center justify-center shrink-0">
                    01
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-amber-400 shrink-0" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        Step 1: Free 21-Point Photo & Drone Documentation
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      We map every hail bruise, creased wind shingle, and dented soft-metal vent using 4K thermal & optical drones before you ever call your insurer.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#1E3A8A] text-amber-400 font-mono-tabular font-bold text-sm flex items-center justify-center shrink-0">
                    02
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        Step 2: We Meet Your Insurance Adjuster On-Site (So You Don&apos;t Get Lowballed)
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Our HAAG-Certified Storm Inspector walks the roof shoulder-to-shoulder with your carrier&apos;s adjuster to ensure ice & water shield, drip edge, and ridge vents are fully funded.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg bg-[#EA580C] text-white font-mono-tabular font-bold text-sm flex items-center justify-center shrink-0">
                    03
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <Hammer className="w-4 h-4 text-amber-400 shrink-0" />
                      <h4 className="font-bold text-white text-sm sm:text-base">
                        Step 3: Brand New 50-Year Roof Installed in 1 Day for Just Your Deductible!
                      </h4>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                      Once approved, our W2 Master Elite crew completes your entire tear-off, synthetic underlayment, and Class 4 upgrade in a single day.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 flex items-center gap-2.5 text-xs text-slate-300">
              <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
              <span>94.6% Carrier Supplement Approval Rate Across DFW Metroplex</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
