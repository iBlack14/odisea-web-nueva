const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const urls = [...fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const errors = [], titles = new Set(), descriptions = new Set();
const check = (ok, message) => { if (!ok) errors.push(message); };
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = path.join(root, pathname, 'index.html');
  if (!fs.existsSync(file)) { errors.push('Missing page: ' + url); continue; }
  const html = fs.readFileSync(file, 'utf8');
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  check(title && !titles.has(title), 'Missing/duplicate title: ' + url); titles.add(title);
  check(description && !descriptions.has(description), 'Missing/duplicate description: ' + url); descriptions.add(description);
  check((html.match(/<h1\b/g) || []).length === 1, 'H1 count: ' + url);
  check(html.includes(`rel="canonical" href="${url}"`), 'Canonical: ' + url);
  check(!/<meta[^>]+name="robots"[^>]+noindex/i.test(html), 'Noindex: ' + url);
  check(html.includes('<html lang="es">'), 'Language: ' + url);
  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(m[1]); } catch { errors.push('Invalid JSON-LD: ' + url); }
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    check(/\balt="[^"]*"/.test(m[0]), 'Image alt: ' + url);
    check(/\bwidth="\d+"/.test(m[0]) && /\bheight="\d+"/.test(m[0]), 'Image dimensions: ' + url);
  }
  for (const m of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const value = m[1];
    if (/^(?:https?:|mailto:|tel:|data:|#)/.test(value)) continue;
    const target = new URL(value, url);
    let local = path.join(root, decodeURIComponent(target.pathname));
    if (fs.existsSync(local) && fs.statSync(local).isDirectory()) local = path.join(local, 'index.html');
    check(fs.existsSync(local), 'Missing link/asset: ' + url + ' -> ' + value);
    if (target.hash && local.endsWith('.html') && fs.existsSync(local)) {
      const dest = fs.readFileSync(local, 'utf8');
      check(dest.includes(`id="${decodeURIComponent(target.hash.slice(1))}"`), 'Missing anchor: ' + url + ' -> ' + value);
    }
  }
}
console.log(JSON.stringify({ pages: urls.length, errors }, null, 2));
if (errors.length) process.exitCode = 1;
