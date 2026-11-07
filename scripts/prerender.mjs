import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { createServer } from 'vite';

// Use Vite's module loader without starting an HTTP server. No network calls or
// browser execution are needed to publish the saved content as static HTML.
const vite = await createServer({
  server: { middlewareMode: true, watch: null, hmr: false },
  appType: 'custom',
});

try {
  const { renderPage, renderSeo, pagePaths } = await vite.ssrLoadModule('/src/entry-server.tsx');
  const template = await readFile(resolve('dist/index.html'), 'utf8');
  if (!template.includes('<!--app-html-->')) throw new Error('Missing pre-render outlet');

  for (const path of pagePaths) {
    const directory = resolve('dist', `.${path}`);
    const html = template
      .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, () => renderSeo(path))
      .replace('<!--app-html-->', () => renderPage(path));
    await mkdir(directory, { recursive: true });
    await writeFile(resolve(directory, 'index.html'), html);
    console.log(`Pre-rendered ${path}`);
  }
} finally {
  await vite.close();
}
