import { useState } from 'react';

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

type StatType = 'percentage' | 'fixed';

interface StatDefinition {
    id: string;
    label: string;
    type: StatType;
}

const STATS: StatDefinition[] = [
    { id: 'ATK%', label: 'ATK%', type: 'percentage' },
    { id: 'MAG%', label: 'MAG%', type: 'percentage' },
    { id: 'DIV%', label: 'DIV%', type: 'percentage' },
    { id: 'ACC%', label: 'ACC%', type: 'percentage' },
    { id: 'EVA%', label: 'EVA%', type: 'percentage' },
    { id: 'RES%', label: 'RES%', type: 'percentage' },
    { id: 'DEF%', label: 'DEF%', type: 'percentage' },
    { id: 'MDEF%', label: 'MDEF%', type: 'percentage' },
    { id: 'ASPD%', label: 'ASPD%', type: 'percentage' },
    { id: 'ATK', label: 'ATK', type: 'fixed' },
    { id: 'MAG', label: 'MAG', type: 'fixed' },
    { id: 'DIV', label: 'DIV', type: 'fixed' },
    { id: 'ACC', label: 'ACC', type: 'fixed' },
    { id: 'EVA', label: 'EVA', type: 'fixed' },
    { id: 'RES', label: 'RES', type: 'fixed' },
    { id: 'DEF', label: 'DEF', type: 'fixed' },
    { id: 'MDEF', label: 'MDEF', type: 'fixed' },
    { id: 'SUR', label: 'SUR', type: 'fixed' },
    { id: 'ASPD', label: 'ASPD', type: 'fixed' },
];

type Quality = 1 | 2 | 3 | 4 | 5;

interface ValueRange {
    start: number;
    count: number;
    probability: number;
}

type MagnitudeData = Record<Quality, Record<string, ValueRange>>;

// Compact representation of magnitude data
// Each stat has a range of possible values with equal probability
const MAGNITUDE_RANK_1_TO_5: MagnitudeData = {
    1: {
        'ATK%': { start: 1, count: 3, probability: 33.3333 },
        'MAG%': { start: 1, count: 3, probability: 33.3333 },
        'DIV%': { start: 1, count: 3, probability: 33.3333 },
        'ACC%': { start: 1, count: 3, probability: 33.3333 },
        'EVA%': { start: 1, count: 3, probability: 33.3333 },
        'RES%': { start: 1, count: 3, probability: 33.3333 },
        'DEF%': { start: 1, count: 3, probability: 33.3333 },
        'MDEF%': { start: 1, count: 3, probability: 33.3333 },
        'ASPD%': { start: 1, count: 2, probability: 50.0 },
        'ATK': { start: 2, count: 2, probability: 50.0 },
        'MAG': { start: 2, count: 2, probability: 50.0 },
        'DIV': { start: 2, count: 2, probability: 50.0 },
        'ACC': { start: 2, count: 2, probability: 50.0 },
        'EVA': { start: 2, count: 2, probability: 50.0 },
        'RES': { start: 2, count: 2, probability: 50.0 },
        'DEF': { start: 2, count: 2, probability: 50.0 },
        'MDEF': { start: 2, count: 2, probability: 50.0 },
        'SUR': { start: 1, count: 2, probability: 50.0 },
        'ASPD': { start: 1, count: 2, probability: 50.0 },
    },
    2: {
        'ATK%': { start: 3, count: 4, probability: 25.0 },
        'MAG%': { start: 3, count: 4, probability: 25.0 },
        'DIV%': { start: 3, count: 4, probability: 25.0 },
        'ACC%': { start: 3, count: 4, probability: 25.0 },
        'EVA%': { start: 3, count: 4, probability: 25.0 },
        'RES%': { start: 3, count: 4, probability: 25.0 },
        'DEF%': { start: 3, count: 4, probability: 25.0 },
        'MDEF%': { start: 3, count: 4, probability: 25.0 },
        'ASPD%': { start: 2, count: 3, probability: 33.3333 },
        'ATK': { start: 3, count: 3, probability: 33.3333 },
        'MAG': { start: 3, count: 3, probability: 33.3333 },
        'DIV': { start: 3, count: 3, probability: 33.3333 },
        'ACC': { start: 3, count: 3, probability: 33.3333 },
        'EVA': { start: 3, count: 3, probability: 33.3333 },
        'RES': { start: 3, count: 3, probability: 33.3333 },
        'DEF': { start: 3, count: 3, probability: 33.3333 },
        'MDEF': { start: 3, count: 3, probability: 33.3333 },
        'SUR': { start: 2, count: 2, probability: 50.0 },
        'ASPD': { start: 2, count: 3, probability: 33.3333 },
    },
    3: {
        'ATK%': { start: 5, count: 5, probability: 20.0 },
        'MAG%': { start: 5, count: 5, probability: 20.0 },
        'DIV%': { start: 5, count: 5, probability: 20.0 },
        'ACC%': { start: 5, count: 5, probability: 20.0 },
        'EVA%': { start: 5, count: 5, probability: 20.0 },
        'RES%': { start: 5, count: 5, probability: 20.0 },
        'DEF%': { start: 5, count: 5, probability: 20.0 },
        'MDEF%': { start: 5, count: 5, probability: 20.0 },
        'ASPD%': { start: 4, count: 3, probability: 33.3333 },
        'ATK': { start: 5, count: 3, probability: 33.3333 },
        'MAG': { start: 5, count: 3, probability: 33.3333 },
        'DIV': { start: 5, count: 3, probability: 33.3333 },
        'ACC': { start: 5, count: 3, probability: 33.3333 },
        'EVA': { start: 5, count: 3, probability: 33.3333 },
        'RES': { start: 5, count: 3, probability: 33.3333 },
        'DEF': { start: 5, count: 3, probability: 33.3333 },
        'MDEF': { start: 5, count: 3, probability: 33.3333 },
        'SUR': { start: 3, count: 2, probability: 50.0 },
        'ASPD': { start: 4, count: 3, probability: 33.3333 },
    },
    4: {
        'ATK%': { start: 9, count: 5, probability: 20.0 },
        'MAG%': { start: 9, count: 5, probability: 20.0 },
        'DIV%': { start: 9, count: 5, probability: 20.0 },
        'ACC%': { start: 9, count: 5, probability: 20.0 },
        'EVA%': { start: 9, count: 5, probability: 20.0 },
        'RES%': { start: 9, count: 5, probability: 20.0 },
        'DEF%': { start: 9, count: 5, probability: 20.0 },
        'MDEF%': { start: 9, count: 5, probability: 20.0 },
        'ASPD%': { start: 6, count: 4, probability: 25.0 },
        'ATK': { start: 8, count: 3, probability: 33.3333 },
        'MAG': { start: 8, count: 3, probability: 33.3333 },
        'DIV': { start: 8, count: 3, probability: 33.3333 },
        'ACC': { start: 8, count: 3, probability: 33.3333 },
        'EVA': { start: 8, count: 3, probability: 33.3333 },
        'RES': { start: 8, count: 3, probability: 33.3333 },
        'DEF': { start: 8, count: 3, probability: 33.3333 },
        'MDEF': { start: 8, count: 3, probability: 33.3333 },
        'SUR': { start: 4, count: 2, probability: 50.0 },
        'ASPD': { start: 6, count: 3, probability: 33.3333 },
    },
    5: {
        'ATK%': { start: 12, count: 5, probability: 20.0 },
        'MAG%': { start: 12, count: 5, probability: 20.0 },
        'DIV%': { start: 12, count: 5, probability: 20.0 },
        'ACC%': { start: 12, count: 5, probability: 20.0 },
        'EVA%': { start: 12, count: 5, probability: 20.0 },
        'RES%': { start: 12, count: 5, probability: 20.0 },
        'DEF%': { start: 12, count: 5, probability: 20.0 },
        'MDEF%': { start: 12, count: 5, probability: 20.0 },
        'ASPD%': { start: 9, count: 3, probability: 33.3333 },
        'ATK': { start: 11, count: 3, probability: 33.3333 },
        'MAG': { start: 11, count: 3, probability: 33.3333 },
        'DIV': { start: 11, count: 3, probability: 33.3333 },
        'ACC': { start: 11, count: 3, probability: 33.3333 },
        'EVA': { start: 11, count: 3, probability: 33.3333 },
        'RES': { start: 11, count: 3, probability: 33.3333 },
        'DEF': { start: 11, count: 3, probability: 33.3333 },
        'MDEF': { start: 11, count: 3, probability: 33.3333 },
        'SUR': { start: 5, count: 2, probability: 50.0 },
        'ASPD': { start: 8, count: 3, probability: 33.3333 },
    },
};

const MAGNITUDE_RANK_6_TWO_HANDED: MagnitudeData = {
    1: {
        'ATK%': { start: 1, count: 4, probability: 25.0 },
        'MAG%': { start: 1, count: 4, probability: 25.0 },
        'DIV%': { start: 1, count: 4, probability: 25.0 },
        'ACC%': { start: 1, count: 4, probability: 25.0 },
        'EVA%': { start: 1, count: 4, probability: 25.0 },
        'RES%': { start: 1, count: 4, probability: 25.0 },
        'DEF%': { start: 1, count: 4, probability: 25.0 },
        'MDEF%': { start: 1, count: 4, probability: 25.0 },
        'ASPD%': { start: 1, count: 2, probability: 50.0 },
        'ATK': { start: 2, count: 3, probability: 33.3333 },
        'MAG': { start: 2, count: 3, probability: 33.3333 },
        'DIV': { start: 2, count: 3, probability: 33.3333 },
        'ACC': { start: 2, count: 3, probability: 33.3333 },
        'EVA': { start: 2, count: 3, probability: 33.3333 },
        'RES': { start: 2, count: 3, probability: 33.3333 },
        'DEF': { start: 2, count: 3, probability: 33.3333 },
        'MDEF': { start: 2, count: 3, probability: 33.3333 },
        'SUR': { start: 1, count: 2, probability: 50.0 },
        'ASPD': { start: 1, count: 2, probability: 50.0 },
    },
    2: {
        'ATK%': { start: 3, count: 6, probability: 16.6667 },
        'MAG%': { start: 3, count: 6, probability: 16.6667 },
        'DIV%': { start: 3, count: 6, probability: 16.6667 },
        'ACC%': { start: 3, count: 6, probability: 16.6667 },
        'EVA%': { start: 3, count: 6, probability: 16.6667 },
        'RES%': { start: 3, count: 6, probability: 16.6667 },
        'DEF%': { start: 3, count: 6, probability: 16.6667 },
        'MDEF%': { start: 3, count: 6, probability: 16.6667 },
        'ASPD%': { start: 2, count: 3, probability: 33.3333 },
        'ATK': { start: 3, count: 5, probability: 20.0 },
        'MAG': { start: 3, count: 5, probability: 20.0 },
        'DIV': { start: 3, count: 5, probability: 20.0 },
        'ACC': { start: 3, count: 5, probability: 20.0 },
        'EVA': { start: 3, count: 5, probability: 20.0 },
        'RES': { start: 3, count: 5, probability: 20.0 },
        'DEF': { start: 3, count: 5, probability: 20.0 },
        'MDEF': { start: 3, count: 5, probability: 20.0 },
        'SUR': { start: 2, count: 2, probability: 50.0 },
        'ASPD': { start: 2, count: 3, probability: 33.3333 },
    },
    3: {
        'ATK%': { start: 5, count: 8, probability: 12.5 },
        'MAG%': { start: 5, count: 8, probability: 12.5 },
        'DIV%': { start: 5, count: 8, probability: 12.5 },
        'ACC%': { start: 5, count: 8, probability: 12.5 },
        'EVA%': { start: 5, count: 8, probability: 12.5 },
        'RES%': { start: 5, count: 8, probability: 12.5 },
        'DEF%': { start: 5, count: 8, probability: 12.5 },
        'MDEF%': { start: 5, count: 8, probability: 12.5 },
        'ASPD%': { start: 4, count: 4, probability: 25.0 },
        'ATK': { start: 5, count: 6, probability: 16.6667 },
        'MAG': { start: 5, count: 6, probability: 16.6667 },
        'DIV': { start: 5, count: 6, probability: 16.6667 },
        'ACC': { start: 5, count: 6, probability: 16.6667 },
        'EVA': { start: 5, count: 6, probability: 16.6667 },
        'RES': { start: 5, count: 6, probability: 16.6667 },
        'DEF': { start: 5, count: 6, probability: 16.6667 },
        'MDEF': { start: 5, count: 6, probability: 16.6667 },
        'SUR': { start: 3, count: 3, probability: 33.3333 },
        'ASPD': { start: 4, count: 4, probability: 25.0 },
    },
    4: {
        'ATK%': { start: 9, count: 9, probability: 11.1111 },
        'MAG%': { start: 9, count: 9, probability: 11.1111 },
        'DIV%': { start: 9, count: 9, probability: 11.1111 },
        'ACC%': { start: 9, count: 9, probability: 11.1111 },
        'EVA%': { start: 9, count: 9, probability: 11.1111 },
        'RES%': { start: 9, count: 9, probability: 11.1111 },
        'DEF%': { start: 9, count: 9, probability: 11.1111 },
        'MDEF%': { start: 9, count: 9, probability: 11.1111 },
        'ASPD%': { start: 6, count: 5, probability: 20.0 },
        'ATK': { start: 8, count: 7, probability: 14.2857 },
        'MAG': { start: 8, count: 7, probability: 14.2857 },
        'DIV': { start: 8, count: 7, probability: 14.2857 },
        'ACC': { start: 8, count: 7, probability: 14.2857 },
        'EVA': { start: 8, count: 7, probability: 14.2857 },
        'RES': { start: 8, count: 7, probability: 14.2857 },
        'DEF': { start: 8, count: 7, probability: 14.2857 },
        'MDEF': { start: 8, count: 7, probability: 14.2857 },
        'SUR': { start: 4, count: 3, probability: 33.3333 },
        'ASPD': { start: 6, count: 4, probability: 25.0 },
    },
    5: {
        'ATK%': { start: 12, count: 10, probability: 10.0 },
        'MAG%': { start: 12, count: 10, probability: 10.0 },
        'DIV%': { start: 12, count: 10, probability: 10.0 },
        'ACC%': { start: 12, count: 10, probability: 10.0 },
        'EVA%': { start: 12, count: 10, probability: 10.0 },
        'RES%': { start: 12, count: 10, probability: 10.0 },
        'DEF%': { start: 12, count: 10, probability: 10.0 },
        'MDEF%': { start: 12, count: 10, probability: 10.0 },
        'ASPD%': { start: 9, count: 5, probability: 20.0 },
        'ATK': { start: 11, count: 8, probability: 12.5 },
        'MAG': { start: 11, count: 8, probability: 12.5 },
        'DIV': { start: 11, count: 8, probability: 12.5 },
        'ACC': { start: 11, count: 8, probability: 12.5 },
        'EVA': { start: 11, count: 8, probability: 12.5 },
        'RES': { start: 11, count: 8, probability: 12.5 },
        'DEF': { start: 11, count: 8, probability: 12.5 },
        'MDEF': { start: 11, count: 8, probability: 12.5 },
        'SUR': { start: 5, count: 3, probability: 33.3333 },
        'ASPD': { start: 8, count: 5, probability: 20.0 },
    },
};

const MAGNITUDE_RANK_6_OTHER: MagnitudeData = {
    1: {
        'ATK%': { start: 1, count: 4, probability: 25.0 },
        'MAG%': { start: 1, count: 4, probability: 25.0 },
        'DIV%': { start: 1, count: 4, probability: 25.0 },
        'ACC%': { start: 1, count: 4, probability: 25.0 },
        'EVA%': { start: 1, count: 4, probability: 25.0 },
        'RES%': { start: 1, count: 4, probability: 25.0 },
        'DEF%': { start: 1, count: 4, probability: 25.0 },
        'MDEF%': { start: 1, count: 4, probability: 25.0 },
        'ASPD%': { start: 1, count: 2, probability: 50.0 },
        'ATK': { start: 2, count: 3, probability: 33.3333 },
        'MAG': { start: 2, count: 3, probability: 33.3333 },
        'DIV': { start: 2, count: 3, probability: 33.3333 },
        'ACC': { start: 2, count: 3, probability: 33.3333 },
        'EVA': { start: 2, count: 3, probability: 33.3333 },
        'RES': { start: 2, count: 3, probability: 33.3333 },
        'DEF': { start: 2, count: 3, probability: 33.3333 },
        'MDEF': { start: 2, count: 3, probability: 33.3333 },
        'SUR': { start: 1, count: 2, probability: 50.0 },
        'ASPD': { start: 1, count: 2, probability: 50.0 },
    },
    2: {
        'ATK%': { start: 3, count: 5, probability: 20.0 },
        'MAG%': { start: 3, count: 5, probability: 20.0 },
        'DIV%': { start: 3, count: 5, probability: 20.0 },
        'ACC%': { start: 3, count: 5, probability: 20.0 },
        'EVA%': { start: 3, count: 5, probability: 20.0 },
        'RES%': { start: 3, count: 5, probability: 20.0 },
        'DEF%': { start: 3, count: 5, probability: 20.0 },
        'MDEF%': { start: 3, count: 5, probability: 20.0 },
        'ASPD%': { start: 2, count: 3, probability: 33.3333 },
        'ATK': { start: 3, count: 4, probability: 25.0 },
        'MAG': { start: 3, count: 4, probability: 25.0 },
        'DIV': { start: 3, count: 4, probability: 25.0 },
        'ACC': { start: 3, count: 4, probability: 25.0 },
        'EVA': { start: 3, count: 4, probability: 25.0 },
        'RES': { start: 3, count: 4, probability: 25.0 },
        'DEF': { start: 3, count: 4, probability: 25.0 },
        'MDEF': { start: 3, count: 4, probability: 25.0 },
        'SUR': { start: 2, count: 2, probability: 50.0 },
        'ASPD': { start: 2, count: 3, probability: 33.3333 },
    },
    3: {
        'ATK%': { start: 5, count: 7, probability: 14.2857 },
        'MAG%': { start: 5, count: 7, probability: 14.2857 },
        'DIV%': { start: 5, count: 7, probability: 14.2857 },
        'ACC%': { start: 5, count: 7, probability: 14.2857 },
        'EVA%': { start: 5, count: 7, probability: 14.2857 },
        'RES%': { start: 5, count: 7, probability: 14.2857 },
        'DEF%': { start: 5, count: 7, probability: 14.2857 },
        'MDEF%': { start: 5, count: 7, probability: 14.2857 },
        'ASPD%': { start: 4, count: 4, probability: 25.0 },
        'ATK': { start: 5, count: 5, probability: 20.0 },
        'MAG': { start: 5, count: 5, probability: 20.0 },
        'DIV': { start: 5, count: 5, probability: 20.0 },
        'ACC': { start: 5, count: 5, probability: 20.0 },
        'EVA': { start: 5, count: 5, probability: 20.0 },
        'RES': { start: 5, count: 5, probability: 20.0 },
        'DEF': { start: 5, count: 5, probability: 20.0 },
        'MDEF': { start: 5, count: 5, probability: 20.0 },
        'SUR': { start: 3, count: 3, probability: 33.3333 },
        'ASPD': { start: 4, count: 4, probability: 25.0 },
    },
    4: {
        'ATK%': { start: 9, count: 8, probability: 12.5 },
        'MAG%': { start: 9, count: 8, probability: 12.5 },
        'DIV%': { start: 9, count: 8, probability: 12.5 },
        'ACC%': { start: 9, count: 8, probability: 12.5 },
        'EVA%': { start: 9, count: 8, probability: 12.5 },
        'RES%': { start: 9, count: 8, probability: 12.5 },
        'DEF%': { start: 9, count: 8, probability: 12.5 },
        'MDEF%': { start: 9, count: 8, probability: 12.5 },
        'ASPD%': { start: 6, count: 5, probability: 20.0 },
        'ATK': { start: 8, count: 6, probability: 16.6667 },
        'MAG': { start: 8, count: 6, probability: 16.6667 },
        'DIV': { start: 8, count: 6, probability: 16.6667 },
        'ACC': { start: 8, count: 6, probability: 16.6667 },
        'EVA': { start: 8, count: 6, probability: 16.6667 },
        'RES': { start: 8, count: 6, probability: 16.6667 },
        'DEF': { start: 8, count: 6, probability: 16.6667 },
        'MDEF': { start: 8, count: 6, probability: 16.6667 },
        'SUR': { start: 4, count: 3, probability: 33.3333 },
        'ASPD': { start: 6, count: 4, probability: 25.0 },
    },
    5: {
        'ATK%': { start: 12, count: 8, probability: 12.5 },
        'MAG%': { start: 12, count: 8, probability: 12.5 },
        'DIV%': { start: 12, count: 8, probability: 12.5 },
        'ACC%': { start: 12, count: 8, probability: 12.5 },
        'EVA%': { start: 12, count: 8, probability: 12.5 },
        'RES%': { start: 12, count: 8, probability: 12.5 },
        'DEF%': { start: 12, count: 8, probability: 12.5 },
        'MDEF%': { start: 12, count: 8, probability: 12.5 },
        'ASPD%': { start: 9, count: 5, probability: 20.0 },
        'ATK': { start: 11, count: 6, probability: 16.6667 },
        'MAG': { start: 11, count: 6, probability: 16.6667 },
        'DIV': { start: 11, count: 6, probability: 16.6667 },
        'ACC': { start: 11, count: 6, probability: 16.6667 },
        'EVA': { start: 11, count: 6, probability: 16.6667 },
        'RES': { start: 11, count: 6, probability: 16.6667 },
        'DEF': { start: 11, count: 6, probability: 16.6667 },
        'MDEF': { start: 11, count: 6, probability: 16.6667 },
        'SUR': { start: 5, count: 3, probability: 33.3333 },
        'ASPD': { start: 8, count: 5, probability: 20.0 },
    },
};

const DATA_BY_CATEGORY: Record<EquipmentRankCategory, MagnitudeData> = {
    rank1to5: MAGNITUDE_RANK_1_TO_5,
    rank6TwoHanded: MAGNITUDE_RANK_6_TWO_HANDED,
    rank6Other: MAGNITUDE_RANK_6_OTHER,
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

export function BlessingMagnitude() {
    const [selectedCategory, setSelectedCategory] = useState<EquipmentRankCategory>('rank1to5');
    const [selectedQuality, setSelectedQuality] = useState<QualitySelection>('all');

    const data = DATA_BY_CATEGORY[selectedCategory];
    const visibleTiers = getVisibleTiers(data, selectedQuality);
    const qualitiesToShow = selectedQuality === 'all' ? QUALITIES : [selectedQuality];

    return (
        <div className="ag-magnitude">
            <p className="ag-magnitude-description">
                Blessing value distribution by equipment quality. Higher quality equipment gets higher stat values.
            </p>

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
