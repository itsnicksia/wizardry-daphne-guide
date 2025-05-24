import * as core from '@actions/core';
import * as fs from 'fs';
import { generateSkillsView } from './reader';

/**
 * The main function for the action.
 *
 * @returns Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    // const pg = new PGlite();
    const output = await generateSkillsView();
    writeView("skills", output);
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}

function writeView(viewName: string, content: string) {
  const filePath = `generated/views/${viewName}.md`;
  fs.writeFileSync(filePath, content, 'utf8');
}
