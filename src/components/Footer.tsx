import { useReleaseData } from '../releaseContext';
import './Footer.css';

export function Footer() {
  const { config, releases } = useReleaseData();
  return (
    <footer className="footer-wrapper">
      <section className="footer-cta-section">
        <div className="footer-cta-glow" aria-hidden="true" />
        <div className="container footer-cta-content">
          <h2 className="footer-headline">
            <span>Your next session</span>
            <span>starts here.</span>
          </h2>
          <div className="footer-cta-actions">
            <a href={config.links.download} className="btn btn-primary btn-lg" target="_blank" rel="noopener noreferrer">
              {config.hero.downloadLabel}
            </a>
            <a className="text-link" href="/#installation">{config.installation.linkLabel}</a>
          </div>
          <p className="footer-cta-meta">
            {config.hero.versionLabel} {releases[0].version.split('+')[0]}. Free, open source, and yours to keep.
          </p>
        </div>
      </section>

      <div className="footer-main">
        <div className="container footer-main-container">
          <a href="/" className="footer-logo">
            <span className="footer-logo-mark" aria-hidden="true">&gt;</span> OpenGym
          </a>
          <nav className="footer-links" aria-label="Footer">
            <a href="/#features">Features</a>
            <a href="/#history">History</a>
            <a href="/releases/">Releases</a>
            <a href={config.links.repository} target="_blank" rel="noopener noreferrer">GitHub</a>
          </nav>
          <div className="footer-copy">Open source. Built with Flutter.</div>
        </div>
      </div>
    </footer>
  );
}
