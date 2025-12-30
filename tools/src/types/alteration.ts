export type AlterationStatType =
    | 'ATK%' | 'MAG%' | 'DIV%' | 'ACC%' | 'EVA%' | 'RES%' | 'DEF%' | 'MDEF%' | 'ASPD%'
    | 'ATK' | 'MAG' | 'DIV' | 'ACC' | 'EVA' | 'RES' | 'DEF' | 'MDEF' | 'ASPD' | 'SUR';

export const ALL_STATS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%',
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'SUR'
];

export const PERCENTAGE_STATS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%'
];

export const FIXED_STATS: AlterationStatType[] = [
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'SUR'
];

export type TierNumber = 1 | 2 | 3 | 4;

export type AlterationStatRates = Record<AlterationStatType, number | null>;

export interface AlterationTier {
    tier: TierNumber;
    stats: AlterationStatRates;
}

export interface AlterationEquipment {
    name: string;
    nameJp: string;
    tiers: AlterationTier[];
}

export interface AlterationData {
    equipment: AlterationEquipment[];
}

export interface StatRanking {
    groupName: string;
    probability: number;
    tier: TierNumber;
}

export interface EquipmentGroup {
    typeName: string;
    items: AlterationEquipment[];
    tiers: AlterationTier[];
}

export interface IndexedAlterationEquipment {
    name: string;
    nameJp: string;
    tiers: Map<TierNumber, AlterationStatRates>;
}

export interface AlterationIndex {
    byStatRanking: Map<AlterationStatType, StatRanking[]>;
    groups: EquipmentGroup[];
    byName: Map<string, IndexedAlterationEquipment>;
    byNameJp: Map<string, IndexedAlterationEquipment>;
    equipmentList: AlterationEquipment[];
}
