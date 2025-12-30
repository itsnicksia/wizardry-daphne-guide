import { useState, useMemo, useRef, useEffect } from 'react';
import type { AlterationIndex, AlterationEquipment, AlterationStatType, TierNumber } from '../../types/alteration';
import { StatSelector } from './StatSelector';
import { TierToggle } from './TierToggle';
import { simulateAlteration, type SimulationRoll } from '../utils/simulateAlteration';

interface AlterationSimulatorProps {
    index: AlterationIndex;
}

export function AlterationSimulator({ index }: AlterationSimulatorProps) {
    const [search, setSearch] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState<AlterationEquipment | null>(null);
    const [selectedStats, setSelectedStats] = useState<AlterationStatType[]>(['ATK%']);
    const [selectedTiers, setSelectedTiers] = useState<TierNumber[]>([4]);

    const [rolls, setRolls] = useState<SimulationRoll[]>([]);
    const [totalStones, setTotalStones] = useState(0);
    const [targetHits, setTargetHits] = useState(0);

    const historyRef = useRef<HTMLDivElement>(null);

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

    const canRoll = selectedEquipment && selectedStats.length > 0 && selectedTiers.length > 0;

    const handleRoll = (count: number) => {
        if (!selectedEquipment || selectedTiers.length === 0) return;

        const tier = selectedEquipment.tiers.find(t => t.tier === selectedTiers[0]);
        if (!tier) return;

        const result = simulateAlteration(tier.stats, selectedStats, count);

        setRolls(prev => [...result.rolls, ...prev].slice(0, 500));
        setTotalStones(prev => prev + result.totalStones);
        setTargetHits(prev => prev + result.targetHits);
    };

    const handleReset = () => {
        setRolls([]);
        setTotalStones(0);
        setTargetHits(0);
    };

    useEffect(() => {
        if (historyRef.current) {
            historyRef.current.scrollTop = 0;
        }
    }, [rolls.length]);

    const successRate = totalStones > 0 ? (targetHits / totalStones) * 100 : 0;

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
                                    handleReset();
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
                    onToggle={(tiers) => {
                        setSelectedTiers(tiers.slice(-1));
                        handleReset();
                    }}
                />
            </div>

            <div className="ag-card">
                <div className="ag-card-title">Target Stats</div>
                <StatSelector
                    selectedStats={selectedStats}
                    onSelect={(stats) => {
                        setSelectedStats(stats);
                        handleReset();
                    }}
                    multiSelect={true}
                />
            </div>

            <div className="ag-card">
                <div className="ag-card-title">Simulation</div>

                <div className="ag-simulator-controls">
                    <button
                        className="ag-roll-btn"
                        onClick={() => handleRoll(1)}
                        disabled={!canRoll}
                    >
                        Roll x1
                    </button>
                    <button
                        className="ag-roll-btn"
                        onClick={() => handleRoll(10)}
                        disabled={!canRoll}
                    >
                        Roll x10
                    </button>
                    <button
                        className="ag-roll-btn"
                        onClick={() => handleRoll(100)}
                        disabled={!canRoll}
                    >
                        Roll x100
                    </button>
                    <button
                        className="ag-roll-btn"
                        onClick={handleReset}
                        style={{ background: 'var(--ag-bg-secondary)', color: 'var(--ag-text-primary)' }}
                    >
                        Reset
                    </button>
                </div>

                <div className="ag-sim-stats">
                    <div className="ag-sim-stat">
                        <div className="ag-sim-stat-value">{totalStones}</div>
                        <div className="ag-sim-stat-label">Total Stones</div>
                    </div>
                    <div className="ag-sim-stat">
                        <div className="ag-sim-stat-value">{targetHits}</div>
                        <div className="ag-sim-stat-label">Target Hits</div>
                    </div>
                    <div className="ag-sim-stat">
                        <div className="ag-sim-stat-value">{successRate.toFixed(2)}%</div>
                        <div className="ag-sim-stat-label">Success Rate</div>
                    </div>
                </div>

                {rolls.length > 0 && (
                    <div ref={historyRef} className="ag-roll-history">
                        {rolls.map((roll, idx) => (
                            <div
                                key={idx}
                                className={`ag-roll-entry ${roll.isTarget ? 'target' : 'miss'}`}
                            >
                                #{totalStones - idx}: {roll.stat}
                                {roll.isTarget && ' ★'}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
