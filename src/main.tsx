import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ReleaseProvider } from './ReleaseProvider';
import { AccentProvider } from './AccentProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReleaseProvider>
      <AccentProvider>
        <App />
      </AccentProvider>
    </ReleaseProvider>
  </StrictMode>
);
