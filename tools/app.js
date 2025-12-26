let equipmentIndex = {};
let allEquipment = [];

async function loadData() {
  try {
    const response = await fetch('equipment-en.json');
    const data = await response.json();
    buildIndex(data);
    render();
  } catch (err) {
    document.getElementById('results').innerHTML =
      '<div class="no-results">Failed to load equipment data. Make sure equipment-en.json exists.</div>';
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
            sources: []
          };
        }
        equipmentIndex[key].sources.push({
          garakuta: g.name,
          garakutaJp: g.nameJp,
          effectiveRate: (group.dropRate * equip.dropRate) / 100,
          quality: equip.quality,
          grade: equip.grade
        });
      });
    });
  });

  allEquipment = Object.values(equipmentIndex);
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

function generateProbTable(source) {
  const quality = source.quality;
  const grade = source.grade;
  const effectiveRate = source.effectiveRate;

  const activeStars = [];
  const activeGrades = [];

  for (let i = 1; i <= 5; i++) {
    if (quality['star' + i] !== null && quality['star' + i] > 0) activeStars.push(i);
    if (grade['g' + i] !== null && grade['g' + i] > 0) activeGrades.push(i);
  }

  if (activeStars.length === 0 || activeGrades.length === 0) return '';

  let html = '<table class="prob-table"><thead><tr><th></th>';
  for (const g of activeGrades) {
    html += `<th class="grade-col g${g}">G${g}</th>`;
  }
  html += '</tr></thead><tbody>';

  for (const s of activeStars) {
    html += `<tr><th class="star-label">★${s}</th>`;
    const starPct = quality['star' + s];
    for (const g of activeGrades) {
      const gradePct = grade['g' + g];
      const combinedPct = (effectiveRate * starPct * gradePct) / 10000;
      html += `<td class="g${g}">${combinedPct.toFixed(3)}%</td>`;
    }
    html += '</tr>';
  }

  html += '</tbody></table>';
  return html;
}

function hasQuality(source, minStar) {
  for (let i = minStar; i <= 5; i++) {
    if (source.quality['star' + i] !== null && source.quality['star' + i] > 0) return true;
  }
  return false;
}

function hasGrade(source, minGrade) {
  for (let i = minGrade; i <= 5; i++) {
    if (source.grade['g' + i] !== null && source.grade['g' + i] > 0) return true;
  }
  return false;
}

function filterEquipment() {
  const query = document.getElementById('search').value.toLowerCase().trim();
  const star4 = document.getElementById('filter-star4').checked;
  const star5 = document.getElementById('filter-star5').checked;
  const grade4 = document.getElementById('filter-grade4').checked;
  const grade5 = document.getElementById('filter-grade5').checked;

  return allEquipment.filter(eq => {
    if (query && !eq.name.toLowerCase().includes(query) && !eq.nameJp.includes(query)) {
      return false;
    }

    const validSources = eq.sources.filter(src => {
      if (star4 && !hasQuality(src, 4)) return false;
      if (star5 && !hasQuality(src, 5)) return false;
      if (grade4 && !hasGrade(src, 4)) return false;
      if (grade5 && !hasGrade(src, 5)) return false;
      return true;
    });

    return validSources.length > 0;
  }).map(eq => {
    const validSources = eq.sources.filter(src => {
      if (star4 && !hasQuality(src, 4)) return false;
      if (star5 && !hasQuality(src, 5)) return false;
      if (grade4 && !hasGrade(src, 4)) return false;
      if (grade5 && !hasGrade(src, 5)) return false;
      return true;
    });
    return { ...eq, sources: validSources };
  });
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
document.getElementById('filter-star4').addEventListener('change', render);
document.getElementById('filter-star5').addEventListener('change', render);
document.getElementById('filter-grade4').addEventListener('change', render);
document.getElementById('filter-grade5').addEventListener('change', render);

loadData();
