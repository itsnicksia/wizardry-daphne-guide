import type { BlessingAttribute, Quality } from './types';
import React from 'react';

interface RefineOptionsProps {
    selectedAttribute: BlessingAttribute;
    selectedQuality: Quality;
    setSelectedQuality: (quality: Quality) => void;
}

export const Refine: React.FC<RefineOptionsProps> = ({ selectedAttribute, selectedQuality, setSelectedQuality }) => {
    return (
        <div className="flex flex-col gap-4 w-50">
            <h1 className={'text-xl'}>Refine</h1>
            <h3 className={'text-lg'}>Refinement Range</h3>
            <div className="flex flex-col w-50">
                {([1, 2, 3, 4, 5] as Quality[]).map((quality) => (
                    <div key={quality} className={`flex flex-col items-stretch ${getQualityClasses(quality)}`}>
                        <button className={'text-left'} onClick={() => setSelectedQuality(quality)}>
                            {selectedAttribute}+1~6
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    function getQualityClasses(quality: Quality) {
        return `${quality === selectedQuality ? 'selected-border' : ''}`;
    }
};
