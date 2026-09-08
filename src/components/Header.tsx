import { useEffect, useRef, useState } from 'react';
import { config } from '../config';
import './Header.css';
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);
  return (
    <header className="header header--scrolled">
      <div className="container header-container">
        <a href="#" className="header-logo" onClick={() => setOpen(false)}>
          <span className="header-logo-accent">&gt;</span> OpenGym
        </a>
        <button
          ref={toggle}
          className="header-menu-toggle"
          onClick={() => setOpen(!open)}
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
          onClick={() => setOpen(false)}
        >
          <a href="#features" className="header-link">
            Features
          </a>
          <a href="#personalization" className="header-link">
            Make it yours
          </a>
          <a href="#/releases" className="header-link">
            Releases
          </a>
          <a
            href={config.links.download}
            className="header-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download for Android ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
