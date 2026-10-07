import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { AppMockup } from './AppMockup';
import { PhoneFrame } from './PhoneFrame';
import { config } from '../config';
import { releases } from '../releases';
import './Hero.css';

const EASE = [0.16, 1, 0.3, 1] as const;
const HEADLINE = [['Make', 'every'], ['set', 'count.']];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.5 },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE },
    },
  };

  const phoneAnimation = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 40,
      rotate: shouldReduceMotion ? 0 : 3,
    },
    show: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        duration: 0.9,
        ease: EASE,
        delay: 0.4,
      },
    },
  };

  return (
    <section className="hero" ref={sectionRef}>
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p className="eyebrow" variants={itemFadeUp}>
            {config.hero.eyebrow}
          </motion.p>
          <h1 className="hero-headline">
            <span className="sr-only">OpenGym — Free Gym App &amp; Offline Workout Tracker. Make every set count.</span>
            <span aria-hidden="true">
              {HEADLINE.map((line, lineIndex) => (
                <span className="hero-line" key={line.join(' ')}>
                  {line.map((word, wordIndex) => {
                    const delay = 0.08 + (lineIndex * line.length + wordIndex) * 0.09;
                    const accent = word === 'every';
                    return (
                      <span className="hero-word-mask" key={word}>
                        <motion.span
                          className={`hero-word ${accent ? 'hero-accent' : ''}`}
                          initial={{ y: shouldReduceMotion ? 0 : '110%', opacity: shouldReduceMotion ? 0 : 1 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ duration: 0.8, ease: EASE, delay }}
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
          <motion.p className="hero-product-label" variants={itemFadeUp}>
            {config.hero.productLabel}
          </motion.p>
          <motion.p className="hero-subheading" variants={itemFadeUp}>
            {config.hero.description}
          </motion.p>
          <motion.div className="hero-actions" variants={itemFadeUp}>
            <a
              href={config.links.download}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {config.hero.downloadLabel}
            </a>
            <a href="#features" className="btn btn-secondary">
              {config.hero.exploreLabel} <span aria-hidden="true">↓</span>
            </a>
          </motion.div>
          <motion.div className="hero-download-info" variants={itemFadeUp}>
            <p>{config.hero.signInNote}</p>
            <div className="hero-download-meta">
              <span>{config.hero.versionLabel} · {releases[0].version} · {config.hero.updatedLabel}</span>
              <a href="#installation">{config.installation.linkLabel}</a>
            </div>
          </motion.div>
          <motion.div className="hero-details" variants={itemFadeUp}>
            {config.hero.details.map((detail) => <span key={detail}>{detail}</span>)}
          </motion.div>
        </motion.div>

        <div className="hero-visual">
          <motion.div className="hero-parallax" style={shouldReduceMotion ? undefined : { y: phoneY }}>
            <motion.div
              className="hero-phone-wrapper"
              variants={phoneAnimation}
              initial="hidden"
              animate="show"
            >
              <PhoneFrame tiltOnHover={true}>
                <AppMockup screen="log" theme="light" />
              </PhoneFrame>
              <div className="hero-phone-caption">
                {config.hero.caption}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
