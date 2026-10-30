import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent, MouseEvent, PointerEvent } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { config } from '../config';
import { historyEnd, historyMilestones, historyReleaseDates, historyStart } from '../history';
import { AnimatedNumber } from './AnimatedNumber';
import './History.css';

const copy = config.history;
const DAY = 86_400_000;
const start = Date.parse(historyStart);
const span = Date.parse(historyEnd) - start;
const position = (date: string) => ((Date.parse(date) - start) / span) * 100;
const dayNumber = (date: string) => Math.round((Date.parse(date) - start) / DAY);
const formatDate = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' }).format(new Date(date));

const last = historyMilestones.length - 1;
const months = Array.from({ length: 7 }, (_, i) => `2026-${String(i + 4).padStart(2, '0')}-01`);
const screenKeys = ['home', 'workout'] as const;

export function History() {
  const [active, setActive] = useState(last);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const shouldReduceMotion = useReducedMotion();
  const milestone = historyMilestones[active];

  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const [half, setHalf] = useState<'left' | 'right' | null>(null);

  const select = (index: number) => setActive(Math.min(last, Math.max(0, index)));

  // Left/Right step through versions while the section is on screen, no focus needed.
  useEffect(() => {
    if (!inView) return;
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const target = event.target as HTMLElement;
      if (target.closest('input, textarea, select, [contenteditable="true"], [role="slider"]')) return;
      event.preventDefault();
      setActive((current) => Math.min(last, Math.max(0, current + (event.key === 'ArrowLeft' ? -1 : 1))));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [inView]);

  // Clicking the left or right half of the section steps back or forward.
  const halfAt = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a, button, [role="slider"]')) return null;
    const rect = event.currentTarget.getBoundingClientRect();
    return event.clientX < rect.left + rect.width / 2 ? 'left' : 'right';
  };

  const onSectionClick = (event: MouseEvent<HTMLElement>) => {
    const side = halfAt(event);
    if (!side || window.getSelection()?.toString()) return;
    select(active + (side === 'left' ? -1 : 1));
  };

  const onSectionMove = (event: MouseEvent<HTMLElement>) => {
    const side = halfAt(event);
    const canMove = side === 'left' ? active > 0 : side === 'right' ? active < last : false;
    const next = canMove ? side : null;
    if (next !== half) setHalf(next);
  };

  // Snap the pointer to the nearest milestone so dragging scrubs through versions.
  const selectAt = (clientX: number) => {
    const rect = trackRef.current?.getBoundingClientRect();
    if (!rect) return;
    const percent = ((clientX - rect.left) / rect.width) * 100;
    let nearest = 0;
    historyMilestones.forEach((item, i) => {
      if (Math.abs(position(item.date) - percent) < Math.abs(position(historyMilestones[nearest].date) - percent))
        nearest = i;
    });
    setActive(nearest);
  };

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.focus();
    selectAt(event.clientX);
  };

  const onTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const moves: Record<string, number> = {
      ArrowLeft: active - 1,
      ArrowDown: active - 1,
      ArrowRight: active + 1,
      ArrowUp: active + 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key]);
  };

  return (
    <section
      ref={sectionRef}
      id="history"
      className="history-section"
      aria-labelledby="history-title"
      data-half={half ?? undefined}
      onClick={onSectionClick}
      onMouseMove={onSectionMove}
      onMouseLeave={() => setHalf(null)}
    >
      <div className="container">
        <motion.div
          className="history-header"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="eyebrow">{copy.eyebrow}</p>
          <h2 id="history-title" className="history-headline">
            <span>{copy.headline[0]}</span>
            <span>{copy.headline[1]}</span>
          </h2>
          <p className="history-description">{copy.description}</p>
        </motion.div>

        <div className="history-stage">
          {screenKeys.map((key) => (
            <figure key={key} className={`history-phone history-phone--${key}`}>
              <div className="history-screen">
                {historyMilestones.map((item, i) =>
                  item.screens ? (
                    <img
                      key={item.commit}
                      src={item.screens[key]}
                      alt={i === active ? `OpenGym ${key} screen, ${formatDate(item.date, { month: 'long', year: 'numeric' })} (${item.version})` : ''}
                      aria-hidden={i !== active}
                      className={i === active ? 'is-active' : ''}
                      data-side={i < active ? 'before' : i > active ? 'after' : undefined}
                      width={540}
                      height={1200}
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null,
                )}
                <div
                  className={`history-empty ${milestone.screens ? '' : 'is-active'}`}
                  aria-hidden={!!milestone.screens}
                >
                  <span className="history-empty-prompt">{key === 'home' ? '$ git init' : '$ flutter run'}</span>
                  {key === 'home' && <p>{copy.noScreens}</p>}
                </div>
              </div>
              <figcaption>{key === 'home' ? copy.homeLabel : copy.workoutLabel}</figcaption>
            </figure>
          ))}
        </div>

        <div className="history-details" aria-live="polite">
          <div className="history-when">
            <p className="history-date">{formatDate(milestone.date, { month: 'short', day: 'numeric' })}</p>
            <p className="history-meta">
              {milestone.version} · {copy.dayLabel} {dayNumber(milestone.date)}
            </p>
          </div>
          <div className="history-story">
            <h3>{milestone.title}</h3>
            <p>{milestone.summary}</p>
          </div>
          <dl className="history-stats">
            <div>
              <dt>{copy.stats.commits}</dt>
              <dd><AnimatedNumber value={milestone.commits} /></dd>
            </div>
            <div>
              <dt>{copy.stats.contributors}</dt>
              <dd><AnimatedNumber value={milestone.contributors} /></dd>
            </div>
            <div>
              <dt>{copy.stats.linesOfCode}</dt>
              <dd><AnimatedNumber value={milestone.linesOfCode / 1000} decimals={1} />k</dd>
            </div>
          </dl>
        </div>

        <div className="history-timeline">
          <button
            type="button"
            className="history-step"
            onClick={() => select(active - 1)}
            disabled={active === 0}
            aria-label={copy.previous}
          >
            ←
          </button>
          <div
            ref={trackRef}
            className="history-track"
            role="slider"
            tabIndex={0}
            aria-label={copy.trackLabel}
            aria-valuemin={0}
            aria-valuemax={last}
            aria-valuenow={active}
            aria-valuetext={`${formatDate(milestone.date, { month: 'long', day: 'numeric' })}, ${milestone.version}: ${milestone.title}`}
            onKeyDown={onTrackKeyDown}
            onPointerDown={onPointerDown}
            onPointerMove={(event) => dragging.current && selectAt(event.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
          >
            <div className="history-rail" aria-hidden="true">
              <div className="history-rail-fill" style={{ width: `${position(milestone.date)}%` }} />
              {historyReleaseDates.map((date) => (
                <span key={date} className="history-tick" style={{ left: `${position(date)}%` }} />
              ))}
              {historyMilestones.map((item, i) => (
                <span
                  key={item.commit}
                  className={`history-dot ${i === active ? 'is-active' : ''} ${i < active ? 'is-past' : ''}`}
                  style={{ left: `${position(item.date)}%` }}
                />
              ))}
            </div>
            <div className="history-months" aria-hidden="true">
              {months.map((date) => (
                <span key={date} style={{ left: `${position(date)}%` }}>
                  {formatDate(date, { month: 'short' })}
                </span>
              ))}
            </div>
          </div>
          <button
            type="button"
            className="history-step"
            onClick={() => select(active + 1)}
            disabled={active === last}
            aria-label={copy.next}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
