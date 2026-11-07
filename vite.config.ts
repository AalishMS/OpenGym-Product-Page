import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { crawlAssets, isReleasesPath, renderSeo } from './src/seo.ts';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'opengym-seo',
      transformIndexHtml: {
        order: 'pre',
        handler: (html, context) => html.replace(
          '<!--seo-head-->',
          () => `<!--seo-start-->${renderSeo(isReleasesPath(context.path) ? '/releases/' : '/')}<!--seo-end-->`,
        ),
      },
      generateBundle() {
        for (const [fileName, source] of Object.entries(crawlAssets())) {
          this.emitFile({ type: 'asset', fileName, source });
        }
      },
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          const path = request.url?.split('?')[0].slice(1);
          const assets = crawlAssets();
          if (!path || !(path in assets)) return next();
          response.setHeader('Content-Type', path.endsWith('.xml') ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8');
          response.end(assets[path as keyof typeof assets]);
        });
      },
    },
  ],
});
