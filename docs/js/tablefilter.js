function addFilterDecorator(table) {
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
  const filterInput = createFilterInput()

  filterRow.appendChild(filterContainer);
  filterContainer.appendChild(filterInput);

  thead.insertBefore(filterRow, thead.firstElementChild);

  filterInput.addEventListener('input', function() {
    const query = this.value.trim().toLowerCase();
    updateRowVisibility(query, rows)
  })
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
  rows.forEach(row => {
    const cells = row.cells;
    let hasMatchingCell = false;
    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {

      const cell = cells[cellIndex];
      if (cell.innerText.toLowerCase().indexOf(query) === 0) {
        hasMatchingCell = true;
        break;
      }
    }

    row.style.display = hasMatchingCell ? row.style.display : 'none';
  });
}
