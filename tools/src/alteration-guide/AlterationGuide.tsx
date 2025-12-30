import { useState } from 'react';
import { useAlterationData } from '../hooks/useAlterationData';
import { BestEquipmentFinder } from './components/BestEquipmentFinder';
import { AlterationLookup } from './components/AlterationLookup';
import './alteration-guide.css';

type TabId = 'best' | 'lookup';

interface Tab {
    id: TabId;
    label: string;
}

const TABS: Tab[] = [
    { id: 'best', label: 'Desired Stat' },
    { id: 'lookup', label: 'Raw Data' },
];

export function AlterationGuide() {
    const { index, loading, error } = useAlterationData();
    const [activeTab, setActiveTab] = useState<TabId>('best');

    if (loading) {
        return (
            <div className="ag-container">
                <div className="ag-loading">Loading alteration data...</div>
            </div>
        );
    }

    if (error || !index) {
        return (
            <div className="ag-container">
                <div className="ag-error">{error || 'Failed to load data'}</div>
            </div>
        );
    }

    return (
        <div className="ag-container">
            <div className="ag-tabs">
                {TABS.map((tab) => (
                    <button
                        key={tab.id}
                        className={`ag-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="ag-content">
                {activeTab === 'best' && <BestEquipmentFinder index={index} />}
                {activeTab === 'lookup' && <AlterationLookup index={index} />}
            </div>
        </div>
    );
}
