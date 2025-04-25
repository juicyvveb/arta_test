import { promises as fs } from "fs";
import path from "path";

const OUT_FILE = path.resolve("src", "js", "languagesMap.js");
const LANG_DIR = path.resolve("src", "lang");

try {
  const files = await parseLangFiles(LANG_DIR);

  const map = files.reduce((acc, curr) => {
    const ext = path.extname(curr);
    const basename = path.basename(curr, ext);

    if (ext != ".json") return acc;
    acc[basename] = curr;

    return acc;
  }, {});

  const fileContent = `export default ${JSON.stringify(map)}`;
  
  await fs.writeFile(OUT_FILE, fileContent, "utf-8");

  console.log(`✅ languages' map is converted in ${OUT_FILE}`);
} catch (error) {
  console.log("❌ it's an error by languages map converting:", error?.message || error);
}

async function parseLangFiles(dir) {
  return await fs.readdir(dir);
}
