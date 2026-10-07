/**
 * Central configuration for the OpenGym product page.
 * All copy, URLs, and asset paths are managed here for easy updates.
 */

import { releases } from './releases';

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
    checkedAt: 'October 7, 2026',
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
    { name: 'Electric Blue', seed: '#00A8FF' },
    { name: 'Warm Amber', seed: '#FF9500' },
    { name: 'Deep Orange', seed: '#FF5722' },
    { name: 'Hot Pink', seed: '#FF1493' },
    { name: 'Cyan', seed: '#00CED1' },
    { name: 'Purple', seed: '#8B5CF6' },
    { name: 'Steel Gray', seed: '#7C8AA0' },
    { name: 'Green', seed: '#22C55E' },
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
        'Build your own split or pick a bundled program. Keep your exercises, target sets, and notes ready for your next session.',
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

/** Sample content mirroring the OpenGym screenshots at mobile app commit 2dbc46d. */
export const mockupData = {
  labels: {
    home: 'Home', history: 'History', stats: 'Stats', settings: 'Settings',
    split: 'Powerbuilding PPLUL…', next: 'Next up', lastTrained: 'Last: yesterday',
    startWorkout: 'Start workout', nextBadge: 'Next',
    thisWeek: 'This week', weeklySummary: '2 workouts · 40 sets',
    yourPlans: 'Your plans', manage: 'Manage',
    set: 'Set', previous: 'Previous', kg: 'Kg', reps: 'Reps', rpe: 'RPE',
    start: 'Start', addSet: 'Add set', week: 'Week', nextField: 'Next',
    weightField: 'Weight (kg)', copyTo: 'Copy to set 2',
    statistics: 'Statistics', weeklyTraining: 'Weekly training',
    volumeLoad: 'Volume load', volumeSubtitle: 'Weight × reps · All history',
    exercise: 'Exercise', allExercises: 'All exercises',
    inProgress: 'This week · In progress', volumeAxis: 'Volume (kg)',
    activity: 'Activity', workouts: 'Workouts', workoutsSubtitle: 'Days you trained · Last 52 weeks',
    legendWorkout: 'Workout', legendToday: 'Today',
    exerciseProgress: 'Exercise progress', progressExercise: 'Leg Press',
    metric: 'Metric', progressMetric: 'Estimated 1RM', period: 'Period', progressPeriod: '12 weeks',
    latest: 'Latest', change: 'Change', bestInPeriod: 'Best in period',
    perWorkout: 'Per workout', progressUnit: 'kg',
  },
  nextWorkout: {
    name: 'Leg Day',
    groups: ['Legs'],
    summary: 'Day 3 of 5 · 7 exercises · 23 sets',
    dayIndex: 2,
  },
  /** One entry per weekday; `sets` drives the bar height, as in the app. */
  activity: [
    { day: 'M', sets: 18 }, { day: 'T', sets: 22 },
    { day: 'W', sets: 0, today: true },
    { day: 'T', sets: 0 }, { day: 'F', sets: 0 },
    { day: 'S', sets: 0 }, { day: 'S', sets: 0 },
  ],
  plans: [
    { name: 'Push Day', initials: 'PD', summary: '6 exercises · 18 sets', color: ['#b2336c', '#e96c9f'] },
    { name: 'Pull Day', initials: 'PD', summary: '7 exercises · 22 sets', color: ['#b7421c', '#f47755'] },
    { name: 'Leg Day', initials: 'LD', summary: '7 exercises · 23 sets', color: ['#995a00', '#da9200'] },
    { name: 'Upper Body', initials: 'UB', summary: '6 exercises · 20 sets', color: ['#657000', '#a9b000'] },
    { name: 'Lower Body', initials: 'LB', summary: '6 exercises · 19 sets', color: ['#00771a', '#57b45a'] },
  ],
  workout: config.sampleWorkout,
  workoutWeek: 6,
  workoutTime: '00:00',
  keypad: { set: 1, nextSet: 2, weight: 100 },
  statistics: {
    volume: '18,642 kg',
    period: 'W41 · 2026 · 5 Oct 2026 – 11 Oct 2026',
    axisMax: 80,
    weeks: [
      { week: 'W36', volume: 26.9 }, { week: 'W37', volume: 30.1 },
      { week: 'W38', volume: 14.0 }, { week: 'W39', volume: 28.8 },
      { week: 'W40', volume: 24.3 }, { week: 'W41', volume: 18.6 },
    ],
    /** Trained weekdays (0 = Monday) for the last 15 weeks, oldest first. */
    heatmap: [
      [0, 1, 3, 4], [0, 2, 3, 5], [0, 1, 3, 4], [1, 2, 4, 5], [0, 1, 3, 4],
      [0, 2, 4], [0, 1, 3, 4], [0, 1, 2, 4], [1, 3, 4, 5], [0, 1, 3, 4],
      [0, 2, 3, 4], [0, 1, 3], [0, 1, 3, 4], [0, 2, 3, 5], [0, 1],
    ],
    todayColumn: 14,
    todayRow: 2,
    progress: {
      latest: '200 kg', change: '+40 kg', best: '200 kg',
      min: 150, max: 225, step: 25,
      points: [
        { label: '10 Sep', value: 160 }, { label: '17 Sep', value: 173 },
        { label: '24 Sep', value: 187 }, { label: '1 Oct', value: 200 },
      ],
    },
  },
  screenLabels: { plan: 'Home', log: 'Workout', progress: 'Statistics', keypad: 'Keypad' },
} as const;
