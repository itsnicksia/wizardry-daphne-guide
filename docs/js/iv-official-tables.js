const IV_TABLES_CSV_URL = "/data/iv-official-tables.csv";
const IV_TRAITS = ["STR", "IQ", "PIE", "VIT", "DEX", "SPD", "LCK"];
const IV_COLS = ["Pattern", "Trait", "Drop Rate", "STR", "IQ", "PIE", "VIT", "DEX", "SPD", "LCK"];
const IV_TABS = ["All", "Legendary", "General", "Anonymous"];

document$.subscribe(() => {
  const tabsEl = document.getElementById('iv-tabs');
  if (!tabsEl) {
    return;
  }

  const modeToggleEl = document.getElementById('iv-mode-toggle');
  const searchModeEl = document.getElementById('iv-search-mode');
  const searchEl = document.getElementById('iv-search');
  const clearSearchEl = document.getElementById('iv-clear-search');
  const nameListEl = document.getElementById('iv-name-list');
  const resultEl = document.getElementById('iv-result');

  let DATA = [];
  let activeTab = 'All';
  let activeMode = 'search';
  let currentUnit = null;
  let dropRateSort = 'none';

  function renderTabs() {
    tabsEl.innerHTML = IV_TABS.map(t =>
      '<button type="button" class="iv-tab" role="tab" aria-selected="' + (t === activeTab) + '" data-tab="' + t + '">' + t + '</button>'
    ).join('');
    tabsEl.querySelectorAll('.iv-tab').forEach(b => b.addEventListener('click', () => {
      activeTab = b.dataset.tab;
      searchEl.value = '';
      renderTabs();
      renderNameList();
      renderResult(null);
    }));
  }

  function filteredUnits() {
    const byCat = activeTab === 'All' ? DATA : DATA.filter(u => u.cat === activeTab);
    return byCat.slice().sort((a, b) => a.name.localeCompare(b.name));
  }

  function renderNameList() {
    let units = filteredUnits();
    let emptyMessage = '';
    if (activeMode === 'search') {
      const q = searchEl.value.trim().toLowerCase();
      units = q ? units.filter(u => u.name.toLowerCase().includes(q)) : [];
      emptyMessage = q ? 'No matches' : '';
    } else {
      emptyMessage = 'No adventurers in this category';
    }
    if (!units.length) {
      nameListEl.innerHTML = emptyMessage ? '<div class="iv-name-empty">' + emptyMessage + '</div>' : '';
    } else {
      nameListEl.innerHTML = units.map(u => '<div class="iv-name-row" data-name="' + u.name + '">' + u.name + '</div>').join('');
    }
    nameListEl.querySelectorAll('.iv-name-row').forEach(row => row.addEventListener('click', () => {
      const unit = DATA.find(u => u.name === row.dataset.name);
      renderResult(unit || null);
    }));
    clearSearchEl.hidden = !searchEl.value;
  }

  function setMode(mode) {
    activeMode = mode;
    searchModeEl.hidden = mode !== 'search';
    if (mode === 'search') searchEl.value = '';
    renderNameList();
    renderResult(null);
  }

  function leadingNum(part) {
    const m = part.match(/^(\d+)/);
    return m ? m[1] : part.trim();
  }

  function statCellHtml(value, neutralValue, isIvSlot) {
    const parts = value.split(' | ');
    const neutralNums = neutralValue.split(' | ').map(leadingNum);
    if (parts.length === 1) {
      const highlight = isIvSlot && !neutralNums.includes(leadingNum(parts[0]));
      return highlight ? '<span class="iv-highlight">' + parts[0] + '</span>' : parts[0];
    }
    return parts.map(p => {
      const highlight = isIvSlot && !neutralNums.includes(leadingNum(p));
      return '<span class="iv-split-line' + (highlight ? ' iv-highlight' : '') + '">' + p + '</span>';
    }).join('');
  }

  function sortIndicator() {
    if (dropRateSort === 'desc') return '<span class="iv-sort-icon iv-sort-icon-active">&#9660;</span>';
    if (dropRateSort === 'asc') return '<span class="iv-sort-icon iv-sort-icon-active">&#9650;</span>';
    return '<span class="iv-sort-icon">&#9660;</span>';
  }

  function renderResult(unit) {
    currentUnit = unit;
    dropRateSort = 'none';
    resultEl.classList.toggle('has-unit', !!unit);
    if (!unit) {
      resultEl.innerHTML = '<div class="iv-result-empty">No Adventurer selected</div>';
      return;
    }
    renderResultTable();
  }

  function renderResultTable() {
    const unit = currentUnit;
    const neutralRow = unit.rows[7];
    let rowData = unit.rows.map((r, i) => {
      const traitLabel = i < 7 ? IV_TRAITS[i] : 'Neutral';
      const statCells = r.slice(2).map((v, statIdx) => {
        const isIvSlot = i < 7 && statIdx === i;
        return '<td>' + statCellHtml(v, neutralRow[2 + statIdx], isIvSlot) + '</td>';
      }).join('');
      return { pattern: r[0], traitLabel, dropRate: r[1], dropRateNum: parseFloat(r[1]), statCells };
    });
    if (dropRateSort === 'desc') rowData = rowData.slice().sort((a, b) => b.dropRateNum - a.dropRateNum);
    else if (dropRateSort === 'asc') rowData = rowData.slice().sort((a, b) => a.dropRateNum - b.dropRateNum);

    const rowsHtml = rowData.map(row =>
      '<tr><td>' + row.pattern + '</td><td>' + row.traitLabel + '</td><td>' + row.dropRate + '</td>' + row.statCells + '</tr>'
    ).join('');

    const headerCells = IV_COLS.map(c => {
      if (c === 'Drop Rate') {
        return '<th class="iv-sortable-th" id="iv-drop-rate-th">Drop Rate ' + sortIndicator() + '</th>';
      }
      return '<th>' + c + '</th>';
    }).join('');

    resultEl.innerHTML =
      '<div class="iv-result-header">' +
        '<span class="iv-result-name">' + unit.name + '</span>' +
        '<span class="iv-pill iv-pill-' + unit.cat.toLowerCase() + '">' + unit.cat + '</span>' +
      '</div>' +
      '<div class="iv-table-scroll"><table class="iv-table"><thead><tr>' +
        headerCells +
      '</tr></thead><tbody>' + rowsHtml + '</tbody></table></div>';

    document.getElementById('iv-drop-rate-th').addEventListener('click', () => {
      dropRateSort = dropRateSort === 'none' ? 'desc' : dropRateSort === 'desc' ? 'asc' : 'none';
      renderResultTable();
    });
  }

  function groupByAdventurer(rows) {
    const map = new Map();
    const order = [];
    rows.forEach(r => {
      const name = r['Adventurer'];
      if (!name) return;
      if (!map.has(name)) {
        map.set(name, { name, cat: r['Category'], rows: [] });
        order.push(name);
      }
      map.get(name).rows.push([
        r['Pattern'], r['Drop Rate'], r['Strength'], r['IQ'],
        r['Piety'], r['Vitality'], r['Dexterity'], r['Speed'], r['Luck']
      ]);
    });
    return order.map(n => map.get(n));
  }

  modeToggleEl.querySelectorAll('input[name="iv-mode"]').forEach(r => r.addEventListener('change', () => setMode(r.value)));
  searchEl.addEventListener('input', renderNameList);
  clearSearchEl.addEventListener('click', () => {
    searchEl.value = '';
    searchEl.focus();
    renderNameList();
    renderResult(null);
  });

  resultEl.innerHTML = '<div class="iv-result-empty">Loading Adventurer data&hellip;</div>';

  Papa.parse(IV_TABLES_CSV_URL, {
    download: true,
    header: true,
    skipEmptyLines: true,
    complete: (results) => {
      DATA = groupByAdventurer(results.data);
      renderTabs();
      setMode('search');
    },
    error: () => {
      resultEl.innerHTML = '<div class="iv-result-empty">Could not load Adventurer data. Please refresh the page.</div>';
    }
  });
});
