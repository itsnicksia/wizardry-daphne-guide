import { Routes, Route, Navigate } from 'react-router-dom';
import { Blacksmithing } from './blacksmith-simulator/blacksmithing.tsx';
import { LootFinder } from './loot-finder/LootFinder.tsx';
import { EnhancementBlessings } from './enhancement-blessings/EnhancementBlessings.tsx';

function App() {
    return (
        <div className="h-full">
            <Routes>
                <Route path="/" element={<Navigate to="/loot-finder" replace />} />
                <Route path="/loot-finder" element={<LootFinder />} />
                <Route path="/blacksmithing" element={<Blacksmithing />} />
                <Route path="/enhancement-blessings" element={<EnhancementBlessings />} />
            </Routes>
        </div>
    );
}

export default App;
