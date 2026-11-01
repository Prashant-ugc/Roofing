export type ServiceNeed =
  | 'storm_insurance'
  | 'leak_repair'
  | 'full_replacement'
  | 'commercial_roof';

export type RoofMaterial =
  | 'architectural_asphalt'
  | 'impact_class_4'
  | 'standing_seam_metal'
  | 'clay_concrete_tile';

export type HomeSizeTier = 'under_1800' | '1800_to_2800' | 'over_2800';

export type FinancingTerm = '60_months' | '120_months' | '12_months_zero_apr';

export interface RoofEstimateInput {
  need: ServiceNeed;
  material: RoofMaterial;
  size: HomeSizeTier;
  fullName: string;
  phone: string;
  address: string;
}

export interface RoofEstimateResult {
  headlineRange: string;
  subHeadline: string;
  minPrice: number;
  maxPrice: number;
  isInsuranceTrack: boolean;
  estimatedSquares: string;
  installTimeline: string;
  warrantyCoverage: string;
  insuranceDeductibleNote: string;
  voucherCode: string;
  materialLabel: string;
  needLabel: string;
  sizeLabel: string;
}

export interface ClaimAnswers {
  recentStorm: boolean | null;
  roofOver7Years: boolean | null;
  visibleGranulesOrDents: boolean | null;
}

export interface ClaimEligibilityResult {
  scorePercent: number;
  statusTitle: string;
  probabilityBadge: string;
  summaryReason: string;
  recommendedAction: string;
  estimatedOutOfPocket: string;
}

export interface ShingleSwatch {
  id: 'charcoal_black' | 'weathered_wood' | 'barkwood_tan' | 'standing_seam_metal';
  name: string;
  subtitle: string;
  fullLabel: string;
  windRating: string;
  algaeWarranty: string;
  curbAppealRating: string;
  impactClass: string;
  solarReflectance: string;
  insuranceDiscount: string;
  description: string;
  bestForStyles: string;
  swatchHexPrimary: string;
  swatchHexSecondary: string;
  swatchHexHighlight: string;
  isMetal: boolean;
}

export const SERVICE_NEEDS: {
  id: ServiceNeed;
  label: string;
  shortDesc: string;
  tag: string;
}[] = [
  {
    id: 'storm_insurance',
    label: 'Storm / Hail Insurance Inspection',
    shortDesc: '21-Point 4K Drone Hail & Wind Claim Assessment',
    tag: 'Most Popular in DFW',
  },
  {
    id: 'leak_repair',
    label: 'Active Roof Leak Repair',
    shortDesc: 'Same-Day Flashing, Pipe Boot, Valley & Shingle Repair',
    tag: '90-Min Dispatch',
  },
  {
    id: 'full_replacement',
    label: 'Full Roof Replacement',
    shortDesc: 'Complete Tear-Off, Synthetic Decking & 50-Yr System',
    tag: '1-Day Install',
  },
  {
    id: 'commercial_roof',
    label: 'Commercial Roof',
    shortDesc: 'TPO, Standing Seam Metal, Elastomeric Coating & Flat Systems',
    tag: '20-Yr NDL Warranty',
  },
];

export const ROOF_MATERIALS: {
  id: RoofMaterial;
  label: string;
  shortDesc: string;
  multiplier: number;
  warranty: string;
}[] = [
  {
    id: 'architectural_asphalt',
    label: 'Architectural Asphalt Shingles',
    shortDesc: 'GAF Timberline HDZ® · 130 MPH Wind · LayerLock™ Tech',
    multiplier: 1.0,
    warranty: '50-Year Limited Lifetime Non-Prorated Warranty',
  },
  {
    id: 'impact_class_4',
    label: 'Impact-Resistant Class 4 Shingles',
    shortDesc: 'UL 2218 Class 4 Hail Rated · Up to 28% TX Insurance Discount',
    multiplier: 1.18,
    warranty: '50-Year Golden Pledge® + Hail Guard Protection',
  },
  {
    id: 'standing_seam_metal',
    label: 'Standing Seam Metal',
    shortDesc: '24-Gauge Kynar 500® Concealed Fastener Lifetime System',
    multiplier: 1.85,
    warranty: 'Lifetime Structural & 40-Year Kynar Paint Warranty',
  },
  {
    id: 'clay_concrete_tile',
    label: 'Tile',
    shortDesc: 'Architectural Clay & Stone-Coated Steel Profiles',
    multiplier: 2.1,
    warranty: '75-Year Structural Material & Underlayment Warranty',
  },
];

export const HOME_SIZE_TIERS: {
  id: HomeSizeTier;
  label: string;
  squaresLabel: string;
  pitchNote: string;
  baseMin: number;
  baseMax: number;
}[] = [
  {
    id: 'under_1800',
    label: 'Under 1,800 sq.ft',
    squaresLabel: '22 – 28 Roofing Squares',
    pitchNote: 'Standard 6/12 to 8/12 walkable pitch',
    baseMin: 8400,
    baseMax: 11200,
  },
  {
    id: '1800_to_2800',
    label: '1,800–2,800 sq.ft',
    squaresLabel: '30 – 42 Roofing Squares',
    pitchNote: 'Medium-to-steep 8/12 to 10/12 DFW suburban pitch',
    baseMin: 9800,
    baseMax: 14200,
  },
  {
    id: 'over_2800',
    label: '2,800+ sq.ft',
    squaresLabel: '45 – 65+ Roofing Squares',
    pitchNote: 'Multi-hip high-ridge custom estate profile',
    baseMin: 14800,
    baseMax: 21500,
  },
];

export const SHINGLE_SWATCHES: ShingleSwatch[] = [
  {
    id: 'charcoal_black',
    name: 'Charcoal Black',
    subtitle: 'GAF Timberline HDZ',
    fullLabel: 'Charcoal Black (GAF Timberline HDZ)',
    windRating: '130 MPH Hurricane Rated (WindProven™)',
    algaeWarranty: '25-Year StainGuard Plus™ Blue-Green Algae Protection',
    curbAppealRating: '9.9 / 10 DFW Resale Value Score',
    impactClass: 'UL 2218 Class 4 Impact Upgrade Available',
    solarReflectance: 'High-Contrast Architectural Shadow Line',
    insuranceDiscount: 'Up to 24% Annual Texas Homeowner Policy Credit',
    description:
      'Our #1 installed shingle across Frisco, Plano, and Southlake. Delivers bold, razor-sharp architectural contrast against red brick, painted white brick, and Austin stone facades.',
    bestForStyles: 'Modern Traditional, White Painted Brick, Red Brick Colonial, Tudor',
    swatchHexPrimary: '#1E242B',
    swatchHexSecondary: '#2E3742',
    swatchHexHighlight: '#475569',
    isMetal: false,
  },
  {
    id: 'weathered_wood',
    name: 'Weathered Wood',
    subtitle: 'Architectural Dimensional',
    fullLabel: 'Weathered Wood (Architectural Dimensional)',
    windRating: '130 MPH Hurricane Rated (LayerLock™)',
    algaeWarranty: '25-Year StainGuard Plus™ Algae Resistance',
    curbAppealRating: '9.8 / 10 HOA & Neighborhood Favorite',
    impactClass: 'Class 4 SBS Rubberized Asphalt Core',
    solarReflectance: 'Balanced Warm-Cool Granule Blend',
    insuranceDiscount: 'Up to 24% Annual Texas Homeowner Policy Credit',
    description:
      'A multi-dimensional blend of warm cedar brown, smoky slate gray, and driftwood tones. Universally pre-approved by 99% of Dallas-Fort Worth HOAs and hides dust between rainstorms.',
    bestForStyles: 'Texas Limestone, Ranch Estates, Warm Stucco, Craftsman',
    swatchHexPrimary: '#4B433B',
    swatchHexSecondary: '#655A4F',
    swatchHexHighlight: '#857769',
    isMetal: false,
  },
  {
    id: 'barkwood_tan',
    name: 'Barkwood / Desert Tan',
    subtitle: 'Cool Roof Energy Saver',
    fullLabel: 'Barkwood / Desert Tan (Cool Roof Energy Saver)',
    windRating: '130 MPH Hurricane Rated',
    algaeWarranty: '25-Year StainGuard Plus™ Algae Warranty',
    curbAppealRating: '9.6 / 10 Solar Thermal Efficiency',
    impactClass: 'CRRC Cool Roof Rated + Class 4 Hail Option',
    solarReflectance: 'Reduces Attic Deck Temps by up to 28°F in July/August',
    insuranceDiscount: 'Energy Star + Hail Impact Policy Savings',
    description:
      'Engineered with highly reflective solar granules designed for triple-digit North Texas summers. Lowers peak attic heat load while complementing warm sandstone and cream brick.',
    bestForStyles: 'Mediterranean, Sandstone Brick, Hill Country Custom, Transitional',
    swatchHexPrimary: '#6E5540',
    swatchHexSecondary: '#8B6D53',
    swatchHexHighlight: '#A6896F',
    isMetal: false,
  },
  {
    id: 'standing_seam_metal',
    name: 'Matte Black Standing Seam Metal',
    subtitle: 'Lifetime Roof',
    fullLabel: 'Matte Black Standing Seam Metal (Lifetime Roof)',
    windRating: '165 MPH Tornado & Straight-Line Gust Rated',
    algaeWarranty: '40-Year Kynar 500® PVDF Fade & Chalk Warranty',
    curbAppealRating: '10.0 / 10 Architectural Luxury Tier',
    impactClass: '24-Gauge Galvalume Steel · Ultimate Hail Immunity',
    solarReflectance: 'Cool-Metal Infrared Reflective Pigment Coating',
    insuranceDiscount: 'Maximum Tier Texas Wind & Hail Premium Reduction',
    description:
      'Roll-formed on-site to exact rafter lengths with 1.75-inch concealed snap-lock vertical seams and zero exposed fasteners. Built to outlast the structure with unmatched modern curb appeal.',
    bestForStyles: 'Modern Farmhouse, Contemporary Custom, Luxury Acreage Estates',
    swatchHexPrimary: '#11161D',
    swatchHexSecondary: '#1E293B',
    swatchHexHighlight: '#334155',
    isMetal: true,
  },
];

export function calculateRoofEstimate(input: RoofEstimateInput): RoofEstimateResult {
  const needObj = SERVICE_NEEDS.find((n) => n.id === input.need) ?? SERVICE_NEEDS[0];
  const matObj = ROOF_MATERIALS.find((m) => m.id === input.material) ?? ROOF_MATERIALS[0];
  const sizeObj = HOME_SIZE_TIERS.find((s) => s.id === input.size) ?? HOME_SIZE_TIERS[1];

  const cleanZipOrStreet = input.address.trim().slice(0, 4).toUpperCase().replace(/[^A-Z0-9]/g, '') || 'DFW9';
  const voucherCode = `DRONE-4K-${cleanZipOrStreet}-21PT`;

  if (input.need === 'leak_repair') {
    const minRepair = input.size === 'over_2800' ? 350 : 250;
    const maxRepair = input.size === 'over_2800' ? 850 : 650;
    return {
      headlineRange: `$${minRepair.toLocaleString()} – $${maxRepair.toLocaleString()} for Leak Repair`,
      subHeadline: 'Includes Thermal Moisture Scan, Flashing/Boot Rebuild & 5-Year Leak-Free Guarantee',
      minPrice: minRepair,
      maxPrice: maxRepair,
      isInsuranceTrack: false,
      estimatedSquares: 'Targeted Valley / Flashing / Penetration Zone',
      installTimeline: 'Same-Day Arrival (Avg. 60–90 Mins in DFW)',
      warrantyCoverage: '5-Year Workmanship No-Leak Guarantee (Credited Toward Future Roof)',
      insuranceDeductibleNote: 'Emergency tarping & mitigation receipts formatted for insurance reimbursement.',
      voucherCode,
      materialLabel: matObj.label,
      needLabel: needObj.label,
      sizeLabel: sizeObj.label,
    };
  }

  const rawMin = Math.round((sizeObj.baseMin * matObj.multiplier) / 100) * 100;
  const rawMax = Math.round((sizeObj.baseMax * matObj.multiplier) / 100) * 100;

  if (input.need === 'storm_insurance') {
    return {
      headlineRange: '$0 Out-of-Pocket + Deductible if Approved by Storm Insurance',
      subHeadline: `Full Retail Replacement Value: $${rawMin.toLocaleString()} – $${rawMax.toLocaleString()} (Covered by Carrier RCV)`,
      minPrice: rawMin,
      maxPrice: rawMax,
      isInsuranceTrack: true,
      estimatedSquares: sizeObj.squaresLabel,
      installTimeline: '1-Day Complete Tear-Off & Installation',
      warrantyCoverage: matObj.warranty,
      insuranceDeductibleNote:
        'We use exact Xactimate® insurance pricing software and meet your adjuster on-site so your claim covers 100% of code upgrades.',
      voucherCode,
      materialLabel: matObj.label,
      needLabel: needObj.label,
      sizeLabel: sizeObj.label,
    };
  }

  if (input.need === 'commercial_roof') {
    const commMin = Math.round((rawMin * 1.35) / 100) * 100;
    const commMax = Math.round((rawMax * 1.45) / 100) * 100;
    return {
      headlineRange: `$${commMin.toLocaleString()} – $${commMax.toLocaleString()} Commercial System`,
      subHeadline: 'Includes Core Sample Analysis, Infrared Flat-Roof Scan & 20-Year NDL Warranty',
      minPrice: commMin,
      maxPrice: commMax,
      isInsuranceTrack: false,
      estimatedSquares: `${sizeObj.squaresLabel} (Commercial Deck)`,
      installTimeline: '2–3 Days Zero-Business-Disruption Staging',
      warrantyCoverage: '20-Year No-Dollar-Limit (NDL) Commercial Warranty',
      insuranceDeductibleNote: 'Commercial hail & wind depreciation recovery documentation included.',
      voucherCode,
      materialLabel: matObj.label,
      needLabel: needObj.label,
      sizeLabel: sizeObj.label,
    };
  }

  return {
    headlineRange: `$${rawMin.toLocaleString()} – $${rawMax.toLocaleString()} for Full Replacement`,
    subHeadline: 'Or $0 Out-of-Pocket + Deductible if Approved by Storm Insurance After Our Drone Check',
    minPrice: rawMin,
    maxPrice: rawMax,
    isInsuranceTrack: false,
    estimatedSquares: sizeObj.squaresLabel,
    installTimeline: '1-Day Tear-Off & Weatherproof Installation',
    warrantyCoverage: matObj.warranty,
    insuranceDeductibleNote:
      '42% of retail quote requests in DFW qualify for full storm insurance coverage after our 21-point drone inspection.',
    voucherCode,
    materialLabel: matObj.label,
    needLabel: needObj.label,
    sizeLabel: sizeObj.label,
  };
}

export function evaluateClaimEligibility(answers: ClaimAnswers): ClaimEligibilityResult {
  let score = 58;
  if (answers.recentStorm === true) score += 22;
  if (answers.roofOver7Years === true) score += 10;
  if (answers.visibleGranulesOrDents === true) score += 8;

  // Even if someone selects "No" to visible dents from the ground, hail bruising is usually only visible from roof/drone level
  if (answers.recentStorm === true && answers.visibleGranulesOrDents === false) {
    score = Math.max(score, 84);
  }

  const clampedScore = Math.min(98, Math.max(64, score));

  if (clampedScore >= 80) {
    return {
      scorePercent: clampedScore,
      statusTitle: 'Instant Claim Eligibility Score (High Probability of Full Coverage)',
      probabilityBadge: `${clampedScore}% Approval Match — DFW Active Hail Zone`,
      summaryReason:
        'Your roof profile strongly matches recently approved full-replacement claims in Dallas-Fort Worth. Soft-metal vent strikes and shingle bruising qualify under Texas Replacement Cost Value (RCV) policies.',
      recommendedAction:
        'Book your free 21-Point 4K Drone Inspection BEFORE calling your insurance carrier so you have certified photo evidence first.',
      estimatedOutOfPocket: 'Just Your Policy Deductible (100% of Labor & Materials Covered)',
    };
  }

  return {
    scorePercent: clampedScore,
    statusTitle: 'Instant Claim Eligibility Score (High Probability of Full Coverage)',
    probabilityBadge: `${clampedScore}% Qualifying Profile — Drone Verification Recommended`,
    summaryReason:
      'Over 70% of functional hail mat fractures cannot be seen from the driveway. A 15-minute 4K drone flight will confirm if your roof meets the 8-hit per 10x10 square threshold required by carriers.',
    recommendedAction:
      'Schedule a zero-cost, no-obligation drone assessment to verify hidden bruising before your filing window closes.',
    estimatedOutOfPocket: 'Just Your Policy Deductible Upon Carrier Approval',
  };
}

export interface FinancingCalculation {
  roofCost: number;
  term: FinancingTerm;
  monthlyPayment: number;
  aprLabel: string;
  termTitle: string;
  totalInterestNote: string;
}

export function calculateMonthlyPayment(
  roofCost: number,
  term: FinancingTerm
): FinancingCalculation {
  const sanitizedCost = Math.min(25000, Math.max(6000, roofCost));

  if (term === '12_months_zero_apr') {
    // Promotional 12-month same-as-cash / low minimum monthly payment option (approx 1.29% monthly minimum or equal 12mo promotional structure; to align with "$129/month" starting point on $10k-$12k roofs, we compute standard promotional monthly minimum and show clear 0% APR note)
    const monthly = Math.round(sanitizedCost / 12);
    return {
      roofCost: sanitizedCost,
      term,
      monthlyPayment: monthly,
      aprLabel: '0% APR for 12 Months ($0 Down)',
      termTitle: '$0 Down / 0% APR for 12 Months',
      totalInterestNote: 'Zero interest if paid in full within 12 months (Ideal while waiting on insurance payout)',
    };
  }

  if (term === '60_months') {
    // 6.99% APR over 60 months
    const r = 0.0699 / 12;
    const n = 60;
    const payment = Math.round(
      (sanitizedCost * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
    );
    return {
      roofCost: sanitizedCost,
      term,
      monthlyPayment: payment,
      aprLabel: '6.99% Fixed APR · 60 Mos',
      termTitle: '60 Months Fixed',
      totalInterestNote: '$0 Down Payment · No Prepayment Penalty · Instant Soft-Pull Decision',
    };
  }

  // 120_months: tuned so $10,500 is ~$129/mo (8.49% APR over 120 months -> factor ~0.01239)
  const r = 0.0835 / 12;
  const n = 120;
  const payment = Math.round(
    (sanitizedCost * (r * Math.pow(1 + r, n))) / (Math.pow(1 + r, n) - 1)
  );
  return {
    roofCost: sanitizedCost,
    term,
    monthlyPayment: payment,
    aprLabel: '8.35% Fixed APR · 120 Mos',
    termTitle: '120 Months Low Payment',
    totalInterestNote: 'Lowest Monthly Payment · $0 Down · Open Early Payoff Anytime',
  };
}

export function validateLeadCapture(fields: {
  fullName: string;
  phone: string;
  address: string;
}): { valid: boolean; error?: string } {
  if (!fields.fullName || fields.fullName.trim().length < 2) {
    return { valid: false, error: 'Please enter your full name.' };
  }
  const digits = fields.phone.replace(/\D/g, '');
  if (digits.length < 10) {
    return { valid: false, error: 'Please enter a valid 10-digit phone number.' };
  }
  if (!fields.address || fields.address.trim().length < 5) {
    return {
      valid: false,
      error: 'Please enter your street address for satellite roof measurement.',
    };
  }
  return { valid: true };
}
