import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { ReleaseProvider } from './ReleaseProvider';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReleaseProvider><App /></ReleaseProvider>
  </StrictMode>
);
