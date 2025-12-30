import { useState } from 'react';

/**
 * Full Alteration Stone blessing value distribution component.
 *
 * Data source: https://wizardry.info/daphne/gacha_rates/ja/alternations.html
 *
 * Shows blessing value probability distributions when using Full Alteration Stones
 * on Grade 2+ equipment. Two stone types are available:
 * - Lesser (下級全変造石): Standard value ranges
 * - Full (全変造石): Boosted value ranges (values start higher)
 *
 * Equipment is categorized by rank:
 * - Rank 1-5: Worn through Ebonsteel equipment
 * - Rank 6 Two-Handed: Silver-tier two-handed weapons (swords, spears, axes, maces)
 * - Rank 6 Other: All other Silver-tier equipment
 *
 * Note: Alteration stone tables have 18 stats (not 19). ASPD flat is NOT available
 * via alteration stones - only the 9 percentage stats + 8 fixed stats + SUR.
 */

type StoneType = 'lesser' | 'full';
type EquipmentRankCategory = 'rank1to5' | 'rank6TwoHanded' | 'rank6Other';

interface RankCategoryOption {
    id: EquipmentRankCategory;
    label: string;
    description: string;
}

const RANK_CATEGORIES: RankCategoryOption[] = [
    { id: 'rank1to5', label: 'Worn - Ebonsteel', description: 'Equipment Ranks 1-5' },
    { id: 'rank6TwoHanded', label: 'Silver (Two-Handed Weapons)', description: 'Two-Handed Swords, Spears, Axes, Maces' },
    { id: 'rank6Other', label: 'Silver', description: 'All other Silver equipment' },
];

interface StatDefinition {
    id: string;
    label: string;
}

// 18 stats available via alteration stones (no ASPD flat)
const STATS: StatDefinition[] = [
    { id: 'ATK%', label: 'ATK%' },
    { id: 'MAG%', label: 'MAG%' },
    { id: 'DIV%', label: 'DIV%' },
    { id: 'ACC%', label: 'ACC%' },
    { id: 'EVA%', label: 'EVA%' },
    { id: 'RES%', label: 'RES%' },
    { id: 'DEF%', label: 'DEF%' },
    { id: 'MDEF%', label: 'MDEF%' },
    { id: 'ASPD%', label: 'ASPD%' },
    { id: 'ATK', label: 'ATK' },
    { id: 'MAG', label: 'MAG' },
    { id: 'DIV', label: 'DIV' },
    { id: 'ACC', label: 'ACC' },
    { id: 'EVA', label: 'EVA' },
    { id: 'RES', label: 'RES' },
    { id: 'DEF', label: 'DEF' },
    { id: 'MDEF', label: 'MDEF' },
    { id: 'SUR', label: 'SUR' },
];

type Quality = 1 | 2 | 3 | 4 | 5;

interface ValueRange {
    start: number;
    count: number;
    probability: number;
}

type MagnitudeData = Record<Quality, Record<string, ValueRange>>;

// Lesser Full Alteration Stone data (下級全変造石)
// Source: https://wizardry.info/daphne/gacha_rates/ja/alternations.html
const LESSER_RANK_1_TO_5: MagnitudeData = {
    1: {
        'ATK%': { start: 2, count: 3, probability: 33.3333 },
        'MAG%': { start: 2, count: 3, probability: 33.3333 },
        'DIV%': { start: 2, count: 3, probability: 33.3333 },
        'ACC%': { start: 2, count: 3, probability: 33.3333 },
        'EVA%': { start: 2, count: 3, probability: 33.3333 },
        'RES%': { start: 2, count: 3, probability: 33.3333 },
        'DEF%': { start: 2, count: 3, probability: 33.3333 },
        'MDEF%': { start: 2, count: 3, probability: 33.3333 },
        'ASPD%': { start: 2, count: 2, probability: 50.0 },
        'ATK': { start: 3, count: 3, probability: 25.0 },
        'MAG': { start: 3, count: 3, probability: 25.0 },
        'DIV': { start: 3, count: 3, probability: 25.0 },
        'ACC': { start: 3, count: 3, probability: 25.0 },
        'EVA': { start: 3, count: 3, probability: 25.0 },
        'RES': { start: 3, count: 3, probability: 25.0 },
        'DEF': { start: 3, count: 3, probability: 25.0 },
        'MDEF': { start: 3, count: 3, probability: 25.0 },
        'SUR': { start: 2, count: 2, probability: 50.0 },
    },
    2: {
        'ATK%': { start: 4, count: 5, probability: 12.5 },
        'MAG%': { start: 4, count: 5, probability: 12.5 },
        'DIV%': { start: 4, count: 5, probability: 12.5 },
        'ACC%': { start: 4, count: 5, probability: 12.5 },
        'EVA%': { start: 4, count: 5, probability: 12.5 },
        'RES%': { start: 4, count: 5, probability: 12.5 },
        'DEF%': { start: 4, count: 5, probability: 12.5 },
        'MDEF%': { start: 4, count: 5, probability: 12.5 },
        'ASPD%': { start: 3, count: 4, probability: 16.6667 },
        'ATK': { start: 5, count: 6, probability: 8.3333 },
        'MAG': { start: 5, count: 6, probability: 8.3333 },
        'DIV': { start: 5, count: 6, probability: 8.3333 },
        'ACC': { start: 5, count: 6, probability: 8.3333 },
        'EVA': { start: 5, count: 6, probability: 8.3333 },
        'RES': { start: 5, count: 6, probability: 8.3333 },
        'DEF': { start: 5, count: 6, probability: 8.3333 },
        'MDEF': { start: 5, count: 6, probability: 8.3333 },
        'SUR': { start: 3, count: 3, probability: 25.0 },
    },
    3: {
        'ATK%': { start: 7, count: 6, probability: 10.0 },
        'MAG%': { start: 7, count: 6, probability: 10.0 },
        'DIV%': { start: 7, count: 6, probability: 10.0 },
        'ACC%': { start: 7, count: 6, probability: 10.0 },
        'EVA%': { start: 7, count: 6, probability: 10.0 },
        'RES%': { start: 7, count: 6, probability: 10.0 },
        'DEF%': { start: 7, count: 6, probability: 10.0 },
        'MDEF%': { start: 7, count: 6, probability: 10.0 },
        'ASPD%': { start: 6, count: 4, probability: 16.6667 },
        'ATK': { start: 7, count: 9, probability: 4.7619 },
        'MAG': { start: 7, count: 9, probability: 4.7619 },
        'DIV': { start: 7, count: 9, probability: 4.7619 },
        'ACC': { start: 7, count: 9, probability: 4.7619 },
        'EVA': { start: 7, count: 9, probability: 4.7619 },
        'RES': { start: 7, count: 9, probability: 4.7619 },
        'DEF': { start: 7, count: 9, probability: 4.7619 },
        'MDEF': { start: 7, count: 9, probability: 4.7619 },
        'SUR': { start: 4, count: 3, probability: 25.0 },
    },
    4: {
        'ATK%': { start: 12, count: 5, probability: 20.0 },
        'MAG%': { start: 12, count: 5, probability: 20.0 },
        'DIV%': { start: 12, count: 5, probability: 20.0 },
        'ACC%': { start: 12, count: 5, probability: 20.0 },
        'EVA%': { start: 12, count: 5, probability: 20.0 },
        'RES%': { start: 12, count: 5, probability: 20.0 },
        'DEF%': { start: 12, count: 5, probability: 20.0 },
        'MDEF%': { start: 12, count: 5, probability: 20.0 },
        'ASPD%': { start: 9, count: 4, probability: 25.0 },
        'ATK': { start: 11, count: 10, probability: 4.1667 },
        'MAG': { start: 11, count: 10, probability: 4.1667 },
        'DIV': { start: 11, count: 10, probability: 4.1667 },
        'ACC': { start: 11, count: 10, probability: 4.1667 },
        'EVA': { start: 11, count: 10, probability: 4.1667 },
        'RES': { start: 11, count: 10, probability: 4.1667 },
        'DEF': { start: 11, count: 10, probability: 4.1667 },
        'MDEF': { start: 11, count: 10, probability: 4.1667 },
        'SUR': { start: 5, count: 4, probability: 16.6667 },
    },
    5: {
        'ATK%': { start: 15, count: 6, probability: 10.0 },
        'MAG%': { start: 15, count: 6, probability: 10.0 },
        'DIV%': { start: 15, count: 6, probability: 10.0 },
        'ACC%': { start: 15, count: 6, probability: 10.0 },
        'EVA%': { start: 15, count: 6, probability: 10.0 },
        'RES%': { start: 15, count: 6, probability: 10.0 },
        'DEF%': { start: 15, count: 6, probability: 10.0 },
        'MDEF%': { start: 15, count: 6, probability: 10.0 },
        'ASPD%': { start: 12, count: 4, probability: 16.6667 },
        'ATK': { start: 14, count: 12, probability: 3.3333 },
        'MAG': { start: 14, count: 12, probability: 3.3333 },
        'DIV': { start: 14, count: 12, probability: 3.3333 },
        'ACC': { start: 14, count: 12, probability: 3.3333 },
        'EVA': { start: 14, count: 12, probability: 3.3333 },
        'RES': { start: 14, count: 12, probability: 3.3333 },
        'DEF': { start: 14, count: 12, probability: 3.3333 },
        'MDEF': { start: 14, count: 12, probability: 3.3333 },
        'SUR': { start: 6, count: 5, probability: 12.5 },
    },
};

const LESSER_RANK_6_TWO_HANDED: MagnitudeData = {
    1: {
        'ATK%': { start: 2, count: 4, probability: 25.0 },
        'MAG%': { start: 2, count: 4, probability: 25.0 },
        'DIV%': { start: 2, count: 4, probability: 25.0 },
        'ACC%': { start: 2, count: 4, probability: 25.0 },
        'EVA%': { start: 2, count: 4, probability: 25.0 },
        'RES%': { start: 2, count: 4, probability: 25.0 },
        'DEF%': { start: 2, count: 4, probability: 25.0 },
        'MDEF%': { start: 2, count: 4, probability: 25.0 },
        'ASPD%': { start: 2, count: 2, probability: 50.0 },
        'ATK': { start: 3, count: 4, probability: 16.6667 },
        'MAG': { start: 3, count: 4, probability: 16.6667 },
        'DIV': { start: 3, count: 4, probability: 16.6667 },
        'ACC': { start: 3, count: 4, probability: 16.6667 },
        'EVA': { start: 3, count: 4, probability: 16.6667 },
        'RES': { start: 3, count: 4, probability: 16.6667 },
        'DEF': { start: 3, count: 4, probability: 16.6667 },
        'MDEF': { start: 3, count: 4, probability: 16.6667 },
        'SUR': { start: 2, count: 2, probability: 50.0 },
    },
    2: {
        'ATK%': { start: 4, count: 7, probability: 8.3333 },
        'MAG%': { start: 4, count: 7, probability: 8.3333 },
        'DIV%': { start: 4, count: 7, probability: 8.3333 },
        'ACC%': { start: 4, count: 7, probability: 8.3333 },
        'EVA%': { start: 4, count: 7, probability: 8.3333 },
        'RES%': { start: 4, count: 7, probability: 8.3333 },
        'DEF%': { start: 4, count: 7, probability: 8.3333 },
        'MDEF%': { start: 4, count: 7, probability: 8.3333 },
        'ASPD%': { start: 3, count: 5, probability: 12.5 },
        'ATK': { start: 5, count: 10, probability: 3.3333 },
        'MAG': { start: 5, count: 10, probability: 3.3333 },
        'DIV': { start: 5, count: 10, probability: 3.3333 },
        'ACC': { start: 5, count: 10, probability: 3.3333 },
        'EVA': { start: 5, count: 10, probability: 3.3333 },
        'RES': { start: 5, count: 10, probability: 3.3333 },
        'DEF': { start: 5, count: 10, probability: 3.3333 },
        'MDEF': { start: 5, count: 10, probability: 3.3333 },
        'SUR': { start: 3, count: 4, probability: 16.6667 },
    },
    3: {
        'ATK%': { start: 7, count: 10, probability: 4.1667 },
        'MAG%': { start: 7, count: 10, probability: 4.1667 },
        'DIV%': { start: 7, count: 10, probability: 4.1667 },
        'ACC%': { start: 7, count: 10, probability: 4.1667 },
        'EVA%': { start: 7, count: 10, probability: 4.1667 },
        'RES%': { start: 7, count: 10, probability: 4.1667 },
        'DEF%': { start: 7, count: 10, probability: 4.1667 },
        'MDEF%': { start: 7, count: 10, probability: 4.1667 },
        'ASPD%': { start: 6, count: 7, probability: 6.6667 },
        'ATK': { start: 7, count: 14, probability: 2.0 },
        'MAG': { start: 7, count: 14, probability: 2.0 },
        'DIV': { start: 7, count: 14, probability: 2.0 },
        'ACC': { start: 7, count: 14, probability: 2.0 },
        'EVA': { start: 7, count: 14, probability: 2.0 },
        'RES': { start: 7, count: 14, probability: 2.0 },
        'DEF': { start: 7, count: 14, probability: 2.0 },
        'MDEF': { start: 7, count: 14, probability: 2.0 },
        'SUR': { start: 4, count: 4, probability: 16.6667 },
    },
    4: {
        'ATK%': { start: 12, count: 10, probability: 5.5556 },
        'MAG%': { start: 12, count: 10, probability: 5.5556 },
        'DIV%': { start: 12, count: 10, probability: 5.5556 },
        'ACC%': { start: 12, count: 10, probability: 5.5556 },
        'EVA%': { start: 12, count: 10, probability: 5.5556 },
        'RES%': { start: 12, count: 10, probability: 5.5556 },
        'DEF%': { start: 12, count: 10, probability: 5.5556 },
        'MDEF%': { start: 12, count: 10, probability: 5.5556 },
        'ASPD%': { start: 9, count: 8, probability: 7.1429 },
        'ATK': { start: 11, count: 16, probability: 1.5152 },
        'MAG': { start: 11, count: 16, probability: 1.5152 },
        'DIV': { start: 11, count: 16, probability: 1.5152 },
        'ACC': { start: 11, count: 16, probability: 1.5152 },
        'EVA': { start: 11, count: 16, probability: 1.5152 },
        'RES': { start: 11, count: 16, probability: 1.5152 },
        'DEF': { start: 11, count: 16, probability: 1.5152 },
        'MDEF': { start: 11, count: 16, probability: 1.5152 },
        'SUR': { start: 5, count: 7, probability: 6.25 },
    },
    5: {
        'ATK%': { start: 15, count: 12, probability: 3.3333 },
        'MAG%': { start: 15, count: 12, probability: 3.3333 },
        'DIV%': { start: 15, count: 12, probability: 3.3333 },
        'ACC%': { start: 15, count: 12, probability: 3.3333 },
        'EVA%': { start: 15, count: 12, probability: 3.3333 },
        'RES%': { start: 15, count: 12, probability: 3.3333 },
        'DEF%': { start: 15, count: 12, probability: 3.3333 },
        'MDEF%': { start: 15, count: 12, probability: 3.3333 },
        'ASPD%': { start: 12, count: 8, probability: 5.5556 },
        'ATK': { start: 14, count: 19, probability: 1.0989 },
        'MAG': { start: 14, count: 19, probability: 1.0989 },
        'DIV': { start: 14, count: 19, probability: 1.0989 },
        'ACC': { start: 14, count: 19, probability: 1.0989 },
        'EVA': { start: 14, count: 19, probability: 1.0989 },
        'RES': { start: 14, count: 19, probability: 1.0989 },
        'DEF': { start: 14, count: 19, probability: 1.0989 },
        'MDEF': { start: 14, count: 19, probability: 1.0989 },
        'SUR': { start: 6, count: 8, probability: 5.0 },
    },
};

const LESSER_RANK_6_OTHER: MagnitudeData = {
    1: {
        'ATK%': { start: 2, count: 4, probability: 25.0 },
        'MAG%': { start: 2, count: 4, probability: 25.0 },
        'DIV%': { start: 2, count: 4, probability: 25.0 },
        'ACC%': { start: 2, count: 4, probability: 25.0 },
        'EVA%': { start: 2, count: 4, probability: 25.0 },
        'RES%': { start: 2, count: 4, probability: 25.0 },
        'DEF%': { start: 2, count: 4, probability: 25.0 },
        'MDEF%': { start: 2, count: 4, probability: 25.0 },
        'ASPD%': { start: 2, count: 2, probability: 50.0 },
        'ATK': { start: 3, count: 4, probability: 16.6667 },
        'MAG': { start: 3, count: 4, probability: 16.6667 },
        'DIV': { start: 3, count: 4, probability: 16.6667 },
        'ACC': { start: 3, count: 4, probability: 16.6667 },
        'EVA': { start: 3, count: 4, probability: 16.6667 },
        'RES': { start: 3, count: 4, probability: 16.6667 },
        'DEF': { start: 3, count: 4, probability: 16.6667 },
        'MDEF': { start: 3, count: 4, probability: 16.6667 },
        'SUR': { start: 2, count: 2, probability: 50.0 },
    },
    2: {
        'ATK%': { start: 4, count: 6, probability: 10.0 },
        'MAG%': { start: 4, count: 6, probability: 10.0 },
        'DIV%': { start: 4, count: 6, probability: 10.0 },
        'ACC%': { start: 4, count: 6, probability: 10.0 },
        'EVA%': { start: 4, count: 6, probability: 10.0 },
        'RES%': { start: 4, count: 6, probability: 10.0 },
        'DEF%': { start: 4, count: 6, probability: 10.0 },
        'MDEF%': { start: 4, count: 6, probability: 10.0 },
        'ASPD%': { start: 3, count: 5, probability: 12.5 },
        'ATK': { start: 5, count: 8, probability: 5.0 },
        'MAG': { start: 5, count: 8, probability: 5.0 },
        'DIV': { start: 5, count: 8, probability: 5.0 },
        'ACC': { start: 5, count: 8, probability: 5.0 },
        'EVA': { start: 5, count: 8, probability: 5.0 },
        'RES': { start: 5, count: 8, probability: 5.0 },
        'DEF': { start: 5, count: 8, probability: 5.0 },
        'MDEF': { start: 5, count: 8, probability: 5.0 },
        'SUR': { start: 3, count: 4, probability: 16.6667 },
    },
    3: {
        'ATK%': { start: 7, count: 9, probability: 4.7619 },
        'MAG%': { start: 7, count: 9, probability: 4.7619 },
        'DIV%': { start: 7, count: 9, probability: 4.7619 },
        'ACC%': { start: 7, count: 9, probability: 4.7619 },
        'EVA%': { start: 7, count: 9, probability: 4.7619 },
        'RES%': { start: 7, count: 9, probability: 4.7619 },
        'DEF%': { start: 7, count: 9, probability: 4.7619 },
        'MDEF%': { start: 7, count: 9, probability: 4.7619 },
        'ASPD%': { start: 6, count: 6, probability: 8.3333 },
        'ATK': { start: 7, count: 12, probability: 2.7778 },
        'MAG': { start: 7, count: 12, probability: 2.7778 },
        'DIV': { start: 7, count: 12, probability: 2.7778 },
        'ACC': { start: 7, count: 12, probability: 2.7778 },
        'EVA': { start: 7, count: 12, probability: 2.7778 },
        'RES': { start: 7, count: 12, probability: 2.7778 },
        'DEF': { start: 7, count: 12, probability: 2.7778 },
        'MDEF': { start: 7, count: 12, probability: 2.7778 },
        'SUR': { start: 4, count: 4, probability: 16.6667 },
    },
    4: {
        'ATK%': { start: 12, count: 9, probability: 6.25 },
        'MAG%': { start: 12, count: 9, probability: 6.25 },
        'DIV%': { start: 12, count: 9, probability: 6.25 },
        'ACC%': { start: 12, count: 9, probability: 6.25 },
        'EVA%': { start: 12, count: 9, probability: 6.25 },
        'RES%': { start: 12, count: 9, probability: 6.25 },
        'DEF%': { start: 12, count: 9, probability: 6.25 },
        'MDEF%': { start: 12, count: 9, probability: 6.25 },
        'ASPD%': { start: 9, count: 7, probability: 8.3333 },
        'ATK': { start: 11, count: 14, probability: 2.0 },
        'MAG': { start: 11, count: 14, probability: 2.0 },
        'DIV': { start: 11, count: 14, probability: 2.0 },
        'ACC': { start: 11, count: 14, probability: 2.0 },
        'EVA': { start: 11, count: 14, probability: 2.0 },
        'RES': { start: 11, count: 14, probability: 2.0 },
        'DEF': { start: 11, count: 14, probability: 2.0 },
        'MDEF': { start: 11, count: 14, probability: 2.0 },
        'SUR': { start: 5, count: 6, probability: 8.3333 },
    },
    5: {
        'ATK%': { start: 15, count: 10, probability: 4.1667 },
        'MAG%': { start: 15, count: 10, probability: 4.1667 },
        'DIV%': { start: 15, count: 10, probability: 4.1667 },
        'ACC%': { start: 15, count: 10, probability: 4.1667 },
        'EVA%': { start: 15, count: 10, probability: 4.1667 },
        'RES%': { start: 15, count: 10, probability: 4.1667 },
        'DEF%': { start: 15, count: 10, probability: 4.1667 },
        'MDEF%': { start: 15, count: 10, probability: 4.1667 },
        'ASPD%': { start: 12, count: 7, probability: 6.6667 },
        'ATK': { start: 14, count: 17, probability: 1.3889 },
        'MAG': { start: 14, count: 17, probability: 1.3889 },
        'DIV': { start: 14, count: 17, probability: 1.3889 },
        'ACC': { start: 14, count: 17, probability: 1.3889 },
        'EVA': { start: 14, count: 17, probability: 1.3889 },
        'RES': { start: 14, count: 17, probability: 1.3889 },
        'DEF': { start: 14, count: 17, probability: 1.3889 },
        'MDEF': { start: 14, count: 17, probability: 1.3889 },
        'SUR': { start: 6, count: 7, probability: 6.6667 },
    },
};

// Full Alteration Stone data (全変造石) - boosted values
const FULL_RANK_1_TO_5: MagnitudeData = {
    1: {
        'ATK%': { start: 3, count: 3, probability: 33.3333 },
        'MAG%': { start: 3, count: 3, probability: 33.3333 },
        'DIV%': { start: 3, count: 3, probability: 33.3333 },
        'ACC%': { start: 3, count: 3, probability: 33.3333 },
        'EVA%': { start: 3, count: 3, probability: 33.3333 },
        'RES%': { start: 3, count: 3, probability: 33.3333 },
        'DEF%': { start: 3, count: 3, probability: 33.3333 },
        'MDEF%': { start: 3, count: 3, probability: 33.3333 },
        'ASPD%': { start: 3, count: 2, probability: 50.0 },
        'ATK': { start: 4, count: 4, probability: 12.5 },
        'MAG': { start: 4, count: 4, probability: 12.5 },
        'DIV': { start: 4, count: 4, probability: 12.5 },
        'ACC': { start: 4, count: 4, probability: 12.5 },
        'EVA': { start: 4, count: 4, probability: 12.5 },
        'RES': { start: 4, count: 4, probability: 12.5 },
        'DEF': { start: 4, count: 4, probability: 12.5 },
        'MDEF': { start: 4, count: 4, probability: 12.5 },
        'SUR': { start: 3, count: 2, probability: 50.0 },
    },
    2: {
        'ATK%': { start: 5, count: 6, probability: 6.25 },
        'MAG%': { start: 5, count: 6, probability: 6.25 },
        'DIV%': { start: 5, count: 6, probability: 6.25 },
        'ACC%': { start: 5, count: 6, probability: 6.25 },
        'EVA%': { start: 5, count: 6, probability: 6.25 },
        'RES%': { start: 5, count: 6, probability: 6.25 },
        'DEF%': { start: 5, count: 6, probability: 6.25 },
        'MDEF%': { start: 5, count: 6, probability: 6.25 },
        'ASPD%': { start: 4, count: 5, probability: 8.3333 },
        'ATK': { start: 7, count: 9, probability: 2.0833 },
        'MAG': { start: 7, count: 9, probability: 2.0833 },
        'DIV': { start: 7, count: 9, probability: 2.0833 },
        'ACC': { start: 7, count: 9, probability: 2.0833 },
        'EVA': { start: 7, count: 9, probability: 2.0833 },
        'RES': { start: 7, count: 9, probability: 2.0833 },
        'DEF': { start: 7, count: 9, probability: 2.0833 },
        'MDEF': { start: 7, count: 9, probability: 2.0833 },
        'SUR': { start: 4, count: 4, probability: 12.5 },
    },
    3: {
        'ATK%': { start: 9, count: 7, probability: 5.0 },
        'MAG%': { start: 9, count: 7, probability: 5.0 },
        'DIV%': { start: 9, count: 7, probability: 5.0 },
        'ACC%': { start: 9, count: 7, probability: 5.0 },
        'EVA%': { start: 9, count: 7, probability: 5.0 },
        'RES%': { start: 9, count: 7, probability: 5.0 },
        'DEF%': { start: 9, count: 7, probability: 5.0 },
        'MDEF%': { start: 9, count: 7, probability: 5.0 },
        'ASPD%': { start: 8, count: 5, probability: 8.3333 },
        'ATK': { start: 9, count: 15, probability: 0.6803 },
        'MAG': { start: 9, count: 15, probability: 0.6803 },
        'DIV': { start: 9, count: 15, probability: 0.6803 },
        'ACC': { start: 9, count: 15, probability: 0.6803 },
        'EVA': { start: 9, count: 15, probability: 0.6803 },
        'RES': { start: 9, count: 15, probability: 0.6803 },
        'DEF': { start: 9, count: 15, probability: 0.6803 },
        'MDEF': { start: 9, count: 15, probability: 0.6803 },
        'SUR': { start: 5, count: 4, probability: 12.5 },
    },
    4: {
        'ATK%': { start: 15, count: 5, probability: 20.0 },
        'MAG%': { start: 15, count: 5, probability: 20.0 },
        'DIV%': { start: 15, count: 5, probability: 20.0 },
        'ACC%': { start: 15, count: 5, probability: 20.0 },
        'EVA%': { start: 15, count: 5, probability: 20.0 },
        'RES%': { start: 15, count: 5, probability: 20.0 },
        'DEF%': { start: 15, count: 5, probability: 20.0 },
        'MDEF%': { start: 15, count: 5, probability: 20.0 },
        'ASPD%': { start: 12, count: 4, probability: 25.0 },
        'ATK': { start: 14, count: 17, probability: 0.5208 },
        'MAG': { start: 14, count: 17, probability: 0.5208 },
        'DIV': { start: 14, count: 17, probability: 0.5208 },
        'ACC': { start: 14, count: 17, probability: 0.5208 },
        'EVA': { start: 14, count: 17, probability: 0.5208 },
        'RES': { start: 14, count: 17, probability: 0.5208 },
        'DEF': { start: 14, count: 17, probability: 0.5208 },
        'MDEF': { start: 14, count: 17, probability: 0.5208 },
        'SUR': { start: 6, count: 6, probability: 5.5556 },
    },
    5: {
        'ATK%': { start: 18, count: 7, probability: 5.0 },
        'MAG%': { start: 18, count: 7, probability: 5.0 },
        'DIV%': { start: 18, count: 7, probability: 5.0 },
        'ACC%': { start: 18, count: 7, probability: 5.0 },
        'EVA%': { start: 18, count: 7, probability: 5.0 },
        'RES%': { start: 18, count: 7, probability: 5.0 },
        'DEF%': { start: 18, count: 7, probability: 5.0 },
        'MDEF%': { start: 18, count: 7, probability: 5.0 },
        'ASPD%': { start: 15, count: 5, probability: 8.3333 },
        'ATK': { start: 17, count: 21, probability: 0.3333 },
        'MAG': { start: 17, count: 21, probability: 0.3333 },
        'DIV': { start: 17, count: 21, probability: 0.3333 },
        'ACC': { start: 17, count: 21, probability: 0.3333 },
        'EVA': { start: 17, count: 21, probability: 0.3333 },
        'RES': { start: 17, count: 21, probability: 0.3333 },
        'DEF': { start: 17, count: 21, probability: 0.3333 },
        'MDEF': { start: 17, count: 21, probability: 0.3333 },
        'SUR': { start: 7, count: 8, probability: 3.125 },
    },
};

const FULL_RANK_6_TWO_HANDED: MagnitudeData = {
    1: {
        'ATK%': { start: 3, count: 4, probability: 25.0 },
        'MAG%': { start: 3, count: 4, probability: 25.0 },
        'DIV%': { start: 3, count: 4, probability: 25.0 },
        'ACC%': { start: 3, count: 4, probability: 25.0 },
        'EVA%': { start: 3, count: 4, probability: 25.0 },
        'RES%': { start: 3, count: 4, probability: 25.0 },
        'DEF%': { start: 3, count: 4, probability: 25.0 },
        'MDEF%': { start: 3, count: 4, probability: 25.0 },
        'ASPD%': { start: 3, count: 2, probability: 50.0 },
        'ATK': { start: 4, count: 5, probability: 8.3333 },
        'MAG': { start: 4, count: 5, probability: 8.3333 },
        'DIV': { start: 4, count: 5, probability: 8.3333 },
        'ACC': { start: 4, count: 5, probability: 8.3333 },
        'EVA': { start: 4, count: 5, probability: 8.3333 },
        'RES': { start: 4, count: 5, probability: 8.3333 },
        'DEF': { start: 4, count: 5, probability: 8.3333 },
        'MDEF': { start: 4, count: 5, probability: 8.3333 },
        'SUR': { start: 3, count: 2, probability: 50.0 },
    },
    2: {
        'ATK%': { start: 5, count: 8, probability: 4.1667 },
        'MAG%': { start: 5, count: 8, probability: 4.1667 },
        'DIV%': { start: 5, count: 8, probability: 4.1667 },
        'ACC%': { start: 5, count: 8, probability: 4.1667 },
        'EVA%': { start: 5, count: 8, probability: 4.1667 },
        'RES%': { start: 5, count: 8, probability: 4.1667 },
        'DEF%': { start: 5, count: 8, probability: 4.1667 },
        'MDEF%': { start: 5, count: 8, probability: 4.1667 },
        'ASPD%': { start: 4, count: 6, probability: 6.25 },
        'ATK': { start: 7, count: 15, probability: 0.5556 },
        'MAG': { start: 7, count: 15, probability: 0.5556 },
        'DIV': { start: 7, count: 15, probability: 0.5556 },
        'ACC': { start: 7, count: 15, probability: 0.5556 },
        'EVA': { start: 7, count: 15, probability: 0.5556 },
        'RES': { start: 7, count: 15, probability: 0.5556 },
        'DEF': { start: 7, count: 15, probability: 0.5556 },
        'MDEF': { start: 7, count: 15, probability: 0.5556 },
        'SUR': { start: 4, count: 5, probability: 8.3333 },
    },
    3: {
        'ATK%': { start: 9, count: 12, probability: 1.3889 },
        'MAG%': { start: 9, count: 12, probability: 1.3889 },
        'DIV%': { start: 9, count: 12, probability: 1.3889 },
        'ACC%': { start: 9, count: 12, probability: 1.3889 },
        'EVA%': { start: 9, count: 12, probability: 1.3889 },
        'RES%': { start: 9, count: 12, probability: 1.3889 },
        'DEF%': { start: 9, count: 12, probability: 1.3889 },
        'MDEF%': { start: 9, count: 12, probability: 1.3889 },
        'ASPD%': { start: 8, count: 9, probability: 2.2222 },
        'ATK': { start: 9, count: 23, probability: 0.2 },
        'MAG': { start: 9, count: 23, probability: 0.2 },
        'DIV': { start: 9, count: 23, probability: 0.2 },
        'ACC': { start: 9, count: 23, probability: 0.2 },
        'EVA': { start: 9, count: 23, probability: 0.2 },
        'RES': { start: 9, count: 23, probability: 0.2 },
        'DEF': { start: 9, count: 23, probability: 0.2 },
        'MDEF': { start: 9, count: 23, probability: 0.2 },
        'SUR': { start: 5, count: 5, probability: 8.3333 },
    },
    4: {
        'ATK%': { start: 15, count: 11, probability: 2.7778 },
        'MAG%': { start: 15, count: 11, probability: 2.7778 },
        'DIV%': { start: 15, count: 11, probability: 2.7778 },
        'ACC%': { start: 15, count: 11, probability: 2.7778 },
        'EVA%': { start: 15, count: 11, probability: 2.7778 },
        'RES%': { start: 15, count: 11, probability: 2.7778 },
        'DEF%': { start: 15, count: 11, probability: 2.7778 },
        'MDEF%': { start: 15, count: 11, probability: 2.7778 },
        'ASPD%': { start: 12, count: 9, probability: 3.5714 },
        'ATK': { start: 14, count: 26, probability: 0.1377 },
        'MAG': { start: 14, count: 26, probability: 0.1377 },
        'DIV': { start: 14, count: 26, probability: 0.1377 },
        'ACC': { start: 14, count: 26, probability: 0.1377 },
        'EVA': { start: 14, count: 26, probability: 0.1377 },
        'RES': { start: 14, count: 26, probability: 0.1377 },
        'DEF': { start: 14, count: 26, probability: 0.1377 },
        'MDEF': { start: 14, count: 26, probability: 0.1377 },
        'SUR': { start: 6, count: 10, probability: 1.5625 },
    },
    5: {
        'ATK%': { start: 18, count: 14, probability: 1.1111 },
        'MAG%': { start: 18, count: 14, probability: 1.1111 },
        'DIV%': { start: 18, count: 14, probability: 1.1111 },
        'ACC%': { start: 18, count: 14, probability: 1.1111 },
        'EVA%': { start: 18, count: 14, probability: 1.1111 },
        'RES%': { start: 18, count: 14, probability: 1.1111 },
        'DEF%': { start: 18, count: 14, probability: 1.1111 },
        'MDEF%': { start: 18, count: 14, probability: 1.1111 },
        'ASPD%': { start: 15, count: 10, probability: 1.8519 },
        'ATK': { start: 17, count: 31, probability: 0.0845 },
        'MAG': { start: 17, count: 31, probability: 0.0845 },
        'DIV': { start: 17, count: 31, probability: 0.0845 },
        'ACC': { start: 17, count: 31, probability: 0.0845 },
        'EVA': { start: 17, count: 31, probability: 0.0845 },
        'RES': { start: 17, count: 31, probability: 0.0845 },
        'DEF': { start: 17, count: 31, probability: 0.0845 },
        'MDEF': { start: 17, count: 31, probability: 0.0845 },
        'SUR': { start: 7, count: 12, probability: 1.0 },
    },
};

const FULL_RANK_6_OTHER: MagnitudeData = {
    1: {
        'ATK%': { start: 3, count: 4, probability: 25.0 },
        'MAG%': { start: 3, count: 4, probability: 25.0 },
        'DIV%': { start: 3, count: 4, probability: 25.0 },
        'ACC%': { start: 3, count: 4, probability: 25.0 },
        'EVA%': { start: 3, count: 4, probability: 25.0 },
        'RES%': { start: 3, count: 4, probability: 25.0 },
        'DEF%': { start: 3, count: 4, probability: 25.0 },
        'MDEF%': { start: 3, count: 4, probability: 25.0 },
        'ASPD%': { start: 3, count: 2, probability: 50.0 },
        'ATK': { start: 4, count: 5, probability: 8.3333 },
        'MAG': { start: 4, count: 5, probability: 8.3333 },
        'DIV': { start: 4, count: 5, probability: 8.3333 },
        'ACC': { start: 4, count: 5, probability: 8.3333 },
        'EVA': { start: 4, count: 5, probability: 8.3333 },
        'RES': { start: 4, count: 5, probability: 8.3333 },
        'DEF': { start: 4, count: 5, probability: 8.3333 },
        'MDEF': { start: 4, count: 5, probability: 8.3333 },
        'SUR': { start: 3, count: 2, probability: 50.0 },
    },
    2: {
        'ATK%': { start: 5, count: 7, probability: 5.0 },
        'MAG%': { start: 5, count: 7, probability: 5.0 },
        'DIV%': { start: 5, count: 7, probability: 5.0 },
        'ACC%': { start: 5, count: 7, probability: 5.0 },
        'EVA%': { start: 5, count: 7, probability: 5.0 },
        'RES%': { start: 5, count: 7, probability: 5.0 },
        'DEF%': { start: 5, count: 7, probability: 5.0 },
        'MDEF%': { start: 5, count: 7, probability: 5.0 },
        'ASPD%': { start: 4, count: 6, probability: 6.25 },
        'ATK': { start: 7, count: 12, probability: 1.0 },
        'MAG': { start: 7, count: 12, probability: 1.0 },
        'DIV': { start: 7, count: 12, probability: 1.0 },
        'ACC': { start: 7, count: 12, probability: 1.0 },
        'EVA': { start: 7, count: 12, probability: 1.0 },
        'RES': { start: 7, count: 12, probability: 1.0 },
        'DEF': { start: 7, count: 12, probability: 1.0 },
        'MDEF': { start: 7, count: 12, probability: 1.0 },
        'SUR': { start: 4, count: 5, probability: 8.3333 },
    },
    3: {
        'ATK%': { start: 9, count: 11, probability: 1.5873 },
        'MAG%': { start: 9, count: 11, probability: 1.5873 },
        'DIV%': { start: 9, count: 11, probability: 1.5873 },
        'ACC%': { start: 9, count: 11, probability: 1.5873 },
        'EVA%': { start: 9, count: 11, probability: 1.5873 },
        'RES%': { start: 9, count: 11, probability: 1.5873 },
        'DEF%': { start: 9, count: 11, probability: 1.5873 },
        'MDEF%': { start: 9, count: 11, probability: 1.5873 },
        'ASPD%': { start: 8, count: 8, probability: 2.7778 },
        'ATK': { start: 9, count: 20, probability: 0.3086 },
        'MAG': { start: 9, count: 20, probability: 0.3086 },
        'DIV': { start: 9, count: 20, probability: 0.3086 },
        'ACC': { start: 9, count: 20, probability: 0.3086 },
        'EVA': { start: 9, count: 20, probability: 0.3086 },
        'RES': { start: 9, count: 20, probability: 0.3086 },
        'DEF': { start: 9, count: 20, probability: 0.3086 },
        'MDEF': { start: 9, count: 20, probability: 0.3086 },
        'SUR': { start: 5, count: 5, probability: 8.3333 },
    },
    4: {
        'ATK%': { start: 15, count: 10, probability: 3.125 },
        'MAG%': { start: 15, count: 10, probability: 3.125 },
        'DIV%': { start: 15, count: 10, probability: 3.125 },
        'ACC%': { start: 15, count: 10, probability: 3.125 },
        'EVA%': { start: 15, count: 10, probability: 3.125 },
        'RES%': { start: 15, count: 10, probability: 3.125 },
        'DEF%': { start: 15, count: 10, probability: 3.125 },
        'MDEF%': { start: 15, count: 10, probability: 3.125 },
        'ASPD%': { start: 12, count: 8, probability: 4.1667 },
        'ATK': { start: 14, count: 23, probability: 0.2 },
        'MAG': { start: 14, count: 23, probability: 0.2 },
        'DIV': { start: 14, count: 23, probability: 0.2 },
        'ACC': { start: 14, count: 23, probability: 0.2 },
        'EVA': { start: 14, count: 23, probability: 0.2 },
        'RES': { start: 14, count: 23, probability: 0.2 },
        'DEF': { start: 14, count: 23, probability: 0.2 },
        'MDEF': { start: 14, count: 23, probability: 0.2 },
        'SUR': { start: 6, count: 9, probability: 2.0833 },
    },
    5: {
        'ATK%': { start: 18, count: 12, probability: 1.3889 },
        'MAG%': { start: 18, count: 12, probability: 1.3889 },
        'DIV%': { start: 18, count: 12, probability: 1.3889 },
        'ACC%': { start: 18, count: 12, probability: 1.3889 },
        'EVA%': { start: 18, count: 12, probability: 1.3889 },
        'RES%': { start: 18, count: 12, probability: 1.3889 },
        'DEF%': { start: 18, count: 12, probability: 1.3889 },
        'MDEF%': { start: 18, count: 12, probability: 1.3889 },
        'ASPD%': { start: 15, count: 9, probability: 2.2222 },
        'ATK': { start: 17, count: 28, probability: 0.1157 },
        'MAG': { start: 17, count: 28, probability: 0.1157 },
        'DIV': { start: 17, count: 28, probability: 0.1157 },
        'ACC': { start: 17, count: 28, probability: 0.1157 },
        'EVA': { start: 17, count: 28, probability: 0.1157 },
        'RES': { start: 17, count: 28, probability: 0.1157 },
        'DEF': { start: 17, count: 28, probability: 0.1157 },
        'MDEF': { start: 17, count: 28, probability: 0.1157 },
        'SUR': { start: 7, count: 11, probability: 1.3333 },
    },
};

const LESSER_DATA: Record<EquipmentRankCategory, MagnitudeData> = {
    rank1to5: LESSER_RANK_1_TO_5,
    rank6TwoHanded: LESSER_RANK_6_TWO_HANDED,
    rank6Other: LESSER_RANK_6_OTHER,
};

const FULL_DATA: Record<EquipmentRankCategory, MagnitudeData> = {
    rank1to5: FULL_RANK_1_TO_5,
    rank6TwoHanded: FULL_RANK_6_TWO_HANDED,
    rank6Other: FULL_RANK_6_OTHER,
};

const QUALITIES: Quality[] = [1, 2, 3, 4, 5];

type QualitySelection = Quality | 'all';

function getVisibleTiers(data: MagnitudeData, selectedQuality: QualitySelection): number[] {
    const qualities = selectedQuality === 'all' ? QUALITIES : [selectedQuality];
    const tierSet = new Set<number>();

    for (const quality of qualities) {
        for (const stat of Object.values(data[quality])) {
            for (let i = 0; i < stat.count; i++) {
                tierSet.add(stat.start + i);
            }
        }
    }

    return Array.from(tierSet).sort((a, b) => a - b);
}

export function FullAlterationStone() {
    const [stoneType, setStoneType] = useState<StoneType>('full');
    const [selectedCategory, setSelectedCategory] = useState<EquipmentRankCategory>('rank1to5');
    const [selectedQuality, setSelectedQuality] = useState<QualitySelection>('all');

    const dataSource = stoneType === 'lesser' ? LESSER_DATA : FULL_DATA;
    const data = dataSource[selectedCategory];
    const visibleTiers = getVisibleTiers(data, selectedQuality);
    const qualitiesToShow = selectedQuality === 'all' ? QUALITIES : [selectedQuality];

    return (
        <div className="ag-magnitude">
            <p className="ag-magnitude-description">
                Blessing value distribution when using Full Alteration Stones on Grade 2+ equipment.
                Full stones provide boosted values; Lesser stones do not.
            </p>

            <div className="ag-magnitude-selector">
                <button
                    className={`ag-magnitude-btn ${stoneType === 'lesser' ? 'active' : ''}`}
                    onClick={() => setStoneType('lesser')}
                >
                    Lesser
                </button>
                <button
                    className={`ag-magnitude-btn ${stoneType === 'full' ? 'active' : ''}`}
                    onClick={() => setStoneType('full')}
                >
                    Full
                </button>
            </div>

            <div className="ag-magnitude-selector">
                {RANK_CATEGORIES.map((cat) => (
                    <button
                        key={cat.id}
                        className={`ag-magnitude-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(cat.id)}
                        title={cat.description}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            <div className="ag-magnitude-quality-selector">
                <button
                    className={`ag-magnitude-quality-btn ${selectedQuality === 'all' ? 'active' : ''}`}
                    onClick={() => setSelectedQuality('all')}
                >
                    All
                </button>
                {QUALITIES.map((quality) => (
                    <button
                        key={quality}
                        className={`ag-magnitude-quality-btn ${selectedQuality === quality ? 'active' : ''}`}
                        onClick={() => setSelectedQuality(quality)}
                    >
                        {'★'.repeat(quality)}
                    </button>
                ))}
            </div>

            <div className="ag-magnitude-table-wrapper">
                <table className="ag-magnitude-table">
                    <thead>
                        <tr>
                            <th className="ag-magnitude-th-quality">Quality</th>
                            <th className="ag-magnitude-th-stat">Stat</th>
                            {visibleTiers.map((tier) => (
                                <th key={tier} className="ag-magnitude-th-tier">{tier}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {qualitiesToShow.map((quality) => (
                            STATS.map((stat, statIdx) => {
                                const range = data[quality][stat.id];
                                const isFirstStat = statIdx === 0;
                                const isLastStat = statIdx === STATS.length - 1;

                                return (
                                    <tr
                                        key={`${quality}-${stat.id}`}
                                        className={isLastStat ? 'ag-magnitude-row-last' : ''}
                                    >
                                        {isFirstStat && (
                                            <td
                                                className="ag-magnitude-quality"
                                                rowSpan={STATS.length}
                                            >
                                                {'★'.repeat(quality)}
                                            </td>
                                        )}
                                        <td className="ag-magnitude-stat">{stat.label}</td>
                                        {visibleTiers.map((tier) => {
                                            const isInRange = tier >= range.start && tier < range.start + range.count;
                                            return (
                                                <td
                                                    key={tier}
                                                    className={`ag-magnitude-cell ${isInRange ? 'ag-magnitude-cell-active' : ''}`}
                                                >
                                                    {isInRange ? `${range.probability.toFixed(range.probability % 1 === 0 ? 0 : 2)}%` : '-'}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
