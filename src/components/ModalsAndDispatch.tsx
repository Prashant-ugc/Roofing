import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  PhoneCall,
  Plane,
  AlertTriangle,
  PackageCheck,
  ShieldCheck,
  Calculator,
  Clock,
} from 'lucide-react';
import {
  ShingleSwatch,
  FinancingTerm,
  validateLeadCapture,
} from '../utils/roofingCalculations';

interface SampleModalProps {
  isOpen: boolean;
  swatch: ShingleSwatch | null;
  onClose: () => void;
}

export const SampleRequestModal: React.FC<SampleModalProps> = ({
  isOpen,
  swatch,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !swatch) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateLeadCapture({ fullName: name, phone, address });
    if (!check.valid) {
      setError(check.error ?? 'Please fill out all fields.');
      return;
    }
    setError(null);
    setSubmitted(true);
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs"
    >
      <div className="bg-white text-[#0F172A] rounded-2xl border border-slate-200 max-w-lg w-full shadow-2xl overflow-hidden">
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PackageCheck className="w-5 h-5 text-amber-400" />
            <h3 id="sample-modal-title" className="font-bold font-display text-lg">
              Free Physical Shingle Sample Drop-Off
            </h3>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close sample request modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-lg shrink-0 border border-slate-300"
                  style={{
                    background: `linear-gradient(135deg, ${swatch.swatchHexPrimary}, ${swatch.swatchHexHighlight})`,
                  }}
                />
                <div>
                  <div className="text-xs text-slate-500">Selected Primary Sample Board:</div>
                  <div className="font-bold text-sm text-[#0F172A]">{swatch.fullLabel}</div>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700"
                >
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="sample-name"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Your Full Name *
                </label>
                <input
                  id="sample-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rachel Thompson"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="sample-phone"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Mobile Phone (For Delivery Text Notification) *
                </label>
                <input
                  id="sample-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. (214) 555-0166"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="sample-address"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  DFW Delivery Street Address *
                </label>
                <input
                  id="sample-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 3910 Lovers Ln, Dallas, TX"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-5 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Confirm Free Sample Board Delivery
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center py-4" data-testid="sample-modal-confirmation">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-xl font-bold font-display text-[#0F172A]">
                Physical Sample Kit Dispatched for {name}!
              </h4>
              <p className="text-sm text-slate-600">
                We have queued a full-size sample board of{' '}
                <strong className="text-[#0F172A]">{swatch.fullLabel}</strong> plus two complementary
                comparison swatches for porch drop-off at{' '}
                <strong className="text-[#0F172A]">{address}</strong>.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="py-3 px-6 bg-[#0F172A] text-white font-semibold text-xs rounded-xl cursor-pointer"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface PreQualModalProps {
  isOpen: boolean;
  roofCost: number;
  term: FinancingTerm;
  monthlyPayment: number;
  onClose: () => void;
}

export const PreQualModal: React.FC<PreQualModalProps> = ({
  isOpen,
  roofCost,
  monthlyPayment,
  onClose,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [income, setIncome] = useState('$85,000 – $125,000');
  const [error, setError] = useState<string | null>(null);
  const [approved, setApproved] = useState(false);

  if (!isOpen) return null;

  const handlePreQualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateLeadCapture({ fullName: name, phone, address });
    if (!check.valid) {
      setError(check.error ?? 'Please complete all required fields.');
      return;
    }
    setError(null);
    setApproved(true);
  };

  const resetAndClose = () => {
    setApproved(false);
    setError(null);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="prequal-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-xs"
    >
      <div className="bg-white text-[#0F172A] rounded-2xl border border-slate-200 max-w-lg w-full shadow-2xl overflow-hidden">
        <div className="bg-[#0F172A] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h3 id="prequal-modal-title" className="font-bold font-display text-lg">
              60-Second Soft-Pull Pre-Qualification
            </h3>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close financing pre-qualification modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {!approved ? (
            <form onSubmit={handlePreQualSubmit} className="space-y-4" noValidate>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-500 block">Requested Roof Line of Credit:</span>
                  <strong className="text-base font-mono-tabular text-[#0F172A]">
                    ${roofCost.toLocaleString()}
                  </strong>
                </div>
                <div className="text-right">
                  <span className="text-slate-500 block">Estimated Payment:</span>
                  <strong className="text-base font-mono-tabular text-[#EA580C]">
                    ${monthlyPayment.toLocaleString()}/mo
                  </strong>
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700"
                >
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="prequal-name"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Homeowner Full Name *
                </label>
                <input
                  id="prequal-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Christopher Davis"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label
                    htmlFor="prequal-phone"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <input
                    id="prequal-phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="(214) 555-0142"
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="prequal-income"
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Household Income Tier
                  </label>
                  <select
                    id="prequal-income"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none bg-white"
                  >
                    <option value="$50,000 – $85,000">$50,000 – $85,000</option>
                    <option value="$85,000 – $125,000">$85,000 – $125,000</option>
                    <option value="$125,000 – $200,000">$125,000 – $200,000</option>
                    <option value="$200,000+">$200,000+</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="prequal-address"
                  className="block text-xs font-semibold text-slate-700 mb-1"
                >
                  Property Address *
                </label>
                <input
                  id="prequal-address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. 1408 Main St, Southlake, TX"
                  className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-5 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-sm rounded-xl shadow-md transition-colors cursor-pointer whitespace-nowrap"
              >
                Run Instant Soft-Pull Check (Zero Credit Impact)
              </button>
            </form>
          ) : (
            <div className="space-y-4 text-center py-4" data-testid="prequal-modal-confirmation">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <div className="text-xs font-bold text-emerald-700">
                PRE-QUALIFICATION APPROVED · SOFT PULL VERIFIED
              </div>
              <h4 className="text-xl font-bold font-display text-[#0F172A]">
                Congratulations {name}! Pre-Qualified Up to $25,000
              </h4>
              <p className="text-sm text-slate-600">
                Your property at <strong className="text-[#0F172A]">{address}</strong> is
                pre-qualified for <strong className="text-[#0F172A]">${roofCost.toLocaleString()}</strong>{' '}
                at an estimated <strong className="text-[#EA580C]">${monthlyPayment}/mo</strong> with $0
                Down. We have texted your approval packet to <strong className="text-[#0F172A]">{phone}</strong>.
              </p>
              <button
                type="button"
                onClick={resetAndClose}
                className="py-3 px-6 bg-[#0F172A] text-white font-semibold text-xs rounded-xl cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

interface FloatingDispatchWidgetProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  initialMode: 'emergency_leak' | 'drone_inspection';
  setInitialMode: (mode: 'emergency_leak' | 'drone_inspection') => void;
}

export const FloatingDispatchWidget: React.FC<FloatingDispatchWidgetProps> = ({
  isOpen,
  setIsOpen,
  initialMode,
  setInitialMode,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [dispatched, setDispatched] = useState(false);

  const handleDispatchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const check = validateLeadCapture({ fullName: name, phone, address });
    if (!check.valid) {
      setError(check.error ?? 'Please enter your name, phone, and address.');
      return;
    }
    setError(null);
    setDispatched(true);
  };

  return (
    <>
      {/* Floating Badge Button in Bottom-Right Corner (Desktop & Tablet) */}
      <div className="hidden md:block fixed bottom-5 right-5 z-40">
        {!isOpen && (
          <button
            type="button"
            onClick={() => {
              setDispatched(false);
              setIsOpen(true);
            }}
            data-testid="floating-dispatch-trigger"
            className="px-4 py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white font-bold text-xs shadow-xl border border-amber-400/60 flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer whitespace-nowrap"
          >
            <Plane className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Free Drone Roof Check / Leak Help</span>
          </button>
        )}
      </div>

      {/* Popup Modal / Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dispatch-widget-title"
          className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 z-50 flex items-end sm:items-center justify-center p-3 sm:p-0 bg-slate-950/60 sm:bg-transparent"
        >
          <div className="bg-white text-[#0F172A] w-full sm:w-96 rounded-2xl border border-slate-200 shadow-2xl overflow-hidden">
            <div className="bg-[#0F172A] text-white px-5 py-4 flex items-center justify-between">
              <div>
                <div className="text-[11px] font-semibold text-amber-400">
                  DFW Rapid Response & Drone Command
                </div>
                <h3 id="dispatch-widget-title" className="font-bold font-display text-base">
                  Instant Dispatch & Drone Scheduler
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close dispatch widget"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5">
              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => {
                    setInitialMode('emergency_leak');
                    setDispatched(false);
                  }}
                  className={`py-2 px-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    initialMode === 'emergency_leak'
                      ? 'bg-[#EA580C] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#0F172A]'
                  }`}
                >
                  Emergency Active Leak
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setInitialMode('drone_inspection');
                    setDispatched(false);
                  }}
                  className={`py-2 px-2.5 text-xs font-bold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                    initialMode === 'drone_inspection'
                      ? 'bg-[#1E3A8A] text-white shadow-xs'
                      : 'text-slate-700 hover:text-[#0F172A]'
                  }`}
                >
                  Schedule Free Drone Inspection
                </button>
              </div>

              {!dispatched ? (
                <form onSubmit={handleDispatchSubmit} className="space-y-3" noValidate>
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                    {initialMode === 'emergency_leak' ? (
                      <>
                        <AlertTriangle className="w-4 h-4 text-[#EA580C] shrink-0" />
                        <span>
                          <strong>2 Tarping Trucks Available Now</strong> · Avg DFW arrival under 90 minutes.
                        </span>
                      </>
                    ) : (
                      <>
                        <Clock className="w-4 h-4 text-[#1E3A8A] shrink-0" />
                        <span>
                          <strong>No-Contact 4K Drone Scan</strong> · Includes 21-point photo packet ($350 value).
                        </span>
                      </>
                    )}
                  </div>

                  {error && (
                    <div
                      role="alert"
                      className="p-2.5 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700"
                    >
                      {error}
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="dispatch-name"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Full Name *
                    </label>
                    <input
                      id="dispatch-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Name"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dispatch-phone"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      Cell Phone Number *
                    </label>
                    <input
                      id="dispatch-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(214) 555-0188"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="dispatch-address"
                      className="block text-xs font-semibold text-slate-700 mb-1"
                    >
                      DFW Street Address *
                    </label>
                    <input
                      id="dispatch-address"
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Street Address & City"
                      className="w-full px-3 py-2 text-xs sm:text-sm rounded-lg border border-slate-300 focus:border-[#1E3A8A] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-4 bg-[#EA580C] hover:bg-[#D9460F] text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors cursor-pointer whitespace-nowrap"
                  >
                    {initialMode === 'emergency_leak'
                      ? 'Dispatch Emergency Leak Crew Now'
                      : 'Lock In Free 4K Drone Inspection'}
                  </button>
                </form>
              ) : (
                <div
                  className="py-4 text-center space-y-3"
                  data-testid="dispatch-confirmation-message"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <div className="text-xs font-bold text-emerald-700">
                    {initialMode === 'emergency_leak'
                      ? 'PRIORITY DISPATCH CONFIRMED · UNIT #DFW-02'
                      : 'DRONE FLIGHT SCHEDULED · VOUCHER ACTIVE'}
                  </div>
                  <h4 className="font-bold text-base text-[#0F172A]">
                    We&apos;re On It, {name}!
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {initialMode === 'emergency_leak'
                      ? `Lead Supervisor Caleb has received your emergency tarping request for ${address} and is calling ${phone} now with live GPS ETA.`
                      : `Your 21-Point 4K Drone Inspection for ${address} is confirmed. Check ${phone} for your confirmation text.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="py-2.5 px-5 bg-[#0F172A] text-white font-semibold text-xs rounded-lg cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

interface MobileStickyBarProps {
  onEmergencyClick: () => void;
}

export const MobileStickyBottomBar: React.FC<MobileStickyBarProps> = ({
  onEmergencyClick,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0F172A] border-t border-slate-800 px-3 py-2 grid grid-cols-2 gap-2 shadow-2xl">
      <button
        type="button"
        onClick={onEmergencyClick}
        className="py-2.5 px-3 rounded-lg bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
      >
        <PhoneCall className="w-3.5 h-3.5 shrink-0" />
        <span>Emergency Leak Dispatch</span>
      </button>
      <a
        href="#calculator-card"
        className="py-2.5 px-3 rounded-lg bg-[#EA580C] text-white font-bold text-xs flex items-center justify-center gap-1.5 whitespace-nowrap"
      >
        <Calculator className="w-3.5 h-3.5 shrink-0" />
        <span>60-Sec Roof Quote</span>
      </a>
    </div>
  );
};
