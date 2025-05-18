export type Grade = 0 | 1 | 2 | 3 | 4;

/** The star quality of an item, i.e. 3* **/
export type Quality = 1 | 2 | 3 | 4 | 5;

export type BlessingLines = [BlessingLine, BlessingLine, BlessingLine, BlessingLine];
export type BlessingLine = {
    current: Blessing | null;
    base: Blessing | null;
};

export interface Blessing {
    attribute: BlessingAttribute;
    value: number;
}

export interface BlessingUpgrade {
    attribute: BlessingAttribute;
    range: Range;
}

export const blessingAttributes: BlessingAttribute[] = [
    'ATK',
    'ATK%',
    'MAG',
    'MAG%',
    'DEF',
    'DEF%',
    'MDEF',
    'MDEF%',
    'ASPD',
    'ASPD%',
    'DIV',
    'DIV%',
    'EVA',
    'EVA%',
    'ACC',
    'ACC%',
    'SUR',
    'RES',
    'RES%',
];

export type BlessingAttribute =
    | 'ATK'
    | 'ATK%'
    | 'MAG'
    | 'MAG%'
    | 'DEF'
    | 'DEF%'
    | 'MDEF'
    | 'MDEF%'
    | 'ASPD'
    | 'ASPD%'
    | 'DIV'
    | 'DIV%'
    | 'EVA'
    | 'EVA%'
    | 'ACC'
    | 'ACC%'
    | 'SUR'
    | 'RES'
    | 'RES%';

type EnhancementRangeSet = [Range, Range, Range, Range, Range];

export interface Range {
    min: number;
    max: number;
}

// ATK, MAG, DIV, DEF, MDEF, ACC, EVA;
const STANDARD_FLAT: EnhancementRangeSet = [
    { min: 1, max: 3 },
    { min: 2, max: 6 },
    { min: 3, max: 9 },
    { min: 4, max: 12 },
    { min: 5, max: 15 },
];

// ATK%, MAG%, DIV%, DEF%, MDEF%, ACC%, EVA%
const STANDARD_PCT: EnhancementRangeSet = [
    { min: 1, max: 3 },
    { min: 2, max: 6 },
    { min: 3, max: 9 },
    { min: 4, max: 12 },
    { min: 5, max: 15 },
];

// ASPD, SUR
const SPECIAL_FLAT: EnhancementRangeSet = [
    { min: 1, max: 3 },
    { min: 1, max: 5 },
    { min: 1, max: 7 },
    { min: 1, max: 9 },
    { min: 2, max: 11 },
];

// ASPD%
const SPECIAL_PCT: EnhancementRangeSet = [
    { min: 1, max: 3 },
    { min: 1, max: 5 },
    { min: 1, max: 7 },
    { min: 2, max: 9 },
    { min: 2, max: 11 },
];

export const attributeEnhancementValueTable = new Map<BlessingAttribute, EnhancementRangeSet>([
    ['ATK', STANDARD_FLAT],
    ['ATK%', STANDARD_PCT],
    ['MAG', STANDARD_FLAT],
    ['MAG%', STANDARD_PCT],
    ['DEF', STANDARD_FLAT],
    ['DEF%', STANDARD_PCT],
    ['MDEF', STANDARD_FLAT],
    ['MDEF%', STANDARD_PCT],
    ['ASPD', SPECIAL_FLAT],
    ['ASPD%', SPECIAL_PCT],
    ['DIV', STANDARD_FLAT],
    ['DIV%', STANDARD_PCT],
    ['EVA', STANDARD_FLAT],
    ['EVA%', STANDARD_PCT],
    ['ACC', STANDARD_FLAT],
    ['ACC%', STANDARD_PCT],
    ['SUR', SPECIAL_FLAT],
    ['RES', SPECIAL_FLAT],
    ['RES%', STANDARD_PCT],
]);

export const itemTypes = ['Shield', 'Helmet', 'Armor', 'Gloves', 'Boots', 'Ring', 'Weapon'];

export type ItemType = (typeof itemTypes)[number];

export const itemTypeAttributes: Map<ItemType, BlessingAttribute[]> = new Map<ItemType, BlessingAttribute[]>([
    ['Shield', ['EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%', 'EVA', 'RES', 'DEF', 'MDEF', 'SUR', 'ASPD']],
    [
        'Helmet',
        ['ATK%', 'MAG%', 'DIV%', 'ACC%', 'RES%', 'DEF%', 'MDEF%', 'ATK', 'MAG', 'DIV', 'ACC', 'RES', 'DEF', 'MDEF'],
    ],
    ['Armor', ['EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%', 'EVA', 'RES', 'DEF', 'MDEF', 'SUR', 'ASPD']],
    [
        'Gloves',
        [
            // For "Gloves": "O" for:
            // Percentage rows: "ATK%", "MAG%", "DIV%", "ACC%", "DEF%", "MDEF%"
            // Non-percentage rows: "ATK", "MAG", "DIV", "ACC", "DEF", "MDEF"
            'ATK%',
            'MAG%',
            'DIV%',
            'ACC%',
            'DEF%',
            'MDEF%',
            'ATK',
            'MAG',
            'DIV',
            'ACC',
            'DEF',
            'MDEF',
        ],
    ],
    [
        'Boots',
        [
            // For "Shoes": "O" for:
            // Percentage rows: "ACC%", "EVA%", "RES%", "DEF%", "MDEF%", "ASPD%"
            // Non-percentage rows: "ACC", "EVA", "RES", "DEF", "MDEF", "ASPD"
            'ACC%',
            'EVA%',
            'RES%',
            'DEF%',
            'MDEF%',
            'ASPD%',
            'ACC',
            'EVA',
            'RES',
            'DEF',
            'MDEF',
            'ASPD',
        ],
    ],
    [
        'Ring',
        [
            // For "Accessory": "O" for every row in order:
            // Percentage rows: "ATK%", "MAG%", "DIV%", "ACC%", "EVA%", "RES%", "DEF%", "MDEF%", "ASPD%"
            // Non-percentage rows: "ATK", "MAG", "DIV", "ACC", "EVA", "RES", "DEF", "MDEF", "SUR", "ASPD"
            'ATK%',
            'MAG%',
            'DIV%',
            'ACC%',
            'EVA%',
            'RES%',
            'DEF%',
            'MDEF%',
            'ASPD%',
            'ATK',
            'MAG',
            'DIV',
            'ACC',
            'EVA',
            'RES',
            'DEF',
            'MDEF',
            'SUR',
            'ASPD',
        ],
    ],
    ['Weapon', ['ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'SUR']],
]);
