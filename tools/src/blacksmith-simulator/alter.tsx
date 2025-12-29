import { type BlessingAttribute, blessingAttributes, type Quality } from './types';
import React from 'react';

interface AlterationOptionsProps {
    selectedAttribute: BlessingAttribute;
    setSelectedAttribute: (blessingAttribute: BlessingAttribute) => void;
    selectedQuality: Quality;
    setSelectedQuality: (quality: Quality) => void;
}

export const Alter: React.FC<AlterationOptionsProps> = ({
    selectedAttribute,
    setSelectedAttribute,
    selectedQuality,
    setSelectedQuality,
}) => {
    {
        return (
            <div className="flex flex-col justify-center">
                <h1 className={'text-xl'}>Refine</h1>
                <div className="grid grid-cols-4 grid-rows-4 gap-4">
                    {blessingAttributes.map((attribute) => (
                        <button
                            key={attribute}
                            className={`text-center ${attribute === selectedAttribute ? 'selected' : ''}`}
                            onClick={() => setSelectedAttribute(attribute as BlessingAttribute)}
                        >
                            {`${attribute}`}
                        </button>
                    ))}
                </div>
                <h3>Alteration Range</h3>
                <div className="grid grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5].map((quality) => (
                        <div>
                            <button
                                key={quality}
                                className={`w-15 ${selectedQuality === quality ? 'selected-border' : ''}`}
                                onClick={() => setSelectedQuality(quality as Quality)}
                            >
                                {quality}★
                            </button>
                            <br />
                            <b className={'text-gray-300'}> (1~6)</b>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
};
