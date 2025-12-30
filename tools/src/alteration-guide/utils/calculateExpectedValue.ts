import type { AlterationStatRates, AlterationStatType } from '../../types/alteration';

export interface EVResult {
    expectedStones: number;
    probability: number;
    percentiles: {
        p50: number;
        p75: number;
        p90: number;
        p99: number;
    };
}

export function calculateExpectedValue(
    stats: AlterationStatRates,
    targetStats: AlterationStatType[]
): EVResult {
    const p = targetStats.reduce((sum, stat) => {
        return sum + (stats[stat] ?? 0) / 100;
    }, 0);

    if (p <= 0) {
        return {
            expectedStones: Infinity,
            probability: 0,
            percentiles: { p50: Infinity, p75: Infinity, p90: Infinity, p99: Infinity }
        };
    }

    const expectedStones = 1 / p;

    const calcPercentile = (pct: number) =>
        Math.ceil(Math.log(1 - pct) / Math.log(1 - p));

    return {
        expectedStones,
        probability: p * 100,
        percentiles: {
            p50: calcPercentile(0.5),
            p75: calcPercentile(0.75),
            p90: calcPercentile(0.9),
            p99: calcPercentile(0.99),
        },
    };
}
