import { mkdirSync, copyFileSync, readdirSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
mkdirSync('public', { recursive: true });
const pages = new Set(['intro-logo.svg', 'hero-motion.js', 'launch.js', 'favicon.svg', 'apple-touch-icon.png', 'robots.txt', 'sitemap.xml', 'index.html', 'style.css', 'app.js', 'data.js', 'installation.js', 'experience.js', 'labirinto.js', 'i18n.js', 'descriptions.js', 'labirinto.html', '_headers', 'aiditi-logo-black-2024-2-spaced.gif', 'aiditi-logo-white-2024-2-spaced.gif']);
for (const file of readdirSync('.')) {
  if (pages.has(file) || file.endsWith('.webp')) copyFileSync(file, `public/${file}`);
}
// Public release identity lets remote editors verify publication without dashboard access.
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error('Unable to identify the release commit');
writeFileSync('public/deployment.json', JSON.stringify({ commit }) + '\n');
