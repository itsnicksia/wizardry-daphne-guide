# CLAUDE.md

## Project Overview

Wizardry: Daphne tools - a multi-tool React app with:
- **Loot Finder**: Search equipment and find which junk items to farm, with drop rate probabilities
- **Blacksmithing Simulator**: Simulate blacksmithing outcomes

Built with Vite + React + TypeScript + Tailwind CSS. Uses HashRouter for client-side routing.

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
│   ├── App.tsx                  # Routes: /loot-finder, /blacksmithing
│   ├── types/
│   │   ├── equipment.ts         # Equipment data types
│   │   └── dictionary.ts        # Translation dictionary types
│   ├── hooks/useEquipmentData.ts
│   ├── loot-finder/
│   │   ├── LootFinder.tsx
│   │   ├── loot-finder.css      # Scoped styles (lf- prefix)
│   │   ├── components/          # SearchBox, EquipmentCard, JunkCard, etc.
│   │   └── utils/buildIndex.ts
│   └── blacksmith-simulator/    # Blacksmithing components
├── scripts/
│   ├── convert-equipment.ts     # Data converter
│   └── test-probabilities.ts    # Probability validation tests
├── data/
│   ├── equipments.html          # Source Japanese data (~8MB)
│   ├── dictionary.json          # JP→EN translations
│   ├── equipment-en.json        # Output JSON (fetched from GitHub)
│   └── equipment-en.schema.json # JSON Schema
└── vite.config.ts               # Build → ../docs/html/
```

## Build Output

Builds to `../docs/html/assets/`. Entry HTML files set the hash route:
- `loot-finder.html` → `#/loot-finder`
- `blacksmithing-simulator.html` → `#/blacksmithing`

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

## Adding Translations

Dictionary sections:
- `equipment`: Direct mappings (青銅の短剣 → Bronze Dagger)
- `equipmentMaterials`: Prefixes (青銅の → Bronze)
- `equipmentTypes`: Suffixes (短剣 → Dagger)
- `garakuta`: Junk name parts

Run `npm run convert` - successfully translated items are auto-saved to dictionary.
