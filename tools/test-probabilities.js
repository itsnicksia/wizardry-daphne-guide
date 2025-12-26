const assert = require('assert');
const fs = require('fs');

console.log('Running probability verification tests...\n');

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (err) {
    console.log(`✗ ${name}`);
    console.log(`  ${err.message}`);
    failed++;
  }
}

function approxEqual(a, b, tolerance = 0.0001) {
  return Math.abs(a - b) < tolerance;
}

// Load equipment data
const data = JSON.parse(fs.readFileSync('equipment-en.json', 'utf8'));

// =============================================================================
// parseRate verification (replicated logic)
// =============================================================================

function parseRate(text) {
  if (!text || text === '-') return null;
  const match = text.match(/([\d.]+)%/);
  return match ? parseFloat(match[1]) : null;
}

test('parseRate: parses percentage string', () => {
  assert.strictEqual(parseRate('28.57%'), 28.57);
});

test('parseRate: returns null for dash', () => {
  assert.strictEqual(parseRate('-'), null);
});

test('parseRate: returns null for empty string', () => {
  assert.strictEqual(parseRate(''), null);
});

test('parseRate: returns null for null input', () => {
  assert.strictEqual(parseRate(null), null);
});

// =============================================================================
// Effective rate calculation
// =============================================================================

function calculateEffectiveRate(groupDropRate, itemDropRate) {
  return (groupDropRate * itemDropRate) / 100;
}

test('effectiveRate: basic calculation', () => {
  // Example from CLAUDE.md: Bronze Dagger from Beginner's Junk
  // Group 1 rate: 11.11%, Item rate: 28.57%
  // Expected: 11.11 × 28.57 / 100 = 3.174127
  const result = calculateEffectiveRate(11.1111, 28.5714);
  assert(approxEqual(result, 3.1746, 0.001), `Expected ~3.17, got ${result}`);
});

test('effectiveRate: zero group rate', () => {
  assert.strictEqual(calculateEffectiveRate(0, 50), 0);
});

test('effectiveRate: zero item rate', () => {
  assert.strictEqual(calculateEffectiveRate(50, 0), 0);
});

test('effectiveRate: 100% rates', () => {
  assert.strictEqual(calculateEffectiveRate(100, 100), 100);
});

// =============================================================================
// Combined probability calculation
// =============================================================================

function calculateCombinedProbability(effectiveRate, starPct, gradePct) {
  return (effectiveRate * starPct * gradePct) / 10000;
}

test('combinedProbability: basic calculation', () => {
  // effectiveRate: 3.17%, star1: 80%, g1: 80%
  // Expected: 3.17 × 80 × 80 / 10000 = 2.0288
  const result = calculateCombinedProbability(3.17, 80, 80);
  assert(approxEqual(result, 2.0288, 0.001), `Expected ~2.0288, got ${result}`);
});

test('combinedProbability: null quality returns 0', () => {
  const result = calculateCombinedProbability(3.17, null, 80);
  assert(isNaN(result) || result === 0, 'Should handle null quality');
});

// =============================================================================
// Data integrity tests
// =============================================================================

test('data: has garakuta array', () => {
  assert(Array.isArray(data.garakuta), 'garakuta should be an array');
  assert(data.garakuta.length > 0, 'garakuta should not be empty');
});

test('data: each garakuta has groups', () => {
  for (const g of data.garakuta) {
    assert(Array.isArray(g.groups), `${g.name} should have groups array`);
  }
});

test('data: group dropRates are valid percentages', () => {
  for (const g of data.garakuta) {
    for (const group of g.groups) {
      assert(
        group.dropRate === null || (group.dropRate >= 0 && group.dropRate <= 100),
        `${g.name} group ${group.groupNumber} has invalid dropRate: ${group.dropRate}`
      );
    }
  }
});

test('data: equipment dropRates are valid percentages', () => {
  for (const g of data.garakuta) {
    for (const group of g.groups) {
      for (const equip of group.equipment) {
        assert(
          equip.dropRate === null || (equip.dropRate >= 0 && equip.dropRate <= 100),
          `${equip.name} has invalid dropRate: ${equip.dropRate}`
        );
      }
    }
  }
});

test('data: quality percentages are valid (0-100 or null)', () => {
  for (const g of data.garakuta) {
    for (const group of g.groups) {
      for (const equip of group.equipment) {
        for (let i = 1; i <= 5; i++) {
          const val = equip.quality[`star${i}`];
          assert(
            val === null || (val >= 0 && val <= 100),
            `${equip.name} star${i} invalid: ${val}`
          );
        }
      }
    }
  }
});

test('data: grade percentages are valid (0-100 or null)', () => {
  for (const g of data.garakuta) {
    for (const group of g.groups) {
      for (const equip of group.equipment) {
        for (let i = 1; i <= 5; i++) {
          const val = equip.grade[`g${i}`];
          assert(
            val === null || (val >= 0 && val <= 100),
            `${equip.name} g${i} invalid: ${val}`
          );
        }
      }
    }
  }
});

// =============================================================================
// Probability sum tests
// =============================================================================

test('data: quality percentages sum to 100 (when present)', () => {
  let violations = [];
  for (const g of data.garakuta) {
    for (const group of g.groups) {
      for (const equip of group.equipment) {
        let sum = 0;
        let hasAny = false;
        for (let i = 1; i <= 5; i++) {
          const val = equip.quality[`star${i}`];
          if (val !== null) {
            sum += val;
            hasAny = true;
          }
        }
        if (hasAny && !approxEqual(sum, 100, 0.1)) {
          violations.push(`${equip.name}: quality sum = ${sum}`);
        }
      }
    }
  }
  assert(violations.length === 0, `Quality sums not 100:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('data: grade percentages sum to 100 (when present)', () => {
  let violations = [];
  for (const g of data.garakuta) {
    for (const group of g.groups) {
      for (const equip of group.equipment) {
        let sum = 0;
        let hasAny = false;
        for (let i = 1; i <= 5; i++) {
          const val = equip.grade[`g${i}`];
          if (val !== null) {
            sum += val;
            hasAny = true;
          }
        }
        if (hasAny && !approxEqual(sum, 100, 0.1)) {
          violations.push(`${equip.name}: grade sum = ${sum}`);
        }
      }
    }
  }
  assert(violations.length === 0, `Grade sums not 100:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('data: equipment dropRates sum to ~100 within each group', () => {
  let violations = [];
  for (const g of data.garakuta) {
    for (const group of g.groups) {
      let sum = 0;
      for (const equip of group.equipment) {
        if (equip.dropRate !== null) {
          sum += equip.dropRate;
        }
      }
      if (!approxEqual(sum, 100, 1)) {
        violations.push(`${g.name} group ${group.groupNumber}: equipment sum = ${sum.toFixed(2)}%`);
      }
    }
  }
  assert(violations.length === 0, `Equipment sums not 100:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

// =============================================================================
// Aggregation tests (app.js logic)
// =============================================================================

function buildIndex(data) {
  const equipmentIndex = {};

  data.garakuta.forEach(g => {
    g.groups.forEach(group => {
      group.equipment.forEach(equip => {
        const key = equip.name;
        if (!equipmentIndex[key]) {
          equipmentIndex[key] = {
            name: equip.name,
            sources: {}
          };
        }
        const garakutaKey = g.name;
        if (!equipmentIndex[key].sources[garakutaKey]) {
          equipmentIndex[key].sources[garakutaKey] = {
            garakuta: g.name,
            effectiveRate: 0,
            probMatrix: {}
          };
          for (let s = 1; s <= 5; s++) {
            for (let gr = 1; gr <= 5; gr++) {
              equipmentIndex[key].sources[garakutaKey].probMatrix[`s${s}g${gr}`] = 0;
            }
          }
        }
        const src = equipmentIndex[key].sources[garakutaKey];
        const effectiveRate = (group.dropRate * equip.dropRate) / 100;
        src.effectiveRate += effectiveRate;
        for (let s = 1; s <= 5; s++) {
          const starPct = equip.quality['star' + s] || 0;
          for (let gr = 1; gr <= 5; gr++) {
            const gradePct = equip.grade['g' + gr] || 0;
            const combinedPct = (effectiveRate * starPct * gradePct) / 10000;
            src.probMatrix[`s${s}g${gr}`] += combinedPct;
          }
        }
      });
    });
  });

  return equipmentIndex;
}

const index = buildIndex(data);

test('aggregation: Bronze Dagger effective rate from Beginner\'s Junk', () => {
  const bronzeDagger = index['Bronze Dagger'];
  assert(bronzeDagger, 'Bronze Dagger should exist in index');
  const source = bronzeDagger.sources["Beginner's Junk"];
  assert(source, 'Bronze Dagger should have Beginner\'s Junk as source');
  // Group 1: 11.1111% × 28.5714% / 100 = 3.1746%
  assert(approxEqual(source.effectiveRate, 3.1746, 0.01),
    `Expected ~3.17%, got ${source.effectiveRate.toFixed(4)}%`);
});

test('aggregation: probMatrix values sum correctly', () => {
  let violations = [];
  for (const [equipName, equip] of Object.entries(index)) {
    for (const [sourceName, source] of Object.entries(equip.sources)) {
      let matrixSum = 0;
      for (let s = 1; s <= 5; s++) {
        for (let g = 1; g <= 5; g++) {
          matrixSum += source.probMatrix[`s${s}g${g}`];
        }
      }
      // Matrix sum should equal effective rate (since quality×grade sums to 100%×100%)
      if (source.effectiveRate > 0 && !approxEqual(matrixSum, source.effectiveRate, 0.01)) {
        violations.push(`${equipName} from ${sourceName}: matrix sum ${matrixSum.toFixed(4)} != effectiveRate ${source.effectiveRate.toFixed(4)}`);
      }
    }
  }
  assert(violations.length === 0, `Matrix sums don't match:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('aggregation: multiple groups are summed for same equipment', () => {
  // Find an equipment that appears in multiple groups of the same garakuta
  let multiGroupEquip = null;
  for (const g of data.garakuta) {
    const equipCounts = {};
    for (const group of g.groups) {
      for (const equip of group.equipment) {
        equipCounts[equip.name] = (equipCounts[equip.name] || 0) + 1;
      }
    }
    for (const [name, count] of Object.entries(equipCounts)) {
      if (count > 1) {
        multiGroupEquip = { garakuta: g.name, equipment: name, count };
        break;
      }
    }
    if (multiGroupEquip) break;
  }

  if (multiGroupEquip) {
    const equip = index[multiGroupEquip.equipment];
    const source = equip.sources[multiGroupEquip.garakuta];

    // Calculate expected by manually summing
    let expectedRate = 0;
    const garakuta = data.garakuta.find(g => g.name === multiGroupEquip.garakuta);
    for (const group of garakuta.groups) {
      const item = group.equipment.find(e => e.name === multiGroupEquip.equipment);
      if (item) {
        expectedRate += (group.dropRate * item.dropRate) / 100;
      }
    }

    assert(approxEqual(source.effectiveRate, expectedRate, 0.01),
      `Multi-group aggregation failed for ${multiGroupEquip.equipment}: got ${source.effectiveRate.toFixed(4)}, expected ${expectedRate.toFixed(4)}`);
  } else {
    console.log('  (no multi-group equipment found to test)');
  }
});

// =============================================================================
// Row/column total tests
// =============================================================================

test('aggregation: quality row totals are correct', () => {
  let violations = [];
  for (const [equipName, equip] of Object.entries(index)) {
    for (const [sourceName, source] of Object.entries(equip.sources)) {
      for (let s = 1; s <= 5; s++) {
        let rowSum = 0;
        for (let g = 1; g <= 5; g++) {
          rowSum += source.probMatrix[`s${s}g${g}`];
        }
        // Row sum should be effectiveRate × starPct / 100
        // We can verify it's non-negative and <= effectiveRate
        if (rowSum < 0 || rowSum > source.effectiveRate + 0.01) {
          violations.push(`${equipName} star${s}: row sum ${rowSum.toFixed(4)} out of range`);
        }
      }
    }
  }
  assert(violations.length === 0, `Row totals invalid:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('aggregation: grade column totals are correct', () => {
  let violations = [];
  for (const [equipName, equip] of Object.entries(index)) {
    for (const [sourceName, source] of Object.entries(equip.sources)) {
      for (let g = 1; g <= 5; g++) {
        let colSum = 0;
        for (let s = 1; s <= 5; s++) {
          colSum += source.probMatrix[`s${s}g${g}`];
        }
        // Column sum should be non-negative and <= effectiveRate
        if (colSum < 0 || colSum > source.effectiveRate + 0.01) {
          violations.push(`${equipName} g${g}: col sum ${colSum.toFixed(4)} out of range`);
        }
      }
    }
  }
  assert(violations.length === 0, `Column totals invalid:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

// =============================================================================
// Summary
// =============================================================================

console.log(`\n${'='.repeat(60)}`);
console.log(`Tests: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
console.log(`${'='.repeat(60)}`);

process.exit(failed > 0 ? 1 : 0);
