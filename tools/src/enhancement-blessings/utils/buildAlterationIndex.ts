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

// Maps extracted equipment type names to in-game category names
const CATEGORY_MAP: Record<string, string> = {
    // Weapons
    'Dagger': 'Dagger',
    'Knife': 'Dagger',
    'Sword': 'One-Handed Sword',
    'Saber': 'One-Handed Sword',
    'One-Handed Axe': 'One-Handed Axe',
    'Light Axe': 'One-Handed Axe',
    'Axe': 'One-Handed Axe',
    'Hatchet': 'One-Handed Axe',
    'Staff': 'One-Handed Staff',
    'Rod': 'One-Handed Staff',
    'Wand': 'One-Handed Staff',
    'Mace': 'One-Handed Blunt Weapon',
    'Warmace': 'One-Handed Blunt Weapon',
    'Spiked Mace': 'One-Handed Blunt Weapon',
    'Heavy Mace': 'One-Handed Blunt Weapon',
    'Kunai': 'Throwing Ninja Tool',
    'Blade': 'Ninjato',
    'Katana': 'Katana',
    'Greatsword': 'Two-Handed Sword',
    'Two-Handed Sword': 'Two-Handed Sword',
    'Two-Handed Spear': 'Two-Handed Spear',
    'Heavy Spear': 'Two-Handed Spear',
    'Two-Handed Axe': 'Two-Handed Axe',
    'Two-Handed Staff': 'Two-Handed Staff',
    'Two-Handed Mace': 'Two-Handed Blunt Weapon',
    'Bow': 'Bow',
    'Longbow': 'Bow',
    'Arrow': 'Bow',
    'Tool': 'Tool',
    // Shields
    'Small Shield': 'Small Shield',
    'Shield': 'Light Shield',
    'Guard': 'Light Shield',
    'Large Shield': 'Heavy Shield',
    // Head
    'Hat': 'Hat',
    'Headcloth': 'Hat',
    'Hood': 'Hat',
    'Cowl': 'Hat',
    'Circlet': 'Hat',
    'Helm': 'Light Helmet',
    'Light Helmet': 'Light Helmet',
    'Light Helm': 'Light Helmet',
    'Heavy Helmet': 'Heavy Helmet',
    'Heavy Helm': 'Heavy Helmet',
    // Body
    'Robe': 'Clothes',
    'Cloak': 'Clothes',
    'Garb': 'Clothes',
    'Gown': 'Clothes',
    'Light Armor': 'Light Armor',
    'Mail': 'Light Armor',
    'Chainmail': 'Light Armor',
    'Heavy Armor': 'Heavy Armor',
    'Heavy Mail': 'Heavy Armor',
    'Plate': 'Heavy Armor',
    // Hands
    'Gloves': 'Gloves',
    'Arm Wraps': 'Gloves',
    'Wraps': 'Gloves',
    'Gauntlet': 'Light Gauntlets',
    'Light Gauntlets': 'Light Gauntlets',
    'Heavy Gauntlets': 'Heavy Gauntlets',
    // Feet
    'Shoes': 'Shoes',
    'Ninja Tabi': 'Shoes',
    'Tabi': 'Shoes',
    'Sandals': 'Shoes',
    'Boots': 'Shoes',
    'Light Armor Boots': 'Light Armor Boots',
    'Heavy Armor Boots': 'Heavy Armor Boots',
    // Accessories
    'Ring': 'Ring',
    'Amulet': 'Ring',
    'Earring': 'Ring',
    'Bracelet': 'Ring',
    'Charm': 'Ring',
    'Inro': 'Ring',
    'Tail': 'Ring',
};

function mapToCategory(extractedType: string): string {
    return CATEGORY_MAP[extractedType] || extractedType;
}

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

function detectTypeName(items: AlterationEquipment[]): string {
    // Count occurrences of each in-game category for items in this group
    const categoryCounts = new Map<string, number>();
    for (const item of items) {
        const extractedType = extractEquipmentType(item.name);
        const category = mapToCategory(extractedType);
        categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
    }

    // Return the most common category
    let maxCount = 0;
    let mostCommonCategory = mapToCategory(extractEquipmentType(items[0].name));
    for (const [category, count] of categoryCounts) {
        if (count > maxCount) {
            maxCount = count;
            mostCommonCategory = category;
        }
    }
    return mostCommonCategory;
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
