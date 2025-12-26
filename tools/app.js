let equipmentIndex = {};
let allEquipment = [];

async function loadData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/itsnicksia/wizardry-daphne-guide/refs/heads/main/tools/equipment-en.json');
    const data = await response.json();
    buildIndex(data);
    render();
  } catch (err) {
    document.getElementById('results').innerHTML =
      '<div class="no-results">Failed to load equipment data.</div>';
  }
}

function buildIndex(data) {
  equipmentIndex = {};
  data.garakuta.forEach(g => {
    g.groups.forEach(group => {
      group.equipment.forEach(equip => {
        const key = equip.name;
        if (!equipmentIndex[key]) {
          equipmentIndex[key] = {
            name: equip.name,
            nameJp: equip.nameJp,
            sources: {}
          };
        }
        const garakutaKey = g.name;
        if (!equipmentIndex[key].sources[garakutaKey]) {
          equipmentIndex[key].sources[garakutaKey] = {
            garakuta: g.name,
            garakutaJp: g.nameJp,
            effectiveRate: 0,
            probMatrix: {}
          };
          for (let s = 1; s <= 5; s++) {
            for (let gr = 1; gr <= 5; gr++) {
              equipmentIndex[key].sources[garakutaKey].probMatrix[`s${s}g${gr}`] = 0;
            }
          }
        }
        const src = equipmentIndex[key].sources[garakutaKey];
        const effectiveRate = (group.dropRate * equip.dropRate) / 100;
        src.effectiveRate += effectiveRate;
        for (let s = 1; s <= 5; s++) {
          const starPct = equip.quality['star' + s] || 0;
          for (let gr = 1; gr <= 5; gr++) {
            const gradePct = equip.grade['g' + gr] || 0;
            const combinedPct = (effectiveRate * starPct * gradePct) / 10000;
            src.probMatrix[`s${s}g${gr}`] += combinedPct;
          }
        }
      });
    });
  });

  allEquipment = Object.values(equipmentIndex).map(eq => ({
    name: eq.name,
    nameJp: eq.nameJp,
    sources: Object.values(eq.sources)
  }));
  allEquipment.forEach(eq => {
    eq.sources.sort((a, b) => b.effectiveRate - a.effectiveRate);
  });
  allEquipment.sort((a, b) => a.name.localeCompare(b.name));
}

function getTierRange(obj, prefix, count) {
  const available = [];
  for (let i = 1; i <= count; i++) {
    const key = prefix + i;
    if (obj[key] !== null && obj[key] > 0) available.push(i);
  }
  if (available.length === 0) return '-';
  if (available.length === 1) return prefix === 'star' ? `★${available[0]}` : `G${available[0]}`;
  return prefix === 'star'
    ? `★${available[0]}-${available[available.length - 1]}`
    : `G${available[0]}-${available[available.length - 1]}`;
}

const gradeNames = ['White', 'Green', 'Blue', 'Purple', 'Red'];

function generateProbTable(source) {
  const probMatrix = source.probMatrix;

  const activeStars = [];
  for (let s = 1; s <= 5; s++) {
    let hasProb = false;
    for (let g = 1; g <= 5; g++) {
      if (probMatrix[`s${s}g${g}`] > 0) {
        hasProb = true;
        break;
      }
    }
    if (hasProb) activeStars.push(s);
  }

  if (activeStars.length === 0) return '';

  const gradeTotals = [0, 0, 0, 0, 0];
  const starTotals = {};
  for (const s of activeStars) starTotals[s] = 0;

  for (const s of activeStars) {
    for (let g = 1; g <= 5; g++) {
      const val = probMatrix[`s${s}g${g}`];
      gradeTotals[g - 1] += val;
      starTotals[s] += val;
    }
  }

  let html = '<table class="prob-table"><thead><tr><th></th>';
  for (let g = 1; g <= 5; g++) {
    html += `<th class="grade-col g${g}">${gradeNames[g - 1]}</th>`;
  }
  html += '<th class="total-col">Total</th></tr></thead><tbody>';

  for (const s of activeStars) {
    html += `<tr><th class="star-label">★${s}</th>`;
    for (let g = 1; g <= 5; g++) {
      const combinedPct = probMatrix[`s${s}g${g}`];
      if (combinedPct === 0) {
        html += `<td class="g${g}">-</td>`;
      } else {
        html += `<td class="g${g}">${combinedPct.toFixed(3)}%</td>`;
      }
    }
    html += `<td class="total-cell">${starTotals[s].toFixed(3)}%</td></tr>`;
  }

  html += '<tr class="total-row"><th class="total-label">Total</th>';
  for (let g = 1; g <= 5; g++) {
    if (gradeTotals[g - 1] === 0) {
      html += `<td class="g${g}">-</td>`;
    } else {
      html += `<td class="g${g}">${gradeTotals[g - 1].toFixed(3)}%</td>`;
    }
  }
  html += '<td class="total-cell"></td></tr>';

  html += '</tbody></table>';
  return `<div class="prob-toggle" onclick="this.classList.toggle('expanded');this.nextElementSibling.classList.toggle('expanded')">Probability Table</div><div class="prob-content">${html}</div>`;
}

function filterEquipment() {
  const query = document.getElementById('search').value.toLowerCase().trim();
  if (!query) return allEquipment;
  return allEquipment.filter(eq =>
    eq.name.toLowerCase().includes(query) || eq.nameJp.includes(query)
  );
}

function render() {
  const filtered = filterEquipment();
  const resultsEl = document.getElementById('results');
  const headerEl = document.getElementById('results-header');

  if (filtered.length === 0) {
    headerEl.textContent = '';
    resultsEl.innerHTML = '<div class="no-results">No equipment found matching your criteria.</div>';
    return;
  }

  const displayCount = Math.min(filtered.length, 50);
  headerEl.textContent = `Showing ${displayCount} of ${filtered.length} equipment items`;

  resultsEl.innerHTML = filtered.slice(0, 50).map(eq => `
    <div class="equipment-card">
      <div class="equipment-name">${eq.name}</div>
      <div class="equipment-name-jp">${eq.nameJp}</div>
      <ul class="sources-list">
        ${eq.sources.slice(0, 10).map(src => `
          <li class="source-item">
            <div class="source-header">
              <div class="source-name">
                ${src.garakuta}
                <span class="source-name-jp">${src.garakutaJp}</span>
              </div>
              <div class="source-stats">
                <span class="drop-rate">Base: ${src.effectiveRate.toFixed(2)}%</span>
              </div>
            </div>
            ${generateProbTable(src)}
          </li>
        `).join('')}
        ${eq.sources.length > 10 ? `<li class="source-item" style="justify-content: center; color: #888;">...and ${eq.sources.length - 10} more sources</li>` : ''}
      </ul>
    </div>
  `).join('');
}

let debounceTimer;
function debounceRender() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(render, 200);
}

document.getElementById('search').addEventListener('input', debounceRender);

loadData();
