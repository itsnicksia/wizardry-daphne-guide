import type {
    AlterationData,
    AlterationIndex,
    AlterationStatType,
    AlterationStatRates,
    IndexedAlterationEquipment,
    StatRanking,
    TierNumber,
} from '../../types/alteration';

export function buildAlterationIndex(data: AlterationData): AlterationIndex {
    const byStatRanking = new Map<AlterationStatType, StatRanking[]>();
    const byName = new Map<string, IndexedAlterationEquipment>();
    const byNameJp = new Map<string, IndexedAlterationEquipment>();

    const allStats: AlterationStatType[] = [
        'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%',
        'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'CRIT'
    ];

    allStats.forEach(stat => byStatRanking.set(stat, []));

    for (const equip of data.equipment) {
        const tierMap = new Map<TierNumber, AlterationStatRates>();

        for (const tier of equip.tiers) {
            tierMap.set(tier.tier, tier.stats);

            for (const stat of allStats) {
                const prob = tier.stats[stat];
                if (prob !== null && prob > 0) {
                    byStatRanking.get(stat)!.push({
                        equipment: equip.name,
                        equipmentJp: equip.nameJp,
                        probability: prob,
                        tier: tier.tier,
                    });
                }
            }
        }

        const indexed: IndexedAlterationEquipment = {
            name: equip.name,
            nameJp: equip.nameJp,
            tiers: tierMap,
        };

        byName.set(equip.name.toLowerCase(), indexed);
        byNameJp.set(equip.nameJp, indexed);
    }

    for (const rankings of byStatRanking.values()) {
        rankings.sort((a, b) => b.probability - a.probability);
    }

    return {
        byStatRanking,
        byName,
        byNameJp,
        equipmentList: data.equipment
    };
}
