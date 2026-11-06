// Milestones from the OpenGym git history, oldest first. Screenshots are the ones
// committed to the app repo (public/history/), fitted to a 540 × 1200 viewport.
// Long web captures trim empty space below the journal. Each pair
// highlights the UI changed at that milestone. captureCommit identifies a later
// capture when the original screenshots had not caught up with the shipped UI.
// Stats are measured at that commit: commits = `git rev-list --count`, linesOfCode =
// lines of Dart under lib/, contributors = distinct people (several aliases are one person).
// Last checked: 2026-11-06 (OpenGym@ca88ab9).
export interface HistoryScreen {
  src: string;
  label: string;
  alt: string;
  captureCommit?: string;
}

export interface HistoryMilestone {
  date: string;
  version: string;
  commit: string;
  title: string;
  summary: string;
  commits: number;
  contributors: number;
  linesOfCode: number;
  screens?: readonly [HistoryScreen, HistoryScreen];
}

export const historyStart = '2026-03-29';
export const historyEnd = '2026-11-06';

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
    screens: [
      { src: '/history/2026-06-home.webp', label: 'Plan grid', alt: 'The original square workout plan grid with monospace labels' },
      { src: '/history/2026-06-settings.webp', label: 'Themes and accents', alt: 'Dark Settings with hot-pink controls and named accent colors' },
    ],
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
    screens: [
      { src: '/history/2026-08-home.webp', label: 'OpenGym branding', alt: 'The renamed OpenGym home screen and workout plans' },
      { src: '/history/2026-08-workout.webp', label: 'Workout log', alt: 'The workout log with updated icons and per-set training values' },
    ],
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
    screens: [
      { src: '/history/2026-09-keypad.webp', label: 'Set entry', alt: 'The custom number keypad in a set-editing sheet' },
      { src: '/history/2026-09-statistics.webp', label: 'Weekly statistics', alt: 'Weekly training volume bars and an exercise progress selector' },
    ],
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
    screens: [
      { src: '/history/2026-10a-home.webp', label: 'Next workout', alt: 'The rebuilt Home screen with a next-workout card and weekly activity' },
      { src: '/history/2026-10a-workout.webp', label: 'Training log', alt: 'The continuous workout log with aligned set rows' },
    ],
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
    screens: [
      { src: '/history/2026-10b-keypad.webp', label: 'Faster keypad', alt: 'Rectangular keypad keys with weight adjustments and a tall Next key' },
      { src: '/history/2026-10b-statistics.webp', label: 'Exercise progress', alt: 'An estimated one-rep-max trend with exercise, measure, and period selectors' },
    ],
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
    screens: [
      { src: '/history/2026-10c-block-menu.webp', label: 'Training blocks', alt: 'The training block menu for switching, creating, renaming, and reordering blocks' },
      { src: '/history/2026-10c-block-create.webp', label: 'Create a block', alt: 'The create-block dialog with a block name and week count' },
    ],
  },
  {
    date: '2026-10-30',
    version: 'v1.0.15',
    commit: 'ca70986',
    title: 'A clearer training journal',
    summary:
      'History becomes a workout timeline with exercise cards in session details. A redesigned preset browser, a cleaner session clock and compact block statistics make planning and reviewing training easier.',
    commits: 311,
    contributors: 2,
    linesOfCode: 48074,
    screens: [
      { src: '/history/2026-10d-history.webp', label: 'Workout timeline', alt: 'Workout history arranged as dated session cards with exercise summaries' },
      { src: '/history/2026-10d-workout.webp', label: 'Session controls', alt: 'The simplified workout header with its session clock and pause control' },
    ],
  },
  {
    date: '2026-11-04',
    version: 'v1.0.16',
    commit: '5318981',
    title: 'Focused statistics',
    summary:
      'Stats splits into Overview, Strength, Blocks and Records, led by weekly weight lifted and a selectable block trend. The main tabs now swipe sideways.',
    commits: 322,
    contributors: 2,
    linesOfCode: 49081,
    screens: [
      { src: '/history/2026-11-overview.webp', label: 'Weekly overview', alt: 'Focused Stats tabs with weekly weight lifted, workout totals, and a training calendar', captureCommit: '29ec45f' },
      { src: '/history/2026-11-blocks.webp', label: 'Block trends', alt: 'The Blocks view with a selectable training trend, weekly workload, and strength gains', captureCommit: '29ec45f' },
    ],
  },
  {
    date: '2026-11-05',
    version: 'v1.0.17',
    commit: '29ec45f',
    title: 'A journal you can pick up again',
    summary:
      'History becomes a ruled journal with monthly totals and exercise summaries. Home can resume the workout in progress, the selected tab gets an accent marker, and updates download quietly in the background.',
    commits: 335,
    contributors: 2,
    linesOfCode: 51699,
    screens: [
      { src: '/history/2026-11b-history.webp', label: 'Ruled workout journal', alt: 'The redesigned History journal with monthly totals, dated rows, exercise summaries, and PR markers' },
      { src: '/history/2026-11b-home.webp', label: 'Home and navigation', alt: 'Home with a next-workout card and an accent rule marking the selected bottom tab' },
    ],
  },
  {
    date: '2026-11-06',
    version: 'v1.0.19',
    commit: 'ca88ab9',
    title: 'Feedback for every session',
    summary:
      'Live record markers and shareable workout summaries celebrate progress. Offline fonts, a full seven-day Home strip, animated statistics and a five-day full-body preset refine everyday training.',
    commits: 351,
    contributors: 2,
    linesOfCode: 52497,
    screens: [
      { src: '/history/2026-11c-home.webp', label: 'Your training week', alt: 'Home with a populated seven-day workload strip and realistic workout plans', captureCommit: 'ca88ab9' },
      { src: '/history/2026-11c-workout.webp', label: 'Set-by-set context', alt: 'Workout logging with previous weights and reps, RPE values, and the labeled Finish action', captureCommit: 'ca88ab9' },
    ],
  },
];

// Dates of every published release tag, drawn as small ticks on the track.
export const historyReleaseDates = [
  '2026-08-23', '2026-08-24', '2026-08-25', '2026-08-29', '2026-09-04', '2026-09-05', '2026-09-07',
  '2026-09-09', '2026-09-11', '2026-10-02', '2026-10-07', '2026-10-14', '2026-10-29', '2026-10-30',
  '2026-11-03', '2026-11-05', '2026-11-06',
];
