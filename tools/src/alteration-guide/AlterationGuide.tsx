import { useState } from 'react';
import { useAlterationData } from '../hooks/useAlterationData';
import { BestEquipmentFinder } from './components/BestEquipmentFinder';
import { AlterationLookup } from './components/AlterationLookup';
import { BlessingMagnitude } from './components/BlessingMagnitude';
import './alteration-guide.css';

type TabId = 'best' | 'lookup' | 'magnitude';

interface Tab {
    id: TabId;
    label: string;
}

const TABS: Tab[] = [
    { id: 'best', label: 'Blessing Rates' },
    { id: 'lookup', label: 'Raw Data' },
    { id: 'magnitude', label: 'Blessing Values' },
];

export function AlterationGuide() {
    const { index, loading, error } = useAlterationData();
    const [activeTab, setActiveTab] = useState<TabId>('best');
    const [showJapanese, setShowJapanese] = useState(false);

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
            <div className="ag-header">
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
                <label className="ag-jp-toggle">
                    <input
                        type="checkbox"
                        checked={showJapanese}
                        onChange={(e) => setShowJapanese(e.target.checked)}
                    />
                    Show JP Names
                </label>
            </div>

            <div className="ag-content">
                {activeTab === 'best' && <BestEquipmentFinder index={index} showJapanese={showJapanese} />}
                {activeTab === 'lookup' && <AlterationLookup index={index} showJapanese={showJapanese} />}
                {activeTab === 'magnitude' && <BlessingMagnitude />}
            </div>
        </div>
    );
}
