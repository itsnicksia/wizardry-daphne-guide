import { useState, useMemo, useCallback } from 'react';
import { useEquipmentData } from '../hooks/useEquipmentData';
import type { IndexedGarakuta } from '../types/equipment';
import { SearchBox } from './components/SearchBox';
import { EquipmentSearch } from './components/EquipmentSearch';
import { JunkSearch } from './components/JunkSearch';
import { JunkDetail } from './components/JunkDetail';
import './loot-finder.css';

type ViewMode = 'equipment-search' | 'junk-search' | 'junk-detail';

export function LootFinder() {
    const { allEquipment, allGarakuta, loading, error } = useEquipmentData();
    const [mode, setMode] = useState<'equipment' | 'junk'>('equipment');
    const [searchQuery, setSearchQuery] = useState('');
    const [currentView, setCurrentView] = useState<ViewMode>('equipment-search');
    const [selectedGarakuta, setSelectedGarakuta] = useState<IndexedGarakuta | null>(null);
    const [lastSearchQuery, setLastSearchQuery] = useState('');

    const filteredEquipment = useMemo(() => {
        if (!searchQuery.trim()) return allEquipment;
        const query = searchQuery.toLowerCase().trim();
        return allEquipment.filter(
            (eq) => eq.name.toLowerCase().includes(query) || eq.nameJp.includes(query)
        );
    }, [allEquipment, searchQuery]);

    const filteredGarakuta = useMemo(() => {
        if (!searchQuery.trim()) return allGarakuta;
        const query = searchQuery.toLowerCase().trim();
        return allGarakuta.filter(
            (g) => g.name.toLowerCase().includes(query) || g.nameJp.includes(query)
        );
    }, [allGarakuta, searchQuery]);

    const handleModeChange = useCallback((newMode: 'equipment' | 'junk') => {
        setMode(newMode);
        setCurrentView(newMode === 'equipment' ? 'equipment-search' : 'junk-search');
        setSelectedGarakuta(null);
        setSearchQuery('');
    }, []);

    const handleSelectGarakuta = useCallback(
        (garakuta: IndexedGarakuta) => {
            setSelectedGarakuta(garakuta);
            setLastSearchQuery(searchQuery);
            setCurrentView('junk-detail');
        },
        [searchQuery]
    );

    const handleBack = useCallback(() => {
        setCurrentView('junk-search');
        setSelectedGarakuta(null);
        setSearchQuery(lastSearchQuery);
    }, [lastSearchQuery]);

    if (loading) {
        return <div className="lf-container lf-loading">Loading equipment data...</div>;
    }

    if (error) {
        return <div className="lf-container lf-error">{error}</div>;
    }

    return (
        <div className="lf-container">
            {currentView !== 'junk-detail' && (
                <SearchBox
                    mode={mode}
                    onModeChange={handleModeChange}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />
            )}

            {currentView === 'equipment-search' && (
                <EquipmentSearch equipment={filteredEquipment} />
            )}

            {currentView === 'junk-search' && (
                <JunkSearch garakuta={filteredGarakuta} onSelectGarakuta={handleSelectGarakuta} />
            )}

            {currentView === 'junk-detail' && selectedGarakuta && (
                <JunkDetail garakuta={selectedGarakuta} onBack={handleBack} />
            )}
        </div>
    );
}
