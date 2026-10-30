import { useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { config, mockupData } from '../config';
import { previewPalette } from './previewTone';
import { MockIcon } from './MockIcon';
import './AppMockup.css';

export type MockScreen = 'plan' | 'log' | 'keypad' | 'progress';
const copy = mockupData.labels;

function StatusBar() {
  return (
    <div className="replica-status">
      <span>{copy.time}</span><i />
    </div>
  );
}

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
  const next = mockupData.nextWorkout;
  const trained: readonly number[] = next.trained;
  return (
    <>
      <header className="replica-home-header">
        <b>{config.brand.wordmark}</b>
        <span className="replica-split-name"><i>/</i>{copy.split}<MockIcon name="chevron" /></span>
      </header>
      <div className="replica-home-body">
        <div className="replica-next-card">
          <p className="replica-next-label">{copy.next}<span>{next.lastTrained}</span></p>
          <p className="replica-next-position">{next.position}</p>
          <div className="replica-split-rail">
            {mockupData.plans.map((plan, i) => (
              <i key={plan.name} className={i === next.planIndex ? 'current' : trained.includes(i) ? 'trained' : ''} />
            ))}
          </div>
          <h2>{next.name}</h2>
          <p className="replica-next-groups">{next.groups}</p>
          <p className="replica-next-summary"><span>{next.exercises}</span><span>{next.sets}</span></p>
          <div className="replica-start-workout"><MockIcon name="play" />{copy.startWorkout}</div>
        </div>
        <div className="replica-activity">
          <div className="replica-activity-heading">
            <span>{copy.thisWeek}</span>
            <span>{copy.weeklySummary}<MockIcon name="chevronRight" /></span>
          </div>
          <div className="replica-activity-days">
            {mockupData.activity.map((day, i) => (
              <div key={i}>
                <div className="replica-day-track">
                  <i className={'trained' in day ? 'trained' : 'today' in day ? 'today' : ''} />
                </div>
                <span>{day.day}</span>
              </div>
            ))}
          </div>
          <div className="replica-activity-scroll" />
        </div>
        <div className="replica-plans-heading"><b>{copy.yourPlans}<small>{mockupData.plans.length}</small></b><span>{copy.manage}</span></div>
        <div className="replica-plan-list">
          {mockupData.plans.map((plan, i) => (
            <div className={`replica-plan-row ${i === next.planIndex ? 'replica-plan-row--next' : ''}`} key={plan.name}>
              <span className="replica-plan-marker" style={{ '--plan-color': plan.color[theme === 'dark' ? 1 : 0] } as CSSProperties}>{i + 1}</span>
              <div><b>{plan.name}</b><p>{plan.summary}</p></div>
              {i === next.planIndex && <em className="replica-next-badge">{copy.nextBadge}</em>}
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
function SetTable({ sets, editing = -1 }: { sets: readonly SetEntry[]; editing?: number }) {
  return (
    <div className="replica-set-table">
      <div className="replica-set-head">
        {[copy.set, copy.previous, copy.kg, copy.reps, copy.rpe].map(label => <span key={label}>{label}</span>)}
      </div>
      {sets.map((set, i) => (
        <div className="replica-set-line" key={set.set}>
          <span>{set.set}</span><span className="replica-prev">{set.weight} × {set.reps}</span>
          <b>{set.weight}</b><b className={i === editing ? 'editing' : ''}>{set.reps}</b><span className="replica-rpe">{set.rpe}</span>
        </div>
      ))}
    </div>
  );
}

const KEYS = ['+2.5', '1', '2', '3', 'RPE', '−2.5', '4', '5', '6', 'DONE', '+1', '7', '8', '9', '−1', '.', '0', 'Delete', 'Hide'];
// Reps are whole numbers, so the plate steps and the decimal point are disabled.
const KEY_KINDS: Partial<Record<string, string>> = {
  '+2.5': 'disabled', '−2.5': 'disabled', '.': 'disabled', '+1': 'accent', '−1': 'accent', RPE: 'label', DONE: 'done',
};

function Keypad() {
  const entry = mockupData.keypad;
  return (
    <div className="replica-keypad">
      <p className="replica-keypad-context"><b>{copy.set} {entry.set}</b> · {entry.field}</p>
      <p className="replica-keypad-value">{entry.value}</p>
      <div className="replica-key-grid">
        {KEYS.map(value => {
          const kind = KEY_KINDS[value];
          return (
            <span key={value} className={`replica-key ${kind ? `replica-key--${kind}` : ''}`}>
              {value === 'Delete' ? <MockIcon name="delete" /> : value === 'Hide' ? <MockIcon name="keyboard" /> : value === 'DONE' ? copy.done : value}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Workout({ keypad }: { keypad: boolean }) {
  const planIndex = mockupData.plans.findIndex(plan => plan.name === mockupData.workout.planName);
  const planColor = mockupData.plans[planIndex].color;
  const editing = mockupData.keypad.set - 1;
  return (
    <>
      <header className="replica-workout-header" style={{ '--plan-light': planColor[0], '--plan-dark': planColor[1] } as CSSProperties}>
        <MockIcon name="back" />
        <div className="replica-workout-title"><b>{mockupData.workout.planName}</b><p>{copy.block} · {copy.week} {mockupData.workoutWeek}</p></div>
        <span className="replica-workout-time">{mockupData.workoutTime[keypad ? 'keypad' : 'log']}</span>
        <span className="replica-workout-pause" aria-label={copy.pause}><MockIcon name="pause" /></span><MockIcon name="check" /><MockIcon name="menu" />
      </header>
      <div className="replica-plan-tabs">
        {mockupData.plans.map((plan, i) => <span key={plan.name} className={i === planIndex ? 'selected' : ''}>{plan.name}</span>)}
      </div>
      <div className="replica-workout-list">
        {mockupData.workout.exercises.map((exercise, i) => (
          <div className="replica-exercise" key={exercise.name}>
            <div className="replica-exercise-heading"><b>{exercise.name}</b><MockIcon name="more" /></div>
            <SetTable sets={exercise.sets} editing={keypad && i === 0 ? editing : -1} />
            <div className="replica-add-set"><MockIcon name="plus" />{copy.addSet}</div>
          </div>
        ))}
      </div>
      <div className="replica-block-strip">
        <span className="replica-block-chip"><MockIcon name="layers" /><b>{copy.block}</b><MockIcon name="chevronUp" /></span>
        {mockupData.visibleWeeks.map(week => <span key={week} className={`replica-week-tab ${week === mockupData.workoutWeek ? 'selected' : ''}`}>{copy.week} {week}</span>)}
        <MockIcon name="plus" />
      </div>
      {keypad && <Keypad />}
    </>
  );
}

function Statistics() {
  const stats = mockupData.statistics;
  return (
    <>
      <header className="replica-page-header">{copy.statistics}</header>
      <div className="replica-stats-viewport">
        <div className="replica-stats-body">
          <h3 className="replica-section-title">{stats.title}</h3>
          <div className="replica-stats-card replica-training-block">
            <h4>{stats.block}</h4><p>{stats.period}</p>
            <div className="replica-block-totals">
              {stats.totals.map(stat => <div key={stat.label}><span>{stat.label}</span><strong>{stat.value}</strong><small>{stat.detail}</small></div>)}
            </div>
            <div className="replica-weekly-sets">
              <h4>{stats.setsLabel}</h4>
              <div className="replica-set-bars">
                {stats.weeks.map((sets, i) => <div key={i} className={i + 1 === stats.currentWeek ? 'current' : ''}>
                  <span>{sets || ''}</span><i style={{ height: sets * 1.05 }} /><small>W{i + 1}</small>
                </div>)}
              </div>
            </div>
            <div className="replica-strength-heading"><h4>{stats.gainsLabel}</h4><span>{stats.measure}</span></div>
            {stats.gains.map(gain => <div className="replica-strength-gain" key={gain.name}><span>{gain.name}</span><small>{gain.value}</small><strong>{gain.change}</strong></div>)}
          </div>
          <h3 className="replica-section-title">{stats.weeklyTitle}</h3>
          <div className="replica-stats-card replica-weekly-training"><h4>{stats.weightTitle}</h4><p>{stats.weightDescription}</p><div><MockIcon name="layers" />{stats.allExercises}<MockIcon name="chevron" /></div></div>
        </div>
      </div>
      <BottomNav stats />
    </>
  );
}

/** 432 × 960 logical pixels, matching the 1080 × 2400 app captures. */
export function AppMockup({ screen = 'plan', theme = 'light', accent = config.appAccents[4].seed }: {
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
        <StatusBar />
        {screen === 'plan' ? <Home theme={theme} /> : screen === 'progress' ? <Statistics /> : <Workout keypad={screen === 'keypad'} />}
        <i className="replica-gesture" />
      </div>
    </div>
  );
}
