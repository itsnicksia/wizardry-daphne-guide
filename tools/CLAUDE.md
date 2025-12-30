# CLAUDE.md

## Project Overview

Wizardry Variants Daphne tools - a multi-tool React app with:
- **Loot Finder**: Search equipment and find which junk items to farm, with drop rate probabilities
- **Blacksmithing Simulator**: Simulate blacksmithing outcomes
- **Alteration Guide**: Look up blessing/alteration probabilities by equipment type

Built with Vite + React + TypeScript + Tailwind CSS. Uses HashRouter for client-side routing.

## Game Domain Knowledge

### About Wizardry Variants Daphne
A mobile/PC dungeon-crawling RPG. Players explore dungeons, fight monsters, and collect equipment to strengthen their party.

### Equipment System
Equipment has multiple attributes:
- **Quality (★1-5)**: Star rating, higher = better base stats
- **Grade (1-5)**: Rarity tier displayed as colors: White → Green → Blue → Purple → Red
- **Enhancement Level (+0 to +20)**: Upgraded via blacksmithing, increases stats

### Blacksmithing (Enhancement)
Players enhance equipment from +0 to +20 using materials:
- Success rates decrease at higher levels
- Failure can reduce enhancement level
- At certain thresholds (+5, +10, +15, +20), equipment gains a "blessing slot"

### Blessing/Alteration System
At enhancement milestones (+5, +10, +15, +20), players can use **Alteration Stones** to roll for bonus stats (called "blessings"):
- Each roll randomly selects one stat from the equipment's probability table
- Different equipment types have different probability distributions
- Stats include: ATK%, MAG%, DEF%, MDEF%, ACC%, EVA%, RES%, DIV%, ASPD%, and flat versions + CRIT
- Players often reroll many times seeking specific stats

### Garakuta (Junk) System
- Monsters drop "garakuta" (junk items) instead of equipment directly
- Junk can be "reversed" at the shop to obtain equipment
- Each junk item has multiple "groups" with different drop rates
- Each group contains different equipment at various rates

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build to ../docs/html/
npm run convert      # Convert equipments.html → equipment-en.json
npm run lint         # Run ESLint
```

## Project Structure

```
tools/
├── src/
│   ├── main.tsx                 # Entry with HashRouter
│   ├── App.tsx                  # Routes: /loot-finder, /blacksmithing, /alteration
│   ├── types/
│   │   ├── equipment.ts         # Equipment data types
│   │   ├── alteration.ts        # Alteration/blessing data types
│   │   └── dictionary.ts        # Translation dictionary types
│   ├── hooks/
│   │   ├── useEquipmentData.ts
│   │   └── useAlterationData.ts
│   ├── loot-finder/
│   │   ├── LootFinder.tsx
│   │   ├── loot-finder.css      # Scoped styles (lf- prefix)
│   │   ├── components/
│   │   └── utils/buildIndex.ts
│   ├── blacksmith-simulator/
│   └── alteration-guide/
│       ├── AlterationGuide.tsx
│       ├── alteration-guide.css # Scoped styles (ag- prefix)
│       ├── components/          # BestEquipmentFinder, AlterationLookup, etc.
│       └── utils/
│           └── buildAlterationIndex.ts  # Groups equipment by probability
├── scripts/
│   ├── convert-equipment.ts     # Loot data converter
│   ├── convert-alteration.ts    # Alteration data converter
│   └── test-probabilities.ts    # Probability validation tests
├── data/
│   ├── equipments.html          # Source Japanese loot data (~8MB)
│   ├── alternations.html        # Source Japanese alteration data
│   ├── dictionary.json          # JP→EN translations
│   ├── equipment-en.json        # Converted loot data
│   └── alteration-en.json       # Converted alteration data
└── vite.config.ts               # Build → ../docs/html/
```

## Build Output

Builds to `../docs/html/assets/`. Entry HTML files set the hash route:
- `loot-finder.html` → `#/loot-finder`
- `blacksmithing-simulator.html` → `#/blacksmithing`
- `alteration-guide.html` → `#/alteration`

These are embedded in MkDocs via snippets (`--8<-- "html/loot-finder.html"`).

## Data Pipeline

```
data/equipments.html (JP) → scripts/convert-equipment.ts → data/equipment-en.json
                                        ↑
                                data/dictionary.json
```

The app fetches `data/equipment-en.json` from GitHub raw content at runtime.

## Loot Finder Concepts

- **Garakuta**: Junk items that can be "reversed" into equipment
- **Groups**: Each garakuta has numbered groups with different drop rates
- **Quality (★1-5)**: Star rating affecting equipment stats
- **Grade (1-5)**: Additional tier (White/Green/Blue/Purple/Red)
- **Effective Rate**: `Group Drop Rate × Item Drop Rate / 100`

## Alteration Guide Concepts

- **Equipment Groups**: Items with identical probability distributions are grouped (e.g., all One-Handed Swords share the same rates). 383 items → 29 groups.
- **Enhancement Levels**: +5, +10, +15, +20 unlock blessing slots with different probability tables
- **Stat Types**:
  - Percentage stats: ATK%, MAG%, DIV%, ACC%, EVA%, RES%, DEF%, MDEF%, ASPD%
  - Flat stats: ATK, MAG, DIV, ACC, EVA, RES, DEF, MDEF, ASPD, CRIT
### Tool Tabs
1. **Desired Stat**: Ranks equipment groups by probability for a selected stat
2. **Raw Data**: Search equipment to view full probability table across all enhancement levels

## Adding Translations

Dictionary sections:
- `equipment`: Direct mappings (青銅の短剣 → Bronze Dagger)
- `equipmentMaterials`: Prefixes (青銅の → Bronze)
- `equipmentTypes`: Suffixes (短剣 → Dagger)
- `garakuta`: Junk name parts

Run `npm run convert` - successfully translated items are auto-saved to dictionary.
