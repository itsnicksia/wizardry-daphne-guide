export const EQUIPMENT_TYPES = [
    'One-Handed Sword',
    'Two-Handed Sword',
    'One-Handed Axe',
    'Two-Handed Axe',
    'One-Handed Mace',
    'Two-Handed Mace',
    'One-Handed Staff',
    'Two-Handed Staff',
    'Two-Handed Spear',
    'Dagger',
    'Bow',
    'Katana',
    'Ninja Blade',
    'Throwing Weapon',
    'Tool',
    'Heavy Body Armor',
    'Light Body Armor',
    'Cloth Body Armor',
    'Heavy Helmet',
    'Light Helmet',
    'Cloth Hat',
    'Heavy Boots',
    'Light Boots',
    'Cloth Shoes',
    'Heavy Gloves',
    'Light Gloves',
    'Cloth Gloves',
    'Shield',
    'Accessory',
] as const;

export type EquipmentType = typeof EQUIPMENT_TYPES[number];

export const EQUIPMENT_TYPE_SUFFIXES: Record<string, EquipmentType> = {
    // Exact type matches
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

    // Weapon suffix mappings
    'Greatsword': 'Two-Handed Sword',
    'Saber': 'One-Handed Sword',
    'Sword': 'One-Handed Sword',
    'Axe': 'One-Handed Axe',
    'Mace': 'One-Handed Mace',
    'Staff': 'One-Handed Staff',
    'Spear': 'Two-Handed Spear',
    'Blade': 'Katana',
    'Shuriken': 'Throwing Weapon',
    'Kunai': 'Throwing Weapon',

    // Body armor suffix mappings
    'Heavy Armor': 'Heavy Body Armor',
    'Light Armor': 'Light Body Armor',
    'Leather Armor': 'Light Body Armor',
    'Heavy Mail': 'Heavy Body Armor',
    'Light Mail': 'Light Body Armor',
    'Plate': 'Heavy Body Armor',
    'Mail': 'Light Body Armor',
    'Chainmail': 'Light Body Armor',
    'Robe': 'Cloth Body Armor',
    'Cloak': 'Cloth Body Armor',
    'Tunic': 'Cloth Body Armor',
    'Garb': 'Cloth Body Armor',

    // Head armor suffix mappings
    'Heavy Helm': 'Heavy Helmet',
    'Helm': 'Light Helmet',
    'Hat': 'Cloth Hat',
    'Hood': 'Cloth Hat',
    'Circlet': 'Cloth Hat',
    'Cowl': 'Cloth Hat',
    'Headcloth': 'Cloth Hat',

    // Feet armor suffix mappings
    'Heavy Armor Boots': 'Heavy Boots',
    'Light Armor Boots': 'Light Boots',
    'Boots': 'Light Boots',
    'Ninja Tabi': 'Cloth Shoes',
    'Shoes': 'Cloth Shoes',
    'Sandals': 'Cloth Shoes',

    // Hand armor suffix mappings
    'Arm Wraps': 'Light Gloves',
    'Gauntlet': 'Heavy Gloves',
    'Gauntlets': 'Heavy Gloves',
    'Gloves': 'Light Gloves',
    'Bracers': 'Light Gloves',

    // Accessory suffix mappings
    'Earring': 'Accessory',
    'Ring': 'Accessory',
    'Necklace': 'Accessory',
    'Amulet': 'Accessory',
    'Charm': 'Accessory',
    'Talisman': 'Accessory',
    'Belt': 'Accessory',
    'Inro': 'Accessory',
};

export function inferEquipmentTypeFromName(name: string): EquipmentType | 'Unknown' {
    const sortedSuffixes = Object.keys(EQUIPMENT_TYPE_SUFFIXES).sort((a, b) => b.length - a.length);
    for (const suffix of sortedSuffixes) {
        if (name.endsWith(suffix)) {
            return EQUIPMENT_TYPE_SUFFIXES[suffix];
        }
    }
    return 'Unknown';
}
