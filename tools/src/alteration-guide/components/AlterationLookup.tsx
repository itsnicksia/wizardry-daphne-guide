import { useState, useMemo } from 'react';
import type { AlterationIndex, AlterationStatType, TierNumber, EquipmentGroup } from '../../types/alteration';

const TIER_LABELS: Record<TierNumber, string> = { 1: '+5', 2: '+10', 3: '+15', 4: '+20' };

interface AlterationLookupProps {
    index: AlterationIndex;
    showJapanese: boolean;
}

const PERCENTAGE_STATS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%'
];

const FIXED_STATS: AlterationStatType[] = [
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'SUR'
];

export function AlterationLookup({ index, showJapanese }: AlterationLookupProps) {
    const [search, setSearch] = useState('');
    const [selectedGroup, setSelectedGroup] = useState<EquipmentGroup | null>(null);
    const [showGroupItems, setShowGroupItems] = useState(false);

    const filteredGroups = useMemo(() => {
        if (!search.trim()) return [];

        const term = search.toLowerCase();
        const matchedGroups = new Map<string, EquipmentGroup>();

        for (const group of index.groups) {
            if (group.typeName.toLowerCase().includes(term)) {
                matchedGroups.set(group.typeName, group);
                continue;
            }
            for (const item of group.items) {
                if (item.name.toLowerCase().includes(term) || item.nameJp.includes(search)) {
                    matchedGroups.set(group.typeName, group);
                    break;
                }
            }
        }

        return Array.from(matchedGroups.values()).slice(0, 20);
    }, [index, search]);

    const formatValue = (value: number | null) => {
        if (value === null) return '-';
        return `${value.toFixed(2)}%`;
    };

    return (
        <div>
            <p className="ag-instructions">
                Search for equipment to view the initial blessing probabilities at each enhancement tier.
                These rates apply when equipment drops—alteration stone rerolls have equal probability for all stats.
            </p>
            <div className="ag-card">
                <div className="ag-card-title">Search Equipment</div>
                <input
                    type="text"
                    className="ag-search-input"
                    placeholder="Type equipment name or type..."
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        if (selectedGroup) setSelectedGroup(null);
                    }}
                />

                {filteredGroups.length > 0 && !selectedGroup && (
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
            </div>

            {selectedGroup && (
                <div className="ag-card">
                    <div className="ag-card-title">
                        {selectedGroup.typeName}
                        <button
                            onClick={() => {
                                setSelectedGroup(null);
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

                    {selectedGroup.items.length > 1 && (
                        <div
                            className="ag-group-toggle"
                            onClick={() => setShowGroupItems(!showGroupItems)}
                            style={{
                                cursor: 'pointer',
                                padding: '0.5rem',
                                marginBottom: '0.5rem',
                                backgroundColor: 'var(--ag-bg-secondary)',
                                borderRadius: '4px',
                                fontSize: '0.875rem',
                                color: 'var(--ag-text-secondary)'
                            }}
                        >
                            <span className="ag-expand-icon">{showGroupItems ? '▼' : '▶'}</span>
                            {selectedGroup.items.length} items with identical rates
                        </div>
                    )}

                    {showGroupItems && (
                        <div className="ag-group-items" style={{ marginLeft: 0, marginBottom: '1rem' }}>
                            {selectedGroup.items.map(equip => (
                                <div key={equip.nameJp} className="ag-group-item">
                                    <span className="ag-group-item-name">{equip.name}</span>
                                    {showJapanese && <span className="ag-group-item-jp">{equip.nameJp}</span>}
                                </div>
                            ))}
                        </div>
                    )}

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
                                {selectedGroup.tiers.map(tier => (
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
                                {selectedGroup.tiers.map(tier => (
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
