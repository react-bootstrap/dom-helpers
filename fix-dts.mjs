// Need this fix up script due to https://github.com/microsoft/TypeScript/issues/61037

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import fs from 'fs/promises';
import { glob } from 'glob';

const folders = ['cjs/*.d.ts', 'esm/*.d.ts'];
const importRegex = /(import\s.*?from\s+['"])(.*?\.ts)(['"])/g;

async function fixImportsInFile(filePath) {
  let content = await fs.readFile(filePath, 'utf8');
  const newContent = content.replace(importRegex, (match, p1, p2, p3) => {
    return `${p1}${p2.replace(/\.ts$/, '.d.ts')}${p3}`;
  });
  if (content !== newContent) {
    await fs.writeFile(filePath, newContent, 'utf8');
    console.log(`Fixed imports in: ${filePath}`);
  }
}

async function main() {
  for (const folder of folders) {
    const files = glob.sync(folder, { nodir: true });
    for (const file of files) {
      await fixImportsInFile(file);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
