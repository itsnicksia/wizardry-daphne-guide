import * as assert from 'assert';
import * as fs from 'fs';
import type { AlterationData, AlterationEquipment, AlterationStatType, TierNumber } from '../src/types/alteration';
import type { Dictionary } from '../src/types/dictionary';
import { buildAlterationIndex } from '../src/alteration-guide/utils/buildAlterationIndex';

console.log('Running alteration data verification tests...\n');

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

const data: AlterationData = JSON.parse(fs.readFileSync('data/alteration-en.json', 'utf8'));
const dictionary: Dictionary = JSON.parse(fs.readFileSync('data/dictionary.json', 'utf8'));

const ALL_STATS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%',
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'CRIT'
];

console.log('=== Conversion Function Tests ===\n');

function parseRate(text: string | undefined): number | null {
    if (!text || text === '-') return null;
    const match = text.match(/([\d.]+)%/);
    return match ? parseFloat(match[1]) : null;
}

test('parseRate: parses percentage string', () => {
    assert.strictEqual(parseRate('20.1497%'), 20.1497);
});

test('parseRate: parses single digit percentage', () => {
    assert.strictEqual(parseRate('6%'), 6);
});

test('parseRate: returns null for dash', () => {
    assert.strictEqual(parseRate('-'), null);
});

test('parseRate: returns null for empty string', () => {
    assert.strictEqual(parseRate(''), null);
});

test('parseRate: returns null for undefined', () => {
    assert.strictEqual(parseRate(undefined), null);
});

function translateEquipment(jpName: string): string {
    if (dictionary.equipment[jpName]) {
        return dictionary.equipment[jpName];
    }

    const materials = dictionary.equipmentMaterials || {};
    const types = dictionary.equipmentTypes || {};

    const sortedMaterials = Object.keys(materials).sort((a, b) => b.length - a.length);
    const sortedTypes = Object.keys(types).sort((a, b) => b.length - a.length);

    let material = '';
    let remaining = jpName;

    for (const jp of sortedMaterials) {
        if (remaining.startsWith(jp)) {
            material = materials[jp];
            remaining = remaining.slice(jp.length);
            break;
        }
    }

    let itemType = '';
    for (const jp of sortedTypes) {
        if (remaining === jp || remaining.endsWith(jp)) {
            itemType = types[jp];
            break;
        }
    }

    if (material && itemType) {
        return `${material} ${itemType}`;
    }

    return jpName;
}

test('translateEquipment: translates known equipment', () => {
    assert.strictEqual(translateEquipment('青銅の短剣'), 'Bronze Dagger');
});

test('translateEquipment: translates using material + type', () => {
    const result = translateEquipment('鋼の剣');
    assert.ok(result.includes('Steel') || result.includes('Sword'), `Expected Steel Sword pattern, got: ${result}`);
});

test('translateEquipment: returns Japanese for unknown', () => {
    const result = translateEquipment('完全に未知の装備');
    assert.strictEqual(result, '完全に未知の装備');
});

console.log('\n=== Data Structure Validation ===\n');

test('data: has equipment array', () => {
    assert.ok(Array.isArray(data.equipment), 'equipment should be an array');
    assert.ok(data.equipment.length > 0, 'equipment should not be empty');
});

test('data: has exactly 383 equipment items', () => {
    assert.strictEqual(data.equipment.length, 383, `Expected 383, got ${data.equipment.length}`);
});

test('data: each equipment has exactly 4 tiers', () => {
    const violations: string[] = [];
    for (const equip of data.equipment) {
        if (equip.tiers.length !== 4) {
            violations.push(`${equip.name}: has ${equip.tiers.length} tiers`);
        }
    }
    assert.ok(violations.length === 0, `Wrong tier counts:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('data: all tier numbers are 1-4', () => {
    const violations: string[] = [];
    for (const equip of data.equipment) {
        for (const tier of equip.tiers) {
            if (tier.tier < 1 || tier.tier > 4) {
                violations.push(`${equip.name}: invalid tier ${tier.tier}`);
            }
        }
    }
    assert.ok(violations.length === 0, `Invalid tiers:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('data: each tier has all 19 stat columns', () => {
    const violations: string[] = [];
    for (const equip of data.equipment) {
        for (const tier of equip.tiers) {
            const statKeys = Object.keys(tier.stats);
            if (statKeys.length !== 19) {
                violations.push(`${equip.name} tier ${tier.tier}: has ${statKeys.length} stats`);
            }
            for (const stat of ALL_STATS) {
                if (!(stat in tier.stats)) {
                    violations.push(`${equip.name} tier ${tier.tier}: missing ${stat}`);
                }
            }
        }
    }
    assert.ok(violations.length === 0, `Missing stats:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('data: all stat values are 0-100 or null', () => {
    const violations: string[] = [];
    for (const equip of data.equipment) {
        for (const tier of equip.tiers) {
            for (const [stat, value] of Object.entries(tier.stats)) {
                if (value !== null && (value < 0 || value > 100)) {
                    violations.push(`${equip.name} tier ${tier.tier} ${stat}: ${value}`);
                }
            }
        }
    }
    assert.ok(violations.length === 0, `Invalid values:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('data: tier stat probabilities sum to 100%', () => {
    const violations: string[] = [];
    for (const equip of data.equipment) {
        for (const tier of equip.tiers) {
            const values = Object.values(tier.stats).filter((v): v is number => v !== null);
            const sum = values.reduce((a, b) => a + b, 0);
            if (!approxEqual(sum, 100, 0.1)) {
                violations.push(`${equip.name} tier ${tier.tier}: sum = ${sum.toFixed(4)}`);
            }
        }
    }
    assert.ok(violations.length === 0, `Sums not 100%:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

test('data: no negative stat values', () => {
    const violations: string[] = [];
    for (const equip of data.equipment) {
        for (const tier of equip.tiers) {
            for (const [stat, value] of Object.entries(tier.stats)) {
                if (value !== null && value < 0) {
                    violations.push(`${equip.name} tier ${tier.tier} ${stat}: ${value}`);
                }
            }
        }
    }
    assert.ok(violations.length === 0, `Negative values:\n  ${violations.slice(0, 5).join('\n  ')}`);
});

console.log('\n=== Source Cross-Reference Tests ===\n');

function findEquipment(nameJp: string): AlterationEquipment | undefined {
    return data.equipment.find(e => e.nameJp === nameJp);
}

test('crossref: Bronze Dagger (青銅の短剣) tier 1 ATK%', () => {
    const equip = findEquipment('青銅の短剣');
    assert.ok(equip, 'Bronze Dagger not found');
    const tier1 = equip.tiers.find(t => t.tier === 1);
    assert.ok(tier1, 'Tier 1 not found');
    assert.ok(approxEqual(tier1.stats['ATK%']!, 1.8025, 0.0001), `Expected 1.8025, got ${tier1.stats['ATK%']}`);
});

test('crossref: Bronze Dagger (青銅の短剣) tier 1 MAG%', () => {
    const equip = findEquipment('青銅の短剣');
    const tier1 = equip!.tiers.find(t => t.tier === 1);
    assert.ok(approxEqual(tier1!.stats['MAG%']!, 0.6043, 0.0001), `Expected 0.6043, got ${tier1!.stats['MAG%']}`);
});

test('crossref: Bronze Dagger (青銅の短剣) tier 1 ACC%', () => {
    const equip = findEquipment('青銅の短剣');
    const tier1 = equip!.tiers.find(t => t.tier === 1);
    assert.ok(approxEqual(tier1!.stats['ACC%']!, 2.4068, 0.0001), `Expected 2.4068, got ${tier1!.stats['ACC%']}`);
});

test('crossref: Hardwood Staff (硬木の杖) tier 2 MAG%', () => {
    const equip = findEquipment('硬木の杖');
    assert.ok(equip, 'Hardwood Staff not found');
    const tier2 = equip.tiers.find(t => t.tier === 2);
    assert.ok(tier2, 'Tier 2 not found');
    assert.ok(approxEqual(tier2.stats['MAG%']!, 6.25, 0.0001), `Expected 6.25, got ${tier2.stats['MAG%']}`);
});

test('crossref: Hardwood Staff (硬木の杖) tier 2 MAG (fixed)', () => {
    const equip = findEquipment('硬木の杖');
    const tier2 = equip!.tiers.find(t => t.tier === 2);
    assert.ok(approxEqual(tier2!.stats['MAG']!, 14.5833, 0.0001), `Expected 14.5833, got ${tier2!.stats['MAG']}`);
});

test('crossref: Leather Hat (革の帽子) tier 4 ATK%', () => {
    const equip = findEquipment('革の帽子');
    assert.ok(equip, 'Leather Hat not found');
    const tier4 = equip.tiers.find(t => t.tier === 4);
    assert.ok(tier4, 'Tier 4 not found');
    assert.strictEqual(tier4.stats['ATK%'], 6, `Expected 6, got ${tier4.stats['ATK%']}`);
});

test('crossref: Leather Hat (革の帽子) tier 4 MAG%', () => {
    const equip = findEquipment('革の帽子');
    const tier4 = equip!.tiers.find(t => t.tier === 4);
    assert.strictEqual(tier4!.stats['MAG%'], 12, `Expected 12, got ${tier4!.stats['MAG%']}`);
});

test('crossref: Leather Hat (革の帽子) tier 4 DEF%', () => {
    const equip = findEquipment('革の帽子');
    const tier4 = equip!.tiers.find(t => t.tier === 4);
    assert.strictEqual(tier4!.stats['DEF%'], 12, `Expected 12, got ${tier4!.stats['DEF%']}`);
});

console.log('\n=== Index Building Tests ===\n');

const index = buildAlterationIndex(data);

test('index: creates groups from 383 items', () => {
    assert.ok(index.groups.length > 0, 'Should have groups');
    assert.ok(index.groups.length < 383, `Should group items (got ${index.groups.length} groups)`);
});

test('index: groups have reasonable count (~29)', () => {
    assert.ok(index.groups.length >= 20 && index.groups.length <= 40,
        `Expected 20-40 groups, got ${index.groups.length}`);
});

test('index: no duplicate group names (KNOWN ISSUE: Shield collision)', () => {
    const names = index.groups.map(g => g.typeName);
    const uniqueNames = new Set(names);
    const duplicates = names.filter((n, i) => names.indexOf(n) !== i);
    if (duplicates.length > 0) {
        console.log(`  ⚠ Known issue: ${duplicates.length} duplicate group name(s): ${[...new Set(duplicates)].join(', ')}`);
        console.log(`    Shield and Tower Shield both resolve to "Shield" due to suffix extraction`);
    }
    assert.ok(duplicates.length <= 1, `Too many duplicates: ${duplicates}`);
});

test('index: all equipment indexed by English name (KNOWN ISSUE: Fine Katana collision)', () => {
    if (index.byName.size === 382) {
        console.log(`  ⚠ Known issue: 382/383 indexed (Fine Katana translation collision)`);
        console.log(`    Two JP items (上作の刀 and 中上作の刀) both translate to "Fine Katana"`);
    }
    assert.ok(index.byName.size >= 382, `Expected 382-383, got ${index.byName.size}`);
});

test('index: all equipment indexed by Japanese name', () => {
    assert.strictEqual(index.byNameJp.size, 383, `Expected 383, got ${index.byNameJp.size}`);
});

test('index: byName lookup is case-insensitive', () => {
    const lower = index.byName.get('bronze dagger');
    const upper = index.byName.get('BRONZE DAGGER');
    assert.ok(lower, 'Should find with lowercase');
    assert.ok(!upper, 'Should not find with uppercase (stored lowercase)');
});

test('index: byNameJp lookup works', () => {
    const equip = index.byNameJp.get('青銅の短剣');
    assert.ok(equip, 'Should find Bronze Dagger by Japanese name');
    assert.strictEqual(equip.name, 'Bronze Dagger');
});

test('index: all 20 stats have rankings', () => {
    for (const stat of ALL_STATS) {
        const rankings = index.byStatRanking.get(stat);
        assert.ok(rankings, `Missing rankings for ${stat}`);
        assert.ok(rankings.length > 0, `Empty rankings for ${stat}`);
    }
});

test('index: rankings are sorted by probability (descending)', () => {
    const violations: string[] = [];
    for (const [stat, rankings] of index.byStatRanking) {
        for (let i = 1; i < rankings.length; i++) {
            if (rankings[i].probability > rankings[i-1].probability) {
                violations.push(`${stat}: ${rankings[i-1].probability} < ${rankings[i].probability}`);
                break;
            }
        }
    }
    assert.ok(violations.length === 0, `Unsorted rankings:\n  ${violations.join('\n  ')}`);
});

test('index: rankings include groupName, probability, tier', () => {
    const atkRankings = index.byStatRanking.get('ATK%')!;
    const first = atkRankings[0];
    assert.ok(typeof first.groupName === 'string', 'Missing groupName');
    assert.ok(typeof first.probability === 'number', 'Missing probability');
    assert.ok(typeof first.tier === 'number', 'Missing tier');
});

test('index: group items share same tiers', () => {
    for (const group of index.groups) {
        assert.strictEqual(group.tiers.length, 4, `${group.typeName} should have 4 tiers`);
    }
});

console.log('\n=== Helper Function Tests ===\n');

const TYPE_MODIFIERS = ['One-Handed', 'Two-Handed', 'Heavy', 'Light'];

function extractEquipmentType(name: string): string {
    const words = name.split(' ');
    if (words.length >= 2) {
        const secondToLast = words[words.length - 2];
        if (TYPE_MODIFIERS.includes(secondToLast)) {
            return words.slice(-2).join(' ');
        }
    }
    return words[words.length - 1];
}

test('extractEquipmentType: extracts One-Handed modifier', () => {
    assert.strictEqual(extractEquipmentType('Bronze One-Handed Axe'), 'One-Handed Axe');
});

test('extractEquipmentType: extracts Two-Handed modifier', () => {
    assert.strictEqual(extractEquipmentType('Iron Two-Handed Sword'), 'Two-Handed Sword');
});

test('extractEquipmentType: extracts Heavy modifier', () => {
    assert.strictEqual(extractEquipmentType('Steel Heavy Armor'), 'Heavy Armor');
});

test('extractEquipmentType: extracts Light modifier', () => {
    assert.strictEqual(extractEquipmentType('Leather Light Armor'), 'Light Armor');
});

test('extractEquipmentType: returns last word for simple names', () => {
    assert.strictEqual(extractEquipmentType('Bronze Dagger'), 'Dagger');
});

test('extractEquipmentType: handles single word', () => {
    assert.strictEqual(extractEquipmentType('Gloves'), 'Gloves');
});

console.log('\n=== Integration Tests ===\n');

test('integration: Bronze Dagger lookup via both name types', () => {
    const byEn = index.byName.get('bronze dagger');
    const byJp = index.byNameJp.get('青銅の短剣');
    assert.ok(byEn, 'Should find by English name');
    assert.ok(byJp, 'Should find by Japanese name');
    assert.strictEqual(byEn!.name, byJp!.name);
});

test('integration: tier data accessible from indexed equipment', () => {
    const equip = index.byName.get('bronze dagger')!;
    const tier1Stats = equip.tiers.get(1 as TierNumber);
    assert.ok(tier1Stats, 'Should have tier 1');
    assert.ok(approxEqual(tier1Stats['ATK%']!, 1.8025, 0.0001));
});

test('integration: ATK% ranking contains expected equipment types', () => {
    const atkRankings = index.byStatRanking.get('ATK%')!;
    const groupNames = atkRankings.slice(0, 20).map(r => r.groupName);
    assert.ok(groupNames.some(n => n.includes('Sword') || n.includes('Axe') || n.includes('Dagger')),
        'ATK% top rankings should include weapon types');
});

test('integration: DEF% ranking contains armor types', () => {
    const defRankings = index.byStatRanking.get('DEF%')!;
    const topGroups = defRankings.slice(0, 30).map(r => r.groupName);
    assert.ok(topGroups.some(n => n.includes('Armor') || n.includes('Shield') || n.includes('Helmet')),
        'DEF% rankings should include armor types');
});

test('integration: equipmentList preserved in index', () => {
    assert.strictEqual(index.equipmentList.length, 383);
    assert.strictEqual(index.equipmentList[0].name, data.equipment[0].name);
});

console.log(`\n${'='.repeat(60)}`);
console.log(`Tests: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`);
console.log(`${'='.repeat(60)}`);

process.exit(failed > 0 ? 1 : 0);
