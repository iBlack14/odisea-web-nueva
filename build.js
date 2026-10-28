/**
 * ODISEACLOUD - Generador de Páginas Estáticas con URLs Limpias (Sin .html)
 * Genera HTML5 semántico, optimizado para SEO, con Schema.org y URLs amigables
 */

const fs = require('fs');
const path = require('path');
const renderTech = require('./tech-icons');

const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'servicios.json'), 'utf8'));

// Helper para iconos SVG oficiales y limpios
function getSvgIcon(name) {
  const icons = {
    globe: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    'shopping-bag': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    'refresh-cw': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`,
    cpu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>`,
    'book-open': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
    'git-merge': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M6 21V9a9 9 0 0 0 9 9"/></svg>`,
    server: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>`,
    mail: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>`,
    'at-sign': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/></svg>`,
    'hard-drive': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/></svg>`,
    'shield-check': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`,
    lock: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
    shuffle: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m16 3 5 5-5 5"/><path d="M4 20L21 3"/><path d="m21 16-5 5-5-5"/><path d="M15 15l-5 5H4"/></svg>`,
    zap: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
    'trending-up': `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
    check: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
    arrowRight: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.05 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`,
    chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>`,
    menu: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>`,
    x: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`
  };
  return icons[name] || icons.globe;
}

// Helper para Google Analytics 4 y Google Search Console
function renderHeadAnalytics() {
  const gaId = (data.company.analytics && data.company.analytics.googleAnalyticsId) ? data.company.analytics.googleAnalyticsId.trim() : '';
  const gsc = (data.company.analytics && data.company.analytics.googleSearchConsole) ? data.company.analytics.googleSearchConsole.trim() : '';
  let tags = '';
  if (gsc) {
    tags += `\n  <!-- Google Search Console Verification -->\n  <meta name="google-site-verification" content="${gsc}">`;
  }
  if (gaId && gaId.startsWith('G-')) {
    tags += `\n  <!-- Google Analytics 4 (GA4) -->\n  <script async src="https://www.googletagmanager.com/gtag/js?id=${gaId}"></script>\n  <script>\n    window.dataLayer = window.dataLayer || [];\n    function gtag(){dataLayer.push(arguments);}\n    gtag('js', new Date());\n    gtag('config', '${gaId}');\n  </script>`;
  }
  return tags;
}

// Generador de Header Reutilizable con URLs Limpias
function renderHeader(activePage = 'inicio', relativePath = '') {
  const homeUrl = relativePath || './';
  return `
  <!-- HEADER & NAVEGACIÓN -->
  <header class="site-header">
    <div class="container navbar">
      <!-- Logotipo Oficial OdiseaCloud -->
      <a href="${homeUrl}" class="nav-brand" aria-label="OdiseaCloud - Inicio">
        <img src="${relativePath}assets/images/logo.webp" alt="Logotipo OdiseaCloud" class="brand-logo" width="180" height="48">
      </a>

      <!-- Menú de Navegación de Escritorio -->
      <nav class="nav-links" aria-label="Navegación principal">
        <a href="${homeUrl}" class="nav-link ${activePage === 'inicio' ? 'active' : ''}">Inicio</a>
        <a href="${relativePath}nosotros/" class="nav-link ${activePage === 'nosotros' ? 'active' : ''}">Nosotros</a>
        
        <!-- Dropdown Servicios -->
        <div class="has-dropdown">
          <a href="${relativePath}servicios/" class="nav-link ${activePage === 'servicios' ? 'active' : ''}">
            Servicios
            ${getSvgIcon('chevronDown')}
          </a>
          <div class="dropdown-menu">
            <a href="${relativePath}servicios/desarrollo-web/" class="dropdown-item">
              <span class="dropdown-icon">${getSvgIcon('globe')}</span>
              <span>Desarrollo Web</span>
            </a>
            <a href="${relativePath}servicios/tiendas-virtuales/" class="dropdown-item">
              <span class="dropdown-icon">${getSvgIcon('shopping-bag')}</span>
              <span>Tiendas Virtuales</span>
            </a>
            <a href="${relativePath}servicios/aulas-virtuales/" class="dropdown-item">
              <span class="dropdown-icon">${getSvgIcon('book-open')}</span>
              <span>Aulas Virtuales</span>
            </a>
            <a href="${relativePath}servicios/sistemas-web/" class="dropdown-item">
              <span class="dropdown-icon">${getSvgIcon('cpu')}</span>
              <span>Sistemas a Medida</span>
            </a>
            <a href="${relativePath}servicios/hosting-web/" class="dropdown-item">
              <span class="dropdown-icon">${getSvgIcon('server')}</span>
              <span>Hosting y Servidores</span>
            </a>
            <a href="${relativePath}servicios/correo-corporativo/" class="dropdown-item">
              <span class="dropdown-icon">${getSvgIcon('mail')}</span>
              <span>Correo Corporativo</span>
            </a>
            <div class="dropdown-footer">
              <a href="${relativePath}servicios/" class="dropdown-footer-link">
                <span>Ver catálogo completo (15)</span>
                ${getSvgIcon('arrowRight')}
              </a>
            </div>
          </div>
        </div>

        <a href="${relativePath}portafolio/" class="nav-link ${activePage === 'portafolio' ? 'active' : ''}">Portafolio</a>
        <a href="${relativePath}soluciones/" class="nav-link ${activePage === 'soluciones' ? 'active' : ''}">Soluciones</a>
        <a href="${relativePath}contacto/" class="nav-link ${activePage === 'contacto' ? 'active' : ''}">Contacto</a>
      </nav>

      <!-- Botón Destacado Solicitar Cotización -->
      <div class="nav-actions">
        <a href="#" class="btn btn-whatsapp btn-header" data-whatsapp="${data.company.name}: Hola, quisiera solicitar una cotización para un proyecto para mi empresa.">
          ${getSvgIcon('whatsapp')}
          <span>Solicitar cotización</span>
        </a>
        <button class="mobile-toggle" aria-label="Abrir menú de navegación">
          ${getSvgIcon('menu')}
        </button>
      </div>
    </div>
  </header>

  <!-- Menú Móvil Lateral -->
  <div class="mobile-menu-backdrop"></div>
  <aside class="mobile-menu" aria-label="Menú móvil">
    <div class="mobile-menu-header">
      <img src="${relativePath}assets/images/logo.webp" alt="OdiseaCloud Logo" style="height: 38px; width: auto;">
      <button class="mobile-close-btn" aria-label="Cerrar menú">
        ${getSvgIcon('x')}
      </button>
    </div>
    <nav class="mobile-nav-links">
      <a href="${homeUrl}" class="mobile-nav-link">Inicio</a>
      <a href="${relativePath}nosotros/" class="mobile-nav-link">Nosotros</a>
      <a href="${relativePath}servicios/" class="mobile-nav-link">Catálogo de Servicios</a>
      <a href="${relativePath}portafolio/" class="mobile-nav-link">Portafolio</a>
      <a href="${relativePath}soluciones/" class="mobile-nav-link">Soluciones por Sector</a>
      <a href="${relativePath}contacto/" class="mobile-nav-link">Contacto</a>
    </nav>
    <div class="mobile-cta">
      <a href="#" class="btn btn-whatsapp" style="width: 100%;" data-whatsapp="${data.company.name}: Hola, quisiera solicitar una cotización para mi empresa.">
        ${getSvgIcon('whatsapp')}
        <span>Solicitar cotización</span>
      </a>
      <p style="font-size: 0.85rem; text-align: center; margin-top: 14px; color: var(--color-text-muted);">
        Atención directa: <span class="display-whatsapp">${data.company.whatsappDisplay}</span>
      </p>
    </div>
  </aside>
  `;
}

// Generador de Footer Reutilizable con URLs Limpias
function renderFooter(relativePath = '') {
  return `
  <!-- FOOTER CORPORATIVO OFICIAL -->
  <footer class="site-footer">
    <div class="container footer-grid">
      <!-- Columna 1: Marca y Misión -->
      <div class="footer-brand">
        <img src="${relativePath}assets/images/logo.webp" alt="OdiseaCloud" class="footer-logo" width="170" height="44">
        <p class="footer-slogan">${data.company.slogan}</p>
        <p class="footer-desc">
          Desarrollamos soluciones digitales, plataformas cloud y herramientas tecnológicas diseñadas para potenciar el crecimiento y solidez de tu empresa.
        </p>
      </div>

      <!-- Columna 2: Servicios Principales -->
      <div class="footer-column">
        <h4 class="footer-column-title">Servicios Principales</h4>
        <ul class="footer-links">
          <li><a href="${relativePath}servicios/desarrollo-web/" class="footer-link">Diseño y desarrollo web</a></li>
          <li><a href="${relativePath}servicios/tiendas-virtuales/" class="footer-link">Tiendas virtuales y eCommerce</a></li>
          <li><a href="${relativePath}servicios/aulas-virtuales/" class="footer-link">Aulas virtuales y eLearning</a></li>
          <li><a href="${relativePath}servicios/sistemas-web/" class="footer-link">Sistemas web a medida</a></li>
          <li><a href="${relativePath}servicios/hosting-web/" class="footer-link">Hosting y servidores VPS</a></li>
          <li><a href="${relativePath}servicios/correo-corporativo/" class="footer-link">Correo corporativo seguro</a></li>
          <li><a href="${relativePath}servicios/" class="footer-link" style="color: var(--color-tech); font-weight: 600;">Ver los 15 servicios &rarr;</a></li>
        </ul>
      </div>

      <!-- Columna 3: Enlaces de Navegación -->
      <div class="footer-column">
        <h4 class="footer-column-title">Navegación</h4>
        <ul class="footer-links">
          <li><a href="${relativePath || './'}" class="footer-link">Inicio</a></li>
          <li><a href="${relativePath}nosotros/" class="footer-link">Sobre Nosotros</a></li>
          <li><a href="${relativePath}portafolio/" class="footer-link">Portafolio de Trabajos</a></li>
          <li><a href="${relativePath}soluciones/" class="footer-link">Soluciones por Sector</a></li>
          <li><a href="${relativePath}contacto/" class="footer-link">Canales de Contacto</a></li>
        </ul>
      </div>

      <!-- Columna 4: Canales Directos -->
      <div class="footer-column">
        <h4 class="footer-column-title">Contacto Directo</h4>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">${getSvgIcon('whatsapp')}</span>
          <div>
            <strong>WhatsApp Oficial:</strong><br>
            <a href="#" class="footer-link" data-whatsapp="${data.company.name}: Hola, quisiera hacer una consulta comercial."><span class="display-whatsapp">${data.company.whatsappDisplay}</span></a>
          </div>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">${getSvgIcon('mail')}</span>
          <div>
            <strong>Correo Electrónico:</strong><br>
            <a href="#" class="footer-link" data-mailto="${data.company.name}: Consulta comercial desde el sitio web."><span class="display-email">${data.company.email}</span></a>
          </div>
        </div>
        <div class="footer-contact-item">
          <span class="footer-contact-icon">${getSvgIcon('globe')}</span>
          <div>
            <strong>Horario de Atención:</strong><br>
            <span style="font-size: 0.85rem;">${data.company.schedule}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Barra Inferior de Derechos -->
    <div class="container footer-bottom">
      <div>
        &copy; 2026 <strong>ODISEACLOUD</strong>. Todos los derechos reservados.
      </div>
      <div class="footer-legal-links">
        <a href="${relativePath}terminos/" class="footer-link">Términos de servicio</a>
        <a href="${relativePath}privacidad/" class="footer-link">Política de privacidad</a>
        <a href="${relativePath}cookies/" class="footer-link">Política de cookies</a>
        <a href="${relativePath}libro-de-reclamaciones/" class="footer-link footer-claims">Libro de Reclamaciones</a>
      </div>
    </div>
  </footer>

  <!-- Botón Flotante Global de WhatsApp -->
  <a href="#" class="floating-whatsapp" aria-label="Chatear con un asesor por WhatsApp" data-whatsapp="${data.company.name}: Hola, estoy navegando en su sitio web y quisiera hacer una consulta sobre sus servicios.">
    ${getSvgIcon('whatsapp')}
  </a>

  <!-- Scripts Globales -->
  <script src="${relativePath}assets/js/config.js"></script>
  <script src="${relativePath}assets/js/main.js"></script>
  `;
}

// 1. Generación de Páginas Individuales de los 15 Servicios
data.services.forEach(service => {
  const serviceDir = path.join(__dirname, 'servicios', service.slug);
  fs.mkdirSync(serviceDir, { recursive: true });

  const related = data.services.filter(s => s.id !== service.id && (s.category === service.category || s.featured)).slice(0, 3);

  const html = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${service.seoTitle || `${service.name} en Perú | OdiseaCloud`}</title>
  <meta name="description" content="${service.seoDescription || service.shortDesc}">
  <link rel="canonical" href="https://odiseacloud.com/servicios/${service.slug}/">
  <link rel="icon" type="image/png" href="../../assets/images/favicon.png">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${service.seoTitle || `${service.name} en Perú | OdiseaCloud`}">
  <meta property="og:description" content="${service.seoDescription || service.shortDesc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://odiseacloud.com/servicios/${service.slug}/">
  <meta property="og:image" content="https://odiseacloud.com${service.image || '/assets/images/social-preview.jpg'}">

  <!-- Estilos Corporativos -->
  <link rel="stylesheet" href="../../assets/css/main.css">

  <script type="application/ld+json">
  ${JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': [
      {'@type': 'Service', '@id': 'https://odiseacloud.com/servicios/' + service.slug + '/#service',
       name: service.name, serviceType: service.shortName,
       url: 'https://odiseacloud.com/servicios/' + service.slug + '/',
       description: service.shortDesc, areaServed: {'@type': 'Country', name: 'Perú'},
       provider: {'@type': 'Organization', '@id': 'https://odiseacloud.com/#organization', name: 'OdiseaCloud', url: 'https://odiseacloud.com/'}},
      {'@type': 'BreadcrumbList', itemListElement: [
        {'@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://odiseacloud.com/'},
        {'@type': 'ListItem', position: 2, name: 'Servicios', item: 'https://odiseacloud.com/servicios/'},
        {'@type': 'ListItem', position: 3, name: service.shortName, item: 'https://odiseacloud.com/servicios/' + service.slug + '/'}
      ]}
    ]
  }).replace(/</g, '\u003c')}
  </script>
  ${renderHeadAnalytics()}
</head>
<body>

  ${renderHeader('servicios', '../../')}

  <main>
    <nav class="container" aria-label="Ruta de navegación" style="padding-top: 24px; font-size: 0.9rem;">
      <a href="../../">Inicio</a> <span aria-hidden="true"> / </span>
      <a href="../">Servicios</a> <span aria-hidden="true"> / </span>
      <span aria-current="page">${service.shortName}</span>
    </nav>
    <!-- HERO DEL SERVICIO -->
    <section class="section section-soft-blue" style="padding: 72px 0 60px 0;">
      <div class="container container-narrow" style="text-align: center;">
        <span class="section-badge">${service.categoryName} &bull; Servicio ${service.number}</span>
        <h1 style="margin-bottom: 20px;">${service.name}</h1>
        <p class="section-subtitle" style="max-width: 760px; margin: 0 auto 32px auto;">
          ${service.heroTagline}
        </p>
        <div style="display: flex; justify-content: center; gap: 16px; flex-wrap: wrap;">
          <a href="#" class="btn btn-whatsapp" data-whatsapp="${service.whatsappMessage}">
            ${getSvgIcon('whatsapp')}
            <span>Consultar por WhatsApp</span>
          </a>
          <a href="#" class="btn btn-outline" data-mailto="${service.whatsappMessage}" data-subject="Consulta sobre ${service.name} - ODISEACLOUD">
            ${getSvgIcon('mail')}
            <span>Solicitar propuesta por correo</span>
          </a>
        </div>
      </div>
    </section>

    ${service.image ? `<div class="container container-narrow" style="padding-top: 40px;">
      <img src="../..${service.image}" alt="${service.imageAlt}" width="1536" height="1024" style="display: block; width: 100%; height: auto; border-radius: 20px;" fetchpriority="high">
    </div>` : ''}
    <!-- DESCRIPCIÓN Y BENEFICIOS -->
    <section class="section">
      <div class="container">
        <div class="about-grid">
          <div>
            <span class="section-badge">Visión General</span>
            <h2 style="margin-bottom: 20px;">${service.overviewTitle || service.name}</h2>
            <p style="font-size: 1.1rem; line-height: 1.7; margin-bottom: 28px;">
              ${service.fullDesc}
            </p>
            <h3 style="margin-bottom: 16px; font-size: 1.3rem;">Beneficios clave para tu empresa:</h3>
            <ul style="display: flex; flex-direction: column; gap: 14px;">
              ${service.benefits.map(b => `
                <li style="display: flex; align-items: flex-start; gap: 12px; font-size: 0.98rem; color: var(--color-text);">
                  <span style="color: var(--color-primary); flex-shrink: 0; margin-top: 2px;">${getSvgIcon('check')}</span>
                  <span>${b}</span>
                </li>
              `).join('')}
            </ul>
          </div>

          <!-- Tarjeta destacada -->
          <div>
            <div class="about-card-banner">
              <span class="section-badge section-badge-dark" style="margin-bottom: 16px;">Garantía OdiseaCloud</span>
              <h3 style="color: var(--color-white); margin-bottom: 16px;">Compromiso y excelencia técnica</h3>
              <p style="color: var(--color-text-light); margin-bottom: 24px; line-height: 1.6;">
                Cada implementación de <strong>${service.shortName}</strong> incluye acompañamiento directo, rigurosas pruebas de funcionamiento y entrega lista para producción sin sorpresas técnicas.
              </p>
              <div style="padding: 16px; background-color: rgba(255, 255, 255, 0.08); border-radius: 12px; margin-bottom: 24px;">
                <p style="font-size: 0.9rem; color: var(--color-white); margin-bottom: 4px;"><strong>Canal preferencial de atención:</strong></p>
                <p style="font-size: 0.85rem; color: var(--color-tech);">Respuesta ágil por WhatsApp en horario comercial.</p>
              </div>
              <a href="#" class="btn btn-whatsapp" style="width: 100%;" data-whatsapp="${service.whatsappMessage}">
                ${getSvgIcon('whatsapp')}
                <span>Iniciar consulta técnica</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CARACTERÍSTICAS Y ALCANCE -->
    <section class="section section-light">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Alcance y Funcionalidades</span>
          <h2 class="section-title">Qué incluye este servicio</h2>
          <p class="section-subtitle">Características diseñadas para ofrecerte una solución integral, estable y sin fisuras técnicas.</p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          ${service.features.map(f => `
            <div style="padding: 24px; background-color: var(--color-white); border-radius: var(--radius-md); border: 1px solid var(--color-border); display: flex; align-items: flex-start; gap: 14px; box-shadow: var(--shadow-sm);">
              <span style="color: var(--color-primary); flex-shrink: 0; margin-top: 2px;">${getSvgIcon('check')}</span>
              <span style="font-size: 0.95rem; font-weight: 600; color: var(--color-navy);">${f}</span>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    ${service.useCases ? `<section class="section"><div class="container">
      <div class="section-header"><span class="section-badge">Aplicaciones para tu negocio</span>
        <h2 class="section-title">Ejemplos de automatización de procesos con CRM</h2>
        <p class="section-subtitle">Definimos cada conexión según tus herramientas, permisos y forma de trabajar.</p>
      </div>
      <div class="services-grid">${service.useCases.map(c => `<article class="service-card"><h3>${c.title}</h3><p>${c.desc}</p></article>`).join('')}</div>
      <p style="margin-top: 24px;">También puedes conectar este servicio con tu <a href="../desarrollo-web/">página web empresarial</a>, tu <a href="../tiendas-virtuales/">tienda virtual</a> o un <a href="../sistemas-web/">sistema web a medida</a>.</p>
    </div></section>` : ''}
    <!-- TECNOLOGÍAS COMPATIBLES -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Stack Tecnológico</span>
          <h2 class="section-title">Tecnologías e integraciones aplicables</h2>
          <p class="section-subtitle">Herramientas robustas y estándares de la industria que garantizan compatibilidad y escalabilidad.</p>
        </div>

        <div class="tech-cloud">
          ${service.technologies.map(t => renderTech(t, '../../')).join('')}
        </div>
      </div>
    </section>

    <section class="section service-guide-section"><div class="container service-guide">
      <div class="service-guide-visual"><img src="../../assets/images/robot-asistente.webp" alt="Robot de OdiseaCloud" width="1200" height="1290" loading="lazy"></div>
      <div><span class="section-badge">Tecnología con acompañamiento</span><h2>Tu proyecto, con un equipo que te acompaña</h2>
        <p>Te ayudamos a definir el alcance de ${service.shortName.toLowerCase()}, resolver dudas y elegir una solución acorde con tu negocio.</p>
        <ul class="service-guide-points"><li>Evaluamos tus necesidades antes de proponer.</li><li>Definimos entregables y prioridades contigo.</li><li>Probamos la solución y te orientamos en su uso.</li></ul>
        <a href="#" class="btn btn-primary" data-whatsapp="${service.whatsappMessage}">Conversemos sobre tu proyecto</a>
      </div></div></section>
    <!-- PROCESO DE TRABAJO -->
    <section class="section section-dark">
      <div class="container">
        <div class="section-header">
          <span class="section-badge section-badge-dark">Metodología</span>
          <h2 class="section-title">De tu idea a la puesta en marcha</h2>
          <p class="section-subtitle">Un proceso claro y transparente en 4 fases bien definidas.</p>
        </div>

        <div class="workflow-grid">
          ${data.workflow.map(w => `
            <div class="workflow-card" style="background-color: rgba(255, 255, 255, 0.05); border-color: rgba(255, 255, 255, 0.1);">
              <div class="workflow-step-badge">${w.step}</div>
              <h3 class="workflow-title" style="color: var(--color-white);">${w.title}</h3>
              <p class="workflow-desc" style="color: var(--color-text-light);">${w.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- PREGUNTAS FRECUENTES -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Respuestas Claras</span>
          <h2 class="section-title">Preguntas frecuentes sobre ${service.shortName}</h2>
          <p class="section-subtitle">Resolvemos las dudas más habituales antes de comenzar tu proyecto.</p>
        </div>

        <div class="faq-list">
          ${service.faqs.map(faq => `
            <div class="faq-item">
              <button class="faq-question">
                <span>${faq.q}</span>
                <span class="faq-icon">${getSvgIcon('chevronDown')}</span>
              </button>
              <div class="faq-answer">
                <p>${faq.a}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- SERVICIOS RELACIONADOS -->
    <section class="section section-light">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Soluciones Complementarias</span>
          <h2 class="section-title">Servicios que potencian este proyecto</h2>
        </div>

        <div class="services-grid">
          ${related.map(r => `
            <div class="service-card">
              <span class="service-card-number">SERVICIO ${r.number}</span>
              <div class="service-card-icon">${getSvgIcon(r.icon)}</div>
              <h3 class="service-card-title">${r.name}</h3>
              <p class="service-card-desc">${r.shortDesc}</p>
              <a href="../../servicios/${r.slug}/" class="service-card-link">
                <span>Conocer detalles</span>
                ${getSvgIcon('arrowRight')}
              </a>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- BANNER DE CONTACTO FINAL -->
    <section class="section">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-content">
            <h2 class="cta-title">¿Listo para impulsar tu proyecto de ${service.shortName}?</h2>
            <p class="cta-desc">
              Conversemos sobre los requerimientos específicos de tu empresa y recibe una propuesta profesional adaptada a tus metas.
            </p>
            <div class="cta-buttons">
              <a href="#" class="btn btn-whatsapp btn-lg" data-whatsapp="${service.whatsappMessage}">
                ${getSvgIcon('whatsapp')}
                <span>Consultar por WhatsApp</span>
              </a>
              <a href="#" class="btn btn-outline-white btn-lg" data-mailto="${service.whatsappMessage}" data-subject="Propuesta de ${service.name} - ODISEACLOUD">
                ${getSvgIcon('mail')}
                <span>Enviar correo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderFooter('../../')}

</body>
</html>`;

  fs.writeFileSync(path.join(serviceDir, 'index.html'), html, 'utf8');
});

console.log(`✅ Generadas 15 páginas individuales de servicios.`);

// 2. Generación del Catálogo de Servicios (/servicios/)
const serviciosCatalogDir = path.join(__dirname, 'servicios');
const serviciosCatalogHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Servicios web y soluciones tecnológicas en Perú | OdiseaCloud</title>
  <meta name="description" content="Soluciones digitales para cada etapa de tu negocio: desarrollo web, tiendas virtuales, aulas virtuales, hosting, VPS, ciberseguridad y optimización de velocidad.">
  <link rel="canonical" href="https://odiseacloud.com/servicios/">
  <link rel="icon" type="image/png" href="../assets/images/favicon.png">

  <!-- Estilos Corporativos -->
  <link rel="stylesheet" href="../assets/css/main.css">
  ${renderHeadAnalytics()}
</head>
<body>

  ${renderHeader('servicios', '../')}

  <main>
    <!-- HERO DEL CATÁLOGO -->
    <section class="section section-soft-blue" style="padding: 72px 0 56px 0;">
      <div class="container container-narrow" style="text-align: center;">
        <span class="section-badge">Catálogo Oficial 2026</span>
        <h1 style="margin-bottom: 20px;">Soluciones digitales para cada etapa de tu negocio</h1>
        <p class="section-subtitle">
          Desde el desarrollo de tu primera página web hasta la implementación de plataformas empresariales y soluciones cloud, te acompañamos en tu transformación digital.
        </p>
      </div>
    </section>

    <!-- LISTADO CON FILTROS POR CATEGORÍA -->
    <section class="section">
      <div class="container">
        <!-- Pestañas de Filtro -->
        <div class="filter-tabs">
          <button class="filter-btn active" data-filter="all">Todos los servicios (15)</button>
          <button class="filter-btn" data-filter="desarrollo-web">Desarrollo Web</button>
          <button class="filter-btn" data-filter="plataformas-sistemas">Plataformas y Sistemas</button>
          <button class="filter-btn" data-filter="infraestructura-cloud">Infraestructura Cloud</button>
          <button class="filter-btn" data-filter="seguridad-mantenimiento">Seguridad y Mantenimiento</button>
          <button class="filter-btn" data-filter="optimizacion-digital">Optimización Digital</button>
        </div>

        <!-- Rejilla de Servicios -->
        <div class="services-grid" id="services-grid-container">
          ${data.services.map(s => `
            <div class="service-card" data-category="${s.category}">
              <span class="service-card-number">SERVICIO ${s.number} &bull; ${s.categoryName.toUpperCase()}</span>
              <div class="service-card-icon">${getSvgIcon(s.icon)}</div>
              <h3 class="service-card-title">${s.name}</h3>
              <p class="service-card-desc">${s.shortDesc}</p>
              <div style="margin-top: auto; pt: 16px;">
                <a href="../servicios/${s.slug}/" class="service-card-link">
                  <span>Conocer más y cotizar</span>
                  ${getSvgIcon('arrowRight')}
                </a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CONTACTO DIRECTO -->
    <section class="section section-light">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-content">
            <h2 class="cta-title">¿Tienes un proyecto que requiere una solución a medida?</h2>
            <p class="cta-desc">
              Si tu empresa necesita una combinación de servicios o una integración especializada, estamos listos para asesorarte de manera personalizada.
            </p>
            <div class="cta-buttons">
              <a href="#" class="btn btn-whatsapp btn-lg" data-whatsapp="${data.company.name}: Hola, revisé el catálogo de servicios y deseo solicitar una asesoría técnica para mi empresa.">
                ${getSvgIcon('whatsapp')}
                <span>Consultar por WhatsApp</span>
              </a>
              <a href="../contacto/" class="btn btn-outline-white btn-lg">
                <span>Ir al formulario de contacto</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderFooter('../')}

</body>
</html>`;

fs.writeFileSync(path.join(serviciosCatalogDir, 'index.html'), serviciosCatalogHtml, 'utf8');
console.log(`✅ Generado catálogo de servicios: /servicios/`);

// 3. Generación de Página Nosotros (/nosotros/)
const nosotrosDir = path.join(__dirname, 'nosotros');
fs.mkdirSync(nosotrosDir, { recursive: true });
const nosotrosHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sobre Nosotros | ODISEACLOUD</title>
  <meta name="description" content="Conoce la filosofía, enfoque, valores y compromiso de ODISEACLOUD. Tecnología, creatividad y soluciones digitales que generan valor empresarial.">
  <link rel="canonical" href="https://odiseacloud.com/nosotros/">
  <link rel="icon" type="image/png" href="../assets/images/favicon.png">
  <link rel="stylesheet" href="../assets/css/main.css">
  ${renderHeadAnalytics()}
</head>
<body>

  ${renderHeader('nosotros', '../')}

  <main>
    <!-- HERO NOSOTROS -->
    <section class="section section-soft-blue" style="padding: 72px 0 60px 0;">
      <div class="container container-narrow" style="text-align: center;">
        <span class="section-badge">Identidad Corporativa</span>
        <h1 style="margin-bottom: 20px;">Tecnología, creatividad y soluciones que generan valor</h1>
        <p class="section-subtitle">
          En OdiseaCloud desarrollamos soluciones digitales que ayudan a empresas, emprendedores e instituciones a fortalecer su presencia en internet, optimizar sus procesos y aprovechar nuevas oportunidades tecnológicas.
        </p>
      </div>
    </section>

    <!-- COMPOSICIÓN 2 COLUMNAS -->
    <section class="section">
      <div class="container">
        <div class="about-grid">
          <div>
            <span class="section-badge">Qué hacemos</span>
            <h2 style="margin-bottom: 24px;">Desarrollo web profesional con código propio y visión de futuro</h2>
            <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 20px;">
              Creemos firmemente en el poder de la tecnología bien construida. Huimos de las soluciones improvisadas y las plantillas pesadas; en su lugar, priorizamos la arquitectura limpia, la velocidad de carga, la seguridad informática y la adaptabilidad a dispositivos móviles.
            </p>
            <p style="font-size: 1.05rem; line-height: 1.7; margin-bottom: 32px;">
              Nuestro equipo combina diseño UI/UX de nivel SaaS con robusta ingeniería de software, brindando a cada cliente la seguridad de que su infraestructura digital está en manos expertas y comprometidas.
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
              <div style="padding: 20px; background-color: var(--color-soft-blue); border-radius: var(--radius-md); border-left: 4px solid var(--color-primary);">
                <h4 style="color: var(--color-navy); margin-bottom: 8px;">Nuestra Misión</h4>
                <p style="font-size: 0.9rem; color: var(--color-text-muted);">
                  Construir herramientas digitales de máxima calidad y rendimiento que permitan a las organizaciones competir con ventaja en la economía moderna.
                </p>
              </div>
              <div style="padding: 20px; background-color: var(--color-soft-cyan); border-radius: var(--radius-md); border-left: 4px solid var(--color-tech);">
                <h4 style="color: var(--color-navy); margin-bottom: 8px;">Nuestra Visión</h4>
                <p style="font-size: 0.9rem; color: var(--color-text-muted);">
                  Ser el referente tecnológico de confianza para empresas que buscan soluciones de software y cloud robustas, estables y sin límites de crecimiento.
                </p>
              </div>
            </div>
          </div>

          <!-- Banner Lema -->
          <div>
            <div class="about-card-banner">
              <p class="about-slogan-large">Tu proyecto, sin límites</p>
              <p class="about-slogan-sub">
                No imponemos restricciones a tu crecimiento. Diseñamos para que tu plataforma pueda evolucionar tanto como lo demande tu negocio.
              </p>
              <div style="border-top: 1px solid rgba(255, 255, 255, 0.15); padding-top: 24px;">
                <h4 style="color: var(--color-white); margin-bottom: 12px;">Principios innegociables:</h4>
                <ul style="display: flex; flex-direction: column; gap: 10px; font-size: 0.92rem; color: var(--color-text-light);">
                  <li style="display: flex; gap: 10px;">${getSvgIcon('check')} Código limpio, mantenible y documentado</li>
                  <li style="display: flex; gap: 10px;">${getSvgIcon('check')} Sin datos inventados ni falsas promesas</li>
                  <li style="display: flex; gap: 10px;">${getSvgIcon('check')} Atención directa por canales ágiles</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NUESTROS VALORES -->
    <section class="section section-light">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Cultura Corporativa</span>
          <h2 class="section-title">Valores que guían nuestro trabajo</h2>
          <p class="section-subtitle">Principios éticos y técnicos presentes en cada etapa de nuestros proyectos.</p>
        </div>

        <div class="values-grid">
          ${data.values.map(v => `
            <div class="value-card">
              <div style="width: 36px; height: 36px; border-radius: 8px; background-color: var(--color-soft-blue); color: var(--color-primary); display: flex; align-items: center; justify-content: center; margin-bottom: 14px;">
                ${getSvgIcon('check')}
              </div>
              <h3 class="value-name">${v.name}</h3>
              <p class="value-desc">${v.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- PROCESO DE TRABAJO -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Metodología Comprobada</span>
          <h2 class="section-title">Cómo trabajamos contigo</h2>
          <p class="section-subtitle">Claridad de inicio a fin para garantizar resultados que superen tus expectativas.</p>
        </div>

        <div class="workflow-grid">
          ${data.workflow.map(w => `
            <div class="workflow-card">
              <div class="workflow-step-badge">${w.step}</div>
              <h3 class="workflow-title">${w.title}</h3>
              <p class="workflow-desc">${w.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="section section-dark">
      <div class="container">
        <div class="cta-banner" style="border: none; background: transparent; box-shadow: none;">
          <div class="cta-content">
            <h2 class="cta-title">Hablemos sobre tu próximo proyecto</h2>
            <p class="cta-desc">
              Ponte en contacto con nosotros y descubre cómo podemos ayudarte a construir una presencia digital sólida.
            </p>
            <div class="cta-buttons">
              <a href="#" class="btn btn-whatsapp btn-lg" data-whatsapp="${data.company.name}: Hola, leí sobre su equipo en la página de Nosotros y quisiera hacer una consulta sobre un proyecto.">
                ${getSvgIcon('whatsapp')}
                <span>Consultar por WhatsApp</span>
              </a>
              <a href="../contacto/" class="btn btn-outline-white btn-lg">
                <span>Escríbenos por correo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderFooter('../')}

</body>
</html>`;

fs.writeFileSync(path.join(nosotrosDir, 'index.html'), nosotrosHtml, 'utf8');
console.log(`✅ Generada página Nosotros: /nosotros/`);

// 4. Generación de Página Portafolio (/portafolio/)
const portafolioDir = path.join(__dirname, 'portafolio');
fs.mkdirSync(portafolioDir, { recursive: true });
const portafolioHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Portafolio de Proyectos | ODISEACLOUD</title>
  <meta name="description" content="Proyectos reales desarrollados por ODISEACLOUD: aulas virtuales, plataformas de comercio electrónico, sitios web a medida y reestructuraciones corporativas.">
  <link rel="canonical" href="https://odiseacloud.com/portafolio/">
  <link rel="icon" type="image/png" href="../assets/images/favicon.png">
  <link rel="stylesheet" href="../assets/css/main.css">
  ${renderHeadAnalytics()}
</head>
<body>

  ${renderHeader('portafolio', '../')}

  <main>
    <!-- HERO PORTAFOLIO -->
    <section class="section section-soft-blue" style="padding: 72px 0 56px 0;">
      <div class="container container-narrow" style="text-align: center;">
        <span class="section-badge">Casos y Desarrollos</span>
        <h1 style="margin-bottom: 20px;">Proyectos que reflejan nuestro trabajo</h1>
        <p class="section-subtitle">
          Presentamos proyectos reales desarrollados con altos estándares de diseño UI/UX, arquitectura tecnológica sólida y orientación a resultados empresariales.
        </p>
      </div>
    </section>

    <!-- LISTADO DE PROYECTOS CON FILTROS -->
    <section class="section">
      <div class="container">
        <div class="filter-tabs">
          <button class="filter-btn active" data-filter="all">Todos los proyectos</button>
          <button class="filter-btn" data-filter="aulas-virtuales">Aulas Virtuales</button>
          <button class="filter-btn" data-filter="tiendas-virtuales">Comercio Electrónico</button>
          <button class="filter-btn" data-filter="desarrollo-web">Desarrollo Web</button>
          <button class="filter-btn" data-filter="rediseno-web">Rediseño Web</button>
        </div>

        <div class="portfolio-grid">
          ${data.portfolio.map(p => `
            <div class="portfolio-card" data-category="${p.category}">
              <div class="portfolio-img-wrapper">
                <img src="..${p.image}" alt="${p.title}" class="portfolio-img" width="1536" height="1024" loading="lazy">
                <span class="portfolio-category-tag">${p.categoryLabel}</span>
              </div>
              <div class="portfolio-body">
                <span class="portfolio-sector">${p.clientSector}</span>
                <h3 class="portfolio-title">${p.title}</h3>
                <p class="portfolio-desc">${p.desc}</p>
                <div class="portfolio-tags">
                  ${p.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}
                </div>
                <div style="margin-top: auto;">
                  <a href="#" class="btn btn-whatsapp portfolio-btn" data-whatsapp="${p.whatsappMsg}">
                    ${getSvgIcon('whatsapp')}
                    <span>Cotizar proyecto similar</span>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA CONTACTO -->
    <section class="section section-light">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-content">
            <h2 class="cta-title">¿Deseas implementar un proyecto con esta calidad?</h2>
            <p class="cta-desc">
              Cuéntanos sobre tu idea y diseñaremos una solución a medida para tu empresa con garantía técnica y acompañamiento continuo.
            </p>
            <div class="cta-buttons">
              <a href="#" class="btn btn-whatsapp btn-lg" data-whatsapp="${data.company.name}: Hola, vi su portafolio de proyectos y quisiera solicitar una propuesta para mi empresa.">
                ${getSvgIcon('whatsapp')}
                <span>Conversar por WhatsApp</span>
              </a>
              <a href="../contacto/" class="btn btn-outline-white btn-lg">
                <span>Escríbenos por correo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderFooter('../')}

</body>
</html>`;

fs.writeFileSync(path.join(portafolioDir, 'index.html'), portafolioHtml, 'utf8');
console.log(`✅ Generada página Portafolio: /portafolio/`);

// 5. Generación de Página Soluciones por Sector (/soluciones/)
const solucionesDir = path.join(__dirname, 'soluciones');
fs.mkdirSync(solucionesDir, { recursive: true });
const solucionesHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Soluciones Tecnológicas por Sector | ODISEACLOUD</title>
  <meta name="description" content="Soluciones tecnológicas a la medida de empresas, emprendedores, tiendas comerciales, centros educativos, institutos y profesionales independientes.">
  <link rel="canonical" href="https://odiseacloud.com/soluciones/">
  <link rel="icon" type="image/png" href="../assets/images/favicon.png">
  <link rel="stylesheet" href="../assets/css/main.css">
  ${renderHeadAnalytics()}
</head>
<body>

  ${renderHeader('soluciones', '../')}

  <main>
    <!-- HERO SOLUCIONES -->
    <section class="section section-soft-blue" style="padding: 72px 0 56px 0;">
      <div class="container container-narrow" style="text-align: center;">
        <span class="section-badge">Enfoque Vertical</span>
        <h1 style="margin-bottom: 20px;">Tecnología adaptada a cada tipo de negocio</h1>
        <p class="section-subtitle">
          Cada industria tiene dinámicas y necesidades particulares. Entendemos tu sector y adaptamos nuestras herramientas para maximizar tu eficiencia y retorno de inversión.
        </p>
      </div>
    </section>

    <!-- LISTADO DE SECTORES -->
    <section class="section">
      <div class="container">
        <div class="sectors-grid">
          ${data.sectors.map(sec => `
            <div class="sector-card">
              <div class="sector-header">
                <div class="sector-icon">${getSvgIcon(sec.icon)}</div>
                <h3 class="sector-title">${sec.title}</h3>
              </div>
              <div class="sector-body">
                <div>
                  <h4 class="sector-item-title">Desafío común:</h4>
                  <p class="sector-item-text" style="color: var(--color-text-muted);">${sec.need}</p>
                </div>
                <div>
                  <h4 class="sector-item-title">Solución OdiseaCloud:</h4>
                  <p class="sector-item-text"><strong>${sec.solution}</strong></p>
                </div>
                <div style="margin-top: auto; padding-top: 16px;">
                  <a href="#" class="btn btn-whatsapp" style="width: 100%; font-size: 0.9rem;" data-whatsapp="${data.company.name}: Hola, pertenezco al sector de ${sec.title} y quisiera asesoría sobre soluciones para mi negocio.">
                    ${getSvgIcon('whatsapp')}
                    <span>Consultar para mi sector</span>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- CTA FINAL -->
    <section class="section section-light">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-content">
            <h2 class="cta-title">¿No encuentras tu sector específico?</h2>
            <p class="cta-desc">
              Contamos con la flexibilidad para estudiar tu modelo operativo y diseñar una arquitectura a la medida exacta de tus requerimientos.
            </p>
            <div class="cta-buttons">
              <a href="#" class="btn btn-whatsapp btn-lg" data-whatsapp="${data.company.name}: Hola, quisiera conversar sobre una solución digital especializada para mi empresa.">
                ${getSvgIcon('whatsapp')}
                <span>Conversar por WhatsApp</span>
              </a>
              <a href="../contacto/" class="btn btn-outline-white btn-lg">
                <span>Escríbenos por correo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderFooter('../')}

</body>
</html>`;

fs.writeFileSync(path.join(solucionesDir, 'index.html'), solucionesHtml, 'utf8');
console.log(`✅ Generada página Soluciones: /soluciones/`);

// 6. Generación de Página Contacto (/contacto/)
const contactoDir = path.join(__dirname, 'contacto');
fs.mkdirSync(contactoDir, { recursive: true });
const contactoHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contacto Comercial | ODISEACLOUD</title>
  <meta name="description" content="Comunícate directamente con el equipo de ODISEACLOUD por WhatsApp o correo electrónico para solicitar cotizaciones y asesoría en proyectos digitales.">
  <link rel="canonical" href="https://odiseacloud.com/contacto/">
  <link rel="icon" type="image/png" href="../assets/images/favicon.png">
  <link rel="stylesheet" href="../assets/css/main.css">
  ${renderHeadAnalytics()}
</head>
<body>

  ${renderHeader('contacto', '../')}

  <main>
    <!-- HERO CONTACTO -->
    <section class="section section-soft-blue" style="padding: 72px 0 56px 0;">
      <div class="container container-narrow" style="text-align: center;">
        <span class="section-badge">Atención Directa</span>
        <h1 style="margin-bottom: 20px;">¿Tienes un proyecto en mente? Hagámoslo realidad</h1>
        <p class="section-subtitle">
          Cuéntanos qué necesitas y descubre cómo podemos ayudarte a desarrollar tu próxima solución digital. Respuesta rápida y sin intermediarios.
        </p>
      </div>
    </section>

    <!-- GRID DE CONTACTO (Canales directos + Formulario seguro) -->
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- Columna Información y Canales -->
          <div class="contact-info-card">
            <span class="section-badge section-badge-dark">Canales Oficiales</span>
            <h2 style="color: var(--color-white); margin-bottom: 20px;">Comunicación ágil y directa</h2>
            <p style="color: var(--color-text-light); margin-bottom: 32px; line-height: 1.65;">
              Para brindarte la mejor atención, nos comunicamos principalmente a través de <strong>WhatsApp</strong> y <strong>correo electrónico corporativo</strong>.
            </p>

            <div style="display: flex; flex-direction: column; gap: 24px; margin-bottom: 36px;">
              <div style="display: flex; gap: 16px; align-items: flex-start;">
                <div style="width: 44px; height: 44px; border-radius: 12px; background-color: rgba(37, 211, 102, 0.2); color: #25D366; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  ${getSvgIcon('whatsapp')}
                </div>
                <div>
                  <h4 style="color: var(--color-white); margin-bottom: 4px;">WhatsApp Comercial</h4>
                  <p style="color: var(--color-text-light); font-size: 0.9rem; margin-bottom: 6px;">Atención inmediata y personalizada.</p>
                  <a href="#" class="btn btn-whatsapp btn-sm" data-whatsapp="${data.company.name}: Hola, quisiera solicitar una cotización comercial para mi empresa.">
                    <span>Iniciar chat: <span class="display-whatsapp">${data.company.whatsappDisplay}</span></span>
                  </a>
                </div>
              </div>

              <div style="display: flex; gap: 16px; align-items: flex-start;">
                <div style="width: 44px; height: 44px; border-radius: 12px; background-color: rgba(0, 157, 255, 0.2); color: var(--color-tech); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  ${getSvgIcon('mail')}
                </div>
                <div>
                  <h4 style="color: var(--color-white); margin-bottom: 4px;">Correo Electrónico</h4>
                  <p style="color: var(--color-text-light); font-size: 0.9rem; margin-bottom: 6px;">Para propuestas formales y requerimientos técnicos.</p>
                  <a href="#" class="btn btn-outline-white btn-sm" data-mailto="${data.company.name}: Hola, deseo consultar formalmente sobre sus servicios para mi empresa.">
                    <span>Escribir a: <span class="display-email">${data.company.email}</span></span>
                  </a>
                </div>
              </div>

              <div style="display: flex; gap: 16px; align-items: flex-start;">
                <div style="width: 44px; height: 44px; border-radius: 12px; background-color: rgba(255, 255, 255, 0.1); color: var(--color-white); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                  ${getSvgIcon('globe')}
                </div>
                <div>
                  <h4 style="color: var(--color-white); margin-bottom: 4px;">Horario de Atención</h4>
                  <p style="color: var(--color-text-light); font-size: 0.9rem;">
                    ${data.company.schedule}
                  </p>
                </div>
              </div>
            </div>

            <div style="padding: 20px; background-color: rgba(255, 255, 255, 0.05); border-radius: 12px; border: 1px solid rgba(255, 255, 255, 0.1);">
              <p style="font-size: 0.88rem; color: var(--color-text-light); margin: 0;">
                🔒 <strong>Privacidad y confidencialidad:</strong> Tu información es tratada con estricta reserva y no se comparte con terceros.
              </p>
            </div>
          </div>

          <!-- Columna Formulario Web Directo con Selector de Servicio -->
          <div class="contact-form-card">
            <h3 style="margin-bottom: 8px;">Envíanos tu consulta</h3>
            <p style="margin-bottom: 24px; font-size: 0.95rem;">
              Selecciona el servicio de tu interés y el formulario preparará el mensaje comercial idóneo para ti.
            </p>

            <form id="contact-form" action="../contact.php" method="POST">
              <!-- Honeypot anti-spam oculto -->
              <div style="display: none;">
                <input type="text" name="website_hp" tabindex="-1" autocomplete="off">
              </div>

              <div class="form-group">
                <label for="nombre" class="form-label">Nombre completo o Empresa *</label>
                <input type="text" id="nombre" name="nombre" class="form-input" placeholder="Ej. Carlos Mendoza / Empresa SAC" required>
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                <div class="form-group">
                  <label for="email" class="form-label">Correo electrónico *</label>
                  <input type="email" id="email" name="email" class="form-input" placeholder="correo@empresa.com" required>
                </div>
                <div class="form-group">
                  <label for="telefono" class="form-label">Teléfono / WhatsApp</label>
                  <input type="tel" id="telefono" name="telefono" class="form-input" placeholder="+51 900 000 000">
                </div>
              </div>

              <div class="form-group">
                <label for="contact-service-select" class="form-label">Servicio de interés *</label>
                <select id="contact-service-select" name="servicio" class="form-select">
                  <option value="Consulta General" data-msg="${data.company.defaultMessages.general}">Consulta General</option>
                  <option value="Diseño y desarrollo web" data-msg="${data.company.defaultMessages.web}">01. Diseño y desarrollo web</option>
                  <option value="Tiendas virtuales y eCommerce" data-msg="${data.company.defaultMessages.ecommerce}">02. Tiendas virtuales y eCommerce</option>
                  <option value="Reestructuración y rediseño web" data-msg="Hola, OdiseaCloud. Quisiera evaluar la reestructuración y rediseño de mi página web actual.">03. Reestructuración web</option>
                  <option value="Sistemas web personalizados" data-msg="${data.company.defaultMessages.custom}">04. Sistemas web personalizados</option>
                  <option value="Aulas virtuales y eLearning" data-msg="${data.company.defaultMessages.elearning}">05. Aulas virtuales y eLearning</option>
                  <option value="Integraciones y automatizaciones" data-msg="Hola, OdiseaCloud. Quisiera consultar sobre integraciones de sistemas y automatización de procesos.">06. Integraciones y automatizaciones</option>
                  <option value="Hosting web y dominios" data-msg="${data.company.defaultMessages.hosting}">07. Hosting web y dominios</option>
                  <option value="Correo corporativo" data-msg="Hola, OdiseaCloud. Quisiera información para habilitar correos corporativos para mi empresa.">08. Correo corporativo</option>
                  <option value="Servidores VPS y Cloud" data-msg="Hola, OdiseaCloud. Necesito asesoría y cotización para la configuración de un servidor VPS.">09. Servidores VPS y Cloud</option>
                  <option value="Mantenimiento web" data-msg="Hola, OdiseaCloud. Quisiera consultar sobre los planes de mantenimiento para mi página web.">10. Mantenimiento web</option>
                  <option value="Seguridad web" data-msg="Hola, OdiseaCloud. Necesito ayuda con la seguridad o desinfección de mi página web.">11. Seguridad web</option>
                  <option value="Migración de páginas web" data-msg="Hola, OdiseaCloud. Quisiera solicitar el servicio de migración de mi página web a un nuevo hosting.">12. Migración de páginas web</option>
                  <option value="Optimización de velocidad" data-msg="Hola, OdiseaCloud. Quisiera optimizar la velocidad y rendimiento de mi página web.">13. Optimización de velocidad</option>
                  <option value="SEO técnico" data-msg="Hola, OdiseaCloud. Deseo recibir información sobre sus servicios de SEO técnico para mi web.">14. SEO técnico y posicionamiento</option>
                </select>
              </div>

              <div class="form-group">
                <label for="mensaje" class="form-label">Describe brevemente tu requerimiento *</label>
                <textarea id="mensaje" name="mensaje" class="form-textarea" placeholder="Cuéntanos sobre tu empresa, objetivos del proyecto y plazos estimados..." required></textarea>
              </div>

              <!-- Botones duales: Enviar correo directo o Enviar por WhatsApp -->
              <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 24px;">
                <a href="#" id="contact-dynamic-whatsapp" class="btn btn-whatsapp" style="width: 100%;">
                  ${getSvgIcon('whatsapp')}
                  <span>Consultar este servicio por WhatsApp</span>
                </a>
                <p style="font-size: .9rem; margin-bottom: 16px;">Usaremos tus datos para responder tu consulta. Consulta nuestra <a href="../privacidad/">Política de privacidad</a>.</p>
                <button type="submit" class="btn btn-primary" style="width: 100%;">
                  ${getSvgIcon('mail')}
                  <span>Enviar mensaje por correo</span>
                </button>
              </div>

              <div id="form-feedback" style="display: none; margin-top: 18px; padding: 14px; border-radius: var(--radius-sm); font-size: 0.92rem;"></div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderFooter('../')}

  <!-- Script de validación asíncrona del formulario con fallback -->
  <script>
  document.getElementById('contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const form = this;
    const feedback = document.getElementById('form-feedback');
    const submitBtn = form.querySelector('button[type="submit"]');

    feedback.style.display = 'block';
    feedback.style.backgroundColor = '#EAF5FF';
    feedback.style.color = '#0866F5';
    feedback.textContent = 'Enviando tu consulta al servidor...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(form);
      const res = await fetch(form.action, {
        method: 'POST',
        body: formData
      });
      const data = await res.json();

      if (data.success) {
        feedback.style.backgroundColor = '#DCFCE7';
        feedback.style.color = '#166534';
        feedback.textContent = data.message;
        form.reset();
      } else {
        feedback.style.backgroundColor = '#FEE2E2';
        feedback.style.color = '#991B1B';
        feedback.textContent = data.message || 'Ocurrió un error al procesar el mensaje.';
      }
    } catch (err) {
      const email = document.getElementById('email').value;
      const nombre = document.getElementById('nombre').value;
      const servicio = document.getElementById('contact-service-select').value;
      const mensaje = document.getElementById('mensaje').value;
      const mailtoFallback = getMailtoUrl('Consulta desde web: ' + servicio, 'Nombre: ' + nombre + '\\nCorreo: ' + email + '\\n\\nMensaje:\\n' + mensaje);

      feedback.style.backgroundColor = '#FEF3C7';
      feedback.style.color = '#92400E';
      feedback.innerHTML = 'Para enviar tu consulta directamente, <a href="' + mailtoFallback + '" style="text-decoration: underline; font-weight: bold;">haz clic aquí para abrir tu gestor de correo</a> o comunícate vía WhatsApp.';
    } finally {
      submitBtn.disabled = false;
    }
  });
  </script>

</body>
</html>`;

fs.writeFileSync(path.join(contactoDir, 'index.html'), contactoHtml, 'utf8');
console.log(`✅ Generada página Contacto: /contacto/`);

// 7. Generación de Página Principal (/index.html) con URLs limpias
const homeHtml = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Diseño de páginas web en Perú | OdiseaCloud</title>
  <meta name="description" content="Creación y diseño de páginas web en Perú. Desarrollamos tiendas virtuales, sistemas a medida y aulas virtuales. Consulta tu proyecto con OdiseaCloud.">
  <link rel="canonical" href="https://odiseacloud.com/">
  <link rel="icon" type="image/png" href="assets/images/favicon.png">

  <!-- Open Graph -->
  <meta property="og:title" content="Creación de páginas web y servicios digitales en Perú | OdiseaCloud">
  <meta property="og:description" content="Desarrollo web corporativo, tiendas virtuales, aulas virtuales e infraestructura cloud profesional.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://odiseacloud.com/">
  <meta property="og:image" content="https://odiseacloud.com/assets/images/social-preview.jpg">

  <!-- Estilos Corporativos -->
  <link rel="stylesheet" href="assets/css/main.css">

  <!-- Schema.org Organization JSON-LD -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://odiseacloud.com/#organization",
    "name": "ODISEACLOUD",
    "email": "${data.company.email}",
    "areaServed": {"@type": "Country", "name": "Perú"},
    "url": "https://odiseacloud.com",
    "logo": "https://odiseacloud.com/assets/images/logo.png",
    "slogan": "Tu proyecto, sin límites",
    "description": "Desarrollo de páginas web, tiendas virtuales, aulas virtuales e infraestructura tecnológica para empresas.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+${data.company.whatsappNumber}",
      "contactType": "sales",
      "areaServed": "Global",
      "availableLanguage": "Spanish"
    }
  }
  </script>
  ${renderHeadAnalytics()}
</head>
<body>

  ${renderHeader('inicio', '')}

  <main>
    <!-- SECCIÓN 1 — HERO PRINCIPAL -->
    <section class="hero">
      <div class="container hero-grid">
        <!-- Columna Izquierda: Mensaje Comercial -->
        <div class="hero-content">
          <div class="hero-badge">
            <span class="hero-badge-pulse"></span>
            <span>Soluciones digitales para empresas</span>
          </div>

          <h1 class="hero-title">
            Creamos páginas web y <span class="text-gradient">soluciones digitales.</span>
          </h1>

          <p class="hero-desc">
            Diseño y creación de páginas web para empresas y emprendedores en Perú. Desarrollamos tiendas virtuales, sistemas a medida y aulas virtuales, con atención desde Lima para tu proyecto digital.
          </p>

          <div class="hero-buttons">
            <a href="servicios/" class="btn btn-primary btn-lg">
              <span>Explorar servicios</span>
              ${getSvgIcon('arrowRight')}
            </a>
            <a href="#" class="btn btn-whatsapp btn-lg" data-whatsapp="${data.company.name}: Hola, quisiera conversar sobre un proyecto digital para mi empresa.">
              ${getSvgIcon('whatsapp')}
              <span>Hablemos de tu proyecto</span>
            </a>
          </div>

          <div class="hero-features-list">
            <div class="hero-feature-item">
              <span class="hero-feature-icon">${getSvgIcon('check')}</span>
              <span>Código propio y limpio</span>
            </div>
            <div class="hero-feature-item">
              <span class="hero-feature-icon">${getSvgIcon('check')}</span>
              <span>Diseño SaaS Premium</span>
            </div>
            <div class="hero-feature-item">
              <span class="hero-feature-icon">${getSvgIcon('check')}</span>
              <span>Atención personalizada</span>
            </div>
          </div>
        </div>

        <!-- Columna Derecha: Mascota Robótica Oficial en el Espacio con Elementos Tecnológicos -->
        <div class="hero-visual">
          <div class="hero-mascot-container">
            <img src="assets/images/mascota.webp" alt="Mascota robótica de OdiseaCloud explorando la nube tecnológica" class="hero-mascot-img" width="1536" height="1024" fetchpriority="high">
            
            <!-- Tarjeta Flotante 1: Cloud & Web -->
            <div class="floating-card floating-card-1">
              <div class="floating-icon">${getSvgIcon('cpu')}</div>
              <div>
                <p class="floating-title">Cloud & Software</p>
                <p class="floating-subtitle">Arquitectura escalable</p>
              </div>
            </div>

            <!-- Tarjeta Flotante 2: Rendimiento -->
            <div class="floating-card floating-card-2">
              <div class="floating-icon">${getSvgIcon('zap')}</div>
              <div>
                <p class="floating-title">Alta Velocidad</p>
                <p class="floating-subtitle">Core Web Vitals verdes</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 2 — SERVICIOS PRINCIPALES (8 Destacados) -->
    <section class="section section-light" id="servicios-destacados">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Nuestra Especialidad</span>
          <h2 class="section-title">Soluciones tecnológicas para impulsar tu negocio</h2>
          <p class="section-subtitle">
            Desarrollamos herramientas digitales adaptadas a los objetivos y necesidades de cada proyecto.
          </p>
        </div>

        <div class="services-grid">
          ${data.services.filter(s => s.featured).map(s => `
            <div class="service-card">
              <span class="service-card-number">SERVICIO ${s.number}</span>
              <div class="service-card-icon">${getSvgIcon(s.icon)}</div>
              <h3 class="service-card-title">${s.name}</h3>
              <p class="service-card-desc">${s.shortDesc}</p>
              <div style="margin-top: auto;">
                <a href="servicios/${s.slug}/" class="service-card-link">
                  <span>Conocer más</span>
                  ${getSvgIcon('arrowRight')}
                </a>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 56px;">
          <a href="servicios/" class="btn btn-outline btn-lg">
            <span>Explorar todos nuestros servicios (15)</span>
            ${getSvgIcon('arrowRight')}
          </a>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 3 — NOSOTROS -->
    <section class="section" id="nosotros-section">
      <div class="container">
        <div class="about-grid">
          <div>
            <span class="section-badge">Identidad OdiseaCloud</span>
            <h2 style="margin-bottom: 24px;">Tecnología, creatividad y soluciones que generan valor</h2>
            <p style="font-size: 1.12rem; line-height: 1.7; margin-bottom: 36px;">
              En OdiseaCloud desarrollamos soluciones digitales que ayudan a empresas, emprendedores e instituciones a fortalecer su presencia en internet, optimizar sus procesos y aprovechar nuevas oportunidades tecnológicas.
            </p>

            <div class="values-grid" style="margin-top: 0;">
              ${data.values.map(v => `
                <div class="value-card">
                  <h4 class="value-name">${v.name}</h4>
                  <p class="value-desc">${v.desc}</p>
                </div>
              `).join('')}
            </div>

            <div style="margin-top: 36px;">
              <a href="nosotros/" class="btn btn-primary">
                <span>Conocer nuestra historia y enfoque</span>
                ${getSvgIcon('arrowRight')}
              </a>
            </div>
          </div>

          <div>
            <div class="about-card-banner">
              <p class="about-slogan-large">Tu proyecto, sin límites</p>
              <p class="about-slogan-sub">
                Diseñamos y programamos con la certeza de que tu plataforma digital debe acompañarte hoy y escalar mañana sin tener que empezar desde cero.
              </p>
              <div style="background-color: rgba(255, 255, 255, 0.08); padding: 20px; border-radius: var(--radius-md); margin-top: 24px;">
                <p style="font-size: 0.95rem; color: var(--color-white); font-weight: 600; margin-bottom: 6px;">
                  Desarrollo responsable y transparente:
                </p>
                <p style="font-size: 0.88rem; color: var(--color-text-light); margin: 0;">
                  Sin costos ocultos, sin ataduras a tecnologías obsoletas y con soporte directo de profesionales en desarrollo web e infraestructura cloud.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 4 — SOLUCIONES POR SECTOR -->
    <section class="section section-light">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Adaptabilidad</span>
          <h2 class="section-title">Tecnología adaptada a cada tipo de negocio</h2>
          <p class="section-subtitle">
            Entendemos las necesidades específicas de tu sector y construimos la solución técnica precisa.
          </p>
        </div>

        <div class="sectors-grid">
          ${data.sectors.map(sec => `
            <div class="sector-card">
              <div class="sector-header">
                <div class="sector-icon">${getSvgIcon(sec.icon)}</div>
                <h3 class="sector-title">${sec.title}</h3>
              </div>
              <div class="sector-body">
                <div>
                  <h4 class="sector-item-title">Necesidad común:</h4>
                  <p class="sector-item-text" style="color: var(--color-text-muted);">${sec.need}</p>
                </div>
                <div>
                  <h4 class="sector-item-title">Nuestra solución:</h4>
                  <p class="sector-item-text"><strong>${sec.solution}</strong></p>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 48px;">
          <a href="soluciones/" class="btn btn-outline">
            <span>Ver soluciones detalladas por sector</span>
            ${getSvgIcon('arrowRight')}
          </a>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 5 — POR QUÉ ELEGIR ODISEACLOUD -->
    <section class="section section-dark">
      <div class="container">
        <div class="section-header">
          <span class="section-badge section-badge-dark">Diferenciales Reales</span>
          <h2 class="section-title">Por qué elegir OdiseaCloud</h2>
          <p class="section-subtitle">
            Compromiso ético, calidad técnica y soluciones diseñadas para perdurar en el tiempo.
          </p>
        </div>

        <div class="benefits-grid">
          ${data.benefits.map(b => `
            <div class="benefit-card">
              <div class="benefit-check">${getSvgIcon('check')}</div>
              <div>
                <h3 class="benefit-title">${b.title}</h3>
                <p class="benefit-desc">${b.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- SECCIÓN 6 — TECNOLOGÍAS E INTEGRACIONES -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Ecosistema Tecnológico</span>
          <h2 class="section-title">Tecnologías e integraciones que dominamos</h2>
          <p class="section-subtitle">
            Utilizamos tecnologías modernas y estándares probados para garantizar que tu proyecto sea seguro, ágil y compatible.
          </p>
        </div>

        <div class="tech-cloud">
          ${['HTML5', 'CSS3', 'JavaScript', 'PHP', 'Laravel', 'MySQL', 'PostgreSQL', 'WordPress', 'WooCommerce', 'Elementor', 'Odoo ERP', 'Izipay API', 'Google Meet API', 'Zoom API', 'APIs REST'].map(label => renderTech(label, '')).join('')}
        </div>
        
        <p style="text-align: center; font-size: 0.85rem; color: var(--color-text-muted); margin-top: 28px;">
          * Las herramientas como WordPress, WooCommerce y pasarelas de pago se aplican en proyectos de clientes según sus requerimientos específicos.
        </p>
      </div>
    </section>

    <!-- SECCIÓN 7 — PORTAFOLIO DESTACADO -->
    <section class="section section-light" id="portafolio-destacado">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Trabajos Realizados</span>
          <h2 class="section-title">Proyectos que reflejan nuestro trabajo</h2>
          <p class="section-subtitle">
            Una muestra de desarrollos implementados con atención minuciosa al diseño, rendimiento y conversión comercial.
          </p>
        </div>

        <div class="portfolio-grid">
          ${data.portfolio.slice(0, 3).map(p => `
            <div class="portfolio-card">
              <div class="portfolio-img-wrapper">
                <img src="${p.image.replace(/^\//, '')}" alt="${p.title}" class="portfolio-img" loading="lazy">
                <span class="portfolio-category-tag">${p.categoryLabel}</span>
              </div>
              <div class="portfolio-body">
                <span class="portfolio-sector">${p.clientSector}</span>
                <h3 class="portfolio-title">${p.title}</h3>
                <p class="portfolio-desc">${p.desc}</p>
                <div class="portfolio-tags">
                  ${p.tags.map(t => `<span class="portfolio-tag">${t}</span>`).join('')}
                </div>
                <div style="margin-top: auto;">
                  <a href="#" class="btn btn-whatsapp portfolio-btn" data-whatsapp="${p.whatsappMsg}">
                    ${getSvgIcon('whatsapp')}
                    <span>Cotizar proyecto similar</span>
                  </a>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <div style="text-align: center; margin-top: 48px;">
          <a href="portafolio/" class="btn btn-outline btn-lg">
            <span>Ver más proyectos en el portafolio</span>
            ${getSvgIcon('arrowRight')}
          </a>
        </div>
      </div>
    </section>

    <!-- SECCIÓN 8 — PROCESO DE TRABAJO -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-badge">Metodología Clara</span>
          <h2 class="section-title">De tu idea a una solución digital</h2>
          <p class="section-subtitle">
            Estructuramos cada proyecto en cuatro etapas para asegurar cumplimiento, transparencia y calidad.
          </p>
        </div>

        <div class="workflow-grid">
          ${data.workflow.map(w => `
            <div class="workflow-card">
              <div class="workflow-step-badge">${w.step}</div>
              <h3 class="workflow-title">${w.title}</h3>
              <p class="workflow-desc">${w.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- SECCIÓN 9 — CONTACTO COMERCIAL (Call to Action) -->
    <section class="section section-soft-blue" id="contacto-home">
      <div class="container">
        <div class="cta-banner">
          <div class="cta-content">
            <h2 class="cta-title">¿Tienes un proyecto en mente? Hagámoslo realidad.</h2>
            <p class="cta-desc">
              Cuéntanos qué necesitas y descubre cómo podemos ayudarte a desarrollar tu próxima solución digital. Respuesta directa sin intermediarios.
            </p>
            <div class="cta-buttons">
              <a href="#" class="btn btn-whatsapp btn-lg" data-whatsapp="${data.company.name}: Hola, tengo en mente un proyecto digital y quisiera consultar sobre sus servicios.">
                ${getSvgIcon('whatsapp')}
                <span>Consultar por WhatsApp</span>
              </a>
              <a href="#" class="btn btn-outline-white btn-lg" data-mailto="${data.company.name}: Hola, quisiera solicitar una propuesta para un proyecto digital para mi empresa.">
                ${getSvgIcon('mail')}
                <span>Enviar correo</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>

  ${renderFooter('')}

</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'index.html'), homeHtml, 'utf8');
console.log(`✅ Generada página de inicio: /`);

require('./legal-pages')({renderHeader, renderFooter, renderHeadAnalytics});

// 8. Generación de robots.txt y sitemap.xml con URLs limpias
const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://odiseacloud.com/sitemap.xml
`;
fs.writeFileSync(path.join(__dirname, 'robots.txt'), robotsTxt, 'utf8');

const sitemapUrls = [
  'https://odiseacloud.com/',
  'https://odiseacloud.com/nosotros/',
  'https://odiseacloud.com/servicios/',
  'https://odiseacloud.com/portafolio/',
  'https://odiseacloud.com/soluciones/',
  'https://odiseacloud.com/contacto/',
  ...['privacidad', 'terminos', 'cookies', 'libro-de-reclamaciones'].map(s => `https://odiseacloud.com/${s}/`),
  ...data.services.map(s => `https://odiseacloud.com/servicios/${s.slug}/`)
];

require('./seo-output')(sitemapUrls);

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapUrls.map(url => `  <url>
    <loc>${url}</loc>
    <changefreq>weekly</changefreq>
    <priority>${url === 'https://odiseacloud.com/' ? '1.0' : '0.8'}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(__dirname, 'sitemap.xml'), sitemapXml, 'utf8');
console.log(`✅ Generados robots.txt y sitemap.xml con URLs limpias.`);

fs.writeFileSync(path.join(__dirname, '404.html'), `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, follow"><title>Página no encontrada | OdiseaCloud</title><link rel="stylesheet" href="/assets/css/main.css"></head><body>${renderHeader('', '/')}<main class="section section-soft-blue"><div class="container container-narrow" style="text-align:center"><span class="section-badge">Error 404</span><h1>No encontramos esta página</h1><p style="margin:24px 0">La dirección puede haber cambiado. Puedes volver al inicio o explorar nuestros servicios.</p><a class="btn btn-primary" href="/">Ir al inicio</a> <a class="btn btn-outline" href="/servicios/">Ver servicios</a></div></main>${renderFooter('/')}</body></html>`);
