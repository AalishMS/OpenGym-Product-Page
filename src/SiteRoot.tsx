import { StrictMode } from 'react';
import App from './App';
import { ReleaseProvider } from './ReleaseProvider';
import { AccentProvider } from './AccentProvider';

/** Shared tree keeps the generated HTML and the first browser render identical. */
export function SiteRoot({ path }: { path: string }) {
  return (
    <StrictMode>
      <ReleaseProvider>
        <AccentProvider>
          <App path={path} />
        </AccentProvider>
      </ReleaseProvider>
    </StrictMode>
  );
}
