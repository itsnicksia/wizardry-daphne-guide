import type { IndexedEquipment } from '../../types/equipment';
import { EquipmentCard } from './EquipmentCard';

interface EquipmentSearchProps {
    equipment: IndexedEquipment[];
}

export function EquipmentSearch({ equipment }: EquipmentSearchProps) {
    if (equipment.length === 0) {
        return <div className="lf-no-results">No equipment found matching your criteria.</div>;
    }

    const displayCount = Math.min(equipment.length, 50);
    const displayEquipment = equipment.slice(0, 50);

    return (
        <>
            <div className="lf-results-header">
                Showing {displayCount} of {equipment.length} equipment items
            </div>
            <div className="lf-results">
                {displayEquipment.map((eq) => (
                    <EquipmentCard key={eq.name} equipment={eq} />
                ))}
            </div>
        </>
    );
}
