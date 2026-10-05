import { mkdirSync, copyFileSync, readdirSync } from 'node:fs';
mkdirSync('public', { recursive: true });
const pages = new Set(['index.html', 'style.css', 'app.js', 'data.js', 'installation.js', 'labirinto.js', 'i18n.js', 'descriptions.js', 'labirinto.html', '_headers']);
for (const file of readdirSync('.')) {
  if (pages.has(file) || file.endsWith('.webp')) copyFileSync(file, `public/${file}`);
}
