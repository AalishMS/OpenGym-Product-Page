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

const MAX_DAY_SETS = 23;

function Home({ theme }: { theme: 'light' | 'dark' }) {
  const next = mockupData.nextWorkout;
  return (
    <>
      <header className="replica-home-header">
        <b>{config.brand.wordmark}</b>
        <span>{copy.split}<MockIcon name="chevron" /></span>
      </header>
      <div className="replica-home-body">
        <div className="replica-next-card">
          <div className="replica-next-top"><p className="replica-next-label">{copy.next}</p><p className="replica-next-last">{copy.lastTrained}</p></div>
          <div className="replica-split-rail">
            {mockupData.plans.map((plan, i) => (
              <i key={plan.name} className={i === next.dayIndex ? 'current' : i < next.dayIndex ? 'trained' : ''} />
            ))}
          </div>
          <h2>{next.name}</h2>
          <div className="replica-muscle-chips">
            {next.groups.map(group => <span key={group}>{group}</span>)}
          </div>
          <p className="replica-next-summary">{next.summary}</p>
          <div className="replica-start-workout"><MockIcon name="play" />{copy.startWorkout}</div>
        </div>
        <div className="replica-activity">
          <div className="replica-activity-heading"><span>{copy.thisWeek}</span><span>{copy.weeklySummary}</span></div>
          <div className="replica-activity-days">
            {mockupData.activity.map((day, i) => (
              <div key={i}>
                <div className="replica-day-track">
                  <i
                    className={`${day.sets ? 'trained' : ''} ${'today' in day && day.today ? 'today' : ''}`}
                    style={day.sets ? { height: Math.round(day.sets / MAX_DAY_SETS * 52) } : undefined}
                  />
                </div>
                <span>{day.day}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="replica-plans-heading"><b>{copy.yourPlans}<small>{mockupData.plans.length}</small></b><span>{copy.manage}</span></div>
        <div className="replica-plan-list">
          {mockupData.plans.map((plan, i) => (
            <div className={`replica-plan-row ${i === next.dayIndex ? 'replica-plan-row--next' : ''}`} key={plan.name}>
              <span className="replica-plan-marker" style={{ '--plan-color': plan.color[theme === 'dark' ? 1 : 0] } as CSSProperties}>{plan.initials}</span>
              <div><b>{plan.name}</b><p>{plan.summary}</p></div>
              {i === next.dayIndex && <em className="replica-next-badge">{copy.nextBadge}</em>}
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
function SetTable({ sets, selected = -1 }: { sets: readonly SetEntry[]; selected?: number }) {
  return (
    <div className="replica-set-table">
      <div className="replica-set-head">
        {[copy.set, copy.previous, copy.kg, copy.reps, copy.rpe].map(label => <span key={label}>{label}</span>)}
      </div>
      {sets.map((set, i) => (
        <div className="replica-set-line" key={set.set}>
          <span>{set.set}</span><span className="replica-prev">{set.weight} × {set.reps}</span>
          <b>{i === selected ? <mark>{set.weight}</mark> : set.weight}</b><b>{set.reps}</b><span className="replica-rpe">{set.rpe}</span>
        </div>
      ))}
    </div>
  );
}

const KEYS = ['+2.5', '1', '2', '3', 'RPE', '−2.5', '4', '5', '6', 'NEXT', '+1', '7', '8', '9', '−1', '.', '0', 'Delete', 'Hide'];

function Keypad() {
  const entry = mockupData.keypad;
  return (
    <div className="replica-keypad">
      <div className="replica-keypad-context">
        <span><b>{copy.set} {entry.set}</b> · {copy.weightField}</span>
        <span className="replica-keypad-copy"><MockIcon name="copy" />{copy.copyTo}</span>
      </div>
      <div className="replica-key-grid">
        {KEYS.map(value => {
          const kind = value === 'NEXT' ? 'next' : value === 'RPE' ? 'rpe' : value.endsWith('2.5') ? 'accent' : '';
          return (
            <span key={value} className={`replica-key ${kind ? `replica-key--${kind}` : ''}`}>
              {value === 'Delete' ? <MockIcon name="delete" /> : value === 'Hide' ? <MockIcon name="keyboard" /> : value === 'NEXT' ? copy.nextField : value}
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
  return (
    <>
      <header className="replica-workout-header" style={{ '--plan-light': planColor[0], '--plan-dark': planColor[1] } as CSSProperties}>
        <MockIcon name="back" />
        <div className="replica-workout-title"><b>{mockupData.workout.planName}</b><p>{copy.week} {mockupData.workoutWeek}<span>{mockupData.workoutTime}</span></p></div>
        <span className="replica-workout-start">{copy.start}</span><MockIcon name="check" /><MockIcon name="menu" />
      </header>
      <div className="replica-plan-tabs">
        {mockupData.plans.map((plan, i) => <span key={plan.name} className={i === planIndex ? 'selected' : ''}>{plan.name}</span>)}
      </div>
      <div className="replica-workout-list">
        {mockupData.workout.exercises.map((exercise, i) => (
          <div className="replica-exercise" key={exercise.name}>
            <div className="replica-exercise-heading"><b>{exercise.name}</b><MockIcon name="more" /></div>
            <SetTable sets={exercise.sets} selected={keypad && i === 0 ? 0 : -1} />
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

function VolumeChart() {
  const { weeks, axisMax } = mockupData.statistics;
  const ticks = [axisMax, axisMax * 0.75, axisMax * 0.5, axisMax * 0.25, 0];
  const plot = 49 * 4;
  return (
    <svg viewBox="0 0 368 250" aria-hidden="true">
      {ticks.map((value, i) => (
        <g key={value}><text x="0" y={15 + i * 49}>{value ? `${value}.0k` : '0'}</text><path d={`M45 ${12 + i * 49}H367`} /></g>
      ))}
      {weeks.map((data, i) => {
        const height = data.volume / axisMax * plot;
        const x = 70 + i * 55;
        const current = i === weeks.length - 1;
        return (
          <g key={data.week}>
            <rect className={current ? 'replica-current-bar' : ''} x={x - 12} y={12 + plot - height} width="24" height={height} />
            <text x={x} y={12 + plot - height - 8} textAnchor="middle">{data.volume.toFixed(1)}k</text>
            <text x={x} y={12 + plot + 22} textAnchor="middle" className={current ? 'selected' : ''}>{data.week}</text>
          </g>
        );
      })}
    </svg>
  );
}

function Heatmap() {
  const { heatmap, todayColumn, todayRow } = mockupData.statistics;
  return (
    <div className="replica-heatmap">
      <div className="replica-heatmap-days">{['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => <span key={i}>{day}</span>)}</div>
      <div className="replica-heatmap-grid">
        {heatmap.map((trained, column) => (
          <div key={column}>
            {Array.from({ length: 7 }, (_, row) => {
              if (column === todayColumn && row > todayRow) return <i key={row} className="replica-cell replica-cell--future" />;
              const today = column === todayColumn && row === todayRow;
              return <i key={row} className={`replica-cell ${(trained as readonly number[]).includes(row) ? 'on' : ''} ${today ? 'today' : ''}`} />;
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProgressChart() {
  const { points, min, max, step } = mockupData.statistics.progress;
  const top = 20, bottom = 170, left = 40, width = 328;
  const y = (value: number) => bottom - (value - min) / (max - min) * (bottom - top);
  const x = (i: number) => left + width / points.length * (i + 0.5);
  const ticks: number[] = [];
  for (let value = min; value <= max; value += step) ticks.push(value);
  const last = points.length - 1;
  return (
    <svg viewBox="0 0 368 210" aria-hidden="true">
      {ticks.map(value => (
        <g key={value}><text x="0" y={y(value) + 4}>{value}</text><path d={`M${left} ${y(value)}H367`} /></g>
      ))}
      <path className="replica-guide" d={`M${x(last)} ${top - 4}V${bottom}`} />
      <polyline className="replica-line" points={points.map((point, i) => `${x(i)},${y(point.value)}`).join(' ')} />
      {points.map((point, i) => (
        <circle key={point.label} className={i === last ? 'replica-dot replica-dot--last' : 'replica-dot'} cx={x(i)} cy={y(point.value)} r={i === last ? 7 : 5} />
      ))}
      <circle className="replica-dot-core" cx={x(last)} cy={y(points[last].value)} r="2.5" />
      <text className="replica-point-value" x={x(last)} y={y(points[last].value) - 14} textAnchor="middle">{points[last].value}</text>
      {points.map((point, i) => <text key={point.label} x={x(i)} y="200" textAnchor="middle">{point.label}</text>)}
    </svg>
  );
}

/** How far the statistics page is scrolled, as a user would see it part-way down. */
const STATS_SCROLL = 330;

function Statistics() {
  const stats = mockupData.statistics;
  return (
    <>
      <header className="replica-stats-header">{copy.statistics}</header>
      <div className="replica-stats-viewport">
        <div className="replica-stats-body" style={{ transform: `translateY(-${STATS_SCROLL}px)` }}>
          <h3>{copy.weeklyTraining}</h3>
          <div className="replica-volume-card">
            <h4>{copy.volumeLoad}</h4><p>{copy.volumeSubtitle}</p>
            <Field label={copy.exercise} value={copy.allExercises} accent />
            <div className="replica-week-summary"><p>{copy.inProgress}</p><strong>{stats.volume}</strong><p>{stats.period}</p></div>
            <div className="replica-volume-chart">
              <span className="replica-axis-title">{copy.volumeAxis}</span>
              <VolumeChart />
            </div>
          </div>
          <h3 className="replica-section-title">{copy.activity}</h3>
          <div className="replica-activity-card">
            <h4>{copy.workouts}</h4><p>{copy.workoutsSubtitle}</p>
            <Heatmap />
            <div className="replica-legend">
              <span><i className="replica-cell on" />{copy.legendWorkout}</span>
              <span><i className="replica-cell today" />{copy.legendToday}</span>
            </div>
          </div>
          <h3 className="replica-section-title">{copy.exerciseProgress}</h3>
          <div className="replica-progress-card">
            <Field label={copy.exercise} value={copy.progressExercise} />
            <div className="replica-progress-filters"><Field label={copy.metric} value={copy.progressMetric} /><Field label={copy.period} value={copy.progressPeriod} /></div>
            <div className="replica-progress-stats">
              {([[copy.latest, stats.progress.latest], [copy.change, stats.progress.change], [copy.bestInPeriod, stats.progress.best]] as const).map(([label, value]) => (
                <div key={label}><span>{label}</span><strong>{value}</strong></div>
              ))}
            </div>
            <p className="replica-chart-caption">{copy.perWorkout}</p>
            <span className="replica-axis-title replica-axis-title--line">{copy.progressUnit}</span>
            <ProgressChart />
          </div>
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
