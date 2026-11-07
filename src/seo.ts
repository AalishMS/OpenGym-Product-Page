import { config } from './config.ts';
import { releases } from './releases.ts';

export const pagePaths = ['/', '/releases/'] as const;
export type PagePath = typeof pagePaths[number];

export const isReleasesPath = (path: string) => /^\/releases\/?$/.test(path);
const absolute = (path: string) => new URL(path, config.meta.siteUrl).href;
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
})[character]!);

export function renderSeo(path: PagePath) {
  const releasePage = isReleasesPath(path);
  const title = releasePage ? config.meta.releasesTitle : config.meta.title;
  const description = releasePage ? config.meta.releasesDescription : config.meta.description;
  const url = absolute(path);
  const siteId = absolute('/#website');
  const appId = absolute('/#application');
  const pageId = `${url}#webpage`;
  const graph = [
    {
      '@type': 'WebSite', '@id': siteId, url: absolute('/'),
      name: config.brand.name, inLanguage: 'en',
    },
    {
      '@type': releasePage ? 'CollectionPage' : 'WebPage', '@id': pageId,
      url, name: title, description, inLanguage: 'en',
      isPartOf: { '@id': siteId }, about: { '@id': appId },
      ...(releasePage ? {} : { hasPart: { '@id': absolute('/#faq') } }),
    },
    {
      '@type': ['SoftwareApplication', 'MobileApplication'], '@id': appId,
      name: config.brand.name, url: absolute('/'), description: config.meta.description,
      operatingSystem: 'Android', applicationCategory: 'HealthApplication',
      softwareVersion: releases[0].version, dateModified: releases[0].date,
      downloadUrl: config.links.download, installUrl: absolute('/#installation'),
      image: absolute(config.meta.ogImage),
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', url: absolute('/#installation') },
      featureList: config.meta.features,
      sameAs: [config.links.repository],
    },
    ...(releasePage ? [{
      '@type': 'ItemList', '@id': `${url}#release-list`, name: 'OpenGym release history',
      numberOfItems: releases.length,
      itemListElement: releases.map((release, index) => ({
        '@type': 'ListItem', position: index + 1, name: `${release.version}: ${release.title}`,
        url: `${url}#${release.version}`,
      })),
    }] : [{
      '@type': 'FAQPage', '@id': absolute('/#faq'), isPartOf: { '@id': pageId },
      mainEntity: config.faq.map(({ q, a }) => ({
        '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a },
      })),
    }]),
  ];
  const meta = (name: string, content: string, property = false) =>
    `<meta ${property ? 'property' : 'name'}="${name}" content="${escapeHtml(content)}" />`;
  return [
    `<title>${escapeHtml(title)}</title>`,
    `<link rel="canonical" href="${escapeHtml(url)}" />`,
    meta('description', description),
    meta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'),
    meta('theme-color', config.meta.themeColor),
    meta('og:type', 'website', true), meta('og:locale', 'en_US', true),
    meta('og:url', url, true), meta('og:site_name', config.brand.name, true),
    meta('og:title', title, true), meta('og:description', description, true),
    meta('og:image', absolute(config.meta.ogImage), true),
    meta('og:image:type', 'image/png', true), meta('og:image:width', '1200', true),
    meta('og:image:height', '630', true), meta('og:image:alt', config.meta.ogImageAlt, true),
    meta('twitter:card', 'summary_large_image'), meta('twitter:title', title),
    meta('twitter:description', description), meta('twitter:image', absolute(config.meta.ogImage)),
    meta('twitter:image:alt', config.meta.ogImageAlt),
    `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`,
  ].join('\n    ');
}

export function crawlAssets() {
  return {
    'robots.txt': [
      '# Public pages are available to search engines and AI search crawlers.',
      'User-agent: *', 'Allow: /', '',
      'User-agent: OAI-SearchBot', 'User-agent: ChatGPT-User', 'Allow: /', '',
      'User-agent: Claude-SearchBot', 'User-agent: Claude-User', 'Allow: /', '',
      `Sitemap: ${absolute('/sitemap.xml')}`, '',
    ].join('\n'),
    // Omit lastmod rather than suggesting a release date is a page modification date.
    'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pagePaths.map((path) => `  <url><loc>${escapeHtml(absolute(path))}</loc></url>`).join('\n')}\n</urlset>\n`,
    // An optional reading guide; this is not a search engine ranking directive.
    'llms.txt': [
      `# ${config.brand.name}`, '', `> ${config.meta.description}`, '',
      '## Product facts', '', ...config.meta.features.map((feature) => `- ${feature}`), '',
      config.hero.signInNote, '',
      '## Official sources', '',
      `- [Product and installation](${absolute('/')}): Features, interactive previews, APK installation steps, and FAQ.`,
      `- [Release history](${absolute('/releases/')}): Published versions and changes.`,
      `- [Source code](${config.links.repository}): The Android app repository.`,
      `- [Latest published release](${config.links.repository}/releases/latest): Current APK downloads and release notes.`, '',
      '## Questions and answers', '',
      ...config.faq.flatMap(({ q, a }) => [`### ${q}`, '', a, '']),
    ].join('\n'),
  };
}
