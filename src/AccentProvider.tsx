import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { AccentContext, defaultAccent, type Accent } from './accentContext';
import { previewPalette } from './components/previewTone';

/**
 * Holds the accent chosen in the personalization section and writes the
 * solved tones onto <html>, so buttons, charts, glows and links across the
 * page follow the same color as the app previews.
 */
export function AccentProvider({ children }: { children: ReactNode }) {
  const [accent, setAccent] = useState<Accent>(defaultAccent);

  useEffect(() => {
    const dark = previewPalette(accent.seed, true);
    const light = previewPalette(accent.seed, false);
    const root = document.documentElement.style;
    root.setProperty('--color-accent', dark.ink);
    root.setProperty('--color-accent-dim', dark.dim);
    root.setProperty('--color-accent-muted', dark.muted);
    root.setProperty('--color-on-accent', dark.onFill);
    root.setProperty('--color-accent-ink-light', light.ink);
    root.setProperty('--color-accent-fill-light', light.fill);
    root.setProperty('--color-accent-muted-light', light.muted);
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0b0b0b');
  }, [accent]);

  const value = useMemo(() => ({ accent, setAccent }), [accent]);
  return <AccentContext.Provider value={value}>{children}</AccentContext.Provider>;
}
