import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { mockupData } from '../config';
import { previewPalette } from './previewTone';
import { MockIcon } from './MockIcon';
import './AppMockup.css';

export type MockScreen = 'plan' | 'log' | 'keypad' | 'progress';

function getRpeClass(rpe: number | null | undefined): string {
  if (!rpe || rpe <= 2) return 'replica-rpe--low';
  if (rpe <= 4) return 'replica-rpe--3-4';
  if (rpe <= 6) return 'replica-rpe--5-6';
  if (rpe <= 8) return 'replica-rpe--7-8';
  if (rpe === 9) return 'replica-rpe--9';
  return 'replica-rpe--10';
}

function BottomNav({ stats = false }: { stats?: boolean }) {
  return (
    <div className="replica-nav">
      {(['clipboard', 'history', 'trend', 'settings'] as const).map(
        (icon, i) => (
          <div
            key={icon}
            className={(stats ? i === 2 : i === 0) ? 'selected' : ''}
          >
            <MockIcon name={icon} />
            <span>{['Plans', 'History', 'Stats', 'Settings'][i]}</span>
          </div>
        ),
      )}
    </div>
  );
}

function Plans({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <>
      <header className="replica-wordmark">&gt; OpenGym</header>
      <div className="replica-plan-grid">
        {mockupData.planOrder[theme].map((key, i) => {
          const plan = mockupData.plans[key];
          return (
            <div className="replica-plan-card" key={i}>
              <div className="replica-plan-title">
                <i
                  style={{ background: plan.color[theme === 'dark' ? 1 : 0] }}
                />
                <span>{String(i + 1).padStart(2, '0')}</span>
                <b>{plan.name}</b>
                <MockIcon name="more" />
              </div>
              <p className="replica-plan-meta">
                {plan.count} exercises&nbsp; · &nbsp;{plan.recent}
              </p>
              <div className="replica-plan-exercises">
                {plan.exercises.map((name) => (
                  <div key={name}>· {name}</div>
                ))}
              </div>
              <small className="replica-plan-more">
                +{plan.count - 3} more
              </small>
              <div className="replica-plan-footer">
                {theme === 'dark'
                  ? plan.footer.replace('15 SESSIONS', '5 SESSIONS')
                  : plan.footer}
              </div>
            </div>
          );
        })}
      </div>
      <div className="replica-fab">
        <MockIcon name="plus" />
      </div>
      <BottomNav />
    </>
  );
}

interface SetEntry {
  prev?: string;
  weight: number;
  reps: number;
  rpe: number;
}

function SetTable({
  sets,
  single = false,
}: {
  sets: SetEntry[];
  single?: boolean;
}) {
  return (
    <div
      className={`replica-set-table ${single ? 'replica-set-table--single' : ''}`}
    >
      <div className="replica-set-head">
        <span>Set</span>
        <span>Prev</span>
        <span>Kg</span>
        <span>Reps</span>
        <span>RPE</span>
        {!single && <span />}
      </div>
      {(single ? sets.slice(0, 1) : sets).map((s, i) => (
        <div className="replica-set-line" key={i}>
          <span>{i + 1}</span>
          <span className="replica-prev">{s.prev || '—'}</span>
          <b className={single ? 'selected' : ''}>{s.weight}</b>
          <b>{s.reps}</b>
          <span className={`replica-rpe ${getRpeClass(s.rpe)}`}>@{s.rpe}</span>
          {!single && <MockIcon name="close" />}
        </div>
      ))}
    </div>
  );
}

const WORKOUT_EXERCISES = [
  {
    name: 'DEADLIFT',
    sets: [
      { prev: '120 × 5', weight: 120, reps: 5, rpe: 8 },
      { prev: '120 × 5', weight: 120, reps: 5, rpe: 9 },
      { prev: '120 × 5', weight: 120, reps: 5, rpe: 10 },
    ],
  },
  {
    name: 'BARBELL ROW',
    sets: [
      { prev: '70 × 8', weight: 70, reps: 8, rpe: 7 },
      { prev: '70 × 8', weight: 70, reps: 8, rpe: 8 },
      { prev: '70 × 6', weight: 70, reps: 8, rpe: 9 },
    ],
  },
  {
    name: 'LAT PULLDOWN',
    sets: [
      { prev: '60 × 10', weight: 60, reps: 10, rpe: 6 },
      { prev: '60 × 10', weight: 60, reps: 10, rpe: 7 },
      { prev: '60 × 10', weight: 60, reps: 10, rpe: 8 },
    ],
  },
];

function Workout({ keypad }: { keypad: boolean }) {
  return (
    <>
      <header className="replica-workout-header">
        <MockIcon name="back" />
        <i />
        <b>PULL DAY</b>
        <strong>00:00</strong>
        <MockIcon name="play" />
        <MockIcon name="stop" />
        <MockIcon name="menu" />
      </header>
      <div className="replica-plan-tabs">
        {['PULL DAY', 'PUSH DAY', 'LEG DAY', 'UPPER BODY'].map((name, i) => (
          <div key={i} className={i === 0 ? 'selected' : ''}>
            <small>0{i + 1}</small>
            {name}
          </div>
        ))}
      </div>
      <div className="replica-workout-list">
        {WORKOUT_EXERCISES.map((exercise, i) => (
          <div className="replica-exercise-card" key={exercise.name}>
            <div className="replica-exercise-heading">
              <span>{i + 1}</span>
              <b>{exercise.name}</b>
              <MockIcon name="note" />
              <MockIcon name="trash" />
              <MockIcon name="plus" />
            </div>
            <SetTable sets={exercise.sets} />
          </div>
        ))}
      </div>
      <div className="replica-week-tabs">
        <span className="selected">WEEK 1</span>
        <span className="replica-add-week">+ WEEK 2</span>
      </div>
      {keypad && (
        <>
          <div className="replica-scrim" />
          <div className="replica-keypad">
            <SetTable
              sets={[{ prev: '120 × 5', weight: 120, reps: 5, rpe: 8 }]}
              single
            />
            <div className="replica-key-step">
              <span className="replica-key-step-teal">+2.5</span>
              <span className="replica-key-step-teal">−2.5</span>
              <span>+1</span>
              <span>−1</span>
            </div>
            <div className="replica-key-grid">
              {[
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '.',
                '0',
                'Delete',
              ].map((v) => (
                <span key={v}>{v === 'Delete' ? <MockIcon name="close" /> : v}</span>
              ))}
            </div>
            <div className="replica-key-actions">
              <span>Next</span>
              <span>Save</span>
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="replica-select">
      <small>{label}</small>
      <span>{value}</span>
      <i />
    </div>
  );
}

function Statistics() {
  const volumeData = [
    { week: 'W32', volume: 7.9 },
    { week: 'W33', volume: 30.1 },
    { week: 'W34', volume: 14.0 },
    { week: 'W35', volume: 28.8 },
    { week: 'W36', volume: 22.2, selected: true },
    { week: 'W37', volume: 0 },
  ];

  return (
    <>
      <header className="replica-stats-header">Statistics</header>
      <div className="replica-stats-body">
        <h3>Weekly training</h3>
        <div className="replica-volume-card">
          <h4>Volume load</h4>
          <p>Weight × reps · All history</p>
          <Field label="Exercise" value="All exercises" />
          <div className="replica-week-summary">
            <p>W36 · 2026</p>
            <strong>22,221 kg</strong>
            <p>W36 · 2026 · 31 Aug 2026 – 6 Sep 2026</p>
          </div>
          <div className="replica-volume-chart">
            <div className="replica-chart-heading">
              <span className="replica-axis-title">Volume (kg)</span>
              <span className="replica-latest">→&nbsp; Latest</span>
            </div>
            <svg viewBox="0 18 348 226" aria-hidden="true">
              <defs>
                <clipPath id="replica-axis-clip">
                  <rect x="0" y="18" width="38" height="226" />
                </clipPath>
                <clipPath id="replica-chart-clip">
                  <rect x="38" y="20" width="310" height="226" />
                </clipPath>
              </defs>
              {[40, 30, 20, 10, 0].map((v, i) => (
                <g key={v}>
                  <text
                    x="0"
                    y={36 + i * 45}
                    clipPath="url(#replica-axis-clip)"
                  >
                    {v === 0 ? '0' : `${v}.0k`}
                  </text>
                  <path d={`M38 ${33 + i * 45}H348`} />
                </g>
              ))}
              <g clipPath="url(#replica-chart-clip)">
                {volumeData.map((d, i) => {
                  const barH = (d.volume / 40) * 180;
                  const centerX = 64 + i * 50;
                  return (
                    <g key={d.week}>
                      {d.volume > 0 && (
                        <rect
                          className={d.selected ? 'replica-current-bar' : ''}
                          x={centerX - 11}
                          y={213 - barH}
                          width="22"
                          height={barH}
                          rx="2"
                        />
                      )}
                      <text
                        x={centerX}
                        y={d.volume > 0 ? 213 - barH - 6 : 205}
                        textAnchor="middle"
                      >
                        {d.volume > 0 ? `${d.volume.toFixed(1)}k` : '0'}
                      </text>
                      <text
                        x={centerX}
                        y={232}
                        textAnchor="middle"
                        className={d.selected ? 'selected' : ''}
                      >
                        {d.week}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>
            <div className="replica-scrollbar" />
          </div>
        </div>
        <h3 className="replica-progress-title">Exercise progress</h3>
        <div className="replica-progress-card">
          <Field label="Exercise" value="Calf Raise" />
        </div>
      </div>
      <BottomNav stats />
    </>
  );
}

/** 412 × 915 logical pixels, matching the 824 × 1830 source captures.
 * Scale the complete HTML artboard, never reflow the app into a different UI.
 */
export function AppMockup({
  screen = 'plan',
  theme = 'light',
  accent = '#00CED1',
}: {
  screen?: MockScreen;
  theme?: 'light' | 'dark';
  accent?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const element = host.current!;
    const update = () => setScale(element.clientWidth / 412);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const palette = previewPalette(accent, theme === 'dark');
  const style = {
    ...Object.fromEntries(
      Object.entries(palette).map(([key, value]) => [`--replica-${key}`, value]),
    ),
    '--mock-accent': accent,
  } as CSSProperties;
  return (
    <div
      ref={host}
      className={`mock-app mock-app--${theme}`}
      style={style}
      role="img"
      aria-label={`${theme} ${screen} OpenGym screen recreated from the app screenshot`}
    >
      <div
        className={`replica-canvas replica-canvas--${screen}`}
        style={{ transform: `scale(${scale})` }}
      >
        {screen === 'plan' ? (
          <Plans theme={theme} />
        ) : screen === 'progress' ? (
          <Statistics />
        ) : (
          <Workout keypad={screen === 'keypad'} />
        )}
      </div>
    </div>
  );
}
