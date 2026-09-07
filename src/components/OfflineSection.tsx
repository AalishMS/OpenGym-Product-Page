import { motion } from 'framer-motion';
import './OfflineSection.css';
import { config } from '../config';

export function OfflineSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 20, rotate: 0 },
    visible: { 
      opacity: 1, 
      x: 0, 
      rotate: 2,
      transition: { duration: 0.8, ease: "easeOut" as const }
    }
  };

  return (
    <section id="offline" className="offline-section">
      <div className="container">
        <div className="offline-content">
          
          <motion.div 
            className="offline-text"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.h2 className="offline-headline" variants={itemVariants}>
              Your training doesn’t need a signal.
            </motion.h2>
            <motion.p className="offline-body" variants={itemVariants}>
              Your workout data lives on your device first. Create an account to sync across devices, or export your training history anytime. No connection required to train.
            </motion.p>

            <motion.div className="feature-pills" variants={containerVariants}>
              <motion.div className="feature-pill" variants={itemVariants}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                  <line x1="12" y1="18" x2="12.01" y2="18"></line>
                </svg>
                <span>Offline storage</span>
              </motion.div>
              <motion.div className="feature-pill" variants={itemVariants}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.59-9.27l-5.32 5.32"></path>
                </svg>
                <span>Account sync</span>
              </motion.div>
              <motion.div className="feature-pill" variants={itemVariants}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Data export</span>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div 
            className="offline-visual"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
          >
            <div className="workout-card">
              <div className="workout-card-header">
                <h3>{config.sampleWorkout.planName} &middot; Sep 3</h3>
                <div className="offline-indicator">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                    <polyline points="9 16 12 19 15 16"></polyline>
                    <line x1="12" y1="11" x2="12" y2="19"></line>
                  </svg>
                  <span>Saved locally</span>
                </div>
              </div>
              
              <div className="workout-card-body">
                {config.sampleWorkout.exercises.slice(0, 2).map((exercise, index) => (
                  <div key={index} className="exercise-row">
                    <span className="exercise-name">{exercise.name}</span>
                    <span className="exercise-sets">&mdash; {exercise.sets.length} sets</span>
                  </div>
                ))}
              </div>

              <div className="workout-card-footer">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path>
                </svg>
                <span>Syncs when connected</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
