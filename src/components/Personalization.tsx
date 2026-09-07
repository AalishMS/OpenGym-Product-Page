import { useState } from 'react';
import { motion } from 'framer-motion';
import './Personalization.css';
import { config } from '../config';

type Theme = 'dark' | 'light';

export function Personalization() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [accent, setAccent] = useState<{ name: string; seed: string }>(config.appAccents[0]);

  return (
    <section id="personalization" className="personalization-section">
      <div className="container">
        
        <div className="personalization-content">
          <motion.div 
            className="personalization-controls"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="personalization-headline">Make it yours.</h2>
            <p className="personalization-subtitle">Light or dark, with the accent that fits.</p>

            <div className="controls-group">
              <div className="theme-toggle">
                <button 
                  className={`theme-btn ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => setTheme('dark')}
                  style={theme === 'dark' ? { backgroundColor: accent.seed, color: '#000' } : {}}
                >
                  Dark
                </button>
                <button 
                  className={`theme-btn ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => setTheme('light')}
                  style={theme === 'light' ? { backgroundColor: accent.seed, color: '#000' } : {}}
                >
                  Light
                </button>
              </div>

              <div className="accent-picker" role="radiogroup" aria-label="Select accent color">
                {config.appAccents.map((a) => (
                  <button
                    key={a.name}
                    className={`accent-swatch ${accent.name === a.name ? 'selected' : ''}`}
                    style={{ '--swatch-color': a.seed } as React.CSSProperties}
                    onClick={() => setAccent(a)}
                    aria-label={a.name}
                    aria-checked={accent.name === a.name}
                    role="radio"
                  />
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="personalization-preview"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div 
              className={`phone-frame ${theme}`}
              style={{ '--preview-accent': accent.seed } as React.CSSProperties}
            >
              <div className="phone-screen" style={{ padding: 0 }}>
                <img 
                  src={theme === 'dark' ? '/screenshots/home_dark.png' : '/screenshots/home.png'} 
                  alt="Theme preview" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
                />
              </div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
