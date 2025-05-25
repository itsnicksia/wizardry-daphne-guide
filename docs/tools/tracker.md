<style>

  #sync-container {
    margin-bottom: 1.5rem;
  }

  #tracker-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  #tracker-container table {
    border: 1px solid rgba(221, 209, 183, 0.3);
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

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
    white-space: nowrap; 
  }

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

  #tracker-container thead th {
    background-color: rgba(51,51,51,0.15);
    color: var(--md-default-fg-color--light);
    font-weight: 600;
  }

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

  #tracker-container .details {
    margin-top: 0.25rem;
    font-size: 0.8rem;
    color: var(--md-typeset-fg-color--light);
    padding-left: 0.6rem;
  }

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

  #tracker-container .checkmark {
    margin-right: 0.4rem;
    font-size: 1.6rem;
    color: var(--md-typeset-fg-color--light);
    vertical-align: middle;
    line-height: 1;
  }
  #tracker-container tr.collected .checkmark {
    color: #2fb170;
  }

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

  #modal {
    display: none;
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
  <p>
    Click an entry name to view its image (if it has one).<br>
    Click “Collect” to record it, “Update” to overwrite, or “⟲” to undo.<br>
    Transfer acquisition status between devices with the sync code.
  </p>
  <div id="sync-container"></div>

  <table id="tracker" class="no-sort">
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
<div id="modal">
   <div class="modal-content">
     <span class="modal-close">×</span>
     <div id="modal-image"></div>
   </div>
 </div>

<script>
;(function(){
  
  function getNextResetDate({ reference, intervalWeeks }) {
    const now    = new Date();
    const ref    = new Date(reference);
    const period = intervalWeeks * 7 * 24 * 60 * 60 * 1000;
    if (now < ref) return ref;
    const elapsed = now - ref;
    const cycles  = Math.ceil(elapsed / period);
    return new Date(ref.getTime() + cycles * period);
  }

  function formatResetLabel(dt) {
    return 'Resets ' + dt.toLocaleString(undefined, {
      month: 'short',
      day:   'numeric',
      hour:  'numeric',
      minute:'2-digit'
    });
  }

 
  const SECTIONS = [
    {
    title: 'Mausoleum Reset',
    items: [
      { subheader: 'Ancient Mausoleum' },
      {
          id:    'cauldron_mausoleum',
          title: 'Crucible Mausoleum',
          reset: {
            reference:    '2025-05-31T10:00:00',  
            intervalWeeks: 2
          },
          image:     '',
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
        details: 'Wheel to Fresh Start and get to the first harken then return and accept the Request',
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
        image: '../img/bones/respawning-bone-pier-location.png',
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


  const STORAGE_KEY = 'respawn_acquisition_data';
  let data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  const tbody = document.querySelector('#tracker tbody');
  const modal = document.getElementById('modal');
  const mImg = document.getElementById('modal-image');
  const mImgContainer = document.getElementById('modal-image');
  const mClose = document.querySelector('.modal-close');
  const syncCt = document.getElementById('sync-container');

  function formatDate(ts) {
    return ts ? new Date(ts).toLocaleString() : '-';
  }
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function initializeSyncUI() {
    syncCt.innerHTML = '';

    const currentCode = btoa(JSON.stringify(data));
    const codeInput = document.createElement('input');
    codeInput.readOnly = true;
    codeInput.value = currentCode;
    codeInput.style.width = '8rem';
    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(currentCode);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => copyBtn.textContent = 'Copy', 1500);
    });
    const row1 = document.createElement('div');
    row1.textContent = 'Sync Code: ';
    row1.append(codeInput, copyBtn);

    const pasteInput = document.createElement('input');
    pasteInput.placeholder = 'Paste Sync Code';
    pasteInput.style.width = '8rem';
    const syncBtn = document.createElement('button');
    syncBtn.textContent = 'Sync';
    syncBtn.addEventListener('click', () => {
      const txt = pasteInput.value.trim();
      if (!txt) return alert('Please paste a code.');
      try {
        const obj = JSON.parse(atob(txt));
        data = obj;
        save();
        render();
      } catch (e) {
        alert('Invalid sync code');
      }
    });
    const row2 = document.createElement('div');
    row2.textContent = 'Paste Code: ';
    row2.append(pasteInput, syncBtn);

    syncCt.append(row1, row2);
  }

  function render() {
    let html = '';
    SECTIONS.forEach(sec => {
      html += `<tr class="section-header"><td colspan="3">${sec.title}</td></tr>`;
      sec.items.forEach(it => {
        if (it.subheader) {
          html += `<tr class="subsection-header"><td colspan="3">${it.subheader}</td></tr>`;
          return;
        }
        const done = Boolean(data[it.id]);
        const chk = `<span class="checkmark">✓</span>`;
        const nameEl = it.clickable
          ? `<a href="#" class="entry-link" data-img="${it.image}" data-title="${it.title}">${it.title}</a>`
          : `<span>${it.title}</span>`;

        const details = it.reset
          ? formatResetLabel(getNextResetDate(it.reset))
          : (it.details || '');

        const actBtn = `<button class="action-btn">${done ? 'Update' : 'Collect'}</button>`;
        const rstBtn = done ? `<button class="reset-btn" title="Undo">⟲</button>` : '';

        html += `
          <tr data-id="${it.id}" class="${done ? 'collected' : ''}">
            <td>${chk}${nameEl}${details ? `<div class="details">${details}</div>` : ''}</td>
            <td class="ts">${formatDate(data[it.id])}</td>
            <td>${actBtn}${rstBtn}</td>
          </tr>`;
      });
    });
    tbody.innerHTML = html;

    tbody.querySelectorAll('.action-btn').forEach(btn =>
      btn.onclick = e => {
        const id = e.target.closest('tr').dataset.id;
        data[id] = Date.now();
        save();
        render();
      }
    );
    tbody.querySelectorAll('.reset-btn').forEach(btn =>
      btn.onclick = e => {
        const id = e.target.closest('tr').dataset.id;
        delete data[id];
        save();
        render();
      }
    );
    tbody.querySelectorAll('.entry-link').forEach(link =>
      link.onclick = e => {
        e.preventDefault();
        mImg.src = link.dataset.img;
        modal.style.display = 'flex';
        mImgContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = link.dataset.img;
        img.alt = link.dataset.title;
        mImgContainer.appendChild(img);
        modal.style.display = 'flex';
      }
    );
    initializeSyncUI();
  }

  mClose.onclick = () => modal.style.display = 'none';
  modal.onclick = e => {
    if (e.target === modal) modal.style.display = 'none';
  };

  render();
})();
</script>