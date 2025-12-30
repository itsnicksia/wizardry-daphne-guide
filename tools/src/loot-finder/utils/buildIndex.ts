import type {
    EquipmentData,
    IndexedEquipment,
    IndexedGarakuta,
    IndexedGroup,
    IndexedEquipmentItem,
    EquipmentSource,
    ProbabilityMatrix,
    AggregatedEquipment,
} from '../../types/equipment';

export function buildEquipmentIndex(data: EquipmentData): IndexedEquipment[] {
    const equipmentIndex: Record<
        string,
        {
            name: string;
            nameJp: string;
            sources: Record<string, EquipmentSource>;
        }
    > = {};

    data.garakuta.forEach((g) => {
        g.groups.forEach((group) => {
            group.equipment.forEach((equip) => {
                const key = equip.name;
                if (!equipmentIndex[key]) {
                    equipmentIndex[key] = {
                        name: equip.name,
                        nameJp: equip.nameJp,
                        sources: {},
                    };
                }

                const garakutaKey = g.name;
                if (!equipmentIndex[key].sources[garakutaKey]) {
                    equipmentIndex[key].sources[garakutaKey] = {
                        garakuta: g.name,
                        garakutaJp: g.nameJp,
                        effectiveRate: 0,
                        probMatrix: {},
                    };
                    for (let s = 1; s <= 5; s++) {
                        for (let gr = 1; gr <= 5; gr++) {
                            equipmentIndex[key].sources[garakutaKey].probMatrix[`s${s}g${gr}`] = 0;
                        }
                    }
                }

                const src = equipmentIndex[key].sources[garakutaKey];
                const effectiveRate = (group.dropRate * equip.dropRate) / 100;
                src.effectiveRate += effectiveRate;

                for (let s = 1; s <= 5; s++) {
                    const starPct =
                        equip.quality[`star${s}` as keyof typeof equip.quality] || 0;
                    for (let gr = 1; gr <= 5; gr++) {
                        const gradePct = equip.grade[`g${gr}` as keyof typeof equip.grade] || 0;
                        const combinedPct = (effectiveRate * starPct * gradePct) / 10000;
                        src.probMatrix[`s${s}g${gr}`] += combinedPct;
                    }
                }
            });
        });
    });

    const allEquipment: IndexedEquipment[] = Object.values(equipmentIndex).map((eq) => ({
        name: eq.name,
        nameJp: eq.nameJp,
        sources: Object.values(eq.sources).sort((a, b) => b.effectiveRate - a.effectiveRate),
    }));

    allEquipment.sort((a, b) => a.name.localeCompare(b.name));
    return allEquipment;
}

export function buildGarakutaIndex(data: EquipmentData): IndexedGarakuta[] {
    const allGarakuta: IndexedGarakuta[] = data.garakuta.map((g) => {
        const groups: IndexedGroup[] = g.groups.map((group) => {
            const equipment: IndexedEquipmentItem[] = group.equipment.map((equip) => {
                const effectiveRate = (group.dropRate * equip.dropRate) / 100;
                const probMatrix: ProbabilityMatrix = {};

                for (let s = 1; s <= 5; s++) {
                    const starPct =
                        equip.quality[`star${s}` as keyof typeof equip.quality] || 0;
                    for (let gr = 1; gr <= 5; gr++) {
                        const gradePct = equip.grade[`g${gr}` as keyof typeof equip.grade] || 0;
                        probMatrix[`s${s}g${gr}`] = (effectiveRate * starPct * gradePct) / 10000;
                    }
                }

                return {
                    name: equip.name,
                    nameJp: equip.nameJp,
                    dropRate: equip.dropRate,
                    effectiveRate,
                    quality: equip.quality,
                    grade: equip.grade,
                    probMatrix,
                };
            });

            return {
                groupNumber: group.groupNumber,
                dropRate: group.dropRate,
                equipment,
            };
        });

        return {
            name: g.name,
            nameJp: g.nameJp,
            groups,
        };
    });

    allGarakuta.sort((a, b) => a.name.localeCompare(b.name));
    return allGarakuta;
}

export function buildAggregateEquipment(garakuta: IndexedGarakuta): AggregatedEquipment[] {
    const equipMap: Record<string, AggregatedEquipment> = {};

    garakuta.groups.forEach((group) => {
        group.equipment.forEach((equip) => {
            if (!equipMap[equip.name]) {
                equipMap[equip.name] = {
                    name: equip.name,
                    nameJp: equip.nameJp,
                    effectiveRate: 0,
                    probMatrix: {},
                };
                for (let s = 1; s <= 5; s++) {
                    for (let g = 1; g <= 5; g++) {
                        equipMap[equip.name].probMatrix[`s${s}g${g}`] = 0;
                    }
                }
            }

            equipMap[equip.name].effectiveRate += equip.effectiveRate;
            for (let s = 1; s <= 5; s++) {
                for (let g = 1; g <= 5; g++) {
                    equipMap[equip.name].probMatrix[`s${s}g${g}`] += equip.probMatrix[`s${s}g${g}`];
                }
            }
        });
    });

    return Object.values(equipMap).sort((a, b) => b.effectiveRate - a.effectiveRate);
}
