const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('equipments.html', 'utf8');
const dictionary = JSON.parse(fs.readFileSync('dictionary.json', 'utf8'));

const $ = cheerio.load(html);

function translateEquipment(jpName) {
  if (dictionary.equipment[jpName]) {
    return dictionary.equipment[jpName];
  }
  dictionary.equipment[jpName] = '';
  return jpName;
}

function translateGarakuta(jpName) {
  let translated = jpName;
  const sortedKeys = Object.keys(dictionary.garakuta).sort((a, b) => b.length - a.length);
  for (const jp of sortedKeys) {
    if (translated.includes(jp)) {
      translated = translated.replace(jp, dictionary.garakuta[jp] + ' ');
    }
  }
  return translated.trim().replace(/\s+/g, ' ');
}

function parseRate(text) {
  if (!text || text === '-') return null;
  const match = text.match(/([\d.]+)%/);
  return match ? parseFloat(match[1]) : null;
}

const result = { garakuta: [] };
let currentGarakuta = null;
let newDictionaryEntries = [];

$('h2, table').each((_, el) => {
  if (el.tagName === 'h2') {
    const jpName = $(el).text().trim();
    currentGarakuta = {
      name: translateGarakuta(jpName),
      nameJp: jpName,
      groups: []
    };
    result.garakuta.push(currentGarakuta);
  } else if (el.tagName === 'table' && currentGarakuta) {
    const rows = $(el).find('tbody tr');
    let currentGroup = null;

    rows.each((_, row) => {
      const cells = $(row).find('td');
      const cellTexts = cells.map((_, c) => $(c).text().trim()).get();

      if (cellTexts.length === 0) return;

      let offset = 0;
      const firstCell = cells.first();
      const rowspan = parseInt(firstCell.attr('rowspan')) || 0;

      if (rowspan > 0) {
        currentGroup = {
          groupNumber: parseInt(cellTexts[0]),
          dropRate: parseRate(cellTexts[1]),
          equipment: []
        };
        currentGarakuta.groups.push(currentGroup);
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

      const equipment = {
        name: enName,
        nameJp: jpEquipName,
        dropRate: parseRate(cellTexts[rateIdx]),
        quality: {
          star1: parseRate(cellTexts[qualityStart]),
          star2: parseRate(cellTexts[qualityStart + 1]),
          star3: parseRate(cellTexts[qualityStart + 2]),
          star4: parseRate(cellTexts[qualityStart + 3]),
          star5: parseRate(cellTexts[qualityStart + 4])
        },
        grade: {
          g1: parseRate(cellTexts[gradeStart]),
          g2: parseRate(cellTexts[gradeStart + 1]),
          g3: parseRate(cellTexts[gradeStart + 2]),
          g4: parseRate(cellTexts[gradeStart + 3]),
          g5: parseRate(cellTexts[gradeStart + 4])
        }
      };

      currentGroup.equipment.push(equipment);
    });
  }
});

fs.writeFileSync('equipment-en.json', JSON.stringify(result, null, 2));
console.log(`Converted ${result.garakuta.length} garakuta types to equipment-en.json`);

if (newDictionaryEntries.length > 0) {
  fs.writeFileSync('dictionary.json', JSON.stringify(dictionary, null, 2));
  console.log(`Added ${newDictionaryEntries.length} new entries to dictionary.json:`);
  newDictionaryEntries.forEach(e => console.log(`  - ${e}`));
}
