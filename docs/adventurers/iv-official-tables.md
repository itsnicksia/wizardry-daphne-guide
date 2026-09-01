# IV Official Tables

Look up the IV drop rates for any Adventurer from Drecom's official tables.

* Search by name, filter by category, or browse the full list.
* IV values are highlighted for ease of reading.
* Drop rates can also be sorted by clicking on the column header text.
* Note that some Adventurers have "hidden" IVs that can only be viewed at Level 1 in the Class Change screen in the Guild.

<div class="iv-tabs" role="tablist" id="iv-tabs"></div>

<div class="iv-field-row">
  <label class="iv-field-label" for="iv-search">Adventurer Name</label>
  <div class="iv-mode-toggle" id="iv-mode-toggle" role="radiogroup" aria-label="Lookup mode">
    <label class="iv-mode-option"><input type="radio" name="iv-mode" value="search" checked> Search</label>
    <label class="iv-mode-option"><input type="radio" name="iv-mode" value="list"> List</label>
  </div>
</div>

<div id="iv-search-mode">
  <div class="iv-search-input-wrap">
    <input type="text" id="iv-search" placeholder="Start typing a name...">
    <button type="button" id="iv-clear-search" aria-label="Clear" hidden>&times;</button>
  </div>
</div>

<div id="iv-name-list" class="iv-name-list"></div>

<div id="iv-result">
  <div class="iv-result-empty">No Adventurer selected</div>
</div>
