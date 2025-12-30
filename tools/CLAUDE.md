# CLAUDE.md

## Project Overview

Wizardry Variants Daphne tools - a multi-tool React app with:
- **Loot Finder**: Search equipment and find which junk items to farm, with drop rate probabilities
- **Equipment Enhancement (Beta)**: Look up blessing/alteration probabilities by equipment type

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
At enhancement milestones (+5, +10, +15, +20), equipment gains "blessing slots" for bonus stats:
- **Initial blessings**: When equipment drops from garakuta, blessings are assigned based on equipment-specific probability tables (different equipment types have different distributions)
- **Alteration stones**: When rerolling blessings with alteration stones, ALL stats have EQUAL probability
- Stats include: ATK%, MAG%, DEF%, MDEF%, ACC%, EVA%, RES%, DIV%, ASPD%, and flat versions + SUR

### Garakuta (Junk) System
- Monsters drop "garakuta" (junk items) instead of equipment directly
- Junk can be "reversed" at the shop to obtain equipment
- Each junk item has multiple "groups" with different drop rates
- Each group contains different equipment at various rates

## Commands

```bash
npm install              # Install dependencies
npm run dev              # Start dev server (http://localhost:5173)
npm run build            # Build to ../docs/html/
npm run convert          # Convert equipments.html → equipment-en.json
npm run convert-alteration  # Convert alternations.html → alteration-en.json
npm run test             # Run loot probability tests
npm run test:alteration  # Run alteration data tests
npm run test:alteration-stone  # Run alteration stone data tests
npm run lint             # Run ESLint
```

## Project Structure

```
tools/
├── src/
│   ├── main.tsx                 # Entry with HashRouter
│   ├── App.tsx                  # Routes: /loot-finder, /equipment-enhancement
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
│   └── enhancement-blessings/
│       ├── EnhancementBlessings.tsx
│       ├── enhancement-blessings.css # Scoped styles (ag- prefix)
│       ├── components/          # BestEquipmentFinder, AlterationLookup, etc.
│       └── utils/
│           └── buildAlterationIndex.ts  # Groups equipment by probability
├── scripts/
│   ├── convert-equipment.ts     # Loot data converter
│   ├── convert-alteration.ts    # Alteration data converter
│   ├── test-probabilities.ts    # Loot probability tests
│   ├── test-alteration.ts       # Alteration data tests
│   └── test-alteration-stone.ts # Alteration stone data tests
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
- `equipment-enhancement.html` → `#/equipment-enhancement`

These are embedded in MkDocs via snippets (`--8<-- "html/loot-finder.html"`).

### Asset Filenames and HTML Embeds

Vite generates content-hashed asset filenames (e.g., `index-CrCkm5R-.js`). After each build:
1. New asset files are created in `../docs/html/assets/`
2. `../docs/html/index.html` is auto-updated with new filenames
3. **Manual update required**: The embed HTML files (`loot-finder.html`, `equipment-enhancement.html`) must be updated to reference the new asset filenames
4. Delete old asset files to avoid bloat

### MkDocs Integration

- Each tool's markdown page (e.g., `docs/tools/equipment-enhancement.md`) provides the page title via `# Title`
- React components should NOT render their own `<h1>` headers to avoid duplicate titles
- The embed HTML files only contain: `<div id="root">`, script/css references, and hash routing

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

## Equipment Enhancement Concepts

**Important**: This tool shows probabilities for INITIAL blessings when equipment drops from garakuta. Alteration stone rerolls have equal probability for all stats.

- **Equipment Groups**: Items with identical probability distributions are grouped (e.g., all One-Handed Swords share the same rates). 383 items → 29 groups.
- **Enhancement Tiers**: +5, +10, +15, +20 blessing slots have different probability tables
- **Stat Types**:
  - Percentage stats (9): ATK%, MAG%, DIV%, ACC%, EVA%, RES%, DEF%, MDEF%, ASPD%
  - Flat stats for initial blessings (10): ATK, MAG, DIV, ACC, EVA, RES, DEF, MDEF, ASPD, SUR
  - Flat stats for alteration stones (9): Same but NO ASPD flat (only 18 total stats)
  - **Note**: The critical/surety stat is always called "SUR" (not "CRIT") in this codebase

### Tool Tabs
1. **Blessing Rates**: Ranks equipment groups by initial blessing probability for selected stats
2. **Blessing Values**: Shows blessing value ranges by equipment rank and quality (initial drop values)
3. **Full Alteration Stones**: Shows value distributions when using Full/Lesser Alteration Stones
4. **Find by Name**: Search equipment to view full probability table across all enhancement tiers

## Adding Translations

Dictionary sections:
- `equipment`: Direct mappings (青銅の短剣 → Bronze Dagger)
- `equipmentMaterials`: Prefixes (青銅の → Bronze)
- `equipmentTypes`: Suffixes (短剣 → Dagger)
- `garakuta`: Junk name parts

Run `npm run convert` - successfully translated items are auto-saved to dictionary.
