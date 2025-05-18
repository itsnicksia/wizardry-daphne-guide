import React from 'react';
import { formatBlessing, type Item } from './blacksmithing';

interface EquipmentViewProps {
    equipmentModel: Item;
}

export const ItemBlessings: React.FC<EquipmentViewProps> = ({ equipmentModel }: EquipmentViewProps) => {
    const blessingLines = equipmentModel.blessingLines;
    return (
        <div className="flex flex-col items-center w-50">
            {blessingLines.map((blessingLine, index) => (
                <button key={index} className="text-left w-full pl-2 text-white">
                    <span className={'pl-1'}>{formatBlessing(blessingLine)}</span>
                </button>
            ))}
        </div>
    );
};
