import type { AlterationStatType } from '../../types/alteration';

const PERCENTAGE_STATS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%'
];

const FIXED_STATS: AlterationStatType[] = [
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'ASPD', 'CRIT'
];

interface StatSelectorProps {
    selectedStats: AlterationStatType[];
    onSelect: (stats: AlterationStatType[]) => void;
    multiSelect?: boolean;
}

export function StatSelector({ selectedStats, onSelect, multiSelect = false }: StatSelectorProps) {
    const handleClick = (stat: AlterationStatType) => {
        if (multiSelect) {
            if (selectedStats.includes(stat)) {
                onSelect(selectedStats.filter(s => s !== stat));
            } else {
                onSelect([...selectedStats, stat]);
            }
        } else {
            onSelect([stat]);
        }
    };

    return (
        <div>
            <div className="ag-section-label">Percentage Stats</div>
            <div className="ag-stat-grid">
                {PERCENTAGE_STATS.map(stat => (
                    <button
                        key={stat}
                        className={`ag-stat-btn ${selectedStats.includes(stat) ? 'selected' : ''}`}
                        onClick={() => handleClick(stat)}
                    >
                        {stat}
                    </button>
                ))}
            </div>
            <div className="ag-section-label">Fixed Stats</div>
            <div className="ag-stat-grid">
                {FIXED_STATS.map(stat => (
                    <button
                        key={stat}
                        className={`ag-stat-btn ${selectedStats.includes(stat) ? 'selected' : ''}`}
                        onClick={() => handleClick(stat)}
                    >
                        {stat}
                    </button>
                ))}
            </div>
        </div>
    );
}
