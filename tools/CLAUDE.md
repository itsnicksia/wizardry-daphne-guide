# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wizardry: Daphne tools - a multi-tool React app with:
- **Loot Finder**: Search equipment and find which junk items to farm, with drop rate probabilities
- **Blacksmithing Simulator**: Simulate blacksmithing outcomes

Built with Vite + React + TypeScript + Tailwind CSS.

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build to ../docs/html/
npm run convert      # Convert equipments.html → equipment-en.json
npm run preview      # Preview production build
```

## Project Structure

```
tools/
├── src/
│   ├── main.tsx                    # Entry point with HashRouter
│   ├── App.tsx                     # Routes: /loot-finder, /blacksmithing
│   ├── index.css                   # Global styles
│   ├── types/
│   │   └── equipment.ts            # TypeScript types for equipment data
│   ├── hooks/
│   │   └── useEquipmentData.ts     # Data fetching hook (from GitHub)
│   ├── loot-finder/
│   │   ├── LootFinder.tsx          # Main loot finder component
│   │   ├── loot-finder.css         # Scoped styles (lf- prefix)
│   │   ├── components/             # React components
│   │   └── utils/                  # buildIndex, calculations
│   └── blacksmith-simulator/       # Blacksmithing simulator components
├── vite.config.ts                  # Build output → ../docs/html/
├── convert-equipment.js            # Node.js data converter
├── dictionary.json                 # JP→EN translations
├── equipments.html                 # Source Japanese data
└── equipment-en.json               # Output data (fetched at runtime)
```

## Data Pipeline

```
equipments.html (JP) → convert-equipment.js → equipment-en.json
                              ↑
                       dictionary.json (JP→EN)
```

## Build Output

Builds to `../docs/html/`:
- `assets/index-[hash].js` - Bundled JavaScript
- `assets/index-[hash].css` - Bundled CSS

Entry files (embedded via MkDocs snippets):
- `docs/html/loot-finder.html` - Sets hash to `/loot-finder`
- `docs/html/blacksmithing-simulator.html` - Sets hash to `/blacksmithing`

## Game Concepts

- **Garakuta (ガラクタ)**: Junk items that can be "reversed" into equipment
- **Groups**: Each garakuta has numbered groups with different drop rates
- **Quality (★1-5)**: Star rating affecting equipment stats
- **Grade (1-5)**: Additional tier affecting equipment power
- **Drop flow**: Garakuta → Group (by %) → Equipment (by %) → Quality/Grade (by %)

## Effective Drop Rate

```
Effective Rate = Group Drop Rate × Item Drop Rate / 100

Example: Bronze Dagger from Beginner's Junk
- Group 1 rate: 11.11%
- Item rate in group: 28.57%
- Effective: 11.11 × 28.57 / 100 = 3.17%
```

## Adding Translations

The converter uses intelligent keyword-based translation:

1. **Exact lookup**: Checks `equipment` section for manual translations
2. **Keyword fallback**: Combines material prefix + item type suffix
3. **Auto-save**: Successfully translated items are added to dictionary

Dictionary sections:
- `equipment`: Direct item name mappings (青銅の短剣 → Bronze Dagger)
- `equipmentMaterials`: Material prefixes (青銅の → Bronze, 鋼の → Steel)
- `equipmentTypes`: Item types (短剣 → Dagger, 両手斧 → Two-Handed Axe)
- `garakuta`: Component parts for building junk names

## Docs Integration

Tools are embedded in the main docs site via MkDocs snippets:
- `/docs/tools/loot-finder.md` - `--8<-- "html/loot-finder.html"`
- `/docs/tools/blacksmith-simulator.md` - `--8<-- "html/blacksmithing-simulator.html"`
