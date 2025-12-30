import { useState, useMemo } from 'react';
import type { AlterationIndex, AlterationEquipment, AlterationStatType, TierNumber } from '../../types/alteration';

const TIER_LABELS: Record<TierNumber, string> = { 1: '+5', 2: '+10', 3: '+15', 4: '+20' };

interface AlterationLookupProps {
    index: AlterationIndex;
}

const PERCENTAGE_STATS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%'
];

const FIXED_STATS: AlterationStatType[] = [
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'CRIT'
];

export function AlterationLookup({ index }: AlterationLookupProps) {
    const [search, setSearch] = useState('');
    const [selectedEquipment, setSelectedEquipment] = useState<AlterationEquipment | null>(null);

    const filteredEquipment = useMemo(() => {
        if (!search.trim()) return [];

        const term = search.toLowerCase();
        return index.equipmentList
            .filter(e =>
                e.name.toLowerCase().includes(term) ||
                e.nameJp.includes(search)
            )
            .slice(0, 20);
    }, [index, search]);

    const formatValue = (value: number | null) => {
        if (value === null) return '-';
        return `${value.toFixed(2)}%`;
    };

    return (
        <div>
            <div className="ag-card">
                <div className="ag-card-title">Search Equipment</div>
                <input
                    type="text"
                    className="ag-search-input"
                    placeholder="Type equipment name (English or Japanese)..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                {filteredEquipment.length > 0 && !selectedEquipment && (
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
            </div>

            {selectedEquipment && (
                <div className="ag-card">
                    <div className="ag-card-title">
                        {selectedEquipment.name}
                        <button
                            onClick={() => {
                                setSelectedEquipment(null);
                                setSearch('');
                            }}
                            style={{
                                marginLeft: '1rem',
                                padding: '0.25rem 0.5rem',
                                fontSize: '0.75rem',
                                background: 'var(--ag-bg-secondary)',
                                border: '1px solid var(--ag-border-color)',
                                borderRadius: '4px',
                                color: 'var(--ag-text-secondary)',
                                cursor: 'pointer'
                            }}
                        >
                            Clear
                        </button>
                    </div>
                    <div style={{ overflowX: 'auto' }}>
                        <table className="ag-stats-table">
                            <thead>
                                <tr>
                                    <th>Enh.</th>
                                    {PERCENTAGE_STATS.map(stat => (
                                        <th key={stat}>{stat}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {selectedEquipment.tiers.map(tier => (
                                    <tr key={tier.tier} className={`tier-${tier.tier}`}>
                                        <td>{TIER_LABELS[tier.tier]}</td>
                                        {PERCENTAGE_STATS.map(stat => (
                                            <td
                                                key={stat}
                                                className={tier.stats[stat] ? 'has-value' : 'no-value'}
                                            >
                                                {formatValue(tier.stats[stat])}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div style={{ marginTop: '1rem' }} />

                        <table className="ag-stats-table">
                            <thead>
                                <tr>
                                    <th>Enh.</th>
                                    {FIXED_STATS.map(stat => (
                                        <th key={stat}>{stat}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {selectedEquipment.tiers.map(tier => (
                                    <tr key={tier.tier} className={`tier-${tier.tier}`}>
                                        <td>{TIER_LABELS[tier.tier]}</td>
                                        {FIXED_STATS.map(stat => (
                                            <td
                                                key={stat}
                                                className={tier.stats[stat] ? 'has-value' : 'no-value'}
                                            >
                                                {formatValue(tier.stats[stat])}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
