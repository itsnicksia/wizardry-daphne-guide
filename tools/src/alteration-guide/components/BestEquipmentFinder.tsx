import { useState, useMemo } from 'react';
import type { AlterationIndex, AlterationStatType, TierNumber } from '../../types/alteration';
import { StatSelector } from './StatSelector';
import { TierToggle } from './TierToggle';

const TIER_LABELS: Record<TierNumber, string> = { 1: '+5', 2: '+10', 3: '+15', 4: '+20' };

interface BestEquipmentFinderProps {
    index: AlterationIndex;
}

export function BestEquipmentFinder({ index }: BestEquipmentFinderProps) {
    const [selectedStats, setSelectedStats] = useState<AlterationStatType[]>(['ATK%']);
    const [selectedTiers, setSelectedTiers] = useState<TierNumber[]>([1, 2, 3, 4]);

    const rankings = useMemo(() => {
        if (selectedStats.length === 0) return [];

        const stat = selectedStats[0];
        const allRankings = index.byStatRanking.get(stat) || [];

        return allRankings
            .filter(r => selectedTiers.includes(r.tier))
            .slice(0, 50);
    }, [index, selectedStats, selectedTiers]);

    return (
        <div>
            <div className="ag-card">
                <div className="ag-card-title">Select Stat to Optimize</div>
                <StatSelector
                    selectedStats={selectedStats}
                    onSelect={setSelectedStats}
                    multiSelect={false}
                />
            </div>

            <div className="ag-card">
                <TierToggle
                    selectedTiers={selectedTiers}
                    onToggle={setSelectedTiers}
                />
            </div>

            {selectedStats.length > 0 && (
                <div className="ag-card">
                    <div className="ag-card-title">
                        Best Equipment for {selectedStats[0]}
                    </div>
                    <div className="ag-results-count">
                        Showing top {rankings.length} results
                    </div>
                    <div className="ag-ranking-list">
                        {rankings.map((item, idx) => (
                            <div key={`${item.equipment}-${item.tier}`} className="ag-ranking-item">
                                <span className="ag-ranking-rank">#{idx + 1}</span>
                                <div className="ag-ranking-name">
                                    <div className="ag-ranking-name-en">{item.equipment}</div>
                                    <div className="ag-ranking-name-jp">{item.equipmentJp}</div>
                                </div>
                                <span className={`ag-ranking-tier tier-${item.tier}`}>
                                    {TIER_LABELS[item.tier]}
                                </span>
                                <span className="ag-ranking-prob">
                                    {item.probability.toFixed(2)}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
