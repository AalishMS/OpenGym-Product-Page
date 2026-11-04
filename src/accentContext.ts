import { createContext, useContext } from 'react';
import { config } from './config';

export type Accent = (typeof config.appAccents)[number];

export const defaultAccent: Accent = config.appAccents[4];

export const AccentContext = createContext<{ accent: Accent; setAccent: (accent: Accent) => void }>({
  accent: defaultAccent,
  setAccent: () => {},
});

export const useAccent = () => useContext(AccentContext);
