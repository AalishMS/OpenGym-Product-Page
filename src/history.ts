// Milestones from the OpenGym git history, oldest first. Screenshots are the ones
// committed to the app repo at each point (public/history/), resized to 540px wide.
// Stats are measured at that commit: commits = `git rev-list --count`, linesOfCode =
// lines of Dart under lib/, contributors = distinct people (several aliases are one person).
// Last checked: 2026-10-30 (OpenGym@782dcd8).
export interface HistoryMilestone {
  date: string;
  version: string;
  commit: string;
  title: string;
  summary: string;
  commits: number;
  contributors: number;
  linesOfCode: number;
  screens?: { home: string; workout: string };
}

export const historyStart = '2026-03-29';
export const historyEnd = '2026-10-29';

export const historyMilestones: HistoryMilestone[] = [
  {
    date: '2026-03-29',
    version: 'v1.0.0',
    commit: '67e95f2',
    title: 'First commit',
    summary:
      'A Flutter gym tracker built on Provider and Hive. The screenshots from that week came out blank, so day zero survives only as code.',
    commits: 1,
    contributors: 1,
    linesOfCode: 5326,
  },
  {
    date: '2026-06-11',
    version: 'v1.0.0',
    commit: 'b790a03',
    title: 'Terminal brutalism',
    summary:
      'Square cards, monospace labels and a hot-pink accent. Light and dark themes, custom accent colors and a repository layer arrive.',
    commits: 18,
    contributors: 1,
    linesOfCode: 8074,
    screens: { home: '/history/2026-06-home.webp', workout: '/history/2026-06-workout.webp' },
  },
  {
    date: '2026-08-24',
    version: 'v1.0.2',
    commit: '82932de',
    title: 'It becomes OpenGym',
    summary:
      'A new name and launcher icon, in-app updates from GitHub Releases, per-set targets on plans and the Lucide icon set.',
    commits: 67,
    contributors: 1,
    linesOfCode: 13916,
    screens: { home: '/history/2026-08-home.webp', workout: '/history/2026-08-workout.webp' },
  },
  {
    date: '2026-09-07',
    version: 'v1.0.7',
    commit: 'df69312',
    title: 'Splits and a keypad',
    summary:
      'Split workspaces, bundled presets, a workout timer, a four-column set table with its own keypad and a redesigned Statistics screen.',
    commits: 115,
    contributors: 1,
    linesOfCode: 24053,
    screens: { home: '/history/2026-09-home.webp', workout: '/history/2026-09-workout.webp' },
  },
  {
    date: '2026-10-02',
    version: 'v1.0.9',
    commit: '065b293',
    title: 'Home, rebuilt',
    summary:
      'Home is redesigned around the next workout and the week so far, with a guided first-use tour and a larger exercise library. A second contributor joins.',
    commits: 171,
    contributors: 2,
    linesOfCode: 29076,
    screens: { home: '/history/2026-10a-home.webp', workout: '/history/2026-10a-workout.webp' },
  },
  {
    date: '2026-10-07',
    version: 'v1.0.11',
    commit: '2dbc46d',
    title: 'Faster logging',
    summary:
      'A rectangular keypad with a tall Next key, fluid swipes between plans and an activity heatmap on Statistics.',
    commits: 201,
    contributors: 2,
    linesOfCode: 30221,
    screens: { home: '/history/2026-10b-home.webp', workout: '/history/2026-10b-workout.webp' },
  },
  {
    date: '2026-10-29',
    version: 'v1.0.14',
    commit: '782dcd8',
    title: 'Training blocks',
    summary:
      'Durable training blocks with week navigation and block statistics, RPE targets on plans and the optional AI Coach.',
    commits: 296,
    contributors: 2,
    linesOfCode: 46939,
    screens: { home: '/history/2026-10c-home.webp', workout: '/history/2026-10c-workout.webp' },
  },
];

// Dates of every published release tag, drawn as small ticks on the track.
export const historyReleaseDates = [
  '2026-08-23', '2026-08-24', '2026-08-25', '2026-08-29', '2026-09-04', '2026-09-05', '2026-09-07',
  '2026-09-09', '2026-09-11', '2026-10-02', '2026-10-07', '2026-10-14', '2026-10-29',
];
