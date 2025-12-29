import type { IndexedGarakuta } from '../../types/equipment';

interface JunkCardProps {
    garakuta: IndexedGarakuta;
    onClick: () => void;
}

export function JunkCard({ garakuta, onClick }: JunkCardProps) {
    return (
        <div className="lf-junk-card" onClick={onClick}>
            <div>
                <div className="lf-junk-card-name">{garakuta.name}</div>
                <div className="lf-junk-card-name-jp">{garakuta.nameJp}</div>
            </div>
            <div className="lf-junk-card-arrow">→</div>
        </div>
    );
}
