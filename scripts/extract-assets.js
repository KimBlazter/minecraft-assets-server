import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";

// CONFIG
const jarPath = process.argv[2]; // ex: "./1.21.5.jar"
const outputDir = "./assets-test";

// Ensure the jar file path is provided and exists
if (!jarPath || !fs.existsSync(jarPath)) {
    console.error("Usage: node extract-assets.js <minecraft.jar>");
    process.exit(1);
}

const zip = new AdmZip(jarPath);
const entries = zip.getEntries();

let exportedAssetsCount = 0;

// Iterate through all entries in the JAR file with a prefix of "assets/"
entries.forEach((entry) => {
    if (entry.entryName.startsWith("assets/") && !entry.isDirectory) {
        const destPath = path.join(
            outputDir,
            entry.entryName.replace(/^assets\//, ""),
        );
        const destDir = path.dirname(destPath);

        fs.mkdirSync(destDir, { recursive: true });
        fs.writeFileSync(destPath, entry.getData());
        exportedAssetsCount++;
    }
});

console.log(`✅ ${exportedAssetsCount} assets extracted to "${outputDir}".`);
