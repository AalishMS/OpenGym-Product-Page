// Lucide outlines matching the icons selected by the Flutter widgets.
const paths = {
  plus: 'M12 5v14M5 12h14',
  back: 'm12 19-7-7 7-7M5 12h14',
  play: 'm6 3 15 9-15 9V3Z',
  stop: 'M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z',
  more: 'M5 12h.01M12 12h.01M19 12h.01',
  menu: 'M12 5v.01M12 12v.01M12 19v.01',
  clipboard:
    'M9 5H6a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-3M9 3h6v4H9V3ZM9 12h.01M13 12h3M9 17h.01M13 17h3',
  history: 'M3 3v5h5M3.1 8a9 9 0 1 1-.1 8M12 7v5l4 2',
  trend: 'm22 7-8.5 8.5-5-5L2 17M16 7h6v6',
  settings:
    'M3 6h2M9 6h12M3 18h12M19 18h2M9 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM19 18a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z',
  note: 'M9 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5M2 7h4M2 12h4M2 17h4m7-8 7-7a2 2 0 0 1 3 3l-7 7-4 1 1-4Z',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',
} as const;
export function MockIcon({ name }: { name: keyof typeof paths }) {
  return (
    <svg
      className={`replica-icon replica-icon--${name}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={name === 'more' || name === 'menu' ? 3.5 : 2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
