document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('domain-search-form');
  if (!form) return;
  const input = document.getElementById('domain-name');
  const result = document.getElementById('domain-search-result');
  const contact = document.getElementById('domain-search-contact');
  const emptyPanel = document.getElementById('domain-search-empty');
  const statusMessage = document.getElementById('domain-search-status');
  const feedback = document.getElementById('domain-extension-feedback');
  const submit = form.querySelector('[type="submit"]');
  const submitLabel = submit.querySelector('span');
  let revision = 0;
  let controllers = [];
  let selectedExtension = '';
  const setLabel = text => { if (submitLabel) submitLabel.textContent = text; else submit.textContent = text; };
  const setStatus = text => { if (statusMessage) statusMessage.textContent = text; };
  const extensions = ['com', 'pe', 'edu.pe', 'com.pe', 'net', 'org', 'online', 'store', 'tech', 'app', 'io'];
  document.querySelectorAll('[data-domain-extension]').forEach(button => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      selectedExtension = button.dataset.domainExtension;
      const current = input.value.trim().toLowerCase();
      if (current) {
        const suffix = [...extensions].sort((a, b) => b.length - a.length).find(ext => current.endsWith('.' + ext));
        const stem = suffix ? current.slice(0, -(suffix.length + 1)) : current.includes('.') ? current.slice(0, current.lastIndexOf('.')) : current;
        input.value = stem + '.' + selectedExtension;
      } else input.placeholder = 'tumarca.' + selectedExtension;
      document.querySelectorAll('[data-domain-extension]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      if (feedback) feedback.textContent = current ? 'Extensión aplicada. Pulsa Buscar dominio para consultar.' : 'Extensión .' + selectedExtension + ' seleccionada. Escribe tu marca para buscar.';
      input.focus();
    });
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    let name = input.value.trim().toLowerCase().replace(/\.$/, '');
    if (selectedExtension && name && !name.includes('.')) name += '.' + selectedExtension;
    const exact = name.includes('.');
    try {
      if (!name || /[\s/:?#@\\]/.test(name)) throw Error();
      name = new URL('https://' + name).hostname;
      if (name.length > 245 || !name.split('.').every(label => /^[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?$/.test(label)) || (exact && !/^[a-z]{2,63}$/.test(name.split('.').at(-1)))) throw Error();
    } catch {
      setStatus('Escribe una marca o dominio válido, sin enlaces ni espacios. Por ejemplo: tuempresa.com.');
      input.setAttribute('aria-invalid', 'true'); input.focus(); return;
    }
    input.removeAttribute('aria-invalid');
    const currentRevision = ++revision;
    controllers.forEach(controller => controller.abort()); controllers = [];
    const domains = exact ? [name] : extensions.map(ext => name + '.' + ext);
    contact.hidden = true;
    if (emptyPanel) emptyPanel.hidden = true;
    if (feedback) feedback.textContent = '';
    result.hidden = false; result.replaceChildren(); result.setAttribute('aria-busy', 'true');
    submit.disabled = true; setLabel('Consultando…'); form.setAttribute('aria-busy', 'true');
    setStatus(exact ? 'Consultando ' + name + '…' : 'Consultando ' + extensions.length + ' extensiones para ' + name + '…');
    const heading = document.createElement('p'); heading.className = 'domain-results-heading';
    heading.textContent = exact ? 'Resultado de tu búsqueda' : 'Opciones para tu marca'; result.append(heading);
    const filters = document.createElement('div'); filters.className = 'domain-result-filters';
    filters.setAttribute('role', 'group'); filters.setAttribute('aria-label', 'Filtrar resultados'); result.append(filters);
    let activeFilter = 'all'; const filterButtons = [];
    const rows = domains.map(domain => {
      const row = document.createElement('div'); row.className = 'domain-result-row'; row.dataset.state = 'pending';
      const title = document.createElement('strong'); title.textContent = domain;
      const extension = [...extensions].sort((a, b) => b.length - a.length).find(ext => domain.endsWith('.' + ext));
      const price = document.createElement('span'); price.className = 'domain-result-price';
      price.textContent = ['pe', 'edu.pe'].includes(extension) ? 'S/ 110 / año' : 'Cotizar';
      const status = document.createElement('span'); status.className = 'domain-result-status'; status.textContent = 'Consultando…';
      row.append(title, price, status); result.append(row); return { domain, row, status };
    });
    const empty = document.createElement('p'); empty.className = 'domain-filter-empty'; empty.hidden = true; result.append(empty);
    const applyFilter = () => {
      let visible = 0;
      rows.forEach(({ row }) => { row.hidden = activeFilter !== 'all' && row.dataset.state !== activeFilter; if (!row.hidden) visible++; });
      filterButtons.forEach(({ element, value, label }) => {
        element.setAttribute('aria-pressed', String(activeFilter === value));
        element.textContent = label + ' (' + (value === 'all' ? rows.length : rows.filter(({ row }) => row.dataset.state === value).length) + ')';
      });
      empty.hidden = visible !== 0; empty.textContent = 'No hay resultados en este filtro.';
    };
    for (const [value, label] of [['all', 'Todos'], ['available', 'Disponibles'], ['taken', 'Ocupados'], ['unknown', 'Sin verificar']]) {
      const element = document.createElement('button'); element.type = 'button';
      element.addEventListener('click', () => { activeFilter = value; applyFilter(); });
      filterButtons.push({ element, value, label }); filters.append(element);
    }
    applyFilter();
    const note = document.createElement('p'); note.className = 'domain-results-note';
    note.textContent = 'La disponibilidad puede cambiar y se confirma al completar el registro. La búsqueda no reserva el dominio.'; result.append(note);
    let completed = 0; const pending = [...rows];
    const check = async ({ domain, row, status }) => {
      const controller = new AbortController(); controllers.push(controller);
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const response = await fetch('/domain-check.php?domain=' + encodeURIComponent(domain), { signal: controller.signal, headers: { Accept: 'application/json' } });
        const data = await response.json(); if (currentRevision !== revision) return;
        if (response.ok && data.result === 'available') {
          row.dataset.state = 'available'; status.textContent = 'Disponible';
          const link = document.createElement('a'); link.className = 'domain-register-link'; link.textContent = 'Consultar registro ↗';
          link.href = 'https://wa.me/51994282396?text=' + encodeURIComponent('Hola, OdiseaCloud. Quisiera registrar ' + domain + '.');
          link.target = '_blank'; link.rel = 'noopener noreferrer'; row.append(link);
        } else if (response.ok && data.result === 'taken') { row.dataset.state = 'taken'; status.textContent = 'No disponible'; }
        else { row.dataset.state = 'unknown'; status.textContent = response.status === 429 ? 'Límite temporal · inténtalo en unos momentos' : 'No se pudo verificar'; }
      } catch { if (currentRevision !== revision) return; row.dataset.state = 'unknown'; status.textContent = 'No se pudo verificar'; }
      finally { clearTimeout(timeout); if (currentRevision === revision) { completed++; if (rows.length > 1) setStatus('Consultados ' + completed + ' de ' + rows.length + ' dominios…'); applyFilter(); } }
    };
    try {
      // Keep provider concurrency bounded while individual results arrive.
      await Promise.all(Array.from({ length: Math.min(3, pending.length) }, async () => { while (pending.length && currentRevision === revision) await check(pending.shift()); }));
    } finally {
      if (currentRevision !== revision) return;
      submit.disabled = false; setLabel('Buscar dominio'); form.removeAttribute('aria-busy'); result.removeAttribute('aria-busy');
      const available = rows.filter(({ row }) => row.dataset.state === 'available').length;
      const unknown = rows.filter(({ row }) => row.dataset.state === 'unknown').length;
      setStatus('Consulta finalizada: ' + available + (available === 1 ? ' disponible' : ' disponibles') + ', ' + (rows.length - available - unknown) + ' no disponibles' + (unknown ? ' y ' + unknown + ' sin verificar.' : '.'));
      contact.href = 'https://wa.me/51994282396?text=' + encodeURIComponent('Hola, OdiseaCloud. Quisiera asesoría para elegir o trasladar un dominio para ' + name + '.');
      contact.textContent = unknown ? '¿No pudiste verificar tu dominio? Consulta con nuestro equipo →' : '¿Necesitas ayuda para elegir o trasladar tu dominio? →'; contact.hidden = false;
    }
  });
  const initialQuery = new URLSearchParams(location.search).get('q');
  if (initialQuery) { input.value = initialQuery.slice(0, 245); form.requestSubmit(); }
});
