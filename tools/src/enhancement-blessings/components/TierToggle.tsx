import type { TierNumber } from '../../types/alteration';

const TIERS: TierNumber[] = [1, 2, 3, 4];
const TIER_LABELS: Record<TierNumber, string> = { 1: '+5', 2: '+10', 3: '+15', 4: '+20' };

interface TierToggleProps {
    selectedTier: TierNumber;
    onSelect: (tier: TierNumber) => void;
}

export function TierToggle({ selectedTier, onSelect }: TierToggleProps) {
    return (
        <div className="ag-tier-toggle">
            {TIERS.map(tier => (
                <button
                    key={tier}
                    className={`ag-tier-btn tier-${tier} ${selectedTier === tier ? 'selected' : ''}`}
                    onClick={() => onSelect(tier)}
                >
                    {TIER_LABELS[tier]}
                </button>
            ))}
        </div>
    );
}
