import React, { useState } from 'react';
import {
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  ShieldCheck,
  Plane,
  MapPin,
  Sparkles,
  PhoneCall,
} from 'lucide-react';
import {
  ServiceNeed,
  RoofMaterial,
  HomeSizeTier,
  SERVICE_NEEDS,
  ROOF_MATERIALS,
  HOME_SIZE_TIERS,
  calculateRoofEstimate,
  validateLeadCapture,
  RoofEstimateResult,
} from '../utils/roofingCalculations';

interface RoofCalculatorCardProps {
  onOpenEmergencyModal: () => void;
}

export const RoofCalculatorCard: React.FC<RoofCalculatorCardProps> = ({
  onOpenEmergencyModal,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [need, setNeed] = useState<ServiceNeed>('storm_insurance');
  const [material, setMaterial] = useState<RoofMaterial>('architectural_asphalt');
  const [size, setSize] = useState<HomeSizeTier>('1800_to_2800');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [estimateResult, setEstimateResult] = useState<RoofEstimateResult | null>(null);

  const handleSelectNeed = (selected: ServiceNeed) => {
    setNeed(selected);
    setStep(2);
  };

  const handleSelectMaterial = (selected: RoofMaterial) => {
    setMaterial(selected);
    setStep(3);
  };

  const handleSelectSize = (selected: HomeSizeTier) => {
    setSize(selected);
    setStep(4);
  };

  const handleCalculateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateLeadCapture({ fullName, phone, address });
    if (!validation.valid) {
      setFormError(validation.error ?? 'Please complete all required fields.');
      return;
    }
    setFormError(null);
    const computed = calculateRoofEstimate({
      need,
      material,
      size,
      fullName,
      phone,
      address,
    });
    setEstimateResult(computed);
    setStep(5);
  };

  const handleReset = () => {
    setStep(1);
    setFormError(null);
  };

  const progressPercentage = step === 5 ? 100 : step * 25;

  return (
    <div
      id="calculator-card"
      className="bg-white text-[#0F172A] rounded-2xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col justify-between"
    >
      {/* Top Calculator Header */}
      <div className="bg-[#0F172A] px-6 py-5 border-b border-slate-800">
        <div className="flex items-center justify-between gap-2 text-xs text-amber-400 font-semibold">
          <span>Interactive Satellite & Drone Estimator</span>
          <span className="font-mono-tabular">
            {step === 5 ? 'Estimate Unlocked' : `Step ${step} of 4`}
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white font-display mt-1">
          Get Your Instant Roof Estimate in 60 Seconds
        </h2>
        {/* Progress Bar */}
        <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
          <div
            className="h-full bg-[#EA580C] transition-all duration-200"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Body Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <p className="text-xs font-semibold text-[#1E3A8A]">
                01. Project Scope · Select One Option Below
              </p>
              <h3 className="text-lg font-bold text-[#0F172A] mt-0.5">
                What Do You Need?
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {SERVICE_NEEDS.map((item) => {
                const isSelected = need === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleSelectNeed(item.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#EA580C] bg-orange-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-[#1E3A8A] hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#0F172A] text-sm sm:text-base">
                          {item.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {item.shortDesc} · <span className="text-[#EA580C] font-semibold">{item.tag}</span>
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#EA580C] shrink-0" />
                  </button>
                );
              })}
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
              <span>Includes Free 4K Drone Roof Report ($350 Value)</span>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="font-semibold text-[#EA580C] hover:underline whitespace-nowrap shrink-0 cursor-pointer"
              >
                Next Step &rarr;
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#1E3A8A]">
                  02. Material Grade · Texas Wind & Hail Rated
                </p>
                <h3 className="text-lg font-bold text-[#0F172A] mt-0.5">
                  Desired Roof Material
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0F172A] px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {ROOF_MATERIALS.map((mat) => {
                const isSelected = material === mat.id;
                return (
                  <button
                    key={mat.id}
                    type="button"
                    onClick={() => handleSelectMaterial(mat.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#EA580C] bg-orange-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-[#1E3A8A] hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#0F172A] text-sm sm:text-base">
                        {mat.label}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">{mat.shortDesc}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#EA580C] shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#1E3A8A]">
                  03. Footprint & Pitch · Satellite Calibration
                </p>
                <h3 className="text-lg font-bold text-[#0F172A] mt-0.5">
                  Approximate Home Size & Pitch
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0F172A] px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {HOME_SIZE_TIERS.map((tier) => {
                const isSelected = size === tier.id;
                return (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => handleSelectSize(tier.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'border-[#EA580C] bg-orange-50/70 shadow-sm'
                        : 'border-slate-200 hover:border-[#1E3A8A] hover:bg-slate-50'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-[#0F172A] text-base font-mono-tabular">
                        {tier.label}
                      </div>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {tier.squaresLabel} · {tier.pitchNote}
                      </p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[#EA580C] shrink-0" />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {step === 4 && (
          <form onSubmit={handleCalculateSubmit} className="space-y-4" noValidate>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-[#1E3A8A]">
                  04. Satellite Roof Measurement & Voucher Lock
                </p>
                <h3 className="text-lg font-bold text-[#0F172A] mt-0.5">
                  Where Should We Calibrate Satellite Pitch?
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-[#0F172A] px-2.5 py-1.5 rounded-lg border border-slate-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back
              </button>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-lg border border-slate-200">
              Selected:{' '}
              <strong className="text-[#0F172A]">
                {SERVICE_NEEDS.find((n) => n.id === need)?.label}
              </strong>{' '}
              ·{' '}
              <strong className="text-[#0F172A]">
                {ROOF_MATERIALS.find((m) => m.id === material)?.label}
              </strong>{' '}
              ·{' '}
              <strong className="text-[#0F172A]">
                {HOME_SIZE_TIERS.find((s) => s.id === size)?.label}
              </strong>
            </div>

            {formError && (
              <div
                role="alert"
                className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700"
              >
                {formError}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label
                  htmlFor="calc-full-name"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="calc-full-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Brandon Miller"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="calc-phone"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Phone Number (For Instant SMS Estimate & Drone Video Link) *
                </label>
                <input
                  id="calc-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. (214) 555-0194"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="calc-address"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Exact Street Address (For Satellite Roof Measurement) *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="calc-address"
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="e.g. 4820 Preston Rd, Frisco, TX 75034"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-5 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-sm sm:text-base rounded-xl shadow-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              Calculate Roof Estimate & Unlock Drone Check
            </button>

            <p className="text-[11px] text-slate-500 text-center">
              100% Privacy Guaranteed · Zero Pushy Sales Calls · Direct DFW Estimator
            </p>
          </form>
        )}

        {step === 5 && estimateResult && (
          <div className="space-y-4" data-testid="calculator-result-screen">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Satellite Estimate Calculated for {fullName}</span>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="text-xs font-semibold text-[#1E3A8A] hover:underline cursor-pointer whitespace-nowrap shrink-0"
              >
                Recalculate
              </button>
            </div>

            {/* Primary Dynamic Estimate Box */}
            <div className="p-4 sm:p-5 rounded-xl bg-[#0F172A] text-white space-y-2">
              <div className="text-xs text-amber-400 font-semibold">
                {estimateResult.needLabel} · {estimateResult.materialLabel}
              </div>
              <div className="text-xl sm:text-2xl font-extrabold font-display text-white font-mono-tabular">
                {estimateResult.headlineRange}
              </div>
              <p className="text-xs text-slate-300">{estimateResult.subHeadline}</p>
              <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block">Satellite Footprint:</span>
                  <span className="font-semibold text-white font-mono-tabular">
                    {estimateResult.estimatedSquares}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block">Completion Speed:</span>
                  <span className="font-semibold text-amber-400">
                    {estimateResult.installTimeline}
                  </span>
                </div>
              </div>
            </div>

            {/* Bonus Unlocked Box */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-300 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-[#EA580C]">
                <Plane className="w-4 h-4 shrink-0" />
                <span>BONUS UNLOCKED · VOUCHER #{estimateResult.voucherCode}</span>
              </div>
              <div className="text-sm font-bold text-[#0F172A]">
                Free 4K Drone Roof Report Voucher ($350 Value) Reserved for Your Address!
              </div>
              <p className="text-xs text-slate-700">
                Locked for <strong className="text-[#0F172A]">{address}</strong>. Our FAA-Certified
                DFW Roof Inspector will text <strong className="text-[#0F172A]">{phone}</strong> within
                15 minutes with your satellite pitch breakdown and drone flight window.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5">
              <a
                href="tel:2145550188"
                className="flex-1 py-3 px-4 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-xs sm:text-sm rounded-xl text-center inline-flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
              >
                <PhoneCall className="w-4 h-4" />
                Fast-Track: (214) 555-0188
              </a>
              <button
                type="button"
                onClick={onOpenEmergencyModal}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                Pick Exact Drone Time
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Trust Footer */}
      <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-[#1E3A8A] shrink-0" />
          <span>GAF Master Elite® #ME-40921</span>
        </div>
        <span>Zero-Obligation Written Estimate</span>
      </div>
    </div>
  );
};
