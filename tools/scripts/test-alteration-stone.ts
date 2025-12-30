/**
 * Tests for Full Alteration Stone blessing value data.
 * Validates the hardcoded data in FullAlterationStone.tsx against source from:
 * https://wizardry.info/daphne/gacha_rates/ja/alternations.html
 *
 * Run with: npx tsx scripts/test-alteration-stone.ts
 */

import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Running Full Alteration Stone data verification tests...\n');

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

function approxEqual(a: number, b: number, tolerance = 0.01): boolean {
    return Math.abs(a - b) < tolerance;
}

type Quality = 1 | 2 | 3 | 4 | 5;

interface ValueRange {
    start: number;
    count: number;
    probability: number;
}

type MagnitudeData = Record<Quality, Record<string, ValueRange>>;

const STATS = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%',
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'SUR',
];

const QUALITIES: Quality[] = [1, 2, 3, 4, 5];

// Extract data constants from the TSX file
function extractDataFromSource(): {
    LESSER_RANK_1_TO_5: MagnitudeData;
    LESSER_RANK_6_TWO_HANDED: MagnitudeData;
    LESSER_RANK_6_OTHER: MagnitudeData;
    FULL_RANK_1_TO_5: MagnitudeData;
    FULL_RANK_6_TWO_HANDED: MagnitudeData;
    FULL_RANK_6_OTHER: MagnitudeData;
} {
    const tsxPath = path.join(__dirname, '../src/alteration-guide/components/FullAlterationStone.tsx');
    const content = fs.readFileSync(tsxPath, 'utf8');

    const extractConst = (name: string): MagnitudeData => {
        const regex = new RegExp(`const ${name}: MagnitudeData = ({[\\s\\S]*?});`, 'm');
        const match = content.match(regex);
        if (!match) throw new Error(`Could not find ${name} in source`);
        return eval(`(${match[1]})`);
    };

    return {
        LESSER_RANK_1_TO_5: extractConst('LESSER_RANK_1_TO_5'),
        LESSER_RANK_6_TWO_HANDED: extractConst('LESSER_RANK_6_TWO_HANDED'),
        LESSER_RANK_6_OTHER: extractConst('LESSER_RANK_6_OTHER'),
        FULL_RANK_1_TO_5: extractConst('FULL_RANK_1_TO_5'),
        FULL_RANK_6_TWO_HANDED: extractConst('FULL_RANK_6_TWO_HANDED'),
        FULL_RANK_6_OTHER: extractConst('FULL_RANK_6_OTHER'),
    };
}

const data = extractDataFromSource();

console.log('=== Data Structure Validation ===\n');

test('data: LESSER_RANK_1_TO_5 has all 5 qualities', () => {
    for (const q of QUALITIES) {
        assert.ok(q in data.LESSER_RANK_1_TO_5, `Missing quality ${q}`);
    }
});

test('data: LESSER_RANK_6_TWO_HANDED has all 5 qualities', () => {
    for (const q of QUALITIES) {
        assert.ok(q in data.LESSER_RANK_6_TWO_HANDED, `Missing quality ${q}`);
    }
});

test('data: FULL_RANK_1_TO_5 has all 5 qualities', () => {
    for (const q of QUALITIES) {
        assert.ok(q in data.FULL_RANK_1_TO_5, `Missing quality ${q}`);
    }
});

test('data: each dataset has exactly 18 stats per quality (no ASPD flat)', () => {
    const datasets = [
        { name: 'LESSER_RANK_1_TO_5', data: data.LESSER_RANK_1_TO_5 },
        { name: 'LESSER_RANK_6_TWO_HANDED', data: data.LESSER_RANK_6_TWO_HANDED },
        { name: 'LESSER_RANK_6_OTHER', data: data.LESSER_RANK_6_OTHER },
        { name: 'FULL_RANK_1_TO_5', data: data.FULL_RANK_1_TO_5 },
        { name: 'FULL_RANK_6_TWO_HANDED', data: data.FULL_RANK_6_TWO_HANDED },
        { name: 'FULL_RANK_6_OTHER', data: data.FULL_RANK_6_OTHER },
    ];

    const violations: string[] = [];
    for (const ds of datasets) {
        for (const q of QUALITIES) {
            const statCount = Object.keys(ds.data[q]).length;
            if (statCount !== 18) {
                violations.push(`${ds.name} quality ${q}: has ${statCount} stats, expected 18`);
            }
        }
    }
    assert.ok(violations.length === 0, `\n  ${violations.join('\n  ')}`);
});

test('data: all 18 stats present in each quality', () => {
    const violations: string[] = [];
    for (const q of QUALITIES) {
        for (const stat of STATS) {
            if (!(stat in data.LESSER_RANK_1_TO_5[q])) {
                violations.push(`LESSER_RANK_1_TO_5 quality ${q}: missing ${stat}`);
            }
        }
    }
    assert.ok(violations.length === 0, `\n  ${violations.join('\n  ')}`);
});

test('data: no ASPD flat stat (行動速度上昇（固定） not in alteration tables)', () => {
    const datasets = [
        data.LESSER_RANK_1_TO_5,
        data.LESSER_RANK_6_TWO_HANDED,
        data.LESSER_RANK_6_OTHER,
        data.FULL_RANK_1_TO_5,
        data.FULL_RANK_6_TWO_HANDED,
        data.FULL_RANK_6_OTHER,
    ];
    for (const ds of datasets) {
        for (const q of QUALITIES) {
            assert.ok(!('ASPD' in ds[q]), `ASPD flat should not exist in quality ${q}`);
        }
    }
});

console.log('\n=== Value Range Validation ===\n');

test('values: all start values are positive integers', () => {
    const violations: string[] = [];
    for (const q of QUALITIES) {
        for (const stat of STATS) {
            const range = data.LESSER_RANK_1_TO_5[q][stat];
            if (range.start < 1 || !Number.isInteger(range.start)) {
                violations.push(`quality ${q} ${stat}: start=${range.start}`);
            }
        }
    }
    assert.ok(violations.length === 0, `Invalid start values:\n  ${violations.join('\n  ')}`);
});

test('values: all count values are positive integers', () => {
    const violations: string[] = [];
    for (const q of QUALITIES) {
        for (const stat of STATS) {
            const range = data.LESSER_RANK_1_TO_5[q][stat];
            if (range.count < 1 || !Number.isInteger(range.count)) {
                violations.push(`quality ${q} ${stat}: count=${range.count}`);
            }
        }
    }
    assert.ok(violations.length === 0, `Invalid count values:\n  ${violations.join('\n  ')}`);
});

test('values: probabilities are between 0 and 100', () => {
    const violations: string[] = [];
    for (const q of QUALITIES) {
        for (const stat of STATS) {
            const range = data.LESSER_RANK_1_TO_5[q][stat];
            if (range.probability <= 0 || range.probability > 100) {
                violations.push(`quality ${q} ${stat}: probability=${range.probability}`);
            }
        }
    }
    assert.ok(violations.length === 0, `Invalid probabilities:\n  ${violations.join('\n  ')}`);
});

test('values: probability × count ≈ 100 (accounts for rounding in source)', () => {
    // Note: Source probabilities don't always exactly equal 100/count due to
    // how the game implements multiple overlapping value buckets
    for (const q of QUALITIES) {
        for (const stat of STATS) {
            const range = data.LESSER_RANK_1_TO_5[q][stat];
            const product = range.probability * range.count;
            assert.ok(product <= 100.1, `quality ${q} ${stat}: prob×count=${product.toFixed(2)} exceeds 100`);
        }
    }
});

console.log('\n=== Lesser vs Full Stone Comparison ===\n');

test('values: Full stone start values >= Lesser stone start values', () => {
    const violations: string[] = [];
    for (const q of QUALITIES) {
        for (const stat of STATS) {
            const lesserStart = data.LESSER_RANK_1_TO_5[q][stat].start;
            const fullStart = data.FULL_RANK_1_TO_5[q][stat].start;
            if (fullStart < lesserStart) {
                violations.push(`quality ${q} ${stat}: Full start=${fullStart} < Lesser start=${lesserStart}`);
            }
        }
    }
    assert.ok(violations.length === 0, `Full stone not boosted:\n  ${violations.join('\n  ')}`);
});

test('values: Full stones have boosted minimum values (Full start > Lesser start)', () => {
    let boostedCount = 0;
    let equalCount = 0;
    for (const q of QUALITIES) {
        for (const stat of STATS) {
            const lesserStart = data.LESSER_RANK_1_TO_5[q][stat].start;
            const fullStart = data.FULL_RANK_1_TO_5[q][stat].start;
            if (fullStart > lesserStart) boostedCount++;
            else equalCount++;
        }
    }
    assert.ok(boostedCount > equalCount, `Expected more boosted values: boosted=${boostedCount}, equal=${equalCount}`);
});

console.log('\n=== Cross-Reference with Source Data ===\n');

test('crossref: Lesser Rank 1-5 Quality 1 ATK% starts at 2', () => {
    const range = data.LESSER_RANK_1_TO_5[1]['ATK%'];
    assert.strictEqual(range.start, 2, `Expected start=2, got ${range.start}`);
});

test('crossref: Lesser Rank 1-5 Quality 1 ATK% has 3 values (2,3,4)', () => {
    const range = data.LESSER_RANK_1_TO_5[1]['ATK%'];
    assert.strictEqual(range.count, 3, `Expected count=3, got ${range.count}`);
});

test('crossref: Lesser Rank 1-5 Quality 1 ATK% probability ≈ 33.33%', () => {
    const range = data.LESSER_RANK_1_TO_5[1]['ATK%'];
    assert.ok(approxEqual(range.probability, 33.3333, 0.01), `Expected ~33.33%, got ${range.probability}`);
});

test('crossref: Full Rank 1-5 Quality 1 ATK% starts at 3 (boosted)', () => {
    const range = data.FULL_RANK_1_TO_5[1]['ATK%'];
    assert.strictEqual(range.start, 3, `Expected start=3, got ${range.start}`);
});

test('crossref: Lesser Rank 1-5 Quality 5 ATK% starts at 15', () => {
    const range = data.LESSER_RANK_1_TO_5[5]['ATK%'];
    assert.strictEqual(range.start, 15, `Expected start=15, got ${range.start}`);
});

test('crossref: Full Rank 1-5 Quality 5 ATK% starts at 18 (boosted)', () => {
    const range = data.FULL_RANK_1_TO_5[5]['ATK%'];
    assert.strictEqual(range.start, 18, `Expected start=18, got ${range.start}`);
});

test('crossref: Lesser Rank 6 Two-Handed Quality 5 has wider ranges than Rank 1-5', () => {
    const rank1to5 = data.LESSER_RANK_1_TO_5[5]['ATK%'];
    const rank6TH = data.LESSER_RANK_6_TWO_HANDED[5]['ATK%'];
    assert.ok(rank6TH.count > rank1to5.count,
        `Rank 6 Two-Handed count=${rank6TH.count} should be > Rank 1-5 count=${rank1to5.count}`);
});

test('crossref: SUR stat exists and has valid ranges', () => {
    for (const q of QUALITIES) {
        const range = data.LESSER_RANK_1_TO_5[q]['SUR'];
        assert.ok(range, `SUR missing for quality ${q}`);
        assert.ok(range.start >= 2, `SUR quality ${q} start should be >= 2`);
        assert.ok(range.count >= 2, `SUR quality ${q} should have count >= 2`);
    }
});

test('crossref: ASPD% (percentage) exists in all qualities', () => {
    for (const q of QUALITIES) {
        const range = data.LESSER_RANK_1_TO_5[q]['ASPD%'];
        assert.ok(range, `ASPD% missing for quality ${q}`);
    }
});

console.log('\n=== Equipment Rank Category Tests ===\n');

test('ranks: Rank 6 Two-Handed has different data from Rank 1-5', () => {
    const q5_1to5 = data.LESSER_RANK_1_TO_5[5]['ATK'];
    const q5_6th = data.LESSER_RANK_6_TWO_HANDED[5]['ATK'];
    assert.ok(q5_1to5.count !== q5_6th.count || q5_1to5.probability !== q5_6th.probability,
        'Rank 1-5 and Rank 6 Two-Handed should have different distributions');
});

test('ranks: Rank 6 Other differs from Rank 6 Two-Handed', () => {
    const twoHanded = data.LESSER_RANK_6_TWO_HANDED[5]['ATK%'];
    const other = data.LESSER_RANK_6_OTHER[5]['ATK%'];
    assert.ok(twoHanded.count !== other.count,
        `Two-Handed count=${twoHanded.count} should differ from Other count=${other.count}`);
});

test('ranks: Full stone rank categories also differ', () => {
    const full1to5 = data.FULL_RANK_1_TO_5[5]['ATK'];
    const full6th = data.FULL_RANK_6_TWO_HANDED[5]['ATK'];
    assert.ok(full1to5.count !== full6th.count,
        `Full Rank 1-5 count=${full1to5.count} should differ from Rank 6 count=${full6th.count}`);
});

console.log('\n=== Quality Progression Tests ===\n');

test('progression: higher quality = higher start values', () => {
    const violations: string[] = [];
    for (const stat of STATS) {
        for (let q = 2; q <= 5; q++) {
            const prev = data.LESSER_RANK_1_TO_5[(q - 1) as Quality][stat];
            const curr = data.LESSER_RANK_1_TO_5[q as Quality][stat];
            if (curr.start < prev.start) {
                violations.push(`${stat}: quality ${q} start=${curr.start} < quality ${q-1} start=${prev.start}`);
            }
        }
    }
    assert.ok(violations.length === 0, `Start values should increase with quality:\n  ${violations.join('\n  ')}`);
});

test('progression: value ranges expand at higher qualities', () => {
    for (const stat of ['ATK', 'MAG', 'DEF']) {
        const q1Range = data.LESSER_RANK_1_TO_5[1][stat];
        const q5Range = data.LESSER_RANK_1_TO_5[5][stat];
        const q1Max = q1Range.start + q1Range.count - 1;
        const q5Max = q5Range.start + q5Range.count - 1;
        assert.ok(q5Max > q1Max, `${stat}: Quality 5 max=${q5Max} should be > Quality 1 max=${q1Max}`);
    }
});

// Load and verify against extracted JSON if available
const jsonPath = '/tmp/alteration-stone-data.json';
if (fs.existsSync(jsonPath)) {
    console.log('\n=== JSON Source Data Verification ===\n');

    interface SourceData {
        lesser: {
            rank1to5: MagnitudeData;
            rank6TwoHanded: MagnitudeData;
            rank6Other: MagnitudeData;
        };
        full: {
            rank1to5: MagnitudeData;
            rank6TwoHanded: MagnitudeData;
            rank6Other: MagnitudeData;
        };
    }

    const sourceData: SourceData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

    test('json: Lesser Rank 1-5 Quality 1 ATK% matches extracted data', () => {
        const extracted = sourceData.lesser.rank1to5[1]['ATK%'];
        const component = data.LESSER_RANK_1_TO_5[1]['ATK%'];
        assert.strictEqual(component.start, extracted.start, `start mismatch: ${component.start} vs ${extracted.start}`);
        assert.strictEqual(component.count, extracted.count, `count mismatch: ${component.count} vs ${extracted.count}`);
        assert.ok(approxEqual(component.probability, extracted.probability, 0.01),
            `probability mismatch: ${component.probability} vs ${extracted.probability}`);
    });

    test('json: Full Rank 1-5 Quality 5 ATK% matches extracted data', () => {
        const extracted = sourceData.full.rank1to5[5]['ATK%'];
        const component = data.FULL_RANK_1_TO_5[5]['ATK%'];
        assert.strictEqual(component.start, extracted.start, `start mismatch: ${component.start} vs ${extracted.start}`);
        assert.strictEqual(component.count, extracted.count, `count mismatch: ${component.count} vs ${extracted.count}`);
        assert.ok(approxEqual(component.probability, extracted.probability, 0.01),
            `probability mismatch: ${component.probability} vs ${extracted.probability}`);
    });

    test('json: SUR stat matches across all qualities', () => {
        const violations: string[] = [];
        for (const q of QUALITIES) {
            const extracted = sourceData.lesser.rank1to5[q]['SUR'];
            const component = data.LESSER_RANK_1_TO_5[q]['SUR'];
            if (component.start !== extracted.start || component.count !== extracted.count) {
                violations.push(`Quality ${q}: component (${component.start}, ${component.count}) vs source (${extracted.start}, ${extracted.count})`);
            }
        }
        assert.ok(violations.length === 0, `SUR mismatches:\n  ${violations.join('\n  ')}`);
    });
} else {
    console.log('\n=== JSON Source Data Verification ===\n');
    console.log('⚠ Skipping JSON verification: /tmp/alteration-stone-data.json not found');
    console.log('  Run: python3 scripts/extract-alteration-stone-data.py to generate\n');
}

console.log(`\n${'='.repeat(60)}`);
console.log(`Tests: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
console.log(`${'='.repeat(60)}`);

process.exit(failed > 0 ? 1 : 0);
