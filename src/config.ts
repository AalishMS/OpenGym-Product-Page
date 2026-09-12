/**
 * Central configuration for the OpenGym product page.
 * All copy, URLs, and asset paths are managed here for easy updates.
 */

export const config = {
  brand: {
    name: 'OpenGym',
    wordmark: '> OpenGym',
    tagline: 'A training journal, brought to life.',
  },

  links: {
    // Direct link to the latest published APK file on GitHub Releases.
    download:
      'https://github.com/AalishMS/OpenGym/releases/download/v1.0.9%2B10/OpenGym-v1.0.9-10.apk',
    // Latest GitHub release page.
    latestRelease:
      'https://github.com/AalishMS/OpenGym/releases/tag/v1.0.9%2B10',
    repository: 'https://github.com/AalishMS/OpenGym',
  },

  meta: {
    title: '> OpenGym — Make every set count.',
    description:
      'Sign in on first launch, then plan workouts, log lifts, and review local-first training data offline.',
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
          { set: 1, weight: 50, reps: 8, rpe: 7 },
          { set: 2, weight: 50, reps: 8, rpe: 8 },
          { set: 3, weight: 50, reps: 6, rpe: 9 },
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
      a: 'OpenGym is an open-source project. The source code is available on GitHub.',
    },
  ],
} as const;

/** Content transcribed from public/screenshots; order intentionally matches each capture. */
export const mockupData = {
  plans: {
    full: {
      name: 'Full Body',
      count: 6,
      recent: 'Never trained',
      exercises: ['Squat', 'Bench Press', 'Deadlift'],
      color: ['#00771a', '#57b45a'],
      footer: '6 EXERCISES',
    },
    pull: {
      name: 'Pull Day',
      count: 7,
      recent: 'Last trained 3d ago',
      exercises: ['Deadlift', 'Barbell Row', 'Lat Pulldown'],
      color: ['#b7421c', '#f47755'],
      footer: '3D AGO   ·  15 SESSIONS  ·  7 EXERCISES',
    },
    push: {
      name: 'Push Day',
      count: 6,
      recent: 'Last trained 6d ago',
      exercises: ['Bench Press', 'Incline Dumbbell Press', 'Overhead Press'],
      color: ['#b2336c', '#e96c9f'],
      footer: '6D AGO   ·  15 SESSIONS  ·  6 EXERCISES',
    },
    legs: {
      name: 'Leg Day',
      count: 7,
      recent: 'Last trained yesterday',
      exercises: ['Squat', 'Romanian Deadlift', 'Leg Press'],
      color: ['#995a00', '#da9200'],
      footer: 'YESTERDAY  ·  12 SESSIONS  ·  7 EXERCISES',
    },
    upper: {
      name: 'Upper Body',
      count: 6,
      recent: 'Never trained',
      exercises: ['Bench Press', 'Barbell Row', 'Overhead Press'],
      color: ['#657000', '#a9b000'],
      footer: '6 EXERCISES',
    },
  },
  planOrder: {
    light: ['full', 'pull', 'full', 'push', 'legs', 'full', 'upper', 'pull'],
    dark: ['full', 'full', 'push', 'pull', 'push', 'upper', 'pull', 'legs'],
  },
  workout: [
    { name: 'Squat', weight: 95, reps: 6 },
    { name: 'Bench Press', weight: 70, reps: 8 },
    { name: 'Deadlift', weight: 120, reps: 5 },
  ],
} as const;
