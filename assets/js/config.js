/**
 * ODISEACLOUD - Configuración Centralizada Oficial
 * Cualquier cambio en el número de WhatsApp o correo se reflejará
 * automáticamente en todos los botones, enlaces y llamadas a la acción del sitio web.
 */

const ODISEA_CONFIG = {
  name: "ODISEACLOUD",
  slogan: "Tu proyecto, sin límites",
  whatsappNumber: "51907959276",
  whatsappDisplay: "+51 907 959 276",
  email: "contacto@odiseacloud.com",
  schedule: "Lunes a Viernes de 9:00 a.m. a 7:00 p.m. | Sábados de 9:00 a.m. a 1:00 p.m.",
  defaultMessages: {
    general: "Hola, equipo de OdiseaCloud. Estoy interesado en sus servicios y quisiera recibir más información.",
    quote: "Hola, OdiseaCloud. Quisiera solicitar una cotización para un proyecto digital para mi empresa.",
    ecommerce: "Hola, OdiseaCloud. Quisiera solicitar una cotización para desarrollar una tienda virtual.",
    elearning: "Hola, OdiseaCloud. Estoy interesado en implementar un aula virtual para mi institución.",
    web: "Hola, OdiseaCloud. Quisiera información y cotización para el desarrollo de una página web corporativa.",
    hosting: "Hola, OdiseaCloud. Deseo recibir información sobre sus servicios de hosting y dominios.",
    custom: "Hola, OdiseaCloud. Tengo en mente un sistema web a medida y quisiera recibir asesoría."
  }
};

/**
 * Genera el enlace de WhatsApp con el mensaje codificado
 */
function getWhatsAppUrl(customMessage) {
  const message = customMessage || ODISEA_CONFIG.defaultMessages.general;
  return `https://wa.me/${ODISEA_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Genera el enlace mailto con asunto y cuerpo predefinidos
 */
function getMailtoUrl(subject, body) {
  const mailSubject = subject || `Consulta comercial - ${ODISEA_CONFIG.name}`;
  const mailBody = body || ODISEA_CONFIG.defaultMessages.general;
  return `mailto:${ODISEA_CONFIG.email}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;
}

// Inicialización de botones automáticos
document.addEventListener('DOMContentLoaded', () => {
  // Configurar botones con atributo data-whatsapp
  document.querySelectorAll('[data-whatsapp]').forEach(el => {
    const customMsg = el.getAttribute('data-whatsapp');
    el.setAttribute('href', getWhatsAppUrl(customMsg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Configurar botones con atributo data-mailto
  document.querySelectorAll('[data-mailto]').forEach(el => {
    const customSubject = el.getAttribute('data-subject') || `Consulta sobre proyecto - ${ODISEA_CONFIG.name}`;
    const customBody = el.getAttribute('data-mailto') || ODISEA_CONFIG.defaultMessages.general;
    el.setAttribute('href', getMailtoUrl(customSubject, customBody));
  });

  // Configurar spans que muestran el teléfono de contacto
  document.querySelectorAll('.display-whatsapp').forEach(el => {
    el.textContent = ODISEA_CONFIG.whatsappDisplay;
  });

  // Configurar spans que muestran el correo de contacto
  document.querySelectorAll('.display-email').forEach(el => {
    el.textContent = ODISEA_CONFIG.email;
  });
});
