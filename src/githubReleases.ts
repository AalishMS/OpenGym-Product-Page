import { config } from './config';
import { releases } from './releases';

export interface Release {
  version: string;
  date: string;
  title: string;
  changes: readonly string[];
  url: string;
  compare: string;
  apkUrl: string;
}

interface GitHubRelease {
  tag_name: string;
  name: string | null;
  published_at: string;
  html_url: string;
  body: string | null;
  draft: boolean;
  prerelease: boolean;
  assets: { name: string; browser_download_url: string; state: string }[];
}

export function mapGitHubRelease(release: GitHubRelease): Release {
  const saved = releases.find((item) => item.version === release.tag_name);
  // Display notes as plain text: never inject HTML from release bodies.
  const changes = (release.body ?? '').split('\n')
    .filter((line) => /^\s*[-*]\s+/.test(line))
    .map((line) => line.replace(/^\s*[-*]\s+/, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '').trim());
  const compare = release.body?.match(/https:\/\/github\.com\/AalishMS\/OpenGym\/(?:compare|commits)\/[^\s)]+/)?.[0];
  const apk = release.assets.find((asset) => asset.state === 'uploaded' && /\.apk$/i.test(asset.name));
  return {
    version: release.tag_name,
    date: release.published_at.slice(0, 10),
    title: saved?.title ?? release.name ?? release.tag_name,
    changes: saved?.changes ?? (changes.length ? changes : [config.releasePage.notesFallback]),
    url: release.html_url,
    compare: compare ?? release.html_url,
    apkUrl: apk?.browser_download_url ?? '',
  };
}

// Share a single request across React StrictMode's effect replays.
let request: Promise<Release[]> | undefined;
export function loadGitHubReleases(): Promise<Release[]> {
  request ??= (async () => {
    const options = { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(8000) };
    const responses = await Promise.all([
      fetch(`${config.releasePage.apiUrl}?per_page=100`, options),
      fetch(`${config.releasePage.apiUrl}/latest`, options),
    ]);
    if (responses.some((response) => !response.ok)) throw new Error('GitHub releases unavailable');
    const [history, latest] = await Promise.all(responses.map((response) => response.json())) as [GitHubRelease[], GitHubRelease];
    if (!Array.isArray(history) || !latest.tag_name || latest.draft || latest.prerelease) {
      throw new Error('No published stable release');
    }
    const published = history.filter((release) => !release.draft && !release.prerelease)
      .sort((a, b) => Date.parse(b.published_at) - Date.parse(a.published_at));
    // Honor GitHub's designated latest release rather than guessing from tag names.
    return [latest, ...published.filter((release) => release.tag_name !== latest.tag_name)].map(mapGitHubRelease);
  })();
  return request;
}
