import { useEffect, useState } from 'react';
import { releases } from '../releases';
import { config } from '../config';
import './Releases.css';

export function Releases() {
  const [query, setQuery] = useState('');
  const filtered = releases.filter((release) =>
    [release.version, release.title, ...release.changes]
      .join(' ')
      .toLowerCase()
      .includes(query.toLowerCase().trim()),
  );

  useEffect(() => {
    document.title = 'Releases · OpenGym';
    return () => {
      document.title = config.meta.title;
    };
  }, []);

  return (
    <section className="releases-page container">
      <a className="release-back" href="#">
        ← Back to OpenGym
      </a>
      <div className="releases-intro">
        <div>
          <p className="eyebrow">BUILT IN THE OPEN</p>
          <h1>
            A little better.
            <br />
            Every release.
          </h1>
          <p>
            New features, thoughtful refinements, and the fixes that keep your
            training moving.
          </p>
        </div>
        <a
          href={config.links.download}
          className="btn btn-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download APK (v1.0.9+10) ↗
        </a>
      </div>
      <div className="release-toolbar">
        <label htmlFor="release-search">Release history</label>
        <input
          id="release-search"
          type="search"
          placeholder="Search versions or changes…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <p className="release-source">
        Summarized from GitHub releases and commits · Checked September 12, 2026.{' '}
        <a
          href={`${config.links.repository}/releases`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Check GitHub for newer releases ↗
        </a>
      </p>
      <div aria-live="polite" className="sr-only">
        {filtered.length} releases found
      </div>
      <div className="release-list">
        {filtered.map((release) => (
          <article
            className="release-entry"
            key={release.version}
            id={release.version}
          >
            <div className="release-meta">
              <span className="release-version">{release.version}</span>
              {release === releases[0] && (
                <span className="release-badge">Latest listed</span>
              )}
              <time dateTime={release.date}>
                {new Date(`${release.date}T12:00:00Z`).toLocaleDateString(
                  'en-US',
                  {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    timeZone: 'UTC',
                  },
                )}
              </time>
            </div>
            <div className="release-body">
              <h2>{release.title}</h2>
              <ul>
                {release.changes.map((change) => (
                  <li key={change}>{change}</li>
                ))}
              </ul>
              <div className="release-links">
                <a
                  href={release.apkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Download APK ↗
                </a>
                <a href={release.url} target="_blank" rel="noopener noreferrer">
                  View release ↗
                </a>
                <a
                  href={release.compare}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Full changelog ↗
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="release-empty">
          <h2>No matching releases</h2>
          <p>Try a version number or a feature such as timer.</p>
          <button className="btn btn-secondary" onClick={() => setQuery('')}>
            Clear search
          </button>
        </div>
      )}
    </section>
  );
}
