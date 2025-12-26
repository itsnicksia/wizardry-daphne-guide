# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Wizardry: Daphne equipment drop rate tool. Converts Japanese HTML loot tables to English JSON and provides a searchable web interface for finding which garakuta (junk items) to farm for specific equipment.

## Commands

```bash
npm install          # Install cheerio dependency
npm run convert      # Convert equipments.html → equipment-en.json
npx serve .          # Start local server for index.html
```

## Data Pipeline

```
equipments.html (JP) → convert-equipment.js → equipment-en.json
                              ↑
                       dictionary.json (JP→EN)
```

## Key Files

| File | Description |
|------|-------------|
| `equipments.html` | Source Japanese HTML (~8MB, 622 garakuta types) |
| `dictionary.json` | JP→EN translations (equipment + garakuta components) |
| `convert-equipment.js` | Node.js converter using cheerio |
| `equipment-en.json` | Output JSON (383 unique equipment, 622 garakuta) |
| `equipment-en.schema.json` | JSON Schema for output format |
| `index.html` | Search/filter web page |
| `styles.css` | Page styles (matches docs color scheme) |
| `app.js` | Search/filter JavaScript logic |

## Game Concepts

- **Garakuta (ガラクタ)**: Junk items that can be "reversed" into equipment
- **Groups**: Each garakuta has numbered groups with different drop rates
- **Quality (★1-5)**: Star rating affecting equipment stats
- **Grade (1-5)**: Additional tier affecting equipment power
- **Drop flow**: Garakuta → Group (by %) → Equipment (by %) → Quality/Grade (by %)

## Effective Drop Rate

To find an item from a garakuta:
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
- `garakuta`: Component parts for building junk names (常なる → Steady, ガラクタ → Junk)

To add new translations:
1. Run `npm run convert` - new items auto-translate if keywords match
2. For unique items, add to `equipment` section manually
3. For new materials/types, add to respective keyword sections

## Search Page

Open `index.html` via local server. Features:
- Text search (EN/JP equipment names)
- Results sorted by effective drop rate
- Probability table showing combined chance for each quality/grade combination
- Groups aggregated per garakuta (probabilities summed across all groups)
- Row/column totals for quality and grade probabilities
- Grade colors: White (G1), Green (G2), Blue (G3), Purple (G4), Red (G5)

## Docs Integration

The loot finder is embedded in the main docs site:
- `/docs/tools/loot-finder.md` - MkDocs page
- `/docs/html/loot-finder.html` - Self-contained HTML component (CSS prefixed with `lf-`)
