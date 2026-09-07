import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoggingDemo.css';

export default function LoggingDemo() {
  const [weight, setWeight] = useState(70);
  const [reps, setReps] = useState(8);
  const [completed, setCompleted] = useState(false);

  // Epley formula: 1RM = w * (1 + r/30)
  const epley1RM = weight * (1 + reps / 30);
  const volume = weight * reps;

  return (
    <section id="demo" className="logging-demo-section container">
      <div className="demo-header">
        <h2 className="demo-title">Try it yourself</h2>
        <div className="demo-subtitle">
          <span className="info-icon">i</span> Interactive preview with sample data
        </div>
      </div>

      <div className="demo-card">
        <div className="demo-exercise-name">BENCH PRESS</div>
        
        <div className={`demo-set-row ${completed ? 'is-completed' : ''}`}>
          <div className="demo-set-number">1</div>
          
          <div className="demo-control-group">
            <button 
              className="demo-btn" 
              onClick={() => setWeight(w => Math.max(0, w - 2.5))}
              aria-label="Decrease weight"
            >
              -
            </button>
            <div className="demo-value-display">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={`w-${weight}`}
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {weight}
                </motion.span>
              </AnimatePresence>
              <span className="demo-unit">kg</span>
            </div>
            <button 
              className="demo-btn" 
              onClick={() => setWeight(w => w + 2.5)}
              aria-label="Increase weight"
            >
              +
            </button>
          </div>

          <div className="demo-times">×</div>

          <div className="demo-control-group">
            <button 
              className="demo-btn" 
              onClick={() => setReps(r => Math.max(0, r - 1))}
              aria-label="Decrease reps"
            >
              -
            </button>
            <div className="demo-value-display">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={`r-${reps}`}
                  initial={{ opacity: 0, scale: 0.8, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  transition={{ duration: 0.15 }}
                >
                  {reps}
                </motion.span>
              </AnimatePresence>
            </div>
            <button 
              className="demo-btn" 
              onClick={() => setReps(r => r + 1)}
              aria-label="Increase reps"
            >
              +
            </button>
          </div>

          <div className="demo-rpe">@8</div>
        </div>

        <button 
          className={`demo-complete-btn ${completed ? 'completed' : ''}`}
          onClick={() => setCompleted(!completed)}
        >
          {completed ? 'Set completed ✓' : 'Complete set'}
        </button>

        <div className="demo-summary" aria-live="polite">
          Volume: {volume}kg · Estimated 1RM: {epley1RM.toFixed(1)}kg
        </div>
      </div>
    </section>
  );
}
