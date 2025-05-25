import { Row } from '@electric-sql/pglite';

export function createSplitterString(numHeaders: number): string {
  return new Array(numHeaders)
    .fill('|')
    .join('--');
}

export function formatRows(rows: Row<string>[]): string {
  return rows.map(row => Object.values(row).join("|")).join("|\n|");
}
