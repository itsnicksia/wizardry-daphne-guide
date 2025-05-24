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
    const output = await generateSkillsView();

    const filePath = 'generated/views/skills.md';
    fs.writeFileSync(filePath, output, 'utf8');

  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
