import { useState } from 'react';
import type { ProbabilityMatrix } from '../../types/equipment';

const GRADE_NAMES = ['White', 'Green', 'Blue', 'Purple', 'Red'];

interface ProbabilityTableProps {
    probMatrix: ProbabilityMatrix;
}

export function ProbabilityTable({ probMatrix }: ProbabilityTableProps) {
    const [expanded, setExpanded] = useState(false);

    const activeStars: number[] = [];
    for (let s = 1; s <= 5; s++) {
        let hasProb = false;
        for (let g = 1; g <= 5; g++) {
            if (probMatrix[`s${s}g${g}`] > 0) {
                hasProb = true;
                break;
            }
        }
        if (hasProb) activeStars.push(s);
    }

    if (activeStars.length === 0) return null;

    const gradeTotals = [0, 0, 0, 0, 0];
    const starTotals: Record<number, number> = {};
    for (const s of activeStars) starTotals[s] = 0;

    for (const s of activeStars) {
        for (let g = 1; g <= 5; g++) {
            const val = probMatrix[`s${s}g${g}`];
            gradeTotals[g - 1] += val;
            starTotals[s] += val;
        }
    }

    return (
        <>
            <div
                className={`lf-prob-toggle ${expanded ? 'expanded' : ''}`}
                onClick={() => setExpanded(!expanded)}
            >
                Probability Table
            </div>
            <div className={`lf-prob-content ${expanded ? 'expanded' : ''}`}>
                <table className="lf-prob-table">
                    <thead>
                        <tr>
                            <th></th>
                            {[1, 2, 3, 4, 5].map((g) => (
                                <th key={g} className={`lf-grade-col lf-g${g}`}>
                                    {GRADE_NAMES[g - 1]}
                                </th>
                            ))}
                            <th className="lf-total-col">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activeStars.map((s) => (
                            <tr key={s}>
                                <th className="lf-star-label">★{s}</th>
                                {[1, 2, 3, 4, 5].map((g) => {
                                    const combinedPct = probMatrix[`s${s}g${g}`];
                                    return (
                                        <td key={g} className={`lf-g${g}`}>
                                            {combinedPct === 0 ? '-' : `${combinedPct.toFixed(3)}%`}
                                        </td>
                                    );
                                })}
                                <td className="lf-total-cell">{starTotals[s].toFixed(3)}%</td>
                            </tr>
                        ))}
                        <tr className="lf-total-row">
                            <th className="lf-total-label">Total</th>
                            {[1, 2, 3, 4, 5].map((g) => (
                                <td key={g} className={`lf-g${g}`}>
                                    {gradeTotals[g - 1] === 0 ? '-' : `${gradeTotals[g - 1].toFixed(3)}%`}
                                </td>
                            ))}
                            <td className="lf-total-cell"></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
