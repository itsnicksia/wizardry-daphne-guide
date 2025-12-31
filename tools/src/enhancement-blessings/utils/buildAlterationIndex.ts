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
import { inferEquipmentTypeFromName } from '../../types/equipment-types';

const ALL_STATS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%',
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'SUR'
];

function getEquipmentType(equip: AlterationEquipment): string {
    return equip.equipmentType || inferEquipmentTypeFromName(equip.name);
}

export function buildAlterationIndex(data: AlterationData): AlterationIndex {
    const byStatRanking = new Map<AlterationStatType, StatRanking[]>();
    const byName = new Map<string, IndexedAlterationEquipment>();
    const byNameJp = new Map<string, IndexedAlterationEquipment>();

    ALL_STATS.forEach(stat => byStatRanking.set(stat, []));

    const groupMap = new Map<string, AlterationEquipment[]>();
    for (const equip of data.equipment) {
        const type = getEquipmentType(equip);
        if (type === 'Unknown') continue; // Skip unknown items
        if (!groupMap.has(type)) {
            groupMap.set(type, []);
        }
        groupMap.get(type)!.push(equip);
    }

    const groups: EquipmentGroup[] = [];
    for (const [typeName, items] of groupMap.entries()) {
        groups.push({
            typeName,
            items,
            tiers: items[0].tiers,
        });
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
