/* 
Version below lets you selectively disable sorting and filtering on any table by enclosing
the table in a <div> block with a class label of either nosort-table or nofilter-table. The 
attr-list plugin lets you designate the contents of the div block as markdown so that
mkdocs will render the content normally. 
e.g., the following will render as a normal markdown table without the filter or sort javascripts
being applied to them:

<div class = "nofilter-table nosort-table" markdown>
|table | header | data |
|:---- | :----- | :--- |
|table | body | data |
</div>
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
