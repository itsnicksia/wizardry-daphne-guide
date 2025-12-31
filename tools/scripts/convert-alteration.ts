import * as fs from 'fs';
import * as cheerio from 'cheerio';
import type { AlterationData, AlterationEquipment, AlterationTier, AlterationStatRates, AlterationStatType, TierNumber } from '../src/types/alteration';
import type { Dictionary } from '../src/types/dictionary';

const html = fs.readFileSync('data/alternations.html', 'utf8');
const dictionary: Dictionary = JSON.parse(fs.readFileSync('data/dictionary.json', 'utf8'));

const WEAPON_TYPE_MAP: Record<string, string> = {
    '1H_Sword': 'One-Handed Sword',
    '2H_Sword': 'Two-Handed Sword',
    '1H_Axe': 'One-Handed Axe',
    '2H_Axe': 'Two-Handed Axe',
    '1H_Mace': 'One-Handed Mace',
    '2H_Mace': 'Two-Handed Mace',
    '1H_Staff': 'One-Handed Staff',
    '2H_Staff': 'Two-Handed Staff',
    '2H_Spear': 'Two-Handed Spear',
    'Dagger': 'Dagger',
    'Bow': 'Bow',
    'Sam_Katana': 'Katana',
    'Ninja_Blade': 'Ninja Blade',
    'Ninja_Throw': 'Throwing Weapon',
    'Tool': 'Tool',
};

const ARMOR_TYPE_MAP: Record<string, Record<string, string>> = {
    'Body': {
        'Heavy': 'Heavy Body Armor',
        'Light': 'Light Body Armor',
        'Cloth': 'Cloth Body Armor',
    },
    'Head': {
        'Heavy': 'Heavy Helmet',
        'Light': 'Light Helmet',
        'Cloth': 'Cloth Hat',
    },
    'Feet': {
        'Heavy': 'Heavy Boots',
        'Light': 'Light Boots',
        'Cloth': 'Cloth Shoes',
    },
    'Hands': {
        'Heavy': 'Heavy Gloves',
        'Light': 'Light Gloves',
        'Cloth': 'Cloth Gloves',
    },
    'Shield': {
        '': 'Shield',
        'Light': 'Shield',
        'Heavy': 'Shield',
    },
    'Accessories': {
        '': 'Accessory',
        'Accessory': 'Accessory',
    },
};

function buildEquipmentTypeMap(): Map<string, string> {
    const typeMap = new Map<string, string>();

    const weaponCsv = fs.readFileSync('../data/weapon.csv', 'utf8');
    for (const line of weaponCsv.split('\n').slice(1)) {
        if (!line.trim()) continue;
        const cols = line.split(',');
        const weaponType = cols[2];
        const itemName = cols[4];
        if (itemName && weaponType && WEAPON_TYPE_MAP[weaponType]) {
            typeMap.set(itemName, WEAPON_TYPE_MAP[weaponType]);
        }
    }

    const armorCsv = fs.readFileSync('../data/armor.csv', 'utf8');
    for (const line of armorCsv.split('\n').slice(1)) {
        if (!line.trim()) continue;
        const cols = line.split(',');
        const slotType = cols[2];
        const itemName = cols[4];
        const armorType = cols[6];
        if (itemName && slotType && ARMOR_TYPE_MAP[slotType]) {
            const slotMap = ARMOR_TYPE_MAP[slotType];
            const equipType = slotMap[armorType] || slotMap[''] || `${armorType} ${slotType}`;
            typeMap.set(itemName, equipType);
        }
    }

    return typeMap;
}

const equipmentTypeMap = buildEquipmentTypeMap();

const NAME_SUFFIX_TO_TYPE: Record<string, string> = {
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
    'Greatsword': 'Two-Handed Sword',
    'Saber': 'One-Handed Sword',
    'Mace': 'One-Handed Mace',
    'Staff': 'One-Handed Staff',
    'Spear': 'Two-Handed Spear',
    'Sword': 'One-Handed Sword',
    'Axe': 'One-Handed Axe',
    'Blade': 'Katana',
    'Heavy Armor': 'Heavy Body Armor',
    'Light Armor': 'Light Body Armor',
    'Leather Armor': 'Light Body Armor',
    'Heavy Mail': 'Heavy Body Armor',
    'Light Mail': 'Light Body Armor',
    'Heavy Armor Boots': 'Heavy Boots',
    'Light Armor Boots': 'Light Boots',
    'Heavy Boots': 'Heavy Boots',
    'Light Boots': 'Light Boots',
    'Ninja Tabi': 'Cloth Shoes',
    'Boots': 'Light Boots',
    'Heavy Helmet': 'Heavy Helmet',
    'Light Helmet': 'Light Helmet',
    'Heavy Helm': 'Heavy Helmet',
    'Helm': 'Light Helmet',
    'Heavy Gloves': 'Heavy Gloves',
    'Light Gloves': 'Light Gloves',
    'Arm Wraps': 'Light Gloves',
    'Gauntlet': 'Heavy Gloves',
    'Shield': 'Shield',
    'Plate': 'Heavy Body Armor',
    'Mail': 'Heavy Body Armor',
    'Chainmail': 'Heavy Body Armor',
    'Robe': 'Cloth Body Armor',
    'Cloak': 'Cloth Body Armor',
    'Tunic': 'Cloth Body Armor',
    'Garb': 'Cloth Body Armor',
    'Hat': 'Cloth Hat',
    'Hood': 'Cloth Hat',
    'Circlet': 'Cloth Hat',
    'Cowl': 'Cloth Hat',
    'Headcloth': 'Cloth Hat',
    'Shoes': 'Cloth Shoes',
    'Sandals': 'Cloth Shoes',
    'Gloves': 'Light Gloves',
    'Gauntlets': 'Heavy Gloves',
    'Bracers': 'Light Gloves',
    'Earring': 'Accessory',
    'Ring': 'Accessory',
    'Necklace': 'Accessory',
    'Amulet': 'Accessory',
    'Charm': 'Accessory',
    'Talisman': 'Accessory',
    'Belt': 'Accessory',
    'Inro': 'Accessory',
    'Shuriken': 'Throwing Weapon',
    'Kunai': 'Throwing Weapon',
};

const SPECIFIC_ITEM_TYPES: Record<string, string> = {
    'Demon Blade Oniyuki': 'Katana',
    'Kagura Moon': 'Katana',
};

function inferEquipmentType(name: string): string {
    if (SPECIFIC_ITEM_TYPES[name]) {
        return SPECIFIC_ITEM_TYPES[name];
    }
    const sortedSuffixes = Object.keys(NAME_SUFFIX_TO_TYPE).sort((a, b) => b.length - a.length);
    for (const suffix of sortedSuffixes) {
        if (name.endsWith(suffix)) {
            return NAME_SUFFIX_TO_TYPE[suffix];
        }
    }
    return 'Unknown';
}

const $ = cheerio.load(html);

const STAT_COLUMNS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%',
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'SUR', 'ASPD'
];

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
        const translated = `${material} ${itemType}`;
        dictionary.equipment[jpName] = translated;
        return translated;
    }

    dictionary.equipment[jpName] = '';
    return jpName;
}

function parseRate(text: string | undefined): number | null {
    if (!text || text === '-') return null;
    const match = text.match(/([\d.]+)%/);
    return match ? parseFloat(match[1]) : null;
}

const result: AlterationData = { equipment: [] };
const newDictionaryEntries: string[] = [];

const tables = $('table');
const equipmentTable = tables.eq(1);

let currentEquipment: AlterationEquipment | null = null;

equipmentTable.find('tbody tr').each((_, row) => {
    const cells = $(row).find('td');
    const cellTexts = cells.map((__, c) => $(c).text().trim()).get();

    if (cellTexts.length === 0) return;

    const firstCell = cells.first();
    const rowspan = parseInt(firstCell.attr('rowspan') || '0');

    let tierIdx: number;
    let statsStartIdx: number;

    if (rowspan === 4) {
        const jpName = cellTexts[0];
        const enName = translateEquipment(jpName);

        if (enName === jpName && !dictionary.equipment[jpName]) {
            newDictionaryEntries.push(jpName);
        }

        const equipmentType = equipmentTypeMap.get(enName) || inferEquipmentType(enName);
        currentEquipment = {
            name: enName,
            nameJp: jpName,
            equipmentType,
            tiers: []
        };
        result.equipment.push(currentEquipment);

        tierIdx = 1;
        statsStartIdx = 2;
    } else {
        tierIdx = 0;
        statsStartIdx = 1;
    }

    if (!currentEquipment) return;

    const tierNum = parseInt(cellTexts[tierIdx]) as TierNumber;

    const stats: AlterationStatRates = {} as AlterationStatRates;
    for (let i = 0; i < STAT_COLUMNS.length; i++) {
        stats[STAT_COLUMNS[i]] = parseRate(cellTexts[statsStartIdx + i]);
    }

    const tier: AlterationTier = {
        tier: tierNum,
        stats
    };

    currentEquipment.tiers.push(tier);
});

fs.writeFileSync('data/alteration-en.json', JSON.stringify(result, null, 2));
console.log(`Converted ${result.equipment.length} equipment items to data/alteration-en.json`);

if (newDictionaryEntries.length > 0) {
    fs.writeFileSync('data/dictionary.json', JSON.stringify(dictionary, null, 2));
    console.log(`Added ${newDictionaryEntries.length} new entries to data/dictionary.json:`);
    newDictionaryEntries.forEach((e) => console.log(`  - ${e}`));
}
