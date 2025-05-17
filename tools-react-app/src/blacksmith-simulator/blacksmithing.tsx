import React, { useState } from 'react';
import { type Item } from './blacksmithing';
import { CreateItem } from './create-item.tsx';
import ModifyItem from './modify-item.tsx';

export const Blacksmithing: React.FC = () => {
    const [item, setItem] = useState<Item | null>(null);

    return (
        <div className={'h-full flex flex-col text-center gap-4'}>
            <h1 className={'text-gray-400 text-xl'}>Blacksmith Simulator</h1>
            {item ? (
                <div className={'h-full flex flex-col items-center justify-between gap-4'}>
                    <ModifyItem item={item} onModify={(item) => setItem({ ...item })} />

                    <button className={'w-50 h-10'} onClick={() => setItem(null)}>
                        New Item
                    </button>
                </div>
            ) : (
                <CreateItem onCreate={(item) => setItem(item)} />
            )}
        </div>
    );
};
