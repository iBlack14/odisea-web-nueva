module.exports = function renderDomainPanel(icon) {
  return `<div class="domain-panel" id="buscador-dominios" aria-labelledby="domain-panel-title">
    <div class="domain-panel-chrome"><span><i></i><i></i><i></i></span><small>OdiseaCloud / Dominios</small><span class="domain-panel-live"><i></i> Consulta real</span></div>
    <div class="domain-panel-nav"><b>${icon('globe')} Odisea<span>Domains</span></b><a href="#traslado-dominio">Trasladar mi dominio ${icon('arrowRight')}</a></div>
    <div class="domain-panel-content">
      <span class="domain-panel-eyebrow">TU PRESENCIA DIGITAL EMPIEZA AQUÍ</span>
      <h2 id="domain-panel-title">Encuentra el nombre<br>de tu próxima idea.</h2>
      <form id="domain-search-form" class="domain-search-form">
        <label for="domain-name">Tu marca o dominio</label>
        <div class="domain-panel-input"><span aria-hidden="true">${icon('search')}</span><input id="domain-name" name="domain" type="text" placeholder="tuempresa.com" required maxlength="253" autocomplete="off" autocapitalize="none" spellcheck="false" aria-describedby="domain-search-hint domain-search-status"><button class="btn btn-primary" type="submit"><span>Buscar dominio</span>${icon('arrowRight')}</button></div>
      </form>
      <p id="domain-search-hint" class="domain-search-hint">Escribe tu marca para ver opciones o un dominio completo para consultar esa extensión.</p>
      <div class="domain-panel-extensions" role="group" aria-label="Elegir extensión para el dominio">${['com','pe','com.pe','net','org','store'].map(ext=>`<button type="button" data-domain-extension="${ext}" aria-label="Usar extensión .${ext}">.${ext}</button>`).join('')}</div>
      <p class="domain-panel-extension-feedback" id="domain-extension-feedback" role="status"></p>
      <div class="domain-panel-empty" id="domain-search-empty"><span>${icon('globe')}</span><div><b>Un nombre para tu negocio.</b><p>Busca, compara extensiones y consulta el registro con nuestro equipo.</p></div></div>
      <p id="domain-search-status" class="domain-panel-status" role="status" aria-live="polite"></p>
      <div id="domain-search-result" class="domain-search-result" role="region" aria-label="Resultados de disponibilidad" hidden></div>
      <a id="domain-search-contact" class="domain-help-link" target="_blank" rel="noopener noreferrer" hidden></a>
    </div>
    <div class="domain-panel-footer"><span>${icon('shield-check')} Tu consulta no realiza ninguna compra.</span><a href="#traslado-dominio">¿Ya tienes un dominio? →</a></div>
  </div>`;
};
