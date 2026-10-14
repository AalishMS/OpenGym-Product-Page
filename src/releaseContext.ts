import { createContext, useContext } from 'react';
import { configForReleases } from './config';
import { releases } from './releases';
import type { Release } from './githubReleases';

export const ReleaseContext = createContext({
  releases: releases as readonly Release[],
  config: configForReleases(releases),
  synced: false,
});

export const useReleaseData = () => useContext(ReleaseContext);
