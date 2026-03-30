// Auto-generates src/index.ts with export * from './components/Component' for every icon file

const fs = require("node:fs");
const path = require("node:path");

const COMPONENTS_DIR = path.join(__dirname, "../components");
const OUTPUT_FILE = path.join(__dirname, "../index.ts");
const COMPONENTS_INDEX_FILE = path.join(COMPONENTS_DIR, "index.ts");

const files = fs
  .readdirSync(COMPONENTS_DIR)
  .filter((f) => f.endsWith(".tsx") && f !== "index.ts")
  .sort();

const rootLines = ["// Auto-generated: export all icons from components/index.ts", "export * from './components'", ""];

const componentsLines = ["// Auto-generated: named re-exports for all icons", ...files.map((f) => `export * from "./${f.replace(/\.tsx$/, "")}";`), ""];

fs.writeFileSync(OUTPUT_FILE, rootLines.join("\n"));
fs.writeFileSync(COMPONENTS_INDEX_FILE, componentsLines.join("\n"));
console.log(`Wrote ${files.length} exports to index.ts and components/index.ts`);
