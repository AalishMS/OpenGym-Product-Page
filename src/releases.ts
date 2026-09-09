// Summarized from published GitHub releases and their linked commit comparisons.
// Last checked: 2026-09-09. Add new releases here, newest first.
export const releases = [
  {
    version: 'v1.0.8+9',
    date: '2026-09-09',
    title: 'Faster set entry, without breaking your flow.',
    changes: [
      'Redesigned active-workout set entry with compact rows and a responsive number keypad.',
      'Added direct RPE entry alongside quick weight and rep adjustments.',
      'Made set removal immediate and reliable, including when deleting the final set.',
      'Improved empty-plan screens with clearer ways to create a plan or choose a bundled split.',
    ],
    url: 'https://github.com/AalishMS/OpenGym/releases/tag/v1.0.8%2B9',
    compare: 'https://github.com/AalishMS/OpenGym/compare/v1.0.7+8...v1.0.8+9',
  },
  {
    version: 'v1.0.7+8',
    date: '2026-09-06',
    title: 'More ways to start. More freedom to train.',
    changes: [
      'Added bundled workout programs to help you set up a complete training routine.',
      'Added an Android workout timer notification.',
      'Fixed the timer notification so its stop action opens the workout.',
    ],
    url: 'https://github.com/AalishMS/OpenGym/releases/tag/v1.0.7%2B8',
    compare: 'https://github.com/AalishMS/OpenGym/compare/v1.0.6+7...v1.0.7+8',
  },
  {
    version: 'v1.0.6+7',
    date: '2026-09-05',
    title: 'A smoother session, a clearer picture.',
    changes: [
      'Introduced four-column set logging with a custom keypad and a refined edit-set sheet.',
      'Added draft workouts and a session timer.',
      'New week-one workouts prefill from your plan.',
      'Redesigned statistics with more readable training charts.',
      'Fixed workout swipes, header layout, chart labels, and volume units.',
    ],
    url: 'https://github.com/AalishMS/OpenGym/releases/tag/v1.0.6%2B7',
    compare: 'https://github.com/AalishMS/OpenGym/compare/v1.0.5+6...v1.0.6+7',
  },
  {
    version: 'v1.0.5+6',
    date: '2026-09-04',
    title: 'A workspace that feels like yours.',
    changes: [
      'Added training split workspaces and controls.',
      'Improved the exercise picker and home-screen hierarchy.',
      'Used plan colors as identity markers and refined action-button styling.',
      'Made light mode with a cyan accent the default for new installs.',
    ],
    url: 'https://github.com/AalishMS/OpenGym/releases/tag/v1.0.5%2B6',
    compare: 'https://github.com/AalishMS/OpenGym/compare/v1.0.4+5...v1.0.5+6',
  },
  {
    version: 'v1.0.4+5',
    date: '2026-08-29',
    title: 'Small refinements for your plans.',
    changes: ['Polished workout plan controls.'],
    url: 'https://github.com/AalishMS/OpenGym/releases/tag/v1.0.4%2B5',
    compare: 'https://github.com/AalishMS/OpenGym/compare/v1.0.3+4...v1.0.4+5',
  },
  {
    version: 'v1.0.3+4',
    date: '2026-08-24',
    title: 'Color with clarity.',
    changes: [
      'Introduced a derived color system with separate tones for text and filled controls.',
      'Improved dark card separation while keeping the background neutral.',
      'Kept plan-color details on the home screen.',
    ],
    url: 'https://github.com/AalishMS/OpenGym/releases/tag/v1.0.3%2B4',
    compare: 'https://github.com/AalishMS/OpenGym/compare/v1.0.2+3...v1.0.3+4',
  },
  {
    version: 'v1.0.2+3',
    date: '2026-08-24',
    title: 'Meet OpenGym.',
    changes: [
      'Renamed the app to OpenGym.',
      'Added an adaptive Android launcher icon.',
    ],
    url: 'https://github.com/AalishMS/OpenGym/releases/tag/v1.0.2%2B3',
    compare: 'https://github.com/AalishMS/OpenGym/compare/v1.0.1+2...v1.0.2+3',
  },
  {
    version: 'v1.0.1+2',
    date: '2026-08-23',
    title: 'The first published release.',
    changes: [
      'Added optional account-based sync.',
      'Improved the interface and workout experience.',
      'Added in-app updates distributed through GitHub Releases.',
    ],
    url: 'https://github.com/AalishMS/OpenGym/releases/tag/v1.0.1%2B2',
    compare: 'https://github.com/AalishMS/OpenGym/commits/v1.0.1+2',
  },
] as const;
