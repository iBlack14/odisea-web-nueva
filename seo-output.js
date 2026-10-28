const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

module.exports = function finalizeSeo(urls) {
  const cssVersion = crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, 'assets/css/main.css'))).digest('hex').slice(0, 10);
  for (const url of urls) {
    const relative = new URL(url).pathname.replace(/^\//, '');
    const file = path.join(__dirname, relative, 'index.html');
    let html = fs.readFileSync(file, 'utf8');
    html = html.replaceAll('assets/css/main.css"', `assets/css/main.css?v=${cssVersion}"`);
    const title = html.match(/<title>(.*?)<\/title>/)[1];
    const description = html.match(/<meta name="description" content="([^"]*)"/)[1];
    const tags = [];
    for (const [property, content] of Object.entries({
      'og:title': title, 'og:description': description, 'og:type': 'website',
      'og:url': url, 'og:image': 'https://odiseacloud.com/assets/images/social-preview.jpg',
      'og:locale': 'es_PE', 'og:site_name': 'OdiseaCloud'
    })) {
      if (!html.includes(`property="${property}"`)) tags.push(`<meta property="${property}" content="${content}">`);
    }
    const socialImage = html.match(/property="og:image" content="([^"]+)"/);
    tags.push('<meta name="twitter:card" content="summary_large_image">',
      `<meta name="twitter:title" content="${title}">`,
      `<meta name="twitter:description" content="${description}">`,
      `<meta name="twitter:image" content="${socialImage ? socialImage[1] : 'https://odiseacloud.com/assets/images/social-preview.jpg'}">`);
    html = html.replace('</head>', tags.join('\n') + '\n</head>');
    fs.writeFileSync(file, html);
  }
};
