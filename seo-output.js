const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = function finalizeSeo(urls) {
  const assets = ['assets/css/main.css', 'assets/css/catalogo.css', 'assets/js/main.js', 'assets/js/catalogo.js', 'assets/js/page-motion.js', 'assets/css/domain-panel.css', 'assets/js/domain-search.js', 'assets/css/service-sections.css', 'assets/css/desarrollo-web.css'];
  const versions = Object.fromEntries(assets.map(asset => [asset, crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, asset))).digest('hex').slice(0, 10)]));
  for (const url of urls) {
    const relative = new URL(url).pathname.replace(/^\//, '');
    const file = path.join(__dirname, relative, 'index.html');
    let html = fs.readFileSync(file, 'utf8');
    for (const [asset, version] of Object.entries(versions)) {
      const reference = new RegExp(asset.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '(?:\\?[^"\\s]*)?(?=")', 'g');
      html = html.replace(reference, `${asset}?v=${version}`);
    }
    if (!html.includes('assets/js/page-motion.js')) {
      const depth = relative.split('/').filter(Boolean).length;
      const prefix = depth ? '../'.repeat(depth) : './';
      html = html.replace('</head>', `<script src="${prefix}assets/js/page-motion.js?v=${versions['assets/js/page-motion.js']}" defer></script>\n</head>`);
    }
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
    const tags = [];
    for (const [property, content] of Object.entries({
      'og:title': title, 'og:description': description, 'og:type': 'website',
      'og:url': url, 'og:image': 'https://odiseacloud.com/assets/images/social-preview.jpg',
      'og:locale': 'es_PE', 'og:site_name': 'OdiseaCloud'
    })) {
      const tag = `<meta property="${property}" content="${content}">`;
      const existing = new RegExp(`<meta property="${property}" content="[^"]*">`);
      if (existing.test(html)) html = html.replace(existing, () => tag);
      else tags.push(tag);
    }
    // Replace generated Twitter metadata so repeated builds do not duplicate it.
    html = html.replace(/<meta\s+name="twitter:(?:card|title|description|image)"[^>]*>\r?\n?/g, '');
    const socialImage = html.match(/property="og:image" content="([^"]+)"/);
    tags.push('<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:title" content="${title}">`,
      `<meta name="twitter:description" content="${description}">`,
      `<meta name="twitter:image" content="${socialImage ? socialImage[1] : 'https://odiseacloud.com/assets/images/social-preview.jpg'}">`);
    html = html.replace('</head>', tags.join('\n') + '\n</head>');
    fs.writeFileSync(file, html);
  }
};
