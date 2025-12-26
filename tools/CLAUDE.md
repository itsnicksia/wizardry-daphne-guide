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

1. Run converter: `npm run convert`
2. New JP items are added to `dictionary.json` with empty values
3. Fill in English translations
4. Re-run converter

Dictionary sections:
- `equipment`: Direct item name mappings (青銅の短剣 → Bronze Dagger)
- `garakuta`: Component parts for building names (常なる → Steady, ガラクタ → Junk)

## Search Page

Open `index.html` via local server. Features:
- Text search (EN/JP equipment names)
- Quality filter (★4+, ★5 availability)
- Grade filter (G4+, G5 availability)
- Results sorted by effective drop rate
- Probability table showing combined chance for each quality/grade combination
- Groups aggregated per garakuta (probabilities summed across all groups)
- Grade colors: White (G1), Green (G2), Blue (G3), Purple (G4), Red (G5)
