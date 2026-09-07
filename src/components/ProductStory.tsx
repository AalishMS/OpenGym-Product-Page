import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './ProductStory.css';

const stages = [
  {
    id: 'plan',
    title: 'Plan your week.',
    description: 'Build your training week with custom plans or start from one of the bundled programs. Each plan holds your exercises, target sets, and notes—ready when you are.',
  },
  {
    id: 'log',
    title: 'Log your session.',
    description: 'Tap into your plan and start logging. Weight, reps, and RPE for every set. Your previous values auto-fill, so most sessions take just a few taps.',
  },
  {
    id: 'progress',
    title: 'See your progress.',
    description: 'See where you’re headed. Exercise charts track your top weight over time, and personal records are logged automatically. Weekly training volume keeps your consistency visible.',
  }
];

// --- Phone Screen Components ---

const ScreenPlan = () => (
  <div className="phone-screen phone-screen--plan" style={{ padding: 0 }}>
    <img src="/screenshots/home.png" alt="Plan" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
  </div>
);

const ScreenLog = () => (
  <div className="phone-screen phone-screen--log" style={{ padding: 0 }}>
    <img src="/screenshots/workout_keypad.png" alt="Log" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
  </div>
);

const ScreenProgress = () => {
  return (
    <div className="phone-screen phone-screen--progress" style={{ padding: 0 }}>
      <img src="/screenshots/statistics.png" alt="Progress" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
};

export default function ProductStory() {
  const [activeStage, setActiveStage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute('data-index'));
            setActiveStage(index);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    stageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [isMobile]);

  const renderScreen = () => {
    switch (activeStage) {
      case 0: return <ScreenPlan key="plan" />;
      case 1: return <ScreenLog key="log" />;
      case 2: return <ScreenProgress key="progress" />;
      default: return null;
    }
  };

  return (
    <section id="features" className="product-story container">
      {isMobile ? (
        <div className="story-mobile">
          <div className="story-tabs">
            {['Plan', 'Log', 'Progress'].map((tab, i) => (
              <button 
                key={tab}
                className={`story-tab ${activeStage === i ? 'active' : ''}`}
                onClick={() => setActiveStage(i)}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="story-content-mobile">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stage-info">
                  <div className="stage-caption">Stage {activeStage + 1}</div>
                  <h3 className="stage-title">{stages[activeStage].title}</h3>
                  <p className="stage-description">{stages[activeStage].description}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="phone-preview">
            <div className="phone-hardware">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                  className="screen-container"
                >
                  {renderScreen()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      ) : (
        <div className="story-desktop" ref={scrollRef}>
          <div className="story-left">
            {stages.map((stage, i) => (
              <div 
                className="story-stage" 
                key={stage.id} 
                data-index={i}
                ref={(el) => { stageRefs.current[i] = el; }}
              >
                <div className="stage-info">
                  <div className="stage-caption">Stage {i + 1}</div>
                  <h3 className="stage-title">{stage.title}</h3>
                  <p className="stage-description">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="story-right">
            <div className="sticky-container">
              <div className="stage-indicators">
                {stages.map((stage, i) => (
                  <button 
                    key={stage.id}
                    className={`indicator-pill ${activeStage === i ? 'active' : ''}`}
                    onClick={() => {
                      stageRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }}
                  >
                    {i + 1}. {stage.id.charAt(0).toUpperCase() + stage.id.slice(1)}
                  </button>
                ))}
              </div>
              <div className="phone-preview">
                <div className="phone-hardware">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStage}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="screen-container"
                    >
                      {renderScreen()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
