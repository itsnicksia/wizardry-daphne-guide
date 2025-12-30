import type { AlterationStatRates, AlterationStatType } from '../../types/alteration';

export interface SimulationRoll {
    stat: AlterationStatType;
    isTarget: boolean;
}

export interface SimulationResult {
    totalStones: number;
    rolls: SimulationRoll[];
    targetHits: number;
}

export function simulateAlteration(
    stats: AlterationStatRates,
    targetStats: AlterationStatType[],
    count: number
): SimulationResult {
    const statEntries = (Object.entries(stats) as [AlterationStatType, number | null][])
        .filter(([, prob]) => prob !== null && prob > 0)
        .map(([stat, prob]) => ({ stat, prob: prob! }));

    const cumulativeProbs: Array<{ stat: AlterationStatType; cumulative: number }> = [];
    let cumulative = 0;
    for (const { stat, prob } of statEntries) {
        cumulative += prob / 100;
        cumulativeProbs.push({ stat, cumulative });
    }

    const rolls: SimulationRoll[] = [];
    let targetHits = 0;

    for (let i = 0; i < count; i++) {
        const roll = Math.random();
        const result = cumulativeProbs.find(p => roll < p.cumulative);

        if (result) {
            const isTarget = targetStats.includes(result.stat);
            if (isTarget) targetHits++;
            rolls.push({ stat: result.stat, isTarget });
        }
    }

    return {
        totalStones: rolls.length,
        rolls,
        targetHits,
    };
}
