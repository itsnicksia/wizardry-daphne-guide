import type { IndexedEquipment } from '../../types/equipment';
import { ProbabilityTable } from './ProbabilityTable';

interface EquipmentCardProps {
    equipment: IndexedEquipment;
}

export function EquipmentCard({ equipment }: EquipmentCardProps) {
    const displaySources = equipment.sources.slice(0, 10);
    const remainingSources = equipment.sources.length - 10;

    return (
        <div className="lf-equipment-card">
            <div className="lf-equipment-name">{equipment.name}</div>
            <div className="lf-equipment-name-jp">{equipment.nameJp}</div>
            <ul className="lf-sources-list">
                {displaySources.map((src, index) => (
                    <li key={index} className="lf-source-item">
                        <div className="lf-source-header">
                            <div className="lf-source-name">
                                {src.garakuta}
                                <span className="lf-source-name-jp">{src.garakutaJp}</span>
                            </div>
                            <div className="lf-source-stats">
                                <span className="lf-drop-rate">
                                    Base: {src.effectiveRate.toFixed(2)}%
                                </span>
                            </div>
                        </div>
                        <ProbabilityTable probMatrix={src.probMatrix} />
                    </li>
                ))}
                {remainingSources > 0 && (
                    <li
                        className="lf-source-item"
                        style={{ justifyContent: 'center', color: '#888' }}
                    >
                        ...and {remainingSources} more sources
                    </li>
                )}
            </ul>
        </div>
    );
}
