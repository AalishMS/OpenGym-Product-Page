import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { config, mockupData } from '../config';
import { previewPalette } from './previewTone';
import { MockIcon } from './MockIcon';
import './AppMockup.css';

export type MockScreen = 'plan' | 'log' | 'keypad' | 'progress';
const copy = mockupData.labels;

function BottomNav({ stats = false }: { stats?: boolean }) {
  return (
    <div className="replica-nav">
      {(['home', 'history', 'trend', 'settings'] as const).map((icon, i) => (
        <div key={icon} className={(stats ? i === 2 : i === 0) ? 'selected' : ''}>
          <MockIcon name={icon} />
          <span>{[copy.home, copy.history, copy.stats, copy.settings][i]}</span>
        </div>
      ))}
    </div>
  );
}

function Home({ theme }: { theme: 'light' | 'dark' }) {
  return (
    <>
      <header className="replica-home-header">
        <b>{config.brand.wordmark}</b>
        <span>{copy.split}<MockIcon name="chevron" /></span>
      </header>
      <div className="replica-home-body">
        <div className="replica-next-card">
          <p className="replica-next-label">{copy.next}</p>
          <div className="replica-split-rail">
            {mockupData.plans.map((plan, i) => (
              <i key={plan.name} className={i === 4 ? 'current' : i === 2 || i === 3 ? 'trained' : ''} />
            ))}
          </div>
          <h2>{mockupData.nextWorkout.name}</h2>
          <div className="replica-muscle-chips">
            {mockupData.nextWorkout.groups.map(group => <span key={group}>{group}</span>)}
          </div>
          <p className="replica-next-summary">{mockupData.nextWorkout.summary}</p>
          <div className="replica-start-workout"><MockIcon name="play" />{copy.startWorkout}</div>
        </div>
        <div className="replica-activity">
          <div className="replica-activity-heading"><span>{copy.thisWeek}</span><span>{copy.weeklySummary}</span></div>
          <div className="replica-activity-days">
            {mockupData.activity.map((day, i) => (
              <div key={i}>
                <div className="replica-day-track"><i className={`${day.trained ? 'trained' : ''} ${'today' in day && day.today ? 'today' : ''}`} /></div>
                <span>{day.day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="replica-plans-heading"><b>{copy.yourPlans}<small>{mockupData.plans.length}</small></b><span>{copy.manage}</span></div>
        <div className="replica-plan-list">
          {mockupData.plans.map(plan => (
            <div className="replica-plan-row" key={plan.name}>
              <span className="replica-plan-marker" style={{ '--plan-color': plan.color[theme === 'dark' ? 1 : 0] } as CSSProperties}>{plan.initials}</span>
              <div><b>{plan.name}</b><p>{plan.summary}</p></div>
              <MockIcon name="more" />
            </div>
          ))}
        </div>
      </div>
      <BottomNav />
    </>
  );
}

interface SetEntry { set: number; weight: number; reps: number; rpe: number }
function SetTable({ sets }: { sets: readonly SetEntry[] }) {
  return (
    <div className="replica-set-table">
      <div className="replica-set-head">
        {[copy.set, copy.previous, copy.kg, copy.reps, copy.rpe].map(label => <span key={label}>{label}</span>)}
      </div>
      {sets.map(set => (
        <div className="replica-set-line" key={set.set}>
          <span>{set.set}</span><span className="replica-prev">{set.weight} × {set.reps}</span>
          <b>{set.weight}</b><b>{set.reps}</b><span className="replica-rpe">{set.rpe}</span>
        </div>
      ))}
    </div>
  );
}

function Keypad() {
  const entry = mockupData.keypad;
  return (
    <>
      <div className="replica-scrim" />
      <div className="replica-keypad">
        <div className="replica-keypad-context"><b>{copy.set} {entry.set}</b><span>{copy.previous}: {entry.previous}</span></div>
        <div className="replica-key-fields">
          <div><span>{copy.kg}</span><b className="selected">{entry.weight}</b></div>
          <div><span>{copy.reps}</span><b>{entry.reps}</b></div>
          <div><span>{copy.rpe}</span><b className="replica-key-rpe">@ {entry.rpe}</b></div>
        </div>
        <div className="replica-key-step">
          {['+2.5', '−2.5', '+1', '−1'].map((value, i) => <span key={value} className={i < 2 ? 'accent' : ''}>{value}</span>)}
        </div>
        <div className="replica-key-grid">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'Delete'].map(value => (
            <span key={value}>{value === 'Delete' ? <MockIcon name="delete" /> : value}</span>
          ))}
        </div>
        <div className="replica-key-actions"><span>{copy.nextField}</span><span>{copy.save}</span></div>
      </div>
    </>
  );
}

function Workout({ keypad }: { keypad: boolean }) {
  return (
    <>
      <header className="replica-workout-header">
        <MockIcon name="back" />
        <div className="replica-workout-title"><b>{mockupData.workout.planName}</b><p>{copy.week} {mockupData.workoutWeek}<span>{mockupData.workoutTime}</span></p></div>
        <span className="replica-workout-start">{copy.start}</span><MockIcon name="check" /><MockIcon name="menu" />
      </header>
      <div className="replica-plan-tabs">
        {mockupData.plans.map((plan, i) => <span key={plan.name} className={i === 0 ? 'selected' : ''}>{plan.name}</span>)}
      </div>
      <div className="replica-workout-list">
        {mockupData.workout.exercises.map(exercise => (
          <div className="replica-exercise" key={exercise.name}>
            <div className="replica-exercise-heading"><b>{exercise.name}</b><MockIcon name="more" /></div>
            <SetTable sets={exercise.sets} />
            <div className="replica-add-set"><MockIcon name="plus" />{copy.addSet}</div>
          </div>
        ))}
      </div>
      <div className="replica-week-tabs">
        {[2, 3, 4, 5, 6].map(week => <span key={week} className={week === mockupData.workoutWeek ? 'selected' : ''}>{copy.week} {week}</span>)}
        <span className="replica-add-week">+ {copy.week} 7</span>
      </div>
      {keypad && <Keypad />}
    </>
  );
}

function Field({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`replica-select ${accent ? 'replica-select--accent' : ''}`}>
      <small>{label}</small>{accent && <MockIcon name="layers" />}<span>{value}</span><i />
    </div>
  );
}

function Statistics() {
  return (
    <>
      <header className="replica-stats-header">{copy.statistics}</header>
      <div className="replica-stats-body">
        <h3>{copy.weeklyTraining}</h3>
        <div className="replica-volume-card">
          <h4>{copy.volumeLoad}</h4><p>{copy.volumeSubtitle}</p>
          <Field label={copy.exercise} value={copy.allExercises} accent />
          <div className="replica-week-summary"><p>{copy.inProgress}</p><strong>{mockupData.statistics.volume}</strong><p>{mockupData.statistics.period}</p></div>
          <div className="replica-volume-chart">
            <span className="replica-axis-title">{copy.volumeAxis}</span>
            <svg viewBox="0 0 368 234" aria-hidden="true">
              {[40, 30, 20, 10, 0].map((value, i) => (
                <g key={value}><text x="0" y={15 + i * 45}>{value ? `${value}.0k` : '0'}</text><path d={`M45 ${12 + i * 45}H367`} /></g>
              ))}
              {mockupData.statistics.weeks.map((data, i) => {
                const height = data.volume / 40 * 180;
                const x = 58 + i * 56;
                return (
                  <g key={data.week}>
                    <rect className={i === 5 ? 'replica-current-bar' : ''} x={x - 12} y={192 - height} width="24" height={height} rx="2" />
                    <text x={x} y={192 - height - 11} textAnchor="middle" className={i === 5 ? 'selected' : ''}>{data.volume.toFixed(1)}k</text>
                    <text x={x} y="215" textAnchor="middle" className={i === 5 ? 'selected' : ''}>{data.week}</text>
                  </g>
                );
              })}
            </svg>
            <div className="replica-scrollbar" />
          </div>
        </div>
        <h3 className="replica-progress-title">{copy.exerciseProgress}</h3>
        <div className="replica-progress-card">
          <Field label={copy.exercise} value={copy.progressExercise} />
          <div className="replica-progress-filters"><Field label={copy.metric} value={copy.progressMetric} /><Field label={copy.period} value={copy.progressPeriod} /></div>
        </div>
      </div>
      <BottomNav stats />
    </>
  );
}

/** 432 × 960 logical pixels, matching the latest 1080 × 2400 app captures. */
export function AppMockup({ screen = 'plan', theme = 'light', accent = '#00CED1' }: {
  screen?: MockScreen; theme?: 'light' | 'dark'; accent?: string;
}) {
  const host = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  useLayoutEffect(() => {
    const element = host.current!;
    const update = () => setScale(element.clientWidth / 432);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  const palette = previewPalette(accent, theme === 'dark');
  const style = Object.fromEntries(Object.entries(palette).map(([key, value]) => [`--replica-${key}`, value])) as CSSProperties;
  return (
    <div ref={host} className={`mock-app mock-app--${theme}`} style={style} role="img" aria-label={`${theme} ${mockupData.screenLabels[screen]} OpenGym screen recreated from the app screenshot`}>
      <div className={`replica-canvas replica-canvas--${screen}`} style={{ transform: `scale(${scale})` }}>
        {screen === 'plan' ? <Home theme={theme} /> : screen === 'progress' ? <Statistics /> : <Workout keypad={screen === 'keypad'} />}
      </div>
    </div>
  );
}
