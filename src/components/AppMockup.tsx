import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { mockupData } from '../config';
import { previewPalette } from './previewTone';
import { MockIcon } from './MockIcon';
import './AppMockup.css';

export type MockScreen = 'plan' | 'log' | 'keypad' | 'progress';

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
function SetTable({
  weight,
  reps,
  single = false,
}: {
  weight: number;
  reps: number;
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
        {!single && <span />}
      </div>
      {Array.from({ length: single ? 1 : 3 }, (_, i) => (
        <div className="replica-set-line" key={i}>
          <span>{i + 1}</span>
          <span className="replica-prev">—</span>
          <b className={single ? 'selected' : ''}>{weight}</b>
          <b>{reps}</b>
          {!single && <MockIcon name="more" />}
        </div>
      ))}
    </div>
  );
}
function Workout({ keypad }: { keypad: boolean }) {
  return (
    <>
      <header className="replica-workout-header">
        <MockIcon name="back" />
        <i />
        <b>FULL BODY</b>
        <strong>00:00</strong>
        <MockIcon name="play" />
        <MockIcon name="stop" />
        <MockIcon name="menu" />
      </header>
      <div className="replica-plan-tabs">
        {['FULL BODY', 'PULL DAY', 'FULL BODY', 'PUSH DAY'].map((name, i) => (
          <div key={i} className={i === 0 ? 'selected' : ''}>
            <small>0{i + 1}</small>
            {name}
          </div>
        ))}
      </div>
      <div className="replica-workout-list">
        {mockupData.workout.map((exercise, i) => (
          <div className="replica-exercise-card" key={exercise.name}>
            <div className="replica-exercise-heading">
              <span>{i + 1}</span>
              <b>{exercise.name.toUpperCase()}</b>
              <MockIcon name="note" />
              <MockIcon name="trash" />
              <MockIcon name="plus" />
            </div>
            <SetTable weight={exercise.weight} reps={exercise.reps} />
          </div>
        ))}
      </div>
      <div className="replica-week-tabs">
        <span>WEEK 1</span>
        <span>＋ WEEK 2</span>
      </div>
      {keypad && (
        <>
          <div className="replica-scrim" />
          <div className="replica-keypad">
            <h3>Squat</h3>
            <SetTable weight={95} reps={6} single />
            <p>Set 1 of 3 · Weight</p>
            <div className="replica-key-step">
              <span>−2.5 kg</span>
              <span>+2.5 kg</span>
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
                <span key={v}>{v}</span>
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
  const volume = [27.9, 30.1, 14, 28.8, 22.2, 0];

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
            <svg viewBox="0 18 348 202" aria-hidden="true">
              <defs>
                <clipPath id="replica-axis-clip">
                  <rect x="0" y="18" width="28" height="202" />
                </clipPath>
                <clipPath id="replica-chart-clip">
                  <rect x="40" y="20" width="308" height="210" />
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
                  <path d={`M40 ${33 + i * 45}H348`} />
                </g>
              ))}
              <g clipPath="url(#replica-chart-clip)">
                {volume.map((v, i) => (
                  <g key={i}>
                    <rect
                      className={i === 4 ? 'replica-current-bar' : ''}
                      x={28 + i * 56}
                      y={213 - v * 5.2}
                      width="24"
                      height={v * 5.2}
                      rx="2"
                    />
                    <text x={40 + i * 56} y={203 - v * 5.2} textAnchor="middle">
                      {v ? `${v.toFixed(1)}k` : '0'}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
            <div className="replica-chart-weeks">
              {['W32', 'W33', 'W34', 'W35', 'W36', 'W37'].map((w, i) => (
                <span key={w} className={i === 4 ? 'selected' : ''}>{w}</span>
              ))}
            </div>
            <div className="replica-scrollbar" />
          </div>
        </div>
        <h3 className="replica-progress-title">Exercise progress</h3>
        <div className="replica-progress-card">
          <Field label="Exercise" value="Calf Raise" />
          <div>
            <Field label="Metric" value="Estimated 1RM" />
            <Field label="Period" value="4 weeks" />
          </div>
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
