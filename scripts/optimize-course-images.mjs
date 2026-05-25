import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

async function optimizeDir(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));
  for (const file of files) {
    const input = path.join(dir, file);
    const id = file.replace('.png', '');
    const webpOut = path.join(dir, `${id}.webp`);
    const jpgOut = path.join(dir, `${id}.jpg`);

    await sharp(input)
      .resize(800, 450, { fit: 'cover', position: 'centre' })
      .webp({ quality: 84 })
      .toFile(webpOut);

    await sharp(input)
      .resize(800, 450, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(jpgOut);

    fs.unlinkSync(input);
    const webpKb = Math.round(fs.statSync(webpOut).size / 1024);
    const jpgKb = Math.round(fs.statSync(jpgOut).size / 1024);
    console.log(`${path.basename(dir)}/${id}: webp ${webpKb}KB, jpg ${jpgKb}KB`);
  }
}

await optimizeDir(path.join(root, 'public', 'courses'));
await optimizeDir(path.join(root, 'public', 'training'));
