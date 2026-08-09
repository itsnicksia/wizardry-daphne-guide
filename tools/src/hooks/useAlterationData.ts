import { useState, useEffect, useMemo } from 'react';
import type { AlterationData, AlterationIndex } from '../types/alteration';
import { buildAlterationIndex } from '../enhancement-blessings/utils/buildAlterationIndex';

const DATA_URL =
    'https://raw.githubusercontent.com/itsnicksia/wizardry-daphne-guide/refs/heads/main/tools/data/alteration-en.json';

interface UseAlterationDataResult {
    index: AlterationIndex | null;
    loading: boolean;
    error: string | null;
}

export function useAlterationData(): UseAlterationDataResult {
    const [rawData, setRawData] = useState<AlterationData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadData() {
            try {
                const response = await fetch(DATA_URL);
                const data: AlterationData = await response.json();
                setRawData(data);
            } catch {
                setError('Failed to load alteration data.');
            } finally {
                setLoading(false);
            }
        }
        loadData();
    }, []);

    const index = useMemo(() => {
        if (!rawData) return null;
        return buildAlterationIndex(rawData);
    }, [rawData]);

    return { index, loading, error };
}
