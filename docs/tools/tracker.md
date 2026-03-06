<div id="tracker-page">

  <div id="tracker-readme-container">
    <div id="tracker-readme-label">READ ME</div>
    <button id="tracker-readme-button" type="button" aria-label="READ ME">
    <span class="tracker-readme-art" aria-hidden="true"></span>
    </button>
  </div>

  <!-- Instructions for users -->
  <div id="tracker-container">
    <ul>
      <li>The tracker gets regular updates, for some browsers you need to hard-refresh (CTRL-F5) to ensure the underlying JavaScript gets refreshed.</li>
      <li>Click an entry name to view its image (if it has one).</li>
      <li>Click “Collect” to record it, “Update” to overwrite, or “⟲” to undo.</li>
      <li>Transfer acquisition status between devices with the Export code.</li>
      <li>You can now create new tabs (based on the default tab template), rename tabs and any text element via edit mode using the edit icon, hide and restore hidden items with “Show Hidden” then re-enable them and collapse headers or subheaders using the down arrow on their far right.</li>
      <li>Respawn interval noted in item text if known. <em>Times are approximate</em>. E.g., "monthly" items have reset as early as 24 days, and weekly items have taken as many as 10 days.</li>
      <li>Note: Abyss maps can vary sections shifted or swapped. Items shift as well but will remain in the same relative location. If (x,y) location doesn't match your map, refer to the Abyss Dungeon Maps to see variations.</li>
    </ul>

    <!-- Sync UI -->
    <div id="sync-container"></div>

    <!-- Main tracker table -->
    <table id="tracker" class="no-sort">
      <colgroup>
        <col style="width: 70%;">
        <col style="width: 18%;">
        <col style="width: 12%;">
      </colgroup>
      <thead>
        <tr>
          <th>Entry</th>
          <th>Last Collected</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>

  <!-- Image modal (entry images) -->
  <div id="modal">
    <div class="modal-content">
      <span class="modal-close">×</span>
      <div id="modal-image"></div>
    </div>
  </div>

  <!-- READ ME modal (separate from image modal) -->
  <div id="tracker-readme-modal">
    <div id="tracker-readme-box">
      <span id="tracker-readme-close">×</span>
      <div id="tracker-readme-content"></div>
    </div>
  </div>

</div>

<!-- Scripts -->
<script src="/js/sections.js"></script>
<script src="/js/tracker.js"></script>
<script src="/js/readme.js"></script>
<!--
==========================================
INSTRUCTION MANUAL
==========================================
This guide explains how to extend and maintain the tracker.

TABLE OF CONTENTS
1) How data is stored
2) How to add a new SECTION
3) How to add a new SUBSECTION header
4) How to add a new ITEM (entry) with/without image
5) How to enable reset timers for an item
6) How to test and verify your additions
7) How to migrate or share your progress
8) Common troubleshooting tips

------------------------------------------
1) HOW DATA IS STORED
------------------------------------------
- Progress is saved in the browser's localStorage under the key:
    STORAGE_KEY = 'respawn_acquisition_data'
- The data shape is a JSON object:
    {
      "<item.id>": <timestamp_ms_of_last_collect>,
      ...
    }
- Deleting an entry's key "uncollects" it.
- This is per browser and per device storage.

------------------------------------------
2) HOW TO ADD A NEW SECTION
------------------------------------------
- Sections are top level objects in the SECTIONS array.
- Each section has:
    {
      title: 'Your Section Title',
      items: [ ... ]
    }
- Add a new object to SECTIONS, keeping the same structure.

EXAMPLE:
SECTIONS.push({
  title: 'New Region',
  items: [
    { subheader: 'Zone A' },
    {
      id: 'zone_a_item_1',
      title: 'First Thing in Zone A',
      details: 'How to find it',
      image: '../img/zone-a-1.jpg',
      clickable: true
    }
  ]
});

------------------------------------------
3) HOW TO ADD A NEW SUBSECTION HEADER
------------------------------------------
- A subsection header is an item with only:
    { subheader: 'Label Text' }
- Insert it anywhere inside a section's 'items' to visually separate groups.

------------------------------------------
4) HOW TO ADD A NEW ITEM (ENTRY)
------------------------------------------
- Items require a unique 'id' string. Use lowercase with underscores for consistency.
- Minimum fields:
    {
      id: 'unique_id_here',
      title: 'Visible Entry Name',
      clickable: false
    }
- Optional fields:
    - details: string (helper text shown under the title)
    - image: relative or absolute URL to an image (used if clickable=true)
    - clickable: boolean (if true, title becomes a link that opens a modal)
    - reset: object (see section 5)

EXAMPLE (non-clickable):
{
  id: 'abyss_b2f_example',
  title: 'Example Reward',
  details: 'Chest at (x:4, y:7)',
  image: '',
  clickable: false
}

EXAMPLE (clickable with image):
{
  id: 'abyss_b3f_map_spot',
  title: 'Map Spot with Screenshot',
  details: 'See the image for exact position',
  image: '../img/b3f-spot.jpg',
  clickable: true
}

------------------------------------------
5) HOW TO ENABLE RESET TIMERS FOR AN ITEM
------------------------------------------
- Some items reset on a schedule. Use the 'reset' field:
    reset: {
      reference: 'YYYY-MM-DDTHH:mm:ss', // Local time ISO string
      intervalWeeks: <number_of_weeks>
    }
- The UI will display a "Resets MMM D, HH:MM" label under the title.
- 'reference' is the base "anchor" reset time. The next reset jumps in
  interval-sized steps from that anchor (not from the last collection).

EXAMPLE:
{
  id: 'weekly_boss',
  title: 'Weekly Boss Chest',
  reset: {
    reference: '2025-08-01T10:00:00',
    intervalWeeks: 1
  },
  clickable: false
}

------------------------------------------
6) HOW TO TEST AND VERIFY YOUR ADDITIONS
------------------------------------------
- After editing SECTIONS, reload the page.
- Check that:
  - Your new section/subsection/item appears.
  - Clicking "Collect" sets the timestamp in the table.
  - "Update" refreshes the timestamp.
  - "⟲" clears the timestamp.
  - If clickable=true, clicking the title opens the modal with your image.
  - If reset is set, the "Resets ..." label appears and shows a sensible date.
  - NEW: Under "Last Collected", a live "X days (HH:MM:SS)" subline should
         count up once per second from the moment of collection.

------------------------------------------
7) HOW TO MIGRATE OR SHARE YOUR PROGRESS
------------------------------------------
- Use the "Sync Code" at the top:
  - Click "Copy" to copy your current progress as a Base64 string.
  - On another device/browser, paste that code in "Paste Code" and click "Sync".
- WARNING: "Sync" REPLACES the current device's progress with the pasted code.

------------------------------------------
8) COMMON TROUBLESHOOTING TIPS
------------------------------------------
- My image link opens a blank modal:
  - Ensure 'clickable: true' and 'image' points to a valid, reachable path.
  - Open the image URL directly in the browser to confirm it loads.

- My new item doesn't save:
  - Confirm 'id' is unique and non-empty.
  - Open DevTools > Application > Local Storage to inspect values.

- Reset label shows a weird time:
  - The browser uses local time. Double-check the 'reference' value and format.
  - Make sure 'intervalWeeks' is a number (e.g., 1, 2).

- The "days since" line isn't moving:
  - Ensure there are no console errors stopping JS execution.
  - Verify each ".since" span has a data-ts attribute after collecting.
  - Try reloading; the interval is created during render().

- I want to clear all progress quickly:
  - Open DevTools Console and run:
      localStorage.removeItem('respawn_acquisition_data');
  - Then reload the page.

END OF MANUAL
-->
