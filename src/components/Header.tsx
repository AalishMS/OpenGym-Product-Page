import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion';
import { config } from '../config';
import './Header.css';
export function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });
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
            href={config.links.repository}
            className="header-link header-github"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <svg className="header-github-icon" viewBox="0 0 16 16" width="18" height="18" aria-hidden="true" focusable="false">
              <path
                fill="currentColor"
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z"
              />
            </svg>
            GitHub
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
      <motion.div
        className="header-progress"
        aria-hidden="true"
        style={{ scaleX: shouldReduceMotion ? scrollYProgress : smoothProgress }}
      />
    </header>
  );
}
