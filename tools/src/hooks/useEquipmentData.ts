import { useState, useEffect } from 'react';
import type { EquipmentData, IndexedEquipment, IndexedGarakuta } from '../types/equipment';
import { buildEquipmentIndex, buildGarakutaIndex } from '../loot-finder/utils/buildIndex';

const DATA_URL =
    'https://raw.githubusercontent.com/itsnicksia/wizardry-daphne-guide/refs/heads/main/tools/data/equipment-en.json';

interface UseEquipmentDataResult {
    allEquipment: IndexedEquipment[];
    allGarakuta: IndexedGarakuta[];
    loading: boolean;
    error: string | null;
}

export function useEquipmentData(): UseEquipmentDataResult {
    const [allEquipment, setAllEquipment] = useState<IndexedEquipment[]>([]);
    const [allGarakuta, setAllGarakuta] = useState<IndexedGarakuta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch(DATA_URL);
                const data: EquipmentData = await response.json();
                setAllEquipment(buildEquipmentIndex(data));
                setAllGarakuta(buildGarakutaIndex(data));
            } catch {
                setError('Failed to load equipment data.');
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    return { allEquipment, allGarakuta, loading, error };
}
