import { useReducedMotion } from '../useReducedMotion';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AppMockup } from './AppMockup';
import { PhoneFrame } from './PhoneFrame';
import { useReleaseData } from '../releaseContext';
import './Hero.css';

const EASE = [0.16, 1, 0.3, 1] as const;
const HEADLINE = [['Make', 'every'], ['set', 'count.']];

const PROOF_ICONS = [
  // Open source: a pair of angle brackets.
  <path key="code" d="m8 7-4 5 4 5M16 7l4 5-4 5" />,
  // Offline: a crossed signal.
  <path key="offline" d="M3 9a14 14 0 0 1 18 0M6.5 12.5a9 9 0 0 1 11 0M10 16a4 4 0 0 1 4 0M12 19.5v.01M4 4l16 16" />,
  // Local data: a phone with a check.
  <path key="local" d="M7 3h10a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2.5 9 2 2 4-4" />,
];

export function Hero() {
  const { config, releases } = useReleaseData();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const chipY = useTransform(scrollYProgress, [0, 1], [0, -140]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: EASE, delay: shouldReduceMotion ? 0 : delay },
  });

  return (
    <section className="hero" ref={sectionRef}>
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-container">
        <div className="hero-content">
          <p className="eyebrow">{config.hero.productLabel}</p>
          <h1 className="hero-headline">
            <span className="sr-only">OpenGym — Free Gym App &amp; Offline Workout Tracker. Make every set count.</span>
            <span aria-hidden="true">
              {HEADLINE.map((line, lineIndex) => (
                <span className="hero-line" key={line.join(' ')}>
                  {line.map((word, wordIndex) => {
                    const delay = 0.1 + (lineIndex * line.length + wordIndex) * 0.085;
                    return (
                      <span className="hero-word-mask" key={word}>
                        <motion.span
                          className="hero-word"
                          initial={{ y: shouldReduceMotion ? 0 : '110%', opacity: shouldReduceMotion ? 0 : 1 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.9, ease: EASE, delay: shouldReduceMotion ? 0 : delay }}
                        >
                          {word}
                        </motion.span>
                      </span>
                    );
                  })}
                </span>
              ))}
            </span>
          </h1>

          <motion.p className="hero-subheading" {...rise(0.5)}>
            {config.hero.description}
          </motion.p>

          <motion.div className="hero-actions" {...rise(0.62)}>
            <a
              href={config.links.download}
              className="btn btn-primary btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              {config.hero.downloadLabel}
            </a>
            <a href="#features" className="btn btn-secondary btn-lg">
              {config.hero.exploreLabel}
            </a>
          </motion.div>

          <motion.div className="hero-meta" {...rise(0.74)}>
            <span className="hero-meta-version">
              <span className="hero-meta-dot" aria-hidden="true" />
              {config.hero.versionLabel} {releases[0].version.split('+')[0]}
            </span>
            <span className="hero-meta-sep" aria-hidden="true" />
            <span>{config.hero.updatedLabel}</span>
            <span className="hero-meta-sep" aria-hidden="true" />
            <a href="#installation" className="hero-meta-link">{config.installation.linkLabel}</a>
          </motion.div>
        </div>

        <div className="hero-visual">
          <motion.div
            className="hero-phone-wrapper"
            style={shouldReduceMotion ? undefined : { y: phoneY }}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 56, rotate: shouldReduceMotion ? 0 : 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: shouldReduceMotion ? 0 : 0.35 }}
          >
            <PhoneFrame tiltOnHover={true}>
              <AppMockup screen="log" theme="dark" />
            </PhoneFrame>
          </motion.div>

          {config.hero.chips.map((chip, index) => (
            <motion.div
              key={chip.label}
              className={`hero-chip hero-chip--${index}`}
              style={shouldReduceMotion ? undefined : { y: chipY }}
              aria-hidden="true"
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: shouldReduceMotion ? 1 : 0.92 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 260, damping: 24, delay: shouldReduceMotion ? 0 : 1.15 + index * 0.22 }}
            >
              <span className="hero-chip-mark">
                {index === 0 ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m5 12.5 4.5 4.5L19 7.5" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 17 10 10l4 4 6-7M14 7h6v6" />
                  </svg>
                )}
              </span>
              <span className="hero-chip-text">
                <span className="hero-chip-label">{chip.label}</span>
                <span className="hero-chip-value">{chip.value}</span>
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="container">
      <motion.ul className="hero-proof" {...rise(0.9)}>
        {config.hero.proof.map((item, index) => (
          <li key={item.title}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {PROOF_ICONS[index]}
            </svg>
            <span>
              <strong>{item.title}</strong>
              <span>{item.text}</span>
            </span>
          </li>
        ))}
      </motion.ul>
      </div>
    </section>
  );
}
