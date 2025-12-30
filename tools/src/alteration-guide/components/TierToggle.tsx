import type { TierNumber } from '../../types/alteration';

const TIERS: TierNumber[] = [1, 2, 3, 4];
const TIER_LABELS: Record<TierNumber, string> = { 1: '+5', 2: '+10', 3: '+15', 4: '+20' };

interface TierToggleProps {
    selectedTiers: TierNumber[];
    onToggle: (tiers: TierNumber[]) => void;
}

export function TierToggle({ selectedTiers, onToggle }: TierToggleProps) {
    const handleClick = (tier: TierNumber) => {
        if (selectedTiers.includes(tier)) {
            if (selectedTiers.length > 1) {
                onToggle(selectedTiers.filter(t => t !== tier));
            }
        } else {
            onToggle([...selectedTiers, tier].sort());
        }
    };

    return (
        <div className="ag-tier-toggle">
                {TIERS.map(tier => (
                    <button
                        key={tier}
                        className={`ag-tier-btn tier-${tier} ${selectedTiers.includes(tier) ? 'selected' : ''}`}
                        onClick={() => handleClick(tier)}
                    >
                        {TIER_LABELS[tier]}
                    </button>
                ))}
        </div>
    );
}
