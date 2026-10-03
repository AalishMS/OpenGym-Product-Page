import { useEffect, useRef, useState } from 'react';
import { config } from '../config';
import './Header.css';
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  useEffect(() => {
    const close = () => setOpen(false);
    const desktop = window.matchMedia('(min-width: 768px)');
    window.addEventListener('hashchange', close);
    desktop.addEventListener('change', close);
    return () => {
      window.removeEventListener('hashchange', close);
      desktop.removeEventListener('change', close);
    };
  }, []);
  return (
    <header className="header header--scrolled" onBlur={(event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
    }}>
      <div className="container header-container">
        <a href="#" className="header-logo" onClick={() => setOpen(false)}>
          <span className="header-logo-accent">&gt;</span> OpenGym
        </a>
        <button
          ref={toggle}
          type="button"
          className="header-menu-toggle"
          onClick={() => setOpen((previous) => !previous)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="site-navigation"
        >
          {open ? '✕' : '☰'}
        </button>
        <nav
          id="site-navigation"
          className={`site-navigation ${open ? 'is-open' : ''}`}
          aria-label="Main navigation"
        >
          <a href="#features" className="header-link" onClick={() => setOpen(false)}>
            Features
          </a>
          <a href="#personalization" className="header-link" onClick={() => setOpen(false)}>
            Make it yours
          </a>
          <a href="#/releases" className="header-link" onClick={() => setOpen(false)}>
            Releases
          </a>
          <a
            href={config.links.download}
            className="header-cta"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            Download for Android ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
