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

function getEquipmentType(equip: AlterationEquipment): string {
    return equip.equipmentType || inferTypeFromName(equip.name);
}

const VALID_TYPES: Record<string, string> = {
    'One-Handed Sword': 'One-Handed Sword',
    'Two-Handed Sword': 'Two-Handed Sword',
    'One-Handed Axe': 'One-Handed Axe',
    'Two-Handed Axe': 'Two-Handed Axe',
    'One-Handed Mace': 'One-Handed Mace',
    'Two-Handed Mace': 'Two-Handed Mace',
    'One-Handed Staff': 'One-Handed Staff',
    'Two-Handed Staff': 'Two-Handed Staff',
    'Two-Handed Spear': 'Two-Handed Spear',
    'Dagger': 'Dagger',
    'Bow': 'Bow',
    'Katana': 'Katana',
    'Ninja Blade': 'Ninja Blade',
    'Throwing Weapon': 'Throwing Weapon',
    'Tool': 'Tool',
    'Heavy Body Armor': 'Heavy Body Armor',
    'Light Body Armor': 'Light Body Armor',
    'Cloth Body Armor': 'Cloth Body Armor',
    'Heavy Helmet': 'Heavy Helmet',
    'Light Helmet': 'Light Helmet',
    'Cloth Hat': 'Cloth Hat',
    'Heavy Boots': 'Heavy Boots',
    'Light Boots': 'Light Boots',
    'Cloth Shoes': 'Cloth Shoes',
    'Heavy Gloves': 'Heavy Gloves',
    'Light Gloves': 'Light Gloves',
    'Cloth Gloves': 'Cloth Gloves',
    'Shield': 'Shield',
    'Accessory': 'Accessory',
    // Suffix mappings for old data
    'Greatsword': 'Two-Handed Sword',
    'Saber': 'One-Handed Sword',
    'Sword': 'One-Handed Sword',
    'Axe': 'One-Handed Axe',
    'Mace': 'One-Handed Mace',
    'Staff': 'One-Handed Staff',
    'Spear': 'Two-Handed Spear',
    'Blade': 'Katana',
    'Heavy Armor': 'Heavy Body Armor',
    'Light Armor': 'Light Body Armor',
    'Heavy Mail': 'Heavy Body Armor',
    'Plate': 'Heavy Body Armor',
    'Mail': 'Heavy Body Armor',
    'Chainmail': 'Heavy Body Armor',
    'Robe': 'Cloth Body Armor',
    'Tunic': 'Cloth Body Armor',
    'Heavy Armor Boots': 'Heavy Boots',
    'Light Armor Boots': 'Light Boots',
    'Boots': 'Light Boots',
    'Heavy Helm': 'Heavy Helmet',
    'Helm': 'Light Helmet',
    'Hat': 'Cloth Hat',
    'Hood': 'Cloth Hat',
    'Gloves': 'Light Gloves',
    'Gauntlets': 'Heavy Gloves',
    'Gauntlet': 'Heavy Gloves',
    'Ring': 'Accessory',
    'Earring': 'Accessory',
    'Necklace': 'Accessory',
    'Amulet': 'Accessory',
};

function inferTypeFromName(name: string): string {
    const sortedKeys = Object.keys(VALID_TYPES).sort((a, b) => b.length - a.length);
    for (const suffix of sortedKeys) {
        if (name.endsWith(suffix)) {
            return VALID_TYPES[suffix];
        }
    }
    return 'Unknown';
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
