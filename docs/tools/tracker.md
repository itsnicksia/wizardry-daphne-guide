<!--
  This file is a self contained web component that tracks collectible entries.
  It uses:
    - HTML for structure
    - CSS for styles (inside <style>)
    - JavaScript for behavior (inside <script>)
  Data is saved to the browser's localStorage so it persists per device.
-->

<style>
  /* ====== LAYOUT / WRAPPERS ======
     The outer containers that hold the tracker and sync controls.
  */
  #sync-container {
    margin-bottom: 1.5rem;
  }

  #tracker-container {
    overflow-x: auto;               /* Allow horizontal scroll on small screens */
    -webkit-overflow-scrolling: touch; /* Smooth scrolling */
  }

  /* ====== TABLE BASE STYLES ======
     Fixed layout makes columns consistent and prevents layout shifts.
  */
  #tracker-container table {
    border: 1px solid rgba(221, 209, 183, 0.3);
    width: 100%;
    table-layout: fixed;            /* Important for fixed column widths */
    border-collapse: collapse;      /* Merge borders */
  }

  /* ====== COLUMN WIDTHS ======
     First column is the largest (entry + details), others are smaller.
  */
  #tracker-container th:nth-child(1),
  #tracker-container td:nth-child(1) {
    width: 60%;
  }
  #tracker-container th:nth-child(2),
  #tracker-container td:nth-child(2) {
    width: 20%;
  }
  #tracker-container th:nth-child(3),
  #tracker-container td:nth-child(3) {
    width: 20%;
    white-space: nowrap; /* Prevent action column from wrapping weirdly */
  }

  /* ====== CELL STYLING ======
     Shared styles for header and data cells.
  */
  #tracker-container th,
  #tracker-container td {
    border: 1px solid var(--md-typeset-fg-color--light);
    padding: 0.4rem 0.8rem;
    vertical-align: top;
    font-size: 0.9rem;
    text-align: left;
    word-wrap: break-word;
    white-space: normal;
  }

  /* Header row styling */
  #tracker-container thead th {
    background-color: rgba(51,51,51,0.15);
    color: var(--md-default-fg-color--light);
    font-weight: 600;
  }

  /* ====== SECTION / SUBSECTION ROWS ======
     These are rows injected by JS to visually group items.
  */
  #tracker-container .section-header td {
    background-color: rgba(51,51,51,0.8);
    color: var(--md-default-fg-color--light);
    font-weight: bold;
    text-align: center;
    padding: 0.6rem;
  }

  #tracker-container .subsection-header td {
    background-color: rgba(94,139,222,0.1);
    border: 1px solid #5e8bde;
    color: var(--md-default-fg-color--light);
    font-style: italic;
    padding: 0.4rem 0.6rem;
  }

  /* ====== SECONDARY TEXT (DETAILS) ======
     Shown under an entry's title (tips, reset timing, etc.).
  */
  #tracker-container .details {
    margin-top: 0.25rem;
    font-size: 0.8rem;
    color: var(--md-typeset-fg-color--light);
    padding-left: 0.6rem;
  }

  /* ====== LINKS (OPEN IMAGE MODAL) ====== */
  #tracker-container .entry-link {
    color: var(--md-typeset-a-color);
    text-decoration: none;
    transition: color 0.2s ease;
  }
  #tracker-container .entry-link:hover,
  #tracker-container .entry-link:focus {
    text-decoration: underline;
    outline: 2px solid var(--md-typeset-a-color);
    outline-offset: 2px;
  }

  /* ====== CHECKMARK STATE ======
     Row gets 'collected' class after user clicks 'Collect'/'Update'.
  */
  #tracker-container .checkmark {
    margin-right: 0.4rem;
    font-size: 1.6rem;
    color: var(--md-typeset-fg-color--light); /* default gray */
    vertical-align: middle;
    line-height: 1;
  }
  #tracker-container tr.collected .checkmark {
    color: #2fb170; /* green when collected */
  }

  /* ====== BUTTONS (COLLECT / UPDATE / UNDO) ====== */
  #tracker-container button {
    padding: 0.2rem 0.4rem;
    font-size: 0.75rem;
    border: 1px solid var(--md-typeset-fg-color--light);
    border-radius: 4px;
    background: transparent;
    color: var(--md-default-fg-color--light);
    cursor: pointer;
    transition: background-color 0.2s ease;
  }
  #tracker-container button:hover,
  #tracker-container button:focus {
    background: var(--md-typeset-a-color);
    color: var(--md-default-fg-color--light);
    outline: none;
  }
  #tracker-container button:focus {
    outline: 2px solid var(--md-typeset-a-color);
    outline-offset: 2px;
  }

  /* ====== MODAL OVERLAY (IMAGE PREVIEW) ====== */
  #modal {
    display: none;                  /* Hidden until a link is clicked */
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.6);
    align-items: center;
    justify-content: center;
    z-index: 1000;
  }
  #modal .modal-content {
    background: var(--md-default-bg-color--light);
    padding: 1rem;
    border-radius: 6px;
    max-width: 90%;
    max-height: 80vh;
    overflow: auto;
    position: relative;
  }
  #modal .modal-close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    cursor: pointer;
    font-size: 1.2rem;
  }
  #modal img {
    max-width: 100%;
    max-height: 60vh;
    display: block;
    margin: 0 auto;
  }

  /* ====== MOBILE TWEAKS ======
     Smaller text, tighter padding, and automatic table widths.
  */
  @media (max-width: 600px) {
    #tracker-container p {
      font-size: 0.85rem;
    }
    #tracker-container th,
    #tracker-container td {
      font-size: 0.75rem;
      padding: 0.2rem 0.4rem;
    }
    #tracker-container .section-header td {
      font-size: 0.9rem;
      padding: 0.4rem;
    }
    #tracker-container .details {
      font-size: 0.7rem;
    }
    #tracker-container button,
    #tracker-container .entry-link {
      font-size: 0.75rem;
    }

    /* Let the table decide widths automatically on very small screens */
    #tracker-container table {
      table-layout: auto;
    }
    #tracker-container th:nth-child(1),
    #tracker-container td:nth-child(1),
    #tracker-container th:nth-child(2),
    #tracker-container td:nth-child(2),
    #tracker-container th:nth-child(3),
    #tracker-container td:nth-child(3) {
      width: auto;
    }
  }
</style>


<div id="tracker-container">
  <!-- Instructions for users -->
  <p>
    Click an entry name to view its image (if it has one).<br>
    Click “Collect” to record it, “Update” to overwrite, or “⟲” to undo.<br>
    Transfer acquisition status between devices with the sync code.
  </p>

  <!-- This is where the sync UI (copyable code + paste-to-sync) appears -->
  <div id="sync-container"></div>

  <!-- Main tracker table. JS will fill <tbody> dynamically. -->
  <table id="tracker" class="no-sort">
    <!-- Optional column width hints; CSS also sets widths -->
    <colgroup>
      <col style="width: 70%;">
      <col style="width: 18%;">
      <col style="width: 12%;">
    </colgroup>
    <thead>
      <tr><th>Entry</th><th>Last Collected</th><th>Action</th></tr>
    </thead>
    <tbody></tbody>
  </table>
</div>

<!-- Image modal for when users click an entry with an image -->
<div id="modal">
   <div class="modal-content">
     <span class="modal-close">×</span>
     <div id="modal-image"></div>
   </div>
</div>

<script>
;(function(){
  /* ==========================
     UTILITIES: DATES & LABELS
     ========================== */

  /**
   * getNextResetDate
   * Calculates the next reset date based on a reference timestamp and a repeat interval (in weeks).
   * - If 'now' is before the reference, returns the reference.
   * - Otherwise, advances in intervals until the next future date.
   */
  function getNextResetDate({ reference, intervalWeeks }) {
    const now    = new Date();
    const ref    = new Date(reference);
    const period = intervalWeeks * 7 * 24 * 60 * 60 * 1000; // weeks -> ms
    if (now < ref) return ref;
    const elapsed = now - ref;
    const cycles  = Math.ceil(elapsed / period);
    return new Date(ref.getTime() + cycles * period);
  }

  /**
   * formatResetLabel
   * Returns a string like: "Resets Sep 2, 10:00 AM".
   * Uses user locale via toLocaleString.
   */
  function formatResetLabel(dt) {
    return 'Resets ' + dt.toLocaleString(undefined, {
      month: 'short',
      day:   'numeric',
      hour:  'numeric',
      minute:'2-digit'
    });
  }

  /* ==========================
     DATA MODEL
     ==========================
     SECTIONS is your content source. Each section contains 'items' which are:
       - { subheader: '...' }     // A visual label
       - Or a regular entry object with:
         id:        unique string key (used in localStorage)
         title:     user friendly name shown in the table
         details:   optional detail summary shown below title
         image:     optional image path; if present and clickable=true, clicking opens modal
         clickable: boolean; if true, title becomes a link that opens modal
         reset:     optional { reference: ISO date string, intervalWeeks: number } for recurring reset label
  */
  const SECTIONS = [
    {
      title: 'Mausoleum Reset',
      items: [
        { subheader: 'Ancient Mausoleum' },
        {
          id:    'cauldron_mausoleum',
          title: 'Crucible Mausoleum',
          reset: {
            reference:    '2025-05-31T10:00:00',  // Initial reset anchor time (local time)
            intervalWeeks: 2                      // Repeat every 2 weeks
          },
          image:     '',                          // No image: remains non-clickable
          clickable: false
        }
    ]
  },
  {
    title: 'Adventurer Remains',
    items: [
      { subheader: 'Beginning Abyss' },
      {
        id: 'b1f_awakened_chamber',
        title: 'Old Remains: Cursed Wheel to Awakening',
        details: 'Part of the Intro',
        image: '/appendices/img/respawning-bone-death-stench.jpg',
        clickable: false
      },
      {
        id: 'b1f_stench_quest',
        title: 'Class Remains: B1F (Death Stench Investigation Request)',
        details: 'Wheel to Kings Rescue, accept the Request in the Adventurers Guild, and head to the location',
        image: '../img/bones/respawning-bone-death-stench.jpg',
        clickable: true
      },
      {
        id: 'b3f_goblin_south',
        title: 'Adventurers Remains: B3F (Goblin’s Nest)',
        details: 'Wheel to Kings Rescue and head to the location',
        image: '../img/bones/respawning-bone-goblin-den.jpg',
        clickable: true
      },
      {
        id: 'b4f_rubble',
        title: 'Adventurers Remains: B4F',
        details: 'Assuming you wheeled to Kings Rescue already, head to the location',
        image: '../img/bones/respawning-bone-b4f.jpg',
        clickable: true
      },
      {
        id: 'b5f_toxin_swamps',
        title: 'Adventurers Remains: B5F',
        details: 'Assuming you wheeled to Kings Rescue already, head to the location',
        image: '../img/bones/respawning-bone-b5f.jpg',
        clickable: true
      },
      {
        id: 'b6f_before_statue',
        title: 'Adventurers Remains: B6F',
        details: 'Same as above, you need to come in from B5F to take the portals',
        image: '../img/bones/respawning-bone-b6f.jpg',
        clickable: true
      },
      {
        id: 'b7f_rubble_reverse',
        title: 'Adventurers Remains: B7F',
        details: 'Same as below, you need to first drop the rocks on B8F',
        image: '../img/bones/respawning-bone-b7f.jpg',
        clickable: true
      },
      {
        id: 'b8f_nutrient',
        title: 'Adventurers Remains: B8F',
        details: 'Assuming you wheeled to Kings Rescue already, head to the location',
        image: '../img/bones/respawning-bone-b8f.jpg',
        clickable: true
      },
      { subheader: 'Trade Waterway' },
      {
        id: 'trade_waterway_pier',
        title: 'Adventurers Remains: 7th District (Shore of the Dead)',
        details: 'Bone will not respawn after Abyss 2 GWO is killed. You will need to cursed wheel before then.',
        image: '../img/bones/respawning-bone-pier-location.jpg',
        clickable: true
      },
      { subheader: 'Impregnable Fortress' },
      {
        id: 'fortress_catacombs',
        title: 'Adventurers Remains: Catacombs',
        details: 'Location is at green checkmark. You will need to solve the candle puzzle to open the door to that location.',
        image: '../img/bones/respawning-bone-catacomb.jpg',
        clickable: true
      }
    ]
  },
  {
    title: 'Equipment/Request Rewards',
    items: [
      { subheader: 'Beginning Abyss' },
      {
        id: 'abyss_b1f_feathered',
        title: 'Feathered Cap',
        details: 'Chest in B1F (x:11, y:21)',
        image: '',
        clickable: false
      },
      {
        id: 'abyss_b3f_exorcism',
        title: 'Exorcism Armor',
        details: 'Chest in B3F (x:0, y:3)',
        image: '',
        clickable: false
      },
      {
        id: 'abyss_b4f_halberd',
        title: 'Halberd',
        details: 'Chest in B4F (x:2, y:13)',
        image: '',
        clickable: false
      },
      {
        id: 'abyss_b5f_huntsman',
        title: 'Huntsmans Bow',
        details: 'Chest in B5F (x:8, y:2)',
        image: '',
        clickable: false
      },
      {
        id: 'abyss_b5f_breeze',
        title: 'Sword of the Breeze',
        details: 'Chest in B5F (x:8, y:3)',
        image: '',
        clickable: false
      },
      {
        id: 'abyss_b5f_resistance',
        title: 'Ring of Resistance',
        details: 'Chest in B5F (x:8, y:4)',
        image: '',
        clickable: false
      },
      {
        id: 'bracelet_of_impurity',
        title: 'Bracelet of Impurity',
        details: 'Chest in B8F (x:0, y:22)',
        image: '',
        clickable: false
      },
      {
        id: 'bracelet_of_urgency',
        title: 'Bracelet of Urgency',
        details: 'Quest Reward from "Knight-Butcher Ent Proliferation"',
        image: '',
        clickable: false
      },
      {
        id: 'plague_mask',
        title: 'Plague Mask',
        details: 'Clear all waves in "March of the Undead" request',
        image: '',
        clickable: false
      },
      {
        id: 'digger_pickaxe',
        title: 'Digging Mattock',
        details: 'Quest Reward from "Saving Lambert"',
        image: '',
        clickable: false
      },
      {
        id: 'royal_amulet',
        title: 'Royal Herald Amulet',
        details: 'Quest Reward from "Save the King"',
        image: '',
        clickable: false
      },
      {
        id: 'bracelet_of_battle',
        title: 'Bracelet of Battle',
        details: 'Chance to drop from "The Greater Demon"',
        image: '',
        clickable: false
      },
      { subheader: 'Trade Waterway' },
      {
        id: 'lightfoot_sandals',
        title: 'Light Sandals',
        details: 'Chest in 3rd District',
        image: '',
        clickable: false
      },
      {
        id: 'thieves_gloves',
        title: 'Thieves Gloves',
        details: 'Chest in 4th District',
        image: '',
        clickable: false
      },
      {
        id: 'man_eater',
        title: 'Man-Eater',
        details: 'Chest in 5th District',
        image: '',
        clickable: false
      },
      {
        id: 'mask_water_deity',
        title: 'Mask of the Water God',
        details: 'Chest in 6th District',
        image: '',
        clickable: false
      },
      {
        id: 'bird_dropper',
        title: 'Bird Dropper',
        details: 'Quest Reward from "Hydra Plant Procurement"',
        image: '',
        clickable: false
      },
      {
        id: 'bloodstained_gloves',
        title: 'Bloodstained Gloves',
        details: 'Quest Reward from "Servant and Cargo Recovery"',
        image: '',
        clickable: false
      },
      {
        id: 'melgina_choker',
        title: 'Melgina’s Choker',
        details: 'Defeat Octonarus after giving Melgina the Mackerel Sandwich',
        image: '',
        clickable: false
      },
      {
        id: 'shield_of_honor',
        title: 'Shield of Honor',
        details: 'Quest Reward from "Missing Person (Princess Route)"',
        image: '',
        clickable: false
      },
      {
        id: 'oktonaras_necklace',
        title: 'Octonarus’s Necklace',
        details: 'Defeat Octonarus after giving Melgina the Titanium Knife',
        image: '',
        clickable: false
      },
      {
        id: 'tyranny_cutlass',
        title: 'Cutlass of Tyranny',
        details: 'Choose "Octonarus‘s Cherished Sword" after defeating Octonarus',
        image: '',
        clickable: false
      },
      {
        id: 'sea_god_pearl',
        title: 'Pearl of the Sea God',
        details: 'Quest Reward from "Arena Tournament by Avare"',
        image: '',
        clickable: false
      },
      { subheader: 'Impregnable Fortress' },
      {
        id: 'undead_ward',
        title: 'Undead Ward',
        details: 'Quest Reward from "Abyssal Heretic"',
        image: '',
        clickable: false
      },
      {
        id: 'skull_necklace',
        title: 'Skull Necklace',
        details: 'Quest Reward from "Putting Evil Spirits to Rest" or Zone 2 Chest',
        image: '',
        clickable: false
      },
      {
        id: 'enemy_scope',
        title: 'Enemy Spyglass',
        details: 'Quest Reward from "Bodyguard for Ruins Exploration"',
        image: '',
        clickable: false
      },
      {
        id: 'demonic_crystal',
        title: 'Demonic Crystal',
        details: 'Fortress Underground » "Guardian of Forbidden Exploration" quest » "You Know Sin"',
        image: '',
        clickable: false
      },
      {
        id: 'goats_cloak',
        title: 'Goatskin Cloak',
        details: 'Quest Reward from "Antique Scarlet Doll" or Chest in Zone 6',
        image: '',
        clickable: false
      },
      {
        id: 'knights_cloak',
        title: 'Knight’s Cloak',
        details: 'Quest Reward from "Expedition to Clear the Fortress Lower Levels"',
        image: '',
        clickable: false
      },
      {
        id: 'glittering_ring',
        title: 'Shining Finger Band',
        details: 'Reward from beating Morgus, God of Death',
        image: '',
        clickable: false
      },
      {
        id: 'elegant_dancer',
        title: 'Elegant Dancer',
        details: 'Admiral Route Clear Reward',
        image: '',
        clickable: false
      },
      {
        id: 'tome_shieldbearer',
        title: 'Tome of the Loyal Shieldbearer',
        details: 'Princess Route Clear Reward',
        image: '',
        clickable: false
      },
      {
        id: 'holy_white_gem',
        title: 'Luminous Holy White Gem',
        details: 'Papal Route Clear Reward',
        image: '',
        clickable: false
      },
      {
        id: 'soul_potion_d9',
        title: 'Mana Elixir',
        details: 'District 9',
        image: '',
        clickable: false
      },
      {
        id: 'embroidered_hankerchief',
        title: 'Golden Embroidered Handkerchief',
        details: 'Quest Reward from Cleanup Operation quest reward',
        image: '',
        clickable: false
      },
      {
        id: 'everlasting_lily',
        title: 'Everlasting Lily',
        details: 'Quest Reward from "Requiem for the Evil Spirit" quest',
        image: '',
        clickable: false
      }
    ]
  }
  ];

  /* ==========================
     PERSISTENCE
     ==========================
     Data lives in localStorage under STORAGE_KEY.
     'data' is an object mapping item.id -> timestamp(ms) of last collection.
  */
  const STORAGE_KEY = 'respawn_acquisition_data';
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

  /* ==========================
     DOM REFERENCES
     ========================== */
  const tbody = document.querySelector('#tracker tbody');
  const modal = document.getElementById('modal');
  const mImg = document.getElementById('modal-image');         // Container where img tag is inserted
  const mImgContainer = document.getElementById('modal-image'); // Same element; alias for clarity
  const mClose = document.querySelector('.modal-close');
  const syncCt = document.getElementById('sync-container');

  /* ==========================
     HELPER: DATE FORMATTING
     ========================== */
  function formatDate(ts) {
    return ts ? new Date(ts).toLocaleString() : '-';
  }

  /* Save current 'data' into localStorage. */
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  /* ==========================
     SYNC UI
     ==========================
     - Current state is shown as a Base64 code (read-only input + Copy button).
     - Paste a code and press Sync to overwrite local data with that code's data.
     - For transferring progress across devices/browsers.
  */
  function initializeSyncUI() {
    // Reset container each re-render
    syncCt.innerHTML = '';

    // Generate a shareable code for the current data
    const currentCode = btoa(JSON.stringify(data));

    // Read-only field with current sync code
    const codeInput = document.createElement('input');
    codeInput.readOnly = true;
    codeInput.value = currentCode;
    codeInput.style.width = '8rem';

    // Copy button: copies current code to clipboard
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(currentCode);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 1500);
    });

    // Row 1 label + controls
    const row1 = document.createElement('div');
    row1.textContent = 'Sync Code: ';
    row1.append(codeInput, copyBtn);

    // Paste field: user pastes a shared code here
    const pasteInput = document.createElement('input');
    pasteInput.placeholder = 'Paste Sync Code';
    pasteInput.style.width = '8rem';

    // Sync button: tries to decode & load pasted code into 'data'
    const syncBtn = document.createElement('button');
    syncBtn.textContent = 'Sync';
    syncBtn.addEventListener('click', () => {
      const txt = pasteInput.value.trim();
      if (!txt) return alert('Please paste a code.');
      try {
        const obj = JSON.parse(atob(txt));
        data = obj;     // Replace current data with decoded object
        save();         // Persist replacement
        render();       // Re-render UI with new data
      } catch (e) {
        alert('Invalid sync code');
      }
    });

    // Row 2 label + controls
    const row2 = document.createElement('div');
    row2.textContent = 'Paste Code: ';
    row2.append(pasteInput, syncBtn);

    // Inject both rows into the sync container
    syncCt.append(row1, row2);
  }

  /* ==========================
     RENDERER
     ==========================
     Builds all table rows based on SECTIONS and current 'data'.
     Binds click handlers for Collect/Update, Undo, and Image links.
  */
  function render() {
    let html = '';

    // Build rows for each section and its items
    SECTIONS.forEach(sec => {
      // Section header row
      html += `<tr class="section-header"><td colspan="3">${sec.title}</td></tr>`;

      // Each item within a section
      sec.items.forEach(it => {
        // Visual subsection row seperators
        if (it.subheader) {
          html += `<tr class="subsection-header"><td colspan="3">${it.subheader}</td></tr>`;
          return;
        }

        // Is this item currently marked as collected?
        const done = Boolean(data[it.id]);

        // Checkmark always shows; color changes with 'collected' class
        const chk = `<span class="checkmark">✓</span>`;

        // If clickable, make the title an anchor; otherwise, just text
        const nameEl = it.clickable
          ? `<a href="#" class="entry-link" data-img="${it.image}" data-title="${it.title}">${it.title}</a>`
          : `<span>${it.title}</span>`;

        // Show either a reset label (if reset info exists) or details string
        const details = it.reset
          ? formatResetLabel(getNextResetDate(it.reset))
          : (it.details || '');

        // Primary action toggles between 'Collect' and 'Update'
        const actBtn = `<button class="action-btn">${done ? 'Update' : 'Collect'}</button>`;

        // Reset button appears only when item has been collected
        const rstBtn = done ? `<button class="reset-btn" title="Undo">⟲</button>` : '';

        // Compose the row HTML
        html += `
          <tr data-id="${it.id}" class="${done ? 'collected' : ''}">
            <td>${chk}${nameEl}${details ? `<div class="details">${details}</div>` : ''}</td>
            <td class="ts">${formatDate(data[it.id])}</td>
            <td>${actBtn}${rstBtn}</td>
          </tr>`;
      });
    });

    // Inject all rows into the table body
    tbody.innerHTML = html;

    // ==== Wire up button/link behaviors after DOM insertion ====

    // Collect/Update: set current timestamp for this id
    tbody.querySelectorAll('.action-btn').forEach(btn =>
      btn.onclick = e => {
        const id = e.target.closest('tr').dataset.id;
        data[id] = Date.now(); // store time of collection/update
        save();
        render();              // re-render to reflect new state
      }
    );

    // Undo: remove the timestamp for this id
    tbody.querySelectorAll('.reset-btn').forEach(btn =>
      btn.onclick = e => {
        const id = e.target.closest('tr').dataset.id;
        delete data[id]; // delete property from 'data'
        save();
        render();
      }
    );

    // Image open: show modal with the linked image
    tbody.querySelectorAll('.entry-link').forEach(link =>
      link.onclick = e => {
        e.preventDefault();
        // Clear and insert a fresh img tag so repeated clicks always work
        mImgContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = link.dataset.img;
        img.alt = link.dataset.title;
        mImgContainer.appendChild(img);
        modal.style.display = 'flex';
      }
    );

    // Rebuild the sync controls (so they always reflect the latest code)
    initializeSyncUI();
  }

  /* ==========================
     MODAL OPEN/CLOSE
     ========================== */
  mClose.onclick = () => modal.style.display = 'none';
  modal.onclick = e => {
    // Clicking outside the dialog content closes the modal
    if (e.target === modal) modal.style.display = 'none';
  };

  // Initial render on page load
  render();
})();
</script>

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

- I want to clear all progress quickly:
  - Open DevTools Console and run:
      localStorage.removeItem('respawn_acquisition_data');
  - Then reload the page.

END OF MANUAL
-->
