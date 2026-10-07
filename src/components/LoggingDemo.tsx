import { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { config } from '../config';
import { AnimatedNumber } from './AnimatedNumber';
import './LoggingDemo.css';

const demo = config.loggingDemo;

// Epley formula: 1RM = w * (1 + r/30)
const e1rm = (weight: number, reps: number) => (reps > 0 ? weight * (1 + reps / 30) : 0);
const bestPrevious = Math.max(...demo.previous.map((set) => e1rm(set.weight, set.reps)));
const freshSets = () => demo.previous.map((set) => ({ ...set, done: false }));
const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

const RING = 2 * Math.PI * 15;

interface StepperProps {
  value: number;
  unit?: string;
  label: string;
  onChange: (next: number) => void;
  step: number;
}

function Stepper({ value, unit, label, onChange, step }: StepperProps) {
  const shouldReduceMotion = useReducedMotion();
  return (
    <div className="demo-stepper">
      <button type="button" className="demo-btn" onClick={() => onChange(Math.max(0, value - step))} aria-label={`Decrease ${label}`}>
        −
      </button>
      <div className="demo-value-display">
        <span className="sr-only" aria-live="polite">{`${label}: ${value}${unit ? ` ${unit}` : ''}`}</span>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            aria-hidden="true"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : 10 }}
            transition={{ duration: 0.15 }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
        {unit && <span className="demo-unit" aria-hidden="true">{unit}</span>}
      </div>
      <button type="button" className="demo-btn" onClick={() => onChange(value + step)} aria-label={`Increase ${label}`}>
        +
      </button>
    </div>
  );
}

export default function LoggingDemo() {
  const [sets, setSets] = useState(freshSets);
  const [rest, setRest] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const active = sets.findIndex((set) => !set.done);
  const done = sets.filter((set) => set.done);
  const volume = done.reduce((total, set) => total + set.weight * set.reps, 0);
  const topE1rm = Math.max(0, ...done.map((set) => e1rm(set.weight, set.reps)));
  const isPR = topE1rm > bestPrevious + 0.05;

  useEffect(() => {
    if (rest <= 0) return;
    const timer = window.setTimeout(() => setRest((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [rest]);

  const update = (index: number, field: 'weight' | 'reps', value: number) =>
    setSets((current) => current.map((set, i) => (i === index ? { ...set, [field]: value } : set)));

  const complete = () => {
    setSets((current) => current.map((set, i) => (i === active ? { ...set, done: true } : set)));
    setRest(active < sets.length - 1 ? demo.restSeconds : 0);
  };

  const reset = () => {
    setSets(freshSets());
    setRest(0);
  };

  return (
    <section id="demo" className="logging-demo-section container" aria-labelledby="demo-title">
      <div className="demo-header">
        <h2 id="demo-title" className="demo-title">{demo.title}</h2>
        <div className="demo-subtitle">
          <span className="info-icon" aria-hidden="true">i</span> {demo.subtitle}
        </div>
      </div>

      <div className={`demo-card ${isPR ? 'has-pr' : ''}`}>
        <div className="demo-card-head">
          <h3 className="demo-exercise-name">{demo.exercise}</h3>
          <span className="demo-best">
            {demo.bestLabel} <b>{bestPrevious.toFixed(1)} kg</b>
          </span>
        </div>
        <p className="demo-hint">{demo.hint}</p>

        <div className="demo-table-head" aria-hidden="true">
          {demo.columns.map((column) => <span key={column}>{column}</span>)}
        </div>
        <ol className="demo-sets" role="list">
          {sets.map((set, i) => {
            const isActive = i === active;
            return (
              <motion.li
                key={i}
                layout={!shouldReduceMotion}
                className={`demo-set-row ${isActive ? 'is-active' : ''} ${set.done ? 'is-completed' : ''}`}
                aria-current={isActive ? 'step' : undefined}
              >
                <span className="demo-set-number" aria-label={`Set ${i + 1}${set.done ? ', completed' : ''}`}>
                  {set.done ? (
                    <motion.span
                      initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 18 }}
                      aria-hidden="true"
                    >
                      ✓
                    </motion.span>
                  ) : (
                    i + 1
                  )}
                </span>
                <span className="demo-previous">
                  {demo.previous[i].weight} × {demo.previous[i].reps}
                </span>
                {isActive ? (
                  <>
                    <Stepper value={set.weight} unit="kg" label={`weight for set ${i + 1}`} step={demo.weightStep} onChange={(v) => update(i, 'weight', v)} />
                    <Stepper value={set.reps} label={`reps for set ${i + 1}`} step={1} onChange={(v) => update(i, 'reps', v)} />
                  </>
                ) : (
                  <>
                    <span className="demo-static demo-static--weight">{set.weight}</span>
                    <span className="demo-static">{set.reps}</span>
                  </>
                )}
              </motion.li>
            );
          })}
        </ol>

        <div className="demo-actions">
          <AnimatePresence initial={false}>
            {rest > 0 && (
              <motion.div
                className="demo-rest"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="demo-rest-inner">
                  <svg className="demo-rest-ring" viewBox="0 0 36 36" aria-hidden="true">
                    <circle cx="18" cy="18" r="15" />
                    <circle cx="18" cy="18" r="15" style={{ strokeDasharray: RING, strokeDashoffset: RING * (1 - rest / demo.restSeconds) }} />
                  </svg>
                  <span className="demo-rest-time">
                    {demo.restLabel} <b role="timer">{formatTime(rest)}</b>
                  </span>
                  <button type="button" className="demo-rest-skip" onClick={() => setRest(0)}>
                    {demo.skipLabel}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {active === -1 ? (
            <div className="demo-finished">
              <span>{demo.finishedLabel} ✓</span>
              <button type="button" className="demo-reset" onClick={reset}>{demo.resetLabel}</button>
            </div>
          ) : (
            <button type="button" className="demo-complete-btn" onClick={complete}>
              {demo.completeLabel} {active + 1}
            </button>
          )}
        </div>

        <div className="demo-summary">
          <div>
            <span>{demo.volumeLabel}</span>
            <b aria-hidden="true"><AnimatedNumber value={volume} /> kg</b>
          </div>
          <div>
            <span>{demo.e1rmLabel}</span>
            <b aria-hidden="true"><AnimatedNumber value={topE1rm} decimals={1} /> kg</b>
          </div>
          <div className="demo-pr-slot">
            <AnimatePresence>
              {isPR && (
                <motion.div
                  className="demo-pr"
                  initial={{ scale: shouldReduceMotion ? 1 : 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  {demo.prLabel}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="sr-only" aria-live="polite">
            {`${demo.volumeLabel} ${volume} kg. ${demo.e1rmLabel} ${topE1rm.toFixed(1)} kg.${isPR ? ` ${demo.prLabel}!` : ''}${active === -1 ? ` ${demo.finishedLabel}.` : ''}`}
          </p>
        </div>
      </div>
    </section>
  );
}
