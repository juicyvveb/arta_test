import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

const srcDir = path.resolve("src/img-original");
const distDir = path.resolve("src/images");

async function imageMin(src = srcDir, dist = distDir, quality = 50) {
  try {
    await fs.rm(dist, { recursive: true, force: true });
    await fs.mkdir(dist, { recursive: true });
  } catch (error) {
    console.error("Ошибка при создании директории:", error);
  }

  const files = await fs.readdir(src);

  for (const file of files) {
    const inputPath = path.join(src, file);
    const ext = path.extname(file).toLowerCase();
    const baseName = path.basename(file, ext);

    const stat = await fs.stat(inputPath);

    if (stat.isDirectory()) {
      await imageMin(inputPath, path.join(dist, file), quality);
    } else {
      if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;

      const outputWebp = path.join(dist, `${baseName}.webp`);

      try {
        if (baseName.includes("avatar")) {
          //for avatars images
          await resizeAndStore(inputPath, outputWebp, 4, 20);
        } else if (src.includes("hero-bg")) {
          //for hero-bg we don't need large and hight quality imgs
          await resizeAndStore(inputPath, outputWebp, 3, 15);
        } else {
          //default converting
          await sharp(inputPath).webp({ quality }).toFile(outputWebp);
        }
        console.log(`✅ Сконвертировано: ${file} → ${baseName}.webp`);
      } catch (err) {
        console.error(`❌ Ошибка при конвертации ${file}:`, err);
      }
    }
  }
}

async function resizeAndStore(inputPath, outputPath, resize = 2, quality = 50) {
  return await sharp(inputPath)
    .metadata()
    .then(({ width, height }) => sharp(inputPath).resize(Math.round(width / resize)))
    .then((inp) => {
      inp.webp({ quality }).toFile(outputPath);
    });
}

await imageMin();
