import { useState } from 'react';
import type { IndexedGarakuta, AggregatedEquipment } from '../../types/equipment';
import { buildAggregateEquipment } from '../utils/buildIndex';
import { ProbabilityTable } from './ProbabilityTable';

interface JunkDetailProps {
    garakuta: IndexedGarakuta;
    onBack: () => void;
}

export function JunkDetail({ garakuta, onBack }: JunkDetailProps) {
    const [aggregateView, setAggregateView] = useState(true);
    const aggregatedEquipment: AggregatedEquipment[] = buildAggregateEquipment(garakuta);

    return (
        <div className="lf-junk-detail">
            <button className="lf-back-button" onClick={onBack}>
                ← Back to Search
            </button>

            <div className="lf-junk-detail-header">
                <div className="lf-junk-detail-title-row">
                    <div>
                        <div className="lf-junk-detail-name">{garakuta.name}</div>
                        <div className="lf-junk-detail-name-jp">{garakuta.nameJp}</div>
                    </div>
                    <button
                        className={`lf-aggregate-toggle ${aggregateView ? 'active' : ''}`}
                        onClick={() => setAggregateView(!aggregateView)}
                    >
                        {aggregateView ? 'Show by Group' : 'Show Combined'}
                    </button>
                </div>
            </div>

            {aggregateView ? (
                <div className="lf-aggregated-equipment">
                    {aggregatedEquipment.map((equip) => (
                        <div key={equip.name} className="lf-equipment-item">
                            <div className="lf-equipment-item-header">
                                <div className="lf-equipment-item-name">
                                    {equip.name}
                                    <span className="lf-equipment-item-name-jp">{equip.nameJp}</span>
                                </div>
                                <div className="lf-equipment-item-stats">
                                    <span className="lf-effective-rate">
                                        Effective: {equip.effectiveRate.toFixed(2)}%
                                    </span>
                                </div>
                            </div>
                            <ProbabilityTable probMatrix={equip.probMatrix} />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="lf-grouped-equipment">
                    {garakuta.groups.map((group) => (
                        <div key={group.groupNumber} className="lf-group-section">
                            <div className="lf-group-header">
                                <span className="lf-group-title">Group {group.groupNumber}</span>
                                <span className="lf-group-rate">
                                    {group.dropRate.toFixed(2)}% base drop rate
                                </span>
                            </div>
                            {group.equipment.map((equip) => (
                                <div key={equip.name} className="lf-equipment-item">
                                    <div className="lf-equipment-item-header">
                                        <div className="lf-equipment-item-name">
                                            {equip.name}
                                            <span className="lf-equipment-item-name-jp">
                                                {equip.nameJp}
                                            </span>
                                        </div>
                                        <div className="lf-equipment-item-stats">
                                            <span className="lf-item-rate">
                                                Item: {equip.dropRate.toFixed(2)}%
                                            </span>
                                            <span className="lf-effective-rate">
                                                Effective: {equip.effectiveRate.toFixed(2)}%
                                            </span>
                                        </div>
                                    </div>
                                    <ProbabilityTable probMatrix={equip.probMatrix} />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
