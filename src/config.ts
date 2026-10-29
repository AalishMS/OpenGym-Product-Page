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
    eyebrow: 'YOUR TRAINING. YOUR TERMS.',
    productLabel: 'Free open-source gym app for Android',
    description:
      'Plan your workouts, log weight, reps, and RPE, and follow your progress.',
    signInNote: 'An internet connection is required to sign in on first launch.',
    downloadLabel: 'Download for Android',
    exploreLabel: 'Explore the app',
    versionLabel: 'Android APK',
    caption: 'Your session, at a glance · Sample data',
    details: ['Offline after sign-in', 'Free & open source', 'Local-first data'],
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
    eyebrow: 'PROGRESS YOU CAN SEE',
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

  changelog: {
    eyebrow: 'CHANGELOG',
    title: `${releases.length} releases since ${formatDate(firstRelease.date, { month: 'long', year: 'numeric' })}.`,
    description: `A new version about every ${Math.round(releaseSpanDays / (releases.length - 1))} days. Here's what changed lately.`,
    count: 3,
    allLabel: 'All releases',
  },

  offline: {
    eyebrow: 'OFFLINE TRAINING',
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
    eyebrow: 'READY FOR YOUR NEXT SESSION',
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
        'Build your own split or pick a bundled program, then group your weeks into training blocks. Your exercises, target sets, and notes are ready for your next session.',
    },
    {
      id: 'log',
      title: 'Stay with your workout.',
      description:
        'Log weight, reps, and RPE in a few taps. Previous values fill in for you, and a session timer keeps track of the time.',
    },
    {
      id: 'progress',
      title: 'See the work adding up.',
      description:
        'Follow your training consistency and your top weights over time. Personal records give every small improvement a place.',
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
    hero: { ...config.hero, updatedLabel: `Updated ${formatDate(latest.date, { month: 'short', day: 'numeric' })}` },
    changelog: {
      ...config.changelog,
      title: `${history.length} releases since ${formatDate(oldest.date, { month: 'long', year: 'numeric' })}.`,
      description: history.length > 1
        ? `A new version about every ${Math.max(1, Math.round(spanDays / (history.length - 1)))} days. Here's what changed lately.`
        : "Here's what changed in the latest release.",
    },
  };
}

/** Sample content mirroring the OpenGym screenshots at mobile app commit 782dcd8. */
export const mockupData = {
  labels: {
    home: 'Home', history: 'History', stats: 'Stats', settings: 'Settings',
    time: '9:41', split: 'My Split', next: 'Next up',
    startWorkout: 'Start workout', nextBadge: 'Next',
    thisWeek: 'This week', weeklySummary: '2 workouts · 24 sets',
    yourPlans: 'Your plans', manage: 'Manage',
    set: 'Set', previous: 'Previous', kg: 'Kg', reps: 'Reps', rpe: 'RPE',
    pause: 'Pause', addSet: 'Add set', week: 'Week', block: 'Block 1', done: 'Done',
    statistics: 'Statistics', workouts: 'Workouts', workoutsSubtitle: 'Days you trained · Last 16 weeks',
    legendWorkout: 'Workout', legendToday: 'Today',
    exerciseProgress: 'Exercise progress',
    measureHint: 'The most you could lift for one rep, estimated from your best set.',
    showAll: 'Show all 18 lifts',
  },
  nextWorkout: {
    name: 'Full Body',
    position: 'Workout 1 of 5',
    groups: 'Chest, Back, Shoulders, Legs',
    exercises: '6 exercises',
    sets: '17 sets',
    planIndex: 0,
    /** Plans already trained in this rotation, shown as filled rail segments. */
    trained: [3, 4],
  },
  /** One entry per weekday; trained days fill the bar, as in the app. */
  activity: [
    { day: 'M', trained: true }, { day: 'T' },
    { day: 'W', trained: true }, { day: 'T', today: true },
    { day: 'F' }, { day: 'S' }, { day: 'S' },
  ],
  plans: [
    { name: 'Full Body', summary: '6 exercises · 17 sets', color: ['#00771a', '#57b45a'] },
    { name: 'Push Day', summary: '6 exercises · 18 sets', color: ['#b2336c', '#e96c9f'] },
    { name: 'Upper Body', summary: '6 exercises · 20 sets', color: ['#657000', '#a9b000'] },
    { name: 'Pull Day', summary: '7 exercises · 22 sets', color: ['#b7421c', '#f47755'] },
    { name: 'Leg Day', summary: '7 exercises · 23 sets', color: ['#995a00', '#da9200'] },
  ],
  workout: {
    planName: 'Push Day',
    exercises: [
      {
        name: 'Bench Press',
        sets: [
          { set: 1, weight: 70, reps: 8, rpe: 8 },
          { set: 2, weight: 70, reps: 8, rpe: 8 },
          { set: 3, weight: 70, reps: 7, rpe: 9 },
          { set: 4, weight: 70, reps: 5, rpe: 10 },
        ],
      },
      {
        name: 'Incline Dumbbell Press',
        sets: [
          { set: 1, weight: 32, reps: 10, rpe: 7 },
          { set: 2, weight: 32, reps: 10, rpe: 8 },
          { set: 3, weight: 32, reps: 8, rpe: 9 },
        ],
      },
      {
        name: 'Overhead Press',
        sets: [
          { set: 1, weight: 45, reps: 8, rpe: 8 },
          { set: 2, weight: 45, reps: 8, rpe: 9 },
        ],
      },
    ],
  },
  workoutWeek: 6,
  visibleWeeks: [4, 5, 6],
  workoutTime: { log: '00:20', keypad: '00:25' },
  /** The keypad edits the reps of the last Bench Press set. */
  keypad: { set: 4, field: 'Reps', value: '5' },
  statistics: {
    workoutStats: [
      { label: 'Workout days', value: '14' },
      { label: 'Week streak', value: '6 weeks' },
      { label: 'Days per week', value: '2.3' },
    ],
    /** Trained weekdays (0 = Monday) for the last 16 weeks, oldest first. */
    heatmap: [
      [], [], [], [], [], [], [], [], [], [],
      [4, 5], [0, 4, 5], [0, 4, 5], [4, 5], [0, 4], [0, 2],
    ],
    todayColumn: 15,
    todayRow: 3,
    months: [
      { label: 'Jul', column: 0 }, { label: 'Aug', column: 2 },
      { label: 'Sep', column: 7 }, { label: 'Oct', column: 11 },
    ],
    ranges: ['4W', '12W', '6M', '1Y', 'All'],
    measures: ['Est. 1RM', 'Top weight', 'Best set', 'Volume'],
    lifts: [
      { name: 'Leg Press', value: '200 kg', change: '+26.67 kg', points: [173.3, 186.7, 200] },
      { name: 'Romanian Deadlift', value: '95 kg', change: '+12.67 kg', points: [82.3, 88.7, 95] },
      { name: 'Squat', value: '114 kg', change: '+12 kg', points: [102, 108, 114] },
      { name: 'Barbell Row', value: '88.67 kg', change: '+6.33 kg', points: [82.3, 85.5, 88.7] },
      { name: 'Bicep Curl', value: '22.4 kg', change: '+2.8 kg', points: [19.6, 22.4, 22.4] },
    ],
  },
  screenLabels: { plan: 'Home', log: 'Workout', progress: 'Statistics', keypad: 'Keypad' },
} as const;
