import { useMemo } from 'react';
import type { AlterationIndex, AlterationEquipment } from '../../types/alteration';

interface MissingDataProps {
    index: AlterationIndex;
}

function hasJapaneseCharacters(str: string): boolean {
    return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/.test(str);
}

export function MissingData({ index }: MissingDataProps) {
    const { unknownItems, untranslatedItems } = useMemo(() => {
        const unknown: AlterationEquipment[] = [];
        const untranslated: AlterationEquipment[] = [];

        for (const item of index.equipmentList) {
            if (item.equipmentType === 'Unknown') {
                unknown.push(item);
            }
            if (hasJapaneseCharacters(item.name)) {
                untranslated.push(item);
            }
        }

        unknown.sort((a, b) => a.name.localeCompare(b.name));
        untranslated.sort((a, b) => a.nameJp.localeCompare(b.nameJp));

        return { unknownItems: unknown, untranslatedItems: untranslated };
    }, [index]);

    return (
        <div>
            <p className="ag-instructions">
                Items listed here are missing data and excluded from blessing rate rankings.
                Add entries to the CSV files or dictionary to include them.
            </p>

            <div className="ag-card">
                <div className="ag-card-title">
                    Not in CSV ({unknownItems.length} items)
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--ag-text-secondary)', marginBottom: '0.75rem' }}>
                    These items aren't in weapon.csv or armor.csv. Add them to the appropriate CSV to assign an equipment type.
                </p>
                {unknownItems.length === 0 ? (
                    <div style={{ color: 'var(--ag-text-secondary)', fontStyle: 'italic' }}>
                        All items have CSV entries!
                    </div>
                ) : (
                    <div className="ag-ranking-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {unknownItems.map((item) => (
                            <div key={item.nameJp} className="ag-ranking-item">
                                <div className="ag-ranking-name">
                                    <div className="ag-ranking-name-en">
                                        {item.name}
                                        <span style={{
                                            marginLeft: '0.5rem',
                                            padding: '0.125rem 0.375rem',
                                            fontSize: '0.625rem',
                                            backgroundColor: 'var(--ag-accent-color)',
                                            color: 'white',
                                            borderRadius: '3px',
                                            fontWeight: 500
                                        }}>
                                            NOT IN CSV
                                        </span>
                                    </div>
                                    <div className="ag-ranking-name-jp">{item.nameJp}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="ag-card">
                <div className="ag-card-title">
                    Untranslated ({untranslatedItems.length} items)
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--ag-text-secondary)', marginBottom: '0.75rem' }}>
                    These items have Japanese characters in their English name. Add translations to dictionary.json.
                </p>
                {untranslatedItems.length === 0 ? (
                    <div style={{ color: 'var(--ag-text-secondary)', fontStyle: 'italic' }}>
                        All items are translated!
                    </div>
                ) : (
                    <div className="ag-ranking-list" style={{ maxHeight: '400px', overflowY: 'auto' }}>
                        {untranslatedItems.map((item) => (
                            <div key={item.nameJp} className="ag-ranking-item">
                                <div className="ag-ranking-name">
                                    <div className="ag-ranking-name-en">
                                        {item.name}
                                        <span style={{
                                            marginLeft: '0.5rem',
                                            padding: '0.125rem 0.375rem',
                                            fontSize: '0.625rem',
                                            backgroundColor: '#e67e22',
                                            color: 'white',
                                            borderRadius: '3px',
                                            fontWeight: 500
                                        }}>
                                            UNTRANSLATED
                                        </span>
                                    </div>
                                    <div className="ag-ranking-name-jp">{item.nameJp}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
