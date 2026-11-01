import React, { useState } from 'react';
import { ShieldCheck, Lock, CheckCircle2, DollarSign } from 'lucide-react';
import {
  FinancingTerm,
  calculateMonthlyPayment,
} from '../utils/roofingCalculations';

interface FinancingCalculatorProps {
  onOpenPreQualModal: (cost: number, term: FinancingTerm, monthly: number) => void;
}

const TERM_OPTIONS: { id: FinancingTerm; label: string; sub: string }[] = [
  {
    id: '120_months',
    label: '120 Months',
    sub: 'Lowest Monthly Payment',
  },
  {
    id: '60_months',
    label: '60 Months',
    sub: 'Fast Equity Payoff',
  },
  {
    id: '12_months_zero_apr',
    label: '$0 Down / 0% APR for 12 Months',
    sub: 'Same-As-Cash Promo',
  },
];

export const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({
  onOpenPreQualModal,
}) => {
  const [roofCost, setRoofCost] = useState<number>(10500);
  const [selectedTerm, setSelectedTerm] = useState<FinancingTerm>('120_months');

  const calc = calculateMonthlyPayment(roofCost, selectedTerm);

  return (
    <section
      id="financing"
      className="py-16 sm:py-24 bg-[#F8FAFC] border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-semibold text-[#1E3A8A]">
            04. Flexible Payment Programs · GoodLeap®, Sunlight Financial & Synchrony
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-[#0F172A] mt-1.5 text-balance">
            Don&apos;t Wait on a Leaking Roof — Get a Full Replacement Starting at $129/Month
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5">
            Whether you are financing a retail replacement or bridging your storm insurance deductible, customize your budget below with zero prepayment penalties.
          </p>
        </div>

        <div className="mt-10 bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          {/* Left 7 Cols: Interactive Controls */}
          <div className="lg:col-span-7 p-6 sm:p-9 space-y-8 flex flex-col justify-between">
            {/* Slider Control */}
            <div className="space-y-3">
              <div className="flex items-end justify-between">
                <label
                  htmlFor="roof-cost-slider"
                  className="text-xs sm:text-sm font-bold text-[#0F172A]"
                >
                  1. Adjust Estimated Roof Project Cost ($6,000 – $25,000)
                </label>
                <span
                  data-testid="financing-cost-display"
                  className="text-2xl sm:text-3xl font-extrabold font-display text-[#1E3A8A] font-mono-tabular"
                >
                  ${roofCost.toLocaleString()}
                </span>
              </div>

              <input
                id="roof-cost-slider"
                type="range"
                min={6000}
                max={25000}
                step={500}
                value={roofCost}
                onChange={(e) => setRoofCost(Number(e.target.value))}
                className="w-full summit-slider bg-slate-200"
              />

              <div className="flex items-center justify-between text-xs text-slate-500 font-mono-tabular">
                <span>$6,000 (Small Roof / Deductible)</span>
                <span>$15,000 (Avg DFW Home)</span>
                <span>$25,000 (Custom Estate)</span>
              </div>
            </div>

            {/* Term Selector Buttons */}
            <div className="space-y-3">
              <div className="text-xs sm:text-sm font-bold text-[#0F172A]">
                2. Select Your Preferred Payment Term
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TERM_OPTIONS.map((option) => {
                  const isActive = selectedTerm === option.id;
                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setSelectedTerm(option.id)}
                      className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                        isActive
                          ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-md'
                          : 'bg-slate-50 text-[#0F172A] border-slate-200 hover:border-[#1E3A8A]'
                      }`}
                    >
                      <div className="font-bold text-xs sm:text-sm">{option.label}</div>
                      <div
                        className={`text-[11px] mt-1 ${
                          isActive ? 'text-amber-400' : 'text-slate-500'
                        }`}
                      >
                        {option.sub}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>$0 Down Required at Signing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No Early Payoff Penalty</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Approvals Down to 600 FICO</span>
              </div>
            </div>
          </div>

          {/* Right 5 Cols: Real-Time Payment Output */}
          <div className="lg:col-span-5 bg-[#0F172A] text-white p-6 sm:p-9 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="text-xs font-semibold text-amber-400">
                Real-Time Monthly Payment Estimate
              </div>
              <div className="flex items-baseline gap-2">
                <span
                  data-testid="financing-monthly-output"
                  className="text-4xl sm:text-5xl font-extrabold font-display text-white font-mono-tabular"
                >
                  ${calc.monthlyPayment.toLocaleString()}
                </span>
                <span className="text-slate-400 text-sm font-medium">/ month</span>
              </div>

              <div className="text-xs font-semibold text-slate-300">
                Plan: <span className="text-amber-400">{calc.aprLabel}</span> · Project Amount:{' '}
                <span className="font-mono-tabular">${calc.roofCost.toLocaleString()}</span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                {calc.totalInterestNote}
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() =>
                  onOpenPreQualModal(calc.roofCost, calc.term, calc.monthlyPayment)
                }
                className="w-full py-4 px-5 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Check Pre-Qualification in 60 Seconds (Soft Credit Pull — Zero Score Impact)
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400">
                <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>256-Bit Encrypted Soft Inquiry · Does Not Affect Credit Score</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
