import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { AppMockup, type MockScreen } from './AppMockup';
import { PhoneFrame } from './PhoneFrame';
import { config } from '../config';
import './ProductStory.css';

const STAGE_CATEGORIES = ['WORKOUT BUILDER', 'LIVE LOGGING', 'PROGRESSION'];

const STAGE_TAGS = [
  ['Custom splits', 'Target sets & notes', 'Bundled programs'],
  ['Quick keypad', 'Rest timer & RPE', 'Previous set auto-fill'],
  ['Volume trends', '1RM calculations', 'Personal records'],
];

export default function ProductStory() {
  const [activeStage, setActiveStage] = useState(0);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isManualScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrollingRef.current) return;
      if (window.innerWidth < 1024) return;

      const targetCenter = (window.innerHeight + 64) / 2;
      let closestIndex = 0;
      let minDistance = Infinity;

      stageRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const stageCenter = rect.top + rect.height / 2;
        const distance = Math.abs(targetCenter - stageCenter);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      setActiveStage((prev) => (prev !== closestIndex ? closestIndex : prev));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const handleSelect = (index: number) => {
    setActiveStage(index);
    const target = stageRefs.current[index];
    if (target && window.innerWidth >= 1024) {
      isManualScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      let targetScrollY: number;
      if (index === 0) {
        const feat = document.getElementById('features');
        const featRect = feat?.getBoundingClientRect();
        targetScrollY = featRect ? window.scrollY + featRect.top - 75 : window.scrollY;
      } else {
        const r = target.getBoundingClientRect();
        targetScrollY =
          window.scrollY + r.top + r.height / 2 - (window.innerHeight + 64) / 2;
      }

      const prefersReduced = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      window.scrollTo({
        top: targetScrollY,
        behavior: prefersReduced ? 'instant' : 'smooth',
      });

      scrollTimeoutRef.current = window.setTimeout(() => {
        isManualScrollingRef.current = false;
      }, 700);
    }
  };

  const renderScreen = () => {
    const activeScreen: MockScreen =
      config.story[activeStage].id === 'log'
        ? 'keypad'
        : (config.story[activeStage].id as MockScreen);
    return <AppMockup screen={activeScreen} theme="light" />;
  };

  return (
    <section id="features" className="product-story-section container">
      <div className="story-header">
        <p className="eyebrow">FROM THE FIRST REP TO THE NEXT RECORD</p>
        <h2>
          A place for all
          <br />
          the work you put in.
        </h2>
      </div>

      <div className="product-story desktop-only">
        <div className="story-copy">
          <div className="story-choices" aria-label="Explore app features">
            {config.story.map((stage, i) => (
              <div
                key={stage.id}
                ref={(el) => {
                  stageRefs.current[i] = el;
                }}
                className="story-stage"
              >
                <button
                  type="button"
                  aria-label={`0${i + 1} ${stage.title}`}
                  className={`story-choice ${activeStage === i ? 'active' : ''}`}
                  onClick={() => handleSelect(i)}
                  aria-pressed={activeStage === i}
                  aria-controls="feature-preview"
                >
                  <div className="story-stage-head">
                    <span className="story-step">0{i + 1}</span>
                    <span className="story-stage-category">
                      {STAGE_CATEGORIES[i]}
                    </span>
                    <span className="story-arrow" aria-hidden="true">
                      ↗
                    </span>
                  </div>
                  <div className="story-stage-body">
                    <strong>{stage.title}</strong>
                    <span className="story-desc">{stage.description}</span>
                  </div>
                  <div className="story-stage-tags">
                    {STAGE_TAGS[i].map((tag) => (
                      <span key={tag} className="story-tag">
                        <span className="story-tag-dot" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>

        <div id="feature-preview" className="story-preview">
          <div
            className="story-progress"
            aria-label="Feature stages"
          >
            {config.story.map((stage, i) => (
              <button
                key={stage.id}
                type="button"
                aria-label={`Show ${stage.id} preview`}
                aria-pressed={activeStage === i}
                className={`story-tab-btn indicator-pill ${activeStage === i ? 'active' : ''}`}
                onClick={() => handleSelect(i)}
              >
                <span className="story-tab-step">0{i + 1}</span>
                <span className="story-tab-label">
                  {stage.id === 'plan'
                    ? 'Plan'
                    : stage.id === 'log'
                      ? 'Log'
                      : 'Progress'}
                </span>
              </button>
            ))}
          </div>

          <PhoneFrame tiltOnHover={true}>
            <div className="story-screen-viewport">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                  className="screen-container"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </div>
          </PhoneFrame>
          <p>App preview · Sample data</p>
        </div>
      </div>

      <div className="story-mobile mobile-only">
        <div className="story-tabs" role="tablist">
          {config.story.map((stage, i) => (
            <button
              key={`tab-${stage.id}`}
              role="tab"
              aria-selected={activeStage === i}
              className={`story-tab ${activeStage === i ? 'active' : ''}`}
              onClick={() => setActiveStage(i)}
            >
              {stage.id === 'plan' ? 'Plan' : stage.id === 'log' ? 'Log' : 'Progress'}
            </button>
          ))}
        </div>
        
        <div className="story-stage-content">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
              className="story-stage-animated-text"
            >
              <span className="story-stage-category-mobile">{STAGE_CATEGORIES[activeStage]}</span>
              <h3>{config.story[activeStage].title}</h3>
              <p>{config.story[activeStage].description}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="story-phone-preview">
          <PhoneFrame tiltOnHover={false}>
            <div className="story-screen-viewport">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
                  className="screen-container"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </div>
          </PhoneFrame>
        </div>
      </div>
    </section>
  );
}
