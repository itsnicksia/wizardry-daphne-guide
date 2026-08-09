import type { IndexedGarakuta } from '../../types/equipment';
import { JunkCard } from './JunkCard';

interface JunkSearchProps {
    garakuta: IndexedGarakuta[];
    onSelectGarakuta: (garakuta: IndexedGarakuta) => void;
}

export function JunkSearch({ garakuta, onSelectGarakuta }: JunkSearchProps) {
    if (garakuta.length === 0) {
        return <div className="lf-no-results">No junk items found matching your criteria.</div>;
    }

    const displayCount = Math.min(garakuta.length, 50);
    const displayGarakuta = garakuta.slice(0, 50);

    return (
        <>
            <div className="lf-results-header">
                Showing {displayCount} of {garakuta.length} junk items
            </div>
            <div className="lf-results">
                {displayGarakuta.map((g) => (
                    <JunkCard key={g.name} garakuta={g} onClick={() => onSelectGarakuta(g)} />
                ))}
            </div>
        </>
    );
}
