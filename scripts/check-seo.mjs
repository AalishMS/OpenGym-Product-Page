import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const read = (path) => readFile(resolve('dist', path), 'utf8');
const sitemap = await read('sitemap.xml');
const robots = await read('robots.txt');
const guide = await read('llms.txt');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => new URL(match[1]));
assert.equal(urls.length, 2, 'Sitemap must cover both public pages');
assert.match(robots, /User-agent: OAI-SearchBot[\s\S]*?Allow: \//);
assert.match(robots, /User-agent: Claude-SearchBot[\s\S]*?Allow: \//);
assert.match(robots, /User-agent: Claude-User[\s\S]*?Allow: \//);
assert.match(guide, /first launch|first sign-in|initial online sign-in/);

const titles = new Set();
for (const url of urls) {
  const html = await read(`.${url.pathname}index.html`);
  const body = html.split('<body>')[1];
  const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
  assert.ok(title, `${url.pathname}: title`);
  titles.add(title);
  assert.equal((html.match(/<h1[\s>]/g) ?? []).length, 1, `${url.pathname}: single H1`);
  assert.ok(body.includes('<main'), `${url.pathname}: pre-rendered main content`);
  assert.ok(!html.includes('<!--app-html-->'), `${url.pathname}: outlet replaced`);
  assert.ok(html.includes(`<link rel="canonical" href="${url.href}"`), 'Canonical matches sitemap');
  assert.ok(html.includes(`property="og:url" content="${url.href}"`), 'Social URL matches canonical');
  assert.match(html, /name="robots" content="index, follow/);
  assert.match(html, /name="description" content="[^"]{50,}"/);
  const data = JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);
  assert.equal(data['@context'], 'https://schema.org');
  const app = data['@graph'].find((item) => item['@type'].includes('SoftwareApplication'));
  assert.equal(app.offers.price, '0');
  assert.equal(app.operatingSystem, 'Android');
  // Every local link and resource must exist in the published directory.
  for (const [, value] of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const target = new URL(value.replaceAll('&amp;', '&'), url);
    if (target.origin !== url.origin) continue;
    const pathname = target.pathname.endsWith('/') ? `${target.pathname}index.html` : target.pathname;
    await access(resolve('dist', `.${pathname}`));
    if (target.hash) {
      const destination = target.pathname === url.pathname ? html : await read(`.${pathname}`);
      assert.ok(destination.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), `Broken fragment: ${value}`);
    }
  }
  const faq = data['@graph'].find((item) => item['@type'] === 'FAQPage');
  if (url.pathname === '/') {
    assert.ok(faq.mainEntity.length >= 6);
    assert.equal((body.match(/<details\b/g) ?? []).length, faq.mainEntity.length);
    for (const question of faq.mainEntity) {
      const escape = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#x27;');
      assert.ok(body.includes(escape(question.name)), 'FAQ question present without JavaScript');
      assert.ok(body.includes(escape(question.acceptedAnswer.text)), 'FAQ answer matches schema without JavaScript');
    }
  } else {
    assert.equal(faq, undefined, 'Release page must not claim homepage FAQs');
    const list = data['@graph'].find((item) => item['@type'] === 'ItemList');
    assert.equal((body.match(/class="release-entry"/g) ?? []).length, list.numberOfItems);
  }
}
assert.equal(titles.size, urls.length, 'Public pages need distinct titles');
console.log('SEO checks passed: static content, metadata, schema, FAQ parity, sitemap, crawler access, and internal links.');
