export interface EquipmentData {
    garakuta: Garakuta[];
}

export interface Garakuta {
    name: string;
    nameJp: string;
    groups: EquipmentGroup[];
}

export interface EquipmentGroup {
    groupNumber: number;
    dropRate: number;
    equipment: Equipment[];
}

export interface Equipment {
    name: string;
    nameJp: string;
    dropRate: number;
    quality: QualityRates;
    grade: GradeRates;
}

export interface QualityRates {
    star1: number | null;
    star2: number | null;
    star3: number | null;
    star4: number | null;
    star5: number | null;
}

export interface GradeRates {
    g1: number | null;
    g2: number | null;
    g3: number | null;
    g4: number | null;
    g5: number | null;
}

export type ProbabilityMatrix = Record<string, number>;

export interface IndexedEquipment {
    name: string;
    nameJp: string;
    sources: EquipmentSource[];
}

export interface EquipmentSource {
    garakuta: string;
    garakutaJp: string;
    effectiveRate: number;
    probMatrix: ProbabilityMatrix;
}

export interface IndexedGarakuta {
    name: string;
    nameJp: string;
    groups: IndexedGroup[];
}

export interface IndexedGroup {
    groupNumber: number;
    dropRate: number;
    equipment: IndexedEquipmentItem[];
}

export interface IndexedEquipmentItem {
    name: string;
    nameJp: string;
    dropRate: number;
    effectiveRate: number;
    quality: QualityRates;
    grade: GradeRates;
    probMatrix: ProbabilityMatrix;
}

export interface AggregatedEquipment {
    name: string;
    nameJp: string;
    effectiveRate: number;
    probMatrix: ProbabilityMatrix;
}
