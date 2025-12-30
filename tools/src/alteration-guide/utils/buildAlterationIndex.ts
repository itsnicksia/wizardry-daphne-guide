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
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'CRIT'
];

function hashEquipmentStats(equip: AlterationEquipment): string {
    return equip.tiers
        .sort((a, b) => a.tier - b.tier)
        .map(tier => ALL_STATS.map(stat => tier.stats[stat] ?? 'null').join(','))
        .join('|');
}

function findCommonSuffix(names: string[], minWords: number = 1): string | null {
    if (names.length === 0) return null;
    if (names.length === 1) return names[0];

    const wordArrays = names.map(name => name.split(' '));
    const maxWords = Math.min(...wordArrays.map(arr => arr.length));

    for (let i = minWords; i <= maxWords; i++) {
        const suffix = wordArrays[0].slice(-i).join(' ');
        const allMatch = wordArrays.every(arr => arr.slice(-i).join(' ') === suffix);
        if (allMatch && i === maxWords) {
            return suffix;
        } else if (!allMatch && i > minWords) {
            return wordArrays[0].slice(-(i - 1)).join(' ');
        }
    }

    return null;
}

function pluralize(word: string): string {
    const lastWord = word.split(' ').pop() || word;
    const prefix = word.slice(0, word.length - lastWord.length);

    if (lastWord.endsWith('f')) {
        return prefix + lastWord.slice(0, -1) + 'ves';
    }
    if (lastWord.endsWith('fe')) {
        return prefix + lastWord.slice(0, -2) + 'ves';
    }
    if (lastWord.endsWith('y') && !/[aeiou]y$/i.test(lastWord)) {
        return prefix + lastWord.slice(0, -1) + 'ies';
    }
    if (lastWord.endsWith('s') || lastWord.endsWith('x') || lastWord.endsWith('ch') || lastWord.endsWith('sh')) {
        return prefix + lastWord + 'es';
    }
    return prefix + lastWord + 's';
}

function detectTypeName(items: AlterationEquipment[], minWords: number = 1): string {
    const names = items.map(item => item.name);
    const commonSuffix = findCommonSuffix(names, minWords);

    if (commonSuffix) {
        return pluralize(commonSuffix);
    }

    return items[0].name;
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
