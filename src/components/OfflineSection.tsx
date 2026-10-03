import { useState } from 'react';
import { motion } from 'framer-motion';
import { config } from '../config';
import './OfflineSection.css';

export function OfflineSection() {
  const [isOffline, setIsOffline] = useState(true);
  const { offline, sampleWorkout } = config;
  const exercise = sampleWorkout.exercises[0];
  const nextExercise = sampleWorkout.exercises[1];

  return (
    <section id="offline" className="offline-section" aria-labelledby="offline-heading">
      <div className="container">
        <motion.div
          className="offline-content"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.45 }}
        >
          <div className="offline-text">
            <p className="offline-eyebrow">{offline.eyebrow}</p>
            <h2 id="offline-heading" className="offline-headline">
              <span>{offline.headline[0]}</span>
              <span>{offline.headline[1]}</span>
            </h2>
            <p className="offline-body">{offline.description}</p>
            <p className="offline-sign-in">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 11V7a3 3 0 0 1 6 0v4" />
                <rect x="5" y="11" width="14" height="10" rx="2" />
                <path d="M12 15v2" />
              </svg>
              {offline.signInNote}
            </p>
            <dl className="offline-details">
              {offline.details.map((detail) => (
                <div key={detail.title}>
                  <dt>{detail.title}</dt>
                  <dd>{detail.description}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="offline-visual">
            <div className="offline-demo-caption">{offline.demo.caption}</div>
            <div className="offline-log">
              <div className="offline-connection">
                <span className="offline-network" data-connected={!isOffline} aria-live="polite">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                    <path d="M3 8a15 15 0 0 1 18 0M6 12a10 10 0 0 1 12 0M9 16a5 5 0 0 1 6 0" />
                    <circle cx="12" cy="20" r=".6" fill="currentColor" />
                    {isOffline && <path d="m3 3 18 18" />}
                  </svg>
                  {isOffline ? offline.demo.offlineStatus : offline.demo.onlineStatus}
                </span>
                <button
                  type="button"
                  className="offline-mode-toggle"
                  role="switch"
                  aria-checked={isOffline}
                  onClick={() => setIsOffline((current) => !current)}
                >
                  <span>{offline.demo.switchLabel}</span>
                  <span className="offline-switch-track" aria-hidden="true"><span /></span>
                </button>
              </div>

              <div className="offline-log-page">
                <div className="offline-log-heading">
                  <h3>{sampleWorkout.planName}</h3>
                  <span>{offline.demo.date}</span>
                </div>
                <div className="offline-exercise-heading">
                  <span>{offline.demo.exerciseLabel}</span>
                  <h4>{exercise.name}</h4>
                </div>
                <table className="offline-set-table">
                  <thead>
                    <tr>{offline.demo.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr>
                  </thead>
                  <tbody>
                    {exercise.sets.map((set) => (
                      <tr key={set.set}>
                        <th scope="row"><span className="offline-set-check" aria-hidden="true">✓</span>{set.set}</th>
                        <td>{set.weight}</td>
                        <td>{set.reps}</td>
                        <td>{set.rpe}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="offline-next-exercise">
                  <span>{nextExercise.name}</span>
                  <span>{nextExercise.sets.length} {offline.demo.setsLabel}</span>
                </div>
                <div className="offline-save-status">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="6" y="2" width="12" height="20" rx="2" />
                    <path d="m9 11 2 2 4-4M11 18h2" />
                  </svg>
                  <div>
                    <strong>{offline.demo.savedLabel}</strong>
                    <p>{offline.demo.savedNote}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
