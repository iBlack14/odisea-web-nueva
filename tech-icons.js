const fs = require('fs');
const path = require('path');

const brands = {
  HTML5: 'html5', 'CSS3 Moderno': 'css3', CSS3: 'css3', JavaScript: 'javascript', PHP: 'php',
  'Tailwind CSS': 'tailwindcss', WooCommerce: 'woocommerce', 'WooCommerce API': 'woocommerce',
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
  connect: '<rect x="3" y="8" width="6" height="8" rx="2"/><rect x="15" y="8" width="6" height="8" rx="2"/><path d="M9 12h6M6 4v4m12 8v4"/>'
};
module.exports = function renderTech(label, prefix) {
  const keys = brands[label];
  let icon;
  if (keys) {
    icon = [].concat(keys).map(k => {
      if (!fs.existsSync(path.join(__dirname, 'assets/images/tech', k + '.svg'))) throw Error('Missing logo: ' + k);
      return `<img class="tech-logo${['izipay','cloudlinux','litespeed','cpanel'].includes(k) ? ' tech-logo-wide' : ''}" src="${prefix}assets/images/tech/${k}.svg" alt="" width="28" height="28" loading="lazy" decoding="async">`;
    }).join('');
  } else {
    const type = /SSL|Segur|SPF|WAF|Wordfence|SSH/.test(label) ? 'shield' : /IMAP|Webmail/.test(label) ? 'mail' : /DNS|ICANN|Punto/.test(label) ? 'globe' : /WebP/.test(label) ? 'image' : /XML|Robots|Schema|OpenGraph|Minification/.test(label) ? 'code' : /FTP|rsync/.test(label) ? 'server' : 'connect';
    icon = `<svg class="tech-logo tech-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[type]}</svg>`;
  }
  return `<div class="tech-badge">${icon}<span>${label}</span></div>`;
};
