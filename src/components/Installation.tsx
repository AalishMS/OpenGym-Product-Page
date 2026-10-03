import { config } from '../config';
import { releases } from '../releases';
import './Installation.css';

export function Installation() {
  return (
    <section id="installation" className="installation-section" aria-labelledby="installation-title">
      <div className="container">
        <div className="installation-header">
          <div>
            <p className="eyebrow">{config.installation.eyebrow}</p>
            <h2 id="installation-title">{config.installation.title}</h2>
            <p className="installation-description">{config.installation.description}</p>
          </div>
          <div className="installation-actions">
            <a className="btn btn-primary" href={config.links.download} target="_blank" rel="noopener noreferrer">
              {config.hero.downloadLabel}
            </a>
            <span className="installation-version">{config.hero.versionLabel} · {releases[0].version}</span>
            <a className="installation-release-link" href={config.links.latestRelease} target="_blank" rel="noopener noreferrer">
              {config.installation.releaseLabel} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
        <ol className="installation-steps" role="list">
          {config.installation.steps.map((step, index) => (
            <li key={step.title}>
              <span className="installation-step-number" aria-hidden="true">{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
