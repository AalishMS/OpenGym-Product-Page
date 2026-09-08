import { motion, useReducedMotion } from 'framer-motion';
import { AppMockup } from './AppMockup';
import { PhoneFrame } from './PhoneFrame';
import { config } from '../config';
import './Hero.css';

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemFadeUp = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
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
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.4,
      },
    },
  };

  return (
    <section className="hero">
      <div className="container hero-container">
        <motion.div
          className="hero-content"
          variants={staggerContainer}
          initial="hidden"
          animate="show"
        >
          <motion.p className="eyebrow" variants={itemFadeUp}>
            YOUR TRAINING. YOUR TERMS.
          </motion.p>
          <motion.h1 className="hero-headline" variants={itemFadeUp}>
            Make <span className="hero-accent">every</span>
            <br />
            set count.
          </motion.h1>
          <motion.p className="hero-subheading" variants={itemFadeUp}>
            Sign in on first launch, then plan, log, and review your training
            with local-first data that stays available offline.
          </motion.p>
          <motion.div className="hero-actions" variants={itemFadeUp}>
            <a
              href={config.links.download}
              className="btn btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download for Android
            </a>
            <a href="#features" className="btn btn-secondary">
              Explore the app ↓
            </a>
          </motion.div>
          <motion.div className="hero-details" variants={itemFadeUp}>
            <span>Offline after sign-in</span>
            <span>Open source</span>
            <span>Local-first data</span>
          </motion.div>
        </motion.div>

        <div className="hero-visual">
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
              Your session, at a glance · Sample data
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
