const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const organizeService = require('./service-hierarchy');

module.exports = function finalizeSeo(urls) {
  const assets = ['assets/css/main.css', 'assets/css/catalogo.css', 'assets/js/main.js', 'assets/js/catalogo.js', 'assets/js/page-motion.js', 'assets/css/domain-panel.css', 'assets/js/domain-search.js', 'assets/css/service-sections.css', 'assets/css/service-pricing.css', 'assets/css/desarrollo-web.css', 'assets/css/sistemas-web.css', 'assets/js/sistemas-web.js', 'assets/js/floating-contact.js'];
  assets.push('assets/js/about-slider.js');
  assets.push('assets/css/card-motion.css');
  assets.push('assets/css/home-responsive.css');
  assets.push('assets/css/interactions.css');
  assets.push('assets/css/service-hierarchy.css');
  const versions = Object.fromEntries(assets.map(asset => [asset, crypto.createHash('sha256').update(fs.readFileSync(path.join(__dirname, asset))).digest('hex').slice(0, 10)]));
  for (const url of urls) {
    const relative = new URL(url).pathname.replace(/^\//, '');
    const file = path.join(__dirname, relative, 'index.html');
    let html = fs.readFileSync(file, 'utf8');
    if (/^servicios\/[^/]+\/$/.test(relative)) {
      html = organizeService(html);
      if (!html.includes('assets/css/service-hierarchy.css')) html = html.replace('</head>', '<link rel="stylesheet" href="../../assets/css/service-hierarchy.css">\n</head>');
    }
    if (!relative && !html.includes('assets/css/home-responsive.css')) html = html.replace('</head>', '<link rel="stylesheet" href="assets/css/home-responsive.css">\n</head>');
    if (html.includes('assets/css/catalogo.css') && !html.includes('assets/css/card-motion.css')) {
      const depth = relative.split('/').filter(Boolean).length;
      const prefix = depth ? '../'.repeat(depth) : './';
      html = html.replace('</head>', `<link rel="stylesheet" href="${prefix}assets/css/card-motion.css">\n</head>`);
    }
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
      'og:image:width': '1200', 'og:image:height': '800', 'og:image:alt': title,
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
    // Ensure robots index/follow and rich-snippet directives are present on all indexable pages.
    if (!/<meta\s+name="robots"/i.test(html)) {
      tags.push('<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">');
    }
    if (!/<meta\s+name="theme-color"/i.test(html)) {
      tags.push('<meta name="theme-color" content="#0f172a">');
    }
    if ((!relative || relative === 'contacto/') && !html.includes('"@type":"ProfessionalService"') && !html.includes('"@type": "ProfessionalService"')) {
      const localSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': 'https://odiseacloud.com/#localbusiness',
        name: 'OdiseaCloud',
        url: 'https://odiseacloud.com/',
        image: 'https://odiseacloud.com/assets/images/social-preview.jpg',
        priceRange: 'S/ 656 - S/ 3,325+',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Lima',
          addressRegion: 'Lima',
          addressCountry: 'PE'
        },
        areaServed: [
          { '@type': 'Country', name: 'Perú' },
          { '@type': 'Place', name: 'Latinoamérica' }
        ]
      };
      tags.push(`<script type="application/ld+json">${JSON.stringify(localSchema).replace(/</g, '\\u003c')}</script>`);
    }
    // Add WebPage and BreadcrumbList JSON-LD for pages that do not already define them.
    if (!html.includes('"@type":"BreadcrumbList"') && !html.includes('"@type": "BreadcrumbList"')) {
      const segments = relative.split('/').filter(Boolean);
      const breadcrumbItems = [{ '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://odiseacloud.com/' }];
      let acc = 'https://odiseacloud.com/';
      segments.forEach((seg, idx) => {
        acc += `${seg}/`;
        const label = idx === segments.length - 1
          ? title.split('|')[0].trim()
          : seg.charAt(0).toUpperCase() + seg.slice(1).replace(/-/g, ' ');
        breadcrumbItems.push({ '@type': 'ListItem', position: idx + 2, name: label, item: acc });
      });
      const graph = [
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: title,
          description,
          inLanguage: 'es-PE',
          isPartOf: { '@id': 'https://odiseacloud.com/#website' }
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${url}#breadcrumb`,
          itemListElement: breadcrumbItems
        }
      ];
      tags.push(`<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c')}</script>`);
    }
    html = html.replace('</head>', tags.join('\n') + '\n</head>');
    // Keep shared states after page-specific CSS so hover/focus stay consistent.
    html = html.replace(/<link rel="stylesheet" href="[^"<>]*assets\/css\/interactions\.css(?:\?[^"<>]*)?">\s*/g, '');
    const interactionPrefix = relative ? '../'.repeat(relative.split('/').filter(Boolean).length) : './';
    html = html.replace('</head>', `<link rel="stylesheet" href="${interactionPrefix}assets/css/interactions.css?v=${versions['assets/css/interactions.css']}">\n</head>`);
    fs.writeFileSync(file, html);
  }
};
