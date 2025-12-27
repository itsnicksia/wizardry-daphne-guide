let equipmentIndex = {};
let allEquipment = [];
let allGarakuta = [];
let currentView = 'equipment-search';
let selectedGarakuta = null;
let lastSearchQuery = '';
let aggregateView = true;

async function loadData() {
  try {
    const response = await fetch('https://raw.githubusercontent.com/itsnicksia/wizardry-daphne-guide/refs/heads/main/tools/equipment-en.json');
    const data = await response.json();
    buildIndex(data);
    buildGarakutaIndex(data);
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

function buildGarakutaIndex(data) {
  allGarakuta = data.garakuta.map(g => {
    const groups = g.groups.map(group => {
      const equipment = group.equipment.map(equip => {
        const effectiveRate = (group.dropRate * equip.dropRate) / 100;
        const probMatrix = {};
        for (let s = 1; s <= 5; s++) {
          const starPct = equip.quality['star' + s] || 0;
          for (let gr = 1; gr <= 5; gr++) {
            const gradePct = equip.grade['g' + gr] || 0;
            probMatrix[`s${s}g${gr}`] = (effectiveRate * starPct * gradePct) / 10000;
          }
        }
        return {
          name: equip.name,
          nameJp: equip.nameJp,
          dropRate: equip.dropRate,
          effectiveRate,
          quality: equip.quality,
          grade: equip.grade,
          probMatrix
        };
      });
      return {
        groupNumber: group.groupNumber,
        dropRate: group.dropRate,
        equipment
      };
    });
    return {
      name: g.name,
      nameJp: g.nameJp,
      groups
    };
  });
  allGarakuta.sort((a, b) => a.name.localeCompare(b.name));
}

function buildAggregateEquipment(garakuta) {
  const equipMap = {};
  garakuta.groups.forEach(group => {
    group.equipment.forEach(equip => {
      if (!equipMap[equip.name]) {
        equipMap[equip.name] = {
          name: equip.name,
          nameJp: equip.nameJp,
          effectiveRate: 0,
          probMatrix: {}
        };
        for (let s = 1; s <= 5; s++) {
          for (let g = 1; g <= 5; g++) {
            equipMap[equip.name].probMatrix[`s${s}g${g}`] = 0;
          }
        }
      }
      equipMap[equip.name].effectiveRate += equip.effectiveRate;
      for (let s = 1; s <= 5; s++) {
        for (let g = 1; g <= 5; g++) {
          equipMap[equip.name].probMatrix[`s${s}g${g}`] += equip.probMatrix[`s${s}g${g}`];
        }
      }
    });
  });
  return Object.values(equipMap).sort((a, b) => b.effectiveRate - a.effectiveRate);
}

function toggleAggregateView() {
  aggregateView = !aggregateView;
  renderGarakutaDetail(selectedGarakuta);
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

function filterGarakuta() {
  const query = document.getElementById('search').value.toLowerCase().trim();
  if (!query) return allGarakuta;
  return allGarakuta.filter(g =>
    g.name.toLowerCase().includes(query) || g.nameJp.includes(query)
  );
}

function render() {
  switch (currentView) {
    case 'equipment-search':
      renderEquipmentResults(filterEquipment());
      break;
    case 'junk-search':
      renderGarakutaList(filterGarakuta());
      break;
    case 'junk-detail':
      renderGarakutaDetail(selectedGarakuta);
      break;
  }
}

function renderEquipmentResults(filtered) {
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

function renderGarakutaList(filtered) {
  const resultsEl = document.getElementById('results');
  const headerEl = document.getElementById('results-header');

  if (filtered.length === 0) {
    headerEl.textContent = '';
    resultsEl.innerHTML = '<div class="no-results">No junk items found matching your criteria.</div>';
    return;
  }

  const displayCount = Math.min(filtered.length, 50);
  headerEl.textContent = `Showing ${displayCount} of ${filtered.length} junk items`;

  resultsEl.innerHTML = filtered.slice(0, 50).map((g, index) => `
    <div class="junk-card" onclick="showGarakutaDetail(${index})">
      <div>
        <div class="junk-card-name">${g.name}</div>
        <div class="junk-card-name-jp">${g.nameJp}</div>
      </div>
      <div class="junk-card-arrow">→</div>
    </div>
  `).join('');
}

function showGarakutaDetail(index) {
  const filtered = filterGarakuta();
  selectedGarakuta = filtered[index];
  lastSearchQuery = document.getElementById('search').value;
  currentView = 'junk-detail';
  aggregateView = true;
  document.getElementById('search-box').style.display = 'none';
  render();
}

function hideGarakutaDetail() {
  currentView = 'junk-search';
  selectedGarakuta = null;
  document.getElementById('search-box').style.display = 'block';
  document.getElementById('search').value = lastSearchQuery;
  render();
}

function renderGarakutaDetail(garakuta) {
  const resultsEl = document.getElementById('results');
  const headerEl = document.getElementById('results-header');
  headerEl.textContent = '';

  if (!garakuta) {
    resultsEl.innerHTML = '<div class="no-results">Junk item not found.</div>';
    return;
  }

  const toggleBtnText = aggregateView ? 'Show by Group' : 'Show Combined';
  const toggleBtnClass = aggregateView ? 'aggregate-toggle active' : 'aggregate-toggle';

  let html = `
    <button class="back-button" onclick="hideGarakutaDetail()">← Back to Search</button>
    <div class="junk-detail-header">
      <div class="junk-detail-title-row">
        <div>
          <div class="junk-detail-name">${garakuta.name}</div>
          <div class="junk-detail-name-jp">${garakuta.nameJp}</div>
        </div>
        <button class="${toggleBtnClass}" onclick="toggleAggregateView()">${toggleBtnText}</button>
      </div>
    </div>
  `;

  if (aggregateView) {
    const aggregated = buildAggregateEquipment(garakuta);
    aggregated.forEach(equip => {
      html += `
        <div class="equipment-item" style="margin-left: 0;">
          <div class="equipment-item-header">
            <div class="equipment-item-name">
              ${equip.name}
              <span class="equipment-item-name-jp">${equip.nameJp}</span>
            </div>
            <div class="equipment-item-stats">
              <span class="effective-rate">Effective: ${equip.effectiveRate.toFixed(2)}%</span>
            </div>
          </div>
          ${generateProbTable(equip)}
        </div>
      `;
    });
  } else {
    garakuta.groups.forEach(group => {
      html += `
        <div class="group-section">
          <div class="group-header">
            <span class="group-title">Group ${group.groupNumber}</span>
            <span class="group-rate">${group.dropRate.toFixed(2)}% base drop rate</span>
          </div>
      `;

      group.equipment.forEach(equip => {
        html += `
          <div class="equipment-item">
            <div class="equipment-item-header">
              <div class="equipment-item-name">
                ${equip.name}
                <span class="equipment-item-name-jp">${equip.nameJp}</span>
              </div>
              <div class="equipment-item-stats">
                <span class="item-rate">Item: ${equip.dropRate.toFixed(2)}%</span>
                <span class="effective-rate">Effective: ${equip.effectiveRate.toFixed(2)}%</span>
              </div>
            </div>
            ${generateProbTable(equip)}
          </div>
        `;
      });

      html += '</div>';
    });
  }

  resultsEl.innerHTML = html;
}

function updatePlaceholder() {
  const searchInput = document.getElementById('search');
  if (currentView === 'equipment-search') {
    searchInput.placeholder = 'Search equipment (e.g., Bronze Dagger, 青銅の短剣)...';
  } else {
    searchInput.placeholder = 'Search junk (e.g., Beginner\'s Junk, はじまりのガラクタ)...';
  }
}

function updateActiveButton() {
  document.getElementById('mode-equipment').classList.toggle('active', currentView === 'equipment-search');
  document.getElementById('mode-junk').classList.toggle('active', currentView === 'junk-search' || currentView === 'junk-detail');
}

document.getElementById('mode-equipment').addEventListener('click', () => {
  if (currentView !== 'equipment-search') {
    currentView = 'equipment-search';
    selectedGarakuta = null;
    document.getElementById('search-box').style.display = 'block';
    document.getElementById('search').value = '';
    updatePlaceholder();
    updateActiveButton();
    render();
  }
});

document.getElementById('mode-junk').addEventListener('click', () => {
  if (currentView !== 'junk-search' && currentView !== 'junk-detail') {
    currentView = 'junk-search';
    selectedGarakuta = null;
    document.getElementById('search-box').style.display = 'block';
    document.getElementById('search').value = '';
    updatePlaceholder();
    updateActiveButton();
    render();
  }
});

let debounceTimer;
function debounceRender() {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(render, 200);
}

document.getElementById('search').addEventListener('input', debounceRender);

loadData();
