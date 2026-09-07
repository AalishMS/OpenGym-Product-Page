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
    // GitHub Releases — the app self-updates from here.
    // The download action points to the latest release page so the visitor
    // can pick the APK themselves. If a direct APK link is preferred later,
    // change this to the `/releases/latest/download/OpenGym-vX.Y.Z-N.apk` URL.
    download: 'https://github.com/AalishMS/OpenGym/releases/latest',
    repository: 'https://github.com/AalishMS/OpenGym',
  },

  meta: {
    title: '> OpenGym — Make every set count.',
    description:
      'Plan your workouts, log your lifts, and see your progress — with tracking that works offline.',
    ogImage: '/og-image.png',
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
      a: 'Yes. All workout data is stored locally on your device. You can create plans, log workouts, and review your history entirely offline. When you sign in, your data syncs across devices automatically.',
    },
    {
      q: 'How does syncing work?',
      a: 'When you create an account and sign in, OpenGym syncs your workout plans and sessions across devices using a last-write-wins approach. If you make changes offline, they sync automatically when connectivity returns.',
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
