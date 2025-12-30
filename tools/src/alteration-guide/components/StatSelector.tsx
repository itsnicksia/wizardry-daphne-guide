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

    const allStats = [...PERCENTAGE_STATS, ...FIXED_STATS];
    return (
        <div className="ag-stat-grid">
            {allStats.map(stat => (
                <button
                    key={stat}
                    className={`ag-stat-btn ${selectedStats.includes(stat) ? 'selected' : ''}`}
                    onClick={() => handleClick(stat)}
                >
                    {stat}
                </button>
            ))}
        </div>
    );
}
