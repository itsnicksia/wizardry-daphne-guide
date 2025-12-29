import * as fs from 'fs';
import * as cheerio from 'cheerio';
import type { EquipmentData, Garakuta, EquipmentGroup, Equipment, QualityRates, GradeRates } from '../src/types/equipment';
import type { Dictionary } from '../src/types/dictionary';

const html = fs.readFileSync('data/equipments.html', 'utf8');
const dictionary: Dictionary = JSON.parse(fs.readFileSync('data/dictionary.json', 'utf8'));

const $ = cheerio.load(html);

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

function translateGarakuta(jpName: string): string {
    let translated = jpName;
    const sortedKeys = Object.keys(dictionary.garakuta).sort((a, b) => b.length - a.length);
    for (const jp of sortedKeys) {
        if (translated.includes(jp)) {
            translated = translated.replace(jp, dictionary.garakuta[jp] + ' ');
        }
    }
    return translated.trim().replace(/\s+/g, ' ');
}

function parseRate(text: string | undefined): number | null {
    if (!text || text === '-') return null;
    const match = text.match(/([\d.]+)%/);
    return match ? parseFloat(match[1]) : null;
}

const result: EquipmentData = { garakuta: [] };
let currentGarakuta: Garakuta | null = null;
const newDictionaryEntries: string[] = [];

$('h2, table').each((_, el) => {
    if (el.type === 'tag' && el.name === 'h2') {
        const jpName = $(el).text().trim();
        currentGarakuta = {
            name: translateGarakuta(jpName),
            nameJp: jpName,
            groups: [],
        };
        result.garakuta.push(currentGarakuta);
    } else if (el.type === 'tag' && el.name === 'table' && currentGarakuta) {
        const rows = $(el).find('tbody tr');
        let currentGroup: EquipmentGroup | null = null;

        rows.each((_, row) => {
            const cells = $(row).find('td');
            const cellTexts = cells.map((_, c) => $(c).text().trim()).get();

            if (cellTexts.length === 0) return;

            let offset = 0;
            const firstCell = cells.first();
            const rowspan = parseInt(firstCell.attr('rowspan') || '0');

            if (rowspan > 0) {
                currentGroup = {
                    groupNumber: parseInt(cellTexts[0]),
                    dropRate: parseRate(cellTexts[1]) ?? 0,
                    equipment: [],
                };
                currentGarakuta!.groups.push(currentGroup);
                offset = 2;
            }

            if (!currentGroup) return;

            const equipIdx = offset;
            const rateIdx = offset + 1;
            const qualityStart = offset + 2;
            const gradeStart = offset + 7;

            const jpEquipName = cellTexts[equipIdx];
            if (!jpEquipName) return;

            const enName = translateEquipment(jpEquipName);
            if (enName === jpEquipName && !dictionary.equipment[jpEquipName]) {
                newDictionaryEntries.push(jpEquipName);
            }

            const quality: QualityRates = {
                star1: parseRate(cellTexts[qualityStart]),
                star2: parseRate(cellTexts[qualityStart + 1]),
                star3: parseRate(cellTexts[qualityStart + 2]),
                star4: parseRate(cellTexts[qualityStart + 3]),
                star5: parseRate(cellTexts[qualityStart + 4]),
            };

            const grade: GradeRates = {
                g1: parseRate(cellTexts[gradeStart]),
                g2: parseRate(cellTexts[gradeStart + 1]),
                g3: parseRate(cellTexts[gradeStart + 2]),
                g4: parseRate(cellTexts[gradeStart + 3]),
                g5: parseRate(cellTexts[gradeStart + 4]),
            };

            const equipment: Equipment = {
                name: enName,
                nameJp: jpEquipName,
                dropRate: parseRate(cellTexts[rateIdx]) ?? 0,
                quality,
                grade,
            };

            currentGroup.equipment.push(equipment);
        });
    }
});

fs.writeFileSync('data/equipment-en.json', JSON.stringify(result, null, 2));
console.log(`Converted ${result.garakuta.length} garakuta types to data/equipment-en.json`);

if (newDictionaryEntries.length > 0) {
    fs.writeFileSync('data/dictionary.json', JSON.stringify(dictionary, null, 2));
    console.log(`Added ${newDictionaryEntries.length} new entries to data/dictionary.json:`);
    newDictionaryEntries.forEach((e) => console.log(`  - ${e}`));
}
