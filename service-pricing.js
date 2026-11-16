const offers = [
  { slug: 'desarrollo-web', category: 'web', name: 'Landing page', price: 656, regular: 669, unit: 'pago único', featured: true, scope: 'Una página de aterrizaje con hasta 6 secciones, adaptable a móvil y con botón de contacto.', note: 'Dominio y hosting se definen según el proyecto.' },
  { slug: 'desarrollo-web', category: 'web', name: 'Web corporativa', price: 713, regular: 729, unit: 'pago único', scope: 'Hasta 5 páginas, diseño responsive, formulario y acceso directo a WhatsApp.', note: 'Dominio, hosting, correo y carga de contenido se confirman en la propuesta.' },
  { slug: 'tiendas-virtuales', category: 'tiendas', name: 'Tienda virtual por WhatsApp', price: 1278, regular: 1290, unit: 'pago único', scope: 'Catálogo inicial de hasta 20 productos y pedidos derivados a WhatsApp.', note: 'No incluye cobro en línea ni comisiones de terceros.' },
  { slug: 'tiendas-virtuales', category: 'tiendas', name: 'Tienda virtual con pagos', price: 1424, regular: 1450, unit: 'pago único', scope: 'Catálogo inicial de hasta 30 productos y configuración de una pasarela.', note: 'Comisiones de la pasarela y carga adicional de productos no incluidas.' },
  { slug: 'rediseno-web', category: 'web', name: 'Rediseño web', price: 1401, regular: 1450, unit: 'desde', scope: 'Actualización visual y mejora de la experiencia de un sitio existente.', note: 'El importe final depende de páginas, migración e integraciones.' },
  { slug: 'sistemas-web', category: 'desarrollo', name: 'Sistema web a medida', price: 3325, regular: 3490, unit: 'desde', scope: 'MVP con un proceso principal, alcance definido y roles básicos.', note: 'Integraciones, infraestructura y licencias se cotizan según requisitos.' },
  { slug: 'aulas-virtuales', category: 'educacion', name: 'Aula virtual', price: 1850, regular: 1890, unit: 'desde · primer año', scope: 'Implementación inicial de plataforma educativa y configuración base.', note: 'Capacidad, almacenamiento, soporte y renovación se detallan en la propuesta.' },
  { slug: 'integraciones-automatizaciones', category: 'desarrollo', name: 'Automatización de un proceso', price: 1425, regular: 1490, unit: 'desde', scope: 'Automatización de un flujo sencillo entre herramientas compatibles.', note: 'Licencias externas, consumo de APIs y mantenimiento se cotizan aparte.' },
  { slug: 'hosting-web', category: 'infraestructura', name: 'Hosting web empresarial', price: 377, regular: 389, unit: 'por año', scope: 'Plan inicial de alojamiento web empresarial.', note: 'Recursos, correo, copias y renovación se confirman antes de contratar.' },
  { slug: 'correo-corporativo', category: 'infraestructura', name: 'Correo corporativo', price: 47, regular: 49, unit: 'por cuenta · año', scope: 'Cuenta de correo profesional con dominio propio.', note: 'Espacio, licencias y migración dependen del proveedor elegido.' },
  { slug: 'dominios', category: 'infraestructura', name: 'Dominio .pe / .com.pe', price: 110, regular: 110, unit: 'por año', scope: 'Registro o renovación de dominio .pe o .com.pe.', note: 'Otras extensiones tienen una tarifa distinta según disponibilidad.' },
  { slug: 'servidores-vps', category: 'infraestructura', name: 'Servidor VPS', price: 47, regular: 50, unit: 'por mes · desde', scope: 'Servidor virtual de entrada con recursos definidos para tu proyecto.', note: 'Administración, respaldos y recursos adicionales se especifican al cotizar.' },
  { slug: 'mantenimiento-web', category: 'soporte', name: 'Mantenimiento web', price: 189, regular: 199, unit: 'por mes · desde', scope: 'Actualizaciones y revisión periódica de un sitio web.', note: 'Nuevas funciones, emergencias y cambios mayores no están incluidos.' },
  { slug: 'seo-tecnico', category: 'seo', name: 'Auditoría SEO técnica', price: 1425, regular: 1450, unit: 'pago único · desde', scope: 'Revisión técnica priorizada con hallazgos y recomendaciones.', note: 'La implementación de mejoras se cotiza por separado.' },
  { slug: 'seo-tecnico', category: 'seo', name: 'SEO técnico mensual', price: 760, regular: 790, unit: 'por mes · desde', scope: 'Plan mensual con trabajo técnico acotado y prioridades acordadas.', note: 'Contenido, enlaces y alcance se definen en la propuesta.' },
  { slug: 'seguridad-web', category: 'soporte', name: 'Seguridad y desinfección web', scope: 'Diagnóstico, limpieza y refuerzo de seguridad según el incidente.' },
  { slug: 'migracion-web', category: 'soporte', name: 'Migración web o correo', scope: 'Traslado planificado de sitios, correo o datos entre proveedores.' },
  { slug: 'optimizacion-velocidad', category: 'seo', name: 'Optimización de velocidad', scope: 'Mejoras de rendimiento según la tecnología y estado actual del sitio.' },
  { slug: 'integraciones-automatizaciones', category: 'desarrollo', name: 'Integraciones y CRM', scope: 'Conexiones entre tu web, CRM, pagos u otras herramientas.' }
];

const money = value => new Intl.NumberFormat('es-PE', { maximumFractionDigits: 0 }).format(value);
const esc = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function renderServicePricing(service) {
  const selected = offers.filter(offer => offer.slug === service.slug);
  if (!selected.length) return '';
  const cards = selected.map(offer => {
    const message = `Hola, OdiseaCloud. Quiero consultar por ${offer.name}${offer.price ? ` (precio de lanzamiento S/ ${money(offer.price)})` : ''}. ¿Me pueden ayudar a revisar el alcance?`;
    return `<article class="service-price-card${offer.featured ? ' service-price-card-featured' : ''}">
      <div class="service-price-label">${offer.featured ? 'Una buena forma de empezar' : 'Alcance referencial'}</div>
      <h3>${esc(offer.name)}</h3><p class="service-price-scope">${esc(offer.scope)}</p>
      ${offer.price ? `<div class="service-price-amount"><span>S/</span> ${money(offer.price)} <small>${esc(offer.unit)}</small></div><p class="service-price-regular">Precio regular: <s>S/ ${money(offer.regular)}</s></p>` : '<div class="service-price-amount service-price-quote">Precio a medida</div>'}
      ${offer.note ? `<p class="service-price-note">${esc(offer.note)}</p>` : ''}<a class="service-price-cta${offer.price ? '' : ' is-outline'}" href="#" data-whatsapp="${esc(message)}" data-cta="Cotizar ${esc(offer.name)}">Cotizar por WhatsApp <span aria-hidden="true">→</span></a>
    </article>`;
  }).join('');
  const title = selected.length > 1 ? 'Elige cómo quieres empezar' : 'Una inversión clara para empezar';
  return `<section class="section service-pricing-section" id="precios-servicio" aria-labelledby="service-pricing-title"><div class="container service-pricing-layout">
    <div class="service-pricing-copy"><span class="section-badge">Precio de lanzamiento</span><h2 id="service-pricing-title">${title}</h2>
      <p>Te mostramos un punto de partida y qué incluye. Antes de comenzar confirmamos contigo el alcance, los plazos y cualquier costo de terceros.</p>
      <div class="service-pricing-assurance"><span aria-hidden="true">✓</span><span>La propuesta final deja claros los entregables y costos antes de contratar.</span></div>
    </div><div class="service-pricing-cards">${cards}</div>
  </div></section>`;
}

function renderHeroPrice(service) {
  const selected = offers.filter(offer => offer.slug === service.slug);
  if (!selected.length) return '';
  const prices = selected.filter(offer => offer.price).map(offer => offer.price);
  if (!prices.length) {
    return `<a class="service-hero-price service-hero-price-quote" href="#precios-servicio"><span>Precio</span><strong>A medida</strong><small>Ver alcance y cotizar <span aria-hidden="true">↓</span></small></a>`;
  }
  const lowest = Math.min(...prices);
  const offer = selected.find(item => item.price === lowest);
  return `<a class="service-hero-price" href="#precios-servicio"><span>Precio de lanzamiento</span><strong><small>S/</small> ${money(lowest)} <small>${esc(offer.unit)}</small></strong><small>Ver qué incluye <span aria-hidden="true">↓</span></small></a>`;
}

module.exports = { offers, renderServicePricing, renderHeroPrice, money };
