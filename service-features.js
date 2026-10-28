const icons = {
  web: '<rect x="3" y="4" width="18" height="16" rx="3"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h4m-4 3h8"/>',
  target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><path d="m12 12 9-9m-5 0h5v5"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="2"/><rect x="14" y="3" width="7" height="7" rx="2"/><rect x="3" y="14" width="7" height="7" rx="2"/><rect x="14" y="14" width="7" height="7" rx="2"/>',
  design: '<path d="m15 4 5 5M4 20l5-1L21 7a2 2 0 0 0-5-5L4 14zM4 14l5 5"/>',
  form: '<rect x="4" y="3" width="16" height="18" rx="3"/><path d="M8 7h8m-8 4h8m-8 4h4m2 3 2 2 4-4"/>',
  search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M8 11h5m-5-3h3"/>',
  chat: '<path d="M21 12a8 8 0 0 1-8 8H4l-3 2 2-6a8 8 0 0 1-1-4 9 9 0 0 1 19 0Z"/><path d="M7 11h10m-10 4h6"/>',
  speed: '<path d="M4 19a9 9 0 1 1 16 0M12 5v2M5 11l2 1m12-1-2 1m-5 4 5-6"/><circle cx="12" cy="16" r="2"/>',
  cart: '<path d="M2 3h3l3 12h11l3-8H6M9 19h.01M18 19h.01"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/>',
  payment: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M2 10h20M6 15h4m4 0h2"/>',
  box: '<path d="m12 2 9 5v10l-9 5-9-5V7zM3 7l9 5 9-5M12 12v10M8 4l9 5"/>',
  tag: '<path d="M3 3h8l10 10-8 8L3 11z"/><circle cx="7.5" cy="7.5" r="1"/>',
  truck: '<path d="M3 5h11v12H3zM14 9h4l3 4v4h-7M3 9H1m2 4H1"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
  users: '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m1-17a3 3 0 0 1 0 6m2 4a5 5 0 0 1 3 5v2"/>',
  chart: '<path d="M3 3v18h18M7 16v-4m5 4V8m5 8V5"/>',
  database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/>',
  connect: '<rect x="2" y="8" width="6" height="8" rx="2"/><rect x="16" y="8" width="6" height="8" rx="2"/><path d="M8 12h8M5 4v4m14 8v4"/>',
  book: '<path d="M12 5v16M12 5C8 2 4 3 2 4v15c4-2 7-1 10 2 3-3 6-4 10-2V4c-2-1-6-2-10 1Z"/>',
  video: '<rect x="2" y="5" width="13" height="14" rx="3"/><path d="m15 10 7-4v12l-7-4"/>',
  certificate: '<rect x="3" y="3" width="18" height="13" rx="2"/><path d="M7 7h10M7 11h3m3 5-2 6 4-2 4 2-2-6"/><circle cx="15" cy="13" r="3"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4m10-4v4M3 11h18m-14 4h3m4 0h3"/>',
  mail: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="m3 6 9 7 9-7"/>',
  sync: '<path d="M20 7a8 8 0 0 0-13-3L3 8m0-5v5h5m-4 9a8 8 0 0 0 13 3l4-4m0 5v-5h-5"/>',
  shield: '<path d="m12 2 9 4v6c0 6-9 10-9 10S3 18 3 12V6z"/><path d="m8 12 3 3 5-6"/>',
  lock: '<rect x="4" y="10" width="16" height="12" rx="3"/><path d="M8 10V6a4 4 0 0 1 8 0v4m-4 5v2"/>',
  server: '<rect x="3" y="3" width="18" height="7" rx="2"/><rect x="3" y="14" width="18" height="7" rx="2"/><path d="M7 6.5h.01M7 17.5h.01m4-11h6m-6 11h6"/>',
  backup: '<path d="M3 11a9 9 0 1 1 2 7M3 4v7h7m2-4v5l3 2"/>',
  mobile: '<rect x="6" y="2" width="12" height="20" rx="3"/><path d="M10 5h4m-3 14h2"/>',
  globe: '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/>',
  route: '<circle cx="5" cy="5" r="2"/><circle cx="19" cy="19" r="2"/><path d="M7 5h8a4 4 0 0 1 0 8H9a3 3 0 0 0 0 6h8"/>',
  code: '<path d="m7 7-5 5 5 5m10-10 5 5-5 5M14 3l-4 18"/>',
  tool: '<path d="M21 7a6 6 0 0 1-8 6l-8 8-3-3 8-8a6 6 0 0 1 7-8l-4 4 4 4z"/>',
  image: '<rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8" cy="8" r="1.5"/><path d="m3 17 6-6 4 4 3-3 5 5"/>',
  layers: '<path d="m12 2 10 6-10 6L2 8zm-10 10 10 6 10-6M2 16l10 6 10-6"/>'
};

const layouts = {
  'desarrollo-web': [['Presencia corporativa','web'],['Landing pages','target'],['Portafolio de tu empresa','grid'],['Diseño con tu identidad','design'],['Formularios de contacto','form'],['SEO desde la estructura','search'],['Contacto conectado','chat'],['Accesibilidad y rendimiento','speed']],
  'tiendas-virtuales': [['Catálogo organizado','grid'],['Carrito y checkout','cart'],['Pagos con tarjeta','payment'],['Pagos locales','payment'],['Inventario bajo control','box'],['Promociones y cupones','tag'],['Avisos de pedidos','chat'],['Opciones de envío','truck']],
  'rediseno-web': [['Diagnóstico inicial','search'],['Nueva identidad visual','design'],['Contenido bien organizado','layers'],['Experiencia móvil','mobile'],['Enlaces y redirecciones','route'],['Tecnología actualizada','code']],
  'sistemas-web': [['Módulos a tu medida','grid'],['Roles y permisos','users'],['Reportes para decidir','chart'],['Gestión centralizada','box'],['Datos organizados','database'],['Conexión con tus herramientas','connect']],
  'aulas-virtuales': [['Cursos y contenidos','book'],['Clases en vivo','video'],['Evaluaciones y tareas','form'],['Certificados verificables','certificate'],['Un espacio para cada rol','users'],['Comunidad y comunicación','chat']],
  'integraciones-automatizaciones': [['Diagnóstico del proceso','search'],['Consultas hacia tu CRM','users'],['Seguimiento comercial','calendar'],['Correo y calendario','mail'],['Conexión con WhatsApp','chat'],['Datos sincronizados','sync'],['Validación de eventos','connect'],['Trazabilidad del flujo','chart']],
  'hosting-web': [['Control desde cPanel','grid'],['Almacenamiento NVMe','server'],['Conexiones con SSL','lock'],['Copias de seguridad','backup'],['PHP y bases de datos','database'],['Protección frente a DDoS','shield']],
  'correo-corporativo': [['Correo con tu dominio','mail'],['Autenticación del remitente','shield'],['Acceso multidispositivo','mobile'],['Filtros de protección','lock'],['Migración de buzones','sync'],['Configuración acompañada','users']],
  dominios: [['Tu nombre en internet','search'],['Servidores DNS','server'],['Registros de tu dominio','layers'],['Subdominios para crecer','globe'],['Redirecciones permanentes','route'],['Privacidad del titular','lock']],
  'servidores-vps': [['Distribución Linux','code'],['Servidor web configurado','server'],['Puertos y cortafuegos','shield'],['Bases de datos optimizadas','database'],['SSL y respaldos','backup'],['Monitoreo de recursos','chart']],
  'mantenimiento-web': [['Actualizaciones controladas','sync'],['Respaldos periódicos','backup'],['Compatibilidad y enlaces','mobile'],['Corrección de errores','tool'],['Base de datos cuidada','database'],['Soporte directo','chat']],
  'seguridad-web': [['Revisión de vulnerabilidades','search'],['Accesos protegidos','lock'],['Doble factor de acceso','shield'],['Limpieza de malware','tool'],['Cabeceras y cortafuegos','server'],['Revisión de listas negras','globe']],
  'migracion-web': [['Archivos y contenido','layers'],['Traslado de bases de datos','database'],['Buzones de correo','mail'],['Pruebas antes del cambio','form'],['Rutas y certificados','route'],['Verificación final','shield']],
  'optimizacion-velocidad': [['Diagnóstico con Lighthouse','search'],['Imágenes más ligeras','image'],['CSS y JavaScript optimizados','code'],['Caché bien configurada','server'],['Carga de fuentes y recursos','layers'],['Métricas de experiencia','speed']],
  'seo-tecnico': [['Rastreo e indexación','search'],['Títulos y descripciones','code'],['Sitemap XML','route'],['Control con robots.txt','server'],['Datos estructurados','database'],['Encabezados y enlaces','layers']]
};

module.exports = function renderFeatures(service) {
  const layout = layouts[service.slug];
  if (!layout || layout.length !== service.features.length) throw Error('Feature mapping missing: ' + service.slug);
  return `<div class="feature-grid${layout.length === 8 ? ' feature-grid--four' : ''}">${layout.map(([title, icon], index) => `
    <article class="feature-card">
      <div class="feature-card-top"><span class="feature-card-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[icon]}</svg></span><span class="feature-card-index" aria-hidden="true">${String(index + 1).padStart(2, '0')}</span></div>
      <h3>${title}</h3><p>${service.features[index]}</p>
    </article>`).join('')}</div>`;
};
