import { useState, useMemo } from 'react';
import type { AlterationIndex, AlterationStatType, TierNumber, EquipmentGroup } from '../../types/alteration';
import { StatSelector } from './StatSelector';
import { TierToggle } from './TierToggle';
import { calculateExpectedValue } from '../utils/calculateExpectedValue';

interface ExpectedValueCalculatorProps {
    index: AlterationIndex;
}

export function ExpectedValueCalculator({ index }: ExpectedValueCalculatorProps) {
    const [search, setSearch] = useState('');
    const [selectedGroup, setSelectedGroup] = useState<EquipmentGroup | null>(null);
    const [selectedStats, setSelectedStats] = useState<AlterationStatType[]>(['ATK%']);
    const [selectedTiers, setSelectedTiers] = useState<TierNumber[]>([4]);

    const filteredGroups = useMemo(() => {
        if (!search.trim() || selectedGroup) return [];

        const term = search.toLowerCase();
        const matchedGroups: EquipmentGroup[] = [];

        for (const group of index.groups) {
            if (group.typeName.toLowerCase().includes(term)) {
                matchedGroups.push(group);
                continue;
            }
            for (const item of group.items) {
                if (item.name.toLowerCase().includes(term) || item.nameJp.includes(search)) {
                    matchedGroups.push(group);
                    break;
                }
            }
        }

        return matchedGroups.slice(0, 10);
    }, [index, search, selectedGroup]);

    const evResult = useMemo(() => {
        if (!selectedGroup || selectedStats.length === 0 || selectedTiers.length === 0) {
            return null;
        }

        const tier = selectedGroup.tiers.find(t => t.tier === selectedTiers[0]);
        if (!tier) return null;

        return calculateExpectedValue(tier.stats, selectedStats);
    }, [selectedGroup, selectedStats, selectedTiers]);

    return (
        <div>
            <div className="ag-card">
                <div className="ag-card-title">Select Equipment Type</div>
                <input
                    type="text"
                    className="ag-search-input"
                    placeholder="Type equipment name or type..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (selectedGroup && e.target.value !== selectedGroup.typeName) {
                            setSelectedGroup(null);
                        }
                    }}
                />

                {filteredGroups.length > 0 && (
                    <div className="ag-ranking-list">
                        {filteredGroups.map((group) => (
                            <div
                                key={group.typeName}
                                className="ag-ranking-item ag-ranking-item-expandable"
                                onClick={() => {
                                    setSelectedGroup(group);
                                    setSearch(group.typeName);
                                }}
                            >
                                <div className="ag-ranking-name">
                                    <div className="ag-ranking-name-en">
                                        {group.typeName}
                                        {group.items.length > 1 && (
                                            <span className="ag-item-count">({group.items.length} items)</span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedGroup && (
                    <div style={{ marginTop: '0.5rem', color: 'var(--ag-accent-gold)' }}>
                        Selected: {selectedGroup.typeName}
                    </div>
                )}
            </div>

            <div className="ag-card">
                <TierToggle
                    selectedTiers={selectedTiers}
                    onToggle={(tiers) => setSelectedTiers(tiers.slice(-1))}
                />
            </div>

            <div className="ag-card">
                <div className="ag-card-title">Target Stats (any of these)</div>
                <StatSelector
                    selectedStats={selectedStats}
                    onSelect={setSelectedStats}
                    multiSelect={true}
                />
            </div>

            {evResult && evResult.probability > 0 && (
                <div className="ag-ev-result">
                    <div className="ag-ev-main">
                        {evResult.expectedStones.toFixed(1)} stones
                    </div>
                    <div className="ag-ev-label">
                        Expected stones to roll any target stat ({evResult.probability.toFixed(2)}% chance per roll)
                    </div>

                    <div className="ag-ev-percentiles">
                        <div className="ag-ev-percentile">
                            <div className="ag-ev-percentile-value">{evResult.percentiles.p50}</div>
                            <div className="ag-ev-percentile-label">50% chance</div>
                        </div>
                        <div className="ag-ev-percentile">
                            <div className="ag-ev-percentile-value">{evResult.percentiles.p75}</div>
                            <div className="ag-ev-percentile-label">75% chance</div>
                        </div>
                        <div className="ag-ev-percentile">
                            <div className="ag-ev-percentile-value">{evResult.percentiles.p90}</div>
                            <div className="ag-ev-percentile-label">90% chance</div>
                        </div>
                        <div className="ag-ev-percentile">
                            <div className="ag-ev-percentile-value">{evResult.percentiles.p99}</div>
                            <div className="ag-ev-percentile-label">99% chance</div>
                        </div>
                    </div>
                </div>
            )}

            {evResult && evResult.probability === 0 && (
                <div className="ag-ev-result">
                    <div className="ag-ev-main" style={{ color: 'var(--ag-text-secondary)' }}>
                        N/A
                    </div>
                    <div className="ag-ev-label">
                        Selected stat(s) cannot roll on this equipment at this enhancement level
                    </div>
                </div>
            )}
        </div>
    );
}
