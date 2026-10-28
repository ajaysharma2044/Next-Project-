'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const L = require('../assets/logic.js');

test('clampAmount: bounds and bad input', () => {
  assert.equal(L.clampAmount(50), 50);
  assert.equal(L.clampAmount(-5), 0);
  assert.equal(L.clampAmount(5e6), 1e6);
  assert.equal(L.clampAmount('abc'), 0);
  assert.equal(L.clampAmount(NaN), 0);
  assert.equal(L.clampAmount('120'), 120);
});

test('splitMoney: 50/30/20 split sums to total', () => {
  assert.deepEqual(L.splitMoney(200, [50, 30, 20]), { spend: 100, save: 60, keep: 40 });
  const odd = L.splitMoney(33, [50, 30, 20]);
  assert.equal(odd.spend + odd.save + odd.keep, 33);
  assert.deepEqual(L.splitMoney(0, [50, 30, 20]), { spend: 0, save: 0, keep: 0 });
  assert.deepEqual(L.splitMoney(100, [70, 20, 10]), { spend: 70, save: 20, keep: 10 });
});

test('budgetSummary: matches the V2 example numbers', () => {
  const r = L.budgetSummary({
    income: 2200,
    expenses: { housing: 850, food: 300, transport: 200, phone: 80, other: 220 },
    savings: 200,
  });
  assert.deepEqual(r, { expenses: 1650, allocated: 1850, remaining: 350, pct: 84 });
});

test('budgetSummary: zero income', () => {
  const r = L.budgetSummary({ income: 0, expenses: { housing: 100 }, savings: 0 });
  assert.equal(r.pct, 100);
  assert.equal(r.remaining, -100);
  const empty = L.budgetSummary({ income: 0, expenses: {}, savings: 0 });
  assert.equal(empty.pct, 0);
});

test('moveInTotal sums the one-time costs', () => {
  assert.equal(L.moveInTotal({ deposit: 800, firstRent: 800, basics: 300, utilities: 150 }), 2050);
  assert.equal(L.moveInTotal({ deposit: 'x', firstRent: -1 }), 0);
});

test('findBenefits: 19, in care at 18, in school gets the full set', () => {
  const r = L.findBenefits({ age: '18-20', careAt18: 'yes', school: 'yes' });
  assert.deepEqual(r, [
    'collaborative_care', 'voluntary_services', 'etv', 'scholars21',
    'opportunity_passport', 'medicaid26', 'credit_report', 'car_insurance', 'credit_build',
  ]);
});

test('findBenefits: 22, adopted after 16, not in school', () => {
  const r = L.findBenefits({ age: '21-22', careAt18: 'adopted16', school: 'no' });
  assert.deepEqual(r, ['voluntary_services', 'opportunity_passport', 'credit_build']);
});

test('findBenefits: 24, left care before 18, planning school', () => {
  const r = L.findBenefits({ age: '23-25', careAt18: 'no', school: 'planning' });
  assert.deepEqual(r, ['opportunity_passport', 'credit_build']);
});

test('findBenefits: 21, in care at 18, planning school keeps ETV and Medicaid, drops CC', () => {
  const r = L.findBenefits({ age: '21-22', careAt18: 'yes', school: 'planning' });
  assert.deepEqual(r, ['voluntary_services', 'etv', 'opportunity_passport', 'medicaid26', 'credit_build']);
});

test('matchPlan: without match equals plain months', () => {
  const r = L.matchPlan({ goal: 1000, start: 100, monthly: 75, matchOn: false });
  assert.equal(r.monthsPlain, 12);
  assert.equal(r.monthsMatched, 12);
  assert.equal(r.matchApplied, 0);
  assert.equal(r.state, 'ok');
});

test('matchPlan: match halves what you must save when goal is under 2x cap', () => {
  const r = L.matchPlan({ goal: 2000, start: 100, monthly: 75, matchOn: true });
  assert.equal(r.monthsPlain, 26);
  assert.equal(r.monthsMatched, 12);
  assert.equal(r.matchApplied, 1000);
});

test('matchPlan: cap of 3500 applies on big goals', () => {
  const r = L.matchPlan({ goal: 10000, start: 0, monthly: 500, matchOn: true });
  assert.equal(r.monthsPlain, 20);
  assert.equal(r.monthsMatched, 13);
  assert.equal(r.matchApplied, 3500);
});

test('matchPlan: match already used reduces the cap', () => {
  const r = L.matchPlan({ goal: 2000, start: 0, monthly: 100, matchOn: true, matchUsed: 3500 });
  assert.equal(r.monthsMatched, 20);
  assert.equal(r.matchApplied, 0);
});

test('matchPlan: starting savings above the goal, and large start with match', () => {
  assert.equal(L.matchPlan({ goal: 500, start: 600, monthly: 50, matchOn: true }).state, 'reached');
  const r = L.matchPlan({ goal: 2000, start: 1500, monthly: 50, matchOn: true });
  assert.equal(r.monthsMatched, 0);
  assert.equal(r.matchApplied, 500);
});

test('matchPlan: edge states', () => {
  assert.equal(L.matchPlan({ goal: 0, start: 0, monthly: 50, matchOn: true }).state, 'no-goal');
  assert.equal(L.matchPlan({ goal: 500, start: 0, monthly: 0, matchOn: true }).state, 'no-monthly');
});

test('formatMoney: whole dollars, en-US', () => {
  assert.equal(L.formatMoney(1234.6), '$1,235');
  assert.equal(L.formatMoney(-50), '-$50');
});
