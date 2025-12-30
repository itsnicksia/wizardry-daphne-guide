import type {
    AlterationData,
    AlterationIndex,
    AlterationStatType,
    AlterationStatRates,
    IndexedAlterationEquipment,
    StatRanking,
    TierNumber,
    AlterationEquipment,
    EquipmentGroup,
} from '../../types/alteration';

const ALL_STATS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%',
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'SUR'
];

function hashEquipmentStats(equip: AlterationEquipment): string {
    return equip.tiers
        .sort((a, b) => a.tier - b.tier)
        .map(tier => ALL_STATS.map(stat => tier.stats[stat] ?? 'null').join(','))
        .join('|');
}

const TYPE_MODIFIERS = ['One-Handed', 'Two-Handed', 'Heavy', 'Light', 'Large', 'Small'];
const ARMOR_WEIGHT_MODIFIERS = ['Light', 'Heavy'];

function extractEquipmentType(name: string): string {
    // Handle "of X" patterns - process only the part before "of"
    const ofIndex = name.indexOf(' of ');
    if (ofIndex !== -1) {
        name = name.substring(0, ofIndex);
    }

    const words = name.split(' ');

    // Check for 3-word patterns like "Light Armor Boots" or "Heavy Armor Boots"
    if (words.length >= 3) {
        const lastThree = words.slice(-3);
        if (ARMOR_WEIGHT_MODIFIERS.includes(lastThree[0]) &&
            lastThree[1] === 'Armor' &&
            lastThree[2] === 'Boots') {
            return lastThree.join(' ');
        }
    }

    // Check for 2-word types with modifier
    if (words.length >= 2) {
        const secondToLast = words[words.length - 2];
        if (TYPE_MODIFIERS.includes(secondToLast)) {
            return words.slice(-2).join(' ');
        }
    }

    return words[words.length - 1];
}

function findCommonSuffix(names: string[], minWords: number = 1): string | null {
    if (names.length === 0) return null;
    if (names.length === 1) return extractEquipmentType(names[0]);

    const wordArrays = names.map(name => name.split(' '));
    const maxWords = Math.min(...wordArrays.map(arr => arr.length));

    // Find the longest common suffix
    let lastMatchLength = 0;
    for (let i = minWords; i <= maxWords; i++) {
        const suffix = wordArrays[0].slice(-i).join(' ');
        const allMatch = wordArrays.every(arr => arr.slice(-i).join(' ') === suffix);
        if (allMatch) {
            lastMatchLength = i;
        } else {
            break;
        }
    }

    if (lastMatchLength > 0) {
        const suffix = wordArrays[0].slice(-lastMatchLength).join(' ');
        return extractEquipmentType(suffix);
    }

    return null;
}

function detectTypeName(items: AlterationEquipment[], minWords: number = 1): string {
    const names = items.map(item => item.name);
    const commonSuffix = findCommonSuffix(names, minWords);

    if (commonSuffix) {
        return commonSuffix;
    }

    // No common suffix - use majority vote of extracted equipment types
    // Prefer multi-word types (e.g., "Light Armor") over single-word types (e.g., "Mail")
    const typeCounts = new Map<string, number>();
    for (const item of items) {
        const type = extractEquipmentType(item.name);
        typeCounts.set(type, (typeCounts.get(type) || 0) + 1);
    }

    // Separate and sort multi-word and single-word types by count
    const multiWordTypes: [string, number][] = [];
    const singleWordTypes: [string, number][] = [];
    for (const [type, count] of typeCounts) {
        if (type.includes(' ')) {
            multiWordTypes.push([type, count]);
        } else {
            singleWordTypes.push([type, count]);
        }
    }
    multiWordTypes.sort((a, b) => b[1] - a[1]);
    singleWordTypes.sort((a, b) => b[1] - a[1]);

    // Prefer the most common multi-word type if it has significant representation (33%+)
    // Multi-word types like "Light Armor" are more descriptive than single-word like "Mail"
    const threshold = items.length * 0.33;
    if (multiWordTypes.length > 0 && multiWordTypes[0][1] >= threshold) {
        return multiWordTypes[0][0];
    }

    // Otherwise return the most common type overall
    if (singleWordTypes.length > 0 &&
        (multiWordTypes.length === 0 || singleWordTypes[0][1] > multiWordTypes[0][1])) {
        return singleWordTypes[0][0];
    }

    return multiWordTypes.length > 0 ? multiWordTypes[0][0] : extractEquipmentType(items[0].name);
}

export function buildAlterationIndex(data: AlterationData): AlterationIndex {
    const byStatRanking = new Map<AlterationStatType, StatRanking[]>();
    const byName = new Map<string, IndexedAlterationEquipment>();
    const byNameJp = new Map<string, IndexedAlterationEquipment>();

    ALL_STATS.forEach(stat => byStatRanking.set(stat, []));

    const groupMap = new Map<string, AlterationEquipment[]>();
    for (const equip of data.equipment) {
        const hash = hashEquipmentStats(equip);
        if (!groupMap.has(hash)) {
            groupMap.set(hash, []);
        }
        groupMap.get(hash)!.push(equip);
    }

    const groups: EquipmentGroup[] = [];
    for (const items of groupMap.values()) {
        const typeName = detectTypeName(items);
        groups.push({
            typeName,
            items,
            tiers: items[0].tiers,
        });
    }

    // Detect and fix name collisions by using longer suffixes
    const nameCount = new Map<string, EquipmentGroup[]>();
    for (const group of groups) {
        const existing = nameCount.get(group.typeName) || [];
        existing.push(group);
        nameCount.set(group.typeName, existing);
    }

    for (const [, duplicateGroups] of nameCount) {
        if (duplicateGroups.length > 1) {
            for (const group of duplicateGroups) {
                // Try progressively longer suffixes until we get unique names
                for (let minWords = 2; minWords <= 5; minWords++) {
                    const newName = detectTypeName(group.items, minWords);
                    if (newName !== group.typeName) {
                        group.typeName = newName;
                        break;
                    }
                }
            }
        }
    }

    groups.sort((a, b) => a.typeName.localeCompare(b.typeName));

    for (const group of groups) {
        for (const tier of group.tiers) {
            for (const stat of ALL_STATS) {
                const prob = tier.stats[stat];
                if (prob !== null && prob > 0) {
                    byStatRanking.get(stat)!.push({
                        groupName: group.typeName,
                        probability: prob,
                        tier: tier.tier,
                    });
                }
            }
        }

        for (const equip of group.items) {
            const tierMap = new Map<TierNumber, AlterationStatRates>();
            for (const tier of equip.tiers) {
                tierMap.set(tier.tier, tier.stats);
            }

            const indexed: IndexedAlterationEquipment = {
                name: equip.name,
                nameJp: equip.nameJp,
                tiers: tierMap,
            };

            byName.set(equip.name.toLowerCase(), indexed);
            byNameJp.set(equip.nameJp, indexed);
        }
    }

    for (const rankings of byStatRanking.values()) {
        rankings.sort((a, b) => b.probability - a.probability);
    }

    return {
        byStatRanking,
        groups,
        byName,
        byNameJp,
        equipmentList: data.equipment
    };
}
