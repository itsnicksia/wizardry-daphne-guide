import { ViewConfig } from './views/view-config';
import { createSplitterString, formatRows } from './markdown';
import { PGlite } from '@electric-sql/pglite';

export async function generateView(pg: PGlite, path: string, viewConfig: ViewConfig) {
  const { columns, itemTypes, tableName } = viewConfig;

  await loadTableFromCsv(pg, path);

  const headers = Object.keys(columns);
  const formattedHeader = Object.values(columns).join('|');

  const splitter = createSplitterString(headers.length + 1);

  const columnsParam = headers.join(',');

  let output = "";
  for (let index = 0; index < itemTypes.length; index++) {
    const itemType = itemTypes[index];

    const rawData = await pg.query<string>(`
      SELECT
      ${columnsParam}
      FROM ${tableName}
      WHERE type = LOWER('${itemType}')
    `);

    const formattedRows = formatRows(rawData.rows);
    const typeHeader = `# ${itemType} `;

    output = output.concat(`
${typeHeader}
|${formattedHeader}|
${splitter}
|${formattedRows}|

    `);
  }

  return output;
}

async function loadTableFromCsv(pg:PGlite, path: string) {
  throw new Error("Not yet implemented!");
}
