import * as assert from 'assert';
import * as fs from 'fs';
import type { EquipmentData, Garakuta, EquipmentGroup, Equipment, QualityRates, GradeRates } from '../src/types/equipment';

console.log('Running probability verification tests...\n');

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void): void {
    try {
        fn();
        console.log(`✓ ${name}`);
        passed++;
    } catch (err) {
        console.log(`✗ ${name}`);
        console.log(`  ${(err as Error).message}`);
        failed++;
    }
}

function approxEqual(a: number, b: number, tolerance = 0.0001): boolean {
    return Math.abs(a - b) < tolerance;
}

const data: EquipmentData = JSON.parse(fs.readFileSync('data/equipment-en.json', 'utf8'));

function parseRate(text: string | null | undefined): number | null {
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

function calculateEffectiveRate(groupDropRate: number, itemDropRate: number): number {
    return (groupDropRate * itemDropRate) / 100;
}

test('effectiveRate: basic calculation', () => {
    const result = calculateEffectiveRate(11.1111, 28.5714);
    assert.ok(approxEqual(result, 3.1746, 0.001), `Expected ~3.17, got ${result}`);
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

function calculateCombinedProbability(
    effectiveRate: number,
    starPct: number | null,
    gradePct: number | null
): number {
    return (effectiveRate * (starPct ?? 0) * (gradePct ?? 0)) / 10000;
}

test('combinedProbability: basic calculation', () => {
    const result = calculateCombinedProbability(3.17, 80, 80);
    assert.ok(approxEqual(result, 2.0288, 0.001), `Expected ~2.0288, got ${result}`);
});

test('combinedProbability: null quality returns 0', () => {
    const result = calculateCombinedProbability(3.17, null, 80);
    assert.strictEqual(result, 0);
});

test('data: has garakuta array', () => {
    assert.ok(Array.isArray(data.garakuta), 'garakuta should be an array');
    assert.ok(data.garakuta.length > 0, 'garakuta should not be empty');
});

test('data: each garakuta has groups', () => {
    for (const g of data.garakuta) {
        assert.ok(Array.isArray(g.groups), `${g.name} should have groups array`);
    }
});

test('data: group dropRates are valid percentages', () => {
    for (const g of data.garakuta) {
        for (const group of g.groups) {
            assert.ok(
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
                assert.ok(
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
                    const val = equip.quality[`star${i}` as keyof QualityRates];
                    assert.ok(val === null || (val >= 0 && val <= 100), `${equip.name} star${i} invalid: ${val}`);
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
                    const val = equip.grade[`g${i}` as keyof GradeRates];
                    assert.ok(val === null || (val >= 0 && val <= 100), `${equip.name} g${i} invalid: ${val}`);
                }
            }
        }
    }
});

test('data: quality percentages sum to 100 (when present)', () => {
    const violations: string[] = [];
    for (const g of data.garakuta) {
        for (const group of g.groups) {
            for (const equip of group.equipment) {
                let sum = 0;
                let hasAny = false;
                for (let i = 1; i <= 5; i++) {
                    const val = equip.quality[`star${i}` as keyof QualityRates];
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
    assert.ok(violations.length === 0, `Quality sums not 100:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('data: grade percentages sum to 100 (when present)', () => {
    const violations: string[] = [];
    for (const g of data.garakuta) {
        for (const group of g.groups) {
            for (const equip of group.equipment) {
                let sum = 0;
                let hasAny = false;
                for (let i = 1; i <= 5; i++) {
                    const val = equip.grade[`g${i}` as keyof GradeRates];
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
    assert.ok(violations.length === 0, `Grade sums not 100:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('data: equipment dropRates sum to ~100 within each group', () => {
    const violations: string[] = [];
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
    assert.ok(violations.length === 0, `Equipment sums not 100:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

interface EquipmentIndex {
    [key: string]: {
        name: string;
        sources: {
            [key: string]: {
                garakuta: string;
                effectiveRate: number;
                probMatrix: { [key: string]: number };
            };
        };
    };
}

function buildIndex(data: EquipmentData): EquipmentIndex {
    const equipmentIndex: EquipmentIndex = {};

    data.garakuta.forEach((g) => {
        g.groups.forEach((group) => {
            group.equipment.forEach((equip) => {
                const key = equip.name;
                if (!equipmentIndex[key]) {
                    equipmentIndex[key] = {
                        name: equip.name,
                        sources: {},
                    };
                }
                const garakutaKey = g.name;
                if (!equipmentIndex[key].sources[garakutaKey]) {
                    equipmentIndex[key].sources[garakutaKey] = {
                        garakuta: g.name,
                        effectiveRate: 0,
                        probMatrix: {},
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
                    const starPct = equip.quality[`star${s}` as keyof QualityRates] || 0;
                    for (let gr = 1; gr <= 5; gr++) {
                        const gradePct = equip.grade[`g${gr}` as keyof GradeRates] || 0;
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

test("aggregation: Bronze Dagger effective rate from Beginner's Junk", () => {
    const bronzeDagger = index['Bronze Dagger'];
    assert.ok(bronzeDagger, 'Bronze Dagger should exist in index');
    const source = bronzeDagger.sources["Beginner's Junk"];
    assert.ok(source, "Bronze Dagger should have Beginner's Junk as source");
    assert.ok(
        approxEqual(source.effectiveRate, 3.1746, 0.01),
        `Expected ~3.17%, got ${source.effectiveRate.toFixed(4)}%`
    );
});

test('aggregation: probMatrix values sum correctly', () => {
    const violations: string[] = [];
    for (const [equipName, equip] of Object.entries(index)) {
        for (const [sourceName, source] of Object.entries(equip.sources)) {
            let matrixSum = 0;
            for (let s = 1; s <= 5; s++) {
                for (let g = 1; g <= 5; g++) {
                    matrixSum += source.probMatrix[`s${s}g${g}`];
                }
            }
            if (source.effectiveRate > 0 && !approxEqual(matrixSum, source.effectiveRate, 0.01)) {
                violations.push(
                    `${equipName} from ${sourceName}: matrix sum ${matrixSum.toFixed(4)} != effectiveRate ${source.effectiveRate.toFixed(4)}`
                );
            }
        }
    }
    assert.ok(violations.length === 0, `Matrix sums don't match:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('aggregation: multiple groups are summed for same equipment', () => {
    let multiGroupEquip: { garakuta: string; equipment: string; count: number } | null = null;
    for (const g of data.garakuta) {
        const equipCounts: Record<string, number> = {};
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

        let expectedRate = 0;
        const garakuta = data.garakuta.find((g) => g.name === multiGroupEquip!.garakuta);
        if (garakuta) {
            for (const group of garakuta.groups) {
                const item = group.equipment.find((e) => e.name === multiGroupEquip!.equipment);
                if (item) {
                    expectedRate += (group.dropRate * item.dropRate) / 100;
                }
            }
        }

        assert.ok(
            approxEqual(source.effectiveRate, expectedRate, 0.01),
            `Multi-group aggregation failed for ${multiGroupEquip.equipment}: got ${source.effectiveRate.toFixed(4)}, expected ${expectedRate.toFixed(4)}`
        );
    } else {
        console.log('  (no multi-group equipment found to test)');
    }
});

test('aggregation: quality row totals are correct', () => {
    const violations: string[] = [];
    for (const [equipName, equip] of Object.entries(index)) {
        for (const [, source] of Object.entries(equip.sources)) {
            for (let s = 1; s <= 5; s++) {
                let rowSum = 0;
                for (let g = 1; g <= 5; g++) {
                    rowSum += source.probMatrix[`s${s}g${g}`];
                }
                if (rowSum < 0 || rowSum > source.effectiveRate + 0.01) {
                    violations.push(`${equipName} star${s}: row sum ${rowSum.toFixed(4)} out of range`);
                }
            }
        }
    }
    assert.ok(violations.length === 0, `Row totals invalid:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('aggregation: grade column totals are correct', () => {
    const violations: string[] = [];
    for (const [equipName, equip] of Object.entries(index)) {
        for (const [, source] of Object.entries(equip.sources)) {
            for (let g = 1; g <= 5; g++) {
                let colSum = 0;
                for (let s = 1; s <= 5; s++) {
                    colSum += source.probMatrix[`s${s}g${g}`];
                }
                if (colSum < 0 || colSum > source.effectiveRate + 0.01) {
                    violations.push(`${equipName} g${g}: col sum ${colSum.toFixed(4)} out of range`);
                }
            }
        }
    }
    assert.ok(violations.length === 0, `Column totals invalid:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

console.log(`\n${'='.repeat(60)}`);
console.log(`Tests: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
console.log(`${'='.repeat(60)}`);

process.exit(failed > 0 ? 1 : 0);
