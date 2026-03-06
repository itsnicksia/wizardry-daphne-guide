(function () {
  const CONTENT_URLS = [
    '/include/readme-content.html',
    '../../include/readme-content.html'
  ];

  function ensureModalStructure(modal) {
    if (!modal) return null;

    let box = modal.querySelector('#tracker-readme-box');
    if (!box) {
      box = document.createElement('div');
      box.id = 'tracker-readme-box';
      modal.appendChild(box);
    }

    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.setAttribute('aria-label', 'Read Me');

    let closeBtn = box.querySelector('#tracker-readme-close');
    if (!closeBtn) {
      closeBtn = document.createElement('button');
      closeBtn.id = 'tracker-readme-close';
      closeBtn.type = 'button';
      closeBtn.setAttribute('aria-label', 'Close');
      closeBtn.textContent = '×';
      box.appendChild(closeBtn);
    }

    let content = box.querySelector('#tracker-readme-content');
    if (!content) {
      content = document.createElement('div');
      content.id = 'tracker-readme-content';
      box.appendChild(content);
    }

    return modal;
  }

  function ensureModal() {
    let modal = document.getElementById('tracker-readme-modal');

    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'tracker-readme-modal';
      document.body.appendChild(modal);
    }

    ensureModalStructure(modal);

    if (!modal.dataset.bound) {
      const closeBtn = modal.querySelector('#tracker-readme-close');

      function closeReadmeModal() {
        modal.style.display = 'none';
      }

      if (closeBtn) {
        closeBtn.addEventListener('click', closeReadmeModal);
      }

      modal.addEventListener('click', function (e) {
        if (e.target === modal) closeReadmeModal();
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
          closeReadmeModal();
        }
      });

      modal.dataset.bound = '1';
    }

    return modal;
  }

  async function fetchReadmeHtml() {
    let lastError = null;

    for (let i = 0; i < CONTENT_URLS.length; i++) {
      const url = CONTENT_URLS[i];

      try {
        const res = await fetch(url, { cache: 'no-store' });
        if (!res.ok) throw new Error('Fetch failed: ' + res.status);

        const html = await res.text();

        if (
          /404\s*[-–]?\s*Not\s*found/i.test(html) ||
          /<title>\s*404/i.test(html)
        ) {
          throw new Error('404 page returned for ' + url);
        }

        return { html: html, url: url };
      } catch (err) {
        lastError = err;
      }
    }

    throw lastError || new Error('Unable to load READ ME content.');
  }

  async function loadContentInto(modal) {
    const host = modal.querySelector('#tracker-readme-content');
    if (!host) return;

    host.innerHTML = '<div class="readme-loading">Loading…</div>';

    try {
      const result = await fetchReadmeHtml();
      host.innerHTML = result.html;
    } catch (err) {
      host.innerHTML =
        '<div class="readme-error">' +
        '<strong>Couldn’t load READ ME content.</strong><br>' +
        'Make sure <code>docs/include/readme-content.html</code> exists and is published.' +
        '</div>';

      console.warn('[Respawn Tracker] READ ME fetch failed:', err);
    }
  }

  function positionReadmeContainer() {
    const readme = document.getElementById('tracker-readme-container');
    const table = document.querySelector('#tracker-container table');
    const header = document.querySelector('.md-header');

    if (!readme || !table) return;

    const tableRect = table.getBoundingClientRect();
    const headerHeight = header ? header.getBoundingClientRect().height : 0;
    const gap = 12;
    const edgePad = 8;

    const widgetWidth = readme.offsetWidth || 90;
    const widgetHeight = readme.offsetHeight || 90;

    let top = Math.max(headerHeight + 8, tableRect.top);
    let left = tableRect.right + gap;

    const rightOverflow = left + widgetWidth + edgePad > window.innerWidth;
    if (rightOverflow) {
      left = tableRect.right - widgetWidth - gap;
    }

    if (left < edgePad) left = edgePad;

    const maxTop = window.innerHeight - widgetHeight - edgePad;
    if (top > maxTop) {
      top = Math.max(headerHeight + 8, maxTop);
    }

    readme.style.position = 'fixed';
    readme.style.top = top + 'px';
    readme.style.left = left + 'px';
    readme.style.right = 'auto';
    readme.style.visibility = 'visible';
    readme.style.opacity = '1';
    readme.classList.add('is-positioned');
  }

  function bindPositioningObservers() {
    let resizeTimer = null;

    function schedulePosition() {
      if (resizeTimer) clearTimeout(resizeTimer);
      resizeTimer = setTimeout(positionReadmeContainer, 0);
    }

    window.addEventListener('resize', schedulePosition);
    window.addEventListener('scroll', schedulePosition, { passive: true });
    window.addEventListener('load', schedulePosition);
    document.addEventListener('readystatechange', schedulePosition);

    if (window.ResizeObserver) {
      const container = document.getElementById('tracker-container');
      const table = document.querySelector('#tracker-container table');

      const ro = new ResizeObserver(schedulePosition);
      if (container) ro.observe(container);
      if (table) ro.observe(table);
    }
  }

  function init() {
    const btn = document.getElementById('tracker-readme-button');
    if (!btn) return;

    const modal = ensureModal();

    if (!btn.dataset.bound) {
      btn.addEventListener('click', async function (e) {
        e.preventDefault();
        e.stopPropagation();

        modal.style.display = 'flex';
        await loadContentInto(modal);
      });

      btn.dataset.bound = '1';
    }

    positionReadmeContainer();
    bindPositioningObservers();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();