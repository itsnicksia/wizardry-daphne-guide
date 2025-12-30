import { useState, useMemo } from 'react';
import type { AlterationIndex, AlterationStatType, TierNumber, EquipmentGroup } from '../../types/alteration';
import { StatSelector } from './StatSelector';
import { TierToggle } from './TierToggle';

const TIER_LABELS: Record<TierNumber, string> = { 1: '+5', 2: '+10', 3: '+15', 4: '+20' };

interface BestEquipmentFinderProps {
    index: AlterationIndex;
}

export function BestEquipmentFinder({ index }: BestEquipmentFinderProps) {
    const [selectedStats, setSelectedStats] = useState<AlterationStatType[]>(['ATK%']);
    const [selectedTiers, setSelectedTiers] = useState<TierNumber[]>([1, 2, 3, 4]);
    const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());

    const groupByName = useMemo(() => {
        const map = new Map<string, EquipmentGroup>();
        for (const group of index.groups) {
            map.set(group.typeName, group);
        }
        return map;
    }, [index]);

    const rankings = useMemo(() => {
        if (selectedStats.length === 0) return [];

        const stat = selectedStats[0];
        const allRankings = index.byStatRanking.get(stat) || [];

        return allRankings
            .filter(r => selectedTiers.includes(r.tier))
            .slice(0, 50)
            .map(r => ({
                ...r,
                group: groupByName.get(r.groupName)!
            }));
    }, [index, selectedStats, selectedTiers, groupByName]);

    const toggleGroup = (key: string) => {
        setExpandedGroups(prev => {
            const next = new Set(prev);
            if (next.has(key)) {
                next.delete(key);
            } else {
                next.add(key);
            }
            return next;
        });
    };

    return (
        <div>
            <p className="ag-instructions">
                These are the probabilities for initial blessings when equipment drops from garakuta.
                Select a stat to see which equipment types are most likely to have that blessing.
                Note: Alteration stones have equal rates for all stats.
            </p>
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
                        {rankings.map((item, idx) => {
                            const key = `${item.groupName}-${item.tier}`;
                            const isExpanded = expandedGroups.has(key);
                            const hasMultipleItems = item.group.items.length > 1;

                            return (
                                <div key={key} className="ag-ranking-item-container">
                                    <div
                                        className={`ag-ranking-item ${hasMultipleItems ? 'ag-ranking-item-expandable' : ''}`}
                                        onClick={() => hasMultipleItems && toggleGroup(key)}
                                    >
                                        <span className="ag-ranking-rank">#{idx + 1}</span>
                                        <div className="ag-ranking-name">
                                            <div className="ag-ranking-name-en">
                                                {hasMultipleItems && (
                                                    <span className="ag-expand-icon">{isExpanded ? '▼' : '▶'}</span>
                                                )}
                                                {item.groupName}
                                                {hasMultipleItems && (
                                                    <span className="ag-item-count">({item.group.items.length})</span>
                                                )}
                                            </div>
                                        </div>
                                        <span className={`ag-ranking-tier tier-${item.tier}`}>
                                            {TIER_LABELS[item.tier]}
                                        </span>
                                        <span className="ag-ranking-prob">
                                            {item.probability.toFixed(2)}%
                                        </span>
                                    </div>
                                    {isExpanded && (
                                        <div className="ag-group-items">
                                            {item.group.items.map(equip => (
                                                <div key={equip.nameJp} className="ag-group-item">
                                                    <span className="ag-group-item-name">{equip.name}</span>
                                                    <span className="ag-group-item-jp">{equip.nameJp}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
