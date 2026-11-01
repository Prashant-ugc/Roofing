import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateRoofEstimate,
  evaluateClaimEligibility,
  calculateMonthlyPayment,
  validateLeadCapture,
  SHINGLE_SWATCHES,
} from './roofingCalculations';

test('calculateRoofEstimate returns leak repair range for active leak repair', () => {
  const result = calculateRoofEstimate({
    need: 'leak_repair',
    material: 'architectural_asphalt',
    size: '1800_to_2800',
    fullName: 'Marcus Vance',
    phone: '214-555-0192',
    address: '4820 Preston Rd, Plano, TX',
  });
  assert.equal(result.headlineRange, '$250 – $650 for Leak Repair');
  assert.ok(result.voucherCode.startsWith('DRONE-4K-'));
});

test('calculateRoofEstimate returns $0 out-of-pocket headline for storm insurance track', () => {
  const result = calculateRoofEstimate({
    need: 'storm_insurance',
    material: 'impact_class_4',
    size: '1800_to_2800',
    fullName: 'Sarah Jenkins',
    phone: '(972) 555-0144',
    address: '1204 Legacy Dr, Frisco, TX',
  });
  assert.equal(
    result.headlineRange,
    '$0 Out-of-Pocket + Deductible if Approved by Storm Insurance'
  );
  assert.equal(result.isInsuranceTrack, true);
  assert.ok(result.minPrice > 9800);
});

test('calculateRoofEstimate returns exact $9,800 - $14,200 for standard full replacement 1,800-2,800 sq.ft', () => {
  const result = calculateRoofEstimate({
    need: 'full_replacement',
    material: 'architectural_asphalt',
    size: '1800_to_2800',
    fullName: 'David Miller',
    phone: '8175550199',
    address: '712 Kimball Ave, Southlake, TX',
  });
  assert.equal(result.headlineRange, '$9,800 – $14,200 for Full Replacement');
});

test('evaluateClaimEligibility computes high probability score for storm-affected roof', () => {
  const res = evaluateClaimEligibility({
    recentStorm: true,
    roofOver7Years: true,
    visibleGranulesOrDents: true,
  });
  assert.ok(res.scorePercent >= 90);
  assert.ok(res.statusTitle.includes('High Probability of Full Coverage'));
});

test('calculateMonthlyPayment computes real-time monthly payment across terms', () => {
  const m120 = calculateMonthlyPayment(10500, '120_months');
  assert.equal(m120.monthlyPayment, 129);

  const m60 = calculateMonthlyPayment(10500, '60_months');
  assert.ok(m60.monthlyPayment > m120.monthlyPayment);

  const m12 = calculateMonthlyPayment(12000, '12_months_zero_apr');
  assert.equal(m12.monthlyPayment, 1000);
});

test('validateLeadCapture enforces name, 10-digit phone, and street address', () => {
  assert.equal(
    validateLeadCapture({ fullName: '', phone: '2145550188', address: '123 Main St' }).valid,
    false
  );
  assert.equal(
    validateLeadCapture({ fullName: 'Alex', phone: '12345', address: '123 Main St' }).valid,
    false
  );
  assert.equal(
    validateLeadCapture({ fullName: 'Alex', phone: '(214) 555-0188', address: '4502 Belt Line Rd, Dallas TX' }).valid,
    true
  );
});

test('SHINGLE_SWATCHES contains all 4 required shingle styles', () => {
  assert.equal(SHINGLE_SWATCHES.length, 4);
  assert.equal(SHINGLE_SWATCHES[0].fullLabel, 'Charcoal Black (GAF Timberline HDZ)');
  assert.equal(SHINGLE_SWATCHES[3].isMetal, true);
});
