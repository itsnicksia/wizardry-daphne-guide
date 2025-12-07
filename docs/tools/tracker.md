<!--
  CHANGELOG (Nov 2025):
  - Fixed table not rendering due to btoa() on Unicode content. Added UTF-8 safe Base64 helpers (utoa/atou).
  - Added multi-tab support:
    - New localStorage keys: TABS_KEY ('respawn_tabs_v1'), CUR_TAB_KEY ('respawn_current_tab_id_v1'), and per-tab data prefix DATA_PREFIX ('respawn_acquisition_data__{tabId}').
    - First-run bootstrap creates a 'Default' tab using BASE_SECTIONS (deep clone of SECTIONS).
    - Migration: if legacy STORAGE_KEY_OLD ('respawn_acquisition_data') exists, it is copied into the Default tab dataset.
  - Tabs UI & controls (rendered directly above the table):
    - Tab buttons to switch active tab (updates CUR_TAB_KEY and reloads per-tab timestamps).
    - “+ New Tab from Default” creates a tab seeded with BASE_SECTIONS and copies the current tab’s timestamps to keep progress aligned.
    - “Rename Tab” updates the tab’s display name in TABS_KEY.
    - “Delete Tab” removes the active tab and its dataset; prevents deleting the last remaining tab and never deletes the Default tab.
  - Unified Sync Code overhaul:
    - Sync payload now includes: all tabs (id, name, sections), currentTabId, per-tab datasets, and showHidden flag.
    - Copy/Sync UI now encodes/decodes via utoa/atou to preserve Unicode in titles/details.
    - Sync operation replaces tabs and all per-tab datasets atomically, then restores the current tab.
  - Per-tab persistence:
    - getActiveSections() reads sections from the active tab; timestamps read/write to DATA_PREFIX + currentTabId.
    - save()/saveData() now scoped to current tab.
  - Edit/Visibility QoL:
    - “Edit Mode” toggle shows inline edit buttons for section titles, subheaders, item titles, and details; changes persist to TABS_KEY.
    - “Show Hidden / Hide Hidden” toggle reveals rows with `.hidden-row` styling for management.
    - Per-row “Hide/Unhide” actions (items and subheaders) write a `hidden` flag into the active tab’s section data.
  - Rendering & structure:
    - Sync + Tabs toolbars consolidated in `#sync-container` above the table for better discoverability.
    - Deep clone utility ensures BASE_SECTIONS remains immutable; new tabs start clean.
    - `render()` now rebuilds the sync/tabs UI, re-renders rows, and ensures the live elapsed timer is running.
  - Safety & UX:
    - Guardrails for Sync (schema validation) with friendly error toasts on invalid payloads.
    - Prevent actions on hidden rows; action buttons disabled when item is hidden.
    - Non-breaking: if the stored currentTabId is missing, fall back to the first available tab.
  - Styled confirmations:
    - Replaced `window.confirm()` with a themed, accessible modal (`confirmStyled`) using `.confirm-overlay` and `.confirm-dialog` styles.
    - Supports Enter/Escape, backdrop click-to-cancel, and primary/secondary buttons matching the app’s palette.
  - Tab syncing improvement:
    - Collect, Update, and Undo actions now update timestamps globally across all tabs instead of per-tab.
    - Added `respawn_acquisition_data_alltabs_v1` as the unified dataset key; older per-tab keys are mirrored for backward compatibility.
    - Legacy sync codes import seamlessly—timestamps are merged intelligently during import.
  - Secrets and mysteries:
    - A subtle whisper drifts through the code… some say certain tab names carry unusual power.
    - What might happen if one were to name a tab after those who oversee the realm of Fasterthoughts?
    - Perhaps curiosity is best left untested... or perhaps not.
  - Modal UI refresh:
    - Added `.size-lg` class to enlarge confirm/prompt dialogs by ~50% for improved readability.
    - Unified visual design between Rename and Delete modals; both now use the same styling system.
    - Input fields and buttons scale consistently with surrounding UI and use soft animation transitions.
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
  #tracker-container td:nth-child(1) { width: 60%; }
  #tracker-container th:nth-child(2),
  #tracker-container td:nth-child(2) { width: 20%; }
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
    overflow-wrap: anywhere; /* helps with long tokens */
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
    position: relative;  /* for the collapse caret */
  }

  #tracker-container .subsection-header td {
    background-color: rgba(94,139,222,0.1);
    border: 1px solid #5e8bde;
    color: var(--md-default-fg-color--light);
    font-style: italic;
    padding: 0.4rem 0.6rem;
    position: relative;  /* for the collapse caret */
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

  /* Reset label: block with a tight top margin so it sits just under details */
  #tracker-container .reset-label {
    display: inline-block;
    margin-top: 0.15rem;
    font-size: 0.90em;
    opacity: 0.85;
    white-space: nowrap;
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
  #tracker-container tr.collected .checkmark { color: #2fb170; /* green when collected */ }

  /* Ready highlight (applied to label and since) */
  .ready-to-collect {
    color: #3fcf6f !important;
    font-weight: 600;
    text-shadow: 0 0 4px rgba(63, 207, 111, 0.5);
  }
  .ready-to-collect .since {
    color: #57ff99 !important;
    font-weight: 500;
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

  /* --- Tighten details/reset stack --- */
  #tracker-container .details { margin-top: 0.15rem; line-height: 1.25; }
  #tracker-container .details br { display: none; }
  #tracker-container .details .reset-label { display: block; margin-top: 0.12rem; line-height: 1.2; }
  #tracker-container .details > div { margin: 0; padding: 0; }

  /* Tiny caret buttons for collapse */
  .caret-btn {
    position: absolute;
    right: 8px;
    top: 6px;
    font-size: 0.85rem;
    padding: 0.05rem 0.35rem;
    border-radius: 4px;
    opacity: 0.85;
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

  /* ====== MOBILE TWEAKS ====== */
  @media (max-width: 600px) {
    #tracker-container p { font-size: 0.85rem; }
    #tracker-container th,
    #tracker-container td { font-size: 0.75rem; padding: 0.2rem 0.4rem; }
    #tracker-container .section-header td { font-size: 0.9rem; padding: 0.4rem; }
    #tracker-container .details { font-size: 0.7rem; }
    #tracker-container button,
    #tracker-container .entry-link { font-size: 0.75rem; }

    /* Let the table decide widths automatically on very small screens */
    #tracker-container table { table-layout: auto; }
    #tracker-container th:nth-child(1),
    #tracker-container td:nth-child(1),
    #tracker-container th:nth-child(2),
    #tracker-container td:nth-child(2),
    #tracker-container th:nth-child(3),
    #tracker-container td:nth-child(3) { width: auto; }
  }

  /* ====== NEW: DAYS-SINCE SUBLINE ====== */
  #tracker-container .since {
    margin-top: 0.15rem;
    font-size: 0.8rem;
    opacity: 0.9;
  }

  /* ====== Tabs Bar ====== */
  #tabs-bar { display:flex; gap:.5rem; align-items:center; margin:.75rem 0 1rem; flex-wrap: wrap; }
  #tabs-bar .tab {
    border:1px solid var(--md-typeset-fg-color--light);
    background:transparent; color:var(--md-default-fg-color--light);
    padding:.25rem .6rem; border-radius:6px; cursor:pointer; font-size:.85rem;
  }
  #tabs-bar .tab.active { background: var(--md-typeset-a-color); color: var(--md-default-fg-color--light); }
  #tabs-bar .spacer { flex:1; }
  #tabs-bar .small { font-size:.8rem; padding:.2rem .5rem; opacity:.9; }

  /* Edit mode */
  .edit-pill { display:inline-block; margin-left:.5rem; font-size:.7rem; padding:.08rem .4rem;
    border-radius:999px; border:1px solid var(--md-typeset-fg-color--light); opacity:.85; }
  .edit-btn, .mini-btn { margin-left:.35rem; font-size:.7rem; padding:.05rem .35rem; border-radius:4px;
    border:1px solid var(--md-typeset-fg-color--light); background:transparent; cursor:pointer; }
  .hidden-row { opacity:.45; }

  /* ====== Sync UI layout helpers (alignment fix) ====== */
  .sync-grid {
    display: grid;
    grid-template-columns: max-content 16rem max-content;
    column-gap: 0.5rem;
    row-gap: 0.5rem;
    align-items: center;
  }
  .sync-label { color: var(--md-default-fg-color--light); /* match header color */ }
  .sync-label-spacer { visibility: hidden; /* reserves label width */ }
  .sync-input { width: 16rem; }

  /* ====== STYLED CONFIRM MODAL ====== */
  .confirm-overlay {
    position: fixed; inset: 0;
    background: rgba(0,0,0,.5);
    display: flex; align-items: center; justify-content: center;
    z-index: 9999;
    animation: confirm-fade-in .15s ease-out;
  }
  .confirm-overlay.closing { animation: confirm-fade-out .15s ease-in forwards; }

  .confirm-dialog {
    background: var(--md-default-bg-color, #1b1b1f);
    color: var(--md-typeset-color, #e6e6e6);
    border: 1px solid var(--md-typeset-fg-color--light, rgba(255,255,255,.15));
    border-radius: 10px;
    min-width: 280px; max-width: 520px;
    padding: 16px 16px 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,.4);
    transform: translateY(4px);
    animation: confirm-pop .15s ease-out;
  }
  .confirm-title { font-weight: 600; margin-bottom: 8px; }
  .confirm-message { opacity: .95; line-height: 1.4; margin-bottom: 14px; }
  .confirm-actions { display: flex; gap: 8px; justify-content: flex-end; }
  .confirm-overlay .btn {
    padding: 6px 12px;
    border-radius: 8px;
    border: 1px solid var(--md-typeset-fg-color--light, rgba(255,255,255,.15));
    background: rgba(128,128,128, .08);
    color: inherit;
    cursor: pointer;
  }
  .confirm-overlay .btn:hover { background: rgba(255,255,255,.08); }
  .confirm-overlay .btn-primary {
    background: rgba(94,139,222,.25);
    box-shadow: inset 0 0 0 1px rgba(94,139,222,.35);
  }
  .confirm-overlay .btn-primary:hover { background: rgba(94,139,222,.35); }

  @keyframes confirm-fade-in { from { opacity: 0 } to { opacity: 1 } }
  @keyframes confirm-fade-out { to { opacity: 0 } }
  @keyframes confirm-pop { from { transform: translateY(8px); opacity: 0 } to { transform: translateY(4px); opacity: 1 } }
</style>


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

  <!-- This is where the sync UI (copyable code + paste-to-sync) appears -->
  <div id="sync-container"></div>
  
  <!-- Main tracker table. JS will fill <tbody> dynamically. -->
  <table id="tracker" class="no-sort">
    <!-- Optional column width -->
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

<!-- Image modal for when users click an entry with an image -->
<div id="modal">
   <div class="modal-content">
     <span class="modal-close">×</span>
     <div id="modal-image"></div>
   </div>
</div>

<script>(function(){
  /* ==========================
     UTF-8 SAFE BASE64 HELPERS
     ========================== */
  const utoa = (str) => {
    const bytes = new TextEncoder().encode(str);
    let bin = '';
    for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  };
  const atou = (b64) => {
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  };

  /* ==========================
     EASTER EGG (one-time via localStorage)
     ========================== */
  const EGG_NAMES = ['lynd', 'theaxolotl', 'gagging', 'nrjank'];
  const EGG_LOCK_KEY = 'respawn_egg_seen_v1';  // prevents repeat triggers in this browser
  const EGG_VIDEO_SRC = '/img/egg/egg.mp4';    // your shipped video

  function showEggVideo() {
    mImgContainer.innerHTML = '';
    const vid = document.createElement('video');
    vid.src = EGG_VIDEO_SRC;
    vid.autoplay = true;
    vid.controls = true;
    vid.playsInline = true;
    vid.preload = 'auto';
    vid.style.maxWidth = 'min(92vw, 1200px)';
    vid.style.maxHeight = '80vh';
    vid.style.display = 'block';
    vid.style.borderRadius = '8px';
    vid.volume = 0.1; // 10%

    // Try to ensure playback even if autoplay policies are touchy
    const tryPlay = () => {
      const p = vid.play?.();
      if (p && typeof p.then === 'function') {
        p.then(() => {}).catch(() => {});
      }
    };
    vid.addEventListener('loadedmetadata', () => { vid.volume = 0.1; tryPlay(); }, { once: true });

    mImgContainer.appendChild(vid);
    modal.style.display = 'flex';
    tryPlay();

    const stopAndClean = () => { try { vid.pause(); } catch {} };
    mClose.addEventListener('click', stopAndClean, { once: true });
    modal.addEventListener('click', function onBg(e){
      if (e.target === modal) { stopAndClean(); modal.removeEventListener('click', onBg); }
    });
  }

  // Only checks the ACTIVE tab name. Returns true if an egg flow was shown.
  // NOTE: safe if currentTabId is not set yet — falls back to first tab.
  async function checkEasterEggTabs() {
    try {
      if (localStorage.getItem(EGG_LOCK_KEY) === '1') return false;

      const safeTabId = (typeof currentTabId !== 'undefined' && currentTabId) || ((tabs && tabs[0]) ? tabs[0].id : null);
      const active = (tabs || []).find(t => t && t.id === safeTabId);
      if (!active || !active.name) return false;

      const n = String(active.name).trim().toLowerCase();
      if (!EGG_NAMES.includes(n)) return false;

      // Ask user first — their click on "Play" will count as a gesture (helps sound-on autoplay).
      const ok = await confirmStyled(
        'You discovered a secret. Want to play it now?',
        { title: 'Surprise!', confirmText: 'Play', cancelText: 'Not now' }
      );
      if (!ok) return false;

      // Lock BEFORE opening so it never re-fires even if navigation is blocked.
      localStorage.setItem(EGG_LOCK_KEY, '1');

      // Open the egg video in our modal (autoplay w/ volume 10%)
      showEggVideo();
      return true;
    } catch {
      return false;
    }
  }

  // Styled confirm that returns a Promise<boolean>
  function confirmStyled(message, { title = 'Confirm', confirmText = 'OK', cancelText = 'Cancel' } = {}) {
    return new Promise(resolve => {
      // container
      const overlay = document.createElement('div');
      overlay.className = 'confirm-overlay';
      overlay.innerHTML = `
        <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="confirm-title">
          <div class="confirm-title" id="confirm-title">${title}</div>
          <div class="confirm-message">${message}</div>
          <div class="confirm-actions">
            <button class="btn btn-secondary confirm-cancel" type="button">${cancelText}</button>
            <button class="btn btn-primary confirm-ok" type="button">${confirmText}</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const okBtn = overlay.querySelector('.confirm-ok');
      const cancelBtn = overlay.querySelector('.confirm-cancel');

      const close = (val) => {
        overlay.classList.add('closing');
        // remove after animation (fallback 200ms)
        setTimeout(() => overlay.remove(), 200);
        resolve(val);
      };

      okBtn.onclick = () => close(true);
      cancelBtn.onclick = () => close(false);
      overlay.onclick = (e) => { if (e.target === overlay) close(false); };
      document.addEventListener('keydown', function onKey(e){
        if (e.key === 'Escape') { document.removeEventListener('keydown', onKey); close(false); }
        if (e.key === 'Enter')  { document.removeEventListener('keydown', onKey); close(true); }
      }, { once: true });

      // basic focus mgmt
      okBtn.focus();
    });
  }

  // Styled prompt that returns a Promise<string|null>
  function promptStyled(message, defaultValue = '', {
    title = 'Rename',
    confirmText = 'Save',
    cancelText = 'Cancel',
    placeholder = ''
  } = {}) {
    return new Promise(resolve => {
      const overlay = document.createElement('div');
      overlay.className = 'confirm-overlay';
      overlay.innerHTML = `
        <div class="confirm-dialog" role="dialog" aria-modal="true" aria-labelledby="prompt-title">
          <div class="confirm-title" id="prompt-title">${title}</div>
          <div class="confirm-message" style="margin-bottom:.5rem">${message}</div>
          <div class="confirm-input-row">
            <input class="confirm-input" type="text" placeholder="${placeholder}" value="${String(defaultValue).replace(/"/g,'&quot;')}">
          </div>
          <div class="confirm-actions">
            <button class="btn btn-secondary confirm-cancel" type="button">${cancelText}</button>
            <button class="btn btn-primary confirm-ok" type="button">${confirmText}</button>
          </div>
        </div>
      `;
      document.body.appendChild(overlay);

      const input = overlay.querySelector('.confirm-input');
      const okBtn = overlay.querySelector('.confirm-ok');
      const cancelBtn = overlay.querySelector('.confirm-cancel');

      const close = (val) => {
        overlay.classList.add('closing');
        setTimeout(() => overlay.remove(), 200);
        resolve(val);
      };

      okBtn.onclick = () => close(input.value.trim() || '');
      cancelBtn.onclick = () => close(null);
      overlay.onclick = (e) => { if (e.target === overlay) close(null); };

      document.addEventListener('keydown', function onKey(e){
        if (e.key === 'Escape') { document.removeEventListener('keydown', onKey); close(null); }
        if (e.key === 'Enter')  { document.removeEventListener('keydown', onKey); close(input.value.trim() || ''); }
      }, { once: true });

      // focus the input so Enter works and user can type immediately
      input.focus();
      input.select();
    });
  }



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

  /** 
   * Parse an interval (in days) from an item's details text.
   * Supports: "[30 days]", "every 7 days", "respawns every 1-2 days",
   * respawns daily", "daily", "weekly", "monthly".
   */
  function parseIntervalDaysFromDetails(str) {
    if (!str) return null;
    const s = str.replace(/[\u2012-\u2015]/g, '-');
    let m;
    // [30 days]
    m = s.match(/\[(\d+)\s*days?\]/i);
    if (m) return Number(m[1]);
    // every 7 days / respawns every 7 days / produces one ... every 7 days
    m = s.match(/\b(?:every|respawns?\s+every|produces?\s+one.*every|per|in)\s+(\d+)(?:\s*-\s*(\d+))?\s*days?\b/i);
    if (m) { 
      const a = Number(m[1]), b = m[2] ? Number(m[2]) : null; return b ? Math.max(a,b) : a; 
    }

    // respawns daily / daily
    if (/\brespawns?\s+daily\b/i.test(s) || /\bdaily\b/i.test(s)) return 1;

    // weekly
    if (/\bweekly\b/i.test(s)) return 7;

    // monthly (approximate as 30 days)
    if (/\bmonthly\b/i.test(s)) return 30;

    return null;
  }

  /** 
   * Next reset that’s based on the user's last collected timestamp.
   * If collected ts is missing, we return null (so we can show "after first collect").
   */
  function getNextResetFromCollected(ts, days) {
    if (!ts || !days) return null;
    const period = days * 24 * 60 * 60 * 1000;
    const now = Date.now();
    // Ensure the next future multiple of the period after ts
    const elapsed = Math.max(0, now - ts);
    const cycles = Math.floor(elapsed / period) + 1;
    return new Date(ts + cycles * period);
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
      title: 'Ancient Mausoleum',
      items: [
        {
          id: 'cauldron_mausoleum',
          title: 'Crucible Mausoleum Reset',
          details: 'A new set of 4 to 6 Adventurer’s Remains become available in the Crucible Mausoleum every 2 weeks.',
          reset: { 
            reference: '2025-05-31T10:00:00',  // Initial reset anchor time (local time) 
            intervalWeeks: 2                   // Repeat every 2 weeks 
          },
          image: '',                           // No image: remains non-clickable 
          clickable: false
        },
        {
          id: 'furnace_tallow',
          title: 'Tallow of Bone Summoning - Furnace of Deathsmoke',
          details: 'Furnace of Deathsmoke located at the Ancient Mausoleum selection screen. Produces one tallow every 7 days.',
          image: '/abyss-guides/ancient-mausoleum/img/maus-furnace.jpg', 
          clickable: true
        },
        {
          id: 'bonepicker_tallow',
          title: 'Tallow of Bone Summoning - Bone Picker',
          details: 'The wandering Bone Picker will sell you one tallow for 10,000gp every 7 days.',
          image: '/abyss-guides/1-beginning-abyss/img/a1-bone-picker.jpg', 
          clickable: true
        }
      ]
    },
    {
      title: "Adventurer’s Remains",
      items: [
        { subheader: 'Beginning Abyss' },
        {
          id: 'b1f_awakened_chamber',
          title: 'Old Remains: Cursed Wheel to Awakening',
          details: 'Part of the Intro. [30 days]',
          image: '/appendices/img/respawning-bone-death-stench.jpg',
          clickable: false
        },
        {
          id: 'b1f_stench_quest',
          title: 'Class Remains: B1F (Death Stench Investigation Request)',
          details: 'Wheel to Kings Rescue, accept the Request in the Adventurers Guild, and head to the location. [30 days]',
          image: '/tools/img/bones/respawning-bone-death-stench.jpg',
          clickable: true
        },
        {
          id: 'b3f_goblin_south',
          title: 'Adventurer’s Remains: B3F (Goblin’s Nest - chest)',
          details: 'Wheel to Kings Rescue and head to the chest location south of the Goblin Nest entrance. [30 days]',
          image: '/tools/img/bones/respawning-bone-goblin-den.jpg',
          clickable: true
        },
        {
          id: 'b3f_goblin_northeast',
          title: 'Adventurer’s Remains: B3F (Goblin’s Nest - Goblin Boss)',
          details: 'Wheel to Kings Rescue and head to the goblin fight in the northeast. [30 days]',
          image: '/tools/img/bones/respawning-bone-goblin-den.jpg',
          clickable: true
        },
        {
          id: 'b4f_rubble',
          title: 'Adventurer’s Remains: B4F',
          details: 'Assuming you wheeled to Kings Rescue already, head to the location. It\'s in the Left chest. If you take the one on the Right, the bone chest disappears! [30 days]',
          image: '/tools/img/bones/respawning-bone-b4f.jpg',
          clickable: true
        },
        {
          id: 'b5f_toxin_swamps',
          title: 'Adventurer’s Remains: B5F',
          details: 'Assuming you wheeled to Kings Rescue already, head to the location. [30 days]',
          image: '/tools/img/bones/respawning-bone-b5f.jpg',
          clickable: true
        },
        {
          id: 'b6f_before_statue',
          title: 'Adventurer’s Remains: B6F',
          details: 'Same as above, you need to come in from B5F to take the portals. [7 days]',
          image: '/tools/img/bones/respawning-bone-b6f.jpg',
          clickable: true
        },
        {
          id: 'b7f_rubble_reverse',
          title: 'Adventurer’s Remains: B7F',
          details: 'Same as below, you need to first drop the rocks on B8F. [30 days]',
          image: '/tools/img/bones/respawning-bone-b7f.jpg',
          clickable: true
        },
        {
          id: 'b8f_nutrient',
          title: 'Adventurer’s Remains: B8F',
          details: 'Assuming you wheeled to Kings Rescue already, head to the location. Watch out, this chest might be a mimic. [30 days]',
          image: '/tools/img/bones/respawning-bone-b8f.jpg',
          clickable: true
        },
        { subheader: 'Trade Waterway' },
        {
          id: 'trade_waterway_pier',
          title: 'Adventurer’s Remains: 7th District (Shore of the Dead)',
          details: 'Bone will not respawn after Abyss 2 GWO is killed. You will need to cursed wheel before then. [30 days]',
          image: '/tools/img/bones/respawning-bone-pier-location.jpg',
          clickable: true
        },
        { subheader: 'Impregnable Fortress' },
        {
          id: 'fortress_catacombs',
          title: 'Adventurer’s Remains: Catacombs',
          details: 'Solve the candle puzzle to open the door to the room with the bone. Touch the door, touch it again to activate puzzle, then light candles in that order shown in image. (x:2, y:19) [30 days]',
          image: '/tools/img/bones/respawning-bone-catacomb.jpg',
          clickable: true
        },
        { subheader: 'Other'},
        {
          id: 'bonepicker_bone',
          title: 'Adventurer’s Remains - Bone Picker',
          details: 'The wandering Bone Picker will sell you one set of Adventurer’s Remains for 1,000gp every 7 days.',
          image: '/abyss-guides/1-beginning-abyss/img/a1-bone-picker.jpg', 
          clickable: true
        }
      ]
    },
    {
      title: 'Equipment, Items, and Request Rewards',
      items: [
        { subheader: 'Beginning Abyss' },
        { subheader: 'Chest Items' },
        {
          id: 'abyss_b1f_feathered',
          title: 'Feathered Cap',
          details: 'Chest in B1F 3-chest room (x:23, y:11) [2 days]',
          image: '/tools/img/other/respawning-feathered-hat-a1-b1f.jpg',
          clickable: true 
        },
        {
          id: 'abyss_b3f_exorcism',
          title: 'Exorcism Leather',
          details: 'Chest in B3F (x:24, y:9) [2 days]',
          image: '/tools/img/other/respawning-exorcism-leather-a1-b3f.jpg',
          clickable: true,
        },
        {
          id: 'abyss_b3f_resistance',
          title: 'Ring of Resistance',
          details: 'Chest in B3F (x:12, y:19) [2 days]',
          image: '/tools/img/other/respawning-ring-of-resistance-a1-b3f.jpg',
          clickable: true,
        },
        {
          id: 'abyss_b4f_halberd',
          title: 'Halberd',
          details: 'Chest in B4F (x:2, y:4) [2 days]',
          image: '/tools/img/other/respawning-halberd-a1-b4f.jpg',
          clickable: true,
        },
        {
          id: 'abyss_b5f_huntsman',
          title: "Huntsman's Bow [2 days]",
          details: 'Chest in B5F Southwest 3-chest room (x:8, y:2)',
          image: '/tools/img/other/respawning-huntsman-bow-a1-b5f.jpg',
          clickable: true,
        },
        {
          id: 'abyss_b5f_breeze',
          title: 'Sword of the Breeze',
          details: 'Chest in B5F East 3-chest room (x:22, y:15)',
          image: '/tools/img/other/respawning-breeze-sword-a1-b5f.jpg',
          clickable: true,
        },
        {
          id: 'bracelet_of_impurity',
          title: 'Bracelet of Impurity',
          details: 'Chest in B8F (x:0, y:22)',
          image: '/tools/img/other/respawning-impurity-bracelet-a1-b8f.jpg',
          clickable: true,
        },
        {
          id: 'a1_b8f_nourishingpotions',
          title: 'Nourishing Draught x3',
          details: 'Chest in B8F (x:19, y:12) - respawns daily',
          image: '/tools/img/other/respawning-sp-pots-a1-b8f.jpg',
          clickable: true,
        },
        { subheader: 'Request Rewards' },
        {
          id: 'a1_royal_family_ring',
          title: 'Royal Family Ring',
          details: 'Optional request Reward from "Sweet Walnut Collection" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'bracelet_of_urgency',
          title: 'Bracelet of Urgency',
          details: 'Request Reward from "Knight-Butcher Ent Proliferation" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'undead_ward',
          title: 'Undead Ward',
          details: 'Request Reward from "Abyss Heretics" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'plague_mask',
          title: 'Plague Mask',
          details: 'Request Reward from clear all waves in "March of the Undead" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'digger_pickaxe',
          title: 'Digging Mattock',
          details: 'Request Reward from (not) "Saving Lambert" [30 days]',
          image: '',
          clickable: false,
        },
        {
          id: 'royal_amulet',
          title: 'Royal Herald Amulet',
          details: 'Request Reward from "Save the King" [30 days]',
          image: '',
          clickable: false,
        },
        { subheader: 'Trade Waterway' },
        { subheader: 'Chest Items' },
        {
          id: 'a2-district1-manapots',
          title: 'Mana Elixer x2',
          details: 'Chest in 1st District behind locked door (x:10, y:22). Respawns monthly.',
          image: '/tools/img/other/respawning-mana-pot-a2-district1.jpg',
          clickable: true,
        },
        {
          id: 'lightfoot_sandals',
          title: 'Light Sandals',
          details: 'Chest in 3rd District near ambush room (x:17, y:1). Respawns monthly.',
          image: '/tools/img/other/respawning-light-sandals-a2-district3.jpg',
          clickable: true,
        },
        {
          id: 'thieves_gloves',
          title: "Thieves' Gloves",
          details: 'Chest in 4th District near Harken room (x:26, y:20). Respawns monthly.',
          image: '/tools/img/other/respawning-thieves-gloves-a2-district4.jpg',
          clickable: true,
        },
        {
          id: 'a2-dist4-dagger_of_the_soil',
          title: 'Dagger of the Soil',
          details: 'Chest in 4th District in the northwest room (x:0, y:22). Respawns monthly.',
          image: '/tools/img/other/respawning-earth-dagger-a2-district4.jpg',
          clickable: true,
        },
        {
          id: 'man_eater',
          title: 'Man-Eater',
          details: 'Chest in 5th District (x:6, y:23). Respawns monthly.',
          image: '/tools/img/other/respawning-man-eater-a2-district5.jpg',
          clickable: true,
        },
        {
          id: 'mask_water_deity',
          title: 'Mask of the Water God',
          details: 'Chest in 6th District (x:7, y:22). Respawns monthly.',
          image: '/tools/img/other/respawning-mask-of-the-water-god-a2-district6.jpg',
          clickable: true,
        },
        {
          id: 'a2-ship2-manapots',
          title: 'Mana Elixer x3',
          details: 'Chest in Ship 2 Treasure Room (x:14, y:13) with 2x Deep-Water Gleaming Crystals. Respawns monthly.',
          image: '/tools/img/other/respawning-mana-pot-a2-ship2.jpg',
          clickable: true,
        },

        { subheader: 'Request Rewards' },
        {
          id: 'bird_dropper',
          title: 'Bird-Dropper',
          details: 'Request Reward from "Hydra Plant Procurement. Respawns monthly."',
          image: '',
          clickable: false,
        },
        {
          id: 'bloodstained_gloves',
          title: 'Bloodstained Gloves',
          details: 'Request Reward from "Servant and Cargo Recovery" (select "Turn them all over to the merchant"). Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'melgina_choker',
          title: 'Melgina’s Choker',
          details: 'Defeat Octonarus after giving Melgina the Mackerel Sandwich. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'octonaras_necklace',
          title: 'Octonarus’s Necklace',
          details: 'Defeat Octonarus after giving Melgina the Titanium Knife. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'tyranny_cutlass',
          title: 'Cutlass of Tyranny',
          details: 'Choose "Octonarus‘s Cherished Sword" after defeating Octonarus. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'quest-reward-2a-princess-route',
          title: 'Shield of Honor',
          details: 'Request Reward from "Missing Person (Princess Route)". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'quest-reward-2a-pontiff-route',
          title: 'Book of Sanctuary\'s Blessing Secrets',
          details: 'Request Reward from "Missing Person (Pontiff Route)". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'quest-reward-2a-admiral-route',
          title: 'Twin Pearls',
          details: 'Request Reward from "Missing Person (Admiral Route)". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'sea_god_pearl',
          title: 'Pearl of the Sea God',
          details: 'Quest Reward from "Arena Tournament by Avare". Respawns monthly.',
          image: '',
          clickable: false,
        },

        { subheader: 'Impregnable Fortress' },
        { subheader: 'Chest Items' },
        {
          id: 'a3_z2_nourishingpotions',
          title: 'Nourishing Draught x3',
          details: 'Chest in Zone 2 (x:4, y:15). Chest also contains 1-2x Crimson Lustrous Ore + Scroll of Flash. [2 days].',
          image: '/tools/img/other/respawning-sp-pots-a3-zone2.jpg',
          clickable: true,
        },
        {
          id: 'skull_necklace_chest',
          title: 'Skull Necklace - Zone 2 chest',
          details: 'Chest in Zone 2 (x:23, y:25). Requires low corrosion (exact level uncertain). Respawns monthly.',
          image: '/tools/img/other/respawning-skull-necklace-a3-zone2.jpg',
          clickable: true,
        },
        {
          id: 'goats_cloak_a3_chest',
          title: 'Goatskin Cloak',
          details: 'Chest in Zone 6 (x:24, y:14). Respawns monthly.',
          image: '/tools/img/other/respawning-goatskin-cloak-a3-zone6.jpg',
          clickable: true,
        },
        {
          id: 'a3_z9_mana_pots',
          title: 'Mana Elixir x3',
          details: 'Chest in Zone 9 (x:16, y:0). Respawns monthly.',
          image: '/tools/img/other/respawning-mana-pot-a3-office.jpg',
          clickable: true,
        },

        { subheader: 'Request Rewards' },
        {
          id: 'skull_necklace_quest',
          title: 'Skull Necklace - Request Reward',
          details: 'Quest Reward from "Putting Evil Spirits to Rest". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'enemy_scope',
          title: 'Enemy Spyglass',
          details: 'Request Reward from "Bodyguard for Ruins Exploration". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'demonic_crystal',
          title: 'Magic-Made Crystal',
          details: 'Request Reward from "Forbidden Area Search Escort". Select "I know all about your family\'s sins" (4th option) at the end of the quest. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'goats_cloak_a3reward',
          title: 'Goatskin Cloak',
          details: 'Request Reward from "Antique Scarlet Doll". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'knights_cloak',
          title: 'Knight’s Cloak',
          details: 'Request Reward from "Expedition to Clear the Fortress Lower Levels". Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'glittering_ring',
          title: 'Shining Finger Band',
          details: 'Reward from beating Morgus, God of Death. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'elegant_dancer',
          title: 'Elegant Dancer',
          details: 'Admiral Route Clear Reward. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'tome_shieldbearer',
          title: 'Book of Steadfast Shield Soldier Secrets. Respawns monthly.',
          details: 'Princess Route Clear Reward',
          image: '',
          clickable: false,
        },
        {
          id: 'holy_white_gem',
          title: 'Holy White Stone',
          details: 'Pontiff Route Clear Reward. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'embroidered_hankerchief',
          title: 'Golden Embroidered Handkerchief',
          details: 'Request Reward from Cleanup Operation quest reward. Respawns monthly.',
          image: '',
          clickable: false,
        },
        {
          id: 'everlasting_lily',
          title: 'Everlasting Lily',
          details: 'Request Reward from "Requiem for the Evil Spirit" quest. Respawns monthly.',
          image: '',
          clickable: false,
        },
      ]
    }
  ];

  /* ==========================
     PERSISTENCE
     ==========================
     Data lives in localStorage under STORAGE_KEY.
     'data' is an object mapping item.id -> timestamp(ms) of last collection.
  */
  const STORAGE_KEY_OLD = 'respawn_acquisition_data';
  const TABS_KEY     = 'respawn_tabs_v1';
  const CUR_TAB_KEY  = 'respawn_current_tab_id_v1';
  const DATA_PREFIX  = 'respawn_acquisition_data__';
  // a single global store so times are synced across tabs
  const DATA_GLOBAL_KEY = 'respawn_acquisition_data_alltabs_v1';

  const deepClone = obj => JSON.parse(JSON.stringify(obj));
  const BASE_SECTIONS = deepClone(SECTIONS);

  // === OVERRIDES: user-edited text per item.id, per tab ===
  const OVERRIDES_PREFIX = 'respawn_overrides__'; // storage key prefix per tab
  function loadOverrides(tabId){
    try { return JSON.parse(localStorage.getItem(OVERRIDES_PREFIX + tabId) || '{}'); } catch { return {}; }
  }
  function saveOverrides(tabId, overrides){
    localStorage.setItem(OVERRIDES_PREFIX + tabId, JSON.stringify(overrides || {}));
  }
  // Helpers to read display values with overrides
  function getDisplayTitle(it, overridesForTab){
    const ov = overridesForTab[it.id];
    return (ov && typeof ov.title === 'string' && ov.title.length) ? ov.title : it.title || '';
  }
  function getDisplayDetails(it, overridesForTab){
    const ov = overridesForTab[it.id];
    return (ov && typeof ov.details === 'string' && ov.details.length) ? ov.details : (it.details || '');
  }

  // === CONTENT VERSION + REBASE/MIGRATION ===
  const CONTENT_VER_KEY = 'respawn_base_content_version_v3';
  const BASE_CONTENT_VERSION = 5;

  const deepEqual = (a,b) => JSON.stringify(a) === JSON.stringify(b);

  function loadTabs() {
    const raw = localStorage.getItem(TABS_KEY);
    let t;
    if (raw) { try { t = JSON.parse(raw); } catch {} }
    if (!Array.isArray(t) || t.length === 0) {
      t = [createDefaultTab()];
      localStorage.setItem(TABS_KEY, JSON.stringify(t));
      localStorage.setItem(CUR_TAB_KEY, 'default');
      const old = localStorage.getItem(STORAGE_KEY_OLD);
      if (old) localStorage.setItem(DATA_PREFIX + 'default', old);
    }
    return t;
  }

  function saveTabs(tabs) { localStorage.setItem(TABS_KEY, JSON.stringify(tabs)); }
  function getCurrentTabId(){ return localStorage.getItem(CUR_TAB_KEY) || 'default'; }
  function setCurrentTabId(id){ localStorage.setItem(CUR_TAB_KEY, id); }
  function dataKeyFor(tabId){ return DATA_PREFIX + tabId; }

  // GLOBAL-first load/save (mirror to legacy per-tab keys for back-compat)
  function loadData(tabId){
    const g = localStorage.getItem(DATA_GLOBAL_KEY);
    if (g) { try { return JSON.parse(g) || {}; } catch { return {}; } }
    try { return JSON.parse(localStorage.getItem(dataKeyFor(tabId)) || '{}'); } catch { return {}; }
  }
  function saveData(tabId, obj){
    const payload = JSON.stringify(obj || {});
    localStorage.setItem(DATA_GLOBAL_KEY, payload);         // single source of truth
    if (tabId) localStorage.setItem(dataKeyFor(tabId), payload); // mirror
  }

  function createDefaultTab() {
    return { id: 'default', name: 'Default', sections: deepClone(BASE_SECTIONS) };
  }

  // Helper: index items by id for diffing/migration
  function indexItemsById(sections){
    const map = {};
    (sections || []).forEach(sec => {
      (sec.items || []).forEach(it => { if (it && it.id && !it.subheader) map[it.id] = it; });
    });
    return map;
  }

  // === REBASE / MIGRATION: move user text edits to overrides and refresh base content ===
  function rebaseTabsIfNeeded() {
    const currentVer = Number(localStorage.getItem(CONTENT_VER_KEY) || 0);
    if (currentVer >= BASE_CONTENT_VERSION) return;

    // Build base index
    const baseIdx = indexItemsById(BASE_SECTIONS);

    // For each tab: migrate edits->overrides, preserve flags, replace sections with BASE_SECTIONS
    tabs.forEach(tab => {
      const prevSections = tab.sections || [];
      const prevIdx = indexItemsById(prevSections);

      // Load existing overrides (if any)
      const ov = loadOverrides(tab.id);

      // Collect user edits compared to new base:
      // If stored title/details differ from BASE_SECTIONS, treat as user override.
      Object.keys(prevIdx).forEach(id => {
        const oldItem = prevIdx[id];
        const baseItem = baseIdx[id];
        if (!baseItem) return;

        // Title override
        if (typeof oldItem.title === 'string' && oldItem.title.length && oldItem.title !== baseItem.title) {
          ov[id] = ov[id] || {};
          ov[id].title = oldItem.title;
        }
        // Details override
        if (typeof oldItem.details === 'string' && oldItem.details.length && oldItem.details !== (baseItem.details || '')) {
          ov[id] = ov[id] || {};
          ov[id].details = oldItem.details;
        }
      });

      // Now clone fresh sections from base
      const newSections = deepClone(BASE_SECTIONS);

      // Re-apply hidden/collapsed flags to matching items by id
      const newIdx = indexItemsById(newSections);
      Object.keys(prevIdx).forEach(id => {
        const oldItem = prevIdx[id], target = newIdx[id];
        if (target) {
          if (oldItem.hidden) target.hidden = true;
          if (oldItem.collapsed) target.collapsed = true;
        }
      });

      // Also preserve section-level _collapsed (by section order)
      (newSections || []).forEach((sec, i) => {
        if (prevSections[i] && prevSections[i]._collapsed) sec._collapsed = true;
        // Preserve subheader hidden/collapsed by position (best-effort)
        const prevItems = (prevSections[i] && prevSections[i].items) || [];
        const newItems  = (sec.items || []);
        for (let j=0; j<newItems.length; j++){
          const pi = prevItems[j], ni = newItems[j];
          if (!ni || !pi) continue;
          if (pi.subheader && ni.subheader) {
            if (pi.hidden)   ni.hidden = true;
            if (pi.collapsed) ni.collapsed = true;
          }
        }
      });

      tab.sections = newSections;
      saveOverrides(tab.id, ov);
    });

    saveTabs(tabs);
    localStorage.setItem(CONTENT_VER_KEY, String(BASE_CONTENT_VERSION));
  }

  let tabs = loadTabs();

  let currentTabId = getCurrentTabId();
  if (!tabs.find(t => t.id === currentTabId)) {
    currentTabId = tabs[0].id;
    setCurrentTabId(currentTabId);
  }

  // Run migration/rebase before reading data/overrides for active tab
  rebaseTabsIfNeeded();

  let data = loadData(currentTabId);
  let overrides = loadOverrides(currentTabId);

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
     HELPER: DATE/TIME FORMATTING
     ==========================
     - formatDate: returns localized "Last Collected" label
     - pad2:       2-digit helper for HH:MM:SS
     - formatDaysSinceWithClock: returns "X days (HH:MM:SS)" live display
  */
  function formatDate(ts) { return ts ? new Date(ts).toLocaleString() : '-'; }
  function pad2(n){ return String(n).padStart(2,'0'); }

  /* Returns "X days (HH:MM:SS)" where HH:MM:SS is the remainder inside the current day. */
  function formatDaysSinceWithClock(ts, nowMs) {
    if (!ts) return '-';
    const now = nowMs ?? Date.now();
    let diff = Math.max(0, now - ts); // avoid negative
    const dayMs = 24*60*60*1000;
    const days = Math.floor(diff / dayMs);
    diff = diff % dayMs;
    const h = Math.floor(diff / (60*60*1000));
    const m = Math.floor((diff % (60*60*1000)) / (60*1000));
    const s = Math.floor((diff % (60*1000)) / 1000);
    const dayLabel = days === 1 ? '1 day' : `${days} days`;
    return `${dayLabel} (${pad2(h)}:${pad2(m)}:${pad2(s)})`;
  }

  /* Save current 'data' into localStorage. */
  function save() {
    saveData(currentTabId, data);
    // --- keep Sync Code live without a full re-render ---
    const datasets = {};
    const overridesMap = {}; // === OVERRIDES in Export
    (tabs || []).forEach(t => {
      datasets[t.id] = loadData(t.id) || {};
      overridesMap[t.id] = loadOverrides(t.id) || {};
    });
    const payload = {
      tabs: (tabs || []).map(t => ({
        id: t.id,
        name: t.name,
        sections: t.sections // includes hidden/collapsed flags
      })),
      currentTabId,
      datasets,
      overrides: overridesMap,
      showHidden: !!showHidden
    };
    const codeEl = document.getElementById('sync-code-input');
    if (codeEl) {
      codeEl.value = utoa(JSON.stringify(payload));
    }
  }

  /* ==========================
     TABS / EDIT MODE STATE
     ========================== */
  let editMode = false;
  let showHidden = false;
  function createDefaultTab() {
    return { id: 'default', name: 'Default', sections: deepClone(BASE_SECTIONS) };
  }

  /* ==========================
     SYNC UI
     ========================== */
  function initializeSyncUI() {
    // Reset container each re-render
    syncCt.innerHTML = '';

    // --- Unified Sync Block (grid for alignment) ---
    const syncGrid = document.createElement('div');
    syncGrid.className = 'sync-grid';

    // Build payload (tabs + per-tab timestamps)
    const datasets = {};
    const overridesMap = {};
    (tabs || []).forEach(t => { 
      datasets[t.id] = loadData(t.id) || {}; 
      overridesMap[t.id] = loadOverrides(t.id) || {};
    });
    const payload = {
      tabs: (tabs || []).map(t => ({ id: t.id, name: t.name, sections: t.sections })),
      currentTabId,
      datasets,
      overrides: overridesMap,
      showHidden: !!showHidden
    };

    // Generate a shareable code for the current data
    const currentCode = utoa(JSON.stringify(payload)); // UTF-8 safe

    // Row 1: label | code input | copy
    const codeLabel = document.createElement('span'); 
    codeLabel.textContent = 'Export Code:';
    codeLabel.className = 'sync-label';

    const codeInput = document.createElement('input'); 
    codeInput.id = 'sync-code-input'; /* id so we can live-update */
    codeInput.readOnly = true; 
    codeInput.value = currentCode; 
    codeInput.className = 'sync-input';

    const copyBtn = document.createElement('button');
    copyBtn.textContent = 'Copy';
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeInput.value);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy'), 1200);
    });

    // Row 2: (hidden spacer) | paste input | sync
    const spacer = document.createElement('span');
    spacer.className = 'sync-label sync-label-spacer';
    spacer.textContent = 'Sync Code:'; // invisible but same width for alignment

    const pasteInput = document.createElement('input');
    pasteInput.placeholder = 'Paste Export Code';
    pasteInput.className = 'sync-input';

    const syncBtn = document.createElement('button');
    syncBtn.textContent = 'Import';
    syncBtn.addEventListener('click', () => {
      const txt = pasteInput.value.trim();
      if (!txt) return alert('Please paste a code.');
      try {
        const obj = JSON.parse(atou(txt)); // UTF-8 safe decode
        if (!obj || !Array.isArray(obj.tabs) || !obj.currentTabId || !obj.datasets) throw new Error('bad payload');

        // Preserve all section state (hidden/collapsed) as provided
        tabs = obj.tabs.map(t => ({ id: t.id, name: t.name || 'Tab', sections: t.sections || [] }));
        saveTabs(tabs);

        // Merge all per-tab datasets to newest timestamp per id
        const merged = {};
        for (const key in obj.datasets) {
          const ds = obj.datasets[key] || {};
          for (const id in ds) {
            const ts = ds[id];
            if (merged[id] == null || (typeof ts === 'number' && ts > merged[id])) merged[id] = ts;
          }
        }

        // Import overrides per tab
        const incomingOverrides = obj.overrides || {};
        (tabs || []).forEach(t => {
          const o = incomingOverrides[t.id] || {};
          saveOverrides(t.id, o);
        });

        currentTabId = tabs.find(x => x.id === obj.currentTabId)?.id || (tabs[0] && tabs[0].id);
        setCurrentTabId(currentTabId);
        saveData(currentTabId, merged);  // write once to global (+mirror)
        data = loadData(currentTabId);
        overrides = loadOverrides(currentTabId);

        showHidden = !!obj.showHidden;
        render();
      } catch (e) {
        alert('Invalid sync code');
      }
    });

    // Append rows to grid
    syncGrid.append(codeLabel, codeInput, copyBtn, spacer, pasteInput, syncBtn);

    // --- Tabs + Tools Row ---
    const tabsRow = document.createElement('div');
    Object.assign(tabsRow.style, { display:'flex', flexWrap:'wrap', gap:'0.5rem', alignItems:'center', marginTop:'0.5rem' });

    (tabs || []).forEach(t => {
      const b = document.createElement('button');
      b.textContent = t.name;
      b.className = 'tab' + (t.id === currentTabId ? ' active' : '');
      Object.assign(b.style, { 
        padding:'0.25rem 0.5rem',
        border:'1px solid var(--md-typeset-fg-color--light)',
        borderRadius:'4px',
        background: (t.id === currentTabId) ? 'rgba(94,139,222,0.25)' : 'rgba(128,128,128,0.08)',
        boxShadow: (t.id === currentTabId) ? 'inset 0 0 0 1px rgba(94,139,222,0.35)' : 'inset 0 0 0 1px rgba(255,255,255,0.05)',
        opacity: (t.id === currentTabId) ? '1' : '0.92'
      });
      b.onmouseenter = () => { if (t.id !== currentTabId) b.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.15)'; };
      b.onmouseleave = () => { if (t.id !== currentTabId) b.style.boxShadow = 'inset 0 0 0 1px rgba(255,255,255,0.05)'; };
      b.onclick = async () => {
        currentTabId = t.id;
        setCurrentTabId(currentTabId);
        data = loadData(currentTabId);
        overrides = loadOverrides(currentTabId);
        // Render immediately so the UI switches tabs without refresh
        render();
        // Then run the egg flow (best-effort; plays in modal)
        await checkEasterEggTabs();
      };
      tabsRow.appendChild(b);
    });

    // --- Controls on the right ---
    const spacerFlex = document.createElement('div');
    spacerFlex.style.flex = '1';
    tabsRow.appendChild(spacerFlex);

    // Edit Mode toggle
    const editBtn = document.createElement('button');
    editBtn.textContent = editMode ? 'Exit Edit Mode' : 'Edit Mode';
    editBtn.className = 'tab small';
    editBtn.type = 'button';
    editBtn.onclick = () => { editMode = !editMode; render(); };
    tabsRow.appendChild(editBtn);

    // Show/Hide Hidden
    const sh = document.createElement('button');
    sh.className = 'tab small';
    sh.textContent = showHidden ? 'Hide Hidden' : 'Show Hidden';
    sh.type = 'button';
    sh.onclick = () => { showHidden = !showHidden; renderRowsOnly(); initializeSyncUI(); };
    tabsRow.appendChild(sh);

    // + New Tab (hidden when >= 6 tabs)
    if ((tabs || []).length < 6) {
      const add = document.createElement('button');
      add.className = 'tab small';
      add.textContent = '+ New Tab from Default';
      add.type = 'button';
      add.onclick = async () => {
        const id = 'tab_' + Math.random().toString(36).slice(2, 8);
        tabs.push({ id, name: 'Custom', sections: deepClone(BASE_SECTIONS) });
        saveTabs(tabs);

        const curData = loadData(currentTabId) || {};
        saveData(id, JSON.parse(JSON.stringify(curData)));

        // Start new tab with a copy of current overrides too (nice UX)
        const curOv = loadOverrides(currentTabId) || {};
        saveOverrides(id, JSON.parse(JSON.stringify(curOv)));

        setCurrentTabId(id);
        currentTabId = id;
        data = loadData(id);
        overrides = loadOverrides(id);

        render();
        await checkEasterEggTabs();
      };
      tabsRow.appendChild(add);
    }

    // Rename Tab (always visible)
    const ren = document.createElement('button');
    ren.className = 'tab small';
    ren.textContent = 'Rename Tab';
    ren.type = 'button';
    ren.onclick = async () => {
      const t = tabs.find(x => x.id === currentTabId);
      if (!t) return;

      const nv = await promptStyled('Rename tab:', t.name, {
        title: 'Rename Tab',
        confirmText: 'Rename',
        cancelText: 'Cancel',
        placeholder: 'New tab name'
      });

      if (nv && nv.trim()) {
        t.name = nv.trim();
        saveTabs(tabs);
        // Refresh the tabs row immediately
        initializeSyncUI();
        await checkEasterEggTabs();
      }
    };
    tabsRow.appendChild(ren);

    // Delete Tab
    // - Hide the button when there’s only one tab (regardless of its id)
    // - Also hide + disable when the current tab is the default tab
    const isLastTab = (tabs.length === 1);
    const currentIsDefault = currentTabId === 'default';

    // Only show the button if there’s more than one tab AND not currently viewing Default
    if (!isLastTab && !currentIsDefault) {
      const del = document.createElement('button');
      del.className = 'tab small';
      del.textContent = 'Delete Tab';
      del.type = 'button';

      del.onclick = async () => {
        // HARD GUARDS: Never delete Default or the last remaining tab
        if (tabs.length <= 1) return;
        if (currentTabId === 'default') return;

        if (!(await confirmStyled('Delete this tab? Its data will be removed.', {
          title: 'Delete tab',
          confirmText: 'Delete',
          cancelText: 'Cancel'
        }))) return;

        const idx = tabs.findIndex(x => x.id === currentTabId);
        if (idx >= 0) {
          localStorage.removeItem(dataKeyFor(currentTabId));
          localStorage.removeItem(OVERRIDES_PREFIX + currentTabId); // clear overrides for the tab
          tabs.splice(idx, 1);

          if (tabs.length === 0) {
            const dt = createDefaultTab();
            tabs = [dt];
            saveTabs(tabs);
            setCurrentTabId(dt.id);
            data = loadData(dt.id) || {};
            overrides = loadOverrides(dt.id) || {};
          } else {
            saveTabs(tabs);
            const fallback = tabs.find(t => t.id === 'default') || tabs[0];
            currentTabId = fallback.id;
            setCurrentTabId(currentTabId);
            data = loadData(currentTabId);
            overrides = loadOverrides(currentTabId);
          }

          initializeSyncUI();
          renderRowsOnly();
        }
      };

      tabsRow.appendChild(del);
    }

    syncCt.append(syncGrid, tabsRow);
  }

  /* ==========================
     LIVE "DAYS SINCE" CLOCK
     ==========================
     - A single setInterval ticks once per second.
     - We only touch the small ".since" span under each timestamp.
     - Each span carries data-ts="<ms>" so we don't reparse text each tick.
  */
  let __elapsedInterval = null;

  // Helper: apply green "ready" styling when reset label says Ready
  function applyReadyStyles() {
    document.querySelectorAll('#tracker tbody tr').forEach(tr => {
      const resetEl = tr.querySelector('.reset-label');
      const sinceEl = tr.querySelector('.since');
      // Clear previous state
      resetEl?.classList.remove('ready-to-collect');
      sinceEl?.classList.remove('ready-to-collect');
      // Apply if label says Ready
      if (resetEl && resetEl.textContent.trim().toLowerCase() === 'ready') {
        resetEl.classList.add('ready-to-collect');
        sinceEl?.classList.add('ready-to-collect');
      }
    });
  }

  /* Update all live "since" labels in the table to the current time. */
  function updateElapsedClocks() {
    const now = Date.now();
    document.querySelectorAll('#tracker tbody .since[data-ts]').forEach(span => {
      const ts = Number(span.dataset.ts);
      span.textContent = formatDaysSinceWithClock(ts, now);
    });
    // Also keep ready styles fresh (in case of re-render or dynamic flips)
    applyReadyStyles();
  }

  /* Ensure the interval exists. */
  function ensureElapsedTimer() {
    if (__elapsedInterval) return;
    __elapsedInterval = setInterval(updateElapsedClocks, 1000);
  }

  /* ==========================
     ACCESSORS
     ========================== */
  function getActiveSections() {
    const tab = tabs.find(t => t.id === currentTabId);
    return tab ? tab.sections : [];
  }

  /* ==========================
     RENDERER
     ==========================
     Builds all table rows based on SECTIONS and current 'data'.
     Binds click handlers for Collect/Update, Undo, and Image links.
  */
  function buildRowsHTML() {
    const sections = getActiveSections();
    const ov = overrides || {}; // capture for display
    let html = '';
    // Build rows for each section and its items
    sections.forEach((sec, si) => {
      const collapsed = !!sec._collapsed;

      // Section header row with caret
      const holderId = `sec-title-${si}`;
      const caret = collapsed ? '▸' : '▾';
      html += `<tr class="section-header"><td colspan="3">
                 <button class="mini-btn caret-btn" data-collapse-section="${si}" title="Toggle section">${caret}</button>
                 <div id="${holderId}"></div>
               </td></tr>`;

      if (collapsed) return; // skip items if section collapsed

      let subCollapsed = false;
      // Each item within a section
      (sec.items || []).forEach((it, ii) => {
        // Visual subsection row separators
        if (it.subheader) {
          const isHidden = !!it.hidden;
          if (isHidden && !showHidden) { subCollapsed = false; return; }
          const subId = `subheader-${si}-${ii}`;
          const sc = !!it.collapsed;
          subCollapsed = sc;
          const subCaret = sc ? '▸' : '▾';
          html += `<tr class="subsection-header${isHidden ? ' hidden-row':''}">
                     <td colspan="3">
                       <button class="mini-btn caret-btn" data-collapse-subheader="${si}:${ii}" title="Toggle group">${subCaret}</button>
                       <div id="${subId}"></div>
                       ${editMode ? (isHidden
                         ? `<button class="mini-btn" data-unhide-subheader="${si}:${ii}">Unhide</button>`
                         : `<button class="mini-btn" data-hide-subheader="${si}:${ii}">Hide</button>`) : ''}
                     </td>
                   </tr>`;
          return;
        }

        const isHidden = !!it.hidden;
        if ((isHidden && !showHidden) || subCollapsed) return;

        // Show either a reset label (if reset info exists) or details string
        const ts = data[it.id] || null;

        // Is this item currently marked as collected?
        const done = Boolean(ts);
        const chk = `<span class="checkmark">✓</span>`;

        const titleHolder = `title-${si}-${ii}`;
        const detailsHolder = `details-${si}-${ii}`;

        // Build reset line
        let computedResetHtml = '';
        if (it.reset) {
          const next = getNextResetDate(it.reset);
          const ready = next.getTime() <= Date.now();
          computedResetHtml = `<span class="reset-label">${ready ? 'Ready' : formatResetLabel(next)}</span>`;
        } else {
          const inferredDays = parseIntervalDaysFromDetails(it.details || '');
          if (inferredDays) {
            const nextFromCollected = getNextResetFromCollected(ts, inferredDays);
            computedResetHtml = `<span class="reset-label">${
              ts
                ? (nextFromCollected && nextFromCollected.getTime() <= Date.now()
                    ? 'Ready'
                    : (nextFromCollected ? formatResetLabel(nextFromCollected) : 'Resets after first collect'))
                : 'Resets after first collect'
            }</span>`;
          }
        }
        /* Put reset beneath details */
        const extraDetails = computedResetHtml ? `${computedResetHtml}` : '';

        // Primary action toggles between 'Collect' and 'Update'
        const actBtn = `<button class="action-btn"${isHidden ? ' disabled':''}>${done ? 'Update' : 'Collect'}</button>`;
        const rstBtn = (done && !isHidden) ? `<button class="reset-btn" title="Undo">⟲</button>` : '';
        const tsDate = formatDate(ts);
        const since  = formatDaysSinceWithClock(ts);

        html += `
          <tr data-id="${it.id}" class="${done ? 'collected' : ''}${isHidden ? ' hidden-row':''}">
            <td>
              ${chk}
              <div id="${titleHolder}" style="display:inline-block;max-width:100%"></div>
              <div class="details"><div id="${detailsHolder}"></div>${extraDetails}</div>
              ${editMode ? (isHidden
                ? `<button class="mini-btn" data-unhide-item="${si}:${ii}">Unhide</button>`
                : `<button class="mini-btn" data-hide-item="${si}:${ii}">Hide</button>`) : ''}
            </td>
            <td class="ts">
              <div class="ts-date">${tsDate}</div>
              <div class="since"${ts ? ` data-ts="${ts}"` : ''}>${since}</div>
            </td>
            <td>${actBtn}${rstBtn}</td>
          </tr>`;
      });
    });
    return html;
  }

  /* Build a tiny inline edit badge that hugs the top-right of the last character (with text) */
  function makeEditableLabel(contentNode, key, type, si, ii) {
    const wrap = document.createElement('span'); // inline container
    wrap.style.display = 'inline';
    wrap.style.position = 'relative';

    const label = document.createElement('span');
    label.style.maxWidth = '100%';
    label.appendChild(contentNode); // <= NO innerHTML

    const btn = document.createElement('button');
    btn.setAttribute('aria-label', 'Edit');
    btn.title = editMode ? 'Edit' : 'Enable Edit Mode to edit';
    btn.style.border = '1px solid var(--md-typeset-fg-color--light)';
    btn.style.borderRadius = '999px';
    btn.style.padding = '0 4px';
    btn.style.fontSize = '0.6rem';
    btn.style.lineHeight = '1';
    btn.style.background = 'transparent';
    btn.style.cursor = editMode ? 'pointer' : 'default';
    btn.style.display = editMode ? 'inline-flex' : 'none';
    btn.style.alignItems = 'center';
    btn.style.gap = '0.25rem';
    btn.style.marginLeft = '0.25rem';
    btn.style.verticalAlign = 'text-top';
    btn.style.transform = 'translateY(-10%)';
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Zm18.71-11.04a1.003 1.003 0 0 0 0-1.42L19.21 2.29a1.003 1.003 0 0 0-1.42 0l-1.83 1.83l3.75 3.75l1.8-1.66Z"/>
      </svg>
      <span>Edit</span>
    `;
    btn.onclick = () => startInlineEdit(wrap, label, key, type, si, ii);

    wrap.appendChild(label);
    wrap.appendChild(btn);
    return wrap;
  }

  function hydrateInlineEditors() {
    const sections = getActiveSections();
    const ov = overrides || {};

    sections.forEach((sec, si) => {
      const mount = document.getElementById(`sec-title-${si}`);
      if (!mount) return;
      const titleNode = document.createElement('span');
      titleNode.textContent = sec.title || '';
      const widget = makeEditableLabel(titleNode, 'section.title', 'section', si, -1);
      mount.replaceChildren(widget);
    });

    sections.forEach((sec, si) => {
      (sec.items || []).forEach((it, ii) => {
        if (it.subheader) {
          const subMount = document.getElementById(`subheader-${si}-${ii}`);
          if (!subMount) return;
          const subNode = document.createElement('span');
          subNode.textContent = it.subheader || '';
          const widget = makeEditableLabel(subNode, 'subheader', 'subheader', si, ii);
          subMount.replaceChildren(widget);
          return;
        }
        const titleMount = document.getElementById(`title-${si}-${ii}`);
        if (titleMount) {
          // Build a safe node (anchor or span) without innerHTML
          let node;
          const displayTitle = getDisplayTitle(it, ov); 
          if (it.clickable) {
            const a = document.createElement('a');
            a.href = '#';
            a.className = 'entry-link';
            a.dataset.img = it.image || '';
            a.dataset.title = displayTitle;
            a.textContent = displayTitle;
            node = a;
          } else {
            const span = document.createElement('span');
            span.textContent = displayTitle;
            node = span;
          }
          const widget = makeEditableLabel(node, 'item.title', 'title', si, ii);
          titleMount.replaceChildren(widget);
        }

        const detMount = document.getElementById(`details-${si}-${ii}`);
        if (detMount) {
          const span = document.createElement('span');
          span.textContent = getDisplayDetails(it, ov);
          const widget = makeEditableLabel(span, 'item.details', 'details', si, ii);
          detMount.replaceChildren(widget);
        }
      });
    });
  }

  function startInlineEdit(container, labelEl, key, type, si, ii) {
    const isMultiline = (type === 'details');
    const input = document.createElement(isMultiline ? 'textarea' : 'input');
    const oldValue = labelEl.textContent || '';
    input.value = oldValue;
    input.style.minWidth = '14rem';
    input.style.padding = '4px 6px';
    input.style.border = '1px solid var(--md-typeset-fg-color--light)';
    input.style.borderRadius = '4px';
    if (isMultiline) { input.rows = 3; input.style.display = 'block'; input.style.width = '100%'; }

    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.gap = '0.35rem';
    row.style.alignItems = 'center';
    row.style.marginTop = '0.15rem';

    const saveB = document.createElement('button'); saveB.textContent = 'Save';
    const cancelB = document.createElement('button'); cancelB.textContent = 'Cancel';

    saveB.onclick = () => {
      const val = input.value;
      const sections = getActiveSections();
      const sec = sections[si]; if (!sec) return;

      if (key === 'section.title') {
        // Keep section title editing as-is (mutates tab snapshot).
        sec.title = val;
        saveTabs(tabs);
      } else if (key === 'subheader') {
        const it = sec.items?.[ii]; if (!it || !it.subheader) return;
        it.subheader = val;
        saveTabs(tabs);
      } else if (key === 'item.title' || key === 'item.details') {
        // === Write user edits to OVERRIDES (per item.id) instead of mutating base snapshot ===
        const it = sec.items?.[ii]; if (!it || it.subheader) return;
        const tabOv = loadOverrides(currentTabId) || {};
        tabOv[it.id] = tabOv[it.id] || {};
        if (key === 'item.title') tabOv[it.id].title = val;
        if (key === 'item.details') tabOv[it.id].details = val;
        saveOverrides(currentTabId, tabOv);
        overrides = tabOv; // refresh in-memory
      }

      renderRowsOnly();
    };
    cancelB.onclick = () => renderRowsOnly();

    container.innerHTML = '';
    container.appendChild(input);
    row.appendChild(saveB);
    row.appendChild(cancelB);
    container.appendChild(row);

    input.focus();
    if (!isMultiline) {
      input.onkeydown = (e)=>{ if (e.key==='Enter'){ e.preventDefault(); saveB.click(); } if (e.key==='Escape'){ e.preventDefault(); cancelB.click(); } };
    } else {
      input.onkeydown = (e)=>{ if (e.key==='Escape'){ e.preventDefault(); cancelB.click(); } };
    }
  }

  function wireRowInteractions() {
    tbody.querySelectorAll('.action-btn').forEach(btn =>
      btn.onclick = e => {
        const row = e.target.closest('tr');
        if (row.classList.contains('hidden-row')) return;
        const id = row.dataset.id;
        data[id] = Date.now(); // store time of collection/update
        save();
        renderRowsOnly();      // re-render rows to refresh both date and since
      }
    );
    // Undo: remove the timestamp for this id
    tbody.querySelectorAll('.reset-btn').forEach(btn =>
      btn.onclick = e => {
        const id = e.target.closest('tr').dataset.id;
        delete data[id]; // delete property from 'data'
        save();
        renderRowsOnly();
      }
    );

    // Collapse toggles (sections & subheaders)
    tbody.parentElement.querySelectorAll('[data-collapse-section]').forEach(btn => {
      btn.onclick = e => {
        const si = Number(e.currentTarget.getAttribute('data-collapse-section'));
        const sections = getActiveSections();
        const sec = sections[si]; if (!sec) return;
        sec._collapsed = !sec._collapsed;
        saveTabs(tabs);
        renderRowsOnly();
      };
    });
    tbody.parentElement.querySelectorAll('[data-collapse-subheader]').forEach(btn => {
      btn.onclick = e => {
        const [si, ii] = e.currentTarget.getAttribute('data-collapse-subheader').split(':').map(Number);
        const sec = getActiveSections()[si]; if (!sec) return;
        const it = sec.items?.[ii]; if (!it || !it.subheader) return;
        it.collapsed = !it.collapsed;
        saveTabs(tabs);
        renderRowsOnly();
      };
    });

    // Image open: show modal with the linked image
    tbody.querySelectorAll('.entry-link').forEach(link =>
      link.onclick = e => {
        e.preventDefault();
        mImgContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = link.dataset.img;
        img.alt = link.dataset.title;
        mImgContainer.appendChild(img);
        modal.style.display = 'flex';
      }
    );

    if (editMode) {
      tbody.querySelectorAll('[data-hide-subheader]').forEach(btn => {
        btn.onclick = e => {
          const [si, ii] = e.currentTarget.getAttribute('data-hide-subheader').split(':').map(Number);
          const sec = getActiveSections()[si]; if (!sec) return;
          const it = sec.items?.[ii]; if (!it || !it.subheader) return;
          it.hidden = true; saveTabs(tabs); renderRowsOnly();
        };
      });
      tbody.querySelectorAll('[data-unhide-subheader]').forEach(btn => {
        btn.onclick = e => {
          const [si, ii] = e.currentTarget.getAttribute('data-unhide-subheader').split(':').map(Number);
          const sec = getActiveSections()[si]; if (!sec) return;
          const it = sec.items?.[ii]; if (!it || !it.subheader) return;
          delete it.hidden; saveTabs(tabs); renderRowsOnly();
        };
      });

      tbody.querySelectorAll('[data-hide-item]').forEach(btn => {
        btn.onclick = e => {
          const [si, ii] = e.currentTarget.getAttribute('data-hide-item').split(':').map(Number);
          const sec = getActiveSections()[si]; if (!sec) return;
          const it = sec.items?.[ii]; if (!it || it.subheader) return;
          it.hidden = true; saveTabs(tabs); renderRowsOnly();
        };
      });
      tbody.querySelectorAll('[data-unhide-item]').forEach(btn => {
        btn.onclick = e => {
          const [si, ii] = e.currentTarget.getAttribute('data-unhide-item').split(':').map(Number);
          const sec = getActiveSections()[si]; if (!sec) return;
          const it = sec.items?.[ii]; if (!it || it.subheader) return;
          delete it.hidden; saveTabs(tabs); renderRowsOnly();
        };
      });
    }
  }

  /* Re-render only tbody rows (faster than rebuilding header/sync UI). */
  function renderRowsOnly() {
    tbody.innerHTML = buildRowsHTML();
    hydrateInlineEditors();
    wireRowInteractions();
    updateElapsedClocks();  // paint immediately so the subline is current
  }

  function render() {
    // Rebuild the sync controls (so they always reflect the latest code)
    initializeSyncUI();
    renderRowsOnly();
    // Start/ensure the live "Days since" clock interval
    ensureElapsedTimer();
    // Paint the initial "Days since" values right away
    updateElapsedClocks();
  }

  /* ==========================
     MODAL OPEN/CLOSE
     ========================== */
  mClose.onclick = () => modal.style.display = 'none';
  modal.onclick = e => { 
    // Clicking outside the dialog content closes the modal
    if (e.target === modal) modal.style.display = 'none';
  };

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
