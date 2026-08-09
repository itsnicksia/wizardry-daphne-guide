interface SearchBoxProps {
    mode: 'equipment' | 'junk';
    onModeChange: (mode: 'equipment' | 'junk') => void;
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export function SearchBox({ mode, onModeChange, searchQuery, onSearchChange }: SearchBoxProps) {
    const placeholder =
        mode === 'equipment'
            ? 'Search equipment (e.g., Bronze Dagger, 青銅の短剣)...'
            : "Search junk (e.g., Beginner's Junk, はじまりのガラクタ)...";

    return (
        <div className="lf-search-box">
            <div className="lf-mode-buttons">
                <button
                    className={`lf-mode-btn ${mode === 'equipment' ? 'active' : ''}`}
                    onClick={() => onModeChange('equipment')}
                >
                    Equipment
                </button>
                <button
                    className={`lf-mode-btn ${mode === 'junk' ? 'active' : ''}`}
                    onClick={() => onModeChange('junk')}
                >
                    Junk
                </button>
            </div>
            <input
                type="text"
                className="lf-search-input"
                placeholder={placeholder}
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    );
}
