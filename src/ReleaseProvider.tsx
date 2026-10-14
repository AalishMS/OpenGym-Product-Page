import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { configForReleases } from './config';
import { ReleaseContext } from './releaseContext';
import { releases as savedReleases } from './releases';
import { loadGitHubReleases } from './githubReleases';
import type { Release } from './githubReleases';

export function ReleaseProvider({ children }: { children: ReactNode }) {
  const [releases, setReleases] = useState<readonly Release[]>(savedReleases);
  const [synced, setSynced] = useState(false);
  useEffect(() => {
    let active = true;
    loadGitHubReleases().then((data) => {
      if (active) {
        setReleases(data);
        setSynced(true);
      }
    }).catch(() => { /* Keep the saved release snapshot and working download links. */ });
    return () => { active = false; };
  }, []);
  return <ReleaseContext.Provider value={{ releases, config: configForReleases(releases), synced }}>{children}</ReleaseContext.Provider>;
}


