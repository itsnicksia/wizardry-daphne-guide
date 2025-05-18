import { type Grade, type ItemType, itemTypes, type Quality } from './types';
import React, { useState } from 'react';
import { createEquipmentModel, type Item } from './blacksmithing.ts';

const textClassFromItemGrade = ['!bg-white', '!bg-green-600', '!bg-blue-600', '!bg-purple-600', '!bg-red-600'];

interface NewItemOptionsProps {
    onCreate: (equipment: Item) => void;
}

export const CreateItem: React.FC<NewItemOptionsProps> = ({ onCreate }: NewItemOptionsProps) => {
    {
        const [itemQuality, setItemItemQuality] = useState<Quality>(1);
        const [itemGrade, setItemGrade] = useState<Grade>(0);
        const [itemType, setItemType] = useState<ItemType>('Helmet');

        return (
            <div className="flex flex-col justify-start items-center gap-4">
                <h3>Quality</h3>
                <div className="flex flex-row justify-center w-1/2">
                    {[1, 2, 3, 4, 5].map((quality) => (
                        <button
                            key={quality}
                            className={`w-15 ${getSelectedClasses(itemQuality === quality)}`}
                            onClick={() => setItemItemQuality(quality as Quality)}
                        >
                            {`${quality}★`}
                        </button>
                    ))}
                </div>

                <h3>Grade</h3>
                <div className="flex flex-row justify-center w-1/2">
                    {[0, 1, 2, 3, 4].map((grade) => (
                        <button
                            key={grade}
                            className={`w-15 h-8 ${getClassesFromGrade(grade as Grade, grade === itemGrade)}`}
                            onClick={() => setItemGrade(grade as Grade)}
                        ></button>
                    ))}
                </div>

                <h3>Type</h3>
                <div className="flex-row">
                    {itemTypes.map((type) => (
                        <button
                            key={type}
                            className={`w-19 ${type} ${itemType === type ? 'selected' : ''}`}
                            onClick={() => setItemType(type)}
                        >
                            <span className={'text-lg'}>{type}</span>
                        </button>
                    ))}
                </div>

                <button
                    className={'w-40 text-lg'}
                    onClick={() => onCreate(createEquipmentModel(itemQuality, itemGrade, itemType))}
                >
                    Create Item
                </button>
            </div>
        );

        function getClassesFromGrade(grade: Grade, isSelected: boolean) {
            return `${textClassFromItemGrade[grade]} ${isSelected ? 'selected-border' : ''}`;
        }

        function getSelectedClasses(isSelected: boolean) {
            return `${isSelected ? 'selected-border' : ''}`;
        }
    }
};
