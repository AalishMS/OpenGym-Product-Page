import { renderToString } from 'react-dom/server';
import { SiteRoot } from './SiteRoot';
import type { PagePath } from './seo';

export { pagePaths, renderSeo } from './seo';

export function renderPage(path: PagePath) {
  return renderToString(<SiteRoot path={path} />);
}
