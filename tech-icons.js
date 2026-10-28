const fs = require('fs');
const path = require('path');

const brands = {
  HTML5: 'html5', 'CSS3 Moderno': 'css3', CSS3: 'css3', JavaScript: 'javascript', PHP: 'php',
  'Tailwind CSS': 'tailwindcss', Elementor: 'elementor', 'Odoo ERP': 'odoo', WooCommerce: 'woocommerce', 'WooCommerce API': 'woocommerce',
  WordPress: 'wordpress', 'WordPress Moderno': 'wordpress', 'Izipay API': 'izipay', MySQL: 'mysql',
  Laravel: 'laravel', PostgreSQL: 'postgresql', 'Zoom API': 'zoom', 'Google Meet API': 'googlemeet',
  'Moodle / Custom LMS': 'moodle', 'Odoo API': 'odoo', 'WhatsApp Business Platform': 'whatsapp',
  cPanel: 'cpanel', 'cPanel Mail': 'cpanel', 'cPanel Migrations': 'cpanel', CloudLinux: 'cloudlinux',
  'Apache/LiteSpeed': ['apache', 'litespeed'], Linux: 'linux', Ubuntu: 'ubuntu',
  Nginx: 'nginx', Docker: 'docker', Git: 'git', 'Cloudflare DNS': 'cloudflare', 'CDN Cloudflare': 'cloudflare',
  'Redis/Memcached': 'redis', phpMyAdmin: 'phpmyadmin', 'Google Lighthouse': 'lighthouse',
  'Google Search Console': 'googlesearchconsole'
};
const paths = {
  server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01M11 6.5h6M11 17.5h6"/>',
  shield: '<path d="M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7z"/><path d="m8 12 3 3 5-6"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  code: '<path d="m8 7-5 5 5 5m8-10 5 5-5 5M14 4l-4 16"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1"/><path d="m3 17 6-6 4 4 3-3 5 5"/>',
  connect: '<rect x="3" y="8" width="6" height="8" rx="2"/><rect x="15" y="8" width="6" height="8" rx="2"/><path d="M9 12h6M6 4v4m12 8v4"/>',
  api: '<path d="m7 8-4 4 4 4m10-8 4 4-4 4M14 5l-4 14"/>',
  webhook: '<circle cx="12" cy="5" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="m11 7-4 8m6-8 4 8M7 18h10"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2"/>',
  dns: '<circle cx="12" cy="5" r="3"/><rect x="2" y="16" width="6" height="5" rx="1"/><rect x="16" y="16" width="6" height="5" rx="1"/><path d="M12 8v4M5 16v-4h14v4"/>',
  terminal: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m6 8 4 4-4 4m7 0h5"/>',
  transfer: '<path d="M4 7h16m-4-4 4 4-4 4M20 17H4m4-4-4 4 4 4"/>',
  sitemap: '<rect x="9" y="2" width="6" height="5" rx="1"/><rect x="2" y="17" width="5" height="5" rx="1"/><rect x="17" y="17" width="5" height="5" rx="1"/><path d="M12 7v5m-7.5 5v-5h15v5"/>',
  document: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M8 12h8m-8 4h6"/>',
  payment: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h3m3 0h2"/>',
  compress: '<path d="M8 3v5H3m13-5v5h5M8 21v-5H3m13 5v-5h5M3 3l5 5m13-5-5 5M3 21l5-5m13 5-5-5"/>'
};
const symbols = {
  'APIs REST': 'api', Webhooks: 'webhook', 'SSL/TLS': 'lock', 'Yape/Plin': 'payment',
  'IMAP/SMTP': 'mail', Webmail: 'mail', 'DNS Seguro': 'dns', 'DNS Management': 'dns',
  'DNS Propagation': 'dns', 'SPF/DKIM/DMARC': 'shield', ICANN: 'globe', 'Punto PE': 'globe',
  SSH: 'terminal', 'Security Headers': 'shield', 'Firewalls WAF': 'shield',
  'Wordfence/Sucuri': 'shield', 'FTP/SSH': 'transfer', rsync: 'transfer', WebP: 'image',
  'Asset Minification': 'compress', 'Schema.org': 'code', 'XML Sitemaps': 'sitemap',
  'Robots.txt': 'document', OpenGraph: 'connect'
};
module.exports = function renderTech(label, prefix) {
  const keys = brands[label];
  let icon;
  if (keys) {
    icon = [].concat(keys).map(k => {
      if (!fs.existsSync(path.join(__dirname, 'assets/images/tech', k + '.svg'))) throw Error('Missing logo: ' + k);
      return `<img class="tech-logo${['izipay','cloudlinux','litespeed','cpanel','odoo'].includes(k) ? ' tech-logo-wide' : ''}" src="${prefix}assets/images/tech/${k}.svg" alt="" width="28" height="28" loading="lazy" decoding="async">`;
    }).join('');
  } else {
    const type = symbols[label];
    if (!type) throw Error('Assign a corresponding SVG to technology: ' + label);
    icon = `<svg class="tech-logo tech-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[type]}</svg>`;
  }
  return `<div class="tech-badge">${icon}<span>${label}</span></div>`;
};
