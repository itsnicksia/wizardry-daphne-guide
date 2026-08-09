export const EQUIPMENT_TYPES = [
    // Weapons
    'One-Handed Sword',
    'Two-Handed Sword',
    'One-Handed Axe',
    'Two-Handed Axe',
    'One-Handed Blunt Weapon',
    'Two-Handed Blunt Weapon',
    'One-Handed Staff',
    'Two-Handed Staff',
    'Two-Handed Spear',
    'Dagger',
    'Bow',
    'Katana',
    'Ninjato',
    'Throwing Ninja Tool',
    'Tool',
    // Shields
    'Small Shield',
    'Light Shield',
    'Heavy Shield',
    // Body armor
    'Heavy Armor',
    'Light Armor',
    'Clothes',
    // Helmets
    'Heavy Helmet',
    'Light Helmet',
    'Hat',
    // Boots
    'Heavy Armor Boots',
    'Light Armor Boots',
    'Shoes',
    // Gloves
    'Heavy Gauntlets',
    'Light Gauntlets',
    'Gloves',
    // Accessories
    'Ring',
] as const;

export type EquipmentType = typeof EQUIPMENT_TYPES[number];

export const EQUIPMENT_TYPE_SUFFIXES: Record<string, EquipmentType> = {
    // Exact type matches
    'One-Handed Sword': 'One-Handed Sword',
    'Two-Handed Sword': 'Two-Handed Sword',
    'One-Handed Axe': 'One-Handed Axe',
    'Two-Handed Axe': 'Two-Handed Axe',
    'One-Handed Blunt Weapon': 'One-Handed Blunt Weapon',
    'Two-Handed Blunt Weapon': 'Two-Handed Blunt Weapon',
    'One-Handed Staff': 'One-Handed Staff',
    'Two-Handed Staff': 'Two-Handed Staff',
    'Two-Handed Spear': 'Two-Handed Spear',
    'Dagger': 'Dagger',
    'Bow': 'Bow',
    'Katana': 'Katana',
    'Ninjato': 'Ninjato',
    'Throwing Ninja Tool': 'Throwing Ninja Tool',
    'Tool': 'Tool',
    'Small Shield': 'Small Shield',
    'Light Shield': 'Light Shield',
    'Heavy Shield': 'Heavy Shield',
    'Heavy Armor': 'Heavy Armor',
    'Light Armor': 'Light Armor',
    'Clothes': 'Clothes',
    'Heavy Helmet': 'Heavy Helmet',
    'Light Helmet': 'Light Helmet',
    'Hat': 'Hat',
    'Heavy Armor Boots': 'Heavy Armor Boots',
    'Light Armor Boots': 'Light Armor Boots',
    'Shoes': 'Shoes',
    'Heavy Gauntlets': 'Heavy Gauntlets',
    'Light Gauntlets': 'Light Gauntlets',
    'Gloves': 'Gloves',
    'Ring': 'Ring',

    // Weapon suffix mappings
    'Knife': 'Dagger',
    'Sword': 'One-Handed Sword',
    'Saber': 'One-Handed Sword',
    'Greatsword': 'Two-Handed Sword',
    'Axe': 'One-Handed Axe',
    'Light Axe': 'One-Handed Axe',
    'Hatchet': 'One-Handed Axe',
    'Mace': 'One-Handed Blunt Weapon',
    'Warmace': 'One-Handed Blunt Weapon',
    'Spiked Mace': 'One-Handed Blunt Weapon',
    'Heavy Mace': 'One-Handed Blunt Weapon',
    'Two-Handed Mace': 'Two-Handed Blunt Weapon',
    'Staff': 'One-Handed Staff',
    'Rod': 'One-Handed Staff',
    'Wand': 'One-Handed Staff',
    'Spear': 'Two-Handed Spear',
    'Heavy Spear': 'Two-Handed Spear',
    'Blade': 'Ninjato',
    'Kunai': 'Throwing Ninja Tool',
    'Shuriken': 'Throwing Ninja Tool',
    'Longbow': 'Bow',
    'Arrow': 'Bow',

    // Shield suffix mappings
    'Shield': 'Light Shield',
    'Guard': 'Light Shield',
    'Large Shield': 'Heavy Shield',

    // Body armor suffix mappings
    'Plate': 'Heavy Armor',
    'Heavy Mail': 'Heavy Armor',
    'Mail': 'Light Armor',
    'Chainmail': 'Light Armor',
    'Leather Armor': 'Light Armor',
    'Robe': 'Clothes',
    'Cloak': 'Clothes',
    'Tunic': 'Clothes',
    'Garb': 'Clothes',
    'Gown': 'Clothes',

    // Head armor suffix mappings
    'Heavy Helm': 'Heavy Helmet',
    'Helm': 'Light Helmet',
    'Light Helm': 'Light Helmet',
    'Hood': 'Hat',
    'Circlet': 'Hat',
    'Cowl': 'Hat',
    'Headcloth': 'Hat',

    // Feet armor suffix mappings
    'Boots': 'Shoes',
    'Ninja Tabi': 'Shoes',
    'Tabi': 'Shoes',
    'Sandals': 'Shoes',

    // Hand armor suffix mappings
    'Gauntlet': 'Light Gauntlets',
    'Gauntlets': 'Light Gauntlets',
    'Arm Wraps': 'Gloves',
    'Wraps': 'Gloves',
    'Bracers': 'Gloves',

    // Accessory suffix mappings
    'Earring': 'Ring',
    'Necklace': 'Ring',
    'Amulet': 'Ring',
    'Charm': 'Ring',
    'Talisman': 'Ring',
    'Belt': 'Ring',
    'Inro': 'Ring',
    'Bracelet': 'Ring',
    'Tail': 'Ring',
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
