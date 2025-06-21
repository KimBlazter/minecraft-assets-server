import AdmZip from 'adm-zip';
import fs from 'fs';
import path from 'path';

const fs = require('fs');
const path = require('path');

// === CONFIG ===
const jarPath = process.argv[2]; // ex: "./minecraft.jar"
const outputDir = './assets';

if (!jarPath || !fs.existsSync(jarPath)) {
  console.error('Usage: node extract-assets.js <minecraft.jar>');
  process.exit(1);
}

const zip = new AdmZip(jarPath);
const entries = zip.getEntries();

entries.forEach(entry => {
  if (entry.entryName.startsWith('assets/') && !entry.isDirectory) {
    const destPath = path.join(outputDir, entry.entryName.replace(/^assets\//, ''));
    const destDir = path.dirname(destPath);

    fs.mkdirSync(destDir, { recursive: true });
    fs.writeFileSync(destPath, entry.getData());
    console.log(`✅ Extracted: ${destPath}`);
  }
});
