import * as fs from 'fs';
import * as cheerio from 'cheerio';
import type { AlterationData, AlterationEquipment, AlterationTier, AlterationStatRates, AlterationStatType, TierNumber } from '../src/types/alteration';
import type { Dictionary } from '../src/types/dictionary';

const html = fs.readFileSync('data/alternations.html', 'utf8');
const dictionary: Dictionary = JSON.parse(fs.readFileSync('data/dictionary.json', 'utf8'));

const $ = cheerio.load(html);

const STAT_COLUMNS: AlterationStatType[] = [
    'ATK%', 'MAG%', 'DIV%', 'ACC%', 'EVA%', 'RES%', 'DEF%', 'MDEF%', 'ASPD%',
    'ATK', 'MAG', 'DIV', 'ACC', 'EVA', 'RES', 'DEF', 'MDEF', 'CRIT', 'ASPD'
];

function translateEquipment(jpName: string): string {
    if (dictionary.equipment[jpName]) {
        return dictionary.equipment[jpName];
    }

    const materials = dictionary.equipmentMaterials || {};
    const types = dictionary.equipmentTypes || {};

    const sortedMaterials = Object.keys(materials).sort((a, b) => b.length - a.length);
    const sortedTypes = Object.keys(types).sort((a, b) => b.length - a.length);

    let material = '';
    let remaining = jpName;

    for (const jp of sortedMaterials) {
        if (remaining.startsWith(jp)) {
            material = materials[jp];
            remaining = remaining.slice(jp.length);
            break;
        }
    }

    let itemType = '';
    for (const jp of sortedTypes) {
        if (remaining === jp || remaining.endsWith(jp)) {
            itemType = types[jp];
            break;
        }
    }

    if (material && itemType) {
        const translated = `${material} ${itemType}`;
        dictionary.equipment[jpName] = translated;
        return translated;
    }

    dictionary.equipment[jpName] = '';
    return jpName;
}

function parseRate(text: string | undefined): number | null {
    if (!text || text === '-') return null;
    const match = text.match(/([\d.]+)%/);
    return match ? parseFloat(match[1]) : null;
}

const result: AlterationData = { equipment: [] };
const newDictionaryEntries: string[] = [];

const tables = $('table');
const equipmentTable = tables.eq(1);

let currentEquipment: AlterationEquipment | null = null;

equipmentTable.find('tbody tr').each((_, row) => {
    const cells = $(row).find('td');
    const cellTexts = cells.map((__, c) => $(c).text().trim()).get();

    if (cellTexts.length === 0) return;

    const firstCell = cells.first();
    const rowspan = parseInt(firstCell.attr('rowspan') || '0');

    let tierIdx: number;
    let statsStartIdx: number;

    if (rowspan === 4) {
        const jpName = cellTexts[0];
        const enName = translateEquipment(jpName);

        if (enName === jpName && !dictionary.equipment[jpName]) {
            newDictionaryEntries.push(jpName);
        }

        currentEquipment = {
            name: enName,
            nameJp: jpName,
            tiers: []
        };
        result.equipment.push(currentEquipment);

        tierIdx = 1;
        statsStartIdx = 2;
    } else {
        tierIdx = 0;
        statsStartIdx = 1;
    }

    if (!currentEquipment) return;

    const tierNum = parseInt(cellTexts[tierIdx]) as TierNumber;

    const stats: AlterationStatRates = {} as AlterationStatRates;
    for (let i = 0; i < STAT_COLUMNS.length; i++) {
        stats[STAT_COLUMNS[i]] = parseRate(cellTexts[statsStartIdx + i]);
    }

    const tier: AlterationTier = {
        tier: tierNum,
        stats
    };

    currentEquipment.tiers.push(tier);
});

fs.writeFileSync('data/alteration-en.json', JSON.stringify(result, null, 2));
console.log(`Converted ${result.equipment.length} equipment items to data/alteration-en.json`);

if (newDictionaryEntries.length > 0) {
    fs.writeFileSync('data/dictionary.json', JSON.stringify(dictionary, null, 2));
    console.log(`Added ${newDictionaryEntries.length} new entries to data/dictionary.json:`);
    newDictionaryEntries.forEach((e) => console.log(`  - ${e}`));
}
