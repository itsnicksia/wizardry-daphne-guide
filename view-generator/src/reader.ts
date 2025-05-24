import { PGlite } from '@electric-sql/pglite';
import * as fs from 'fs';

const pg = new PGlite()

export async function generateSkillsView() {
  const headerMap: Record<string, string> = {
    name: "Skill",
    effect: "Effects",
    level_effect: "Details"
  };

  await loadSkillsData('../data/skills.csv');

  const headers = Object.keys(headerMap);
  const formattedHeader = Object.values(headerMap).join('|');

  const formattedSplitter = createSplitterString(headers.length + 1);

  const columns = headers.join(',');

  let output = "";
  const skillTypes = ["Active", "Passive", "Damage", "Recovery", "Support", "Debuff"];
  for (let index = 0; index < skillTypes.length; index++) {
    const skillType = skillTypes[index];

    const rawData = await pg.query(`
      SELECT
      ${columns}
      FROM skills
      WHERE type = LOWER('${skillType}')
    `);


    const formattedData = rawData.rows.map(row => Object.values(row).join("|")).join("|\n|");
    const skillTypeHeader = `# ${skillType} `;

    output = output.concat(`
${skillTypeHeader}
|${formattedHeader}|
${formattedSplitter}
|${formattedData}|

    `);
  }

  return output;
}

async function loadSkillsData(path: string) {
  const skillsData = fs.readFileSync(path, 'utf8');

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

}

function createSplitterString(numHeaders: number): String {
  return new Array(numHeaders)
    .fill('|')
    .join('--');
}
