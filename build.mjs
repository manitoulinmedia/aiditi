import { mkdirSync, copyFileSync, readdirSync } from 'node:fs';
mkdirSync('public', { recursive: true });
const pages = new Set(['intro-logo.svg', 'hero-motion.js', 'launch.js', 'favicon.svg', 'apple-touch-icon.png', 'robots.txt', 'sitemap.xml', 'index.html', 'style.css', 'app.js', 'data.js', 'installation.js', 'experience.js', 'labirinto.js', 'i18n.js', 'descriptions.js', 'labirinto.html', '_headers', 'aiditi-logo-black-2024-2-spaced.gif', 'aiditi-logo-white-2024-2-spaced.gif']);
for (const file of readdirSync('.')) {
  if (pages.has(file) || file.endsWith('.webp')) copyFileSync(file, `public/${file}`);
}
