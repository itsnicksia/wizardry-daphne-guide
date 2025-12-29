import type { Item } from './blacksmithing.ts';

const textClassFromItemQuality = [
    '!text-white',
    '!text-green-500',
    '!text-blue-500',
    '!text-purple-500',
    '!text-red-500',
];

export const ItemName = ({ item: { quality, currentGrade, itemType, enhancementLevel } }: { item: Item }) => {
    return (
        <h1
            className={`text-gray-400 text-xl ${textClassFromItemQuality[currentGrade]}`}
        >{`${quality}★ Generic ${itemType} +${enhancementLevel}`}</h1>
    );
};
