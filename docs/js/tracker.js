(function () {
  // === AUTO-REBASE when sections.js changes ===
  const SECTIONS_SIG_KEY = 'respawn_sections_signature_v1';

  function computeSectionsSignature(sections) {
    let str;
    try { str = JSON.stringify(sections); } catch { str = ''; }

    // djb2
    let h = 5381;
    for (let i = 0; i < str.length; i++) {
      h = ((h << 5) + h) + str.charCodeAt(i);
      h |= 0;
    }
    return (h >>> 0).toString(16);
  }

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
     DATA MODEL (loaded from sections.js)
     ========================== */
  const SECTIONS = window.RESPAWN_SECTIONS;

  if (!Array.isArray(SECTIONS)) {
    console.error('[Respawn Tracker] SECTIONS module failed to load. Ensure /js/sections.js is included before /js/tracker.js');
    return;
  }

  /* ==========================
     EASTER EGG (one-time via localStorage)
     ========================== */
  const EGG_NAMES = ['lynd', 'theaxolotl', 'gagging', 'nrjank'];
  const EGG_LOCK_KEY = 'respawn_egg_seen_v1';
  const EGG_VIDEO_SRC = '/img/egg/egg.mp4';

  /* ==========================
     PERSISTENCE
     ========================== */
  const STORAGE_KEY_OLD = 'respawn_acquisition_data';
  const TABS_KEY = 'respawn_tabs_v1';
  const CUR_TAB_KEY = 'respawn_current_tab_id_v1';
  const DATA_PREFIX = 'respawn_acquisition_data__';
  const DATA_GLOBAL_KEY = 'respawn_acquisition_data_alltabs_v1';

  const deepClone = (obj) => JSON.parse(JSON.stringify(obj));
  const BASE_SECTIONS = deepClone(SECTIONS);

  // === OVERRIDES: user-edited text per item.id, per tab ===
  const OVERRIDES_PREFIX = 'respawn_overrides__';
  function loadOverrides(tabId) {
    try { return JSON.parse(localStorage.getItem(OVERRIDES_PREFIX + tabId) || '{}'); } catch { return {}; }
  }
  function saveOverrides(tabId, overrides) {
    localStorage.setItem(OVERRIDES_PREFIX + tabId, JSON.stringify(overrides || {}));
  }
  function clearOverrides(tabId) {
    localStorage.removeItem(OVERRIDES_PREFIX + tabId);
  }
  function getDisplayTitle(it, overridesForTab) {
    const ov = overridesForTab[it.id];
    return (ov && typeof ov.title === 'string' && ov.title.length) ? ov.title : (it.title || '');
  }
  function getDisplayDetails(it, overridesForTab) {
    const ov = overridesForTab[it.id];
    return (ov && typeof ov.details === 'string' && ov.details.length) ? ov.details : (it.details || '');
  }

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
  function getCurrentTabId() { return localStorage.getItem(CUR_TAB_KEY) || 'default'; }
  function setCurrentTabId(id) { localStorage.setItem(CUR_TAB_KEY, id); }
  function dataKeyFor(tabId) { return DATA_PREFIX + tabId; }

  // GLOBAL-first load/save (mirror to legacy per-tab keys for back-compat)
  function loadData(tabId) {
    const g = localStorage.getItem(DATA_GLOBAL_KEY);
    if (g) { try { return JSON.parse(g) || {}; } catch { return {}; } }
    try { return JSON.parse(localStorage.getItem(dataKeyFor(tabId)) || '{}'); } catch { return {}; }
  }
  function saveData(tabId, obj) {
    const payload = JSON.stringify(obj || {});
    localStorage.setItem(DATA_GLOBAL_KEY, payload);
    if (tabId) localStorage.setItem(dataKeyFor(tabId), payload);
  }

  function createDefaultTab() {
    return { id: 'default', name: 'Default', sections: deepClone(BASE_SECTIONS) };
  }

  // Helper: index items by id for diffing/migration
  function indexItemsById(sections) {
    const map = {};
    (sections || []).forEach(sec => {
      (sec.items || []).forEach(it => { if (it && it.id && !it.subheader) map[it.id] = it; });
    });
    return map;
  }

  // === REBASE / MIGRATION (signature-based) ===
  function rebaseTabsFromBase() {
    (tabs || []).forEach(tab => {
      const prevSections = tab.sections || [];
      const prevIdx = indexItemsById(prevSections);

      const newSections = deepClone(BASE_SECTIONS);
      const newIdx = indexItemsById(newSections);

      Object.keys(prevIdx).forEach(id => {
        const oldItem = prevIdx[id];
        const target = newIdx[id];
        if (!target) return;
        if (oldItem.hidden) target.hidden = true;
        if (oldItem.collapsed) target.collapsed = true;
      });

      (newSections || []).forEach((sec, i) => {
        if (prevSections[i] && prevSections[i]._collapsed) sec._collapsed = true;

        const prevItems = (prevSections[i] && prevSections[i].items) || [];
        const newItems = (sec.items || []);
        for (let j = 0; j < newItems.length; j++) {
          const pi = prevItems[j];
          const ni = newItems[j];
          if (!pi || !ni) continue;
          if (pi.subheader && ni.subheader) {
            if (pi.hidden) ni.hidden = true;
            if (pi.collapsed) ni.collapsed = true;
          }
        }
      });

      tab.sections = newSections;
    });

    saveTabs(tabs);
  }

  function autoRebaseIfSectionsChanged() {
    try {
      const currentSig = computeSectionsSignature(SECTIONS);
      const prevSig = localStorage.getItem(SECTIONS_SIG_KEY);

      if (prevSig !== currentSig) {
        rebaseTabsFromBase();
        localStorage.setItem(SECTIONS_SIG_KEY, currentSig);
      }
    } catch (e) {
      console.warn('[Respawn Tracker] autoRebaseIfSectionsChanged failed:', e);
    }
  }

  /* ==========================
     INITIAL STATE
     ========================== */
  let tabs = loadTabs();

  let currentTabId = getCurrentTabId();
  if (!tabs.find(t => t.id === currentTabId)) {
    currentTabId = tabs[0].id;
    setCurrentTabId(currentTabId);
  }

  autoRebaseIfSectionsChanged();

  let data = loadData(currentTabId);
  let overrides = loadOverrides(currentTabId);

  /* ==========================
     DOM REFERENCES
     ========================== */
  const tbody = document.querySelector('#tracker tbody');
  const modal = document.getElementById('modal');
  const mImgContainer = document.getElementById('modal-image');
  const mClose = document.querySelector('.modal-close');
  const syncCt = document.getElementById('sync-container');

  if (!tbody || !modal || !mImgContainer || !mClose || !syncCt) {
    console.error('[Respawn Tracker] Required DOM nodes missing. Ensure tracker.md contains #tracker, #modal, .modal-close, #modal-image, and #sync-container.');
    return;
  }

  /* ==========================
     UTILITIES: DATES & LABELS
     ========================== */
  function getNextResetDate({ reference, intervalWeeks }) {
    const now = new Date();
    const ref = new Date(reference);
    const period = intervalWeeks * 7 * 24 * 60 * 60 * 1000;
    if (now < ref) return ref;
    const elapsed = now - ref;
    const cycles = Math.ceil(elapsed / period);
    return new Date(ref.getTime() + cycles * period);
  }

  function formatResetLabel(dt) {
    return 'Resets ' + dt.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  }

  function parseIntervalDaysFromDetails(str) {
    if (!str) return null;
    const s = str.replace(/[\u2012-\u2015]/g, '-');
    let m;
    m = s.match(/\[(\d+)\s*days?\]/i);
    if (m) return Number(m[1]);

    m = s.match(/\b(?:every|respawns?\s+every|produces?\s+one.*every|per|in)\s+(\d+)(?:\s*-\s*(\d+))?\s*days?\b/i);
    if (m) {
      const a = Number(m[1]), b = m[2] ? Number(m[2]) : null;
      return b ? Math.max(a, b) : a;
    }

    if (/\brespawns?\s+daily\b/i.test(s) || /\bdaily\b/i.test(s)) return 1;
    if (/\bweekly\b/i.test(s)) return 7;
    if (/\bmonthly\b/i.test(s)) return 30;

    return null;
  }

  function getNextResetFromCollected(ts, days) {
    if (!ts || !days) return null;
    const period = days * 24 * 60 * 60 * 1000;
    const now = Date.now();
    const elapsed = Math.max(0, now - ts);
    const cycles = Math.floor(elapsed / period) + 1;
    return new Date(ts + cycles * period);
  }

  function formatDate(ts) { return ts ? new Date(ts).toLocaleString() : '-'; }
  function pad2(n) { return String(n).padStart(2, '0'); }

  function formatDaysSinceWithClock(ts, nowMs) {
    if (!ts) return '-';
    const now = nowMs ?? Date.now();
    let diff = Math.max(0, now - ts);
    const dayMs = 24 * 60 * 60 * 1000;
    const days = Math.floor(diff / dayMs);
    diff = diff % dayMs;
    const h = Math.floor(diff / (60 * 60 * 1000));
    const m = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
    const s = Math.floor((diff % (60 * 1000)) / 1000);
    const dayLabel = days === 1 ? '1 day' : `${days} days`;
    return `${dayLabel} (${pad2(h)}:${pad2(m)}:${pad2(s)})`;
  }

  /* ==========================
     MODALS: confirm/prompt
     ========================== */
  function confirmStyled(message, { title = 'Confirm', confirmText = 'OK', cancelText = 'Cancel' } = {}) {
    return new Promise(resolve => {
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
        setTimeout(() => overlay.remove(), 200);
        resolve(val);
      };

      okBtn.onclick = () => close(true);
      cancelBtn.onclick = () => close(false);
      overlay.onclick = (e) => { if (e.target === overlay) close(false); };

      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') { document.removeEventListener('keydown', onKey); close(false); }
        if (e.key === 'Enter') { document.removeEventListener('keydown', onKey); close(true); }
      }, { once: true });

      okBtn.focus();
    });
  }

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
            <input class="confirm-input" type="text" placeholder="${placeholder}" value="${String(defaultValue).replace(/"/g, '&quot;')}">
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

      document.addEventListener('keydown', function onKey(e) {
        if (e.key === 'Escape') { document.removeEventListener('keydown', onKey); close(null); }
        if (e.key === 'Enter') { document.removeEventListener('keydown', onKey); close(input.value.trim() || ''); }
      }, { once: true });

      input.focus();
      input.select();
    });
  }

  /* ==========================
     IMAGE MODAL + EGG VIDEO
     ========================== */
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
    vid.volume = 0.1;

    const tryPlay = () => {
      const p = vid.play?.();
      if (p && typeof p.then === 'function') p.then(() => {}).catch(() => {});
    };

    vid.addEventListener('loadedmetadata', () => { vid.volume = 0.1; tryPlay(); }, { once: true });

    mImgContainer.appendChild(vid);
    modal.style.display = 'flex';
    tryPlay();

    const stopAndClean = () => { try { vid.pause(); } catch {} };
    mClose.addEventListener('click', stopAndClean, { once: true });
    modal.addEventListener('click', function onBg(e) {
      if (e.target === modal) { stopAndClean(); modal.removeEventListener('click', onBg); }
    });
  }

  async function checkEasterEggTabs() {
    try {
      if (localStorage.getItem(EGG_LOCK_KEY) === '1') return false;

      const safeTabId =
        (typeof currentTabId !== 'undefined' && currentTabId) ||
        ((tabs && tabs[0]) ? tabs[0].id : null);

      const active = (tabs || []).find(t => t && t.id === safeTabId);
      if (!active || !active.name) return false;

      const n = String(active.name).trim().toLowerCase();
      if (!EGG_NAMES.includes(n)) return false;

      const ok = await confirmStyled(
        'You discovered a secret. Want to play it now?',
        { title: 'Surprise!', confirmText: 'Play', cancelText: 'Not now' }
      );
      if (!ok) return false;

      localStorage.setItem(EGG_LOCK_KEY, '1');
      showEggVideo();
      return true;
    } catch {
      return false;
    }
  }

  /* ==========================
     DIRTY DETECTION (for Reset to Default)
     ========================== */
  function isCurrentTabDirty() {
    const tab = (tabs || []).find(t => t && t.id === currentTabId);
    if (!tab) return false;

    const ov = loadOverrides(currentTabId) || {};
    if (Object.keys(ov).length > 0) return true;

    const cur = tab.sections || [];
    const base = BASE_SECTIONS || [];

    for (let i = 0; i < Math.max(cur.length, base.length); i++) {
      const cs = cur[i];
      const bs = base[i];
      if (!cs || !bs) return true;

      if ((cs.title || '') !== (bs.title || '')) return true;
      if (!!cs._collapsed !== !!bs._collapsed) return true;

      const ci = cs.items || [];
      const bi = bs.items || [];
      for (let j = 0; j < Math.max(ci.length, bi.length); j++) {
        const cIt = ci[j];
        const bIt = bi[j];
        if (!cIt || !bIt) return true;

        if (cIt.subheader || bIt.subheader) {
          if ((cIt.subheader || '') !== (bIt.subheader || '')) return true;
          if (!!cIt.hidden !== !!bIt.hidden) return true;
          if (!!cIt.collapsed !== !!bIt.collapsed) return true;
          continue;
        }

        if (!!cIt.hidden !== !!bIt.hidden) return true;
        if (!!cIt.collapsed !== !!bIt.collapsed) return true;
      }
    }

    return false;
  }

  async function resetCurrentTabToDefault() {
    const tab = (tabs || []).find(t => t && t.id === currentTabId);
    if (!tab) return;

    const ok = await confirmStyled(
      'Reset this tab back to the Default layout?\n\nThis will remove edited titles/details, hide/show changes, and collapse states for this tab.\nYour collected timestamps will NOT be deleted.',
      { title: 'Reset to Default', confirmText: 'Reset', cancelText: 'Cancel' }
    );
    if (!ok) return;

    tab.sections = deepClone(BASE_SECTIONS);
    saveTabs(tabs);
    clearOverrides(currentTabId);
    overrides = loadOverrides(currentTabId);

    render();
  }

  /* ==========================
     STATE
     ========================== */
  let editMode = false;
  let showHidden = false;

  /* ==========================
     ACCESSORS
     ========================== */
  function getActiveSections() {
    const tab = tabs.find(t => t.id === currentTabId);
    return tab ? tab.sections : [];
  }

  /* Save current 'data' into localStorage and keep Export Code updated */
  function save() {
    saveData(currentTabId, data);

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

    const codeEl = document.getElementById('sync-code-input');
    if (codeEl) codeEl.value = utoa(JSON.stringify(payload));
  }

  /* ==========================
     SYNC UI
     ========================== */
  function initializeSyncUI() {
    syncCt.innerHTML = '';

    const syncGrid = document.createElement('div');
    syncGrid.className = 'sync-grid';

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

    const currentCode = utoa(JSON.stringify(payload));

    const codeLabel = document.createElement('span');
    codeLabel.textContent = 'Export Code:';
    codeLabel.className = 'sync-label';

    const codeInput = document.createElement('input');
    codeInput.id = 'sync-code-input';
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

    const spacer = document.createElement('span');
    spacer.className = 'sync-label sync-label-spacer';
    spacer.textContent = 'Sync Code:';

    const pasteInput = document.createElement('input');
    pasteInput.placeholder = 'Paste Export Code';
    pasteInput.className = 'sync-input';

    const syncBtn = document.createElement('button');
    syncBtn.textContent = 'Import';
    syncBtn.addEventListener('click', () => {
      const txt = pasteInput.value.trim();
      if (!txt) return alert('Please paste a code.');
      try {
        const obj = JSON.parse(atou(txt));
        if (!obj || !Array.isArray(obj.tabs) || !obj.currentTabId || !obj.datasets) throw new Error('bad payload');

        tabs = obj.tabs.map(t => ({ id: t.id, name: t.name || 'Tab', sections: t.sections || [] }));
        saveTabs(tabs);

        const merged = {};
        for (const key in obj.datasets) {
          const ds = obj.datasets[key] || {};
          for (const id in ds) {
            const ts = ds[id];
            if (merged[id] == null || (typeof ts === 'number' && ts > merged[id])) merged[id] = ts;
          }
        }

        const incomingOverrides = obj.overrides || {};
        (tabs || []).forEach(t => {
          const o = incomingOverrides[t.id] || {};
          saveOverrides(t.id, o);
        });

        currentTabId = tabs.find(x => x.id === obj.currentTabId)?.id || (tabs[0] && tabs[0].id);
        setCurrentTabId(currentTabId);

        saveData(currentTabId, merged);
        data = loadData(currentTabId);
        overrides = loadOverrides(currentTabId);

        showHidden = !!obj.showHidden;
        render();
      } catch {
        alert('Invalid sync code');
      }
    });

    syncGrid.append(codeLabel, codeInput, copyBtn, spacer, pasteInput, syncBtn);

    const tabsRow = document.createElement('div');
    Object.assign(tabsRow.style, {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.5rem',
      alignItems: 'center',
      marginTop: '0.5rem'
    });

    (tabs || []).forEach(t => {
      const b = document.createElement('button');
      b.textContent = t.name;
      b.className = 'tab' + (t.id === currentTabId ? ' active' : '');
      Object.assign(b.style, {
        padding: '0.25rem 0.5rem',
        border: '1px solid var(--md-typeset-fg-color--light)',
        borderRadius: '4px',
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
        render();
        await checkEasterEggTabs();
      };
      tabsRow.appendChild(b);
    });

    const spacerFlex = document.createElement('div');
    spacerFlex.style.flex = '1';
    tabsRow.appendChild(spacerFlex);

    const editBtn = document.createElement('button');
    editBtn.textContent = editMode ? 'Exit Edit Mode' : 'Edit Mode';
    editBtn.className = 'tab small';
    editBtn.type = 'button';
    editBtn.onclick = () => { editMode = !editMode; render(); };
    tabsRow.appendChild(editBtn);

    const sh = document.createElement('button');
    sh.className = 'tab small';
    sh.textContent = showHidden ? 'Hide Hidden' : 'Show Hidden';
    sh.type = 'button';
    sh.onclick = () => { showHidden = !showHidden; renderRowsOnly(); initializeSyncUI(); };
    tabsRow.appendChild(sh);

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
        initializeSyncUI();
        await checkEasterEggTabs();
      }
    };
    tabsRow.appendChild(ren);

    const isLastTab = (tabs.length === 1);
    const currentIsDefault = (currentTabId === 'default');

    if (!isLastTab && !currentIsDefault) {
      const del = document.createElement('button');
      del.className = 'tab small';
      del.textContent = 'Delete Tab';
      del.type = 'button';

      del.onclick = async () => {
        if (tabs.length <= 1) return;
        if (currentTabId === 'default') return;

        const ok = await confirmStyled('Delete this tab? Its data will be removed.', {
          title: 'Delete tab',
          confirmText: 'Delete',
          cancelText: 'Cancel'
        });
        if (!ok) return;

        const idx = tabs.findIndex(x => x.id === currentTabId);
        if (idx >= 0) {
          localStorage.removeItem(dataKeyFor(currentTabId));
          localStorage.removeItem(OVERRIDES_PREFIX + currentTabId);
          tabs.splice(idx, 1);

          if (tabs.length === 0) {
            const dt = createDefaultTab();
            tabs = [dt];
            saveTabs(tabs);
            setCurrentTabId(dt.id);
            currentTabId = dt.id;
          } else {
            saveTabs(tabs);
            const fallback = tabs.find(t => t.id === 'default') || tabs[0];
            currentTabId = fallback.id;
            setCurrentTabId(currentTabId);
          }

          data = loadData(currentTabId);
          overrides = loadOverrides(currentTabId);

          initializeSyncUI();
          renderRowsOnly();
        }
      };

      tabsRow.appendChild(del);
    }

    if (editMode && isCurrentTabDirty()) {
      const reset = document.createElement('button');
      reset.className = 'tab small';
      reset.textContent = 'Reset to Default';
      reset.type = 'button';
      reset.onclick = resetCurrentTabToDefault;
      tabsRow.appendChild(reset);
    }

    syncCt.append(syncGrid, tabsRow);
  }

  /* ==========================
     LIVE "DAYS SINCE" CLOCK
     ========================== */
  let __elapsedInterval = null;

  function applyReadyStyles() {
    document.querySelectorAll('#tracker tbody tr').forEach(tr => {
      const resetEl = tr.querySelector('.reset-label');
      const sinceEl = tr.querySelector('.since');

      resetEl?.classList.remove('ready-to-collect');
      sinceEl?.classList.remove('ready-to-collect');

      if (resetEl && resetEl.textContent.trim().toLowerCase() === 'ready') {
        resetEl.classList.add('ready-to-collect');
        sinceEl?.classList.add('ready-to-collect');
      }
    });
  }

  function updateElapsedClocks() {
    const now = Date.now();
    document.querySelectorAll('#tracker tbody .since[data-ts]').forEach(span => {
      const ts = Number(span.dataset.ts);
      span.textContent = formatDaysSinceWithClock(ts, now);
    });
    applyReadyStyles();
  }

  function ensureElapsedTimer() {
    if (__elapsedInterval) return;
    __elapsedInterval = setInterval(updateElapsedClocks, 1000);
  }

  /* ==========================
     RENDERER
     ========================== */
  function buildRowsHTML() {
    const sections = getActiveSections();
    const ov = overrides || {};
    let html = '';

    sections.forEach((sec, si) => {
      const collapsed = !!sec._collapsed;

      const holderId = `sec-title-${si}`;
      const caret = collapsed ? '▸' : '▾';
      html += `<tr class="section-header"><td colspan="3">
                 <button class="mini-btn caret-btn" data-collapse-section="${si}" title="Toggle section">${caret}</button>
                 <div id="${holderId}"></div>
               </td></tr>`;

      if (collapsed) return;

      let subCollapsed = false;

      (sec.items || []).forEach((it, ii) => {
        if (it.subheader) {
          const isHidden = !!it.hidden;
          if (isHidden && !showHidden) { subCollapsed = false; return; }

          const subId = `subheader-${si}-${ii}`;
          const sc = !!it.collapsed;
          subCollapsed = sc;
          const subCaret = sc ? '▸' : '▾';

          html += `<tr class="subsection-header${isHidden ? ' hidden-row' : ''}">
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

        const ts = data[it.id] || null;
        const done = Boolean(ts);
        const chk = `<span class="checkmark">✓</span>`;

        const titleHolder = `title-${si}-${ii}`;
        const detailsHolder = `details-${si}-${ii}`;

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

        const extraDetails = computedResetHtml ? `${computedResetHtml}` : '';
        const actBtn = `<button class="action-btn"${isHidden ? ' disabled' : ''}>${done ? 'Update' : 'Collect'}</button>`;
        const rstBtn = (done && !isHidden) ? `<button class="reset-btn" title="Undo">⟲</button>` : '';

        const tsDate = formatDate(ts);
        const since = formatDaysSinceWithClock(ts);

        html += `
          <tr data-id="${it.id}" class="${done ? 'collected' : ''}${isHidden ? ' hidden-row' : ''}">
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

  function makeEditableLabel(contentNode, key, type, si, ii) {
    const wrap = document.createElement('span');
    wrap.style.display = 'inline';
    wrap.style.position = 'relative';

    const label = document.createElement('span');
    label.style.maxWidth = '100%';
    label.appendChild(contentNode);

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
        sec.title = val;
        saveTabs(tabs);
      } else if (key === 'subheader') {
        const it = sec.items?.[ii]; if (!it || !it.subheader) return;
        it.subheader = val;
        saveTabs(tabs);
      } else if (key === 'item.title' || key === 'item.details') {
        const it = sec.items?.[ii]; if (!it || it.subheader) return;
        const tabOv = loadOverrides(currentTabId) || {};
        tabOv[it.id] = tabOv[it.id] || {};
        if (key === 'item.title') tabOv[it.id].title = val;
        if (key === 'item.details') tabOv[it.id].details = val;
        saveOverrides(currentTabId, tabOv);
        overrides = tabOv;
      }

      renderRowsOnly();
      initializeSyncUI();
    };

    cancelB.onclick = () => renderRowsOnly();

    container.innerHTML = '';
    container.appendChild(input);
    row.appendChild(saveB);
    row.appendChild(cancelB);
    container.appendChild(row);

    input.focus();
    if (!isMultiline) {
      input.onkeydown = (e) => {
        if (e.key === 'Enter') { e.preventDefault(); saveB.click(); }
        if (e.key === 'Escape') { e.preventDefault(); cancelB.click(); }
      };
    } else {
      input.onkeydown = (e) => {
        if (e.key === 'Escape') { e.preventDefault(); cancelB.click(); }
      };
    }
  }

  function wireRowInteractions() {
    tbody.querySelectorAll('.action-btn').forEach(btn => {
      btn.onclick = e => {
        const row = e.target.closest('tr');
        if (row.classList.contains('hidden-row')) return;
        const id = row.dataset.id;
        data[id] = Date.now();
        save();
        renderRowsOnly();
      };
    });

    tbody.querySelectorAll('.reset-btn').forEach(btn => {
      btn.onclick = e => {
        const id = e.target.closest('tr').dataset.id;
        delete data[id];
        save();
        renderRowsOnly();
      };
    });

    tbody.parentElement.querySelectorAll('[data-collapse-section]').forEach(btn => {
      btn.onclick = e => {
        const si = Number(e.currentTarget.getAttribute('data-collapse-section'));
        const sections = getActiveSections();
        const sec = sections[si]; if (!sec) return;
        sec._collapsed = !sec._collapsed;
        saveTabs(tabs);
        renderRowsOnly();
        initializeSyncUI();
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
        initializeSyncUI();
      };
    });

    tbody.querySelectorAll('.entry-link').forEach(link => {
      link.onclick = e => {
        e.preventDefault();
        mImgContainer.innerHTML = '';
        const img = document.createElement('img');
        img.src = link.dataset.img;
        img.alt = link.dataset.title;
        mImgContainer.appendChild(img);
        modal.style.display = 'flex';
      };
    });

    if (editMode) {
      tbody.querySelectorAll('[data-hide-subheader]').forEach(btn => {
        btn.onclick = e => {
          const [si, ii] = e.currentTarget.getAttribute('data-hide-subheader').split(':').map(Number);
          const sec = getActiveSections()[si]; if (!sec) return;
          const it = sec.items?.[ii]; if (!it || !it.subheader) return;
          it.hidden = true; saveTabs(tabs); renderRowsOnly(); initializeSyncUI();
        };
      });

      tbody.querySelectorAll('[data-unhide-subheader]').forEach(btn => {
        btn.onclick = e => {
          const [si, ii] = e.currentTarget.getAttribute('data-unhide-subheader').split(':').map(Number);
          const sec = getActiveSections()[si]; if (!sec) return;
          const it = sec.items?.[ii]; if (!it || !it.subheader) return;
          delete it.hidden; saveTabs(tabs); renderRowsOnly(); initializeSyncUI();
        };
      });

      tbody.querySelectorAll('[data-hide-item]').forEach(btn => {
        btn.onclick = e => {
          const [si, ii] = e.currentTarget.getAttribute('data-hide-item').split(':').map(Number);
          const sec = getActiveSections()[si]; if (!sec) return;
          const it = sec.items?.[ii]; if (!it || it.subheader) return;
          it.hidden = true; saveTabs(tabs); renderRowsOnly(); initializeSyncUI();
        };
      });

      tbody.querySelectorAll('[data-unhide-item]').forEach(btn => {
        btn.onclick = e => {
          const [si, ii] = e.currentTarget.getAttribute('data-unhide-item').split(':').map(Number);
          const sec = getActiveSections()[si]; if (!sec) return;
          const it = sec.items?.[ii]; if (!it || it.subheader) return;
          delete it.hidden; saveTabs(tabs); renderRowsOnly(); initializeSyncUI();
        };
      });
    }
  }

  function renderRowsOnly() {
    tbody.innerHTML = buildRowsHTML();
    hydrateInlineEditors();
    wireRowInteractions();
    updateElapsedClocks();
  }

  function render() {
    initializeSyncUI();
    renderRowsOnly();
    ensureElapsedTimer();
    updateElapsedClocks();
  }

  /* ==========================
     MODAL OPEN/CLOSE
     ========================== */
  mClose.onclick = () => { modal.style.display = 'none'; };
  modal.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

  render();
})();