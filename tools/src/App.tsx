import { Routes, Route, Navigate } from 'react-router-dom';
import { Blacksmithing } from './blacksmith-simulator/blacksmithing.tsx';
import { LootFinder } from './loot-finder/LootFinder.tsx';
import { AlterationGuide } from './alteration-guide/AlterationGuide.tsx';

function App() {
    return (
        <div className="h-full">
            <Routes>
                <Route path="/" element={<Navigate to="/loot-finder" replace />} />
                <Route path="/loot-finder" element={<LootFinder />} />
                <Route path="/blacksmithing" element={<Blacksmithing />} />
                <Route path="/alteration" element={<AlterationGuide />} />
            </Routes>
        </div>
    );
}

export default App;
