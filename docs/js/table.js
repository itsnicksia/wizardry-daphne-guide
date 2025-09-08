/*
document$.subscribe(function() {
    var tables = document.querySelectorAll("article table:not([class])")
    tables.forEach(function(table) {
      new Tablesort(table);
      addFilterPlugin(table);
    })
  })
*/
document$.subscribe(function() {
    var tables = document.querySelectorAll("article table:not([class])");
    tables.forEach(function(table) {
      // Only apply plugins if this table is NOT inside a .color-table container
      if (!table.closest('.nosort-table')) {
        new Tablesort(table);
      }
      if (!table.closest('.nofilter-table')) {
        addFilterPlugin(table);
      }
    });
});
