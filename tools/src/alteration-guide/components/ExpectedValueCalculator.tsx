import { useState, useMemo } from 'react';
import type { AlterationIndex, AlterationEquipment, AlterationStatType, TierNumber } from '../../types/alteration';
import { StatSelector } from './StatSelector';
import { TierToggle } from './TierToggle';
import { calculateExpectedValue } from '../utils/calculateExpectedValue';

interface ExpectedValueCalculatorProps {
    index: AlterationIndex;
}

export function ExpectedValueCalculator({ index }: ExpectedValueCalculatorProps) {
    const [search, setSearch] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState<AlterationEquipment | null>(null);
    const [selectedStats, setSelectedStats] = useState<AlterationStatType[]>(['ATK%']);
    const [selectedTiers, setSelectedTiers] = useState<TierNumber[]>([4]);

    const filteredEquipment = useMemo(() => {
        if (!search.trim() || selectedEquipment) return [];

        const term = search.toLowerCase();
        return index.equipmentList
            .filter(e =>
                e.name.toLowerCase().includes(term) ||
                e.nameJp.includes(search)
            )
            .slice(0, 10);
    }, [index, search, selectedEquipment]);

    const evResult = useMemo(() => {
        if (!selectedEquipment || selectedStats.length === 0 || selectedTiers.length === 0) {
            return null;
        }

        const tier = selectedEquipment.tiers.find(t => t.tier === selectedTiers[0]);
        if (!tier) return null;

        return calculateExpectedValue(tier.stats, selectedStats);
    }, [selectedEquipment, selectedStats, selectedTiers]);

    return (
        <div>
            <div className="ag-card">
                <div className="ag-card-title">Select Equipment</div>
                <input
                    type="text"
                    className="ag-search-input"
                    placeholder="Type equipment name..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (selectedEquipment && e.target.value !== selectedEquipment.name) {
                            setSelectedEquipment(null);
                        }
                    }}
                />

                {filteredEquipment.length > 0 && (
                    <div className="ag-ranking-list">
                        {filteredEquipment.map((equip) => (
                            <div
                                key={equip.nameJp}
                                className="ag-ranking-item"
                                style={{ cursor: 'pointer' }}
                                onClick={() => {
                                    setSelectedEquipment(equip);
                                    setSearch(equip.name);
                                }}
                            >
                                <div className="ag-ranking-name">
                                    <div className="ag-ranking-name-en">{equip.name}</div>
                                    <div className="ag-ranking-name-jp">{equip.nameJp}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {selectedEquipment && (
                    <div style={{ marginTop: '0.5rem', color: 'var(--ag-accent-gold)' }}>
                        Selected: {selectedEquipment.name}
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
                        Selected stat(s) cannot roll on this equipment at this tier
                    </div>
                </div>
            )}
        </div>
    );
}
