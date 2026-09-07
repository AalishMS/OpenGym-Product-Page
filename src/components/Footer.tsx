import { motion } from 'framer-motion';
import { config } from '../config';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer-wrapper">
      <section className="footer-cta-section">
        <div className="container">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="footer-cta-content"
          >
            <h2 className="footer-headline">Your next session starts here.</h2>
            <a href={config.links.download} className="btn btn-primary footer-btn" target="_blank" rel="noopener noreferrer">
              Download for Android
            </a>
          </motion.div>
        </div>
      </section>

      <div className="footer-main">
        <div className="container footer-main-container">
          <div className="footer-brand">
            <span className="footer-logo">
              <span className="footer-logo-accent">&gt;</span> OpenGym
            </span>
          </div>
          <div className="footer-links">
            <a href={config.links.repository} target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href={config.links.download} target="_blank" rel="noopener noreferrer">Releases</a>
          </div>
          <div className="footer-copy">
            Open source · Built with Flutter
          </div>
        </div>
      </div>
    </footer>
  );
}
