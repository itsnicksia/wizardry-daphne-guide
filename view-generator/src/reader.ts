import { PGlite } from '@electric-sql/pglite';
import * as fs from 'fs';

const pg = new PGlite()

export async function generateSkillsView() {
  const headerMap: Record<string, string> = {
    name: "Skill",
    effect: "Effects",
    level_effect: "Details"
  };

  const skillsData = fs.readFileSync('../data/skills.csv', 'utf8');

  const blob = new Blob([skillsData], { type: 'text/csv' });

  await pg.exec(`
    CREATE TABLE skills (
      name          TEXT,
      type          TEXT,
      effect        TEXT,
      level_effect  TEXT
    );
  `)

  await pg.query("COPY skills FROM '/dev/blob' WITH CSV;", [], { blob });
  await pg.exec("DELETE FROM skills WHERE name = 'name';");

  const headers = Object.keys(headerMap);
  const formattedHeader = Object.values(headerMap).join('|');

  const formattedSplitter = createSplitterString(headers.length + 1);

  const columns = headers.join(',');
  const rawData = await pg.query(`
      SELECT
      ${columns}
      FROM skills
    `);

  const formattedData = rawData.rows.map(row => Object.values(row).join("|")).join("|\n|");

  return `
|${formattedHeader}|
${formattedSplitter}
|${formattedData}|`
}

function createSplitterString(numHeaders: number): String {
  return new Array(numHeaders)
    .fill('|')
    .join('--');
}
