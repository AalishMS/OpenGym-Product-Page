import { useState, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AppMockup, type MockScreen } from './AppMockup';
import { previewTone } from './previewTone';
import { PhoneFrame } from './PhoneFrame';
import './Personalization.css';
import { config } from '../config';

const SCREEN_LABELS: Record<MockScreen, string> = {
  plan: 'Plan',
  log: 'Workout',
  progress: 'Statistics',
  keypad: 'Keypad',
};

export function Personalization() {
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [screen, setScreen] = useState<MockScreen>('plan');
  const [accent, setAccent] = useState<{ name: string; seed: string }>(
    config.appAccents[4],
  );
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="personalization" className="personalization-section">
      <div className="container personalization-content">
        <div className="personalization-header">
          <p className="eyebrow">A LITTLE MORE YOU</p>
          <h2 className="personalization-headline">
            Your routine.
            <br />
            Your kind of color.
          </h2>
          <p className="personalization-subtitle">
            Quiet neutrals. A color you love. Find your combination and see it
            come to life.
          </p>
        </div>

        <div
          className="personalization-preview"
          style={
            {
              '--selected-accent': previewTone(accent.seed, true),
            } as CSSProperties
          }
        >
          <div className="personalization-phone-stage">
            <motion.div
              className="personalization-phone-layer"
              animate={{
                boxShadow: `0 20px 60px -15px ${previewTone(accent.seed, theme === 'dark')}33`,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <PhoneFrame tiltOnHover={true}>
                <div className="personalization-screen-viewport">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={screen}
                      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
                      transition={{
                        duration: shouldReduceMotion ? 0 : 0.22,
                        ease: 'easeOut',
                      }}
                      className="personalization-screen-container"
                    >
                      <AppMockup
                        theme={theme}
                        accent={accent.seed}
                        screen={screen}
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </PhoneFrame>
            </motion.div>
          </div>
          <p>Live theme preview · Sample data</p>
        </div>

        <div className="personalization-controls">
          <div className="controls-group">
            <div className="controls-top-row">
              <div className="control-item">
                <p className="control-label">Appearance</p>
                <div
                  className="theme-toggle"
                  aria-label="Preview appearance"
                >
                  {(['light', 'dark'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      className={`theme-btn ${theme === mode ? 'active' : ''}`}
                      aria-pressed={theme === mode}
                      onClick={() => setTheme(mode)}
                    >
                      {theme === mode && !shouldReduceMotion && (
                        <motion.div
                          layoutId="activeThemePill"
                          className="theme-btn-active-pill"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}
                      <span className="theme-btn-label">
                        {mode === 'light' ? '☀ Light' : '☾ Dark'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="control-item">
                <p className="control-label">Screen</p>
                <div
                  className="theme-toggle"
                  aria-label="Preview screen"
                >
                  {(['plan', 'log', 'progress'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`theme-btn ${screen === s ? 'active' : ''}`}
                      aria-pressed={screen === s}
                      onClick={() => setScreen(s)}
                    >
                      {screen === s && !shouldReduceMotion && (
                        <motion.div
                          layoutId="activeScreenPill"
                          className="theme-btn-active-pill"
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 32,
                          }}
                        />
                      )}
                      <span className="theme-btn-label">
                        {s === 'plan' ? 'Plan' : s === 'log' ? 'Workout' : 'Statistics'}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="control-item">
              <p className="control-label">Accent color</p>
              <div className="accent-picker" aria-label="Accent color">
                {config.appAccents.map((a) => (
                  <motion.button
                    key={a.name}
                    type="button"
                    className={`accent-swatch ${accent.name === a.name ? 'selected' : ''}`}
                    style={{ '--swatch-color': a.seed } as CSSProperties}
                    onClick={() => setAccent(a)}
                    aria-label={a.name}
                    aria-pressed={accent.name === a.name}
                    whileHover={
                      shouldReduceMotion ? undefined : { scale: 1.12 }
                    }
                    whileTap={shouldReduceMotion ? undefined : { scale: 0.94 }}
                    transition={{
                      type: 'spring',
                      stiffness: 450,
                      damping: 25,
                    }}
                  >
                    <AnimatePresence>
                      {accent.name === a.name && (
                        <motion.span
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0 : 0.2,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="accent-check-icon"
                        >
                          ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="selection-caption-wrapper">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`${accent.name}-${theme}-${screen}`}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -4 }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.22,
                    ease: 'easeOut',
                  }}
                  className="selection-caption"
                  aria-live="polite"
                >
                  <span
                    className="selection-dot"
                    style={{ backgroundColor: accent.seed }}
                  />
                  {accent.name} · {theme === 'light' ? 'Light' : 'Dark'} appearance · {SCREEN_LABELS[screen]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
