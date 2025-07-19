/**
 * Playwright visual-regression test for every HTML page
 * found under the built MkDocs `site/` directory.
 *
 * No MkDocs “list” command needed.
 */

import { expect, test } from '@playwright/test';
import { readdirSync } from 'fs';
import path from 'path';

/**
 * Recursively collect every *.html file in `site/`
 * and convert it into the corresponding route.
 *   site/index.html        → /
 *   site/getting-started.html → /getting-started/
 *   site/foo/bar/index.html → /foo/bar/
 */
function collectRoutes(dir: string): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const routes: string[] = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      routes.push(...collectRoutes(full));
      continue;
    }

    if (!entry.name.endsWith(".html")) continue;           // skip non-HTML
    if (entry.name === "404.html") continue;               // skip error page

    let route = full
      .replace(/^site/, "")            // strip leading "site"
      .replace(/index\.html$/, "")     // drop trailing index.html
      .replace(/\.html$/, "/");        // foo.html → /foo/

    if (!route.startsWith("/")) route = "/" + route;
    routes.push(route);
  }

  return routes;
}

const pages = [...new Set(collectRoutes("site"))]; // de-dupe just in case

for (const route of pages) {
  test(`visual ${route}`, async ({ page }) => {
    await page.goto(`http://localhost:8000${route}`);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
}
