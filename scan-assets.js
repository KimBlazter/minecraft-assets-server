import fs from 'fs';
import path from 'path';

const ROOT = './assets';
const ASSETS_ROOT = `${ROOT}/minecraft/`
const OUTPUT_FILE = `${ROOT}/assets-index.json`

const scanDirectory = (dirPath, fileFilter) => {
  const results = [];

  const walk = (currentPath) => {
    const files = fs.readdirSync(currentPath);
    for (const file of files) {
      const fullPath = path.join(currentPath, file);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        walk(fullPath);
      } else if (fileFilter(fullPath)) {
        results.push(path.relative(ASSETS_ROOT, fullPath).replace(/\\/g, '/'));
      }
    }
  };

  walk(dirPath);
  return results;
};

const run = () => {
  const modelsBlock = scanDirectory(path.join(ASSETS_ROOT, 'models/block'), f => f.endsWith('.json'));
  const modelsItem = scanDirectory(path.join(ASSETS_ROOT, 'models/item'), f => f.endsWith('.json'));
  const texturesBlock = scanDirectory(path.join(ASSETS_ROOT, 'textures/block'), f => f.endsWith('.png'));
  const texturesItem = scanDirectory(path.join(ASSETS_ROOT, 'textures/item'), f => f.endsWith('.png'));

  const index = {
    models: {
      block: modelsBlock,
      item: modelsItem,
    },
    textures: {
      block: texturesBlock,
      item: texturesItem,
    }
  };

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log('✅ Index des assets généré avec succès.');
};

run();
