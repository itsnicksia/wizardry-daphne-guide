import React, { useState } from 'react';
import { ItemBlessings } from './item-blessings.tsx';
import { enhance, type Item } from './blacksmithing.ts';
import { Refine } from './refine.tsx';
import { Alter } from './alter.tsx';
import type { BlessingAttribute, Quality } from './types.ts';
import { ItemName } from './item-name.tsx';

type SelectedOption = 'refine' | 'alter' | 'new-item';

interface Props {
    item: Item;
    onModify: (item: Item) => void;
}

const ModifyItem: React.FC<Props> = ({ item, onModify }: Props) => {
    const [selectedOption, setSelectedOption] = useState<SelectedOption>('refine');
    const [selectedQuality, setSelectedQuality] = useState<Quality>(1 as Quality);
    const [selectedAttribute, setSelectedAttribute] = useState<BlessingAttribute>('ATK');

    return (
        <div className="flex flex-col items-center gap-6 w-1/2">
            <div className="flex flex-col items-center gap-4">
                <ItemName item={item} />
                <ItemBlessings equipmentModel={item} />
            </div>
            <hr className={'w-1/5 border-slate-500/70 mx-auto'} />
            <div className="flex flex-col justify-center gap-4 w-50 mx-auto">
                <h3 className={'text-lg'}>Weapon Enhancement</h3>
                <button className={'w-full'} onClick={() => onModify(enhance(item))}>
                    Enhance
                </button>
                <h3 className={'text-lg'}>Property Enhancement</h3>
                <div className={'flex flex-col gap-1'}>
                    <button className={getClassesForOptionButton('refine')} onClick={() => setSelectedOption('refine')}>
                        Refine
                    </button>

                    <button className={getClassesForOptionButton('alter')} onClick={() => setSelectedOption('alter')}>
                        Alter
                    </button>
                </div>
            </div>

            <hr className={'w-1/5 border-slate-500/70 mx-auto'} />

            {selectedOption === 'refine' && (
                <Refine
                    selectedQuality={selectedQuality}
                    setSelectedQuality={setSelectedQuality}
                    selectedAttribute={selectedAttribute}
                />
            )}

            {selectedOption === 'alter' && (
                <Alter
                    selectedAttribute={selectedAttribute}
                    setSelectedAttribute={setSelectedAttribute}
                    selectedQuality={selectedQuality}
                    setSelectedQuality={setSelectedQuality}
                />
            )}
        </div>
    );

    function getClassesForOptionButton(optionKey: string) {
        return selectedOption === optionKey ? 'selected' : '';
    }
};

export default ModifyItem;
