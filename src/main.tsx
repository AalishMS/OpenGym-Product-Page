import { createRoot, hydrateRoot } from 'react-dom/client';
import './index.css';
import { SiteRoot } from './SiteRoot';

const container = document.getElementById('root')!;
const app = <SiteRoot path={window.location.pathname} />;

if (container.querySelector('main')) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
