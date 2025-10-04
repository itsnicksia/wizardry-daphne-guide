function addFilterPlugin(table) {
  const thead = table.tHead;
  if (!thead) {
    return;
  }

  const tbody = table.tBodies[0];
  if (!tbody) {
    return;
  }

  const numCols = thead.rows[0].cells.length;
  const rows = Array.from(tbody.rows);

  const filterRow = document.createElement('tr');
  const filterContainer = createFilterInputContainer(numCols);
  const filterInput = createFilterInput();

  filterRow.appendChild(filterContainer);
  filterContainer.appendChild(filterInput);

  thead.insertBefore(filterRow, thead.firstElementChild);

  // Debounced version of updateRowVisibility
  const debouncedFilter = debounce(function () {
    const query = filterInput.value.trim().toLowerCase();
    updateRowVisibility(query, rows);
  }, 300); // 300ms debounce delay

  filterInput.addEventListener('input', debouncedFilter);
}

function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn.apply(this, args), delay);
  };
}

function createFilterInputContainer(colSpan) {
  const filterCell = document.createElement('th');
  filterCell.colSpan = colSpan;
  filterCell.style.padding = '4px';

  return filterCell;
}

function createFilterInput() {
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Filter table…';
  input.style.width = '100%';
  input.style.height = '1.6rem';
  input.style.fontSize = '0.7rem';
  input.style.padding = '6px';

  return input;
}

function updateRowVisibility(query, rows) {
  // Ensure query is trimmed and case-insensitive
  const regex = new RegExp(`(?<![\\w-])${query}(?![\\w-])`, 'i'); // Matches whole words only, case-insensitive

  rows.forEach(row => {
    const cells = row.cells;
    let hasMatchingCell = false;

    for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
      const cell = cells[cellIndex];
      const textContent = cell.textContent;

      // Test the regex pattern on the cell text content
      if (regex.test(textContent)) {
        hasMatchingCell = true;
        break;
      }
    }

    const hasQuery = query.length > 0;
    row.style.display = hasQuery && !hasMatchingCell ? 'none' : '';
  });
}
