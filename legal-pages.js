const fs = require('fs');
const path = require('path');
module.exports = ({renderHeader, renderFooter, renderHeadAnalytics}) => {
  const pages = {
    privacidad: ['Política de privacidad', `<p>Esta política explica el tratamiento de los datos facilitados a través de odiseacloud.com, bajo el nombre comercial OdiseaCloud, con atención desde Lima, Perú. Para consultas sobre tus datos, utiliza el canal de contacto de esta web.</p>
      <h2>Datos y finalidades</h2><p>Los formularios solicitan datos de identificación, contacto y el detalle de tu solicitud. Los utilizamos para responder consultas, preparar propuestas, gestionar la relación de servicio y atender reclamos. En el Libro de Reclamaciones se solicitan también documento, domicilio y datos de la operación para identificar la solicitud y dar respuesta.</p>
      <h2>Base del tratamiento</h2><p>Tratamos la información necesaria para atender tu solicitud y ejecutar las obligaciones de servicio. La atención de reclamos responde además a obligaciones legales. Cuando una finalidad requiera consentimiento, se solicitará de manera específica; enviar una consulta no autoriza comunicaciones publicitarias.</p>
      <h2>Proveedores y envío de comunicaciones</h2><p>La infraestructura de alojamiento procesa la información necesaria para operar el sitio. Cuando se habilita el envío mediante Resend, los datos de destinatario y el contenido de la comunicación son tratados por ese proveedor para entregar el correo. Esto puede implicar procesamiento fuera del Perú. No vendemos tus datos.</p>
      <h2>Conservación y protección</h2><p>Conservamos las consultas durante el tiempo necesario para gestionarlas y atender obligaciones aplicables. Las hojas de reclamación deben conservarse por al menos dos años desde su registro. Limitamos el acceso a quienes necesitan atender la solicitud y no publicamos los datos de los formularios. El servidor puede procesar la dirección IP, la fecha y datos técnicos de la solicitud para operar el sitio y prevenir abusos.</p>
      <h2>Tus derechos</h2><p>Puedes solicitar información, acceso, rectificación, cancelación u oposición al tratamiento de tus datos por el canal de contacto, indicando el derecho que deseas ejercer. Solo solicitaremos los datos necesarios para verificar tu identidad. La eliminación puede estar limitada por obligaciones legales de conservación. Puedes acudir a la Autoridad Nacional de Protección de Datos Personales.</p>
      <h2>Información que envías</h2><p>Facilita información veraz y evita incluir contraseñas, datos bancarios completos o información sensible innecesaria. La información sobre almacenamiento en tu navegador se detalla en la <a href="../cookies/">Política de cookies</a>.</p>`],
    terminos: ['Términos de servicio y políticas de trabajo', `<p>Estos términos describen las condiciones generales, políticas de trabajo y compromisos comerciales bajo el nombre comercial <strong>OdiseaCloud</strong>, con atención desde Lima, Perú. La propuesta y el acuerdo aceptados para cada proyecto establecen los detalles y especificaciones técnicas concretas.</p>
      <h2>1. Cotización y modalidad de pago por hitos</h2><p>Toda cotización se formula de manera personalizada y describe el alcance, los entregables y el cronograma del proyecto. Salvo acuerdo distinto por escrito, los servicios de desarrollo se gestionan bajo la <strong>modalidad de pago en dos partes (50% / 50%)</strong>:</p>
      <ul>
        <li><strong>50% de anticipo:</strong> Habilita la reserva de agenda, la planificación de arquitectura y la configuración de entornos técnicos iniciales.</li>
        <li><strong>50% final contra entrega y conformidad:</strong> Se abona una vez culminado el desarrollo y verificada la web o sistema en el entorno de pruebas, previo a la entrega de credenciales maestras y pase a producción definitiva.</li>
      </ul>
      <p>Los pagos se canalizan mediante transferencias bancarias directas en entidades financieras peruanas (BCP, BBVA, Interbank) o mediante billeteras digitales autorizadas (Yape y Plin). La constancia de operación emitida por la entidad bancaria y la propuesta formal aceptada acreditan el pago y el alcance contratado.</p>
      <h2>2. Garantía técnica post-entrega (30 días)</h2><p>OdiseaCloud otorga una <strong>garantía técnica de 30 días calendario</strong> contados a partir de la publicación o entrega formal del proyecto. Durante este periodo, nuestro equipo corregirá sin costo adicional cualquier desajuste, error de código o incidencia técnica imprevista que forme parte del alcance originalmente acordado.</p>
      <h2>3. Titularidad, código y propiedad del cliente</h2><p>Una vez completado el pago total pactado, el cliente es el <strong>único y absoluto titular</strong> de su sitio web, base de datos, código fuente personalizado y cuentas de dominio. OdiseaCloud no retiene claves, no bloquea accesos ni impone restricciones para que el cliente gestione o traslade su infraestructura cuando lo decida.</p>
      <h2>4. Confidencialidad y seguridad de la información</h2><p>Tratamos las credenciales de acceso, bases de datos, claves de servidores y detalles comerciales de nuestros clientes con estricta reserva y secreto profesional. La información técnica compartida se utiliza exclusivamente para la ejecución de los servicios contratados y nunca se comparte con terceros.</p>
      <h2>5. Alcance, modificaciones y servicios de terceros</h2><p>Las funciones incluidas son las descritas en la propuesta aceptada. Nuevas funciones, integraciones adicionales o cambios de alcance se cotizan y programan de mutuo acuerdo. En el caso de hosting, servidores, registros de dominios o pasarelas de pago externas, aplican las políticas de renovación y disponibilidad de los respectivos proveedores técnicos.</p>
      <h2>6. Consultas, atención y reclamaciones</h2><p>Para resolver cualquier consulta sobre el estado de tu servicio o ejercer tus derechos, comunícate por nuestros canales de <a href="../contacto/">contacto</a> o utiliza nuestro <a href="../libro-de-reclamaciones/">Libro de Reclamaciones</a> conforme a la legislación peruana.</p>`],
    cookies: ['Política de cookies', `<p>El sitio utiliza recursos necesarios para mostrar las páginas y facilitar la navegación. El Libro de Reclamaciones puede utilizar una cookie de sesión para proteger el envío del formulario; no se usa con fines publicitarios.</p>
      <h2>Preferencias y almacenamiento local</h2><p>Los elementos de navegación pueden mantener su estado mientras usas la página. El formulario de reclamaciones conserva temporalmente en la pestaña un identificador de envío para evitar duplicar una solicitud si necesitas reintentar.</p>
      <h2>Analítica y publicidad</h2><p>Esta versión no tiene un identificador de Google Analytics configurado ni incorpora píxeles publicitarios. Si se incorporan tecnologías no esenciales, se deberá informar su finalidad y habilitar la elección correspondiente antes de su uso.</p>
      <h2>Control desde tu navegador</h2><p>Puedes revisar, eliminar o bloquear cookies y datos del sitio en las opciones de tu navegador. Bloquear las cookies de sesión puede impedir el envío del formulario. Consulta también nuestra <a href="../privacidad/">Política de privacidad</a>.</p>`],
    'libro-de-reclamaciones': ['Libro de Reclamaciones', `<p>Nombre comercial: <strong>OdiseaCloud</strong> · Lima, Perú.</p><div id="provider-details"></div>
      <p>Registra tu reclamo o queja sobre un producto, servicio o la atención recibida. La respuesta se realizará en un plazo máximo de <strong>15 días hábiles improrrogables</strong>. Presentar una reclamación no impide acudir a otras vías ni requiere una conformidad previa con la respuesta del proveedor.</p>
      <p><strong>Reclamo:</strong> disconformidad relacionada con un producto o servicio. <strong>Queja:</strong> disconformidad relacionada con la atención al público.</p>
      <form id="claims-form" class="legal-form" action="../reclamaciones.php" method="post">
        <fieldset><legend>1. Identificación del consumidor</legend>
          <label>Nombre completo<input name="nombre" required maxlength="180" autocomplete="name"></label>
          <div class="legal-form-row"><label>Tipo de documento<select name="tipo_documento" required><option>DNI</option><option>CE</option><option>Pasaporte</option><option>Otro</option></select></label><label>Número de documento<input name="documento" required maxlength="30"></label></div>
          <label>Domicilio completo<input name="domicilio" required maxlength="300" autocomplete="street-address"></label>
          <div class="legal-form-row"><label>Correo para respuesta<input type="email" name="email" required maxlength="254" autocomplete="email"></label><label>Teléfono<input name="telefono" required maxlength="40" autocomplete="tel"></label></div>
          <label class="legal-check"><input type="checkbox" id="minor-check" name="menor" value="1">El consumidor es menor de edad.</label>
          <label id="guardian-field" hidden>Nombre y contacto del padre, madre o representante<input name="representante" maxlength="300"></label>
        </fieldset>
        <fieldset><legend>2. Producto o servicio contratado</legend>
          <label>Tipo<select name="bien" required><option>Servicio</option><option>Producto</option></select></label>
          <label>Descripción del producto o servicio<input name="servicio" required maxlength="300"></label>
          <div class="legal-form-row"><label>Monto reclamado en soles, si corresponde<input type="number" name="monto" min="0" max="999999999" step="0.01"></label><label>Referencia de pedido o comprobante, si tienes<input name="referencia" maxlength="100"></label></div>
        </fieldset>
        <fieldset><legend>3. Detalle y pedido</legend>
          <label>Tipo de solicitud<select name="tipo" required><option>Reclamo</option><option>Queja</option></select></label>
          <label>Describe lo ocurrido<textarea name="detalle" required minlength="10" maxlength="6000" rows="5"></textarea></label>
          <label>¿Qué solución solicitas?<textarea name="pedido" required minlength="5" maxlength="3000" rows="4"></textarea></label>
        </fieldset>
        <p>Usaremos estos datos para registrar, atender y responder tu solicitud, conforme a la <a href="../privacidad/">Política de privacidad</a>. No se utilizarán para publicidad.</p>
        <label class="legal-check"><input name="declaracion" type="checkbox" required value="1">Declaro que la información proporcionada corresponde a mi solicitud.</label>
        <div class="form-trap" aria-hidden="true"><label>Deja este campo vacío<input name="website_hp" tabindex="-1" autocomplete="off"></label></div>
        <button type="submit" class="btn btn-primary" id="claims-submit" disabled>Registrar reclamación</button>
      </form>
      <p id="claims-status" role="status" aria-live="polite">Comprobando disponibilidad del registro…</p>
      <section id="claims-receipt" hidden><h2>Constancia de registro</h2><pre id="claims-copy"></pre><button class="btn btn-outline" type="button" id="claims-print">Imprimir / guardar PDF</button><button class="btn btn-outline" type="button" id="claims-download">Descargar constancia</button></section>
      <noscript>Activa JavaScript para completar el registro o comunícate mediante los canales de contacto.</noscript>
      <p>Orientación: <a href="https://consumidor.gob.pe/libro-de-reclamaciones/" target="_blank" rel="noopener">Libro de Reclamaciones de Indecopi</a>.</p>
      <script src="../assets/js/reclamaciones.js" defer></script>`]
  };
  for (const [slug, [title, content]] of Object.entries(pages)) {
    fs.mkdirSync(path.join(__dirname, slug), {recursive: true});
    fs.writeFileSync(path.join(__dirname, slug, 'index.html'), `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${title} | OdiseaCloud</title><meta name="description" content="${title} de OdiseaCloud. Información sobre nuestros servicios, tus datos y canales de atención."><link rel="canonical" href="https://odiseacloud.com/${slug}/"><link rel="stylesheet" href="../assets/css/main.css">${renderHeadAnalytics()}</head><body>${renderHeader('', '../')}<main class="section section-soft-blue"><article class="container legal-page"><span class="section-badge">Información y atención</span><h1>${title}</h1><p class="legal-date">Actualización: 28 de octubre de 2026</p>${content}</article></main>${renderFooter('../')}</body></html>`);
  }
};
