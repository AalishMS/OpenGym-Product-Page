import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { config } from '../config';
import { releases } from '../releases';
import { AnimatedNumber } from './AnimatedNumber';
import './ProgressShowcase.css';

const showcase = config.progressShowcase;
const changelog = config.changelog;
const shortDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(date));

const WIDTH = 800;
const HEIGHT = 280;
const PAD_X = 20;
const PAD_TOP = 36;
const PAD_BOTTOM = 16;
const MIN = 95;
const MAX = 127.5;
const DRAW_SECONDS = 1.8;

const points = showcase.points;
const x = (i: number) => PAD_X + (i / (points.length - 1)) * (WIDTH - PAD_X * 2);
const y = (value: number) => PAD_TOP + ((MAX - value) / (MAX - MIN)) * (HEIGHT - PAD_TOP - PAD_BOTTOM);
const linePath = points.map((value, i) => `${i ? 'L' : 'M'}${x(i)} ${y(value)}`).join(' ');
const areaPath = `${linePath} L${x(points.length - 1)} ${HEIGHT} L${x(0)} ${HEIGHT} Z`;
// A personal record is any week that beats every week before it.
const prIndexes = points.flatMap((value, i) => (i > 0 && value > Math.max(...points.slice(0, i)) ? [i] : []));
const last = points.length - 1;
const latest = points[last];
const change = latest - points[0];
const gridValues = [100, 110, 120];

export function ProgressShowcase() {
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, amount: 0.4 });
  const shouldReduceMotion = useReducedMotion();
  const drawn = inView || !!shouldReduceMotion;

  return (
    <section id="progress" className="progress-section" aria-labelledby="progress-title">
      <div className="container">
        <motion.div
          className="progress-header"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">{showcase.eyebrow}</p>
          <h2 id="progress-title" className="progress-headline">
            <span>{showcase.headline[0]}</span>
            <span>{showcase.headline[1]}</span>
          </h2>
          <p className="progress-description">{showcase.description}</p>
        </motion.div>

        <div className="progress-card" ref={chartRef}>
          <div className="progress-card-top">
            <div className="progress-chip">
              <b>{showcase.exercise}</b> · {showcase.metric}
            </div>
            <dl className="progress-stats">
              <div>
                <dt>{showcase.latestLabel}</dt>
                <dd><AnimatedNumber value={latest} decimals={1} fromZeroInView duration={DRAW_SECONDS} /> {showcase.unit}</dd>
              </div>
              <div>
                <dt>{showcase.changeLabel}</dt>
                <dd className="progress-positive">+<AnimatedNumber value={change} decimals={1} fromZeroInView duration={DRAW_SECONDS} /> {showcase.unit}</dd>
              </div>
              <div>
                <dt>{showcase.prLabel}</dt>
                <dd><AnimatedNumber value={prIndexes.length} fromZeroInView duration={DRAW_SECONDS} /></dd>
              </div>
            </dl>
          </div>

          <div className="progress-chart">
            <svg
              viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
              role="img"
              aria-label={`${showcase.exercise} ${showcase.metric.toLowerCase()} rising from ${points[0]} to ${latest} ${showcase.unit} over ${points.length} weeks, with ${prIndexes.length} personal records.`}
            >
              <defs>
                <linearGradient id="progress-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0.14 }} />
                  <stop offset="100%" style={{ stopColor: 'var(--color-accent)', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              {gridValues.map((value) => (
                <path key={value} className="progress-grid" d={`M0 ${y(value)}H${WIDTH}`} />
              ))}
              <motion.path
                d={areaPath}
                fill="url(#progress-area)"
                initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
                animate={{ opacity: drawn ? 1 : 0 }}
                transition={{ duration: 1, delay: DRAW_SECONDS * 0.5 }}
              />
              <motion.path
                d={linePath}
                className="progress-line"
                initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
                animate={{ pathLength: drawn ? 1 : 0 }}
                transition={{ duration: shouldReduceMotion ? 0 : DRAW_SECONDS, ease: [0.45, 0, 0.55, 1] }}
              />
              {prIndexes.map((i) => (
                <motion.circle
                  key={i}
                  className={i === last ? 'progress-dot progress-dot--last' : 'progress-dot'}
                  cx={x(i)}
                  cy={y(points[i])}
                  r={i === last ? 8 : 5.5}
                  initial={{ scale: shouldReduceMotion ? 1 : 0 }}
                  animate={{ scale: drawn ? 1 : 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 16, delay: shouldReduceMotion ? 0 : (i / last) * DRAW_SECONDS }}
                />
              ))}
            </svg>
            <div
              className="progress-callout"
              style={{ left: `${(x(last) / WIDTH) * 100}%`, top: `${(y(latest) / HEIGHT) * 100}%` }}
              aria-hidden="true"
            >
              <motion.div
                initial={{ opacity: shouldReduceMotion ? 1 : 0, y: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: drawn ? 1 : 0, y: 0 }}
                transition={{ duration: 0.5, delay: shouldReduceMotion ? 0 : DRAW_SECONDS }}
              >
                <span>PR</span> {latest} {showcase.unit}
              </motion.div>
            </div>
            <div className="progress-axis" aria-hidden="true">
              {points.map((_, i) => (
                <span key={i} style={{ left: `${(x(i) / WIDTH) * 100}%` }}>W{i + 1}</span>
              ))}
            </div>
          </div>
          <p className="progress-caption">{showcase.caption}</p>
        </div>
      </div>

      <div className="changelog-band">
        <div className="container changelog-layout">
          <div className="changelog-intro">
            <p className="eyebrow">{changelog.eyebrow}</p>
            <h2 className="changelog-title">{changelog.title}</h2>
            <p className="changelog-description">{changelog.description}</p>
            <a className="changelog-all" href="#/releases">
              {changelog.allLabel} <span aria-hidden="true">→</span>
            </a>
          </div>
          <ol className="changelog-list" role="list">
            {releases.slice(0, changelog.count).map((release) => (
              <li key={release.version}>
                <a href="#/releases">
                  <time dateTime={release.date}>{shortDate(release.date)}</time>
                  <span className="changelog-version">{release.version.split('+')[0]}</span>
                  <span className="changelog-release-title">{release.title}</span>
                  <span className="changelog-count">{release.changes.length} changes</span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
