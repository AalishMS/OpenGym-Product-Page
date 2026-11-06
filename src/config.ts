/**
 * Central configuration for the OpenGym product page.
 * All copy, URLs, and asset paths are managed here for easy updates.
 */

import { releases, releasesCheckedAt } from './releases';
import type { Release } from './githubReleases';

const formatDate = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', { ...options, timeZone: 'UTC' }).format(new Date(date));

const firstRelease = releases[releases.length - 1];
const releaseSpanDays =
  (Date.parse(releases[0].date) - Date.parse(firstRelease.date)) / 86_400_000;

export const config = {
  brand: {
    name: 'OpenGym',
    wordmark: '> OpenGym',
    tagline: 'A training journal, brought to life.',
  },

  links: {
    // Direct link to the latest published APK file on GitHub Releases.
    download: releases[0].apkUrl,
    // Latest GitHub release page.
    latestRelease: releases[0].url,
    repository: 'https://github.com/AalishMS/OpenGym',
  },

  releasePage: {
    checkedAt: formatDate(releasesCheckedAt, { month: 'long', day: 'numeric', year: 'numeric' }),
    apiUrl: 'https://api.github.com/repos/AalishMS/OpenGym/releases',
    liveSource: 'Release details synced from GitHub · Historical highlights summarized from releases and commits.',
    fallbackSource: 'Showing saved release details · Last checked',
    githubLabel: 'View all releases on GitHub ↗',
    notesFallback: 'See the full changelog on GitHub for the changes in this release.',
  },

  hero: {
    productLabel: 'Free open-source gym app for Android',
    description:
      'Plan the week, log every set in a few taps, and watch the numbers climb. Free, open source, and yours to keep offline.',
    signInNote: 'An internet connection is required to sign in on first launch.',
    downloadLabel: 'Download for Android',
    exploreLabel: 'See how it works',
    versionLabel: 'Android APK',
    versionShort: releases[0].version.split('+')[0],
    caption: 'Your session, at a glance · Sample data',
    /** Small cards that float beside the phone once the page has loaded. */
    chips: [
      { label: 'Set 2 logged', value: '100 kg × 6' },
      { label: 'New record', value: '122.5 kg' },
    ],
    proof: [
      { title: 'Free and open source', text: 'Every line is on GitHub.' },
      { title: 'Works offline', text: 'Sign in once, then train anywhere.' },
      { title: 'Your data stays yours', text: 'Stored on your phone, exportable as JSON.' },
    ],
    updatedLabel: `Updated ${formatDate(releases[0].date, { month: 'short', day: 'numeric' })}`,
  },

  loggingDemo: {
    title: 'Try it yourself',
    subtitle: 'Interactive preview with sample data',
    exercise: 'Bench Press',
    // Last session's sets; the demo starts from these, like the app's "Previous" column.
    previous: [
      { weight: 70, reps: 8 },
      { weight: 70, reps: 8 },
      { weight: 70, reps: 7 },
    ],
    weightStep: 2.5,
    restSeconds: 60,
    columns: ['Set', 'Previous', 'kg', 'Reps'],
    bestLabel: 'Best e1RM',
    hint: 'Beat your best estimated 1RM to set a new PR. Try 72.5 kg × 8.',
    completeLabel: 'Complete set',
    restLabel: 'Rest',
    skipLabel: 'Skip rest',
    finishedLabel: 'Workout complete',
    resetLabel: 'Start over',
    prLabel: 'New PR',
    volumeLabel: 'Volume',
    e1rmLabel: 'Top e1RM',
  },

  progressShowcase: {
    eyebrow: 'Progress you can see',
    headline: ['Twelve weeks.', 'One line going up.'],
    description:
      'Every set you log feeds your estimated 1RM. Pick an exercise and watch the work add up, week after week.',
    exercise: 'Squat',
    metric: 'Estimated 1RM',
    unit: 'kg',
    caption: 'Sample data · 12 weeks',
    latestLabel: 'Latest',
    changeLabel: 'Change',
    prLabel: 'PRs',
    points: [100, 102.5, 105, 105, 107.5, 110, 110, 112.5, 115, 117.5, 117.5, 122.5],
  },

  history: {
    eyebrow: 'How it got here',
    headline: ['Seven months', 'of iterations.'],
    description:
      'From the first plan grid to today’s training journal. Each milestone shows the screens that changed. Drag along the timeline or use the arrow keys to explore.',
    trackLabel: 'OpenGym version history',
    dayLabel: 'day',
    noScreens: 'No screenshots survived from day zero.',
    firstCommitLabel: 'First commit',
    previous: 'Previous version',
    next: 'Next version',
    stats: { commits: 'commits', contributors: 'contributors', linesOfCode: 'lines of code' },
  },

  changelog: {
    eyebrow: 'Changelog',
    title: `${releases.length} releases since ${formatDate(firstRelease.date, { month: 'long', year: 'numeric' })}.`,
    description: `A new version about every ${Math.round(releaseSpanDays / (releases.length - 1))} days. Here's what changed lately.`,
    count: 3,
    allLabel: 'All releases',
  },

  offline: {
    eyebrow: 'Offline training',
    headline: ['No signal.', 'Keep lifting.'],
    description:
      'Your plans, sets, and history stay on your phone. Log your workout wherever you train, even when the gym’s Wi-Fi gives up.',
    signInNote: 'Connect once to sign in. Then you can train offline.',
    details: [
      { title: 'Reconnect when you’re ready', description: 'Supported workout data can sync when you’re back online.' },
      { title: 'Keep a copy of your own', description: 'Export your plans, sessions, and settings as a JSON backup.' },
    ],
    demo: {
      caption: 'Try it · Sample workout',
      switchLabel: 'Offline mode',
      offlineStatus: 'No connection',
      onlineStatus: 'Connected',
      date: 'Sep 3',
      exerciseLabel: 'Exercise',
      setsLabel: 'sets logged',
      columns: ['Set', 'kg', 'Reps', 'RPE'],
      savedLabel: 'Saved on your phone',
      savedNote: 'Your log stays, with or without a connection.',
    },
  },

  installation: {
    linkLabel: 'Installation help',
    eyebrow: 'Install',
    title: 'Install OpenGym on Android.',
    description: 'Download the APK directly from GitHub Releases.',
    releaseLabel: 'View release details',
    steps: [
      {
        title: 'Download the APK',
        description: 'Tap Download for Android and save the APK file to your phone.',
      },
      {
        title: 'Open the downloaded file',
        description: 'Open the APK from your browser’s downloads or your Files app.',
      },
      {
        title: 'Allow installation when prompted',
        description:
          'Android may ask you to allow this browser or Files app to install apps. Allow this source for the installation, then turn the permission off again afterward.',
      },
      {
        title: 'Sign in and start training',
        description:
          'Connect to the internet for your first sign-in. After that, you can plan, log, and review workouts offline.',
      },
    ],
  },

  meta: {
    title: 'OpenGym — Free Open-Source Gym App & Offline Workout Tracker',
    description:
      'OpenGym is a free, open-source gym app and offline workout tracker for Android. Plan routines, log weight and reps, track PRs, and keep your data local.',
    keywords:
      'OpenGym, free gym app, gym app, open source workout tracker android, offline gym tracker apk, local-first workout log, lifting tracker, fitness journal',
    ogImage: 'https://open-gym-product-page.vercel.app/og-image.png',
    themeColor: '#0D0D0D',
  },

  /**
   * Accent colors available in the app. Seed values taken directly from
   * `lib/providers/settings_provider.dart`. The website personalization
   * section uses these to demonstrate theme customization.
   */
  appAccents: [
    { name: 'Blue', seed: '#6AA9ED' },
    { name: 'Amber', seed: '#DB9339' },
    { name: 'Coral', seed: '#E98764' },
    { name: 'Rose', seed: '#E282A4' },
    { name: 'Teal', seed: '#41B9B9' },
    { name: 'Violet', seed: '#A399E1' },
    { name: 'Slate', seed: '#96A6BB' },
    { name: 'Green', seed: '#59BD79' },
  ] as const,

  /** Sample workout data used across the page for visual consistency. */
  sampleWorkout: {
    planName: 'Leg Day',
    exercises: [
      {
        name: 'Squat',
        sets: [
          { set: 1, weight: 100, reps: 6, rpe: 8 },
          { set: 2, weight: 100, reps: 6, rpe: 9 },
          { set: 3, weight: 100, reps: 5, rpe: 10 },
        ],
      },
      {
        name: 'Romanian Deadlift',
        sets: [
          { set: 1, weight: 80, reps: 8, rpe: 7 },
          { set: 2, weight: 80, reps: 8, rpe: 8 },
          { set: 3, weight: 80, reps: 6, rpe: 9 },
        ],
      },
      {
        name: 'Leg Press',
        sets: [
          { set: 1, weight: 180, reps: 12, rpe: 7 },
          { set: 2, weight: 180, reps: 12, rpe: 8 },
          { set: 3, weight: 180, reps: 10, rpe: 9 },
        ],
      },
    ],
  },

  story: [
    {
      id: 'plan',
      title: 'Plan your week.',
      description:
        'Build your own split or pick a bundled program, including a five-day full-body preset, then group your weeks into training blocks. Your exercises, target sets, and notes are ready for your next session.',
    },
    {
      id: 'log',
      title: 'Stay with your workout.',
      description:
        'Log weight, reps, and RPE in a few taps. Previous values fill in for you, live PR markers celebrate your best sets, and a shareable summary wraps up each workout.',
    },
    {
      id: 'progress',
      title: 'See the work adding up.',
      description:
        'Follow your weekly weight lifted, how often you train, and every lift over time. Personal records give every small improvement a place.',
    },
  ],
  samplePlans: [
    { name: 'Push Day', exercises: 6, color: '#FF5722' },
    { name: 'Pull Day', exercises: 7, color: '#00A8FF' },
    { name: 'Leg Day', exercises: 7, color: '#22C55E' },
    { name: 'Upper Body', exercises: 6, color: '#8B5CF6' },
    { name: 'Full Body', exercises: 6, color: '#FF9500' },
  ],

  sampleWeekSchedule: [
    { day: 'Mon', plan: 'Push Day', done: true },
    { day: 'Tue', plan: 'Pull Day', done: true },
    { day: 'Wed', plan: 'Rest', done: true },
    { day: 'Thu', plan: 'Leg Day', done: true },
    { day: 'Fri', plan: 'Upper Body', done: false },
    { day: 'Sat', plan: 'Full Body', done: false },
    { day: 'Sun', plan: 'Rest', done: false },
  ],

  sampleProgressData: {
    exercise: 'Bench Press',
    unit: 'kg',
    personalRecord: { weight: 80, reps: 5, date: 'Aug 12' },
    chartPoints: [
      { week: 'W1', weight: 60 },
      { week: 'W2', weight: 62.5 },
      { week: 'W3', weight: 62.5 },
      { week: 'W4', weight: 65 },
      { week: 'W5', weight: 65 },
      { week: 'W6', weight: 67.5 },
      { week: 'W7', weight: 70 },
      { week: 'W8', weight: 70 },
    ],
  },

  faq: [
    {
      q: 'Does the app work without an internet connection?',
      a: 'A connection is required to sign in on first launch. After that, your workout data is stored locally first, so you can create plans, log workouts, and review your history without a connection.',
    },
    {
      q: 'How does syncing work?',
      a: 'When you are online, OpenGym can sync supported account data—including your workout splits, plans, and sessions—in the background. Offline changes stay on your device and can sync after connectivity returns. App settings are not included in cloud sync; use a JSON export when you want a separate, user-controlled backup.',
    },
    {
      q: 'Can I create my own workout plans?',
      a: 'Yes. You can build custom plans from scratch by choosing exercises from the built-in library or typing custom exercise names. You can also start from bundled workout programs that install a complete weekly schedule.',
    },
    {
      q: 'Can I export my data?',
      a: 'Yes. OpenGym supports full data export and import through JSON files. You can back up all your plans, sessions, and settings, and restore them on another device.',
    },
    {
      q: 'How do I install the app?',
      a: 'OpenGym is distributed as an Android APK through GitHub Releases. Download the latest release, open the file, and follow the Android installation prompts. The app will notify you of updates from within the app.',
    },
    {
      q: 'Is the app free?',
      a: 'OpenGym is an open-source project. The source code is available on GitHub and completely free to use.',
    },
  ],
} as const;

export function configForReleases(history: readonly Release[]) {
  const latest = history[0];
  const oldest = history.reduce((a, b) => a.date < b.date ? a : b);
  const newest = history.reduce((a, b) => a.date > b.date ? a : b);
  const spanDays = (Date.parse(newest.date) - Date.parse(oldest.date)) / 86_400_000;
  return {
    ...config,
    links: { ...config.links, download: latest.apkUrl || latest.url, latestRelease: latest.url },
    hero: {
      ...config.hero,
      versionShort: latest.version.split('+')[0],
      updatedLabel: `Updated ${formatDate(latest.date, { month: 'short', day: 'numeric' })}`,
    },
    changelog: {
      ...config.changelog,
      title: `${history.length} releases since ${formatDate(oldest.date, { month: 'long', year: 'numeric' })}.`,
      description: history.length > 1
        ? `A new version about every ${Math.max(1, Math.round(spanDays / (history.length - 1)))} days. Here's what changed lately.`
        : "Here's what changed in the latest release.",
    },
  };
}

/** Sample content based on OpenGym@ca88ab9, with a workout in progress. */
export const mockupData = {
  labels: {
    home: 'Home', history: 'History', stats: 'Stats', settings: 'Settings',
    time: '9:41', split: 'My split', next: 'In progress',
    startWorkout: 'Resume workout', nextBadge: 'Next',
    thisWeek: 'This week', weeklySummary: '4 workouts · 58 sets',
    yourPlans: 'Your plans', manage: 'Manage',
    set: 'Set', previous: 'Previous', kg: 'Kg', reps: 'Reps', rpe: 'RPE', empty: '–',
    pause: 'Pause', finish: 'Finish', addSet: 'Add set', week: 'Week', block: 'Block 1', nextKey: 'Next',
    statistics: 'Statistics',
  },
  activeWorkout: { status: 'Workout in progress', name: 'Full Body', elapsed: '12:48' },
  nextWorkout: {
    name: 'Full Body',
    position: 'Workout 3 of 3',
    groups: 'Chest, Back, Shoulders, Legs',
    exercises: '6 exercises',
    sets: '17 sets · ~55 min',
    planIndex: 2,
    /** Plans already trained in this rotation, shown as filled rail segments. */
    trained: [0, 1],
  },
  /** One entry per weekday; trained days fill the bar, as in the app. */
  activity: [
    { day: 'M', trained: true }, { day: 'T', trained: true },
    { day: 'W' }, { day: 'T', trained: true, today: true },
    { day: 'F' }, { day: 'S' }, { day: 'S' },
  ],
  plans: [
    { name: 'Upper Body', summary: '6 exercises · 17 sets', color: ['#43779a', '#8ebce0'] },
    { name: 'Push Day', summary: '6 exercises · 17 sets', color: ['#b7421c', '#f47755'] },
    { name: 'Full Body', summary: '6 exercises · 17 sets', color: ['#00771a', '#57b45a'] },
  ],
  /** Sample session with previous-set context and logged effort values. */
  workout: {
    planName: 'Full Body',
    exercises: [
      {
        name: 'Squat',
        sets: [
          { set: 1, weight: 95, reps: 6, previous: '95 × 6', rpe: 8 },
          { set: 2, weight: 95, reps: 6, previous: '95 × 6', rpe: 9 },
          { set: 3, weight: 95, reps: 6, previous: '95 × 6', rpe: 10 },
        ],
      },
      {
        name: 'Bench Press',
        sets: [
          { set: 1, weight: 70, reps: 8, previous: '70 × 8', rpe: 8 },
          { set: 2, weight: 70, reps: 8, previous: '70 × 8', rpe: 9 },
          { set: 3, weight: 70, reps: 8, previous: '70 × 8', rpe: 10 },
        ],
      },
      {
        name: 'Deadlift',
        sets: [
          { set: 1, weight: 120, reps: 5, previous: '120 × 5', rpe: 8 },
          { set: 2, weight: 120, reps: 5, previous: '120 × 5', rpe: 9 },
          { set: 3, weight: 120, reps: 5, previous: '120 × 5', rpe: 10 },
        ],
      },
    ],
  },
  workoutWeek: 1,
  visibleWeeks: [1],
  workoutTime: { log: '12:48', keypad: '12:48' },
  /** The keypad edits the weight of the first Squat set. */
  keypad: { set: 1, field: 'Weight (kg)', value: '95', copyTo: 'Copy to set 2' },
  statistics: {
    tabs: ['Overview', 'Strength', 'Blocks', 'Records'],
    weeklyTitle: 'Weekly training', weightTitle: 'Weight lifted', allExercises: 'All exercises',
    selectedLabel: 'Last week', selectedValue: '11,746 kg',
    selectedRange: '26 Oct – 1 Nov 2026', comparison: '-49% vs previous week',
    chartLabel: 'Tap a week to inspect', chartMax: '40 t', axisMax: 40000,
    weeks: [
      { label: '28 Sep', volume: 12700 },
      { label: '5 Oct', volume: 28800 },
      { label: '12 Oct', volume: 30700 },
      { label: '19 Oct', volume: 23300 },
      { label: '26 Oct', volume: 11746, selected: true },
      { label: '2 Nov', volume: 16000 },
    ],
    workoutStats: [
      { label: 'Workouts', value: '2' },
      { label: 'Sets', value: '31' },
      { label: 'Reps', value: '273' },
    ],
    calendarTitle: 'Training rhythm',
    months: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'],
    days: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
    trainingDays: [126, 130, 131, 133, 137, 138, 140, 144, 145, 147, 151, 152, 154, 156],
    calendarCaption: '14 training days in 23 weeks', todayLabel: 'Today',
  },
  screenLabels: { plan: 'Home', log: 'Workout', progress: 'Statistics', keypad: 'Keypad' },
} as const;
