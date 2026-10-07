// Lucide outlines matching the icons selected by the Flutter widgets.
const paths = {
  home: 'm3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-8H9v8H4a1 1 0 0 1-1-1V10Z',
  check: 'm4 12 5 5L20 6',
  chevron: 'm6 9 6 6 6-6',
  layers: 'm12 3 9 7-9 7-9-7 9-7Zm-9 12 9 7 9-7',
  delete: 'M9 4h12v16H9L2 12l7-8Zm3 5 6 6m0-6-6 6',
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
  close: 'M18 6 6 18M6 6l12 12',
  copy: 'M10 8h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2ZM4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2',
  keyboard: 'M4 4h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2ZM6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h8M9 20l3 2 3-2',
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
